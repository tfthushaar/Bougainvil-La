import Link from 'next/link'
import { desc } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { blogPosts } from '@/lib/db/schema'

export default async function BlogPage() {
  let rows: (typeof blogPosts.$inferSelect)[] = []
  let error: string | null = null
  try {
    rows = await db().select().from(blogPosts).orderBy(desc(blogPosts.publishedAt))
  } catch {
    error = 'No database connection yet.'
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900">Blog</h1>
        <Link href="/blog/new" className="rounded bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-accent-dark)]">
          + New Post
        </Link>
      </div>

      {error ? (
        <p className="text-sm text-amber-700">{error}</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-neutral-500">No blog posts yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
          {rows.map((p, i) => (
            <Link
              key={p.id} href={`/blog/${p.id}`}
              className={`flex items-center justify-between px-4 py-3 text-sm hover:bg-neutral-50 ${i > 0 ? 'border-t border-black/5' : ''}`}
            >
              <span className="font-medium text-neutral-900">{p.title}</span>
              <span className="flex items-center gap-2 text-neutral-500">
                {new Date(p.publishedAt).toLocaleDateString()}
                <span className={`rounded px-1.5 py-0.5 text-xs ${p.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-600'}`}>
                  {p.status}
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
