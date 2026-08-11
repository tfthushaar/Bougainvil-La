'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import type { SiteSettings } from '@/lib/content/siteSettings'

// Secret entry point to the Studio: click the wordmark 5 times in quick
// succession. Not real security (Sanity's own login is) — just keeps the
// admin route from being an obvious thing casual visitors stumble onto.
// Studio is hosted standalone (not embedded on this site), hence the
// external navigation instead of an internal route push.
const SECRET_CLICKS = 5
const SECRET_WINDOW_MS = 1500
const STUDIO_URL = 'https://bougainvilla.sanity.studio/'

const NAV_LINKS = [
  { href: '/about/', label: 'About' },
  { href: '/venues/', label: 'Celebration Spaces' },
  { href: '/luxury-stays/', label: 'Luxury Stays' },
  { href: '/luxury-wedding-venue-south-bangalore/', label: 'Locations' },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/blog/', label: 'Blog' },
  { href: '/testimonials/', label: 'Testimonials' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/contact/', label: 'Contact' },
]

function CTAButtons({ compact, stack, textColor, settings }: { compact?: boolean; stack?: boolean; textColor: string; settings: SiteSettings }) {
  const pad = compact ? '0.55rem 0.85rem' : '0.85rem 1.7rem'
  const size = compact ? '0.66rem' : '0.75rem'
  const tracking = compact ? '0.08em' : '0.14em'
  const mailto = `mailto:${settings.email}?subject=${encodeURIComponent(settings.bookTourEmailSubject)}`
  const borderColor = textColor === '#fff' ? 'var(--color-gold)' : 'var(--color-gold-deep)'
  return (
    <div style={{ display: 'flex', flexDirection: stack ? 'column' : 'row', flexWrap: 'wrap', gap: compact ? '0.6rem' : '0.9rem' }}>
      <a href={mailto} className="btn-press" style={{
        fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: size, letterSpacing: tracking,
        textTransform: 'uppercase', color: '#fff', background: 'var(--color-accent-deep)',
        textDecoration: 'none', padding: pad, textAlign: 'center', whiteSpace: 'nowrap',
      }}>
        Book a Venue Tour
      </a>
      <a href="/brochure.pdf" className="btn-press" style={{
        fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: size, letterSpacing: tracking,
        textTransform: 'uppercase', color: textColor, background: 'transparent', transition: 'color 0.3s ease, border-color 0.3s ease',
        textDecoration: 'none', padding: pad, textAlign: 'center', border: `1px solid ${borderColor}`, whiteSpace: 'nowrap',
      }}>
        Download Brochure
      </a>
    </div>
  )
}

export function Navigation({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const logoClickCount = useRef(0)
  const logoLastClickAt = useRef(0)

  function handleLogoClick(e: React.MouseEvent) {
    const now = Date.now()
    logoClickCount.current = now - logoLastClickAt.current > SECRET_WINDOW_MS ? 1 : logoClickCount.current + 1
    logoLastClickAt.current = now

    if (logoClickCount.current >= SECRET_CLICKS) {
      logoClickCount.current = 0
      e.preventDefault()
      window.location.href = STUDIO_URL
    }
  }

  // Always dark ink, bold — was previously switching to white over photo
  // sections, which washed out illegibly against bright skies/light areas
  // of a photo. A reliably light, semi-opaque bar (below) means dark text
  // stays legible everywhere, so there's no need to detect what's behind it.
  const textColor = 'var(--color-ink)'

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.07em',
    textTransform: 'uppercase', color: textColor, textDecoration: 'none', whiteSpace: 'nowrap',
  }

  return (
    <header ref={headerRef} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
      {/* Separate background layer, not on the header itself — masking the
          header directly would also fade out the nav links/logo/buttons
          near the bottom of the bar, not just the frost behind them. A hard
          edge (border/solid cutoff) reads as a bar sitting on top of the
          page; fading just this layer dissolves it into the content
          underneath instead. Light + fairly opaque so the always-dark text
          above stays legible regardless of what photo is behind it. */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: -1,
        background: 'color-mix(in oklch, var(--color-surface) 82%, transparent)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
      }} />
      <div style={{
        maxWidth: '88rem', margin: '0 auto', padding: '0.75rem clamp(1.25rem, 4vw, 2.75rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem',
      }}>
        <Link href="/" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }} aria-label="Bougainvil'La — Home">
          <span className="font-display" style={{
            fontStyle: 'italic', fontWeight: 700, fontSize: '1.35rem', color: textColor,
          }}>
            Bougainvil&rsquo;La
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: 'clamp(0.6rem, 1.2vw, 1.1rem)', flexWrap: 'nowrap', justifyContent: 'flex-end' }} className="nav-links-desktop">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} style={linkStyle}>{l.label}</Link>
          ))}
        </nav>

        <div className="nav-cta-desktop">
          <CTAButtons compact textColor={textColor} settings={settings} />
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="nav-menu-button"
          style={{
            display: 'none', background: 'none', border: `1px solid ${textColor}`,
            padding: '0.5rem 0.7rem', cursor: 'pointer', flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: textColor }}>
            {open ? 'Close' : 'Menu'}
          </span>
        </button>
      </div>

      {open && (
        <div className="nav-mobile-panel" style={{
          padding: '1.25rem clamp(1.25rem, 4vw, 2.5rem) 1.75rem',
          display: 'flex', flexDirection: 'column', gap: '1rem',
          background: 'var(--color-ink)',
        }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} style={{ ...linkStyle, color: '#fff' }} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <div style={{ marginTop: '0.5rem' }}>
            <CTAButtons stack textColor="#fff" settings={settings} />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1240px) {
          .nav-links-desktop, .nav-cta-desktop { display: none !important; }
          .nav-menu-button { display: inline-flex !important; }
        }
        @media (min-width: 1241px) {
          .nav-mobile-panel { display: none !important; }
        }
      `}</style>
    </header>
  )
}
