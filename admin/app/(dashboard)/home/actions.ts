'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/client'
import { homeContent } from '@/lib/db/schema'

function lines(v: FormDataEntryValue | null): string[] {
  return String(v ?? '').split('\n').map((s) => s.trim()).filter(Boolean)
}

export async function saveHomeContent(formData: FormData) {
  let signatureExperiences: { title: string; desc?: string }[] = []
  try {
    signatureExperiences = JSON.parse(String(formData.get('signatureExperiences') ?? '[]'))
  } catch {
    signatureExperiences = []
  }

  const values = {
    id: 'singleton',
    heroSubtitleLeft: String(formData.get('heroSubtitleLeft')).trim(),
    heroSubtitleRight: String(formData.get('heroSubtitleRight')).trim(),
    heroEyebrow: String(formData.get('heroEyebrow')).trim(),
    heroHeadline: String(formData.get('heroHeadline')).trim(),
    heroParagraph: String(formData.get('heroParagraph')).trim(),
    heroFeatureLine: String(formData.get('heroFeatureLine')).trim(),
    heroButtonsLabel: String(formData.get('heroButtonsLabel')).trim(),
    introHeadline: String(formData.get('introHeadline')).trim(),
    introParagraph: String(formData.get('introParagraph')).trim(),
    founderEyebrow: String(formData.get('founderEyebrow')).trim(),
    founderParagraphs: lines(formData.get('founderParagraphs')),
    founderQuote: String(formData.get('founderQuote')).trim(),
    founderImage: String(formData.get('founderImage') ?? '') || null,
    highlights: lines(formData.get('highlights')),
    whyHeadline: String(formData.get('whyHeadline')).trim(),
    whyParagraphs: lines(formData.get('whyParagraphs')),
    whyCouplesChooseHeadline: String(formData.get('whyCouplesChooseHeadline')).trim(),
    whyCouplesChoose: lines(formData.get('whyCouplesChoose')),
    eventsWeHostHeadline: String(formData.get('eventsWeHostHeadline')).trim(),
    eventsWeHost: lines(formData.get('eventsWeHost')),
    signatureExperiencesHeadline: String(formData.get('signatureExperiencesHeadline')).trim(),
    signatureExperiences,
    locationBlurbHeadline: String(formData.get('locationBlurbHeadline')).trim(),
    locationBlurbQuote: String(formData.get('locationBlurbQuote')).trim(),
  }

  await db().insert(homeContent).values(values).onConflictDoUpdate({ target: homeContent.id, set: values })
  revalidatePath('/home')
}
