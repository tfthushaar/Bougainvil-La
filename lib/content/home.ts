export interface SignatureExperience {
  title: string
  desc?: string
}

export interface HomeContent {
  heroSubtitleLeft: string
  heroSubtitleRight: string
  heroEyebrow: string
  heroHeadline: string
  heroParagraph: string
  heroFeatureLine: string
  heroButtonsLabel: string
  introHeadline: string
  introParagraph: string
  founderEyebrow: string
  founderParagraphs: string[]
  founderQuote: string
  founderImage: string | null
  highlights: string[]
  whyHeadline: string
  whyParagraphs: string[]
  whyCouplesChooseHeadline: string
  whyCouplesChoose: string[]
  eventsWeHostHeadline: string
  eventsWeHost: string[]
  signatureExperiencesHeadline: string
  signatureExperiences: SignatureExperience[]
  locationBlurbHeadline: string
  locationBlurbQuote: string
}

const HOME_CONTENT: HomeContent = {
  heroSubtitleLeft: 'Destination Wedding Venue',
  heroSubtitleRight: 'Bangalore, India',
  heroEyebrow: 'The Venue',
  heroHeadline: 'Jaipur-inspired elegance meets modern luxury.',
  heroParagraph:
    'Bangalore’s premier destination wedding venue — featuring an iconic floating mandap, stunning semi-indoor and outdoor venues, and a fully retractable rain-proof roof. Every celebration is crafted to be timeless, unforgettable, and weather-ready.',
  heroFeatureLine: 'Floating Mandap · Indoor & Outdoor · Rain-Proof Roof',
  heroButtonsLabel: 'Ready When You Are',

  introHeadline: 'Your Perfect Luxury Wedding Begins Here',
  introParagraph:
    'If you’re searching for the perfect Luxury Wedding Venue Bangalore, Bougainvil’La offers an unmatched destination wedding experience in South Bangalore. Designed to host weddings, receptions, engagements, mehendi, haldi, sangeet, anniversaries and luxury celebrations, every space has been thoughtfully created to deliver timeless elegance.',

  founderEyebrow: 'Designed Through the Eyes of a Wedding Planner',
  founderParagraphs: [
    'Bougainvil’La is the vision of Lakshmi Keerthi, an award-winning luxury wedding planner with over two decades of experience in the wedding industry.',
    'After years of creating weddings and understanding what couples, families, planners and designers truly need from a venue, she envisioned Bougainvil’La as more than a beautiful setting. Every space has been thoughtfully created around how weddings actually unfold — from ceremonies and guest experiences to décor, dining, photography and celebrations.',
    'From our iconic Floating Mandap overlooking shimmering waters to beautifully landscaped gardens, luxurious hospitality, premium Luxury Accommodation, and versatile celebration spaces, Bougainvil’La is more than a venue—it is a complete wedding destination where every celebration unfolds effortlessly.',
  ],
  founderQuote: 'A venue imagined by a wedding planner. Created for unforgettable weddings.',
  founderImage: '/images/venues/sumeera/with-decor/001.webp',

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

  whyHeadline: 'Thoughtfully Designed for Unforgettable Celebrations',
  whyParagraphs: [
    'Some places simply host weddings. Others become part of the story.',
    'Every element at Bougainvil’La has been thoughtfully designed to make your celebrations feel effortless, immersive, and unforgettable—from iconic ceremony settings and beautifully connected venues to luxurious stays for your loved ones and picturesque surroundings at every turn.',
    'Whether you’re celebrating for a day or an entire weekend, every experience is elevated by exceptional spaces, warm hospitality, and timeless elegance.',
  ],
  whyCouplesChooseHeadline: 'Why Couples Choose Bougainvil’La',
  whyCouplesChoose: [
    'Destination wedding venue in Bangalore',
    'South Bangalore location',
    'Luxury stay for 100 guests',
    'Floating mandap',
    'In-house wedding planning support',
    'Vendor flexibility',
    'Parking',
    'Accessibility',
    'Weather-proof venue spaces',
  ],
  eventsWeHostHeadline: 'Events We Host',
  eventsWeHost: [
    'Wedding Ceremony',
    'Reception',
    'Engagement',
    'Mehendi',
    'Haldi',
    'Sangeet',
    'Anniversary',
    'Corporate Events',
    'Luxury Social Events',
  ],
  signatureExperiencesHeadline: 'Signature Experiences',
  signatureExperiences: [
    { title: 'Floating Mandap', desc: 'Exchange vows on our iconic mandap surrounded by shimmering waters.' },
    { title: 'Retractable Roof Celebration Space', desc: 'Celebrate outdoors with the confidence of year-round comfort.' },
    { title: 'Five Distinctive Celebration Spaces', desc: 'Every event enjoys its own unique atmosphere without ever leaving the venue.' },
    { title: 'Luxury Accommodation' },
    { title: 'Landscaped Gardens', desc: 'Beautiful walkways, mature trees, and endless greenery create stunning backdrops.' },
    { title: 'Picture-Perfect Corners', desc: 'Every turn offers a setting worthy of your wedding album.' },
    { title: 'Prime South Bengaluru Location', desc: 'A destination wedding experience that’s beautifully accessible.' },
    { title: 'Temple' },
  ],

  locationBlurbHeadline: 'A Luxury Wedding Destination in South Bangalore',
  locationBlurbQuote:
    'Located near Bolare on Kanakapura Road, Bougainvil’La is conveniently accessible from JP Nagar, Basavanagudi, Banashankari, Jayanagar, Bannerghatta Road, Nice Road and neighbourhoods across South Bengaluru.',
}

// async on purpose — see the comment in lib/content/venues.ts.
export async function getHomeContent(): Promise<HomeContent> {
  return HOME_CONTENT
}
