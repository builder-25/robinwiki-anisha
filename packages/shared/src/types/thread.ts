export type ThreadType =
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

export type ThreadMode = 'observe' | 'drive' | 'govern'

export interface DefaultThread {
  name: string
  slug: string
  type: ThreadType
  mode: ThreadMode
}

export const DEFAULT_THREADS: DefaultThread[] = [
  // Observe
  { name: 'Daily Log', slug: 'daily-log', type: 'log', mode: 'observe' },
  { name: 'Bookmarks', slug: 'bookmarks', type: 'collection', mode: 'observe' },
  // Drive
  { name: 'Beliefs', slug: 'beliefs', type: 'belief', mode: 'drive' },
  { name: 'Decisions', slug: 'decisions', type: 'decision', mode: 'drive' },
  { name: 'Projects', slug: 'projects', type: 'project', mode: 'drive' },
  { name: 'Objectives', slug: 'objectives', type: 'objective', mode: 'drive' },
  // Govern
  { name: 'Skills', slug: 'skills', type: 'skill', mode: 'govern' },
  { name: 'Agents', slug: 'agents', type: 'agent', mode: 'govern' },
  { name: 'Voice', slug: 'voice', type: 'voice', mode: 'govern' },
  { name: 'Principles', slug: 'principles', type: 'principles', mode: 'govern' },
]
