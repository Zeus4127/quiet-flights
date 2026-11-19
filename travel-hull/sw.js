const PAGES=["./","index.html","trip.html","weather.html","money.html","fonts/sora.woff2","fonts/inter.woff2"];const BUILD="2026-11-19-1150";
self.addEventListener("install",function(e){e.waitUntil(caches.open("th-pages").then(function(c){return c.addAll(PAGES);}).then(function(){return self.skipWaiting();}));});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim());});
self.addEventListener("fetch",function(e){var u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin||u.pathname.indexOf("/travel-hull/")<0||/\.mp4$/.test(u.pathname))return;
  e.respondWith(fetch(e.request).then(function(r){if(r.ok){var c=r.clone();caches.open("th-pages").then(function(x){x.put(e.request,c);});}return r;})
    .catch(function(){return caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||caches.match("index.html");});}));});
