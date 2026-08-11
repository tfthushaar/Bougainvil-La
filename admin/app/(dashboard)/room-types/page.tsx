import Link from 'next/link'
import { asc } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { roomTypes } from '@/lib/db/schema'

export default async function RoomTypesPage() {
  let rows: (typeof roomTypes.$inferSelect)[] = []
  let error: string | null = null
  try {
    rows = await db().select().from(roomTypes).orderBy(asc(roomTypes.order))
  } catch {
    error = 'No database connection yet.'
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">Room Types</h1>
        <Link href="/room-types/new" className="rounded bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-accent-dark)]">
          + New Room Type
        </Link>
      </div>

      {error ? (
        <p className="text-sm text-amber-700">{error}</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-neutral-500">No room types yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
          {rows.map((r, i) => (
            <Link
              key={r.id} href={`/room-types/${r.id}`}
              className={`flex items-center justify-between px-4 py-3 text-sm hover:bg-neutral-50 ${i > 0 ? 'border-t border-black/5' : ''}`}
            >
              <span className="font-medium text-neutral-900">{r.name}</span>
              <span className="text-neutral-500">{r.quantity} × {r.capacity}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
