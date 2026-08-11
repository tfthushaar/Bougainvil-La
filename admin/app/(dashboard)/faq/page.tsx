import { asc } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { faqItems } from '@/lib/db/schema'
import { formStyles as f } from '@/components/form'
import { saveFaqItem, deleteFaqItem } from './actions'

export default async function FaqPage() {
  let rows: (typeof faqItems.$inferSelect)[] = []
  let error: string | null = null
  try {
    rows = await db().select().from(faqItems).orderBy(asc(faqItems.order))
  } catch {
    error = 'No database connection yet.'
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900">FAQ</h1>

      {error && <p className="mb-4 text-sm text-amber-700">{error}</p>}

      <div className="flex flex-col gap-4">
        {rows.map((item, i) => (
          <div key={item.id} className="rounded-lg border border-black/10 bg-white p-4">
            <form action={saveFaqItem} className="flex flex-col gap-3">
              <input type="hidden" name="id" value={item.id} />
              <div>
                <label className={f.label}>Question</label>
                <input className={f.input} name="question" defaultValue={item.question} required />
              </div>
              <div>
                <label className={f.label}>Answer</label>
                <textarea className={f.textarea} name="answer" rows={3} defaultValue={item.answer} required />
              </div>
              <div className="flex items-center gap-3">
                <label className={f.label + ' mb-0'}>Order</label>
                <input className={f.input} style={{ width: '5rem' }} name="order" type="number" defaultValue={item.order} />
                <button type="submit" className={f.primaryBtn}>Save</button>
              </div>
            </form>
            <form action={deleteFaqItem} className="mt-2">
              <input type="hidden" name="id" value={item.id} />
              <button type="submit" className="text-xs text-red-600 hover:underline">Delete</button>
            </form>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-dashed border-neutral-300 p-4">
        <p className="mb-3 text-sm font-medium text-neutral-700">Add a question</p>
        <form action={saveFaqItem} className="flex flex-col gap-3">
          <input type="hidden" name="id" value="new" />
          <div>
            <label className={f.label}>Question</label>
            <input className={f.input} name="question" required />
          </div>
          <div>
            <label className={f.label}>Answer</label>
            <textarea className={f.textarea} name="answer" rows={3} required />
          </div>
          <div className="flex items-center gap-3">
            <label className={f.label + ' mb-0'}>Order</label>
            <input className={f.input} style={{ width: '5rem' }} name="order" type="number" defaultValue={rows.length} />
            <button type="submit" className={f.primaryBtn}>Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}
