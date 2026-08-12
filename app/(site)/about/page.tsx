import type { Metadata } from 'next'
import { getAboutContent } from '@/lib/content/about'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'
import { EditBridge } from '@/components/EditBridge'

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
      <EditBridge />
      <PageHeader
        eyebrow={about.eyebrow}
        title="About Bougainvil’La"
        image={about.heroImage}
        imagePosition="center 35%"
        editFields={{ eyebrow: 'about:singleton.eyebrow', image: 'about:singleton.heroImage' }}
      />

      <Reveal>
        <section style={{ background: 'var(--color-surface)', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)' }}>
          <div
            data-edit-field="about:singleton.introParagraphs" data-edit-type="list" data-edit-value={about.introParagraphs.join('\n')}
            style={{ maxWidth: '52rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {about.introParagraphs.map((para, i) => (
              <p key={i} style={p}>{para}</p>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-line)', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>
          <div style={{ maxWidth: '52rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <span style={{
              fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--color-gold-deep)',
            }}>
              The Visionary Behind Bougainvil&rsquo;La
            </span>
            <div>
              <h2 className="font-display" data-edit-field="about:singleton.founderName" data-edit-value={about.founderName} style={{ fontWeight: 500, fontSize: '1.6rem', color: 'var(--color-ink)', margin: 0 }}>{about.founderName}</h2>
              <p data-edit-field="about:singleton.founderTitle" data-edit-value={about.founderTitle} style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.85rem', color: 'var(--color-ink-soft)', margin: '0.35rem 0 0' }}>
                {about.founderTitle}
              </p>
            </div>
            <div
              data-edit-field="about:singleton.founderBioParagraphs" data-edit-type="list" data-edit-value={about.founderBioParagraphs.join('\n')}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              {about.founderBioParagraphs.map((para, i) => (
                <p key={i} style={p}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section style={{ background: 'var(--color-surface-3)', borderTop: '1px solid var(--color-line)', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>
          <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
            <span style={{
              display: 'block', textAlign: 'center', fontFamily: 'var(--font-sans)', fontWeight: 500,
              fontSize: '0.72rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-gold-deep)',
              marginBottom: '2.5rem',
            }}>
              Our Highlights
            </span>
            <div
              data-edit-field="about:singleton.highlights" data-edit-type="list" data-edit-value={about.highlights.join('\n')}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem 2rem' }}
            >
              {about.highlights.map((h) => (
                <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ flexShrink: 0, width: '5px', height: '5px', background: 'var(--color-gold-deep)' }} />
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', color: 'var(--color-ink)' }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  )
}
