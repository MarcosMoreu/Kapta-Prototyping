// Set a name for the current cache
var cacheName = 'Prototype#2_v2';

// Default files to always cache
var staticAssets = [

  "index.html",
  "styles/app.css",
  "scripts/app.js",
  "images/Start.png",
  //"./images/tutorial.mp4",
  "/layers/AOI_Test_Namibia.geojson",

  "https://tiles2.planet.com/data/v1/PSScene4Band/20190623_082954_0f2b/11/1141/1137.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a",
  "https://tiles2.planet.com/data/v1/PSScene4Band/20190623_082953_0f2b/11/1141/1137.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a",
  "https://tiles1.planet.com/data/v1/PSScene4Band/20190623_082904_1012/11/1140/1137.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a",
  "https://tiles2.planet.com/data/v1/PSScene4Band/20190623_082904_1012/11/1140/1138.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a",
  "https://tiles3.planet.com/data/v1/PSScene4Band/20190623_082904_1012/11/1141/1138.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a",
  "https://tiles1.planet.com/data/v1/PSScene4Band/20190623_082903_1012/11/1140/1137.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a",
  "https://tiles2.planet.com/data/v1/PSScene4Band/20190623_082903_1012/11/1141/1137.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a",
  "https://tiles0.planet.com/data/v1/PSScene4Band/20190623_082902_1012/11/1140/1137.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a"

];

self.addEventListener('install', async function () {
  const cache = await caches.open(cacheName);
  cache.addAll(staticAssets);
  console.log('SW installed');
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
    console.log('SW activated');
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request));
    console.log('fetching:cache first');
  } else {
    event.respondWith(networkFirst(request));
    console.log('fetching:network first');

  }
});

  async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || fetch(request);
  }

  async function networkFirst(request) {
    const dynamicCache = await caches.open('news-dynamic');
    try {
      const networkResponse = await fetch(request);
      dynamicCache.put(request, networkResponse.clone());
      return networkResponse;
    } catch (err) {
      const cachedResponse = await dynamicCache.match(request);
      return cachedResponse || await caches.match('./fallback.json');
    }
  }
