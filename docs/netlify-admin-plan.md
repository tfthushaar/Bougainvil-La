# Netlify-hosted CMS/admin — migration plan

## Context

Sanity was removed from this project entirely (2026-08-12) — the embedded `/studio` admin was
making the Cloudflare Worker bundle too large to deploy on the free plan (Studio alone was 4.6MB
of a 4.7MB bundle), and the client prefers a purpose-built admin so its UX can be fine-tuned
exactly to how the venue's team actually works, rather than adapting to a generic CMS's editing UI.

The public site (this repo) is now **fully static** — every page is prerendered at build time from
plain TypeScript data in `lib/content/*.ts`. No database, no API calls, no runtime dependency on
anything external. That's deliberate: it's what let the Cloudflare Worker shrink from 23.4MB to
3.2MB and deploy cleanly on the free plan. The plan below keeps that property for the public site
and adds the admin as a **fully decoupled second app**, rather than re-coupling the two the way
Sanity did.

## Architecture

Two separate apps, two separate hosts:

- **Public site** (this repo) — Next.js, deployed to **Cloudflare Workers**, `bougainvilla.co.in`.
  Stays static/build-time-rendered. No visitor-facing code talks to the admin's database directly.
- **Admin app** (new repo or a new top-level folder in this one — see "Repo layout" below) —
  Next.js, deployed to **Netlify**, something like `admin.bougainvilla.co.in` or a Netlify
  subdomain. Gated behind login. This is where the venue's team edits content, writes blog posts,
  and reads enquiry submissions.

They're connected by exactly two things:
1. A **database** the admin reads/writes and the public site's build reads from.
2. A **deploy hook** the admin calls after a save, so the public site rebuilds with fresh content.

No shared runtime, no shared API surface at request time — the public site never calls the admin
or the database while serving a visitor. This is what keeps it static and keeps the Cloudflare
Worker small regardless of how big the admin app grows.

### Why build-time fetch + deploy hook, not live API calls

Two ways the public site could get fresh content:
- **(Chosen) Rebuild on save.** Admin writes to the database, then calls a Cloudflare deploy hook.
  The next build's `lib/content/*.ts` fetches fresh data from the database and bakes it into static
  HTML again, same as today. Content goes live ~1-2 minutes after saving (Cloudflare build time).
- **(Not chosen) Live reads.** Public pages fetch from the database (or an API in front of it) on
  every request. Instant updates, but reintroduces a runtime dependency into the Worker — closer to
  what Sanity's `sanityFetch`/draft-mode plumbing did, which is exactly the coupling that caused
  this migration in the first place, and it makes the Worker bundle bigger again.

A 1-2 minute lag between "save in admin" and "live on site" is a completely normal, acceptable
trade for a wedding venue marketing site — it's not a live application. Revisit only if that
becomes a real problem in practice.

### The seam that makes this easy: `lib/content/*.ts`

Every content accessor in this codebase already has the shape the future backend needs:

```ts
export async function getVenues(): Promise<Venue[]> {
  return VENUES // today: a static in-repo constant
}
```

Every call site across `app/` and `components/` already does `await getVenues()`, `await
getHomeContent()`, etc. — even though nothing async happens today. When the admin/database exist,
the only change needed is **inside these seven files** (`venues.ts`, `home.ts`, `about.ts`,
`roomTypes.ts`, `faq.ts`, `siteSettings.ts`, `locations.ts`) — swap the function body from
"return a constant" to "fetch from the database," e.g.:

```ts
export async function getVenues(): Promise<Venue[]> {
  const res = await fetch(`${process.env.ADMIN_DB_URL}/venues`)
  return res.json()
}
```

Nothing in `app/` or `components/` needs to change. This was verified working end-to-end this
session (every accessor is already `async`, every call site already `await`s it) — it's not a
theoretical plan, it's the actual current state of the code.

## Repo layout

Two reasonable options, pick when starting the admin build:

- **Separate repo** (recommended) — cleanest deploy story: this repo only ever deploys to
  Cloudflare, the admin repo only ever deploys to Netlify, no risk of one host's build picking up
  the wrong app. Slightly more setup (two repos, two `npm install`s) but avoids monorepo tooling
  (Turborepo/Nx) that this project doesn't otherwise need.
- **Monorepo** — `apps/site` (this code, moved) + `apps/admin` (new), one repo, two Netlify/
  Cloudflare projects each pointed at a subfolder. More setup work up front for a benefit
  (shared types between the two apps) that's small here since the "shared types" are just the
  handful of interfaces in `lib/content/*.ts`, which can just as easily be copy-pasted or published
  as a tiny shared npm package if drift becomes a real problem.

## Database

**Recommendation: Netlify DB (Neon Postgres), Netlify's first-party integrated database.** Since
the admin is committed to Netlify hosting already, this is zero-extra-vendor and wires up from the
Netlify dashboard directly. Relational fits this data well — venues, room types, FAQ items, and
location pages are all distinct tables with a handful of fields each; blog posts and enquiries are
naturally their own tables too.

Alternative if a fully-managed dashboard/browsing UI on the data itself is wanted: **Supabase**
(also Postgres, adds a built-in table-browser UI and row-level auth if that ends up useful).

### Schema (mirrors the current `lib/content/*.ts` interfaces exactly)

- `venues` — slug, name, tagline, subtitle, description (text\[]), seated, floating, cover,
  highlights (text\[]), gallery_with_decor (text\[]), gallery_without_decor (text\[])
- `room_types` — name, description, photo, quantity, capacity
- `faq_items` — question, answer, order
- `location_pages` — slug, meta_title, meta_description, h1, subheading, blocks (jsonb — the same
  `{type: 'heading'|'paragraph'|'list', ...}` shape already in `lib/content/locations.ts`), is_pillar
- `home_content`, `about_content`, `site_settings` — singleton tables (one row each), same fields
  as the current `HomeContent`/`AboutContent`/`SiteSettings` interfaces
- `blog_posts` *(new)* — slug, title, excerpt, cover_image, body (jsonb, same block shape as
  location pages — reuse it rather than inventing a second rich-text format), published_at, status
  (draft/published)
- `enquiries` *(new — replaces the current mailto stopgap)* — name, phone, email, wedding_date,
  guest_count, message, source, submitted_at

Images: the admin needs image upload + hosting. Netlify DB doesn't host files — pair it with
**Cloudflare R2** (cheap, and since the public site's DNS/infra is already on Cloudflare, keeping
media there too avoids a third vendor) or **Netlify's own asset storage** if simplicity matters
more than staying within one cloud provider.

## Auth

Single admin user (or a small internal team), not public-facing — doesn't need social login,
just needs to keep strangers out. **Recommendation: Auth.js (NextAuth) with a credentials
provider**, password hashed with bcrypt, stored in the same Postgres database as everything else.
No third-party auth vendor, no added cost, and it's the standard pattern for exactly this kind of
internal tool. If the team ever grows past a couple of editors and wants proper role management
without building it by hand, **Clerk**'s free tier is the fastest upgrade path.

## Admin UX

This is the actual point of not using a generic CMS, so it's worth building deliberately rather
than defaulting to a raw CRUD table:

- One page per content area (Venues, Home, About, Room Types, FAQ, Locations, Blog, Site Settings,
  Enquiries) rather than one generic "documents" list — matches how the team actually thinks about
  the site.
- Enquiries page: sortable/filterable table (by date, source), mark-as-contacted status, since this
  fully replaces the current mailto-and-hope-someone-checks-email stopgap.
- Blog: a real editor (even something simple — a block-based editor, or markdown-with-preview,
  matching the `blocks` shape already used for location pages keeps one rich-text format across the
  whole system instead of two).
- Image upload with a preview and the actual dimensions/file size shown before publish — the
  content-fidelity work done on the current site this session (fixing blurry full-bleed header
  images, oversized PDFs, etc.) all traced back to not having quality/size feedback at upload time.

## Phased roadmap

1. **Scaffold the admin app** — Next.js on Netlify, Auth.js login gate, Netlify DB provisioned,
   schema above migrated in.
2. **One-time data migration** — a script (same shape as the old
   `scripts/migrate-content-to-sanity.mjs`, adapted) that reads `lib/content/*.ts` from this repo
   and inserts it into the new database, so the admin starts populated with real current content
   instead of empty.
3. **Wire the public site's `lib/content/*.ts` to fetch from the new database** at build time (the
   seam described above), add the Cloudflare deploy hook, remove the static constants.
4. **Enquiries**: point `lib/useEnquiryForm.ts` at a real API route on the admin app (or a
   Netlify Function) instead of the `mailto:` stopgap.
5. **Blog**: add the content type, the admin editor, and the public `/blog` + `/blog/[slug]` routes
   on the site (new — doesn't exist today).
6. **Polish the editing UX** per-content-area once the basics work end-to-end.

## Open decisions for you/the client

- Separate repo vs. monorepo for the admin (leaning separate repo — see above).
- Netlify DB vs. Supabase (leaning Netlify DB, given the admin is Netlify-hosted anyway).
- Where images live: Cloudflare R2 vs. Netlify's asset storage.
- Admin subdomain name (e.g. `admin.bougainvilla.co.in`).
