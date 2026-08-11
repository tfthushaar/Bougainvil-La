import Link from 'next/link'
import { desc } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { enquiries } from '@/lib/db/schema'
import { toggleContacted, deleteEnquiry } from './actions'

export default async function EnquiriesPage({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  const { filter } = await searchParams

  let rows: (typeof enquiries.$inferSelect)[] = []
  let error: string | null = null
  try {
    rows = await db().select().from(enquiries).orderBy(desc(enquiries.submittedAt))
  } catch {
    error = 'No database connection yet.'
  }

  const visible = filter === 'new' ? rows.filter((r) => !r.contacted) : rows

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">Enquiries</h1>
        <div className="flex gap-2 text-sm">
          <Link href="/enquiries" className={`rounded px-3 py-1 ${!filter ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600'}`}>
            All ({rows.length})
          </Link>
          <Link href="/enquiries?filter=new" className={`rounded px-3 py-1 ${filter === 'new' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600'}`}>
            Not Contacted ({rows.filter((r) => !r.contacted).length})
          </Link>
        </div>
      </div>

      {error ? (
        <p className="text-sm text-amber-700">{error}</p>
      ) : visible.length === 0 ? (
        <p className="text-sm text-neutral-500">No enquiries here.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/10 text-left text-xs uppercase tracking-wide text-neutral-400">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Wedding Date</th>
                <th className="px-4 py-2">Guests</th>
                <th className="px-4 py-2">Source</th>
                <th className="px-4 py-2">Submitted</th>
                <th className="px-4 py-2">Contacted</th>
                <th className="px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={row.id} className="border-b border-black/5 align-top last:border-0">
                  <td className="px-4 py-3 font-medium text-neutral-900">{row.name}</td>
                  <td className="px-4 py-3 text-neutral-600">
                    <div>{row.phone}</div>
                    <div className="text-xs text-neutral-400">{row.email}</div>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{row.weddingDate ?? '—'}</td>
                  <td className="px-4 py-3 text-neutral-600">{row.guestCount ?? '—'}</td>
                  <td className="px-4 py-3 text-neutral-600">{row.source ?? '—'}</td>
                  <td className="px-4 py-3 text-neutral-500">{new Date(row.submittedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <form action={toggleContacted}>
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="contacted" value={String(row.contacted)} />
                      <button
                        type="submit"
                        className={`rounded px-2 py-1 text-xs font-medium ${row.contacted ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}
                      >
                        {row.contacted ? 'Contacted' : 'New'}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3">
                    <form action={deleteEnquiry}>
                      <input type="hidden" name="id" value={row.id} />
                      <button type="submit" className="text-xs text-red-600 hover:underline">Delete</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
