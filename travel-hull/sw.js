const PAGES=["./","index.html","trip.html","weather.html","money.html","tools.html","flights.html","../app/travel_kit.js","../app/travel_tools.js","../app/travel_notes.js","../app/travel_local.js","../app/travel_plan.js","../app/travel_near.js","../app/travel_arrive.js","../app/travel_vault.js","../app/travel_help.js","../app/travel_way.js","../app/travel_journey.js","../app/travel_baked.js","../app/travel_charts.js","fonts/sora.woff2","fonts/inter.woff2"];const BUILD="2026-11-19-1443";
self.addEventListener("install",function(e){e.waitUntil(caches.open("th-pages").then(function(c){return c.addAll(PAGES);}).then(function(){return self.skipWaiting();}));});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim());});
self.addEventListener("fetch",function(e){var u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin||(u.pathname.indexOf("/travel-hull/")<0&&!/\/app\/travel_[a-z]+\.js$/.test(u.pathname))||/\.mp4$/.test(u.pathname))return;
  e.respondWith(fetch(e.request).then(function(r){if(r.ok){var c=r.clone();caches.open("th-pages").then(function(x){x.put(e.request,c);});}return r;})
    .catch(function(){return caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||caches.match("index.html");});}));});
