# Test Plan & Verification Matrix — Web V1

> **Parent Organization**: NairaStreak Labs  
> **Status**: Comprehensive Test Suite Specification  
> **Objective**: Guarantee 100% reliability of the primary customer journey and security boundaries.

---

## 1. Critical Golden Journey Test (Mandatory Pass Gate)

This test sequence must pass unconditionally before any code is tagged for release:

```
[TC-01] Visitor Opens Landing Page
   │  Verify: Hero narrative, interactive calculator, and CTA are interactive.
   ▼
[TC-02] Create Account
   │  Action: Sign up with valid email & secure password.
   │  Verify: User record created in Supabase Auth; redirected to Onboarding.
   ▼
[TC-03] First-Time Onboarding & Goal Creation
   │  Action: Configure Goal (Name: "Emergency Fund", Target: ₦500,000, Date: 2026-12-31, Daily).
   │  Verify: Goal written to database; redirected to active Dashboard.
   ▼
[TC-04] Add First Savings Entry
   │  Action: Log ₦3,676 with note "Day 1 deposit".
   │  Verify: Button enters loading state (no double submits); Total updates to ₦3,676; Streak = 1.
   ▼
[TC-05] Page Refresh Persistence
   │  Action: Perform hard browser refresh (`Ctrl+F5` / `Cmd+Shift+R`).
   │  Verify: Dashboard instantly re-hydrates with ₦3,676 saved, Streak = 1, same goal intact.
   ▼
[TC-06] Log Out
   │  Action: Click Log Out in Settings.
   │  Verify: Session cleared from memory; user redirected to Public Landing Page; dashboard route inaccessible.
   ▼
[TC-07] Log In as Returning User
   │  Action: Enter email and password.
   │  Verify: Successfully authenticates; restores exact same goal, history ledger, streak, and metrics.
```

---

## 2. Multi-Tenant Data Isolation Test (Row Level Security)

| Test ID | Test Scenario | Execution Step | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-SEC-01** | Cross-User Goal Read Attempt | User B queries `goals` with `id` belonging to User A. | Query returns `0` rows. No data leak. |
| **TC-SEC-02** | Cross-User Entry Insert Attempt | User B attempts to insert `savings_entry` with User A's `goal_id`. | Database rejects write with RLS violation error. |
| **TC-SEC-03** | Cross-User Entry Mutation Attempt | User B attempts to `UPDATE` or `DELETE` User A's entry. | Affected rows = `0`. Record remains unchanged. |

---

## 2.1 Authentication UI & Modal Presentation Matrix

| Test ID | Test Scenario | Execution Step | Expected Result |
| :--- | :--- | :--- | :--- |
| **TC-AUTH-01** | Initial Page Load | Visitor opens root URL (`/`). | Auth modal is completely hidden (`display: none`); landing page visible; zero auth backdrop. |
| **TC-AUTH-02** | View Exclusivity — Sign Up | Click "Start Your First Streak". | Modal opens; ONLY Signup view is visible (`visibleCount: 1`); `aria-labelledby="authHeadingSignup"`; `#signupName` focused; empty error box hidden. |
| **TC-AUTH-03** | View Exclusivity — Sign In | Click "Sign In" link in modal or nav. | ONLY Signin view is visible; `aria-labelledby="authHeadingSignin"`; `#signinEmail` focused; previous errors cleared. |
| **TC-AUTH-04** | View Exclusivity — Forgot Password | Click "Forgot password?" from Signin. | ONLY Forgot view is visible; `aria-labelledby="authHeadingForgot"`; `#forgotEmail` focused; errors cleared. |
| **TC-AUTH-05** | View Exclusivity — Recovery | Trigger via verified recovery event. | ONLY Recovery view is visible; `aria-labelledby="authHeadingRecovery"`; `#recoveryPassword` focused. |
| **TC-AUTH-06** | Accidental #recovery Guard | Visitor enters `/#recovery` directly. | Modal does not open recovery view; redirects to landing; toast notifies user. |
| **TC-AUTH-07** | Error Box Visibility | Submit form with missing/invalid inputs. | Only relevant error alert displays; empty error boxes never visible; cleared on view switch or modal close. |
| **TC-AUTH-08** | Escape & Opener Focus | Press `Escape` key inside modal. | Modal closes cleanly; focus restored to the button that opened the modal. |

---

## 3. Negative & Edge Case Validation Matrix

| Test ID | Category | Input / Trigger | Expected Behavior |
| :--- | :--- | :--- | :--- |
| **TC-VAL-01** | Zero Amount | Enter `0` in savings amount input. | Form validation flags: *"Savings amount must be greater than zero."* Submit disabled. |
| **TC-VAL-02** | Negative Amount | Enter `-5000` in savings amount. | Input rejects negative sign or displays error; DB check constraint prevents write. |
| **TC-VAL-03** | Non-Numeric Input | Enter `abc` or special symbols. | Sanitized to blank; submission prevented. |
| **TC-VAL-04** | Invalid Target Date | Choose past date in goal settings. | Date picker enforces `min="tomorrow"`; error on manual entry. |
| **TC-VAL-05** | Entry Edit | Edit existing entry from ₦3,000 to ₦5,000. | Total Saved increases by ₦2,000; progress percentage updates; ledger reflects changes. |
| **TC-VAL-06** | Entry Deletion | Delete entry with confirmation dialog. | Prompt displays; upon confirmation, entry removed; total saved reduces; streak recalculates. |
| **TC-VAL-07** | Double Click | Rapid double-click on "Log Savings". | Button disables after first click; exactly 1 entry created. |
| **TC-VAL-08** | Goal Completion | Total saved exceeds target amount. | Progress bar locks at 100%; celebratory confetti fires; status changes to "Completed". |

---

## 4. Responsive & Device Test Matrix

| Viewport Width | Target Platform | Test Verification Criteria |
| :--- | :--- | :--- |
| **375 px** | iPhone SE / Budget Android | No horizontal overflow; all touch targets >= 44px; text easily legible. |
| **390 px** | Standard Mobile Viewport | Cards padded at 16px; modal dialogs fit within screen bounds. |
| **768 px** | Tablet Portrait | Centered max-width container; grid elements adjust gracefully. |
| **1024 px** | Laptop / Tablet Landscape | Two-column dashboard layout (Metrics left, Ledger right); zero clipping. |
| **1440 px** | Desktop Monitor | Max container capped at 1080px; typography scaled appropriately. |

---

## 5. Offline & PWA Verification

- [ ] **Shell Cache**: Turn on Chrome DevTools "Offline" mode; page refreshes and loads app shell without error.
- [ ] **Install Prompt**: "Add to Home Screen" appears on supported browsers over HTTPS.
- [ ] **Token Safety**: Verify Chrome DevTools -> Application -> Cache Storage -> Cache contains NO requests to `supabase.co`.
