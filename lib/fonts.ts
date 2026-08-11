import localFont from 'next/font/local'

// Self-hosted instead of next/font/google — Google Fonts' CDN
// (fonts.gstatic.com) isn't reachable from Cloudflare's build sandbox
// (network egress there is restricted to a known allowlist), so
// next/font/google's build-time font download fails outright there. Files
// are the same Latin-subset WOFF2s Google would have served, just fetched
// once and committed instead of fetched on every build. See
// public/fonts/README (or the memory entry) for how these were sourced —
// fonts.googleapis.com/css2 as the source of truth, filtered to the
// "latin" @font-face block per weight/style.
export const ebGaramond = localFont({
  src: [
    { path: '../public/fonts/eb-garamond-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/eb-garamond-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/eb-garamond-600.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/eb-garamond-italic-400.woff2', weight: '400', style: 'italic' },
    { path: '../public/fonts/eb-garamond-italic-500.woff2', weight: '500', style: 'italic' },
    { path: '../public/fonts/eb-garamond-italic-600.woff2', weight: '600', style: 'italic' },
  ],
  variable: '--font-garamond',
  display: 'swap',
})

export const raleway = localFont({
  src: [
    { path: '../public/fonts/raleway-100.woff2', weight: '100', style: 'normal' },
    { path: '../public/fonts/raleway-200.woff2', weight: '200', style: 'normal' },
    { path: '../public/fonts/raleway-300.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/raleway-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/raleway-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/raleway-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-raleway',
  display: 'swap',
})
