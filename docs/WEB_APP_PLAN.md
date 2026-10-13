# Web App Plan — Web V1 Implementation

> **Parent Organization**: NairaStreak Labs  
> **Working Product Title**: 500K Challenge  
> **Target**: Production-grade Web V1

---

## 1. Technical Strategy & Architecture Evolution

The existing single-file prototype (`index.html`) successfully validates core calculations and micro-interactions. Web V1 transitions the code into a cleanly separated, modular client-side architecture that integrates with managed cloud auth and persistence without introducing bloated build dependencies.

### Architectural Tiers

```
┌────────────────────────────────────────────────────────┐
│                      Web V1 App Shell                   │
├──────────────────┬──────────────────┬──────────────────┤
│   Public Tier    │    Auth Tier     │  Protected Tier  │
│  - Landing Page  │  - Sign Up Modal │  - Onboarding    │
│  - Calculator    │  - Log In Modal  │  - Dashboard     │
│  - Privacy Copy  │  - Password Reset│  - History       │
│  - Value Pitch   │  - Session State │  - Settings      │
└──────────────────┴──────────────────┴──────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                   Modular Services                     │
├────────────────────────────────────────────────────────┤
│  - authService.js (Supabase Auth Client)               │
│  - dbService.js (Goals, Entries, RLS queries)          │
│  - streakEngine.js (Date & Streak Calculation)         │
│  - storageMigration.js (localStorage -> Cloud import)  │
│  - uiRouter.js (Hash or State-driven screen routing)   │
└────────────────────────────────────────────────────────┘
```

---

## 2. Directory Structure & Modularization Roadmap

```
src/ (or root modular structure)
├── index.html              # Main HTML entry point (App shell & semantic views)
├── manifest.json           # PWA metadata
├── sw.js                   # Service Worker (offline assets cache)
├── css/
│   ├── base.css            # CSS variables, typography, reset
│   ├── landing.css         # Public storytelling landing styles
│   ├── dashboard.css       # Core dashboard, progress bar, streaks
│   └── components.css      # Modals, buttons, form inputs, toasts
├── js/
│   ├── app.js              # Application bootstrapper and routing
│   ├── config.js           # Brand config, Supabase credentials, constants
│   ├── services/
│   │   ├── supabase.js     # Supabase client instantiation
│   │   ├── auth.js         # Sign up, login, logout, password reset
│   │   ├── goals.js        # Goal CRUD operations
│   │   └── entries.js      # Savings entries CRUD operations
│   ├── core/
│   │   ├── calculator.js   # Target pacing calculation
│   │   └── streak.js       # Streak and calendar computations
│   └── ui/
│       ├── landingView.js  # Landing page interactions & preview
│       ├── onboardingView.js# Multi-step goal creation wizard
│       ├── dashboardView.js# Metrics, progress bar, quick actions
│       └── historyView.js  # History ledger, edit & delete modals
└── assets/                 # Icons, badges, illustrations
```

---

## 3. Step-by-Step Implementation Sequence

### Milestone 1: Public Scrollytelling Landing Page (Completed ✅)
1. Semantic, responsive public landing page with interactive scrollytelling narrative:
   - Hero narrative on savings consistency with dynamic savings goal breakdown.
   - Interactive goal calculator and habit simulator widget.
   - Interactive streak visualization and checkpoint indicators.
   - Clear privacy and non-custodial trust statement.

### Milestone 2: Cloud Auth Integration (Completed ✅)
1. Initialize `@supabase/supabase-js` with client config in `config.js`.
2. Accessible Modal UI with Sign Up, Sign In, Sign Out, and Password Reset (`#recovery`).
3. Session restoration via `supabaseClient.auth.getSession()` and live state updates with `onAuthStateChange`.
4. Route protection guard for `#dashboard` and `#app` views.

### Milestone 3: Database Foundation & First-Time Onboarding (Completed ✅)
1. **Schema & RLS (Completed ✅)**: Deployed `profiles`, `goals`, `savings_entries` with strict RLS and zero advisor warnings.
2. **First-Time Onboarding (Completed ✅)**: 5-step progressive disclosure wizard (`#onboardingView`) capturing goal template, custom name, target amount, deadline, and cadence.
3. **Goal Persistence (Completed ✅)**: Linked initial goal to authenticated `user_id` in Supabase `public.goals` with full RLS tenant isolation.
4. **Simulator Handoff (Completed ✅)**: Preserved landing simulator intent into onboarding.
5. **Real Dashboard (Completed ✅)**: Dynamic rendering of active goal name, target, remaining, days left, and recommended pace.

### Milestone 4: Core Dashboard & Savings Logging
1. Bind real-time goal metrics to the dashboard UI (Total Saved, Remaining, Target Date).
2. Wire up quick preset buttons and custom entry forms with double-submit protection.
3. Recalculate streaks, milestones, and projected completion dates upon entry creation.

### Milestone 5: History Ledger & Entry Management
1. Render chronological savings ledger.
2. Enable editing and deleting entries with confirmation modals and reactive recalculation.

### Milestone 6: Settings, PWA Hardening & Migration
1. Enable goal editing and data export in Settings.
2. Provide a migration prompt to import legacy `localStorage` data into the cloud account.
3. Update Service Worker caching rules to guarantee private API responses and auth tokens are never cached offline.
