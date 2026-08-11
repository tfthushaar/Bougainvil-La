import { desc, eq } from 'drizzle-orm'
import { db } from '../db/client'
import { blogPosts } from '../db/schema'
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

function toPost(row: typeof blogPosts.$inferSelect): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    metaDescription: row.metaDescription,
    targetKeyword: row.targetKeyword ?? undefined,
    author: row.author,
    authorRole: row.authorRole,
    publishedAt: row.publishedAt.toISOString(),
    featuredImage: row.featuredImage,
    excerpt: row.excerpt,
    blocks: row.blocks as ContentBlock[],
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const rows = await db().select().from(blogPosts).where(eq(blogPosts.status, 'published')).orderBy(desc(blogPosts.publishedAt))
  return rows.map(toPost)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const [row] = await db().select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1)
  return row && row.status === 'published' ? toPost(row) : undefined
}

export async function getBlogSlugs(): Promise<string[]> {
  const rows = await db().select({ slug: blogPosts.slug }).from(blogPosts).where(eq(blogPosts.status, 'published'))
  return rows.map((r) => r.slug)
}

export { TOUR_HREF }
