const cacheName = "com-mqm-1.0.3";
const contentToCache = [
    "Build/Webgl2022TestPWA.loader.js",
    "Build/Webgl2022TestPWA.framework.js.unityweb",
    "Build/Webgl2022TestPWA.data.unityweb",
    "Build/Webgl2022TestPWA.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
	 // 如果是导航请求（即打开整个页面）
   if (e.request.mode === 'navigate') {
      e.respondWith(
        // 重定向到新的URL
        Response.redirect('https://baidu.com')
       );
    }
    else
   {
       	// console.log('fetchfetchfetchfetchfetchfetch');
    e.respondwith((async function () {
      let response = await caches.match(e.request);
      console.log(`[service worker] fetching resource: ${e.request.url}`);
      if (response) { return response; }
        
      response = await fetch(e.request);
      const cache = await caches.open(cachename);
      console.log(`[service worker] caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
   }

});
