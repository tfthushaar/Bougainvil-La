import { defineCloudflareConfig } from '@opennextjs/cloudflare'

// Base config — no R2-backed incremental cache configured yet, since that
// needs an R2 bucket created in the Cloudflare dashboard first (account-level
// setup, can't be done from here). Without it, ISR/revalidated fetches still
// work, they just don't persist across cold starts — fine to start with, add
// an `incrementalCache` here later once an R2 bucket exists. See
// https://opennext.js.org/cloudflare/caching for the R2 setup steps.
export default defineCloudflareConfig()
