import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// Loud on purpose — every page here needs a real database, and a silent
// undefined connection string fails in a confusing way deep inside the
// Neon driver instead of here. Nothing here exists until Netlify DB is
// provisioned (see docs/netlify-admin-plan.md) — the whole app builds fine
// without it since nothing calls this at build/import time, only at request
// time inside Server Actions/route handlers.
//
// Enabling Netlify DB from the dashboard auto-injects NETLIFY_DATABASE_URL
// (and NETLIFY_DATABASE_URL_UNPOOLED) as site env vars — no manual copying.
// DATABASE_URL is checked first so a locally-set override still wins.
function getConnectionString(): string {
  const url = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL
  if (!url) {
    throw new Error(
      'No database connection string found (checked DATABASE_URL, NETLIFY_DATABASE_URL). ' +
      'Enable Netlify DB from the Netlify dashboard → this site → Database.'
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
