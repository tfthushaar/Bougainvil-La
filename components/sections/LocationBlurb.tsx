import Link from 'next/link'

export function LocationBlurb() {
  return (
    <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-line)', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)', textAlign: 'center' }}>
      <div style={{ maxWidth: '44rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)', color: 'var(--color-ink)', margin: 0 }}>
          A Luxury Wedding Destination in South Bangalore
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.98rem', lineHeight: 1.75, color: 'var(--color-ink-soft)', margin: 0 }}>
          &ldquo;Located near Bolare on Kanakapura Road, Bougainvil&rsquo;La is conveniently
          accessible from JP Nagar, Basavanagudi, Banashankari, Jayanagar, Bannerghatta Road,
          Nice Road and neighbourhoods across South Bengaluru.&rdquo;
        </p>
        <Link href="/luxury-wedding-venue-south-bangalore/" style={{
          fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--color-accent-deep)', textDecoration: 'none', marginTop: '0.25rem',
        }}>
          Explore Our Location →
        </Link>
      </div>
    </section>
  )
}
