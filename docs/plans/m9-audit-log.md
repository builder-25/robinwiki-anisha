# M9: Audit Log Plan

## Current State

### Existing audit infrastructure

**`audit_log` table** (schema.ts L328-333, init migration L28-33)
Minimal operational log with three columns: `id`, `operation` (text), `metadata` (jsonb), `created_at`. No `entity_type`, `entity_id`, `event_type`, `source`, `summary`, or `detail` columns. Used only by:
- `GET /users/activity` — returns last 20 rows as `{ action, time }` pairs
- `DELETE /users/data` — bulk-deletes all rows

The current table is structurally incompatible with the M9 spec. It needs to be replaced, not extended.

**`pipeline_events` table** (schema.ts L307-324)
Per-job observability log for the ingest pipeline. Columns: `entry_key`, `job_id`, `stage`, `status`, `fragment_key`, `metadata`, `created_at`. Emitted throughout extraction/linking via `emitPipelineEvent()`. Has a prune function that deletes completed events after 30 days and failed after 90 days. This is operational telemetry, not audit — it tracks job stages, not user-meaningful events.

**`edits` table** (schema.ts L251-266)
Generalized edit log across object types: `object_type`, `object_id`, `timestamp`, `type`, `content` (previous content), `source` (user/mcp/regen), `diff`. Written by:
- `PUT /content/wiki/:key` — stores previous wiki content on user edit (source: 'user')
- `handleEditWiki` MCP handler — stores previous content (source: 'mcp')
- `regenerateWiki()` — stores previous content on regen (source: 'regen')

This is the closest thing to an audit trail today, but it only covers wiki content changes and stores full previous content blobs rather than structured event metadata.

### Write paths that need audit events

| Path | File | What happens | Audit event(s) needed |
|------|------|--------------|-----------------------|
| `POST /entries` | routes/entries.ts | Entry created, extraction job enqueued | `raw_source.ingested` |
| Extraction worker | queue/worker.ts | Entry processed, fragments created, people extracted | `raw_source.processed`, `fragment.created`, `person.created` |
| Link worker | queue/worker.ts | Fragment classified into wiki, fragment-related edges created | `fragment.classified`, `edge.created` |
| Regen worker | queue/regen-worker.ts + lib/regen.ts | Wiki content regenerated from fragments | `wiki.composed` |
| `PUT /wikis/:id` | routes/wikis.ts | Wiki name/type/prompt updated | `wiki.edited` |
| `PUT /content/:type/:key` | routes/content.ts | Content updated for any object type | `{type}.edited` |
| `POST /wikis/:id/publish` | routes/wikis.ts | Wiki published | `wiki.published` |
| `POST /wikis/:id/unpublish` | routes/wikis.ts | Wiki unpublished | `wiki.unpublished` |
| `POST /wikis/:id/regenerate` | routes/wikis.ts | On-demand wiki regen | `wiki.composed` |
| `PATCH /wikis/:id/bouncer` | routes/wikis.ts | Bouncer mode toggled | `wiki.edited` |
| `PUT /people/:id` | routes/people.ts | Person name/aliases/content updated | `person.edited` |
| MCP `log_entry` | mcp/handlers.ts | Entry created via MCP | `raw_source.ingested` |
| MCP `log_fragment` | mcp/handlers.ts | Fragment created directly to thread | `fragment.created`, `edge.created` |
| MCP `edit_wiki` | mcp/handlers.ts | Wiki content edited via MCP | `wiki.edited` |
| MCP `create_wiki` | mcp/handlers.ts | Wiki created via MCP | `wiki.created` |
| MCP `create_wiki_type` | mcp/handlers.ts | Wiki type created via MCP | `wiki_type.created` |

## Gap Analysis

| M9 Requirement | Current State | Gap |
|----------------|---------------|-----|
| `audit_log` table with M9 schema | Exists with wrong schema (no entity_type, entity_id, event_type, source, summary, detail) | **Migration needed** — ALTER TABLE to add columns or DROP + CREATE |
| Indexes on (entity_type, entity_id), (event_type), (created_at DESC) | None exist | **Migration needed** |
| Events from ingest pipeline | `pipeline_events` tracks job stages but not as audit events | **New code** — emit audit_log rows alongside pipeline events |
| Events from human actions | `edits` table partially covers wiki edits | **New code** — emit audit_log rows from all write routes + MCP handlers |
| `GET /wikis/:id/timeline` | Does not exist | **New route** |
| `GET /audit-log` with filters | Does not exist (`GET /users/activity` reads audit_log but wrong schema) | **New route** (replace /users/activity) |
| MCP `get_timeline` tool | Does not exist | **New MCP tool** |
| Timeline in wiki document viewer | No frontend work scoped (web UI is downstream) | **API only** — frontend is out of scope for server-side M9 |
| Timeline entries searchable | No search integration | **Search extension** — include summary in search scope |

## Tasks

### Phase 1: Schema migration

1. **Alter `audit_log` table** to match M9 spec. Since the existing table has minimal usage and no critical data, the migration can:
   - Add columns: `entity_type` (text NOT NULL DEFAULT ''), `entity_id` (text NOT NULL DEFAULT ''), `event_type` (text NOT NULL DEFAULT ''), `source` (text), `summary` (text NOT NULL DEFAULT ''), `detail` (jsonb)
   - Rename `operation` to keep backward compat or drop it (it maps loosely to `event_type`)
   - Add indexes: `(entity_type, entity_id)`, `(event_type)`, `(created_at DESC)`
   - Migration file: `core/drizzle/migrations/0006_audit_log_m9.sql`

2. **Update Drizzle schema** in `core/src/db/schema.ts`:
   - Replace current `auditLog` definition with M9 columns
   - Add index definitions

3. **Create `core/src/db/audit.ts`** — shared emit function:
   ```ts
   emitAuditEvent(db, { entityType, entityId, eventType, source, summary, detail })
   ```
   Generates ULID for `id`, sets `created_at` to now.

### Phase 2: Event emission — pipeline paths

4. **Extraction worker** (`core/src/queue/worker.ts`):
   - After entry persisted: `raw_source.ingested`
   - After each fragment created: `fragment.created`
   - After person created/resolved: `person.created` / `person.resolved`
   - On extraction failure: `raw_source.failed`

5. **Link worker** (`core/src/queue/worker.ts`):
   - After fragment classified into wiki: `fragment.classified`
   - After FRAGMENT_IN_WIKI edge created: `edge.created`

6. **Regen worker** (`core/src/lib/regen.ts`):
   - After wiki content regenerated: `wiki.composed` with fragment count in detail

### Phase 3: Event emission — human/API paths

7. **Entry routes** (`core/src/routes/entries.ts`):
   - `POST /entries`: `raw_source.ingested` (source: 'api' or 'web')

8. **Wiki routes** (`core/src/routes/wikis.ts`):
   - `PUT /wikis/:id`: `wiki.edited` with changed fields in detail
   - `POST /wikis/:id/publish`: `wiki.published`
   - `POST /wikis/:id/unpublish`: `wiki.unpublished`
   - `POST /wikis/:id/regenerate`: (regen.ts handles the event)
   - `PATCH /wikis/:id/bouncer`: `wiki.edited` with bouncer mode change

9. **Content routes** (`core/src/routes/content.ts`):
   - `PUT /content/:type/:key`: `{type}.edited` (source: 'user')

10. **People routes** (`core/src/routes/people.ts`):
    - `PUT /people/:id`: `person.edited`

11. **MCP handlers** (`core/src/mcp/handlers.ts`):
    - `log_entry`: `raw_source.ingested` (source: 'mcp')
    - `log_fragment`: `fragment.created` (source: 'mcp')
    - `edit_wiki`: `wiki.edited` (source: 'mcp')
    - `create_wiki`: `wiki.created` (source: 'mcp')
    - `create_wiki_type`: `wiki_type.created` (source: 'mcp')

### Phase 4: API endpoints

12. **`GET /wikis/:id/timeline`** — new route in `core/src/routes/wikis.ts`:
    - Query: fragments belonging to this wiki (via FRAGMENT_IN_WIKI edges), then audit_log rows where entity_id IN those fragment keys OR entity_id = wiki key
    - Returns chronological event list with summary, event_type, source, created_at
    - Pagination: cursor-based on created_at

13. **`GET /audit-log`** — new route (new file `core/src/routes/audit.ts` or add to `core/src/routes/admin.ts`):
    - Query params: `entity_type`, `event_type`, `from`, `to`, `limit`, `offset`
    - Returns filtered, paginated audit_log rows
    - Replace the existing `/users/activity` endpoint to read from the new schema

14. **Response schemas** — new file `core/src/schemas/audit.schema.ts`:
    - `auditEventSchema`, `timelineResponseSchema`, `auditLogResponseSchema`

### Phase 5: MCP tool

15. **`get_timeline` MCP tool** in `core/src/mcp/server.ts`:
    - Input: `wikiSlug` (string)
    - Resolves wiki by slug, calls the same query as `GET /wikis/:id/timeline`
    - Returns formatted timeline text for LLM consumption

### Phase 6: Search integration

16. **Include audit summary in search scope**:
    - Option A: Add `audit_log.summary` to the hybrid search in `core/src/lib/search.ts` as an additional table
    - Option B: Add a `search_vector` tsvector column to audit_log with a trigger on summary, then include in the UNION query
    - Option A is simpler for v1; Option B is more performant at scale

### Relationship to existing tables

- **`pipeline_events`**: Keep as-is for operational telemetry (job-level debugging). Audit events are a semantic layer above this. Consider a future task to backfill audit events from pipeline_events for migration continuity.
- **`edits`**: Keep as-is for content versioning (stores full previous content). Audit events reference edits by pointing to the edit ID in `detail.editId` but don't duplicate the content blob.
- **`audit_log` (current)**: Replaced by the new schema. The `/users/activity` endpoint switches to read from the new columns.

## Event Catalog

| entity_type | event_type | source | summary template | detail payload |
|-------------|-----------|--------|------------------|----------------|
| raw_source | ingested | api/mcp/web | "Entry ingested: {title}" | `{ entryKey, source, vaultId }` |
| raw_source | processed | system | "Entry processed: {fragmentCount} fragments" | `{ entryKey, jobId, fragmentCount }` |
| raw_source | failed | system | "Entry processing failed: {error}" | `{ entryKey, jobId, error }` |
| fragment | created | system/mcp | "Fragment created: {title}" | `{ fragmentKey, entryKey, vaultId }` |
| fragment | classified | system | "Fragment classified into {wikiName}" | `{ fragmentKey, wikiKey, wikiName }` |
| wiki | created | mcp/system | "Wiki created: {name}" | `{ wikiKey, type, inferredType }` |
| wiki | composed | system | "Wiki regenerated from {count} fragments" | `{ wikiKey, fragmentCount, previousContentLength }` |
| wiki | edited | user/mcp | "Wiki edited by {source}" | `{ wikiKey, editId, changedFields }` |
| wiki | published | user | "Wiki published: {name}" | `{ wikiKey, publishedSlug }` |
| wiki | unpublished | user | "Wiki unpublished: {name}" | `{ wikiKey }` |
| person | created | system | "Person created: {name}" | `{ personKey, canonicalName }` |
| person | edited | user | "Person edited: {name}" | `{ personKey, changedFields }` |
| edge | created | system | "{srcType} linked to {dstType}" | `{ edgeId, srcType, srcId, dstType, dstId, edgeType }` |
| wiki_type | created | mcp | "Wiki type created: {name}" | `{ slug, name }` |

## Verification

1. **Schema**: Run `npx drizzle-kit generate` and verify migration output matches intent. Run migration against dev DB.
2. **Pipeline events**: Ingest an entry via `POST /entries`, wait for pipeline completion, query `GET /audit-log?entity_type=raw_source` — should show ingested/processed events. Query `GET /audit-log?entity_type=fragment` — should show created/classified events.
3. **Human action events**: Edit a wiki via `PUT /wikis/:id`, query `GET /audit-log?entity_type=wiki&event_type=edited` — should show the edit event.
4. **Timeline**: After ingest populates a wiki, `GET /wikis/:id/timeline` should return chronological events showing when fragments arrived and when the wiki was composed.
5. **MCP**: Call `get_timeline` tool with a wiki slug — should return formatted timeline.
6. **Search**: Search for an audit summary term — should return matching audit events.
7. **Type check**: `npx tsc --noEmit` passes.
8. **Lint**: `npx eslint . --quiet` passes (if configured).
