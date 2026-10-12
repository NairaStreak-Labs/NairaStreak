# Product Requirements Document (PRD) — Web V1

> **Parent Brand**: NairaStreak Labs  
> **Working Product Title**: 500K Challenge *(Configurable for arbitrary savings goals)*  
> **Document Status**: Approved Baseline  
> **Target Release**: Web V1  

---

## 1. Problem Statement & Mission

Many people set ambitious savings goals (such as saving ₦500,000 for emergency funds, rent, or tuition) but struggle with consistency. Large lump sums appear intimidating, leading to procrastination or abandoned efforts.

**Mission**: Break intimidating financial goals into daily and weekly micro-commitments, using streak tracking, visible momentum, and positive reinforcement to build lifelong savings discipline.

---

## 2. Core Customer Journey (Minimum Viable Flow)

Web V1 will only be declared complete once the following end-to-end journey functions seamlessly:

```
LANDING PAGE
    ↓
SIGN UP / LOG IN
    ↓
ONBOARDING
    ↓
CREATE SAVINGS GOAL
    ↓
DASHBOARD
    ↓
LOG SAVINGS
    ↓
SEE PROGRESS
    ↓
VIEW HISTORY
    ↓
RETURN LATER
    ↓
LOG IN
    ↓
CONTINUE FROM SAME DATA
```

---

## 3. Product Scope & Functional Requirements

### 3.1 Public Storytelling Landing Page
- Emotional hook highlighting the challenge of savings consistency.
- Step-by-step breakdown: Big Goal -> Daily/Weekly Actions -> Visible Progress.
- Realistic interactive product dashboard preview.
- Habit, streak, and milestone explanation.
- **Privacy & Non-Custodial Trust**: Explicit statement that the app does not hold funds, provide loans, or act as an investment broker.
- Clear Primary Call to Action: "Create your first savings goal".

### 3.2 Authentication & Session Management
- Sign Up with email & password.
- Log In with email & password.
- Password recovery (Forgot Password & Reset Password via email link).
- Persistent authenticated session across browser reloads.
- Protected routes (Dashboard, Onboarding, Settings inaccessible to unauthenticated visitors).
- Secure Logout.

### 3.3 First-Time Onboarding Wizard
- Guided multi-step modal/flow upon initial account creation:
  1. Welcome & motivation.
  2. Goal name selection (presets: Emergency Fund, Rent, School Fees, Laptop, ₦500K Challenge, or Custom).
  3. Target amount input (flexible currency/amount, defaulting to ₦500,000).
  4. Target completion date selector.
  5. Cadence preference (Daily vs. Weekly).
  6. Calculated plan display (required savings per period).
  7. Confirm and launch into Dashboard.

### 3.4 Core Dashboard
- **Top Metrics**: Goal Name, Target Amount, Total Saved, Amount Remaining, Progress Percentage.
- **Visual Progress Bar**: Dynamic smooth progress indicator.
- **Cadence & Projections**: Target date, recommended contribution amount, projected completion date based on actual run-rate.
- **Habit Matrix**: Active streak counter and calendar visualization showing logged days.
- **Milestones**: Micro-celebrations and confetti triggers at 25%, 50%, 75%, and 100%.
- **Primary CTA**: Prominent "Add Savings" action button.

### 3.5 Savings Logging Engine
- Quick preset buttons (e.g., standard daily amounts) + Custom amount input field.
- Optional transaction note field.
- Double-submit prevention (disabled state during submission).
- Immediate reactive UI update of totals, streaks, and progress percentages.

### 3.6 Savings History & Ledger
- Chronological list of logged contributions with dates, amounts, and notes.
- In-place Edit functionality for mistaken entries.
- Delete entry action with mandatory confirmation dialog.
- Automatic recalculation of totals, streaks, and milestones upon deletion or edit.

### 3.7 Settings & Account Management
- Edit goal parameters (name, target amount, deadline, daily/weekly mode).
- Theme toggle (Light / Dark mode).
- Notification preferences.
- Data export (JSON backup) for local portability.
- Account profile & logout button.

---

## 4. Non-Functional Requirements

| Metric | Target Standard |
| :--- | :--- |
| **Cross-Device Responsiveness** | Flawless rendering at 375px, 390px, 768px, 1024px, 1440px |
| **Performance** | LCP < 2.0s, FID/INP < 100ms, CLS < 0.1 |
| **Offline Capability** | Service worker app shell cache; graceful offline notification |
| **Accessibility (a11y)** | WCAG 2.1 AA compliant; full keyboard navigability; visible focus rings |
| **Security** | Row Level Security (RLS) on database; HTTPS only; zero token exposure |

---

## 5. Web V1 Completion Gate Criteria

Web V1 is blocked from production signoff until all 17 items pass:
1. Public Storytelling Landing Page
2. Sign Up with validation
3. Log In with persistent session
4. Log Out
5. Password recovery
6. Protected dashboard route
7. First-time onboarding wizard
8. Custom goal creation
9. Add savings (preset & custom amounts)
10. Reactive progress & streak calculation
11. History list
12. Edit & delete entry with verification
13. Persistent cloud storage with cross-user isolation
14. Responsive mobile & desktop UI
15. Progressive Web App installation
16. Standalone production deployment on Netlify
17. Automated & manual test plan signoff
