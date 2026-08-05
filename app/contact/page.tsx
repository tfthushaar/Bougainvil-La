import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/sanity/siteSettings'

export const metadata: Metadata = {
  title: "Contact | Bougainvil'La — Schedule Your Venue Tour",
  description:
    "Get in touch with Bougainvil'La to schedule a venue tour. Near Bolare, K.G. Gollarapalya, Kanakapura Road, Bengaluru, Karnataka – 562109.",
}

const fieldStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.95rem', color: 'var(--color-ink)',
  background: 'var(--color-surface)', border: '1px solid var(--color-line)',
  padding: '0.8rem 1rem', width: '100%',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.14em',
  textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '0.5rem', display: 'block',
}

export default async function ContactPage() {
  const settings = await getSiteSettings()
  const telHref = `tel:+${settings.phone.replace(/[^0-9]/g, '')}`

  return (
    <main>
      <section style={{ background: 'var(--color-ink)', padding: 'clamp(6rem, 14vh, 9rem) clamp(1.25rem, 5vw, 3rem) clamp(3rem, 7vh, 4.5rem)', textAlign: 'center' }}>
        <span style={{
          display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem',
          letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem',
        }}>
          Begin Your Celebration
        </span>
        <h1 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(2rem, 4.4vw, 3.2rem)', color: '#fff', margin: '0 0 1rem' }}>
          Let&rsquo;s Create Something Beautiful Together
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', maxWidth: '38rem', margin: '0 auto' }}>
          Whether you&rsquo;re envisioning an intimate celebration or a grand destination wedding,
          we&rsquo;d be delighted to welcome you for a tour and help bring your vision to life.
        </p>
      </section>

      <section style={{ background: 'var(--color-surface)', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>
        <div style={{
          maxWidth: '72rem', margin: '0 auto', display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(2.5rem, 6vw, 5rem)',
        }}>
          <div>
            <span style={{
              display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.5rem',
            }}>
              Schedule Your Visit
            </span>
            <form name="enquiry" method="POST" data-netlify="true" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <input type="hidden" name="form-name" value="enquiry" />
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
              <button type="submit" style={{
                fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.16em',
                textTransform: 'uppercase', color: '#fff', background: 'var(--color-accent-deep)',
                border: 'none', padding: '1rem 2rem', cursor: 'pointer', marginTop: '0.5rem',
              }}>
                Book a Venue Tour
              </button>
            </form>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem' }}>
                Visit Us
              </span>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.98rem', lineHeight: 1.8, color: 'var(--color-ink-soft)', margin: 0 }}>
                📍 {settings.address}
              </p>
            </div>
            <div>
              <a href={telHref} style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.98rem', color: 'var(--color-ink)', textDecoration: 'none', display: 'block' }}>
                📞 {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.98rem', color: 'var(--color-ink)', textDecoration: 'none', display: 'block', marginTop: '0.5rem' }}>
                ✉️ {settings.email}
              </a>
            </div>
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>
                Follow Us
              </span>
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.98rem', color: 'var(--color-ink)', textDecoration: 'none' }}>
                Instagram — {settings.instagramHandle}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
