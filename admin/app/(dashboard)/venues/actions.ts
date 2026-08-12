'use server'

import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/client'
import { venues } from '@/lib/db/schema'

function lines(v: FormDataEntryValue | null): string[] {
  return String(v ?? '').split('\n').map((s) => s.trim()).filter(Boolean)
}

export async function saveVenue(formData: FormData) {
  const id = String(formData.get('id'))
  const isNew = id === 'new'

  const values = {
    slug: String(formData.get('slug')).trim(),
    name: String(formData.get('name')).trim(),
    tagline: String(formData.get('tagline')).trim(),
    subtitle: String(formData.get('subtitle') ?? '').trim() || null,
    description: lines(formData.get('description')),
    seated: Number(formData.get('seated')) || 0,
    floating: Number(formData.get('floating')) || 0,
    cover: String(formData.get('cover') ?? '') || null,
    highlights: lines(formData.get('highlights')),
    galleryWithDecor: lines(formData.get('galleryWithDecor')),
    galleryWithoutDecor: lines(formData.get('galleryWithoutDecor')),
    order: Number(formData.get('order')) || 0,
  }

  if (isNew) {
    await db().insert(venues).values({ id: crypto.randomUUID(), ...values })
  } else {
    await db().update(venues).set(values).where(eq(venues.id, id))
  }

  revalidatePath('/venues')
  redirect('/venues')
}

export async function deleteVenue(formData: FormData) {
  const id = String(formData.get('id'))
  await db().delete(venues).where(eq(venues.id, id))
  revalidatePath('/venues')
  redirect('/venues')
}
