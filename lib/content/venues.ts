import { asc, eq } from 'drizzle-orm'
import { db } from '../db/client'
import { venues } from '../db/schema'

export interface Venue {
  id: string
  slug: string
  name: string
  tagline: string
  subtitle: string | null
  description: string[]
  seated: number
  floating: number
  cover: string | null
  highlights: string[]
  galleryWithDecor: string[]
  galleryWithoutDecor: string[]
}

export async function getVenues(): Promise<Venue[]> {
  return db().select().from(venues).orderBy(asc(venues.order))
}

export async function getVenueBySlug(slug: string): Promise<Venue | undefined> {
  const [row] = await db().select().from(venues).where(eq(venues.slug, slug)).limit(1)
  return row
}

export async function getVenueSlugs(): Promise<string[]> {
  const rows = await db().select({ slug: venues.slug }).from(venues).orderBy(asc(venues.order))
  return rows.map((r) => r.slug)
}
