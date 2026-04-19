import { NoOpenRouterKeyError, type OpenRouterConfig } from '@robin/agent'
import { DEFAULT_MODEL } from '@robin/shared'

const DEFAULT_EMBEDDING_MODEL = 'openai/text-embedding-3-small'

/**
 * Loads the OpenRouter config from environment. The API key MUST come from
 * process.env.OPENROUTER_API_KEY — no DB storage, no DEK decryption.
 * Throws NoOpenRouterKeyError when the key is missing so BullMQ workers
 * mark the job failed and apply backoff.
 */
export function loadOpenRouterConfig(): OpenRouterConfig {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) throw new NoOpenRouterKeyError()

  return {
    apiKey,
    models: {
      extraction: DEFAULT_MODEL,
      classification: DEFAULT_MODEL,
      wikiGeneration: DEFAULT_MODEL,
      embedding: DEFAULT_EMBEDDING_MODEL,
    },
  }
}
