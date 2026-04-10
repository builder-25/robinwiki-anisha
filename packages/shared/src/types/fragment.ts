export interface SearchResult {
  score: number
  path: string
  fragment?: string
  fragmentId?: string
  title?: string
  tags?: string[]
  vaultId?: string
  threadId?: string | null
  frontmatter?: Record<string, unknown>
}
