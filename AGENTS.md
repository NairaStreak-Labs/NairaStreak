# AGENTS.md — NairaStreak Labs AI Agent Guidelines

> **Repository**: `500k-Savings-Challenge` (Working name)  
> **Parent Organization**: NairaStreak Labs  
> **Core Mission**: Build a complete, usable, reliable web product for savings habits before adding advanced features or mobile clients.

---

## 1. Operating Directives & Rules of Engagement

1. **Strict Phased Progression**:
   - Follow the **NairaStreak Labs Web Product Foundation Directive**.
   - Do NOT rush to implement advanced features (e.g. social canvas share, community challenges, bank integrations) until the Web V1 completion gate is passed and explicitly approved.
   - Do NOT commit to Git without explicit user approval.
2. **Original Author Attribution & Deployment Preservation**:
   - Original author: **Zuokemefa Oyinmiebi Peter** (Learn2earn).
   - Original live deployment: `https://500ksavgoal.netlify.app`.
   - **CRITICAL**: Never overwrite, replace, or take over the original deployment or lineage. NairaStreak Labs receives its own new repository, deployment, and brand identity.
3. **Product Naming Discipline**:
   - Organization: `NairaStreak Labs`.
   - Consumer Product Name: **Not yet finalized**.
   - Working title: `500K Challenge`.
   - Keep product branding configurable in code. Do not hardcode "500K" into database tables, column names, API contracts, or architectural abstractions. The long-term product must support arbitrary amounts and multi-goal management.
4. **Primary Product Goal**:
   - Deliver one complete working customer journey:
     `Landing Page -> Sign Up / Log In -> Onboarding -> Create Savings Goal -> Dashboard -> Log Savings -> See Progress -> View History -> Return Later -> Log In -> Continue from Same Data`.
5. **No Homegrown Authentication or Insecure Storage**:
   - Use industry-standard managed auth (Supabase Auth). Never write custom JWT or hashing logic.
   - Enforce database-level Row Level Security (RLS) so users can never read or mutate other users' data.
   - Do not cache auth tokens or private user data in the Service Worker Cache.

---

## 2. Codebase Conventions & Standards

- **Code Quality**: Clean, modular, well-commented code. Separate concerns (UI, Business Logic, Persistence/API, Service Worker).
- **Responsive Layout**: Validated across viewport widths: 375px, 390px, 768px, 1024px, 1440px.
- **Accessibility (a11y)**: Accessible forms with explicit labels, visible focus indicators, ARIA announcements for dynamic progress updates, high-contrast states.
- **Offline / PWA**: Respect offline caching boundaries. Cache app shell assets only; never cache sensitive API endpoints.

---

## 3. Communication Style for Agents

- Concise, professional, structured in GitHub-flavored markdown.
- Always include clickable links (`file:///...`) for modified files and documentation references.
- Document any architectural decisions in `docs/DECISIONS.md`.
