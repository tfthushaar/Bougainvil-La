import { query } from '../db/turso-http'

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export async function getFaqItems(): Promise<FaqItem[]> {
  const rows = await query('SELECT * FROM faq_items ORDER BY "order"')
  return rows.map((row) => ({
    id: row.id as string,
    question: row.question as string,
    answer: row.answer as string,
  }))
}
