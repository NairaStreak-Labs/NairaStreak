# Progressive Web App (PWA) Requirements & Hardening

> **Parent Organization**: NairaStreak Labs  
> **Working Product Title**: 500K Challenge  
> **Standard**: W3C Progressive Web App Standards / Lighthouse PWA Audit

---

## 1. PWA Foundation & Objectives

The application must remain fully installable to mobile and desktop home screens, offering a native-app-like launch experience while operating securely.

---

## 2. Hardened Service Worker Architecture (`sw.js`)

### 2.1 Caching Strategy: Stale-While-Revalidate (App Shell Only)
The Service Worker caches static presentation assets required to boot the application shell offline:
- HTML markup (`index.html`)
- CSS stylesheets
- Modular client-side JS bundles
- Static icons (`icon-192.png`, `icon-512.png`) and web fonts

### 2.2 Security Rules: Strict API & Auth Caching Isolation
> [!CAUTION]
> Private data, session tokens, and dynamic API responses must NEVER be stored in the Service Worker Cache Storage.

The Service Worker must explicitly bypass caching for:
1. All cross-origin and same-origin Supabase requests (`https://*.supabase.co/*`).
2. Any request containing an `Authorization` HTTP header.
3. Any HTTP method other than `GET` (`POST`, `PUT`, `PATCH`, `DELETE`).

```javascript
// Hardened fetch handler enforcement in sw.js
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Bypass all backend API, authentication, and database requests
  if (url.hostname.includes('supabase.co') || event.request.headers.has('Authorization')) {
    return; // Pass through to live network unconditionally
  }

  // 2. Only cache GET requests for static shell assets
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
        return networkResponse;
      });
    })
  );
});
```

---

## 3. Web App Manifest Standards (`manifest.json`)

```json
{
  "name": "500K Challenge | NairaStreak",
  "short_name": "NairaStreak",
  "description": "Build consistent daily savings habits with NairaStreak Labs.",
  "start_url": "./index.html",
  "scope": "./",
  "display": "standalone",
  "background_color": "#f8faf9",
  "theme_color": "#16a34a",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["finance", "productivity", "utilities"]
}
```

---

## 4. Offline Fallback & Network Reconnection UX

When a user loses internet connectivity while running the installed PWA:
1. **App Shell Remains Visible**: The dashboard shell, cached forms, and previously loaded data remain interactive.
2. **Offline Indicator Banner**: A subtle banner informs the user: *"You are currently offline. Recent changes will sync once connection is restored."*
3. **Graceful Action Disabling or Local Queuing**:
   - For V1, disable new cloud goal submissions with clear feedback: *"Internet connection required to log to cloud."*
   - Or allow optimistic local recording that flushes to Supabase upon reconnection via the `window.addEventListener('online')` event listener.
