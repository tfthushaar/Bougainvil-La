import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/content/siteSettings'
import { ContactForm } from '@/components/sections/ContactForm'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = {
  title: "Contact | Bougainvil'La — Schedule Your Venue Tour",
  description:
    "Get in touch with Bougainvil'La to schedule a venue tour. Near Bolare, K.G. Gollarapalya, Kanakapura Road, Bengaluru, Karnataka – 562109.",
}

export default async function ContactPage() {
  const settings = await getSiteSettings()
  const telHref = `tel:+${settings.phone.replace(/[^0-9]/g, '')}`

  return (
    <main>
      <PageHeader
        eyebrow="Begin Your Celebration"
        title="Let’s Create Something Beautiful Together"
        paragraph="Whether you’re envisioning an intimate celebration or a grand destination wedding, we’d be delighted to welcome you for a tour and help bring your vision to life."
      />

      <Reveal>
      <section style={{ background: 'var(--color-surface)', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>
        <div style={{
          maxWidth: '72rem', margin: '0 auto', display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(2.5rem, 6vw, 5rem)',
        }}>
          <div>
            <span style={{
              display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--color-gold-deep)', marginBottom: '1.5rem',
            }}>
              Schedule Your Visit
            </span>
            <ContactForm />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-gold-deep)', marginBottom: '1rem' }}>
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
              <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-gold-deep)', marginBottom: '0.75rem' }}>
                Follow Us
              </span>
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.98rem', color: 'var(--color-ink)', textDecoration: 'none' }}>
                Instagram — {settings.instagramHandle}
              </a>
            </div>
          </div>
        </div>
      </section>
      </Reveal>
    </main>
  )
}
