import type { StructureResolver } from 'sanity/structure'

// Singleton document types get a single fixed entry (no "create new" / list),
// since exactly one of each should ever exist.
const SINGLETONS = ['homeContent', 'aboutContent', 'siteSettings'] as const

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .child(S.document().schemaType('homeContent').documentId('homeContent')),
      S.listItem()
        .title('About Page')
        .child(S.document().schemaType('aboutContent').documentId('aboutContent')),
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('venue').title('Celebration Spaces'),
      S.documentTypeListItem('roomType').title('Room Types'),
      S.documentTypeListItem('faqItem').title('FAQ Items'),
      S.documentTypeListItem('locationPage').title('Location Pages'),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !SINGLETONS.includes(item.getId() as (typeof SINGLETONS)[number]) &&
          !['venue', 'roomType', 'faqItem', 'locationPage'].includes(item.getId() as string)
      ),
    ])
