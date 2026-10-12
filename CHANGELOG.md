# CHANGELOG — NairaStreak Labs

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] — Web V1 Foundation Phase

### Added
- Comprehensive architecture and foundation documentation under `docs/`:
  - `PRD.md`, `BRAND_IDENTITY.md`, `USER_PERSONAS.md`, `USER_FLOWS.md`, `WEB_APP_PLAN.md`
  - `MOBILE_ROADMAP.md`, `ARCHITECTURE.md`, `DATA_MODEL.md`, `PWA_REQUIREMENTS.md`, `DESIGN_GUIDELINES.md`
  - `FEATURE_SPEC.md`, `SECURITY_PRIVACY.md`, `LEGAL_COMPLIANCE.md`, `ORIGIN_AND_ATTRIBUTION.md`, `RESOURCES.md`
  - `TEST_PLAN.md`, `DEPLOYMENT_CHECKLIST.md`, `PRODUCTION_QUALITY.md`, `DECISIONS.md`, `ROADMAP.md`
- `AGENTS.md` specifying agent workflows, constraints, and execution boundaries.
- `HANDOFF.md` updated to reflect the NairaStreak Labs Web Product Foundation Directive.
- Configuration strategy for arbitrary savings goals and future product renaming.

### Changed
- Refactored brand metadata to establish **NairaStreak Labs** as parent organization.
- Designated `500K Challenge` as temporary working product title pending consumer naming phase.
- Updated Service Worker cache identifier to `nairastreak-500k-v1`.
- Added UI attribution footer crediting original author Zuokemefa Oyinmiebi Peter and NairaStreak Labs.

---

## [0.1.0] — 2026-10-12 (Inherited Baseline)

### Baseline Features
- Inherited codebase created by Zuokemefa Oyinmiebi Peter (Learn2earn).
- Vanilla single-file web app in `index.html` with daily and weekly tracking.
- Client-side storage via browser `localStorage`.
- Basic PWA offline shell via `sw.js` and `manifest.json`.
- Streak calculation, pace projection, goal calculator, in-app notifications, and JSON export/import.
- Deployed at `https://500ksavgoal.netlify.app`.
