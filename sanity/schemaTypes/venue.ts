import { defineField, defineType } from 'sanity'

export const venue = defineType({
  name: 'venue',
  title: 'Celebration Space',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'name' }, validation: (r) => r.required(),
    }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'seated', title: 'Seated Capacity', type: 'number' }),
    defineField({ name: 'floating', title: 'Floating Capacity', type: 'number' }),
    defineField({ name: 'cover', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'highlights', title: 'Detail Page Highlights',
      description: 'A small, hand-picked set of the best photos shown on this venue\'s own page.',
      type: 'array', of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'galleryWithDecor', title: 'Gallery — Event Setups (With Decor)',
      type: 'array', of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'galleryWithoutDecor', title: 'Gallery — Venue Views (Without Decor)',
      type: 'array', of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'tagline', media: 'cover' } },
})
