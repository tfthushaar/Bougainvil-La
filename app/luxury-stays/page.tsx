import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Luxury Stays | Bougainvil'La — Accommodation for 100 Guests",
  description:
    "18 beautifully appointed rooms at Bougainvil'La comfortably host up to 100 guests, including a Bridal Suite, Groom's Suite, Luxury Family Rooms and Dormitories.",
}

const ROOMS = [
  { type: 'Bridal Suite', qty: 1, capacity: 'Up to 3 Guests' },
  { type: "Groom's Suite", qty: 1, capacity: 'Up to 3 Guests' },
  { type: 'Luxury Family Rooms', qty: 14, capacity: 'Up to 5 Guests Each' },
  { type: 'Dormitories', qty: 2, capacity: 'Up to 12 Guests Each' },
]

const ROOM_TYPES = [
  {
    name: 'The Bridal Suite',
    desc: 'A beautifully designed private suite offering elegant interiors, generous natural light, and a luxurious setting for bridal preparations, quiet moments, and timeless photographs before the celebrations begin.',
  },
  {
    name: "The Groom's Suite",
    desc: "Sophisticated and spacious, the groom's suite provides the perfect place to prepare, relax, and celebrate alongside family and friends before every event.",
  },
  {
    name: 'Luxury Family Rooms',
    desc: 'Our spacious family rooms have been thoughtfully designed to keep loved ones together while offering exceptional comfort throughout the celebrations. Beautifully furnished with modern amenities, they create a welcoming retreat between every event.',
  },
  {
    name: 'Dormitory Accommodation',
    desc: "Perfect for larger groups of friends and extended family, our dormitory offers generous space, comfort, and convenience while maintaining the same high standard of hospitality found throughout Bougainvil'La.",
  },
]

export default function LuxuryStaysPage() {
  return (
    <main>
      <section style={{ background: 'var(--color-ink)', padding: 'clamp(6rem, 14vh, 9rem) clamp(1.25rem, 5vw, 3rem) clamp(3rem, 7vh, 4.5rem)', textAlign: 'center' }}>
        <span style={{
          display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem',
          letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem',
        }}>
          Luxury Stays
        </span>
        <h1 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(2rem, 4.4vw, 3.2rem)', color: '#fff', margin: 0 }}>
          Stay Together. Celebrate Longer.
        </h1>
      </section>

      <section style={{ background: 'var(--color-surface)', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: '42rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--color-ink-soft)', margin: 0 }}>
            Some of the most cherished wedding memories happen long after the ceremonies
            end—late-night conversations, laughter with loved ones, getting ready together, and
            waking up surrounded by family and friends. At Bougainvil&rsquo;La, your celebration
            doesn&rsquo;t end when the music does.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--color-ink-soft)', margin: 0 }}>
            Our thoughtfully designed luxury accommodation allows your closest family and guests
            to stay right where the celebrations unfold, creating a seamless destination wedding
            experience without ever having to leave the venue.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--color-ink-soft)', margin: 0 }}>
            Featuring <strong>18 beautifully appointed rooms</strong>, our accommodation
            comfortably hosts <strong>up to 100 guests</strong>, ensuring everyone enjoys the same
            warmth, comfort, and hospitality throughout their stay.
          </p>
        </div>

        <div style={{ maxWidth: '42rem', margin: '2.5rem auto 0' }}>
          <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem' }}>
            At a Glance
          </span>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-line)' }}>
                {['Room Type', 'Quantity', 'Capacity per Room'].map((h) => (
                  <th key={h} style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-gold)', padding: '0.75rem 0.5rem' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROOMS.map((r) => (
                <tr key={r.type} style={{ borderBottom: '1px solid var(--color-line)' }}>
                  <td style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.92rem', color: 'var(--color-ink)', padding: '0.75rem 0.5rem' }}>{r.type}</td>
                  <td style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.92rem', color: 'var(--color-ink-soft)', padding: '0.75rem 0.5rem' }}>{r.qty}</td>
                  <td style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.92rem', color: 'var(--color-ink-soft)', padding: '0.75rem 0.5rem' }}>{r.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {ROOM_TYPES.map((r, i) => (
        <section key={r.name} style={{
          background: i % 2 === 0 ? 'var(--color-surface-2)' : 'var(--color-surface)',
          borderTop: '1px solid var(--color-line)',
        }}>
          <div style={{
            maxWidth: '84rem', margin: '0 auto', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'center',
          }}>
            {/* TODO: every supplied room photo (bridal/groom/family) was an unusable
                blurry frame; no dormitory photos were supplied at all — needs real
                room photography from the client. */}
            <div style={{
              order: i % 2 === 0 ? 1 : 0, width: '100%', height: 'clamp(240px, 34vh, 380px)',
              background: 'linear-gradient(155deg, var(--color-surface-2), var(--color-accent) 140%)',
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 className="font-display" style={{ fontWeight: 500, fontSize: '1.5rem', color: 'var(--color-ink)', margin: 0 }}>{r.name}</h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.75, color: 'var(--color-ink-soft)', margin: 0 }}>{r.desc}</p>
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}
