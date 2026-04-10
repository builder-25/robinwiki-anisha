import type { z } from 'zod'

/** Return type for all prompt spec loader functions */
export interface PromptResult {
  system: string
  user: string
  meta: {
    temperature: number
    outputSchema: z.ZodType
  }
}
