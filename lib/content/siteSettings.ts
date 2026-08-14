import { query } from '../db/turso-http'

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
  const rows = await query("SELECT * FROM site_settings WHERE id = 'singleton' LIMIT 1")
  const row = rows[0]
  if (!row) throw new Error('site_settings singleton row is missing — run the admin seed/migration script.')
  return {
    address: row.address as string,
    mapsUrl: row.maps_url as string,
    phone: row.phone as string,
    email: row.email as string,
    instagramHandle: row.instagram_handle as string,
    instagramUrl: row.instagram_url as string,
    footerTagline: row.footer_tagline as string,
    bookTourEmailSubject: row.book_tour_email_subject as string,
  }
}
