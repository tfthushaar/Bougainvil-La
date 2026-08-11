import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// Needed in two places, not just at build time: `next.config.ts`'s
// host-based redirect (www -> apex) forces OpenNext to evaluate every
// request live on the Cloudflare Worker rather than serving prerendered
// HTML straight from the assets binding, so these data-fetching functions
// actually run again per-request in production. DATABASE_URL therefore
// needs to be set both wherever `npm run build`/`npm run cf:deploy` runs
// (CI) AND as a Cloudflare Worker secret (`wrangler secret put
// DATABASE_URL`) for the deployed Worker itself. Same database the admin
// app (../../admin) writes to.
function getConnectionString(): string {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Set it in .env.local for local dev, as a GitHub Actions ' +
      'secret for CI builds, and as a Cloudflare Worker secret (wrangler secret put DATABASE_URL) ' +
      'for the deployed Worker at request time.'
    )
  }
  return url
}

let cached: ReturnType<typeof drizzle<typeof schema>> | null = null

export function db() {
  if (!cached) {
    const sql = neon(getConnectionString())
    cached = drizzle(sql, { schema })
  }
  return cached
}
