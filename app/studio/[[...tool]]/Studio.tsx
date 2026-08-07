'use client'

import Link from 'next/link'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export function Studio() {
  return (
    <>
      <Link
        href="/"
        style={{
          position: 'fixed', top: '0.75rem', left: '0.75rem', zIndex: 2147483647,
          fontFamily: 'system-ui, sans-serif', fontSize: '0.8rem', fontWeight: 500,
          color: '#fff', background: 'rgba(15,15,15,0.85)', backdropFilter: 'blur(6px)',
          padding: '0.5rem 0.9rem', borderRadius: '999px', textDecoration: 'none',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        ← Back to Website
      </Link>
      <NextStudio config={config} />
    </>
  )
}
