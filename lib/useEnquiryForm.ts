'use client'

import { useState } from 'react'

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const ENQUIRY_API_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL
  ? `${process.env.NEXT_PUBLIC_ADMIN_API_URL}/api/enquiries`
  : 'https://bougainvilla-admin.netlify.app/api/enquiries'

export function useEnquiryForm(source: string) {
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    // Honeypot: a hidden field real visitors never fill in.
    if (data.company && data.company.trim() !== '') return

    setStatus('submitting')

    try {
      const res = await fetch(ENQUIRY_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          weddingDate: data.wedding_date || undefined,
          guestCount: data.guest_count ? Number(data.guest_count) : undefined,
          message: data.message || undefined,
          source,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return { status, handleSubmit }
}
