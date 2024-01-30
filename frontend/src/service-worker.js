/* eslint-disable no-restricted-globals */
// Install Event - Cache static assets during installation
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache-name').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/script.js',
          // Add more files to cache here
        ]);
      })
    );
  });
  
  // Fetch Event - Intercept and serve cached responses or fetch from the network
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  
  // Activate Event - Clean up old caches when a new version is activated
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== 'my-cache-name') {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  
  // Add any additional functionality or
  