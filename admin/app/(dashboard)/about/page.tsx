import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { aboutContent } from '@/lib/db/schema'
import { ImagePicker } from '@/components/ImagePicker'
import { formStyles as f } from '@/components/form'
import { saveAboutContent } from './actions'

export default async function AboutPage() {
  let about: typeof aboutContent.$inferSelect | undefined
  let error: string | null = null
  try {
    about = (await db().select().from(aboutContent).where(eq(aboutContent.id, 'singleton')).limit(1))[0]
  } catch {
    error = 'No database connection yet.'
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">About Page</h1>
      {error && <p className="mb-4 text-sm text-amber-700">{error}</p>}

      <form action={saveAboutContent}>
        <div className={f.field}>
          <label className={f.label} htmlFor="eyebrow">Eyebrow</label>
          <input className={f.input} id="eyebrow" name="eyebrow" defaultValue={about?.eyebrow} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="introParagraphs">Intro Paragraphs (one per line)</label>
          <textarea className={f.textarea} id="introParagraphs" name="introParagraphs" rows={4} defaultValue={about?.introParagraphs.join('\n')} />
        </div>

        <p className={f.sectionTitle}>Header Image</p>
        <div className={f.field}>
          <ImagePicker name="heroImage" defaultValue={about?.heroImage ?? null} />
        </div>

        <p className={f.sectionTitle}>Founder</p>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className={f.label} htmlFor="founderName">Founder Name</label>
            <input className={f.input} id="founderName" name="founderName" defaultValue={about?.founderName} required />
          </div>
          <div>
            <label className={f.label} htmlFor="founderTitle">Founder Title</label>
            <input className={f.input} id="founderTitle" name="founderTitle" defaultValue={about?.founderTitle} required />
          </div>
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="founderBioParagraphs">Founder Bio (one paragraph per line)</label>
          <textarea className={f.textarea} id="founderBioParagraphs" name="founderBioParagraphs" rows={8} defaultValue={about?.founderBioParagraphs.join('\n')} />
        </div>

        <p className={f.sectionTitle}>Highlights</p>
        <div className={f.field}>
          <label className={f.label} htmlFor="highlights">Highlights (one per line)</label>
          <textarea className={f.textarea} id="highlights" name="highlights" rows={5} defaultValue={about?.highlights.join('\n')} />
        </div>

        <button type="submit" className={f.primaryBtn}>Save About Page</button>
      </form>
    </div>
  )
}
