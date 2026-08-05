import { Studio } from './Studio'

// Sanity Studio is a fully client-rendered SPA — one static shell is
// exported, and Studio's own router handles every /studio/* sub-path from
// there (see public/_redirects for the Netlify fallback that makes deep
// links into the Studio work on a static host).
export async function generateStaticParams() {
  return [{ tool: [] }]
}

export default function StudioPage() {
  return <Studio />
}
