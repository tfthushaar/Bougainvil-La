// One-time (re-runnable) migration: pushes lib/data/venues.ts,
// lib/data/locations.ts and lib/data/gallery-manifest.json into Sanity, and
// uploads the images they reference so the client's media library starts
// populated instead of empty.
//
// Every document uses a deterministic _id (e.g. "venue-sumeera") and is
// written with createOrReplace, so re-running this script after fixing a
// typo in the source data is safe — it won't create duplicates.
//
// Usage: node --env-file=.env.local scripts/migrate-content-to-sanity.mjs
// Requires SANITY_API_WRITE_TOKEN (Editor permissions) in .env.local.

import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not set.')
if (!token) throw new Error('SANITY_API_WRITE_TOKEN is not set — generate an Editor token at manage.sanity.io.')

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

// ---- tiny helpers ----------------------------------------------------

let keyCounter = 0
function key() {
  keyCounter += 1
  return `k${keyCounter}${Math.random().toString(36).slice(2, 8)}`
}

function textBlock(text, style = 'normal') {
  return {
    _type: 'block',
    _key: key(),
    style,
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
    markDefs: [],
  }
}

function listBlock(text) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
    markDefs: [],
  }
}

const assetCache = new Map()

async function uploadImage(publicPath) {
  if (assetCache.has(publicPath)) return assetCache.get(publicPath)
  const diskPath = join(ROOT, 'public', publicPath.replace(/^\//, ''))
  if (!existsSync(diskPath)) {
    console.warn(`  ! missing file, skipping: ${publicPath}`)
    return null
  }
  const buffer = readFileSync(diskPath)
  const filename = publicPath.split('/').pop()
  const asset = await client.assets.upload('image', buffer, { filename })
  const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  assetCache.set(publicPath, ref)
  console.log(`  uploaded ${publicPath}`)
  return ref
}

async function uploadImageWithKey(publicPath) {
  const img = await uploadImage(publicPath)
  if (!img) return null
  return { ...img, _key: key() }
}

// ---- venues ------------------------------------------------------------

async function migrateVenues() {
  const { VENUES } = await import('../lib/data/venues.ts')
  const manifest = JSON.parse(readFileSync(join(ROOT, 'lib/data/gallery-manifest.json'), 'utf-8'))

  for (const [i, v] of VENUES.entries()) {
    console.log(`\nVenue: ${v.name}`)
    const cover = v.cover ? await uploadImage(v.cover) : undefined
    const highlights = (await Promise.all(v.highlights.map(uploadImageWithKey))).filter(Boolean)

    const m = manifest[v.slug] ?? { 'with-decor': [], 'without-decor': [] }
    const galleryWithDecor = (
      await Promise.all(m['with-decor'].map((f) => uploadImageWithKey(`/images/venues/${v.slug}/with-decor/${f}`)))
    ).filter(Boolean)
    const galleryWithoutDecor = (
      await Promise.all(m['without-decor'].map((f) => uploadImageWithKey(`/images/venues/${v.slug}/without-decor/${f}`)))
    ).filter(Boolean)

    const doc = {
      _id: `venue-${v.slug}`,
      _type: 'venue',
      name: v.name,
      slug: { _type: 'slug', current: v.slug },
      tagline: v.tagline,
      description: v.description.map((t) => textBlock(t)),
      seated: v.seated,
      floating: v.floating,
      ...(cover ? { cover } : {}),
      highlights,
      galleryWithDecor,
      galleryWithoutDecor,
      order: i,
    }
    await client.createOrReplace(doc)
    console.log(`  saved venue-${v.slug}`)
  }
}

// ---- location pages ------------------------------------------------------

async function migrateLocations() {
  const { LOCATIONS } = await import('../lib/data/locations.ts')

  for (const l of LOCATIONS) {
    console.log(`\nLocation page: ${l.slug}`)
    const body = []
    for (const b of l.blocks) {
      if (b.type === 'heading') body.push(textBlock(b.text, 'h2'))
      else if (b.type === 'paragraph') body.push(textBlock(b.text))
      else if (b.type === 'list') body.push(...b.items.map(listBlock))
    }

    const doc = {
      _id: `locationPage-${l.slug}`,
      _type: 'locationPage',
      slug: { _type: 'slug', current: l.slug },
      metaTitle: l.metaTitle,
      metaDescription: l.metaDescription,
      h1: l.h1,
      ...(l.subheading ? { subheading: l.subheading } : {}),
      body,
      isPillar: !!l.isPillar,
    }
    await client.createOrReplace(doc)
    console.log(`  saved locationPage-${l.slug}`)
  }
}

async function main() {
  await migrateVenues()
  await migrateLocations()
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
