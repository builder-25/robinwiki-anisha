import { z } from 'zod'

export const personSummaryInputSchema = z.object({
  canonicalName: z.string(),
  aliases: z.string(),
  existingBody: z.string(),
  fragments: z.string(),
})
