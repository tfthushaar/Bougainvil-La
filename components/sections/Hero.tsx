'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { HomeContent } from '@/lib/content/home'

gsap.registerPlugin(ScrollTrigger)

// --ease-arch (cubic-bezier(0.16,1,0.3,1)) and --ease-film
// (cubic-bezier(0.77,0,0.175,1)) are the standard "easeOutExpo"/
// "easeInOutExpo" curves — GSAP's own expo eases are the same shape,
// used here since GSAP's free core has no CSS-custom-property ease input.

// Landscape shot for desktop — fills a wide full-bleed band with no
// cropping workarounds needed, unlike a portrait source.
const HERO_IMAGE = '/images/brand/hero/jaipur-mandap-golden-hour.webp'
// Portrait shot for narrow screens — the landscape image above loses most
// of its impact when cover-cropped down to a phone's aspect ratio; this one
// was shot portrait, so it survives that crop instead.
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
        .from('.hero-wordmark', { opacity: 0, y: 20, duration: reduce ? 0 : 0.9 }, reduce ? 0 : 0.4)
        .from('.hero-eyebrow', { opacity: 0, y: 14, duration: reduce ? 0 : 0.7 }, '-=0.3')
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
    <section ref={rootRef} style={{ background: 'var(--color-surface)' }}>
      {/* Image band — full-bleed photo, nothing overlapping it except the
          brand wordmark itself and the subtle gradient that keeps it
          legible. All the descriptive copy lives below, in-flow, not
          floating on top of the photo. */}
      <div style={{ position: 'relative', height: 'clamp(26rem, 88vh, 46rem)', overflow: 'hidden' }}>
        <div
          ref={imgRef}
          className="hero-bg"
          style={{
            position: 'absolute', inset: '-7% 0', backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: 'cover', backgroundPosition: 'center 38%',
          }}
        />
        {/* Very subtle gradient — only there so the wordmark stays legible
            against whatever tone happens to be behind it, not a heavy scrim. */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.32), transparent 40%)',
        }} />
        {/* Fades toward the page's own background color right at the very
            bottom edge, so the photo dissolves into the content band below
            instead of ending in a hard cut. */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 88%, var(--color-surface) 100%)',
        }} />

        <div style={{
          position: 'absolute', right: 0, bottom: 0, left: 0, zIndex: 2,
          padding: 'clamp(1.25rem, 5vw, 3.5rem) clamp(1.25rem, 5vw, 3.5rem) clamp(1.5rem, 5vh, 2.75rem)',
          display: 'flex', justifyContent: 'flex-end',
        }}>
          <span className="hero-wordmark font-display" style={{
            fontStyle: 'italic', fontWeight: 500, color: '#fff', lineHeight: 1,
            fontSize: 'clamp(2.75rem, 11vw, 7.5rem)', textShadow: '0 4px 28px rgba(0,0,0,0.4)',
            textAlign: 'right',
          }}>
            Bougainvil&rsquo;La
          </span>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .hero-bg { background-image: url(${HERO_IMAGE_MOBILE}) !important; background-position: center 22% !important; }
          }
        `}</style>
      </div>

      {/* Content band — normal document flow below the photo, so it's
          naturally phone-friendly (no fixed-height overlay competing for
          space with the image). */}
      <div style={{ padding: 'clamp(2.5rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)' }}>
        <div style={{
          maxWidth: '42rem', margin: '0 auto', textAlign: 'center',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(0.9rem, 2vh, 1.35rem)',
        }}>
          <span className="hero-eyebrow" style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.72rem, 1vw, 0.85rem)', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--color-gold-deep)', display: 'flex', alignItems: 'center', gap: '0.9rem',
          }}>
            <span data-edit-field="home.heroSubtitleLeft" data-edit-value={content.heroSubtitleLeft}>{content.heroSubtitleLeft}</span>
            <GoldRule width="1.75rem" />
            <span data-edit-field="home.heroSubtitleRight" data-edit-value={content.heroSubtitleRight}>{content.heroSubtitleRight}</span>
          </span>

          <h1 className="hero-headline font-display" data-edit-field="home.heroHeadline" data-edit-value={content.heroHeadline} style={{
            fontStyle: 'italic', fontWeight: 500, color: 'var(--color-ink)', margin: 0,
            fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)', lineHeight: 1.08,
          }}>
            {content.heroHeadline}
          </h1>

          <p className="hero-paragraph" data-edit-field="home.heroParagraph" data-edit-value={content.heroParagraph} style={{
            fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 'clamp(0.98rem, 1.2vw, 1.08rem)',
            lineHeight: 1.7, color: 'var(--color-ink-soft)', margin: 0,
          }}>
            {content.heroParagraph}
          </p>

          <div className="hero-feature" style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <GoldRule width="1.75rem" />
            <span data-edit-field="home.heroFeatureLine" data-edit-value={content.heroFeatureLine} style={{
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
