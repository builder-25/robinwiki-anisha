import { db } from '../db/client.js'
import { wikiTypes } from '../db/schema.js'
import { loadWikiTypeConfigs } from '@robin/shared'
import { logger } from '../lib/logger.js'

const log = logger.child({ component: 'seed-wiki-types' })

/**
 * Seed default wiki types from YAML configs.
 * Uses INSERT ... ON CONFLICT DO NOTHING -- safe to call multiple times,
 * never overwrites user-modified rows.
 */
export async function seedWikiTypes(): Promise<{ seeded: number }> {
  const configs = loadWikiTypeConfigs()

  let seeded = 0
  for (const config of configs) {
    const result = await db
      .insert(wikiTypes)
      .values({
        slug: config.slug,
        name: config.name,
        shortDescriptor: config.shortDescriptor,
        descriptor: config.descriptor,
        prompt: config.prompt,
        isDefault: true,
        userModified: false,
      })
      .onConflictDoNothing()
    seeded += result.count ?? 0
  }

  log.info({ seeded, total: configs.length }, 'wiki types seeded')
  return { seeded }
}
