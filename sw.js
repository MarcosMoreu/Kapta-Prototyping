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

  // "/scripts/lib/leaflet/leaflet-src.js",
  // "/scripts/lib/jquery-3.5.1.min.js",
  // "/scripts/lib/leaflet/plugins/leaflet.Permalink-master/leaflet.permalink.js",
  // "/scripts/emojionearea-master/dist/emojionearea.js",
  //
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/Leaflet.draw.js" ,
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/Leaflet.Draw.Event.js" ,
  //
  // "/scripts/lib/leaflet/plugins/Leaflet.EasyButton-master/src/easy-button.js",
  // "/scripts/lib/leaflet/plugins/localForage-master/dist/localforage.js",
  // "/scripts/lib/leaflet/plugins/leaflet-offline-master/dist/leaflet-offline.min.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.markercluster-1.4.1/dist/leaflet.markercluster-src.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.Deflate-master/dist/L.Deflate.js",
  // "/scripts/lib/leaflet/plugins/L.Control.Rose-master/dist/L.Control.Rose.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/edit/handler/Edit.Poly.js" ,
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/edit/handler/Edit.SimpleShape.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/edit/handler/Edit.Marker.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/draw/handler/Draw.Feature.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/draw/handler/Draw.Polyline.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/draw/handler/Draw.Polygon.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/draw/handler/Draw.Marker.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/ext/TouchEvents.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/ext/GeometryUtil.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/ext/LineUtil.Intersect.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/ext/Polyline.Intersect.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/ext/Polygon.Intersect.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/Control.Draw.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/Tooltip.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/Toolbar.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/draw/DrawToolbar.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/edit/EditToolbar.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/edit/handler/EditToolbar.Edit.js",
  // "/scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/edit/handler/EditToolbar.Delete.js",
  // "/scripts/lib/leaflet/plugins/Leaflet-rotateMarker/leaflet.rotatedMarker.js",
  // "/scripts/createGeometryButtons.js",
  // "/scripts/featureSelectedButtons.js",
  // "/scripts/commentFeature.js",
  // "/scripts/filterButtons.js",
  // "/scripts/cartoLayer.js",
  // "/scripts/localStorage.js",
  // "/scripts/camera.js",
  // "/scripts/share-download.js",
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
        const fetchedResponse = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone())//.catch(unableToResolve);
          return networkResponse;
        });
        return cachedResponse || fetchedResponse;
      });
    }));
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
