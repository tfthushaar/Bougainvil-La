import { eq } from 'drizzle-orm'
import { db } from '../db/client'
import { siteSettings } from '../db/schema'

export interface SiteSettings {
  address: string
  mapsUrl: string
  phone: string
  email: string
  instagramHandle: string
  instagramUrl: string
  footerTagline: string
  bookTourEmailSubject: string
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const [row] = await db().select().from(siteSettings).where(eq(siteSettings.id, 'singleton')).limit(1)
  if (!row) throw new Error('site_settings singleton row is missing — run the admin seed script.')
  const { id: _id, ...rest } = row
  return rest
}
