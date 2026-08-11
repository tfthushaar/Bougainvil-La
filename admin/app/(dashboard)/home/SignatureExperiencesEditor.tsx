'use client'

import { useState } from 'react'
import { formStyles as f } from '@/components/form'

interface Experience {
  title: string
  desc?: string
}

export function SignatureExperiencesEditor({ name, defaultValue }: { name: string; defaultValue: Experience[] }) {
  const [items, setItems] = useState<Experience[]>(defaultValue)

  function update(i: number, patch: Partial<Experience>) {
    setItems(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)))
  }
  function remove(i: number) {
    setItems(items.filter((_, idx) => idx !== i))
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2 rounded border border-neutral-200 p-2">
            <div className="flex-1">
              <input
                className={f.input + ' mb-1'} placeholder="Title"
                value={item.title} onChange={(e) => update(i, { title: e.target.value })}
              />
              <input
                className={f.input} placeholder="Description (optional)"
                value={item.desc ?? ''} onChange={(e) => update(i, { desc: e.target.value || undefined })}
              />
            </div>
            <button type="button" className="rounded border border-neutral-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50" onClick={() => remove(i)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button" className="mt-2 rounded border border-neutral-300 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100"
        onClick={() => setItems([...items, { title: '' }])}
      >
        + Add Experience
      </button>
    </div>
  )
}
