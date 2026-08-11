import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPosts, getBlogPostBySlug, getBlogSlugs, TOUR_HREF } from '@/lib/content/blog'
import { PageHeader } from '@/components/PageHeader'
import { RichContent } from '@/components/RichContent'
import { Reveal } from '@/components/Reveal'

export async function generateStaticParams() {
  const slugs = await getBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Bougainvil'La Blog`,
    description: post.metaDescription,
    keywords: post.targetKeyword,
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [post, allPosts] = await Promise.all([getBlogPostBySlug(slug), getBlogPosts()])
  if (!post) notFound()

  const morePosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <main>
      <PageHeader
        eyebrow={`${post.author} · ${post.authorRole}`}
        title={post.title}
        meta={formatDate(post.publishedAt)}
        image={post.featuredImage}
      />

      <Reveal>
        <section style={{ background: 'var(--color-surface)', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)' }}>
          <div style={{ maxWidth: '42rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <RichContent blocks={post.blocks} />

            <div style={{
              marginTop: '1.5rem', padding: 'clamp(1.5rem, 4vw, 2.25rem)', textAlign: 'center',
              background: 'var(--color-surface-2)', border: '1px solid var(--color-line)',
            }}>
              <h3 className="font-display" style={{ fontStyle: 'italic', fontWeight: 500, fontSize: '1.3rem', color: 'var(--color-ink)', margin: '0 0 0.75rem' }}>
                Ready to see it in person?
              </h3>
              <a href={TOUR_HREF} className="btn-press" style={{
                fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.78rem', letterSpacing: '0.16em',
                textTransform: 'uppercase', color: '#fff', background: 'var(--color-accent-deep)',
                textDecoration: 'none', padding: '0.9rem 1.8rem', display: 'inline-block',
              }}>
                Book a Venue Tour
              </a>
            </div>
          </div>
        </section>
      </Reveal>

      {morePosts.length > 0 && (
        <Reveal>
          <section style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-line)', padding: 'clamp(3rem, 7vh, 4.5rem) clamp(1.25rem, 5vw, 3rem)' }}>
            <div style={{ maxWidth: '84rem', margin: '0 auto' }}>
              <span style={{
                display: 'block', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '0.68rem', letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'var(--color-gold-deep)', marginBottom: '1.5rem',
              }}>
                More From the Journal
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                {morePosts.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}/`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    {p.featuredImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.featuredImage} alt="" style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block', marginBottom: '0.9rem' }} />
                    )}
                    <h3 className="font-display" style={{ fontWeight: 500, fontSize: '1.05rem', lineHeight: 1.3, color: 'var(--color-ink)', margin: 0 }}>
                      {p.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}
    </main>
  )
}
