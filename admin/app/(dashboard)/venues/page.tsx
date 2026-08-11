import Link from 'next/link'
import { asc } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { venues } from '@/lib/db/schema'

export default async function VenuesPage() {
  let rows: (typeof venues.$inferSelect)[] = []
  let error: string | null = null
  try {
    rows = await db().select().from(venues).orderBy(asc(venues.order))
  } catch {
    error = 'No database connection yet.'
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">Venues</h1>
        <Link href="/venues/new" className="rounded bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-accent-dark)]">
          + New Venue
        </Link>
      </div>

      {error ? (
        <p className="text-sm text-amber-700">{error}</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-neutral-500">No venues yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
          {rows.map((v, i) => (
            <Link
              key={v.id} href={`/venues/${v.id}`}
              className={`flex items-center justify-between px-4 py-3 text-sm hover:bg-neutral-50 ${i > 0 ? 'border-t border-black/5' : ''}`}
            >
              <span className="font-medium text-neutral-900">{v.name}</span>
              <span className="text-neutral-500">{v.tagline}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
