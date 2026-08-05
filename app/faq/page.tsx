import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Bougainvil'La",
  description:
    "Answers to common questions about capacity, accommodation, events hosted, parking and weather-readiness at Bougainvil'La, Bangalore's premier destination wedding venue.",
}

const FAQS = [
  {
    q: "How many guests can Bougainvil'La accommodate?",
    a: 'Our celebration spaces can comfortably host weddings and events for up to 1,000 guests.',
  },
  {
    q: 'Do you offer accommodation?',
    a: "Yes. Bougainvil'La features 18 luxurious rooms, including exclusive bridal and groom suites, spacious family rooms, and dormitory accommodation for up to 100 guests.",
  },
  {
    q: 'Can all our wedding functions be hosted here?',
    a: 'Absolutely. Our five distinctive celebration spaces are designed to host every event—from intimate ceremonies and vibrant mehendis to grand receptions and elegant dining experiences.',
  },
  {
    q: 'Is parking available?',
    a: 'Yes. We offer ample parking for over 200 vehicles.',
  },
  {
    q: 'Is the venue suitable during all seasons?',
    a: "Yes. Floral Trellis features Bengaluru's first retractable roof celebration space, allowing you to enjoy the beauty of an outdoor celebration throughout the year.",
  },
]

export default function FAQPage() {
  return (
    <main>
      <section style={{ background: 'var(--color-ink)', padding: 'clamp(6rem, 14vh, 9rem) clamp(1.25rem, 5vw, 3rem) clamp(3rem, 7vh, 4.5rem)', textAlign: 'center' }}>
        <span style={{
          display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem',
          letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem',
        }}>
          FAQ
        </span>
        <h1 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(2rem, 4.4vw, 3.2rem)', color: '#fff', margin: 0 }}>
          Frequently Asked Questions
        </h1>
      </section>

      <section style={{ background: 'var(--color-surface)', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: '42rem', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
          {FAQS.map((item, i) => (
            <div key={item.q} style={{ padding: '1.75rem 0', borderBottom: i < FAQS.length - 1 ? '1px solid var(--color-line)' : 'none' }}>
              <h2 className="font-display" style={{ fontWeight: 500, fontSize: '1.1rem', color: 'var(--color-ink)', margin: '0 0 0.6rem' }}>{item.q}</h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-ink-soft)', margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
