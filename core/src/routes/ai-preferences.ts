import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { and, eq } from 'drizzle-orm'
import { getConfig, setConfig } from '../lib/config.js'
import { SAFE_EMBEDDING_MODELS, MODEL_DEFAULTS } from '../lib/openrouter-config.js'
import { getCachedModelIds } from './ai-models.js'
import { db } from '../db/client.js'
import { configs } from '../db/schema.js'
import { validationHook } from '../lib/validation.js'
import { sessionMiddleware } from '../middleware/session.js'
import {
  aiPreferencesResponseSchema,
  modelPreferencesResponseSchema,
  promptsResponseSchema,
  saveModelPreferencesBodySchema,
  savePromptsBodySchema,
} from '../schemas/ai-preferences.schema.js'

/** DB key → response field name */
const DB_KEY_TO_FIELD: Record<string, string> = {
  extraction: 'extraction',
  classification: 'classification',
  wiki_generation: 'wikiGeneration',
  embedding: 'embedding',
}

/** Response field → DB key */
const FIELD_TO_DB_KEY: Record<string, string> = {
  extraction: 'extraction',
  classification: 'classification',
  wikiGeneration: 'wiki_generation',
  embedding: 'embedding',
}

const aiPreferencesRouter = new Hono()
aiPreferencesRouter.use('*', sessionMiddleware)

// GET /preferences/ai -- return key-exists status and model preference
aiPreferencesRouter.get('/preferences/ai', async (c) => {
  const userId = c.get('userId') as string

  const modelPref = await getConfig({
    scope: 'user',
    userId,
    kind: 'model_preference',
    key: 'default',
  })

  return c.json(
    aiPreferencesResponseSchema.parse({
      hasOpenRouterKey: !!process.env.OPENROUTER_API_KEY,
      modelPreference: typeof modelPref === 'string' ? modelPref : null,
    })
  )
})

// GET /preferences/models -- per-task model preferences with defaults
aiPreferencesRouter.get('/preferences/models', async (c) => {
  const rows = await db
    .select({ key: configs.key, value: configs.value })
    .from(configs)
    .where(
      and(
        eq(configs.scope, 'system'),
        eq(configs.kind, 'model_preference'),
      ),
    )

  const prefs: Record<string, string> = {}
  for (const row of rows) {
    const field = DB_KEY_TO_FIELD[row.key]
    if (field && typeof row.value === 'string') {
      prefs[field] = row.value
    }
  }

  return c.json(
    modelPreferencesResponseSchema.parse({
      extraction: prefs.extraction ?? MODEL_DEFAULTS.extraction,
      classification: prefs.classification ?? MODEL_DEFAULTS.classification,
      wikiGeneration: prefs.wikiGeneration ?? MODEL_DEFAULTS.wiki_generation,
      embedding: prefs.embedding ?? MODEL_DEFAULTS.embedding,
    })
  )
})

// PUT /preferences/models -- upsert per-task model preferences
aiPreferencesRouter.put(
  '/preferences/models',
  zValidator('json', saveModelPreferencesBodySchema, validationHook),
  async (c) => {
    const body = c.req.valid('json')

    // Validate embedding model against safe list
    if (body.embedding) {
      if (!(SAFE_EMBEDDING_MODELS as readonly string[]).includes(body.embedding)) {
        return c.json(
          {
            error: 'Invalid embedding model',
            detail: `Embedding model must produce 1536-dimension vectors. Allowed: ${SAFE_EMBEDDING_MODELS.join(', ')}`,
          },
          400,
        )
      }
    }

    // Validate chat models against cached OpenRouter model list (if available)
    const cachedIds = getCachedModelIds()
    if (cachedIds) {
      for (const field of ['extraction', 'classification', 'wikiGeneration'] as const) {
        const value = body[field]
        if (value && !cachedIds.has(value)) {
          return c.json(
            {
              error: 'Unknown model',
              detail: `Model "${value}" not found in OpenRouter model list`,
            },
            400,
          )
        }
      }
    }

    // Upsert each provided preference
    const entries = Object.entries(body) as [string, string | undefined][]
    for (const [field, value] of entries) {
      if (!value) continue
      const dbKey = FIELD_TO_DB_KEY[field]
      if (!dbKey) continue

      await setConfig({
        scope: 'system',
        kind: 'model_preference',
        key: dbKey,
        value,
        encrypted: false,
      })
    }

    return c.json({ ok: true })
  },
)

// PUT /prompts -- save custom prompt overrides
aiPreferencesRouter.put(
  '/prompts',
  zValidator('json', savePromptsBodySchema, validationHook),
  async (c) => {
    const userId = c.get('userId') as string
    const body = c.req.valid('json')

    await setConfig({
      scope: 'user',
      userId,
      kind: 'user_prompts',
      key: 'overrides',
      value: body,
      encrypted: false,
    })

    return c.json({ ok: true })
  }
)

// GET /prompts -- retrieve custom prompt overrides
aiPreferencesRouter.get('/prompts', async (c) => {
  const userId = c.get('userId') as string

  const stored = await getConfig({
    scope: 'user',
    userId,
    kind: 'user_prompts',
    key: 'overrides',
  })

  if (!stored || typeof stored !== 'object') {
    return c.json(
      promptsResponseSchema.parse({
        extraction: null,
        wikiClassify: null,
        wikiGeneration: null,
      })
    )
  }

  const obj = stored as Record<string, unknown>
  return c.json(
    promptsResponseSchema.parse({
      extraction: typeof obj.extraction === 'string' ? obj.extraction : null,
      wikiClassify: typeof obj.wikiClassify === 'string' ? obj.wikiClassify : null,
      wikiGeneration: typeof obj.wikiGeneration === 'string' ? obj.wikiGeneration : null,
    })
  )
})

export { aiPreferencesRouter as aiPreferencesRoutes }
