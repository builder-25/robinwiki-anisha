import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Hono } from 'hono'

// ── Mocks ────────────────────────────────────────────────────────────────

const mockDbSelect = vi.fn()
const mockDbUpdate = vi.fn()
const mockDbInsert = vi.fn()
const mockDbExecute = vi.fn()

vi.mock('../db/client.js', () => ({
  db: {
    select: (...args: unknown[]) => mockDbSelect(...args),
    update: (...args: unknown[]) => mockDbUpdate(...args),
    insert: (...args: unknown[]) => mockDbInsert(...args),
    execute: (...args: unknown[]) => mockDbExecute(...args),
  },
}))

vi.mock('../db/schema.js', () => ({
  entries: {
    lookupKey: 'entries.lookup_key',
    deletedAt: 'entries.deleted_at',
    title: 'entries.title',
  },
  fragments: {
    lookupKey: 'fragments.lookup_key',
    deletedAt: 'fragments.deleted_at',
    title: 'fragments.title',
    tags: 'fragments.tags',
  },
  wikis: {
    lookupKey: 'wikis.lookup_key',
    deletedAt: 'wikis.deleted_at',
    name: 'wikis.name',
    type: 'wikis.type',
    prompt: 'wikis.prompt',
    content: 'wikis.content',
  },
  people: {
    lookupKey: 'people.lookup_key',
    deletedAt: 'people.deleted_at',
    name: 'people.name',
    relationship: 'people.relationship',
  },
  edges: {},
  edits: {},
}))

vi.mock('../middleware/session.js', () => ({
  sessionMiddleware: vi.fn(async (c: any, next: any) => {
    c.set('userId', 'test-user-123')
    await next()
  }),
}))

vi.mock('../lib/wiki-lookup.js', () => ({
  createWikiLookupFn: () => async () => null,
}))

vi.mock('../lib/logger.js', () => ({
  logger: {
    child: () => ({
      info: vi.fn(),
      warn: vi.fn(),
      debug: vi.fn(),
      error: vi.fn(),
    }),
  },
}))

vi.mock('../db/audit.js', () => ({
  emitAuditEvent: vi.fn().mockResolvedValue(undefined),
}))

// Import after mocks
import { contentRoutes } from '../routes/content.js'

// ── Test setup ───────────────────────────────────────────────────────────

function createApp() {
  const app = new Hono()
  app.route('/api/content', contentRoutes)
  return app
}

function chainMock(finalValue: unknown) {
  const chain: Record<string, any> = {}
  chain.from = vi.fn().mockReturnValue(chain)
  chain.where = vi.fn().mockReturnValue(chain)
  chain.limit = vi.fn().mockResolvedValue(finalValue)
  chain.set = vi.fn().mockReturnValue(chain)
  return chain
}

describe('Content Read API (EDIT-01)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET /api/content/:type/:key', () => {
    it('returns 400 for invalid content type', async () => {
      const app = createApp()
      const res = await app.request('/api/content/invalid/key-123')
      expect(res.status).toBe(400)
      const json = await res.json()
      expect(json.error).toContain('Invalid content type')
    })

    it('returns 404 when object does not exist', async () => {
      const chain = chainMock([])
      mockDbSelect.mockReturnValue(chain)
      const app = createApp()
      const res = await app.request('/api/content/wiki/key-123')
      expect(res.status).toBe(404)
    })

    it('returns content from DB row', async () => {
      const chain = chainMock([
        { lookupKey: 'key-123', deletedAt: null, content: 'Hello world' },
      ])
      mockDbSelect.mockReturnValue(chain)
      const app = createApp()
      const res = await app.request('/api/content/wiki/key-123')
      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json.content).toBe('Hello world')
    })

    it('returns structured response when ?format=structured', async () => {
      const chain = chainMock([
        { lookupKey: 'key-123', deletedAt: null, content: 'Body text here' },
      ])
      mockDbSelect.mockReturnValue(chain)
      const app = createApp()
      const res = await app.request('/api/content/wiki/key-123?format=structured')
      expect(res.status).toBe(200)
      const json = await res.json()
      expect(json.body).toBe('Body text here')
      expect(json.raw).toBe('Body text here')
    })

    it('applies defaults for missing frontmatter fields (wikiLinks, brokenLinks, tags)', async () => {
      const chain = chainMock([
        { lookupKey: 'key-123', deletedAt: null, content: 'Body' },
      ])
      mockDbSelect.mockReturnValue(chain)
      const app = createApp()
      const res = await app.request('/api/content/wiki/key-123?format=structured')
      const json = await res.json()
      expect(json.frontmatter.wikiLinks).toEqual([])
      expect(json.frontmatter.brokenLinks).toEqual([])
      expect(json.frontmatter.tags).toEqual([])
    })

    it('requires authenticated session', async () => {
      const chain = chainMock([
        { lookupKey: 'key-123', deletedAt: null, content: 'Body' },
      ])
      mockDbSelect.mockReturnValue(chain)
      const app = createApp()
      const res = await app.request('/api/content/wiki/key-123')
      expect(res.status).toBe(200)
    })
  })
})
