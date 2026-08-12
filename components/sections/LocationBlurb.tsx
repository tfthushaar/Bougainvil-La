import Link from 'next/link'
import type { HomeContent } from '@/lib/content/home'

export function LocationBlurb({ content }: { content: HomeContent }) {
  return (
    <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-line)', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)', textAlign: 'center' }}>
      <div style={{ maxWidth: '44rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 className="font-display" data-edit-field="home.locationBlurbHeadline" data-edit-value={content.locationBlurbHeadline} style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)', color: 'var(--color-ink)', margin: 0 }}>
          {content.locationBlurbHeadline}
        </h2>
        <p data-edit-field="home.locationBlurbQuote" data-edit-value={content.locationBlurbQuote} style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.98rem', lineHeight: 1.75, color: 'var(--color-ink-soft)', margin: 0 }}>
          &ldquo;{content.locationBlurbQuote}&rdquo;
        </p>
        <Link href="/luxury-wedding-venue-south-bangalore/" style={{
          fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--color-accent-deep)', textDecoration: 'none', marginTop: '0.25rem',
        }}>
          Explore Our Location →
        </Link>
      </div>
    </section>
  )
}
