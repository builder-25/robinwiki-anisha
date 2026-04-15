# M8: Deploy & Ship Plan

## Current State

### What exists

- **Server**: Hono-based Node.js app in `core/` with `pnpm start` (`node dist/index.js`) and `pnpm dev` (`tsx watch src/index.ts`)
- **Build**: Turborepo orchestrates `pnpm build` across 4 workspace packages (`@robin/agent`, `@robin/queue`, `@robin/shared`, `@robin/caslock`) before building `core/`
- **Database**: Postgres with pgvector. Schema managed by Drizzle ORM with 6 migrations in `core/drizzle/migrations/`. Schema push via `drizzle-kit push`; `drizzle-kit migrate` has a known hang issue (see M1 retro)
- **Queue**: BullMQ workers (extraction, link, regen) running in-process via `startWorkers()` in `core/src/queue/worker.ts`, backed by Redis/ioredis
- **Bootstrap**: Server auto-seeds first user from `INITIAL_USERNAME`/`INITIAL_PASSWORD` env vars on empty DB, loads `MASTER_KEY`, checks for `OPENROUTER_API_KEY`
- **Health check**: `GET /health` returns `{ status: "ok", timestamp }` -- already exists
- **Env vars**: Documented in `core/.env.example` (12 vars: PORT, APP_URL, CORS_ORIGIN, DATABASE_URL, REDIS_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL, MASTER_KEY, INITIAL_USERNAME, INITIAL_PASSWORD, OPENROUTER_API_KEY, ROBIN_MODEL)

### What does NOT exist

- No Dockerfile
- No Docker Compose
- No CI/CD pipeline (no `.github/workflows/`)
- No Railway/Render/Neon deploy templates
- No production migration runner (only `drizzle-kit push` which is dev-only)
- No `.dockerignore`
- No `NODE_ENV` handling or production hardening

### Key tension: Redis

The M8 issue says "No Redis, no separate worker process" for the deployment story. However, the current codebase uses BullMQ + Redis for the ingest pipeline queue (`@robin/queue` package, `ioredis` connection). The workers already run in-process (not a separate process), but Redis is still a required dependency.

**Decision needed**: Either (a) replace BullMQ with a Postgres-backed queue (e.g., pgboss, or a simple polling table) to eliminate Redis entirely, or (b) keep Redis but make it optional/embedded for Docker Compose. Option (a) is the correct long-term play per the issue's intent but is a larger change that may belong in a pre-M8 milestone.

This plan assumes **option (b) for M8 scope**: bundle Redis in Docker Compose, keep the BullMQ queue, and note the Redis-removal as a follow-up. If the intent is to remove Redis in M8, that should be scoped as a separate phase.

---

## Tasks

### Phase 1: Production migration runner

The `drizzle-kit migrate` command hangs (known issue from M1). We need a reliable migration strategy for production.

- [ ] Create `core/scripts/migrate.ts` that applies SQL migration files in order using the `postgres` driver directly (read `core/drizzle/migrations/meta/_journal.json` for ordering, apply each `.sql` file, track applied migrations in a `__drizzle_migrations` table)
- [ ] Alternatively, use `drizzle-kit push --force` for schema sync (simpler, but destructive on schema changes). Evaluate tradeoff.
- [ ] Add `"db:migrate": "tsx scripts/migrate.ts"` to `core/package.json`
- [ ] Test: run migrate against a fresh Postgres, verify all tables + pgvector extension created

### Phase 2: Dockerfile

Single multi-stage Dockerfile at repo root.

- [ ] **Stage 1 (deps)**: `node:22-slim`, install pnpm, copy lockfile + workspace configs, `pnpm install --frozen-lockfile`
- [ ] **Stage 2 (build)**: Copy source, `pnpm build` (turborepo builds all packages then core)
- [ ] **Stage 3 (runtime)**: `node:22-slim`, copy built `dist/` from all packages + `core/`, copy `node_modules` (production only), copy migration files. Entry: `node core/dist/index.js`
- [ ] Create `.dockerignore`: `node_modules`, `.git`, `.turbo`, `.planning`, `.claude`, `.retrospective`, `*.md` (except migrations), `.env`
- [ ] Verify: `docker build -t robin .` succeeds, image size is reasonable (<500MB target)

Key considerations:
- pnpm workspace symlinks need to resolve correctly in the runtime stage. Use `pnpm deploy` or copy the full `node_modules` with `--prod` filter.
- `core/openapi.yaml` must be included (loaded at runtime via `readFileSync`)
- The `drizzle/migrations/` directory must be included for the migration runner

### Phase 3: Docker Compose (local self-hosted)

`docker-compose.yml` at repo root for the "bring your own Postgres" self-hosted story, plus the full-stack dev experience.

- [ ] Services: `robin` (the app), `postgres` (postgres:16 with pgvector via `pgvector/pgvector:pg16`), `redis` (redis:7-alpine)
- [ ] Postgres volume for data persistence
- [ ] Init script or healthcheck that waits for Postgres to be ready, then runs migrations
- [ ] Environment variables via `.env` file with sane defaults
- [ ] `docker compose up` boots everything, runs migrations, seeds first user
- [ ] Add `depends_on` with health checks so robin waits for postgres + redis
- [ ] Document: `cp .env.example .env`, edit credentials, `docker compose up`

### Phase 4: Startup migration hook

Make the server run migrations automatically on boot (before seeding the first user).

- [ ] In `core/src/index.ts`, add a `runMigrations()` call before `seedFirstUser()` that applies pending migrations
- [ ] Guard with `NODE_ENV !== 'test'` so tests still use `drizzle-kit push`
- [ ] This means the Docker image is fully self-bootstrapping: boot it with a DATABASE_URL and it handles the rest

### Phase 5: Railway deploy template

- [ ] Create `railway.toml` at repo root:
  ```toml
  [build]
  builder = "dockerfile"
  dockerfilePath = "Dockerfile"

  [deploy]
  healthcheckPath = "/health"
  healthcheckTimeout = 30
  restartPolicyType = "on_failure"
  ```
- [ ] Create `railway.json` (template metadata) with required env vars and Postgres plugin
- [ ] Document required env vars that Railway must set (DATABASE_URL auto-provided by Postgres plugin, user must set: MASTER_KEY, BETTER_AUTH_SECRET, INITIAL_USERNAME, INITIAL_PASSWORD, OPENROUTER_API_KEY)
- [ ] Add "Deploy on Railway" button to README

### Phase 6: Render blueprint

- [ ] Create `render.yaml` at repo root:
  ```yaml
  services:
    - type: web
      name: robin
      runtime: docker
      healthCheckPath: /health
      envVars:
        - key: DATABASE_URL
          fromDatabase:
            name: robin-db
            property: connectionString
        - key: PORT
          value: "3000"
        # ... other required vars as sync: false (user-provided)
  databases:
    - name: robin-db
      plan: starter
      postgresMajorVersion: "16"
      ipAllowList: []
  ```
- [ ] Note: Render's managed Postgres does not include pgvector by default. Document that users need to run `CREATE EXTENSION IF NOT EXISTS vector` manually, or use an external Postgres (Neon/Supabase) that includes it.
- [ ] Add "Deploy to Render" button to README

### Phase 7: Neon instructions

Neon is a Postgres provider, not an app host. This is documentation, not a template.

- [ ] Document in README: "Using Neon for Postgres"
  - Create a Neon project, enable pgvector extension
  - Copy the connection string as DATABASE_URL
  - Deploy Robin on Railway/Render/Docker with the Neon DATABASE_URL
- [ ] Verify pgvector works on Neon's free tier (it does -- pgvector is built in)

### Phase 8: README setup instructions

- [ ] Rewrite README.md with:
  - One-sentence description: "AI-powered second brain that captures thoughts and structures them into searchable knowledge"
  - Quick start: Docker Compose (5 steps: clone, copy env, edit env, docker compose up, open browser)
  - Platform deploys: Railway (one-click), Render (blueprint), Neon + any host
  - Environment variable reference table (var, required, description, default)
  - Architecture diagram (text): user -> Robin server -> Postgres (data + vectors) + Redis (job queue) -> OpenRouter (LLM)
  - Development setup for contributors
- [ ] Keep it concise. The goal is "deploy in under 5 minutes."

---

## Verification

| Check | Command / method |
|-------|-----------------|
| Docker build succeeds | `docker build -t robin .` |
| Docker Compose boots clean | `docker compose up -d && curl localhost:3000/health` |
| Migrations run on fresh DB | Wipe postgres volume, `docker compose up`, check tables exist |
| First user seeded | After boot, sign in with INITIAL_USERNAME/INITIAL_PASSWORD |
| Ingest pipeline works | POST an entry, verify extraction + linking jobs complete |
| Railway template valid | `railway init` from template, deploy to staging |
| Render blueprint valid | Push to Render, verify auto-deploy |
| Image size acceptable | `docker images robin` -- target <500MB |
| Health check responds | `curl /health` returns 200 with JSON |
| Graceful shutdown | `docker compose stop` -- no error logs, clean exit |

---

## Open Questions

1. **Redis removal**: Should M8 include replacing BullMQ/Redis with a Postgres-backed queue? The issue says "no Redis" but that's a significant refactor. Recommendation: do it in a pre-M8 phase (M7.x) or accept Redis as a deployment dependency for now.
2. **pgvector on managed Postgres**: Railway's Postgres plugin and Render's managed Postgres may not include pgvector. Need to verify and document workarounds (use Neon, or run CREATE EXTENSION manually).
3. **Migration strategy**: `drizzle-kit push` (simple, schema-sync) vs. custom migration runner (reliable, ordered SQL files). Push is fine for single-user self-hosted; ordered migrations are better for upgrades.
4. **HTTPS/TLS**: Railway and Render handle TLS termination. Docker Compose users need a reverse proxy (nginx, Caddy). Document but don't solve in M8.
5. **Secrets generation**: Should `docker compose up` auto-generate MASTER_KEY and BETTER_AUTH_SECRET if not set? Reduces friction but adds complexity.
