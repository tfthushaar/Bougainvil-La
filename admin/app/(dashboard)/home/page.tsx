import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { homeContent } from '@/lib/db/schema'
import { ImagePicker } from '@/components/ImagePicker'
import { formStyles as f } from '@/components/form'
import { SignatureExperiencesEditor } from './SignatureExperiencesEditor'
import { saveHomeContent } from './actions'

export default async function HomePage() {
  let home: typeof homeContent.$inferSelect | undefined
  let error: string | null = null
  try {
    home = (await db().select().from(homeContent).where(eq(homeContent.id, 'singleton')).limit(1))[0]
  } catch {
    error = 'No database connection yet.'
  }

  const experiences = (home?.signatureExperiences as { title: string; desc?: string }[] | undefined) ?? []

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">Home Page</h1>
      {error && <p className="mb-4 text-sm text-amber-700">{error}</p>}

      <form action={saveHomeContent}>
        <p className={f.sectionTitle}>Hero</p>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className={f.label} htmlFor="heroSubtitleLeft">Subtitle — Left</label>
            <input className={f.input} id="heroSubtitleLeft" name="heroSubtitleLeft" defaultValue={home?.heroSubtitleLeft} required />
          </div>
          <div>
            <label className={f.label} htmlFor="heroSubtitleRight">Subtitle — Right</label>
            <input className={f.input} id="heroSubtitleRight" name="heroSubtitleRight" defaultValue={home?.heroSubtitleRight} required />
          </div>
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="heroEyebrow">Eyebrow</label>
          <input className={f.input} id="heroEyebrow" name="heroEyebrow" defaultValue={home?.heroEyebrow} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="heroHeadline">Headline</label>
          <input className={f.input} id="heroHeadline" name="heroHeadline" defaultValue={home?.heroHeadline} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="heroParagraph">Paragraph</label>
          <textarea className={f.textarea} id="heroParagraph" name="heroParagraph" rows={3} defaultValue={home?.heroParagraph} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="heroFeatureLine">Feature Line</label>
          <input className={f.input} id="heroFeatureLine" name="heroFeatureLine" defaultValue={home?.heroFeatureLine} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="heroButtonsLabel">Buttons Label</label>
          <input className={f.input} id="heroButtonsLabel" name="heroButtonsLabel" defaultValue={home?.heroButtonsLabel} required />
        </div>

        <p className={f.sectionTitle}>Intro</p>
        <div className={f.field}>
          <label className={f.label} htmlFor="introHeadline">Headline</label>
          <input className={f.input} id="introHeadline" name="introHeadline" defaultValue={home?.introHeadline} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="introParagraph">Paragraph</label>
          <textarea className={f.textarea} id="introParagraph" name="introParagraph" rows={3} defaultValue={home?.introParagraph} required />
        </div>

        <p className={f.sectionTitle}>Founder Teaser</p>
        <div className={f.field}>
          <label className={f.label} htmlFor="founderEyebrow">Eyebrow</label>
          <input className={f.input} id="founderEyebrow" name="founderEyebrow" defaultValue={home?.founderEyebrow} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="founderParagraphs">Paragraphs (one per line)</label>
          <textarea className={f.textarea} id="founderParagraphs" name="founderParagraphs" rows={4} defaultValue={home?.founderParagraphs.join('\n')} />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="founderQuote">Quote</label>
          <input className={f.input} id="founderQuote" name="founderQuote" defaultValue={home?.founderQuote} required />
        </div>
        <div className={f.field}>
          <ImagePicker name="founderImage" defaultValue={home?.founderImage ?? null} />
        </div>

        <p className={f.sectionTitle}>Highlights</p>
        <div className={f.field}>
          <label className={f.label} htmlFor="highlights">Highlights (one per line)</label>
          <textarea className={f.textarea} id="highlights" name="highlights" rows={5} defaultValue={home?.highlights.join('\n')} />
        </div>

        <p className={f.sectionTitle}>Why Bougainvil&rsquo;La</p>
        <div className={f.field}>
          <label className={f.label} htmlFor="whyHeadline">Headline</label>
          <input className={f.input} id="whyHeadline" name="whyHeadline" defaultValue={home?.whyHeadline} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="whyParagraphs">Paragraphs (one per line)</label>
          <textarea className={f.textarea} id="whyParagraphs" name="whyParagraphs" rows={4} defaultValue={home?.whyParagraphs.join('\n')} />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="whyCouplesChooseHeadline">"Why Couples Choose" Headline</label>
          <input className={f.input} id="whyCouplesChooseHeadline" name="whyCouplesChooseHeadline" defaultValue={home?.whyCouplesChooseHeadline} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="whyCouplesChoose">"Why Couples Choose" Items (one per line)</label>
          <textarea className={f.textarea} id="whyCouplesChoose" name="whyCouplesChoose" rows={4} defaultValue={home?.whyCouplesChoose.join('\n')} />
        </div>

        <p className={f.sectionTitle}>Events We Host</p>
        <div className={f.field}>
          <label className={f.label} htmlFor="eventsWeHostHeadline">Headline</label>
          <input className={f.input} id="eventsWeHostHeadline" name="eventsWeHostHeadline" defaultValue={home?.eventsWeHostHeadline} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="eventsWeHost">Events (one per line)</label>
          <textarea className={f.textarea} id="eventsWeHost" name="eventsWeHost" rows={4} defaultValue={home?.eventsWeHost.join('\n')} />
        </div>

        <p className={f.sectionTitle}>Signature Experiences</p>
        <div className={f.field}>
          <label className={f.label} htmlFor="signatureExperiencesHeadline">Headline</label>
          <input className={f.input} id="signatureExperiencesHeadline" name="signatureExperiencesHeadline" defaultValue={home?.signatureExperiencesHeadline} required />
        </div>
        <div className={f.field}>
          <SignatureExperiencesEditor name="signatureExperiences" defaultValue={experiences} />
        </div>

        <p className={f.sectionTitle}>Location Blurb</p>
        <div className={f.field}>
          <label className={f.label} htmlFor="locationBlurbHeadline">Headline</label>
          <input className={f.input} id="locationBlurbHeadline" name="locationBlurbHeadline" defaultValue={home?.locationBlurbHeadline} required />
        </div>
        <div className={f.field}>
          <label className={f.label} htmlFor="locationBlurbQuote">Quote</label>
          <textarea className={f.textarea} id="locationBlurbQuote" name="locationBlurbQuote" rows={2} defaultValue={home?.locationBlurbQuote} required />
        </div>

        <button type="submit" className={f.primaryBtn}>Save Home Page</button>
      </form>
    </div>
  )
}
