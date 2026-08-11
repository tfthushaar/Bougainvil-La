export interface SiteSettings {
  address: string
  mapsUrl: string
  phone: string
  email: string
  instagramHandle: string
  instagramUrl: string
  footerTagline: string
  bookTourEmailSubject: string
}

const SITE_SETTINGS: SiteSettings = {
  address: 'Near Bolare, K.G. Gollarapalya, Kanakapura Road, Bengaluru, Karnataka – 562109',
  mapsUrl: 'https://maps.app.goo.gl/ksAa6SHcVmsKMZ1Y9?g_st=ic',
  phone: '+91 86606 54160',
  email: 'bougainvillaluxury@gmail.com',
  instagramHandle: '@bougainvillaweddingvenue',
  instagramUrl: 'https://www.instagram.com/bougainvillaweddingvenue/',
  footerTagline: 'Celebrate Luxury. Create Memories That Last Forever.',
  bookTourEmailSubject: 'Venue Tour Request',
}

// async on purpose — see the comment in lib/content/venues.ts.
export async function getSiteSettings(): Promise<SiteSettings> {
  return SITE_SETTINGS
}
