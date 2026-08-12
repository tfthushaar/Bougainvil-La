import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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
export function middleware(request: NextRequest) {
  if (request.headers.get('host') === 'www.bougainvilla.co.in') {
    const url = request.nextUrl.clone()
    url.protocol = 'https'
    url.host = 'bougainvilla.co.in'
    return NextResponse.redirect(url, 308)
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
