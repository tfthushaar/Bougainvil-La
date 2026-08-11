import Link from 'next/link'
import type { ContentBlock, InlineRun } from '@/lib/content/blocks'

function Runs({ runs }: { runs: InlineRun[] }) {
  return (
    <>
      {runs.map((run, i) => {
        if (!run.href) return <span key={i}>{run.text}</span>
        const linkStyle: React.CSSProperties = { color: 'var(--color-accent-deep)', textDecoration: 'underline', textUnderlineOffset: '2px' }
        if (run.href.startsWith('/')) {
          return <Link key={i} href={run.href} style={linkStyle}>{run.text}</Link>
        }
        return (
          <a key={i} href={run.href} style={linkStyle} target={run.href.startsWith('http') ? '_blank' : undefined} rel={run.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
            {run.text}
          </a>
        )
      })}
    </>
  )
}

export function RichContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          return (
            <h2 key={i} className="font-display" style={{ fontWeight: 500, fontSize: '1.4rem', color: 'var(--color-ink)', margin: '1rem 0 0' }}>
              {block.text}
            </h2>
          )
        }
        if (block.type === 'paragraph') {
          return (
            <p key={i} style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.75, color: 'var(--color-ink-soft)', margin: 0 }}>
              <Runs runs={block.runs} />
            </p>
          )
        }
        if (block.ordered) {
          return (
            <ol key={i} style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {block.items.map((item, n) => (
                <li key={n} style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                  <span style={{ flexShrink: 0, fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.85rem', color: 'var(--color-gold-deep)' }}>{n + 1}.</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '1rem', lineHeight: 1.7, color: 'var(--color-ink-soft)' }}>{item}</span>
                </li>
              ))}
            </ol>
          )
        }
        return (
          <ul key={i} style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.6rem 1.5rem' }}>
            {block.items.map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <span style={{ flexShrink: 0, marginTop: '0.55em', width: '4px', height: '4px', background: 'var(--color-gold-deep)' }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.95rem', color: 'var(--color-ink-soft)' }}>{item}</span>
              </li>
            ))}
          </ul>
        )
      })}
    </>
  )
}
