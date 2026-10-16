# AGENTS.md — NairaStreak Labs AI Agent Guidelines

> **Repository**: `NairaStreak-Labs/NairaStreak`
> **Parent Organization**: NairaStreak Labs
> **Product**: NairaStreak
> **Core Mission**: Build a complete, usable, secure, reliable savings habit and goal-tracking web product before adding advanced features or native mobile clients.

---

# 1. Product Identity

## 1.1 Organization

**NairaStreak Labs**

NairaStreak Labs is the parent organization responsible for developing and maintaining NairaStreak and future financial habit tools.

---

## 1.2 Product

**NairaStreak**

NairaStreak is a non-custodial savings habit and goal-tracking platform.

It helps users:

- define savings goals,
- break large targets into manageable contributions,
- track savings activity,
- build savings consistency,
- monitor progress,
- maintain streaks,
- understand whether they are on pace,
- and reach personal savings goals.

NairaStreak does not hold or move user money.

---

## 1.3 Challenge Model

The **₦500K Challenge** is not the product itself.

It is one possible savings challenge/template inside NairaStreak.

The architecture must support arbitrary goals such as:

- ₦100K Emergency Fund,
- ₦500K Challenge,
- ₦1M Challenge,
- Rent Goal,
- School Fees Goal,
- Laptop Goal,
- Travel Goal,
- Business Goal,
- Custom Goal.

Do not hardcode `500K` into:

- database table names,
- database columns,
- API contracts,
- reusable business logic,
- persistent storage abstractions,
- authentication logic,
- reusable UI components.

The product must support configurable target amounts and deadlines.

---

# 2. Product Positioning

NairaStreak should be positioned as:

> **A savings consistency engine.**

Core philosophy:

> **Big savings goals become achievable when they are broken into small, consistent actions.**

The product should help users move through:

```text
GOAL
→ PLAN
→ SAVE
→ TRACK
→ BUILD CONSISTENCY
→ SEE PROGRESS
→ REACH GOAL
```

---

# 3. Financial Product Boundary

NairaStreak is currently:

**Savings planning and tracking software.**

It does NOT currently:

- hold user funds,
- move user funds,
- connect directly to bank accounts,
- automatically debit bank accounts,
- provide loans,
- provide credit,
- provide investments,
- execute financial transactions,
- provide financial advice,
- custody money,
- manage investment portfolios,
- provide crypto services.

Never write UI copy that falsely implies these capabilities.

Use language such as:

> NairaStreak helps you plan, track and stay consistent with your savings.

Avoid language suggesting that money is stored inside NairaStreak.

---

# 4. Original Project Attribution

The current NairaStreak project was derived from the original:

**500K Savings Challenge**

Original author:

**Zuokemefa Oyinmiebi Peter (Learn2Earn)**

Original deployment:

`https://500ksavgoal.netlify.app`

The project is being reused and rebranded with permission from the original author.

Never erase or misrepresent this provenance.

Maintain:

`docs/ORIGIN_AND_ATTRIBUTION.md`

The original deployment must NEVER be:

- overwritten,
- reassigned,
- replaced,
- redirected,
- republished as NairaStreak,
- treated as the NairaStreak production deployment.

NairaStreak must have its own:

- repository,
- deployment,
- branding,
- documentation,
- infrastructure,
- future domain.

---

# 5. Operating Directives

## 5.1 Strict Phased Progression

Follow the approved NairaStreak Web Product roadmap.

Do not rush into advanced features before Web V1 is complete.

The intended development order is:

```text
1. Documentation and project discovery
2. Brand identity
3. Storytelling/scrollytelling landing page
4. Authentication foundation
5. Cloud data foundation
6. First-time onboarding
7. Goal creation
8. Dashboard
9. Savings logging
10. Savings history
11. Progress calculations
12. Streaks and milestones
13. Goal management
14. PWA hardening
15. Accessibility and responsive hardening
16. Security review
17. Production testing
18. New NairaStreak deployment
19. Web V1 completion
20. Advanced features
21. Mobile strategy
22. Mobile application
```

Do not skip phases unless explicitly authorized.

---

## 5.2 Primary Product Goal

The first production objective is one complete working customer journey:

```text
Landing Page
→ Sign Up / Log In
→ Onboarding
→ Create Savings Goal
→ Dashboard
→ Log Savings
→ See Progress
→ View History
→ Log Out
→ Return Later
→ Log In
→ Continue From Same Data
```

If this flow is incomplete, Web V1 is not complete.

---

# 6. Web V1 Completion Gate

Web V1 must not be declared complete unless the following are working:

- Storytelling public landing page
- Sign up
- Sign in
- Sign out
- Password recovery
- Session restoration
- Protected application area
- First-time onboarding
- Goal creation
- Goal persistence
- Add savings entry
- Edit savings entry
- Delete savings entry
- Savings history
- Progress calculation
- Amount remaining
- Daily/weekly recommendation
- Goal deadline
- Basic streak functionality
- Responsive mobile UI
- Responsive desktop UI
- PWA manifest
- Service worker
- Installability
- Secure database ownership
- Row Level Security
- Cross-user isolation
- Production deployment
- Security review
- Accessibility basics
- Regression testing

---

# 7. Deferred Features

Do not implement these before Web V1 unless explicitly approved:

- community challenges,
- social feed,
- social leaderboards,
- bank integrations,
- automatic bank debits,
- payments,
- Paystack,
- Flutterwave,
- Stripe,
- investment features,
- crypto features,
- AI financial advice,
- AI chat,
- complex recommendation engines,
- advanced analytics,
- native mobile application,
- React Native,
- Flutter,
- Capacitor,
- Trusted Web Activity packaging,
- referral systems,
- paid subscriptions,
- premium plans.

Document ideas for later rather than implementing them early.

---

# 8. Architecture Principles

Prefer the simplest architecture that safely satisfies product requirements.

Current preferred Web V1 stack:

- GitHub — source control
- Vercel — web hosting
- Supabase Auth — authentication
- Supabase PostgreSQL — persistent user data
- Supabase Row Level Security — ownership enforcement
- Resend — transactional email when required
- Browser APIs — local functionality
- Web App Manifest — installability
- Service Worker — offline application shell

Optional later:

- PostHog — analytics
- Cloudflare Turnstile — bot protection
- Sentry — error monitoring

Do not introduce additional infrastructure without a clear reason.

---

# 9. Free-Tier Infrastructure Policy

NairaStreak Web V1 must operate using free-tier services wherever practical.

No:

- paid service,
- paid API,
- paid add-on,
- automatic upgrade,
- billing-enabled infrastructure,
- usage-based paid service

may be introduced without explicit user approval.

Preferred free-tier stack:

- GitHub Free
- Vercel Hobby (free tier)
- Supabase Free
- Resend Free
- PostHog Free when introduced
- Cloudflare Turnstile
- Browser/PWA APIs

If a free-tier quota is reached:

1. preserve user data,
2. fail gracefully,
3. report the limitation,
4. document the quota,
5. propose free alternatives,
6. wait for approval before enabling billing.

Never automatically upgrade a service.

---

# 10. Framework Discipline

The inherited project currently uses:

- HTML,
- CSS,
- vanilla JavaScript,
- localStorage,
- Web App Manifest,
- Service Worker.

Do not automatically migrate to:

- React,
- Next.js,
- Vue,
- Svelte,
- Angular,
- TypeScript,
- Tailwind,
- Express,
- another framework

simply because those technologies are popular.

A framework migration requires:

- a documented reason,
- clear technical benefits,
- migration cost analysis,
- risk analysis,
- approval.

Record major architecture decisions in:

`docs/DECISIONS.md`

---

# 11. Authentication Rules

Use managed authentication.

Preferred provider:

**Supabase Auth**

Never implement:

- custom password storage,
- custom password hashing,
- homemade JWT authentication,
- fake localStorage authentication,
- hardcoded production accounts,
- plaintext credentials.

Authentication must support:

- sign up,
- sign in,
- sign out,
- session restoration,
- forgot password,
- password reset,
- protected application access.

---

# 12. Authorization & Row Level Security

All user-owned data must be protected using database-level authorization.

Use Supabase Row Level Security.

A user must never be able to:

- read another user's profile,
- read another user's goals,
- read another user's savings entries,
- modify another user's goals,
- modify another user's savings entries,
- delete another user's data.

Frontend filtering is NOT sufficient security.

Database policies must enforce ownership.

Cross-user isolation must be tested.

---

# 13. Secrets & Credential Handling

Never commit or expose:

- Supabase secret keys,
- Supabase service-role keys,
- database passwords,
- Resend API secrets,
- SMTP passwords,
- GitHub Personal Access Tokens,
- Vercel and Netlify access tokens,
- private authentication credentials,
- private API keys,
- session secrets.

Never place secrets inside:

- HTML,
- browser JavaScript,
- README.md,
- AGENTS.md,
- documentation,
- screenshots,
- issue descriptions,
- Git commit messages,
- URLs,
- test fixtures.

Only browser-safe public configuration may be exposed client-side.

Examples of acceptable public configuration:

- Supabase Project URL
- Supabase Publishable Key

Use environment variables or platform secret management for private values.

---

# 14. Environment Files

Secret-bearing environment files must never be committed.

Expected `.gitignore` coverage:

```gitignore
.env
.env.*
!.env.example
```

If an environment example is required:

use:

`.env.example`

It must contain placeholders only.

Example:

```text
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
```

Never put actual secrets into `.env.example`.

---

# 15. Database Model

The initial cloud data model should support at minimum:

## Profiles

Suggested fields:

```text
id
display_name
created_at
updated_at
```

## Goals

Suggested fields:

```text
id
user_id
name
target_amount
currency
target_date
contribution_mode
status
created_at
updated_at
```

## Savings Entries

Suggested fields:

```text
id
goal_id
user_id
amount
saved_at
note
created_at
updated_at
```

Document the final schema in:

`docs/DATA_MODEL.md`

---

# 16. Money Handling

Money calculations must be deterministic and safe.

Do not use unsafe floating-point arithmetic where it can create financial rounding errors.

Prefer:

- integer minor units,
- exact decimal/numeric database types,
- consistent currency handling.

Document the chosen strategy.

Tests must cover:

- target amount,
- saved amount,
- remaining amount,
- daily recommendation,
- weekly recommendation,
- monthly recommendation,
- progress percentage,
- goal completion.

---

# 17. Existing localStorage Data

The inherited application currently stores savings data in localStorage.

Do not silently discard existing user data.

Do not automatically upload old localStorage data to a cloud account without user awareness.

Any migration must be explicit and documented.

Possible future flow:

```text
Existing local data found
→ Ask user whether to import
→ Preview records
→ Confirm
→ Import
→ Verify
```

Document migration strategy before implementing.

---

# 18. Landing Page Principles

The NairaStreak public landing page should be:

- storytelling-driven,
- scroll-driven,
- interactive,
- visually memorable,
- financially trustworthy,
- mobile-first,
- accessible.

Core storytelling flow:

```text
BIG GOAL
→ BREAK IT DOWN
→ SMALL DAILY ACTION
→ BUILD A STREAK
→ WATCH PROGRESS
→ REACH GOAL
```

Avoid:

- generic SaaS templates,
- crypto aesthetics,
- stock bank imagery,
- excessive card grids,
- meaningless animations.

---

# 19. Scrollytelling Rules

The landing page may use:

- CSS transitions,
- IntersectionObserver,
- CSS transforms,
- opacity transitions,
- lightweight JavaScript.

Avoid heavy animation frameworks unless justified.

Animations must:

- support the story,
- remain performant,
- work on mobile,
- respect reduced-motion preferences.

The page must still make sense without animation.

---

# 20. Accessibility

Production UI must include:

- semantic HTML,
- explicit form labels,
- keyboard navigation,
- visible focus states,
- accessible validation messages,
- sufficient color contrast,
- meaningful headings,
- screen-reader-friendly dynamic content,
- appropriate ARIA usage,
- sufficiently large touch targets.

Do not use placeholders as the only labels.

Do not rely on color alone to communicate:

- success,
- failure,
- warnings,
- progress,
- completion.

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Important information must remain understandable without animation.

---

# 21. Responsive Design

Test production UI at minimum at:

- 375px
- 390px
- 768px
- 1024px
- 1440px

NairaStreak is mobile-first, not mobile-only.

Desktop layouts must be intentionally designed.

Do not merely stretch mobile layouts.

Never introduce unintended horizontal page scrolling.

---

# 22. PWA Requirements

NairaStreak should remain an installable Progressive Web App.

Maintain:

- Web App Manifest
- service worker
- 192x192 icon
- 512x512 icon
- HTTPS
- installability
- offline application shell

Do not allow authentication or backend changes to break PWA behavior.

---

# 23. Service Worker Safety

The service worker must not indiscriminately cache:

- authentication requests,
- auth responses,
- Supabase private responses,
- session responses,
- password reset requests,
- POST requests,
- PATCH requests,
- DELETE requests,
- private user data.

Static application assets may be cached appropriately.

Offline mode must not pretend remote data is fresh when it is unavailable.

---

# 24. Offline Behavior

Offline functionality should be honest.

The application may:

- load a cached shell,
- show locally available public assets,
- display clear offline state.

The application must not claim:

- authentication succeeded offline,
- cloud data refreshed offline,
- remote savings were saved if they were not.

Any future offline-write synchronization must be explicitly designed and tested.

---

# 25. Code Quality

Code should be:

- modular,
- readable,
- maintainable,
- reasonably documented,
- testable.

Separate concerns where practical:

- UI,
- business logic,
- authentication,
- persistence/API,
- calculations,
- validation,
- service worker,
- configuration.

Avoid unnecessary monolithic files.

Do not over-engineer small features.

---

# 26. Dependency Policy

Before adding a dependency, ask:

1. Can native browser APIs solve this?
2. Is the dependency actively maintained?
3. Does it materially simplify the code?
4. Does it increase bundle size significantly?
5. Does it create security risk?
6. Does it create licensing concerns?
7. Does it threaten free-tier deployment?
8. Does it create unnecessary vendor lock-in?

Do not add dependencies without justification.

---

# 27. Current vs Planned Functionality

Always distinguish between:

## IMPLEMENTED

Features that actually exist and have been verified.

## PLANNED

Features documented but not implemented.

## EXPERIMENTAL

Features under active development.

Never claim planned functionality is implemented.

Never fabricate:

- test results,
- deployments,
- integrations,
- performance results,
- security verification,
- API responses,
- screenshots,
- analytics,
- user metrics.

---

# 28. Testing Rules

Do not mark something `PASS` unless it was actually tested.

Critical Web V1 journey:

```text
Visitor
→ Landing Page
→ Sign Up
→ Onboarding
→ Create Goal
→ Add Savings
→ Progress Updates
→ Refresh
→ Data Persists
→ Logout
→ Login
→ Same Data Returns
```

Also test:

- invalid amount,
- zero amount,
- negative amount,
- very large amount,
- invalid dates,
- editing entries,
- deleting entries,
- goal completion,
- session restoration,
- session expiration,
- password recovery,
- cross-user isolation,
- PWA behavior,
- mobile layout,
- desktop layout,
- keyboard navigation,
- reduced-motion behavior.

---

# 29. Regression Policy

Before declaring a phase complete, verify that existing working functionality has not been broken.

Relevant regression areas may include:

- savings calculations,
- history,
- localStorage compatibility,
- streak logic,
- milestones,
- dark mode,
- notifications,
- simulator,
- PWA manifest,
- service worker,
- offline shell,
- responsive layouts.

---

# 30. Git Rules

## 30.1 Commits

Do not create commits unless:

- the user explicitly authorizes the commit,
- or the currently approved implementation directive explicitly authorizes one.

Before committing:

1. run appropriate tests,
2. inspect `git status`,
3. inspect `git diff`,
4. scan for secrets,
5. verify documentation,
6. verify no accidental generated files are staged.

Use meaningful conventional commits.

Examples:

```text
feat(landing): build NairaStreak scrollytelling experience
feat(auth): add authentication and data foundation
feat(goals): add savings goal onboarding
feat(dashboard): build savings progress dashboard
feat(entries): add savings history
fix(pwa): correct service worker caching behavior
docs: update application architecture
test: add core user journey coverage
```

## 30.2 Pushes

A commit does NOT automatically authorize a push.

Never push unless:

- explicitly instructed,
- or the approved task explicitly permits pushing.

## 30.3 Prohibited Git Operations

Do not:

- force push,
- rewrite shared history,
- delete remote branches,
- delete remote tags,
- reset published commits,
- change Git remotes,
- remove repository history,
- run destructive Git commands

without explicit approval.

---

# 31. Documentation Requirements

Before implementation, read the relevant project documentation.

Primary sources include:

- `README.md`
- `AGENTS.md`
- `HANDOFF.md`
- `docs/PRD.md`
- `docs/ARCHITECTURE.md`
- `docs/DATA_MODEL.md`
- `docs/USER_FLOWS.md`
- `docs/DECISIONS.md`
- `docs/SECURITY_PRIVACY.md`
- `docs/WEB_APP_PLAN.md`
- `docs/PWA_REQUIREMENTS.md`
- `docs/TEST_PLAN.md`
- `docs/ORIGIN_AND_ATTRIBUTION.md`

When implementation changes documented behavior, update the appropriate documentation.

Do not allow major documentation drift.

---

# 32. Architectural Decision Log

All major technical decisions must be documented in:

`docs/DECISIONS.md`

Examples:

- authentication provider,
- database provider,
- money representation,
- frontend architecture,
- data migration strategy,
- analytics provider,
- mobile architecture,
- hosting provider.

A decision entry should explain:

- what was decided,
- why,
- alternatives considered,
- consequences.

---

# 33. Brand Rules

Parent organization:

**NairaStreak Labs**

Consumer product:

**NairaStreak**

Visual identity should feel:

- disciplined,
- optimistic,
- trustworthy,
- modern,
- warm,
- African,
- globally polished.

Avoid aesthetics that make NairaStreak look like:

- a bank,
- crypto exchange,
- trading platform,
- loan service,
- gambling product.

---

# 34. Tone of Voice

Product copy should be:

- encouraging,
- clear,
- direct,
- respectful,
- action-oriented.

Do not shame users for:

- missing savings days,
- breaking streaks,
- saving less than planned.

Prefer:

> You missed your target today. You can continue tomorrow.

over:

> You failed your streak.

The product should encourage consistency without creating guilt.

---

# 35. Privacy Principles

Collect only data required to operate the product.

Avoid unnecessary personal information.

Do not collect:

- bank passwords,
- card PINs,
- banking credentials,
- private financial account credentials.

Document data usage in:

`docs/SECURITY_PRIVACY.md`

---

# 36. Analytics Policy

Analytics may be introduced later using an approved free-tier provider.

Preferred future option:

**PostHog Free**

Do not introduce analytics until:

- the core flow works,
- privacy implications are documented,
- tracking events are intentionally designed.

Never track sensitive secrets or passwords.

---

# 37. Bot Protection

Cloudflare Turnstile may be introduced when required for:

- signup abuse,
- form abuse,
- bot protection.

Do not add bot protection prematurely if it harms the onboarding experience.

---

# 38. Error Handling

User-facing errors should be:

- understandable,
- actionable,
- non-technical.

Do not expose raw:

- stack traces,
- database errors,
- internal provider errors,
- secret configuration.

Log technical details appropriately for development.

---

# 39. Loading States

All network-dependent operations should have clear loading states.

Examples:

- signing in,
- signing up,
- loading dashboard,
- saving entry,
- updating goal,
- deleting entry.

Prevent accidental duplicate submissions.

---

# 40. Empty States

Every major application screen should have a useful empty state.

Examples:

No goals:

> Create your first savings goal.

No savings entries:

> Your first deposit will appear here.

No streak:

> Start today and begin your first streak.

Avoid blank screens.

---

# 41. Human-Only Blockers

Do not stop for work that the agent can safely perform.

Stop only when a genuine human action is required.

Use this format:

```text
HUMAN ACTION REQUIRED

Reason:
[...]

Required action:
1. [...]
2. [...]

After completing the action, reply:
continue
```

Examples of legitimate human-only actions:

- creating external service accounts,
- completing OAuth authorization,
- verifying email,
- adding DNS records,
- payment authorization,
- entering secrets into secure dashboards.

---

# 42. Agent Communication Style

Agent responses should be:

- concise,
- professional,
- explicit,
- structured in GitHub-flavored Markdown.

When referencing repository files, use repository-relative paths.

Examples:

```text
docs/PRD.md
docs/DATA_MODEL.md
src/auth.js
manifest.json
sw.js
```

Avoid machine-specific references such as:

```text
file:///home/tim/...
```

unless specifically requested for local debugging.

---

# 43. Implementation Reports

When completing a phase, report:

```text
PHASE NAME

Status:
PASS / PARTIAL / BLOCKED

Implemented:
[...]

Tests performed:
[...]

Regression checks:
[...]

Security checks:
[...]

Files changed:
[...]

Documentation updated:
[...]

Commit:
[...]

Push:
[...]

Known limitations:
[...]

Next recommended phase:
[...]
```

Never report a test as `PASS` if it was not run.

Use:

`NOT VERIFIED`

when appropriate.

---

# 44. Mobile Development Rule

Do not build a native mobile application until Web V1 is production-ready.

After Web V1, evaluate:

- PWA only,
- Trusted Web Activity,
- Capacitor,
- React Native,
- Flutter,
- native Android/iOS.

Do not select a mobile framework prematurely.

The Web V1 backend should be designed so a future mobile client can reuse:

- authentication,
- database,
- business rules,
- user data.

---

# 45. New Production Deployment Rule

NairaStreak must receive its own deployment.

Never deploy over:

`https://500ksavgoal.netlify.app`

That is the original project deployment.

NairaStreak should use a new Vercel project during Web V1.

A custom domain may be introduced later.

---

# 46. Definition of Done

A feature is not complete because code was written.

A feature is complete when applicable requirements have been:

- implemented,
- tested,
- reviewed for security,
- tested responsively,
- checked for accessibility,
- checked for regression,
- documented.

If a required verification has not been performed, report:

`NOT VERIFIED`

instead of:

`PASS`.

---

# 47. Final Principle

Every technical and product decision should support this goal:

> **Help people turn large savings goals into small, consistent actions they can track and sustain.**

When choosing between complexity and clarity:

**prefer clarity.**

When choosing between more features and a complete working flow:

**prefer the complete working flow.**

When choosing between expensive infrastructure and a reliable free-tier solution:

**prefer the reliable free-tier solution.**

When choosing between an impressive demo and a trustworthy product:

**prefer the trustworthy product.**
