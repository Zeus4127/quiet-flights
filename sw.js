// Offline copy of Quiet Flights: always try the network first, fall back to the saved copy with no signal.
const CACHE = 'qf-2026-11-15-0400';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', './index.html', './app/', './app/index.html', './data/app_data.js', './data/economy_data.js', './app/economy_logic.js', './app/economy_ui.js', './app/travel_kit.js', './app/travel_tools.js', './app/travel_notes.js', './app/travel_local.js', './app/travel_plan.js', './app/travel_near.js', './app/travel_arrive.js', './data/summary.js', './data/map.js', './manifest.webmanifest', './icons/icon-192.png']))); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || e.request.url.endsWith('.apk')) return;
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return r;
  }).catch(() => caches.match(e.request)));
});
