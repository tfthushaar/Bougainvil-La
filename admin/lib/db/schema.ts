import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

// One table per content area in the public site's lib/content/*.ts — field
// names/types carried over 1:1 so the eventual public-site fetch is a
// straight mapping, not a translation layer.
//
// SQLite/libSQL (Turso) has no native array, boolean, or timestamp type —
// arrays and jsonb columns both become `text(..., { mode: 'json' })`
// (Drizzle serializes/deserializes automatically), booleans become
// `integer(..., { mode: 'boolean' })` (0/1 under the hood), and timestamps
// become `integer(..., { mode: 'timestamp' })`.

export const venues = sqliteTable('venues', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  tagline: text('tagline').notNull(),
  subtitle: text('subtitle'),
  description: text('description', { mode: 'json' }).$type<string[]>().notNull().default([]),
  seated: integer('seated').notNull(),
  floating: integer('floating').notNull(),
  cover: text('cover'),
  highlights: text('highlights', { mode: 'json' }).$type<string[]>().notNull().default([]),
  galleryWithDecor: text('gallery_with_decor', { mode: 'json' }).$type<string[]>().notNull().default([]),
  galleryWithoutDecor: text('gallery_without_decor', { mode: 'json' }).$type<string[]>().notNull().default([]),
  order: integer('order').notNull().default(0),
})

export const roomTypes = sqliteTable('room_types', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  photo: text('photo'),
  quantity: integer('quantity').notNull(),
  capacity: text('capacity').notNull(),
  order: integer('order').notNull().default(0),
})

export const faqItems = sqliteTable('faq_items', {
  id: text('id').primaryKey(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  order: integer('order').notNull().default(0),
})

// blocks: same ContentBlock[] shape as ../blocks.ts —
// { type: 'heading', text } | { type: 'paragraph', runs: [{text, href?}] } | { type: 'list', items, ordered? }
export const locationPages = sqliteTable('location_pages', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  metaTitle: text('meta_title').notNull(),
  metaDescription: text('meta_description').notNull(),
  h1: text('h1').notNull(),
  subheading: text('subheading'),
  blocks: text('blocks', { mode: 'json' }).notNull().default([]),
  isPillar: integer('is_pillar', { mode: 'boolean' }).notNull().default(false),
})

export const blogPosts = sqliteTable('blog_posts', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  metaDescription: text('meta_description').notNull(),
  targetKeyword: text('target_keyword'),
  author: text('author').notNull(),
  authorRole: text('author_role').notNull(),
  publishedAt: integer('published_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  featuredImage: text('featured_image'),
  excerpt: text('excerpt').notNull(),
  blocks: text('blocks', { mode: 'json' }).notNull().default([]),
  status: text('status', { enum: ['draft', 'published'] }).notNull().default('draft'),
})

// Singletons — a single row, id fixed to 'singleton'.
export const homeContent = sqliteTable('home_content', {
  id: text('id').primaryKey().default('singleton'),
  heroSubtitleLeft: text('hero_subtitle_left').notNull(),
  heroSubtitleRight: text('hero_subtitle_right').notNull(),
  heroEyebrow: text('hero_eyebrow').notNull(),
  heroHeadline: text('hero_headline').notNull(),
  heroParagraph: text('hero_paragraph').notNull(),
  heroFeatureLine: text('hero_feature_line').notNull(),
  heroButtonsLabel: text('hero_buttons_label').notNull(),
  introHeadline: text('intro_headline').notNull(),
  introParagraph: text('intro_paragraph').notNull(),
  founderEyebrow: text('founder_eyebrow').notNull(),
  founderParagraphs: text('founder_paragraphs', { mode: 'json' }).$type<string[]>().notNull().default([]),
  founderQuote: text('founder_quote').notNull(),
  founderImage: text('founder_image'),
  highlights: text('highlights', { mode: 'json' }).$type<string[]>().notNull().default([]),
  whyHeadline: text('why_headline').notNull(),
  whyParagraphs: text('why_paragraphs', { mode: 'json' }).$type<string[]>().notNull().default([]),
  whyCouplesChooseHeadline: text('why_couples_choose_headline').notNull(),
  whyCouplesChoose: text('why_couples_choose', { mode: 'json' }).$type<string[]>().notNull().default([]),
  eventsWeHostHeadline: text('events_we_host_headline').notNull(),
  eventsWeHost: text('events_we_host', { mode: 'json' }).$type<string[]>().notNull().default([]),
  signatureExperiencesHeadline: text('signature_experiences_headline').notNull(),
  // SignatureExperience[]: { title, desc? } — small/simple enough for a
  // json column rather than its own table.
  signatureExperiences: text('signature_experiences', { mode: 'json' }).notNull().default([]),
  locationBlurbHeadline: text('location_blurb_headline').notNull(),
  locationBlurbQuote: text('location_blurb_quote').notNull(),
})

export const aboutContent = sqliteTable('about_content', {
  id: text('id').primaryKey().default('singleton'),
  eyebrow: text('eyebrow').notNull(),
  introParagraphs: text('intro_paragraphs', { mode: 'json' }).$type<string[]>().notNull().default([]),
  heroImage: text('hero_image'),
  founderName: text('founder_name').notNull(),
  founderTitle: text('founder_title').notNull(),
  founderBioParagraphs: text('founder_bio_paragraphs', { mode: 'json' }).$type<string[]>().notNull().default([]),
  highlights: text('highlights', { mode: 'json' }).$type<string[]>().notNull().default([]),
})

export const siteSettings = sqliteTable('site_settings', {
  id: text('id').primaryKey().default('singleton'),
  address: text('address').notNull(),
  mapsUrl: text('maps_url').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  instagramHandle: text('instagram_handle').notNull(),
  instagramUrl: text('instagram_url').notNull(),
  footerTagline: text('footer_tagline').notNull(),
  bookTourEmailSubject: text('book_tour_email_subject').notNull(),
})

export const enquiries = sqliteTable('enquiries', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  weddingDate: text('wedding_date'),
  guestCount: integer('guest_count'),
  message: text('message'),
  source: text('source'),
  submittedAt: integer('submitted_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  contacted: integer('contacted', { mode: 'boolean' }).notNull().default(false),
})

export const adminUsers = sqliteTable('admin_users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})
