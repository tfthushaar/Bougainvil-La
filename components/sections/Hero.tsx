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
  textTransform: 'uppercase', color: 'var(--color-ink)', background: 'transparent',
  textDecoration: 'none', padding: '1rem 2rem', textAlign: 'center', border: '1px solid var(--color-line)',
}

export function Hero({ content }: { content: HomeContent }) {
  const rootRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from(imgRef.current, { opacity: 0, scale: reduce ? 1 : 1.05, duration: reduce ? 0 : 1.4, ease: 'power2.out' })
        .from('.hero-eyebrow', { opacity: 0, y: 14, duration: reduce ? 0 : 0.7 }, reduce ? 0 : 0.2)
        .from('.hero-headline', { opacity: 0, y: 22, duration: reduce ? 0 : 0.9 }, '-=0.45')
        .from('.hero-paragraph', { opacity: 0, y: 16, duration: reduce ? 0 : 0.8 }, '-=0.55')
        .from('.hero-feature', { opacity: 0, y: 12, duration: reduce ? 0 : 0.7 }, '-=0.5')
        .from('.hero-buttons', { opacity: 0, y: 12, duration: reduce ? 0 : 0.7 }, '-=0.5')

      if (!reduce) {
        gsap.to(imgRef.current, {
          yPercent: 8,
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
      style={{
        position: 'relative', display: 'grid', gridTemplateColumns: '1fr',
        minHeight: '100svh', background: 'var(--color-surface)', overflow: 'hidden',
      }}
      className="hero-grid"
    >
      <div className="hero-image-panel" style={{ position: 'relative', overflow: 'hidden', minHeight: '52vh', order: 1 }}>
        <div
          ref={imgRef}
          style={{
            position: 'absolute', inset: '-6% 0', backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: 'cover', backgroundPosition: 'center 30%',
          }}
        />
      </div>

      <div className="hero-text-panel" style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(1.1rem, 2.2vh, 1.6rem)',
        padding: 'clamp(2.5rem, 6vh, 3.5rem) clamp(1.5rem, 6vw, 5rem)', maxWidth: '40rem', zIndex: 2, order: 2,
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
          fontSize: 'clamp(2.6rem, 5.4vw, 4.6rem)', lineHeight: 1.08,
        }}>
          {content.heroHeadline}
        </h1>

        <p className="hero-paragraph" style={{
          fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 'clamp(1.02rem, 1.3vw, 1.2rem)',
          lineHeight: 1.75, color: 'var(--color-ink-soft)', margin: 0, maxWidth: '36rem',
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

        <div className="hero-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.7rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-ink-soft)',
          }}>
            {content.heroButtonsLabel}
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem' }}>
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
        @media (min-width: 900px) {
          .hero-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important; align-items: stretch; }
          .hero-image-panel { min-height: 100svh !important; order: 2 !important; }
          .hero-text-panel { order: 1 !important; padding-top: clamp(6rem, 12vh, 8rem) !important; }
        }
      `}</style>
    </section>
  )
}
