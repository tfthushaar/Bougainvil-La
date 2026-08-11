// Fires a GitHub repository_dispatch event to rebuild and redeploy the
// public site (a statically-generated Cloudflare Worker) whenever admin
// content changes. A database write alone never reaches the live site —
// the pages are pre-rendered at build time — so this is what actually gets
// a fresh build running. See .github/workflows/deploy-main-site.yml.
//
// Never let this block or fail a content save: callers fire-and-forget it.
const REPO = 'tfthushaar/Bougainvil-La'

export async function triggerPublicSiteDeploy(): Promise<void> {
  const token = process.env.GITHUB_DISPATCH_TOKEN
  if (!token) {
    console.error('GITHUB_DISPATCH_TOKEN is not set — skipping public site rebuild.')
    return
  }
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/dispatches`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event_type: 'content-updated' }),
    })
    if (!res.ok) {
      console.error('Failed to trigger public site deploy:', res.status, await res.text())
    }
  } catch (err) {
    console.error('Failed to trigger public site deploy:', err)
  }
}
