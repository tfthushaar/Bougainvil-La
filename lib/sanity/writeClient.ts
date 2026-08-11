import 'server-only'
import { createClient } from '@sanity/client'
import { projectId, dataset, apiVersion } from './client'

// Server-only — never import this from a Client Component. Used by API
// routes that need to write to Sanity (e.g. storing enquiry-form
// submissions) with an Editor-permission token that must never reach the
// browser.
const token = process.env.SANITY_API_WRITE_TOKEN

export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})
