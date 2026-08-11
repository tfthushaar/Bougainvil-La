import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getVenues, getVenueBySlug, getVenueSlugs } from '@/lib/content/venues'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'

export async function generateStaticParams() {
  const slugs = await getVenueSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const venue = await getVenueBySlug(slug)
  if (!venue) return {}
  return {
    title: `${venue.name} — ${venue.tagline} | Bougainvil'La`,
    description: venue.description[0],
  }
}

export default async function VenueDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [venue, allVenues] = await Promise.all([getVenueBySlug(slug), getVenues()])
  if (!venue) notFound()

  return (
    <main>
      <PageHeader
        eyebrow={venue.tagline}
        title={venue.name}
        paragraph={venue.subtitle ?? undefined}
        meta={`${venue.seated} Seated · ${venue.floating} Floating`}
        image={venue.cover ?? venue.highlights[0] ?? null}
      />

      {venue.highlights.length > 0 ? (
        <div style={{
          columns: venue.highlights.length > 1 ? '2 340px' : '1', columnGap: '0.4rem',
          padding: venue.highlights.length > 1 ? '0.4rem' : 0,
        }}>
          {venue.highlights.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src} src={src} alt={`${venue.name} at Bougainvil'La`}
              style={{
                width: '100%', height: 'auto', display: 'block',
                marginBottom: venue.highlights.length > 1 ? '0.4rem' : 0,
                breakInside: 'avoid',
              }}
            />
          ))}
        </div>
      ) : (
        <div style={{ width: '100%', height: 'clamp(280px, 46vh, 520px)', background: 'linear-gradient(155deg, var(--color-surface-2), var(--color-accent) 140%)' }} />
      )}

      <Reveal>
        <section style={{ background: 'var(--color-surface)', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)' }}>
          <div style={{ maxWidth: '42rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {venue.description.map((para, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--color-ink-soft)', margin: 0 }}>
                {para}
              </p>
            ))}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <Link href={`/gallery/#${venue.slug}`} style={{
                fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--color-accent-deep)', textDecoration: 'none',
              }}>
                View Full Gallery →
              </Link>
              <a href="mailto:bougainvillaluxury@gmail.com?subject=Venue%20Tour%20Request" className="btn-press" style={{
                fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#fff', background: 'var(--color-accent-deep)',
                textDecoration: 'none', padding: '0.85rem 1.7rem',
              }}>
                Book a Venue Tour
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-line)', padding: 'clamp(2.5rem, 6vh, 3.5rem) clamp(1.25rem, 5vw, 3rem)' }}>
          <div style={{ maxWidth: '84rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            {allVenues.filter((v) => v.slug !== venue.slug).slice(0, 4).map((v) => (
              <Link key={v.slug} href={`/venues/${v.slug}/`} style={{
                fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--color-ink-soft)', textDecoration: 'none',
              }}>
                {v.name}
              </Link>
            ))}
          </div>
        </section>
      </Reveal>
    </main>
  )
}
