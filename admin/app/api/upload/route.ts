import { getStore } from '@netlify/blobs'
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

const MAX_BYTES = 15 * 1024 * 1024 // 15MB — generous for a real photo, still a sane ceiling
const ALLOWED_TYPES = ['image/webp', 'image/jpeg', 'image/png', 'image/gif']

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const form = await req.formData()
  const file = form.get('file')
  if (!(file instanceof File)) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: `Unsupported file type: ${file.type}` }, { status: 400 })
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: `File too large (${Math.round(file.size / 1024 / 1024)}MB, max 15MB)` }, { status: 400 })
  }

  const ext = file.type.split('/')[1]
  const key = `${crypto.randomUUID()}.${ext}`

  const store = getStore('images')
  await store.set(key, await file.arrayBuffer(), { metadata: { contentType: file.type } })

  return NextResponse.json({ url: `/api/images/${key}`, size: file.size })
}
