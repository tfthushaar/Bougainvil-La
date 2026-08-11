import { eq } from 'drizzle-orm'
import { db } from '../db/client'
import { aboutContent } from '../db/schema'

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
  const [row] = await db().select().from(aboutContent).where(eq(aboutContent.id, 'singleton')).limit(1)
  if (!row) throw new Error('about_content singleton row is missing — run the admin seed script.')
  const { id: _id, ...rest } = row
  return rest
}
