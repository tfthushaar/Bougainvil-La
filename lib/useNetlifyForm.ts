'use client'

import { useState } from 'react'

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

// The Next.js Runtime on Netlify can't auto-detect data-netlify forms from
// prerendered page HTML anymore -- submissions have to be POSTed manually
// to the static registration file at public/__forms.html instead.
// https://opennext.js.org/netlify/forms
export function useNetlifyForm() {
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const params = new URLSearchParams()
    new FormData(form).forEach((value, key) => {
      if (typeof value === 'string') params.append(key, value)
    })

    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
      if (!res.ok) throw new Error(`Form submission failed: ${res.status}`)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return { status, handleSubmit }
}
