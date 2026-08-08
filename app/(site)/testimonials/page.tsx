import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Testimonials | Bougainvil'La",
  description: "Read what couples are saying about their celebrations at Bougainvil'La on WedMeGood.",
}

export default function TestimonialsPage() {
  return (
    <main>
      <section data-nav-surface="dark" style={{ background: 'var(--color-ink)', padding: 'clamp(6rem, 14vh, 9rem) clamp(1.25rem, 5vw, 3rem)', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
        <span style={{
          display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem',
          letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-gold)',
        }}>
          Testimonials
        </span>
        <h1 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(2rem, 4.4vw, 3.2rem)', color: '#fff', margin: 0, maxWidth: '32rem' }}>
          Read What Couples Are Saying
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', maxWidth: '32rem', margin: 0 }}>
          Our reviews and celebration stories are hosted on WedMeGood.
        </p>
        <a
          href="https://www.wedmegood.com/wedding-venues/Bougainvilla-Celebrate-Luxury-24343653/reviews"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: '#fff', background: 'var(--color-accent-deep)',
            textDecoration: 'none', padding: '0.9rem 1.8rem', marginTop: '0.5rem',
          }}
        >
          View Reviews on WedMeGood →
        </a>
      </section>
    </main>
  )
}
