'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { HomeContent } from '@/lib/sanity/home'

gsap.registerPlugin(ScrollTrigger)

const FRAMES_BASE = '/frames/hero'
const FALLBACK_VIDEO = '/videos/hero.mp4'
const EAGER_LOAD_COUNT = 15

interface Manifest {
  frameCount: number
}

function frameSrc(index: number) {
  const n = String(index + 1).padStart(4, '0')
  return `${FRAMES_BASE}/frame_${n}.webp`
}

// Pronounced drop shadow "beneath" the gold text — dark, offset down, so the
// gold reads clearly over both the bright pergola lights and the night sky.
const goldShadow = '0 6px 14px rgba(0,0,0,0.6), 0 2px 5px rgba(0,0,0,0.55)'
const softShadow = '0 2px 20px rgba(0,0,0,0.5), 0 1px 6px rgba(0,0,0,0.4)'

function GoldRule({ width = '2.5rem' }: { width?: string }) {
  return <span style={{ display: 'inline-block', width, height: '1px', background: 'var(--color-gold)' }} />
}

/* Moment 1 — hero wordmark, visible only in the first frame/viewport, framed
   like Secant's hero: huge tracked sans wordmark, upper-left, gold on this
   site's palette, with a small tracked subtitle line + gold rule. */
function WordmarkBlock({ subtitleLeft, subtitleRight }: { subtitleLeft: string; subtitleRight: string }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, minHeight: '100svh', zIndex: 2,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
      paddingTop: 'clamp(4.5rem, 16vh, 9rem)',
      paddingLeft: 'clamp(1.5rem, 6vw, 5rem)', paddingRight: 'clamp(1.5rem, 6vw, 5rem)',
      pointerEvents: 'none',
    }}>
      <h1 style={{
        fontFamily: 'var(--font-sans)', fontWeight: 300, textTransform: 'uppercase',
        fontSize: 'clamp(3.2rem, 12vw, 10.5rem)', lineHeight: 0.9, letterSpacing: '0.01em',
        color: 'var(--color-gold)', margin: 0, userSelect: 'none', textShadow: goldShadow,
      }}>
        Bougainvil&rsquo;La
      </h1>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1.1rem', marginTop: 'clamp(1.1rem, 3vh, 2rem)',
        flexWrap: 'wrap',
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', letterSpacing: '0.24em',
          textTransform: 'uppercase', color: 'var(--color-gold)', textShadow: softShadow,
        }}>
          {subtitleLeft}
        </span>
        <GoldRule width="2.5rem" />
        <span style={{
          fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', letterSpacing: '0.24em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', textShadow: softShadow,
        }}>
          {subtitleRight}
        </span>
      </div>
    </div>
  )
}

/* Moment 2 — left-aligned text moment: eyebrow, gold display headline,
   supporting paragraph (the brand copy), and a short tracked feature line. */
function IntroBlock({ eyebrow, headline, paragraph, featureLine }: {
  eyebrow: string; headline: string; paragraph: string; featureLine: string
}) {
  return (
    <div style={{
      position: 'absolute', top: '85svh', left: 0, right: 0, minHeight: '100svh', zIndex: 2,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '0 clamp(1.5rem, 6vw, 5rem)', pointerEvents: 'none',
    }}>
      <div style={{ maxWidth: '42rem', display: 'flex', flexDirection: 'column', gap: 'clamp(1.1rem, 2.5vh, 1.6rem)' }}>
        <span style={{
          fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--color-gold)', textShadow: softShadow,
        }}>
          {eyebrow}
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500, fontStyle: 'italic',
          fontSize: 'clamp(2.3rem, 5vw, 4.2rem)', lineHeight: 1.15, color: 'var(--color-gold)',
          margin: 0, textShadow: goldShadow,
        }}>
          {headline}
        </h2>
        <p style={{
          fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
          lineHeight: 1.7, color: 'rgba(255,255,255,0.92)', margin: 0, textShadow: softShadow, maxWidth: '38rem',
        }}>
          {paragraph}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <GoldRule width="2.5rem" />
          <span style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.78rem, 1vw, 0.9rem)', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--color-gold)', textShadow: softShadow,
          }}>
            {featureLine}
          </span>
        </div>
      </div>
    </div>
  )
}

/* Moment 3 — right-aligned moment: a short label + gold rule leading into
   the two CTAs, echoing where Secant places its stat callouts. */
function ButtonsBlock({ label }: { label: string }) {
  return (
    <div style={{
      position: 'absolute', top: '150svh', left: 0, right: 0, minHeight: '100svh', zIndex: 2,
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end',
      paddingTop: 'clamp(4.5rem, 16vh, 9rem)',
      paddingLeft: 'clamp(1.5rem, 6vw, 5rem)', paddingRight: 'clamp(1.5rem, 6vw, 5rem)',
      pointerEvents: 'none',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.4rem', maxWidth: '28rem' }}>
        <span style={{
          fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--color-gold)', textShadow: softShadow, textAlign: 'right',
        }}>
          {label}
        </span>
        <span style={{ display: 'inline-block', width: '100%', height: '1px', background: 'var(--color-gold)' }} />
      </div>
    </div>
  )
}

export function Hero({ content }: { content: HomeContent }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reducedMotion !== false) return

    let cancelled = false
    const images: HTMLImageElement[] = []
    const loaded: boolean[] = []
    let frameCount = 0
    let ctx: CanvasRenderingContext2D | null = null
    let currentDrawn = -1
    let st: ScrollTrigger | null = null
    let targetProgress = 0
    let displayedProgress = 0
    let rafId = 0

    const canvas = canvasRef.current!

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(window.innerWidth * dpr)
      canvas.height = Math.round(window.innerHeight * dpr)
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (currentDrawn >= 0) draw(currentDrawn)
    }

    function draw(index: number) {
      const img = images[index]
      if (!ctx || !img || !img.complete || img.naturalWidth === 0) return
      const cw = window.innerWidth
      const ch = window.innerHeight
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      const dx = (cw - dw) / 2
      const dy = (ch - dh) / 2
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    function nearestLoadedIndex(target: number): number {
      if (loaded[target]) return target
      for (let d = 1; d < frameCount; d++) {
        const back = target - d
        const fwd = target + d
        if (back >= 0 && loaded[back]) return back
        if (fwd < frameCount && loaded[fwd]) return fwd
      }
      return target
    }

    async function init() {
      const res = await fetch(`${FRAMES_BASE}/manifest.json`)
      const manifest: Manifest = await res.json()
      if (cancelled) return

      frameCount = manifest.frameCount
      ctx = canvas.getContext('2d')
      resizeCanvas()

      for (let i = 0; i < frameCount; i++) {
        loaded[i] = false
      }

      function loadFrame(i: number): Promise<void> {
        return new Promise((resolve) => {
          const img = new Image()
          img.decoding = 'async'
          img.onload = () => {
            loaded[i] = true
            if (!cancelled && i === 0) { draw(0); setReady(true) }
            resolve()
          }
          img.onerror = () => resolve()
          img.src = frameSrc(i)
          images[i] = img
        })
      }

      // Eagerly load the first slice so scrubbing is correct from frame 1
      const eagerCount = Math.min(EAGER_LOAD_COUNT, frameCount)
      await Promise.all(Array.from({ length: eagerCount }, (_, i) => loadFrame(i)))
      if (cancelled) return

      // Stream the rest in the background
      for (let i = eagerCount; i < frameCount; i++) {
        if (cancelled) return
        await loadFrame(i)
      }
    }

    init()

    // Decouple frame draws from raw scroll-event cadence: ScrollTrigger only
    // updates `targetProgress`, and a rAF loop eases `displayedProgress`
    // toward it every frame, so the scrub stays smooth regardless of how
    // bursty the input device's wheel/trackpad deltas are.
    function tick() {
      displayedProgress += (targetProgress - displayedProgress) * 0.22
      if (Math.abs(targetProgress - displayedProgress) < 0.0005) {
        displayedProgress = targetProgress
      }
      if (frameCount) {
        const target = Math.round(displayedProgress * (frameCount - 1))
        const idx = nearestLoadedIndex(target)
        if (idx !== currentDrawn) { draw(idx); currentDrawn = idx }
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    // No GSAP pin here — the canvas is kept on-screen via CSS `position:
    // sticky` below, which lets sibling text scroll normally over it.
    // ScrollTrigger just measures scroll progress across the wrapper's
    // full height (exactly the sticky-active range) to drive the scrub.
    st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => { targetProgress = self.progress },
    })

    window.addEventListener('resize', resizeCanvas)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resizeCanvas)
      st?.kill()
    }
  }, [reducedMotion])

  if (reducedMotion === null) {
    return <section style={{ height: '100svh' }} />
  }

  if (reducedMotion) {
    return (
      <section data-nav-surface="dark" style={{ position: 'relative', width: '100%', height: '100svh', overflow: 'hidden' }}>
        <video
          src={FALLBACK_VIDEO}
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
        <WordmarkBlock subtitleLeft={content.heroSubtitleLeft} subtitleRight={content.heroSubtitleRight} />
      </section>
    )
  }

  return (
    <section ref={wrapperRef} className="relative h-[230vh]">
      {/* This sticky div is what's actually on-screen at the top of the
          viewport for this whole 230vh scroll range, so it's what tells the
          fixed Navigation to use light (white) text throughout. */}
      <div data-nav-surface="dark" style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden', zIndex: 0 }}>
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            opacity: ready ? 1 : 0, transition: 'opacity 0.6s var(--ease-arch)',
            background: 'var(--color-dark)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} />
      </div>
      <WordmarkBlock subtitleLeft={content.heroSubtitleLeft} subtitleRight={content.heroSubtitleRight} />
      <IntroBlock
        eyebrow={content.heroEyebrow}
        headline={content.heroHeadline}
        paragraph={content.heroParagraph}
        featureLine={content.heroFeatureLine}
      />
      <ButtonsBlock label={content.heroButtonsLabel} />
    </section>
  )
}
