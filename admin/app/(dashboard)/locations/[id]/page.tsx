import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db/client'
import { locationPages } from '@/lib/db/schema'
import { BlockEditor } from '@/components/BlockEditor'
import { formStyles as f } from '@/components/form'
import type { ContentBlock } from '@/lib/blocks'
import { saveLocationPage, deleteLocationPage } from '../actions'

export default async function LocationEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const isNew = id === 'new'

  const page = isNew ? null : (await db().select().from(locationPages).where(eq(locationPages.id, id)).limit(1))[0]
  if (!isNew && !page) notFound()

  const blocks = (page?.blocks as ContentBlock[] | undefined) ?? []

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">{isNew ? 'New Location Page' : page!.h1}</h1>

      <form action={saveLocationPage}>
        <input type="hidden" name="id" value={id} />

        <div className={f.field}>
          <label className={f.label} htmlFor="slug">Slug (URL path — lowercase, hyphens)</label>
          <input className={f.input} id="slug" name="slug" defaultValue={page?.slug} required pattern="[a-z0-9-]+" />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="h1">Page Title (H1)</label>
          <input className={f.input} id="h1" name="h1" defaultValue={page?.h1} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="subheading">Subheading (optional)</label>
          <input className={f.input} id="subheading" name="subheading" defaultValue={page?.subheading ?? ''} />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="metaTitle">SEO Meta Title</label>
          <input className={f.input} id="metaTitle" name="metaTitle" defaultValue={page?.metaTitle} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="metaDescription">SEO Meta Description</label>
          <textarea className={f.textarea} id="metaDescription" name="metaDescription" rows={2} defaultValue={page?.metaDescription} required />
        </div>
        <div className={f.field}>
          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input type="checkbox" name="isPillar" defaultChecked={page?.isPillar} />
            Pillar page (the South Bangalore hub other locality pages link back to)
          </label>
        </div>

        <p className={f.sectionTitle}>Page Content</p>
        <BlockEditor name="blocks" defaultValue={blocks} />

        <div className="mt-6">
          <button type="submit" className={f.primaryBtn}>Save Location Page</button>
        </div>
      </form>

      {!isNew && (
        <form action={deleteLocationPage} className="mt-3">
          <input type="hidden" name="id" value={id} />
          <button type="submit" className={f.dangerBtn}>Delete Location Page</button>
        </form>
      )}
    </div>
  )
}
