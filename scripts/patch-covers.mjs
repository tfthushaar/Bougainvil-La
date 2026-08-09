// One-off: swap Sumeera's and Margarita's venue.cover to the portrait picks
// now used in lib/data/venues.ts (fixes a grid-stretch gap on the home page
// Gallery preview when covers mixed landscape/portrait aspect ratios).
// Usage: node --env-file=.env.local scripts/patch-covers.mjs
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

async function uploadImage(publicPath) {
  const diskPath = join(ROOT, 'public', publicPath.replace(/^\//, ''))
  const buffer = readFileSync(diskPath)
  const filename = publicPath.split('/').pop()
  const asset = await client.assets.upload('image', buffer, { filename })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function main() {
  const updates = [
    { slug: 'sumeera', path: '/images/venues/sumeera/with-decor/003.webp' },
    { slug: 'margarita', path: '/images/venues/margarita/with-decor/005.webp' },
  ]
  for (const { slug, path } of updates) {
    const cover = await uploadImage(path)
    const res = await client.patch(`venue-${slug}`).set({ cover }).commit()
    console.log(`patched venue-${slug} cover ->`, path, res._id)
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
