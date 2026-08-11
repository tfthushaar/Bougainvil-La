import type { ContentBlock } from './blocks'
import { plainRun } from './blocks'

export interface BlogPost {
  slug: string
  title: string
  metaDescription: string
  targetKeyword?: string
  author: string
  authorRole: string
  publishedAt: string
  featuredImage: string | null
  excerpt: string
  blocks: ContentBlock[]
}

const TOUR_HREF = 'mailto:bougainvillaluxury@gmail.com?subject=Venue%20Tour%20Request'

const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'outdoor-wedding-venues-near-bannerghatta-road',
    title: 'Top Outdoor Wedding Venues Near Bannerghatta Road (And Why Location Matters More Than You Think)',
    metaDescription:
      "Looking for outdoor wedding venues near Bannerghatta Road? Discover why Bougainvil'La's Floating Mandap and landscaped gardens make it Bangalore's top choice.",
    targetKeyword: 'outdoor wedding venues near Bannerghatta Road',
    author: 'Lakshmi Keerthi',
    authorRole: 'Luxury Wedding Planner / Founder',
    publishedAt: '2026-07-01',
    featuredImage: '/images/venues/sumeera/with-decor/015.webp',
    excerpt:
      "Looking for outdoor wedding venues near Bannerghatta Road? Discover why Bougainvil'La's Floating Mandap and landscaped gardens make it Bangalore's top choice.",
    blocks: [
      { type: 'paragraph', runs: plainRun("If you've started your venue search along Bannerghatta Road, you've probably noticed something: most “outdoor” venues in the city are really just banquet halls with a garden attached. A genuine outdoor wedding — one built around natural light, open skies, and landscaped grounds — is harder to find than you'd expect.") },
      { type: 'paragraph', runs: plainRun("Here's what to actually look for, and why Bougainvil'La has become the go-to choice for Bannerghatta Road families planning an outdoor celebration.") },
      { type: 'heading', text: 'What makes an outdoor venue "real"' },
      { type: 'paragraph', runs: plainRun("A true outdoor wedding venue should offer three things most city venues can't: uninterrupted green space, a ceremony backdrop that doesn't rely on decor to look complete, and a layout that lets your event breathe rather than feeling boxed into a hall with the doors open.") },
      { type: 'paragraph', runs: [
        { text: 'At Bougainvil’La, this comes together most dramatically at ' },
        { text: 'Sumeera', href: '/venues/sumeera/' },
        { text: ', our signature outdoor space, built around Bengaluru’s iconic Floating Mandap. Inspired by Jaipur architecture, with grand pink pillars and shimmering water surrounding the ceremony stage, it’s designed to look complete in photographs even before a single flower is added.' },
      ] },
      { type: 'heading', text: 'The weather problem — and how to solve it' },
      { type: 'paragraph', runs: plainRun('The biggest hesitation with outdoor weddings in Bangalore is, understandably, the weather. Nobody wants to gamble their reception on a clear sky in June or September.') },
      { type: 'paragraph', runs: [
        { text: 'This is where most outdoor venues fall short — and where Bougainvil’La is different. Our ' },
        { text: 'Floral Trellis', href: '/venues/floral-trellis/' },
        { text: ' space houses Bengaluru’s first Retractable Roof Wedding Venue, letting you commit to an open-air feel while keeping a weatherproof backup built directly into the architecture, not bolted on as an afterthought tent — see how it handles ' },
        { text: 'monsoon-season weddings', href: '/monsoon-wedding-venue-bangalore/' },
        { text: ' in more detail.' },
      ] },
      { type: 'heading', text: 'Proximity matters for your guest list' },
      { type: 'paragraph', runs: [
        { text: 'For families based near Bannerghatta Road, proximity isn’t a small detail — it determines how many of your guests actually show up relaxed rather than exhausted from a long drive. Bougainvil’La is ' },
        { text: 'easily reachable from Bannerghatta Road', href: '/wedding-venue-near-bannerghatta-road/' },
        { text: ', keeping travel time low while still delivering the feel of a destination wedding once guests arrive.' },
      ] },
      { type: 'heading', text: 'What to check before booking any outdoor venue' },
      { type: 'list', items: [
        'Does the venue have a genuine backup plan for rain, or just a tent?',
        'Is there enough space to host ceremony, reception, and smaller functions (mehendi, haldi) without repeatedly resetting the same area?',
        'Is on-site accommodation available, or will your family be commuting during a multi-day celebration?',
      ] },
      { type: 'paragraph', runs: [
        { text: 'Bougainvil’La answers yes to all three — five distinct celebration spaces, a genuine retractable roof, and ' },
        { text: 'luxury accommodation for 100 guests', href: '/luxury-stays/' },
        { text: '.' },
      ] },
    ],
  },
  {
    slug: 'indoor-vs-outdoor-wedding-venue-bangalore',
    title: 'Indoor or Outdoor? What Bangalore Couples Should Actually Consider Before Choosing',
    metaDescription:
      "Choosing between an indoor and outdoor wedding venue in Bangalore? Here's a practical comparison to help you decide — and why Bougainvil'La offers both.",
    targetKeyword: 'indoor vs outdoor wedding venue Bangalore',
    author: 'Lakshmi Keerthi',
    authorRole: 'Luxury Wedding Planner / Founder',
    publishedAt: '2026-07-08',
    featuredImage: '/images/venues/floral-trellis/with-decor/018.webp',
    excerpt:
      "Choosing between an indoor and outdoor wedding venue in Bangalore? Here's a practical comparison to help you decide — and why Bougainvil'La offers both.",
    blocks: [
      { type: 'paragraph', runs: plainRun('This is usually the first big decision in venue hunting, and most couples make it based on Pinterest boards rather than practical factors. Here’s a more useful way to think about it.') },
      { type: 'heading', text: 'The case for outdoor' },
      { type: 'paragraph', runs: plainRun('Outdoor venues offer natural light (which photographers will thank you for), a sense of scale that indoor halls can’t replicate, and — frankly — a more memorable guest experience. Bangalore’s climate, particularly between October and February, makes outdoor weddings genuinely comfortable rather than a risk.') },
      { type: 'paragraph', runs: plainRun('The tradeoff: weather unpredictability, and the assumption that "outdoor" means "vulnerable to rain."') },
      { type: 'heading', text: 'The case for indoor' },
      { type: 'paragraph', runs: plainRun('Indoor venues offer climate control, predictability, and often better acoustics for speeches and music. The tradeoff: they can feel generic, and natural light — the single biggest factor in how your photos turn out — is usually compromised.') },
      { type: 'heading', text: 'The option most couples don’t know exists' },
      { type: 'paragraph', runs: [
        { text: 'What if the choice wasn’t binary? At Bougainvil’La, this is exactly the problem our ' },
        { text: 'Floral Trellis', href: '/venues/floral-trellis/' },
        { text: ' venue was built to solve — Bengaluru’s first Retractable Roof Wedding Venue. You get the openness and light of an outdoor space with the weather security of an indoor one, without needing to pick one over the other for your whole event.' },
      ] },
      { type: 'paragraph', runs: [
        { text: 'Beyond that, having ' },
        { text: 'five distinct celebration spaces', href: '/venues/' },
        { text: ' on one property means you don’t have to make this decision just once. You might host your ceremony at the open-air Sumeera by the Floating Mandap, your mehendi in the garden setting of Margarita, and your reception under the retractable roof at Floral Trellis — each function getting the setting that actually suits it.' },
      ] },
      { type: 'heading', text: 'A practical framework' },
      { type: 'paragraph', runs: plainRun('Ask yourself:') },
      { type: 'list', ordered: true, items: [
        'Is your wedding date during monsoon season (June–September)? Lean toward a weatherproof option.',
        'Do you want natural light in your photos? Lean outdoor or hybrid.',
        'Are you hosting multiple functions over several days? Look for a venue with multiple distinct spaces rather than one hall used repeatedly.',
        'Will out-of-town guests need to stay overnight? Prioritize venues with on-site accommodation.',
      ] },
      { type: 'paragraph', runs: [
        { text: 'See all five spaces and decide which suits each of your functions — ' },
        { text: 'explore Celebration Spaces', href: '/venues/' },
        { text: '.' },
      ] },
    ],
  },
  {
    slug: 'destination-wedding-vs-local-wedding-bangalore',
    title: 'Destination Wedding vs. Local Wedding: Do You Really Have to Choose?',
    metaDescription:
      "Thinking about a destination wedding but want to stay near Bangalore? Here's how couples are getting both — without the travel logistics.",
    targetKeyword: 'destination wedding vs local wedding Bangalore',
    author: 'Lakshmi Keerthi',
    authorRole: 'Luxury Wedding Planner / Founder',
    publishedAt: '2026-07-15',
    featuredImage: '/images/rooms/bridal-suite/003.webp',
    excerpt:
      "Thinking about a destination wedding but want to stay near Bangalore? Here's how couples are getting both — without the travel logistics.",
    blocks: [
      { type: 'paragraph', runs: plainRun('Every couple eventually has this conversation: do we want the resort-wedding feeling of a destination event, or the convenience of keeping everything close to home? The honest answer is that most couples want both — and don’t realize it’s possible.') },
      { type: 'heading', text: 'Why couples chase the "destination" feeling' },
      { type: 'paragraph', runs: plainRun('A destination wedding isn’t really about the location on a map. It’s about specific feelings: guests arriving and staying together, a sense of escape from daily routine, architecture and scenery that doesn’t look like every other event they’ve attended, and a multi-day celebration rather than a single evening.') },
      { type: 'heading', text: 'Why couples still choose "local"' },
      { type: 'paragraph', runs: plainRun('The tradeoffs of a true destination wedding are real — flights, logistics for elderly relatives, higher guest drop-off rates, and significantly higher costs for vendors and decor shipped to a remote location.') },
      { type: 'heading', text: 'The middle path: a destination feel, without the travel' },
      { type: 'paragraph', runs: [
        { text: 'This is precisely the gap Bougainvil’La was built to fill. Located in South Bangalore, it’s close enough that your guests aren’t booking flights or hotels — but architecturally and experientially, it delivers what people actually want from a destination wedding: the Jaipur-inspired grandeur of the Floating Mandap, sprawling landscaped grounds across five distinct celebration spaces, and ' },
        { text: 'luxury accommodation for 100 guests', href: '/luxury-stays/' },
        { text: ' so your closest family can stay together for the entire event rather than commuting each day.' },
      ] },
      { type: 'heading', text: 'What to look for if you want this hybrid approach' },
      { type: 'list', items: [
        'On-site stay options — without this, it’s just a venue, not a destination',
        'Multiple distinct spaces — so a 3-day celebration doesn’t feel like the same room reused',
        'A setting that doesn’t look like a standard banquet hall — architecture and landscaping do a lot of the "destination" work',
        'Manageable travel time for your guest list — the further away, the fewer people show up for the full celebration',
      ] },
      { type: 'paragraph', runs: [
        { text: 'Bougainvil’La checks each of these boxes for couples across Bangalore looking for a destination wedding without the destination-wedding logistics — read more ' },
        { text: 'about Bougainvil’La', href: '/about/' },
        { text: '.' },
      ] },
    ],
  },
  {
    slug: 'floating-mandap-wedding-bangalore',
    title: 'A Guide to Floating Mandap Weddings: What to Expect',
    metaDescription:
      "Everything you need to know about planning a Floating Mandap wedding at Bougainvil'La — setup, capacity, photography tips, and timing.",
    targetKeyword: 'floating mandap wedding Bangalore',
    author: 'Lakshmi Keerthi',
    authorRole: 'Luxury Wedding Planner / Founder',
    publishedAt: '2026-07-22',
    featuredImage: '/images/brand/hero/floating-mandap-daylight.webp',
    excerpt:
      "Everything you need to know about planning a Floating Mandap wedding at Bougainvil'La — setup, capacity, photography tips, and timing.",
    blocks: [
      { type: 'paragraph', runs: [
        { text: 'If you’ve seen photos of a ceremony staged on water, framed by grand pillars and open sky, there’s a good chance it was taken at a Floating Mandap. Bengaluru’s most iconic version of this setting lives at Bougainvil’La’s ' },
        { text: 'Sumeera', href: '/venues/sumeera/' },
        { text: ' venue — and it’s worth understanding what makes this format different before you plan around it.' },
      ] },
      { type: 'heading', text: 'What is a Floating Mandap, exactly?' },
      { type: 'paragraph', runs: plainRun('A Floating Mandap is a ceremony stage positioned over or surrounded by water, creating the visual effect of the mandap "floating." At Sumeera, this is combined with Jaipur-inspired architecture — grand pink pillars and an open-air layout — so the mandap becomes the natural focal point of the entire ceremony space, no additional staging required.') },
      { type: 'heading', text: 'Capacity and layout' },
      { type: 'paragraph', runs: [
        { text: 'Sumeera comfortably seats 600 guests, with floating (standing/mingling) capacity up to 900 — making it suitable for both intimate ceremonies and large traditional weddings. See all ' },
        { text: 'Celebration Spaces', href: '/venues/' },
        { text: '.' },
      ] },
      { type: 'heading', text: 'Best time of day for a Floating Mandap ceremony' },
      { type: 'paragraph', runs: plainRun('By day, natural light reflects off the water and creates soft, even lighting that photographers particularly love for late-morning ceremonies. In the evening, the same setting transforms with ambient lighting for a more dramatic, celebratory atmosphere — many couples choose an evening ceremony specifically for this shift in mood.') },
      { type: 'heading', text: 'Photography considerations' },
      { type: 'paragraph', runs: plainRun('Because the mandap is surrounded by water and framed by architecture on multiple sides, photographers have far more angle options than a typical stage-and-backdrop setup. If photography is a priority, ask your planner to schedule at least 20–30 minutes before the ceremony for photos while the light and setting are undisturbed by guests.') },
      { type: 'heading', text: 'What to pair it with' },
      { type: 'paragraph', runs: [
        { text: 'Many couples hosting their ceremony at Sumeera choose to host their reception at a different space on the same property — ' },
        { text: 'Floral Trellis', href: '/venues/floral-trellis/' },
        { text: ' (our retractable roof venue) for a different but complementary atmosphere. Having multiple settings within one destination means your ceremony and reception don’t compete for the same visual space in your wedding album.' },
      ] },
      { type: 'heading', text: 'Booking timeline' },
      { type: 'paragraph', runs: plainRun('Given its popularity, Sumeera bookings for peak wedding season (October–February) typically need to be confirmed several months in advance.') },
    ],
  },
  {
    slug: 'monsoon-wedding-venue-bangalore',
    title: 'Monsoon Wedding Planning in Bangalore: Why a Retractable Roof Venue Matters',
    metaDescription:
      "Planning a wedding during Bangalore's monsoon season? Here's why a retractable roof venue solves the biggest risk of outdoor weddings.",
    targetKeyword: 'monsoon wedding venue Bangalore',
    author: 'Lakshmi Keerthi',
    authorRole: 'Luxury Wedding Planner / Founder',
    publishedAt: '2026-07-29',
    featuredImage: '/images/venues/floral-trellis/with-decor/023.webp',
    excerpt:
      "Planning a wedding during Bangalore's monsoon season? Here's why a retractable roof venue solves the biggest risk of outdoor weddings.",
    blocks: [
      { type: 'paragraph', runs: plainRun('June through September brings real uncertainty for any couple set on an outdoor Bangalore wedding. Here’s how to plan around it — and why the venue you choose matters more than any backup plan you personally arrange.') },
      { type: 'heading', text: 'The real risk isn’t rain — it’s the backup plan' },
      { type: 'paragraph', runs: plainRun('Most outdoor venues handle monsoon risk with a rented tent as Plan B. The problem: tents get arranged last-minute, rarely match the aesthetic you planned for, and often can’t be fully set up until it’s already raining — which means guests get wet during the transition.') },
      { type: 'heading', text: 'What a retractable roof actually solves' },
      { type: 'paragraph', runs: [
        { text: 'Bougainvil’La’s ' },
        { text: 'Floral Trellis', href: '/venues/floral-trellis/' },
        { text: ' is home to Bengaluru’s first Retractable Roof Wedding Venue — a permanent architectural feature, not an emergency tent. This means the "backup plan" is built into the space itself. Guests never see a scramble; the roof opens or closes as needed, and the venue looks intentional either way.' },
      ] },
      { type: 'heading', text: 'Planning tips for a monsoon-season wedding' },
      { type: 'list', ordered: true, items: [
        'Choose a venue where indoor and outdoor aren’t separate spaces. If your ceremony is outdoor and reception indoor, you’re relying on decor teams to make two completely different rooms feel like one wedding. A retractable roof avoids this entirely.',
        'Ask about drainage and flooring, not just roofing. Standing water on pathways is often a bigger problem than rain itself.',
        'Build in weather-flexible timing. Late afternoon ceremonies give you a buffer if a morning shower needs to clear.',
        'Consider multi-day events carefully. If you’re hosting mehendi, haldi, and a reception across several days, you want a venue with multiple weatherproof-capable spaces — not just one. Bougainvil’La’s five celebration spaces give you that flexibility across an entire wedding weekend.',
      ] },
      { type: 'heading', text: 'The upside of a monsoon wedding' },
      { type: 'paragraph', runs: plainRun('Lower vendor costs, greater venue availability, and (with the right venue) genuinely beautiful lighting — overcast skies are often more flattering for photography than harsh midday sun. A monsoon wedding isn’t a compromise if the venue is built for it.') },
      { type: 'paragraph', runs: [
        { text: 'This is the same weatherproofing that makes Bougainvil’La a strong pick for ' },
        { text: 'outdoor weddings near Bannerghatta Road', href: '/outdoor-wedding-venues-near-bannerghatta-road/' },
        { text: ' too — the roof, not the season, decides how your day goes.' },
      ] },
    ],
  },
  {
    slug: 'wedding-venue-checklist-bangalore',
    title: 'Wedding Venue Checklist: Questions to Ask Before You Book',
    metaDescription:
      'Before you book a wedding venue in Bangalore, ask these questions. A practical checklist from the team at Bougainvil’La.',
    targetKeyword: 'wedding venue checklist Bangalore',
    author: 'Lakshmi Keerthi',
    authorRole: 'Luxury Wedding Planner / Founder',
    publishedAt: '2026-08-05',
    featuredImage: '/images/venues/divine-bells/with-decor/008.webp',
    excerpt:
      'Before you book a wedding venue in Bangalore, ask these questions. A practical checklist from the team at Bougainvil’La.',
    blocks: [
      { type: 'paragraph', runs: plainRun('Venue tours are exciting, and it’s easy to get swept up in a beautiful space without asking the questions that actually determine how your wedding day goes. Use this checklist on every tour, including ours.') },
      { type: 'heading', text: 'Capacity and layout' },
      { type: 'list', items: [
        'What’s the seated vs. standing capacity, and does it match your actual guest count (not your aspirational one)?',
        'Can the venue host multiple functions (ceremony, reception, mehendi, haldi) without repeatedly resetting the same space?',
      ] },
      { type: 'paragraph', runs: [
        { text: 'Bougainvil’La’s ' },
        { text: 'five celebration spaces', href: '/venues/' },
        { text: ' range from 180 to 900 guests, so this is worth asking specifically about which space fits which function.' },
      ] },
      { type: 'heading', text: 'Weather contingency' },
      { type: 'list', items: [
        'Is there a genuine architectural backup for rain, or a rented tent arranged after booking?',
        'Has the venue hosted weddings in your specific month before?',
      ] },
      { type: 'heading', text: 'Accommodation' },
      { type: 'list', items: [
        'Can your close family and out-of-town guests stay on-site?',
        'How many rooms, and what’s the total sleeping capacity?',
      ] },
      { type: 'paragraph', runs: [
        { text: 'At Bougainvil’La, ' },
        { text: '18 rooms accommodate up to 100 guests', href: '/luxury-stays/' },
        { text: ', including dedicated bridal and groom’s suites.' },
      ] },
      { type: 'heading', text: 'Logistics' },
      { type: 'list', items: [
        'How much parking is available, and is it on-site?',
        'What’s the vendor policy — are you required to use in-house vendors only, or can you bring your own?',
        'What’s included in the venue cost vs. billed separately (power backup, security, cleaning, extra hours)?',
      ] },
      { type: 'heading', text: 'Accessibility' },
      { type: 'list', items: [
        'How far is the venue from your primary guest base, and what’s the realistic drive time in wedding-day traffic?',
        'Is the location easy to describe/navigate for elderly guests or those unfamiliar with the area?',
      ] },
      { type: 'heading', text: 'Questions specific to a multi-day wedding' },
      { type: 'list', items: [
        'Can the venue be exclusively booked for your event across all days, or will other events be happening simultaneously?',
        'Is there a quiet space for family to relax between functions?',
      ] },
      { type: 'heading', text: 'A final tip' },
      { type: 'paragraph', runs: plainRun('Ask to see the venue during both daytime and evening if possible — lighting changes everything, and many spaces that look ordinary at noon transform after dark (or vice versa).') },
      { type: 'paragraph', runs: plainRun('Bring this checklist to your Bougainvil’La tour and we’ll answer every question on it.') },
    ],
  },
]

// async on purpose — see the comment in lib/content/venues.ts.
export async function getBlogPosts(): Promise<BlogPost[]> {
  return [...BLOG_POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export async function getBlogSlugs(): Promise<string[]> {
  return BLOG_POSTS.map((p) => p.slug)
}

export { TOUR_HREF }
