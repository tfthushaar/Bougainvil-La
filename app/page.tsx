import { Hero } from '@/components/sections/Hero'
import { Intro } from '@/components/sections/Intro'
import { FounderTeaser } from '@/components/sections/FounderTeaser'
import { Highlights } from '@/components/sections/Highlights'
import { WhyBougainvilla } from '@/components/sections/WhyBougainvilla'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { LuxuryStaysPreview } from '@/components/sections/LuxuryStaysPreview'
import { LocationBlurb } from '@/components/sections/LocationBlurb'
import { EnquireForm } from '@/components/sections/EnquireForm'
import { getHomeContent } from '@/lib/sanity/home'

export default async function Home() {
  const home = await getHomeContent()

  return (
    <main>
      <Hero content={home} />
      <Intro content={home} />
      <FounderTeaser content={home} />
      <Highlights content={home} />
      <WhyBougainvilla content={home} />
      <GalleryPreview />
      <LuxuryStaysPreview />
      <LocationBlurb content={home} />
      <EnquireForm />
    </main>
  )
}
