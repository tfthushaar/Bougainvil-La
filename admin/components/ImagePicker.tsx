'use client'

import { useState } from 'react'

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export function ImagePicker({ name, defaultValue }: { name: string; defaultValue: string | null }) {
  const [url, setUrl] = useState<string | null>(defaultValue)
  const [dims, setDims] = useState<{ w: number; h: number; bytes: number } | null>(null)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File) {
    setStatus('uploading')
    setError(null)

    // Read dimensions client-side before uploading — the whole point is
    // quality/size feedback at upload time, which is exactly what was
    // missing when the public site's header images turned out blurry
    // (they were fine files, just under-sized for where they were used).
    const objectUrl = URL.createObjectURL(file)
    const img = new Image()
    const loaded = new Promise<{ w: number; h: number }>((resolve) => {
      img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight })
    })
    img.src = objectUrl
    const { w, h } = await loaded
    setDims({ w, h, bytes: file.size })

    const form = new FormData()
    form.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Upload failed')
      setUrl(data.url)
      setStatus('idle')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      URL.revokeObjectURL(objectUrl)
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={url ?? ''} />
      {url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" className="mb-2 max-h-48 rounded border border-neutral-200 object-contain" />
      )}
      <input
        type="file" accept="image/webp,image/jpeg,image/png,image/gif"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
        className="block w-full text-sm text-neutral-600 file:mr-3 file:rounded file:border-0 file:bg-neutral-100 file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-neutral-200"
      />
      {status === 'uploading' && <p className="mt-1 text-xs text-neutral-500">Uploading…</p>}
      {status === 'error' && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {dims && (
        <p className="mt-1 text-xs text-neutral-500">
          {dims.w}×{dims.h}px · {formatBytes(dims.bytes)}
          {dims.w < 1200 && <span className="ml-1 text-amber-600">— low resolution for a full-width header image</span>}
        </p>
      )}
    </div>
  )
}
