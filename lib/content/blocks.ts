// Shared rich-text shape for any content area that needs more than plain
// paragraphs (locations, blog posts, ...). Deliberately simple — headings,
// paragraphs built from text/link runs, and bullet lists — rather than a
// full rich-text spec, so it stays easy for a future admin UI to produce
// and a renderer to walk without extra dependencies.
export interface InlineRun {
  text: string
  href?: string
}

export type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; runs: InlineRun[] }
  | { type: 'list'; items: string[]; ordered?: boolean }

/** Convenience for a paragraph with no inline links. */
export function plainRun(text: string): InlineRun[] {
  return [{ text }]
}
