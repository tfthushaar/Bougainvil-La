import { query, parseJsonColumn } from '../db/turso-http'

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

function toVenue(row: Record<string, unknown>): Venue {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    tagline: row.tagline as string,
    subtitle: (row.subtitle as string | null) ?? null,
    description: parseJsonColumn<string[]>(row.description, []),
    seated: row.seated as number,
    floating: row.floating as number,
    cover: (row.cover as string | null) ?? null,
    highlights: parseJsonColumn<string[]>(row.highlights, []),
    galleryWithDecor: parseJsonColumn<string[]>(row.gallery_with_decor, []),
    galleryWithoutDecor: parseJsonColumn<string[]>(row.gallery_without_decor, []),
  }
}

export async function getVenues(): Promise<Venue[]> {
  const rows = await query('SELECT * FROM venues ORDER BY "order"')
  return rows.map(toVenue)
}

export async function getVenueBySlug(slug: string): Promise<Venue | undefined> {
  const rows = await query('SELECT * FROM venues WHERE slug = ? LIMIT 1', [slug])
  return rows[0] ? toVenue(rows[0]) : undefined
}

export async function getVenueSlugs(): Promise<string[]> {
  const rows = await query('SELECT slug FROM venues ORDER BY "order"')
  return rows.map((r) => r.slug as string)
}
