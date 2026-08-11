import type { HomeContent } from '@/lib/content/home'

export function Highlights({ content }: { content: HomeContent }) {
  return (
    <section style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-line)', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)' }}>
      <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
        <span style={{
          display: 'block', textAlign: 'center', fontFamily: 'var(--font-sans)', fontWeight: 500,
          fontSize: '0.72rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-gold-deep)',
          marginBottom: '2rem',
        }}>
          Our Highlights
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem 2rem' }}>
          {content.highlights.map((h) => (
            <div key={h} style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
              <span style={{ color: 'var(--color-gold-deep)', fontSize: '1rem' }}>✨</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', color: 'var(--color-ink)' }}>{h}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
