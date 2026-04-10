export interface RawEntry {
  content: string // raw input text
  source: EntrySource
  metadata?: Record<string, unknown>
}

export type EntrySource = 'mcp' | 'api' | 'web'
export type EntryType = 'transcript' | 'article' | 'thought' | 'podcast' | 'document'

export interface WriteJobPayload {
  userId: string
  rawEntry: RawEntry
  jobId: string
  enqueuedAt: string // ISO 8601
  entryId?: string
  noteFilePath?: string
}

export interface ReindexJobPayload {
  userId: string
  jobId: string
  enqueuedAt: string
}
