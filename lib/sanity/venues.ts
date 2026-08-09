import type { Image, PortableTextBlock } from 'sanity'
import { sanityClient, urlFor } from './client'
import { sanityFetch } from './live'
import { venuesQuery, venueBySlugQuery, venueSlugsQuery } from './queries'
import { blocksToPlainParagraphs } from './portable-text'

export interface Venue {
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

interface RawVenue {
  slug: string
  name: string
  tagline: string
  subtitle: string | null
  description: PortableTextBlock[]
  seated: number
  floating: number
  cover: Image | null
  highlights: Image[] | null
  galleryWithDecor: Image[] | null
  galleryWithoutDecor: Image[] | null
}

function dedupe(urls: string[]): string[] {
  return Array.from(new Set(urls))
}

function shapeVenue(raw: RawVenue): Venue {
  return {
    slug: raw.slug,
    name: raw.name,
    tagline: raw.tagline,
    subtitle: raw.subtitle ?? null,
    description: blocksToPlainParagraphs(raw.description),
    seated: raw.seated,
    floating: raw.floating,
    cover: raw.cover ? urlFor(raw.cover).width(1600).url() : null,
    highlights: dedupe((raw.highlights ?? []).map((img) => urlFor(img).width(1600).url())),
    galleryWithDecor: dedupe((raw.galleryWithDecor ?? []).map((img) => urlFor(img).width(1200).url())),
    galleryWithoutDecor: dedupe((raw.galleryWithoutDecor ?? []).map((img) => urlFor(img).width(1200).url())),
  }
}

export async function getVenues(): Promise<Venue[]> {
  const { data } = await sanityFetch({ query: venuesQuery })
  return (data as RawVenue[]).map(shapeVenue)
}

export async function getVenueBySlug(slug: string): Promise<Venue | undefined> {
  const { data } = await sanityFetch({ query: venueBySlugQuery, params: { slug } })
  const raw = data as RawVenue | null
  return raw ? shapeVenue(raw) : undefined
}

// Used only from generateStaticParams, which runs at build time outside any
// per-request scope — sanityFetch calls draftMode() internally and throws
// there, so this one intentionally stays on the plain (non-live) client.
export async function getVenueSlugs(): Promise<string[]> {
  return sanityClient.fetch(venueSlugsQuery)
}
