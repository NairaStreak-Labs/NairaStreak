# Design Guidelines & System Specs

> **Parent Organization**: NairaStreak Labs  
> **Design Philosophy**: Mobile-First, Content-Focused, Emotionally Rewarding, Accessible

---

## 1. Responsive Viewport Grid & Breakpoints

The web product must be meticulously designed and tested across the following core breakpoints:

| Breakpoint | Target Devices | Layout Behavior |
| :--- | :--- | :--- |
| **375 px** | iPhone SE, small Android handsets | Single column, compact padding (16px), full-width cards |
| **390 px** | iPhone 13/14/15/16 baseline | Standard mobile container, comfortable touch targets (48px) |
| **768 px** | Tablets (iPad Mini / Portrait) | Centered 560px container or 2-column dashboard layout |
| **1024 px** | Laptops / iPad Landscape | Split view: Sidebar/Hero metrics on left, ledger/actions on right |
| **1440 px** | Modern Desktop Monitors | Max app width 1120px, spacious typography, enhanced analytics cards |

```css
/* Responsive container guidelines */
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
}

@media (min-width: 768px) {
  .container {
    max-width: 680px;
    padding: 0 24px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1080px;
    padding: 0 32px;
  }
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
}
```

---

## 2. Touch Targets & Interaction Ergonomics

- **Minimum Touch Target**: All interactive controls (buttons, inputs, tab switchers, icon links) must meet the W3C minimum of **44 × 44 px** (recommended: 48 × 48 px on mobile).
- **Haptic & Visual Feedback**: All button presses must have immediate active states (`transform: scale(0.98)` or distinct active background color).
- **Visible Focus States**: Visible focus ring on keyboard navigation (`outline: 2px solid var(--green); outline-offset: 2px`).

---

## 3. Elevation, Cards & Dark Mode System

```css
:root {
  /* Core Palette */
  --green: #16a34a;
  --green-dark: #059669;
  --green-light: #dcfce7;
  --bg: #f8faf9;
  --card: #ffffff;
  --text: #1f2937;
  --muted: #6b7280;
  --border: #f3f4f6;
  --radius-card: 16px;
  --radius-btn: 12px;
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
}

body.dark {
  --bg: #0f1712;
  --card: #17211b;
  --text: #eef4f0;
  --muted: #9ca8a1;
  --border: #223028;
  --green-light: #163524;
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.3);
}
```

---

## 4. Accessibility (a11y) Rules

1. **Non-Reliance on Color**: Information communicated by color (such as streak status or pace) must be accompanied by text labels, numbers, or icons.
2. **Accessible Progress Meters**:
   ```html
   <div role="progressbar" 
        aria-valuenow="65" 
        aria-valuemin="0" 
        aria-valuemax="100" 
        aria-label="Savings goal progress: 65% saved">
   </div>
   ```
3. **Form Accessibility**: Explicit `<label>` elements linked to inputs with matching `for` and `id` attributes. Error messages must have `role="alert"` and link via `aria-describedby`.
4. **Color Contrast**: Contrast ratio must exceed **4.5:1** for regular text and **3:1** for large text against both light and dark card backgrounds.
