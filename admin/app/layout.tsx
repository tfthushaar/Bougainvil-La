import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Bougainvil'La Admin",
  description: "Bougainvil'La CMS admin — content, blog, and enquiries.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
