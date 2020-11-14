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

var convertedData;
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
    myLayer_Button.button.style.backgroundColor = 'grey';

    deflated.removeFrom(map)
    console.log('isonline= ', isOnline)
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
          //  //console.log('Firebase initialized')
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
            //console.log('Service Worker Registered');
            //console.log('sw has been updated')


            registration.update() //to update the sw and caches if version has changed
            //console.log('sw has been updated')
            //to reload the page if sw version has changed. This is to provide the user the latest version without the need of reloading or clearing cache
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed' &&
                        navigator.serviceWorker.controller) {
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





// ////////////////////////// login initial modal  ///////////////
//
// document.getElementById('loginInfo').onclick = function(){
//   window.location.href = 'pages/tutorial.html';
// }
// document.getElementById('loginKey').onclick = function(e){
//   e.preventDefault() //to avoid reload
//   //runJSselectFeature()
//   document.getElementById('loginKey').style.backgroundColor = '#D5D6D5'
//   document.getElementById('enteredPw').style.display = 'initial';
//   document.getElementById('enteredPw').focus() //to open keyboard!!!
//   document.getElementById('login').style.display = 'initial';
// }
//
// ////////////////////    login  input    ///////////
// var requestPw = function(){
//       var pocPw = '2030' //! 🖐️🖐️🖐️ if you are looking at this line, please keep in mind that this very basic security measure is 'only' to prevent, during the testing period,
//       // unintended submission by users who have not been informed of the impacts of open land data, both positive and negatives. Thanks ;)
//
//       setTimeout(function(){
//         document.getElementById('modal').style.display='block';
//         // document.getElementById('enteredPw').click()
//       },100)
//
//       var checkPw = setInterval(function(){
//         var pwPlaceholder = document.getElementById('enteredPw').value
//
//         if(pwPlaceholder.length == 4){
//           document.getElementById('login').style.borderColor= 'grey'
//           document.getElementById('login').disabled = false
//           document.getElementById('login').style.opacity='1';
//         }
//         if(pwPlaceholder.length < 4){
//           document.getElementById('login').style.borderColor= 'white'
//           document.getElementById('login').style.opacity='0.3';
//          document.getElementById('login').disabled = true
//         }
//       },200)
//
//       document.getElementById('login').onclick = function(e){
//         e.preventDefault() // to avoid page reload on first load!
//
//         var pwPlaceholder = document.getElementById('enteredPw').value
//         if(pwPlaceholder == pocPw){
//
//           clearInterval(checkPw)
//           //loadElements()
//           //runJSDownload()
//           document.getElementById('enteredPw').style.backgroundColor = '#39F70F'
//           setTimeout(function(){
//             document.getElementById('modal').style.display='none';
//             document.getElementById('pwForm').style.display='none';
//           },300)
//           localStorage.setItem('pwCorrect', true);
//         }else{
//           document.getElementById('enteredPw').style.backgroundColor = 'red'
//           document.getElementById('enteredPw').focus() //to maintain keyboard if pw wrong
//
//           setTimeout(function(){
//             document.getElementById('enteredPw').style.backgroundColor = 'white'
//           },300)
//         }
//       }
//     }




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

//////////////////////////////////////////////  MAP  //////////////////////////////////////////////////////

//////////////////  center the map: check first if url with coordinates, if not, check if first load, then check if lastpositionstored.
//script to check if url contains coordinates when loaded

var urlCoordinates = window.location.href

var urlContainsHash = urlCoordinates.includes('#')

//to avoid panning outside this bounds
var southWest = L.latLng(-70, -180);
var northEast = L.latLng(80, 180);

if (urlContainsHash == true){
    var keepOnlyLatLngZoom = urlCoordinates.split('#').pop();
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
  //////////////////////
}else{

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

}

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
// var initialiseMinimap = function(){
 //var miniMap = new L.Control.GlobeMiniMap(optionsMinimap)//.addTo(map);
  console.log('minimap initialised')
  //miniMap.addTo(map)

 //return miniMap
// }
// initialiseMinimap()
// var checkMiniMap = setInterval(function(){
//   console.log('minimap', initialiseMinimap())
// },2000)
var miniMap
var addMiniMap = function(){ //the three request must be in the same function!!!!
      $.getScript({
        //cache:true,
        url:'scripts/lib/topojson.min.js'
      }),
      $.getScript({
        //cache:true,
        url:'scripts/lib/leaflet/plugins/leaflet-globeminimap-master/src/Control.GlobeMiniMap.js'
      }),
      $.getScript({
        //cache:true,
        url:'scripts/lib/d3.min.js',
        success: function(){
            miniMap = new L.Control.GlobeMiniMap(optionsMinimap)//.addTo(map);
            miniMap.addTo(map)

            setTimeout(function(){
              miniMap.remove()
            },2300)
        }
      })
}
// var removeMiniMap = function(){
//       $.getScript({
//         cache:true,
//         url:'scripts/lib/d3.min.js',
//         success: function(){
//           // var  miniMap = new L.Control.GlobeMiniMap(optionsMinimap)//.addTo(map);
//             miniMap.remove()
//             //return miniMap
//         }
//       })
//     // var  miniMap = new L.Control.GlobeMiniMap(optionsMinimap)//.addTo(map);
//     //   miniMap.removeFrom(map)
// }


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
//deflated.addTo(map) // to initialize //////////////////////!!!!!!!!

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
if (isFirstTime == false & localStorage.key(0) != null) {

    //  loop for going through all geoJSON stored in the localStorage
    for (var i = 0, len = localStorage.length; i < len - 1; i++) { //len-2  to avoid a error of geojson object not recognised. last element is [true]...
        var key = localStorage.key(i);
        var value = localStorage[key];
        var itemFetched = localStorage.getItem(key);
        //    //console.log(i+ '____' + key + " => " + value +'__'+ '__ccc__'+itemFetched);
        //call catch function
        isJson(itemFetched);
        // //console.log(isJson(itemFetched))
        if (isJson(itemFetched) == true) {
          //  //console.log(isJson(itemFetched))
        //    //console.log(itemFetched)
            var getItemToJSON = JSON.parse(itemFetched);
        //    //console.log(isJson(getItemToJSON))
        //    //console.log(getItemToJSON)
            isJson(getItemToJSON)
            //add each json to an array-------------------------
            groupGeoJSON[i] = getItemToJSON
        //    //console.log(isJson(groupGeoJSON))
        //    //console.log(groupGeoJSON)
        } else {
            groupGeoJSON[i] = {}; // this is to avoid error when an array element is not a JSON
        }
    }
}
//console.log('local storage accessed')
//console.log(groupGeoJSON)
//console.log(typeof groupGeoJSON)
//console.log(isJson(groupGeoJSON))

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

if (isJson(groupGeoJSON) == false && isFirstTime == false) {
    var localStorageLayer = L.geoJSON(groupGeoJSON, {
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
}

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
if (isIOS == true) {
    var iconGPS = '<img src="images/gps.png" width=40px; height=40px; style="margin-left:-5px" > ';
    var iconOSM = '<img src="images/osm.png" width=40px; height=40px; style="margin-left:-6px" > ';
    var iconGOOGLE = '<img src="images/google.png" width=40px; height=40px; style="margin-left:-6px" > ';
    var iconPLANET = '<img src="images/planet.png" width=40px; height=40px; style="margin-left:-6px" > ';
    var iconLAYERS = '<img src="images/myLayer.png" width=40px; height=40px; style="margin-left:-6px" > ';
    var iconFILTER = '<img src="images/filterIcon.png" width=40px; height=40px; style="margin-left:-6px" > ';
    var iconRANDOM = '<img src="images/gps.png" width=40px; height=40px; style="margin-left:-6px" > ';

} else {
    var iconGPS = '<img src="images/gps.png" width=40px; height=40px; style="margin-left:-1px" > ';
    var iconOSM = '<img src="images/osm.png" width=40px; height=40px; style="margin-left:-1px" > ';
    var iconGOOGLE = '<img src="images/google.png" width=40px; height=40px; style="margin-left:-1px"> ';
    var iconPLANET = '<img src="images/planet.png" width=40px; height=40px; style="margin-left:-1px"> ';
    var iconLAYERS = '<img src="images/myLayer.png" width=40px; height=40px; style="margin-left:-1px"> ';
    var iconFILTER = '<img src="images/filterIcon.png" width=40px; height=40px; style="margin-left:-1px" > ';
    var iconRANDOM = '<img src="images/gps.png" width=40px; height=40px; style="margin-left:-1px" > ';
}
var basemapOn = 'googleSat'
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
            //clickButtonCount += 1;
            document.getElementById('imageryAlert').style.display = 'none'

            mapCurrentZoom = map.getZoom();
           console.log('zoom1', mapCurrentZoom)
            if(mapCurrentZoom >19){
              map.setZoom(19)//because OSM does not provide tiles beyond zoom 19
              mapCurrentZoom = map.getZoom();
            console.log('zoom2', mapCurrentZoom)
            }


            map.options.maxZoom = 19; //Set max zoom level as OSM does not serve tiles with 20+ zoom levels
            map.options.minZoom = 2;
            osm_Button.removeFrom(map);
            planet_Button.addTo(map);
            myLayer_Button.addTo(map) //keep this, otherwise the button moves up
            filter_Button.addTo(map);
            googleSat.removeFrom(map);
            osm.addTo(map);

            basemapOn = 'osm'
            return basemapOn;
        }
    }]
});


osm_Button.button.style.width = '50px';
osm_Button.button.style.height = '50px';
//osm_Button.button.style.backgroundColor = 'none';
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
            //clickButtonCount += 1;
            document.getElementById('imageryAlert').style.display = 'none'
            map.options.maxZoom = 21; // set the max zoom level to 21 for google imagery
            map.options.minZoom = 2;
            googleSat_Button.removeFrom(map);
            osm_Button.addTo(map);
            myLayer_Button.addTo(map) //keep this, otherwise the button moves up
            if(isOnline == true){
            filter_Button.addTo(map);
            }

            googleSat.addTo(map);
            planetScopeMonthlyMosaic.removeFrom(map);
            //planet.removeFrom(map);
            osm.removeFrom(map);
            basemapOn = 'googleSat'

            return basemapOn;
        }
    }]
});

googleSat_Button.button.style.width = '50px';
googleSat_Button.button.style.height = '50px';
googleSat_Button.button.style.transitionDuration = '.3s';
googleSat_Button.button.style.backgroundColor = 'black';

var planet_Button = L.easyButton({
    id: 'planet',
    class: 'easyButton',
    position: 'topright',
    states: [{
        icon: iconPLANET,
        stateName: 'check-mark',
        onClick: function(btn, map) {
            /////////////////////// to load planet tiles manually  /////////////

          planetScopeMonthlyMosaic = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_2020_09_mosaic/gmap/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
            attribution: 'Leaflet | PlanetScope Imagery  Sept 2020'
            })

            clickButtonCount = 0;
            //to avoid black tiles as sentinel API does not serves tiles above 10 (or perhaps yes), then zoom back to 10 again
            map.options.maxZoom = 17; //no need for more zoom levels as 'low' resolution
            map.options.minZoom = 2;

            planet_Button.removeFrom(map);
            googleSat_Button.addTo(map);
            //to zoom out if previous map zoom is higher than 17
            mapCurrentZoom = map.getZoom();
            console.log('zoom1', mapCurrentZoom)
            if(mapCurrentZoom >17){
              map.setZoom(17)//because OSM does not provide tiles beyond zoom 19
              mapCurrentZoom = map.getZoom();
            console.log('zoom2', mapCurrentZoom)
            }
            planetScopeMonthlyMosaic.addTo(map);
          //  planet.addTo(map); // planet imagery goes after so it stays on top of sentinel data (sentinel is global, planet is not yet?)
            googleSat.removeFrom(map);
            osm.removeFrom(map);
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

            //  deflated.removeFrom(map)
            // whichLayerIsOn = 'deflated'
            if (whichLayerIsOn == 'deflated' && localStorageLayer != null) {
                deflated.removeFrom(map)
                if (localStorageLayer != null) {
                    localStorageLayer.addTo(map)
                }
                if (finalLayer != null) {
                    finalLayer.addTo(map)
                }
                whichLayerIsOn = 'localStorage'
                myLayer_Button.button.style.backgroundColor = 'white';
                filter_Button.button.style.opacity = '0.4';
                filter_Button.button.disabled = true;

            } else if (whichLayerIsOn == 'deflated' && localStorageLayer == null) { // to avoid three click when localstorage is limited on first load
                whichLayerIsOn = 'none'
                deflated.removeFrom(map)

                myLayer_Button.button.style.backgroundColor = 'grey'

            } else if (whichLayerIsOn == 'localStorage') {
                if (localStorageLayer != null) {
                    localStorageLayer.removeFrom(map)
                }
                whichLayerIsOn = 'none'
                //  localStorageLayer.addTo(map)
                if (finalLayer != null) {
                    finalLayer.removeFrom(map)
                }
                myLayer_Button.button.style.backgroundColor = 'grey'
                filter_Button.button.style.opacity = '0.4';
                filter_Button.button.disabled = true;

            } else if (whichLayerIsOn == 'none') {
                whichLayerIsOn = 'deflated'
                if (finalLayer != null) {
                    finalLayer.removeFrom(map)
                }
                if(isOnline == false){
                  myLayer_Button.button.style.backgroundColor = 'white'
                  filter_Button.button.style.opacity = '0.4';
                  filter_Button.button.disabled = true;
                  }else{
                    deflated.addTo(map);
                    myLayer_Button.button.style.backgroundColor = 'black'
                    filter_Button.button.style.opacity = '1';
                    filter_Button.button.disabled = false;
                  }

               if (featureSent == true) { //to update the carto layer with recently created feature. This is fired after DB update has been checked

                  sqlQuery = "SELECT cartodb_id, the_geom, datetime, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring FROM lumblu ORDER BY cartodb_id DESC LIMIT 1"
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
var filterApplied;
//Button for filtering by attribute
var filter_Button = L.easyButton({
    id: 'filter',
    position: 'topright',
    states: [{
        icon: iconFILTER,
        stateName: 'check-mark',
        onClick: function(btn, map) {

          if(filterIsOn == false){
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

            // document.getElementById("share-download").style.display = "initial";
            // document.getElementById("share-download").style.opacity = "0.35"; //to disable button until user adds attributes, either with audio or text
            // document.getElementById("share-download").disabled = true;
            // document.getElementById("Cancel").style.display = "initial";
            document.getElementById("clearFilter").style.display = "initial";
            document.getElementById("applyFilter").style.display = "initial";
            document.getElementById("filterByDate").style.display = "initial";
            document.getElementById("classification").style.display = "initial";
            document.getElementById("emoji").style.display = "initial";
            document.getElementById("emoji").disabled = false;
            document.getElementById("emoji").style.opacity = '1';
        }else if(filterIsOn == true){
            filterIsOn = false
            myLayer_Button.button.style.opacity = '1';
            myLayer_Button.button.disabled = false;
            filter_Button.button.style.opacity = '1';
            filter_Button.button.disabled = false;

            if(filterApplied == true){
              filter_Button.button.style.backgroundColor = 'green'

            }else{
              filter_Button.button.style.backgroundColor = 'black'

            }

            document.getElementById("tutorial").style.display = "initial";
            document.getElementById("polygon").style.display = "initial";
            document.getElementById("polyline").style.display = "initial";
            document.getElementById("point").style.display = "initial";

            // document.getElementById("share-download").style.display = "initial";
            // document.getElementById("share-download").style.opacity = "0.35"; //to disable button until user adds attributes, either with audio or text
            // document.getElementById("share-download").disabled = true;
            // document.getElementById("Cancel").style.display = "initial";
            document.getElementById("clearFilter").style.display = "none";
            document.getElementById("applyFilter").style.display = "none";
            document.getElementById("filterByDate").style.display = "none";
            document.getElementById("classification").style.display = "none";
            document.getElementById("emoji").style.display = "none";
        }

      }

    }]
})



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
  console.log('refreshgpsbutton')
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
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearchingIOS.gif" width=40px; height=40px; style="margin-left:-5px" > '
            }else{
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" width=40px; height=40px; style="margin-left:-1px" > '
            }

            var gpsIconIntermitent = setTimeout(function() {
              if (isIOS == true) {
                document.getElementById('gps').innerHTML = '<img src="images/gps.png" width=40px; height=40px; style="margin-left:-5px" > '
              }else{
                document.getElementById('gps').innerHTML = '<img src="images/gps.png" width=40px; height=40px; style="margin-left:-1px" > '
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
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearchingIOS.gif" width=40px; height=40px; style="margin-left:-5px" > '
            }else{
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" width=40px; height=40px; style="margin-left:-1px" > '
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
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearchingIOS.gif" width=40px; height=40px; style="margin-left:-5px" > '
            }else{
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" width=40px; height=40px; style="margin-left:-1px" > '
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
          document.getElementById('gps').innerHTML = '<img src="images/gpsOff.png" width=40px; height=40px; style="margin-left:-5px" > '
        }else{
          document.getElementById('gps').innerHTML = '<img src="images/gpsOff.png" width=40px; height=40px; style="margin-left:-1px" > '
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

//console.log(currentLocation[0])
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

              googleSat_Button.removeFrom(map);
              osm_Button.removeFrom(map);
              planet_Button.removeFrom(map);
              myLayer_Button.removeFrom(map);
              filter_Button.removeFrom(map);
              try{
                addMiniMap()
                //miniMap.addTo(map)
              }catch(e){}

                setTimeout(function(){
                  try{
                    //removeMiniMap()
                    //miniMap.remove()
                  }catch(e){}
                  osm_Button.addTo(map);
                  googleSat_Button.removeFrom(map);
                  planet_Button.removeFrom(map);
                  myLayer_Button.addTo(map);
                  filter_Button.addTo(map);
                },2500)


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
gps_Button.button.style.backgroundColor = 'white';
//gps_Button.addTo(map);



var rose = L.control.rose('rose', {
    position: 'topleft',
    icon: 'nautical',
    iSize: 'medium',
    opacity: 1
})//.addTo(map)
document.getElementById('rose').style.marginBottom = '5px' // to avoid extra margin, visible when offline buttons appear

// script to show the download tiles buttons
var clicksRose = 0
document.getElementById('rose').onclick = function(e){
    clicksRose += 1;
    console.log(clicksRose)
  if(clicksRose == 10){
    offlineControlGoogle.addTo(map);
    offlineControlOSM.addTo(map);
    clicksRose = 0;
  }

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




if (isOnline == true) {
    function getGeoJSON() {
        $.getJSON({
          cache:false,
          success:cartoGeoJSONLayer,
          url:"https://" + cartousername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + sqlQuery + cartoapiSELECT
        })
        return cartoLoaded && cartoIdFeatureSelected && selectedFeature && cartoGeometries;
    };
}

//console.log('cartoIdFeatureSelected  ' + cartoIdFeatureSelected)
//to only load carto layer once the credentials have been loaded from the server xhr2
var findCartoCredential = setInterval(function() {
    if (isOnline == true && cartousername != null) {
      sqlQuery = "SELECT cartodb_id, the_geom, datetime, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring FROM lumblu";

        clearInterval(findCartoCredential);
        getGeoJSON();
    }
    return cartousername
}, 100)

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
                document.getElementById('myLayerButton').click()
                document.getElementById('myLayerButton').click()
                if(localStorageLayer != null){document.getElementById('myLayerButton').click()}   // because first time app is used mylayer_button has only two positions (local storage is empty)
              clearInterval(intervalCheckAndAddNewDeflated)
              }
            }
            //request to check when feature has reached the DB
            $.get({
              cache:false,
              success:countRowsInDB,// if success the function above is called
              url:"https://" + cartousername + ".cartodb.com/api/v2/sql?q=" + "SELECT COUNT(cartodb_id) FROM lumblu" + cartoapiSELECT
            })

       },1000)
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
    if (cartoIdFeatureSelected != null && created == false) { //TO DELETE THE SELECTED FEATURE FROM THE CARTO DB
        pURL = "DELETE FROM lumblu WHERE cartodb_id='" + cartoIdFeatureSelected + "'";
        cartoIdFeatureSelected = null
    } else { //TO INSERT THE CREATED FEATURE INTO THE CARTO DB
        dataGeometry = data.features[0].geometry
        //console.log(dataGeometry)
        var dataGeometryString = JSON.stringify(dataGeometry)
        //console.log(dataGeometryString)

        var sql = "INSERT INTO lumblu (the_geom, datetime, randomid, landuses, landusesemoji, audioavailable, areapolygon, lengthline, timespent, distance, geometrystring, screensize) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('";
        var sql2 = dataGeometryString;
        var sql3 = "'),4326),'" + dateTime + "','" + randomID + "','" + landUses + "','" + landUsesEmoji + "','" + audioAvailable + "','" + areaPolygon + "','" + lengthLine + "','" + timeSpendSeconds + "','" + dist_m_Participant_Feature + "','" + dataGeometryString + "','" + screensize + "')";
        pURL = sql + sql2 + sql3;
    }

    ////console.log(pURL)
    submitToProxy(pURL);
    //console.log("Feature has been submitted to the Proxy");
    return pURL
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
        document.getElementById('imageryAlert').style.display = 'none'
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
        }, 500) // time frequency to refresh the content in the popup
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
            var popupContent = feature.properties.landUsesEmoji + '</br>' + '</br>' + '🔊 AUDIO';
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
//////////////////////////     LEAFLET DRAW    ///////////////////////////////////////////////
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var editableLayers = new L.FeatureGroup();
var options = {
    position: 'topright',
    draw: {
        polyline: {
            shapeOptions: {
                color: 'black',
                weight: 2
            }
        },
        polygon: {
            // showArea:true,
            allowIntersection: false, // Restricts shapes to simple polygons
            // icon: new MyCustomMarker() ,
            icon: new L.DivIcon({
                iconSize: new L.Point(10, 10),
                className: 'leaflet-div-icon',
                weight: 5
            }),
            drawError: {
                color: 'red', // Color the shape will turn when intersects
            },
            shapeOptions: {
                color: '#00ff00',
                weight: 1
            },
        },
        marker: {
            icon: markerIconLocalStorage,
            draggable:false
        },
    },
    edit: {
        featureGroup: editableLayers, // REQUIRED
        remove: false,
        edit: {
            selectedPathOptions: {
                dashArray: '5, 30',
                fill: true,
                fillColor: '#fe57a1',
                fillOpacity: 0.5,
                // Whether to user the existing layers color
                maintainColor: true
            }
        },
        poly: {
            icon: new L.DivIcon({
                iconSize: new L.Point(12, 12),
                className: 'leaflet-div-icon leaflet-editing-icon my-custom-icon'
            })
        }
    }
};

var drawControl = new L.Control.Draw(options);
map.on(L.Draw.Event.CREATED, function(e) {
    var type = e.layerType,
        layer = e.layer;
    drawnItems.addLayer(layer);
});

//Script to allow drag while drawing/editing without adding any point.
(function() {
    var originalOnTouch = L.Draw.Polyline.prototype._onTouch;
    L.Draw.Polyline.prototype._onTouch = function(e) {
        if (e.originalEvent.pointerType != 'mouse' && e.originalEvent.pointerType != 'touch') {
            return originalOnTouch.call(this, e);
        }
    }
})();

var drawPolygon = new L.Draw.Polygon(map, drawControl.options.draw.polygon);
var drawPolyline = new L.Draw.Polyline(map, drawControl.options.draw.polyline);
var drawMarker = new L.Draw.Marker(map, drawControl.options.draw.marker);


//variable to determine whether a polygon has been completed.
var clickMapCount = 0;
var clickDelVertCount = 0;
document.getElementById("goBack2").onclick = function(e) {
      gps_Button.button.style.opacity = '1';
      gps_Button.button.disabled = false;
    //to enable doubleclick zoom that is disabled while drawing
    map.doubleClickZoom.enable();
    //to add filter button if carto layer on
    if(myLayer_Button.button.style.backgroundColor == 'black'){
      filter_Button.button.style.opacity = '1';
      filter_Button.button.disabled = false;
    }

    clickMapCount = 0;
    map.zoomOut(1); //decreases the zoom level when click
    setTimeout(function() {
        document.getElementById("tutorial").style.display = "initial";
        document.getElementById("goBack2").style.display = "none";
        document.getElementById("polygon").style.display = "initial";
        document.getElementById("polyline").style.display = "initial";
        document.getElementById("point").style.display = "initial";

        document.getElementById("deleteLastVertex").style.display = "none";
        document.getElementById("deleteAllVertexs").style.display = "none";
        document.getElementById("deleteLastVertex").style.opacity = "0.35";
        document.getElementById("deleteLastVertex").disabled = true;
        document.getElementById("deleteAllVertexs").style.opacity = "0.35";
        document.getElementById("deleteAllVertexs").disabled = true;

        document.getElementById("deleteLastVertexLine").style.display = "none";
        document.getElementById("deleteAllVertexsLine").style.display = "none";
        document.getElementById("deleteLastVertexLine").style.opacity = "0.35";
        document.getElementById("deleteLastVertexLine").disabled = true;
        document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
        document.getElementById("deleteAllVertexsLine").disabled = true;

        document.getElementById('completeFeature').style.display = 'none';
        document.getElementById("completeFeature").style.opacity = "0.35";
        document.getElementById("completeFeature").disabled = true;
    }, 200)

    drawPolygon.disable();
    drawPolyline.disable();
    drawMarker.disable();
    drawnItems.remove();
    drawnItems.clearLayers();
    return featureType
}

var boxContent;
var drawingPoint = false
document.getElementById('point').onclick = function(e) {
    filter_Button.button.style.opacity = '0.4';
    filter_Button.button.disabled = true;
    gps_Button.button.style.opacity = '0.4';
    gps_Button.button.disabled = true;

    if (isIOS == false) {
        recordedBlobs = null; //to empty recorded blobs from previous map in this session
    }

    featureType = 'point';
    map.doubleClickZoom.disable();
    currentZoom = map.getZoom();
    drawMarker.enable();
    setTimeout(function() {
        document.getElementById('imageryAlert').style.display = 'none'
        document.getElementById("tutorial").style.display = "none";
        document.getElementById("polygon").style.display = "none";
        document.getElementById("polyline").style.display = "none";
        document.getElementById("point").style.display = "none";
        document.getElementById("goBack2").style.display = "initial";

    }, 200);

    drawingPoint = true;
    return drawingPoint && featureType
};

document.getElementById('polyline').onclick = function(e) {
    filter_Button.button.style.opacity = '0.4';
    filter_Button.button.disabled = true;
    gps_Button.button.style.opacity = '0.4';
    gps_Button.button.disabled = true;

    if (isIOS == false) {
        recordedBlobs = null; //to empty recorded blobs from previous map in this session
    }
    featureType = 'polyline';
    map.doubleClickZoom.disable();

    map.on('draw:drawvertex',
        function(e) {
            $(".leaflet-div-icon")
                // $(".leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-touch-icon.leaflet-zoom-animated.leaflet-interactive:first")
                .css({
                    'background-color': 'white',
                    'border-radius': '10px',
                    'height': '10px',
                    'width': '10px'
                });
        });
    map.on('draw:drawvertex',
        function(e) {
            $(".leaflet-div-icon.leaflet-interactive:last")
                // $(".leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-touch-icon.leaflet-zoom-animated.leaflet-interactive:first")
                .css({
                    'background-color': '#F905EA',
                    'border-radius': '25px',
                    'height': '15px',
                    'width': '15px'
                });
        });

    currentZoom = map.getZoom();

    clickMapCount = 0;
    drawPolyline.enable();

    setTimeout(function() {
        document.getElementById('imageryAlert').style.display = 'none';
        document.getElementById("tutorial").style.display = "none";
        document.getElementById("polygon").style.display = "none";
        document.getElementById("polyline").style.display = "none";
        document.getElementById("point").style.display = "none";
        document.getElementById("goBack2").style.display = "initial";
        document.getElementById("deleteLastVertexLine").style.display = "initial";
        document.getElementById("deleteAllVertexsLine").style.display = "initial";
        document.getElementById('completeFeature').style.display = 'initial';
    }, 200)
    return featureType;
};

document.getElementById('polygon').onclick = function(e) {
      filter_Button.button.style.opacity = '0.4';
      filter_Button.button.disabled = true;
      gps_Button.button.style.opacity = '0.4';
      gps_Button.button.disabled = true;
    if (isIOS == false) {
        recordedBlobs = null; //to empty recorded blobs from previous map in this session
    }
    featureType = 'polygon'
    map.doubleClickZoom.disable();

    map.on('draw:drawvertex',
        function(e) {
            $(".leaflet-div-icon")
                // $(".leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-touch-icon.leaflet-zoom-animated.leaflet-interactive:first")
                .css({
                    'background-color': '#DAFDC4',
                    'border-radius': '10px',
                    'height': '10px',
                    'width': '10px'
                });
        });

    map.on('draw:drawvertex',
        function(e) {
            $(".leaflet-div-icon.leaflet-interactive:first")
                // $(".leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-touch-icon.leaflet-zoom-animated.leaflet-interactive:first")
                .css({
                    'background-color': '#F905EA',
                    'border-radius': '25px',
                    'height': '15px',
                    'width': '15px'
                });
        });

    currentZoom = map.getZoom();
    clickMapCount = 0;
    drawPolygon.enable();

    setTimeout(function() {
        document.getElementById('imageryAlert').style.display = 'none'

        document.getElementById("tutorial").style.display = "none";
        document.getElementById("polygon").style.display = "none";
        document.getElementById("polyline").style.display = "none";
        document.getElementById("point").style.display = "none";

        document.getElementById("goBack2").style.display = "initial";
        document.getElementById("deleteLastVertex").style.display = "initial";
        document.getElementById("deleteAllVertexs").style.display = "initial";
        document.getElementById('completeFeature').style.display = 'initial';
    }, 200);
    return featureType;
};

document.getElementById('map').onclick = function(e) {
    if (created == false) { // to avoid the script to seach for _markers.length when the feature still has not been created

        if (featureType == 'polyline' && drawPolyline._markers.length > 0) { //add condition to allow user complete shape if vertext >=2. var from DRAW plugin
            //console.log(drawPolyline._markers.length)
            document.getElementById("deleteLastVertexLine").style.opacity = "1";
            document.getElementById("deleteLastVertexLine").disabled = false;
        }
        if (featureType == 'polyline' && drawPolyline._markers.length > 1) {
            document.getElementById("deleteAllVertexsLine").style.opacity = "1";
            document.getElementById("deleteAllVertexsLine").disabled = false;
            document.getElementById("completeFeature").style.opacity = "1";
            document.getElementById("completeFeature").disabled = false;
        }
        if (featureType == 'polygon' && drawPolygon._markers.length > 0) { // polygon vertex >=3
            document.getElementById("deleteLastVertex").style.opacity = "1";
            document.getElementById("deleteLastVertex").disabled = false;
        }
        if (featureType == 'polygon' && drawPolygon._markers.length > 1) {
            document.getElementById("deleteAllVertexs").style.opacity = "1";
            document.getElementById("deleteAllVertexs").disabled = false;
        }
        if (featureType == 'polygon' && drawPolygon._markers.length > 2) {
            document.getElementById("completeFeature").style.opacity = "1";
            document.getElementById("completeFeature").disabled = false;
        }
    }
}

///////////////////////////       delete vertexs      //////////////////////////////////

document.getElementById('deleteLastVertex').onclick = function(e) {
    //console.log('number of vertex polygon ' + drawPolygon._markers.length)
    if (drawPolygon._markers.length == 1) {
        document.getElementById("deleteAllVertexs").disabled = false;
        document.getElementById('deleteAllVertexs').click()

    } else if (drawPolygon._markers.length > 1) {
        drawPolygon.deleteLastVertex();
    }
    if (drawPolygon._markers.length < 3) {
        document.getElementById("completeFeature").style.opacity = "0.35";
        document.getElementById("completeFeature").disabled = true;
    }
    if (drawPolygon._markers.length < 2) {
        document.getElementById("deleteAllVertexs").style.opacity = "0.35";
        document.getElementById("deleteAllVertexs").disabled = true;
    }
}

document.getElementById('deleteAllVertexs').onclick = function(e) {
    clickMapCount = 0;
    drawPolygon.disable();
    drawPolygon.enable();

    setTimeout(function() {
        document.getElementById("deleteLastVertex").style.opacity = "0.35";
        document.getElementById("deleteLastVertex").disabled = true;
        document.getElementById("deleteAllVertexs").style.opacity = "0.35";
        document.getElementById("deleteAllVertexs").disabled = true;
        document.getElementById("completeFeature").style.opacity = "0.35";
        document.getElementById("completeFeature").disabled = true;
    }, 200)
}

/////////////line////////////////////////
document.getElementById('deleteLastVertexLine').onclick = function(e) {
    //console.log('number of vertex polygon ' + drawPolyline._markers.length)
    if (drawPolyline._markers.length == 1) {
        document.getElementById("deleteAllVertexsLine").disabled = false;
        document.getElementById('deleteAllVertexsLine').click()

    } else if (drawPolyline._markers.length > 1) {
        drawPolyline.deleteLastVertex();
    }
    if (drawPolyline._markers.length == 1) {
        document.getElementById("completeFeature").style.opacity = "0.35";
        document.getElementById("completeFeature").disabled = true;
        document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
        document.getElementById("deleteAllVertexsLine").disabled = true;
    }
}

document.getElementById('deleteAllVertexsLine').onclick = function(e) {
    drawPolyline.disable();
    drawPolyline.enable();

    setTimeout(function() {
        document.getElementById("deleteLastVertexLine").style.opacity = "0.35";
        document.getElementById("deleteLastVertexLine").disabled = true;
        document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
        document.getElementById("deleteAllVertexsLine").disabled = true;
        document.getElementById("completeFeature").style.opacity = "0.35";
        document.getElementById("completeFeature").disabled = true;
    }, 200)
}

//to complete polygon when click on green thumbs up
document.getElementById('completeFeature').onclick = function(e) {
    if (featureType == 'polyline') {
        drawPolyline.completeShape();

    } else if (featureType == 'polygon') {
        drawPolygon.completeShape();
    }
}

var tempLayer;
var data;
var finalAreaHa2Decimals
var finalAreaAcres2Decimals
var finalLength2Decimals

////////////////////////////////////////  map events    /////////////////////////////////////////////////////////////////////////////
map.on('draw:deleted', function(e) {
    self.drawControlEdit.remove();
    self.drawControlFull.addTo(map);
});

var typeOfFeature;
map.on('draw:created', function(e) {
    myLayer_Button.button.style.opacity = '0.4';
    myLayer_Button.button.disabled = true;
    try {
      deflated.removeFrom(map)
      localStorageLayer.removeFrom(map)
      drawnItems.removeFrom(map); //remove the drawn item as yellow polygon appears
    }catch(err){}


    created = true;
    drawPolygon.disable();

    document.getElementById("deleteAllVertexs").style.display = "none";
    document.getElementById("deleteLastVertex").style.display = "none";
    document.getElementById("goBack2").style.display = "none";

    document.getElementById("deleteLastVertexLine").style.display = "none";
    document.getElementById("deleteAllVertexsLine").style.display = "none";
    document.getElementById("completeFeature").style.display = "none";

    document.getElementById("share-download").style.display = "initial";
    document.getElementById("share-download").style.opacity = "0.35"; //to disable button until user adds attributes, either with audio or text
    document.getElementById("share-download").disabled = true;
    document.getElementById("Cancel").style.display = "initial";
    document.getElementById("classification").style.display = "initial";
    document.getElementById("emoji").style.display = "initial";
    document.getElementById("emoji").disabled = false;
    document.getElementById("emoji").style.opacity = '1';
    document.getElementById('Sent').currentTime = 0;
    document.getElementById('voice').style.display = 'none';
    document.getElementById('voice').style.opacity = '0';
    if (isIOS == false) {
        document.getElementById('enableRecording').style.display = 'initial';
    } else {
        document.getElementById('noAudioIOS').style.display = 'initial';
    }
    document.getElementById('emoji').style.display = 'initial';
    data = drawnItems.toGeoJSON();

    //console.log(finalArea) // area obtained from DRAW plugin, always in sq m
    //console.log(finalLength)
    var type = e.layerType
    //console.log(type)

    ////////////////    area   //////////////
    if (type == 'polygon') {
        typeOfFeature = 'polygon'
        // convert sq m to
        var finalAreaHa = finalArea * 0.0001
        var finalAreaAcres = finalArea * 0.000247105
        //to remove decimals ....
        finalAreaHa2Decimals = finalAreaHa.toFixed(2) + ' ' + 'hectares'
        finalAreaAcres2Decimals = finalAreaAcres.toFixed(2) + ' ' + 'acres'
        //to show the final area on the top
        document.getElementById('showAreaHa').style.display = 'initial';
        document.getElementById("showAreaHa").innerHTML = finalAreaHa2Decimals;
        document.getElementById('showAreaAcres').style.display = 'initial';
        document.getElementById("showAreaAcres").innerHTML = finalAreaAcres2Decimals;
    }
    ////////    length    ///////////
    if (type == 'polyline') {
        typeOfFeature = 'polyline'
        //to remove decimals ....
        finalLength2Decimals = finalLength.toFixed(2) + ' ' + 'meters'
        //to show the final length on the top
        // document.getElementById('showLength').style.display = 'initial';
        document.getElementById("showLength").innerHTML = finalLength2Decimals;
    }
    if (featureType == 'point') {
        //console.log('featuretype    ' + featureType)
        setTimeout(function() {
            map.zoomOut(3)
        }, 100)
    }
    //////////////////////////////////////////

    function onEachFeatureBlank(feature, layer) {
        var popupContent = '...'; //+ '    ' +dateTimeRandomID

        layer.bindPopup(popupContent).addTo(map);
        layer.bindPopup(popupContent).openPopup(); ///automatically shows the pop up!
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
        icon: markerIconLocalStorage,
        onEachFeature: onEachFeatureBlank,

    }).addTo(map);
    //to locate the feature at the center of the map. This must go right after creating the geojson file tempLayer
    var boundsPolygon = drawnItems.getBounds()
    var centerBoundsPolygon = boundsPolygon.getCenter()
    var mapNewBounds = map.getBounds();
    map.fitBounds(drawnItems.getBounds(), {
        //  maxZoom:30,
        paddingBottomRight: [0, 0]
    })
    //console.log(typeOfFeature)
    //console.log(created)

    document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null // to empty text box
    document.getElementsByClassName('emojionearea-wrapper').innerHTML = null // to empty text box
    //console.log(document.getElementsByClassName('emojionearea').value)

    startCheckingText() // to call the function to start checking the input text
    return created & data && typeOfFeature;

});

$("#emojionearea").emojioneArea({
    pickerPosition: "top",
    filtersPosition: "bottom",
    tones: false,
    autocomplete: false,
    inline: false, //text box resizes with text input
    hidePickerOnBlur: false,
    search: false,
    placeholder: "..."
});
var boxContent;

document.getElementById('Cancel').onclick = function(e) {
    document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null
    myLayer_Button.button.style.opacity = '1';
    myLayer_Button.button.disabled = false;
    myLayer_Button.button.style.backgroundColor = 'grey';

    gps_Button.button.style.opacity = '1';
    gps_Button.button.disabled = false;

    featureType = 'initial';
    alreadyMovedUp = false;
    audioRecorded = false;
    audioButtonClicked = false;
    typeOfFeature = null; //to refresh the var

    clearInterval(refreshPopup)
    map.doubleClickZoom.enable();

    created = false;
    drawnItems.remove();
    drawnItems.clearLayers();

    map.zoomOut(1);
    drawingPoint = false;
    if (isIOS == false) {
        recordedVideo.pause();
        recordedBlobs = null; // audio is removed if cancel is clicked
    }
    setTimeout(function() {

        document.getElementById("tutorial").style.display = "initial";
        document.getElementById("polygon").style.display = "initial";
        document.getElementById("polyline").style.display = "initial";
        document.getElementById("point").style.display = "initial";
        document.getElementById("Cancel").style.display = "none";

        document.getElementById("Download").style.display = "none";
        document.getElementById("DownloadButton").style.display = "none";

        document.getElementById('record').style.display = 'none';
        document.getElementById('enableRecording').style.display = 'none';
        document.getElementById('noAudioIOS').style.display = 'none';

        document.getElementById('activatePlay').style.display = 'none';
        document.getElementById('voice').style.display = 'none';

        document.getElementById('emoji').style.display = 'none';

        document.getElementById('showAreaHa').style.display = 'none';
        document.getElementById('showAreaAcres').style.display = 'none';
        document.getElementById('showLength').style.display = 'none';
        document.getElementById('share-download').style.display = 'none';
    }, 200)

    tempLayer.clearLayers()


  //to load the layer that was there before creating the geometry (2 clicks if localstorage empty, 3 if not). Not best approach but works...:)
    if(myLayer_Button.button.style.backgroundColor == 'black'){
      filter_Button.button.style.opacity = '1';
      filter_Button.button.disabled = false;
      document.getElementById('myLayerButton').click()
      document.getElementById('myLayerButton').click()
      if(localStorageLayer != null){  // because first time app is used mylayer_button has only two positions (local storage is empty)
        document.getElementById('myLayerButton').click()
      }
    }
    if(myLayer_Button.button.style.backgroundColor == 'white'){
      document.getElementById('myLayerButton').click()
      document.getElementById('myLayerButton').click()
      if(localStorageLayer != null){  // because first time app is used mylayer_button has only two positions (local storage is empty)
        document.getElementById('myLayerButton').click()
      }
    }
    if(myLayer_Button.button.style.backgroundColor == 'grey'){
      document.getElementById('myLayerButton').click()
      document.getElementById('myLayerButton').click()
      if(localStorageLayer != null){  // because first time app is used mylayer_button has only two positions (local storage is empty)
        document.getElementById('myLayerButton').click()
      }
    }

  return created & featureType;
}
