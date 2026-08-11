// Mirrors the public site's lib/content/blocks.ts exactly — copied, not
// imported cross-package, since admin/ is a fully separate app. Used for
// the `blocks` jsonb columns on location_pages and blog_posts.
export interface InlineRun {
  text: string
  href?: string
}

export type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; runs: InlineRun[] }
  | { type: 'list'; items: string[]; ordered?: boolean }

export function plainRun(text: string): InlineRun[] {
  return [{ text }]
}
