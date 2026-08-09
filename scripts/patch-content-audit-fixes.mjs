// One-off: fixes content gaps found by a word-for-word audit against
// Website.docx (2026-08-09) — restores missing copy and restructures
// homeContent's "Why Bougainvil'La" / "Highlights" fields to match the doc's
// actual section structure instead of the conflated version that was live.
// Usage: node --env-file=.env.local scripts/patch-content-audit-fixes.mjs
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

let keyCounter = 0
function key() {
  keyCounter += 1
  return `k${keyCounter}${Math.random().toString(36).slice(2, 8)}`
}

async function patchHomeContent() {
  const res = await client.patch('homeContent').set({
    founderParagraphs: [
      'Bougainvil’La is the vision of Lakshmi Keerthi, an award-winning luxury wedding planner with over two decades of experience in the wedding industry.',
      'After years of creating weddings and understanding what couples, families, planners and designers truly need from a venue, she envisioned Bougainvil’La as more than a beautiful setting. Every space has been thoughtfully created around how weddings actually unfold — from ceremonies and guest experiences to décor, dining, photography and celebrations.',
      'From our iconic Floating Mandap overlooking shimmering waters to beautifully landscaped gardens, luxurious hospitality, premium Luxury Accommodation, and versatile celebration spaces, Bougainvil’La is more than a venue—it is a complete wedding destination where every celebration unfolds effortlessly.',
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
    whyParagraphs: [
      'Some places simply host weddings. Others become part of the story.',
      'Every element at Bougainvil’La has been thoughtfully designed to make your celebrations feel effortless, immersive, and unforgettable—from iconic ceremony settings and beautifully connected venues to luxurious stays for your loved ones and picturesque surroundings at every turn.',
      'Whether you’re celebrating for a day or an entire weekend, every experience is elevated by exceptional spaces, warm hospitality, and timeless elegance.',
    ],
    whyCouplesChooseHeadline: 'Why Couples Choose Bougainvil’La',
    whyCouplesChoose: [
      'Destination wedding venue in Bangalore',
      'South Bangalore location',
      'Luxury stay for 100 guests',
      'Floating mandap',
      'In-house wedding planning support',
      'Vendor flexibility',
      'Parking',
      'Accessibility',
      'Weather-proof venue spaces',
    ],
    eventsWeHostHeadline: 'Events We Host',
    eventsWeHost: [
      'Wedding Ceremony',
      'Reception',
      'Engagement',
      'Mehendi',
      'Haldi',
      'Sangeet',
      'Anniversary',
      'Corporate Events',
      'Luxury Social Events',
    ],
    signatureExperiencesHeadline: 'Signature Experiences',
    signatureExperiences: [
      { _key: key(), title: 'Floating Mandap', desc: 'Exchange vows on our iconic mandap surrounded by shimmering waters.' },
      { _key: key(), title: 'Retractable Roof Celebration Space', desc: 'Celebrate outdoors with the confidence of year-round comfort.' },
      { _key: key(), title: 'Five Distinctive Celebration Spaces', desc: 'Every event enjoys its own unique atmosphere without ever leaving the venue.' },
      { _key: key(), title: 'Luxury Accommodation' },
      { _key: key(), title: 'Landscaped Gardens', desc: 'Beautiful walkways, mature trees, and endless greenery create stunning backdrops.' },
      { _key: key(), title: 'Picture-Perfect Corners', desc: 'Every turn offers a setting worthy of your wedding album.' },
      { _key: key(), title: 'Prime South Bengaluru Location', desc: 'A destination wedding experience that’s beautifully accessible.' },
      { _key: key(), title: 'Temple' },
    ],
  }).commit()
  console.log('patched homeContent', res._id)
}

async function patchVenueSubtitles() {
  const updates = [
    { id: 'venue-sumeera', subtitle: 'Luxury Outdoor Wedding Venue with a floating mandap concept in Bangalore' },
    { id: 'venue-floral-trellis', subtitle: 'Bengaluru’s First Retractable Roof Wedding Venue', tagline: 'Celebrate, Rain or Shine' },
    { id: 'venue-divine-bells', subtitle: 'Elegant Wedding Lawn in Bangalore' },
    { id: 'venue-ice-spice', subtitle: 'Semi Indoor Wedding Venue Bangalore' },
  ]
  for (const { id, ...fields } of updates) {
    const res = await client.patch(id).set(fields).commit()
    console.log('patched', id, fields, '->', res._id)
  }
}

async function main() {
  await patchHomeContent()
  await patchVenueSubtitles()
}

main().catch((e) => { console.error(e); process.exit(1) })
