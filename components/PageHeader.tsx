interface PageHeaderCta {
  label: string
  href: string
  external?: boolean
}

interface PageHeaderProps {
  eyebrow?: string
  title: string
  paragraph?: string
  meta?: string
  /** Photographic variant when set; quiet (cream, no photo) variant when omitted. */
  image?: string | null
  imagePosition?: string
  cta?: PageHeaderCta
  align?: 'center' | 'left'
}

export function PageHeader({ eyebrow, title, paragraph, meta, image, imagePosition = 'center', cta, align = 'center' }: PageHeaderProps) {
  const isPhoto = Boolean(image)
  const isLeft = align === 'left'

  const content = (
    <div style={{
      maxWidth: paragraph ? '44rem' : '40rem', margin: isLeft ? 0 : '0 auto',
      display: 'flex', flexDirection: 'column', gap: '1rem',
      textAlign: isLeft ? 'left' : 'center', alignItems: isLeft ? 'flex-start' : 'center',
    }}>
      {eyebrow && (
        <span style={{
          fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.72rem', letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--color-gold-deep)',
        }}>
          {eyebrow}
        </span>
      )}
      <h1 className="font-display" style={{
        fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(2rem, 4.4vw, 3.2rem)', lineHeight: 1.1,
        color: 'var(--color-ink)', margin: 0,
      }}>
        {title}
      </h1>
      {paragraph && (
        <p style={{
          fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.7,
          color: 'var(--color-ink-soft)', margin: 0,
        }}>
          {paragraph}
        </p>
      )}
      {meta && (
        <span style={{
          fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--color-gold-deep)',
        }}>
          {meta}
        </span>
      )}
      {cta && (
        <a
          href={cta.href}
          target={cta.external ? '_blank' : undefined}
          rel={cta.external ? 'noopener noreferrer' : undefined}
          className="btn-press"
          style={{
            fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.16em',
            textTransform: 'uppercase', color: '#fff', background: 'var(--color-accent-deep)',
            textDecoration: 'none', padding: '0.9rem 1.8rem', marginTop: '0.35rem', display: 'inline-block',
          }}
        >
          {cta.label}
        </a>
      )}
    </div>
  )

  if (!isPhoto) {
    return (
      <section style={{
        background: 'var(--color-surface)',
        padding: 'clamp(7rem, 16vh, 9.5rem) clamp(1.25rem, 5vw, 3rem) clamp(3rem, 7vh, 4.5rem)',
      }}>
        {content}
      </section>
    )
  }

  return (
    <section>
      {/* Image band — full-bleed photo, nothing overlapping it. The title/
          copy sits in its own band underneath instead of floating on top of
          the photo, so the image stays uncropped-by-text and legible on its
          own. */}
      <div data-nav-surface="dark" style={{ position: 'relative', height: 'clamp(20rem, 50vh, 32rem)', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image!} alt="" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: imagePosition,
          }}
        />
        {/* Fades toward the page's own background color (not black) right at
            the bottom edge, so the photo visually dissolves into the content
            band below instead of ending in a hard, high-contrast cut. */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 85%, var(--color-surface) 100%)',
        }} />
      </div>

      <div style={{
        background: 'var(--color-surface)',
        padding: 'clamp(2.5rem, 6vh, 4rem) clamp(1.25rem, 5vw, 3rem)',
      }}>
        {content}
      </div>
    </section>
  )
}
