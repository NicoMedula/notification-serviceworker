/// <reference lib="webworker" />

const sw = self as unknown as ServiceWorkerGlobalScope;

sw.addEventListener('install', (event: ExtendableEvent) => {
  sw.skipWaiting();
  console.log('Service Worker installed');
});

sw.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Service Worker activated');
});

/* Removed no-op fetch event handler to avoid overhead */

/* Removed periodicsync event listener as it is not used and may cause issues */
