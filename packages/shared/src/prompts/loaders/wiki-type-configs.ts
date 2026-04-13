import { loadSpec } from '../loader.js'
import type { WikiType } from '../../types/wiki.js'

export interface WikiTypeConfig {
  slug: WikiType
  name: string
  shortDescriptor: string
  descriptor: string
  prompt: string
}

const WIKI_TYPE_META: Record<WikiType, { name: string; shortDescriptor: string; descriptor: string }> = {
  log:        { name: 'Log',        shortDescriptor: 'Chronological record',      descriptor: 'A chronological synthesis of events, observations, and activities over time' },
  collection: { name: 'Collection', shortDescriptor: 'Curated item library',      descriptor: 'A curated library organizing related bookmarks, references, or resources' },
  belief:     { name: 'Belief',     shortDescriptor: 'Held position or model',    descriptor: 'A synthesis of a held position, mental model, or worldview with supporting evidence' },
  decision:   { name: 'Decision',   shortDescriptor: 'Choice and reasoning',      descriptor: 'A record of a discrete choice, its context, alternatives considered, and reasoning' },
  project:    { name: 'Project',    shortDescriptor: 'Active initiative tracker',  descriptor: 'A living document tracking an active initiative, its goals, progress, and status' },
  goal:       { name: 'Goal',       shortDescriptor: 'Goal with direction',        descriptor: 'A high-level goal with measurable milestones and progress tracking' },
  skill:      { name: 'Skill',      shortDescriptor: 'Capability knowledge base', descriptor: 'A knowledge base documenting a capability being developed or maintained' },
  agent:      { name: 'Agent',      shortDescriptor: 'AI assistant docs',         descriptor: 'Documentation for a configured AI assistant\'s purpose, behavior, and capabilities' },
  voice:      { name: 'Voice',      shortDescriptor: 'Communication style guide', descriptor: 'A style guide capturing communication patterns, tone preferences, and voice identity' },
  principles: { name: 'Principles', shortDescriptor: 'Operating rules',           descriptor: 'A document of operating rules, values, and commitments that guide behavior' },
}

export function loadWikiTypeConfigs(): WikiTypeConfig[] {
  return (Object.keys(WIKI_TYPE_META) as WikiType[]).map((slug) => {
    const spec = loadSpec(`${slug}.yaml`, 'wiki-types')
    return {
      slug,
      ...WIKI_TYPE_META[slug],
      prompt: spec.system_message,
    }
  })
}
