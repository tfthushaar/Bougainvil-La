import { Hero } from '@/components/sections/Hero'
import { Intro } from '@/components/sections/Intro'
import { FounderTeaser } from '@/components/sections/FounderTeaser'
import { Highlights } from '@/components/sections/Highlights'
import { CelebrationSpacesHome } from '@/components/sections/CelebrationSpacesHome'
import { WhyBougainvilla } from '@/components/sections/WhyBougainvilla'
import { SignatureExperiences } from '@/components/sections/SignatureExperiences'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { LuxuryStaysPreview } from '@/components/sections/LuxuryStaysPreview'
import { LocationBlurb } from '@/components/sections/LocationBlurb'
import { EnquireForm } from '@/components/sections/EnquireForm'
import { Reveal } from '@/components/Reveal'
import { getHomeContent } from '@/lib/sanity/home'

export default async function Home() {
  const home = await getHomeContent()

  return (
    <main>
      <Hero content={home} />
      <Reveal><Intro content={home} /></Reveal>
      <Reveal><FounderTeaser content={home} /></Reveal>
      <Reveal><Highlights content={home} /></Reveal>
      <Reveal><CelebrationSpacesHome /></Reveal>
      <Reveal><WhyBougainvilla content={home} /></Reveal>
      <Reveal><SignatureExperiences content={home} /></Reveal>
      <Reveal><EnquireForm /></Reveal>
      <Reveal><GalleryPreview /></Reveal>
      <Reveal><LuxuryStaysPreview /></Reveal>
      <Reveal><LocationBlurb content={home} /></Reveal>
    </main>
  )
}
