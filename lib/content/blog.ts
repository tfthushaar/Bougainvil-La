import { query, parseJsonColumn } from '../db/turso-http'
import type { ContentBlock } from './blocks'

export interface BlogPost {
  slug: string
  title: string
  metaDescription: string
  targetKeyword?: string
  author: string
  authorRole: string
  publishedAt: string
  featuredImage: string | null
  excerpt: string
  blocks: ContentBlock[]
}

const TOUR_HREF = 'mailto:bougainvillaluxury@gmail.com?subject=Venue%20Tour%20Request'

// Drizzle's sqlite `mode: 'timestamp'` (used when this row was written)
// stores JS Date as whole seconds since epoch — raw SQL reads that back as
// a plain integer, so it needs the same *1000 conversion back to a Date.
function toPost(row: Record<string, unknown>): BlogPost {
  return {
    slug: row.slug as string,
    title: row.title as string,
    metaDescription: row.meta_description as string,
    targetKeyword: (row.target_keyword as string | null) ?? undefined,
    author: row.author as string,
    authorRole: row.author_role as string,
    publishedAt: new Date((row.published_at as number) * 1000).toISOString(),
    featuredImage: (row.featured_image as string | null) ?? null,
    excerpt: row.excerpt as string,
    blocks: parseJsonColumn<ContentBlock[]>(row.blocks, []),
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const rows = await query("SELECT * FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC")
  return rows.map(toPost)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const rows = await query('SELECT * FROM blog_posts WHERE slug = ? LIMIT 1', [slug])
  const row = rows[0]
  return row && row.status === 'published' ? toPost(row) : undefined
}

export async function getBlogSlugs(): Promise<string[]> {
  const rows = await query("SELECT slug FROM blog_posts WHERE status = 'published'")
  return rows.map((r) => r.slug as string)
}

export { TOUR_HREF }
