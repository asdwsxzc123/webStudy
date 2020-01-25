const CACHE_NAME = "cache-v1";
self.addEventListener("install", event => {
  console.log("install", event);
  // 获取所有资源
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(["/", "./index.css"]);
    })
  );
});
self.addEventListener("activate", event => {
  console.log("activate", event);
  // event.waitUntil(self.clients.claim())
  event.waitUntil(
    catchs.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
self.addEventListener("fetch", event => {
  console.log("fetch", event);
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
