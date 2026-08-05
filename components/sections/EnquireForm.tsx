const fieldStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.95rem', color: 'var(--color-ink)',
  background: 'var(--color-surface)', border: '1px solid var(--color-line)',
  padding: '0.8rem 1rem', width: '100%',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.14em',
  textTransform: 'uppercase', color: 'var(--color-ink-soft)', marginBottom: '0.5rem', display: 'block',
}

export function EnquireForm() {
  return (
    <section id="enquire" style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-line)', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>
      <div style={{ maxWidth: '52rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--color-gold)',
          }}>
            Begin Your Celebration
          </span>
          <h2 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)', margin: '0.75rem 0 0.5rem', color: 'var(--color-ink)' }}>
            Let&rsquo;s Create Something Beautiful Together
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.7, color: 'var(--color-ink-soft)' }}>
            Whether you&rsquo;re envisioning an intimate celebration or a grand destination wedding,
            we&rsquo;d be delighted to welcome you for a tour and help bring your vision to life.
          </p>
        </div>

        <form name="enquiry" method="POST" data-netlify="true" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <input type="hidden" name="form-name" value="enquiry" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label htmlFor="name" style={labelStyle}>Full Name</label>
              <input id="name" name="name" type="text" required style={fieldStyle} />
            </div>
            <div>
              <label htmlFor="phone" style={labelStyle}>Phone Number</label>
              <input id="phone" name="phone" type="tel" required style={fieldStyle} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label htmlFor="email" style={labelStyle}>Email Address</label>
              <input id="email" name="email" type="email" required style={fieldStyle} />
            </div>
            <div>
              <label htmlFor="wedding_date" style={labelStyle}>Wedding Date</label>
              <input id="wedding_date" name="wedding_date" type="date" style={fieldStyle} />
            </div>
          </div>
          <div>
            <label htmlFor="guest_count" style={labelStyle}>Estimated Guest Count</label>
            <input id="guest_count" name="guest_count" type="number" min={1} style={fieldStyle} />
          </div>
          <div>
            <label htmlFor="message" style={labelStyle}>Tell Us About Your Celebration</label>
            <textarea id="message" name="message" rows={4} style={{ ...fieldStyle, resize: 'vertical' }} />
          </div>
          <button type="submit" style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.16em',
            textTransform: 'uppercase', color: '#fff', background: 'var(--color-accent-deep)',
            border: 'none', padding: '1rem 2rem', cursor: 'pointer', marginTop: '0.5rem',
          }}>
            Book a Venue Tour
          </button>
        </form>
      </div>
    </section>
  )
}
