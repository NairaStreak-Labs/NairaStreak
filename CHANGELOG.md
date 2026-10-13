# CHANGELOG — NairaStreak Labs

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
