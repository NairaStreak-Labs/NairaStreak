# Stabilize sprint — Tiers 0 and 1

Status: **PARTIAL**. Implementation reached item 13. No multi-goal or profile work
was started. Production readiness is not claimed.

Branch: `sprint/stabilize`, created from `origin/main` after the initial clean-main
check and fetch. The maintainer explicitly authorized resuming this branch after
an interruption. No push, deployment, SQL execution or Supabase access occurred.
`ISSUES.json` was missing; the sprint brief and repository docs were used instead.

## Results and files by item

| Item | Status | Files and result |
| --- | --- | --- |
| Hosting/scope decisions | PASS (documentation checks) | `AGENTS.md`, `HANDOFF.md`, `docs/DECISIONS.md`, `docs/ARCHITECTURE.md`, `docs/DEPLOYMENT_CHECKLIST.md`, `docs/ORIGIN_AND_ATTRIBUTION.md`, `docs/PRD.md`, `docs/ROADMAP.md`, `docs/RESOURCES.md`, `.gitignore`. Vercel hosting and superseding multi-goal approval recorded; original-author attribution retained. |
| 0a / #6 | PARTIAL | `supabase/migrations/20261016_fix_entries_ownership.sql`, `supabase/tests/entries_ownership.sql`, `docs/DATA_MODEL.md`. Existing INSERT/UPDATE policies checked only entry.user_id; new WITH CHECK also requires an owned goal. Existing amount/status constraints and user/goal indexes retained; NGN currency constraint and saved_at index added. SQL tests cover another user's SELECT/UPDATE/DELETE, foreign-goal INSERT and own-entry reassignment. Written only; database behavior NOT VERIFIED. |
| 0b | PASS (source check) | `index.html`. Removed maximum-scale and limited reminder claims to chosen-time notifications while the app is open. Reminders now consult the active ledger and Lagos clock. Browser notification delivery NOT VERIFIED. |
| 0c | PARTIAL | `tests/ui-core.test.cjs`, `tests/calculations.test.cjs`, `index.html`. Actual dashboard renderer executed with DOM stubs: ₦0 saved, 0%, streak 0. Real runtime Lagos date 2026-10-16 and deadline 2026-11-15 produced 30 days. Browser presentation NOT VERIFIED. |
| 1 / cloud ledger | PARTIAL | `ledger.js`, `ledger-ui.js`, `index.html`, `tests/ledger.test.cjs`, `docs/ARCHITECTURE.md`. Active-goal paginated cloud reads on dashboard/history, isolated cache, custom contribution form, editing/deletion with confirmation, recalculated totals/streaks. Mock service tests pass, including fresh-service rehydration, edits/deletes and >1000 entries. Browser refresh/logout/login and real backend NOT VERIFIED. |
| 2 / #4 | PARTIAL | `legacy-data.js`, `ledger-ui.js`, `index.html`, `tests/legacy.test.cjs`, `docs/DATA_MODEL.md`. Confirmed writes alone show Saved; cached data labelled local/stale, failures retain inputs/UUID and retry. Possible 25-entry/₦34,250 demo prompts Keep/Exclude; original savings500k keys never removed or uploaded. Unknown provider errors are generic. Browser state transitions NOT VERIFIED. |
| 3 / #2 | PASS (Node tests); browser integration NOT VERIFIED | `calculations.js`, `index.html`, `tests/calculations.test.cjs`, `tests/test_calculations.js`, `docs/DECISIONS.md`. Integer-kobo sums, common recommendation/progress/projection/streak helpers, strict finite positive amounts, Lagos date keys, leap-year/month clamping. Tests cover zero, negative, NaN, Infinity, leap year, invalid/past/same dates, month boundaries, progress/completion and recommendations. |
| 4 / #3 | PARTIAL | `validation.js`, `index.html`. Accessible linked inline errors for settings, calculator, simulator and onboarding; removed silent invalid-input fallbacks. Browser validation scenarios authored but NOT VERIFIED. Settings explicitly report local-only persistence. |
| 5 / #5 | PARTIAL | `index.html`, `docs/SECURITY_PRIVACY.md`, `tests/ui-core.test.cjs`. Session-ready guard, stale route/user checks after awaits, immediate private-view clearing on logout, auth callback work scheduled outside auth lock. Actual guard passes Node pending-session/logout-race test. Browser Back/hash and recovery/session expiration NOT VERIFIED. |
| 6 | PARTIAL | `auth-controls.js`, `stabilize.css`, `index.html`. SVG password buttons on all three password forms, aria-label/pressed/controls, 44px target, reset on close/view switch. Syntax verified; browser keyboard/focus/size NOT VERIFIED. |
| 7 | PARTIAL | `install-controls.js`, `index.html`. Install card moved into Settings; beforeinstallprompt and installed-state handling; iOS Safari instructions. Service worker was unchanged in this item's commit. Actual install prompt/iOS device NOT VERIFIED. |
| 8 | PARTIAL | `sidebar-controls.js`, `stabilize.css`, `index.html`. >=1024px toggle, labelled icon rail, aria-expanded, persistent preference and reduced-motion rules. Browser layout NOT VERIFIED. |
| 9 | PARTIAL | `stabilize.css`, `index.html`, `DESIGN.md`, `tests/contrast.test.cjs`. Representative color-pair calculations pass AA; full rendered-page contrast audit NOT VERIFIED. Ratios below. |
| 10 / #7, #8 | PARTIAL | `icons.js`, `index.html`, `stabilize.css`. Inline SVGs replace UI emoji; associated input labels, one landing h1, minimum control sizes, focus rings, inactive auth aria-hidden/inert, live status. Before/after axe harness authored, but axe counts and browser accessibility NOT VERIFIED. |
| 11 / #9 | PARTIAL | `package.json`, `playwright.config.cjs`, `tests/e2e/mock.cjs`, `tests/e2e/stabilize.spec.cjs`, `scripts/serve-test.cjs`, `docs/TEST_PLAN.md`. Five widths x both themes, mocked Supabase, no real credentials, blocked non-local requests, zero state/auth views/validation/simulator/CRUD/refresh/logout/login/cache-empty rehydration/axe checks. Tool installation unavailable; suite did not execute. |
| 12 / #10 | PASS (Node worker tests); browser install/offline NOT VERIFIED | `sw.js`, `tests/sw.test.cjs`, `docs/PWA_REQUIREMENTS.md`. Versioned shell v3, NairaStreak-only cleanup, exact same-origin allowlist, network-first shell, offline index fallback. Tests prove bypass of Supabase, Authorization, auth paths, non-GET, query-bearing and other-origin requests. |
| 13 / #11 | PARTIAL | `.github/workflows/ci.yml`, `vercel.json`, `scripts/update-csp.cjs`, `scripts/serve-test.cjs`, `tests/headers.test.cjs`, deployment/security docs. Node CI and checksum-verified pinned Gitleaks CLI (no licence key); headers only in vercel.json. Static CSP/hash tests and local HTTP header checks pass. Full Gitleaks CLI and GitHub Actions execution NOT VERIFIED. Live Supabase/Fonts/Vercel behavior NOT VERIFIED. |

## Exact verification commands and results

Commands below ran in the repository. Test output is also retained locally in
ignored `qa-report/`; that directory is deliberately not committed.

- `git status -sb` and `git branch --show-current`: initial clean `main`.
- `git fetch origin && git switch -c sprint/stabilize origin/main`: exit 0.
- `ls -la ISSUES.json`: missing. No GitHub API calls made.
- `node tests/test_calculations.js`: existing calculation tests passed initially.
- `node --test tests/ledger.test.cjs`: 3 passed.
- `node --test tests/legacy.test.cjs tests/ledger.test.cjs`: 4 passed.
- `node --test tests/calculations.test.cjs tests/test_calculations.js`: 5 passed.
- `node --test tests/calculations.test.cjs`: 4 passed.
- `node --test tests/contrast.test.cjs > qa-report/contrast.txt`: 1 passed.
- `node --test tests/sw.test.cjs`: 3 passed.
- `node --test tests/headers.test.cjs`: 2 passed.
- `node scripts/update-csp.cjs`: exit 0; regenerates CSP hash for current inline script.
- `npm test > qa-report/unit-results.txt 2>&1`: **18 passed, 0 failed** after
  correcting the expected stale CSP hash caused by subsequent inline-script edits.
  Includes actual-renderer zero-state and route race tests.
- `node --check ledger.js`, `node --check ledger-ui.js`,
  `node --check validation.js`, `node --check auth-controls.js`,
  `node --check install-controls.js`, `node --check sidebar-controls.js`,
  `node --check playwright.config.cjs`, `node --check tests/e2e/mock.cjs`,
  `node --check tests/e2e/stabilize.spec.cjs`, `node --check scripts/serve-test.cjs`:
  exit 0. Full inline script also parses in the Node test suite.
- `npm install --cache ./scratch/npm-cache --ignore-scripts --no-audit --no-fund`:
  failed with ETIMEDOUT. Browser download attempt
  `PLAYWRIGHT_BROWSERS_PATH=./scratch/browsers npx --no-install playwright install chromium`
  encountered EAI_AGAIN for cdn.playwright.dev and was interrupted.
- `npm install --cache ./scratch/npm-cache --ignore-scripts --no-audit --no-fund --fetch-retries=0 --fetch-timeout=20000`:
  retry made slow partial registry progress; interrupted after time-box. Dependencies
  remained unavailable. No lockfile was fabricated.
- `node node_modules/@playwright/test/cli.js test`: MODULE_NOT_FOUND.
- `npm run test:e2e > qa-report/playwright-final.txt 2>&1`: exit 127,
  `playwright: not found`. No viewport tests or axe audits passed; no screenshots
  were generated or viewed. Browser DOM/computed-style assertions remain unexecuted.
- `curl -I --connect-timeout 10 https://registry.npmjs.org/axe-core`: exit 28, timeout.
- `curl --fail --location --connect-timeout 10 --max-time 20 --output scratch/gitleaks.tar.gz https://github.com/gitleaks/gitleaks/releases/download/v8.24.3/gitleaks_8.24.3_linux_x64.tar.gz`:
  exit 28, incomplete download. Binary was not run; full secret scan NOT VERIFIED.
- `node scripts/serve-test.cjs`: localhost server started. A `node -` fetch/assert
  probe requested `http://127.0.0.1:4173/` and `http://127.0.0.1:4173/.env`:
  root 200, nosniff and Supabase/Fonts CSP present, non-public path 404. It did not
  read any environment file. Server stopped after verification.
- `git diff --check`: exit 0 at final review.
- `git check-ignore ISSUES.json scratch/example qa-report/example`: all excluded.
- `python3 scratch/commit.py '<conventional commit message>'`: before each main
  item commit, staged diff check and private-key/token-pattern scan found no
  matches; staged status/stat inspected. This limited scan is not Gitleaks.

## Contrast evidence

| Representative pair | Before | After |
| --- | ---: | ---: |
| Light amber text / white | 2.15:1 | 5.02:1 |
| Hero weakest gradient stop / light canvas | 2.42:1 | 13.27:1 |
| Dark theme auth text / mint story panel | 1.70:1 | 12.27:1 |
| Light primary / canvas | 14.00:1 | 14.00:1 |
| Light secondary / white | 7.56:1 | 7.56:1 |
| Dark primary / canvas | 16.35:1 | 16.35:1 |
| Dark secondary / card | 6.72:1 | 6.72:1 |
| Dark amber / card | 7.70:1 | 9.91:1 |

These are computed token pairs, not a claim that every rendered text node passes.

## Date diagnosis

The repo had no fixed 13/14 October deadline. UTC serialization was mixed with
browser-local display. 14 October 00:30 Lagos equals 13 October 23:30 UTC, which
reproduces the discrepancy. Calendar operations now use Lagos date keys and UTC
calendar-day subtraction. No stored target_date was rewritten.

## Regression and security review

- Actual Node test suite passes; no framework or runtime dependency introduced.
- Legacy savings500k keys retained; no automatic legacy upload. The demo signature
  is only a prompt because genuine user data could match it.
- Cache keys isolate user and goal. Cloud operations check returned provider errors.
- Pending route responses cannot remount private UI after logout; failed logout
  reports a retry instead of claiming success. Unknown provider errors are hidden.
- Offline caches can be stale; forms do not claim a remote write succeeded offline.
- Original author Zuokemefa Oyinmiebi Peter and original deployment remain preserved.
- Live RLS, SMTP/password recovery, session expiration, notification delivery,
  responsive layout, keyboard/screen-reader behavior, axe, installability and
  production regression remain NOT VERIFIED.
- Settings goal values remain local preferences; cloud goal management is not
  completed by this sprint. Multi-goal remains approved but unimplemented.

## Maintainer actions

1. Review the branch and SQL; apply the new migration yourself in the intended
   Supabase environment. Run `supabase/tests/entries_ownership.sql` only in a
   disposable database with both migrations installed. Preserve existing data if
   constraints reveal invalid rows; do not silently delete or repair it.
2. With registry/browser-download access available, install the pinned dev tooling,
   download Chromium into scratch, and run `npm run test:e2e` at all configured
   projects. Inspect screenshots and before/after axe outputs; resolve failures
   before release. Run the full Gitleaks CLI scan too.
3. Review commits, push `sprint/stabilize` yourself, and run GitHub Actions. Nothing
   has been pushed by the agent.
4. Redeploy the existing Vercel project yourself. Verify auth, ledger restoration,
   RLS, Google Fonts/Supabase CSP compatibility and PWA behavior in production.
   Never replace the original 500ksavgoal.netlify.app deployment.
