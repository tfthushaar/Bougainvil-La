import type { NextConfig } from 'next'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

const nextConfig: NextConfig = {
  trailingSlash: true,
  // The www -> apex redirect lives in middleware.ts, not here — see that
  // file for why.
}

// Lets `next dev` see Cloudflare bindings (KV/R2/D1/etc.) if any get added
// later — no-op today since wrangler.jsonc declares none yet.
initOpenNextCloudflareForDev()

export default nextConfig
