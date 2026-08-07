import type { Metadata } from 'next'
import { getRoomTypes } from '@/lib/sanity/roomTypes'

export const metadata: Metadata = {
  title: "Luxury Stays | Bougainvil'La — Accommodation for 100 Guests",
  description:
    "18 beautifully appointed rooms at Bougainvil'La comfortably host up to 100 guests, including a Bridal Suite, Groom's Suite, Luxury Family Rooms and Dormitories.",
}

export default async function LuxuryStaysPage() {
  const rooms = await getRoomTypes()

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
              {rooms.map((r) => (
                <tr key={r.name} style={{ borderBottom: '1px solid var(--color-line)' }}>
                  <td style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '0.92rem', color: 'var(--color-ink)', padding: '0.75rem 0.5rem' }}>{r.name}</td>
                  <td style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.92rem', color: 'var(--color-ink-soft)', padding: '0.75rem 0.5rem' }}>{r.quantity}</td>
                  <td style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.92rem', color: 'var(--color-ink-soft)', padding: '0.75rem 0.5rem' }}>{r.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {rooms.map((r, i) => (
        <section key={r.name} style={{
          background: i % 2 === 0 ? 'var(--color-surface-2)' : 'var(--color-surface)',
          borderTop: '1px solid var(--color-line)',
        }}>
          <div style={{
            maxWidth: '84rem', margin: '0 auto', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'center',
          }}>
            {r.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={r.photo}
                alt={r.name}
                style={{ order: i % 2 === 0 ? 1 : 0, width: '100%', height: 'clamp(240px, 34vh, 380px)', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                order: i % 2 === 0 ? 1 : 0, width: '100%', height: 'clamp(240px, 34vh, 380px)',
                background: 'linear-gradient(155deg, var(--color-surface-2), var(--color-accent) 140%)',
              }} />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h2 className="font-display" style={{ fontWeight: 500, fontSize: '1.5rem', color: 'var(--color-ink)', margin: 0 }}>{r.name}</h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.75, color: 'var(--color-ink-soft)', margin: 0 }}>{r.description}</p>
            </div>
          </div>
        </section>
      ))}
    </main>
  )
}
