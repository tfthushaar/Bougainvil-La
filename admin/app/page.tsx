export default function AdminHome() {
  return (
    <main style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: '0.75rem', textAlign: 'center', padding: '2rem',
    }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>Bougainvil&rsquo;La Admin</h1>
      <p style={{ color: '#666', margin: 0, maxWidth: '32rem' }}>
        Placeholder deploy — this confirms Netlify is correctly building from the <code>admin/</code>
        subfolder. Real content editing, blog authoring, and enquiry management land here next; see{' '}
        <code>docs/netlify-admin-plan.md</code> in the main site&rsquo;s folder for the plan.
      </p>
    </main>
  )
}
