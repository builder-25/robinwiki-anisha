import { timingSafeEqual } from 'node:crypto'
import { Hono } from 'hono'
import { sql } from 'drizzle-orm'
import { hashPassword } from 'better-auth/crypto'
import { db } from '../db/client.js'
import { logger } from '../lib/logger.js'

const log = logger.child({ component: 'auth-recover' })

// In-memory rate limiter (sufficient for single-tenant)
const attempts: { ts: number }[] = []
const WINDOW_MS = 60_000
const MAX_ATTEMPTS = 5

function isRateLimited(): boolean {
  const now = Date.now()
  // Purge expired entries
  while (attempts.length > 0 && now - attempts[0].ts > WINDOW_MS) {
    attempts.shift()
  }
  if (attempts.length >= MAX_ATTEMPTS) return true
  attempts.push({ ts: now })
  return false
}

/** Constant-time comparison of two strings (prevents timing attacks on secret). */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

export const authRecoverRoutes = new Hono()

authRecoverRoutes.post('/recover', async (c) => {
  if (isRateLimited()) {
    log.warn('rate limit exceeded on /auth/recover')
    return c.json({ error: 'Too many attempts. Try again in 1 minute.' }, 429)
  }

  let body: { secretKey?: string }
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400)
  }

  if (!body.secretKey) {
    log.warn('missing secretKey in /auth/recover request')
    return c.json({ error: 'secretKey is required' }, 400)
  }

  const serverSecret = process.env.BETTER_AUTH_SECRET
  if (!serverSecret) {
    log.error('BETTER_AUTH_SECRET not set — cannot process recovery')
    return c.json({ error: 'Server misconfigured' }, 500)
  }

  if (!safeEqual(body.secretKey, serverSecret)) {
    log.warn('invalid secret key attempt on /auth/recover')
    return c.json({ error: 'Invalid server secret key' }, 403)
  }

  const newPassword = process.env.INITIAL_PASSWORD
  if (!newPassword) {
    log.error('INITIAL_PASSWORD not set — cannot reset password')
    return c.json({ error: 'INITIAL_PASSWORD env var not set — cannot reset' }, 500)
  }

  const hashed = await hashPassword(newPassword)

  const rows = await db.execute<{ id: string }>(
    sql`SELECT id FROM accounts WHERE provider_id = 'credential' LIMIT 1`
  )
  const account = rows[0]
  if (!account) {
    log.error('no credential account found for password reset')
    return c.json({ error: 'No account found' }, 404)
  }

  await db.execute(
    sql`UPDATE accounts SET password = ${hashed} WHERE id = ${account.id}`
  )

  log.info({ accountId: account.id }, 'password reset to INITIAL_PASSWORD value')
  return c.json({ ok: true, message: 'Password reset to INITIAL_PASSWORD value' })
})
