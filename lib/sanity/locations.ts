import type { PortableTextBlock } from 'sanity'
import { sanityClient } from './client'
import { sanityFetch } from './live'
import { locationPagesQuery, locationPageBySlugQuery } from './queries'

export interface LocationPageDoc {
  slug: string
  metaTitle: string
  metaDescription: string
  h1: string
  subheading?: string
  body: PortableTextBlock[]
  isPillar?: boolean
}

export async function getLocations(): Promise<LocationPageDoc[]> {
  const { data } = await sanityFetch({ query: locationPagesQuery })
  return data as LocationPageDoc[]
}

export async function getLocationBySlug(slug: string): Promise<LocationPageDoc | undefined> {
  const { data } = await sanityFetch({ query: locationPageBySlugQuery, params: { slug } })
  const raw = data as LocationPageDoc | null
  return raw ?? undefined
}

// Used from app/sitemap.ts, which runs at build time outside any per-request
// scope — sanityFetch calls draftMode() internally and throws there, so
// this one intentionally stays on the plain (non-live) client, same as
// getVenueSlugs() in venues.ts.
export async function getLocationSlugs(): Promise<string[]> {
  return sanityClient.fetch(`*[_type == "locationPage"].slug.current`)
}
