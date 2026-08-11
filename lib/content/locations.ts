import { eq } from 'drizzle-orm'
import { db } from '../db/client'
import { locationPages } from '../db/schema'
import type { ContentBlock } from './blocks'

export type LocationBlock = ContentBlock

export interface LocationPageDoc {
  slug: string
  metaTitle: string
  metaDescription: string
  h1: string
  subheading?: string
  blocks: LocationBlock[]
  /** True only for the South Bangalore hub page other locality pages link back to */
  isPillar?: boolean
}

function toDoc(row: typeof locationPages.$inferSelect): LocationPageDoc {
  return {
    slug: row.slug,
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
    h1: row.h1,
    subheading: row.subheading ?? undefined,
    blocks: row.blocks as ContentBlock[],
    isPillar: row.isPillar,
  }
}

export async function getLocations(): Promise<LocationPageDoc[]> {
  const rows = await db().select().from(locationPages)
  return rows.map(toDoc)
}

export async function getLocationBySlug(slug: string): Promise<LocationPageDoc | undefined> {
  const [row] = await db().select().from(locationPages).where(eq(locationPages.slug, slug)).limit(1)
  return row ? toDoc(row) : undefined
}

export async function getLocationSlugs(): Promise<string[]> {
  const rows = await db().select({ slug: locationPages.slug }).from(locationPages)
  return rows.map((r) => r.slug)
}
