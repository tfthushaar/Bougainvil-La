import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { LocationPageDoc } from '@/lib/sanity/locations'
import { getLocations } from '@/lib/sanity/locations'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'

const HEADER_IMAGE = '/images/brand/hero/ceremony-lawn-daylight.webp'

const LOCALITY_LABELS: Record<string, string> = {
  'wedding-venue-kanakapura-road-bangalore': 'Kanakapura Road',
  'wedding-venue-near-jp-nagar-bangalore': 'JP Nagar',
  'wedding-venue-near-bannerghatta-road': 'Bannerghatta Road',
  'wedding-venue-near-jayanagar-bangalore': 'Jayanagar',
  'wedding-venue-near-nice-road': 'NICE Road',
}

const ptComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display" style={{ fontWeight: 500, fontSize: '1.4rem', color: 'var(--color-ink)', margin: '1rem 0 0' }}>
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.75, color: 'var(--color-ink-soft)', margin: 0 }}>
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem 1.5rem' }}>
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
        <span style={{ flexShrink: 0, marginTop: '0.55em', width: '4px', height: '4px', background: 'var(--color-gold-deep)' }} />
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.95rem', color: 'var(--color-ink-soft)' }}>{children}</span>
      </li>
    ),
  },
}

export async function LocationPageContent({ page }: { page: LocationPageDoc }) {
  const localities = (await getLocations()).filter((l) => !l.isPillar)

  return (
    <main>
      <PageHeader eyebrow={page.subheading} title={page.h1} image={HEADER_IMAGE} imagePosition="center 40%" />

      <Reveal>
        <section style={{ background: 'var(--color-surface)', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)' }}>
          <div style={{ maxWidth: '42rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <PortableText value={page.body} components={ptComponents} />

            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <a href="mailto:bougainvillaluxury@gmail.com?subject=Venue%20Tour%20Request" className="btn-press" style={{
                fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#fff', background: 'var(--color-accent-deep)',
                textDecoration: 'none', padding: '0.85rem 1.7rem',
              }}>
                Book a Venue Tour
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      {page.isPillar && (
        <Reveal>
          <section style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-line)', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)' }}>
            <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {localities.map((l) => (
                  <Link key={l.slug} href={`/${l.slug}/`} style={{
                    display: 'block', background: 'var(--color-surface)', border: '1px solid var(--color-line)',
                    borderTop: '2px solid var(--color-gold-deep)', padding: '1.5rem', textDecoration: 'none',
                  }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-gold-deep)' }}>
                      Near {LOCALITY_LABELS[l.slug] ?? l.h1}
                    </span>
                    <h3 className="font-display" style={{ fontWeight: 500, fontSize: '1.05rem', color: 'var(--color-ink)', margin: '0.5rem 0 0' }}>
                      {l.h1}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}

      {!page.isPillar && (
        <section style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-line)', padding: 'clamp(2.5rem, 6vh, 3.5rem) clamp(1.25rem, 5vw, 3rem)', textAlign: 'center' }}>
          <Link href="/luxury-wedding-venue-south-bangalore/" style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--color-accent-deep)', textDecoration: 'none',
          }}>
            ← Explore All South Bangalore Locations
          </Link>
        </section>
      )}
    </main>
  )
}
