import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton — see sanity/structure.ts.
  fields: [
    defineField({ name: 'address', title: 'Address', type: 'text' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'instagramHandle', title: 'Instagram Handle (e.g. @yourhandle)', type: 'string' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'footerTagline', title: 'Footer Tagline', type: 'string' }),
    defineField({ name: 'brochurePdf', title: 'Brochure PDF', type: 'file' }),
    defineField({
      name: 'bookTourEmailSubject', title: '"Book a Tour" Email Subject',
      type: 'string', initialValue: 'Venue Tour Request',
    }),
  ],
})
