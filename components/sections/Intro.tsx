export function Intro() {
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
          Your Perfect Luxury Wedding Begins Here
        </h2>
        <p style={{
          fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
          lineHeight: 1.75, color: 'var(--color-ink-soft)',
        }}>
          If you&rsquo;re searching for the perfect Luxury Wedding Venue Bangalore, Bougainvil&rsquo;La
          offers an unmatched destination wedding experience in South Bangalore. Designed to host
          weddings, receptions, engagements, mehendi, haldi, sangeet, anniversaries and luxury
          celebrations, every space has been thoughtfully created to deliver timeless elegance.
        </p>
      </div>
    </section>
  )
}
