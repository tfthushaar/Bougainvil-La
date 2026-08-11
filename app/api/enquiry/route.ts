import { NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanity/writeClient'

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // Honeypot: a hidden field real visitors never fill in. Bots that
  // blindly fill every input will trip it — reply 200 so they don't
  // learn anything, just skip the write.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''

  if (!name || !phone || !email) {
    return NextResponse.json({ error: 'Name, phone and email are required' }, { status: 400 })
  }

  const guestCount = typeof body.guest_count === 'string' && body.guest_count !== '' ? Number(body.guest_count) : undefined

  try {
    await sanityWriteClient.create({
      _type: 'enquiry',
      name,
      phone,
      email,
      ...(typeof body.wedding_date === 'string' && body.wedding_date ? { weddingDate: body.wedding_date } : {}),
      ...(guestCount !== undefined && !Number.isNaN(guestCount) ? { guestCount } : {}),
      ...(typeof body.message === 'string' && body.message ? { message: body.message } : {}),
      ...(typeof body.source === 'string' && body.source ? { source: body.source } : {}),
      submittedAt: new Date().toISOString(),
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Failed to save enquiry:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
