import type { NextConfig } from 'next'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

const nextConfig: NextConfig = {
  trailingSlash: true,
  // www.bougainvilla.co.in is provisioned (wrangler.jsonc routes) so it
  // resolves at all, but bougainvilla.co.in (no www) is the one canonical
  // URL — redirect rather than serving the same content at both, which
  // search engines treat as duplicate content.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.bougainvilla.co.in' }],
        destination: 'https://bougainvilla.co.in/:path*',
        permanent: true,
      },
    ]
  },
}

// Lets `next dev` see Cloudflare bindings (KV/R2/D1/etc.) if any get added
// later — no-op today since wrangler.jsonc declares none yet.
initOpenNextCloudflareForDev()

export default nextConfig
