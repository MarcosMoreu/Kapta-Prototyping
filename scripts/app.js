console.log('app.js accessed')


// var pageLoaded = false
var isIOS = /iPad|iPhone|iPod|Mac OS X/.test(navigator.userAgent) && !window.MSStream; // Mac OS X correct???
var isOnline = navigator.onLine
var isOnlineGlobal = isOnline
var browserLanguage = navigator.language
var planetKey;
//var sentinelKey;
var firebaseKey;
var firebaseConfig;
var cartousername;
var cartoapiSELECT;

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
//var miniMap

//////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////      first load         /////////////////////////////////////////////////////////////////////////
var isFirstTime; //var to store if the site is visited for the first time
//var oneMapCompleted; // to know if in this session this is the first map or not


//firstLoad();
//console.log('isIOS  ' + isIOS)

// var isOnlineGlobal = isOnline

//to check if offline so some elements can be disabled
var checkIfOffline = setInterval(function() {
  isOnline = navigator.onLine
  if(isOnline == false){
    document.getElementById('shareWorldButton').style.opacity = '0.2';
    document.getElementById('shareWorldButton').disabled = 'true';
    filter_Button.button.style.opacity = '0.4';
    filter_Button.button.disabled = true;
    filter_Button.button.style.opacity = '0.4';
    filter_Button.button.disabled = true;
    myLayer_Button.button.style.backgroundColor = '#43ACF0';

    deflated.removeFrom(map)
    // console.log('isonline= ', isOnline)
    //clearInterval(checkIfOffline)
    inOnline = false
  }else{
    isOnline = true
    //console.log('isonline= ', isOnline)

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
          console.log('Firebase initialized')
            clearInterval(findFirebaseCredentials)
        } catch (e) {
          //console.log('firebase not initialized!!')
        }
    }
}, 500)

//  firebase.analytics();

////////////////////////////   Service Worker   ////////////////////////////////////////

if ('serviceWorker' in navigator) {

    navigator.serviceWorker
        .register('./sw.js')
        .then(function(registration) {

            registration.update() //to update the sw and caches if version has changed
            //console.log('sw has been updated')
            //to reload the page if sw version has changed. This is to provide the user the latest version without the need of reloading or clearing cache
            registration.onupdatefound = () => {
              console.log('update found in SW')
                const installingWorker = registration.installing;
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed' &&
                        navigator.serviceWorker.controller) {
                          // $.get( "pages/tutorial.html")
                        // reload the page
                        location.reload();
                    }
                };
            };
        })
        .catch(function(err) {
            //console.log('Service Worker Failed to register', err);
        })
}

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
    getItem: function(key) {
        return localforage.getItem(key);
    },

    saveTiles: function(tileUrls) {
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
                            } else {
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

lastPositionStoredLOCALLY = localStorage.getItem('lastPositionStoredLOCALLY')
//console.log(lastPositionStoredLOCALLY)

//to avoid error if no location was stored either because first load, not allowed, or cache cleared
if (lastPositionStoredLOCALLY != null) {
    lastPositionStoredLOCALLY = lastPositionStoredLOCALLY.split(',') // to convert string to array
    //console.log(lastPositionStoredLOCALLY[0])
}

// function to get coordinates and zoom level from URL, and then use the zoom and center variables to center the map if url != original
var mappos = L.Permalink.getMapLocation();
console.log(mappos.center.lat)

//////////////////////////////////////////////  MAP  //////////////////////////////////////////////////////
var randomIDtest
var geoJSONLocalforageDB
//this function will be called only if geojson is found in url
var storeURLGeoJSON = function(data){
  var randomID = data.features[0].properties.randomID
  geoJSONLocalforageDB = localforage.createInstance({ //to create a separate DB in IndexedDB, so geojsons are not mixed with TilesDB
  name: "geoJSONs"
  });
  var parsedJSONStringified = JSON.stringify(data)

  geoJSONLocalforageDB.setItem(randomID, parsedJSONStringified).then(function(value){
  }).catch(function(err) {
    console.error(err);
  });
  randomIDtest = randomID

  return randomIDtest
}

//////////////////  center the map: check first if url with coordinates, if not, check if first load, then check if lastpositionstored.
//script to check if url contains coordinates when loaded

var url = window.location.href
// var url = 'https://amappingprototype.xyz/?%7B%22type%22%3A%22FeatureCollection%22%2C%22features%22%3A%5B%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22randomID%22%3A1111%2C%22landUsesEmoji%22%3A%22test%22%2C%22areaPolygon%22%3A%222489831968.72%20hectares%22%2C%22lengthLine%22%3A%22Polygon%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Polygon%22%2C%22coordinates%22%3A%5B%5B%5B-4.21875%2C-13.923404%5D%2C%5B16.875%2C-40.713956%5D%2C%5B66.09375%2C-40.713956%5D%2C%5B63.28125%2C4.214943%5D%2C%5B-4.21875%2C-13.923404%5D%5D%5D%7D%7D%5D%7D/#-15.11455,40.95703,3z'
// var url = 'https://amappingprototype.xyz/'
console.log(url)
var urlContainsHash = url.includes('/#')
var urlContainsGeoJSON = url.includes('/?')
//to avoid panning outside this bounds
var southWest = L.latLng(-70, -180);
var northEast = L.latLng(80, 180);

if (urlContainsHash == true && urlContainsGeoJSON == true && localStorage.getItem('pwCorrect')){  // if url contains geojson (and coords)
  console.log('hash and geojson')

  //to set mapview
    var keepOnlyLatLngZoom = url.split('#').pop();
    var splittedLatLngZoom = keepOnlyLatLngZoom.split(',');
    var urlLat = splittedLatLngZoom[0]
    var urlLng = splittedLatLngZoom[1]
    var urlZoomWithZ = splittedLatLngZoom[2]
    var urlZoom = urlZoomWithZ.replace('z','')

    var map = L.map('map', {
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
    // var parsedJSONStringified = JSON.stringify(parsedJSON)
    console.log(keepGeoJSONOnly)
    console.log(parsedJSON)
    // console.log(parsedJSONStringified)

    storeURLGeoJSON(parsedJSON)
    setTimeout(function accessLocalStorage(){
          fetchFromLocalStorage()
          console.log('after fetch and convert',localStorageLayer)
    },300) // really don't know why this timeout, but keep it for now

    setTimeout(function changeToLocalStorageLayer(){
        document.getElementById('myLayerButton').click()

    },2000) // really don't know why this timeout, but keep it for now

}else if (urlContainsHash == true){  // if only coords are in the url
  console.log('onlyhash')
    var keepOnlyLatLngZoom = url.split('#').pop();
    var splittedLatLngZoom = keepOnlyLatLngZoom.split(',');
    var urlLat = splittedLatLngZoom[0]
    var urlLng = splittedLatLngZoom[1]
    var urlZoomWithZ = splittedLatLngZoom[2]
    var urlZoom = urlZoomWithZ.replace('z','')

    var map = L.map('map', {
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
          console.log('after fetch and convert',localStorageLayer)
    },300) // really don't know why this timeout, but keep it for now
  //////////////////////
}else{
  console.log('only map')

    if (lastPositionStoredLOCALLY == null) {
        var map = L.map('map', {
            editable: true,
            center: [0, 0], //global center
            zoom: 0,
            minZoom: 2,
            maxZoom: 21,
            zoomControl: false,
            attributionControl: false,
            //drawControl:true,
            maxBounds: L.latLngBounds(southWest, northEast)

        });
    } else {
        var map = L.map('map', {
            editable: true,
            center: [lastPositionStoredLOCALLY[0], lastPositionStoredLOCALLY[1]],
            zoom: 10, /////////what is the most appropriate???/
            minZoom: 2,
            maxZoom: 21,
            zoomControl: false,
            attributionControl: false,
            //drawControl:true,
            maxBounds: L.latLngBounds(southWest, northEast)
        });
    }
    geoJSONLocalforageDB = localforage.createInstance({ //to create a separate DB in IndexedDB, so geojsons are not mixed with TilesDB
    name: "geoJSONs"
    });
    setTimeout(function accessLocalStorage(){
          fetchFromLocalStorage()
          console.log('after fetch and convert',localStorageLayer)
    },300) // really don't know why this timeout, but keep it for now
}
// // this function is to refresh PWA in case the first time it is loaded it contains url query string
// if(isFirstTime == true && urlContainsGeoJSON == true){
//   setTimeout(function refreshIfFirstLoadAndURLGeojson(){
//         fetchFromLocalStorage()
//         console.log('after fetch and convert',localStorageLayer)
//   },)
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
deflated.addTo(map) // to initialize //////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
    console.log(numberOfKeys);
    numberOfKeysGlobal = numberOfKeys
}).catch(function(err) {
    console.log(err);
});

// function to convert all geojsons in localforage into a layer. The function is called from fetchFromLocalStorage() [below]
var localStorageLayer
var localStorageToGeoJSON = function(){
  //console.log(groupGeoJSON)

    if (isJson(groupGeoJSON) == false && isFirstTime == false) {
        localStorageLayer = L.geoJSON(groupGeoJSON, {
            style: function(feature) {
                //myLayerIsOn = true;
                //console.log(myLayerIsOn)
                return feature.properties && feature.properties.style;
            },
            pointToLayer: function(feature, latlng) {

                return L.marker(latlng, {
                    icon: markerIconLocalStorage,
                    draggable:false
                });
            },
            color: '#33FFFF',
            //  icon: markerIconLocalStorage,
            onEachFeature: onEachFeatureAudioLocalStorage,
            autopan: false
        }) //.addTo(map)
        //console.log('localStorageLayer', localStorageLayer)

    }
return localStorageLayer
}

// function to fetch all geojson files from the IndexedDB-localforage-geoJSONsDB. Localforage is async, so promises are uses. After loop ends, localStorageToGeoJSON() [above] is called
var completedCount = 0 // to call localStorageToGeoJSON() when loop ends
function fetchFromLocalStorage(){
  if (isFirstTime == false && geoJSONLocalforageDB.key(0) != null) {

    geoJSONLocalforageDB.keys(function(err, keys) {
      for (var i = 0; i < keys.length; i++) {

          (function(key) {
            geoJSONLocalforageDB.getItem(key).then(function (value) {
                // console.log(key, value);
                isJson(value);
                if (isJson(value) == true) {
                  // console.log(isJson('this is geojson',value))
                    var getItemToJSON = JSON.parse(value);
                    isJson(getItemToJSON)
                    //add each json to an array-------------------------
                  //  groupGeoJSON[i] = getItemToJSON
                  groupGeoJSON.push(getItemToJSON)
                  completedCount += 1;
                  console.log(groupGeoJSON)

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
    iconAnchor: [11, 0], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
var googleSat = L.tileLayer.offline('https://mt.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', tilesDb, {
    minZoom: 2,
    maxZoom: 21,
    maxNativeZoom: 21,
    //transparent: false,
    //border: 'solid black 5px',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Leaflet | Google Imagery'
})//.addTo(map);

var osm = L.tileLayer.offline('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', tilesDb, {
    minZoom: 2,
    maxZoom: 19,
    maxNativeZoom: 19,
    // subdomains:['mt0','mt1','mt2','mt3'],
    attribution: 'Leaflet | OpenStreetMap Contributors'

});

var offlineControlGoogle = L.control.offline(googleSat, tilesDb, {
    saveButtonHtml: '<img src="images/download.png" width=15px ; height=15px>',
    removeButtonHtml: '<img src="images/bin.png" width=15px ; height=15px>',
    confirmSavingCallback: function(nTilesToSave, continueSaveTiles) {
        if (window.confirm('Save ' + nTilesToSave + '?')) {
            continueSaveTiles();
        }
    },
    confirmRemovalCallback: function(continueRemoveTiles) {
        if (window.confirm('Remove all the tiles?')) {
            continueRemoveTiles();
        }
    },
    minZoom: 0,
    maxZoom: 21
});
var offlineControlOSM = L.control.offline(osm, tilesDb, {
    saveButtonHtml: '<img src="images/download.png" width=15px ; height=15px>',
    removeButtonHtml: '<img src="images/bin.png" width=15px ; height=15px>',
    //  icon: '<img src="images/OSM.png" width=50px ; height=50px>',
    confirmSavingCallback: function(nTilesToSave, continueSaveTiles) {
        if (window.confirm('Save ' + nTilesToSave + '?')) {
            continueSaveTiles();
        }
    },
    confirmRemovalCallback: function(continueRemoveTiles) {
        if (window.confirm('Remove all the tiles?')) {
            continueRemoveTiles();
        }
    },
    minZoom: 0,
    maxZoom: 21
});

var planetScopeMonthlyMosaic = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_2020_12_mosaic/gmap/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
  attribution: 'Leaflet | PlanetScope Imagery  Jan 2021'
  })

  var planetScopeMonthlyMosaicDec = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_2020_12_mosaic/gmap/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
    attribution: 'Leaflet | PlanetScope Imagery  December 2020'
    })
  var planetScopeMonthlyMosaicNov = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_2020_11_mosaic/gmap/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
    attribution: 'Leaflet | PlanetScope Imagery  November 2020'
    })
  var planetScopeMonthlyMosaicOct = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_2020_10_mosaic/gmap/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
    attribution: 'Leaflet | PlanetScope Imagery  October 2020'
    })
  var planetScopeMonthlyMosaicSept = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_2020_09_mosaic/gmap/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
    attribution: 'Leaflet | PlanetScope Imagery  September 2020'
    })
  var planetScopeMonthlyMosaicDec2019 = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_2019_12_mosaic/gmap/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
    attribution: 'Leaflet | PlanetScope Imagery  December 2019'
    })
  var planetScopeMonthlyMosaicJan2019 = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_2019_01_mosaic/gmap/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
    attribution: 'Leaflet | PlanetScope Imagery  January 2019'
    })

// ///////////// messages for tileS download   (NOT USED CURRENTLY)     /////////
// googleSat.on('offline:save-start', function(data) {
//     //console.log('Saving ' + data.nTilesToSave + ' tiles.');
// });
// googleSat.on('offline:save-end', function() {
//     alert('All the tiles were saved.');
// });
// googleSat.on('offline:save-error', function(err) {
//     //console.error('Error when saving tiles: ' + err);
// });
// googleSat.on('offline:remove-start', function() {
//     //console.log('Removing tiles.');
// });
// googleSat.on('offline:remove-end', function() {
//     alert('All the tiles were removed.');
// });
// googleSat.on('offline:remove-error', function(err) {
//     //console.error('Error when removing tiles: ' + err);
// });
// googleSat.on('offline:below-min-zoom-error', function() {
//     alert('Can not save tiles below minimum zoom level.');
// });
// ////////////////
//
// osm.on('offline:save-start', function(data) {
//     //console.log('Saving ' + data.nTilesToSave + ' tiles.');
// });
// osm.on('offline:save-end', function() {
//     alert('All the tiles were saved.');
// });
// osm.on('offline:save-error', function(err) {
//     //console.error('Error when saving tiles: ' + err);
// });
// osm.on('offline:remove-start', function() {
//     //console.log('Removing tiles.');
// });
// osm.on('offline:remove-end', function() {
//     alert('All the tiles were removed.');
// });
// osm.on('offline:remove-error', function(err) {
//     //console.error('Error when removing tiles: ' + err);
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
    var iconGPS = '<img src="images/gpsOff.png" width=40px; height=40px; loading="lazy" text-align="center" style="top:50%; margin-left:-5px" > ';
    var iconOSM = '<img src="images/osm.png" width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-top:2px; margin-left:-5px" > ';
    var iconGOOGLE = '<img src="images/google.png" width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-5px" > ';
    var iconPLANET = '<img src="images/google.png" width=35px; height=35px; loading="lazy" text-align="center" style="top:50%;margin-top:2px;margin-left:-3px" > ';
    var iconLAYERS = '<img src="images/myLayer.png" width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-6px" > ';
    var iconFILTER = '<img src="images/filterIcon.png" width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-6px;margin-bottom:2px" > ';
    var iconRANDOM = '<img src="images/gps.png" width=40px; height=40px; loading="lazy" text-align="center" style="top:50%" > ';

} else {
    var iconGPS = '<img src="images/gpsOff.png" width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;"> ';
    var iconOSM = '<img src="images/osm.png" width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-top:2px" > ';
    var iconGOOGLE = '<img src="images/google.png" width=40px; height=40px; loading="lazy" text-align="center" style="top:50%"> ';
    var iconPLANET = '<img src="images/google.png" width=35px; height=35px; loading="lazy" text-align="center" style="top:50%;margin-top:2px"> ';
    var iconLAYERS = '<img src="images/myLayer.png" width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-1px" > ';
    var iconFILTER = '<img src="images/filterIcon.png" width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-1px;margin-bottom:2px" > ';
    var iconRANDOM = '<img src="images/gps.png" width=40px; height=40px; loading="lazy" text-align="center" style="top:50%" > ';
}
var basemapOn = 'googleSat'

//to show the clock when map loads for first time
// document.getElementById("Alert").style.fontSize = "25px";
// document.getElementById('Alert').innerHTML = '⌛'
// document.getElementById("Alert").style.display = 'initial'
document.getElementById("MapLoading").style.display = 'initial'

// to show the clock while tiles are loading when zoom in/out, not only when toggling the basemap
//everytime the user zoomIn/Out or pan, the clock is shown, and only disapear when tiles are loaded


// map.on('zoomend', function(){
//   console.log("map zoomed in/out")
//   document.getElementById("Alert").style.fontSize = "25px";
//   document.getElementById('Alert').innerHTML = '⌛'
//   document.getElementById("Alert").style.display = 'initial'
// })
// map.on('moveend', function(){
//   console.log("map panned")
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
//       console.log("tile requestedddddddddddd") //time to avoid showing the clock for miliseconds if map loads fast
//       document.getElementById("Alert").style.fontSize = "25px";
//       document.getElementById('Alert').innerHTML = '⌛'
//       document.getElementById("Alert").style.display = 'initial'
//       osmloaded = false
//     }
//   },600)
//   return osmloaded
// });
// googleSat.on("loading",function() {
//     console.log("tile requested")
//     document.getElementById("Alert").style.fontSize = "25px";
//     document.getElementById('Alert').innerHTML = '⌛'
//     document.getElementById("Alert").style.display = 'initial'
// });
// planetScopeMonthlyMosaic.on("loading",function() {
//     console.log("tile requested")
//     document.getElementById("Alert").style.fontSize = "25px";
//     document.getElementById('Alert').innerHTML = '⌛'
//     document.getElementById("Alert").style.display = 'initial'
// });


osm.on("load",function() {
  console.log("all visible osm tiles have been loaded")
  // clearInterval(intervalOsm)
  // document.getElementById("Alert").style.display = 'none'
  document.getElementById("MapLoading").style.display = 'none'

  // osmloaded = true
  // return osmloaded
});
googleSat.on("load",function() {
 console.log("all visible google tiles have been loaded")
 // document.getElementById("Alert").style.display = 'none'
 document.getElementById("MapLoading").style.display = 'none'
});
planetScopeMonthlyMosaic.on("load",function() {
  console.log("all visible planet tiles have been loaded")
  // document.getElementById("Alert").style.display = 'none'
  document.getElementById("MapLoading").style.display = 'none'
  document.getElementById("Alert").style.fontSize = "15px";
  document.getElementById('Alert').innerHTML = '<br>🕑<br>☀️🌙'
  document.getElementById("Alert").style.display = 'initial'
});

// demo.on('click',function(){
//   document.getElementById("Alert").style.fontSize = "15px";
//   document.getElementById('Alert').innerHTML = '⌛'
//   document.getElementById("Alert").style.display = 'initial';
// })

planetScopeMonthlyMosaicDec.on("load",function() {
  console.log("all visible planet tiles have been loaded")
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.fontSize = "15px";
  document.getElementById('Alert').innerHTML = '<br>30<br>☀️🌙'
  document.getElementById("Alert").style.display = 'initial'});
planetScopeMonthlyMosaicNov.on("load",function() {
  console.log("all visible planet tiles have been loaded")
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.fontSize = "15px";
  document.getElementById('Alert').innerHTML = ' <br>60<br>☀️🌙'
  document.getElementById("Alert").style.display = 'initial'
});
planetScopeMonthlyMosaicOct.on("load",function() {
  console.log("all visible planet tiles have been loaded")
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.fontSize = "15px";
  document.getElementById('Alert').innerHTML = ' <br>90<br>☀️🌙'
  document.getElementById("Alert").style.display = 'initial'
});
planetScopeMonthlyMosaicSept.on("load",function() {
  console.log("all visible planet tiles have been loaded")
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.fontSize = "15px";
  document.getElementById('Alert').innerHTML = ' <br>120<br>☀️🌙'
  document.getElementById("Alert").style.display = 'initial'
});
planetScopeMonthlyMosaicDec2019.on("load",function() {
  console.log("all visible planet tiles have been loaded")
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.fontSize = "15px";
  document.getElementById('Alert').innerHTML = '<br>150<br>☀️🌙'
  document.getElementById("Alert").style.display = 'initial'
});
planetScopeMonthlyMosaicJan2019.on("load",function() {
  console.log("all visible planet tiles have been loaded")
  document.getElementById("MapLoading").style.display = 'none'

  document.getElementById("Alert").style.fontSize = "15px";
  document.getElementById('Alert').innerHTML = '<br>365<br>☀️🌙'
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
          // document.getElementById("Alert").style.fontSize = "25px";
          // document.getElementById('Alert').innerHTML = '⌛'
          // document.getElementById("Alert").style.display = 'initial'
          document.getElementById("MapLoading").style.display = 'initial'

            //clickButtonCount += 1;
            // document.getElementById('imageryAlert').style.display = 'none'
            mapCurrentZoom = map.getZoom();
           // console.log('zoom1', mapCurrentZoom)
            if(mapCurrentZoom >19){
              map.setZoom(19)//because OSM does not provide tiles beyond zoom 19
              mapCurrentZoom = map.getZoom();
            // console.log('zoom2', mapCurrentZoom)
            }

            googleSat.removeFrom(map);
            map.options.maxZoom = 19; //Set max zoom level as OSM does not serve tiles with 20+ zoom levels
            map.options.minZoom = 2;
            osm_Button.removeFrom(map);
            planet_Button.addTo(map);
            myLayer_Button.addTo(map) //keep this, otherwise the button moves up
            filter_Button.addTo(map);
            try{
              osm.addTo(map);

              osm.on("load",function() {

                console.log("all visible osm tiles have been loaded")
                // document.getElementById("Alert").style.display = 'none'
                document.getElementById("MapLoading").style.display = 'none'

               });

            }catch{console.log('error loading osm tiles')}


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
            myLayer_Button.addTo(map) //keep this, otherwise the button moves up
            if(isOnline == true){
            filter_Button.addTo(map);
            }


            try{
              removeAllimagery()
              googleSat.addTo(map);
              osm.removeFrom(map);

              googleSat.on("load",function() {

                console.log("all visible google tiles have been loaded")
                // document.getElementById("Alert").style.display = 'none'
                document.getElementById("MapLoading").style.display = 'none'

             });

            }catch{console.log('error loading google tiles')}

            basemapOn = 'googleSat'



            return basemapOn;
        }
    }]
});

googleSat_Button.button.style.width = '50px';
googleSat_Button.button.style.height = '50px';
googleSat_Button.button.style.transitionDuration = '.3s';
googleSat_Button.button.style.backgroundColor = 'black';

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


            /////////////////////// to load planet tiles manually  /////////////
            document.getElementById('myRange').style.display = 'initial'
            document.getElementById("Alert").style.fontSize = "15px";
            document.getElementById('Alert').innerHTML = '<br>🕑<br>☀️🌙'
            document.getElementById("Alert").style.display = 'initial'

            setInterval(checkSliderPosition,200)

            clickButtonCount = 0;
            //to avoid black tiles as sentinel API does not serves tiles above 10 (or perhaps yes), then zoom back to 10 again
            map.options.maxZoom = 17; //no need for more zoom levels as 'low' resolution
            map.options.minZoom = 2;

            planet_Button.removeFrom(map);
            googleSat_Button.addTo(map);
            //to zoom out if previous map zoom is higher than 17
            mapCurrentZoom = map.getZoom();
            // console.log('zoom1', mapCurrentZoom)
            if(mapCurrentZoom >17){
              map.setZoom(17)//because OSM does not provide tiles beyond zoom 19
              mapCurrentZoom = map.getZoom();
            // console.log('zoom2', mapCurrentZoom)
            }
            // googleSat.removeFrom(map);
            osm.removeFrom(map);
            try{
              planetScopeMonthlyMosaic.addTo(map);
              planetScopeMonthlyMosaic.on("load",function() {

                console.log("all visible planet tiles have been loaded")
                // document.getElementById("Alert").style.display = 'none'
                document.getElementById("MapLoading").style.display = 'none'

               });

            }catch{console.log('error loading planet tiles')}

          //  planet.addTo(map); // planet imagery goes after so it stays on top of sentinel data (sentinel is global, planet is not yet?)
            myLayer_Button.addTo(map) //keep this, otherwise the button moves up
            if(isOnline == true){
            filter_Button.addTo(map);
            }
            basemapOn = 'planet'
          return basemapOn
        }
    }]
});

planet_Button.button.style.width = '50px';
planet_Button.button.style.height = '50px';
planet_Button.button.style.transitionDuration = '.3s';
planet_Button.button.style.backgroundColor = 'black';



//imagery Slider


  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  slider.value = 100; // Display the default slider value
  var removeAllimagery = function(){
    planetScopeMonthlyMosaic.removeFrom(map);
    planetScopeMonthlyMosaicDec.removeFrom(map);
    planetScopeMonthlyMosaicNov.removeFrom(map);
    planetScopeMonthlyMosaicOct.removeFrom(map);
    planetScopeMonthlyMosaicSept.removeFrom(map);
    planetScopeMonthlyMosaicDec2019.removeFrom(map);
    planetScopeMonthlyMosaicJan2019.removeFrom(map);
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
   console.log(output.innerHTML)

  // Update the current slider value (each time you drag the slider handle)
  var x = output.innerHTML
  slider.oninput = function() {
    output.innerHTML = this.value;

      switch (true) {
          case (output.innerHTML > 87):
              this.value = 100
              removeAllimagery()
              planetScopeMonthlyMosaic.addTo(map)
              console.log(output.innerHTML)
              // document.getElementById("Alert").style.fontSize = "25px";
              // document.getElementById('Alert').innerHTML = '<br>⌛'
              document.getElementById("MapLoading").style.display = 'initial'

              break
          case (output.innerHTML == 1):
              this.value == 1
              removeAllimagery()
              planetScopeMonthlyMosaicJan2019.addTo(map)
              console.log(output.innerHTML)
              // document.getElementById("Alert").style.fontSize = "15px";
              // document.getElementById('Alert').innerHTML = '<br>1/2019 '
              // document.getElementById("Alert").style.fontSize = "25px";
              // document.getElementById('Alert').innerHTML = '<br>⌛'
              document.getElementById("MapLoading").style.display = 'initial'
              break
          case (output.innerHTML < 10):
              this.value = 5 // this is to locate the circle in a specific position
              removeAllimagery()
              planetScopeMonthlyMosaicDec2019.addTo(map)
              console.log(output.innerHTML)
              // document.getElementById("Alert").style.fontSize = "15px";
              // document.getElementById('Alert').innerHTML = '<br>12/2019 '
              // document.getElementById("Alert").style.fontSize = "25px";
              // document.getElementById('Alert').innerHTML = '<br>⌛'
              document.getElementById("MapLoading").style.display = 'initial'
              break
          case (output.innerHTML < 25):
              this.value = 17
              removeAllimagery()
              planetScopeMonthlyMosaicSept.addTo(map)
              console.log(output.innerHTML)
              // document.getElementById("Alert").style.fontSize = "15px";
              // document.getElementById('Alert').innerHTML = '<br>9/2020 '
              // document.getElementById("Alert").style.fontSize = "25px";
              // document.getElementById('Alert').innerHTML = '<br>⌛'
              document.getElementById("MapLoading").style.display = 'initial'
              break
          case (output.innerHTML < 50):
              this.value = 37
              removeAllimagery()
              planetScopeMonthlyMosaicOct.addTo(map)
              console.log(output.innerHTML)
              // document.getElementById("Alert").style.fontSize = "15px";
              // document.getElementById('Alert').innerHTML = '<br>10/2020 '
              // document.getElementById("Alert").style.fontSize = "25px";
              // document.getElementById('Alert').innerHTML = '<br>⌛'
              document.getElementById("MapLoading").style.display = 'initial'
              break
          case (output.innerHTML < 75):
              this.value = 62
              removeAllimagery()
              planetScopeMonthlyMosaicNov.addTo(map)
              console.log(output.innerHTML)
              // document.getElementById("Alert").style.fontSize = "15px";
              // document.getElementById('Alert').innerHTML = '<br>11/2020 '
              // document.getElementById("Alert").style.fontSize = "25px";
              // document.getElementById('Alert').innerHTML = '<br>⌛'
              document.getElementById("MapLoading").style.display = 'initial'
              break
          case (output.innerHTML < 87):
              this.value = 87
              removeAllimagery()
              planetScopeMonthlyMosaicDec.addTo(map)
              console.log(output.innerHTML)
              // document.getElementById("Alert").style.fontSize = "15px";
              // document.getElementById('Alert').innerHTML = '<br>12/2020 '
              // document.getElementById("Alert").style.fontSize = "25px";
              // document.getElementById('Alert').innerHTML = '<br>⌛'
              document.getElementById("MapLoading").style.display = 'initial'
              break
          default:
              removeAllimagery()
              planetScopeMonthlyMosaic.addTo(map)
              console.log(output.innerHTML)
              break
      }
    }

}

var myLayerIsOn = true;

var whichLayerIsOn = 'deflated';
var featureSent;
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
                    // console.log('which layer is on', whichLayerIsOn)
          // console.log('localStorageLayer', localStorageLayer)
            // console.log(localStorage)
            // console.log(groupGeoJSON)
            //  deflated.removeFrom(map)
            // whichLayerIsOn = 'deflated'
            if (whichLayerIsOn == 'deflated' && localStorageLayer != null) {
                deflated.removeFrom(map)
                if (localStorageLayer != null) {
                  console.log('local storage is not null')
                    localStorageLayer.addTo(map)
                }
                if (finalLayer != null) {
                    finalLayer.addTo(map)
                }
                whichLayerIsOn = 'localStorage'
                myLayer_Button.button.style.backgroundColor = '#43ACF0';
                filter_Button.button.style.opacity = '0.4';
                filter_Button.button.disabled = true;

            } else if (whichLayerIsOn == 'deflated' && localStorageLayer == null) { // to avoid three click when localstorage is limited on first load
                whichLayerIsOn = 'none'
                deflated.removeFrom(map)
                filter_Button.button.style.opacity = '0.4';
                filter_Button.button.disabled = true;
                myLayer_Button.button.style.backgroundColor = 'white'

            } else if (whichLayerIsOn == 'localStorage') {
                if (localStorageLayer != null) {
                    localStorageLayer.removeFrom(map)
                }
                whichLayerIsOn = 'none'
                //  localStorageLayer.addTo(map)
                if (finalLayer != null) {
                    finalLayer.removeFrom(map)
                }
                myLayer_Button.button.style.backgroundColor = 'white'
                filter_Button.button.style.opacity = '0.4';
                filter_Button.button.disabled = true;

            } else if (whichLayerIsOn == 'none') {
                whichLayerIsOn = 'deflated'
                if (finalLayer != null) {
                    finalLayer.removeFrom(map)
                }
                if(isOnline == false){
                  myLayer_Button.button.style.backgroundColor = '#43ACF0'
                  filter_Button.button.style.opacity = '0.4';
                  filter_Button.button.disabled = true;
                  }else{
                    deflated.addTo(map);
                    myLayer_Button.button.style.backgroundColor = 'black'
                    filter_Button.button.style.opacity = '1';
                    filter_Button.button.disabled = false;
                  }

               if (featureSent == true) { //to update the carto layer with recently created feature. This is fired after DB update has been checked

                  sqlQuery = "SELECT cartodb_id, the_geom, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date, commentone, commentoneaudioavailable FROM lumblu ORDER BY cartodb_id DESC LIMIT 1"
                  getGeoJSON()
                  featureSent = false
              }
            }
          return featureSent
        }
    }]
})

myLayer_Button.button.style.width = '50px';
myLayer_Button.button.style.height = '50px';
myLayer_Button.button.style.transitionDuration = '.3s';
myLayer_Button.button.style.backgroundColor = 'black';
//myLayer_Button.addTo(map); //always on as there will always be features in the map, even when first load

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
          emojiRequest()
          document.getElementById("backDeleteFeature").style.display = "none";
          document.getElementById("deleteFeature").style.display = 'none';
          document.getElementById("goBackMessagingApps").style.display = "none";
          document.getElementById("whatsApp").style.display = "none";
          document.getElementById("telegram").style.display = 'none';
          document.getElementById("weChat").style.display = "none";
          document.getElementById("shareMessagingApp").style.display = "none";
          document.getElementById("randomSuggestion").style.display = "none";

          if(filterIsOn == false){
            startCheckAttrDateContent = setInterval(checkAttrDateContent,300)
            console.log('filterisonfalse')
            filterIsOn = true
            myLayer_Button.button.style.opacity = '0.4';
            myLayer_Button.button.disabled = true;
            // gps_Button.button.style.opacity = '0.4';
            // gps_Button.button.disabled = true;
            filter_Button.button.style.backgroundColor = 'white';

            document.getElementById("tutorial").style.display = "none";
            document.getElementById("polygon").style.display = "none";
            document.getElementById("polyline").style.display = "none";
            document.getElementById("point").style.display = "none";

            if(filterApplied == true){
              console.log('filterisonfalse')

              document.getElementById("clearFilter").style.opacity = '1'
              document.getElementById("clearFilter").disabled = false
            }else{
              document.getElementById("clearFilter").style.opacity = '0.4'
              document.getElementById("clearFilter").disabled = true
            }
            document.getElementById("clearFilter").style.display = "initial";
            document.getElementById("applyFilter").style.display = "initial";
            document.getElementById("applyFilter").style.opacity = '0.4'
            document.getElementById("applyFilter").disabled = true
            document.getElementById("filterByDate").style.display = "initial";
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
            clearInterval(startCheckAttrDateContent)
            console.log('filterisontrue')

            filterIsOn = false
            myLayer_Button.button.style.opacity = '1';
            myLayer_Button.button.disabled = false;
            filter_Button.button.style.opacity = '1';
            filter_Button.button.disabled = false;

            if(filterApplied == true){ //to avoid that if dilterby date is all, color is not green
              filter_Button.button.style.backgroundColor = 'green'

            }else{
              filter_Button.button.style.backgroundColor = 'black'
              document.getElementById("Alert").style.display = 'none'
            }

            document.getElementById("tutorial").style.display = "initial";
            document.getElementById("polygon").style.display = "initial";
            document.getElementById("polyline").style.display = "initial";
            document.getElementById("point").style.display = "initial";

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


var checkAttrDateContent = function(){

  boxContentFiltering = document.getElementsByClassName('emojionearea-editor')[0].innerHTML
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
//filter_Button.addTo(map);
if(isOnline == false){
  filter_Button.button.style.opacity = '0.4';
  filter_Button.button.disabled = true;
}



////////////////////////////////   GNSS  //////////////////////////////////////
var gpsIcon = L.icon({
    iconUrl: 'images/man.png',
    //  shadowUrl: 'leaf-shadow.png',

    iconSize: [30, 30], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// // add location via browser geolocation
// var currentLocation = []; // variable created to allow the user recenter the map
// var accuracy = 0
// var markerAdded = false; // var to avoid multiple markers

function findBuffer(position) {
    //  L.marker([lat, lng],{icon:gpsIcon}).removeFrom(map);
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    accuracy = position.coords.accuracy;
    //console.log(accuracy)
    if (markerAdded == false) {
        // L.marker([lat, lng],{icon:gpsIcon}).addTo(map);
        markerAdded = true;
    }
    currentLocation = [lat, lng];

    return currentLocation & markerAdded & accuracy;
}

//////////////////////////////////////activate gps///////////////////////////////////////////

//console.log(currentLocation[0])

// var locationFound = false;
// var audioRecorded = false;
// var circleGT250
// var circleLT250
// var circleLT250Added = false
// var circleGT250Added = false

// if(isFirstTime == true || pageLoaded == true){
var startSearchingLocation = function(){
var refreshGPSbutton = setInterval(function() { ///////////////////////////////////////// function to keep searching for gps position
  //console.log('refreshgpsbutton')
  if(localStorage.getItem('pwCorrect')){

    try {
        navigator.geolocation.watchPosition(findBuffer);
    } catch (err) {
        currentLocation == null;
    }
    //if location found, then set button color, and create circle or add marker if <50m
    if (currentLocation[0] != null) {
        localStorage.setItem('lastPositionStoredLOCALLY', currentLocation)
        locationFound = true
        //once the position has been found, we stop checking if the user deactivates again (the position will be recorded anyway)
        if (accuracy <= 50) {

            gps_Button.button.style.backgroundColor = 'green';
            //to change the icon of the Easybutton based on accuracy... (first gif then static image)

            if (isIOS == true) {
              document.getElementById('gps').innerHTML = '<img src="images/gps.png" text-align="center" width=40px; height=40px style="top:50%; margin-top:1px; margin-left:-5px" > '
            }else{
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" text-align="center" width=40px; height=40px;" > '
            }

            var gpsIconIntermitent = setTimeout(function() {
              if (isIOS == true) {
                document.getElementById('gps').innerHTML = '<img src="images/gps.png" text-align="center" width=40px; height=40px style="top:50%; margin-top:1px; margin-left:-5px" " > '
              }else{
                document.getElementById('gps').innerHTML = '<img src="images/gps.png" text-align="center" width=40px; height=40px; " > '
              }
            },6400) // time required for three repetitions of the gif

            clearInterval(refreshGPSbutton) //stop searching once accuracy <50
            L.marker(currentLocation, {
                icon: gpsIcon,
                draggable:false
            }).addTo(map);

        } else if (accuracy > 50 && accuracy <= 250) {

            gps_Button.button.style.backgroundColor = 'yellow';
            if (isIOS == true) {
              document.getElementById('gps').innerHTML = '<img src="images/gps.png" text-align="center" width=40px; height=40px style="top:50%; margin-top:1px; margin-left:-5px"" > '
            }else{
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" text-align="center" width=40px; height=40px; " > '
            }            //if accuracy >50, keep searching
            try {
                navigator.geolocation.watchPosition(findBuffer);
            } catch (err) {
                currentLocation == null;
            }
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
            if (isIOS == true) {
              document.getElementById('gps').innerHTML = '<img src="images/gps.png" text-align="center" width=40px; height=40px style="top:50%; margin-top:1px; margin-left:-5px" " > '
            }else{
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" text-align="center" width=40px; height=40px; " > '
            }
            try {
                navigator.geolocation.watchPosition(findBuffer);
                ////console.log(currentLocation[0])
            } catch (err) {
                currentLocation == null;
            }
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
        gps_Button.button.style.backgroundColor = 'red';
        if (isIOS == true) {
          document.getElementById('gps').innerHTML = '<img src="images/gpsOff.png" text-align="center" width=40px; height=40px style="top:50%; margin-top:1px; margin-left:-5px" > '
        }else{
          document.getElementById('gps').innerHTML = '<img src="images/gpsOff.png" text-align="center" width=40px; height=40px; > '
        }
        try {
            navigator.geolocation.watchPosition(findBuffer);
        } catch (err) {
            currentLocation == null;
        }
    }
    return currentLocation & circleLT250Added & circleGT250Added & circleLT250 & circleGT250;
  }
}, 1000)
}

//console.log(currentLocation[0]d)
var gps_Button = L.easyButton({
    id: 'gps',
    position: 'topleft',
    states: [{
        icon: iconGPS,
        stateName: 'check-mark',
        onClick: function(btn, map) {
            try {
                navigator.geolocation.watchPosition(findBuffer);
            } catch (err) {
                currentLocation == null;
            }
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


                if (accuracy <= 50) {
                  //  gps_Button.button.style.backgroundColor = 'green';
                  //  gps_Button.button.src = 'images/gpsSearching.gif';
                    map.setView(currentLocation, 15);
                    //console.log(currentLocation)

                } else if (accuracy > 50 && accuracy <= 250) {
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
                document.getElementById('gps').src = 'images/gpsOff.png'
                try{
                  navigator.geolocation.watchPosition(findBuffer);
                }catch(e){}


            }
        }
    }]
});

gps_Button.button.style.width = '50px';
gps_Button.button.style.height = '50px';
gps_Button.button.style.transitionDuration = '.3s';
gps_Button.button.style.backgroundColor = 'red';
//gps_Button.addTo(map);



var rose = L.control.rose('rose', {
    position: 'topleft',
    icon: 'nautical',
    iSize: 'medium',
    opacity: 1
})//.addTo(map)
document.getElementById('rose').style.marginBottom = '5px' // to avoid extra margin, visible when offline buttons appear

// script to show the download tiles buttons (10clicks) and/or reload cartolayer (5clicks)
var clicksRose = 0
document.getElementById('rose').onclick = function(e){
    clicksRose += 1;
    // console.log(clicksRose)
    //this is to avoid zoom in with doubleClick if rose is clicked too quickly
    map.doubleClickZoom.disable();
    setTimeout(function(){
      map.doubleClickZoom.enable();

    },200)

      if(clicksRose == 3){ //this is to refresh the carto layer
        document.getElementById("Alert").style.fontSize = "40px";
        document.getElementById('Alert').innerHTML = '<br>⌛'
        document.getElementById("Alert").style.display = 'initial'
        setTimeout(function(){ //we delay count 0 in case user want to download tiles. count to 0 after 10secs for next time user want to reload cartolayer
          if(clicksRose < 5){ //this is to check that the user actually want to click 5 times, not 10
            document.getElementById("Alert").style.display = 'none'
            console.log('refreshed')
            deflated.removeLayer(cartoGeometries)
            getGeoJSON()
          clicksRose = 0;
        }
        },2000)
      }
      if(clicksRose == 10){ //this is to show the download tiles buttons
        clicksRose = 0;
        offlineControlGoogle.addTo(map);
        offlineControlOSM.addTo(map);
      }

      setTimeout(function(){ //this is to refresh click counts, so they don't accumulate
        clicksRose = 0;
      },20000)

  return clicksRose
}


/////////////////////////////////////       CARTO    ADD TO MAP   //////////////////////////////////////////////

var clusters = L.markerClusterGroup({
    animate: true,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true,
    animateAddingMarkers: true,
});


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


function getGeoJSON() {
    $.getJSON({
      cache:false,
      success:cartoGeoJSONLayer,
      url:"https://" + cartousername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + sqlQuery + cartoapiSELECT
    })
    return cartoLoaded && cartoIdFeatureSelected && selectedFeature && cartoGeometries;
};

//function to activate carto layer once feature has been submitted successfully. It's fired when the share-world button is clicked
var postSuccess = function(){
  if(pURL[0] == 'I'){ // to refer to Insert (I), not Delete!

      //interval to check if #rows in carto layers after sent has incremented compared to when carto layer is loaded initially
      var intervalCheckAndAddNewDeflated = setInterval(function(){
          //function  to check number of items in cartodb after GET request
            var getTotalFeaturesInDBAfterSent;
            var countRowsInDB = function(data){
              getTotalFeaturesInDBAfterSent = data.rows[0].count //to count the number of rows in the array returned

              if(getTotalFeaturesInDBAfterSent != getTotalFeaturesInDB){ //if it's equal then we refresh (click layers button) until is different, then query SELECT last
                //script to load the carto layer after sent, depending on which layer is on and if local storage or not
                if(localStorageLayer == null){
                    if(whichLayerIsOn == 'deflated'){
                      document.getElementById('myLayerButton').click()
                      document.getElementById('myLayerButton').click()
                    }else if(whichLayerIsOn == 'none'){
                      document.getElementById('myLayerButton').click() // because first time app is used mylayer_button has only two positions (local storage is empty)
                    }
                }

                if(localStorageLayer != null){
                  if(whichLayerIsOn == 'deflated'){
                    document.getElementById('myLayerButton').click()
                    document.getElementById('myLayerButton').click()
                    document.getElementById('myLayerButton').click()

                  }else if(whichLayerIsOn == 'localStorage'){
                    document.getElementById('myLayerButton').click()
                    document.getElementById('myLayerButton').click()
                  }else if(whichLayerIsOn == 'none')
                  document.getElementById('myLayerButton').click()

                }
              clearInterval(intervalCheckAndAddNewDeflated)
              }
            }
            //request to check when feature has reached the DB
            $.get({
              cache:false,
              success:countRowsInDB,// if success the function above is called
              url:"https://" + cartousername + ".cartodb.com/api/v2/sql?q=" + "SELECT COUNT(cartodb_id) FROM lumblu" + cartoapiSELECT
            })

       },500)
   }
}

// Send data to  PHP using a jQuery Post method
var submitToProxy = function(q) {
    $.post("./callProxy.php", { //
        qurl: q,
        // geojson:data,
        cache: false,
        timeStamp: new Date().getTime(),
        success:postSuccess()
    });
};
var pURL
//this function is called both when feature is deleted or feature is created and sent.
function setData() {
    //console.log("setdata function called");
    if (cartoIdFeatureSelected != null && created == false && clickCountDeleteButton == 1) { //TO DELETE THE SELECTED FEATURE FROM THE CARTO DB
        pURL = "DELETE FROM lumblu WHERE cartodb_id='" + cartoIdFeatureSelected + "'";
        clickCountDeleteButton = 0
        cartoIdFeatureSelected = null
        console.log(pURL)

    }else if (cartoIdFeatureSelected != null && created == false && editButtonClicked == true){ //TO INSERT COMMENT IN EXISTING FEATURE
      console.log('set data called')
      console.log(contentInTextbox)
      console.log(audioComment)
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


        console.log(pURL)
    }
    else { //TO INSERT THE CREATED FEATURE INTO THE CARTO DB
        dataGeometry = data.features[0].geometry
        //console.log(dataGeometry)
        var dataGeometryString = JSON.stringify(dataGeometry)
        //console.log(dataGeometryString)
        var commentAudioDefault = '.'
        var sql = "INSERT INTO lumblu (the_geom, randomid, landuses, landusesemoji, audioavailable, areapolygon, lengthline, timespent, distance, geometrystring, screensize, date, commentoneaudioavailable) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('";
        var sql2 = dataGeometryString;
        var sql3 = "'),4326),'" + randomID + "','" + landUses + "','" + landUsesEmoji + "','" + audioAvailable + "','" + areaPolygon + "','" + lengthLine + "','" + timeSpendSeconds + "','" + dist_m_Participant_Feature + "','" + dataGeometryString + "','" + screensize + "','" + dateTime + "','" + commentAudioDefault + "')";
        pURL = sql + sql2 + sql3;
        console.log(pURL)

    }

    ////console.log(pURL)
    submitToProxy(pURL);
    //console.log("Feature has been submitted to the Proxy");
    return pURL && editButtonClicked && clickCountDeleteButton
};

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

document.getElementById("Download").style.display = "none";
document.getElementById("Cancel").style.display = "none";
document.getElementById("DownloadButton").style.display = "none";

document.getElementById('record').style.display = 'none';
document.getElementById('enableRecording').style.display = 'none';
document.getElementById('activatePlay').style.opacity = '0';

document.getElementById('storeAudio').style.display = 'none';
document.getElementById('gum').style.display = 'none';
document.getElementById('recorded').style.display = 'none';
document.getElementById('echoCancellation').style.display = 'none';
document.getElementById('voice').style.display = 'none';
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

document.getElementById("tutorial").onclick = function(e) {
    mapCurrentBounds = map.getBounds();
    mapCurrentZoom = map.getZoom();
    mapCurrentCenter = map.getCenter();
    setTimeout(function() {
        // document.getElementById('imageryAlert').style.display = 'none'
        window.location.href = 'pages/tutorial.html';
        document.body.style.backgroundColor = "black";
        document.getElementById("map").style.display = "none";
        document.getElementById("tutorial").style.display = "none";
        document.getElementById("polygon").style.display = "none";
        document.getElementById("polyline").style.display = "none";
        document.getElementById("point").style.display = "none";
    }, 200)
    return mapCurrentBounds & mapCurrentZoom & mapCurrentCenter
}
///////////////////////////////////////////draw screen////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////
//functions to move map up/down when emoji menu is opened/closed ONLY IN 'SMALL' SCREENS. The funciton is called in emojionearea.js
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var screenwidth = screen.width
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

    tempLayer.removeFrom(map);

    function onEachFeatureConfirm(feature, layer) {

        //console.log(document.getElementsByClassName('emojionearea-editor').innerText)
        refreshPopup = setInterval(function() {
            //the problem with document.getElementById('emojionearea').value is that it only updates when the text box is not selected, which is as issue. TextContent methodworks
            //well, except that it does not capture emojis
            var emojioneareaeditor = document.getElementsByClassName('emojionearea-editor')
          //  //console.log(emojioneareaeditor)
            var emojioneareaeditor0 = emojioneareaeditor[0]
          //  //console.log(emojioneareaeditor0)
            var emojioneareaeditor0innerHTML = emojioneareaeditor0.innerHTML /////////////////////////////////////////////11111111111111111111111ddddddddddddddddddddddddddddddESTE!!!
          //  //console.log(emojioneareaeditor0innerHTML)

        //    //console.log(emojioneareaeditor[0].textContent.lenght)
            if (emojioneareaeditor0innerHTML.length == 0) { //to show '...' while the textbox is empty of characters (both letter and emojis)
                layer.bindPopup(popupContent).addTo(map);
                layer.bindPopup(popupContent).openPopup(); ///automatically shows the pop up!
              //  //console.log('innerhtml is null')

                if (audioRecorded == false) {
                    document.getElementById("share-download").style.opacity = "0.35"; //to disable button until user adds attributes, either with audio or text
                    document.getElementById("share-download").disabled = true;
                }
            } else {
                layer.bindPopup(emojioneareaeditor0innerHTML).addTo(map);
                layer.bindPopup(emojioneareaeditor0innerHTML).openPopup(); ///automatically shows the pop up!
              //  //console.log('innerhtml is not null')
                document.getElementById("share-download").style.opacity = "1"; //to disable button until user adds attributes, either with audio or text
                document.getElementById("share-download").disabled = false;
            }
        }, 300) // time frequency to refresh the content in the popup
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
  //  //console.log(tempLayer)
    return tempLayer && refreshPopup
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////function for pop ups//////////
function onEachFeature(feature, layer) {
    //timeout is used to wait 1000ms until the download link is ready
    setTimeout(function() {
        var audioLinkText = '🔊 AUDIO'
        //conditions to avoid showing audio link if no audio has been recorded
        if (isIOS == false && recordedBlobs != null) {
            if (isOnline == true) { //condition to only hyperlink the audiolinktext if online
                clickableFinalUrlAudio = audioLinkText.link(finalUrlAudio)
                var popupContent = feature.properties.landUsesEmoji + '</br>' + '</br>' + '⏳...' + clickableFinalUrlAudio; //+ '    ' +dateTimeRandomID
            } else {
                var popupContent = feature.properties.landUsesEmoji + '</br>' + '</br>' + '⏳...' + 'AUDIO';
            }
        } else {
            var popupContent = feature.properties.landUsesEmoji
        }
        if (feature.properties && feature.properties.popupContent) {
            popupContent += feature.properties.popupContent;
        }

        layer.bindPopup(popupContent).addTo(map);
        layer.bindPopup(popupContent).openPopup();

    }, 1600)
}
// var finished = false; // variable to openpopup only when file downloaded, not when loaded from local storage
function onEachFeatureAudioLocalStorage(feature, layer) { // function duplicated to avoid openpop() with local storage
    //timeout is used to wait 1000ms until the download link is ready
    setTimeout(function() {
        //console.log('isonline' + ' ' + isOnline)
        var audioLinkText = '🔊 AUDIO'
        var audioAvailable = feature.properties.audioAvailable;
        //conditions to avoid showing audio link if no audio has been recorded
        if (audioAvailable == true) {
            var popupContent = feature.properties.landUsesEmoji + '</br>' + '</br>' + '🔊 🚧';
        } else {
            var popupContent = feature.properties.landUsesEmoji
        }
        if (feature.properties && feature.properties.popupContent) {
            popupContent += feature.properties.popupContent;
        }
        layer.bindPopup(popupContent) //.addTo(map); // removed otherwise the layer is automatically added to the map when oneachfeaturelocl.. is called
        if (finished == true) {
            layer.bindPopup(popupContent).openPopup();
        }
    }, 1600)

}
/////////////////LEAFLET DRAW////////
