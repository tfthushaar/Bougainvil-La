import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Bougainvil'La Admin",
  description: "Bougainvil'La CMS admin — content, blog, and enquiries.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>{children}</body>
    </html>
  )
}
