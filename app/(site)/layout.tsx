import type { Metadata, Viewport } from 'next'
import { ebGaramond, raleway } from '@/lib/fonts'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { getSiteSettings } from '@/lib/sanity/siteSettings'
import '../globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Bougainvil'La - Luxury Wedding Venue in Bangalore | Destination Wedding Venue | Bougainvil'La",
  description:
    "Bougainvil'La is one of the finest Luxury Wedding Venue Bangalore destinations, thoughtfully designed for couples who seek elegance, exclusivity, and unforgettable celebrations.",
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <html lang="en" className={`${ebGaramond.variable} ${raleway.variable}`}>
      <body>
        <SmoothScroll>
          <Navigation settings={settings} />
          {children}
          <Footer settings={settings} />
        </SmoothScroll>
      </body>
    </html>
  )
}
