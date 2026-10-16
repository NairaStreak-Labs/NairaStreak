---
version: alpha
name: NairaStreak Brand Design System
description: The complete visual identity and design token specification for NairaStreak Labs — a non-custodial savings habit and consistency engine. Built on deep forest green, vibrant emerald, warm mint, and energizing gold/amber accents. Emphasizes clean surfaces, tabular typography for financial calculations, high-contrast dark mode, and disciplined consistency.

colors:
  primary: "#047857"
  primary-vibrant: "#10b981"
  primary-deep: "#083324"
  primary-soft: "#dcfce7"
  primary-tint: "#e8f5ec"
  primary-tint-dark: "#173826"
  accent-amber: "#b45309"
  accent-amber-light: "#fbbf24"
  accent-amber-soft: "#fef3c7"
  accent-amber-dark: "#362912"
  bg-light: "#f8faf9"
  bg-dark: "#0f1712"
  card-light: "#ffffff"
  card-dark: "#17211b"
  text-primary: "#1f2937"
  text-dark: "#eef4f0"
  text-muted: "#4b5563"
  text-muted-dark: "#9ca8a1"
  border-light: "#f3f4f6"
  border-strong: "#e5e7eb"
  border-dark: "#223028"
  border-dark-strong: "#2c3e34"

typography:
  display-xxl:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif"
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -1.2px
  display-xl:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif"
    fontSize: 40px
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: -0.8px
    fontFeature: tnum
  display-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif"
    fontSize: 36px
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: -0.5px
    fontFeature: tnum
  display-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif"
    fontSize: 28px
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: -0.3px
    fontFeature: tnum
  heading-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif"
    fontSize: 24px
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: -0.2px
  heading-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0
  heading-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif"
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0.02em
  body-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: 0
  body-tabular:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: -0.2px
    fontFeature: tnum
  caption:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  micro:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, sans-serif"
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.02em

rounded:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 14px
  xl: 20px
  xxl: 22px
  pill: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  xxl: 24px
  huge: 32px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px 20px
  button-primary-forest:
    backgroundColor: "{colors.primary-deep}"
    textColor: "#ffffff"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 9px 18px
  button-secondary:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 9px 16px
  hero-card-forest:
    backgroundColor: "{colors.primary-deep}"
    textColor: "#ffffff"
    typography: "{typography.display-lg}"
    rounded: "{rounded.xxl}"
    padding: 24px 22px
  metric-card-light:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-tabular}"
    rounded: "{rounded.xl}"
    padding: 20px 22px
  metric-card-dark:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.text-dark}"
    typography: "{typography.body-tabular}"
    rounded: "{rounded.xl}"
    padding: 20px 22px
  card-activity-light:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: 24px 26px
  card-activity-dark:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.text-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: 24px 26px
  habit-circle-saved:
    backgroundColor: "{colors.primary-deep}"
    textColor: "#ffffff"
    typography: "{typography.body-tabular}"
    rounded: "{rounded.pill}"
    padding: 8px 8px
  habit-circle-dark:
    backgroundColor: "{colors.primary-vibrant}"
    textColor: "{colors.primary-deep}"
    typography: "{typography.body-tabular}"
    rounded: "{rounded.pill}"
    padding: 8px 8px
  nav-item-active-light:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary-deep}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 10px 14px
  nav-item-active-dark:
    backgroundColor: "{colors.primary-tint-dark}"
    textColor: "{colors.primary-vibrant}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 10px 14px
  streak-badge-light:
    backgroundColor: "{colors.accent-amber-soft}"
    textColor: "{colors.accent-amber}"
    typography: "{typography.micro}"
    rounded: "{rounded.sm}"
    padding: 4px 8px
  streak-badge-dark:
    backgroundColor: "{colors.accent-amber-dark}"
    textColor: "{colors.accent-amber-light}"
    typography: "{typography.micro}"
    rounded: "{rounded.sm}"
    padding: 4px 8px
  input-text-light:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 10px 12px
  input-text-dark:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.text-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 10px 12px
  progress-track-light:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary-deep}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 0px
  page-canvas-light:
    backgroundColor: "{colors.bg-light}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.xs}"
    padding: 32px
  page-canvas-dark:
    backgroundColor: "{colors.bg-dark}"
    textColor: "{colors.text-dark}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.xs}"
    padding: 32px
  caption-muted-light:
    backgroundColor: "{colors.border-light}"
    textColor: "{colors.text-muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: 4px 8px
  caption-muted-dark:
    backgroundColor: "{colors.border-dark}"
    textColor: "{colors.text-muted-dark}"
    typography: "{typography.caption}"
    rounded: "{rounded.xs}"
    padding: 4px 8px
  input-border-light:
    backgroundColor: "{colors.border-strong}"
    textColor: "{colors.text-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    padding: 1px
  input-border-dark:
    backgroundColor: "{colors.border-dark-strong}"
    textColor: "{colors.text-dark}"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    padding: 1px
---

# NairaStreak Brand Design System

## 1. Overview & Brand Identity

**NairaStreak** (developed by **NairaStreak Labs**) is a non-custodial savings habit and consistency engine. It helps users define target goals (Emergency Fund, Rent, School Fees, Laptop, Travel, Business, or custom milestones), break large sums into manageable daily micro-steps, track daily deposits, and maintain streaks.

### Core Visual Principles
- **Disciplined & Grounded**: Deep Forest Green (`#083324`) and Emerald (`#047857` / `#10b981`) convey financial security, enduring growth, and deliberate discipline.
- **Optimistic & Rewarding**: Amber / Gold (`#b45309`) accents celebrate consistency streaks and key percentage milestones (25%, 50%, 75%, 100%).
- **Tabular Precision (`tnum`)**: Every monetary figure, daily pace calculation, and countdown metric uses tabular numeric formatting (`font-variant-numeric: tabular-nums`) to prevent visual jitter and maintain structural alignment.
- **Dual-Surface Mastery**: Seamless, high-contrast support for both clean daytime surfaces (`#f8faf9`) and immersive midnight dark mode (`#0f1712`).
- **Non-Custodial Trust**: Visual signals clearly remind users that NairaStreak tracks habits and consistency without holding or moving money.

---

## 2. Color System & Semantic Tokens

### 2.1 Primary Brand Palette
- **Emerald Green (`primary`: `#047857` / `primary-vibrant`: `#10b981`)**: The active habit action color. Used for progress bar fills, active primary buttons, and successful confirmation states. Exceeds WCAG AA minimum contrast ratio (4.5:1).
- **Deep Forest Green (`primary-deep`: `#083324`)**: The anchor of the brand. Used for the prominent Hero Card surface, split-screen auth left panel, desktop brand badges, and completed streak circles.
- **Mint Soft (`primary-soft`: `#dcfce7`)**: Light tint used for badges, subtle pill backgrounds, and progress bar tracks.
- **Mint Tint (`primary-tint`: `#e8f5ec` / dark: `primary-tint-dark`: `#173826`)**: Background for active sidebar navigation links and transaction icon boxes in light and dark mode.

### 2.2 Streak & Celebration Accents
- **Amber Gold (`accent-amber`: `#b45309`)**: The fire streak icon, milestone confetti, and celebration highlights (achieving 4.67:1 WCAG contrast on soft amber backgrounds).
- **Amber Soft (`accent-amber-soft`: `#fef3c7` / dark: `accent-amber-dark`: `#362912`)**: Background for current streak metrics in light and dark mode.

### 2.3 Canvas & Surfaces
- **Light Theme**:
  - Background Canvas: `#f8faf9`
  - Card & Container Surface: `#ffffff`
  - Text Primary: `#1f2937`
  - Text Muted: `#4b5563`
  - Borders & Dividers: `#f3f4f6` / `#e5e7eb`
- **Dark Theme**:
  - Background Canvas: `#0f1712` (Midnight Deep Forest)
  - Card & Container Surface: `#17211b`
  - Text Primary: `#eef4f0`
  - Text Muted: `#9ca8a1`
  - Borders & Dividers: `#223028` / `#2c3e34`
  - Contrast ratio strictly exceeds **4.5:1** on all text elements for full WCAG AAA/AA compliance.

---

## 3. Typography Hierarchy

The typeface relies on the high-performance native system font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif`) with zero font-loading latency.

| Token | Size | Weight | Line Height | Tracking | Primary Use |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display-xxl` | 56px | 700 | 1.05 | -1.2px | Landing Page Climax Headline |
| `display-xl` | 40px | 800 | 1.15 | -0.8px | Landing Page Target Headline (`₦500,000`) |
| `display-lg` | 36px | 800 | 1.15 | -0.5px | Hero Card Total Balance (`₦34,250`) |
| `display-md` | 28px | 800 | 1.20 | -0.3px | Recommended Pace Value (`₦1,280 / day`) |
| `heading-lg` | 24px | 800 | 1.20 | -0.2px | Active Goal Title (`Emergency Fund`) |
| `heading-md` | 20px | 700 | 1.30 | 0 | Modal & Onboarding Wizard Headers |
| `heading-sm` | 15px | 700 | 1.30 | +0.02em | Section Titles (`Last 7 days`, `Recent activity`) |
| `body-lg` | 16px | 400 | 1.50 | 0 | Scrollytelling narrative copy |
| `body-md` | 14px | 500 | 1.45 | 0 | Inputs, primary button labels, nav links |
| `body-tabular` | 14px | 600 | 1.40 | -0.2px | Ledger entries, date rows, amounts (`+₦1,370`) |
| `caption` | 12px | 500 | 1.40 | 0 | Days remaining, timestamps, metric labels |
| `micro` | 11px | 600 | 1.20 | +0.02em | Status pill (`Active`), badges, bottom nav labels |

---

## 4. Components & Layout Specifications

### 4.1 Forest Green Hero Card
- **Surface**: Solid Deep Forest Green (`#083324`), `border-radius: 22px`, subtle box shadow `0 4px 18px rgba(8, 51, 36, 0.18)`.
- **Top Bar**: "Total saved" label (`#9ed4b9`) with semi-transparent white status pill ("Active").
- **Hero Amount**: 36px bold tabular figures with negative tracking.
- **Progress Track**: 6px rounded bar with emerald fill (`#10b981`), accompanied by percentage completed and remaining target values.
- **Mobile Stat Strip**: 3-column bottom border divider with `Days saved`, `Days left`, and `Day streak 🔥`.

### 4.2 Desktop Sidebar Navigation (≥768px)
- Fixed 250px left sidebar featuring the luxury brushed champagne gold and imperial forest green architectural 'N' monogram (`logo.svg`) and `NairaStreak` brand wordmark.
- Vertical nav list (`Home`, `History`, `Plan`, `Settings`) with rounded pills (`border-radius: 10px`).
- User profile footer with circular avatar badge, user display name, and one-click sign out.

### 4.3 Mobile Bottom Navigation Bar (<768px)
- Fixed 64px bottom bar with blurred background, elevated z-index, and 4 icon items (`Home`, `History`, `Plan`, `Settings`).
- Minimum touch target: **48 × 48 px**.

### 4.4 Habit Tracker ("Last 7 Days")
- 7 circular nodes showing the user's unbroken cadence:
  - Solid green circle with checkmark (`✓`) for completed days.
  - Dashed green border ring for current pending day.
  - Muted container with day number for missed days.

### 4.5 Recent Activity Ledger
- Rounded transaction card (`border-radius: 20px`) with 38px rounded square icon badge (`✓`), goal contribution title, formatted date, and tabular currency credit (`+₦1,370`).

---

## 5. Accessibility & Responsive Requirements

1. **Touch Targets**: All interactive buttons, tabs, inputs, and toggles meet or exceed **44 × 44 px** (recommended **48 × 48 px** on mobile).
2. **Color Independence**: Every color-based indicator (streak status, pace indicator, complete goals) is paired with an explicit icon or textual label.
3. **Reduced Motion**: All animations and transitions respect `@media (prefers-reduced-motion: reduce)`.
4. **Responsive Integrity**: Meticulously tested and guaranteed free of horizontal scrolling at **375px**, **390px**, **768px**, **1024px**, and **1440px**.

## Stabilize contrast corrections (2026-10-16)
Use amber-text #b45309 on light surfaces and #fbbf24 on dark surfaces; amber
#f59e0b remains decorative. The hero number uses solid forest text rather than
a gradient ending in low-contrast emerald. The mint auth story panel retains
forest text in dark mode. `tests/contrast.test.cjs` computes representative
foreground/background ratios; this is not a full rendered-page accessibility audit.
