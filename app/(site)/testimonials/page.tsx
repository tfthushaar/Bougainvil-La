import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'

export const metadata: Metadata = {
  title: "Testimonials | Bougainvil'La",
  description: "Read what couples are saying about their celebrations at Bougainvil'La on WedMeGood.",
}

export default function TestimonialsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Testimonials"
        title="Read What Couples Are Saying"
        paragraph="Our reviews and celebration stories are hosted on WedMeGood."
        cta={{
          label: 'View Reviews on WedMeGood →',
          href: 'https://www.wedmegood.com/wedding-venues/Bougainvilla-Celebrate-Luxury-24343653/reviews',
          external: true,
        }}
      />
    </main>
  )
}
