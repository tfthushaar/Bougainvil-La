import Link from 'next/link'
import { getVenues } from '@/lib/sanity/venues'

export async function GalleryPreview() {
  const venues = await getVenues()
  return (
    <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-line)', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>
      <div style={{ maxWidth: '84rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 2.5rem' }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--color-gold)',
          }}>
            Gallery
          </span>
          <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)', margin: '0.75rem 0 0.5rem', color: 'var(--color-ink)' }}>
            Every Celebration Tells a Different Story
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.7, color: 'var(--color-ink-soft)' }}>
            Explore moments of joy, timeless décor, breathtaking celebrations, and unforgettable
            memories through our gallery.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
          {venues.map((v) => (
            <Link key={v.slug} href={`/gallery/#${v.slug}`} style={{ textDecoration: 'none', display: 'block', position: 'relative' }}>
              {v.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={v.cover} alt={`${v.name} gallery`} style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }} />
              ) : (
                <div style={{
                  width: '100%', aspectRatio: '1 / 1',
                  background: 'linear-gradient(155deg, var(--color-surface-2), var(--color-accent) 140%)',
                }} />
              )}
              <span style={{
                position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 55%)',
                display: 'flex', alignItems: 'flex-end', padding: '0.75rem',
              }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff' }}>
                  {v.name}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
