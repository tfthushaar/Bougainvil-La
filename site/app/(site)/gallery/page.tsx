import type { Metadata } from 'next'
import { getVenues } from '@/lib/content/venues'
import { PageHeader } from '@/components/PageHeader'

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
    <div style={{ columns: '4 220px', columnGap: '0.6rem' }}>
      {urls.map((src) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src} src={src} alt="" loading="lazy"
          style={{ width: '100%', height: 'auto', display: 'block', marginBottom: '0.6rem', breakInside: 'avoid' }}
        />
      ))}
    </div>
  )
}

export default async function GalleryPage() {
  const venues = await getVenues()
  const withCovers = venues.filter((v) => v.cover)
  const headerImage = (withCovers[1] ?? withCovers[0])?.cover ?? null

  return (
    <main>
      <PageHeader
        eyebrow="Gallery"
        title="Every Celebration Tells a Different Story"
        paragraph="Explore moments of joy, timeless décor, breathtaking celebrations, and unforgettable memories through our gallery."
        image={headerImage}
      />

      <div style={{ background: 'var(--color-surface)', padding: '1.5rem clamp(1.25rem, 5vw, 3rem) 0', textAlign: 'center' }}>
        <span style={{
          fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.68rem', letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--color-gold-deep)',
        }}>
          Browse by Celebration Space
        </span>
      </div>

      {/* sticky to the viewport bottom (not the header) so it rides along while
          scrolling through the gallery, then naturally un-sticks once the page
          scrolls past the end of this <main> — right as the footer arrives —
          instead of overlapping the footer. bottom offset on mobile clears the
          fixed StickyMobileCTA bar so the two don't stack on top of each other. */}
      <nav className="gallery-jumpnav" style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-line)', boxShadow: '0 -4px 20px rgba(0,0,0,0.06)', padding: '1rem clamp(1.25rem, 5vw, 3rem)', position: 'sticky', bottom: 0, zIndex: 10 }}>
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
        <style>{`
          @media (max-width: 1240px) {
            .gallery-jumpnav { bottom: 3.5rem; }
          }
        `}</style>
      </nav>

      {venues.map((v, i) => (
        <section key={v.slug} id={v.slug} style={{
          background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-surface-2)',
          padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)', scrollMarginTop: '4rem',
        }}>
          <div style={{ maxWidth: '84rem', margin: '0 auto' }}>
            <h2 className="font-display" style={{ fontWeight: 500, fontSize: '1.6rem', color: 'var(--color-ink)', margin: '0 0 0.35rem' }}>{v.name}</h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.88rem', color: 'var(--color-ink-soft)', margin: '0 0 2rem' }}>{v.tagline}</p>

            <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-gold-deep)', marginBottom: '0.75rem' }}>
              Event Setups
            </span>
            <div style={{ marginBottom: '2rem' }}>
              <ImageGrid urls={v.galleryWithDecor} />
            </div>

            <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-gold-deep)', marginBottom: '0.75rem' }}>
              Venue Views
            </span>
            <ImageGrid urls={v.galleryWithoutDecor} />
          </div>
        </section>
      ))}
    </main>
  )
}
