'use client'

import { useEffect } from 'react'

// Active only when this page is embedded in an iframe with ?bgEdit=1 (set
// by the admin app's visual editor). Scans for [data-edit-field] elements,
// highlights them on hover, and on click posts the field name/type/current
// value to the parent window instead of following the click — the parent
// (admin) opens an edit popover and saves through the normal Server Action.
// A no-op on every other visit, including this same page loaded normally.
const ADMIN_ORIGIN = 'https://bougainvilla-admin.netlify.app'

export function EditBridge() {
  useEffect(() => {
    if (window.self === window.top) return

    // The query param only needs to be present on the FIRST page load —
    // sessionStorage carries it across ordinary in-iframe navigation (e.g.
    // clicking "Explore Venues"), which wouldn't otherwise preserve it.
    const flaggedByUrl = new URLSearchParams(window.location.search).get('bgEdit') === '1'
    if (flaggedByUrl) sessionStorage.setItem('bgEdit', '1')
    if (!flaggedByUrl && sessionStorage.getItem('bgEdit') !== '1') return

    let hovered: HTMLElement | null = null

    function setHighlight(el: HTMLElement | null, on: boolean) {
      if (!el) return
      el.style.outline = on ? '2px solid #a8843f' : ''
      el.style.outlineOffset = on ? '2px' : ''
      el.style.cursor = on ? 'pointer' : ''
    }

    function findTarget(e: Event): HTMLElement | null {
      return (e.target as HTMLElement).closest('[data-edit-field]')
    }

    function onOver(e: MouseEvent) {
      const el = findTarget(e)
      if (el === hovered) return
      setHighlight(hovered, false)
      hovered = el
      setHighlight(hovered, true)
    }

    function onClick(e: MouseEvent) {
      const el = findTarget(e)
      if (!el) return
      e.preventDefault()
      e.stopPropagation()
      window.parent.postMessage(
        {
          source: 'bougainvilla-edit-bridge',
          field: el.dataset.editField,
          editType: el.dataset.editType || 'text',
          value: el.dataset.editValue ?? '',
        },
        ADMIN_ORIGIN
      )
    }

    // Applies a just-saved edit directly to the DOM instead of waiting for
    // admin to reload this whole iframe (a full page load + hydration +
    // on-load animations, which felt slow) — the save already persisted to
    // the database; this just makes the preview reflect it instantly.
    function onMessage(e: MessageEvent) {
      if (e.origin !== ADMIN_ORIGIN) return
      const data = e.data as { source?: string; field?: string; editType?: string; value?: string }
      if (data?.source !== 'bougainvilla-admin-apply-edit' || !data.field) return

      const el = document.querySelector<HTMLElement>(`[data-edit-field="${data.field}"]`)
      if (!el) return

      el.dataset.editValue = data.value ?? ''
      if (data.editType === 'image' && el instanceof HTMLImageElement) {
        el.src = data.value ?? ''
      } else if (data.editType !== 'list') {
        el.textContent = data.value ?? ''
      }
    }

    document.addEventListener('mouseover', onOver)
    document.addEventListener('click', onClick, true)
    window.addEventListener('message', onMessage)
    window.parent.postMessage({ source: 'bougainvilla-edit-bridge', ready: true }, ADMIN_ORIGIN)

    return () => {
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('message', onMessage)
    }
  }, [])

  return null
}
