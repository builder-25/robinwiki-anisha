import { z } from 'zod'

export const vaultClassificationSchema = z.object({
  vaultKey: z.string(),
  vaultName: z.string(),
  confidence: z.number(),
  reasoning: z.string(),
})

export type VaultClassificationOutput = z.infer<typeof vaultClassificationSchema>
