export interface FaqItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How many guests can Bougainvil’La accommodate?',
    answer: 'Our celebration spaces can comfortably host weddings and events for up to 1,000 guests.',
  },
  {
    question: 'Do you offer accommodation?',
    answer:
      'Yes. Bougainvil’La features 18 luxurious rooms, including exclusive bridal and groom suites, spacious family rooms, and dormitory accommodation for up to 100 guests.',
  },
  {
    question: 'Can all our wedding functions be hosted here?',
    answer:
      'Absolutely. Our five distinctive celebration spaces are designed to host every event—from intimate ceremonies and vibrant mehendis to grand receptions and elegant dining experiences.',
  },
  {
    question: 'Is parking available?',
    answer: 'Yes. We offer ample parking for over 200 vehicles.',
  },
  {
    question: 'Is the venue suitable during all seasons?',
    answer:
      'Yes. Floral Trellis features Bengaluru’s first retractable roof celebration space, allowing you to enjoy the beauty of an outdoor celebration throughout the year.',
  },
]

// async on purpose — see the comment in lib/content/venues.ts.
export async function getFaqItems(): Promise<FaqItem[]> {
  return FAQ_ITEMS
}
