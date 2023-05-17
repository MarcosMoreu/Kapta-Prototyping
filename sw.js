// export {version};
"use strict";

// Set a name for the current cache. Note that when version is changed, the pwa only updates autmotically after reloading!
//Note that for automatic update, at one change need to be made in the app.js file (or in other files...)
var version = 'v25.7';
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


}else{//this is where most of the request pass


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

  }


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

function addToIndexedDB(databaseName, objectStoreName, key, value) {
  // Open a connection to the IndexedDB database
  var request = indexedDB.open(databaseName);

  // Event handler for a successful database connection
  request.onsuccess = function(event) {
    var db = event.target.result;

    // Start a transaction and get the object store
    var transaction = db.transaction(objectStoreName, 'readwrite');
    var objectStore = transaction.objectStore(objectStoreName);

    // Put the value into the object store with the specified key
    var putRequest = objectStore.put(value, key);

    // Event handler for a successful put operation
    putRequest.onsuccess = function(event) {
      console.log('Value added to IndexedDB');
    };

    // Event handler for an error during the put operation
    putRequest.onerror = function(event) {
      console.error('Error adding value to IndexedDB', event.target.error);
    };

    // Close the connection after the transaction is complete
    transaction.oncomplete = function() {
      db.close();
    };
  };

  // Event handler for an error during the database connection
  request.onerror = function(event) {
    console.error('Error opening IndexedDB', event.target.error);
  };
}

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
      console.log(value)
      console.log(key)
//////////////////////////////////////////////
// isJson(value);
// if (isJson(value) == true) {
  // console.log(isJson('this is geojson',value))
    var getItemToJSON = JSON.parse(value);
    // isJson(getItemToJSON)
    // console.log(getItemToJSON.properties.OP)

    //to submit to CARTO the contributions submitted while offline
    if(getItemToJSON.properties.OP == 'offlineOpen'){ //////////////////11111111111111111111111111111111!!!!!!!111CHANGE TO OFFLINEOPEN

      console.log(cursor)
  // console.log(getItemToJSON)
      // console.log(getItemToJSON.properties.OP)
      // console.log(data)
      let dataGeometry = getItemToJSON.geometry

        // propertiesGeoJSON = data.properties
        //to assign each attribute to a variable, which will be added as columns to the DB
        let  landUses = getItemToJSON.properties.landUses;
        let  landUsesEmoji = getItemToJSON.properties.landUsesEmoji;
      let  openOrPrivate = getItemToJSON.properties.openOrPrivate;
      let  phoneNumber = getItemToJSON.properties.phoneNumber;
      // let    areaPolygon = getItemToJSON.properties.areaPolygon;
      // let    lengthLine = getItemToJSON.properties.lengthLine;
      let    dateTime = getItemToJSON.properties.dateTime;
        let  timeSpendSeconds = getItemToJSON.properties.timeSpendSeconds;
      // let    dist_m_Participant_Feature = getItemToJSON.properties.dist_m_Participant_Feature;
      let    randomID = getItemToJSON.properties.randomID;
            var dataGeometryString = JSON.stringify(dataGeometry)

      // let    attribute1s = landUsesEmoji
      //   let  attribute2s = croptype
      // let    attribute3s = evaluation
      var areaPolygon = 4.3
      var lengthLine = 0
      var dist_m_Participant = 0
      var attribute3s = null
      var attribute1s = null
      var attribute2s = null
      var attribute3s = null
      var attribute4s = null
      var attribute5s = null
      var attribute6s = null
      var attribute7s = null
      var attribute8s = null
      var attribute9s = null
      var attribute10s = null
      var attribute11n = 0
      var attribute12n =  0
      var attribute13n = 0
      var attribute14n = 0
      var attribute15n = 0
      var attribute16n = 0
      var attribute17n = 0
      var attribute18n = 0
      var attribute19n = 0
      var attribute20n = 0
      var sqlQuerySelect
      var sqlQuerySelectEncoded
      var deleteFromcartoimmediate = null
      var sapelliProjectIdentifier = 111111111
      var datatime = '10-10-2021'
      var areaPolygonNumeric = 10.1
      var lengthLineNumeric = 10.1

      dist_m_Participant = 74067170

        attribute20n = 1111111111

        /////////////////////////////////////////LOCAL STORAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE///////////////////////////////////////////////
        // var commentAudioDefault = '.'
        var sql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb0` (geom, contributionid, phone, sapprojid, areapolygon, lengthline, distance, date, attribute1s, attribute2s, attribute3s, attribute4s, attribute5s, attribute6s, attribute7s, attribute8s, attribute9s, attribute10s, attribute11n, attribute12n, attribute13n, attribute14n, attribute15n, attribute16n, attribute17n, attribute18n, attribute19n, attribute20n) VALUES (ST_GeogFromGeoJSON('";
        var sql2 = dataGeometryString;
      var sql3 = "',make_valid => true),'"+randomID+ "',CAST('" + phoneNumber + "' AS INT64),'" + sapelliProjectIdentifier + "',CAST('" + areaPolygonNumeric + "' AS NUMERIC),CAST('" + lengthLineNumeric + "' AS NUMERIC),CAST('" + dist_m_Participant + "' AS INT64),'" + dateTime +"','"+attribute1s+ "','" + attribute2s + "','" + attribute3s + "','" + attribute4s + "','" + attribute5s + "','" + attribute6s + "','" + attribute7s + "','" + attribute8s + "','"+attribute9s+ "','" + attribute10s + "',CAST('"+ attribute11n + "' AS INT64),CAST('" + attribute12n + "' AS INT64),CAST('" + attribute13n + "' AS INT64),CAST('" + attribute14n + "' AS INT64),CAST('" + attribute15n + "' AS INT64),CAST('" + attribute16n + "' AS INT64),CAST('" +attribute17n+ "' AS INT64),CAST('" + attribute18n + "' AS INT64),CAST('" + attribute19n + "' AS INT64),CAST('" + attribute20n + "' AS INT64))";
      var   pURL = sql + sql2 + sql3;
        console.log('submited to carto from local storage',pURL)
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        var getItemToJSONstringified = JSON.stringify(getItemToJSON);//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        var key = randomID
        var replacedString = getItemToJSONstringified.replace(/offlineOpen/g, 'submittedOpen');
        var value = replacedString

        addToIndexedDB('geoJSONs','keyvaluepairs',key,value)

      var submitToProxy = function(q) {
        var url = "./callProxy.php";
        var data = "qurl=" + encodeURIComponent(q) + "&cache=false&timeStamp=" + new Date().getTime();

        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: data
        })
        .then(function(response) {
          if (response.ok) {
            postSuccess();
          } else {
            // Handle error
          }
        })
        .catch(function(error) {
          // Handle error
        });
      };

      submitToProxy(pURL);
    }

// }
/////////////////////////////////////////////
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
