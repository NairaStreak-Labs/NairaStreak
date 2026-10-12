# Production Quality & Performance Standards

> **Parent Organization**: NairaStreak Labs  
> **Target**: Web V1 Production Readiness Standards

---

## 1. Code Quality & Modularity Standards

- **Single Responsibility Principle**: Separate presentation, business logic, and API calls into distinct modules.
- **Maintain Documentation Integrity**: Preserve attribution and docstrings across code iterations.
- **Zero Unsanitized DOM Injections**: Prohibit `element.innerHTML = userInput`. Use `element.textContent` or sanitized DOM node creation to prevent XSS vulnerabilities.
- **Defensive Error Handling**: Wrap all asynchronous network calls in `try...catch` blocks with user-friendly toast notifications and fallback UI states.

---

## 2. Core Web Vitals (CWV) Performance Budgets

To deliver instant page loads on constrained African mobile networks (3G/4G):

| Metric | Threshold | Architectural Strategy |
| :--- | :--- | :--- |
| **Largest Contentful Paint (LCP)** | **< 2.0s** | Zero render-blocking scripts; critical CSS inline; native system fonts. |
| **Interaction to Next Paint (INP)** | **< 100ms** | Optimistic UI updates; debounced form inputs; lightweight DOM tree. |
| **Cumulative Layout Shift (CLS)** | **< 0.05** | Explicit image/icon dimensions; reserved space for dynamic progress bars. |
| **Bundle Size Budget** | **< 50 KB** (Initial payload) | Vanilla ES modules; single external CDN client (Supabase JS). |

---

## 3. Accessibility (a11y) & Usability Standards (WCAG 2.1 AA)

- **Semantic HTML**: Proper use of `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, and `<footer>` landmarks.
- **Form Labels & Error Associations**:
  - Every `<input>` has a bound `<label>`.
  - Error messages use `aria-live="polite"` and `aria-describedby`.
- **Keyboard Navigation**:
  - Every interactive element is reachable via `Tab` key.
  - Visible focus indicators (`outline: 2px solid var(--green); outline-offset: 2px`) are never suppressed.
  - Modals trap focus and close upon `Escape` key press.
- **Screen Reader Announcements**:
  - Progress updates announce percentages via `role="progressbar"`.
  - Toast notifications announce messages via `role="status"` or `aria-live="polite"`.
- **Color Contrast**: All text meets WCAG AA contrast ratio of at least 4.5:1 against card backgrounds.

---

## 4. Cross-Browser & Device Compatibility Matrix

The application must pass automated and manual rendering tests on:
- Google Chrome (Desktop & Android)
- Apple Safari (Desktop macOS & iOS Mobile Web / PWA)
- Mozilla Firefox (Desktop & Mobile)
- Microsoft Edge
- Android System WebView (used within banking and super-app browsers)
