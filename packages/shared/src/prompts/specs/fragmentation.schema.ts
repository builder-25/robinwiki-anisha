import { z } from 'zod'

export const fragmentationSchema = z.object({
  fragments: z.array(
    z.object({
      content: z.string(),
      type: z.enum(['fact', 'question', 'idea', 'action', 'quote', 'reference', 'note']),
      confidence: z.number(),
      sourceSpan: z.string(),
      suggestedSlug: z.string(),
      title: z.string(),
      tags: z.array(z.string()),
      wikiLinks: z.array(z.string()),
    })
  ),
  primaryTopic: z.string(),
})

export type FragmentationOutput = z.infer<typeof fragmentationSchema>
