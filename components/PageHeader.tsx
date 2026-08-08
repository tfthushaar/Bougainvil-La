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
    <section data-nav-surface="dark" style={{ position: 'relative', height: 'clamp(24rem, 58vh, 38rem)', overflow: 'hidden' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image!} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: imagePosition,
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, var(--color-surface) 0%, color-mix(in oklch, var(--color-surface) 74%, transparent) 34%, color-mix(in oklch, var(--color-surface) 0%, transparent) 64%)',
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: 'clamp(2rem, 6vh, 3.5rem) clamp(1.25rem, 6vw, 5rem)',
      }}>
        {content}
      </div>
    </section>
  )
}
