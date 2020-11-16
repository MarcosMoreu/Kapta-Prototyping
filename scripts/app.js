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
    myLayer_Button.button.style.backgroundColor = '#43ACF0';

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

            },2200)
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
    var iconGPS = '<img src="images/gpsOff.png" width=40px; height=40px; loading="lazy" text-align="center" style="top:50%" > ';
    var iconOSM = '<img src="images/osm.png" width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-top:2px" > ';
    var iconGOOGLE = '<img src="images/google.png" width=40px; height=40px; loading="lazy" text-align="center" style="top:50%" > ';
    var iconPLANET = '<img src="images/google.png" width=35px; height=35px; loading="lazy" text-align="center" style="top:50%;margin-top:2px" > ';
    var iconLAYERS = '<img src="images/myLayer.png" width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-1px" > ';
    var iconFILTER = '<img src="images/filterIcon.png" width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-1px;margin-bottom:2px" > ';
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
            // document.getElementById('imageryAlert').style.display = 'none'

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
            // document.getElementById('imageryAlert').style.display = 'none'
            map.options.maxZoom = 21; // set the max zoom level to 21 for google imagery
            map.options.minZoom = 2;
            googleSat_Button.removeFrom(map);
            osm_Button.addTo(map);
            myLayer_Button.addTo(map) //keep this, otherwise the button moves up
            if(isOnline == true){
            filter_Button.addTo(map);
            }
            planetScopeMonthlyMosaic.removeFrom(map);
            googleSat.addTo(map);

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
            // googleSat.removeFrom(map);
            osm.removeFrom(map);
            planetScopeMonthlyMosaic.addTo(map);
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

            if(alertAlreadyShown == false){

              document.getElementById("Alert").style.fontSize = "15px";
              document.getElementById('Alert').innerHTML = 'Filter by attribute only filters exact matches. 🚧 To be improved '
              document.getElementById("Alert").style.display = 'initial'
            setTimeout(function(){
              document.getElementById("Alert").style.display = 'none'
            },5000)
            alertAlreadyShown = true
            }

        }else{
            clearInterval(startCheckAttrDateContent)

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
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearchingIOS.gif" text-align="center" width=40px; height=40px;" > '
            }else{
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" text-align="center" width=40px; height=40px;" > '
            }

            var gpsIconIntermitent = setTimeout(function() {
              if (isIOS == true) {
                document.getElementById('gps').innerHTML = '<img src="images/gps.png" text-align="center" width=40px; height=40px; " > '
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
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearchingIOS.gif" text-align="center" width=40px; height=40px;" > '
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
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearchingIOS.gif" text-align="center" width=40px; height=40px; " > '
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
          document.getElementById('gps').innerHTML = '<img src="images/gpsOff.png" text-align="center" width=40px; height=40px; > '
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


function getGeoJSON() {
    $.getJSON({
      cache:false,
      success:cartoGeoJSONLayer,
      url:"https://" + cartousername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + sqlQuery + cartoapiSELECT
    })
    return cartoLoaded && cartoIdFeatureSelected && selectedFeature && cartoGeometries;
};

// if (isOnline == true) {
//
// }

//console.log('cartoIdFeatureSelected  ' + cartoIdFeatureSelected)
//to only load carto layer once the credentials have been loaded from the server xhr2
// var findCartoCredential = setInterval(function() {
//     if (isOnline == true && cartousername != null) {
//       sqlQuery = "SELECT cartodb_id, the_geom, datetime, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring FROM lumblu";
//
//         clearInterval(findCartoCredential);
//         function getGeoJSON() {
//             $.getJSON({
//               cache:false,
//               success:cartoGeoJSONLayer,
//               url:"https://" + cartousername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + sqlQuery + cartoapiSELECT
//             })
//             return cartoLoaded && cartoIdFeatureSelected && selectedFeature && cartoGeometries;
//         };
//         getGeoJSON();
//     }
//     return cartousername
// }, 100)

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
/////////////////LEAFLET DRAW////////
