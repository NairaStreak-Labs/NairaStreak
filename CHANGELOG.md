# CHANGELOG — NairaStreak Labs

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.6.0] — 2026-10-14 (Luxury Brand Logo & Architectural Monogram Insignia)

### Added
- **Haute Luxury Brand Logo & Architectural Monogram ([`logo.svg`](logo.svg))**:
  - Precision vector insignia featuring an architectural geometric **'N'** monogram integrating an ascending streak trajectory (apex of consistency) and refined horizontal currency crossbars evoking the Nigerian Naira (**₦**).
  - Executed in brushed champagne gold (`#d4af37`, `#e5c578`) on deep imperial forest green (`#083324`, `#041a12`) squircle container with metallic gold borders and an eight-point precision star of consistency.
  - Generative luxury master assets preserved in [`assets/brand/`](assets/brand/):
    - `assets/brand/nairastreak-luxury-monogram.jpg`: High-resolution standalone architectural monogram on British racing green suede texture.
    - `assets/brand/nairastreak-luxury-seal.jpg`: Haute horlogerie medallion seal for NairaStreak Labs.
- **PWA & Platform App Icons**:
  - Re-rendered high-resolution `icon-192.png` (192×192) and `icon-512.png` (512×512) carrying the official luxury emblem.
  - Linked SVG vector favicon (`<link rel="icon" type="image/svg+xml" href="logo.svg">`) for high-DPI crispness.

### Changed
- **Application Brand Integration ([`index.html`](index.html))**:
  - Replaced legacy `🌱` emoji and plain `[N]` text badge with the crisp luxury monogram across:
    - Fixed top landing navigation (`.landing-logo-mark`).
    - Authentication story panel brand badge (`.auth-story-brand-badge`).
    - Authentication form branded lockup (`.auth-brand-lockup`).
    - First-time onboarding header lockup (`.onboarding-brand`).
    - Desktop dashboard sidebar brand badge (`.brand-badge`).
  - Polished toast copy replacing casual text with disciplined wealth consistency messaging.
- **PWA & Cache Management**:
  - Updated [`manifest.json`](manifest.json) theme color and background color to `#083324`.
  - Bumped service worker cache in [`sw.js`](sw.js) to `nairastreak-luxury-brand-v1` and added `logo.svg` to pre-cached shell assets.
- **Documentation**:
  - Updated [`docs/BRAND_IDENTITY.md`](docs/BRAND_IDENTITY.md) and [`DESIGN.md`](DESIGN.md) documenting luxury insignia specifications.

---

## [0.5.1] — 2026-10-14 (NairaStreak Brand Design System & DESIGN.md)

### Added
- **Machine-Readable Design System Specification ([`DESIGN.md`](DESIGN.md))**:
  - Full design token specification compliant with `@google/design.md` v0.4.0 (22 color tokens, 12 typography scales, 7 rounding levels, 8 spacing levels, and 23 component token bindings).
  - Validated with `npx @google/design.md lint DESIGN.md` achieving **0 errors and 0 warnings**.
  - All text/background combinations strictly satisfy WCAG AA contrast ratios (≥ 4.5:1).
  - Explicit token definitions for Deep Forest Green (`#083324`), Emerald (`#047857` / `#10b981`), Mint (`#dcfce7` / `#e8f5ec`), Amber celebration streak accents (`#b45309` / `#fbbf24`), and dual-surface palettes.
- **Documentation Synchronization**:
  - Updated [`docs/BRAND_IDENTITY.md`](docs/BRAND_IDENTITY.md) with tabular typography specs (`tnum`) and direct references to `DESIGN.md`.
  - Updated [`docs/DESIGN_GUIDELINES.md`](docs/DESIGN_GUIDELINES.md) aligning CSS elevation, card radius, and theme tokens with the design system.
  - Synchronized `:root` and `body.dark` CSS variables in [`index.html`](index.html).

---

## [0.5.0] — 2026-10-14 (Emergency Fund Dashboard Redesign)

### Added
- **Fintech Dashboard Layout (Mobile & Desktop Aligned with PDF Specification)**:
  - **Desktop (≥768px)**: Fixed left sidebar (`Home`, `History`, `Plan`, `Settings`, profile avatar and logout), top app bar with active goal title, target deadline, dark mode toggle, `+ New goal` button, and prominent `✓ I saved ₦... today` CTA.
  - **Hero & Pace Grid (Top Row)**: Deep forest green (`#083324`) hero card displaying total saved (`₦34,250`), `Active` pill, goal target (`₦500,000`), remaining balance, smooth progress bar (`6.9% complete`), paired with dedicated Recommended Pace card (`₦1,280 / day`, deadline, remaining).
  - **3-Metric KPI Row (Middle Row)**: Metric cards for `Days saved` (with total days), `Days left` (clock icon), and `Current streak` (flame icon).
  - **Habit & Ledger Grid (Bottom Row)**: `Last 7 days` streak dot tracker with dynamic solid green check circles and dashed pending circle for today, paired with `Recent activity` card featuring transaction icon badges and amount labels.
  - **Mobile Layout (≤767px)**: Clean vertical stack with embedded 3-stat hero card, horizontal 7-day streak tracker, recent activity feed, floating save action CTA, and fixed 4-tab bottom navigation bar (`Home`, `History`, `Plan`, `Settings`).
  - **Tab Views**: Seamless tab routing between `Home` (PDF redesign), `History` (calendar, full ledger, JSON backup/restore), `Plan` (contribution cadence & projections), and `Settings` (profile, dark mode, reminders).
  - **Defensive Error Hardening**: Comprehensive optional chaining across all DOM elements and event handlers preventing null pointer crashes.

### Changed
- **Service Worker Cache**: Bumped cache to `nairastreak-dash-v1`.

### Verified
- Headless browser visual verification across desktop (1440×900) and mobile (390×844) viewports.
- Dark mode rendering verified with deep forest contrast styling.
- 100% test pass on calculation unit test suite (`tests/test_calculations.js`).

---

## [0.4.0] — 2026-10-13 (Premium Split-Screen Auth Experience)

### Changed
- **Authentication UI Redesign**:
  - Replaced centered modal auth with a premium split-screen authentication experience.
  - Desktop: Deep forest outer frame (`border-radius: 32px`, `max-width: 1100px`, `min-height: 640px`) with 54/46 story/form panel ratio.
  - Left story panel features NairaStreak Labs badge, goal showcase card (₦327,500/₦500,000 progress), streak tracker dots, metrics grid, and motivational footer quote.
  - Right form panel with white background, branded lockup, left-aligned typography, 48px rounded inputs, and strong whitespace.
  - Mobile (≤900px): Story panel hidden, single-column form-only layout.
  - Dark mode variants for all new auth components.
  - Circular close button with backdrop blur effect.
  - Removed inline styles from submit buttons (CSS-managed).
- **Legal Note**: Added privacy/terms notice on signup form (`auth-legal-note`).
- **Service Worker**: Bumped cache to `nairastreak-auth-v5`.

### Verified
- Playwright automated testing across 375px, 390px, 768px, 1024px, and 1440px viewports.
- Auth state mutual exclusivity (exactly 1 view visible at a time).
- Correct `aria-labelledby` and focus management across all auth state switches.
- Escape key closes modal and restores focus to opener.
- Zero console errors or warnings.

---

## [0.3.1] — 2026-10-13 (Auth Modal Presentation Regression Fix)

### Fixed
- **Authentication Modal Initial Display**:
  - Defined universal `.hidden { display: none !important; }` utility in CSS, fixing regression where `#authModal` was improperly rendered on initial landing page load.
  - Ensured auth views (`#authSignupView`, `#authSigninView`, `#authForgotView`, `#authRecoveryView`) are strictly mutually exclusive (exactly 1 view visible at a time).
  - Fixed empty red alert boxes by ensuring `.auth-error-msg.hidden` is hidden, with added defensive `.auth-error-msg:empty { display: none !important; }`.
- **Accessible Modal Naming & Focus Management**:
  - Dynamically updated `aria-labelledby` on `#authModal` to point to the active view's heading (`authHeadingSignup`, `authHeadingSignin`, `authHeadingForgot`, `authHeadingRecovery`).
  - Added autofocus on the first actionable input upon view switch (`#signupName`, `#signinEmail`, `#forgotEmail`, `#recoveryPassword`).
  - Implemented keyboard focus trapping (Tab / Shift+Tab) within the active modal and focus restoration to opener element upon modal close.
- **Password Recovery Route Guard**:
  - Guarded `#recovery` routing so the Set New Password view is only accessible during a genuine recovery flow (`PASSWORD_RECOVERY` event or `type=recovery` URL tokens).
- **Service Worker Cache**:
  - Bumped cache to `nairastreak-auth-v4` in `sw.js`.

---

## [0.3.0] — 2026-10-13 (First-Time Onboarding & Goal Creation)

### Added
- **Resend Custom SMTP Integration**:
  - Configured Resend as Supabase Auth's custom SMTP provider.
  - End-to-end verification of signup email delivery, confirmation link resolution, password reset delivery, and recovery redirect.
  - Rate-limit bottleneck eliminated without exposing secret keys to client code.
- **First-Time Onboarding Flow (Phase 3)**:
  - 5-step progressive disclosure wizard: Welcome, Goal Template / Custom Name, Target Amount, Target Deadline & Cadence (Daily/Weekly), and Review.
  - Goal templates: Emergency Fund, Rent, School Fees, New Laptop, Travel, Business, ₦500K Challenge, ₦1M Challenge, and Custom Goal.
  - Quick amount preset chips and live plan calculation preview.
  - Direct persistence into Supabase `public.goals` with Row Level Security enforcement.
- **Unified Calculation Engine (`calculations.js`)**:
  - Single Source of Truth for savings formulas: `calculateDaysRemaining`, `calculateWeeksRemaining`, `calculateDailyContribution`, `calculateWeeklyContribution`, `calculateMonthlyEquivalent`, `calculateProgress`, `formatNaira`, and `validateGoalInput`.
  - Comprehensive automated unit test suite (`tests/test_calculations.js`).
- **Landing Simulator Handoff**:
  - Automatically captures user intent from the public landing simulator into `sessionStorage` (`nairastreak_draft_goal`) and prefills onboarding upon registration.
- **First Real Goal Dashboard**:
  - Dynamically renders active goal name, target amount, amount remaining, progress percentage, days left, and recommended daily/weekly pace from Supabase.
  - Added "+ New Goal" action and informative Phase 4 notice on "Add Savings" CTA.
- **Automated Responsive Testing**:
  - Full end-to-end browser verification via Playwright CLI across 375px, 390px, 768px, 1024px, and 1440px viewports with zero horizontal overflow.

---

## [0.2.0] — 2026-10-12 (Authentication & Cloud Data Foundation)
 
### Added
- **Supabase Authentication Integration**:
  - Sign Up, Sign In, Sign Out, and Password Recovery flows in accessible modal UI.
  - Session restoration via `supabaseClient.auth.getSession()` on app startup.
  - Realtime auth event listener with `supabaseClient.auth.onAuthStateChange()`.
  - Client-side route protection for `#dashboard` and `#app` views.
  - Password recovery flow triggered via `#recovery` hash link.
- **Remote Database Schema with Strict RLS**:
  - `profiles`: Linked to `auth.users` via foreign key cascade, auto-created via `handle_new_user` trigger.
  - `goals`: Supports arbitrary amounts, deadlines, currencies, and contribution modes (not hardcoded to 500k).
  - `savings_entries`: Granular contributions ledger linked to goals and profiles.
  - Row Level Security (RLS) on all tables with optimized `(select auth.uid())` policy checks.
  - Security-hardened `handle_new_user` function with `search_path = public` and revoked execute permissions from public roles.
- **Configuration & Security Layer**:
  - Browser-safe configuration in `config.js` with project URL and public anon key.
  - `.env.example` and updated `.gitignore` to prevent secret leakage.
  - Comprehensive automated database verification test suite confirming tenant isolation.

### Changed
- **Hardened Service Worker (`sw.js`)**:
  - Upgraded cache version to `nairastreak-auth-v2`.
  - Unconditionally bypasses all `*.supabase.co` API requests and requests with `Authorization` headers.
  - Enforces `networkResponse.type === 'basic'` to ensure no external API responses or tokens enter cache storage.
- Dynamic navigation bar in `index.html` reflecting authenticated user state (display name, log out CTA, dashboard link) vs public visitor state.

---

## [0.1.1] — 2026-10-12 (Scrollytelling Landing Page)

### Added
- Interactive scrollytelling narrative landing page in `index.html`.
- Dynamic savings habit simulator breaking down arbitrary targets into monthly, weekly, and daily micro-habits.
- Sticky mobile CTA, scroll progress indicators, and accessible dark mode support.

---

## [0.1.0] — 2026-10-12 (Inherited Baseline)

### Baseline Features
- Inherited codebase created by Zuokemefa Oyinmiebi Peter (Learn2earn).
- Vanilla single-file web app in `index.html` with daily and weekly tracking.
- Client-side storage via browser `localStorage`.
- Basic PWA offline shell via `sw.js` and `manifest.json`.
- Streak calculation, pace projection, goal calculator, in-app notifications, and JSON export/import.
- Deployed at `https://500ksavgoal.netlify.app`.
