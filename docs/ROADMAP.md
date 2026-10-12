# Product Roadmap — NairaStreak Labs

> **Parent Organization**: NairaStreak Labs  
> **Horizon**: Web V1 Foundation through Post-V1 Expansion

---

## 1. Roadmap Overview & Phasing

```mermaid
gantt
    title NairaStreak Labs Execution Phases
    dateFormat  YYYY-MM-DD
    section Phase 0 & Foundation
    Phase 0: Discovery & Documentation :done, p0, 2026-10-12, 2026-10-13
    Phase 1: Product Naming Evaluation :active, p1, 2026-10-13, 2026-10-15
    Phase 2: Brand Identity Design System :p2, 2026-10-15, 2026-10-17
    section Web V1 Core Journey
    Phase 3: Public Storytelling Landing Page :p3, 2026-10-17, 2026-10-20
    Phase 4: Supabase Authentication Integration :p4, 2026-10-20, 2026-10-22
    Phase 5: Cloud Data Model & RLS Migration :p5, 2026-10-22, 2026-10-24
    Phase 6: Onboarding Wizard :p6, 2026-10-24, 2026-10-26
    Phase 7-9: Core Dashboard, Logging & History :p7, 2026-10-26, 2026-10-30
    Phase 10-12: Settings, PWA Hardening & Features :p8, 2026-10-30, 2026-11-03
    section Quality & Deployment
    Phase 13-15: Responsive, a11y & Testing Gate :p9, 2026-11-03, 2026-11-06
    Phase 16: Independent Production Deployment :p10, 2026-11-06, 2026-11-08
    section Post-V1
    Post-V1: Advanced Gamification & Mobile Decision :p11, 2026-11-09, 2026-12-01
```

---

## 2. Phase-by-Phase Execution Plan

### Phase 0: Discovery & Documentation (Completed)
- [x] Full audit of inherited codebase.
- [x] Document existing features, technical debt, and architecture.
- [x] Create complete document suite in `docs/`, `AGENTS.md`, `CHANGELOG.md`, `HANDOFF.md`.

### Phase 1: Product Naming Evaluation
- [ ] Brainstorm and shortlist consumer-facing product names under NairaStreak Labs.
- [ ] Evaluate trademark and domain availability.
- [ ] Approve official consumer product name (replacing working title `500K Challenge`).

### Phase 2: Brand Identity & Design System
- [ ] Finalize logo, wordmark, and favicon assets for the approved product name.
- [ ] Refine typography, color tokens, and micro-interaction animation curves.
- [ ] Prepare dark/light mode asset variants and PWA splash graphics.

### Phase 3: Public Storytelling Landing Page
- [ ] Build hero narrative on savings consistency and emotional relief.
- [ ] Implement interactive goal calculator widget.
- [ ] Embed interactive dashboard preview.
- [ ] Add explicit non-custodial privacy and trust banner.

### Phase 4: Managed Cloud Authentication
- [ ] Provision Supabase project.
- [ ] Build Sign Up, Log In, Log Out, and Password Recovery modal/views.
- [ ] Implement persistent session management and protected route middleware.

### Phase 5: Cloud Data Model & Multi-Tenant RLS
- [ ] Execute database DDL (`profiles`, `goals`, `savings_entries`).
- [ ] Configure Row Level Security (RLS) policies for cross-user isolation.
- [ ] Build client migration utility for importing legacy `localStorage` data.

### Phase 6: First-Time Onboarding Wizard
- [ ] Build guided step-by-step goal creation wizard.
- [ ] Capture goal name, target amount, deadline, and daily/weekly frequency.
- [ ] Write first goal to database and smoothly transition user to Dashboard.

### Phase 7: Core Savings Dashboard
- [ ] Render key metrics (Total Saved, Target, Remaining, Percentage).
- [ ] Implement animated SVG/CSS progress bar.
- [ ] Display target deadline and daily/weekly contribution rate.
- [ ] Render habit matrix (active streak and calendar history).

### Phase 8: Add Savings Engine
- [ ] Add quick preset contribution buttons and custom amount input.
- [ ] Implement double-submit prevention and loading indicators.
- [ ] Reactive metric updates and confetti milestone triggers (25%, 50%, 75%, 100%).

### Phase 9: Savings History Ledger
- [ ] Render chronological contribution ledger.
- [ ] Implement edit entry dialog and reactive recalculation.
- [ ] Implement delete entry dialog with confirmation prompt.

### Phase 10: Settings & Account Controls
- [ ] Goal parameter editing (update target or deadline).
- [ ] Theme switcher (Light / Dark mode persistence).
- [ ] Notification schedule preferences.
- [ ] JSON data export and account logout.

### Phase 11: Re-Integration of Inherited Features
- [ ] Dynamic pace and completion date projection formulas.
- [ ] Built-in in-app reminder notification engine.
- [ ] PWA offline support with refined cache boundaries.

### Phase 12: PWA & Security Hardening
- [ ] Update `manifest.json` and service worker (`sw.js`).
- [ ] Exclude all Supabase API endpoints from offline caching.
- [ ] Audit for zero auth token exposure.

### Phase 13–15: Responsive, a11y & Testing Verification
- [ ] Validate layouts at 375px, 390px, 768px, 1024px, 1440px.
- [ ] Audit keyboard accessibility, visible focus, ARIA live regions, and contrast.
- [ ] Execute Critical Golden Journey test (TC-01 through TC-07).

### Phase 16: Independent Production Deployment
- [ ] Configure new Netlify site instance (`nairastreak-web.netlify.app`).
- [ ] Verify `_headers` security policy.
- [ ] Confirm original deployment (`500ksavgoal.netlify.app`) remains 100% untouched.

---

## 3. Post-V1 Roadmap (Deferred)

Only after the Web V1 completion gate is passed will the following initiatives be considered:
1. **Multi-Goal & Currency Expansion**: Support multiple concurrent savings goals, multi-currency switching (USD, GBP, KES, GHS).
2. **Social Milestone Cards**: HTML Canvas card generator to share milestones on WhatsApp, Instagram, and X.
3. **Advanced Streaks & Gamification**: Streak freezes, badges, community accountability challenges.
4. **Mobile Client Decision**: Technical evaluation and execution of PWA/TWA vs Capacitor vs React Native/Flutter.
