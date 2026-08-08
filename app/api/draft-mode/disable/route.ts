import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  const draftModeStore = await draftMode()
  draftModeStore.disable()
  redirect('/')
}
