import { z } from 'zod'
import { loadSpec, renderTemplate } from '../loader.js'
import { vaultClassificationSchema } from '../specs/vault-classification.schema.js'
import type { PromptResult } from '../types.js'

const inputSchema = z.object({
  content: z.string(),
  vaults: z.string(),
})

export function loadVaultClassificationSpec(vars: {
  content: string
  vaults: string
}): PromptResult {
  const validated = inputSchema.parse(vars)
  const spec = loadSpec('vault-classification.yaml')
  const user = renderTemplate(spec.template, validated)
  return {
    system: spec.system_message,
    user,
    meta: {
      temperature: spec.temperature,
      outputSchema: vaultClassificationSchema,
    },
  }
}
