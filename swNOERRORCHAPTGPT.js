// export {version};
"use strict";

// Set a name for the current cache. Note that when version is changed, the pwa only updates autmotically after reloading!
//Note that for automatic update, at one change need to be made in the app.js file (or in other files...)
var version = 'v25.5';
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
  // 'https://mt2.google.com/vt/lyrs=s,h&x=1&y=1&z=2',
  // 'https://mt3.google.com/vt/lyrs=s,h&x=2&y=1&z=2',
  // 'https://mt3.google.com/vt/lyrs=s,h&x=1&y=2&z=2',
  // 'https://mt0.google.com/vt/lyrs=s,h&x=2&y=2&z=2',
  // 'https://mt1.google.com/vt/lyrs=s,h&x=1&y=0&z=2',
  // 'https://mt2.google.com/vt/lyrs=s,h&x=2&y=0&z=2',
  // 'https://mt0.google.com/vt/lyrs=s,h&x=1&y=3&z=2',
  // 'https://mt1.google.com/vt/lyrs=s,h&x=2&y=3&z=2',


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
  // if (url.origin !== location.origin) return;
  // console.log(url.origin)
  // console.log(location.origin)

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
  }else if(event.request.url.includes('.google') || event.request.url.includes('.openstreetmap')  || event.request.url.includes('.planet')){ //to put the google tiles in a different cache so it can be cleared easily

      if(event.request.url.includes('.google') && event.request.url.includes('&z=4')){ //to cache the global map tiles
        event.respondWith(caches.open(cacheName).then((cache) => {
          // console.log(event.request.url)

          return cache.match(event.request).then((cachedResponse) => {
              if(cachedResponse){
                console.log('from cacheeeeeeeeeeeeeeeeee')
                return cachedResponse
              }else{
                console.log('from networkkkkkkkkkkkkkkkkkk')

                return fetch(event.request).then((fetchedResponse) => {
            // Add the network response to the cache for later visits
            cache.put(event.request, fetchedResponse.clone());

            // Return the network response
            return fetchedResponse;
          })
        }
      })
        }))
      }else{
        console.log(event.request.url)
    console.log('google tiles')
  }
    // event.respondWith(caches.open(cacheNameTiles).then((cache) => {
    //   return cache.match(event.request)
    //     .then((cachedResponse) => {
    //       if (cachedResponse){
    //         return cachedResponse;
    //       }
    //       //otherwise hit the network
    //       return fetch(event.request).then((fetchedResponse)=>{
    //         //add the network request to the cache for later visits
    //         cache.put(event.request, fetchedResponse.clone())//.catch(unableToResolve);
    //         //return the network response
    //         return fetchedResponse
    //     });
    //   });
    // }));


}else{//this is where most of the request pass

        // Is this one of our precached assets?
      // const isPrecachedRequest = cacheName.includes(url.pathname);
      //
      // if (isPrecachedRequest) {
      //   console.log('precacheddddddddddddddddddddddddd')
      //
      //   // Grab the precached asset from the cache
      //   event.respondWith(caches.open(cacheName).then((cache) => {
      //     return cache.match(event.request.url);
      //   }));
      // } else {
      //     return fetch(event.request).then((fetchedResponse) => {
      //     // Add the network response to the cache for later visits
      //     caches.put(event.request, fetchedResponse.clone());
      //     console.log('hitted the networkkkkkkkkkkkkkkkkkkkkkkkk')
      //     // Return the network response
      //     return fetchedResponse;
      //
      // })
      // };
      event.respondWith(caches.open(cacheName).then((cache) => {
        // console.log(event.request.url)

        return cache.match(event.request).then((cachedResponse) => {
            if(cachedResponse){
              console.log('from cacheeeeeeeeeeeeeeeeee')
              return cachedResponse
            }else{
              console.log('from networkkkkkkkkkkkkkkkkkk')

              return fetch(event.request).then((fetchedResponse) => {
          // Add the network response to the cache for later visits
          cache.put(event.request, fetchedResponse.clone());

          // Return the network response
          return fetchedResponse;
        })
      }
    })
      }))
    // event.respondWith(caches.open(cacheName).then((cache) => {
    //   // console.log(event.request.url)
    //
    //   return cache.match(event.request)
    //     .then((cachedResponse) => {
    //     const fetchedResponse = fetch(event.request).then((networkResponse) => {
    //
    //       cache.put(event.request, networkResponse.clone())//.catch(unableToResolve);
    //       return networkResponse;
    //     });
    //     console.log('cachedResponse',cachedResponse)
    //     console.log('fetchedResponse',fetchedResponse)
    //
    //
    //     return cachedResponse || fetchedResponse;
    //   });
    // }));
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
self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('sync', function(event) {
  if (event.tag === 'backgroundSync') {
    event.waitUntil(doBackgroundSync());
  }
});

// function doBackgroundSync() {
//   return new Promise(function(resolve, reject) {
//     // Access IndexedDB and perform necessary operations
//     // when online
//
//     // Example code to open an IndexedDB database
//     var request = self.indexedDB.open('myDatabase');
//
//     request.onsuccess = function(event) {
//       var db = event.target.result;
//
//       // Perform operations with the database
//
//       // Close the database
//       db.close();
//
//       resolve();
//     };
//
//     request.onerror = function(event) {
//       reject(new Error('Failed to open IndexedDB database'));
//     };
//   });
// }
function getContactById(db, id) {
    const txn = db.transaction('Contacts', 'readonly');
    const store = txn.objectStore('Contacts');

    let query = store.get(id);

    query.onsuccess = (event) => {
        if (!event.target.result) {
            console.log(`The contact with ${id} not found`);
        } else {
            console.table(event.target.result);
        }
    };

    query.onerror = (event) => {
        console.log(event.target.errorCode);
    }

    txn.oncomplete = function () {
        db.close();
    };
};

async function doTheWork() {
  console.log('do the work function called!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

  return new Promise((resolve, reject) => {
    let openRequest = indexedDB.open("geoJSONs", 2);
    openRequest.onsuccess = (event) => {
      // request.onsuccess = function(event) {
  var db = event.target.result;

  var transaction = db.transaction('keyvaluepairs', 'readwrite');
  var objectStore = transaction.objectStore('keyvaluepairs');

  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;

    if (cursor) {
      // Access the key and value of each record in the cursor
      var key = cursor.key;
      var value = cursor.value;

      // Perform operations with the key and value

      // Move to the next record in the cursor
      cursor.continue();
    } else {
      // Reached the end of the cursor
      resolve();
    }
  };

  transaction.oncomplete = function() {
    // Close the database
    db.close();

    resolve();
  };

  transaction.onerror = function(event) {
    reject(new Error('Failed to access the object store'));
  };
};
//
    //
    //   // const db = event.target.result;
    //   const db = openRequest.result;
    //
    //   console.log(db)
    //   console.log(db.objectStoreNames)
    //   console.log(db.objectStoreNames[0])
    //
    //
    //
    //       // getContactById(db, 1);
    //
    //
    //
    //
    //   // var db = event.target.result;
    //     console.log('fetching from local storage');
    //
    //     db.objectStoreNames[0].keys(function (err, keys) {
    //       for (var i = 0; i < keys.length; i++) {
    //         (function (key) {
    //           db.getItem(key).then(function (value) {
    //             isJson(value);
    //             if (isJson(value) == true) {
    //               var getItemToJSON = JSON.parse(value);
    //               isJson(getItemToJSON);
    //
    //               if (getItemToJSON.properties.OP == 'offlineOpen') {
    //                 console.log('sbumitted to carto from local storage', getItemToJSON);
    //
    //                 // ... Rest of the code ...
    //                 getItemToJSON.properties.OP = 'submittedOpen';
    //                 var getItemToJSONstringified = JSON.stringify(getItemToJSON);
    //
    //                 geoJSONLocalforageDB.setItem(key, getItemToJSONstringified);
    //                 // Resolve the promise after processing
    //                 resolve();
    //               }
    //
    //               // ... Rest of the code ...
    //             }
    //           });
    //         })(keys[i]);
    //       }
    //
    //       // Resolve the promise after processing all keys
    //       resolve();
    //     });
    //
    //
    //   resolve();
    // };

    openRequest.onerror = function(event) {
      reject(new Error('Failed to open IndexedDB database'));
    };

  });
}

self.addEventListener('sync',function(event){
    if (event.tag == 'myFirstSync') {
      console.log('swsycnfunctionnnnnnnnnnnnnnnnnnnnnnnnn')
        event.waitUntil(
            doTheWork()
          );
    }
});
