import { z } from 'zod'

export const goalWikiSchema = z.object({
  markdown: z.string(),
})

export type GoalWikiOutput = z.infer<typeof goalWikiSchema>
