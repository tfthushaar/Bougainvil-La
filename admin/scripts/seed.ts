// One-time (re-runnable) seed: reads the real current content straight from
// the public site's lib/content/*.ts (sibling folder, same repo — this is
// the one intentional cross-boundary import in this whole app, and it's a
// dev-only script, never part of any build) and inserts it into the new
// database, so the admin starts populated with real data instead of empty.
// Same shape as the old scripts/migrate-content-to-sanity.mjs this project
// used for its previous CMS migration.
//
// Usage: npm run db:seed   (needs DATABASE_URL in .env.local)
import 'dotenv/config'
import { db } from '../lib/db/client'
import {
  venues, roomTypes, faqItems, locationPages, blogPosts,
  homeContent, aboutContent, siteSettings,
} from '../lib/db/schema'

import { getVenues } from '../../lib/content/venues'
import { getRoomTypes } from '../../lib/content/roomTypes'
import { getFaqItems } from '../../lib/content/faq'
import { getLocations } from '../../lib/content/locations'
import { getBlogPosts } from '../../lib/content/blog'
import { getHomeContent } from '../../lib/content/home'
import { getAboutContent } from '../../lib/content/about'
import { getSiteSettings } from '../../lib/content/siteSettings'

async function seedVenues() {
  const rows = await getVenues()
  for (const [i, v] of rows.entries()) {
    await db().insert(venues).values({
      id: crypto.randomUUID(),
      slug: v.slug, name: v.name, tagline: v.tagline, subtitle: v.subtitle,
      description: v.description, seated: v.seated, floating: v.floating, cover: v.cover,
      highlights: v.highlights, galleryWithDecor: v.galleryWithDecor, galleryWithoutDecor: v.galleryWithoutDecor,
      order: i,
    })
  }
  console.log(`  seeded ${rows.length} venues`)
}

async function seedRoomTypes() {
  const rows = await getRoomTypes()
  for (const [i, r] of rows.entries()) {
    await db().insert(roomTypes).values({
      id: crypto.randomUUID(),
      name: r.name, description: r.description, photo: r.photo, quantity: r.quantity, capacity: r.capacity,
      order: i,
    })
  }
  console.log(`  seeded ${rows.length} room types`)
}

async function seedFaq() {
  const rows = await getFaqItems()
  for (const [i, item] of rows.entries()) {
    await db().insert(faqItems).values({ id: crypto.randomUUID(), question: item.question, answer: item.answer, order: i })
  }
  console.log(`  seeded ${rows.length} FAQ items`)
}

async function seedLocations() {
  const rows = await getLocations()
  for (const l of rows) {
    await db().insert(locationPages).values({
      id: crypto.randomUUID(),
      slug: l.slug, metaTitle: l.metaTitle, metaDescription: l.metaDescription, h1: l.h1,
      subheading: l.subheading ?? null, blocks: l.blocks, isPillar: !!l.isPillar,
    })
  }
  console.log(`  seeded ${rows.length} location pages`)
}

async function seedBlog() {
  const rows = await getBlogPosts()
  for (const p of rows) {
    await db().insert(blogPosts).values({
      id: crypto.randomUUID(),
      slug: p.slug, title: p.title, metaDescription: p.metaDescription, targetKeyword: p.targetKeyword ?? null,
      author: p.author, authorRole: p.authorRole, publishedAt: new Date(p.publishedAt),
      featuredImage: p.featuredImage, excerpt: p.excerpt, blocks: p.blocks, status: 'published',
    })
  }
  console.log(`  seeded ${rows.length} blog posts`)
}

async function seedHome() {
  const h = await getHomeContent()
  await db().insert(homeContent).values({ id: 'singleton', ...h }).onConflictDoUpdate({ target: homeContent.id, set: h })
  console.log('  seeded home content')
}

async function seedAbout() {
  const a = await getAboutContent()
  await db().insert(aboutContent).values({ id: 'singleton', ...a }).onConflictDoUpdate({ target: aboutContent.id, set: a })
  console.log('  seeded about content')
}

async function seedSiteSettings() {
  const s = await getSiteSettings()
  await db().insert(siteSettings).values({ id: 'singleton', ...s }).onConflictDoUpdate({ target: siteSettings.id, set: s })
  console.log('  seeded site settings')
}

async function main() {
  console.log('Seeding from ../lib/content/*.ts ...')
  await seedVenues()
  await seedRoomTypes()
  await seedFaq()
  await seedLocations()
  await seedBlog()
  await seedHome()
  await seedAbout()
  await seedSiteSettings()
  console.log('Done. Note: this appends — re-running will duplicate rows for id-per-row tables (venues, room types, FAQ, locations, blog). Clear those tables first if re-seeding from scratch.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
