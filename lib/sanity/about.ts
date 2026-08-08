import type { Image } from 'sanity'
import { urlFor } from './client'
import { sanityFetch } from './live'
import { aboutContentQuery } from './queries'

export interface AboutContent {
  eyebrow: string
  introParagraphs: string[]
  heroImage: string | null
  founderName: string
  founderTitle: string
  founderBioParagraphs: string[]
  highlights: string[]
}

interface RawAboutContent extends Omit<AboutContent, 'heroImage'> {
  heroImage: Image | null
}

export async function getAboutContent(): Promise<AboutContent> {
  const { data } = await sanityFetch({ query: aboutContentQuery })
  const raw = data as RawAboutContent
  return {
    ...raw,
    heroImage: raw.heroImage ? urlFor(raw.heroImage).width(1800).url() : null,
  }
}
