import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getLocationBySlug } from '@/lib/content/locations'
import { LocationPageContent } from '@/components/sections/LocationPageContent'

const SLUG = 'wedding-venue-near-jayanagar-bangalore'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLocationBySlug(SLUG)
  return { title: page?.metaTitle, description: page?.metaDescription }
}

export default async function Page() {
  const page = await getLocationBySlug(SLUG)
  if (!page) notFound()
  return <LocationPageContent page={page} />
}
