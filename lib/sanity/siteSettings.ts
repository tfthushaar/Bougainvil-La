import { sanityClient } from './client'
import { siteSettingsQuery } from './queries'

export interface SiteSettings {
  address: string
  phone: string
  email: string
  instagramHandle: string
  instagramUrl: string
  footerTagline: string
  bookTourEmailSubject: string
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return sanityClient.fetch(siteSettingsQuery)
}
