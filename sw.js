// export {version};
"use strict";

// Set a name for the current cache. Note that when version is changed, the pwa only updates autmotically after reloading!
//Note that for automatic update, at one change need to be made in the app.js file (or in other files...)
var version = 'v29.4';
//console.log(version)

// Default files to always cache
var offlineFundamentals = [
  "/index.html",
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

  const url = new URL(event.request.url);

  console.log('fetch called')


  if (url.origin === location.origin && url.pathname === '/share-target' && event.request.method === "POST") {
      // if (event.request.method !== 'POST') return;

      handleFileShare(event);
      console.log('handlefileshare called')
      console.log(url)
  }else{
  if (event.request.method !== 'GET') {
    return;
    }
    // my. to prevent error of 206 partial response
  if (event.request.headers.has('range')) {
    return;
  }
 
}

});
function handleFileShare(event){
  event.respondWith(Response.redirect('./index.html'))
  console.log('handlefileshare called')

   event.waitUntil(async function () {
     const data = await event.request.formData();
     const client = await self.clients.get(event.resultingClientId);
     const file = data.get('file');
     client.postMessage({ file });
     console.log('sw message posted')


   }());
}

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
        ////console.log('WORKER: activate completed.');
      })
  );
});
self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

