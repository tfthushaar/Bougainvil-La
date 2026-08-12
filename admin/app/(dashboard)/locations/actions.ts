'use server'

import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/client'
import { locationPages } from '@/lib/db/schema'
import type { ContentBlock } from '@/lib/blocks'

export async function saveLocationPage(formData: FormData) {
  const id = String(formData.get('id'))
  const isNew = id === 'new'

  let blocks: ContentBlock[] = []
  try {
    blocks = JSON.parse(String(formData.get('blocks') ?? '[]'))
  } catch {
    blocks = []
  }

  const values = {
    slug: String(formData.get('slug')).trim(),
    metaTitle: String(formData.get('metaTitle')).trim(),
    metaDescription: String(formData.get('metaDescription')).trim(),
    h1: String(formData.get('h1')).trim(),
    subheading: String(formData.get('subheading') ?? '').trim() || null,
    blocks,
    isPillar: formData.get('isPillar') === 'on',
  }

  if (isNew) {
    await db().insert(locationPages).values({ id: crypto.randomUUID(), ...values })
  } else {
    await db().update(locationPages).set(values).where(eq(locationPages.id, id))
  }

  revalidatePath('/locations')
  redirect('/locations')
}

export async function deleteLocationPage(formData: FormData) {
  const id = String(formData.get('id'))
  await db().delete(locationPages).where(eq(locationPages.id, id))
  revalidatePath('/locations')
  redirect('/locations')
}
