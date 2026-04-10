import { z } from 'zod'

export const threadClassificationSchema = z.object({
  assignments: z.array(
    z.object({
      threadKey: z.string(),
      threadName: z.string(),
      confidence: z.number(),
      reasoning: z.string(),
    })
  ),
  noMatchReason: z.string().optional(),
})

export type ThreadClassificationOutput = z.infer<typeof threadClassificationSchema>
