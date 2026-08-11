import NextAuth from 'next-auth'
import { authConfig } from '@/lib/auth.config'

// Deliberately built from the edge-safe authConfig, not the full lib/auth.ts
// — this instance only ever verifies the session JWT (via the `authorized`
// callback), so it never pulls bcryptjs or the database into the Edge
// Runtime bundle that Netlify deploys this middleware as.
export const { auth: middleware } = NextAuth(authConfig)
export default middleware

export const config = {
  // Everything except static assets, Next internals, the auth API routes
  // (must stay reachable to log in), and the two routes deliberately public
  // for site visitors: uploaded images (rendered on the public site) and
  // enquiry submissions (the public site's contact form posts here).
  matcher: ['/((?!api/auth|api/images|api/enquiries|_next/static|_next/image|favicon.ico).*)'],
}
