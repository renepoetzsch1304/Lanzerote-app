const CACHE = 'lanzarote-pwa-v10';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => self.clients && self.clients.claim());
const ASSETS = ['./','./index.html','./manifest.webmanifest'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k !== CACHE).map(k => caches.delete(k))
  )));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
