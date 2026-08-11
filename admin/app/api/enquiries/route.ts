import { NextResponse } from 'next/server'
import { db } from '@/lib/db/client'
import { enquiries } from '@/lib/db/schema'

// Public on purpose — the venue's website visitors aren't logged in. This
// is the one write path into the database that doesn't go through auth,
// mirroring how the old mailto: stopgap was also unauthenticated by nature.
// Called cross-origin from the main site (bougainvilla.co.in), hence CORS.
const ALLOWED_ORIGINS = ['https://bougainvilla.co.in', 'https://www.bougainvilla.co.in', 'http://localhost:3000']

function corsHeaders(origin: string | null) {
  const allow = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req.headers.get('origin')) })
}

export async function POST(req: Request) {
  const headers = corsHeaders(req.headers.get('origin'))

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400, headers })
  }

  // Honeypot — a hidden field real visitors never fill in.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true }, { headers })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  if (!name || !phone || !email) {
    return NextResponse.json({ error: 'name, phone, and email are required' }, { status: 400, headers })
  }

  const weddingDate = typeof body.weddingDate === 'string' && body.weddingDate ? body.weddingDate : null
  const guestCount = typeof body.guestCount === 'number' && Number.isFinite(body.guestCount) ? body.guestCount : null
  const message = typeof body.message === 'string' && body.message ? body.message : null
  const source = typeof body.source === 'string' && body.source ? body.source : null

  await db().insert(enquiries).values({
    id: crypto.randomUUID(),
    name, phone, email, weddingDate, guestCount, message, source,
  })

  return NextResponse.json({ ok: true }, { headers })
}
