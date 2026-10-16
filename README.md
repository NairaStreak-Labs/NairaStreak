# NairaStreak

**Turn large savings goals into small, consistent actions.**

NairaStreak is a non-custodial savings planning and habit-tracking web application
from **NairaStreak Labs**. Set a goal and deadline, understand your daily or weekly
pace, record money you have saved elsewhere, and follow your progress and streaks.

**[Open NairaStreak](https://nairastreak.vercel.app)** ·
**[GitHub repository](https://github.com/NairaStreak-Labs/NairaStreak)**

NairaStreak does **not** hold, transfer or automatically debit money. It does not
connect to bank accounts, provide investments or loans, or offer financial advice.
Your money stays wherever you choose to save it; NairaStreak records your activity.

> Originally created by Zuokemefa Oyinmiebi Peter during software development
> studies at Learn2earn. Maintained and expanded by NairaStreak Labs.
>
> NairaStreak builds on the original **500K Savings Challenge**, reused with the
> original author's permission. Its [original deployment](https://500ksavgoal.netlify.app)
> is a separate historical project and must remain untouched.

## What you can use it for

Track an emergency fund, rent, school fees, a laptop, travel, a business goal or a
custom target. The **₦500K Challenge is one possible goal**, not the product or a
fixed savings requirement. Current monetary calculations support Nigerian naira.

The intended customer journey is:

**Landing page → Sign up or sign in → Onboarding → Create a goal → Dashboard →
Log savings → View progress and history → Sign out → Return to the same account.**

## Current implementation

The code contains the following features. Their presence does not mean every
production scenario has passed end-to-end verification.

| Area | Implemented behavior |
| --- | --- |
| Public experience | Storytelling landing page, interactive goal simulator and a separate example dashboard preview. |
| Authentication | Supabase-managed sign up, sign in, sign out, session restoration, password recovery and password reset; protected app routes and password visibility controls. |
| Goal setup | Onboarding with goal name, target amount, deadline and daily or weekly cadence. Cloud goals are stored in Supabase. |
| Dashboard | Saved amount, progress percentage, amount remaining, days left, recommended pace, streaks and milestones. New users are not seeded with demo savings. |
| Savings ledger | Active-goal cloud history, paginated rehydration, planned and custom amounts, entry editing and deletion with confirmation. |
| Sync feedback | Loading, confirmed cloud-write, failed-write/retry and stale-cache messages. A failed remote write does not receive a Saved confirmation. |
| Calculations | Shared calculation engine, integer-kobo sums, Lagos calendar dates, progress, daily/weekly/monthly estimates and streak calculations. |
| Interface | Light/dark themes, responsive layouts, SVG icons, labelled forms and a persisted desktop sidebar preference. Browser accessibility verification remains outstanding. |
| Reminders | Browser notifications at selected times while the app is open, subject to permission. Reminders stop after a qualifying saving is logged. No background scheduling or guaranteed delivery. |
| PWA foundation | Manifest, app icons, Settings-only installation controls and a versioned offline application shell. Device installability remains to be verified. |

## Where data is stored

- **Supabase Auth** manages identity and sessions.
- **Supabase PostgreSQL** stores profiles, goals and savings entries. Cloud entry
  reads and writes are scoped to the signed-in user and active goal.
- **localStorage** holds an isolated per-user/per-goal ledger cache and local UI
  preferences. Supabase is the authoritative ledger when signed in; the cache may
  be stale when remote data cannot be refreshed.
- **Legacy `savings500k` storage** is preserved. A matching old demo signature
  prompts the user before excluding it from the legacy view. It is not silently
  deleted or uploaded to a cloud account.
- **JSON backup controls** operate on inherited local data and settings. They are
  not a complete export/import of the signed-in cloud ledger.

The service worker only caches allowlisted public shell assets. It bypasses
Supabase, Authorization-bearing requests, non-GET methods and non-shell URLs.
Offline shell availability does not mean sign-in or cloud writes work offline;
failed submissions require an explicit retry when connectivity returns.

Settings target/deadline values currently remain local preferences. Changing them
does not update an existing cloud goal. General cloud goal management is unfinished.

## Project status and verification

**Web V1 is in development and has not passed its full completion gate.**

The stabilize implementation is deployed at
[nairastreak.vercel.app](https://nairastreak.vercel.app). A subsequent HTTP check
confirmed that the production HTML matches the stabilize checkout and includes
its ledger module and security headers. This verifies deployed assets, not the
complete authenticated user journey.

The latest local Node run passed **20 tests** covering calculation edge cases,
mocked ledger operations, legacy demo detection, representative contrast pairs,
route races, zero-state rendering, service-worker behavior, CSP configuration and
deployment exclusions. See [the stabilize report](docs/STABILIZE_REPORT.md) and
[the Vercel health check](docs/VERCEL_HEALTH_CHECK.md) for evidence and limitations.

Still requiring verification or completion:

- The complete live sign-up/recovery/onboarding/savings/logout/login journey.
- Browser tests at all required widths, axe audits, keyboard and screen-reader
  checks, physical-device installation and offline behavior. Browser tooling
  downloads have previously failed on network timeouts.
- Applying/reviewing the ownership-hardening migration and running its SQL
  isolation tests in the appropriate environment. This work did not apply SQL;
  deployed database policy state has not been verified.
- Full secret-scanner and GitHub Actions results.
- Remaining Web V1 goal-management and production completion requirements.

The CSS-3D vault-house landing redesign has **not** been implemented. Multi-goal is
approved for Web V1 but remains unimplemented. Native mobile apps, bank
integrations, payments, social features and AI financial features are outside the
current implementation.

## Run locally

Requirements: **Node.js 22** and a modern browser. No frontend build is required.
From the repository root:

```bash
node scripts/serve-test.cjs
```

Open **http://127.0.0.1:4173**. This local server serves the public assets with the
Vercel security headers and rejects non-public paths. It does not serve secrets or
the entire repository. Authentication also requires an appropriately configured
Supabase project and allowed redirect URLs.

The browser client reads public configuration from `config.js` using the existing
`window.NAIRASTREAK_CONFIG` keys `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
`.env.example` contains placeholders only; it is not automatically loaded into
browser JavaScript. Use only a browser-safe Supabase public/anon key here. Never
put a service-role key, database password, SMTP secret or private token in client
code. Private values belong in provider secret management and must not be committed.

## Tests

Run the dependency-free Node suite:

```bash
npm test
```

Install the pinned development-only browser tooling and run Playwright:

```bash
npm install --ignore-scripts --no-audit --no-fund
PLAYWRIGHT_BROWSERS_PATH=./scratch/browsers npx playwright install chromium
PLAYWRIGHT_BROWSERS_PATH=./scratch/browsers npm run test:e2e
```

The suite defines 375, 390, 768, 1024 and 1440px projects in both themes. Supabase is
mocked and non-local browser requests are blocked. Mock tests use no real account
credentials; any live test credentials must come exclusively from environment
variables. Screenshots and reports belong in ignored `qa-report/`.

After modifying an inline application script, refresh its existing CSP hash and
rerun the tests:

```bash
node scripts/update-csp.cjs
npm test
```

Do not weaken the CSP or add external hosts just to make a test pass.

## Architecture and deployment

| Component | Technology |
| --- | --- |
| Frontend | HTML, CSS and vanilla JavaScript; no framework migration or application build step. |
| Identity and persistence | Supabase Auth and PostgreSQL, with Row Level Security policies in versioned migrations. |
| Hosting | Existing NairaStreak Vercel project; security headers in `vercel.json`. |
| Offline shell | Browser service worker, Web App Manifest and local cache. |
| Development checks | Node's built-in test runner, Playwright and axe-core. |
| CI | GitHub Actions with Node tests and a pinned Gitleaks CLI secret scan. |

Use free-tier infrastructure without enabling billing automatically. Deploy
reviewed, tested source to the existing NairaStreak Vercel project. `.vercelignore`
excludes private configuration, local reports, scratch data and development
artifacts. A deployment does not merge a Git branch or apply database migrations.
Never deploy over the original author's Netlify project.

## Code and documentation

```text
index.html                 Landing, auth, onboarding and dashboard shell
calculations.js            Shared money/date/progress/streak calculations
ledger.js                  Cloud ledger operations and isolated cache
ledger-ui.js               Savings editor, sync feedback and history controls
validation.js              Shared accessible form errors
auth-controls.js           Password visibility controls
install-controls.js        Settings-only installation handling
sidebar-controls.js        Persisted desktop navigation collapse
icons.js                   Inline SVG icon helpers
stabilize.css              Interface hardening and theme corrections
manifest.json / sw.js      PWA metadata and static-shell caching
vercel.json                Production security headers
scripts/                   Local server and CSP maintenance
tests/                     Node tests and mocked browser journeys
supabase/migrations/       Schema and additive ownership hardening
supabase/tests/            Rollback-only ownership test script
docs/                      Product, architecture, decisions and verification
```

Start with [the PRD](docs/PRD.md), [architecture](docs/ARCHITECTURE.md),
[data model](docs/DATA_MODEL.md), [decision log](docs/DECISIONS.md),
[security and privacy](docs/SECURITY_PRIVACY.md), [test plan](docs/TEST_PLAN.md)
and [deployment checklist](docs/DEPLOYMENT_CHECKLIST.md).
Contributor boundaries are documented in [AGENTS.md](AGENTS.md); product visual
tokens are in [DESIGN.md](DESIGN.md).

## Attribution

**Original author:** Zuokemefa Oyinmiebi Peter (Learn2earn).
**Maintainer:** NairaStreak Labs.

The original project is the 500K Savings Challenge. NairaStreak reuses and expands
that work with permission while keeping its own repository, branding and Vercel
deployment. See [Origin and Attribution](docs/ORIGIN_AND_ATTRIBUTION.md).
