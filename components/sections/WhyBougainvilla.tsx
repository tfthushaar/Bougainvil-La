import type { HomeContent } from '@/lib/content/home'
import { getRoomTypes } from '@/lib/content/roomTypes'

function BulletList({ heading, items, headingField, listField }: { heading: string; items: string[]; headingField: string; listField: string }) {
  return (
    <div>
      <h3 className="font-display" data-edit-field={headingField} data-edit-value={heading} style={{ fontWeight: 500, fontSize: '1.15rem', color: 'var(--color-ink)', margin: '0 0 1.1rem' }}>
        {heading}
      </h3>
      <ul data-edit-field={listField} data-edit-type="list" data-edit-value={items.join('\n')} style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {items.map((item) => (
          <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <span style={{ flexShrink: 0, marginTop: '0.55em', width: '4px', height: '4px', background: 'var(--color-gold-deep)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.95rem', color: 'var(--color-ink-soft)' }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function WhyBougainvilla({ content }: { content: HomeContent }) {
  const rooms = await getRoomTypes()
  const image = rooms.find((r) => r.photo)?.photo ?? null

  return (
    <section style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-line)' }}>
      <div style={{
        maxWidth: '84rem', margin: '0 auto', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem) 0',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(2.5rem, 6vw, 4.5rem)',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <span aria-hidden style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '3.5rem',
            lineHeight: 0.5, color: 'var(--color-gold-deep)', opacity: 0.55,
          }}>
            &ldquo;
          </span>
          <h2 className="font-display" data-edit-field="home:singleton.whyHeadline" data-edit-value={content.whyHeadline} style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)', margin: 0, color: 'var(--color-ink)' }}>
            {content.whyHeadline}
          </h2>
          <div data-edit-field="home:singleton.whyParagraphs" data-edit-type="list" data-edit-value={content.whyParagraphs.join('\n')} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {content.whyParagraphs.map((para, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--color-ink-soft)', margin: 0 }}>
                {para}
              </p>
            ))}
          </div>
        </div>

        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="A guest suite at Bougainvil'La" style={{ width: '100%', height: 'auto', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', aspectRatio: '4 / 5', background: 'linear-gradient(155deg, var(--color-surface-2), var(--color-accent) 140%)' }} />
        )}
      </div>

      <div style={{
        maxWidth: '84rem', margin: '0 auto', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem 4rem',
      }}>
        <BulletList
          heading={content.whyCouplesChooseHeadline} items={content.whyCouplesChoose}
          headingField="home:singleton.whyCouplesChooseHeadline" listField="home:singleton.whyCouplesChoose"
        />
        <BulletList
          heading={content.eventsWeHostHeadline} items={content.eventsWeHost}
          headingField="home:singleton.eventsWeHostHeadline" listField="home:singleton.eventsWeHost"
        />
      </div>
    </section>
  )
}
