import type { Metadata, Viewport } from 'next'
import { ebGaramond, raleway } from '@/lib/fonts'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { getSiteSettings } from '@/lib/content/siteSettings'
import '../globals.css'

// Every page here reads live content from the database on every request
// (see lib/db/client.ts) — there's no incremental/tag cache backend wired
// up on this Cloudflare deployment to safely invalidate a CDN-level cache
// when that content changes. Without this, Next still classified these
// routes as static (nothing in them uses cookies/headers/searchParams) and
// attached a year-long `s-maxage`, which Cloudflare's edge network can
// actually hold onto — a real incident: a stale cached page kept getting
// served to some visitors long after the underlying bug was fixed and
// every direct/uncached request confirmed healthy. Forcing dynamic
// rendering makes Next emit no-store cache headers instead, so no edge
// node can ever cache a response that then goes stale.
export const dynamic = 'force-dynamic'

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
      </body>
    </html>
  )
}
