export type LocationBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }

export interface LocationPageDoc {
  slug: string
  metaTitle: string
  metaDescription: string
  h1: string
  subheading?: string
  blocks: LocationBlock[]
  /** True only for the South Bangalore hub page other locality pages link back to */
  isPillar?: boolean
}

const ADDRESS_BLOCKS: LocationBlock[] = [
  { type: 'paragraph', text: "Bougainvil'La – Celebrate Luxury" },
  { type: 'paragraph', text: 'Near Bolare, K.G. Gollarapalya' },
  { type: 'paragraph', text: 'Bengaluru, Karnataka – 562109' },
  { type: 'paragraph', text: 'Call: +91 86606 54160' },
]

const LOCATIONS: LocationPageDoc[] = [
  {
    slug: 'wedding-venue-kanakapura-road-bangalore',
    metaTitle: "Luxury Wedding Venue on Kanakapura Road, Bangalore | Bougainvil'La",
    metaDescription:
      "Looking for a luxury wedding venue on Kanakapura Road, South Bangalore? Discover Bougainvil'La, with poolside, outdoor and semi-indoor spaces for weddings, Sangeet, Mehendi and receptions.",
    h1: 'Luxury Wedding Venue on Kanakapura Road, Bangalore',
    subheading: "Celebrate Your Wedding at Bougainvil'La",
    blocks: [
      { type: 'paragraph', text: 'Searching for a luxury wedding venue on Kanakapura Road, Bangalore?' },
      { type: 'paragraph', text: "Welcome to Bougainvil'La – Celebrate Luxury, an exclusive wedding destination in South Bangalore designed for celebrations that deserve an extraordinary setting." },
      { type: 'paragraph', text: "Located near Bolare and K.G. Gollarapalya, Bougainvil'La brings together distinctive architecture, landscaped outdoor spaces, elegant semi-indoor venues and thoughtfully designed celebration areas where every wedding can have its own character." },
      { type: 'paragraph', text: 'From an intimate Mehendi or Haldi to a spectacular Sangeet, traditional Muhurtham and grand wedding reception, the property allows families to create an entire wedding journey within one destination.' },
      { type: 'heading', text: 'A Wedding Destination Designed for Multiple Celebrations' },
      { type: 'paragraph', text: 'A wedding is rarely just one event.' },
      { type: 'paragraph', text: 'At Bougainvil’La, couples can choose different settings for different functions, allowing the visual experience of the wedding to evolve from one celebration to another.' },
      { type: 'paragraph', text: 'Our celebration spaces include:' },
      { type: 'heading', text: 'SuMeera – Poolside Paradise' },
      { type: 'paragraph', text: 'A spectacular poolside setting where the centre of the pool can transform into a wedding mandap.' },
      { type: 'heading', text: 'Divine Bells' },
      { type: 'paragraph', text: 'An atmospheric outdoor venue featuring Chettinad-inspired pillars, brass bells and greenery – ideal for traditional ceremonies and intimate celebrations.' },
      { type: 'heading', text: 'Floral Trellis' },
      { type: 'paragraph', text: 'An expansive outdoor celebration space featuring a retractable roof, giving couples greater flexibility while planning large celebrations.' },
      { type: 'heading', text: 'Ice-Spice' },
      { type: 'paragraph', text: 'A sophisticated semi-indoor venue surrounded by greenery, ideal for dining experiences and intimate functions.' },
      { type: 'paragraph', text: "Along with these distinctive spaces, Bougainvil'La offers beautiful pathways, architectural details and landscaped surroundings that become natural backdrops for wedding photography." },
      { type: 'heading', text: 'A Luxury Wedding Venue in South Bangalore' },
      { type: 'paragraph', text: "For couples looking beyond conventional wedding halls and hotel ballrooms, Bougainvil'La offers the experience of celebrating in a destination-style wedding venue while remaining in Bengaluru." },
      { type: 'paragraph', text: 'Whether you envision a traditional South Indian wedding, contemporary celebration, destination-style wedding weekend or an intimate luxury ceremony, the venue can be transformed around your vision.' },
      { type: 'heading', text: "Plan Your Wedding at Bougainvil'La" },
      { type: 'paragraph', text: 'Discover a wedding venue where architecture, nature and celebration come together.' },
      ...ADDRESS_BLOCKS,
    ],
  },
  {
    slug: 'wedding-venue-near-jp-nagar-bangalore',
    metaTitle: "Luxury Wedding Venue near JP Nagar Bangalore | Bougainvil'La",
    metaDescription:
      "Searching for a wedding venue near JP Nagar, Bangalore? Explore Bougainvil'La, a luxury South Bangalore wedding destination with poolside, outdoor and semi-indoor venues.",
    h1: 'Luxury Wedding Venue near JP Nagar, Bangalore',
    subheading: 'A Destination-Style Wedding Experience in South Bangalore',
    blocks: [
      { type: 'paragraph', text: "If you are searching for a luxury wedding venue near JP Nagar, discover Bougainvil'La – Celebrate Luxury, a distinctive wedding destination located near Bolare and K.G. Gollarapalya in South Bengaluru." },
      { type: 'paragraph', text: "Created specifically for celebrations, Bougainvil'La combines architecture, landscaped surroundings and multiple event spaces to give couples the freedom to create a wedding that feels personal rather than conventional." },
      { type: 'paragraph', text: 'Instead of celebrating every function inside the same ballroom, couples can create a different atmosphere for their Haldi, Mehendi, Sangeet, Muhurtham and reception.' },
      { type: 'heading', text: 'From Poolside Weddings to Grand Outdoor Celebrations' },
      { type: 'paragraph', text: 'Imagine exchanging vows with a mandap appearing to float over water.' },
      { type: 'paragraph', text: 'At SuMeera, the pool becomes the focal point of the celebration, with its centre designed to transform into a wedding mandap.' },
      { type: 'paragraph', text: 'For traditional ceremonies, Divine Bells creates an entirely different mood with Chettinad-inspired pillars, brass bells and beautiful natural surroundings.' },
      { type: 'paragraph', text: 'Larger celebrations can unfold at Floral Trellis, an expansive outdoor venue featuring a retractable roof.' },
      { type: 'paragraph', text: 'For intimate gatherings and dining experiences, Ice-Spice provides a sophisticated semi-indoor environment surrounded by greenery.' },
      { type: 'paragraph', text: 'Together, these spaces allow couples to curate an entire wedding experience within one destination.' },
      { type: 'heading', text: 'For Couples Looking for Wedding Venues around JP Nagar' },
      { type: 'paragraph', text: 'Couples and families based in JP Nagar and surrounding South Bangalore neighbourhoods often want the atmosphere of a destination wedding without necessarily planning their celebration outside Bengaluru.' },
      { type: 'paragraph', text: "Bougainvil'La offers precisely that experience – an immersive wedding setting within South Bangalore." },
      { type: 'paragraph', text: 'The venue is suitable for:' },
      { type: 'list', items: ['Traditional Weddings', 'Luxury Weddings', 'North Indian weddings', 'South Indian Weddings', 'Destination-Style Weddings', 'Engagements', 'Mehendi Celebrations', 'Haldi Ceremonies', 'Sangeet Nights', 'Wedding Receptions', 'Anniversary Celebrations'] },
      { type: 'paragraph', text: 'Every couple arrives with a different vision.' },
      { type: 'paragraph', text: "Bougainvil'La provides the canvas to bring that vision to life – from intimate ceremonies surrounded by greenery to spectacular poolside weddings and elegant evening receptions." },
      { type: 'heading', text: "Visit Bougainvil'La" },
      ...ADDRESS_BLOCKS,
    ],
  },
  {
    slug: 'wedding-venue-near-bannerghatta-road',
    metaTitle: "Luxury Wedding Venue near Bannerghatta Road | Bougainvil'La",
    metaDescription:
      "Discover Bougainvil'La, a luxury wedding venue near Bannerghatta Road in South Bangalore featuring poolside, outdoor and semi-indoor spaces for memorable celebrations.",
    h1: 'Luxury Wedding Venue near Bannerghatta Road',
    subheading: 'Where Nature, Architecture and Celebrations Come Together',
    blocks: [
      { type: 'paragraph', text: 'Looking for a luxury wedding venue near Bannerghatta Road?' },
      { type: 'paragraph', text: "Discover Bougainvil'La – Celebrate Luxury, a wedding destination in South Bengaluru created for couples who want more than a conventional wedding hall." },
      { type: 'paragraph', text: 'Located near Bolare and K.G. Gollarapalya, the property combines landscaped surroundings, distinctive architectural elements and multiple celebration spaces suitable for everything from intimate pre-wedding ceremonies to grand receptions.' },
      { type: 'heading', text: 'One Destination. Multiple Wedding Experiences.' },
      { type: 'paragraph', text: 'Your Mehendi does not have to look like your Sangeet.' },
      { type: 'paragraph', text: 'Your Sangeet does not have to look like your wedding.' },
      { type: 'paragraph', text: 'And your reception can create an entirely new experience.' },
      { type: 'paragraph', text: "Bougainvil'La gives couples the opportunity to use different areas of the property across their wedding celebrations." },
      { type: 'paragraph', text: 'Host an intimate daytime ceremony surrounded by greenery.' },
      { type: 'paragraph', text: 'Create a vibrant Mehendi celebration.' },
      { type: 'paragraph', text: 'Plan an atmospheric Sangeet as evening falls.' },
      { type: 'paragraph', text: 'Exchange vows at a spectacular poolside mandap.' },
      { type: 'paragraph', text: 'And welcome your guests to an elegant wedding reception.' },
      { type: 'heading', text: 'Discover the Celebration Spaces' },
      { type: 'paragraph', text: "SuMeera creates one of Bougainvil'La's signature experiences – a poolside celebration with the possibility of transforming the centre of the pool into the wedding mandap." },
      { type: 'paragraph', text: 'Divine Bells brings together traditional architectural influences, brass bells, pillars and greenery for ceremonies filled with character.' },
      { type: 'paragraph', text: 'Floral Trellis provides a spacious outdoor environment with a retractable roof and room for larger wedding celebrations.' },
      { type: 'paragraph', text: 'Ice-Spice offers a semi-indoor setting surrounded by greenery and is particularly suited to dining experiences and smaller functions.' },
      { type: 'paragraph', text: 'Every space provides a different backdrop, allowing wedding planners and designers to create a distinct visual identity for each event.' },
      { type: 'heading', text: 'A Destination Wedding Feel – Within Bangalore' },
      { type: 'paragraph', text: "You shouldn't necessarily have to leave Bangalore to create the feeling of a destination wedding." },
      { type: 'paragraph', text: "For families looking for wedding venues around Bannerghatta Road and South Bengaluru, Bougainvil'La offers an opportunity to step away from conventional city wedding spaces and celebrate in a venue designed around the wedding experience itself." },
      { type: 'heading', text: "Experience Bougainvil'La" },
      { type: 'paragraph', text: 'Schedule a venue visit and explore the different possibilities for your wedding.' },
      ...ADDRESS_BLOCKS,
    ],
  },
  {
    slug: 'wedding-venue-near-jayanagar-bangalore',
    metaTitle: "Luxury Wedding Venue near Jayanagar, Bangalore | Bougainvil'La",
    metaDescription:
      "Searching for an elegant wedding venue near Jayanagar, Bangalore? Discover Bougainvil'La, a luxury South Bangalore destination wedding venue with poolside, outdoor and semi-indoor spaces.",
    h1: 'Luxury Wedding Venue near Jayanagar, Bangalore',
    subheading: 'A Beautiful South Bangalore Destination for Your Wedding',
    blocks: [
      { type: 'paragraph', text: 'Searching for an elegant wedding venue near Jayanagar?' },
      { type: 'paragraph', text: "Bougainvil'La – Celebrate Luxury offers couples and families a distinctive wedding destination in South Bengaluru, located near Bolare, K.G. Gollarapalya." },
      { type: 'heading', text: 'Discover the Celebration Spaces' },
      { type: 'paragraph', text: "SuMeera creates one of Bougainvil'La's signature experiences – a poolside celebration with the possibility of transforming the centre of the pool into the wedding mandap." },
      { type: 'paragraph', text: 'Divine Bells brings together traditional architectural influences, brass bells, pillars and greenery for ceremonies filled with character.' },
      { type: 'paragraph', text: 'Floral Trellis provides a spacious outdoor environment with a retractable roof and room for larger wedding celebrations.' },
      { type: 'paragraph', text: 'Ice-Spice offers a semi-indoor setting surrounded by greenery and is particularly suited to dining experiences and smaller functions.' },
      { type: 'heading', text: "Experience Bougainvil'La" },
      { type: 'paragraph', text: 'Schedule a venue visit and explore the different possibilities for your wedding.' },
      ...ADDRESS_BLOCKS,
    ],
  },
  {
    slug: 'wedding-venue-near-nice-road',
    metaTitle: "Luxury Wedding Venue Near NICE Road, Bangalore | Bougainvil'La",
    metaDescription:
      "Bougainvil'La is a luxury wedding venue conveniently located off NICE Road, offering a Floating Mandap, retractable roof venue, and five celebration spaces.",
    h1: 'Luxury Wedding Venue Near NICE Road',
    blocks: [
      { type: 'paragraph', text: "Bougainvil'La's location just off NICE Road makes it one of the most accessible luxury destination wedding venues for guests arriving from across Bangalore — Electronic City, Kanakapura Road, Bannerghatta Road, and beyond." },
      { type: 'paragraph', text: "NICE Road connectivity means your out-of-town and cross-city guests reach the venue with ease, while still enjoying a destination wedding feel — Bengaluru's iconic Floating Mandap, five distinctive celebration spaces, and luxury accommodation for 100 guests, and guest count of upto 1500 floating set within lush landscaped grounds." },
      { type: 'paragraph', text: "It's the rare combination of easy access and true escape — exactly what a modern Bangalore wedding needs." },
      { type: 'paragraph', text: 'Book a venue tour and discover why NICE Road connectivity makes Bougainvil’La the easiest luxury venue to reach.' },
      { type: 'heading', text: "Experience Bougainvil'La" },
      { type: 'paragraph', text: 'Schedule a venue visit and explore the different possibilities for your wedding.' },
      ...ADDRESS_BLOCKS,
    ],
  },
  {
    slug: 'luxury-wedding-venue-south-bangalore',
    metaTitle: "Luxury Wedding Venue in South Bangalore | Bougainvil'La",
    metaDescription:
      "Bougainvil'La is a luxury destination wedding venue in South Bangalore, near Kanakapura Road, JP Nagar, Bannerghatta Road, Jayanagar and NICE Road.",
    h1: 'Luxury Wedding Venue in South Bangalore',
    subheading: 'A Destination for Luxury Weddings, Right Here in Bengaluru',
    isPillar: true,
    blocks: [
      { type: 'paragraph', text: "Inspired by timeless Jaipur architecture and surrounded by lush tropical landscapes, our Wedding Venue South Bangalore features Bengaluru's iconic Floating Mandap, India's first Retractable Roof Wedding Venue, elegant indoor and outdoor celebration spaces, and premium Luxury Accommodation — all seamlessly connected within one spectacular destination." },
      { type: 'paragraph', text: "“Located near Bolare on Kanakapura Road, Bougainvil'La is conveniently accessible from JP Nagar, Basavanagudi, Banashankari, Jayanagar, Bannerghatta Road, Nice Road and neighbourhoods across South Bengaluru.”" },
      { type: 'heading', text: 'Explore by Neighbourhood' },
      { type: 'paragraph', text: 'Bougainvil’La welcomes couples and families from across South Bengaluru. Explore what makes us a destination wedding venue for your part of the city:' },
      ...ADDRESS_BLOCKS,
    ],
  },
]

// async on purpose — see the comment in lib/content/venues.ts.
export async function getLocations(): Promise<LocationPageDoc[]> {
  return LOCATIONS
}

export async function getLocationBySlug(slug: string): Promise<LocationPageDoc | undefined> {
  return LOCATIONS.find((l) => l.slug === slug)
}

export async function getLocationSlugs(): Promise<string[]> {
  return LOCATIONS.map((l) => l.slug)
}
