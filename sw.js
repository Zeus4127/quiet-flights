// Offline copy of Quiet Flights. Network first, but never wait long: after 3.5 s on a weak signal the saved copy is
// shown and the fresh one keeps downloading in the background for next time. With no signal the saved copy is used.
// Only this site's own files are handled; other services (maps, rates, holidays) go straight to the network.
const CACHE = 'qf-2026-11-20-1330';
const FILES = ['./', './index.html', './app/', './app/index.html', './data/app_data.js', './data/economy_data.js', './app/economy_logic.js', './app/economy_ui.js', './app/travel_kit.js', './app/travel_tools.js', './app/travel_notes.js', './app/travel_local.js', './app/travel_plan.js', './app/travel_near.js', './app/travel_arrive.js', './app/travel_vault.js', './app/travel_help.js', './app/travel_way.js', './app/travel_journey.js', './app/travel_baked.js', './app/travel_charts.js', './data/summary.js', './data/map.js', './manifest.webmanifest', './icons/icon-192.png'];
const WAIT_MS = 3500;
// One file failing (e.g. a slow big file) must not throw away the whole offline copy, so save them one by one.
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(f => c.add(f).catch(() => null))))); });
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || req.url.endsWith('.apk') || new URL(req.url).origin !== self.location.origin) return;
  const net = fetch(req).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return r;
  });
  e.waitUntil(net.catch(() => null));               // let the background download finish
  e.respondWith(caches.match(req).then(saved => {
    if (!saved) return net;                          // nothing saved yet: wait for the network
    const slow = new Promise(ok => setTimeout(() => ok(saved), WAIT_MS));
    return Promise.race([net.catch(() => saved), slow]);
  }));
});
