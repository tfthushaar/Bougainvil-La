# Bougainvil'La

Marketing site for Bougainvil'La, a luxury destination wedding venue in South Bangalore.
Next.js 15 (App Router) with Sanity as the CMS.

## Stack

- **Next.js 15** — App Router, server-rendered (needed for Sanity's draft-mode/Presentation Tool)
- **Sanity** — content + the `/studio` admin, embedded on this same site
- **GSAP + Lenis** — scroll-driven motion, smooth scroll
- Deployed on **Netlify**, with a **Cloudflare Pages/Workers** migration in progress

## Local development

```bash
npm install
npm run dev
```

Needs a `.env.local` with:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
SANITY_API_WRITE_TOKEN=   # Editor permission — needed for the enquiry form API route and migration scripts
SANITY_API_READ_TOKEN=    # Viewer permission — needed for draft-mode/Presentation Tool preview
```

Visit `/studio` on the running site to edit content — no separate app to run.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` / `npm run start` | Production build/serve (Netlify's path) |
| `npm run cf:build` | Build for Cloudflare via `@opennextjs/cloudflare` |
| `npm run cf:preview` | Build + run locally against the real Cloudflare `workerd` runtime |
| `npm run cf:deploy` | Build + deploy to Cloudflare |

## Content model

All editable copy, photos, and venue/room/FAQ/location data live in Sanity — see the schema
definitions in `sanity/schemaTypes/`. Form submissions from the site (`EnquireForm`/`ContactForm`)
are stored as `enquiry` documents and appear under **Enquiries** at the top of the Studio's content
list.

## Image pipeline

Source photography lives outside this repo. `scripts/prepare-images.py` converts and resizes the
originals (handles HEIC correctly via `pillow-heif`) into `public/images/`;
`scripts/filter-image-quality.py` regenerates the gallery manifest. `scripts/migrate-content-to-
sanity.mjs` seeds/re-seeds Sanity from `lib/data/*.ts` and uploads the processed images.
