import type { Metadata, Viewport } from 'next'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { ebGaramond, raleway } from '@/lib/fonts'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { getSiteSettings } from '@/lib/sanity/siteSettings'
import { SanityLive } from '@/lib/sanity/live'
import '../globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bougainvilla.co.in'),
  title: "Bougainvil'La - Luxury Wedding Venue in Bangalore | Destination Wedding Venue | Bougainvil'La",
  description:
    "Bougainvil'La is one of the finest Luxury Wedding Venue Bangalore destinations, thoughtfully designed for couples who seek elegance, exclusivity, and unforgettable celebrations.",
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <html lang="en" className={`${ebGaramond.variable} ${raleway.variable}`}>
      <body>
        <SmoothScroll>
          <Navigation settings={settings} />
          {children}
          <Footer settings={settings} />
        </SmoothScroll>
        <StickyMobileCTA settings={settings} />
        <WhatsAppButton settings={settings} />
        <SanityLive />
        {/* Only ever rendered for an authenticated Studio preview session
            (draft mode) — normal visitors never get this overlay script. */}
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  )
}
