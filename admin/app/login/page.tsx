import { signIn } from '@/lib/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

async function login(formData: FormData) {
  'use server'
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/',
    })
  } catch (err) {
    // signIn() redirects internally on success by throwing Next's special
    // NEXT_REDIRECT signal — that's not an AuthError, so it passes through
    // the `throw err` below untouched and Next handles it normally. Only a
    // genuine bad-credentials failure lands in the branch above it.
    if (err instanceof AuthError) {
      redirect('/login?error=1')
    }
    throw err
  }
}

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f6f3] px-4">
      <div className="w-full max-w-sm rounded-lg border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="mb-1 font-serif text-2xl italic text-neutral-900" style={{ fontFamily: 'var(--font-display)' }}>
          Bougainvil&rsquo;La Admin
        </h1>
        <p className="mb-6 text-sm text-neutral-500">Sign in to manage the site.</p>

        <form action={login} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-600">
              Email
            </label>
            <input
              id="email" name="email" type="email" required autoComplete="email"
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-600">
              Password
            </label>
            <input
              id="password" name="password" type="password" required autoComplete="current-password"
              className="w-full rounded border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600">Incorrect email or password.</p>
          )}
          <button
            type="submit"
            className="mt-2 rounded bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)]"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
