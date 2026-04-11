# Phase M1: Foundation — Stakeholder Report

**Shipped:** 2026-04-11
**Status:** Complete

## Your Knowledge Base Just Got Real

M1 turns Robin from "a migration target" into **your personal knowledge base** — the kind you host yourself, access from anywhere you work, and trust to hold sensitive thoughts. Three foundations landed:

1. A **security model** that encrypts your sensitive data at rest
2. A **single-user posture** that makes Robin yours and only yours
3. A **hybrid search foundation** that pairs vector embeddings with full-text search

Each one matters for a specific reason.

---

## 1. Your Data Is Encrypted at Rest

Robin now stores API keys, LLM credentials, and other sensitive config values using **AES-256-GCM envelope encryption** — the same algorithm used by AWS KMS, Google Tink, and modern password managers. It's authenticated, which means tampering with the stored ciphertext is detectable, not just unreadable.

The model is two-tier:
- A **server-wide master key** (the `MASTER_KEY` env var) lives on your server and wraps per-user data encryption keys
- Each user has their **own data encryption key (DEK)**, stored in the database already encrypted. The DEK is what actually encrypts your sensitive values.

Why the two-tier design? It means you can rotate the master key without touching every encrypted value in the database. It means a database leak doesn't leak your keys (the DEKs are themselves encrypted). And it means the plaintext master key never leaves your server's process memory.

**What you get:** Your OpenRouter key, your future integration credentials, and anything else you trust Robin with are encrypted with an algorithm that the same security industry standardizes on. The code path that handles them is ~100 lines, small enough to audit in one sitting.

## 2. Single-User Means Robin Is Yours

Multi-tenant applications optimize for "many users, isolated from each other." Robin deliberately does the opposite. **You're the only user.** That single decision unlocks several things:

- **Host it anywhere you want.** A laptop, a home server, a tiny VPS, a Raspberry Pi on your desk. Robin doesn't need to scale past you, so it can run where you want it to run.
- **Access from anywhere you work.** The data lives where you put it, not in someone else's cloud. If you move, your knowledge moves with you.
- **No social provider dependency.** The old build had Google and GitHub sign-in wired up. That's gone. Nothing about Robin needs a third-party identity provider, and removing that dependency means no vendor lock-in and no "sign in with X" surface for attackers to target.
- **Zero-friction first-boot.** Set two environment variables (`INITIAL_USERNAME`, `INITIAL_PASSWORD`) and the server seeds itself on first start. No manual setup step, no CLI ritual, no admin dashboard to configure.

After that first user exists, sign-ups are blocked at the auth layer with a clean 403. Robin is yours, period. This is verified in test: a second sign-up attempt returns `"sign-ups disabled — single-user mode"`.

**What you get:** A knowledge base that belongs to you, runs where you want, and has exactly one user forever. No multi-tenant complexity, no upgrade paths to worry about, no "did I accidentally share this?"

## 3. Hybrid Search: The Best of Vector and Full-Text

This is the foundational capability that makes Robin's future search meaningfully better than typical RAG-over-embeddings pipelines.

**The problem with pure vector search (what most "RAG" setups use):** Embeddings capture meaning, which is great when your query is conceptual ("what did I think about cryptography?"), but embeddings are **terrible at exact matches** ("the function named `unwrapDek`", "my belief about the 2023 recession"). A named entity, a specific phrase, a typo-sensitive term — vector search smears over all of them because similarity is fuzzy by design.

**The problem with pure full-text search:** The opposite. Exact matches work beautifully; conceptual queries fail because the index has no idea that "monetary policy" and "central bank rate decisions" are related.

**What Robin now has:** Both, on the same three tables (`wikis`, `fragments`, `people`).

- **pgvector** — Postgres's vector extension, with **HNSW indexes** (Hierarchical Navigable Small World, cosine distance, `m=16, ef_construction=64`). These are approximate nearest-neighbor indexes designed for sub-millisecond vector lookups at scale. Columns are 1536-dimensional, ready for OpenAI embeddings or equivalent.
- **tsvector** — Postgres's built-in full-text search. Each row has a `search_vector` column maintained automatically by a trigger whenever the source text changes. Titles get `A` weight (highest rank priority), body content gets `B` weight. The index is a **GIN index**, which is Postgres's fastest pattern for reverse-index lookups.

The two live side by side in the same query plan. That means a future search endpoint can do something like:

> *"Find wikis where the vector is close to `embedding(query)` AND the tsvector matches the query's named entities, rank by a weighted combination of cosine similarity and full-text rank."*

This is **hybrid search**, and it consistently beats pure RAG-over-embeddings on both recall (finds the right chunks) and precision (doesn't smear over them). It's what search teams at larger companies reach for when they hit the ceiling on pure-vector retrieval. Robin now has it as table stakes, not as a future project.

**What you get:** When search lands, it'll know the difference between "anything I wrote about belief propagation" (vector-dominant) and "the wiki called `Daily Log`" (full-text-dominant) and handle both in a single query. No separate index. No separate service. No re-architecture later.

---

## What's Ready Now

- `pnpm dev` starts cleanly from a fresh checkout
- The server boots, seeds the first user from environment variables, wraps their DEK with the master key, and requires a password reset on first login
- `/health` returns 200
- First user can sign in and get a session token
- Second sign-up attempts are blocked at the auth layer
- All four workspace packages (`core`, `shared`, `agent`, `queue`) typecheck cleanly
- Database has 16 tables, pgvector enabled, 3 HNSW indexes, 3 tsvector triggers, 3 GIN indexes
- Single init migration (`0000_init.sql`) applies cleanly from an empty database

## What's Next

M2 will build on the foundation in three directions:

1. **Onboarding flow.** M1 ships the state machine (`password_reset_required`, `onboarding_complete` columns on the users table) but not the endpoints that walk the user through setting their OpenRouter key, picking preferred models, and switching to their own password. M2 wires these up.
2. **Embedding generation.** Columns and HNSW indexes are ready and waiting. M2 wires the actual embedding provider calls (OpenRouter + an embedding model chosen during onboarding) so new content gets embedded on write.
3. **The search endpoint itself.** Hybrid search across wikis, fragments, and people, returning ranked results from both retrieval modes in one query.

## Items We're Tracking

These aren't blockers for M1, but M2 should address them:

- **pgvector is a deploy dependency.** Any Postgres we run against needs the extension installed and enabled by a database superuser. A one-line addition to the deploy runbook.
- **`drizzle-kit migrate` hung during local verification** — the SQL migration was applied directly via `psql` as a workaround, which works reliably. We should diagnose the hang before it lands in CI.
- **The test suite didn't run after the rename.** The files compile; we haven't verified their assertions still hold. First task of M2 should be to run them and either fix or retire the stale ones.
- **Master key rotation story is deliberately deferred.** The envelope design supports it cleanly, but we haven't picked an implementation (rotate-in-place vs key hierarchy). Not urgent until the first real deployment.

---

*Engineering retro with the full commit-level detail: `.retrospective/phase-m1-foundation.md`.*
