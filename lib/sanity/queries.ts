// GROQ queries — one per content type, shaped to match the existing
// lib/data/venues.ts / lib/data/locations.ts interfaces as closely as
// possible so swapping a page/component over to these is a small diff.
// Not wired into any page yet (see Phase 2 of the CMS plan) — this file is
// ready to import once a real Sanity project is connected.

export const venuesQuery = `*[_type == "venue"] | order(order asc) {
  "slug": slug.current,
  name,
  tagline,
  description,
  seated,
  floating,
  cover,
  highlights,
  "galleryWithDecor": galleryWithDecor,
  "galleryWithoutDecor": galleryWithoutDecor
}`

export const venueBySlugQuery = `*[_type == "venue" && slug.current == $slug][0] {
  "slug": slug.current,
  name,
  tagline,
  description,
  seated,
  floating,
  cover,
  highlights,
  galleryWithDecor,
  galleryWithoutDecor
}`

export const venueSlugsQuery = `*[_type == "venue"].slug.current`

export const locationPagesQuery = `*[_type == "locationPage"] {
  "slug": slug.current,
  metaTitle,
  metaDescription,
  h1,
  subheading,
  body,
  isPillar
}`

export const locationPageBySlugQuery = `*[_type == "locationPage" && slug.current == $slug][0] {
  "slug": slug.current,
  metaTitle,
  metaDescription,
  h1,
  subheading,
  body,
  isPillar
}`

export const roomTypesQuery = `*[_type == "roomType"] | order(order asc) {
  name, description, photo, quantity, capacity
}`

export const faqItemsQuery = `*[_type == "faqItem"] | order(order asc) { question, answer }`

export const homeContentQuery = `*[_type == "homeContent"][0]`

export const aboutContentQuery = `*[_type == "aboutContent"][0]`

export const siteSettingsQuery = `*[_type == "siteSettings"][0]`
