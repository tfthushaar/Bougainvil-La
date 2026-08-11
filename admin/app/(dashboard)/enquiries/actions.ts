'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/client'
import { enquiries } from '@/lib/db/schema'

export async function toggleContacted(formData: FormData) {
  const id = String(formData.get('id'))
  const contacted = formData.get('contacted') === 'true'
  await db().update(enquiries).set({ contacted: !contacted }).where(eq(enquiries.id, id))
  revalidatePath('/enquiries')
}

export async function deleteEnquiry(formData: FormData) {
  const id = String(formData.get('id'))
  await db().delete(enquiries).where(eq(enquiries.id, id))
  revalidatePath('/enquiries')
}
