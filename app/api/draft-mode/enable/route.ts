import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { sanityClient } from '@/lib/sanity/client'

// Called by Sanity Studio's Presentation tool when an authenticated Editor
// opens the live preview — validates the request came from Studio, sets the
// draft-mode cookie for that browser session only, then redirects into the
// page being previewed. Never reachable by a normal visitor without going
// through an authenticated Studio session first.
export const { GET } = defineEnableDraftMode({
  client: sanityClient.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
})
