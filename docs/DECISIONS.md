# Architecture Decision Records (ADR)

> **Parent Organization**: NairaStreak Labs  
> **Status**: Official Engineering Decisions

---

## ADR 001: Decoupling Parent Organization from Product Name
- **Context**: The inherited project was called "500K Savings Challenge", tailored to ₦500k. The parent organization is **NairaStreak Labs**, but the consumer product name will be selected separately.
- **Decision**: Decouple organization branding (`NairaStreak Labs`) from product titles. Use `500K Challenge` solely as a temporary working title. Never hardcode "500K" into database schemas, table names, API contracts, or architectural abstractions.
- **Consequences**: Enables multi-goal tracking and future white-labeling or rebranding without database migrations.

---

## ADR 002: Selection of Supabase for Auth & Persistence
- **Context**: Web V1 requires real user authentication (sign up, login, password recovery), cross-user data isolation, and persistent cloud storage, while planning for future mobile clients.
- **Decision**: Adopt **Supabase** (GoTrue Auth + PostgreSQL + Row Level Security). Reject homegrown JWT/password auth.
- **Consequences**:
  - Eliminates security vulnerabilities of homegrown authentication.
  - Guarantees database-level tenant isolation via PostgreSQL RLS.
  - Zero server management overhead; instant compatibility with future React Native, Flutter, or native mobile clients.

---

## ADR 003: Vanilla ES Modules vs Heavy Frontend Frameworks
- **Context**: The existing prototype is built in vanilla HTML/CSS/JS. We need to decide whether to rewrite in React/Next.js/Vue or modularize vanilla JavaScript.
- **Decision**: Keep the Web V1 implementation in **modular vanilla JavaScript (ES6 Modules)** with lightweight CSS components.
- **Consequences**:
  - Instant page load times (< 50 KB initial payload).
  - No complex build pipelines or bundler lock-in for V1.
  - Easy to deploy on static CDN (Netlify) with zero runtime server costs.
  - If a framework is chosen later, the business logic and database contracts are already decoupled.

---

## ADR 004: Service Worker Caching & Auth Token Isolation
- **Context**: PWAs use Service Workers to cache resources. Storing dynamic API calls or authentication headers in Cache Storage can lead to critical data leakage between users or stale auth state.
- **Decision**: The Service Worker will cache **app shell assets only** (HTML, CSS, static JS, images). It will unconditionally bypass all requests to `*.supabase.co` and any request containing Authorization headers.
- **Consequences**: Guarantees that private user data and auth tokens are never stored in browser cache storage.

---

## ADR 005: Decoupled Deployment & Original Lineage Preservation
- **Context**: The original author deployed the prototype at `https://500ksavgoal.netlify.app`.
- **Decision**: Never overwrite or redeploy over `https://500ksavgoal.netlify.app`. Create an entirely new Netlify site instance (e.g. `nairastreak-web.netlify.app`) for NairaStreak Labs.
- **Consequences**: Protects the historical artifact and educational portfolio of the original author while giving NairaStreak Labs independent production infrastructure.

---

## ADR 006: Mobile Client Development Deferred Post-Web V1
- **Context**: Pressure to build native mobile apps early.
- **Decision**: Explicitly defer all native mobile app development until Web V1 passes its completion gate.
- **Consequences**: Concentrates engineering focus on perfecting the core customer journey and API data contracts first.
