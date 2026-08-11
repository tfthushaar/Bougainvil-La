import Link from 'next/link'
import { db } from '@/lib/db/client'
import { locationPages } from '@/lib/db/schema'

export default async function LocationsPage() {
  let rows: (typeof locationPages.$inferSelect)[] = []
  let error: string | null = null
  try {
    rows = await db().select().from(locationPages)
  } catch {
    error = 'No database connection yet.'
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">Location Pages</h1>
        <Link href="/locations/new" className="rounded bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-accent-dark)]">
          + New Location Page
        </Link>
      </div>

      {error ? (
        <p className="text-sm text-amber-700">{error}</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-neutral-500">No location pages yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
          {rows.map((l, i) => (
            <Link
              key={l.id} href={`/locations/${l.id}`}
              className={`flex items-center justify-between px-4 py-3 text-sm hover:bg-neutral-50 ${i > 0 ? 'border-t border-black/5' : ''}`}
            >
              <span className="font-medium text-neutral-900">{l.h1}</span>
              <span className="text-neutral-500">/{l.slug}/{l.isPillar && ' · pillar'}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
