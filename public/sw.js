// Push Vantage High-Speed Edge & Offline Cache Service Worker
const CACHE_NAME = 'pv-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/images/hero_workwear_production_1792390994823.webp',
  '/images/product_reflective_overalls_1792390996791.webp',
  '/images/shop_hoodies_sweatshirts_1792391772659.webp',
  '/images/shop_branded_mugs_drinkware_1792391771954.webp',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests from the same origin or CDN fonts
  if (request.method !== 'GET') return;

  // Cache-first for images, fonts, and hashed assets
  if (
    url.pathname.startsWith('/images/') ||
    url.pathname.startsWith('/assets/') ||
    url.origin.includes('fonts.gstatic.com') ||
    url.origin.includes('fonts.googleapis.com')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseToCache);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);
      })
    );
    return;
  }

  // Stale-while-revalidate for HTML and scripts
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => caches.match(request).then((res) => res || caches.match('/')))
    );
  }
});
