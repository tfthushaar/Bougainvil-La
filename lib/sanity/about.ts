import type { Image } from 'sanity'
import { sanityClient, urlFor } from './client'
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
  const raw: RawAboutContent = await sanityClient.fetch(aboutContentQuery)
  return {
    ...raw,
    heroImage: raw.heroImage ? urlFor(raw.heroImage).width(1800).url() : null,
  }
}
