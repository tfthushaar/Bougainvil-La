import { eq } from 'drizzle-orm'
import { db } from '../db/client'
import { homeContent } from '../db/schema'

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

export async function getHomeContent(): Promise<HomeContent> {
  const [row] = await db().select().from(homeContent).where(eq(homeContent.id, 'singleton')).limit(1)
  if (!row) throw new Error('home_content singleton row is missing — run the admin seed script.')
  const { id: _id, ...rest } = row
  return { ...rest, signatureExperiences: row.signatureExperiences as SignatureExperience[] }
}
