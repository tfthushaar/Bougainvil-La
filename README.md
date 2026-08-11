# Bougainvil'La

Marketing site for Bougainvil'La, a luxury destination wedding venue in South Bangalore.
Next.js 15 (App Router), fully static content — no CMS backend.

## Stack

- **Next.js 15** — App Router, deployed as a Cloudflare Worker via `@opennextjs/cloudflare`
- **GSAP + Lenis** — scroll-driven motion, smooth scroll
- Deployed on **Cloudflare Workers** at `bougainvilla.co.in`

## Local development

```bash
npm install
npm run dev
```

No `.env.local` is required for local content — see `.env.local.example` for the one optional var
(`NEXT_PUBLIC_SITE_URL`, used for absolute URLs in metadata/sitemap).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` / `npm run start` | Production build/serve |
| `npm run cf:build` | Build for Cloudflare via `@opennextjs/cloudflare` |
| `npm run cf:preview` | Build + run locally against the real Cloudflare `workerd` runtime |
| `npm run cf:deploy` | Build + deploy to Cloudflare |

## Content model

All copy, photos, and venue/room/FAQ/location data live as plain TypeScript in `lib/content/*.ts`
(interfaces + `getX()` accessor functions, one file per content area — venues, home, about,
roomTypes, faq, siteSettings, locations). To edit content, edit these files directly and redeploy.

There used to be a Sanity-backed CMS here (an embedded `/studio` admin). It's been fully removed —
see `docs/netlify-admin-plan.md` for the plan to replace it with a purpose-built admin app hosted
on Netlify, decoupled from this Cloudflare-hosted public site.

The enquiry/contact forms (`EnquireForm`/`ContactForm`) currently open the visitor's email client
via a `mailto:` link (see `lib/useEnquiryForm.ts`) rather than storing submissions anywhere — a
stopgap until the admin app exists to receive and store them properly.

## Image pipeline

Source photography lives outside this repo. `scripts/prepare-images.py` converts and resizes the
originals (handles HEIC correctly via `pillow-heif`) into `public/images/`;
`scripts/filter-image-quality.py` regenerates `lib/data/gallery-manifest.json`, which
`lib/content/venues.ts` reads to build each venue's full gallery.
