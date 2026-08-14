import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

// Loud on purpose — every page here needs a real database, and silently
// undefined credentials fail in a confusing way deep inside the libSQL
// driver instead of here.
//
// Turso, unlike the previous Neon/Postgres setup, has no sleep/quota-based
// "endpoint disabled" failure mode — that's specifically why this project
// moved off Netlify DB (see the incident this was written to fix).
function getCredentials(): { url: string; authToken: string } {
  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN
  if (!url || !authToken) {
    throw new Error(
      'TURSO_DATABASE_URL and/or TURSO_AUTH_TOKEN is not set. Create a database at ' +
      'https://app.turso.tech, then set both env vars.'
    )
  }
  return { url, authToken }
}

let cached: ReturnType<typeof drizzle<typeof schema>> | null = null

export function db() {
  if (!cached) {
    const client = createClient(getCredentials())
    cached = drizzle(client, { schema })
  }
  return cached
}
