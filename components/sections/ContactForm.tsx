'use client'

import { useEnquiryForm } from '@/lib/useEnquiryForm'

const fieldStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.95rem', color: 'var(--color-ink)',
  background: 'var(--color-surface)', border: '1px solid var(--color-line)',
  padding: '0.8rem 1rem', width: '100%',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.14em',
  textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '0.5rem', display: 'block',
}

export function ContactForm() {
  const { status, handleSubmit } = useEnquiryForm('contact')

  return (
    <form name="enquiry" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }} />
      <div>
        <label htmlFor="name" style={labelStyle}>Full Name</label>
        <input id="name" name="name" type="text" required style={fieldStyle} />
      </div>
      <div>
        <label htmlFor="phone" style={labelStyle}>Phone Number</label>
        <input id="phone" name="phone" type="tel" required style={fieldStyle} />
      </div>
      <div>
        <label htmlFor="email" style={labelStyle}>Email Address</label>
        <input id="email" name="email" type="email" required style={fieldStyle} />
      </div>
      <div>
        <label htmlFor="wedding_date" style={labelStyle}>Wedding Date</label>
        <input id="wedding_date" name="wedding_date" type="date" style={fieldStyle} />
      </div>
      <div>
        <label htmlFor="guest_count" style={labelStyle}>Estimated Guest Count</label>
        <input id="guest_count" name="guest_count" type="number" min={1} style={fieldStyle} />
      </div>
      <div>
        <label htmlFor="message" style={labelStyle}>Tell Us About Your Celebration</label>
        <textarea id="message" name="message" rows={4} style={{ ...fieldStyle, resize: 'vertical' }} />
      </div>
      <button type="submit" disabled={status === 'submitting'} className="btn-press" style={{
        fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.16em',
        textTransform: 'uppercase', color: '#fff', background: 'var(--color-accent-deep)',
        border: 'none', padding: '1rem 2rem', cursor: status === 'submitting' ? 'default' : 'pointer',
        marginTop: '0.5rem', opacity: status === 'submitting' ? 0.7 : 1,
      }}>
        {status === 'submitting' ? 'Sending…' : 'Book a Venue Tour'}
      </button>
      {status === 'success' && (
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.9rem', color: 'var(--color-accent-deep)', margin: 0 }}>
          Thank you — we&rsquo;ll be in touch shortly!
        </p>
      )}
      {status === 'error' && (
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.9rem', color: 'var(--color-accent-deep)', margin: 0 }}>
          Something went wrong — please try again, or reach us directly at the contact details below.
        </p>
      )}
    </form>
  )
}
