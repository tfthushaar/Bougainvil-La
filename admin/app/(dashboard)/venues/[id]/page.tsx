import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db/client'
import { venues } from '@/lib/db/schema'
import { ImagePicker } from '@/components/ImagePicker'
import { formStyles as f } from '@/components/form'
import { saveVenue, deleteVenue } from '../actions'

export default async function VenueEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const isNew = id === 'new'

  const venue = isNew ? null : (await db().select().from(venues).where(eq(venues.id, id)).limit(1))[0]
  if (!isNew && !venue) notFound()

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">{isNew ? 'New Venue' : venue!.name}</h1>

      <form action={saveVenue}>
        <input type="hidden" name="id" value={id} />

        <div className={f.field}>
          <label className={f.label} htmlFor="name">Name</label>
          <input className={f.input} id="name" name="name" defaultValue={venue?.name} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="slug">Slug (URL — lowercase, hyphens)</label>
          <input className={f.input} id="slug" name="slug" defaultValue={venue?.slug} required pattern="[a-z0-9-]+" />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="tagline">Tagline</label>
          <input className={f.input} id="tagline" name="tagline" defaultValue={venue?.tagline} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="subtitle">Subtitle (optional)</label>
          <input className={f.input} id="subtitle" name="subtitle" defaultValue={venue?.subtitle ?? ''} />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="description">Description (one paragraph per line)</label>
          <textarea className={f.textarea} id="description" name="description" rows={5} defaultValue={venue?.description.join('\n')} />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className={f.label} htmlFor="seated">Seated Capacity</label>
            <input className={f.input} id="seated" name="seated" type="number" defaultValue={venue?.seated} required />
          </div>
          <div>
            <label className={f.label} htmlFor="floating">Floating Capacity</label>
            <input className={f.input} id="floating" name="floating" type="number" defaultValue={venue?.floating} required />
          </div>
        </div>

        <p className={f.sectionTitle}>Cover Image</p>
        <div className={f.field}>
          <ImagePicker name="cover" defaultValue={venue?.cover ?? null} />
        </div>

        <p className={f.sectionTitle}>Galleries</p>
        <div className={f.field}>
          <label className={f.label} htmlFor="highlights">Highlights (image URLs, one per line)</label>
          <textarea className={f.textarea} id="highlights" name="highlights" rows={3} defaultValue={venue?.highlights.join('\n')} />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="galleryWithDecor">Gallery — Event Setups (image URLs, one per line)</label>
          <textarea className={f.textarea} id="galleryWithDecor" name="galleryWithDecor" rows={4} defaultValue={venue?.galleryWithDecor.join('\n')} />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="galleryWithoutDecor">Gallery — Venue Views (image URLs, one per line)</label>
          <textarea className={f.textarea} id="galleryWithoutDecor" name="galleryWithoutDecor" rows={4} defaultValue={venue?.galleryWithoutDecor.join('\n')} />
        </div>

        <div className={f.field}>
          <label className={f.label} htmlFor="order">Display Order</label>
          <input className={f.input} id="order" name="order" type="number" defaultValue={venue?.order ?? 0} />
        </div>

        <div className="mt-6">
          <button type="submit" className={f.primaryBtn}>Save Venue</button>
        </div>
      </form>

      {!isNew && (
        <form action={deleteVenue} className="mt-3">
          <input type="hidden" name="id" value={id} />
          <button type="submit" className={f.dangerBtn}>Delete Venue</button>
        </form>
      )}
    </div>
  )
}
