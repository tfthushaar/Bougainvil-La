// Shared class strings for the many similar edit forms across content
// areas — avoids re-typing/drifting the same Tailwind utility soup in
// every one of ~8 nearly-identical forms.
export const formStyles = {
  label: 'mb-1 block text-xs font-medium uppercase tracking-wide text-neutral-600',
  input: 'w-full rounded border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]',
  textarea: 'w-full rounded border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)]',
  field: 'mb-4',
  primaryBtn: 'rounded bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-accent-dark)]',
  dangerBtn: 'rounded border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50',
  secondaryBtn: 'rounded border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100',
  sectionTitle: 'mb-3 mt-8 text-xs font-semibold uppercase tracking-wide text-neutral-400 first:mt-0',
}
