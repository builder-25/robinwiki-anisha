import { z } from 'zod'
import { loadSpec, renderTemplate } from '../loader.js'
import type { PromptResult } from '../types.js'
import { logWikiSchema } from '../specs/thread-wiki/log.schema.js'
import { collectionWikiSchema } from '../specs/thread-wiki/collection.schema.js'
import { beliefWikiSchema } from '../specs/thread-wiki/belief.schema.js'
import { decisionWikiSchema } from '../specs/thread-wiki/decision.schema.js'
import { projectWikiSchema } from '../specs/thread-wiki/project.schema.js'
import { objectiveWikiSchema } from '../specs/thread-wiki/objective.schema.js'
import { skillWikiSchema } from '../specs/thread-wiki/skill.schema.js'
import { agentWikiSchema } from '../specs/thread-wiki/agent.schema.js'
import { voiceWikiSchema } from '../specs/thread-wiki/voice.schema.js'
import { principlesWikiSchema } from '../specs/thread-wiki/principles.schema.js'

export type ThreadWikiType =
  | 'log'
  | 'collection'
  | 'belief'
  | 'decision'
  | 'project'
  | 'objective'
  | 'skill'
  | 'agent'
  | 'voice'
  | 'principles'

const inputSchema = z.object({
  fragments: z.string(),
  title: z.string(),
  date: z.string(),
  count: z.number(),
  timeline: z.string().optional(),
  people: z.string().optional(),
  existingWiki: z.string().optional(),
  edits: z.string().optional(),
})

const schemaMap: Record<ThreadWikiType, z.ZodType> = {
  log: logWikiSchema,
  collection: collectionWikiSchema,
  belief: beliefWikiSchema,
  decision: decisionWikiSchema,
  project: projectWikiSchema,
  objective: objectiveWikiSchema,
  skill: skillWikiSchema,
  agent: agentWikiSchema,
  voice: voiceWikiSchema,
  principles: principlesWikiSchema,
}

export function loadThreadWikiSpec(
  type: ThreadWikiType,
  vars: {
    fragments: string
    title: string
    date: string
    count: number
    timeline?: string
    people?: string
    existingWiki?: string
    edits?: string
  }
): PromptResult {
  const validated = inputSchema.parse(vars)
  const spec = loadSpec(`${type}.yaml`, 'thread-wiki')
  const user = renderTemplate(spec.template, validated)
  return {
    system: spec.system_message,
    user,
    meta: {
      temperature: spec.temperature,
      outputSchema: schemaMap[type],
    },
  }
}
