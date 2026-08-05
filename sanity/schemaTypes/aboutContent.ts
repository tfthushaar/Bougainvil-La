import { defineField, defineType } from 'sanity'

export const aboutContent = defineType({
  name: 'aboutContent',
  title: 'About Page Content',
  type: 'document',
  // Singleton — see sanity/structure.ts.
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'introParagraphs', title: 'Intro Paragraphs', type: 'array', of: [{ type: 'text' }] }),
    defineField({ name: 'heroImage', title: 'Header Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'founderName', title: 'Founder Name', type: 'string' }),
    defineField({ name: 'founderTitle', title: 'Founder Title', type: 'string' }),
    defineField({ name: 'founderBioParagraphs', title: 'Founder Bio Paragraphs', type: 'array', of: [{ type: 'text' }] }),
    defineField({ name: 'highlights', title: 'Our Highlights', type: 'array', of: [{ type: 'string' }] }),
  ],
})
