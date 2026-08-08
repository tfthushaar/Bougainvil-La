import { sanityFetch } from './live'
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
  const { data } = await sanityFetch({ query: siteSettingsQuery })
  return data as SiteSettings
}
