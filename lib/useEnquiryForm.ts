'use client'

import { useState } from 'react'

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

// No backend/CMS to store submissions in right now — opens the visitor's
// email client with a prefilled message to the venue's inbox instead. This
// is a stopgap: the planned Netlify-hosted admin app will store and display
// enquiries properly (see the migration plan doc).
const ENQUIRY_EMAIL = 'bougainvillaluxury@gmail.com'

export function useEnquiryForm(source: string) {
  const [status, setStatus] = useState<FormStatus>('idle')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    // Honeypot: a hidden field real visitors never fill in.
    if (data.company && data.company.trim() !== '') return

    setStatus('submitting')

    const lines = [
      `Name: ${data.name ?? ''}`,
      `Phone: ${data.phone ?? ''}`,
      `Email: ${data.email ?? ''}`,
      data.wedding_date ? `Wedding Date: ${data.wedding_date}` : null,
      data.guest_count ? `Estimated Guests: ${data.guest_count}` : null,
      data.message ? `Message: ${data.message}` : null,
      `Source: ${source}`,
    ].filter(Boolean).join('\n')

    const subject = encodeURIComponent(`New Venue Enquiry — ${data.name || 'Website'}`)
    const body = encodeURIComponent(lines)
    window.location.href = `mailto:${ENQUIRY_EMAIL}?subject=${subject}&body=${body}`

    setStatus('success')
    form.reset()
  }

  return { status, handleSubmit }
}
