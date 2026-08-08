import { defineLive } from 'next-sanity/live'
import { sanityClient } from './client'

// The integration point for Sanity's Presentation tool: sanityFetch is a
// drop-in replacement for sanityClient.fetch that's aware of Next.js Draft
// Mode — it automatically switches between published (CDN, cached) and
// draft (live, stega-encoded) content depending on whether the request is
// coming from an authenticated Studio preview session or a normal visitor.
// SanityLive subscribes to real-time content updates so edits in Studio
// stream into the preview without a manual refresh.
export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient,
  // Server-only — never sent to the browser. Needs permission to read
  // drafts. content; a Viewer-role token covers this (see
  // reference-bougainvilla-infra memory for where it's generated/stored).
  serverToken: process.env.SANITY_API_READ_TOKEN,
  // Standalone live-preview outside the Presentation tool isn't needed here.
  browserToken: false,
})
