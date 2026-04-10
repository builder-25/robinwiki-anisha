import type { ThreadType } from './thread.js'

// ─── Config Note Keys ───

export type ThreadGuideKey =
  | 'thread-guide-log'
  | 'thread-guide-collection'
  | 'thread-guide-belief'
  | 'thread-guide-decision'
  | 'thread-guide-project'
  | 'thread-guide-objective'
  | 'thread-guide-skill'
  | 'thread-guide-agent'
  | 'thread-guide-voice'
  | 'thread-guide-principles'

export type ConfigNoteKey = 'profile' | 'preferences' | ThreadGuideKey

export const THREAD_TYPE_TO_GUIDE_KEY: Record<ThreadType, ThreadGuideKey> = {
  log: 'thread-guide-log',
  collection: 'thread-guide-collection',
  belief: 'thread-guide-belief',
  decision: 'thread-guide-decision',
  project: 'thread-guide-project',
  objective: 'thread-guide-objective',
  skill: 'thread-guide-skill',
  agent: 'thread-guide-agent',
  voice: 'thread-guide-voice',
  principles: 'thread-guide-principles',
}

export interface ConfigNoteBootstrap {
  key: ConfigNoteKey
  title: string
  defaultContent: string
}

export const CONFIG_NOTE_BOOTSTRAPS: ConfigNoteBootstrap[] = [
  {
    key: 'profile',
    title: 'Profile',
    defaultContent: [
      '# Profile',
      '',
      'Tell Robin about yourself — your interests, work, goals, and how you think.',
      'This helps Robin understand context when processing your notes.',
      '',
    ].join('\n'),
  },
  {
    key: 'preferences',
    title: 'Preferences',
    defaultContent: [
      '# Preferences',
      '',
      'Configure how Robin organizes and processes your notes.',
      '',
    ].join('\n'),
  },
  {
    key: 'thread-guide-log',
    title: 'Thread Guide: Log',
    defaultContent: [
      '# Thread Guide: Log',
      '',
      'A log thread is a chronological record of events, experiences, observations, and daily happenings.',
      'It captures what occurred — not analysis or conclusions, but the raw record.',
      '',
      '## What belongs here',
      '- Daily activity and events',
      '- Meeting notes and conversations',
      '- Status updates and check-ins',
      '- Observations and things noticed',
      '- Time-stamped records of anything worth remembering',
      '',
      '## What does not belong here',
      '- Opinions, beliefs, or stances (→ belief thread)',
      '- Decisions and their rationale (→ decision thread)',
      '- Plans or future-oriented goals (→ objective or project thread)',
      '',
    ].join('\n'),
  },
  {
    key: 'thread-guide-collection',
    title: 'Thread Guide: Collection',
    defaultContent: [
      '# Thread Guide: Collection',
      '',
      'A collection thread is a curated set of related items — bookmarks, references, resources,',
      'examples, or anything worth saving for later access. It is a library, not a log.',
      '',
      '## What belongs here',
      '- Bookmarks and saved links',
      '- References and reading material',
      '- Examples, templates, and tools',
      '- Lists of things (books, people, ideas) worth returning to',
      '',
      '## What does not belong here',
      '- Analysis or synthesis of collected items (→ belief or skill thread)',
      '- Time-ordered events (→ log thread)',
      '',
    ].join('\n'),
  },
  {
    key: 'thread-guide-belief',
    title: 'Thread Guide: Belief',
    defaultContent: [
      '# Thread Guide: Belief',
      '',
      'A belief thread captures a held position, principle, or stance on a topic.',
      'Beliefs are things the person has concluded, not just observed.',
      '',
      '## What belongs here',
      '- Opinions and viewpoints',
      '- Conclusions reached through experience or reasoning',
      '- Mental models and frameworks',
      '- Things the person holds to be true',
      '',
      '## What does not belong here',
      '- Uncommitted observations (→ log thread)',
      '- Formal decisions with explicit tradeoffs (→ decision thread)',
      '',
    ].join('\n'),
  },
  {
    key: 'thread-guide-decision',
    title: 'Thread Guide: Decision',
    defaultContent: [
      '# Thread Guide: Decision',
      '',
      'A decision thread documents a discrete choice: what was decided, why, what alternatives',
      'were considered, and what the outcome was.',
      '',
      '## What belongs here',
      '- A specific choice that was made',
      '- The context and constraints that shaped the decision',
      '- Alternatives considered and why they were rejected',
      '- Outcomes and retrospective notes on whether the decision held',
      '',
      '## What does not belong here',
      '- General beliefs or opinions (→ belief thread)',
      '- Ongoing projects that stem from a decision (→ project thread)',
      '',
    ].join('\n'),
  },
  {
    key: 'thread-guide-project',
    title: 'Thread Guide: Project',
    defaultContent: [
      '# Thread Guide: Project',
      '',
      'A project thread tracks an active initiative with a defined goal and a finite end state.',
      'It captures progress, blockers, milestones, and notes as the project unfolds.',
      '',
      '## What belongs here',
      '- Project goals and scope',
      '- Progress updates and milestones',
      '- Blockers and how they were resolved',
      '- Notes specific to executing this project',
      '',
      '## What does not belong here',
      '- Broad multi-project goals (→ objective thread)',
      '- Historical event logs unrelated to the project (→ log thread)',
      '',
    ].join('\n'),
  },
  {
    key: 'thread-guide-objective',
    title: 'Thread Guide: Objective',
    defaultContent: [
      '# Thread Guide: Objective',
      '',
      'An objective thread captures a high-level goal or aspiration — something to move toward',
      'over time. Objectives are broader than projects; multiple projects may serve a single objective.',
      '',
      '## What belongs here',
      '- Desired outcomes and success criteria',
      '- Key results or measurable targets',
      '- Progress markers and course corrections',
      '- Reflections on whether the objective still makes sense',
      '',
      '## What does not belong here',
      '- Specific execution steps (→ project thread)',
      '- Principles about how to work (→ principles thread)',
      '',
    ].join('\n'),
  },
  {
    key: 'thread-guide-skill',
    title: 'Thread Guide: Skill',
    defaultContent: [
      '# Thread Guide: Skill',
      '',
      'A skill thread captures knowledge, techniques, and practice notes for a capability',
      'the person is building or has built.',
      '',
      '## What belongs here',
      '- Techniques and how-to knowledge',
      '- Practice notes and lessons learned',
      '- Resources that helped develop this skill',
      '- Proficiency milestones',
      '',
      '## What does not belong here',
      '- Projects that apply the skill (→ project thread)',
      '- Collections of references unrelated to active skill-building (→ collection thread)',
      '',
    ].join('\n'),
  },
  {
    key: 'thread-guide-agent',
    title: 'Thread Guide: Agent',
    defaultContent: [
      '# Thread Guide: Agent',
      '',
      'An agent thread documents a configured AI assistant, automation, or delegate — its purpose,',
      'behavior, prompts, and performance notes.',
      '',
      '## What belongs here',
      '- Agent purpose and instructions',
      '- Prompt or configuration notes',
      '- Observations about agent performance',
      '- Iteration history and changes made',
      '',
      '## What does not belong here',
      '- General AI beliefs or opinions (→ belief thread)',
      '- Project work that uses an agent (→ project thread)',
      '',
    ].join('\n'),
  },
  {
    key: 'thread-guide-voice',
    title: 'Thread Guide: Voice',
    defaultContent: [
      '# Thread Guide: Voice',
      '',
      'A voice thread defines how the person communicates — their tone, style, vocabulary,',
      'and communication principles. It is a reference for writing, speaking, and presenting.',
      '',
      '## What belongs here',
      '- Writing style notes and examples',
      '- Tone guidelines (formal/informal, direct/narrative)',
      '- Phrases that do and do not fit',
      '- Audience-specific communication notes',
      '',
      '## What does not belong here',
      '- General beliefs about communication (→ belief thread)',
      '- Specific project communications (→ project thread)',
      '',
    ].join('\n'),
  },
  {
    key: 'thread-guide-principles',
    title: 'Thread Guide: Principles',
    defaultContent: [
      '# Thread Guide: Principles',
      '',
      'A principles thread is a living document of operating rules — commitments about how to',
      'work, make decisions, and behave. Principles are more durable and abstract than beliefs;',
      'they govern behavior rather than express a view.',
      '',
      '## What belongs here',
      '- Rules the person commits to following',
      '- Operating guidelines and commitments',
      '- Red lines and non-negotiables',
      '- Lessons that have been elevated to firm rules',
      '',
      '## What does not belong here',
      '- Soft opinions (→ belief thread)',
      '- Specific how-to knowledge (→ skill thread)',
      '',
    ].join('\n'),
  },
]

