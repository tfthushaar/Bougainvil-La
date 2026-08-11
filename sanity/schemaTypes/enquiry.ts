import { defineField, defineType } from 'sanity'

// Written by app/api/enquiry/route.ts (server-side, with the write token)
// whenever a visitor submits EnquireForm/ContactForm. This document type IS
// the admin panel for form responses: Studio's built-in list/detail views
// (see sanity/structure.ts, "Enquiries") are the read UI, gated behind real
// Sanity account login rather than a bespoke auth system.
export const enquiry = defineType({
  name: 'enquiry',
  title: 'Enquiry',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string' }),
    defineField({ name: 'weddingDate', title: 'Wedding Date', type: 'date' }),
    defineField({ name: 'guestCount', title: 'Estimated Guest Count', type: 'number' }),
    defineField({ name: 'message', title: 'Message', type: 'text' }),
    defineField({
      name: 'source', title: 'Submitted From', type: 'string',
      description: 'Which page/form this came in from (e.g. "home" or "contact").',
    }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
  ],
  orderings: [{ title: 'Newest First', name: 'submittedAtDesc', by: [{ field: 'submittedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'phone', date: 'submittedAt' },
    prepare({ title, subtitle, date }) {
      const when = date ? new Date(date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : ''
      return { title: title || 'Untitled enquiry', subtitle: [subtitle, when].filter(Boolean).join(' — ') }
    },
  },
})
