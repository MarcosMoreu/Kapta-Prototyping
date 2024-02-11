//////////////////////////   Service Worker   ////////////////////////////////////////

if ('serviceWorker' in navigator) {

    navigator.serviceWorker
        .register('./sw.js',{ scope: '/' })
        .then(function(registration) {
          if (registration.sync) {
              console.log('Sync is supported')
          } else {
            console.log('Sync NOT is supported')
          }
            registration.update() //to update the sw and caches if version has changed
            ////console.log('sw has been updated')
            //to reload the page if sw version has changed. This is to provide the user the latest version without the need of reloading or clearing cache
            registration.onupdatefound = () => {

              //console.log('update found in SW')
                const installingWorker = registration.installing;
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed' &&
                        navigator.serviceWorker.controller) {
                          // $.get( "pages/tutorial.html")
                        // reload the page
                        caches.delete('CACHEALL')
                        location.reload();
                    }
                };
            };
            return registration.sync.register('sync-background-'); //to enable sync

        })
        .catch(function(err) {
            ////console.log('Service Worker Failed to register', err);
        })
}


// navigator.serviceWorker.register('sw.js');

var sharetarget = false
var manualupload = true

navigator.serviceWorker.onmessage = (event) => {
  console.log('MESSAGE FROM SW RECEIVED')

  manualupload = false
  const file = event.data.file;
  // displayFile(file);
// loadingexport()
  // console.log(file)
  setTimeout(function(){
    displayFile(file);
  },2000)
  var sharetarget = true
  console.log('sharetarget',sharetarget)
  return sharetarget && manualupload

};

// var pageLoaded = false
var subDOMAIN = 'testing'
// var sapelliProjectIdentifier = 'DTM' //this variable is need to put the sap project identifier in the geojson
var isIOS = /iPad|iPhone|iPod|Mac OS X/.test(navigator.userAgent) && !window.MSStream; // Mac OS X correct???
var isOnline = navigator.onLine
var isOnlineGlobal = isOnline
var browserLanguage = navigator.language
var planetKey;
var sentinelHubKey;
var firebaseKey;
var firebaseConfig;
var cartousername;
var cartoapiSELECT;
var opencamera

var isFirstTime; //var to store if the site is visited for the first time
//var oneMapCompleted; // to know if in this session this is the first map or not
var files = [];
var filesLength;
var storage;
var percentage
var finalPercentage = []
var finalUrlAudio;
var initialScreen = true;
var clickCountDeleteButton = 0;

var shareURL;
var convertedData;
var convertedDataShareDirect;
var shareGeomDirect = false;
var propertiesGeoJSON
var propertiesGeoJSONURL;
var data;
var dataGeometry;
var dataGeometry;
var blob;
var dateTimeRandomID;
var timeFinish;
var diffTimes;
var dateFilterValue; //to apply this value when applyFilter is clicked
var audioButtonClicked = false
var finished = false; // variable to openpopup only when file downloaded, not when loaded from local storage
var lastPositionStoredLOCALLY;
var created = false; // variable to detect wheter the feature (point,line,polygon) has been created
var sameSession = false; //to know if user has already mapped in this session
var finalLayer;
var groupGeoJSON = []

// Add Data from CARTO using the SQL API. Declare Variables. Create Global Variable to hold CARTO points
var cartoGeometries = null;
var cartoIdFeatureSelected;
var selectedFeature = null;
var featureType = null;
var cartoLoaded;
var clickCountDelete;

var filterIsOn = false
var selectedFeature
var getTotalFeaturesInDB

var mapCurrentBounds;
var mapCurrentZoom;
var mapCurrentCenter;
var refreshPopup;
var refreshPopupComment;
var editButtonClicked = false;
var audioComment = '.'
var armchairOrGPS


// // add location via browser geolocation
var currentLocation = []; // variable created to allow the user recenter the map
var accuracy = 0
var markerAdded = false; // var to avoid multiple markers
var locationFound = false;
var audioRecorded = false;
var circleGT250
var circleLT250
var circleLT250Added = false
var circleGT250Added = false
var cartoGeometriesInitial = null
var elementJustAddedToLocalStorage = false
var attachPhoto = false

var areaPolygon = 0
var lengthLine = 0
var dist_m_Participant = 0
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

var gobackUploadmap = false




var watchPositionOptions = {
  enableHighAccuracy: true,
  // timeout: 5000000,
  maximumAge: 60000,
}
//function for GPS error
function error(err) {
  currentLocation == null;
  console.warn('ERROR(' + err.code + '): ' + err.message);
  return currentLocation
}

setTimeout(function(){
  if (navigator.storage && navigator.storage.persist)
    navigator.storage.persist().then(function(persistent) {
      if (persistent)
        console.log("Storage will not be cleared except by explicit user action");
      else
        console.log("Storage may be cleared by the UA under storage pressure.");
    });
},2000)

// let intViewportHeight = window.innerHeight;
// console.log("height", intViewportHeight)
// var getBodyHeight = document.body.style.height
// console.log('bodyheight',getBodyHeight)
// if(window.navigator.standAlone || window.fullScreen || (!window.screenTop && !window.screenY) ){
//   // document.body.style.height = '100vh'
//   console.log("checkIfStandalone")
//
// }


function isRunningStandalone() {
    return (window.matchMedia('(display-mode: standalone)').matches);
}

if (isRunningStandalone()) {
    document.body.style.height = '100vh'
}
// var checkIfStandalone = window.navigator.standAlone
// console.log("checkIfStandalone",checkIfStandalone)


// //var miniMap
// setTimeout(function(){
//   var canvas = document.getElementById('shareWorldButtonCommentImage');
//
//   canvas.toBlob(function(blob) {
//     var newImg = document.createElement('img'),
//         url = URL.createObjectURL(blob);
//
//     newImg.onload = function() {
//       // no longer need to read the blob so it's revoked
//       URL.revokeObjectURL(url);
//     };
//
//     newImg.src = url;
//     document.body.appendChild(newImg);
//   });
//
//   // canvas.toBlob(function(blob){...}, 'image/jpeg', 0.95); // JPEG at 95% quality
// },5000)

//////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////      first load         /////////////////////////////////////////////////////////////////////////
var isFirstTime; //var to store if the site is visited for the first time
//var oneMapCompleted; // to know if in this session this is the first map or not
var url = window.location.href
// if(isOnline == false){
//   url = 'https://amappingprototype.xyz'
// }

//firstLoad();
////console.log('isIOS  ' + isIOS)

// var isOnlineGlobal = isOnline


//to avoid showing gif if tiles not loading while offline
// var removeGifIfOnline = setInterval(function(){
//   if(isOnline == false){
//     document.getElementById('MapLoading').style.display = 'none'
//   }
// },5000)

//script to request the HIDDEN FUNCTIONALITIES AND CUSTOM ICONS script 3 secs after load (to improve performance)
setTimeout(function(){
  $.getScript({
     cache:true,
    url:'scripts/hiddenFunctionalities.js'
  })

},3000)
// document.getElementById('downloadedVideo').src = "images/downloaded.mp4"
// document.getElementById('sentVideo').src = "images/sent.mp4"

//to check if offline so some elements can be disabled
var checkIfOffline = setInterval(function() {
  isOnline = navigator.onLine
  if(isOnline == false){
    // document.getElementById('shareWorldButton').style.opacity = '0.2';
    // document.getElementById('shareWorldButton').disabled = 'true';
    // filter_Button.button.style.opacity = '0.4';
    // filter_Button.button.disabled = true;
    // filter_Button.button.style.opacity = '0.4';
    // filter_Button.button.disabled = true;
    // filterLocalStorage_Button.addTo(map);
    // filter_Button.removeFrom(map)
    // myLayer_Button.button.style.backgroundColor = '#00FFFB';

    deflated.removeFrom(map)
    // //console.log('isonline= ', isOnline)
    //clearInterval(checkIfOffline)
    inOnline = false
  }else{
    isOnline = true
    ////console.log('isonline= ', isOnline)

  }
 return isOnline
},3000)

// var browserLanguage = navigator.language

var timeStart = new Date();

/////////////////////// Initialize Firebase  ///////////////////////
//firebaseConfig stored in publicAPIKeys file
var findFirebaseCredentials = setInterval(function() {

    if (isOnline == true & firebaseKey != null) {
        try {
            firebase.initializeApp(firebaseConfig);
          //console.log('Firebase initialized')
            clearInterval(findFirebaseCredentials)
        } catch (e) {
          ////console.log('firebase not initialized!!')
        }
    }
}, 500)

//  firebase.analytics();


// navigator.serviceWorker.ready.then(function(registration) {
//   return registration.sync.register('myFirstSync');
// });
//
// self.addEventListener('sync', function(event) {
//   if (event.tag == 'myFirstSync') {
//     event.waitUntil(doSomeStuff());
//   }
// });
//function to perform HTTP request SW
var get = function(url) {
    return new Promise(function(resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var result = xhr.responseText
                    result = JSON.parse(result);
                    resolve(result);
                } else {
                    reject(xhr);
                }
            }
        };

        xhr.open("GET", url, true);
        xhr.send();

    });
};

var tilesDb = {
    // setItem:function(key, value) {
    //   console.log('tilesdb calleeeeeeeeeeeed  SAVE')
    //
    //     return localforage.setItem(key, value)
    // },
    getItem: function(key, value) {
      // key = key.replace("hmt0.ps", "https");
      // console.log(key)
      //
      // caches.match(key).then(function(response) {
      //   if(response != null){
      //     var itemfromthecache = caches.getItem(key)
      //     console.log(response)
      //       console.log(itemfromthecache)
      //        localforage.setItem(key, response);
      //   }
      //
      //
      //   })

      // key.value
      // console.log(value)
      // console.log(value)
      // var tileURL = localforage.getItem(key)
      //   console.log(tileURL.blob())
// localforage.setItem(key);

        return localforage.getItem(key)
        // .then(function() {
        //   if(value == null){
        //
        //     // var urltile = key.replace("hmt0.ps", "https");
        //
        //
        //     console.log(key)
        //     // console.log(urltile)
        //     //setitem...............
        //   }else{
        //     console.log('elseseeeeeeeeeeeeeeee')
        //
        //   }
        //
        //
        //     return localforage.setItem(key, value);
        // });

    //       console.log('tilesdb calleeeeeeeeeeeed  SAVE')
    // localforage.setItem(key, value);
            // var self = this;
            // var promise
            //
            // // for (var i = 0; i < tileUrls.length; i++) {
            //     // var tileUrl = tileUrls[i];
            //
            //     (function(key) {
            //         promise = new Promise(function(resolve, reject) {
            //             var request = new XMLHttpRequest();
            //             request.open('GET', key.url, true);
            //             request.responseType = 'blob';
            //             request.onreadystatechange = function() {
            //                 if (request.readyState === XMLHttpRequest.DONE) {
            //                     if (request.status === 200) {
            //                         resolve(self._saveTile(key, request.response));
            //                     } else {
            //                         reject({
            //                             status: request.status,
            //                             statusText: request.statusText
            //                         });
            //                     }
            //                 }
            //             };
            //             request.send();
            //         });
            //     })
            // // }
            // return Promise
          // )
    },

    saveTiles: function(tileUrls) {
      //console.log('tilesdb calleeeeeeeeeeeed  SAVE')
// localforage.setItem(key);
        var self = this;
        var promises = [];

        for (var i = 0; i < tileUrls.length; i++) {
            var tileUrl = tileUrls[i];


            (function(i, tileUrl) {
                promises[i] = new Promise(function(resolve, reject) {
                    var request = new XMLHttpRequest();
                    request.open('GET', tileUrl.url, true);
                    request.responseType = 'blob';
                    request.onreadystatechange = function() {
                        if (request.readyState === XMLHttpRequest.DONE) {
                            if (request.status === 200) {
                                resolve(self._saveTile(tileUrl.key, request.response));
                                if(i==tileUrls.length-1){
                                  alert('በተሳካ ሁኔታ ማውረድ ችለዋል። አዎን ይጫኑ')

                                    document.getElementById('MapLoading').style.display = 'none'
                                    document.getElementById('Alert').style.display = 'none'

                                    document.getElementById('maploadinggif').src = 'images/checkingPw.gif'

                                }
                            } else {
                              setTimeout(function(){

                              document.getElementById("Alert").style.fontSize = "30px";
                              document.getElementById("Alert").style.textAlign = "center"
                              document.getElementById('Alert').innerHTML = 'ማውረድ አልተሟላም. በተሻለ በይነመረብ እንደገና ይሞክሩ'
                              document.getElementById("Alert").style.display = 'initial'
                            },10000)

                              setTimeout(function(){

                                document.getElementById("Alert").style.display = 'none'
                                  document.getElementById('maploadinggif').style.display = 'none'
                              },20000)
                              console.log('download tiles failed')
                                reject({
                                    status: request.status,
                                    statusText: request.statusText
                                });
                            }
                        }
                    };
                    request.send();
                });
            })(i, tileUrl);
        }
        return Promise.all(promises);
    },

    clear: function() {
        return localforage.clear();
    },

    _saveTile: function(key, value) {
      //console.('tilesdb calleeeeeeeeeeeed  ____SAVE')

        return this._removeItem(key).then(function() {

            return localforage.setItem(key, value);
        });
    },

    _removeItem: function(key) {
        return localforage.removeItem(key);
    }
};

/////////////////////////////////////////////////////////adding map elements///////////////////////////////////////////////////

//to identify last postion, which was stored in localstorage
// var lastPositionStoredLOCALLY;
// var created = false; // variable to detect wheter the feature (point,line,polygon) has been created
// var sameSession = false; //to know if user has already mapped in this session

// lastPositionStoredLOCALLY = localStorage.getItem('lastPositionStoredLOCALLY')
// ////console.log(lastPositionStoredLOCALLY)
//
// //to avoid error if no location was stored either because first load, not allowed, or cache cleared
// if (lastPositionStoredLOCALLY != null) {
//     lastPositionStoredLOCALLY = lastPositionStoredLOCALLY.split(',') // to convert string to array
//     ////console.log(lastPositionStoredLOCALLY[0])
// }

// function to get coordinates and zoom level from URL, and then use the zoom and center variables to center the map if url != original
var mappos = L.Permalink.getMapLocation();
//console.log(mappos.center.lat)

//////////////////////////////////////////////  MAP  //////////////////////////////////////////////////////
var randomIDtest
var geoJSONLocalforageDB
var geoJSONofflineCARTO

// try{
  geoJSONofflineCARTO = localforage.createInstance({ //to create a separate DB in IndexedDB, so geojsons are not mixed with TilesDB
  name: "offlineCARTO"});
// }catch(err){
//   console.log(err,'error new db')
// }
//this function will be called only if geojson is found in url
var storeURLGeoJSON = function(data){

  try{
    var randomID = data.properties.randomID
    geoJSONLocalforageDB = localforage.createInstance({ //to create a separate DB in IndexedDB, so geojsons are not mixed with TilesDB
    name: "geoJSONs"
    });
    var parsedJSONStringified = JSON.stringify(data)

    geoJSONLocalforageDB.setItem(randomID, parsedJSONStringified).then(function(value){
    }).catch(function(err) {
      //console.('error set item geojson url')
    });
    randomIDtest = randomID
  }catch(e){
    data = data.features[0]
    var randomID = data.properties.randomID
    geoJSONLocalforageDB = localforage.createInstance({ //to create a separate DB in IndexedDB, so geojsons are not mixed with TilesDB
    name: "geoJSONs"
    });
    var parsedJSONStringified = JSON.stringify(data)

    geoJSONLocalforageDB.setItem(randomID, parsedJSONStringified).then(function(value){
    }).catch(function(err) {
      //console.('error set item geojson url')
    });
    randomIDtest = randomID
  }



  return randomIDtest
}

//////////////////  center the map: check first if url with coordinates, if not, check if first load, then check if lastpositionstored.
//script to check if url contains coordinates when loaded


// var url = 'https://amappingprototype.xyz/?%7B%22type%22%3A%22FeatureCollection%22%2C%22features%22%3A%5B%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22randomID%22%3A1111%2C%22Description%22%3A%22test%22%2C%22areaPolygon%22%3A%222489831968.72%20hectares%22%2C%22lengthLine%22%3A%22Polygon%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B-4.21875%2C-13.923404%5D%2C%5B16.875%2C-40.713956%5D%2C%5B66.09375%2C-40.713956%5D%2C%5B63.28125%2C4.214943%5D%2C%5B-4.21875%2C-13.923404%5D%5D%5D%7D%7D%5D%7D/#-15.11455,40.95703,3z'
// var url = 'https://amappingprototype.xyz/'
//console.log(url)
var urlContainsHash = url.includes('#')
var urlContainsGeoJSON = url.includes('/?')
//to avoid panning outside this bounds
var southWest = L.latLng(-70, -180);
var northEast = L.latLng(80, 180);
if (urlContainsHash == true && urlContainsGeoJSON == true){  // if url contains geojson (and coords)
  //console.log('hash and geojson')

  //to set mapview
    var keepOnlyLatLngZoom = url.split('#').pop();
    var splittedLatLngZoom = keepOnlyLatLngZoom.split(',');
    var urlLat = splittedLatLngZoom[0]
    var urlLng = splittedLatLngZoom[1]
    var urlZoomWithZ = splittedLatLngZoom[2]
    var urlZoom = urlZoomWithZ.replace('z','')

    var map = L.map('map', {
        renderer: L.canvas({padding: 0.5, tolerance: 8}),
        editable: true,
        center: [urlLat, urlLng], //global center
        zoom: urlZoom,
        minZoom: 2,
        maxZoom: 21,
        zoomControl: false,
        attributionControl: false,
        maxBounds: L.latLngBounds(southWest, northEast)
    });
    /////////////to extract geoJSON from the url

    var removeHttps = url.split('?').pop();
    var removeCoords = removeHttps.split('/');
    var keepGeoJSONOnly = removeCoords[0]
    var parsedJSONdecoded = decodeURIComponent(keepGeoJSONOnly);
    var parsedJSON = JSON.parse(parsedJSONdecoded)
    // console.log(parsedJSON)
    // console.log(parsedJSON.features[0])

    storeURLGeoJSON(parsedJSON)
    setTimeout(function accessLocalStorage(){
          fetchFromLocalStorage()
          localStorageLayer
          //console.log('after fetch and convert',localStorageLayer)
    },1500) // really don't know why this timeout, but keep it for now

    //to select this feature
    // var addedFeature = localStorage.getItem(randomIDtest)
    // console.log(addedFeature)
    elementJustAddedToLocalStorage = true
    if(localStorage.getItem('pwCorrect')){
      var activateLocalStorageLayer = setInterval(function(){
        //console.('checking encodedgeojsonurl')
        if(localStorageLayer != null){
          try{
            document.getElementById('myLayerButton').click()
            document.getElementById('myLayerButton').click()
            document.getElementById('myLayerButton').click()
            myLayer_Button.removeFrom(map); //always on as there will always be features in the map, even when first load


            //console.('zzzzzzzzzzzzzzzzzzzzzzzzzz')

            clearInterval(activateLocalStorageLayer)
          }catch(e){}

        }
      },500) // really don't know why this timeout, but keep it for now
    }
    // if(isFirstTime == true){
    //   try{
    //     document.getElementById('myLayerButton').click()
    //     clearInterval(activateLocalStorageLayer)
    //     console.log('zzzzzzzzzzzzzzzzzzzzzzzzzz')
    //   }catch(e){}
    // }

}
else if (urlContainsHash == true){  // if only coords are in the url
  //console.log('onlyhash')
    var keepOnlyLatLngZoom = url.split('#').pop();
    var splittedLatLngZoom = keepOnlyLatLngZoom.split(',');
    var urlLat = splittedLatLngZoom[0]
    var urlLng = splittedLatLngZoom[1]
    var urlZoomWithZ = splittedLatLngZoom[2]
    var urlZoom = urlZoomWithZ.replace('z','')

    var map = L.map('map', {
        renderer: L.canvas({padding: 0.5, tolerance: 8}),
        editable: true,
        center: [urlLat, urlLng], //global center
        zoom: urlZoom,
        minZoom: 2,
        maxZoom: 21,
        zoomControl: false,
        attributionControl: false,
        maxBounds: L.latLngBounds(southWest, northEast)

    });
    geoJSONLocalforageDB = localforage.createInstance({ //to create a separate DB in IndexedDB, so geojsons are not mixed with TilesDB
    name: "geoJSONs"
    });
    setTimeout(function accessLocalStorage(){
          fetchFromLocalStorage()


          //console.log('after fetch and convert',localStorageLayer)
    },300) // really don't know why this timeout, but keep it for now
  //////////////////////
}else{
  //console.log('only map')

  if(currentLocation.length == 2){
    var urlLatLocation = currentLocation[0]
    var urlLngLocation = currentLocation[1]
    var zoomcenter = 13
    // console.log(currentLocation)

  }else{
    if(localStorage.getItem('lastlocationLATITUDE')){
      var urlLatLocation =  localStorage.getItem('lastlocationLATITUDE');
      var urlLngLocation =  localStorage.getItem('lastlocationLONGITUDE');
      var zoomcenter = 13

    }else{
      var urlLatLocation = 0
      var urlLngLocation = 0
      var zoomcenter = 0

    }

}
    // if (lastPositionStoredLOCALLY == null) {
        var map = L.map('map', {
            renderer: L.canvas({padding: 0.5, tolerance: 8}),
            editable: true,
            center: [urlLatLocation, urlLngLocation], //global center
            zoom: zoomcenter,
            minZoom: 2,
            maxZoom: 21,
            zoomControl: false,
            attributionControl: false,
            //drawControl:true,
            maxBounds: L.latLngBounds(southWest, northEast)

        });
    // } else {
    //     var map = L.map('map', {
    //         renderer: L.canvas({padding: 0.5, tolerance: 8}),
    //         editable: true,
    //         center: [lastPositionStoredLOCALLY[0], lastPositionStoredLOCALLY[1]],
    //         zoom: 10, /////////what is the most appropriate???/
    //         minZoom: 2,
    //         maxZoom: 21,
    //         zoomControl: false,
    //         attributionControl: false,
    //         //drawControl:true,
    //         maxBounds: L.latLngBounds(southWest, northEast)
    //     });
    // }
    geoJSONLocalforageDB = localforage.createInstance({ //to create a separate DB in IndexedDB, so geojsons are not mixed with TilesDB
    name: "geoJSONs"
    });
    setTimeout(function accessLocalStorage(){
          fetchFromLocalStorage()
          //console.log('after fetch and convert',localStorageLayer)
    },300) // really don't know why this timeout, but keep it for now
}
// // this function is to refresh PWA in case the first time it is loaded it contains url query string
// if(isFirstTime == true && urlContainsGeoJSON == true){
//   setTimeout(function refreshIfFirstLoadAndURLGeojson(){
//         fetchFromLocalStorage()
//         //console.log('after fetch and convert',localStorageLayer)
//   },)
// }


//to see the zoom when changing interval
map.on('zoomend', function(e) {
  tilesincanvasloaded = false
  console.log('tilesincanvasloaded',tilesincanvasloaded)

  var currentZoom = map.getZoom()
  console.log('zoom level',currentZoom)
  //to activate carto based on zoom level
  if(whichLayerIsOn == 'deflated' && currentZoom >= 12){
    // deflated.addTo(map)
    //console.('carto open layer added to the map')
  }
  if(whichLayerIsOn == 'deflated' && currentZoom < 12){
    // deflated.removeFrom(map)
    //console.('carto open layer hidden from the map')
  }
  return tilesincanvasloaded

})

// if(document.getElementById("emojionearea-css").disabled == true){
//   map.on('zoomend', function(e) {
//     document.getElementById("emojionearea-css").disabled = false
//   })
// }

L.Permalink.setup(map);

  ////////////////  globe minimap    /////////////
  var optionsMinimap = {
    position:'topright', // this functionality works because of the plugin 'leaflet-control-topcenter'
    width:82,
    height:82,
    land:'black',
    water:'#3B96DD',
    // land:'#AE6D02', //blue
    // water:'#026FFA', //brown
    marker:'white',
    topojsonSrc: 'scripts/lib/leaflet/plugins/leaflet-globeminimap-master/src/world.json'
  }

var miniMap
var addMiniMap = function(){ //the three request must be in the same function!!!!
      $.getScript({
       cache:true,
        url:'scripts/lib/d3.min.js'
      }),
      $.getScript({
         cache:true,
        url:'scripts/lib/topojson.min.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/leaflet-globeminimap-master/src/Control.GlobeMiniMap.js',
        success: function(){
            miniMap = new L.Control.GlobeMiniMap(optionsMinimap)//.addTo(map);

            miniMap.addTo(map)

            setTimeout(function(){
              // filter_Button.button.style.opacity = '0.4'; //this is to avoid loading filter menu while feature selected buttons are still active
              // filter_Button.button.disabled = true;
              miniMap.remove()

            },1800)
        }
      })
}

////////////////////////////////////
  map.addControl(L.control.attribution({
      position: 'bottomright',
      prefix: ''
  }));

var scale = L.control.scale({
    maxWidth: 100,
    metric: true,
    imperial: false,
})//.addTo(map);


//function to customise deflated shapes
function customDeflateMarkers(f) {
    // Use custom marker only for buildings
    if (f.feature.geometry.type === 'Polygon') {
        return {
            icon: L.icon({
                iconUrl: 'images/markerPolygon.png',
                iconSize: [30, 30]
            })
        }
    };
    if (f.feature.geometry.type === 'LineString') {
        return {
            icon: L.icon({
                iconUrl: 'images/markerLine.png',
                iconSize: [30, 30]
            })
        }
    }
    return {};
}

////////////////////////////////           script to get items from local storage    //////////////////////////////
// var finalLayer;
// var groupGeoJSON = []
//the deflate plugin exndens the markerCluster plugin (:true)
var deflated = L.deflate({
    minSize: 20, // if this is set to 100, very small polygons do not deflate at zoom 21
    maxsize: 1,
    markerCluster: true,
    markerType: L.marker,
    markerOptions: customDeflateMarkers
})
// deflated.addTo(map) // to initialize //////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
var numberOfKeysGlobal

geoJSONLocalforageDB.length().then(function(numberOfKeys) {
    // Outputs the length of the database.
    //console.log(numberOfKeys);
    numberOfKeysGlobal = numberOfKeys
}).catch(function(err) {
    //console.log(err);
});

// // function to convert all geojsons in localforage into a layer. The function is called from fetchFromLocalStorage() [below]
// var localStorageLayer
// var localStorageToGeoJSON = function(){
//   ////console.log(groupGeoJSON)
//
//     if (isJson(groupGeoJSON) == false && isFirstTime == false) {
//         localStorageLayer = L.geoJSON(groupGeoJSON, {
//             style: function(feature) {
//                 //myLayerIsOn = true;
//                 ////console.log(myLayerIsOn)
//                 return feature.properties && feature.properties.style;
//             },
//             pointToLayer: function(feature, latlng) {
//
//                 return L.marker(latlng, {
//                     icon: markerIconLocalStorage,
//                     draggable:false
//                 });
//             },
//             color: '#33FFFF',
//             //  icon: markerIconLocalStorage,
//             onEachFeature: onEachFeatureAudioLocalStorage,
//             autopan: false
//         }) //.addTo(map)
//         ////console.log('localStorageLayer', localStorageLayer)
//
//     }
// return localStorageLayer
// }


// function to fetch all geojson files from the IndexedDB-localforage-geoJSONsDB. Localforage is async, so promises are uses. After loop ends, localStorageToGeoJSON() [above] is called
var completedCount = 0 // to call localStorageToGeoJSON() when loop ends
function fetchFromLocalStorage(){
  if (geoJSONLocalforageDB.key(0) != null) {
    console.log('fetching from local storage')

    geoJSONLocalforageDB.keys(function(err, keys) {
      for (var i = 0; i < keys.length; i++) {
        // console.log('fetching from local storage')

          (function(key) {

            geoJSONLocalforageDB.getItem(key).then(function (value) {
              // console.log(value)

                isJson(value);
                if (isJson(value) == true) {
                  // console.log(isJson('this is geojson',value))
                    var getItemToJSON = JSON.parse(value);
                    isJson(getItemToJSON)
                    // console.log(getItemToJSON.properties.OP)

                    //to submit to CARTO the contributions submitted while offline
                    if(getItemToJSON.properties.OP == 'offlineOpen' && isOnline == true){ //////////////////11111111111111111111111111111111!!!!!!!111CHANGE TO OFFLINEOPEN
                      console.log('sbumitted to carto from local storage', getItemToJSON)

                      //console.(getItemToJSON)
                      // console.log(getItemToJSON.properties.OP)
                      // console.log(data)
                        dataGeometry = getItemToJSON.geometry

                        // propertiesGeoJSON = data.properties
                        //to assign each attribute to a variable, which will be added as columns to the DB
                        // landUses = getItemToJSON.properties.landUses;
                        // landUsesEmoji = getItemToJSON.properties.landUsesEmoji;
                        openOrPrivate = getItemToJSON.properties.openOrPrivate;
                        // phoneNumber = getItemToJSON.properties.phoneNumber;
                        areaPolygon = getItemToJSON.properties.areaPolygon;
                        lengthLine = getItemToJSON.properties.lengthLine;
                        dateTime = getItemToJSON.properties.dateTime;
                        // timeSpendSeconds = getItemToJSON.properties.timeSpendSeconds;
                        // dist_m_Participant_Feature = getItemToJSON.properties.dist_m_Participant_Feature;
                        randomID = getItemToJSON.properties.randomID;
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
                          var lenghtkm2decimals = lengthnumber.toFixed(2)
                          var lengthLineNumeric = parseFloat(lenghtkm2decimals)

                        }

                        attribute1s = getItemToJSON.properties.Description
                        const brRegex = /<\/?br>/gi;
                        attribute1s = attribute1s.replace(brRegex, '');

                        attribute2s = getItemToJSON.properties.screen1
                        attribute3s = getItemToJSON.properties.screen2
                        attribute4s = getItemToJSON.properties.screen3
                        attribute5s = null
                        attribute6s = null
                        attribute7s = null
                        attribute8s = null
                        attribute9s = null
                        attribute10s = null
                        dist_m_Participant = 0
                        const numberRegex = /\d+/g;

                        // if(attribute11n == null){
                        //   attribute11n = 0
                        // }else{
                        //   attribute11nstring = kidsmale
                        //   attribute11n = attribute11nstring.match(numberRegex);
                        // }
                        // if(attribute12n == null){
                        //   attribute12n = 0
                        // }else{
                        //   attribute12nstring = kidsfemale
                        //   attribute12n = attribute12nstring.match(numberRegex);
                        // }
                        // if(attribute13n == null){
                        //   attribute13n = 0
                        // }else{
                        //   attribute13nstring = adultmale
                        //   attribute13n = attribute13nstring.match(numberRegex);
                        // }
                        // if(attribute14n == null){
                        //   attribute14n = 0
                        // }else{
                        //   attribute14nstring = adultfemale
                        //   attribute14n = attribute14nstring.match(numberRegex);
                        // }
                        // if(attribute15n == null){
                        //   attribute15n = 0
                        // }else{
                        //   attribute15nstring = household
                        //   attribute15n = attribute15nstring.match(numberRegex);
                        // }
                        attribute11n = 0
                        attribute12n = 0
                        attribute13n = 0
                        attribute14n = 0
                        attribute15n = 0
                        attribute16n = 0
                        attribute17n = 0
                        attribute18n = 0
                        attribute19n = 0
                        attribute20n = 0
                        phoneNumber = getItemToJSON.properties.phoneNumber
                        sapelliProjectIdentifier = getItemToJSON.properties.sapProjID
                        dist_m_Participant = 0
                        /////////////////////////////////////////LOCAL STORAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE///////////////////////////////////////////////
                        // var commentAudioDefault = '.'
                        var sql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb_QMM_Madagascar` (geom, contributionid, phone, sapprojid, areapolygon, lengthline, distance, date, attribute1s, attribute2s, attribute3s, attribute4s, attribute5s, attribute6s, attribute7s, attribute8s, attribute9s, attribute10s, attribute11n, attribute12n, attribute13n, attribute14n, attribute15n, attribute16n, attribute17n, attribute18n, attribute19n, attribute20n, timestamp) VALUES (ST_GeogFromGeoJSON('";
                        var sql2 = dataGeometryString;
                        var sql3 = "',make_valid => true),'"+randomID+ "',CAST('" + phoneNumber + "' AS INT64),'" + sapelliProjectIdentifier + "',CAST('" + areaPolygonNumeric + "' AS NUMERIC),CAST('" + lengthLineNumeric + "' AS NUMERIC),CAST('" + dist_m_Participant + "' AS INT64),'" + dateTime +"','"+attribute1s+ "','" + attribute2s + "','" + attribute3s + "','" + attribute4s + "','" + attribute5s + "','" + attribute6s + "','" + attribute7s + "','" + attribute8s + "','"+attribute9s+ "','" + attribute10s + "',CAST('"+ attribute11n + "' AS INT64),CAST('" + attribute12n + "' AS INT64),CAST('" + attribute13n + "' AS INT64),CAST('" + attribute14n + "' AS INT64),CAST('" + attribute15n + "' AS INT64),CAST('" + attribute16n + "' AS INT64),CAST('" +attribute17n+ "' AS INT64),CAST('" + attribute18n + "' AS INT64),CAST('" + attribute19n + "' AS INT64),CAST('" + attribute20n + "' AS INT64),CAST('" +dateTime+"' AS TIMESTAMP))";
                        var pURL = sql + sql2 + sql3;
                        console.log('submited to carto from local storage',pURL)
                        submitToProxy(pURL);


                      ////////////change the property so it is only sent once

                      getItemToJSON.properties.OP = 'submittedOpen';
                      var getItemToJSONstringified = JSON.stringify(getItemToJSON);

                        // var getItemToJSON = JSON.parse(value);
                      // geoJSONLocalforageDB.setItem(tempName, dataStringified)
                      geoJSONLocalforageDB.setItem(key, getItemToJSONstringified);

                    }
                    //add each json to an array-------------------------
                  //  groupGeoJSON[i] = getItemToJSON
                  groupGeoJSON.push(getItemToJSON)
                  completedCount += 1;
                  //console.log(groupGeoJSON)

                  //call localStorageToGeoJSON() when loop ends
                  if (completedCount == keys.length){
                    localStorageToGeoJSON()
                  }
                }
            });
          })(keys[i]);
      }
    });
   }
}

//conditions to catch error in case no geojson and also to avoid error when adding to map an empty layer if is first time
//var myLayerIsOn = true;
var markerIconLocalStorage = new L.icon({
    iconUrl: 'images/markerLocalStorage.png',
    //  shadowUrl: 'leaf-shadow.png',
    //    iconUrl: 'scripts/lib/leaflet/images/marker-icon.png',
    iconSize: [22, 33], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor: [11, 33], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, -33] // point from which the popup should open relative to the iconAnchor
});

///////////////////////////////////////////////////////////////////////////////////////////////////////

// var googleSat = L.tileLayer.offline('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', tilesDb, {
  var googleSat = L.tileLayer.offline('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFyY29zbW9yZXV1Y2wiLCJhIjoiY2xwZHNlbmFpMDVoZjJpcGJxOHplOGw0ZCJ9.MiHNkvMRkTcfndsLMH166w', tilesDb, {


    minZoom: 2,
    maxZoom: 21,
    maxNativeZoom: 21,
    opacity: 1,
    savetileend:true,
    // cache:true,
    //border: 'solid black 5px',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Leaflet | Mapbox',
})//.addTo(map);

var osm = L.tileLayer.offline('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', tilesDb, {
    minZoom: 2,
    maxZoom: 19,
    maxNativeZoom: 19,
    // subdomains:['mt0','mt1','mt2','mt3'],
    attribution: 'Leaflet | OpenStreetMap Contributors'

});
// var googleSatOnly = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
//     maxZoom: 20,
//     subdomains:['mt0','mt1','mt2','mt3']
// var currentZoomdownloadfunction = map.getZoom()
// var zoomlimittodownload = currentZoomdownloadfunction + 3
var mapCurrentZoomtilesdownload = map.getZoom();
var maxzoom = mapCurrentZoomtilesdownload+3;
var offlineControlGoogle = L.control.offline(googleSat, tilesDb, {
      minZoom: 14,
      maxZoom: 18,
    saveButtonHtml: '<img src="images/download.png" alt="..." width=30px ; height=30px>',
    removeButtonHtml: '<img src="images/bin.png" alt="..." width=25px ; height=25px>',

    confirmSavingCallback: function(nTilesToSave, continueSaveTiles) {


     // console.log('zoomlimittodownload',zoomlimittodownload)
        if (window.confirm(nTilesToSave + 'ይጫኑ እና ይጠብቁ። ከ 1 ደቂቃ በኋላ ምንም ምላሽ ከሌለ መተግበሪያውን ይዝጉ እና እንደገና ይክፈቱ')) {
          document.getElementById('maploadinggif').src = 'images/gifcartofilter.gif'
          document.getElementById('MapLoading').style.display = 'initial'
          document.getElementById("Alert").style.fontSize = "30px";
          document.getElementById("Alert").style.textAlign = "center"
          document.getElementById('Alert').innerHTML = '⌛'
          document.getElementById("Alert").style.display = 'initial'
            continueSaveTiles();
        }
        //console.('map.getZoom()+3',map.getZoom()+3)

        // return zoomlimittodownload
    },
    confirmRemovalCallback: function(continueRemoveTiles) {
        if (window.confirm('ሰርዝ???????')) {
            continueRemoveTiles();
        }
    }

});



//script to refresh planet mosaics based on the date (assuming new monthly mosaics is updated around the 10th of each month)
if(isIOS == false){
  var d = new Date();
  // d.setMonth(d.getMonth() - 3);
  var monthNumber = d.getMonth() + 1 // the month count starts in 0!!! so July is 6
  var dayNumber = d.getDate()
  var year = d.getFullYear()
  // console.log('year',year)
  const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // console.log('month',monthNumber)
  if(dayNumber >= 15){ ///////////////// because planet usually uploads the mosaics mid of the month (so 15june the May mosaic is uploaded)
    var monthsBack = 1
    // console.log(dayNumber)
  }else{
    var monthsBack = 2

  }

  //script for most recent mosaic, which needs to address the year change (change year), could be better but it works
    if(monthNumber == 1){
      if(dayNumber >=15){
        mosaicRequestedLatest = 12
        attributeMosaicLatest = 'December'
        year = 2023
      }else{
        mosaicRequestedLatest = 11
        attributeMosaicLatest = 'November'
        year = 2023
      }

    }else if(monthNumber == 2){
      if(dayNumber >=15){
        mosaicRequestedLatest = '01'
        attributeMosaicLatest = 'January'
        year = 2024
      }else{
        mosaicRequestedLatest = 12
        attributeMosaicLatest = 'December'
        year = 2023
      }

    }else{
      var mosaicRequestedLatest = (monthNumber - monthsBack).toLocaleString('en-US', {minimumIntegerDigits: 2}) //url MONTH
      var attributeMosaicLatest = monthsArray[mosaicRequestedLatest - 1] // attributes
    }
    //last month



   //4months ago
   var date4MonthsAgo = new Date(d.setMonth(d.getMonth()-(3+monthsBack))); //3 because monthsback is 1 (or 2), so 4 months ago (or 5)
   // console.log('date4MonthsAgo',date4MonthsAgo)
   var month4MonthsAgo = date4MonthsAgo.getMonth()+1;
   var mosaicRequested4Months = month4MonthsAgo.toLocaleString('en-US', {minimumIntegerDigits: 2}) //url MONTH
   var year4MonthsAgo = date4MonthsAgo.getFullYear(); //url & attributes YEAR
   var attributeMosaic4Months = monthsArray[mosaicRequested4Months - 1] //attributes MONTH

   //8months ago
   d = new Date() //to refresh the date
   var date8MonthsAgo = new Date(d.setMonth(d.getMonth()-(7+monthsBack)));
   // console.log('date8MonthsAgo',date8MonthsAgo)
   var month8MonthsAgo = date8MonthsAgo.getMonth()+1;
   var mosaicRequested8Months = month8MonthsAgo.toLocaleString('en-US', {minimumIntegerDigits: 2}) //url MONTH
   var year8MonthsAgo = date8MonthsAgo.getFullYear(); //url & attributes YEAR
   var attributeMosaic8Months = monthsArray[mosaicRequested8Months - 1] //attributes MONTH

   //12months ago
   d = new Date() //to refresh the date
   var date12MonthsAgo = new Date(d.setMonth(d.getMonth()-(11+monthsBack)));
   // console.log('date12MonthsAgo',date12MonthsAgo)
   var month12MonthsAgo = date12MonthsAgo.getMonth()+1;
   var mosaicRequested12Months = month12MonthsAgo.toLocaleString('en-US', {minimumIntegerDigits: 2}) //url MONTH
   var year12MonthsAgo = date12MonthsAgo.getFullYear(); //url & attributes YEAR
   var attributeMosaic12Months = monthsArray[mosaicRequested12Months - 1] //attributes MONTH

   //2 years ago
   d = new Date() //to refresh the date
   var date24MonthsAgo = new Date(d.setMonth(d.getMonth()-(23+monthsBack)));
   // console.log('date24MonthsAgo',date24MonthsAgo)
   var month24MonthsAgo = date24MonthsAgo.getMonth()+1;
   var mosaicRequested24Months = month24MonthsAgo.toLocaleString('en-US', {minimumIntegerDigits: 2}) //url MONTH
   var year24MonthsAgo = date24MonthsAgo.getFullYear(); //url & attributes YEAR
   var attributeMosaic24Months = monthsArray[mosaicRequested24Months - 1] //attributes MONTH

   //3 years ago
   d = new Date() //to refresh the date
   var date36MonthsAgo = new Date(d.setMonth(d.getMonth()-(35+monthsBack)));
   // console.log('date36MonthsAgo',date36MonthsAgo)
   var month36MonthsAgo = date36MonthsAgo.getMonth()+1;
   var mosaicRequested36Months = month36MonthsAgo.toLocaleString('en-US', {minimumIntegerDigits: 2}) //url MONTH
   var year36MonthsAgo = date36MonthsAgo.getFullYear(); //url & attributes YEAR
   var attributeMosaic36Months = monthsArray[mosaicRequested36Months - 1] //attributes MONTH

   //5 years ago
   d = new Date() //to refresh the date
   var date60MonthsAgo = new Date(d.setMonth(d.getMonth()-(59+monthsBack)));
   // console.log('date60MonthsAgo',date60MonthsAgo)
   var month60MonthsAgo = date60MonthsAgo.getMonth()+1;
   var mosaicRequested60Months = month60MonthsAgo.toLocaleString('en-US', {minimumIntegerDigits: 2}) //url MONTH
   var year60MonthsAgo = date60MonthsAgo.getFullYear(); //url & attributes YEAR
   var attributeMosaic60Months = monthsArray[mosaicRequested60Months - 1] //attributes MONTH

}else{
   var monthMosaicRequested = (monthNumber - 2).toLocaleString('en-US', {minimumIntegerDigits: 2})
   year = '2021'
   mosaicRequestedLatest = '12'
   attributeMosaicLatest = 'December 2022'

}

var sentinelHubKey = '82b5a4e7-b887-40b2-949b-1b47a2aa9774';
//console.('mosaicRequestedLatest',mosaicRequestedLatest)

  // var planetScopeMonthlyMosaicLatest = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_' + mosaicRequestedLatest + '-' + mosaicRequested4Months + '_mosaic/gmap/{z}/{x}/{y}.png?api_key=dc4d2573d7554ccd8caccc66bd542d1b',{
  //   attribution: 'Leaflet | PlanetScope Imagery ' + attributeMosaicLatest + ' ' + year
  //   })
  // var planetScopeMonthlyMosaicLatestMinus4Months = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_' + year4MonthsAgo + '-' + mosaicRequested4Months + '_mosaic/gmap/{z}/{x}/{y}.png?api_key=dc4d2573d7554ccd8caccc66bd542d1b',{
  //   attribution: 'Leaflet | PlanetScope Imagery ' + attributeMosaic4Months + ' ' + year4MonthsAgo
  //   })
  // var planetScopeMonthlyMosaicLatestMinus8Months = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_' + year8MonthsAgo + '-' + mosaicRequested8Months + '_mosaic/gmap/{z}/{x}/{y}.png?api_key=dc4d2573d7554ccd8caccc66bd542d1b',{
  //   attribution: 'Leaflet | PlanetScope Imagery ' + attributeMosaic8Months + ' ' + year8MonthsAgo
  //   })
  // var planetScopeMonthlyMosaic1YearAgo = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_' + year12MonthsAgo + '-' + mosaicRequested12Months + '_mosaic/gmap/{z}/{x}/{y}.png?api_key=dc4d2573d7554ccd8caccc66bd542d1b',{
  //   attribution: 'Leaflet | PlanetScope Imagery  ' + attributeMosaic12Months + ' ' + year12MonthsAgo
  //   })
  // var planetMosaicLatestMinus2Years = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_2020-06_2020-08_mosaic/gmap/{z}/{x}/{y}.png?api_key=dc4d2573d7554ccd8caccc66bd542d1b',{
  //       attribution: 'Leaflet | PlanetScope Imagery ' + attributeMosaic24Months + ' ' + year24MonthsAgo
  //   });
  //
  // var  planetMosaicLatestMinus3Years = L.tileLayer.wms("https://services.sentinel-hub.com/ogc/wms/" + sentinelHubKey + "?REQUEST=GetMap&PREVIEW=2", {
  //       layers: '2017SENTINEL2',
  //       attribution: 'Leaflet | Sentinel 2 Imagery August 2015'
  //   });

    var planetScopeMonthlyMosaicLatest = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_2023-'+mosaicRequestedLatest+'_mosaic/gmap/{z}/{x}/{y}.png?api_key=dc4d2573d7554ccd8caccc66bd542d1b',{
      attribution: 'Leaflet | PlanetScope Imagery '+attributeMosaicLatest+' 2023'
      })
    var planetScopeMonthlyMosaicLatestMinus4Months = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_2023-'+mosaicRequested4Months+'_mosaic/gmap/{z}/{x}/{y}.png?api_key=dc4d2573d7554ccd8caccc66bd542d1b',{
      attribution: 'Leaflet | PlanetScope Imagery '+attributeMosaic4Months+' 2023'
      })
    var planetScopeMonthlyMosaicLatestMinus8Months = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_2022-'+mosaicRequested8Months+'_mosaic/gmap/{z}/{x}/{y}.png?api_key=dc4d2573d7554ccd8caccc66bd542d1b',{
      attribution: 'Leaflet | PlanetScope Imagery '+attributeMosaic8Months+' 2022'
      })
    var planetScopeMonthlyMosaic1YearAgo = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_2022-'+mosaicRequested12Months+'_mosaic/gmap/{z}/{x}/{y}.png?api_key=dc4d2573d7554ccd8caccc66bd542d1b',{
      attribution: 'Leaflet | PlanetScope Imagery '+attributeMosaic12Months+' 2022'
      })
    var planetMosaicLatestMinus2Years = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_2021-'+mosaicRequested24Months+'_mosaic/gmap/{z}/{x}/{y}.png?api_key=dc4d2573d7554ccd8caccc66bd542d1b',{
          attribution: 'Leaflet | PlanetScope Imagery '+attributeMosaic24Months+' 2021'
      });


    var  planetMosaicLatestMinus3Years = L.tileLayer.wms("https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_2020-06_2020-08_mosaic/gmap/{z}/{x}/{y}.png?api_key=dc4d2573d7554ccd8caccc66bd542d1b", {
          // layers: '2017SENTINEL2',
          attribution: 'Leaflet | PlanetScope Imagery ~May 2020'
      });
    //here we just need to copy the instance ID from the dashboard, and set the bounding box

    var  planetMosaicLatestMinus5Years = L.tileLayer.wms("https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_2018-06_2018-11_mosaic/gmap/{z}/{x}/{y}.png?api_key=dc4d2573d7554ccd8caccc66bd542d1b", {
          // layers: '2013LANDSAT',
          attribution: 'Leaflet | PlanetScope Imagery 2018'
      });







    // var sentinelMosaicLatestMinus2Years = L.tileLayer.wms("https://services.sentinel-hub.com/ogc/wms/" + sentinelHubKey + "?REQUEST=GetMap&PREVIEW=2", {
    //       layers: '2019SENTINEL2',
    //       attribution: 'Leaflet | Sentinel 2 Imagery January 2019'
    //   });
    // var sentinelMosaicLatestMinus3Years = L.tileLayer.wms("https://services.sentinel-hub.com/ogc/wms/" + sentinelHubKey + "?REQUEST=GetMap&PREVIEW=2", {
    //       layers: '2018SENTINEL2',
    //       attribution: 'Leaflet | Sentinel 2 Imagery January 2018'
    //   });
    // var sentinelMosaicLatestMinus5Years = L.tileLayer.wms("https://services.sentinel-hub.com/ogc/wms/" + sentinelHubKey + "?REQUEST=GetMap&PREVIEW=2", {
    //       layers: '2017SENTINEL2',
    //       attribution: 'Leaflet | Sentinel 2 Imagery January 2017'
    //   });

  // var  sentinelMosaic6YearsAgo = L.tileLayer.wms("https://services.sentinel-hub.com/ogc/wms/" + sentinelHubKey + "?REQUEST=GetMap&PREVIEW=2", {
  //       layers: '2020SENTINEL2',
  //       attribution: 'Leaflet | Sentinel 2 Imagery January 2015'
  //   });



  // var  planetScopeMonthlyMosaic = L.tileLayer.wms("https://services.sentinel-hub.com/ogc/wms/" + sentinelHubKey + "?REQUEST=GetMap&PREVIEW=2", {
  //       layers: '2020SENTINEL2',
  //       attribution: 'Leaflet |Sentinel 2 Imagery May 2020'
  //   });


// ///////////// messages for tileS download   (NOT USED CURRENTLY)     /////////
// googleSat.on('offline:save-start', function(data) {
//     ////console.log('Saving ' + data.nTilesToSave + ' tiles.');
// });
googleSat.on('offline:save-end', function() {
    // alert('All the tiles were saved.');
});
googleSat.on('offline:save-error', function(err) {
    ////console.error('Error when saving tiles: ' + err);
});
googleSat.on('offline:remove-start', function() {
    ////console.log('Removing tiles.');
});
googleSat.on('offline:remove-end', function() {
    alert('All the tiles were removed.');
});
googleSat.on('offline:remove-error', function(err) {
    ////console.error('Error when removing tiles: ' + err);
});
googleSat.on('offline:below-min-zoom-error', function() {
    alert('Can not save tiles below minimum zoom level.');
});
// ////////////////
//
// osm.on('offline:save-start', function(data) {
//     ////console.log('Saving ' + data.nTilesToSave + ' tiles.');
// });
// osm.on('offline:save-end', function() {
//     alert('All the tiles were saved.');
// });
// osm.on('offline:save-error', function(err) {
//     ////console.error('Error when saving tiles: ' + err);
// });
// osm.on('offline:remove-start', function() {
//     ////console.log('Removing tiles.');
// });
// osm.on('offline:remove-end', function() {
//     alert('All the tiles were removed.');
// });
// osm.on('offline:remove-error', function(err) {
//     ////console.error('Error when removing tiles: ' + err);
// });
// osm.on('offline:below-min-zoom-error', function() {
//     alert('Can not save tiles below minimum zoom level.');
// });

var clickButtonCount = 0;

//to set the position of icon in leaflet easybutton based on OS - ios does not center the image. Not optimal...
// if (isIOS == true) {
//     var iconGPS = '<img src="images/gps.png" width=40px; height=40px; loading="lazy"style="margin-left:-5px" > ';
//     var iconOSM = '<img src="images/osm.png" width=35px; height=35px; loading="lazy"style="margin-left:-6px" > ';
//     var iconGOOGLE = '<img src="images/google.png" width=40px; height=40px; loading="lazy"style="margin-left:-6px" > ';
//     var iconPLANET = '<img src="images/google.png" width=35px; height=35px; loading="lazy" style="margin-left:-6px;margin-top:2px" > ';
//     var iconLAYERS = '<img src="images/myLayer.png" width=40px; height=40px; loading="lazy"style="margin-left:-6px" > ';
//     var iconFILTER = '<img src="images/filterIcon.png" width=40px; height=40px; loading="lazy"style="margin-left:-6px" > ';
//     var iconRANDOM = '<img src="images/gps.png" width=40px; height=40px; loading="lazy" style="margin-left:-6px" > ';
//
// } else {
//     var iconGPS = '<img src="images/gps.png" width=40px; height=40px; loading="lazy" style="margin-left:-1px" > ';
//     var iconOSM = '<img src="images/osm.png" width=40px; height=40px; loading="lazy" style="margin-left:0px;margin-top:2px" > ';
//     var iconGOOGLE = '<img src="images/google.png" width=40px; height=40px; loading="lazy" style="margin-left:-1px"> ';
//     var iconPLANET = '<img src="images/google.png" width=35px; height=35px; loading="lazy" style="margin-left:-1px;margin-top:2px"> ';
//     var iconLAYERS = '<img src="images/myLayer.png" width=40px; height=40px; loading="lazy" style="margin-left:-1px"> ';
//     var iconFILTER = '<img src="images/filterIcon.png" width=40px; height=40px; loading="lazy" style="margin-left:-1px" > ';
//     var iconRANDOM = '<img src="images/gps.png" width=40px; height=40px; loading="lazy" style="margin-left:-1px" > ';
// }

if (isIOS == true) {
    var iconGPS = '<img src="images/gpsSearching.gif" alt="..." width=40px; height=40px; loading="lazy" text-align="center" style="top:50%; margin-left:-5px" > ';
    var iconOSM = '<img src="images/google.png" alt="..." width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-top:2px; margin-left:-5px" > ';
    var iconGOOGLE = '<img src="images/google.png" alt="..." width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-5px" > ';
    var iconPLANET = '<img src="images/google.png" alt="..." width=35px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-5px" > ';
    if(isOnline == true){
      var iconLAYERS = '<img src="images/onionlayericon.png" alt="..." width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-6px" > ';
    }else{
      var iconLAYERS = '<img src="images/onionlayericon.png" alt="..." width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-6px" > ';
    }
    var iconFILTER = '<img src="images/backButton.png" alt="..." width=35px; height=35px; loading="lazy" text-align="center" style="top:50%;margin-left:-6px;margin-top:2px" > ';
    var iconFILTERlocalStorage = '<img src="images/filterIcon.png" alt="..." width=35px; height=35px; loading="lazy" text-align="center" style="top:50%;margin-left:-6px;margin-top:2px" > ';
    var iconRANDOM = '<img src="images/gps.png" alt="..." width=40px; height=40px; loading="lazy" text-align="center" style="top:50%" > ';
    var iconLocalStorageRecenter = '<img src="images/LocalStorageRecenter.png" alt="..." width=40px; height=40px; loading="lazy" text-align="center" style="top:50%; margin-left:-5px" > ';


} else {
    var iconGPS = '<img src="images/gpsSearching.gif" alt="..." width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;"> ';
    var iconOSM = '<img src="images/google.png" alt="..." width=40px; height=40px; loading="lazy" text-align="center" style="top:50%; margin-left:-1px" > ';
    var iconGOOGLE = '<img src="images/google.png" alt="..." width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;  margin-left:-1px"> ';
    var iconPLANET = '<img src="images/google.png" alt="..." width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;  margin-left:-1px"> ';
    if(isOnline == true){
      var iconLAYERS = '<img src="images/onionlayericon.png" alt="..." width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-2px" > ';
    }else{
      var iconLAYERS = '<img src="images/onionlayericon.png" alt="..." width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-2px" > ';
    }
    var iconFILTER = '<img src="images/backButton.png" alt="..." width=35px; height=35px; loading="lazy" text-align="center" style="top:50%;margin-left:-1px;margin-top:2px" > ';
    var iconFILTERlocalStorage = '<img src="images/filterIcon.png" alt="..." width=35px; height=35px; loading="lazy" text-align="center" style="top:50%;margin-left:-1px;margin-top:2px" > ';
    var iconRANDOM = '<img src="images/gps.png" alt="..." width=40px; height=40px; loading="lazy" text-align="center" style="top:50%" > ';
    var iconLocalStorageRecenter = '<img src="images/LocalStorageRecenter.png" alt="..." width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;"> ';

}
var basemapOn = 'googleSat'

//to show the clock when map loads for first time
// document.getElementById("Alert").style.fontSize = "25px";
// document.getElementById('Alert').innerHTML = '⌛'
// document.getElementById("Alert").style.display = 'initial'
// document.getElementById("MapLoading").style.display = 'initial'

// to show the clock while tiles are loading when zoom in/out, not only when toggling the basemap
//everytime the user zoomIn/Out or pan, the clock is shown, and only disapear when tiles are loaded


// map.on('zoomend', function(){
//   //console.log("map zoomed in/out")
//   document.getElementById("Alert").style.fontSize = "25px";
//   document.getElementById('Alert').innerHTML = '⌛'
//   document.getElementById("Alert").style.display = 'initial'
// })
// map.on('moveend', function(){
//   //console.log("map panned")
//   document.getElementById("Alert").style.fontSize = "25px";
//   document.getElementById('Alert').innerHTML = '⌛'
//   document.getElementById("Alert").style.display = 'initial'
// })

//we use tileloadstart here instead of moveend zoomend as on(load) is only when not in cache. so clock is shown everytime there is a new request
// var osmloaded = false
// var intervalOsm
// osm.on("loading",function() {
//   intervalOsm = setInterval(function(){
//     if(osmloaded == false){
//       //console.log("tile requestedddddddddddd") //time to avoid showing the clock for miliseconds if map loads fast
//       document.getElementById("Alert").style.fontSize = "25px";
//       document.getElementById('Alert').innerHTML = '⌛'
//       document.getElementById("Alert").style.display = 'initial'
//       osmloaded = false
//     }
//   },600)
//   return osmloaded
// });
// googleSat.on("loading",function() {
//     //console.log("tile requested")
//     document.getElementById("Alert").style.fontSize = "25px";
//     document.getElementById('Alert').innerHTML = '⌛'
//     document.getElementById("Alert").style.display = 'initial'
// });
// planetScopeMonthlyMosaic.on("loading",function() {
//     //console.log("tile requested")
//     document.getElementById("Alert").style.fontSize = "25px";
//     document.getElementById('Alert').innerHTML = '⌛'
//     document.getElementById("Alert").style.display = 'initial'
// });

var returnErrorLatestPlanet = false
osm.on("load",function() {
  document.getElementById("MapLoading").style.display = 'none'

});
osm.on("tileerror",function() {
  console.log('error loading tiles')
  document.getElementById("MapLoading").style.display = 'none'
  document.getElementById("Alert").style.fontSize = "30px";
  document.getElementById("Alert").style.textAlign = "center"
  document.getElementById('Alert').innerHTML = '<br> ❗ 📶 ❗'
  document.getElementById("Alert").style.display = 'initial'
  // map.setZoom(0)

});
var tilesincanvasloaded = false

googleSat.on("load",function() {
  tilesincanvasloaded = true

 document.getElementById("MapLoading").style.display = 'none'
 console.log('tilesincanvasloaded',tilesincanvasloaded)
return tilesincanvasloaded

});
googleSat.on("tileerror",function() {
  console.log('error loading tiles')
  document.getElementById("MapLoading").style.display = 'none'
  document.getElementById("Alert").style.fontSize = "30px";
  document.getElementById("Alert").style.textAlign = "center"
  document.getElementById('Alert').innerHTML = ''
  document.getElementById("Alert").style.display = 'initial'
  // map.setZoom(0)

});
planetScopeMonthlyMosaicLatest.on("load",function() {
  //console.log("all visible planet tiles have been loaded")
  // document.getElementById("Alert").style.display = 'none'
  document.getElementById("MapLoading").style.display = 'none'

  if(returnErrorLatestPlanet == false){
    document.getElementById("Alert").style.fontSize = "20px";
    document.getElementById('Alert').innerHTML = '🕑<br>☀️🌙'
    document.getElementById("Alert").style.display = 'initial'
  }else{
    document.getElementById("Alert").style.fontSize = "30px";
    document.getElementById("Alert").style.textAlign = "center"
    document.getElementById('Alert').innerHTML = '<br> ❗ 📶 ❗'
    document.getElementById("Alert").style.display = 'initial'
  }
});
planetScopeMonthlyMosaicLatest.on("tileerror",function() {
  console.log('error loading tiles')
  // clearInterval(checkSliderPosition)
  document.getElementById("MapLoading").style.display = 'none'
  // document.getElementById("Alert").style.display = 'none'
  // document.getElementById("Alert").style.fontSize = "40px";
  // document.getElementById('Alert').innerHTML = '<br> 📶 ❗'
  // document.getElementById("Alert").style.display = 'initial'
  returnErrorLatestPlanet = true
  return returnErrorLatestPlanet
});

planetScopeMonthlyMosaicLatestMinus4Months.on("load",function() {
  //console.log("all visible planet tiles have been loaded")
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.fontSize = "20px";
  document.getElementById('Alert').innerHTML = '120<br>☀️🌙'
  document.getElementById("Alert").style.display = 'initial'});
planetScopeMonthlyMosaicLatestMinus4Months.on("tileerror",function() {
  console.log('error loading tiles')
  // clearInterval(checkSliderPosition)
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.display = 'none'
  document.getElementById("Alert").style.fontSize = "30px";
  document.getElementById("Alert").style.textAlign = "center"
  document.getElementById('Alert').innerHTML = '<br> ❗ 📶 ❗'
  document.getElementById("Alert").style.display = 'initial'
});

planetScopeMonthlyMosaicLatestMinus8Months.on("load",function() {
  //console.log("all visible planet tiles have been loaded")
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.fontSize = "20px";
  document.getElementById('Alert').innerHTML = '240<br>☀️🌙'
  document.getElementById("Alert").style.display = 'initial'
});
planetScopeMonthlyMosaicLatestMinus8Months.on("tileerror",function() {
  console.log('error loading tiles')
  // clearInterval(checkSliderPosition)
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.display = 'none'
  document.getElementById("Alert").style.fontSize = "30px";
  document.getElementById("Alert").style.textAlign = "center"
  document.getElementById('Alert').innerHTML = '<br> ❗ 📶 ❗'
  document.getElementById("Alert").style.display = 'initial'
});
planetScopeMonthlyMosaic1YearAgo.on("load",function() {
  //console.log("all visible planet tiles have been loaded")
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.fontSize = "20px";
  document.getElementById('Alert').innerHTML = '365<br>☀️🌙'
  document.getElementById("Alert").style.display = 'initial'
});
planetScopeMonthlyMosaic1YearAgo.on("tileerror",function() {
  console.log('error loading tiles')
  // clearInterval(checkSliderPosition)
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.display = 'none'
  document.getElementById("Alert").style.fontSize = "30px";
  document.getElementById("Alert").style.textAlign = "center"
  document.getElementById('Alert').innerHTML = '<br> ❗ 📶 ❗'
  document.getElementById("Alert").style.display = 'initial'
});
planetMosaicLatestMinus2Years.on("load",function() {
  //console.log("all visible planet tiles have been loaded")
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.fontSize = "20px";
  document.getElementById('Alert').innerHTML = '2<br>☀️🌎'
  document.getElementById("Alert").style.display = 'initial'
});
planetMosaicLatestMinus2Years.on("tileerror",function() {
  console.log('error loading tiles')
  // clearInterval(checkSliderPosition)
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.display = 'none'
  document.getElementById("Alert").style.fontSize = "30px";
  document.getElementById("Alert").style.textAlign = "center"
  document.getElementById('Alert').innerHTML = '<br> ❗ 📶 ❗'
  document.getElementById("Alert").style.display = 'initial'
});
planetMosaicLatestMinus3Years.on("load",function() {
  //console.log("all visible planet tiles have been loaded")
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.fontSize = "20px";
  document.getElementById('Alert').innerHTML = '2020<br>'
  document.getElementById("Alert").style.display = 'initial'
});
planetMosaicLatestMinus3Years.on("tileerror",function() {
  console.log('error loading tiles')
  // clearInterval(checkSliderPosition)
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.display = 'none'
  document.getElementById("Alert").style.fontSize = "30px";
  document.getElementById("Alert").style.textAlign = "center"
  document.getElementById('Alert').innerHTML = '<br> ❗ 📶 ❗'
  document.getElementById("Alert").style.display = 'initial'
});
planetMosaicLatestMinus5Years.on("load",function() {
  //console.log("all visible planet tiles have been loaded")
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.fontSize = "20px";
  document.getElementById('Alert').innerHTML = '2018<br>'
  document.getElementById("Alert").style.display = 'initial'

});
planetMosaicLatestMinus5Years.on("tileerror",function() {
  console.log('error loading tiles')
  // clearInterval(checkSliderPosition)
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.display = 'none'
  document.getElementById("Alert").style.fontSize = "30px";
  document.getElementById("Alert").style.textAlign = "center"
  document.getElementById('Alert').innerHTML = '<br> ❗ 📶 ❗'
  document.getElementById("Alert").style.display = 'initial'
});



var osm_Button = L.easyButton({
    id: 'osm',
    class: 'easyButton',
    position: 'topright',
    //background:'images/forest.png',
    states: [{
        // icon: '<img src="images/osm.png" width=40px ; height=40px; style="margin-left:-10px"> ',
        icon: iconOSM,
        //  background:"images/forest.png",
        stateName: 'check-mark',
        onClick: function(btn, map) {
          planet_Button.button.style.backgroundColor = 'white';
          setTimeout(function(){ // to avoid the 1-2 sec waiting while local storage layer is loading
            planet_Button.button.style.backgroundColor = 'black';
          },300)

          startSearchingLocation()
          // document.getElementById("Alert").style.fontSize = "25px";
          // document.getElementById('Alert').innerHTML = '⌛'
          // document.getElementById("Alert").style.display = 'initial'
          document.getElementById("MapLoading").style.display = 'initial'

            //clickButtonCount += 1;
            // document.getElementById('imageryAlert').style.display = 'none'
            mapCurrentZoom = map.getZoom();
           // //console.log('zoom1', mapCurrentZoom)
            if(mapCurrentZoom >19){
              map.setZoom(19)//because OSM does not provide tiles beyond zoom 19
              mapCurrentZoom = map.getZoom();
            // //console.log('zoom2', mapCurrentZoom)
            }

            googleSat.removeFrom(map);
            map.options.maxZoom = 19; //Set max zoom level as OSM does not serve tiles with 20+ zoom levels
            map.options.minZoom = 2;
            osm_Button.removeFrom(map);
            planet_Button.addTo(map);
            // rose.addTo(map)

            // myLayer_Button.addTo(map) //keep this, otherwise the button moves up
            // if (whichLayerIsOn == 'localStorage'){
            //   filterLocalStorage_Button.addTo(map)
            // }else{
            //   filter_Button.addTo(map);
            // }
            try{
              osm.addTo(map);

              osm.on("load",function() {

                //console.log("all visible osm tiles have been loaded")
                // document.getElementById("Alert").style.display = 'none'
                document.getElementById("MapLoading").style.display = 'none'

               });

            }catch{
              //console.log('error loading osm tiles')
            }


            basemapOn = 'osm'
            return basemapOn;
        }
    }]
});


osm_Button.button.style.width = '50px';
osm_Button.button.style.height = '50px';
osm_Button.button.style.transitionDuration = '.3s';
osm_Button.button.style.backgroundColor = 'black';
//osm_Button.button.style.transitionDuration = '.3s';
//osm_Button.addTo(map);
var sliderPosition = 100
var googleSat_Button = L.easyButton({
    id: 'googleSat',
    class: 'easyButton1',
    position: 'topright',
    states: [{
        icon: iconGOOGLE,
        //stateName: 'check-mark',
        onClick: function(btn, map) {
          document.getElementById('myRange').style.display = 'none'
          document.getElementById("Alert").style.display = 'none'
          document.getElementById("MapLoading").style.display = 'none'

          osm_Button.button.style.backgroundColor = 'white';
          setTimeout(function(){
            osm_Button.button.style.backgroundColor = 'black';
          },300)
          clearInterval(checkSliderPosition)

          // document.getElementById("Alert").style.fontSize = "25px";
          // document.getElementById('Alert').innerHTML = '⌛'
          // document.getElementById("Alert").style.display = 'initial'
          document.getElementById("MapLoading").style.display = 'initial'


            //clickButtonCount += 1;
            // document.getElementById('imageryAlert').style.display = 'none'
            map.options.maxZoom = 21; // set the max zoom level to 21 for google imagery
            map.options.minZoom = 2;
            googleSat_Button.removeFrom(map);
            osm_Button.addTo(map);
            // rose.addTo(map)

            // myLayer_Button.addTo(map) //keep this, otherwise the button moves up
            // // if(isOnline == true){
            // if (whichLayerIsOn == 'localStorage'){
            //   filterLocalStorage_Button.addTo(map)
            // }else{
            //   filter_Button.addTo(map);
            // }
            // }


            try{
              removeAllimagery()
              googleSat.addTo(map);
              osm.removeFrom(map);

              googleSat.on("load",function() {

                //console.log("all visible google tiles have been loaded")
                // document.getElementById("Alert").style.display = 'none'
                document.getElementById("MapLoading").style.display = 'none'

             });

            }catch{
              //console.log('error loading google tiles')
            }

            basemapOn = 'googleSat'



            return basemapOn;
        }
    }]
});

googleSat_Button.button.style.width = '50px';
googleSat_Button.button.style.height = '50px';
googleSat_Button.button.style.transitionDuration = '.3s';
// googleSat_Button.button.style.backgroundColor = 'black';

// var month = new Date().getMonth()

var planet_Button = L.easyButton({
    id: 'planet',
    class: 'easyButton',
    position: 'topright',
    states: [{
        icon: iconPLANET,
        stateName: 'check-mark',
        onClick: function(btn, map) {
          // document.getElementById("Alert").style.fontSize = "25px";
          // document.getElementById('Alert').innerHTML = '⌛'
          // document.getElementById("Alert").style.display = 'initial'
          document.getElementById("MapLoading").style.display = 'initial'

          googleSat_Button.button.style.backgroundColor = 'white';
          setTimeout(function(){ // to avoid the 1-2 sec waiting while local storage layer is loading
            googleSat_Button.button.style.backgroundColor = 'black';
          },300)
            /////////////////////// to load planet tiles manually  /////////////
            document.getElementById('myRange').style.display = 'initial'
            // document.getElementById("Alert").style.fontSize = "20px";
            // document.getElementById('Alert').innerHTML = '🕑<br>☀️🌙'
            // document.getElementById("Alert").style.display = 'initial'

            setInterval(checkSliderPosition,200)

            clickButtonCount = 0;
            //to avoid black tiles as sentinel API does not serves tiles above 10 (or perhaps yes), then zoom back to 10 again
            map.options.maxZoom = 18; //no need for more zoom levels as 'low' resolution
            map.options.minZoom = 2;

            planet_Button.removeFrom(map);
            googleSat_Button.addTo(map);

            //to zoom out if previous map zoom is higher than 17
            mapCurrentZoom = map.getZoom();
            // //console.log('zoom1', mapCurrentZoom)
            if(mapCurrentZoom >18){
              map.setZoom(18)//because OSM does not provide tiles beyond zoom 19
              mapCurrentZoom = map.getZoom();
            // //console.log('zoom2', mapCurrentZoom)
            }
            // googleSat.removeFrom(map);
            osm.removeFrom(map);
            try{
              if(sliderPosition == 100){
                planetScopeMonthlyMosaicLatest.addTo(map);
                planetScopeMonthlyMosaicLatest.on("load",function() {
                document.getElementById("MapLoading").style.display = 'none'
              })
              }

              if(sliderPosition == 1){
                planetMosaicLatestMinus5Years.addTo(map);
                planetMosaicLatestMinus5Years.on("load",function() {
                document.getElementById("MapLoading").style.display = 'none'
              })
              }
              if(sliderPosition == 17){
                planetMosaicLatestMinus3Years.addTo(map);
                planetMosaicLatestMinus3Years.on("load",function() {
                document.getElementById("MapLoading").style.display = 'none'
              })
              }
              if(sliderPosition == 32){
                planetMosaicLatestMinus2Years.addTo(map);
                planetMosaicLatestMinus2Years.on("load",function() {
                document.getElementById("MapLoading").style.display = 'none'
              })
              }
              if(sliderPosition == 47){
                planetScopeMonthlyMosaic1YearAgo.addTo(map);
                planetScopeMonthlyMosaic1YearAgo.on("load",function() {
                document.getElementById("MapLoading").style.display = 'none'
              })
              }
              if(sliderPosition == 62){
                planetScopeMonthlyMosaicLatestMinus8Months.addTo(map);
                planetScopeMonthlyMosaicLatestMinus8Months.on("load",function() {
                document.getElementById("MapLoading").style.display = 'none'
              })
              }
              if(sliderPosition == 77){
                planetScopeMonthlyMosaicLatestMinus4Months.addTo(map);
                planetScopeMonthlyMosaicLatestMinus4Months.on("load",function() {
                document.getElementById("MapLoading").style.display = 'none'
              })
              }

            }catch(e){
              //console.log('error loading planet tiles')
            }
            // rose.addTo(map)

          //  planet.addTo(map); // planet imagery goes after so it stays on top of sentinel data (sentinel is global, planet is not yet?)
            // myLayer_Button.addTo(map) //keep this, otherwise the button moves up
            // // if(isOnline == true){
            // if (whichLayerIsOn == 'localStorage'){
            //   filterLocalStorage_Button.addTo(map)
            // }else{
            //   filter_Button.addTo(map);
            // }
            // }
            basemapOn = 'planet'
          return basemapOn
        }
    }]
});

planet_Button.button.style.width = '50px';
planet_Button.button.style.height = '50px';
planet_Button.button.style.transitionDuration = '.3s';
planet_Button.button.style.backgroundColor = 'black';

// var planetScopeMonthlyMosaicLatest = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_2021_01_mosaic/gmap/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
//   attribution: 'Leaflet | PlanetScope Imagery January 2021'
//   })
//   var planetScopeMonthlyMosaicLatestMinus4Months = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_2020_08_mosaic/gmap/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
//     attribution: 'Leaflet | PlanetScope Imagery August 2020'
//     })
//   var planetScopeMonthlyMosaicLatestMinus8Months = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_2020_04_mosaic/gmap/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
//     attribution: 'Leaflet | PlanetScope Imagery April 2020'
//     })
//   var planetScopeMonthlyMosaic1YearAgo = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_2020_01_mosaic/gmap/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
//     attribution: 'Leaflet | PlanetScope Imagery  January 2020'
//     })
//   var planetMosaicLatestMinus2Years = L.tileLayer.wms("https://services.sentinel-hub.com/ogc/wms/" + sentinelHubKey + "?REQUEST=GetMap&PREVIEW=2", {
//         layers: '2019SENTINEL2',
//         attribution: 'Leaflet | Sentinel 2 Imagery January 2019'
//     });
//   var planetMosaicLatestMinus3Years = L.tileLayer.wms("https://services.sentinel-hub.com/ogc/wms/" + sentinelHubKey + "?REQUEST=GetMap&PREVIEW=2", {
//         layers: '2018SENTINEL2',
//         attribution: 'Leaflet | Sentinel 2 Imagery January 2018'
//     });
//   var sentinelMosaicLatestMinus4Years = L.tileLayer.wms("https://services.sentinel-hub.com/ogc/wms/" + sentinelHubKey + "?REQUEST=GetMap&PREVIEW=2", {
//         layers: '2017SENTINEL2',
//         attribution: 'Leaflet | Sentinel 2 Imagery January 2017'
//     });
//   var planetMosaicLatestMinus5Years = L.tileLayer.wms("https://services.sentinel-hub.com/ogc/wms/" + sentinelHubKey + "?REQUEST=GetMap&PREVIEW=2", {
//         layers: '2015LANDSAT',
//         attribution: 'Leaflet | Landsat 2 Imagery January 2015'
//     });

//imagery Slider



  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  slider.value = 100; // Display the default slider value
  var removeAllimagery = function(){
    planetScopeMonthlyMosaicLatest.removeFrom(map);
    planetScopeMonthlyMosaicLatestMinus4Months.removeFrom(map);
    planetScopeMonthlyMosaicLatestMinus8Months.removeFrom(map);
    planetScopeMonthlyMosaic1YearAgo.removeFrom(map);
    planetMosaicLatestMinus2Years.removeFrom(map);
    planetMosaicLatestMinus3Years.removeFrom(map);
    planetMosaicLatestMinus5Years.removeFrom(map);
    //
    // planetScopeMonthlyMosaicSept.removeFrom(map)
    // planetScopeMonthlyMosaicAug.removeFrom(map)
    // planetScopeMonthlyMosaicJul.removeFrom(map)
    // planetScopeMonthlyMosaicJun.removeFrom(map)
    // planetScopeMonthlyMosaicMay.removeFrom(map)
    // planetScopeMonthlyMosaicDec2019.removeFrom(map)
    // planetScopeMonthlyMosaic.removeFrom(map)
  }
var checkSliderPosition = function() { ///////////////////////////////////////// function to keep searching for gps position
  output.innerHTML = this.value;
   //console.log(output.innerHTML)

  // Update the current slider value (each time you drag the slider handle)
  var x = output.innerHTML
  slider.oninput = function() {
    output.innerHTML = this.value;
    document.getElementById("Alert").style.display = 'none'


      switch (true) {
          case (output.innerHTML > 85):
              this.value = 100
              removeAllimagery()
              planetScopeMonthlyMosaicLatest.addTo(map)
              sliderPosition = 100
              //console.log(output.innerHTML)
              // document.getElementById("Alert").style.fontSize = "25px";
              // document.getElementById('Alert').innerHTML = '<br>⌛'
              document.getElementById("MapLoading").style.display = 'initial'


              break
          case (output.innerHTML < 10):
              this.value = 1
              removeAllimagery()
              planetMosaicLatestMinus5Years.addTo(map)
              sliderPosition = 1

              //console.log(output.innerHTML)
              // document.getElementById("Alert").style.fontSize = "15px";
              // document.getElementById('Alert').innerHTML = '<br>1/2019 '
              // document.getElementById("Alert").style.fontSize = "25px";
              // document.getElementById('Alert').innerHTML = '<br>⌛'
              document.getElementById("MapLoading").style.display = 'initial'
              var currentZoom = map.getZoom()
              if(currentZoom <= 6){
                // console.log(currentZoom)
                map.setZoom(8)
              }
              break
          case (output.innerHTML < 25):
              this.value = 17 // this is to locate the circle in a specific position
              removeAllimagery()
              planetMosaicLatestMinus3Years.addTo(map)
              sliderPosition = 17

              //console.log(output.innerHTML)
              // document.getElementById("Alert").style.fontSize = "15px";
              // document.getElementById('Alert').innerHTML = '<br>12/2019 '
              // document.getElementById("Alert").style.fontSize = "25px";
              // document.getElementById('Alert').innerHTML = '<br>⌛'
              document.getElementById("MapLoading").style.display = 'initial'
              break
          case (output.innerHTML < 40):
              this.value = 32
              removeAllimagery()
              planetMosaicLatestMinus2Years.addTo(map)
              sliderPosition = 32

              //console.log(output.innerHTML)
              // document.getElementById("Alert").style.fontSize = "15px";
              // document.getElementById('Alert').innerHTML = '<br>9/2020 '
              // document.getElementById("Alert").style.fontSize = "25px";
              // document.getElementById('Alert').innerHTML = '<br>⌛'
              document.getElementById("MapLoading").style.display = 'initial'
              break
          case (output.innerHTML < 55):
              this.value = 47
              removeAllimagery()
              planetScopeMonthlyMosaic1YearAgo.addTo(map)
              sliderPosition = 47

              //console.log(output.innerHTML)
              // document.getElementById("Alert").style.fontSize = "15px";
              // document.getElementById('Alert').innerHTML = '<br>10/2020 '
              // document.getElementById("Alert").style.fontSize = "25px";
              // document.getElementById('Alert').innerHTML = '<br>⌛'
              document.getElementById("MapLoading").style.display = 'initial'
              break
          case (output.innerHTML < 70):
              this.value = 62
              removeAllimagery()
              planetScopeMonthlyMosaicLatestMinus8Months.addTo(map)
              sliderPosition = 62

              //console.log(output.innerHTML)
              // document.getElementById("Alert").style.fontSize = "15px";
              // document.getElementById('Alert').innerHTML = '<br>11/2020 '
              // document.getElementById("Alert").style.fontSize = "25px";
              // document.getElementById('Alert').innerHTML = '<br>⌛'
              document.getElementById("MapLoading").style.display = 'initial'
              break
          case (output.innerHTML < 86):
              this.value = 77
              removeAllimagery()
              planetScopeMonthlyMosaicLatestMinus4Months.addTo(map)
              sliderPosition = 77

              //console.log(output.innerHTML)
              // document.getElementById("Alert").style.fontSize = "15px";
              // document.getElementById('Alert').innerHTML = '<br>12/2020 '
              // document.getElementById("Alert").style.fontSize = "25px";
              // document.getElementById('Alert').innerHTML = '<br>⌛'
              document.getElementById("MapLoading").style.display = 'initial'
              break
          default:
              removeAllimagery()
              planetScopeMonthlyMosaicLatest.addTo(map)
              sliderPosition = 100

              //console.log(output.innerHTML)
              break
      }
    }
    return sliderPosition
}

var myLayerIsOn = true;
// function changeBGColor() {
//   var cols = document.getElementsByClassName('marker-cluster-small');
//   for(i = 0; i < cols.length; i++) {
//     cols[i].style.backgroundColor = '#00FFFB';
//   }
// }


var whichLayerIsOn = 'deflated';

var featureSent;
var refreshClusterBlueColor = setInterval(function(){
  if(whichLayerIsOn == 'localStorage'){
    var colsSmall = document.getElementsByClassName('marker-cluster-small');
    // var colsMedium = document.getElementsByClassName('marker-cluster-medium');
    // var colsLarge = document.getElementsByClassName('marker-cluster-large');

    for(i = 0; i < colsSmall.length; i++) {
      colsSmall[i].style.backgroundColor = '#00FFFB';
    }
    // for(i = 0; i < colsMedium.length; i++) {
    //   colsMedium[i].style.backgroundColor = '#00FFFB';
    // }
    // for(i = 0; i < colsLarge.length; i++) {
    //   colsLarge[i].style.backgroundColor = '#00FFFB';
    // }
  }
},100)
var notFirstClickHere = false
var myLayer_Button = L.easyButton({
    id: 'myLayerButton',
    class: 'easyButton',
    position: 'topright',
    //background:'images/forest.png',
    states: [{
        icon: iconLAYERS,
        //  background:"images/forest.png",
        stateName: 'check-mark',
        onClick: function(btn, map) {
          console.log('whichLayerIsOn',whichLayerIsOn)
          justCancelled = false
          myLayer_Button.button.style.backgroundColor = 'white';
          setTimeout(function(){ // to avoid the 1-2 sec waiting while local storage layer is loading
            myLayer_Button.button.style.backgroundColor = 'black';
          },300)
  if (whichLayerIsOn == 'deflated' && notFirstClickHere == false && (localStorageLayer != null || elementJustAddedToLocalStorage ==true)) {
          myLayer_Button.button.style.backgroundColor = 'white';
          notFirstClickHere = true
          whichLayerIsOn = 'localStorage'
        }
          setTimeout(function(){ // to avoid the 1-2 sec waiting while local storage layer is loading
            myLayer_Button.button.style.backgroundColor = 'black';
          },300)
          // document.getElementById("Alert").style.fontSize = "30px";
          // document.getElementById("Alert").style.color = 'black'
          // document.getElementById("Alert").innerHTML = '<img src="images/myLayerPrivate.png" text-align="center" alt="..." width=40px; height=40px style="top:50%; margin-left:-2px" > ON'
          // document.getElementById("Alert").style.display = 'initial'
          // changeBGColor()

                    // //console.log('which layer is on', whichLayerIsOn)
          // //console.log('localStorageLayer', localStorageLayer)
            // //console.log(localStorage)
            // //console.log(groupGeoJSON)
            //  deflated.removeFrom(map)
            // whichLayerIsOn = 'deflated'
  if (whichLayerIsOn == 'deflated' && (localStorageLayer != null || elementJustAddedToLocalStorage ==true)) {
        whichLayerIsOn = 'localStorage'
        console.log('whichLayerIsOn',whichLayerIsOn)


                deflated.removeFrom(map)
                if (localStorageLayer != null || geometriesUploaded == true) {
                    // leaflet-marker-icon marker-cluster marker-cluster-small leaflet-zoom-animated leaflet-interactive"
                    // document.getElementsByClassName('.marker-cluster-small').style.backgroundColor = 'rgba(12, 244, 179, 1)'
                    setTimeout(function(){
                      deflatedLocalStorage.addTo(map) // to initialize //////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                      // var refreshClusterBlueColor = setInterval(function(){
                        var cols = document.getElementsByClassName('marker-cluster-small');
                        for(i = 0; i < cols.length; i++) {
                          cols[i].style.backgroundColor = '#00FFFB'; //bluelight
                        }
                      // },300)


                      filter_Button.removeFrom(map)
                      filterLocalStorage_Button.addTo(map);
                      var mapCurrentZoom = map.getZoom();
                      if(mapCurrentZoom <= 11 && justCancelled == false){
                        try{
                        var boundsLocalStorageLayer = deflatedLocalStorage.getBounds()
                        // map.flyToBounds(boundsLocalStorageLayer)
                      }catch(e){}
                    }
                    document.getElementById("Alert").style.fontSize = "30px";
                    document.getElementById("Alert").style.color = 'black'
                    document.getElementById("Alert").innerHTML = '<img src="images/padlockclosed.png" text-align="center" alt="..." width=40px; height=40px style="top:50%; margin-left:-2px" > ON'
                    document.getElementById("Alert").style.display = 'initial'
                  },300)

                }
                if (finalLayer != null) {
                    finalLayer.addTo(map)
                }
                // whichLayerIsOn = 'localStorage'

                setTimeout(function(){
                  document.getElementById("Alert").style.display = 'none'
                  document.getElementById("Alert").style.color = 'yellow'

                },3000)
                // myLayer_Button.button.style.backgroundColor = '#00FFFB';
                // document.getElementById('myLayerButton').src = 'images/osm.png'
                // if(isIOS == false){
                //   document.getElementById('myLayerButton').innerHTML = '<img src="images/onionlayericon.png" text-align="center" alt="..." width=40px; height=40px style="top:50%; margin-left:-2px" > '
                // }else{
                //   document.getElementById('myLayerButton').innerHTML = '<img src="images/onionlayericon.png" text-align="center" alt="..."width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-6px" > '
                // }
                // var iconLAYERS = '<img src="images/osm.png" alt="..." width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-1px" > ';

                filter_Button.button.disabled = true;
                // filter_Button.button.style.backgroundColor = 'black'
                // myLayer_Button.button.style.borderColor = '#00FFFB';


    } else if (whichLayerIsOn == 'deflated' && localStorageLayer == null) { // to avoid three click when localstorage is limited on first load
          whichLayerIsOn = 'none'
          console.log('whichLayerIsOn',whichLayerIsOn)



              // rose.remove()
              // rose.addTo(map)
                // whichLayerIsOn = 'none'
              //   setTimeout(function(){
              //
              //   document.getElementById("Alert").style.fontSize = "30px";
              //   document.getElementById("Alert").style.color = 'black'
              //   document.getElementById("Alert").innerHTML = 'NO <img src="images/myLayerEmpty.png" text-align="center" alt="..." width=40px; height=40px style="top:50%; margin-left:-2px" > '
              //   document.getElementById("Alert").style.display = 'initial'
              // },300)
              document.getElementById("Alert").style.display = 'initial'
              document.getElementById("Alert").innerHTML = '<img src="images/talk.png" text-align="center" alt="..." width=60px; height=60px style="top:50%; margin-left:-2px" >'

                setTimeout(function(){
                  document.getElementById("Alert").style.display = 'none'
                  document.getElementById("Alert").style.color = 'yellow'

                },3000)

                deflated.removeFrom(map)
                filter_Button.button.style.opacity = '0.4';
                filter_Button.button.disabled = true;
                // myLayer_Button.button.style.backgroundColor = 'white'
                myLayer_Button.button.style.borderColor = 'transparent';

                // if(isIOS == false){
                //   document.getElementById('myLayerButton').innerHTML = '<img src="images/onionlayericon.png" text-align="center" alt="..." width=40px; height=40px style="top:50%; margin-left:-2px" > '
                // }else{
                //   document.getElementById('myLayerButton').innerHTML = '<img src="images/onionlayericon.png" text-align="center" alt="..."width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-6px" > '
                // }

  } else if (whichLayerIsOn == 'localStorage') {
    filter_Button.button.style.opacity = '0.4';
    filter_Button.button.disabled = true;
      whichLayerIsOn = 'none'
      console.log('whichLayerIsOn',whichLayerIsOn)


                if (localStorageLayer != null) {
                    deflatedLocalStorage.removeFrom(map)

                    try{
                      // clearInterval(refreshClusterBlueColor)
                    }catch(e){}

                }
                // whichLayerIsOn = 'none'
                // setTimeout(function(){
                //   document.getElementById("Alert").style.fontSize = "30px";
                //   document.getElementById("Alert").style.color = 'black'
                //   document.getElementById("Alert").innerHTML = ' <img src="images/myLayerEmpty.png" text-align="center" alt="..." width=0px; height=0px style="top:50%; margin-left:-2px" > '
                //   document.getElementById("Alert").style.display = 'initial'
                // },300)


                setTimeout(function(){
                  document.getElementById("Alert").style.display = 'none'
                  document.getElementById("Alert").style.color = 'yellow'

                },3000)

                //  localStorageLayer.addTo(map)
                if (finalLayer != null) {
                    finalLayer.removeFrom(map)
                    try{
                      clearInterval(refreshClusterBlueColor)
                    }catch(e){}
                }
                filterLocalStorage_Button.removeFrom(map);
                filter_Button.addTo(map)
                setTimeout(function(){

                  document.getElementById("Alert").style.display = 'initial'
                  document.getElementById("Alert").innerHTML = '<img src="images/talk.png" text-align="center" alt="..." width=60px; height=60px style="top:50%; margin-left:-2px" >'
                  setTimeout(function(){
                    document.getElementById("Alert").style.display = 'none'
                    document.getElementById("Alert").style.color = 'yellow'

                  },3000)
                  // if(isIOS == false){
                  //   document.getElementById('myLayerButton').innerHTML = '<img src="images/onionlayericon.png" text-align="center" alt="..." width=40px; height=40px style="top:50%; margin-left:-2px" > '
                  // }else{
                  //   document.getElementById('myLayerButton').innerHTML = '<img src="images/onionlayericon.png" text-align="center" alt="..."width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-6px" > '
                  // }
                },300)

                filter_Button.button.style.opacity = '0';
                filter_Button.button.disabled = true;
                myLayer_Button.button.style.borderColor = 'transparent';



    } else if (whichLayerIsOn == 'none') {
      // sqlQuerySelect = "select%20*%20from%20%60carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb0%60&cache=1683980483065&v=3.0"

      // sqlQuerySelect = "SELECT * FROM `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb_QMM_Madagascar`"
      // sqlQuerySelectEncoded = encodeURI(sqlQuerySelect)
      //   requestCartoData(sqlQuerySelectEncoded)
      filter_Button.button.style.opacity = '0';
      filter_Button.button.disabled = true;
            whichLayerIsOn = 'deflated'
            console.log('whichLayerIsOn',whichLayerIsOn)

                setTimeout(function(){

                document.getElementById("Alert").style.fontSize = "30px";
                document.getElementById("Alert").style.color = 'black'
                document.getElementById("Alert").innerHTML = '<img src="images/padlockopen.png" text-align="center" alt="..." width=40px; height=40px style="top:50%; margin-left:-2px" > ON 🔍'
                document.getElementById("Alert").style.display = 'initial'
              },300)

                setTimeout(function(){
                  document.getElementById("Alert").style.display = 'none'
                  document.getElementById("Alert").style.color = 'yellow'

                },3000)

                if (finalLayer != null) {
                    finalLayer.removeFrom(map)
                }
                if(isOnline == false){
                  // myLayer_Button.button.style.backgroundColor = 'black'
                  setTimeout(function(){
                    // if(isIOS == false){
                    //   document.getElementById('myLayerButton').innerHTML = '<img src="images/onionlayericon.png" text-align="center" alt="..." width=40px; height=40px style="top:50%;  margin-left:-2px" > '
                    // }else{
                    //   document.getElementById('myLayerButton').innerHTML = '<img src="images/onionlayericon.png" text-align="center" alt="..."width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-6px" > '
                    // }
                  },300)

                  filter_Button.button.style.opacity = '0';
                  filter_Button.button.disabled = true;
                  myLayer_Button.button.style.borderColor = 'transparent';

                  }else{
                    var currentZoom = map.getZoom()
                    if(whichLayerIsOn == 'deflated' && currentZoom >= 12){
                      // deflated.addTo(map)
                      //console.('carto open layer added to the map')
                    }

                    // deflated.addTo(map);
                    var cols = document.getElementsByClassName('marker-cluster-small');
                    for(i = 0; i < cols.length; i++) {
                      cols[i].style.backgroundColor = 'white';
                    }

                    // document.getElementsByClassName('marker-cluster-small')[0].style.color = 'red'
                    // myLayer_Button.button.style.backgroundColor = 'black'
                    setTimeout(function(){
                      // if(isIOS == false){
                      //   document.getElementById('myLayerButton').innerHTML = '<img src="images/onionlayericon.png" text-align="center" alt="..." width=40px; height=40px style="top:50%;  margin-left:-2px" > '
                      // }else{
                      //   document.getElementById('myLayerButton').innerHTML = '<img src="images/onionlayericon.png" text-align="center" alt="..."width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-6px" > '
                      // }
                    },300)

                    filter_Button.button.style.opacity = '0';
                    filter_Button.button.disabled = false;
                    myLayer_Button.button.style.borderColor = 'transparent';

                  }
                  if(localStorageLayer == null){
                    // myLayer_Button.button.style.backgroundColor = 'black'
                    setTimeout(function(){
                      // if(isIOS == false){
                      //   document.getElementById('myLayerButton').innerHTML = '<img src="images/onionlayericon.png" text-align="center" alt="..." width=40px; height=40px style="top:50%;  margin-left:-2px" > '
                      // }else{
                      //   document.getElementById('myLayerButton').innerHTML = '<img src="images/onionlayericon.png" text-align="center" alt="..."width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-6px" > '
                      // }
                    },300)
                  }

              //  if (featureSent == true) { //to update the carto layer with recently created feature. This is fired after DB update has been checked
              //
              //     sqlQuery = "SELECT cartodb_id, the_geom, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date, commentone, commentoneaudioavailable FROM lumblu ORDER BY cartodb_id DESC LIMIT 1"
              //     getGeoJSON()
              //     featureSent = false
              // }
    }
          // },300)
          return featureSent && whichLayerIsOn && justCancelled && notFirstClickHere

        }
    }]
})

myLayer_Button.button.style.width = '50px';
myLayer_Button.button.style.height = '50px';
myLayer_Button.button.style.transitionDuration = '.3s';
myLayer_Button.button.style.backgroundColor = 'black';
myLayer_Button.button.style.border= '1px solid transparent';


// map.on('load', function() {
//   console.log('whichLayerIsOn-onload',whichLayerIsOn)
//   console.log('urlContainsGeoJSON-onload',urlContainsGeoJSON)

// })
// }

// if(localStorage.getItem('pwCorrect')){
//     setTimeout(function() {
//       document.getElementById('myLayerButton').click()
//       document.getElementById('myLayerButton').click()
//     },3000)
// }


// myLayer_Button.button.style.borderColor = 'white';

// myLayer_Button.button.style.border = '3px'
// myLayer_Button.button.style.borderColor = 'yellow';

//myLayer_Button.addTo(map); //always on as there will always be features in the map, even when first load

//to activate the localstorage layer on load
// window.addEventListener('load', (event) => {
//   console.log('page is fully loaded');
//   if(localStorageLayer != null && whichLayerIsOn == 'deflated'){
//     setTimeout(function(){
//       document.getElementById('myLayerButton').click()
//
//     },2000)
//
//   }
// });

var filterApplied = false;
var alertAlreadyShown = false
var startCheckAttrDateContent
//Button for filtering by attribute
var filter_Button = L.easyButton({
    id: 'filter',
    position: 'topright',
    states: [{
        icon: iconFILTER,
        stateName: 'check-mark',
        onClick: function(btn, map) {
          // document.getElementById("emojionearea-css").disabled = false
          // emojiRequest()


          document.getElementById("backDeleteFeature").style.display = "none";
          document.getElementById("deleteFeature").style.display = 'none';
          // document.getElementById("goBackMessagingApps").style.display = "none";
          // document.getElementById("whatsApp").style.display = "none";
          // document.getElementById("telegram").style.display = 'none';
          // document.getElementById("weChat").style.display = "none";
          document.getElementById("shareMessagingApp").style.display = "none";
          document.getElementById("randomSuggestion").style.display = "none";

          if(filterIsOn == false){
            const element = document.getElementById('span6');
            element.style.width = 'calc(100% - 200px)';
            filter_Button.button.style.borderColor = 'yellow'
            startCheckAttrDateContent = setInterval(checkAttrDateContent,300)
            //console.log('filterisonfalse')
            filterIsOn = true
            myLayer_Button.button.style.opacity = '0.4';
            myLayer_Button.button.disabled = true;
            // gps_Button.button.style.opacity = '0.4';
            // gps_Button.button.disabled = true;
            // filter_Button.button.style.backgroundColor = '#949493';

            document.getElementById("tutorial").style.display = "none";
            document.getElementById("polygon").style.display = "none";
            document.getElementById("polyline").style.display = "none";
            document.getElementById("point").style.display = "none";
            document.getElementById("armchair").style.display = "none";
            document.getElementById("field").style.display = "none";
            document.getElementById("gobackArmchairField").style.display = "none";
            // filterLocalStorage_Button.button.style.opacity = '1';
            // filterLocalStorage_Button.button.disabled = false;


            if(filterApplied == true){
              //console.log('filterisonfalse')
              // filter_Button.button.style.borderColor = 'green'

              document.getElementById("clearFilter").style.display = "initial";
              document.getElementById("clearFilter").style.opacity = '1'
              document.getElementById("clearFilter").disabled = false
            }else{
              // document.getElementById("clearFilter").style.opacity = '0.4'
              // document.getElementById("clearFilter").disabled = true
              document.getElementById("clearFilter").style.display = "none";
              document.getElementById("applyFilter").style.display = "initial";
              document.getElementById("applyFilter").style.opacity = '0.4'
              document.getElementById("applyFilter").disabled = true
            }

            document.getElementById("filterWithIcons").style.display = "initial";

            // document.getElementById("filterByDate").style.display = "initial";
            document.getElementById("classification").style.display = "initial";
            document.getElementById("emoji").style.display = "initial";
            document.getElementById("emoji").disabled = false;
            document.getElementById("emoji").style.opacity = '1';

            // if(alertAlreadyShown == false){
            //
            //   document.getElementById("Alert").style.fontSize = "15px";
            //   document.getElementById('Alert').innerHTML = 'Filter by attribute only filters exact matches. 🚧 To be improved '
            //   document.getElementById("Alert").style.display = 'initial'
            // setTimeout(function(){
            //   document.getElementById("Alert").style.display = 'none'
            // },5000)
            // alertAlreadyShown = true
            // }

        }else{
          //console.('filterbutton and filter off')

            landUse = 'emojiNoSapelli'
            const element = document.getElementById('span6');
            element.style.width = 'calc(100% - 125px)';
            clearInterval(startCheckAttrDateContent)
            //console.log('filterisontrue')
            filter_Button.button.style.border= '2px solid transparent';

            filterIsOn = false
            myLayer_Button.button.style.opacity = '1';
            myLayer_Button.button.disabled = false;
            filter_Button.button.style.opacity = '0';
            filter_Button.button.disabled = false;

            if(filterApplied == true){ //to avoid that if dilterby date is all, color is not green
              // filter_Button.button.style.borderColor = 'green'

            }else{
              filter_Button.button.style.backgroundColor = 'black'
              document.getElementById("Alert").style.display = 'none'
            }
            deflated.clearLayers()
            document.getElementById("Alert").style.display = "none";

            document.getElementById("tutorial").style.display = "initial";
            document.getElementById("armchair").style.display = "initial";
            document.getElementById("field").style.display = "initial";
            // document.getElementById("polygon").style.display = "initial";
            // document.getElementById("polyline").style.display = "initial";
            // document.getElementById("point").style.display = "initial";
            document.getElementById("filterWithIcons").style.display = "none";
            document.getElementById("clearFilter").style.display = "none";
            document.getElementById("applyFilter").style.display = "none";
            document.getElementById("filterByDate").style.display = "none";
            document.getElementById("classification").style.display = "none";
            document.getElementById("emoji").style.display = "none";
        }

        return alertAlreadyShown && filterIsOn
      }

    }]
})

var checkconnectivityintervals = setInterval(function() {
  isOnline = navigator.onLine
  console.log('isOnline',isOnline)
  if(isOnline == false){
    filter_Button.button.style.opacity = '0';
    filter_Button.button.disabled = true

  }else{
    // filter_Button.button.style.opacity = '1';
    // filter_Button.button.disabled = false
  }
  return isOnline
}, 5000)

var checkAttrDateContent = function(){

  boxContentFiltering = document.getElementById('emojionearea')
  var img =  document.getElementById("imgFilterByDate")

      if(!(img.src.match("dateAll")) || boxContentFiltering.length != 0){
        document.getElementById("applyFilter").style.opacity = '1'
        document.getElementById("applyFilter").disabled = false

      }else{
        document.getElementById("applyFilter").style.opacity = '0.4'
        document.getElementById("applyFilter").disabled = true
      }
}

filter_Button.button.style.width = '50px';
filter_Button.button.style.height = '50px';
filter_Button.button.style.transitionDuration = '.3s';
filter_Button.button.style.backgroundColor = 'black';
filter_Button.button.style.border= '2px solid transparent';
filter_Button.button.style.opacity= '1';


//filter_Button.addTo(map);
// if(isOnline == false){
//   filter_Button.button.style.opacity = '0.4';
//   filter_Button.button.disabled = true;
// }



////////////////////////////////   GNSS  //////////////////////////////////////

// setTimeout(function(){
//   var iconGPSURL1 = document.getElementsByClassName("leaflet-pane leaflet-marker-pane")
//   var iconGPSURL2 = iconGPSURL1[0]
//   var iconGPSURL3 = iconGPSURL2.innerHTML
//   // iconGPSURL3.src = 'images/shadowGPS.png'
//   // // gpsIcon.shadowUrl = 'images/man.png'
//   // var iconGPSURL = L.icon.iconUrl
//   console.log(iconGPSURL1)
//
//   console.log(iconGPSURL2)
//   console.log(iconGPSURL3)
//   // console.log(iconGPSURL2.img.src)
//
//   console.log(iconGPSURL3.src)
//   var iconGPSURL11 = document.getElementsByClassName("leaflet-marker-icon leaflet-zoom-animated leaflet-interactive")
//   var iconGPSURL21 = iconGPSURL11[0]
//   var iconGPSURL31 = iconGPSURL21.innerHTML
//   console.log(iconGPSURL11)
//
//   console.log(iconGPSURL21) ///////////////////////////////////
//   console.log(iconGPSURL21.src) ///////////////////////////////////
//   iconGPSURL21.src = 'images/myLayerPrivate.png'
//
//   console.log(iconGPSURL31)
//
//
//
// },10000)
// // add location via browser geolocation
// var currentLocation = []; // variable created to allow the user recenter the map
// var accuracy = 0
// var markerAdded = false; // var to avoid multiple markers
var gpsIcon = L.icon({
        className: "GPSIconShadow",
        iconUrl: 'images/man.png',
        iconSize: [50, 50], // size of the icon
        iconAnchor: [25,25], // point of the icon which will correspond to marker's location, relative to its top left showCoverageOnHover

        // shadowUrl:'images/cone.png',
        // shadowSize:   [50,50], // size of the shadow
        // shadowAnchor: [7, 7],  // the same for the shadow
        //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
var gpsIconNoOrientation = L.icon({
        className: "GPSIconShadow",
        iconUrl: 'images/manNoOrientation.png',
        iconSize: [50, 50], // size of the icon
        iconAnchor: [25,25], // point of the icon which will correspond to marker's location, relative to its top left showCoverageOnHover

        // shadowUrl:'images/cone.png',
        // shadowSize:   [50,50], // size of the shadow
        // shadowAnchor: [7, 7],  // the same for the shadow
        //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
// var iconGPSURL0

function findBuffer(position) {


    //  L.marker([lat, lng],{icon:gpsIcon}).removeFrom(map);
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    accuracy = position.coords.accuracy;

  //  console.log(accuracy)
    // if (markerAdded == false) {
    //     // L.marker([lat, lng],{icon:gpsIcon}).addTo(map);
    //     markerAdded = true;
    // }
    currentLocation = [lat, lng];
    localStorage.setItem('lastlocationLATITUDE', lat);
    localStorage.setItem('lastlocationLONGITUDE', lng);




    return currentLocation & markerAdded & accuracy;
}

//////////////////////////////////////activate gps///////////////////////////////////////////

////console.log(currentLocation[0])

// var locationFound = false;
// var audioRecorded = false;
// var circleGT250
// var circleLT250
// var circleLT250Added = false
// var circleGT250Added = false
var initialOffset = null;
var initialMarkerOrientation
var gpsIconRotationAngle = null

  window.addEventListener("deviceorientationabsolute", handleOrientation, true); // if deviceorientation instead of deviceorientationabsolute, then only works in the laptop the absolute location, but not in mobile
//alpha goes counter  1 to 360 clockwise
  function handleOrientation(event) {

    if(initialOffset === null) {
      initialOffset = event.alpha;
      var absolute = event.absolute
      console.log(initialOffset,'initial offset')

      // console.log(absolute,'absolute or not')
      // console.log(initialOffset,'initialoffset')
    }

    var alpha = event.alpha - initialOffset;
        if(alpha < 0) {
          alpha += 360;
        }
  // console.log(alpha,'alpha')
  gpsIconRotationAngle = 360 - alpha - initialOffset

  return gpsIconRotationAngle

  }
// if(isFirstTime == true || pageLoaded == true){
if(localStorage.getItem('pwCorrect')){
  navigator.geolocation.watchPosition(findBuffer,error,watchPositionOptions);
}
var field = false
var position
var startSearchingLocation = function(){
var refreshGPSbutton = setInterval(function() { ///////////////////////////////////////// function to keep searching for gps position
  // console.log(currentLocation)
  // console.log(currentLocation[0])


  //console.('gps accuracy',accuracy)
  if(localStorage.getItem('pwCorrect')){
    // navigator.geolocation.watchPosition(findBuffer,error,watchPositionOptions);
    //
    // try {
    //     navigator.geolocation.watchPosition(findBuffer,error,watchPositionOptions);
    // } catch (err) {
    //     currentLocation == null;
    // }
    //if location found, then set button color, and create circle or add marker if <50m
    if (currentLocation[0] != null) {
        // localStorage.setItem('lastPositionStoredLOCALLY', currentLocation)
        locationFound = true
        //once the position has been found, we stop checking if the user deactivates again (the position will be recorded anyway)
        if (accuracy <= 100) {

            gps_Button.button.style.backgroundColor = '#3AFB06';
            //to change the icon of the Easybutton based on accuracy... (first gif then static image)

            // if (isIOS == true) {
            //   document.getElementById('gps').innerHTML = '<img src="images/gps.png" text-align="center" alt="..." width=40px; height=40px style="top:50%; margin-top:1px; margin-left:-5px" > '
            // }else{
            //   document.getElementById('gps').innerHTML = '<img src="images/gps.png" text-align="center" alt="..." width=40px; height=40px;" > '
            // }

            // var gpsIconIntermitent = setTimeout(function() {
            //   if (isIOS == true) {
            //     document.getElementById('gps').innerHTML = '<img src="images/gps.png" text-align="center" width=40px; height=40px style="top:50%; margin-top:1px; margin-left:-5px" " > '
            //   }else{
            //     document.getElementById('gps').innerHTML = '<img src="images/gps.png" text-align="center" width=40px; height=40px; " > '
            //   }
            // },2800) // time required for three repetitions of the gif

            // clearInterval(refreshGPSbutton) //stop searching once accuracy <50


              if(field == false){
                if(position != undefined){
                  map.removeLayer(position)
                }
                if(gpsIconRotationAngle == 360 || gpsIconRotationAngle === null){
                  position = L.marker(currentLocation, {
                      icon: gpsIconNoOrientation,
                      // rotationAngle: 90,
                      draggable:false,
                      zIndexOffset:100
                  })
                }else{
                  // console.log(gpsIconRotationAngle,'gpsIconRotationAngle')
                  // console.log(initialMarkerOrientation,'initialMarkerOrientation')

                  position = L.marker(currentLocation, {
                      icon: gpsIcon,
                      rotationAngle: gpsIconRotationAngle,
                      draggable:false,
                      zIndexOffset:100
                  })
                }

                position.setLatLng(currentLocation)
                position.addTo(map)
                position.setOpacity(1)
                // position.bringToFront()
              }
              // clearInterval(refreshGPSbutton) //stop searching once accuracy <50


        } else if (accuracy > 100 && accuracy <= 250) {

            gps_Button.button.style.backgroundColor = 'yellow';
            // if (isIOS == true) {
            //   document.getElementById('gps').innerHTML = '<img src="images/gps.png" text-align="center" alt="..." width=40px; height=40px style="top:50%; margin-top:1px; margin-left:-5px"" > '
            // }else{
            //   document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" text-align="center" alt="..." width=40px; height=40px; " > '
            // }            //if accuracy >50, keep searching
          //  navigator.geolocation.watchPosition(findBuffer,error,watchPositionOptions);

            // try {
            //     navigator.geolocation.watchPosition(findBuffer,{
            //       enableHighAccuracy: true,
            //       maximumAge:2000,
            //
            //     });
            // } catch (err) {
            //     currentLocation == null;
            // }

            //to hide the marker if not accuracte position
            try{
              position.setOpacity(0)
            }catch(e){}

            if (circleLT250Added == false) {
                //set circle based on radious-accuracy
                circleLT250 = L.circle(currentLocation, {
                    color: "#ffffff00",
                    fillColor: "yellow",
                    fillOpacity: 0.3,
                    radius: accuracy
                }) //.addTo(map);
                //remove circle after 10 seconds
                // setTimeout(function(){ circleLT250.removeFrom(map) }, 10000);
                circleLT250Added = true
            }

        } else if (accuracy > 250) {

            gps_Button.button.style.backgroundColor = 'orange';
            // if (isIOS == true) {
            //   document.getElementById('gps').innerHTML = '<img src="images/gps.png" text-align="center" alt="..." width=40px; height=40px style="top:50%; margin-top:1px; margin-left:-5px" " > '
            // }else{
            //   document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" text-align="center" alt="..." width=40px; height=40px; " > '
            // }
          //  navigator.geolocation.watchPosition(findBuffer,error,watchPositionOptions);

            // try {
            //     navigator.geolocation.watchPosition(findBuffer,{
            //       enableHighAccuracy: true,
            //       maximumAge:2000,
            //     });
            //     //////console.log(currentLocation[0])
            // } catch (err) {
            //     currentLocation == null;
            // }
            try{
              position.setOpacity(0)
            }catch(e){}

            if (circleGT250Added == false) {
                circleGT250 = L.circle(currentLocation, {
                    color: "#ffffff00",
                    fillColor: "orange",
                    fillOpacity: 0.3,
                    radius: accuracy
                }) //.addTo(map);
                //   setTimeout(function(){ circleGT250.removeFrom(map) }, 10000);
                circleGT250Added = true
            }
        }
    } else {
        gps_Button.button.style.backgroundColor = 'grey';
        // if (isIOS == true) {
        //   document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" text-align="center" alt="..." width=40px; height=40px style="top:50%; margin-top:1px; margin-left:-5px" > '
        // }else{
        //   document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" text-align="center" alt="..." width=40px; height=40px; > '
        // }
      //  navigator.geolocation.watchPosition(findBuffer,error,watchPositionOptions);

        // try {
        //     navigator.geolocation.watchPosition(findBuffer,{
        //       enableHighAccuracy: true,
        //       maximumAge:2000,
        //     });
        // } catch (err) {
        //     currentLocation == null;
        // }
    }
    return currentLocation && circleLT250Added && circleGT250Added && circleLT250 && circleGT250 && position
  }
}, 500)
}

////console.log(currentLocation[0]ddddddd)
var gps_Button = L.easyButton({
    id: 'gps',
    position: 'topright',
    states: [{
        icon: iconGPS,
        stateName: 'check-mark',
        onClick: function(btn, map) {
            // try {
            //     navigator.geolocation.watchPosition(findBuffer);
            // } catch (err) {
            //     currentLocation == null;
            // }
            if (currentLocation[0] != null) {

              // googleSat_Button.removeFrom(map);
              // osm_Button.removeFrom(map);
              // planet_Button.removeFrom(map);
              // myLayer_Button.removeFrom(map);
              // filter_Button.removeFrom(map);
              // try{
              //   addMiniMap()
              //   //miniMap.addTo(map)
              // }catch(e){}
              //
              //   setTimeout(function(){
              //     try{
              //       //removeMiniMap()
              //       //miniMap.remove()
              //     }catch(e){}
              //     osm_Button.addTo(map);
              //     googleSat_Button.removeFrom(map);
              //     planet_Button.removeFrom(map);
              //     myLayer_Button.addTo(map);
              //     filter_Button.addTo(map);
              //   },2500)


                if (accuracy <= 100) {
                  //  gps_Button.button.style.backgroundColor = 'green';
                  //  gps_Button.button.src = 'images/gpsSearching.gif';
                  var mapCurrentZoom = map.getZoom();
                  if(mapCurrentZoom > 17){
                    map.flyTo(currentLocation, mapCurrentZoom);
                  }else{
                    map.flyTo(currentLocation, 16);
                  }

                    // startSearchingLocation()
                    ////console.log(currentLocation)

                } else if (accuracy > 100 && accuracy <= 250) {
                  //  gps_Button.button.style.backgroundColor = 'yellow';
                //    gps_Button.button.src = 'images/gpsSearching.gif';

                    //set view based on circle radius
                    circleLT250.addTo(map);
                    map.fitBounds(circleLT250.getBounds());
                    setTimeout(function() {
                        circleLT250.removeFrom(map);
                    }, 200);

                } else if (accuracy > 250) {
                  //  gps_Button.button.style.backgroundColor = 'orange';
                  //  gps_Button.button.src = 'images/gpsSearching.gif';

                    //  setTimeout(function(){circleGT250.addTo(map)}, 200);
                    circleGT250.addTo(map); //the layer must be added before the getbounds is fired, then the layer is removed
                    map.fitBounds(circleGT250.getBounds());
                    setTimeout(function() {
                        circleGT250.removeFrom(map);
                    }, 200);
                }
            }
            if (currentLocation[0] == null) {
                //gps_Button.button.style.backgroundColor = 'red';
                document.getElementById('gps').src = 'images/gpsSearching.gif'
                navigator.geolocation.watchPosition(findBuffer,error,watchPositionOptions);

                // try{
                //   navigator.geolocation.watchPosition(findBuffer,{
                //     enableHighAccuracy: true,
                //     maximumAge:2000,
                //   });
                // }catch(e){}


            }
        }
    }]
});

gps_Button.button.style.width = '50px';
gps_Button.button.style.height = '50px';
gps_Button.button.style.transitionDuration = '.3s';
gps_Button.button.style.backgroundColor = 'grey';
//gps_Button.addTo(map);

////console.log(currentLocation[0]ddddddd)
var filterLocalStorage_Button = L.easyButton({
    id: 'iconLocalStorageRecenter',
    position: 'topright',
    states: [{
        icon: iconFILTERlocalStorage,
        stateName: 'check-mark',
        onClick: function(btn, map) {
          groupGeoJSON = [] // to replace groupGeoJSON = newGeom created when new feature added in local storage, which caused and error when applying the filter
          //console.(filterApplied)

            // try{
            //   var boundsLocalStorageLayer = deflatedLocalStorage.getBounds()
            //   map.flyToBounds(boundsLocalStorageLayer)
            // }catch(e){}
            //
            //
            // }
            // document.getElementById("emojionearea-css").disabled = false
            // emojiRequest()
            document.getElementById("backDeleteFeature").style.display = "none";
            document.getElementById("deleteFeature").style.display = 'none';
            // document.getElementById("goBackMessagingApps").style.display = "none";
            // document.getElementById("whatsApp").style.display = "none";
            // document.getElementById("telegram").style.display = 'none';
            // document.getElementById("weChat").style.display = "none";
            document.getElementById("shareMessagingApp").style.display = "none";
            document.getElementById("randomSuggestion").style.display = "none";

            if(filterIsOn == false){
              const element = document.getElementById('span6');
              element.style.width = 'calc(100% - 200px)';
              // filterLocalStorage_Button.button.style.borderColor = 'white'

              startCheckAttrDateContent = setInterval(checkAttrDateContent,300)
              //console.log('filterisonfalse')
              filterIsOn = true
              myLayer_Button.button.style.opacity = '0.4';
              myLayer_Button.button.disabled = true;
              // gps_Button.button.style.opacity = '0.4';
              // gps_Button.button.disabled = true;
              // filterLocalStorage_Button.button.style.backgroundColor = '#949493';

              document.getElementById("tutorial").style.display = "none";
              document.getElementById("polygon").style.display = "none";
              document.getElementById("polyline").style.display = "none";
              document.getElementById("point").style.display = "none";
              document.getElementById("armchair").style.display = "none";
              document.getElementById("field").style.display = "none";
              document.getElementById("armchair").style.display = "none";
              document.getElementById("field").style.display = "none";

              if(filterApplied == true){
                //console.log('filterisonfalse')
                // filterLocalStorage_Button.button.style.borderColor = 'green'

                document.getElementById("clearFilter").style.display = "initial";
                document.getElementById("clearFilter").style.opacity = '1'
                document.getElementById("clearFilter").disabled = false
              }else{

                // document.getElementById("clearFilter").style.opacity = '0.4'
                // document.getElementById("clearFilter").disabled = true
                document.getElementById("clearFilter").style.display = "none";
                document.getElementById("applyFilter").style.display = "initial";
                document.getElementById("applyFilter").style.opacity = '0.4'
                document.getElementById("applyFilter").disabled = true
              }
              document.getElementById("filterWithIcons").style.display = "initial";

              // document.getElementById("filterByDate").style.display = "initial";
              document.getElementById("classification").style.display = "initial";
              document.getElementById("emoji").style.display = "initial";
              document.getElementById("emoji").disabled = false;
              document.getElementById("emoji").style.opacity = '1';


              // if(alertAlreadyShown == false){
              //
              //   document.getElementById("Alert").style.fontSize = "15px";
              //   document.getElementById('Alert').innerHTML = 'Filter by attribute only filters exact matches. 🚧 To be improved '
              //   document.getElementById("Alert").style.display = 'initial'
              // setTimeout(function(){
              //   document.getElementById("Alert").style.display = 'none'
              // },5000)
              // alertAlreadyShown = true
              // }

          }else{
            const element = document.getElementById('span6');
            element.style.width = 'calc(100% - 125px)';
            // filterLocalStorage_Button.button.style.border= '2px solid transparent';
            landUse = 'emojiNoSapelli'  // to refresh the popup content while creating geom incease filter applied before

              clearInterval(startCheckAttrDateContent)
              //console.log('filterisontrue')

              filterIsOn = false
              myLayer_Button.button.style.opacity = '1';
              myLayer_Button.button.disabled = false;
              // filterLocalStorage_Button.button.style.opacity = '1';
              // filterLocalStorage_Button.button.disabled = false;

              if(filterApplied == true){ //to avoid that if dilterby date is all, color is not green
                // filterLocalStorage_Button.button.style.borderColor = 'green'
                // landUse = 'emojiNoSapelli'  // to refresh the popup content while creating geom incease filter applied before
                // console.log('emojinosapelli')

              }else{
                // filter_Button.button.style.backgroundColor = 'black'
                document.getElementById("Alert").style.display = 'none'
              }

              document.getElementById("tutorial").style.display = "initial";
              document.getElementById("armchair").style.display = "initial";
              document.getElementById("field").style.display = "initial";
              // document.getElementById("polygon").style.display = "initial";
              // document.getElementById("polyline").style.display = "initial";
              // document.getElementById("point").style.display = "initial";
              document.getElementById("filterWithIcons").style.display = "none";
              document.getElementById("clearFilter").style.display = "none";
              document.getElementById("applyFilter").style.display = "none";
              document.getElementById("filterByDate").style.display = "none";
              document.getElementById("classification").style.display = "none";
              document.getElementById("emoji").style.display = "none";
          }

          return alertAlreadyShown && filterIsOn
        }

    }]
});

filterLocalStorage_Button.button.style.width = '50px';
filterLocalStorage_Button.button.style.height = '50px';
filterLocalStorage_Button.button.style.transitionDuration = '.3s';
filterLocalStorage_Button.button.style.backgroundColor = 'black';
filterLocalStorage_Button.button.style.border= '2px solid transparent';
filterLocalStorage_Button.button.disabled = true
filterLocalStorage_Button.button.style.opacity = '0';



filterLocalStorage_Button.removeFrom(map);

var rose = L.control.rose('rose', {
    position: 'topleft',
    icon: 'nautical',
    iSize: 'medium',
    opacity: 1
})//.addTo(map)
document.getElementById('rose').style.marginBottom = '5px' // to avoid extra margin, visible when offline buttons appear

// script to show the download tiles buttons (10clicks) and/or reload cartolayer (5clicks)

/////////////////////////////////////       CARTO    ADD TO MAP   //////////////////////////////////////////////

// var clusters = L.markerClusterGroup({
//     animate: true,
//     spiderfyOnMaxZoom: true,
//     showCoverageOnHover: false,
//     zoomToBoundsOnClick: true,
//     animateAddingMarkers: true,

// });


// // Add Data from CARTO using the SQL API. Declare Variables. Create Global Variable to hold CARTO points
// var cartoGeometries = null;
// var cartoIdFeatureSelected;
// var selectedFeature = null;
// var featureType = null;
// var cartoLoaded;
// var clickCountDelete;
//
// var filterIsOn = false
// var selectedFeature
// var getTotalFeaturesInDB
var template = document.getElementById('popup')

// function getGeoJSON() {
//     $.getJSON({
//       cache:false,
//       success:cartoGeoJSONLayer,
//       url:"https://" + cartousername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + sqlQuery + cartoapiSELECT
//     })
//     return cartoLoaded && cartoIdFeatureSelected && selectedFeature && cartoGeometries;
// };

//function to activate carto layer once feature has been submitted successfully. It's fired when the share-world button is clicked
var postSuccess = function(){
  // if(pURL[0] == 'I'){ // to refer to Insert (I), not Delete!
  //
  //     //interval to check if #rows in carto layers after sent has incremented compared to when carto layer is loaded initially
  //     var intervalCheckAndAddNewDeflated = setInterval(function(){
  //         //function  to check number of items in cartodb after GET request
  //           var getTotalFeaturesInDBAfterSent;
  //           var countRowsInDB = function(data){
  //             getTotalFeaturesInDBAfterSent = data.rows[0].count //to count the number of rows in the array returned
  //
  //             if(getTotalFeaturesInDBAfterSent != getTotalFeaturesInDB){ //if it's equal then we refresh (click layers button) until is different, then query SELECT last
  //               //script to load the carto layer after sent, depending on which layer is on and if local storage or not
  //               if(localStorageLayer == null){
  //                   if(whichLayerIsOn == 'deflated'){
  //                     document.getElementById('myLayerButton').click()
  //                     document.getElementById('myLayerButton').click()
  //                   }else if(whichLayerIsOn == 'none'){
  //                     document.getElementById('myLayerButton').click() // because first time app is used mylayer_button has only two positions (local storage is empty)
  //                   }
  //               }
  //
  //               if(localStorageLayer != null){
  //                 if(whichLayerIsOn == 'deflated'){
  //                   document.getElementById('myLayerButton').click()
  //                   document.getElementById('myLayerButton').click()
  //                   document.getElementById('myLayerButton').click()
  //
  //                 }else if(whichLayerIsOn == 'localStorage'){
  //                   document.getElementById('myLayerButton').click()
  //                   document.getElementById('myLayerButton').click()
  //                 }else if(whichLayerIsOn == 'none')
  //                 document.getElementById('myLayerButton').click()
  //
  //               }
  //             clearInterval(intervalCheckAndAddNewDeflated)
  //             }
  //           }
  //           //request to check when feature has reached the DB
  //           // $.get({
  //           //   cache:false,
  //           //   success:countRowsInDB,// if success the function above is called
  //           //   url:"https://" + cartousername + ".cartodb.com/api/v2/sql?q=" + "SELECT COUNT(cartodb_id) FROM lumblu" + cartoapiSELECT
  //           // })
  //
  //      },500)
  //  }
}

// Send data to  PHP using a jQuery Post method
var submitToProxy = function(q) {
    $.post("./callProxy.php", { //
        qurl: q,
        // geojson:data,
        cache: false,
        timeStamp: new Date().getTime(),
        success:postSuccess()
    })
    .done(function() {
      console.log('submitted succesfully')

    })
    .fail(function() {
      var updatedgeojson = failgeoJSON.replace(/open/g, 'offlineOpen');
      setTimeout(function(){
        geoJSONLocalforageDB.setItem(failRandomID, updatedgeojson)

      },500)


    })
    .always(function() {

    });
};





// getPlanetAPIKey()

var pURL
//this function is called both when feature is deleted or feature is created and sent.
function setData() {
  //console.log('cartoIdFeatureSelected',cartoIdFeatureSelected)
  //console.('created',created)
  //console.('toDelete',toDelete)
  //console.('clickCountDeleteButton',clickCountDeleteButton)

    //console.('cartoIdFeatureSelected',cartoIdFeatureSelected);
    //console.('toDelete',toDelete);

    if ((cartoIdFeatureSelected != null && toDelete == true) || deleteFromcartoimmediate != null) { //TO DELETE THE SELECTED FEATURE FROM THE CARTO DB
        toDelete = false
        if(deleteFromcartoimmediate != null){
          //console.('deleteFromcartoimmediate',deleteFromcartoimmediate)

          cartoIdFeatureSelected = deleteFromcartoimmediate
        }
        pURL = "DELETE FROM `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb_QMM_Madagascar` WHERE contributionid='" + cartoIdFeatureSelected + "'";
        clickCountDeleteButton = 0
        cartoIdFeatureSelected = null
        deleteFromcartoimmediate = null
        //console.log(pURL)

    }else if (cartoIdFeatureSelected != null && created == false && editButtonClicked == true){ //TO INSERT COMMENT IN EXISTING FEATURE
      //console.log('set data called')
      //console.log(contentInTextbox)
      //console.log(audioComment)
        if(audioRecorded == false){
          audioComment = '.'
        }


        // var emojioneareaeditor = document.getElementsByClassName('emojionearea-editor')
        // var emojioneareaeditor0 = emojioneareaeditor[0]
        // var contentInTextbox = emojioneareaeditor0.innerHTML
        var contentInTextbox = document.getElementById('emojionearea').value;

        // pURL = "UPDATE lumblu SET commentone = 'anothertest' WHERE cartodb_id='" + cartoIdFeatureSelected + "'";
        // pURL = "UPDATE lumblu SET commentone='" + contentInTextbox + "' WHERE cartodb_id='" + cartoIdFeatureSelected + "'";
        pURL = "UPDATE lumblu SET commentone='" + contentInTextbox + "', commentoneaudioavailable='" + audioComment + "' WHERE cartodb_id='" + cartoIdFeatureSelected + "'";
        editButtonClicked = false


        //console.log(pURL)
    }
    else { //TO INSERT THE CREATED FEATURE INTO THE CARTO DB
      //console.(data)

        dataGeometry = data.geometry
        //console.(dataGeometry)
        var dataGeometryString = JSON.stringify(dataGeometry)
        ///////////////////////////////////////////////////////ha or acres !!!!!!!!!!!!!!!!!!!!!!! ??????????///////////////
        // phoneNumber = 123456789
        // if(croptype != null && evaluation_updown.includes('👎🏿')){
        //   function extractNumbers(str) {
        //     return str.replace(/\D/g, '');
        //   }
        //   crop_hectares_afected = extractNumbers(areaPolygon)
        //   console.log('crop_hectares_afected acres',crop_hectares_afected)
        //   crop_hectares_afected =crop_hectares_afected.slice(0, -2)
        //   crop_hectares_afected = crop_hectares_afected*0.404686
        // }else{
        //   crop_hectares_afected = 0
        // }

        //console.('areaPolygon',areaPolygon)
        //console.('finalAreaAcres2Decimals',finalAreaAcres2Decimals)
        //console.('finalLength2Decimals',finalLength2Decimals)


        if(finalAreaAcres2Decimals == 'Line' || finalAreaAcres2Decimals == 'Point'){
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
          var areanumber = removeCharactersAfterSpace(finalAreaAcres2Decimals);
          console.log('areanumber',areanumber); // Output: "Hello"
          var acrestoha = areanumber*0.404686
          var acretoha2decimals = acrestoha.toFixed(2)
          console.log('acretoha2decimals',acretoha2decimals)

          var areaPolygonNumeric = parseFloat(acretoha2decimals)
        }
        //console.('lengthLine',lengthLine)

        if(finalLength2Decimals == 'Polygon' || finalLength2Decimals == 'Point'){
          var lengthLineNumeric = 0

        }else{
          function extractNumbers(str) {
             return str.replace(/\D/g, '');
           }
          var lengthnumber = extractNumbers(finalLength2Decimals)
         var lenghtkm2decimals = lengthnumber.slice(0, -2)
         var lengthLineNumeric = parseFloat(lenghtkm2decimals)
        }

        //console.('areaPolygonNumeric',areaPolygonNumeric)
        //console.('lengthLineNumeric',lengthLineNumeric)

        // landownership_type = null
        // male_or_female = null

        // var lu_final =landUsesEmoji.replace(/<br>/g, '');
        // emojioneareaeditor0.value = landUse + croptype + evaluation + livestockdisseasetype + kidsmale + kidsfemale + adultmale + adultfemale  + household + emojioneareaeditor0.value
        // emojioneareaeditor0.value = emojioneareaeditor0.value.replace(/null/g, '')
        openOrPrivate = propertiesGeoJSON.openOrPrivate;
        phoneNumber = propertiesGeoJSON.phoneNumber;
        areaPolygon = propertiesGeoJSON.areaPolygon;
        lengthLine = propertiesGeoJSON.lengthLine;
        dateTime = propertiesGeoJSON.dateTime;
        timeSpendSeconds = propertiesGeoJSON.timeSpendSeconds;
        dist_m_Participant_Feature = propertiesGeoJSON.dist_m_Participant_Feature;
        randomID = propertiesGeoJSON.randomID;
        attribute1s = propertiesGeoJSON.Description
        const brRegex = /<\/?br>/gi;
        attribute1s = attribute1s.replace(brRegex, '');

        attribute2s = imageName1 //evaluation
        attribute3s = imageName2
        attribute4s = imageName3
        attribute5s = null
        attribute6s = null
        attribute7s = null
        attribute8s = null
        attribute9s = null
        attribute10s = null
        const numberRegex = /\d+/g;
attribute11nstring = kidsmale
attribute12nstring = kidsfemale
attribute13nstring = adultmale
attribute14nstring = adultfemale
attribute15nstring = household
try{ //to catch when value is empty
  attribute11n = attribute11nstring.match(numberRegex);
  attribute11n = attribute11n[0]
}catch(e){
  attribute11n = 0
  console.log(e)
}
try{ //to catch when value is empty
  attribute12n = attribute12nstring.match(numberRegex);
  attribute12n = attribute12n[0]
}catch(e){
  attribute12n = 0
  console.log(e)
}
try{ //to catch when value is empty
  attribute13n = attribute13nstring.match(numberRegex);
  attribute13n = attribute13n[0]
}catch(e){
  attribute13n = 0
  console.log(e)
}
try{ //to catch when value is empty
  attribute14n = attribute14nstring.match(numberRegex);
  attribute14n = attribute14n[0]
}catch(e){
  attribute14n = 0
  console.log(e)
}
try{ //to catch when value is empty
  attribute15n = attribute15nstring.match(numberRegex);
  attribute15n = attribute15n[0]
}catch(e){
  attribute15n = 0
  console.log(e)
}

        // if(isNaN(attribute11n) == true){ //to put zero when value is empty so no error in the xhr
        //   console.log('attribute11n is not a number')
        //   attribute11n = 0
        // }
        // if(isNaN(attribute12n) == true){
        //   attribute12n = 0
        // }
        // if(isNaN(attribute13n) == true){
        //   attribute13n = 0
        // }
        // if(isNaN(attribute14n) == true){
        //   attribute14n = 0
        // }
        // if(isNaN(attribute15n) == true){
        //   attribute15n = 0
        // }
        attribute16n = 0
        attribute17n = 0
        attribute18n = 0
        attribute19n = 0
        attribute20n = 0

        // if(areaPolygon != null){
        //   areaPolygon = extractNumbers(areaPolygon)
        // }

        //console.('attribute1s',attribute1s)
        //console.('attribute2s',attribute2s)
        //console.('attribute3s',attribute3s)
        //console.('attribute4s',attribute4s)
        //console.('attribute5s',attribute5s)
        //console.('attribute6s',attribute6s)
        //console.('attribute7s',attribute7s)
        //console.('attribute8s',attribute8s)
        //console.('attribute9s',attribute9s)
        //console.('attribute10s',attribute10s)
        //console.('attribute11n',attribute11n)
        //console.('attribute12n',attribute12n)
        //console.('attribute13n',attribute13n)
        //console.('attribute14n',attribute14n)
        //console.('attribute15n',attribute15n)
        //console.('attribute16n',attribute16n)
        //console.('attribute17n',attribute17n)
        //console.('attribute18n',attribute18n)
        //console.('attribute19n',attribute19n)
        //console.('attribute19n',attribute19n)

        dist_m_Participant = 0
        //console.('datetime',dateTime) // 2023-5-18T16:16:13Z
        // var dist_m_Participant_FeatureInt64 = parseInt(dist_m_Participant_Feature,10)
        // timeSpendSeconds = 3.14159265358979323846264338327950288400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001
        // timeSpendSeconds = BigInt(timeSpendSeconds)
        // attribute20n = 1111111111

        // console.log(lu_final)
        /////////////////////////////////////////LOCAL STORAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE///////////////////////////////////////////////
        // var commentAudioDefault = '.'
        var sql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb_QMM_Madagascar` (geom, contributionid, phone, sapprojid, areapolygon, lengthline, distance, date, attribute1s, attribute2s, attribute3s, attribute4s, attribute5s, attribute6s, attribute7s, attribute8s, attribute9s, attribute10s, attribute11n, attribute12n, attribute13n, attribute14n, attribute15n, attribute16n, attribute17n, attribute18n, attribute19n, attribute20n, timestamp) VALUES (ST_GeogFromGeoJSON('";
        var sql2 = dataGeometryString;
var sql3 = "',make_valid => true),'"+randomID+ "',CAST('" + phoneNumber + "' AS INT64),'" + sapelliProjectIdentifier + "',CAST('" + areaPolygonNumeric + "' AS NUMERIC),CAST('" + lengthLineNumeric + "' AS NUMERIC),CAST('" + dist_m_Participant + "' AS INT64),'" + dateTime +"','"+attribute1s+ "','" + attribute2s + "','" + attribute3s + "','" + attribute4s + "','" + attribute5s + "','" + attribute6s + "','" + attribute7s + "','" + attribute8s + "','"+attribute9s+ "','" + attribute10s + "',CAST('"+ attribute11n + "' AS INT64),CAST('" + attribute12n + "' AS INT64),CAST('" + attribute13n + "' AS INT64),CAST('" + attribute14n + "' AS INT64),CAST('" + attribute15n + "' AS INT64),CAST('" + attribute16n + "' AS INT64),CAST('" +attribute17n+ "' AS INT64),CAST('" + attribute18n + "' AS INT64),CAST('" + attribute19n + "' AS INT64),CAST('" + attribute20n + "' AS INT64),CAST('" +dateTime+"' AS TIMESTAMP))";
        pURL = sql + sql2 + sql3;
        //console.(pURL)
        // console.log(timeSpendSeconds)
//         var sql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb_QMM_Madagascar` (geom, contributionid, phone, sapprojid, areapolygon, lengthline, distance, date, attribute1s, attribute2s, attribute3s, attribute4s, attribute5s, attribute6s, attribute7s, attribute8s, attribute9s, attribute10s, attribute11n, attribute12n, attribute13n, attribute14n, attribute15n, attribute16n, attribute17n, attribute18n, attribute19n, attribute20n) VALUES (ST_GeogFromGeoJSON('";
//         var sql2 = dataGeometryString;
// var sql3 = "',make_valid => true),'"+randomID+"','" + "',CAST('" + phoneNumber + "' AS INT64),'" + sapelliProjectIdentifier + "','" + areaPolygon + "','" + lengthLine + "',CAST('" + dist_m_Participant + "' AS INT64),'" + dateTime +"','"+attribute1s+ "','" + attribute2s + "','" + attribute3s + "','" + attribute4s + "','" + attribute5s + "','" + attribute6s + "','" + attribute7s + "','" + attribute8s + "','"+attribute9s+ "','" + attribute10s + "','" + attribute11n + "','" + attribute12n + "','" + attribute13n + "','" + attribute14n + "','" + attribute15n + "','" + attribute16n + "','" +attribute17n+ "','" + attribute18n + "','" + attribute19n + "','" + attribute20n + "')";
//         pURL = sql + sql2 + sql3;
//         console.log(pURL)
    }

    //////console.log(pURL)
    submitToProxy(pURL);
    ////console.log("Feature has been submitted to the Proxy");
    return pURL && editButtonClicked && clickCountDeleteButton && deleteFromcartoimmediate && toDelete
};

document.getElementById('backFromFilter').onclick = function(e){
  filter_Button.addTo(map);

  document.getElementById('filter').click()
  filter_Button.removeFrom(map);
  document.getElementById('tutorial').click()

}

//cartoGeoJSONLayer()
//}//run JS Selected feature

///////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////    Initial state of buttons       //////////////////////////////////////
// improve by selecting by class...

// document.getElementById("map").style.display = "initial";
// document.getElementById("tutorial").style.display = "initial";
// document.getElementById("polygon").style.display = "initial";
// document.getElementById("polyline").style.display = "initial";
// document.getElementById("point").style.display = "initial";
// document.getElementById("map").style.display = "block";

document.getElementById("goBack2").style.display = "none";
document.getElementById("deleteLastVertex").style.display = "none";
document.getElementById("deleteAllVertexs").style.display = "none";
document.getElementById("deleteLastVertexLine").style.display = "none";
document.getElementById("deleteAllVertexsLine").style.display = "none";
document.getElementById("completeFeature").style.display = "none";

//document.getElementById("map").style.display = "initial";
// document.getElementById("tutorial").style.display = "initial";
// document.getElementById("polygon").style.display = "initial";
// document.getElementById("polyline").style.display = "initial";
// document.getElementById("point").style.display = "initial";

// document.getElementById("Download").style.display = "none";
document.getElementById("Cancel").style.display = "none";
document.getElementById("ShareFinalButton").style.display = "none";

// document.getElementById('record').style.display = 'none';
document.getElementById("sapelliProjects").style.display = "none";

// document.getElementById('enableRecording').style.display = 'none';
// document.getElementById('activatePlay').style.opacity = '1';

// document.getElementById('storeAudio').style.display = 'none';
// document.getElementById('gum').style.display = 'none';
// document.getElementById('recorded').style.display = 'none';
// document.getElementById('echoCancellation').style.display = 'none';
// document.getElementById('voice').style.display = 'none';
document.getElementById('Sent').style.display = 'none';
document.getElementById('emoji').style.display = 'none';

document.body.style.backgroundColor = "white";

//document.getElementById("map").style.display = "block";

//
// document.getElementById("polygon").style.display = "initial";
// document.getElementById("polyline").style.display = "initial";
// document.getElementById("point").style.display = "initial";

document.getElementById("deleteLastVertex").style.opacity = "0.35";
document.getElementById("deleteLastVertex").disabled = true;
document.getElementById("deleteAllVertexs").style.opacity = "0.35";
document.getElementById("deleteAllVertexs").disabled = true;
document.getElementById("deleteLastVertexLine").style.opacity = "0.35";
document.getElementById("deleteLastVertexLine").disabled = true;
document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
document.getElementById("deleteAllVertexsLine").disabled = true;
document.getElementById("completeFeature").style.opacity = "0.35";
document.getElementById("completeFeature").disabled = true;

// var mapCurrentBounds;
// var mapCurrentZoom;
// var mapCurrentCenter;


document.getElementById("gobackArmchairField").onclick = function(e) {
  document.getElementById("tutorial").style.display = "initial";
  document.getElementById("armchair").style.display = "initial";
  document.getElementById("field").style.display = "initial";
  document.getElementById("gobackArmchairField").style.display = "none";
  document.getElementById("polygon").style.display = "none";
  document.getElementById("polyline").style.display = "none";
  document.getElementById("point").style.display = "none";
  // filterLocalStorage_Button.button.disabled = false
  filter_Button.button.disabled = false
  // filterLocalStorage_Button.button.style.opacity = '1'
  filter_Button.button.style.opacity = '1'
  filter_Button.button.style.opacity = '0.4';
  filter_Button.button.disabled = true;



}
document.getElementById("armchair").onclick = function(e) {
  attachPhoto = false
  photoAccepted = null //this is to not attach a picture taken in the previous mapping in the same session
  screenshotOn = false
  deflated.clearLayers()
    try{
      offlineControlGoogle.remove();
      document.getElementById('rose').style.display = 'initial'
    }catch(e){
      console.log(e)
    }


    document.getElementById("Alert").style.display = 'none';

  $('#screenshots').empty()

  //to disable layer to create a geometry
  // if(whichLayerIsOn == 'deflated' && localStorage == null){
  //   document.getElementById('myLayerButton').click()
  // }else if(whichLayerIsOn == 'deflated' && localStorage != null){
  //   document.getElementById('myLayerButton').click()
  //   document.getElementById('myLayerButton').click()
  // }else if(whichLayerIsOn == 'localStorage'){
  //   document.getElementById('myLayerButton').click()
  // }

  // $.getScript({
  //    cache:true,
  //   url:'scripts/customIcons_v3.1.js'
  // }),
  // $.getScript({
  //    cache:true,
  //   url:'scripts/lib/html2canvas.min.js'
  // }),
  // $.getScript({
  //   cache:true,
  //   url:'https://webrtc.github.io/adapter/adapter-latest.js'
  // })
  // document.getElementById("Alert").style.display = 'none'
  document.getElementById("applyFilter").style.display = "none";

  document.getElementById("tutorial").style.display = "none";
  document.getElementById("armchair").style.display = "none";
  document.getElementById("field").style.display = "none";

  document.getElementById("gobackArmchairField").style.display = "initial";
  document.getElementById("polygon").style.display = "initial";
  document.getElementById("polyline").style.display = "initial";
  document.getElementById("point").style.display = "initial";
  filterLocalStorage_Button.button.disabled = true
  filter_Button.button.disabled = true
  filterLocalStorage_Button.button.style.opacity = '0.5'
  filter_Button.button.style.opacity = '0.5'

  finalLength = 0 //to set to cero the length distance
  justCancelled = false

  armchairOrGPS = 'a'
  return finalLength && armchairOrGPS && justCancelled && attachPhoto && photoAccepted && screenshotOn
}


document.getElementById("field").onclick = function(e) {
  attachPhoto = false
  photoAccepted = null //this is to not attach a picture taken in the previous mapping in the same session
  screenshotOn = false

  deflated.clearLayers()
    try{
      offlineControlGoogle.remove();
      document.getElementById('rose').style.display = 'initial'
    }catch(e){

    }

    document.getElementById("Alert").style.display = 'none';
  $('#screenshots').empty()
//to disable layer to create a geometry
    // //to disable layer to create a geometry
    // if(whichLayerIsOn == 'deflated' && localStorage == null){
    //   document.getElementById('myLayerButton').click()
    // }else if(whichLayerIsOn == 'deflated' && localStorage != null){
    //   document.getElementById('myLayerButton').click()
    //   document.getElementById('myLayerButton').click()
    // }else if(whichLayerIsOn == 'localStorage'){
    //   document.getElementById('myLayerButton').click()
    // }

  // $.getScript({
  //    cache:true,
  //   url:'scripts/customIcons_v3.1.js'
  // }),
  // $.getScript({
  //    cache:true,
  //   url:'scripts/lib/html2canvas.min.js'
  // }),
  // $.getScript({
  //   cache:true,
  //   url:'https://webrtc.github.io/adapter/adapter-latest.js'
  // })
  //console.log(currentLocation)
//  console.log(accuracy)

  // startSearchingLocation()

  if(currentLocation[0] == null){
    // alert('Turn on the GPS and wait until the GPS symbol is green. This might take few seconds or minutes');
    document.getElementById("Alert").style.fontSize = "40px";
    document.getElementById('Alert').innerHTML = 'GPS ⌛'
    document.getElementById("Alert").style.display = 'initial'
    document.getElementById("field").style.background = 'red'
    document.getElementById("field").style.borderColor = 'red'

    setTimeout(function(){
      document.getElementById("field").style.background = 'white'
      document.getElementById("field").style.borderColor = 'white'

      document.getElementById("Alert").style.display = 'none'

    },3000)
  }else if(accuracy >= 100){
    // alert('Wait until the GPS symbol is green. This might take few seconds or minutes');
    document.getElementById("Alert").style.fontSize = "40px";
    document.getElementById('Alert').innerHTML = 'GPS</br>🟠⌛</br>🟡⌛</br>🟢👍'
    document.getElementById("Alert").style.display = 'initial'
    document.getElementById("field").style.background = 'orange'
    document.getElementById("field").style.borderColor = 'orange'


    setTimeout(function(){
      document.getElementById("field").style.background = 'white'
      document.getElementById("field").style.borderColor = 'white'
      document.getElementById("Alert").style.display = 'none'
    },3000)

  }else{
    document.getElementById("Alert").style.display = 'none'
    document.getElementById("field").style.background = '#3AFB06'
    document.getElementById("field").style.borderColor = '#3AFB06'

    // document.getElementById("fieldImage").src = 'images/checkingPw.gif'
    //navigator.geolocation.watchPosition(findBuffer,error,watchPositionOptions);

    // try {
    //     navigator.geolocation.watchPosition(findBuffer,{
    //       enableHighAccuracy: true,
    //       maximumAge:2000,
    //     });
    // } catch (err) {
    //     currentLocation == null;
    // }
    // setTimeout(function(){
    //   map.removeLayer(position)
    // },500)
    setTimeout(function(){
      document.getElementById("field").style.background = 'white'
      document.getElementById("field").style.borderColor = 'white'

      // document.getElementById("fieldImage").src = 'images/field.png'

      // startSearchingLocation()
      // position.removeFrom(map)
      field = true

      finalAreaHa2Decimals = null
      finalAreaAcres2Decimals = null
      finalLength2Decimals = null

      filterLocalStorage_Button.button.disabled = true
      filter_Button.button.disabled = true
      filterLocalStorage_Button.button.style.opacity = '0'
      filter_Button.button.style.opacity = '0'
        gps_Button.button.style.opacity = '0';
        gps_Button.button.disabled = true;
        // document.getElementById("emojionearea-css").disabled = false
        // emojiRequest()

        // if (isIOS == false) {
        //     recordedBlobs = null; //to empty recorded blobs from previous map in this session
        // }

        featureType = 'point';
        map.doubleClickZoom.disable();
        currentZoom = map.getZoom();
        drawMarker.enable();
        document.getElementById("applyFilter").style.display = "none";

            document.getElementById("tutorial").style.display = "none";
            document.getElementById("polygon").style.display = "none";
            document.getElementById("polyline").style.display = "none";
            document.getElementById("point").style.display = "none";
            document.getElementById("armchair").style.display = "none";
            document.getElementById("field").style.display = "none";
            document.getElementById("gobackArmchairField").style.display = "none";

        drawingPoint = true;
          // var currentLocationSimulateClickLat = 3.445137
          // var currentLocationSimulateClickLng = 7.23346
          var currentLocationSimulateClickLat = currentLocation[0]
          var currentLocationSimulateClickLng = currentLocation[1]

            map.fireEvent('click', {
            latlng: L.latLng(currentLocationSimulateClickLat, currentLocationSimulateClickLng)
          },100);
        },800)
    }

    armchairOrGPS = 'g'
    justCancelled = false
  return drawingPoint && featureType && field && armchairOrGPS && justCancelled && attachPhoto && photoAccepted && screenshotOn
}
///////////////////////////////////////////draw screen////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////
//functions to move map up/down when emoji menu is opened/closed ONLY IN 'SMALL' SCREENS. The funciton is called in emojionearea.js
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var screenwidth = screen.width
console.log('screenwidth',screenwidth)
var screenwithWithMargins = screenwidth * 0.3
var screenheight = screen.height
var screensize = 'W'+ screenwidth + ' x ' + 'H' + screenheight

var alreadyMovedUp = false;
var moveMaptoTop = function() {
    alreadyMovedUp = true;
    var bounds = map.getBounds()
    var centerPoint = [screenwidth / 2, (screenheight / 2) * 1.3]
    var targetLatLng = map.containerPointToLatLng(centerPoint);

    if (screenwidth < 600) { // condition to avoid pan in tablets and PCs
        map.panTo(targetLatLng);
        return alreadyMovedUp
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////

// var refreshPopup;
var startCheckingText = function() {
    var popupContent = '...';
    imageName1 = 'dtm'
    tempLayer.removeFrom(map);

    function onEachFeatureConfirm(feature, layer) {

        ////console.log(document.getElementsByClassName('emojionearea-editor').innerText)
        refreshPopup = setInterval(function() {
            //the problem with document.getElementById('emojionearea').value is that it only updates when the text box is not selected, which is as issue. TextContent methodworks
            //well, except that it does not capture emojis
            var emojioneareaeditor0 = document.getElementById('emojionearea')
          //  ////console.log(emojioneareaeditor)
            // var emojioneareaeditor0 = emojioneareaeditor[0]
          //  ////console.log(emojioneareaeditor0)
            // var emojioneareaeditor0innerHTML = emojioneareaeditor0.innerHTML /////////////////////////////////////////////11111111111111111111111ddddddddddddddddddddddddddddddESTE!!!
           //console.(emojioneareaeditor0.value)
           emojioneareaeditor0.value = emojioneareaeditor0.value.replace(/<br>|null/g, "")

        //    ////console.log(emojioneareaeditor[0].textContent.lenght)
            if (emojioneareaeditor0.value.length == 0) { //to show '...' while the textbox is empty of characters (both letter and emojis)
                layer.bindPopup(popupContent,{
                  maxWidth : 150
                }).addTo(map);
                layer.bindPopup(popupContent).closePopup(); ///automatically shows the pop up!
              //  ////console.log('innerhtml is null')

                if (audioRecorded == false) {
                    document.getElementById("share-download").style.opacity = "0.35"; //to disable button until user adds attributes, either with audio or text
                    document.getElementById("share-download").disabled = true;
                }
            } else {
              // if(landUse == 'emojiNoSapelli'){
              //   if(attachPhoto == false){
              //     layer.bindPopup(emojioneareaeditor0innerHTML).addTo(map);
              //     layer.bindPopup(emojioneareaeditor0innerHTML).openPopup(); ///automatically shows the pop up!
              //   }else{
              //
              //     var imgPhoto = '<img src="images/cameraIcon.png"'+ 'height="50px" width="50px" border="0" bordercolor="grey" backgroundcolor="green"/>'
              //     clearInterval(refreshPopup)
              //     var emojioneareaeditor0innerHTMLwithPhoto = emojioneareaeditor0innerHTML + '</br>' + imgPhoto
              //     layer.bindPopup(emojioneareaeditor0innerHTMLwithPhoto).addTo(map);
              //     layer.bindPopup(emojioneareaeditor0innerHTMLwithPhoto).openPopup(); ///automatically shows the pop up!
              //   }




                // if(landUse == 'emojiNoSapelli'){
                //   // if(attachPhoto == false){
                //     layer.bindPopup(emojioneareaeditor0.value).addTo(map);
                //     layer.bindPopup(emojioneareaeditor0.value).openPopup(); ///automatically shows the pop up!
                //     console.log('no emoji sapelli')
                  // }else{

                    // var imgPhoto = '<img src="images/cameraIcon.png"'+ 'height="50px" width="50px" border="0" bordercolor="grey" backgroundcolor="green"/>'
                    // clearInterval(refreshPopup)
                  //   var emojioneareaeditor0innerHTMLwithPhoto = emojioneareaeditor0innerHTML + '</br>' + imgPhoto
                  //   layer.bindPopup(emojioneareaeditor0innerHTMLwithPhoto).addTo(map);
                  //   layer.bindPopup(emojioneareaeditor0innerHTMLwithPhoto).openPopup(); ///automatically shows the pop up!
                  // }

                // }else{
                  var imgPopup1 = '<img src="images/omoIcons/' + imageName1 + '.png"'+ 'height="50px"  width="50px" border="2" bordercolor="grey"/>'

                  // var imgPopup2 = '<img src="images/omoIcons/' + feature.properties.I2 + '.png"'+ 'height="50px" width="50px" border="2" bordercolor="grey"/>'

                  //to put and image of zero dimension in case there isn't such property
                  if(imageName2 != null){
                    var imgPopup2 = '<img src="images/omoIcons/' + imageName2 + '.png"'+ 'height="50px" width="50px" border="2" bordercolor="grey"/>'
                  }else{
                    var imgPopup2 = '<img src="images/omoIcons/ThumbsUp.png"'+ 'height="0px" width="0px" border="0" bordercolor="grey"/>'
                  }

                  if(imageName3 != null){
                    var imgPopup3 = '<img src="images/omoIcons/' + imageName3 + '.png"'+ 'height="50px" width="50px" border="2" bordercolor="grey"/>'
                  }else{
                    var imgPopup3 = '<img src="images/omoIcons/ThumbsUp.png"'+ 'height="0px" width="0px" border="0" bordercolor="grey"/>'
                  }
                  // if(attachPhoto == true){
                  //   // console.log('attach photo')
                  //   var imgPhoto = '<img src="images/cameraIcon.png"'+ 'height="50px" width="50px" border="0" bordercolor="grey" backgroundcolor="green"/>'
                  //   // clearInterval(refreshPopup)
                  //
                  // }else{
                  //   var imgPhoto = '<img src="images/omoIcons/' + imageName1 + '.png"'+ 'height="0px" width="0px" border="0" bordercolor="green"/>'
                  //   // clearInterval(refreshPopup)
                  //
                  // }
                  // if(evaluation == null && croptype == null){
                  //   emojioneareaeditor0innerHTML =  landUse + ' - ' + emojioneareaeditor0.innerHTML
                  // }else if(evaluation != null && croptype == null){
                  //   emojioneareaeditor0innerHTML =  landUse + ' ▪️ ' + evaluation +  ' - ' + emojioneareaeditor0.innerHTML
                  // }else if(evaluation == null && croptype != null){
                  //   emojioneareaeditor0innerHTML =  landUse + ' ▪️ ' + croptype +  ' - ' + emojioneareaeditor0.innerHTML
                  // }else if(evaluation != null && croptype != null){
                  //   emojioneareaeditor0innerHTML =  landUse + ' ▪️ ' + croptype + ' ▪️ ' + evaluation +  ' - ' + emojioneareaeditor0.innerHTML
                  // }
                  if(sharedownloadclicked == true){
                    var emojioneareaeditor0innerHTMLAndImages = emojioneareaeditor0.value + '</br>' + '</br>' + imgPopup1 + ' ' +imgPopup2 + ' ' + imgPopup3// + ' ' + imgPhoto
                    layer.bindPopup(emojioneareaeditor0innerHTMLAndImages,{
                      maxWidth : 150
                    }).addTo(map);
                    layer.bindPopup(emojioneareaeditor0innerHTMLAndImages).openPopup(); ///automatically shows the pop up!
                    // console.log('keeps checking popup')
                    sharedownloadclicked = false
                    clearInterval(refreshPopup) //to stop searching for changes in the textbox


                  }else{
                    var emojioneareaeditor0innerHTMLAndImages = emojioneareaeditor0.value + '</br>' + '</br>' + imgPopup1 + ' ' +imgPopup2 + ' ' + imgPopup3// + ' ' + imgPhoto
                    layer.bindPopup(emojioneareaeditor0innerHTMLAndImages,{
                      maxWidth : 150
                    })//.addTo(map);
                    layer.bindPopup(emojioneareaeditor0innerHTMLAndImages)//.openPopup(); ///automatically shows the pop up!
                    // console.log('keeps checking popup')
                  }


                // }
              //  ////console.log('innerhtml is not null')
                document.getElementById("share-download").style.opacity = "1"; //to disable button until user adds attributes, either with audio or text
                document.getElementById("share-download").disabled = false;
            }
        }, 100) // time frequency to refresh the content in the popup
    }

    tempLayer = L.geoJSON(data, {
        pointToLayer: function(feature, latlng) { //to change the icon of the marker (i.e. avoid default)
            return L.marker(latlng, {
                icon: markerIconLocalStorage,
                draggable:false
            });
        },
        style: function(feature) {
            return feature.properties && feature.properties.style;
        },
        color: '#ffff00',
        onEachFeature: onEachFeatureConfirm,

    }).addTo(map);
  //  ////console.log(tempLayer)
    return tempLayer && refreshPopup && sharedownloadclicked
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////function for pop ups//////////
function onEachFeature(feature, layer) {
  //console.log(feature.properties.areaPolygon)
    //timeout is used to wait 1000ms until the download link is ready
    setTimeout(function() {
        var audioLinkText = '🔊 AUDIO'
        //conditions to avoid showing audio link if no audio has been recorded
        if (isIOS == false && recordedBlobs != null) {
            if (isOnline == true) { //condition to only hyperlink the audiolinktext if online
                clickableFinalUrlAudio = audioLinkText.link(finalUrlAudio)
                if(feature.properties.areaPolygon == 'Point' || feature.properties.areaPolygon == 'Line'){
                  var popupContent = feature.properties.Description + '</br>' + '</br>' + '⏳...' + clickableFinalUrlAudio; //+ '    ' +dateTimeRandomID
                }else{
                  var popupContent = '📐 ' + '<i>' + feature.properties.areaPolygon + '</i>' + '</br>' + '</br>' + feature.properties.Description + '</br>' + '</br>' + '⏳...' + clickableFinalUrlAudio; //+ '    ' +dateTimeRandomID
                }
            } else {
                if(feature.properties.areaPolygon == 'Point' || feature.properties.areaPolygon == 'Line'){
                  var popupContent = feature.properties.Description + '</br>' + '</br>' + '⏳...' + 'AUDIO';
                }else{
                  var popupContent = '📐 ' + '<i>' + feature.properties.areaPolygon + '</i>' + '</br>' + '</br>' + feature.properties.Description + '</br>' + '</br>' + '⏳...' + 'AUDIO';
                }
            }
        } else {
            if(feature.properties.areaPolygon == 'Point' || feature.properties.areaPolygon == 'Line'){
              var popupContent = feature.properties.Description
            }else{
              var popupContent = '📐 ' + '<i>' + feature.properties.areaPolygon + '</i>' + '</br>' + '</br>' + feature.properties.Description
            }
        }
        if (feature.properties && feature.properties.popupContent) {
            popupContent += feature.properties.popupContent;
        }

        layer.bindPopup(popupContent,{
          maxWidth : 150
        }).addTo(map);
        layer.bindPopup(popupContent).openPopup();

    }, 1600)
}
// var finished = false; // variable to openpopup only when file downloaded, not when loaded from local storage
function onEachFeatureAudioLocalStorage(feature, layer) { // function duplicated to avoid openpop() with local storage

    //timeout is used to wait 1000ms until the download link is ready
    setTimeout(function() {
      // var hectares = feature.properties.areaPolygon
      // var hectaresToAcres = hectares * 2.47105
        ////console.log('isonline' + ' ' + isOnline)
        var audioLinkText = '🔊 AUDIO'
        var audioAvailable = feature.properties.audioAvailable;
        //conditions to avoid showing audio link if no audio has been recorded
        if (audioAvailable == true) {
            if(feature.properties.areaPolygon == 'Point' || feature.properties.areaPolygon == 'Line'){
              var popupContent = feature.properties.Description + '</br>' + '</br>' + '🔊 🚧';
            }else{
              var popupContent = '📐 ' + '<i>' + feature.properties.areaPolygon + '</i>' + '</br>' + '</br>' + feature.properties.Description + '</br>' + '</br>' + '🔊 🚧';
            }
        } else {
          if(feature.properties.areaPolygon == 'Point' || feature.properties.areaPolygon == 'Line'){
            var popupContent = feature.properties.Description
          }else{
            var popupContent = '📐 ' + '<i>' + feature.properties.areaPolygon + '</i>' + '</br>' + '</br>' + feature.properties.Description
          }
        }
        if (feature.properties && feature.properties.popupContent) {
            popupContent += feature.properties.popupContent;
        }
        layer.bindPopup(popupContent,{
          maxWidth : 150
        }) //.addTo(map); // removed otherwise the layer is automatically added to the map when oneachfeaturelocl.. is called

        if (finished == true) {
            layer.bindPopup(popupContent).openPopup();
        }
        // if(urlContainsGeoJSON == true){
        //   console.log(feature)
        //     feature = parsedJSON.features[0]
        //     feature.bindPopup(popupContent).openPopup();
        // }

    }, 1600)
return feature
}
/////////////////LEAFLET DRAW////////
//tiles are stored in the cahce storage v22.4.8


var storageUsed
setTimeout(function(){ //for performance
  (async () => {
    // Storage API support
    if (!navigator.storage) return;
    const storage = await navigator.storage.estimate();
    storageUsed = Math.round((storage.usage / storage.quota) * 100)
    console.log('% used   : ',storageUsed)
    console.log(`permitted: ${ storage.quota / 1024 } Kb`);
    console.log(`used     : ${ storage.usage / 1024 } Kb`);
    // console.log(`% used   : ${ Math.round((storage.usage / storage.quota) * 100) }%`);
    console.log(`remaining: ${ Math.floor((storage.quota - storage.usage) / 1024) } Kb`);

    if(storageUsed > 60){ // we clear at 60%, but could be higher...
      console.log('cache deleted')

      //this is to clear the non-fundamental cache. Not the best approach at all, but this is to avoid indexeddb being cleared -
      // instead of the cache map tiles. There are nicer ways of doing this, but let's see if the issue is solved with "persistence", this is a patch...
      //version var is declared in sw.js
      caches.delete('CACHETILES').then(function(response) {
          console.log('cache deleted')
        })
      // caches.open('CACHETILES').then(function(cache){
      //   cache.delete(version).then(function(response) {
      //     console.log('cache deleted')
      //   })
      // })
      //
    }
  })();
},6000)
