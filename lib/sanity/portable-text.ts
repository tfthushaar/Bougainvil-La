import type { PortableTextBlock, PortableTextSpan } from 'sanity'

/** Flattens simple (no headings/lists) portable text into plain paragraph
 *  strings — used for venue descriptions, which only ever need paragraphs. */
export function blocksToPlainParagraphs(blocks: PortableTextBlock[] = []): string[] {
  return blocks
    .filter((b) => b._type === 'block')
    .map((b) =>
      ((b.children ?? []) as PortableTextSpan[])
        .map((c) => ('text' in c ? c.text : ''))
        .join('')
    )
    .filter(Boolean)
}
