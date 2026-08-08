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

// Sanity's asset API rate-limits in-flight uploads (429 above ~25 at once) —
// this venue set alone uploads 150+ images, so run them a few at a time
// instead of Promise.all-ing the whole batch.
async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length)
  let next = 0
  async function worker() {
    while (next < items.length) {
      const i = next++
      results[i] = await fn(items[i], i)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

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
    const highlights = (await mapWithConcurrency(v.highlights, 5, uploadImageWithKey)).filter(Boolean)

    const m = manifest[v.slug] ?? { 'with-decor': [], 'without-decor': [] }
    const galleryWithDecor = (
      await mapWithConcurrency(m['with-decor'], 5, (f) => uploadImageWithKey(`/images/venues/${v.slug}/with-decor/${f}`))
    ).filter(Boolean)
    const galleryWithoutDecor = (
      await mapWithConcurrency(m['without-decor'], 5, (f) => uploadImageWithKey(`/images/venues/${v.slug}/without-decor/${f}`))
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

// ---- home page content (singleton) ----------------------------------------

async function migrateHomeContent() {
  console.log('\nHome content')
  const founderImage = await uploadImage('/images/venues/sumeera/with-decor/001.webp')

  const doc = {
    _id: 'homeContent',
    _type: 'homeContent',
    heroSubtitleLeft: 'Destination Wedding Venue',
    heroSubtitleRight: 'Bangalore, India',
    heroEyebrow: 'The Venue',
    heroHeadline: 'Jaipur-inspired elegance meets modern luxury.',
    heroParagraph:
      'Bangalore’s premier destination wedding venue — featuring an iconic floating mandap, stunning semi-indoor and outdoor venues, and a fully retractable rain-proof roof. Every celebration is crafted to be timeless, unforgettable, and weather-ready.',
    heroFeatureLine: 'Floating Mandap · Indoor & Outdoor · Rain-Proof Roof',
    heroButtonsLabel: 'Ready When You Are',

    introHeadline: 'Your Perfect Luxury Wedding Begins Here',
    introParagraph:
      'If you’re searching for the perfect Luxury Wedding Venue Bangalore, Bougainvil’La offers an unmatched destination wedding experience in South Bangalore. Designed to host weddings, receptions, engagements, mehendi, haldi, sangeet, anniversaries and luxury celebrations, every space has been thoughtfully created to deliver timeless elegance.',

    founderEyebrow: 'Designed Through the Eyes of a Wedding Planner',
    founderParagraphs: [
      'Bougainvil’La is the vision of Lakshmi Keerthi, an award-winning luxury wedding planner with over two decades of experience in the wedding industry.',
      'After years of creating weddings and understanding what couples, families, planners and designers truly need from a venue, she envisioned Bougainvil’La as more than a beautiful setting. Every space has been thoughtfully created around how weddings actually unfold — from ceremonies and guest experiences to décor, dining, photography and celebrations.',
    ],
    founderQuote: 'A venue imagined by a wedding planner. Created for unforgettable weddings.',
    ...(founderImage ? { founderImage } : {}),

    highlights: [
      { _key: key(), title: 'Floating Mandap', desc: 'Exchange vows on our iconic mandap surrounded by shimmering waters.' },
      { _key: key(), title: 'Retractable Roof Celebration Space', desc: 'Bengaluru’s first — celebrate outdoors with year-round comfort, rain or shine.' },
      { _key: key(), title: 'Five Distinctive Celebration Spaces', desc: 'Every event enjoys its own unique atmosphere without ever leaving the venue.' },
      { _key: key(), title: 'Luxury Accommodation', desc: '18 elegant rooms hosting up to 100 guests overnight.' },
      { _key: key(), title: 'Landscaped Gardens', desc: 'Beautiful walkways, mature trees, and endless greenery create stunning backdrops.' },
      { _key: key(), title: 'Picture-Perfect Corners', desc: 'Every turn offers a setting worthy of your wedding album.' },
      { _key: key(), title: 'Prime South Bengaluru Location', desc: 'A destination wedding experience that’s beautifully accessible.' },
      { _key: key(), title: 'Temple', desc: 'A dedicated on-site temple for traditional rites and ceremonies.' },
      { _key: key(), title: 'Capacity for up to 1,000 Guests', desc: 'Grand enough for the biggest celebrations, intimate enough for the smallest.' },
      { _key: key(), title: 'Parking for Over 200 Vehicles', desc: 'Effortless arrival and departure for every guest.' },
    ],

    whyHeadline: 'Thoughtfully Designed for Unforgettable Celebrations',
    whyParagraphs: [
      'Some places simply host weddings. Others become part of the story. Couples choose Bougainvil’La as their destination wedding venue in Bangalore for its coveted South Bangalore location, luxury stays for 100 guests, iconic floating mandap, in-house wedding planning support, complete vendor flexibility, ample parking, easy accessibility, and fully weather-proof venue spaces.',
      'From wedding ceremonies, receptions and engagements to mehendi, haldi, sangeet, anniversaries, corporate events and luxury social gatherings — every kind of celebration finds its place here.',
    ],

    locationBlurbHeadline: 'A Luxury Wedding Destination in South Bangalore',
    locationBlurbQuote:
      'Located near Bolare on Kanakapura Road, Bougainvil’La is conveniently accessible from JP Nagar, Basavanagudi, Banashankari, Jayanagar, Bannerghatta Road, Nice Road and neighbourhoods across South Bengaluru.',
  }

  await client.createOrReplace(doc)
  console.log('  saved homeContent')
}

// ---- about page (singleton) ------------------------------------------------

async function migrateAboutContent() {
  console.log('\nAbout content')
  const heroImage = await uploadImage('/images/about/about-us.webp')

  const doc = {
    _id: 'aboutContent',
    _type: 'aboutContent',
    eyebrow: 'A Destination for Luxury Wedding',
    introParagraphs: [
      'At Bougainvil’La, we believe a wedding is far more than a single event—it is a collection of unforgettable moments that deserve extraordinary surroundings.',
      'As one of the most sought-after Luxury Wedding Venue Bangalore destinations, Bougainvil’La has been thoughtfully planned to host every chapter of your celebration. Inspired by timeless Jaipur architecture and surrounded by lush tropical landscapes, our Wedding Venue South Bangalore features Bengaluru’s iconic Floating Mandap, India’s first Retractable Roof Wedding Venue, elegant indoor and outdoor celebration spaces, and premium Luxury Accommodation—all seamlessly connected within one spectacular destination.',
    ],
    ...(heroImage ? { heroImage } : {}),
    founderName: 'Lakshmi Keerthi',
    founderTitle: 'Founder, Bougainvil’La | Luxury Wedding Planner',
    founderBioParagraphs: [
      'Bougainvil’La was born from a simple belief — a wedding venue should do more than host a celebration. It should become part of the story.',
      'Founded by Lakshmi Keerthi, an award-winning luxury wedding planner with over two decades of experience in the wedding industry, Bougainvil’La brings together years of understanding weddings from the inside — the emotions of families, the expectations of couples, the complexities of execution, and the importance of creating spaces that are both beautiful and functional.',
      'A Computer Science Engineer and an alumna of IIM Bangalore, Lakshmi’s professional journey began in the corporate world, where she worked extensively in HR and Leadership roles before following her passion into the world of weddings.',
      'Over the years, she has planned and curated luxury and destination weddings, working closely with couples, families, designers, artists and wedding professionals.',
      'That experience shaped the philosophy behind Bougainvil’La.',
      'Rather than creating another conventional wedding hall, the vision was to build a venue through the eyes of a wedding planner — where every space considers how a wedding actually unfolds.',
      'From guest movement and ceremony layouts to décor possibilities, dining experiences, photography backdrops and the transition between multiple wedding functions, every detail has been envisioned around the experience of celebrating.',
      'The result is Bougainvil’La — a collection of distinctive semi indoor, outdoor, retractable roof feature and poolside spaces where every celebration can have its own identity.',
      'For Lakshmi, luxury is not simply about grandeur.',
      'It is about thoughtful details, effortless experiences and creating moments that remain with families long after the celebration is over.',
      'That philosophy continues to guide every experience at Bougainvil’La.',
      'From intimate ceremonies by the water to grand receptions beneath the stars, every celebration is designed to feel elegant, effortless, and unforgettable.',
      'Bougainvil’La is guided by an experienced Board of Directors, Chairman, and executive leadership team who collectively oversee the organisation and its operations.',
      'Lakshmi Keerthi continues to spearhead La’kiru – designing and executing weddings across India while also being associated with Bougainvil’La as its in-house wedding planner. Clients may choose to engage her services for their celebrations; however, this is entirely optional.',
      'Bougainvil’La offers complete creative freedom, allowing every client to appoint a wedding planner and decorator of their choice. Our team works collaboratively with external professionals to ensure a seamless experience while bringing each couple’s unique vision to life.',
    ],
    highlights: [
      'Capacity for up to 1,000 Guests',
      '5 Distinctive Celebration Spaces',
      'Luxury Accommodation for 100 Guests',
      '18 Elegant Guest Rooms',
      'Iconic Floating Mandap',
      'Temple',
      'Bengaluru’s First Retractable Roof Celebration Space',
      'Parking for Over 200 Vehicles',
      'Destination Wedding Experience in South Bengaluru',
    ],
  }

  await client.createOrReplace(doc)
  console.log('  saved aboutContent')
}

// ---- luxury stays room types ------------------------------------------------

async function migrateRoomTypes() {
  console.log('\nRoom types')
  // Room photos were unusable in an earlier pass because of a since-fixed
  // conversion bug (ffmpeg was grabbing a single 512x512 tile from Apple's
  // grid-tiled HEIC photos instead of the reconstructed full image — see
  // scripts/prepare-images.py). Real, good photos exist for every room type
  // except dormitories, which genuinely have none supplied.
  const rooms = [
    {
      slug: 'bridal-suite',
      name: 'The Bridal Suite',
      quantity: 1,
      capacity: 'Up to 3 Guests',
      photo: '/images/rooms/bridal-suite/003.webp',
      description:
        'A beautifully designed private suite offering elegant interiors, generous natural light, and a luxurious setting for bridal preparations, quiet moments, and timeless photographs before the celebrations begin.',
    },
    {
      slug: 'grooms-suite',
      name: 'The Groom’s Suite',
      quantity: 1,
      capacity: 'Up to 3 Guests',
      photo: '/images/rooms/grooms-suite/002.webp',
      description:
        'Sophisticated and spacious, the groom’s suite provides the perfect place to prepare, relax, and celebrate alongside family and friends before every event.',
    },
    {
      slug: 'luxury-family-rooms',
      name: 'Luxury Family Rooms',
      quantity: 14,
      capacity: 'Up to 5 Guests Each',
      photo: '/images/rooms/family-rooms/001.webp',
      description:
        'Our spacious family rooms have been thoughtfully designed to keep loved ones together while offering exceptional comfort throughout the celebrations. Beautifully furnished with modern amenities, they create a welcoming retreat between every event.',
    },
    {
      slug: 'dormitories',
      name: 'Dormitory Accommodation',
      quantity: 2,
      capacity: 'Up to 12 Guests Each',
      photo: null,
      description:
        'Perfect for larger groups of friends and extended family, our dormitory offers generous space, comfort, and convenience while maintaining the same high standard of hospitality found throughout Bougainvil’La.',
    },
  ]

  for (const [i, r] of rooms.entries()) {
    const photo = r.photo ? await uploadImage(r.photo) : undefined
    const doc = {
      _id: `roomType-${r.slug}`,
      _type: 'roomType',
      name: r.name,
      description: r.description,
      quantity: r.quantity,
      capacity: r.capacity,
      ...(photo ? { photo } : {}),
      order: i,
    }
    await client.createOrReplace(doc)
    console.log(`  saved roomType-${r.slug}`)
  }
}

// ---- FAQ items ------------------------------------------------

async function migrateFaqItems() {
  console.log('\nFAQ items')
  const faqs = [
    {
      slug: 'guests',
      question: 'How many guests can Bougainvil’La accommodate?',
      answer: 'Our celebration spaces can comfortably host weddings and events for up to 1,000 guests.',
    },
    {
      slug: 'accommodation',
      question: 'Do you offer accommodation?',
      answer:
        'Yes. Bougainvil’La features 18 luxurious rooms, including exclusive bridal and groom suites, spacious family rooms, and dormitory accommodation for up to 100 guests.',
    },
    {
      slug: 'functions',
      question: 'Can all our wedding functions be hosted here?',
      answer:
        'Absolutely. Our five distinctive celebration spaces are designed to host every event—from intimate ceremonies and vibrant mehendis to grand receptions and elegant dining experiences.',
    },
    {
      slug: 'parking',
      question: 'Is parking available?',
      answer: 'Yes. We offer ample parking for over 200 vehicles.',
    },
    {
      slug: 'seasons',
      question: 'Is the venue suitable during all seasons?',
      answer:
        'Yes. Floral Trellis features Bengaluru’s first retractable roof celebration space, allowing you to enjoy the beauty of an outdoor celebration throughout the year.',
    },
  ]

  for (const [i, f] of faqs.entries()) {
    const doc = {
      _id: `faqItem-${f.slug}`,
      _type: 'faqItem',
      question: f.question,
      answer: f.answer,
      order: i,
    }
    await client.createOrReplace(doc)
    console.log(`  saved faqItem-${f.slug}`)
  }
}

// ---- site settings (singleton) ------------------------------------------------

async function migrateSiteSettings() {
  console.log('\nSite settings')
  const doc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    address: 'Near Bolare, K.G. Gollarapalya, Kanakapura Road, Bengaluru, Karnataka – 562109',
    phone: '+91 86606 54160',
    email: 'bougainvillaluxury@gmail.com',
    instagramHandle: '@bougainvillaweddingvenue',
    instagramUrl: 'https://www.instagram.com/bougainvillaweddingvenue/',
    footerTagline: 'Celebrate Luxury. Create Memories That Last Forever.',
    bookTourEmailSubject: 'Venue Tour Request',
  }
  await client.createOrReplace(doc)
  console.log('  saved siteSettings')
}

async function main() {
  await migrateVenues()
  await migrateLocations()
  await migrateHomeContent()
  await migrateAboutContent()
  await migrateRoomTypes()
  await migrateFaqItems()
  await migrateSiteSettings()
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
