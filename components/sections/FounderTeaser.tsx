import Link from 'next/link'
import type { HomeContent } from '@/lib/content/home'

export function FounderTeaser({ content }: { content: HomeContent }) {
  return (
    <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-line)' }}>
      <div style={{
        maxWidth: '84rem', margin: '0 auto', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(2rem, 5vw, 4rem)',
        alignItems: 'center',
      }}>
        {content.founderImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={content.founderImage}
            alt="The floating mandap, decorated, at Bougainvil'La"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.24em',
            textTransform: 'uppercase', color: 'var(--color-gold-deep)',
          }}>
            {content.founderEyebrow}
          </span>
          {content.founderParagraphs.map((para, i) => (
            <p key={i} style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--color-ink-soft)', margin: 0 }}>
              {para}
            </p>
          ))}
          <p className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: '1.15rem', color: 'var(--color-ink)', margin: 0 }}>
            {content.founderQuote}
          </p>
          <Link href="/about/" style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--color-accent-deep)', textDecoration: 'none',
          }}>
            Discover the Story Behind Bougainvil&rsquo;La →
          </Link>
        </div>
      </div>
    </section>
  )
}
