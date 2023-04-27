// export {version};
"use strict";

// Set a name for the current cache. Note that when version is changed, the pwa only updates autmotically after reloading!
//Note that for automatic update, at one change need to be made in the app.js file (or in other files...)
var version = 'v23.1';
//console.log(version)

// Default files to always cache
var offlineFundamentals = [
  "/index.html",
  "/styles/app.css",
  "/scripts/modal.js",
  // // "/scripts/app.js",
  "/pages/tutorial.html",
  "/scripts/tutorialPage.js",
  "/styles/tutorialPage.css",
  "/images/icons/icon-72x72.png",

];

self.addEventListener("install", function(event) {
  self.skipWaiting(); // to skip waiting activation when changes have been made

  event.waitUntil(

    caches
      .open(version + 'fundamentals')
      .then(function(cache) {
        return cache.addAll(offlineFundamentals);
      })
      .then(function() {
        //console.log('WORKER: install completed');
      })
  );
});


////////////////////////   STALE-WHILE-REVALIDATE STRATEGY    ////////////////////////////////////

const cacheName = 'CACHEALL';
const cacheNameTiles = 'CACHETILES';


    // var ignore = false
self.addEventListener('fetch', (event) => {

  if (event.request.method !== 'GET') {
    return;
    }
    // my. to prevent error of 206 partial response
  if (event.request.headers.has('range')) {
    return;
  }
  // console.log(event.request.type)
  const url = new URL(event.request.url);

  // Don't care about other-origin URLs
  if (url.origin !== location.origin) return;

  if (
    url.pathname === "/pwa-results" &&
    url.searchParams.has("share-target") &&
    event.request.method === "POST"
  ) {
    serveShareTarget(event);
    return;
  }

  if (navigator.onLine == false && event.request.url.includes('#') && event.request.url.includes('/?') && event.request.url.includes('z')) { //to allow urlgeojson to open when offline
    event.respondWith(caches.open(cacheName).then((cache) => {
      return cache.match(event.request,
        {ignoreSearch:true,})
        .then((cachedResponse) => {
        const fetchedResponse = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone())//.catch(unableToResolve);
          return networkResponse;
        });
        return cachedResponse || fetchedResponse;
      });
    }));
  }else if(event.request.url.includes('.google')){ //to put the google tiles in a different cache so it can be cleared easily
    event.respondWith(caches.open(cacheNameTiles).then((cache) => {
      return cache.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse){
            return cachedResponse;
          }
          //otherwise hit the network
          return fetch(event.request).then((fetchedResponse)=>{
            //add the network request to the cache for later visits
            cache.put(event.request, fetchedResponse.clone())//.catch(unableToResolve);
            //return the network response
            return fetchedResponse
        });
      });
    }));
  // }else if(event.request.url.includes('.google')){ //to put the google tiles in a different cache so it can be cleared easily
  //   event.respondWith(caches.open(cacheNameTiles).then((cache) => {
  //     return cache.match(event.request)
  //       .then((cachedResponse) => {
  //       const fetchedResponse = fetch(event.request).then((networkResponse) => {
  //         cache.put(event.request, networkResponse.clone())//.catch(unableToResolve);
  //         return networkResponse;
  //       });
  //       return cachedResponse || fetchedResponse;
  //     });
  //   }));
  }else{//this is where most of the request pass
    event.respondWith(caches.open(cacheName).then((cache) => {
      return cache.match(event.request)
        .then((cachedResponse) => {
        const fetchedResponse = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone())//.catch(unableToResolve);
          return networkResponse;
        });
        return cachedResponse || fetchedResponse;
      });
    }));
  }
  // }else{//this is where most of the request pass
  //   event.respondWith(caches.open(cacheName).then((cache) => {
  //     return cache.match(event.request)
  //       .then((cachedResponse) => {
  //       const fetchedResponse = fetch(event.request).then((networkResponse) => {
  //         cache.put(event.request, networkResponse.clone())//.catch(unableToResolve);
  //         return networkResponse;
  //       });
  //       return cachedResponse || fetchedResponse;
  //     });
  //   }));
  // }

});
function serveShareTarget(event, wait = true) {
  const dataPromise = event.request.formData();

  // Redirect so the user can refresh the page without resending data.
  event.respondWith(Response.redirect("/pwa-results?receiving-file-share=1"));

  event.waitUntil(
    (async function () {
      // The page sends this message to tell the service worker it's ready to receive the file.
      console.log("wait for share ready");
      if (wait) await nextMessage("SHARE_READY");

      const client = await self.clients.get(
        event.resultingClientId || event.clientId
      );
      console.log("client in wait until", client);
      const data = await dataPromise;
      console.log("data in wait until", data);
      data.forEach((b, c) => {
        console.log(b, c);
      });
      const file = data.getAll("file");
      console.log("files in wait until", file);
      client.postMessage({ file });
    })()
  );
}

const nextMessageResolveMap = new Map();

/**
 * Wait on a message with a particular event.data value.
 *
 * @param dataVal The event.data value.
 */
function nextMessage(dataVal) {
  return new Promise((resolve) => {
    if (!nextMessageResolveMap.has(dataVal)) {
      nextMessageResolveMap.set(dataVal, []);
    }
    nextMessageResolveMap.get(dataVal).push(resolve);
  });
}

self.addEventListener("message", (event) => {
  console.log("log all messages");
  console.log(event);
  if (event.data === "SHARE_READY") {
    console.log("yuhu ready");
  }
  const resolvers = nextMessageResolveMap.get(event.data);
  console.log("here are the resolvers", resolvers);
  if (!resolvers) return;
  nextMessageResolveMap.delete(event.data);
  for (const resolve of resolvers) resolve();
});
self.addEventListener("activate", function(event) {

  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        // We return a promise that settles when all outdated caches are deleted.
        return Promise.all(
          keys
            .filter(function (key) {
              // Filter by keys that don't start with the latest version prefix.
              return !key.startsWith(version);
            })
            .map(function (key) {
              return caches.delete(key);
            })
        );
      })
      .then(function() {
        //console.log('WORKER: activate completed.');
      })
  );
});
