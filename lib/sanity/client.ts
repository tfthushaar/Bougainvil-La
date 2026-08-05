import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { Image } from 'sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'

if (!projectId) {
  // Loud on purpose: every page that fetches Sanity content runs this at
  // build time, and a silent undefined projectId fails in a confusing way
  // deep inside @sanity/client instead of here.
  throw new Error(
    'NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Copy .env.local.example to .env.local ' +
    'and fill in the project ID from manage.sanity.io once the Sanity project exists.'
  )
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // fine for build-time fetches of published content
})

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: Image) {
  return builder.image(source)
}
