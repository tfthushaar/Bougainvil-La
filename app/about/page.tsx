import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Bougainvil'La – Luxury Wedding Venue in South Bangalore",
  description:
    "At Bougainvil'La, we believe a wedding is far more than a single event. Discover the story behind South Bangalore's premier destination wedding venue and its founder, Lakshmi Keerthi.",
}

const HIGHLIGHTS = [
  'Capacity for up to 1,000 Guests',
  '5 Distinctive Celebration Spaces',
  'Luxury Accommodation for 100 Guests',
  '18 Elegant Guest Rooms',
  'Iconic Floating Mandap',
  'Temple',
  "Bengaluru's First Retractable Roof Celebration Space",
  'Parking for Over 200 Vehicles',
  'Destination Wedding Experience in South Bengaluru',
]

const p: React.CSSProperties = {
  fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1.02rem',
  lineHeight: 1.8, color: 'var(--color-ink-soft)', margin: 0,
}

export default function AboutPage() {
  return (
    <main>
      <section style={{ background: 'var(--color-ink)', padding: 'clamp(6rem, 14vh, 9rem) clamp(1.25rem, 5vw, 3rem) clamp(3rem, 7vh, 4.5rem)', textAlign: 'center' }}>
        <span style={{
          display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem',
          letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1rem',
        }}>
          A Destination for Luxury Wedding
        </span>
        <h1 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(2rem, 4.4vw, 3.2rem)', color: '#fff', margin: 0 }}>
          About Bougainvil&rsquo;La
        </h1>
      </section>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/about/about-us.webp" alt="Bougainvillea archway at Bougainvil'La" style={{ width: '100%', height: 'clamp(300px, 50vh, 560px)', objectFit: 'cover', display: 'block' }} />

      <section style={{ background: 'var(--color-surface)', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: '42rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={p}>
            At Bougainvil&rsquo;La, we believe a wedding is far more than a single event—it is a
            collection of unforgettable moments that deserve extraordinary surroundings.
          </p>
          <p style={p}>
            As one of the most sought-after Luxury Wedding Venue Bangalore destinations,
            Bougainvil&rsquo;La has been thoughtfully planned to host every chapter of your
            celebration. Inspired by timeless Jaipur architecture and surrounded by lush tropical
            landscapes, our Wedding Venue South Bangalore features Bengaluru&rsquo;s iconic
            Floating Mandap, India&rsquo;s first Retractable Roof Wedding Venue, elegant indoor
            and outdoor celebration spaces, and premium Luxury Accommodation—all seamlessly
            connected within one spectacular destination.
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-line)', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: '42rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--color-gold)',
          }}>
            The Visionary Behind Bougainvil&rsquo;La
          </span>
          <div>
            <h2 className="font-display" style={{ fontWeight: 500, fontSize: '1.6rem', color: 'var(--color-ink)', margin: 0 }}>Lakshmi Keerthi</h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.85rem', color: 'var(--color-ink-soft)', margin: '0.35rem 0 0' }}>
              Founder, Bougainvil&rsquo;La | Luxury Wedding Planner
            </p>
          </div>
          <p style={p}>Bougainvil&rsquo;La was born from a simple belief — a wedding venue should do more than host a celebration. It should become part of the story.</p>
          <p style={p}>Founded by Lakshmi Keerthi, an award-winning luxury wedding planner with over two decades of experience in the wedding industry, Bougainvil&rsquo;La brings together years of understanding weddings from the inside — the emotions of families, the expectations of couples, the complexities of execution, and the importance of creating spaces that are both beautiful and functional.</p>
          <p style={p}>A Computer Science Engineer and an alumna of IIM Bangalore, Lakshmi&rsquo;s professional journey began in the corporate world, where she worked extensively in HR and Leadership roles before following her passion into the world of weddings.</p>
          <p style={p}>Over the years, she has planned and curated luxury and destination weddings, working closely with couples, families, designers, artists and wedding professionals.</p>
          <p style={p}>That experience shaped the philosophy behind Bougainvil&rsquo;La.</p>
          <p style={p}>Rather than creating another conventional wedding hall, the vision was to build a venue through the eyes of a wedding planner — where every space considers how a wedding actually unfolds.</p>
          <p style={p}>From guest movement and ceremony layouts to décor possibilities, dining experiences, photography backdrops and the transition between multiple wedding functions, every detail has been envisioned around the experience of celebrating.</p>
          <p style={p}>The result is Bougainvil&rsquo;La — a collection of distinctive semi indoor, outdoor, retractable roof feature and poolside spaces where every celebration can have its own identity.</p>
          <p style={p}>For Lakshmi, luxury is not simply about grandeur.</p>
          <p style={p}>It is about thoughtful details, effortless experiences and creating moments that remain with families long after the celebration is over.</p>
          <p style={p}>That philosophy continues to guide every experience at Bougainvil&rsquo;La.</p>
          <p style={p}>From intimate ceremonies by the water to grand receptions beneath the stars, every celebration is designed to feel elegant, effortless, and unforgettable.</p>
          <p style={p}>Bougainvil&rsquo;La is guided by an experienced Board of Directors, Chairman, and executive leadership team who collectively oversee the organisation and its operations.</p>
          <p style={p}>Lakshmi Keerthi continues to spearhead La&rsquo;kiru – designing and executing weddings across India while also being associated with Bougainvil&rsquo;La as its in-house wedding planner. Clients may choose to engage her services for their celebrations; however, this is entirely optional.</p>
          <p style={p}>Bougainvil&rsquo;La offers complete creative freedom, allowing every client to appoint a wedding planner and decorator of their choice. Our team works collaboratively with external professionals to ensure a seamless experience while bringing each couple&rsquo;s unique vision to life.</p>
        </div>
      </section>

      <section style={{ background: 'var(--color-ink)', padding: 'clamp(3.5rem, 8vh, 6rem) clamp(1.25rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
          <span style={{
            display: 'block', textAlign: 'center', fontFamily: 'var(--font-sans)', fontWeight: 500,
            fontSize: '0.72rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--color-gold)',
            marginBottom: '2.5rem',
          }}>
            Our Highlights
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem 2rem' }}>
            {HIGHLIGHTS.map((h) => (
              <div key={h} style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                <span style={{ color: 'var(--color-gold)', fontSize: '1rem' }}>✨</span>
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', color: '#fff' }}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
