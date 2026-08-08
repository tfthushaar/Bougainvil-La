import type { HomeContent } from '@/lib/sanity/home'
import { getRoomTypes } from '@/lib/sanity/roomTypes'

export async function WhyBougainvilla({ content }: { content: HomeContent }) {
  const rooms = await getRoomTypes()
  const image = rooms.find((r) => r.photo)?.photo ?? null

  return (
    <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-line)' }}>
      <div style={{
        maxWidth: '84rem', margin: '0 auto', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(2.5rem, 6vw, 4.5rem)',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <span aria-hidden style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '3.5rem',
            lineHeight: 0.5, color: 'var(--color-gold-deep)', opacity: 0.55,
          }}>
            &ldquo;
          </span>
          <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)', margin: 0, color: 'var(--color-ink)' }}>
            {content.whyHeadline}
          </h2>
          {content.whyParagraphs.map((para, i) => (
            <p key={i} style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-ink-soft)', margin: 0 }}>
              {para}
            </p>
          ))}
        </div>

        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="A guest suite at Bougainvil'La" style={{ width: '100%', height: 'auto', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', aspectRatio: '4 / 5', background: 'linear-gradient(155deg, var(--color-surface-2), var(--color-accent) 140%)' }} />
        )}
      </div>
    </section>
  )
}
