import type { Image } from 'sanity'
import { urlFor } from './client'
import { sanityFetch } from './live'
import { homeContentQuery } from './queries'

export interface SignatureExperience {
  title: string
  desc?: string
}

export interface HomeContent {
  heroSubtitleLeft: string
  heroSubtitleRight: string
  heroEyebrow: string
  heroHeadline: string
  heroParagraph: string
  heroFeatureLine: string
  heroButtonsLabel: string
  introHeadline: string
  introParagraph: string
  founderEyebrow: string
  founderParagraphs: string[]
  founderQuote: string
  founderImage: string | null
  highlights: string[]
  whyHeadline: string
  whyParagraphs: string[]
  whyCouplesChooseHeadline: string
  whyCouplesChoose: string[]
  eventsWeHostHeadline: string
  eventsWeHost: string[]
  signatureExperiencesHeadline: string
  signatureExperiences: SignatureExperience[]
  locationBlurbHeadline: string
  locationBlurbQuote: string
}

interface RawHomeContent extends Omit<HomeContent, 'founderImage'> {
  founderImage: Image | null
}

export async function getHomeContent(): Promise<HomeContent> {
  const { data } = await sanityFetch({ query: homeContentQuery })
  const raw = data as RawHomeContent
  return {
    ...raw,
    founderImage: raw.founderImage ? urlFor(raw.founderImage).width(1200).url() : null,
  }
}
