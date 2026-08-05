import { defineField, defineType } from 'sanity'

export const locationPage = defineType({
  name: 'locationPage',
  title: 'Location Page (SEO)',
  type: 'document',
  fields: [
    defineField({
      name: 'slug', title: 'URL Slug', type: 'slug',
      description: 'The page will be published at bougainvilla.com/<slug>/',
      options: { source: 'h1' }, validation: (r) => r.required(),
    }),
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text' }),
    defineField({ name: 'h1', title: 'H1 Heading', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'body', title: 'Body Content', type: 'array',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }, { title: 'Heading', value: 'h2' }] }],
    }),
    defineField({
      name: 'isPillar', title: 'Is this the South Bangalore pillar page?',
      description: 'The pillar page links out to all the locality pages; locality pages link back to it.',
      type: 'boolean', initialValue: false,
    }),
  ],
  preview: { select: { title: 'h1', subtitle: 'slug.current' } },
})
