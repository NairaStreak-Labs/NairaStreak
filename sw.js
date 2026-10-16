const CACHE_NAME = 'nairastreak-shell-v3';
const ASSETS = ['./', './index.html', './config.js', './calculations.js', './ledger.js',
  './legacy-data.js', './icons.js', './ledger-ui.js', './validation.js', './auth-controls.js',
  './install-controls.js', './sidebar-controls.js', './stabilize.css', './manifest.json',
  './logo.svg', './icon-192.png', './icon-512.png'];
const shellURLs = new Set(ASSETS.map(path => new URL(path, self.registration.scope).href));
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys
    .filter(key => key.startsWith('nairastreak-') && key !== CACHE_NAME)
    .map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  // Strict allowlist excludes APIs, auth, query strings, non-GETs and all other origins.
  if (request.method !== 'GET' || request.headers.has('Authorization') ||
      url.origin !== self.location.origin || !shellURLs.has(url.href)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const response = await fetch(request);
      if (response.ok && response.type === 'basic') await cache.put(request, response.clone());
      return response;
    } catch (_) {
      const cached = await cache.match(request);
      if (cached) return cached;
      if (request.mode === 'navigate') {
        const shell = await cache.match('./index.html');
        if (shell) return shell;
      }
      return Response.error();
    }
  })());
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(windows => {
    const target = windows.find(client => 'focus' in client);
    return target ? target.focus() : self.clients.openWindow('./index.html');
  }));
});
