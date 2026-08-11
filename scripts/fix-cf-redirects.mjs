// public/_redirects is a Netlify-era file (predates the Cloudflare work
// entirely) handling Sanity Studio's client-side routing via a Netlify-style
// SPA-fallback rewrite: `/studio/*  /studio/index.html  200`. OpenNext
// copies everything in public/ into .open-next/assets/ verbatim, so this
// rule ends up in the Cloudflare build too — but Cloudflare's _redirects
// validator is stricter than Netlify's about self-referential wildcard
// rules (the destination /studio/index.html itself matches the /studio/*
// source pattern) and rejects the whole deploy with "Infinite loop
// detected" (error 100324), even though this is the standard, safe
// Netlify SPA-fallback idiom.
//
// It's also simply unnecessary on Cloudflare: unlike a static export, this
// deploys a real Next.js server (via the Workers "main" entry in
// wrangler.jsonc), so /studio/* sub-paths are already served correctly by
// Next's own App Router — confirmed against the real workerd runtime
// locally. Deleting the copied file here (not the source in public/, which
// Netlify still needs) is the surgical fix.
import { existsSync, rmSync } from 'node:fs'

const path = '.open-next/assets/_redirects'
if (existsSync(path)) {
  rmSync(path)
  console.log(`removed ${path} (Netlify-only rule, unneeded and rejected by Cloudflare's stricter _redirects validator)`)
} else {
  console.log(`${path} not present, nothing to do`)
}
