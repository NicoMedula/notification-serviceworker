self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
});

/* Removed no-op fetch event handler to avoid overhead */


/* Removed periodicsync event listener as it is not used and may cause issues */
