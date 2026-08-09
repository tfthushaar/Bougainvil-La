import { defineField, defineType } from 'sanity'

export const homeContent = defineType({
  name: 'homeContent',
  title: 'Home Page Content',
  type: 'document',
  // Singleton — only one document of this type should ever exist (enforced in
  // the Studio's structure builder, see sanity/structure.ts).
  fields: [
    defineField({ name: 'heroSubtitleLeft', title: 'Hero — Left Subtitle', type: 'string' }),
    defineField({ name: 'heroSubtitleRight', title: 'Hero — Right Subtitle', type: 'string' }),
    defineField({ name: 'heroEyebrow', title: 'Hero — Philosophy Eyebrow', type: 'string' }),
    defineField({ name: 'heroHeadline', title: 'Hero — Philosophy Headline', type: 'string' }),
    defineField({ name: 'heroParagraph', title: 'Hero — Philosophy Paragraph', type: 'text' }),
    defineField({ name: 'heroFeatureLine', title: 'Hero — Feature Line', type: 'string' }),
    defineField({ name: 'heroButtonsLabel', title: 'Hero — Buttons Block Label', type: 'string' }),

    defineField({ name: 'introHeadline', title: 'Intro — Headline', type: 'string' }),
    defineField({ name: 'introParagraph', title: 'Intro — Paragraph', type: 'text' }),

    defineField({ name: 'founderEyebrow', title: 'Founder Teaser — Eyebrow', type: 'string' }),
    defineField({ name: 'founderParagraphs', title: 'Founder Teaser — Paragraphs', type: 'array', of: [{ type: 'text' }] }),
    defineField({ name: 'founderQuote', title: 'Founder Teaser — Quote', type: 'string' }),
    defineField({ name: 'founderImage', title: 'Founder Teaser — Image', type: 'image', options: { hotspot: true } }),

    defineField({
      name: 'highlights', title: 'Our Highlights', type: 'array',
      description: "The simple landing-page highlights list (e.g. \"Capacity for up to 1,000 Guests\") — matches the same list shown on the About page.",
      of: [{ type: 'string' }],
    }),

    defineField({ name: 'whyHeadline', title: "Why Bougainvil'La — Headline", type: 'string' }),
    defineField({ name: 'whyParagraphs', title: "Why Bougainvil'La — Paragraphs", type: 'array', of: [{ type: 'text' }] }),
    defineField({ name: 'whyCouplesChooseHeadline', title: 'Why Couples Choose — Headline', type: 'string' }),
    defineField({ name: 'whyCouplesChoose', title: 'Why Couples Choose (list)', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'eventsWeHostHeadline', title: 'Events We Host — Headline', type: 'string' }),
    defineField({ name: 'eventsWeHost', title: 'Events We Host (list)', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'signatureExperiencesHeadline', title: 'Signature Experiences — Headline', type: 'string' }),
    defineField({
      name: 'signatureExperiences', title: 'Signature Experiences', type: 'array',
      of: [{
        type: 'object', name: 'signatureExperience',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'desc', title: 'Description', type: 'text' },
        ],
      }],
    }),

    defineField({ name: 'locationBlurbHeadline', title: 'Location Blurb — Headline', type: 'string' }),
    defineField({ name: 'locationBlurbQuote', title: 'Location Blurb — Quote', type: 'text' }),
  ],
})
