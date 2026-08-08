import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation'

// Reverse mapping: given a document, which frontend URL(s) preview it. Used
// by the Presentation tool's document list and the "open preview" action.
const locations: PresentationPluginOptions['resolve'] = {
  locations: {
    venue: defineLocations({
      select: { name: 'name', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [{ title: doc?.name || 'Untitled venue', href: `/venues/${doc?.slug}/` }],
      }),
    }),
    locationPage: defineLocations({
      select: { h1: 'h1', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [{ title: doc?.h1 || 'Untitled page', href: `/${doc?.slug}/` }],
      }),
    }),
    roomType: defineLocations({
      select: { name: 'name' },
      resolve: (doc) => ({
        locations: [{ title: doc?.name ? `${doc.name} — Luxury Stays` : 'Luxury Stays', href: '/luxury-stays/' }],
      }),
    }),
    faqItem: defineLocations({
      select: { question: 'question' },
      resolve: (doc) => ({
        locations: [{ title: doc?.question || 'FAQ', href: '/faq/' }],
      }),
    }),
    homeContent: { locations: [{ title: 'Home', href: '/' }] },
    aboutContent: { locations: [{ title: 'About', href: '/about/' }] },
    siteSettings: { locations: [{ title: 'Contact (site-wide settings)', href: '/contact/' }] },
  },

  // Forward mapping: for singular, unambiguous routes, which document "is"
  // that page — drives the document picker/breadcrumb in the Presentation
  // tool. Deliberately not attempting a generic "/:slug/" -> locationPage
  // entry here, since that pattern would also match every other fixed-path
  // route (/about/, /contact/, /gallery/, etc.) — the locations mapping
  // above already covers jumping to a location page's preview safely.
  mainDocuments: [
    { route: '/', type: 'homeContent' },
    { route: '/about/', type: 'aboutContent' },
    { route: '/contact/', type: 'siteSettings' },
    {
      route: '/venues/:slug/',
      filter: `_type == "venue" && slug.current == $slug`,
    },
  ],
}

export const resolve = locations
