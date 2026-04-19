import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { getConfig, setConfig } from '../lib/config.js'
import { validationHook } from '../lib/validation.js'
import { sessionMiddleware } from '../middleware/session.js'
import {
  aiPreferencesResponseSchema,
  promptsResponseSchema,
  savePromptsBodySchema,
} from '../schemas/ai-preferences.schema.js'

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
