import type { PortableTextBlock } from 'sanity'
import { sanityClient } from './client'
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
  return sanityClient.fetch(locationPagesQuery)
}

export async function getLocationBySlug(slug: string): Promise<LocationPageDoc | undefined> {
  const raw: LocationPageDoc | null = await sanityClient.fetch(locationPageBySlugQuery, { slug })
  return raw ?? undefined
}
