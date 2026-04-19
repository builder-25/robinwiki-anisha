---
phase: deploy-fixes
plan: 01
subsystem: api
tags: [gateway-cleanup, drizzle-migrations, bullmq, ed25519-keypair, provision-worker]

# Dependency graph
requires: []
provides:
  - "Zero gateway references in production code and tests"
  - "Drizzle migration runner (runMigrations) called from JIT provision"
  - "Provision worker generating Ed25519 keypairs via BullMQ"
  - "ProvisionJob interface with userId field"
affects: [deploy-fixes-02, deploy-fixes-03]

# Tech tracking
tech-stack:
  added: [drizzle-orm/postgres-js/migrator]
  patterns: [migration-on-first-use, fire-and-forget-queue-enqueue]

key-files:
  created:
    - core/src/bootstrap/run-migrations.ts
  modified:
    - core/src/queue/worker.ts
    - core/src/bootstrap/jit-provision.ts
    - core/src/auth.ts
    - packages/queue/src/index.ts
    - turbo.json
    - CLAUDE.md
    - core/src/__tests__/provision-worker.test.ts
    - core/src/__tests__/content-write.test.ts
    - core/src/__tests__/content-read.test.ts
    - core/src/__tests__/wiki-update.test.ts

key-decisions:
  - "Migration runner reads journal before/after to log which migrations were applied"
  - "Provision enqueue in jit-provision.ts is fire-and-forget with .catch() log"
  - "Test files rewritten to match post-M2 DB-only routes (gateway mocks fully removed)"

patterns-established:
  - "Migration-on-first-use: runMigrations() called in ensureFirstUser before DB queries"
  - "Provision worker pattern: query user, skip if keypair exists, generate if not, update DB"

requirements-completed: [DF-GATEWAY, DF-MIGRATE, DF-PROVISION]

# Metrics
duration: 10min
completed: 2026-04-19
---

# Phase deploy-fixes Plan 01: Gateway Cleanup, Migration Runner, and Provision Worker Summary

**Removed all gateway references from code/tests, added Drizzle migration runner to JIT provision, implemented Ed25519 keypair provision worker via BullMQ**

## Performance

- **Duration:** 10 min
- **Started:** 2026-04-19T08:47:23Z
- **Completed:** 2026-04-19T08:57:17Z
- **Tasks:** 3
- **Files modified:** 15 (4 deleted, 1 created, 10 modified)

## Accomplishments
- Zero gateway references remain in production code and test files (gateway-client.test.ts, internal.ts, internal.test.ts, internal.schema.ts deleted; gateway mocks removed from 3 test files)
- Drizzle migration runner created and wired into JIT provision -- runs pending migrations before first user creation, logs results, idempotent on repeated calls
- Provision worker implemented in worker.ts -- queries user by ID, generates Ed25519 keypair via generateKeypair(), updates publicKey + encryptedPrivateKey in DB, skips if keypair already exists
- ProvisionJob interface updated with required userId field; all consumers (auth.ts, jit-provision.ts) updated
- All 21 tests pass across 4 modified test files; TypeScript compilation clean for core and queue packages

## Task Commits

Each task was committed atomically:

1. **Task 1: Gateway cleanup** - `e7db31e` (fix) + `874f582` (fix)
   - Deleted gateway-client.test.ts, internal.ts, internal.test.ts, internal.schema.ts
   - Removed gateway mocks from content-write, content-read, wiki-update tests
   - Removed build:gateway from turbo.json, updated CLAUDE.md
2. **Task 2: Migration runner + provision worker (TDD)**
   - RED: `03d2b96` (test) - failing tests for processProvisionJob
   - GREEN: `89be12e` (feat) - implementation of run-migrations.ts, processProvisionJob, JIT wiring
   - REFACTOR: `dbb77b7` (style) - biome formatting fixes
3. **Task 3: Full verification** - no commit (verification-only task, all checks pass)

## Files Created/Modified

**Deleted:**
- `core/src/__tests__/gateway-client.test.ts` - Tests for deleted gateway module
- `core/src/routes/internal.ts` - Dormant sync-notify webhook referencing gateway
- `core/src/routes/internal.test.ts` - Tests for deleted internal route
- `core/src/schemas/internal.schema.ts` - Schemas for deleted internal route

**Created:**
- `core/src/bootstrap/run-migrations.ts` - Drizzle migration runner with journal-based logging

**Modified:**
- `core/src/queue/worker.ts` - Added processProvisionJob + provision worker registration in startWorkers()
- `core/src/bootstrap/jit-provision.ts` - Added runMigrations() call + enqueueProvision after user creation
- `core/src/auth.ts` - Added userId to enqueueProvision payload
- `packages/queue/src/index.ts` - Added userId: string to ProvisionJob interface
- `core/src/__tests__/provision-worker.test.ts` - Rewritten without gateway mocks, 5 tests
- `core/src/__tests__/content-write.test.ts` - Removed gateway mocks, tests match DB-only routes
- `core/src/__tests__/content-read.test.ts` - Removed gateway mocks, tests match DB-only routes
- `core/src/__tests__/wiki-update.test.ts` - Removed gateway mocks and gateway-failure test
- `turbo.json` - Removed build:gateway task
- `CLAUDE.md` - Removed gateway facade description and constraint

## Decisions Made
- Migration runner reads the Drizzle journal file and queries __drizzle_migrations table before/after to determine and log exactly which migrations were applied
- Provision job enqueue in jit-provision.ts uses fire-and-forget pattern (.then/.catch) matching the existing pattern in auth.ts
- Content test files were substantially rewritten (not just mock removal) because production routes changed from gateway-backed to DB-only in M2; old test assertions were testing dead code paths

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Test files needed full rewrite, not just mock removal**
- **Found during:** Task 1 (Gateway cleanup)
- **Issue:** content-write, content-read, and wiki-update tests had assertions on mockWrite/mockRead (gateway calls) that the production code no longer makes. Simply removing the mock blocks would leave broken assertions.
- **Fix:** Rewrote test suites to test the actual DB-only content routes, removed gateway-specific test cases entirely (e.g., "writes assembled markdown to gateway", "returns 200 when gateway write fails")
- **Files modified:** content-write.test.ts, content-read.test.ts, wiki-update.test.ts
- **Committed in:** e7db31e

**2. [Rule 3 - Blocking] Queue package dist rebuild required for type resolution**
- **Found during:** Task 2 (TypeScript compilation)
- **Issue:** After adding userId to ProvisionJob source, tsc failed because core resolves types from @robin/queue dist output (not source). Stale dist had no userId field.
- **Fix:** Ran `npx tsdown` in packages/queue to rebuild dist. Dist is gitignored so only source commit needed.
- **Committed in:** N/A (build artifact, not committed)

---

**Total deviations:** 2 auto-fixed (1 bug, 1 blocking)
**Impact on plan:** Both auto-fixes necessary for correctness. Test rewrites reflect actual production behavior. No scope creep.

## Issues Encountered
- Pre-existing test failures: 7 test files (dedup, mcp-log-entry, mcp-log-fragment, mcp-resolvers, schema, wiki-lookup, locking) fail due to requiring a real PostgreSQL database connection. These are integration tests unrelated to this plan's changes.
- Pre-existing biome errors: 99 lint errors across the codebase (mostly import ordering). Fixed only in files created by this plan.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Gateway fully excised from codebase -- no stale references remain
- Migration runner ready for use by any bootstrap path
- Provision worker generates keypairs for new users -- MCP JWT signing now has key material
- ProvisionJob.userId enables per-user provision tracking

## Self-Check: PASSED

All created files exist, all deleted files confirmed removed, all commits found in history, all key content verified in target files.

---
*Phase: deploy-fixes*
*Completed: 2026-04-19*
