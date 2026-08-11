import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { siteSettings } from '@/lib/db/schema'
import { formStyles as f } from '@/components/form'
import { saveSiteSettings } from './actions'

export default async function SiteSettingsPage() {
  let settings: typeof siteSettings.$inferSelect | undefined
  let error: string | null = null
  try {
    settings = (await db().select().from(siteSettings).where(eq(siteSettings.id, 'singleton')).limit(1))[0]
  } catch {
    error = 'No database connection yet.'
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">Site Settings</h1>
      {error && <p className="mb-4 text-sm text-amber-700">{error}</p>}

      <form action={saveSiteSettings}>
        <div className={f.field}>
          <label className={f.label} htmlFor="address">Address</label>
          <textarea className={f.textarea} id="address" name="address" rows={2} defaultValue={settings?.address} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="mapsUrl">Google Maps Link</label>
          <input className={f.input} id="mapsUrl" name="mapsUrl" defaultValue={settings?.mapsUrl} required />
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className={f.label} htmlFor="phone">Phone</label>
            <input className={f.input} id="phone" name="phone" defaultValue={settings?.phone} required />
          </div>
          <div>
            <label className={f.label} htmlFor="email">Email</label>
            <input className={f.input} id="email" name="email" type="email" defaultValue={settings?.email} required />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className={f.label} htmlFor="instagramHandle">Instagram Handle</label>
            <input className={f.input} id="instagramHandle" name="instagramHandle" defaultValue={settings?.instagramHandle} required />
          </div>
          <div>
            <label className={f.label} htmlFor="instagramUrl">Instagram URL</label>
            <input className={f.input} id="instagramUrl" name="instagramUrl" defaultValue={settings?.instagramUrl} required />
          </div>
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="footerTagline">Footer Tagline</label>
          <input className={f.input} id="footerTagline" name="footerTagline" defaultValue={settings?.footerTagline} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="bookTourEmailSubject">"Book a Venue Tour" Email Subject</label>
          <input className={f.input} id="bookTourEmailSubject" name="bookTourEmailSubject" defaultValue={settings?.bookTourEmailSubject} required />
        </div>

        <button type="submit" className={f.primaryBtn}>Save Settings</button>
      </form>
    </div>
  )
}
