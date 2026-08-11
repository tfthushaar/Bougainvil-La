'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/client'
import { siteSettings } from '@/lib/db/schema'
import { triggerPublicSiteDeploy } from '@/lib/deploy'

export async function saveSiteSettings(formData: FormData) {
  const values = {
    id: 'singleton',
    address: String(formData.get('address')).trim(),
    mapsUrl: String(formData.get('mapsUrl')).trim(),
    phone: String(formData.get('phone')).trim(),
    email: String(formData.get('email')).trim(),
    instagramHandle: String(formData.get('instagramHandle')).trim(),
    instagramUrl: String(formData.get('instagramUrl')).trim(),
    footerTagline: String(formData.get('footerTagline')).trim(),
    bookTourEmailSubject: String(formData.get('bookTourEmailSubject')).trim(),
  }

  await db().insert(siteSettings).values(values).onConflictDoUpdate({ target: siteSettings.id, set: values })
  revalidatePath('/site-settings')
  await triggerPublicSiteDeploy()
}
