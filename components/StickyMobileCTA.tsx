import type { SiteSettings } from '@/lib/sanity/siteSettings'

export function StickyMobileCTA({ settings }: { settings: SiteSettings }) {
  const mailto = `mailto:${settings.email}?subject=${encodeURIComponent(settings.bookTourEmailSubject)}`

  return (
    <div className="sticky-mobile-cta" style={{
      position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 90,
      display: 'none', borderTop: '1px solid var(--color-line)',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
    }}>
      <a href={mailto} className="btn-press" style={{
        flex: 1, fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.08em',
        textTransform: 'uppercase', color: '#fff', background: 'var(--color-accent-deep)',
        textDecoration: 'none', textAlign: 'center', padding: '1.1rem 0.5rem',
      }}>
        Book a Venue Tour
      </a>
      <a href="/brochure.pdf" className="btn-press" style={{
        flex: 1, fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.08em',
        textTransform: 'uppercase', color: 'var(--color-ink)', background: 'var(--color-surface)',
        textDecoration: 'none', textAlign: 'center', padding: '1.1rem 0.5rem', borderLeft: '1px solid var(--color-line)',
      }}>
        Download Brochure
      </a>

      <style>{`
        @media (max-width: 1240px) {
          .sticky-mobile-cta { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
