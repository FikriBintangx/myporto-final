# FIKRI BINTANG PURNOMO
Backend Developer | Go · Python · PostgreSQL · Redis
github.com/FikriBintangx · fikribintang.web.id · [EMAIL] · [PHONE] · [CITY], Indonesia

## SUMMARY
Backend developer focused on high-throughput APIs, PostgreSQL performance, and concurrent services in Go and Node.js. Built a gRPC vs REST benchmark engine that cut P99 latency by 71.6% at 10,000+ req/sec, a pgvector semantic-search pipeline with async indexing workers, and a Redis-backed auth gateway. Prefers measuring before optimizing.

## TECHNICAL SKILLS
- **Languages:** Go, Python (FastAPI, Flask), TypeScript / Node.js, SQL
- **Backend & Messaging:** REST, gRPC + Protocol Buffers, RabbitMQ, Kafka, event-driven architecture, worker queues
- **Databases & Caching:** PostgreSQL (indexing, EXPLAIN ANALYZE tuning, connection pooling, pgvector), Redis (caching, sliding-window rate limiting, pub/sub), MongoDB, Supabase
- **Infrastructure:** Docker, Linux, Nginx, GitHub Actions CI/CD, Cloudflare Workers, Vercel, Zero Trust access
- **Testing & Observability:** load testing (k6 / wrk), P50/P95/P99 latency profiling, structured logging

## PROJECTS

**SmartOps Dual-Engine — gRPC vs REST Benchmark** | Go, Node.js, gRPC, Protobuf, Docker
- Cut P99 latency by 71.6% under 10,000+ req/sec concurrent load by moving the hot path from JSON/REST to gRPC with Protocol Buffers and persistent connection reuse.
- Built a reproducible benchmark harness that runs both engines against identical payloads and reports P50/P95/P99 and throughput per run.
- Containerized both services with Docker so results are comparable across machines.

**JurnalKu AI & NotesBrain — Semantic Search Backend** | Python, FastAPI, PostgreSQL + pgvector, worker queue
- Kept API response times flat while indexing thousands of papers and documents by moving embedding and indexing into asynchronous worker queues off the HTTP request path.
- Implemented vector similarity search with pgvector in PostgreSQL, so semantic and relational queries share one database instead of a separate vector store.
- Added idempotent job handling so failed indexing jobs retry without creating duplicate records.

**Gatekeeper — Auth & Reverse-Proxy Gateway** | Go / Node.js, Redis, Nginx
- Blocked abusive traffic per client without penalizing normal users by implementing Redis sliding-window rate limiting in a reverse-proxy middleware.
- Closed timing side channels in credential checks by using constant-time comparison for tokens and secrets.
- Built a token rotation pipeline (short-lived access + rotating refresh tokens) with revocation of reused refresh tokens.

**Wahana Mobile API & Admin Backoffice** | Node.js, Express, SQL, REST
- Reduced query overhead by 40% by removing redundant JOINs and adding targeted indexes on the relational schema behind the admin backoffice.
- Standardized secure REST endpoints (input validation, consistent error format, auth middleware) shared by the mobile app and admin dashboard.

## EDUCATION
**[UNIVERSITY]** — [DEGREE], [MAJOR] | [YEAR – YEAR]
