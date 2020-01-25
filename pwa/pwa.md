## api

1. 生命周期
   install(写入缓存),activate(更新缓存,删除之前的),fetch(获取资源)

```js
self.addEventListener("install", event => {
  console.log("install", event);
  // 等待异步结束触发activate
  // event.waitUntil(new Promise(resolve => {
  //   setTimeout(resolve, 5000);
  // }))
  // 立刻激活
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", event => {
  console.log("activate", event);
  // event.waitUntil(self.clients.claim())
});
self.addEventListener("fetch", event => {
  console.log("fetch", event);
});
```

2. promise
3. fetch api
4. catch api

```js
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
  event.waitUntil(self.clients.claim());
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
```

5. notification api

```js
// 需要先授权
Notification.requestPermission();
// 推送的权限
Notification.permission;
// default/granted/denied

new Notification("hello", {
  body: "haha" // content
});
```

```js
// 需要先在顶层路径授权
// server worker 上下文 sw.js
self.registration.showNotification("hh");
```
