# Functional Feature Specifications — Web V1

> **Parent Organization**: NairaStreak Labs  
> **Working Product Title**: 500K Challenge  
> **Scope**: Granular functional specs for all core modules.

---

## 1. Feature: Public Storytelling Landing Page

- **Hero Narrative**:
  - Heading: "Build the savings habit that actually sticks."
  - Subtitle: "Turn intimidating financial targets into simple daily and weekly streaks."
  - CTA Button: "Create Your First Goal" -> triggers Sign Up modal.
- **Problem & Solution Section**:
  - Highlights the mental friction of large numbers (e.g. saving ₦500,000 all at once).
  - Illustrates the transition: ₦500k by year-end = ₦3,676 / day.
- **Interactive Calculator**:
  - User can type any target amount and select a target date.
  - Dynamically computes and displays: Daily target, Weekly target, and Monthly target.
- **Product Preview Component**:
  - Live interactive mockup of the progress bar, streak count, and calendar matrix.
- **Non-Custodial Trust Banner**:
  - Prominent badge: *"NairaStreak is a habit tracker. We do not hold, transfer, or manage your funds."*

---

## 2. Feature: Authentication & Account Lifecycle

- **Sign Up**:
  - Inputs: Email address, Password (minimum 8 characters), Confirm Password.
  - Validation: Real-time format checking and matching verification.
  - On submit: Calls `supabase.auth.signUp()`.
- **Log In**:
  - Inputs: Email address, Password.
  - On submit: Calls `supabase.auth.signInWithPassword()`.
  - Persists session in client storage; handles token refresh transparently.
- **Password Recovery**:
  - "Forgot Password" modal triggering `supabase.auth.resetPasswordForEmail()`.
  - Password reset landing view allowing entry of new password.
- **Session Protection**:
  - Navigation guards intercepting route changes and evaluating active session state.
- **Log Out**:
  - Terminates session via `supabase.auth.signOut()` and purges memory state.

---

## 3. Feature: First-Time Onboarding Wizard

- **Step 1: Goal Purpose**:
  - Quick chips: `Emergency Fund`, `House Rent`, `School Fees`, `Work Laptop`, `500K Challenge`, `Custom`.
- **Step 2: Target Amount**:
  - Numeric input formatted with currency symbol (`₦`).
  - Validation: Must be > 0.
- **Step 3: Target Date**:
  - HTML5 date picker.
  - Validation: Must be a future date (minimum tomorrow).
- **Step 4: Contribution Cadence**:
  - Toggle: `Daily` or `Weekly`.
- **Step 5: Plan Summary**:
  - Displays: Required contribution rate, total days remaining.
  - Action: "Confirm & Launch Dashboard" writes record to `goals` table.

---

## 4. Feature: Core Savings Dashboard & Computations

### 4.1 Primary Metrics
- **Total Saved**: Sum of all logged `amount` entries for the active goal.
- **Target Amount**: Goal target amount.
- **Amount Remaining**: `Math.max(0, targetAmount - totalSaved)`.
- **Progress Percentage**: `Math.min(100, Math.round((totalSaved / targetAmount) * 100))`.

### 4.2 Streak Engine
- **Daily Mode Streak Rule**:
  - An unbroken sequence of consecutive days where at least one entry exists.
  - If a user saved yesterday, the streak is active. If they save today, streak increments by 1.
  - If a calendar day passes without a log, streak resets to 0 (or 1 on the current day's new log).
- **Weekly Mode Streak Rule**:
  - Measured by consecutive calendar weeks (Monday–Sunday) with logged savings.

### 4.3 Pace & Completion Projection
- **Formula**:
  - `daysElapsed = dateDifferenceInDays(firstEntryDate, today) + 1`
  - `dailyRate = totalSaved / daysElapsed`
  - `projectedDaysRemaining = amountRemaining / dailyRate`
  - `projectedFinishDate = today + projectedDaysRemaining`
- **Pace Status**:
  - If `projectedFinishDate <= targetDate` -> Display: *"On Pace to finish by [Date]! 🎉"*
  - If `projectedFinishDate > targetDate` -> Display: *"Behind pace. Increase daily savings to [NewAmount] to hit your deadline."*

### 4.4 Milestone Celebrations
- Milestones set at **25%**, **50%**, **75%**, and **100%**.
- When an added entry pushes progress across an uncelebrated threshold:
  1. Trigger lightweight canvas confetti animation.
  2. Display celebratory modal with milestone badge.
  3. Record milestone in local state/DB to prevent duplicate firing on page reloads.

---

## 5. Feature: Add Savings & Entry Management

### 5.1 Add Savings Flow
- **Presets**: 1x calculated daily amount, 2x daily amount, or rounded numbers (e.g. ₦1,000, ₦2,000, ₦5,000).
- **Custom Amount**: Form input with real-time numeric sanitization.
- **Double-Submit Prevention**: Button enters disabled/spinner state immediately upon click until the database write completes.
- **Toast Feedback**: Instant visual confirmation: *"Saved ₦[Amount]! Streak updated to [N] days 🌱"*.

### 5.2 History Ledger (Edit & Delete)
- **Table / List**: Chronological display of entries (Date, Amount, Note, Actions).
- **Edit Entry**:
  - Modal allowing modification of Amount, Date, and Note.
  - On save, recalculates dashboard totals, streaks, and milestones.
- **Delete Entry**:
  - Modal: *"Delete this entry of ₦[Amount]? This will adjust your total saved and streak."*
  - Requires explicit confirmation. Recalculates metrics immediately.

---

## 6. Feature: Settings & Portability

- **Goal Customization**: Adjust target amount, deadline, or goal title.
- **Theme Switcher**: Instant transition between Light and Dark mode, persisted in user preferences.
- **Reminders**: Schedule preferred notification times (e.g., 09:00, 14:00, 20:00).
- **Data Export**: Downloads a formatted JSON file of all goal parameters and entry history.
- **Legacy Import**: One-click import tool to migrate unauthenticated `localStorage` records into cloud database.
