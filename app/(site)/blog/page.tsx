import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/content/blog'
import { PageHeader } from '@/components/PageHeader'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = {
  title: "Blog | Bougainvil'La — Wedding Planning Stories & Guides",
  description:
    "Practical guides on choosing a wedding venue in Bangalore — indoor vs outdoor, monsoon planning, the Floating Mandap, and more from the team at Bougainvil'La.",
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main>
      <PageHeader
        eyebrow="Journal"
        title="Wedding Planning Stories & Guides"
        paragraph="Practical, honest guidance on choosing a wedding venue in Bangalore — from the team behind Bougainvil'La."
      />

      <Reveal>
        <section style={{ background: 'var(--color-surface)', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)' }}>
          <div style={{
            maxWidth: '84rem', margin: '0 auto',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem 2rem',
          }}>
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}/`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                {post.featuredImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.featuredImage} alt="" style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block', marginBottom: '1.25rem' }}
                  />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '4 / 3', background: 'linear-gradient(155deg, var(--color-surface-2), var(--color-accent) 140%)', marginBottom: '1.25rem' }} />
                )}
                <span style={{
                  display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.68rem', letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'var(--color-gold-deep)', marginBottom: '0.6rem',
                }}>
                  {formatDate(post.publishedAt)}
                </span>
                <h2 className="font-display" style={{ fontWeight: 500, fontSize: '1.25rem', lineHeight: 1.3, color: 'var(--color-ink)', margin: '0 0 0.6rem' }}>
                  {post.title}
                </h2>
                <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--color-ink-soft)', margin: 0 }}>
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>
    </main>
  )
}
