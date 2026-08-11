import Link from 'next/link'
import { db } from '@/lib/db/client'
import { enquiries } from '@/lib/db/schema'

async function getStats() {
  try {
    const rows = await db().select().from(enquiries)
    return { connected: true as const, enquiryCount: rows.length, newCount: rows.filter((r) => !r.contacted).length }
  } catch {
    return { connected: false as const }
  }
}

export default async function DashboardHome() {
  const stats = await getStats()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">Dashboard</h1>

      {!stats.connected ? (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          No database connection yet — set <code className="rounded bg-amber-100 px-1">DATABASE_URL</code> once
          Netlify DB is provisioned. Every page here will work once that&rsquo;s in place.
        </div>
      ) : (
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Link href="/enquiries" className="rounded-lg border border-black/10 bg-white p-5 hover:border-[var(--color-accent)]">
            <p className="text-3xl font-semibold text-neutral-900">{stats.enquiryCount}</p>
            <p className="text-sm text-neutral-500">Total Enquiries</p>
          </Link>
          <Link href="/enquiries" className="rounded-lg border border-black/10 bg-white p-5 hover:border-[var(--color-accent)]">
            <p className="text-3xl font-semibold text-neutral-900">{stats.newCount}</p>
            <p className="text-sm text-neutral-500">Not Yet Contacted</p>
          </Link>
        </div>
      )}

      <p className="text-sm text-neutral-500">
        Use <strong>Create Blog</strong> to write a new post, or <strong>Edit Website</strong> in the
        sidebar to update any page — venues, room types, FAQ, location pages, the home and about
        pages, and site settings.
      </p>
    </div>
  )
}
