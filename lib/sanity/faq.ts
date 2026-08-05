import { sanityClient } from './client'
import { faqItemsQuery } from './queries'

export interface FaqItem {
  question: string
  answer: string
}

export async function getFaqItems(): Promise<FaqItem[]> {
  return sanityClient.fetch(faqItemsQuery)
}
