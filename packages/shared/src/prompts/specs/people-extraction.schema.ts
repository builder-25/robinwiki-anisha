import { z } from 'zod'

export const peopleExtractionSchema = z.object({
  people: z.array(
    z.object({
      mention: z.string(),
      inferredName: z.string(),
      matchedKey: z.string().nullable(),
      confidence: z.number(),
      sourceSpan: z.string(),
    })
  ),
})

export type PeopleExtractionOutput = z.infer<typeof peopleExtractionSchema>
