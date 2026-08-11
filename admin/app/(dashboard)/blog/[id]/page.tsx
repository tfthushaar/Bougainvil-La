import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db/client'
import { blogPosts } from '@/lib/db/schema'
import { BlockEditor } from '@/components/BlockEditor'
import { ImagePicker } from '@/components/ImagePicker'
import { formStyles as f } from '@/components/form'
import type { ContentBlock } from '@/lib/blocks'
import { saveBlogPost, deleteBlogPost } from '../actions'

function toDateInputValue(d: Date | undefined) {
  if (!d) return new Date().toISOString().slice(0, 10)
  return new Date(d).toISOString().slice(0, 10)
}

export default async function BlogEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const isNew = id === 'new'

  const post = isNew ? null : (await db().select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1))[0]
  if (!isNew && !post) notFound()

  const blocks = (post?.blocks as ContentBlock[] | undefined) ?? []

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">{isNew ? 'New Blog Post' : post!.title}</h1>

      <form action={saveBlogPost}>
        <input type="hidden" name="id" value={id} />

        <div className={f.field}>
          <label className={f.label} htmlFor="title">Title</label>
          <input className={f.input} id="title" name="title" defaultValue={post?.title} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="slug">Slug (URL — lowercase, hyphens)</label>
          <input className={f.input} id="slug" name="slug" defaultValue={post?.slug} required pattern="[a-z0-9-]+" />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="excerpt">Excerpt (shown on the blog listing)</label>
          <textarea className={f.textarea} id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt} required />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className={f.label} htmlFor="author">Author</label>
            <input className={f.input} id="author" name="author" defaultValue={post?.author ?? 'Lakshmi Keerthi'} required />
          </div>
          <div>
            <label className={f.label} htmlFor="authorRole">Author Role</label>
            <input className={f.input} id="authorRole" name="authorRole" defaultValue={post?.authorRole ?? 'Luxury Wedding Planner / Founder'} required />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className={f.label} htmlFor="publishedAt">Published Date</label>
            <input className={f.input} id="publishedAt" name="publishedAt" type="date" defaultValue={toDateInputValue(post?.publishedAt)} required />
          </div>
          <div>
            <label className={f.label} htmlFor="status">Status</label>
            <select className={f.input} id="status" name="status" defaultValue={post?.status ?? 'draft'}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div className={f.field}>
          <label className={f.label} htmlFor="targetKeyword">SEO Target Keyword (optional)</label>
          <input className={f.input} id="targetKeyword" name="targetKeyword" defaultValue={post?.targetKeyword ?? ''} />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="metaDescription">SEO Meta Description</label>
          <textarea className={f.textarea} id="metaDescription" name="metaDescription" rows={2} defaultValue={post?.metaDescription} required />
        </div>

        <p className={f.sectionTitle}>Featured Image</p>
        <div className={f.field}>
          <ImagePicker name="featuredImage" defaultValue={post?.featuredImage ?? null} />
        </div>

        <p className={f.sectionTitle}>Post Content</p>
        <BlockEditor name="blocks" defaultValue={blocks} />

        <div className="mt-6">
          <button type="submit" className={f.primaryBtn}>Save Post</button>
        </div>
      </form>

      {!isNew && (
        <form action={deleteBlogPost} className="mt-3">
          <input type="hidden" name="id" value={id} />
          <button type="submit" className={f.dangerBtn}>Delete Post</button>
        </form>
      )}
    </div>
  )
}
