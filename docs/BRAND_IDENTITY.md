# Brand Identity Guidelines — NairaStreak Labs

> **Parent Organization**: NairaStreak Labs  
> **Working Product Title**: 500K Challenge *(Consumer product name pending formal Phase 1 review)*  
> **Category**: Savings Habit & Goal Tracker  

---

## 1. Brand Essence & Personality

NairaStreak Labs exists to foster financial discipline through the psychology of momentum and consistency.

### What We Are
- **Disciplined**: Focused on steady daily/weekly execution rather than get-rich-quick shortcuts.
- **Optimistic**: Celebrating small wins, milestones, and personal progress.
- **Modern**: Clean, distraction-free digital interfaces built on high-performance web standards.
- **Trustworthy**: Honest, non-custodial, completely transparent; we never hold money.
- **African**: Rooted in regional savings cultures (Ajo, Esusu) and built for real-world economic realities.
- **Approachable**: Friendly language, encouraging micro-copy, zero banking jargon.
- **Financially Responsible**: Emphasizes realistic budgeting, emergency funds, and intentional saving.

### What We Are NOT
- ❌ **Not a Bank**: We do not custody, transfer, or clear funds.
- ❌ **Not a Crypto Platform**: No tokens, speculation, or volatility.
- ❌ **Not an Investment / Wealth Manager**: No financial advisory, stock trading, or yield generation.
- ❌ **Not a Loan / Credit Platform**: No borrowing, lending, debt, or interest fees.

---

## 2. Visual Identity System

### 2.1 Logo & Marks
- **Luxury Monogram (`logo.svg` / `assets/brand/nairastreak-luxury-monogram.jpg`)**:
  - An architectural geometric monogram centered on the capital letter **'N'**.
  - Seamlessly integrates an ascending streak trajectory (apex of consistency) and refined horizontal currency crossbars evoking the Nigerian Naira symbol (**₦**).
  - Executed in brushed champagne gold (`#d4af37`, `#e5c578`) on deep imperial forest green (`#083324`, `#041a12`) squircle container with metallic gold borders and an eight-point precision star of consistency.
  - Conveys the timeless prestige, precision, and discipline of an elite private wealth institution (Rolex/Cartier-level refinement).
- **Haute Medallion Seal (`assets/brand/nairastreak-luxury-seal.jpg`)**:
  - Circular luxury medallion seal for NairaStreak Labs featuring concentric micro-grooves, chamfered metallic rims, engraved institutional lettering, and central interlocking 'N' streak geometry.
- **Wordmark**: `NairaStreak` in high-contrast modern typography with subtle tracking, paired with `Labs` in muted contrast.
- **PWA & Platform App Icons**: High-resolution rendered 192×192 and 512×512 icons (`icon-192.png`, `icon-512.png`) derived directly from the vector luxury monogram.

### 2.2 Color System

The design system is formally specified as machine-readable design tokens in [`DESIGN.md`](../DESIGN.md).

| Role | Color Name | Hex Code | Light Theme Usage | Dark Theme Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Brand** | Emerald Green | `#047857` | Progress fills, active buttons, CTAs (WCAG AA compliant) | `#10b981` Vibrant emerald highlights |
| **Primary Deep** | Deep Forest | `#083324` | Hero card surface, auth story panel, brand badges | `#06281c` Deep container surface |
| **Primary Light / Tint** | Mint Soft | `#dcfce7` | Badge backgrounds, progress track containers | `#163524` container tint |
| **Navigation Tint** | Mint Tint | `#e8f5ec` | Active navigation pills, transaction icon boxes | `#173826` dark mode active pills |
| **Background** | Clean Off-White | `#f8faf9` | App canvas & page background | `#0f1712` midnight forest |
| **Surface / Card** | Pure White | `#ffffff` | Elevated cards, dialogs, forms | `#17211b` deep card surface |
| **Text Primary** | Deep Charcoal | `#1f2937` | Headings, core numbers, body copy | `#eef4f0` soft crisp text |
| **Text Muted** | Slate Gray | `#4b5563` | Subtitles, labels, timestamps | `#9ca8a1` muted light gray |
| **Borders** | Subtle Gray | `#f3f4f6` | Card borders, dividers | `#223028` subtle dark stroke |
| **Borders Strong** | Outline Gray | `#e5e7eb` | Form inputs, card strokes | `#2c3e34` dark input outlines |
| **Celebration Accent** | Gold / Amber | `#f59e0b` / `#b45309` | Confetti, milestone badges, streaks | `#fbbf24` fire emoji, streak badges |

### 2.3 Typography
- **Primary Typeface**: Native System UI Stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif`) for lightning-fast zero-latency rendering.
- **Tabular Figures (`tnum`)**: All currency (`₦`), percentage (`%`), and numeric countdown values use `font-variant-numeric: tabular-nums` to ensure exact column alignment and zero layout shifts.
- **Hierarchy**:
  - Display XXL: 56px, Bold (700), tracking -1.2px (Landing Page hero climax)
  - Display XL: 40px, Extra Bold (800), tracking -0.8px (`₦500,000` target)
  - Display LG: 36px, Extra Bold (800), tracking -0.5px (Hero total saved `₦34,250`)
  - Display MD: 28px, Extra Bold (800), tracking -0.3px (Pace value `₦1,280 / day`)
  - Headings: 24px (Goal Title) / 20px (Modal Headers) / 15px (Section Titles)
  - Body Text: 16px (Narrative) / 14px (UI body, inputs, button labels)
  - Tabular Body: 14px, Semibold (600), `tnum` (Ledger amounts, date entries)
  - Captions & Hints: 12px (400–500)
  - Micro Badges: 11px (600), tracking +0.02em (Status pills, navigation labels)

### 2.4 Iconography & Illustration Style
- **Iconography**: Crisp, lightweight line icons with consistent 2px stroke weights or contextual emojis (`💰`, `🔥`, `🌱`, `🎉`, `🎯`, `📲`).
- **Illustration Style**: Minimalist, flat vector graphics with warm, grounded accents. Avoid corporate fintech illustrations (e.g. flying coins, suited corporate figures).

### 2.5 Favicon & PWA Icons
- Multi-resolution square icons with generous padding (`icon-192.png`, `icon-512.png`), using the deep green canvas with crisp badge symbol for high visibility on home screens and browser tabs.

---

## 3. Voice, Tone & Messaging

| Situation | Voice Guideline | Example Copy |
| :--- | :--- | :--- |
| **Saving Logged** | Encouraging, celebrating consistency | *"Saved! Keep your streak going 🌱"* |
| **Missed Day** | Compassionate, non-judgmental, forward-looking | *"Every day is a fresh opportunity to build your streak."* |
| **Milestone Achieved** | Enthusiastic, validating progress | *"Halfway there! You've officially crossed 50% of your target 🎉"* |
| **Privacy / Trust** | Direct, honest, zero ambiguity | *"NairaStreak tracks your habit and numbers. We never touch or hold your money."* |
| **Landing Hero** | Direct, addressing emotional overwhelm | *"Turn intimidating savings goals into effortless daily wins."* |
