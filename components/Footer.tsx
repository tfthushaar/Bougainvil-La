import Link from 'next/link'
import type { SiteSettings } from '@/lib/content/siteSettings'

const EXPLORE_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/venues/', label: 'Celebration Spaces' },
  { href: '/luxury-stays/', label: 'Luxury Stays' },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/testimonials/', label: 'Testimonials' },
  { href: '/faq/', label: 'FAQs' },
  { href: '/contact/', label: 'Contact' },
]

const linkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.85rem',
  color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.2em',
  textTransform: 'uppercase', color: 'var(--color-gold)',
}

export function Footer({ settings }: { settings: SiteSettings }) {
  const telHref = `tel:+${settings.phone.replace(/[^0-9]/g, '')}`

  return (
    <footer style={{ background: 'var(--color-accent-deep)', color: '#fff', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
      <div style={{
        maxWidth: '84rem', margin: '0 auto', padding: 'clamp(3.5rem, 8vh, 5.5rem) clamp(1.25rem, 4vw, 2.5rem) clamp(2.5rem, 6vh, 4rem)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem 2rem',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <span className="font-display" style={{ fontSize: '1.5rem', fontStyle: 'italic', fontWeight: 500 }}>Bougainvil&rsquo;La</span>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', maxWidth: '20rem', margin: 0 }}>
            {settings.footerTagline}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <span style={labelStyle}>Explore</span>
          {EXPLORE_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="footer-link" style={linkStyle}>{l.label}</Link>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <span style={labelStyle}>Contact</span>
          <span style={{ ...linkStyle, lineHeight: 1.6 }}>{settings.address}</span>
          <a href={telHref} className="footer-link" style={linkStyle}>{settings.phone}</a>
          <a href={`mailto:${settings.email}`} className="footer-link" style={linkStyle}>{settings.email}</a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <span style={labelStyle}>Follow Us</span>
          <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer-link" style={linkStyle}>
            Instagram &mdash; {settings.instagramHandle}
          </a>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem clamp(1.25rem, 4vw, 2.5rem)', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.72rem', letterSpacing: '0.02em', color: 'rgba(255,255,255,0.45)' }}>
          © {new Date().getFullYear()} Bougainvil&rsquo;La. All rights reserved.
        </span>
      </div>

      <style>{`
        .footer-link { transition: color 0.25s ease; }
        .footer-link:hover { color: #fff; }
      `}</style>
    </footer>
  )
}
