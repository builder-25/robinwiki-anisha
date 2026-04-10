import { z } from 'zod'
import { loadSpec, renderTemplate } from '../loader.js'
import { threadClassificationSchema } from '../specs/thread-classification.schema.js'
import type { PromptResult } from '../types.js'

const inputSchema = z.object({
  content: z.string(),
  threads: z.string(),
  fragmentContext: z.string().optional(),
})

export function loadThreadClassificationSpec(vars: {
  content: string
  threads: string
  fragmentContext?: string
}): PromptResult {
  const validated = inputSchema.parse(vars)
  const spec = loadSpec('thread-classification.yaml')
  const user = renderTemplate(spec.template, validated)
  return {
    system: spec.system_message,
    user,
    meta: {
      temperature: spec.temperature,
      outputSchema: threadClassificationSchema,
    },
  }
}
