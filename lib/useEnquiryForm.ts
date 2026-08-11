'use client'

import { useState } from 'react'

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

// Submits enquiry forms to our own API route, which writes the submission
// to Sanity as an `enquiry` document — Studio (already gated behind real
// Sanity account login) is the admin panel that displays them. Host-neutral
// on purpose: doesn't depend on Netlify's form-detection, so it keeps
// working unchanged on Cloudflare Pages or anywhere else.
export function useEnquiryForm(source: string) {
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch('/api/enquiry/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source }),
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
