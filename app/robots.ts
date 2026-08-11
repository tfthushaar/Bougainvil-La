import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bougainvilla.co.in'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Explicit allow for the well-known AI crawlers/agents, on top of
        // the default "*" allow — belt and suspenders in case any of them
        // change their default posture, and future-proofs against needing
        // to revisit this if a new one shows up. /api/ (functional
        // endpoints, not content) stays off-limits for everyone. The CMS
        // no longer lives on this site (Sanity Studio is hosted standalone),
        // so there's no /studio/ path here to disallow.
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: [
          'GPTBot', 'ChatGPT-User', 'OAI-SearchBot', // OpenAI
          'ClaudeBot', 'Claude-Web', 'anthropic-ai', // Anthropic
          'Google-Extended', // Gemini training/grounding
          'PerplexityBot', 'Perplexity-User', // Perplexity
          'Applebot', 'Applebot-Extended', // Apple Intelligence / Siri
          'Bytespider', // ByteDance/TikTok
          'CCBot', // Common Crawl (feeds many LLMs)
          'Amazonbot', 'meta-externalagent',
        ],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
