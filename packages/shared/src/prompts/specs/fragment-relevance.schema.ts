import { z } from 'zod'

export const fragmentRelevanceSchema = z.object({
  score: z.number(),
  reasoning: z.string(),
})

export type FragmentRelevanceOutput = z.infer<typeof fragmentRelevanceSchema>
