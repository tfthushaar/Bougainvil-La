// Hand-rolled Turso HTTP client — deliberately not the @libsql/client npm
// package. That package's /http build still transitively references
// @libsql/hrana-client -> @libsql/isomorphic-ws's "workerd" export
// condition, which esbuild fails to resolve when OpenNext bundles this app
// for Cloudflare on Windows (a confirmed upstream bug, not a
// misconfiguration — the OpenNext maintainers' own guidance is "WSL is the
// only supported way to build on Windows"). Plain fetch() has zero
// bundling surface, so it sidesteps the problem entirely. Talks directly to
// Turso's documented HTTP pipeline API: https://docs.turso.tech/sdk/http/reference
//
// admin/ (running on Node.js via Netlify, not this Worker) still uses the
// real @libsql/client package — this file exists only because ROOT builds
// on Windows for Cloudflare specifically.

type TursoValue = string | number | boolean | null

interface TursoCell {
  type: 'null' | 'integer' | 'float' | 'text' | 'blob'
  value?: string
}

function toArg(v: TursoValue): { type: string; value?: string } {
  if (v === null || v === undefined) return { type: 'null' }
  if (typeof v === 'number') return { type: Number.isInteger(v) ? 'integer' : 'float', value: String(v) }
  if (typeof v === 'boolean') return { type: 'integer', value: v ? '1' : '0' }
  return { type: 'text', value: v }
}

function fromCell(cell: TursoCell): unknown {
  if (cell.type === 'null' || cell.value === undefined) return null
  if (cell.type === 'integer') return Number(cell.value)
  if (cell.type === 'float') return Number(cell.value)
  return cell.value
}

function httpUrl(): string {
  const raw = process.env.TURSO_DATABASE_URL
  if (!raw) {
    throw new Error(
      'TURSO_DATABASE_URL is not set. Set it in .env.local for local dev, as a GitHub Actions ' +
      'secret for CI builds, and as a Cloudflare Worker secret for the deployed Worker at request time.'
    )
  }
  return raw.replace(/^libsql:\/\//, 'https://') + '/v2/pipeline'
}

function authToken(): string {
  const token = process.env.TURSO_AUTH_TOKEN
  if (!token) {
    throw new Error('TURSO_AUTH_TOKEN is not set (see TURSO_DATABASE_URL error for where to set it).')
  }
  return token
}

/** Runs one SQL statement and returns its rows as plain objects (column name -> JS value). */
export async function query(sql: string, args: TursoValue[] = []): Promise<Record<string, unknown>[]> {
  const res = await fetch(httpUrl(), {
    method: 'POST',
    headers: { Authorization: `Bearer ${authToken()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      requests: [
        { type: 'execute', stmt: { sql, args: args.map(toArg) } },
        { type: 'close' },
      ],
    }),
  })

  if (!res.ok) {
    throw new Error(`Turso query failed: HTTP ${res.status} ${await res.text()}`)
  }

  const data = await res.json() as {
    results: Array<
      | { type: 'ok'; response: { type: 'execute'; result: { cols: { name: string }[]; rows: TursoCell[][] } } }
      | { type: 'error'; error: { message: string } }
    >
  }

  const first = data.results[0]
  if (first.type === 'error') {
    throw new Error(`Turso query failed: ${first.error.message}`)
  }

  const { cols, rows } = first.response.result
  return rows.map((row) => {
    const obj: Record<string, unknown> = {}
    cols.forEach((col, i) => { obj[col.name] = fromCell(row[i]) })
    return obj
  })
}

/** Parses a json-mode column's stored text back into its JS value, defaulting to [] if null/missing. */
export function parseJsonColumn<T>(raw: unknown, fallback: T): T {
  if (typeof raw !== 'string') return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}
