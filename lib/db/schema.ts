import { boolean, integer, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

// Mirrors admin/lib/db/schema.ts exactly — copied, not imported
// cross-package, since admin/ is a fully separate app (same precedent as
// lib/content/blocks.ts / admin/lib/blocks.ts). This is the read side; only
// the admin app writes to these tables.

export const venues = pgTable('venues', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  tagline: text('tagline').notNull(),
  subtitle: text('subtitle'),
  description: text('description').array().notNull().default([]),
  seated: integer('seated').notNull(),
  floating: integer('floating').notNull(),
  cover: text('cover'),
  highlights: text('highlights').array().notNull().default([]),
  galleryWithDecor: text('gallery_with_decor').array().notNull().default([]),
  galleryWithoutDecor: text('gallery_without_decor').array().notNull().default([]),
  order: integer('order').notNull().default(0),
})

export const roomTypes = pgTable('room_types', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  photo: text('photo'),
  quantity: integer('quantity').notNull(),
  capacity: text('capacity').notNull(),
  order: integer('order').notNull().default(0),
})

export const faqItems = pgTable('faq_items', {
  id: text('id').primaryKey(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  order: integer('order').notNull().default(0),
})

// blocks: ContentBlock[] shape from lib/content/blocks.ts —
// { type: 'heading', text } | { type: 'paragraph', runs: [{text, href?}] } | { type: 'list', items, ordered? }
export const locationPages = pgTable('location_pages', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  metaTitle: text('meta_title').notNull(),
  metaDescription: text('meta_description').notNull(),
  h1: text('h1').notNull(),
  subheading: text('subheading'),
  blocks: jsonb('blocks').notNull().default([]),
  isPillar: boolean('is_pillar').notNull().default(false),
})

export const blogPosts = pgTable('blog_posts', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  metaDescription: text('meta_description').notNull(),
  targetKeyword: text('target_keyword'),
  author: text('author').notNull(),
  authorRole: text('author_role').notNull(),
  publishedAt: timestamp('published_at', { withTimezone: true }).notNull().defaultNow(),
  featuredImage: text('featured_image'),
  excerpt: text('excerpt').notNull(),
  blocks: jsonb('blocks').notNull().default([]),
  status: text('status', { enum: ['draft', 'published'] }).notNull().default('draft'),
})

export const homeContent = pgTable('home_content', {
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
  founderParagraphs: text('founder_paragraphs').array().notNull().default([]),
  founderQuote: text('founder_quote').notNull(),
  founderImage: text('founder_image'),
  highlights: text('highlights').array().notNull().default([]),
  whyHeadline: text('why_headline').notNull(),
  whyParagraphs: text('why_paragraphs').array().notNull().default([]),
  whyCouplesChooseHeadline: text('why_couples_choose_headline').notNull(),
  whyCouplesChoose: text('why_couples_choose').array().notNull().default([]),
  eventsWeHostHeadline: text('events_we_host_headline').notNull(),
  eventsWeHost: text('events_we_host').array().notNull().default([]),
  signatureExperiencesHeadline: text('signature_experiences_headline').notNull(),
  signatureExperiences: jsonb('signature_experiences').notNull().default([]),
  locationBlurbHeadline: text('location_blurb_headline').notNull(),
  locationBlurbQuote: text('location_blurb_quote').notNull(),
})

export const aboutContent = pgTable('about_content', {
  id: text('id').primaryKey().default('singleton'),
  eyebrow: text('eyebrow').notNull(),
  introParagraphs: text('intro_paragraphs').array().notNull().default([]),
  heroImage: text('hero_image'),
  founderName: text('founder_name').notNull(),
  founderTitle: text('founder_title').notNull(),
  founderBioParagraphs: text('founder_bio_paragraphs').array().notNull().default([]),
  highlights: text('highlights').array().notNull().default([]),
})

export const siteSettings = pgTable('site_settings', {
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

export const enquiries = pgTable('enquiries', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  weddingDate: text('wedding_date'),
  guestCount: integer('guest_count'),
  message: text('message'),
  source: text('source'),
  submittedAt: timestamp('submitted_at', { withTimezone: true }).notNull().defaultNow(),
  contacted: boolean('contacted').notNull().default(false),
})
