export interface SiteSettings {
  address: string
  phone: string
  email: string
  instagramHandle: string
  instagramUrl: string
  footerTagline: string
  bookTourEmailSubject: string
}

const SITE_SETTINGS: SiteSettings = {
  address: 'Near Bolare, K.G. Gollarapalya, Kanakapura Road, Bengaluru, Karnataka – 562109',
  phone: '+91 86606 54160',
  email: 'bougainvillaluxury@gmail.com',
  instagramHandle: '@bougainvillaweddingvenue',
  instagramUrl: 'https://www.instagram.com/bougainvillaweddingvenue/',
  footerTagline: 'Celebrate Luxury. Create Memories That Last Forever.',
  bookTourEmailSubject: 'Venue Tour Request',
}

export function getSiteSettings(): SiteSettings {
  return SITE_SETTINGS
}
