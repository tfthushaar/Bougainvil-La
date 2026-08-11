# Bougainvil'La Admin

The CMS/admin app for editing site content, authoring blog posts, and managing enquiry
submissions. Deploys as its own Netlify site, fully separate from the main site (which deploys to
Cloudflare from the repo root) — see `../docs/netlify-admin-plan.md` for the original background
and rationale.

Built with Next.js (App Router), Drizzle ORM against Netlify DB (Neon Postgres), Auth.js
(credentials login), and Netlify Blobs for uploaded images.

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

- `DATABASE_URL` — the Netlify DB (Neon) connection string.
- `AUTH_SECRET` — any long random string (`npx auth secret` will generate one).

`@netlify/blobs` needs no environment variables — it auto-detects the Netlify runtime context in
production. Locally, image upload only works under `netlify dev` (not plain `npm run dev`), since
that's what provides the Blobs context.

## Local development

```bash
cd admin
npm install
npm run dev
```

## First-time database setup

Once `DATABASE_URL` is set:

```bash
npm run db:push          # creates all tables from lib/db/schema.ts
npm run db:seed          # one-time: populates tables from the public site's real content
npm run db:create-admin -- you@example.com "a-strong-password"   # creates your login
```

`db:seed` reads directly from `../lib/content/*.ts` (the public site's current static content) so
the admin starts populated with real data instead of empty. It's additive — re-running it
duplicates rows in the non-singleton tables (venues, room types, FAQ, locations, blog), so only run
it once against a fresh database.

## Netlify setup

In the Netlify dashboard, when creating the site:

- **Repository**: same GitHub repo as the main site (`Bougainvil-La`)
- **Base directory**: `admin`
- **Build command**: `npm run build` (already set in `admin/netlify.toml`)
- **Publish directory**: `.next` (already set in `admin/netlify.toml`)
- **Environment variables**: `DATABASE_URL`, `AUTH_SECRET` (see above)

Netlify resolves `netlify.toml` relative to the base directory, so `admin/netlify.toml` is picked
up automatically — no need to duplicate build settings in the dashboard.

Enable **Netlify DB** on this site from the Netlify dashboard (site → Extensions/Database) to
provision the Postgres database and get the connection string for `DATABASE_URL`.
