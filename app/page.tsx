import { Hero } from '@/components/sections/Hero'
import { Intro } from '@/components/sections/Intro'
import { FounderTeaser } from '@/components/sections/FounderTeaser'
import { Highlights } from '@/components/sections/Highlights'
import { WhyBougainvilla } from '@/components/sections/WhyBougainvilla'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { LuxuryStaysPreview } from '@/components/sections/LuxuryStaysPreview'
import { LocationBlurb } from '@/components/sections/LocationBlurb'
import { EnquireForm } from '@/components/sections/EnquireForm'

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <FounderTeaser />
      <Highlights />
      <WhyBougainvilla />
      <GalleryPreview />
      <LuxuryStaysPreview />
      <LocationBlurb />
      <EnquireForm />
    </main>
  )
}
