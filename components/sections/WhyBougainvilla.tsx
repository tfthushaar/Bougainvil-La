import type { HomeContent } from '@/lib/sanity/home'

export function WhyBougainvilla({ content }: { content: HomeContent }) {
  return (
    <section style={{
      background: 'var(--color-surface)', borderTop: '1px solid var(--color-line)',
      padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)', textAlign: 'center',
    }}>
      <div style={{ maxWidth: '46rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <span style={{
          fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--color-gold)',
        }}>
          Why Bougainvil&rsquo;La
        </span>
        <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)', margin: 0, color: 'var(--color-ink)' }}>
          {content.whyHeadline}
        </h2>
        {content.whyParagraphs.map((para, i) => (
          <p key={i} style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-ink-soft)', margin: 0 }}>
            {para}
          </p>
        ))}
      </div>
    </section>
  )
}
