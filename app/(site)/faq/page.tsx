import type { Metadata } from 'next'
import { getFaqItems } from '@/lib/sanity/faq'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Bougainvil'La",
  description:
    "Answers to common questions about capacity, accommodation, events hosted, parking and weather-readiness at Bougainvil'La, Bangalore's premier destination wedding venue.",
}

export default async function FAQPage() {
  const faqs = await getFaqItems()

  return (
    <main>
      <PageHeader eyebrow="FAQ" title="Frequently Asked Questions" />

      <Reveal>
        <section style={{ background: 'var(--color-surface)', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)' }}>
          <div style={{ maxWidth: '42rem', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
            {faqs.map((item, i) => (
              <div key={item.question} style={{ padding: '1.75rem 0', borderBottom: i < faqs.length - 1 ? '1px solid var(--color-line)' : 'none' }}>
                <h2 className="font-display" style={{ fontWeight: 500, fontSize: '1.1rem', color: 'var(--color-ink)', margin: '0 0 0.6rem' }}>{item.question}</h2>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-ink-soft)', margin: 0 }}>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </main>
  )
}
