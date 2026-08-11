import type { Metadata } from 'next'
import Link from 'next/link'
import { getVenues } from '@/lib/content/venues'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = {
  title: "Celebration Spaces | Bougainvil'La — Five Distinctive Wedding Venues in South Bangalore",
  description:
    "Bougainvil'La offers five completely unique celebration spaces — Sumeera, Floral Trellis, Divine Bells, Margarita and Ice Spice — each with its own identity.",
}

export default async function VenuesPage() {
  const venues = await getVenues()
  const headerImage = venues.find((v) => v.cover)?.cover ?? null

  return (
    <main>
      <PageHeader
        eyebrow="Celebration Spaces"
        title="Five Distinctive Spaces. Endless Possibilities."
        paragraph="As a premier Wedding Venue South Bangalore, Bougainvil’La offers five completely unique venues that allow every function to have its own identity while remaining beautifully connected throughout your wedding celebrations."
        image={headerImage}
      />

      <Reveal>
        <section style={{ background: 'var(--color-surface)', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>
          <div style={{ maxWidth: '84rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            {venues.map((v) => (
              <Link key={v.slug} href={`/venues/${v.slug}/`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {v.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={v.cover} alt={`${v.name} at Bougainvil'La`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                  ) : (
                    <div style={{ width: '100%', aspectRatio: '4 / 3', background: 'linear-gradient(155deg, var(--color-surface-2), var(--color-accent) 140%)' }} />
                  )}
                  <div>
                    <h2 className="font-display" style={{ fontWeight: 500, fontSize: '1.2rem', color: 'var(--color-ink)', margin: 0 }}>{v.name}</h2>
                    <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.85rem', color: 'var(--color-ink-soft)', margin: '0.35rem 0 0' }}>{v.tagline}</p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold-deep)', margin: '0.5rem 0 0' }}>
                      {v.seated} Seated &middot; {v.floating} Floating
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-line)', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)', textAlign: 'center' }}>
          <div style={{ maxWidth: '40rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)', color: 'var(--color-ink)', margin: 0 }}>
              Looking for a wedding venue in South Bangalore?
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.98rem', lineHeight: 1.75, color: 'var(--color-ink-soft)', margin: 0 }}>
              Discover why couples from Kanakapura Road, JP Nagar, Jayanagar, Bannerghatta Road,
              Nice Road and across Bengaluru choose Bougainvil&rsquo;La for destination-style
              celebrations.
            </p>
            <Link href="/luxury-wedding-venue-south-bangalore/" style={{
              fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--color-accent-deep)', textDecoration: 'none', marginTop: '0.25rem',
            }}>
              Explore Our Location →
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  )
}
