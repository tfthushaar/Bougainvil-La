import type { HomeContent } from '@/lib/sanity/home'

export function Intro({ content }: { content: HomeContent }) {
  return (
    <section style={{
      padding: 'clamp(4rem, 9vh, 6rem) clamp(1.25rem, 5vw, 3rem)',
      background: 'var(--color-surface)', textAlign: 'center',
    }}>
      <div style={{ maxWidth: '48rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <h2 className="font-display" style={{
          fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)',
          color: 'var(--color-ink)', margin: 0,
        }}>
          {content.introHeadline}
        </h2>
        <p style={{
          fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
          lineHeight: 1.75, color: 'var(--color-ink-soft)',
        }}>
          {content.introParagraph}
        </p>
      </div>
    </section>
  )
}
