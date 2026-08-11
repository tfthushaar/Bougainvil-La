import 'dotenv/config'
import type { Config } from 'drizzle-kit'

// Prefers the unpooled connection for schema pushes/migrations (Neon's
// pooler runs in transaction mode, which can be flaky for DDL) — falls back
// to whatever's available. See lib/db/client.ts for the same var names.
const url =
  process.env.DATABASE_URL ||
  process.env.NETLIFY_DATABASE_URL_UNPOOLED ||
  process.env.NETLIFY_DATABASE_URL ||
  ''

export default {
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: { url },
} satisfies Config
