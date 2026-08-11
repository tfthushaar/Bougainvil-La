import type { NextAuthConfig } from 'next-auth'

// Edge-safe half of the Auth.js config: no providers, so nothing here pulls
// in bcryptjs or touches the database. This is the only config middleware.ts
// is allowed to import — middleware runs on the Edge Runtime (Netlify deploys
// it as an Edge Function), and bcryptjs uses Node-only APIs that don't exist
// there. The full config (lib/auth.ts) adds the Credentials provider on top
// of this and is only ever imported from Node-runtime code (Server Actions,
// route handlers).
export const authConfig = {
  providers: [],
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' },
  trustHost: true,
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user
      const isLoginPage = request.nextUrl.pathname === '/login'
      if (!isLoggedIn && !isLoginPage) return false
      if (isLoggedIn && isLoginPage) {
        return Response.redirect(new URL('/', request.nextUrl.origin))
      }
      return true
    },
  },
} satisfies NextAuthConfig
