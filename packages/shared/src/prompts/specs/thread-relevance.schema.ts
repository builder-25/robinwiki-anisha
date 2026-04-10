import { z } from 'zod'

export const threadRelevanceSchema = z.object({
  score: z.number(),
  reasoning: z.string(),
})

export type ThreadRelevanceOutput = z.infer<typeof threadRelevanceSchema>
