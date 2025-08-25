const CACHE_NAME = 'sistema-voult-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/src/main.tsx',
  '/src/App.tsx'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests and non-GET requests
  if (!event.request.url.startsWith(self.location.origin) || event.request.method !== 'GET') {
    return;
  }

  // Skip Vite dev server requests in development
  if (event.request.url.includes('@vite') || 
      event.request.url.includes('@react-refresh') ||
      event.request.url.includes('localhost:5174')) {
    return;
  }

  // Skip Firebase and external API requests
  if (event.request.url.includes('firestore.googleapis.com') || 
      event.request.url.includes('firebase') ||
      event.request.url.includes('googleapis.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request).catch((error) => {
          console.log('Fetch failed for:', event.request.url, error);
          // For navigation requests, return a fallback page
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          // For other requests, return a generic error response
          return new Response('Network error', {
            status: 408,
            statusText: 'Network timeout'
          });
        });
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push notification
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Novo pedido recebido!',
    icon: '/icon.svg',
    badge: '/icon.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Pedido',
        icon: '/icon.svg'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icon.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Sistema Voult', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/pedidos')
    );
  }
});