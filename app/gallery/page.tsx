import type { Metadata } from 'next'
import { getVenues } from '@/lib/sanity/venues'

export const metadata: Metadata = {
  title: "Gallery | Bougainvil'La — Every Celebration Tells a Different Story",
  description:
    'Explore moments of joy, timeless décor, breathtaking celebrations, and unforgettable memories through the Bougainvil’La gallery, browsable by celebration space.',
}

function ImageGrid({ urls }: { urls: string[] }) {
  if (urls.length === 0) {
    return (
      <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.9rem', color: 'var(--color-ink-soft)', fontStyle: 'italic' }}>
        Photos coming soon.
      </p>
    )
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.6rem' }}>
      {urls.map((src) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} src={src} alt="" loading="lazy" style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover' }} />
      ))}
    </div>
  )
}

export default async function GalleryPage() {
  const venues = await getVenues()

  return (
    <main>
      <section style={{ background: 'var(--color-ink)', padding: 'clamp(6rem, 14vh, 9rem) clamp(1.25rem, 5vw, 3rem) clamp(3rem, 7vh, 4.5rem)', textAlign: 'center' }}>
        <span style={{
          display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem',
          letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem',
        }}>
          Gallery
        </span>
        <h1 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(2rem, 4.4vw, 3.2rem)', color: '#fff', margin: '0 0 1rem' }}>
          Every Celebration Tells a Different Story
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', maxWidth: '38rem', margin: '0 auto' }}>
          Explore moments of joy, timeless décor, breathtaking celebrations, and unforgettable
          memories through our gallery.
        </p>
      </section>

      <nav style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-line)', padding: '1rem clamp(1.25rem, 5vw, 3rem)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '84rem', margin: '0 auto', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {venues.map((v) => (
            <a key={v.slug} href={`#${v.slug}`} style={{
              fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--color-ink-soft)', textDecoration: 'none',
            }}>
              {v.name}
            </a>
          ))}
        </div>
      </nav>

      {venues.map((v, i) => (
        <section key={v.slug} id={v.slug} style={{
          background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-surface-2)',
          padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)', scrollMarginTop: '4rem',
        }}>
          <div style={{ maxWidth: '84rem', margin: '0 auto' }}>
            <h2 className="font-display" style={{ fontWeight: 500, fontSize: '1.6rem', color: 'var(--color-ink)', margin: '0 0 0.35rem' }}>{v.name}</h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.88rem', color: 'var(--color-ink-soft)', margin: '0 0 2rem' }}>{v.tagline}</p>

            <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>
              Event Setups
            </span>
            <div style={{ marginBottom: '2rem' }}>
              <ImageGrid urls={v.galleryWithDecor} />
            </div>

            <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.75rem' }}>
              Venue Views
            </span>
            <ImageGrid urls={v.galleryWithoutDecor} />
          </div>
        </section>
      ))}
    </main>
  )
}
