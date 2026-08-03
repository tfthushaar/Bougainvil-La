import type { Metadata, Viewport } from 'next'
import { ebGaramond, raleway } from '@/lib/fonts'
import { SmoothScroll } from '@/components/SmoothScroll'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Bougainvil'La — Bangalore's Premier Destination Wedding Venue",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${raleway.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
