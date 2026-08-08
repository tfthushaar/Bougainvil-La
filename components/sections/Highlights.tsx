import type { HomeContent } from '@/lib/sanity/home'

const IMAGE = '/images/brand/hero/mandap-daylight-clouds.webp'

export function Highlights({ content }: { content: HomeContent }) {
  return (
    <section style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-line)' }}>
      <div style={{
        maxWidth: '84rem', margin: '0 auto', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(2.5rem, 6vw, 4.5rem)',
        alignItems: 'start',
      }}>
        <div style={{ position: 'sticky', top: 'clamp(6rem, 12vh, 8rem)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGE} alt="The floating mandap at Bougainvil'La, daylight"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div>
          <h2 className="font-display" style={{
            fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)', margin: '0 0 2rem', color: 'var(--color-ink)',
          }}>
            What Makes Bougainvil&rsquo;La Different
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {content.highlights.map((f, i) => (
              <div key={f.title} style={{
                display: 'flex', gap: '1.25rem', padding: '1.25rem 0',
                borderTop: i === 0 ? 'none' : '1px solid var(--color-line)',
              }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', color: 'var(--color-gold-deep)', flexShrink: 0, paddingTop: '0.2rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display" style={{ fontWeight: 500, fontSize: '1.1rem', color: 'var(--color-ink)', margin: '0 0 0.35rem' }}>{f.title}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--color-ink-soft)', margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
