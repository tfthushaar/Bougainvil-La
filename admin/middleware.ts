import NextAuth from 'next-auth'
import { authConfig } from '@/lib/auth.config'

// Deliberately built from the edge-safe authConfig, not the full lib/auth.ts
// — this instance only ever verifies the session JWT (via the `authorized`
// callback), so it never pulls bcryptjs or the database into the Edge
// Runtime bundle that Netlify deploys this middleware as.
export const { auth: middleware } = NextAuth(authConfig)
export default middleware

export const config = {
  // Everything except static assets, Next internals, and the auth API
  // routes themselves (which must stay reachable to actually log in).
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}
