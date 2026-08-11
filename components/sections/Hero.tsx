'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import type { HomeContent } from '@/lib/content/home'

// --ease-arch (cubic-bezier(0.16,1,0.3,1)) and --ease-film
// (cubic-bezier(0.77,0,0.175,1)) are the standard "easeOutExpo"/
// "easeInOutExpo" curves — GSAP's own expo eases are the same shape,
// used here since GSAP's free core has no CSS-custom-property ease input.

// The venue's signature shot — the peach-toned floating mandap with its
// white peacock finials, shot in clean daylight with no watermark or people
// in frame.
const HERO_IMAGE = '/images/brand/hero/floating-mandap-daylight.webp'

function GoldRule({ width = '2.5rem' }: { width?: string }) {
  return <span style={{ display: 'inline-block', width, height: '1px', background: 'var(--color-gold-deep)' }} />
}

const primaryBtn: React.CSSProperties = {
  fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.16em',
  textTransform: 'uppercase', color: '#fff', background: 'var(--color-accent-deep)',
  textDecoration: 'none', padding: '1rem 2rem', textAlign: 'center',
}

const secondaryBtn: React.CSSProperties = {
  fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.16em',
  textTransform: 'uppercase', color: 'var(--color-ink)', background: 'var(--color-surface)',
  textDecoration: 'none', padding: '1rem 2rem', textAlign: 'center', border: '1px solid var(--color-line)',
}

export function Hero({ content }: { content: HomeContent }) {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('.hero-photo', { opacity: 0, y: reduce ? 0 : 18, duration: reduce ? 0 : 1, ease: 'power2.out' })
        .from('.hero-wordmark', { opacity: 0, y: 20, duration: reduce ? 0 : 0.9 }, reduce ? 0 : '-=0.6')
        .from('.hero-eyebrow', { opacity: 0, y: 14, duration: reduce ? 0 : 0.7 }, '-=0.5')
        .from('.hero-headline', { opacity: 0, y: 24, duration: reduce ? 0 : 0.9 }, '-=0.45')
        .from('.hero-paragraph', { opacity: 0, y: 16, duration: reduce ? 0 : 0.8 }, '-=0.55')
        .from('.hero-feature', { opacity: 0, y: 12, duration: reduce ? 0 : 0.7 }, '-=0.5')
        .from('.hero-buttons', { opacity: 0, y: 12, duration: reduce ? 0 : 0.7 }, '-=0.5')
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} style={{ background: 'var(--color-surface)', paddingTop: 'clamp(6rem, 14vh, 8rem)' }}>
      {/* Side-by-side, not full-bleed — the source photo is a tall portrait
          shot (the mandap's peacocks read best uncropped), and forcing a
          portrait photo to fill a wide full-bleed band either crops the
          peacocks off or needs a blurred fill that ends up looking like a
          mistake rather than a choice. Shown here at its natural
          proportions instead — completely uncropped, paired with the
          wordmark on the page's own background. */}
      <div style={{
        maxWidth: '84rem', margin: '0 auto', padding: '0 clamp(1.25rem, 5vw, 3rem) clamp(3rem, 7vh, 4.5rem)',
        display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', justifyContent: 'center',
        gap: 'clamp(2rem, 5vw, 4rem)',
      }}>
        <div style={{ flex: '1 1 320px', textAlign: 'center' }}>
          <span className="hero-wordmark font-display" style={{
            display: 'block', fontStyle: 'italic', fontWeight: 500, color: 'var(--color-ink)', lineHeight: 1.05,
            fontSize: 'clamp(2.75rem, 6vw, 4.75rem)',
          }}>
            Bougainvil&rsquo;La
          </span>
          <span className="hero-photo-caption" style={{
            display: 'block', marginTop: '1rem', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem',
            letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--color-gold-deep)',
          }}>
            The Iconic Floating Mandap
          </span>
        </div>

        <div className="hero-photo" style={{ flex: '1 1 320px', maxWidth: '26rem' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE} alt="Bougainvil'La's floating mandap, decorated in peach tones with white peacock finials"
            style={{ width: '100%', height: 'auto', display: 'block', boxShadow: '0 24px 60px -12px rgba(60,30,20,0.28)' }}
          />
        </div>
      </div>

      {/* Content band — normal document flow, naturally phone-friendly. */}
      <div style={{ background: 'var(--color-surface-2)', padding: 'clamp(2.5rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)' }}>
        <div style={{
          maxWidth: '42rem', margin: '0 auto', textAlign: 'center',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(0.9rem, 2vh, 1.35rem)',
        }}>
          <span className="hero-eyebrow" style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.72rem, 1vw, 0.85rem)', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--color-gold-deep)', display: 'flex', alignItems: 'center', gap: '0.9rem',
          }}>
            {content.heroSubtitleLeft}
            <GoldRule width="1.75rem" />
            {content.heroSubtitleRight}
          </span>

          <h1 className="hero-headline font-display" style={{
            fontStyle: 'italic', fontWeight: 500, color: 'var(--color-ink)', margin: 0,
            fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)', lineHeight: 1.08,
          }}>
            {content.heroHeadline}
          </h1>

          <p className="hero-paragraph" style={{
            fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 'clamp(0.98rem, 1.2vw, 1.08rem)',
            lineHeight: 1.7, color: 'var(--color-ink-soft)', margin: 0,
          }}>
            {content.heroParagraph}
          </p>

          <div className="hero-feature" style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <GoldRule width="1.75rem" />
            <span style={{
              fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.72rem, 0.95vw, 0.82rem)', letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'var(--color-ink-soft)',
            }}>
              {content.heroFeatureLine}
            </span>
          </div>

          <div className="hero-buttons" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.9rem', marginTop: '0.35rem' }}>
            <Link href="/#enquire" className="btn-press" style={primaryBtn}>
              Book a Venue Tour
            </Link>
            <Link href="/venues/" className="btn-press" style={secondaryBtn}>
              Explore Venues
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
