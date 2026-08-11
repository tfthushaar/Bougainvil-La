'use server'

import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/client'
import { roomTypes } from '@/lib/db/schema'

export async function saveRoomType(formData: FormData) {
  const id = String(formData.get('id'))
  const isNew = id === 'new'

  const values = {
    name: String(formData.get('name')).trim(),
    description: String(formData.get('description')).trim(),
    photo: String(formData.get('photo') ?? '') || null,
    quantity: Number(formData.get('quantity')) || 0,
    capacity: String(formData.get('capacity')).trim(),
    order: Number(formData.get('order')) || 0,
  }

  if (isNew) {
    await db().insert(roomTypes).values({ id: crypto.randomUUID(), ...values })
  } else {
    await db().update(roomTypes).set(values).where(eq(roomTypes.id, id))
  }

  revalidatePath('/room-types')
  redirect('/room-types')
}

export async function deleteRoomType(formData: FormData) {
  const id = String(formData.get('id'))
  await db().delete(roomTypes).where(eq(roomTypes.id, id))
  revalidatePath('/room-types')
  redirect('/room-types')
}
