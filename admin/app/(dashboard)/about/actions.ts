'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/client'
import { aboutContent } from '@/lib/db/schema'
import { triggerPublicSiteDeploy } from '@/lib/deploy'

function lines(v: FormDataEntryValue | null): string[] {
  return String(v ?? '').split('\n').map((s) => s.trim()).filter(Boolean)
}

export async function saveAboutContent(formData: FormData) {
  const values = {
    id: 'singleton',
    eyebrow: String(formData.get('eyebrow')).trim(),
    introParagraphs: lines(formData.get('introParagraphs')),
    heroImage: String(formData.get('heroImage') ?? '') || null,
    founderName: String(formData.get('founderName')).trim(),
    founderTitle: String(formData.get('founderTitle')).trim(),
    founderBioParagraphs: lines(formData.get('founderBioParagraphs')),
    highlights: lines(formData.get('highlights')),
  }

  await db().insert(aboutContent).values(values).onConflictDoUpdate({ target: aboutContent.id, set: values })
  revalidatePath('/about')
  await triggerPublicSiteDeploy()
}
