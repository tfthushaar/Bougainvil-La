import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// All lib/content/*.ts functions run this at BUILD time only (the site is
// statically generated — see next.config.ts / @opennextjs/cloudflare) so
// DATABASE_URL only needs to exist wherever `npm run build` /
// `npm run cf:deploy` actually runs, not on the deployed Worker at request
// time. Same database the admin app (../../admin) writes to.
function getConnectionString(): string {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Content is read from the database at build time — ' +
      'add DATABASE_URL to .env.local for local builds, and to wherever CI runs `npm run build`.'
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
