import Link from 'next/link'

export function FounderTeaser() {
  return (
    <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-line)' }}>
      <div style={{
        maxWidth: '84rem', margin: '0 auto', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(2rem, 5vw, 4rem)',
        alignItems: 'center',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/venues/sumeera/with-decor/001.webp"
          alt="The floating mandap, decorated, at Bougainvil'La"
          style={{ width: '100%', height: 'clamp(280px, 40vh, 460px)', objectFit: 'cover' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.24em',
            textTransform: 'uppercase', color: 'var(--color-gold)',
          }}>
            Designed Through the Eyes of a Wedding Planner
          </span>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--color-ink-soft)', margin: 0 }}>
            Bougainvil&rsquo;La is the vision of Lakshmi Keerthi, an award-winning luxury wedding
            planner with over two decades of experience in the wedding industry.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--color-ink-soft)', margin: 0 }}>
            After years of creating weddings and understanding what couples, families, planners
            and designers truly need from a venue, she envisioned Bougainvil&rsquo;La as more than a
            beautiful setting. Every space has been thoughtfully created around how weddings
            actually unfold — from ceremonies and guest experiences to décor, dining, photography
            and celebrations.
          </p>
          <p className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: '1.15rem', color: 'var(--color-ink)', margin: 0 }}>
            A venue imagined by a wedding planner. Created for unforgettable weddings.
          </p>
          <Link href="/about/" style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--color-accent-deep)', textDecoration: 'none',
          }}>
            Discover the Story Behind Bougainvil&rsquo;La →
          </Link>
        </div>
      </div>
    </section>
  )
}
