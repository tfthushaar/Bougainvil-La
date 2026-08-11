import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bougainvilla.co.in'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Explicit allow for the well-known AI crawlers/agents, on top of
        // the default "*" allow — belt and suspenders in case any of them
        // change their default posture, and future-proofs against needing
        // to revisit this if a new one shows up. /studio/ (the CMS) and
        // /api/ (functional endpoints, not content) stay off-limits for
        // everyone.
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/'],
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
        disallow: ['/studio/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
