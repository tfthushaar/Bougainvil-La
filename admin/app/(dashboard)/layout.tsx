import Link from 'next/link'
import { auth, signOut } from '@/lib/auth'

const NAV_SECTIONS = [
  {
    label: 'Edit Website',
    items: [
      { href: '/home', label: 'Home Page' },
      { href: '/about', label: 'About Page' },
      { href: '/venues', label: 'Venues' },
      { href: '/room-types', label: 'Room Types' },
      { href: '/faq', label: 'FAQ' },
      { href: '/locations', label: 'Location Pages' },
      { href: '/site-settings', label: 'Site Settings' },
    ],
  },
  {
    label: 'Leads',
    items: [{ href: '/enquiries', label: 'Enquiries' }],
  },
]

async function logout() {
  'use server'
  await signOut({ redirectTo: '/login' })
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <div className="flex min-h-screen bg-[#f7f6f3]">
      <aside className="flex w-60 flex-shrink-0 flex-col border-r border-black/10 bg-white">
        <div className="border-b border-black/10 px-5 py-5">
          <span className="font-serif text-lg italic text-neutral-900" style={{ fontFamily: 'var(--font-display)' }}>
            Bougainvil&rsquo;La
          </span>
          <p className="text-xs text-neutral-500">Admin</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <Link href="/" className="mb-1 block rounded px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100">
            Dashboard
          </Link>
          <Link href="/blog" className="mb-4 block rounded px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100">
            Create Blog
          </Link>
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="mb-4">
              <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">{section.label}</p>
              {section.items.map((item) => (
                <Link
                  key={item.href} href={item.href}
                  className="block rounded px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="border-t border-black/10 px-3 py-4">
          <p className="truncate px-3 text-xs text-neutral-500">{session?.user?.email}</p>
          <form action={logout}>
            <button type="submit" className="mt-1 block w-full rounded px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100">
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}
