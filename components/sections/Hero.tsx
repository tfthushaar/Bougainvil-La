'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { HomeContent } from '@/lib/sanity/home'

gsap.registerPlugin(ScrollTrigger)

// --ease-arch (cubic-bezier(0.16,1,0.3,1)) and --ease-film
// (cubic-bezier(0.77,0,0.175,1)) are the standard "easeOutExpo"/
// "easeInOutExpo" curves — GSAP's own expo eases are the same shape,
// used here since GSAP's free core has no CSS-custom-property ease input.

const HERO_IMAGE = '/images/brand/hero/jaipur-mandap-golden-hour.webp'
// A separate, portrait-oriented pick for narrow screens — the wide
// architectural shot above loses most of its impact when `cover`-cropped
// down to a phone's aspect ratio. This one (golden-hour floating mandap,
// peacocks, water reflection) was shot portrait, so it survives that crop.
const HERO_IMAGE_MOBILE = '/images/brand/hero/floating-mandap-daylight.webp'

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
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from(imgRef.current, { opacity: 0, scale: reduce ? 1 : 1.06, duration: reduce ? 0 : 1.6, ease: 'power2.out' })
        .from('.hero-eyebrow', { opacity: 0, y: 14, duration: reduce ? 0 : 0.7 }, reduce ? 0 : 0.3)
        .from('.hero-headline', { opacity: 0, y: 24, duration: reduce ? 0 : 0.9 }, '-=0.45')
        .from('.hero-paragraph', { opacity: 0, y: 16, duration: reduce ? 0 : 0.8 }, '-=0.55')
        .from('.hero-feature', { opacity: 0, y: 12, duration: reduce ? 0 : 0.7 }, '-=0.5')
        .from('.hero-buttons', { opacity: 0, y: 12, duration: reduce ? 0 : 0.7 }, '-=0.5')

      if (!reduce) {
        gsap.to(imgRef.current, {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      }
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      style={{ position: 'relative', height: '100svh', minHeight: '38rem', overflow: 'hidden', background: 'var(--color-surface)' }}
    >
      <div
        ref={imgRef}
        className="hero-bg"
        style={{
          position: 'absolute', inset: '-7% 0', backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: 'cover', backgroundPosition: 'center 38%',
        }}
      />

      <div style={{
        position: 'relative', zIndex: 2, height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: 'clamp(1.25rem, 5vw, 3.5rem) clamp(1.25rem, 5vw, 3.5rem) clamp(2rem, 8vh, 4.5rem)',
      }}>
        {/* Frosted panel behind the text — guarantees contrast regardless of
            what's under it in the photo (the mandap's dark stone roof runs
            right through this zone), instead of chasing a scrim across an
            image with wildly uneven tones. */}
        <div className="hero-panel" style={{
          maxWidth: '36rem', display: 'flex', flexDirection: 'column', gap: 'clamp(0.9rem, 2vh, 1.35rem)',
          background: 'color-mix(in oklch, var(--color-surface) 88%, transparent)',
          backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid color-mix(in oklch, var(--color-surface) 40%, white 10%)',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
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

          <div className="hero-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem', marginTop: '0.35rem' }}>
            <Link href="/#enquire" className="btn-press" style={primaryBtn}>
              Book a Venue Tour
            </Link>
            <Link href="/venues/" className="btn-press" style={secondaryBtn}>
              Explore Venues
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-panel { gap: 0.7rem !important; padding: 1.25rem !important; }
          .hero-headline { font-size: 2rem !important; }
          .hero-paragraph, .hero-buttons { display: none !important; }
          .hero-bg { background-image: url(${HERO_IMAGE_MOBILE}) !important; background-position: center 22% !important; }
        }
      `}</style>
    </section>
  )
}
