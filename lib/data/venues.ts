export interface Venue {
  slug: string
  name: string
  tagline: string
  subtitle?: string
  description: string[]
  seated: number
  floating: number
  cover: string | null
  /** Hand-picked highlights for the venue detail page — the full provided
   *  photo set lives on /gallery/. */
  highlights: string[]
}

export const VENUES: Venue[] = [
  {
    slug: 'sumeera',
    name: 'Sumeera',
    tagline: 'Where Jaipur Grandeur Meets Our Iconic Floating Mandap',
    subtitle: 'Luxury Outdoor Wedding Venue with a floating mandap concept in Bangalore',
    description: [
      "Inspired by timeless Jaipur architecture, this spectacular Outdoor Wedding Venue Bangalore is centred around our iconic Floating Mandap, creating one of the most photographed ceremony settings in Bengaluru. Grand pink pillars, shimmering waters, and open skies come together to create an experience unlike any other.",
      'By day, natural light reflects beautifully across the Floating Mandap, while evenings transform the venue into a magical celebration beneath the stars. Every ceremony becomes a timeless memory.',
    ],
    seated: 600,
    floating: 900,
    cover: '/images/venues/sumeera/with-decor/003.webp',
    highlights: [
      '/images/venues/sumeera/with-decor/001.webp',
      '/images/venues/sumeera/with-decor/015.webp',
      '/images/venues/sumeera/with-decor/026.webp',
    ],
  },
  {
    slug: 'floral-trellis',
    name: 'Floral Trellis',
    tagline: 'Celebrate, Rain or Shine',
    subtitle: "Bengaluru's First Retractable Roof Wedding Venue",
    description: [
      'Floral Trellis perfectly combines the beauty of an outdoor celebration with complete peace of mind.',
      "Home to Bengaluru's first Retractable Roof Wedding Venue, this remarkable space allows couples to enjoy nature without worrying about changing weather. Whether open to blue skies or protected beneath its elegant retractable roof, every celebration unfolds exactly as envisioned.",
      'Natural light, landscaped gardens and enchanting evening lighting make Floral Trellis one of the most versatile celebration spaces at our Destination Wedding Venue Bangalore.',
    ],
    seated: 500,
    floating: 700,
    cover: '/images/venues/floral-trellis/with-decor/021.webp',
    highlights: [
      '/images/venues/floral-trellis/with-decor/021.webp',
      '/images/venues/floral-trellis/with-decor/018.webp',
      '/images/venues/floral-trellis/with-decor/023.webp',
    ],
  },
  {
    slug: 'divine-bells',
    name: 'Divine Bells',
    tagline: 'An Open Lawn Canvas',
    subtitle: 'Elegant Wedding Lawn in Bangalore',
    description: [
      'Inspired by South Indian heritage and timeless Chettinad architecture, Divine Bells offers one of the most elegant Wedding Lawn Bangalore experiences.',
      'Beautiful pillars, intricate craftsmanship, and expansive open lawns provide a refined backdrop for ceremonies, receptions, and cultural celebrations.',
      'This elegant Wedding Lawn Bangalore balances tradition with modern luxury, creating an atmosphere that feels both majestic and welcoming.',
    ],
    seated: 250,
    floating: 350,
    cover: '/images/venues/divine-bells/with-decor/004.webp',
    highlights: [
      '/images/venues/divine-bells/with-decor/004.webp',
      '/images/venues/divine-bells/with-decor/008.webp',
      '/images/venues/divine-bells/without-decor/004.webp',
    ],
  },
  {
    slug: 'margarita',
    name: 'Margarita',
    tagline: 'Tropical Garden Wedding Venue',
    description: [
      'Tucked beneath towering trees and vibrant bougainvillea blooms, Margarita offers an enchanting garden setting where nature becomes part of every celebration.',
      'Gentle sunlight filters through the lush canopy during the day, while evenings transform the space into a romantic garden illuminated by soft lighting and endless greenery. Every pathway, every bloom, and every corner creates a naturally beautiful backdrop that feels intimate, relaxed, and effortlessly elegant.',
      'Perfect for engagements, haldi ceremonies, cocktail evenings, and pre-wedding celebrations.',
    ],
    seated: 200,
    floating: 300,
    cover: '/images/venues/margarita/with-decor/005.webp',
    highlights: [
      '/images/venues/margarita/with-decor/001.webp',
      '/images/venues/margarita/with-decor/022.webp',
      '/images/venues/margarita/without-decor/001.webp',
    ],
  },
  {
    slug: 'ice-spice',
    name: 'Ice Spice',
    tagline: 'Semi Indoor Haven',
    subtitle: 'Semi Indoor Wedding Venue Bangalore',
    description: [
      'Overlooking the sparkling pool, Ice Spice blends contemporary elegance with relaxed sophistication.',
      'Designed for intimate gatherings, dining experiences, and celebrations, this semi-indoor venue provides comfort while maintaining beautiful connections with the surrounding landscape.',
    ],
    seated: 180,
    floating: 280,
    cover: '/images/venues/ice-spice/with-decor/001.webp',
    highlights: [
      '/images/venues/ice-spice/with-decor/001.webp',
      '/images/venues/ice-spice/with-decor/003.webp',
      '/images/venues/ice-spice/with-decor/004.webp',
    ],
  },
]
