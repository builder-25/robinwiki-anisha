import { sql } from 'drizzle-orm'
import { db } from '../db/client.js'
import { logger } from '../lib/logger.js'

const log = logger.child({ component: 'ensure-pgvector' })

/**
 * Ensure the pgvector extension exists in the configured database before
 * migrations run. Idempotent — issues `CREATE EXTENSION IF NOT EXISTS vector`.
 *
 * Design notes:
 *   - Reuses the Drizzle client so we share a connection with run-migrations.
 *   - Detects whether the extension was newly created by checking pg_extension
 *     before and after the CREATE, purely for nicer boot logs.
 *   - Does NOT throw if the role lacks CREATE EXTENSION privilege — we log a
 *     clear warning telling the operator to run it manually. If vector columns
 *     reference the type, the downstream migration will fail loudly, which is
 *     the surfaced error we want.
 */
export async function ensurePgvector(): Promise<void> {
  const existedBefore = await hasVectorExtension()

  if (existedBefore) {
    log.info('pgvector extension already present')
    return
  }

  try {
    await db.execute(sql`CREATE EXTENSION IF NOT EXISTS vector`)
  } catch (err) {
    log.warn(
      { err: err instanceof Error ? err.message : err },
      'could not create pgvector extension — role likely lacks CREATE EXTENSION privilege. ' +
        'Run `CREATE EXTENSION vector;` as a superuser. Migrations will fail if vector columns ' +
        'reference the type.',
    )
    return
  }

  const existsAfter = await hasVectorExtension()
  if (existsAfter) {
    log.info('pgvector extension created')
  } else {
    log.warn('pgvector extension still missing after CREATE EXTENSION — investigate manually')
  }
}

/** Best-effort lookup against pg_extension. Returns false on any error. */
async function hasVectorExtension(): Promise<boolean> {
  try {
    const rows = await db.execute<{ extname: string }>(
      sql`SELECT extname FROM pg_extension WHERE extname = 'vector' LIMIT 1`,
    )
    if (Array.isArray(rows)) return rows.length > 0
    return false
  } catch {
    return false
  }
}
