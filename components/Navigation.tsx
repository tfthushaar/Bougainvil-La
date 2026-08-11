'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { SiteSettings } from '@/lib/sanity/siteSettings'

// Secret entry point to the Studio: click the wordmark 5 times in quick
// succession. Not real security (Sanity's own login is) — just keeps the
// admin route from being an obvious thing casual visitors stumble onto.
const SECRET_CLICKS = 5
const SECRET_WINDOW_MS = 1500

const NAV_LINKS = [
  { href: '/about/', label: 'About' },
  { href: '/venues/', label: 'Celebration Spaces' },
  { href: '/luxury-stays/', label: 'Luxury Stays' },
  { href: '/luxury-wedding-venue-south-bangalore/', label: 'Locations' },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/testimonials/', label: 'Testimonials' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/contact/', label: 'Contact' },
]

function CTAButtons({ compact, textColor, settings }: { compact?: boolean; textColor: string; settings: SiteSettings }) {
  const pad = compact ? '0.55rem 0.85rem' : '0.85rem 1.7rem'
  const size = compact ? '0.66rem' : '0.75rem'
  const tracking = compact ? '0.08em' : '0.14em'
  const mailto = `mailto:${settings.email}?subject=${encodeURIComponent(settings.bookTourEmailSubject)}`
  const borderColor = textColor === '#fff' ? 'var(--color-gold)' : 'var(--color-gold-deep)'
  return (
    <div style={{ display: 'flex', gap: compact ? '0.6rem' : '0.9rem' }}>
      <a href={mailto} className="btn-press" style={{
        fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: size, letterSpacing: tracking,
        textTransform: 'uppercase', color: '#fff', background: 'var(--color-accent-deep)',
        textDecoration: 'none', padding: pad, whiteSpace: 'nowrap',
      }}>
        Book a Venue Tour
      </a>
      <a href="/brochure.pdf" className="btn-press" style={{
        fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: size, letterSpacing: tracking,
        textTransform: 'uppercase', color: textColor, background: 'transparent', transition: 'color 0.3s ease, border-color 0.3s ease',
        textDecoration: 'none', padding: pad, border: `1px solid ${borderColor}`, whiteSpace: 'nowrap',
      }}>
        Download Brochure
      </a>
    </div>
  )
}

export function Navigation({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false)
  const [onLight, setOnLight] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const logoClickCount = useRef(0)
  const logoLastClickAt = useRef(0)

  function handleLogoClick(e: React.MouseEvent) {
    const now = Date.now()
    logoClickCount.current = now - logoLastClickAt.current > SECRET_WINDOW_MS ? 1 : logoClickCount.current + 1
    logoLastClickAt.current = now

    if (logoClickCount.current >= SECRET_CLICKS) {
      logoClickCount.current = 0
      e.preventDefault()
      router.push('/studio/')
    }
  }

  useEffect(() => {
    // Every dark-background section on the site (Hero, page headers, the
    // Highlights band, location pages, etc.) is tagged data-nav-surface="dark".
    // If any of them currently overlaps the strip the fixed nav sits over,
    // the nav needs light (white) text; otherwise it's over a light section
    // and needs dark ink text. This handles pages with no dark section at
    // all, and pages with more than one (e.g. the home page's Hero *and*
    // Highlights), not just a single before/after threshold.
    function check() {
      const navHeight = headerRef.current?.offsetHeight ?? 72
      const darkSurfaces = document.querySelectorAll('[data-nav-surface="dark"]')
      let overDark = false
      darkSurfaces.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top <= navHeight && rect.bottom >= 0) overDark = true
      })
      setOnLight(!overDark)
    }

    check()
    let ticking = false
    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { check(); ticking = false })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', check)

    // Hero resolves `prefers-reduced-motion` async before it renders its
    // real dark-surface element, so it isn't in the DOM yet on Navigation's
    // first check — recheck once it actually appears, rather than waiting
    // for the user to scroll first.
    const observer = new MutationObserver(check)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', check)
      observer.disconnect()
    }
  }, [])

  const textColor = onLight ? 'var(--color-ink)' : '#fff'
  const textShadow = onLight ? 'none' : '0 1px 8px rgba(0,0,0,0.5)'

  const linkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.07em',
    textTransform: 'uppercase', color: textColor, textDecoration: 'none', textShadow, whiteSpace: 'nowrap',
    transition: 'color 0.3s ease',
  }

  return (
    <header ref={headerRef} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'transparent' }}>
      <div style={{
        maxWidth: '88rem', margin: '0 auto', padding: '1.1rem clamp(1.25rem, 4vw, 2.75rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem',
      }}>
        <Link href="/" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }} aria-label="Bougainvil'La — Home">
          <span className="font-display" style={{
            fontStyle: 'italic', fontWeight: 500, fontSize: '1.35rem', color: textColor,
            textShadow, transition: 'color 0.3s ease',
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
            display: 'none', background: 'none', border: `1px solid ${textColor}`, transition: 'border-color 0.3s ease',
            padding: '0.5rem 0.7rem', cursor: 'pointer', flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: textColor, transition: 'color 0.3s ease' }}>
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
            <Link key={l.href} href={l.href} style={{ ...linkStyle, color: '#fff', textShadow: 'none' }} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <div style={{ marginTop: '0.5rem' }}>
            <CTAButtons textColor="#fff" settings={settings} />
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
