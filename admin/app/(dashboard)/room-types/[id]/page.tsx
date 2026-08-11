import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db/client'
import { roomTypes } from '@/lib/db/schema'
import { ImagePicker } from '@/components/ImagePicker'
import { formStyles as f } from '@/components/form'
import { saveRoomType, deleteRoomType } from '../actions'

export default async function RoomTypeEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const isNew = id === 'new'

  const room = isNew ? null : (await db().select().from(roomTypes).where(eq(roomTypes.id, id)).limit(1))[0]
  if (!isNew && !room) notFound()

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">{isNew ? 'New Room Type' : room!.name}</h1>

      <form action={saveRoomType}>
        <input type="hidden" name="id" value={id} />

        <div className={f.field}>
          <label className={f.label} htmlFor="name">Name</label>
          <input className={f.input} id="name" name="name" defaultValue={room?.name} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="description">Description</label>
          <textarea className={f.textarea} id="description" name="description" rows={4} defaultValue={room?.description} required />
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className={f.label} htmlFor="quantity">Quantity</label>
            <input className={f.input} id="quantity" name="quantity" type="number" defaultValue={room?.quantity} required />
          </div>
          <div>
            <label className={f.label} htmlFor="capacity">Capacity (e.g. "Up to 3 Guests")</label>
            <input className={f.input} id="capacity" name="capacity" defaultValue={room?.capacity} required />
          </div>
        </div>

        <p className={f.sectionTitle}>Photo</p>
        <div className={f.field}>
          <ImagePicker name="photo" defaultValue={room?.photo ?? null} />
        </div>

        <div className={f.field}>
          <label className={f.label} htmlFor="order">Display Order</label>
          <input className={f.input} id="order" name="order" type="number" defaultValue={room?.order ?? 0} />
        </div>

        <div className="mt-6">
          <button type="submit" className={f.primaryBtn}>Save Room Type</button>
        </div>
      </form>

      {!isNew && (
        <form action={deleteRoomType} className="mt-3">
          <input type="hidden" name="id" value={id} />
          <button type="submit" className={f.dangerBtn}>Delete Room Type</button>
        </form>
      )}
    </div>
  )
}
