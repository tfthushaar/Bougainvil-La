import Link from 'next/link'

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

export function Footer() {
  return (
    <footer style={{ background: 'var(--color-ink)', color: '#fff' }}>
      <div style={{
        maxWidth: '84rem', margin: '0 auto', padding: 'clamp(3rem, 7vh, 5rem) clamp(1.25rem, 4vw, 2.5rem)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <span className="font-display" style={{ fontSize: '1.4rem', fontWeight: 500 }}>Bougainvil&rsquo;La</span>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', maxWidth: '20rem' }}>
            Celebrate Luxury. Create Memories That Last Forever.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>Explore</span>
          {EXPLORE_LINKS.map((l) => (
            <Link key={l.href} href={l.href} style={linkStyle}>{l.label}</Link>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>Contact</span>
          <span style={{ ...linkStyle }}>📍 Near Bolare, K.G. Gollarapalya, Kanakapura Road, Bengaluru, Karnataka – 562109</span>
          <a href="tel:+918660654160" style={linkStyle}>📞 +91 86606 54160</a>
          <a href="mailto:bougainvillaluxury@gmail.com" style={linkStyle}>✉️ bougainvillaluxury@gmail.com</a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>Follow Us</span>
          <a href="https://www.instagram.com/bougainvillaweddingvenue/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            Instagram &mdash; @bougainvillaweddingvenue
          </a>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', padding: '1.25rem clamp(1.25rem, 4vw, 2.5rem)', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>
          © {new Date().getFullYear()} Bougainvil&rsquo;La. All rights reserved.
        </span>
      </div>
    </footer>
  )
}
