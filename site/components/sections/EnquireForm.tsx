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

export function EnquireForm() {
  const { status, handleSubmit } = useEnquiryForm('home')

  return (
    <section id="enquire" style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-line)', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>
      <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--color-gold-deep)',
          }}>
            Begin Your Celebration
          </span>
          <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)', margin: '0.75rem 0 0.5rem', color: 'var(--color-ink)' }}>
            Let&rsquo;s Create Something Beautiful Together
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.7, color: 'var(--color-ink-soft)' }}>
            Whether you&rsquo;re envisioning an intimate celebration or a grand destination wedding,
            we&rsquo;d be delighted to welcome you for a tour and help bring your vision to life.
          </p>
        </div>

        <form name="enquiry" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label htmlFor="name" style={labelStyle}>Full Name</label>
              <input id="name" name="name" type="text" required style={fieldStyle} />
            </div>
            <div>
              <label htmlFor="phone" style={labelStyle}>Phone Number</label>
              <input id="phone" name="phone" type="tel" required style={fieldStyle} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label htmlFor="email" style={labelStyle}>Email Address</label>
              <input id="email" name="email" type="email" required style={fieldStyle} />
            </div>
            <div>
              <label htmlFor="wedding_date" style={labelStyle}>Wedding Date</label>
              <input id="wedding_date" name="wedding_date" type="date" style={fieldStyle} />
            </div>
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
      </div>
    </section>
  )
}
