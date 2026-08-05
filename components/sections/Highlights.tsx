const FEATURES: { title: string; desc: string }[] = [
  { title: 'Floating Mandap', desc: 'Exchange vows on our iconic mandap surrounded by shimmering waters.' },
  { title: 'Retractable Roof Celebration Space', desc: "Bengaluru's first — celebrate outdoors with year-round comfort, rain or shine." },
  { title: 'Five Distinctive Celebration Spaces', desc: 'Every event enjoys its own unique atmosphere without ever leaving the venue.' },
  { title: 'Luxury Accommodation', desc: '18 elegant rooms hosting up to 100 guests overnight.' },
  { title: 'Landscaped Gardens', desc: 'Beautiful walkways, mature trees, and endless greenery create stunning backdrops.' },
  { title: 'Picture-Perfect Corners', desc: 'Every turn offers a setting worthy of your wedding album.' },
  { title: 'Prime South Bengaluru Location', desc: "A destination wedding experience that's beautifully accessible." },
  { title: 'Temple', desc: 'A dedicated on-site temple for traditional rites and ceremonies.' },
  { title: 'Capacity for up to 1,000 Guests', desc: 'Grand enough for the biggest celebrations, intimate enough for the smallest.' },
  { title: 'Parking for Over 200 Vehicles', desc: 'Effortless arrival and departure for every guest.' },
]

export function Highlights() {
  return (
    <section style={{ background: 'var(--color-ink)', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>
      <div style={{ maxWidth: '76rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '42rem', margin: '0 auto 3rem' }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--color-gold)',
          }}>
            Highlights
          </span>
          <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)', margin: '0.75rem 0 0', color: '#fff' }}>
            What Makes Bougainvil&rsquo;La Different
          </h2>
        </div>

        <div className="highlights-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
          border: '1px solid rgba(255,255,255,0.12)', borderLeft: 'none', borderTop: 'none',
        }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} style={{
              padding: '1.75rem', borderLeft: '1px solid rgba(255,255,255,0.12)', borderTop: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', flexDirection: 'column', gap: '0.6rem',
            }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', color: 'var(--color-gold)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display" style={{ fontWeight: 500, fontSize: '1.05rem', color: '#fff', margin: 0 }}>{f.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.85rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) { .highlights-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 520px) { .highlights-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
