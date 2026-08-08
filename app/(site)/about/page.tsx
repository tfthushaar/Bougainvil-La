import type { Metadata } from 'next'
import { getAboutContent } from '@/lib/sanity/about'

export const metadata: Metadata = {
  title: "About Bougainvil'La – Luxury Wedding Venue in South Bangalore",
  description:
    "At Bougainvil'La, we believe a wedding is far more than a single event. Discover the story behind South Bangalore's premier destination wedding venue and its founder, Lakshmi Keerthi.",
}

const p: React.CSSProperties = {
  fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1.02rem',
  lineHeight: 1.8, color: 'var(--color-ink-soft)', margin: 0,
}

export default async function AboutPage() {
  const about = await getAboutContent()

  return (
    <main>
      <section data-nav-surface="dark" style={{ background: 'var(--color-ink)', padding: 'clamp(6rem, 14vh, 9rem) clamp(1.25rem, 5vw, 3rem) clamp(3rem, 7vh, 4.5rem)', textAlign: 'center' }}>
        <span style={{
          display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem',
          letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem',
        }}>
          {about.eyebrow}
        </span>
        <h1 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(2rem, 4.4vw, 3.2rem)', color: '#fff', margin: 0 }}>
          About Bougainvil&rsquo;La
        </h1>
      </section>

      {about.heroImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={about.heroImage} alt="Bougainvillea archway at Bougainvil'La" style={{ width: '100%', height: 'clamp(300px, 50vh, 560px)', objectFit: 'cover', display: 'block' }} />
      )}

      <section style={{ background: 'var(--color-surface)', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: '42rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {about.introParagraphs.map((para, i) => (
            <p key={i} style={p}>{para}</p>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-line)', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: '42rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--color-gold)',
          }}>
            The Visionary Behind Bougainvil&rsquo;La
          </span>
          <div>
            <h2 className="font-display" style={{ fontWeight: 500, fontSize: '1.6rem', color: 'var(--color-ink)', margin: 0 }}>{about.founderName}</h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.85rem', color: 'var(--color-ink-soft)', margin: '0.35rem 0 0' }}>
              {about.founderTitle}
            </p>
          </div>
          {about.founderBioParagraphs.map((para, i) => (
            <p key={i} style={p}>{para}</p>
          ))}
        </div>
      </section>

      <section data-nav-surface="dark" style={{ background: 'var(--color-ink)', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
          <span style={{
            display: 'block', textAlign: 'center', fontFamily: 'var(--font-sans)', fontWeight: 500,
            fontSize: '0.72rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-gold)',
            marginBottom: '2.5rem',
          }}>
            Our Highlights
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem 2rem' }}>
            {about.highlights.map((h) => (
              <div key={h} style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                <span style={{ color: 'var(--color-gold)', fontSize: '1rem' }}>✨</span>
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', color: '#fff' }}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
