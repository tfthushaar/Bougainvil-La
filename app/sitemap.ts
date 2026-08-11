import type { MetadataRoute } from 'next'
import { getVenueSlugs } from '@/lib/content/venues'
import { getLocationSlugs } from '@/lib/content/locations'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bougainvilla.co.in'

const STATIC_ROUTES = [
  '', 'about', 'venues', 'luxury-stays', 'gallery', 'testimonials', 'faq', 'contact',
  'luxury-wedding-venue-south-bangalore',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [venueSlugs, locationSlugs] = await Promise.all([getVenueSlugs(), getLocationSlugs()])

  const staticEntries = STATIC_ROUTES.map((slug) => ({
    url: `${SITE_URL}/${slug}${slug ? '/' : ''}`,
    lastModified: new Date(),
  }))

  const venueEntries = venueSlugs.map((slug) => ({
    url: `${SITE_URL}/venues/${slug}/`,
    lastModified: new Date(),
  }))

  // Location slugs already include "luxury-wedding-venue-south-bangalore"
  // (the pillar page), so drop it here to avoid a duplicate — it's already
  // in STATIC_ROUTES.
  const locationEntries = locationSlugs
    .filter((slug) => slug !== 'luxury-wedding-venue-south-bangalore')
    .map((slug) => ({ url: `${SITE_URL}/${slug}/`, lastModified: new Date() }))

  return [...staticEntries, ...venueEntries, ...locationEntries]
}
