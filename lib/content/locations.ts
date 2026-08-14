import { query, parseJsonColumn } from '../db/turso-http'
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

function toDoc(row: Record<string, unknown>): LocationPageDoc {
  return {
    slug: row.slug as string,
    metaTitle: row.meta_title as string,
    metaDescription: row.meta_description as string,
    h1: row.h1 as string,
    subheading: (row.subheading as string | null) ?? undefined,
    blocks: parseJsonColumn<ContentBlock[]>(row.blocks, []),
    isPillar: row.is_pillar === 1 || row.is_pillar === true,
  }
}

export async function getLocations(): Promise<LocationPageDoc[]> {
  const rows = await query('SELECT * FROM location_pages')
  return rows.map(toDoc)
}

export async function getLocationBySlug(slug: string): Promise<LocationPageDoc | undefined> {
  const rows = await query('SELECT * FROM location_pages WHERE slug = ? LIMIT 1', [slug])
  return rows[0] ? toDoc(rows[0]) : undefined
}

export async function getLocationSlugs(): Promise<string[]> {
  const rows = await query('SELECT slug FROM location_pages')
  return rows.map((r) => r.slug as string)
}
