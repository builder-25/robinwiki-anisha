import { z } from 'zod'

export const aiModelSchema = z.object({
  id: z.string(),
  name: z.string(),
  context_length: z.number(),
  pricing: z.object({
    prompt: z.string(),
    completion: z.string(),
  }),
})

export const aiModelsResponseSchema = z.object({
  models: z.array(aiModelSchema),
})

export type AiModel = z.infer<typeof aiModelSchema>
export type AiModelsResponse = z.infer<typeof aiModelsResponseSchema>
