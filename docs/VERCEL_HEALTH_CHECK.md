# Vercel health check — 2026-10-16

Status: **PARTIAL — stabilize assets verified live; full customer journey not verified.**

The initial findings below describe the old deployment. See the update at the end
for the successful stabilize deployment and subsequent live checks.

Checked https://nairastreak.vercel.app with read-only HTTPS requests after the
maintainer authorized Vercel access. No credentials, private environment files,
Supabase APIs or user data were accessed. No production deployment was changed.

## Verified production findings

- Landing page: HTTP 200, served by Vercel.
- Manifest: HTTP 200.
- Service worker: HTTP 200; still uses `nairastreak-luxury-brand-v1`, rather than
  the local `nairastreak-shell-v3` worker.
- Production HTML still includes `maximum-scale=1` and only the old Supabase,
  config and calculations script imports. It lacks the extracted cloud-ledger,
  validation and accessibility modules in the current branch.
- The response lacked Content-Security-Policy, X-Content-Type-Options and
  X-Frame-Options. The branch's vercel.json configures these headers.
- The downloaded production `getOrInitEntries()` was executed in an isolated
  Node VM with empty entry storage and a stubbed storage writer. It generated
  **25 entries totalling ₦34,250**, and attempted to persist all 25. This is the
  old demonstration-data bug; no real browser storage or account was modified.
- Live HTML differs from this branch and from the locally available origin/main
  snapshot. The deployment's exact commit and production-branch setting cannot
  be determined from these public responses.

## Local fixes and checks

The stabilize branch already removes demo seeding, adds cloud rehydration,
truthful sync states, validation, route guards, accessibility controls, new PWA
caching and Vercel security headers. Those fixes are not reflected in live HTML.

This check additionally hardened `.vercelignore` to exclude environment files,
Vercel metadata, scratch files, QA reports, node_modules, issue text and development
tooling from deployment uploads. `tests/deployment.test.cjs` checks those exclusions
and verifies every local script/style referenced by production HTML exists.

- `npm test`: **20 tests passed, 0 failed**; output in ignored
  `qa-report/vercel-check-unit.txt`.
- `git diff --check`: passed.
- `npm install --cache ./scratch/npm-cache --ignore-scripts --no-audit --no-fund --fetch-retries=0 --fetch-timeout=15000`:
  failed with EIDLETIMEOUT reading registry.npmjs.org/axe-core.
- Additional direct requests for calculation/ledger scripts and icons encountered
  connection timeouts. These timeouts do not establish missing or broken assets.
- Browser interaction, screenshots, five-viewport behavior, axe, real auth and
  authenticated ledger behavior remain **NOT VERIFIED**. There is no connected
  Vercel management capability available in this session; stored credentials were
  not inspected or used.

## Required deployment action

Review the branch and the additional local deployment-exclusion changes, commit
and push them through the normal review workflow, then deploy the current
`sprint/stabilize` revision to the existing NairaStreak Vercel project. In Vercel,
verify the selected commit and production branch before deploying/promoting it.
Simply redeploying the old production revision will retain the bugs above.

Apply/review the ownership SQL migration separately as already documented; this
check did not apply SQL. After deployment, verify that response security headers,
new script imports and `nairastreak-shell-v3` are present, and run the browser
journey and cross-user SQL checks before claiming production readiness.
Never overwrite the original author's 500ksavgoal.netlify.app deployment.

## Update: stabilize deployed and rechecked

The earlier findings above are a historical pre-deployment snapshot. The subsequent
production deployment of stabilize commit `e400040` completed successfully. A new
HTTPS check found the live HTML byte-for-byte identical to the checkout, with
ledger.js imported, no maximum-scale restriction, no demo-seeding function, and
CSP, nosniff and frame-denial headers present. This supersedes the earlier claim
that production still serves the old HTML. It does not verify live authentication,
Supabase policies or the complete customer journey.
