'use client'

import { useEffect, useState } from 'react'
import { ImagePicker } from '@/components/ImagePicker'
import { updateHomeField } from './actions'

const SITE_ORIGIN = 'https://bougainvilla.co.in'

interface EditPanel {
  field: string
  type: string
  value: string
}

export function EditWebsiteFrame() {
  const [reloadKey, setReloadKey] = useState(0)
  const [frameReady, setFrameReady] = useState(false)
  const [panel, setPanel] = useState<EditPanel | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== SITE_ORIGIN) return
      const data = e.data as { source?: string; ready?: boolean; field?: string; editType?: string; value?: string }
      if (data?.source !== 'bougainvilla-edit-bridge') return
      if (data.ready) {
        setFrameReady(true)
        return
      }
      if (data.field) {
        setPanel({ field: data.field, type: data.editType || 'text', value: data.value ?? '' })
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData(e.currentTarget)
    try {
      await updateHomeField(formData)
      setPanel(null)
      setFrameReady(false)
      setReloadKey((k) => k + 1)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-4">
      <div className="relative flex-1 overflow-hidden rounded-lg border border-black/10 bg-white">
        {!frameReady && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 text-sm text-neutral-500">
            Loading live preview…
          </div>
        )}
        <iframe
          key={reloadKey}
          src={`${SITE_ORIGIN}/?bgEdit=1`}
          className="h-full w-full border-0"
          title="Home page — live preview"
        />
      </div>

      {panel && (
        <div className="w-80 flex-shrink-0 overflow-y-auto rounded-lg border border-black/10 bg-white p-5">
          <h2 className="mb-1 text-sm font-semibold text-neutral-900">Edit</h2>
          <p className="mb-4 truncate text-xs text-neutral-400" title={panel.field}>{panel.field}</p>

          <form onSubmit={handleSave}>
            <input type="hidden" name="field" value={panel.field} />

            {panel.type === 'image' ? (
              <ImagePicker name="value" defaultValue={panel.value || null} />
            ) : (
              <>
                <textarea
                  name="value"
                  defaultValue={panel.value}
                  rows={panel.type === 'list' ? 8 : 4}
                  autoFocus
                  className="w-full rounded border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
                />
                {panel.type === 'list' && (
                  <p className="mt-1 text-xs text-neutral-400">One item per line.</p>
                )}
              </>
            )}

            <div className="mt-4 flex gap-2">
              <button
                type="submit" disabled={saving}
                className="rounded bg-[var(--color-accent)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[var(--color-accent-dark)] disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
              <button
                type="button" onClick={() => setPanel(null)}
                className="rounded px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-100"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
