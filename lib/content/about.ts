export interface AboutContent {
  eyebrow: string
  introParagraphs: string[]
  heroImage: string | null
  founderName: string
  founderTitle: string
  founderBioParagraphs: string[]
  highlights: string[]
}

const ABOUT_CONTENT: AboutContent = {
  eyebrow: 'A Destination for Luxury Wedding',
  introParagraphs: [
    'At Bougainvil’La, we believe a wedding is far more than a single event—it is a collection of unforgettable moments that deserve extraordinary surroundings.',
    'As one of the most sought-after Luxury Wedding Venue Bangalore destinations, Bougainvil’La has been thoughtfully planned to host every chapter of your celebration. Inspired by timeless Jaipur architecture and surrounded by lush tropical landscapes, our Wedding Venue South Bangalore features Bengaluru’s iconic Floating Mandap, India’s first Retractable Roof Wedding Venue, elegant indoor and outdoor celebration spaces, and premium Luxury Accommodation—all seamlessly connected within one spectacular destination.',
  ],
  // Landscape shot — the portrait about-us.webp needed heavy cropping in
  // the wide PageHeader banner.
  heroImage: '/images/brand/hero/jaipur-mandap-golden-hour.webp',
  founderName: 'Lakshmi Keerthi',
  founderTitle: 'Founder, Bougainvil’La | Luxury Wedding Planner',
  founderBioParagraphs: [
    'Bougainvil’La was born from a simple belief — a wedding venue should do more than host a celebration. It should become part of the story.',
    'Founded by Lakshmi Keerthi, an award-winning luxury wedding planner with over two decades of experience in the wedding industry, Bougainvil’La brings together years of understanding weddings from the inside — the emotions of families, the expectations of couples, the complexities of execution, and the importance of creating spaces that are both beautiful and functional.',
    'A Computer Science Engineer and an alumna of IIM Bangalore, Lakshmi’s professional journey began in the corporate world, where she worked extensively in HR and Leadership roles before following her passion into the world of weddings.',
    'Over the years, she has planned and curated luxury and destination weddings, working closely with couples, families, designers, artists and wedding professionals.',
    'That experience shaped the philosophy behind Bougainvil’La.',
    'Rather than creating another conventional wedding hall, the vision was to build a venue through the eyes of a wedding planner — where every space considers how a wedding actually unfolds.',
    'From guest movement and ceremony layouts to décor possibilities, dining experiences, photography backdrops and the transition between multiple wedding functions, every detail has been envisioned around the experience of celebrating.',
    'The result is Bougainvil’La — a collection of distinctive semi indoor, outdoor, retractable roof feature and poolside spaces where every celebration can have its own identity.',
    'For Lakshmi, luxury is not simply about grandeur.',
    'It is about thoughtful details, effortless experiences and creating moments that remain with families long after the celebration is over.',
    'That philosophy continues to guide every experience at Bougainvil’La.',
    'From intimate ceremonies by the water to grand receptions beneath the stars, every celebration is designed to feel elegant, effortless, and unforgettable.',
    'Bougainvil’La is guided by an experienced Board of Directors, Chairman, and executive leadership team who collectively oversee the organisation and its operations.',
    'Lakshmi Keerthi continues to spearhead La’kiru – designing and executing weddings across India while also being associated with Bougainvil’La as its in-house wedding planner. Clients may choose to engage her services for their celebrations; however, this is entirely optional.',
    'Bougainvil’La offers complete creative freedom, allowing every client to appoint a wedding planner and decorator of their choice. Our team works collaboratively with external professionals to ensure a seamless experience while bringing each couple’s unique vision to life.',
  ],
  highlights: [
    'Capacity for up to 1,000 Guests',
    '5 Distinctive Celebration Spaces',
    'Luxury Accommodation for 100 Guests',
    '18 Elegant Guest Rooms',
    'Iconic Floating Mandap',
    'Temple',
    'Bengaluru’s First Retractable Roof Celebration Space',
    'Parking for Over 200 Vehicles',
    'Destination Wedding Experience in South Bengaluru',
  ],
}

// async on purpose — see the comment in lib/content/venues.ts.
export async function getAboutContent(): Promise<AboutContent> {
  return ABOUT_CONTENT
}
