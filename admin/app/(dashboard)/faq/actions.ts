'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/client'
import { faqItems } from '@/lib/db/schema'

export async function saveFaqItem(formData: FormData) {
  const id = String(formData.get('id'))
  const values = {
    question: String(formData.get('question')).trim(),
    answer: String(formData.get('answer')).trim(),
    order: Number(formData.get('order')) || 0,
  }

  if (id === 'new') {
    await db().insert(faqItems).values({ id: crypto.randomUUID(), ...values })
  } else {
    await db().update(faqItems).set(values).where(eq(faqItems.id, id))
  }
  revalidatePath('/faq')
}

export async function deleteFaqItem(formData: FormData) {
  const id = String(formData.get('id'))
  await db().delete(faqItems).where(eq(faqItems.id, id))
  revalidatePath('/faq')
}
