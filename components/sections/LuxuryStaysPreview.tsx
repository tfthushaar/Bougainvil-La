import Link from 'next/link'

export function LuxuryStaysPreview() {
  return (
    <section style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-line)', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)', textAlign: 'center' }}>
      <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
        <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', margin: '0 0 0.75rem', color: 'var(--color-ink)' }}>
          Stay Together. Celebrate Longer.
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-ink-soft)', margin: '0 0 1.5rem' }}>
          18 beautifully appointed rooms comfortably host up to 100 guests overnight.
        </p>
        <Link href="/luxury-stays/" style={{
          fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--color-accent-deep)', textDecoration: 'none',
        }}>
          Explore Luxury Accommodation →
        </Link>
      </div>
    </section>
  )
}
