'use server'

import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db/client'
import { blogPosts } from '@/lib/db/schema'
import type { ContentBlock } from '@/lib/blocks'
import { triggerPublicSiteDeploy } from '@/lib/deploy'

export async function saveBlogPost(formData: FormData) {
  const id = String(formData.get('id'))
  const isNew = id === 'new'

  let blocks: ContentBlock[] = []
  try {
    blocks = JSON.parse(String(formData.get('blocks') ?? '[]'))
  } catch {
    blocks = []
  }

  const publishedAtRaw = String(formData.get('publishedAt') ?? '')

  const values = {
    slug: String(formData.get('slug')).trim(),
    title: String(formData.get('title')).trim(),
    metaDescription: String(formData.get('metaDescription')).trim(),
    targetKeyword: String(formData.get('targetKeyword') ?? '').trim() || null,
    author: String(formData.get('author')).trim(),
    authorRole: String(formData.get('authorRole')).trim(),
    publishedAt: publishedAtRaw ? new Date(publishedAtRaw) : new Date(),
    featuredImage: String(formData.get('featuredImage') ?? '') || null,
    excerpt: String(formData.get('excerpt')).trim(),
    blocks,
    status: (formData.get('status') === 'published' ? 'published' : 'draft') as 'draft' | 'published',
  }

  if (isNew) {
    await db().insert(blogPosts).values({ id: crypto.randomUUID(), ...values })
  } else {
    await db().update(blogPosts).set(values).where(eq(blogPosts.id, id))
  }

  revalidatePath('/blog')
  await triggerPublicSiteDeploy()
  redirect('/blog')
}

export async function deleteBlogPost(formData: FormData) {
  const id = String(formData.get('id'))
  await db().delete(blogPosts).where(eq(blogPosts.id, id))
  revalidatePath('/blog')
  await triggerPublicSiteDeploy()
  redirect('/blog')
}
