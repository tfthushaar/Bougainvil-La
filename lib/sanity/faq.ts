import { sanityFetch } from './live'
import { faqItemsQuery } from './queries'

export interface FaqItem {
  question: string
  answer: string
}

export async function getFaqItems(): Promise<FaqItem[]> {
  const { data } = await sanityFetch({ query: faqItemsQuery })
  return data as FaqItem[]
}
