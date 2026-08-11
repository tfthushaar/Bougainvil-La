'use client'

import { useEffect, useRef, useState } from 'react'
import type { SiteSettings } from '@/lib/content/siteSettings'

const STORAGE_KEY = 'whatsapp-fab-position'
const SIZE = 54 // px, matches the button's width/height below
const DRAG_THRESHOLD = 6 // px of movement before a press counts as a drag, not a click

interface Pos { x: number; y: number }

function clamp(pos: Pos): Pos {
  const margin = 8
  const maxX = window.innerWidth - SIZE - margin
  const maxY = window.innerHeight - SIZE - margin
  return { x: Math.min(Math.max(pos.x, margin), Math.max(margin, maxX)), y: Math.min(Math.max(pos.y, margin), Math.max(margin, maxY)) }
}

export function WhatsAppButton({ settings }: { settings: SiteSettings }) {
  const digits = settings.phone.replace(/[^0-9]/g, '')
  const href = `https://wa.me/${digits}?text=${encodeURIComponent("Hi! I'd like to know more about Bougainvil'La.")}`

  const [pos, setPos] = useState<Pos | null>(null)
  const [ready, setReady] = useState(false)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number; dragged: boolean } | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setPos(clamp(JSON.parse(saved)))
    } catch {
      // ignore malformed/inaccessible storage
    }
    setReady(true)

    function onResize() {
      setPos((p) => (p ? clamp(p) : p))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function defaultPos(): Pos {
    const bottomOffset = window.innerWidth <= 1240 ? 74 + 8 : 32 // clears the mobile sticky CTA bar
    return { x: window.innerWidth - SIZE - 20, y: window.innerHeight - SIZE - bottomOffset }
  }

  function handlePointerDown(e: React.PointerEvent<HTMLAnchorElement>) {
    const current = pos ?? clamp(defaultPos())
    dragState.current = { startX: e.clientX, startY: e.clientY, originX: current.x, originY: current.y, dragged: false }
    btnRef.current?.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    const drag = dragState.current
    if (!drag) return
    const dx = e.clientX - drag.startX
    const dy = e.clientY - drag.startY
    if (!drag.dragged && Math.hypot(dx, dy) < DRAG_THRESHOLD) return
    drag.dragged = true
    setPos(clamp({ x: drag.originX + dx, y: drag.originY + dy }))
  }

  function handlePointerUp() {
    const drag = dragState.current
    if (drag?.dragged) {
      setPos((p) => {
        if (p) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)) } catch { /* ignore */ } }
        return p
      })
    }
    dragState.current = null
  }

  function handleClick(e: React.MouseEvent) {
    if (dragState.current?.dragged) e.preventDefault()
  }

  const resolved = pos ?? (ready ? clamp(defaultPos()) : null)

  return (
    <a
      ref={btnRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp — drag to reposition"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
      className="whatsapp-fab"
      style={{
        position: 'fixed',
        ...(resolved
          ? { left: resolved.x, top: resolved.y, visibility: 'visible' }
          : { right: 'clamp(1rem, 4vw, 1.75rem)', bottom: 'clamp(1.25rem, 5vh, 2rem)', visibility: 'hidden' }),
        zIndex: 95, width: `${SIZE}px`, height: `${SIZE}px`, borderRadius: '50%',
        background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 18px rgba(0,0,0,0.25)', transition: 'transform 0.2s ease',
        touchAction: 'none', cursor: 'grab', userSelect: 'none',
      }}
    >
      <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff" aria-hidden="true" style={{ pointerEvents: 'none' }}>
        <path d="M16.004 3C9.1 3 3.5 8.6 3.5 15.5c0 2.36.66 4.57 1.8 6.46L3 29l7.24-2.25a12.42 12.42 0 0 0 5.76 1.42h.01c6.9 0 12.5-5.6 12.5-12.5S22.9 3 16 3Zm0 22.72h-.01a10.2 10.2 0 0 1-5.2-1.43l-.37-.22-3.86 1.2 1.24-3.76-.24-.39a10.19 10.19 0 0 1-1.56-5.42c0-5.65 4.6-10.24 10.25-10.24 2.74 0 5.31 1.07 7.24 3.01a10.16 10.16 0 0 1 3 7.23c0 5.65-4.6 10.24-10.25 10.24Zm5.62-7.67c-.31-.15-1.82-.9-2.1-1-.28-.1-.49-.15-.69.16-.21.3-.79 1-.97 1.2-.18.21-.36.23-.66.08-.31-.16-1.29-.48-2.46-1.53-.91-.81-1.52-1.82-1.7-2.12-.18-.31-.02-.47.13-.63.14-.14.31-.36.46-.54.15-.18.2-.31.31-.51.1-.21.05-.39-.02-.54-.08-.16-.69-1.67-.95-2.28-.25-.6-.5-.52-.69-.53l-.59-.01c-.2 0-.54.08-.82.39-.28.31-1.08 1.05-1.08 2.57 0 1.51 1.1 2.98 1.26 3.18.15.21 2.16 3.3 5.24 4.63.73.32 1.3.5 1.75.65.73.23 1.4.2 1.93.12.59-.09 1.82-.74 2.08-1.46.26-.71.26-1.32.18-1.45-.07-.13-.28-.21-.59-.36Z" />
      </svg>

      <style>{`
        .whatsapp-fab:hover { transform: scale(1.06); }
        .whatsapp-fab:active { cursor: grabbing; }
      `}</style>
    </a>
  )
}
