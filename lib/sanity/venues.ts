import type { Image, PortableTextBlock } from 'sanity'
import { sanityClient, urlFor } from './client'
import { venuesQuery, venueBySlugQuery, venueSlugsQuery } from './queries'
import { blocksToPlainParagraphs } from './portable-text'

export interface Venue {
  slug: string
  name: string
  tagline: string
  description: string[]
  seated: number
  floating: number
  cover: string | null
  highlights: string[]
  galleryWithDecor: string[]
  galleryWithoutDecor: string[]
}

interface RawVenue {
  slug: string
  name: string
  tagline: string
  description: PortableTextBlock[]
  seated: number
  floating: number
  cover: Image | null
  highlights: Image[] | null
  galleryWithDecor: Image[] | null
  galleryWithoutDecor: Image[] | null
}

function shapeVenue(raw: RawVenue): Venue {
  return {
    slug: raw.slug,
    name: raw.name,
    tagline: raw.tagline,
    description: blocksToPlainParagraphs(raw.description),
    seated: raw.seated,
    floating: raw.floating,
    cover: raw.cover ? urlFor(raw.cover).width(1600).url() : null,
    highlights: (raw.highlights ?? []).map((img) => urlFor(img).width(1600).url()),
    galleryWithDecor: (raw.galleryWithDecor ?? []).map((img) => urlFor(img).width(1200).url()),
    galleryWithoutDecor: (raw.galleryWithoutDecor ?? []).map((img) => urlFor(img).width(1200).url()),
  }
}

export async function getVenues(): Promise<Venue[]> {
  const raw: RawVenue[] = await sanityClient.fetch(venuesQuery)
  return raw.map(shapeVenue)
}

export async function getVenueBySlug(slug: string): Promise<Venue | undefined> {
  const raw: RawVenue | null = await sanityClient.fetch(venueBySlugQuery, { slug })
  return raw ? shapeVenue(raw) : undefined
}

export async function getVenueSlugs(): Promise<string[]> {
  return sanityClient.fetch(venueSlugsQuery)
}
