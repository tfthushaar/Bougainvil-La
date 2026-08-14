import { query, parseJsonColumn } from '../db/turso-http'

export interface AboutContent {
  eyebrow: string
  introParagraphs: string[]
  heroImage: string | null
  founderName: string
  founderTitle: string
  founderBioParagraphs: string[]
  highlights: string[]
}

export async function getAboutContent(): Promise<AboutContent> {
  const rows = await query("SELECT * FROM about_content WHERE id = 'singleton' LIMIT 1")
  const row = rows[0]
  if (!row) throw new Error('about_content singleton row is missing — run the admin seed/migration script.')
  return {
    eyebrow: row.eyebrow as string,
    introParagraphs: parseJsonColumn<string[]>(row.intro_paragraphs, []),
    heroImage: (row.hero_image as string | null) ?? null,
    founderName: row.founder_name as string,
    founderTitle: row.founder_title as string,
    founderBioParagraphs: parseJsonColumn<string[]>(row.founder_bio_paragraphs, []),
    highlights: parseJsonColumn<string[]>(row.highlights, []),
  }
}
