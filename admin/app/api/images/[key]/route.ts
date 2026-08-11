import { getStore } from '@netlify/blobs'
import { NextResponse } from 'next/server'

// Public on purpose (no auth check) — these images end up embedded in the
// public site once content moves off the static lib/content/*.ts files, so
// they need to be fetchable by anyone, not just logged-in admins.
export async function GET(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params
  const store = getStore('images')
  const blob = await store.getWithMetadata(key, { type: 'arrayBuffer' })
  if (!blob) return new NextResponse('Not found', { status: 404 })

  const contentType = (blob.metadata as { contentType?: string } | undefined)?.contentType ?? 'application/octet-stream'
  return new NextResponse(blob.data as ArrayBuffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
