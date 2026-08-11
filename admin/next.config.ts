import type { NextConfig } from 'next'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const nextConfig: NextConfig = {
  // Without this, Next.js walks up looking for a workspace root and finds
  // the main site's package-lock.json one level up, which it warns about —
  // this is its own standalone app, not part of that workspace.
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
}

export default nextConfig
