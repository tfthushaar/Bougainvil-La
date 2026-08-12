'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/client'
import { homeContent } from '@/lib/db/schema'

// Allow-list, not a fully dynamic setter — the field name arrives from a
// postMessage sent by the public site's EditBridge script, so it's treated
// as untrusted input even though only this admin UI can trigger it.
const TEXT_FIELDS = new Set([
  'heroSubtitleLeft', 'heroSubtitleRight', 'heroHeadline', 'heroParagraph', 'heroFeatureLine',
  'introHeadline', 'introParagraph',
  'founderEyebrow', 'founderQuote',
  'whyHeadline', 'whyCouplesChooseHeadline', 'eventsWeHostHeadline', 'signatureExperiencesHeadline',
  'locationBlurbHeadline', 'locationBlurbQuote',
])
const LIST_FIELDS = new Set(['founderParagraphs', 'highlights', 'whyParagraphs', 'whyCouplesChoose', 'eventsWeHost'])
const IMAGE_FIELDS = new Set(['founderImage'])

export async function updateHomeField(formData: FormData) {
  const field = String(formData.get('field') ?? '')
  const value = String(formData.get('value') ?? '')

  if (!field.startsWith('home.')) throw new Error('Unknown field: ' + field)
  const key = field.slice('home.'.length)

  let parsed: unknown
  if (LIST_FIELDS.has(key)) {
    parsed = value.split('\n').map((s) => s.trim()).filter(Boolean)
  } else if (TEXT_FIELDS.has(key) || IMAGE_FIELDS.has(key)) {
    parsed = value
  } else {
    throw new Error('Field is not editable here: ' + key)
  }

  const updates: Record<string, unknown> = { [key]: parsed }
  await db().update(homeContent).set(updates as Partial<typeof homeContent.$inferInsert>).where(eq(homeContent.id, 'singleton'))

  revalidatePath('/home')
  revalidatePath('/edit-website')
}
