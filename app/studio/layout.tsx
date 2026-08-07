import type { Metadata, Viewport } from 'next'
import '../globals.css'

// A separate root layout (Next.js "multiple root layouts" pattern) so the
// Studio renders full-screen with none of the main site's Navigation,
// Footer, or Lenis smooth-scroll wrapper — Sanity Studio manages its own
// full-viewport UI and shouldn't be nested inside the site's chrome.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Studio | Bougainvil'La",
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ height: '100vh', overflow: 'hidden' }}>{children}</body>
    </html>
  )
}
