'use server'

import { eq } from 'drizzle-orm'
import type { PgTableWithColumns } from 'drizzle-orm/pg-core'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/client'
import { homeContent, aboutContent, siteSettings, venues, roomTypes, faqItems } from '@/lib/db/schema'

type FieldType = 'text' | 'list' | 'number' | 'image'

// Allow-list per table — the field name arrives from a postMessage sent by
// the public site's EditBridge script, so it's treated as untrusted input
// even though only this admin UI can trigger it. Field id format on the
// wire: "<table>:<id>.<column>", e.g. "venue:9e1f...ab.name" or
// "home:singleton.heroHeadline" for the singleton tables.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TABLES: Record<string, { table: PgTableWithColumns<any>; revalidate: string; fields: Record<string, FieldType> }> = {
  home: {
    table: homeContent, revalidate: '/home',
    fields: {
      heroSubtitleLeft: 'text', heroSubtitleRight: 'text', heroHeadline: 'text', heroParagraph: 'text', heroFeatureLine: 'text',
      introHeadline: 'text', introParagraph: 'text',
      founderEyebrow: 'text', founderParagraphs: 'list', founderQuote: 'text', founderImage: 'image',
      highlights: 'list',
      whyHeadline: 'text', whyParagraphs: 'list', whyCouplesChooseHeadline: 'text', whyCouplesChoose: 'list',
      eventsWeHostHeadline: 'text', eventsWeHost: 'list',
      signatureExperiencesHeadline: 'text',
      locationBlurbHeadline: 'text', locationBlurbQuote: 'text',
    },
  },
  about: {
    table: aboutContent, revalidate: '/about',
    fields: {
      eyebrow: 'text', introParagraphs: 'list', heroImage: 'image',
      founderName: 'text', founderTitle: 'text', founderBioParagraphs: 'list', highlights: 'list',
    },
  },
  siteSettings: {
    table: siteSettings, revalidate: '/site-settings',
    fields: { address: 'text', phone: 'text', email: 'text', instagramHandle: 'text' },
  },
  venue: {
    table: venues, revalidate: '/venues',
    fields: { name: 'text', tagline: 'text', subtitle: 'text', description: 'list', cover: 'image', seated: 'number', floating: 'number' },
  },
  roomType: {
    table: roomTypes, revalidate: '/room-types',
    fields: { name: 'text', description: 'text', photo: 'image', capacity: 'text', quantity: 'number' },
  },
  faq: {
    table: faqItems, revalidate: '/faq',
    fields: { question: 'text', answer: 'text' },
  },
}

function parseValue(type: FieldType, raw: string): unknown {
  switch (type) {
    case 'list':
      return raw.split('\n').map((s) => s.trim()).filter(Boolean)
    case 'number':
      return Number(raw) || 0
    default:
      return raw
  }
}

export async function updateField(formData: FormData) {
  const field = String(formData.get('field') ?? '')
  const value = String(formData.get('value') ?? '')

  const m = field.match(/^([a-zA-Z]+):([^.]+)\.([a-zA-Z]+)$/)
  if (!m) throw new Error('Malformed field id: ' + field)
  const [, tableKey, id, column] = m

  const spec = TABLES[tableKey]
  if (!spec) throw new Error('Unknown table: ' + tableKey)
  const fieldType = spec.fields[column]
  if (!fieldType) throw new Error('Field is not editable here: ' + field)

  const updates = { [column]: parseValue(fieldType, value) }
  await db().update(spec.table).set(updates).where(eq(spec.table.id, id))

  revalidatePath(spec.revalidate)
}
