export interface RoomType {
  name: string
  description: string
  photo: string | null
  quantity: number
  capacity: string
}

const ROOM_TYPES: RoomType[] = [
  {
    name: 'The Bridal Suite',
    quantity: 1,
    capacity: 'Up to 3 Guests',
    photo: '/images/rooms/bridal-suite/003.webp',
    description:
      'A beautifully designed private suite offering elegant interiors, generous natural light, and a luxurious setting for bridal preparations, quiet moments, and timeless photographs before the celebrations begin.',
  },
  {
    name: 'The Groom’s Suite',
    quantity: 1,
    capacity: 'Up to 3 Guests',
    photo: '/images/rooms/grooms-suite/002.webp',
    description:
      'Sophisticated and spacious, the groom’s suite provides the perfect place to prepare, relax, and celebrate alongside family and friends before every event.',
  },
  {
    name: 'Luxury Family Rooms',
    quantity: 14,
    capacity: 'Up to 5 Guests Each',
    photo: '/images/rooms/family-rooms/001.webp',
    description:
      'Our spacious family rooms have been thoughtfully designed to keep loved ones together while offering exceptional comfort throughout the celebrations. Beautifully furnished with modern amenities, they create a welcoming retreat between every event.',
  },
  {
    name: 'Dormitory Accommodation',
    quantity: 2,
    capacity: 'Up to 12 Guests Each',
    photo: null,
    description:
      'Perfect for larger groups of friends and extended family, our dormitory offers generous space, comfort, and convenience while maintaining the same high standard of hospitality found throughout Bougainvil’La.',
  },
]

// async on purpose — see the comment in lib/content/venues.ts.
export async function getRoomTypes(): Promise<RoomType[]> {
  return ROOM_TYPES
}
