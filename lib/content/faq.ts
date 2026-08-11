import { asc } from 'drizzle-orm'
import { db } from '../db/client'
import { faqItems } from '../db/schema'

export interface FaqItem {
  question: string
  answer: string
}

export async function getFaqItems(): Promise<FaqItem[]> {
  return db().select().from(faqItems).orderBy(asc(faqItems.order))
}
