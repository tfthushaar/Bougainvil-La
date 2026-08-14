import { query, parseJsonColumn } from '../db/turso-http'

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
  const rows = await query("SELECT * FROM home_content WHERE id = 'singleton' LIMIT 1")
  const row = rows[0]
  if (!row) throw new Error('home_content singleton row is missing — run the admin seed/migration script.')
  return {
    heroSubtitleLeft: row.hero_subtitle_left as string,
    heroSubtitleRight: row.hero_subtitle_right as string,
    heroEyebrow: row.hero_eyebrow as string,
    heroHeadline: row.hero_headline as string,
    heroParagraph: row.hero_paragraph as string,
    heroFeatureLine: row.hero_feature_line as string,
    heroButtonsLabel: row.hero_buttons_label as string,
    introHeadline: row.intro_headline as string,
    introParagraph: row.intro_paragraph as string,
    founderEyebrow: row.founder_eyebrow as string,
    founderParagraphs: parseJsonColumn<string[]>(row.founder_paragraphs, []),
    founderQuote: row.founder_quote as string,
    founderImage: (row.founder_image as string | null) ?? null,
    highlights: parseJsonColumn<string[]>(row.highlights, []),
    whyHeadline: row.why_headline as string,
    whyParagraphs: parseJsonColumn<string[]>(row.why_paragraphs, []),
    whyCouplesChooseHeadline: row.why_couples_choose_headline as string,
    whyCouplesChoose: parseJsonColumn<string[]>(row.why_couples_choose, []),
    eventsWeHostHeadline: row.events_we_host_headline as string,
    eventsWeHost: parseJsonColumn<string[]>(row.events_we_host, []),
    signatureExperiencesHeadline: row.signature_experiences_headline as string,
    signatureExperiences: parseJsonColumn<SignatureExperience[]>(row.signature_experiences, []),
    locationBlurbHeadline: row.location_blurb_headline as string,
    locationBlurbQuote: row.location_blurb_quote as string,
  }
}
