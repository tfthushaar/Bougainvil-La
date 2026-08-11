# Bougainvil'La Admin

Placeholder scaffold for the CMS/admin app — see `../docs/netlify-admin-plan.md` for the actual
plan (architecture, database/auth recommendations, content model, phased rollout). This folder
currently just proves the deploy pipeline works; the real admin (auth, content editors, blog
authoring, enquiry management) isn't built yet.

## Local development

```bash
cd admin
npm install
npm run dev
```

## Netlify setup

This is meant to deploy as its **own Netlify site**, separate from the main site (which deploys to
Cloudflare from the repo root). In the Netlify dashboard, when creating the site:

- **Repository**: same GitHub repo as the main site (`Bougainvil-La`)
- **Base directory**: `admin`
- **Build command**: `npm run build` (already set in `admin/netlify.toml`)
- **Publish directory**: `.next` (already set in `admin/netlify.toml`)

Netlify resolves `netlify.toml` relative to the base directory, so `admin/netlify.toml` is picked
up automatically — no need to duplicate build settings in the dashboard.
