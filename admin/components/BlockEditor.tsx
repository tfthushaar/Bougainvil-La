'use client'

import { useState } from 'react'
import type { ContentBlock, InlineRun } from '@/lib/blocks'

const btn = 'rounded border border-neutral-300 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100'
const field = 'w-full rounded border border-neutral-300 px-2.5 py-1.5 text-sm outline-none focus:border-[var(--color-accent)]'

function RunEditor({ runs, onChange }: { runs: InlineRun[]; onChange: (runs: InlineRun[]) => void }) {
  function update(i: number, patch: Partial<InlineRun>) {
    onChange(runs.map((r, idx) => (idx === i ? { ...r, ...patch } : r)))
  }
  function remove(i: number) {
    onChange(runs.filter((_, idx) => idx !== i))
  }
  return (
    <div className="flex flex-col gap-2">
      {runs.map((run, i) => (
        <div key={i} className="flex flex-wrap items-start gap-2 rounded border border-neutral-200 p-2">
          <textarea
            className={field + ' flex-1'} rows={2} placeholder="Text"
            value={run.text} onChange={(e) => update(i, { text: e.target.value })}
          />
          <div className="flex flex-1 flex-col gap-1">
            <input
              className={field} placeholder="Link URL (optional)"
              value={run.href ?? ''} onChange={(e) => update(i, { href: e.target.value || undefined })}
            />
            {runs.length > 1 && (
              <button type="button" className={btn} onClick={() => remove(i)}>Remove segment</button>
            )}
          </div>
        </div>
      ))}
      <button type="button" className={btn + ' self-start'} onClick={() => onChange([...runs, { text: '' }])}>
        + Add text segment
      </button>
    </div>
  )
}

function BlockRow({ block, onChange, onRemove, onMove }: {
  block: ContentBlock
  onChange: (b: ContentBlock) => void
  onRemove: () => void
  onMove: (dir: -1 | 1) => void
}) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400">{block.type}</span>
        <div className="flex gap-1">
          <button type="button" className={btn} onClick={() => onMove(-1)}>↑</button>
          <button type="button" className={btn} onClick={() => onMove(1)}>↓</button>
          <button type="button" className={btn + ' text-red-600'} onClick={onRemove}>Remove</button>
        </div>
      </div>

      {block.type === 'heading' && (
        <input className={field} placeholder="Heading text" value={block.text} onChange={(e) => onChange({ ...block, text: e.target.value })} />
      )}

      {block.type === 'paragraph' && (
        <RunEditor runs={block.runs} onChange={(runs) => onChange({ ...block, runs })} />
      )}

      {block.type === 'list' && (
        <div className="flex flex-col gap-2">
          <textarea
            className={field} rows={4} placeholder="One item per line"
            value={block.items.join('\n')}
            onChange={(e) => onChange({ ...block, items: e.target.value.split('\n') })}
          />
          <label className="flex items-center gap-2 text-xs text-neutral-600">
            <input type="checkbox" checked={!!block.ordered} onChange={(e) => onChange({ ...block, ordered: e.target.checked })} />
            Numbered list
          </label>
        </div>
      )}
    </div>
  )
}

export function BlockEditor({ name, defaultValue }: { name: string; defaultValue: ContentBlock[] }) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(defaultValue)

  function update(i: number, block: ContentBlock) {
    setBlocks(blocks.map((b, idx) => (idx === i ? block : b)))
  }
  function remove(i: number) {
    setBlocks(blocks.filter((_, idx) => idx !== i))
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir
    if (j < 0 || j >= blocks.length) return
    const next = [...blocks]
    ;[next[i], next[j]] = [next[j], next[i]]
    setBlocks(next)
  }
  function add(block: ContentBlock) {
    setBlocks([...blocks, block])
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(blocks)} />
      <div className="flex flex-col gap-3">
        {blocks.map((block, i) => (
          <BlockRow
            key={i} block={block}
            onChange={(b) => update(i, b)} onRemove={() => remove(i)} onMove={(dir) => move(i, dir)}
          />
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button type="button" className={btn} onClick={() => add({ type: 'heading', text: '' })}>+ Heading</button>
        <button type="button" className={btn} onClick={() => add({ type: 'paragraph', runs: [{ text: '' }] })}>+ Paragraph</button>
        <button type="button" className={btn} onClick={() => add({ type: 'list', items: [''] })}>+ List</button>
      </div>
    </div>
  )
}
