// One-time: creates (or updates the password of) an admin login.
// Usage: npx tsx scripts/create-admin-user.ts <email> <password>
import { config } from 'dotenv'
config({ path: '.env.local' })

import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '../lib/db/client'
import { adminUsers } from '../lib/db/schema'

async function main() {
  const [email, password] = process.argv.slice(2)
  if (!email || !password) {
    console.error('Usage: npx tsx scripts/create-admin-user.ts <email> <password>')
    process.exit(1)
  }
  if (password.length < 8) {
    console.error('Password must be at least 8 characters.')
    process.exit(1)
  }

  const passwordHash = await hash(password, 12)
  const normalizedEmail = email.trim().toLowerCase()

  const existing = (await db().select().from(adminUsers).where(eq(adminUsers.email, normalizedEmail)).limit(1))[0]
  if (existing) {
    await db().update(adminUsers).set({ passwordHash }).where(eq(adminUsers.id, existing.id))
    console.log(`Updated password for ${normalizedEmail}`)
  } else {
    await db().insert(adminUsers).values({ id: crypto.randomUUID(), email: normalizedEmail, passwordHash })
    console.log(`Created admin user ${normalizedEmail}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
