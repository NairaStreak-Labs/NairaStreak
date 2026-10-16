# Resources, Tooling & External References

> **Parent Organization**: NairaStreak Labs  
> **Topic**: Approved tooling, external services, design libraries, and references.

---

## 1. Cloud & Infrastructure Services

| Service | Category | Purpose | Documentation / Endpoint |
| :--- | :--- | :--- | :--- |
| **Supabase** | BaaS (Backend) | Managed PostgreSQL, GoTrue Auth, and Row Level Security | [https://supabase.com/docs](https://supabase.com/docs) |
| **Vercel** | Static Hosting & CDN | Automated Git deploys, global edge caching, SSL, and custom headers | [https://vercel.com/docs](https://vercel.com/docs) |
| **GitHub** | Source Control | Organization repositories, issue tracking, and automated workflows | [https://github.com/nairastreak-labs](https://github.com/nairastreak-labs) |

---

## 2. Client Libraries & CDN Assets

To maintain our zero-bloat, high-performance architecture, only lightweight, essential libraries are permitted:

- **Supabase JavaScript Client**:
  - CDN: `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`
  - Usage: User authentication, database queries, and session state.
- **Canvas Confetti**:
  - CDN: `https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js`
  - Size: ~3.8 KB (gzipped)
  - Usage: Milestone celebrations at 25%, 50%, 75%, and 100%.

---

## 3. Design Assets & Iconography

- **System Fonts**: Native device UI fonts (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`) to ensure 0ms font download latency.
- **PWA Icons**:
  - [`icon-192.png`](icon-192.png): 192x192 PNG for Android launcher & notification badge.
  - [`icon-512.png`](icon-512.png): 512x512 PNG for high-res splash screens and web store listings.

---

## 4. Development & Testing Utilities

- **Local Development Server**: `npx serve .` or `npx live-server .`
- **PWA & Performance Auditing**: Google Lighthouse (Built into Chrome DevTools).
- **Accessibility Auditing**: axe DevTools, Chrome DevTools Accessibility Tree, WAVE accessibility checker.
