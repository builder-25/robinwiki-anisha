import { z } from 'zod'
import { loadSpec, renderTemplate } from '../loader.js'
import { fragmentationSchema } from '../specs/fragmentation.schema.js'
import type { PromptResult } from '../types.js'

const inputSchema = z.object({
  content: z.string(),
  context: z.string().optional(),
})

/**
 * Compute fragment target and hard ceiling from word count.
 *
 * @param wordCount - number of words in the entry content
 * @returns `{ target, ceiling }` — target is the prompt hint, ceiling is the code-enforced max
 */
export function computeFragmentLimits(wordCount: number) {
  const target = Math.max(1, Math.min(30, Math.round(wordCount / 150)))
  const ceiling = target + 5
  return { target, ceiling }
}

export function loadFragmentationSpec(vars: {
  content: string
  context?: string
}): PromptResult {
  const validated = inputSchema.parse(vars)
  const spec = loadSpec('fragmentation.yaml')

  const wordCount = validated.content.split(/\s+/).filter(Boolean).length
  const { target: fragmentTarget } = computeFragmentLimits(wordCount)

  const user = renderTemplate(spec.template, {
    ...validated,
    wordCount,
    fragmentTarget,
  })
  return {
    system: spec.system_message,
    user,
    meta: {
      temperature: spec.temperature,
      outputSchema: fragmentationSchema,
    },
  }
}
