import Link from 'next/link'
import { getVenues } from '@/lib/sanity/venues'

export async function CelebrationSpacesPreview() {
  const venues = await getVenues()
  return (
    <section id="celebration-spaces" style={{ background: 'var(--color-surface)', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>
      <div style={{ maxWidth: '84rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 3rem' }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--color-gold)',
          }}>
            Celebration Spaces
          </span>
          <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)', margin: '0.75rem 0 0.5rem', color: 'var(--color-ink)' }}>
            Five Distinctive Spaces. Endless Possibilities.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.7, color: 'var(--color-ink-soft)' }}>
            As a premier Wedding Venue South Bangalore, Bougainvil&rsquo;La offers five completely
            unique venues that allow every function to have its own identity while remaining
            beautifully connected throughout your wedding celebrations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          {venues.map((v) => (
            <Link key={v.slug} href={`/venues/${v.slug}/`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {v.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.cover} alt={`${v.name} at Bougainvil'La`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                ) : (
                  <div style={{
                    width: '100%', aspectRatio: '4 / 3',
                    background: 'linear-gradient(155deg, var(--color-surface-2), var(--color-accent) 140%)',
                  }} />
                )}
                <div>
                  <h3 className="font-display" style={{ fontWeight: 500, fontSize: '1.2rem', color: 'var(--color-ink)', margin: 0 }}>{v.name}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.85rem', color: 'var(--color-ink-soft)', margin: '0.35rem 0 0' }}>{v.tagline}</p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)', margin: '0.5rem 0 0' }}>
                    {v.seated} Seated &middot; {v.floating} Floating
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
