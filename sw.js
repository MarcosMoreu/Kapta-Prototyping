// export {version};
"use strict";

// Set a name for the current cache. Note that when version is changed, the pwa only updates autmotically after reloading!
//Note that for automatic update, at one change need to be made in the app.js file (or in other files...)
var version = 'v29.3';
//console.log(version)

// Default files to always cache
var offlineFundamentals = [
  "/index.html",
  "/styles/app.css",
  "/scripts/modal.js",
  // "/scripts/app.js",
  "/pages/tutorial.html",
  "/scripts/tutorialPage.js",
  "/styles/tutorialPage.css",
  "/images/icons/icon-72x72.png",
  // 'styles/modal.css',
  // 'styles/customIcons.css',
  // 'scripts/lib/leaflet/plugins/Leaflet.EasyButton-master/src/easy-button.css',
  // "scripts/lib/leaflet/plugins/L.Control.Rose-master/dist/L.Control.Rose.css",
  // "scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/leaflet.draw.css",
  // "scripts/lib/leaflet/plugins/Leaflet.markercluster-1.4.1/dist/MarkerCluster.css",
  // "scripts/lib/leaflet/plugins/Leaflet.markercluster-1.4.1/dist/MarkerCluster.Default.css",
  // "styles/slider.css",
  //
  // 'images/omoIcons/boatCrossing.png','images/omoIcons/cattleGrazing.png','images/omoIcons/church.png','images/omoIcons/eldersHut.png','images/omoIcons/fishing.png',
  //   'images/omoIcons/floodRecessionFlat.png','images/omoIcons/floodRecessionSteep.png','images/omoIcons/goatSheepGrazing.png','images/omoIcons/healthStation.png','images/omoIcons/hotSpring.png','images/omoIcons/hunting.png',
  //   'images/omoIcons/hutVillage.png','images/omoIcons/irrigationPump.png','images/omoIcons/lakeRecession.png','images/omoIcons/maize.png',
  //   'images/omoIcons/manualPump.png','images/omoIcons/medicinalPlants.png','images/omoIcons/noFarming.png','images/omoIcons/pondFarming.png','images/omoIcons/Questionmark.png','images/omoIcons/recreationCenter.png',
  //   'images/omoIcons/reehive.png','images/omoIcons/saltlick.png','images/omoIcons/school.png','images/omoIcons/sorghum.png','images/omoIcons/ThumbsUp.png','images/omoIcons/ThumbsDown.png',
  //   'images/omoIcons/timber.png','images/omoIcons/treeForGathering.png','images/omoIcons/unknownOther.png','images/omoIcons/veterinary.png','images/omoIcons/waterPoint.png','images/omoIcons/waterPondAnimal.png',
  //   'images/omoIcons/waterRiverAnimal.png','images/omoIcons/wildFruits.png',"images/omoIcons/pathTrack.png", "images/omoIcons/deforestation.png",

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
  // console.log(url)
  // console.log(params)


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
  // console.log(event.request.type)

  // Don't care about other-origin URLs
  // if (url.origin !== location.origin) return;
  // console.log(url.origin)
  // console.log(location.origin)


  if (navigator.onLine == false && event.request.url.includes('#') && event.request.url.includes('/?') && event.request.url.includes('z')) { //to allow urlgeojson to open when offline
    event.respondWith(caches.open(cacheName).then((cache) => {
      return cache.match(event.request,
      {ignoreSearch:true,})
      .then((cachedResponse) => {
          if(cachedResponse){
            // console.log(event.request.url)
            return cachedResponse
          }else{
            //console.log('from networkkkkkkkkkkkkkkkkkk')
            return fetch(event.request).then((fetchedResponse) => {
        // Add the network response to the cache for later visits
        cache.put(event.request, fetchedResponse.clone());

        // Return the network response
        return fetchedResponse;
      })
    }
  })
    }))




  }else if(event.request.url.includes('.google') || event.request.url.includes('.openstreetmap')  || event.request.url.includes('.planet')){ //to put the google tiles in a different cache so it can be cleared easily

    //this is for the html2canvas to get the tiles from the indexeddb without putting anything to the cache
      // if(event.request.url.includes('.google') && (event.request.url.includes('&z=20') || event.request.url.includes('&z=21') || event.request.url.includes('&z=22'))){




      if(event.request.url.includes('.google') && event.request.url.includes('&z=2') && (event.request.url.includes('&x=1&') || event.request.url.includes('&x=2&') || event.request.url.includes('&x=3&'))) { //to cache the global map tiles
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
        event.respondWith(caches.open(cacheName).then((cache) => {
          // console.log(event.request.url)

          return cache.match(event.request).then((cachedResponse) => {
              if(cachedResponse){
                //console.log('from cacheeeeeeeeeeeeeeeeee')
                return cachedResponse
              }else{
                //console.log('from networkkkkkkkkkkkkkkkkkk')

                return fetch(event.request).then((fetchedResponse) => {
            // Add the network response to the cache for later visits
            // cache.put(event.request, fetchedResponse.clone());

            // Return the network response
            return fetchedResponse;
          })
        }
      })
        }))
      }



// }else if(event.request.destination === 'style' || event.request.destination === 'image'){
//   if(offlineFundamentals)
//
//   event.respondWith(caches.open(cacheName).then((cache) => {
//         return cache.match(event.request.url);
//       }));
//

  }else{//this is where most of the requests pass
    event.respondWith(caches.open(cacheName).then((cache) => {
            // console.log(event.request.url)

      return cache.match(event.request).then((cachedResponse) => {
          if(cachedResponse){
            // console.log(event.request.url)
            return cachedResponse
          }else{
            //console.log('from networkkkkkkkkkkkkkkkkkk')

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

//
// function serveShareTarget(event, wait = true) {
//   const dataPromise = event.request.formData();
//
//   // Redirect so the user can refresh the page without resending data.
//   event.respondWith(Response.redirect("/pwa-results?receiving-file-share=1"));
//
//   event.waitUntil(
//     (async function () {
//       // The page sends this message to tell the service worker it's ready to receive the file.
//       //console.log("wait for share ready");
//       if (wait) await nextMessage("SHARE_READY");
//
//       const client = await self.clients.get(
//         event.resultingClientId || event.clientId
//       );
//       //console.log("client in wait until", client);
//       const data = await dataPromise;
//       //console.log("data in wait until", data);
//       data.forEach((b, c) => {
//         //console.log(b, c);
//       });
//       const file = data.getAll("file");
//       //console.log("files in wait until", file);
//       client.postMessage({ file });
//     })()
//   );
// }
//
// const nextMessageResolveMap = new Map();
//
// /**
//  * Wait on a message with a particular event.data value.
//  *
//  * @param dataVal The event.data value.
//  */
// function nextMessage(dataVal) {
//   return new Promise((resolve) => {
//     if (!nextMessageResolveMap.has(dataVal)) {
//       nextMessageResolveMap.set(dataVal, []);
//     }
//     nextMessageResolveMap.get(dataVal).push(resolve);
//   });
// }
//
// self.addEventListener("message", (event) => {
//   //console.log("log all messages");
//   //console.log(event);
//   if (event.data === "SHARE_READY") {
//     //console.log("yuhu ready");
//   }
//   const resolvers = nextMessageResolveMap.get(event.data);
//   //console.log("here are the resolvers", resolvers);
//   if (!resolvers) return;
//   nextMessageResolveMap.delete(event.data);
//   for (const resolve of resolvers) resolve();
// });
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

// self.addEventListener('sync', function(event) {
//   if (event.tag === 'backgroundSync') {
//     event.waitUntil(doBackgroundSync());
//   }
// });

// function getContactById(db, id) {
//     const txn = db.transaction(db, 'readonly');
//     const store = txn.objectStore(db);
//
//     let query = store.get(id);
//
//     query.onsuccess = (event) => {
//         if (!event.target.result) {
//             console.log(`The contact with ${id} not found`);
//         } else {
//             console.table(event.target.result);
//         }
//     };
//
//     query.onerror = (event) => {
//         //console.log(event.target.errorCode);
//     }
//
//     txn.oncomplete = function () {
//         db.close();
//     };
// };

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
      //console.log('Value added to IndexedDB');
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
  //console.log('do the work function called!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

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
      //console.log(value)
      //console.log(key)
//////////////////////////////////////////////
// isJson(value);
// if (isJson(value) == true) {
  // //console.log(isJson('this is geojson',value))
    var getItemToJSON = JSON.parse(value);
    // isJson(getItemToJSON)
    // //console.log(getItemToJSON.properties.OP)

    //to submit to CARTO the contributions submitted while offline
    if(getItemToJSON.properties.OP == 'offlineOpen'){ //////////////////11111111111111111111111111111111!!!!!!!111CHANGE TO OFFLINEOPEN
      console.log('sbumitted to carto from local storage', getItemToJSON)

      //console.(getItemToJSON)
      // console.log(getItemToJSON.properties.OP)
      // console.log(data)
      let  dataGeometry = getItemToJSON.geometry

        // propertiesGeoJSON = data.properties
        //to assign each attribute to a variable, which will be added as columns to the DB
        // landUses = getItemToJSON.properties.landUses;
        // landUsesEmoji = getItemToJSON.properties.landUsesEmoji;
      let  openOrPrivate = getItemToJSON.properties.openOrPrivate;
        // phoneNumber = getItemToJSON.properties.phoneNumber;
      let  areaPolygon = getItemToJSON.properties.areaPolygon;
      let  lengthLine = getItemToJSON.properties.lengthLine;
      let  dateTime = getItemToJSON.properties.dateTime;
        // timeSpendSeconds = getItemToJSON.properties.timeSpendSeconds;
        // dist_m_Participant_Feature = getItemToJSON.properties.dist_m_Participant_Feature;
      let  randomID = getItemToJSON.properties.randomID;
        var dataGeometryString = JSON.stringify(dataGeometry)



        if(areaPolygon == 'Line' || areaPolygon == 'Point'){
          var areaPolygonNumeric = 0
        }else{
          function removeCharactersAfterSpace(inputString) {
            var spaceIndex = inputString.indexOf(' ');
            if (spaceIndex !== -1) {
              var result = inputString.substr(0, spaceIndex);
              return result;
            } else {
              return inputString;
            }
          }
          var areanumber = removeCharactersAfterSpace(areaPolygon);
          console.log('areanumber',areanumber); // Output: "Hello"
          var acrestoha = areanumber*0.404686
          var acretoha2decimals = acrestoha.toFixed(2)
          console.log('acretoha2decimals',acretoha2decimals)

          var areaPolygonNumeric = parseFloat(acretoha2decimals)
        }
        //console.('lengthLine',lengthLine)

        if(lengthLine == 'Polygon' || lengthLine == 'Point'){
          var lengthLineNumeric = 0

        }else{
          function extractNumbers(str) {
             return str.replace(/\D/g, '');
           }
           var lengthnumber = extractNumbers(lengthLine)
          var lenghtkm2decimals = lengthnumber.slice(0, -2)
          var lengthLineNumeric = parseFloat(lenghtkm2decimals)

        }

      let  attribute1s = getItemToJSON.properties.Description
        const brRegex = /<\/?br>/gi;
        attribute1s = attribute1s.replace(brRegex, '');

      let attribute2s = getItemToJSON.properties.screen1
      let attribute3s = getItemToJSON.properties.screen2
      let attribute4s = getItemToJSON.properties.screen3
      let attribute5s = null
      let attribute6s = null
      let attribute7s = null
      let attribute8s = null
      let attribute9s = null
      let attribute10s = null
      let dist_m_Participant = 0
      // let attribute11n
      // let attribute12n
      // let attribute13n
      // let attribute14n
      // let attribute15n
      const numberRegex = /\d+/g;

      // if(attribute2s == 'አዊ / መንደር'){
      //   try{
      //     let attribute11nstring = getItemToJSON.properties.kidsmale
      //     attribute11n = attribute11nstring.match(numberRegex);
      //     console.log('attribute11nstring',attribute11nstring)
      //     console.log('attribute11n',attribute11n)
      //     if(attribute11n == null || attribute11n == undefined){
      //       attribute11n = 0
      //     }else{
      //       attribute11n = attribute11n[0]
      //     }
      //
      //     let attribute12nstring = getItemToJSON.properties.kidsfemale
      //     attribute12n = attribute12nstring.match(numberRegex);
      //
      //     console.log('attribute12nstring',attribute12nstring)
      //     console.log('attribute12n',attribute12n)
      //
      //     if(attribute12n == null || attribute12n == undefined){
      //       attribute12n = 0
      //     }else{
      //       attribute12n = attribute12n[0]
      //     }
      //
      //     let attribute13nstring = getItemToJSON.properties.adultmale
      //     attribute13n = attribute13nstring.match(numberRegex);
      //
      //     if(attribute13n == null || attribute13n == undefined){
      //       attribute13n = 0
      //     }else{
      //       attribute13n = attribute13n[0]
      //     }
      //     let attribute14nstring = getItemToJSON.properties.adultfemale
      //     attribute14n = attribute14nstring.match(numberRegex);
      //
      //     if(attribute14n == null || attribute14n == undefined){
      //       attribute14n = 0
      //     }else{
      //       attribute14n = attribute14n[0]
      //     }
      //     let attribute15nstring = getItemToJSON.properties.household
      //     attribute15n = attribute15nstring.match(numberRegex);
      //
      //     if(attribute15n == null || attribute15n == undefined){
      //       attribute15n = 0
      //     }else{
      //       attribute15n = attribute15n[0]
      //     }
      //   }catch(e){
      //     console.log(e)
      //   }
      //
      // }else{
      //   attribute11n = 0
      //   attribute12n = 0
      //   attribute13n = 0
      //   attribute14n = 0
      //   attribute15n = 0
      // }



    let attribute11n = 0
       let attribute12n = 0
      let attribute13n = 0
      let attribute14n = 0
      let attribute15n = 0
        // attribute11nstring = kidsmale
        // attribute12nstring = kidsfemale
        // attribute13nstring = adultmale
        // attribute14nstring = adultfemale
        // attribute15nstring = household
        // try{ //to catch when value is empty
        //   attribute11n = attribute11n[0]
        // }catch(e){
        //   attribute11n = 0
        //   console.log(e)
        // }
        // try{ //to catch when value is empty
        //   attribute12n = attribute12n[0]
        // }catch(e){
        //   attribute12n = 0
        //   console.log(e)
        // }
        // try{ //to catch when value is empty
        //   attribute13n = attribute13n[0]
        // }catch(e){
        //   attribute13n = 0
        //   console.log(e)
        // }
        // try{ //to catch when value is empty
        //   attribute14n = attribute14n[0]
        // }catch(e){
        //   attribute14n = 0
        //   console.log(e)
        // }
        // try{ //to catch when value is empty
        //   attribute15n = attribute15n[0]
        // }catch(e){
        //   attribute15n = 0
        //   console.log(e)
        // }
        let attribute16n = 0
        let attribute17n = 0
        let attribute18n = 0
        let attribute19n = 0
        let attribute20n = 0
        let phoneNumber = getItemToJSON.properties.phoneNumber
        let sapelliProjectIdentifier = getItemToJSON.properties.sapProjID
        dist_m_Participant = 0

        /////////////////////////////////////////LOCAL STORAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE///////////////////////////////////////////////
        // var commentAudioDefault = '.'
        var sql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb0` (geom, contributionid, phone, sapprojid, areapolygon, lengthline, distance, date, attribute1s, attribute2s, attribute3s, attribute4s, attribute5s, attribute6s, attribute7s, attribute8s, attribute9s, attribute10s, attribute11n, attribute12n, attribute13n, attribute14n, attribute15n, attribute16n, attribute17n, attribute18n, attribute19n, attribute20n, timestamp) VALUES (ST_GeogFromGeoJSON('";
        var sql2 = dataGeometryString;
        var sql3 = "',make_valid => true),'"+randomID+ "',CAST('" + phoneNumber + "' AS INT64),'" + sapelliProjectIdentifier + "',CAST('" + areaPolygonNumeric + "' AS NUMERIC),CAST('" + lengthLineNumeric + "' AS NUMERIC),CAST('" + dist_m_Participant + "' AS INT64),'" + dateTime +"','"+attribute1s+ "','" + attribute2s + "','" + attribute3s + "','" + attribute4s + "','" + attribute5s + "','" + attribute6s + "','" + attribute7s + "','" + attribute8s + "','"+attribute9s+ "','" + attribute10s + "',CAST('"+ attribute11n + "' AS INT64),CAST('" + attribute12n + "' AS INT64),CAST('" + attribute13n + "' AS INT64),CAST('" + attribute14n + "' AS INT64),CAST('" + attribute15n + "' AS INT64),CAST('" + attribute16n + "' AS INT64),CAST('" +attribute17n+ "' AS INT64),CAST('" + attribute18n + "' AS INT64),CAST('" + attribute19n + "' AS INT64),CAST('" + attribute20n + "' AS INT64),CAST('" +dateTime+"' AS TIMESTAMP))";
        var pURL = sql + sql2 + sql3;
        //console.('submited to carto from local storage',pURL)
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



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
            var getItemToJSONstringified = JSON.stringify(getItemToJSON);//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            var key = randomID
            var replacedString = getItemToJSONstringified.replace(/offlineOpen/g, 'submittedOpen');
            var value = replacedString

            addToIndexedDB('geoJSONs','keyvaluepairs',key,value)
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
  console.log('background sync called before tag')

    if (event.tag === 'sync-background-') {
      console.log('background sync called')
        event.waitUntil(
            doTheWork()
          );
    }
});
