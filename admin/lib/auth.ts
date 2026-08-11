import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { authConfig } from './auth.config'
import { db } from './db/client'
import { adminUsers } from './db/schema'

// Full config — adds the Credentials provider (and its bcryptjs dependency)
// on top of the edge-safe authConfig. Only import this from Node-runtime
// code (Server Actions, route handlers), never from middleware.ts.
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = typeof credentials?.email === 'string' ? credentials.email.trim().toLowerCase() : ''
        const password = typeof credentials?.password === 'string' ? credentials.password : ''
        if (!email || !password) return null

        const [user] = await db().select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1)
        if (!user) return null

        const valid = await compare(password, user.passwordHash)
        if (!valid) return null

        return { id: user.id, email: user.email }
      },
    }),
  ],
})
