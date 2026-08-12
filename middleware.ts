import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // www.bougainvilla.co.in is provisioned (wrangler.jsonc routes) so it
  // resolves at all, but bougainvilla.co.in (no www) is the one canonical
  // URL — redirect rather than serving the same content at both, which
  // search engines treat as duplicate content.
  //
  // This used to be a next.config.ts `redirects()` entry, but OpenNext's
  // Cloudflare adapter doesn't interpolate the `:path*` parameter in that
  // config at runtime — every www visitor was redirected to the literal,
  // broken URL "https://bougainvilla.co.in/:path*" and hit a 404. Real
  // middleware logic (not a static redirect manifest) doesn't have that
  // problem, since it builds the target URL directly from the incoming
  // request instead of relying on path-token substitution.
  if (request.headers.get('host') === 'www.bougainvilla.co.in') {
    const url = request.nextUrl.clone()
    url.protocol = 'https'
    url.host = 'bougainvilla.co.in'
    return NextResponse.redirect(url, 308)
  }

  // Every page reads live content from the database on every request (see
  // lib/db/client.ts) — there's no incremental/tag cache backend wired up
  // on this Cloudflare deployment to safely invalidate a CDN-level cache
  // when that content changes. Next still classifies some of these routes
  // as static at build time (nothing in them reads cookies/headers) and
  // attaches a year-long `s-maxage`, which Cloudflare's edge network holds
  // onto — a real incident: a stale cached page kept getting served to
  // some visitors long after the underlying bug was fixed and every
  // direct/uncached request confirmed healthy. Overriding the header here,
  // on every response, is a hard guarantee independent of how any
  // individual route happens to get classified.
  const response = NextResponse.next()
  response.headers.set('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate')
  return response
}

export const config = {
  // Only page routes — not static assets under public/ (images, fonts, the
  // brochure PDF), which are genuinely immutable and should stay cached.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/|fonts/|brochure\\.pdf).*)'],
}
