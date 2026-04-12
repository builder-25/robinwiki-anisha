import { z } from 'zod'

export const wikiTypeResponseSchema = z.object({
  slug: z.string(),
  name: z.string(),
  shortDescriptor: z.string(),
  descriptor: z.string(),
  prompt: z.string(),
  isDefault: z.boolean(),
  userModified: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const wikiTypeListResponseSchema = z.object({
  wikiTypes: z.array(wikiTypeResponseSchema),
})

export const createWikiTypeBodySchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'slug must be lowercase alphanumeric with hyphens'),
  name: z.string().min(1),
  shortDescriptor: z.string().min(1),
  descriptor: z.string().min(1),
  prompt: z.string().default(''),
})

export const updateWikiTypeBodySchema = z.object({
  name: z.string().optional(),
  shortDescriptor: z.string().optional(),
  descriptor: z.string().optional(),
  prompt: z.string().optional(),
})
