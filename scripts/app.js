
var planetKey;
//var sentinelKey;
var firebaseKey;
var firebaseConfig;
var cartousername;
var cartoapiSELECT;


/////////////////////////////////////        indexedDB    (under development)      /////////////////////////////
// if (!('indexedDB' in window)) {
//   //console.log('This browser doesn\'t support IndexedDB');
//   //return ;
// }
//
// idb.open(name, version, upgradeCallback)
//
// (function() {
//   'use strict';
//
//   //check for support
//   if (!('indexedDB' in window)) {
//     //console.log('This browser doesn\'t support IndexedDB');
//  //   return;
//   }
//
//   var dbPromise = idb.open('test-db1', 1);
//
// })();

//////////////////////////////////////////////////////////////////////////////////////////////

var isIOS = /iPad|iPhone|iPod|Mac OS X/.test(navigator.userAgent) && !window.MSStream; // Mac OS X correct???

//console.log('isIOS  ' + isIOS)

var isOnline = navigator.onLine
var isOnlineGlobal = isOnline

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

// //console.log('isChrome  '+ isChrome)
//console.log(navigator.onLine)
//console.log(navigator.appVersion)
//console.log(navigator.platform)
//console.log('isoline' + isOnline)

var browserLanguage = navigator.language
//console.log(navigator.language)

//var  timeFinish = today.getHours() + " " + today.getMinutes() + " " + today.getSeconds();
var timeStart = new Date();
//var startDateTime = today.getMinutes() + " " + today.getSeconds()

//console.log(timeStart)

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

///////////////////   to download tiles leaflet.offline NOT USED NOW    //////////////////////////
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

//////////////////////////login initial modal  //////////////

document.getElementById('loginInfo').onclick = function(){
  window.location.href = 'pages/tutorial.html';
}
document.getElementById('loginUnlock').onclick = function(e){
  e.preventDefault() //to avoid reload

  document.getElementById('loginUnlock').style.backgroundColor = '#D5D6D5'
  document.getElementById('enteredPw').style.display = 'initial';
  document.getElementById('enteredPw').focus() //to open keyboard!!!
  document.getElementById('login').style.display = 'initial';
}

////////////////////    login  input    ///////////
var requestPw = function(){
      var pocPw = '2030' //! 🖐️🖐️🖐️ if you are looking at this line, please keep in mind that this very basic security measure is 'only' to prevent, during the testing period,
      // unintended submission by users who have not been informed of the impacts of open land data, both positive and negatives. Thanks ;)

      setTimeout(function(){
        document.getElementById('modal').style.display='block';
        // document.getElementById('enteredPw').click()
      },1000)

      var checkPw = setInterval(function(){
        var pwPlaceholder = document.getElementById('enteredPw').value

        if(pwPlaceholder.length == 4){
          document.getElementById('login').style.borderColor= 'grey'
          document.getElementById('login').disabled = false
          document.getElementById('login').style.opacity='1';
        }
        if(pwPlaceholder.length < 4){
          document.getElementById('login').style.borderColor= 'white'
          document.getElementById('login').style.opacity='0.3';
         document.getElementById('login').disabled = true
        }
      },200)

      document.getElementById('login').onclick = function(e){
        e.preventDefault() // to avoid page reload on first load!

        var pwPlaceholder = document.getElementById('enteredPw').value
        if(pwPlaceholder == pocPw){

          clearInterval(checkPw)
          document.getElementById('enteredPw').style.backgroundColor = '#39F70F'
          setTimeout(function(){
            document.getElementById('modal').style.display='none';
            document.getElementById('pwForm').style.display='none';
          },300)
          localStorage.setItem('pwCorrect', true);
        }else{
          document.getElementById('enteredPw').style.backgroundColor = 'red'
          document.getElementById('enteredPw').focus() //to maintain keyboard if pw wrong

          setTimeout(function(){
            document.getElementById('enteredPw').style.backgroundColor = 'white'
          },300)
        }
      }
    }

////////////////////////////////////////////////////////      first load         /////////////////////////////////////////////////////////////////////////
var isFirstTime; //var to store if the site is visited for the first time
//var oneMapCompleted; // to know if in this session this is the first map or not

var firstLoad = function() { //fucntion to determine if the site is visited for first time
    // Check if localStorage is available (IE8+) and make sure that the visited flag is not already set.
    if (typeof window.localStorage !== "undefined" && !localStorage.getItem('visited')) {
        // Set visited flag in local storage
        localStorage.setItem('visited', true);
        isFirstTime = true;
        /////////////////////    password protection for first time /////////////////
      requestPw()

    } else {
        isFirstTime = false;
        //condition to ensure that if in first load pw was incorrect, pw is requested until correct
        if(!localStorage.getItem('pwCorrect')){
          requestPw()
        }
        //console.log('isFirstTime  '+ isFirstTime)
    }
    return isFirstTime;
}
window.onload = firstLoad;
firstLoad();

//to alert user to use chrome browser (not working yet)
// var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
//
// if(isFirstTime == true && isIOS == false && isChrome == false){
//   if(browserLanguage[0] == 'e' && browserLanguage[1] == 'n'){ //english
//   alert("Please use the Chrome browser");  }
//   if(browserLanguage[0] == 'e' && browserLanguage[1] == 's'){ //spanish
//   alert("Por favor utiliza el navegador Chrome.");  }
//   if(browserLanguage[0] == 'p' && browserLanguage[1] == 't'){ //portuguese
//   alert("Por favor, use o navegador Chrome");  }
//   if(browserLanguage[0] == 'f' && browserLanguage[1] == 'r'){ //french
//   alert("Veuillez utiliser le navigateur Chrome");  }
//   if(browserLanguage == 'sw'){                                //swahili
//   alert("Tafadhali tumia kivinjari cha Chrome");  }
// }

/////////////////////////////////////////////////////////adding map elements///////////////////////////////////////////////////

//to identify last postion, which was stored in localstorage
var lastPositionStoredLOCALLY;
var created = false; // variable to detect wheter the feature (point,line,polygon) has been created
var sameSession = false; //to know if user has already mapped in this session

lastPositionStoredLOCALLY = localStorage.getItem('lastPositionStoredLOCALLY')
//console.log(lastPositionStoredLOCALLY)

//to avoid error if no location was stored either because first load, not allowed, or cache cleared
if (lastPositionStoredLOCALLY != null) {
    lastPositionStoredLOCALLY = lastPositionStoredLOCALLY.split(',') // to convert string to array
    //console.log(lastPositionStoredLOCALLY[0])
}

// function to get coordinates and zoom level from URL, and then use the zoom and center variables to center the map if url != original
var mappos = L.Permalink.getMapLocation();

//////////////////////////////to center map, depending on if location was stored, or if url has coordinates ////////////////////////////////

//to check if the url contains coordinates (z is last possition) and when user copy-paste the url shared, zoom to there //ERROR @attempted to load an infinite number of tiles.
// if(lastPositionUrl == 'z' && sameSession == false){
//   //console.log('map centered as if URL with coordinates')
//
//   var urlCenter = [mySubString[0],mySubString[1]];
//   var urlZoom = mySubString[2];
//
//   var map = L.map('map',{
//           editable:true,
//           //center: [lastPositionStoredLOCALLY[0],lastPositionStoredLOCALLY[1]],
//           center: urlCenter,
//           zoom: urlZoom,
//           // zoom: 10,    /////////what is the most appropriate???/
//           minZoom:3,
//           maxZoom:21,
//           zoomControl:false,
//          attributionControl:false
//         });
//
// }else

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
        //console.log('map centered as if NOT last position')
        var map = L.map('map', {
          //  rotate:true,
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
        //console.log('map centered as if YES last position')

        var map = L.map('map', {
          //  rotate:true,
            editable: true,
            center: [lastPositionStoredLOCALLY[0], lastPositionStoredLOCALLY[1]],
            // center: mappos.center,
            // zoom: mappos.zoom,
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
////console.log(map.getZoom())
////console.log(map.getCenter())

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

var miniMap = new L.Control.GlobeMiniMap(optionsMinimap)//.addTo(map);
////////////////////////////////////

map.addControl(L.control.attribution({
    position: 'bottomright',
    prefix: 'Leaflet'
}));

var scale = L.control.scale({
    maxWidth: 100,
    metric: true,
    imperial: false,
}).addTo(map);


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
var finalLayer;
var groupGeoJSON = []
//the deflate plugin exndens the markerCluster plugin (:true)
var deflated = L.deflate({
    minSize: 100,
    maxsize: 1,
    markerCluster: true,
    markerType: L.marker,
    markerOptions: customDeflateMarkers
})
deflated.addTo(map) // to initialize

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

/////////////////////////////////////       CARTO    ADD TO MAP   //////////////////////////////////////////////

var clusters = L.markerClusterGroup({
    animate: true,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true,
    animateAddingMarkers: true,
});


// Add Data from CARTO using the SQL API. Declare Variables. Create Global Variable to hold CARTO points
var cartoGeometries = null;
var cartoIdFeatureSelected;
var selectedFeature = null;
var featureType = null;
var cartoLoaded;
var clickCountDelete;

var filterIsOn = false
var selectedFeature

var template = document.getElementById('popup')
var getTotalFeaturesInDB

var cartoGeoJSONLayer = function(data) {
    getTotalFeaturesInDB = data.features.length
  //  console.log('cartolayer',data)
    //console.log('cartolayersize ',getTotalFeaturesInDB)

    cartoLoaded = true;
    cartoGeometries = L.geoJson(data, {
        cache:false,
        color: '#AFFDA7',
        //icon: markerIconLocalStorage,
        onEachFeature: function(feature, layer) {
            var audioAvailable = feature.properties.audioavailable

            if (feature.geometry.type == 'Point') {
              // document.getElementById('popupAreaLength').style.display = 'none'
              // document.getElementById('popupArea').onclick = function(){
              //   document.getElementById('popupArea').textContent = 'contentchanged'
              //
              // }
                //layer.bindPopup(feature.properties.landusesemoji + feature.properties.audioavailable);
                // document.getElementById('popupAreaLength').textContent = '-'

                layer.bindPopup(template,{minWidth:200});

            }
            if (feature.geometry.type == 'Polygon') {
              //document.getElementById('popupAreaLength').style.display = 'initial'
              // document.getElementById('popupAreaLength').textContent = feature.properties.areapolygon

                layer.bindPopup(template,{minWidth:200});


                //layer.bindPopup(feature.properties.landusesemoji + feature.properties.audioavailable);
            }
            if (feature.geometry.type == 'LineString') {
              // document.getElementById('popupAreaLength').textContent = feature.properties.lengthline

              layer.bindPopup(template,{minWidth:200});


                // layer.bindPopup(feature.properties.landusesemoji + feature.properties.audioavailable);
            }

            /////////////////////////////
          layer.on('click', function(e) {

              document.getElementById("clearFilter").style.display = "none";
              document.getElementById("applyFilter").style.display = "none";
              document.getElementById("filterByDate").style.display = "none";
              document.getElementById("classification").style.display = "none";
              document.getElementById("emoji").style.display = "none";

              document.getElementById("whatsApp").style.display = "none";
              document.getElementById("telegram").style.display = "none";
              document.getElementById("weChat").style.display = "none";
              document.getElementById("goBackMessagingApps").style.display = "none";

              // myLayer_Button.button.style.opacity = '0.4';
              // myLayer_Button.button.disabled = true;
              // filter_Button.button.style.opacity = '0.4';
              // filter_Button.button.disabled = true;
              // filter_Button.button.style.background = 'black'
              // filterIsOn = false

              // myLayer_Button.removeFrom(map);
              // filter_Button.removeFrom(map);
              // googleSat_Button.removeFrom(map);
              // osm_Button.removeFrom(map);
              // planet_Button.removeFrom(map);
              //
              // miniMap.addTo(map);

              //default option is used to check if the target is not deflated (i.e. a marker). Parenteses IMPORTANT!
              if (!e.target.defaultOptions && e.target.feature.properties.areapolygon != 'Point' && e.target.feature.properties.lengthline != 'Point') { //to avoid enable selected feature when click on deflated polygon or line, which cause error. user must zoom in until polygon displayed. DefaultOptions is only in Points
                  map.closePopup();
                  var currentZoom = map.getZoom()
                  var geometryString = e.target.feature.properties.geometrystring
                  var geometryStringGeoJSON = L.geoJSON(JSON.parse(geometryString))
                  console.log(geometryStringGeoJSON)

                  map.fitBounds(geometryStringGeoJSON.getBounds());
              }
              //the condition below is as it is because geometry column in the DB cannot be accessed while not deflated, so the properties.areas... is used
              if(e.target.feature.geometry.type == 'Point' && map.getZoom() < 15 && e.target.feature.properties.areapolygon == 'Point' && e.target.feature.properties.lengthline == 'Point') {
                  map.closePopup();
                  var geometryString = e.target.feature.properties.geometrystring
                  var geometryStringGeoJSON = L.geoJSON(JSON.parse(geometryString))
                  var coord = e.target.feature.geometry.coordinates;
                  var latLng = L.GeoJSON.coordsToLatLng(coord);

                  map.setView(latLng, 15);
                  layer.closePopup(feature.properties.landusesemoji + feature.properties.audioavailable); //to not open popup after second click

               }else {

                  selectedFeature = e.target;
                  // selectedFeature.editing.enable();

                     if (selectedFeature.feature.geometry.type != 'Point') {
                       //to populate the area/length field in the popup
                        if(selectedFeature.feature.geometry.type == 'Polygon'){
                          document.getElementById('popupAreaLength').style.display = 'initial'
                          document.getElementById('popupAreaLength').textContent = feature.properties.areapolygon

                            if(selectedFeature.feature.properties.audioavailable !='.'){
                              document.getElementById('commentPopup').disabled = false
                              document.getElementById('commentPopup').onclick = function(){
                                window.location.href = feature.properties.audioavailable
                                document.getElementById('commentPopup').disabled = true
                              }
                              document.getElementById('commentPopup').style.display = 'initial';
                              document.getElementById('commentPopup').textContent = '🔊' + ' ' + feature.properties.landusesemoji
                            }else{
                              document.getElementById('commentPopup').style.display = 'initial';
                              document.getElementById('commentPopup').textContent = feature.properties.landusesemoji
                            }


                        }else{ //it a line
                           // document.getElementById('popupAreaLength').style.display = 'initial'
                           // document.getElementById('popupAreaLength').textContent = '〰️'
                           document.getElementById('popupAreaLength').style.display = 'none'


                           if(selectedFeature.feature.properties.audioavailable !='.'){
                             document.getElementById('commentPopup').disabled = false
                             document.getElementById('commentPopup').onclick = function(){
                               window.location.href = feature.properties.audioavailable
                               document.getElementById('commentPopup').disabled = true
                             }
                             document.getElementById('commentPopup').style.display = 'initial';
                             document.getElementById('commentPopup').textContent = '🔊' + ' ' + feature.properties.landusesemoji
                           }else{
                             document.getElementById('commentPopup').style.display = 'initial';
                             document.getElementById('commentPopup').textContent = feature.properties.landusesemoji
                           }
                        }

                      document.getElementById('editDeletePopup').style.display = 'initial'

                       document.getElementById("backDeleteFeature").style.display = "initial";
                       document.getElementById("shareMessagingApp").style.display = "initial";
                       document.getElementById("deleteFeature").style.display = "initial";
                       document.getElementById("deleteFeature").style.opacity = "1";
                       document.getElementById("deleteFeature").disabled = false;
                       document.getElementById("randomSuggestion").style.display = "initial";
                      // miniMap.addTo(map);
                       gps_Button.button.style.opacity = '0.4';
                       gps_Button.button.disabled = true;
                       myLayer_Button.button.style.opacity = '0.4';
                       myLayer_Button.button.disabled = true;
                       filter_Button.button.style.opacity = '0.4';
                       filter_Button.button.disabled = true;

                       // document.getElementById("deleteFeature").style.display = "initial";
                       // document.getElementById("deleteFeature").style.backgroundColor = 'white';
                       document.getElementById("tutorial").style.display = "none";
                       document.getElementById("polygon").style.display = "none";
                       document.getElementById("polyline").style.display = "none";
                       document.getElementById("point").style.display = "none";
                      // random_Button.addTo(map)
                       selectedFeature.setStyle({color: '#F70573'})
                     }
                     //condition below is at is is to avoid deflated symbol to show as selected after polygon/line have been selected
                     if (selectedFeature.feature.geometry.type == 'Point' && map.getZoom() >= 15 && e.target.feature.properties.areapolygon == 'Point' && e.target.feature.properties.lengthline == 'Point') {
                         // document.getElementById('popupAreaLength').style.display = 'initial'
                         // document.getElementById('popupAreaLength').style.height = '📍';
                         document.getElementById('popupAreaLength').style.display = 'none'


                         if(selectedFeature.feature.properties.audioavailable !='.'){
                           document.getElementById('commentPopup').disabled = false
                           document.getElementById('commentPopup').onclick = function(){
                             window.location.href = feature.properties.audioavailable
                             document.getElementById('commentPopup').disabled = true
                           }
                           document.getElementById('commentPopup').style.display = 'initial';
                           document.getElementById('commentPopup').textContent = '🔊' + ' ' + feature.properties.landusesemoji
                         }else{
                           document.getElementById('commentPopup').style.display = 'initial';
                           document.getElementById('commentPopup').textContent = feature.properties.landusesemoji
                         }

                         document.getElementById('editDeletePopup').style.display = 'initial'

                         document.getElementById("backDeleteFeature").style.display = "initial";
                         document.getElementById("shareMessagingApp").style.display = "initial";
                         document.getElementById("deleteFeature").style.display = "initial";
                         document.getElementById("deleteFeature").style.opacity = "1";
                         document.getElementById("deleteFeature").disabled = false;
                         document.getElementById("randomSuggestion").style.display = "initial";
                        // miniMap.addTo(map)
                         gps_Button.button.style.opacity = '0.4';
                         gps_Button.button.disabled = true;
                         myLayer_Button.button.style.opacity = '0.4';
                         myLayer_Button.button.disabled = true;
                         filter_Button.button.style.opacity = '0.4';
                         filter_Button.button.disabled = true;

                         // document.getElementById("deleteFeature").style.display = "initial";
                         // document.getElementById("deleteFeature").style.backgroundColor = 'white';
                         document.getElementById("tutorial").style.display = "none";
                         document.getElementById("polygon").style.display = "none";
                         document.getElementById("polyline").style.display = "none";
                         document.getElementById("point").style.display = "none";
                        // random_Button.addTo(map)
                         selectedFeature.editing.enable();
                    }

                      //to deselect feature if user changes zooms or pans, to avoid deletion without looking at the feature.
                      map.on('zoomend', function(e) {
                          try {
                            deflated.editing.disable();

                          } catch (e) {}

                          clickCountDeleteButton = 0
                          map.closePopup();
                          if(selectedFeature && selectedFeature != null){ //second condition to avoid click when backDeletefeature... not best solution but works
                          document.getElementById("backDeleteFeature").click() // !!!!!!!!
                          }

                      })
                      map.on('moveend', function(e) {
                          try {
                            deflated.editing.disable();
                          } catch (e) {}

                          clickCountDeleteButton = 0
                          map.closePopup();

                          if(selectedFeature && selectedFeature != null){ //second condition to avoid click when backDeletefeature... not best solution but works
                            document.getElementById("backDeleteFeature").click() //!!!!!!!!
                          }
                      })

                      //to store the cartoID of the future selected
                      cartoIdFeatureSelected = selectedFeature.feature.properties.cartodb_id

                }//...else
            });//...layerclick
        }//...oneachfeature
    })//...l.geojson

  try {
    cartoGeometries.addTo(deflated)
  }catch(err){
    console.log('error sql catched due to empty layer after filter applied')
  }
  return cartoGeometries && getTotalFeaturesInDB
};//...CARTO layer



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

//to delete feature
var initialScreen = true;
var clickCountDeleteButton = 0;
document.getElementById("backDeleteFeature").onclick = function() {
  try{
    document.getElementById("popupAreaLength").disabled = true;
    document.getElementById('commentPopup').disabled = true;
  }catch(e){}

    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.dragging.enable();
  //  random_Button.removeFrom(map)
    // myLayer_Button.button.style.opacity = '1';
    // myLayer_Button.button.disabled = false
    // filter_Button.button.style.opacity = '1';
    // filter_Button.button.disabled = false;

    osm_Button.addTo(map);
    googleSat_Button.removeFrom(map);
    planet_Button.removeFrom(map);
    myLayer_Button.addTo(map);
    filter_Button.addTo(map);
    miniMap.remove();

    gps_Button.button.style.opacity = '1';
    gps_Button.button.disabled = false;
    myLayer_Button.button.style.opacity = '1';
    myLayer_Button.button.disabled = false;
    filter_Button.button.style.opacity = '1';
    filter_Button.button.disabled = false;
    filter_Button.button.style.backgroundColor = 'black';

    try { //sometimes this fails
      if (selectedFeature.feature.geometry.type != 'Point') {
          selectedFeature.setStyle({
              color: '#AFFDA7'
          })
      }

        selectedFeature.editing.disable()
    } catch (e) {}
    map.closePopup();
    // map.zoomOut(1)
    selectedFeature = null
    clickCountDeleteButton = 0
    cartoIdFeatureSelected = null;

    document.getElementById("tutorial").style.display = "initial";
    document.getElementById("polygon").style.display = "initial";
    document.getElementById("polyline").style.display = "initial";
    document.getElementById("point").style.display = "initial";

    document.getElementById("backDeleteFeature").style.display = "none";
    document.getElementById("deleteFeature").style.display = 'none';
    document.getElementById("deleteFeature").style.backgroundColor = 'white';
    document.getElementById("deleteFeature").style.borderColor = 'white';
    document.getElementById("imageDeleteFeature").src = 'images/binpre.png'

    document.getElementById("shareMessagingApp").style.opacity = '1';
    document.getElementById("shareMessagingApp").disabled = false;
    document.getElementById("randomSuggestion").style.opacity = '1';
    document.getElementById("randomSuggestion").disabled = false;
    document.getElementById("shareMessagingApp").style.display = "none";
    document.getElementById("randomSuggestion").style.display = "none";

    // document.getElementById("commentFeature").style.display = 'none';
    miniMap.remove() //removeFrom(map) is not used anymore


    return selectedFeature && clickCountDeleteButton && cartoIdFeatureSelected
}
document.getElementById("shareMessagingApp").onclick = function() {

  document.getElementById("backDeleteFeature").style.display = "none";
  document.getElementById("shareMessagingApp").style.display = "none";
  document.getElementById("deleteFeature").style.display = "none";
  document.getElementById("randomSuggestion").style.display = "none";

  document.getElementById("whatsApp").style.display = "initial";
  document.getElementById("telegram").style.display = "initial";
  document.getElementById("weChat").style.display = "initial";
  document.getElementById("goBackMessagingApps").style.display = "initial";

}

document.getElementById("goBackMessagingApps").onclick = function() {
  document.getElementById("whatsApp").style.display = "none";
  document.getElementById("telegram").style.display = "none";
  document.getElementById("weChat").style.display = "none";
  document.getElementById("goBackMessagingApps").style.display = "none";

  document.getElementById("backDeleteFeature").style.display = "initial";
  document.getElementById("shareMessagingApp").style.display = "initial";
  document.getElementById("deleteFeature").style.display = "initial";
  document.getElementById("deleteFeature").style.backgroundColor = 'white';
  document.getElementById("deleteFeature").style.borderColor = 'white';
  document.getElementById("imageDeleteFeature").src = 'images/binpre.png'
  document.getElementById("randomSuggestion").style.display = "initial";

}

document.getElementById("whatsApp").onclick = function() {
  //alert('Under development. Available soon.');
  //  window.location.href = "https://wa.me/whatsappphonenumber/?text=urlencodedtext";
  window.location.href='https://wa.me/?text='+encodeURIComponent(window.location.href)
}

document.getElementById("telegram").onclick = function() {
//  alert('🚧 Telegram sharing option not available yet.');
  window.location.href='https://telegram.me/?text='+encodeURIComponent(window.location.href)
}

document.getElementById("weChat").onclick = function() {
  //alert('🚧 WeChat sharing option not available yet.');

  // window.location.href='weixin://'  // to launch the app without url copied
  window.location.href='weixin://?text='+encodeURIComponent(window.location.href)

}
document.getElementById("editDeletePopup").onclick = function() {

  document.getElementById("editDeletePopup").style.display = "none";

  document.getElementById("backDeleteFeature").style.display = "none";
  document.getElementById("shareMessagingApp").style.display = "none";
  document.getElementById("deleteFeature").style.display = "none";
  document.getElementById("randomSuggestion").style.display = "none";

  gps_Button.button.style.opacity = '0.4';
  gps_Button.button.disabled = true;

  document.getElementById('deleteInPopUp').style.display = 'initial';
  document.getElementById('toCommentPopup').style.display = 'initial';
  document.getElementById('backEditDelete').style.display = 'initial';
  document.getElementById("classification").style.display = "initial";
  document.getElementById("emoji").style.display = "initial";
  document.getElementById("emoji").disabled = true;
  document.getElementById("emoji").style.opacity = '0.4';
  document.getElementById('noAudioIOS').style.display = 'initial';
  document.getElementById('noAudioIOS').disabled = true;
  document.getElementById('noAudioIOS').style.opacity = '0.4';
  document.getElementById('share-download').style.display = 'initial';
  document.getElementById('share-download').disabled = true;
  document.getElementById('share-download').style.opacity = '0.4';

  try{
    document.getElementById("popupAreaLength").disabled = false;
    document.getElementById('commentPopup').disabled = false;
  }catch(e){}


  // map.click.disable();
  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();

  map.on('click', function(e){
    try{
      document.getElementById('deleteInPopUp').style.display = 'none';
      document.getElementById('toCommentPopup').style.display = 'none';
    }catch(e){}
  })
}

// document.getElementById('deleteInPopUp').onclick = function(){
//
//   if(document.getElementById("imageDeleteInPopup").style.background == 'white'){
//     document.getElementById("imageDeleteInPopup").style.background = 'red'
//   }else {
//     document.getElementById("imageDeleteInPopup").style.background = 'white'
//
//     document.getElementById("classification").style.display = "none";
//     document.getElementById("emoji").style.display = "none";
//     document.getElementById('noAudioIOS').style.display = 'none';
//     document.getElementById('share-download').style.display = 'none';
//     document.getElementById("editDelete").style.display = "none";
//     document.getElementById("shareMessagingApp").style.display = "none";
//     document.getElementById('randomSuggestion').style.display = 'none';
//     document.getElementById('backDeleteFeature').style.display = 'none';
//     document.getElementById('backEditDelete').style.display = 'none';
//
//     document.getElementById('deleteInPopUp').style.display = 'none';
//     document.getElementById('toCommentPopup').style.display = 'none';
//
//
//
//     map.touchZoom.enable();
//     map.doubleClickZoom.enable();
//     map.scrollWheelZoom.enable();
//     map.dragging.enable();
//
//     // if (clickCountDeleteButton == 0) {
//     //     document.getElementById("deleteFeature").style.backgroundColor = '#F70573';
//     //     clickCountDeleteButton = 1
//     // } else {
//     //     clickCountDeleteButton = 0
//     //     //console.log('feature deleted')
//
//
//         osm_Button.addTo(map)
//         myLayer_Button.addTo(map);
//         filter_Button.addTo(map);
//         myLayer_Button.button.style.opacity = '1';
//         myLayer_Button.button.disabled = false
//         filter_Button.button.style.opacity = '1';
//         filter_Button.button.disabled = false;
//         gps_Button.button.style.opacity = '1';
//         gps_Button.button.disabled = false;
//
//         document.getElementById("tutorial").style.display = "initial";
//         document.getElementById("polygon").style.display = "initial";
//         document.getElementById("polyline").style.display = "initial";
//         document.getElementById("point").style.display = "initial";
//         miniMap.remove()
//         //to remove feature from geoJSON
//         deflated.removeLayer(selectedFeature)
//         selectedFeature = null
//
//         //we call the setData() function here to delete from cartodb
//          setData()
//     // }
//     return selectedFeature
//   }
// }


document.getElementById('backEditDelete').onclick = function(){

  document.getElementById("deleteFeature").style.backgroundColor = 'white';
  document.getElementById("deleteFeature").style.borderColor = 'white';
  document.getElementById("imageDeleteFeature").src = 'images/binpre.png';
  document.getElementById("shareMessagingApp").style.opacity = '1';
  document.getElementById("shareMessagingApp").disabled = false;
  document.getElementById("randomSuggestion").style.opacity = '1';
  document.getElementById("randomSuggestion").disabled = false;
  document.getElementById("shareMessagingApp").style.display = "none";
  document.getElementById("randomSuggestion").style.display = "none";
  clickCountDeleteButton = 0;

  try{
    document.getElementById('editDeletePopup').style.display = 'initial'

    document.getElementById('deleteInPopUp').style.display = 'none';
    document.getElementById('toCommentPopup').style.display = 'none';
    document.getElementById("imageDeleteInPopup").style.background = 'white';


  }catch(e){}
  document.getElementById('backEditDelete').style.display = 'none';

  gps_Button.button.style.opacity = '1';
  gps_Button.button.disabled = false;

  document.getElementById("classification").style.display = "none";
  document.getElementById("emoji").style.display = "none";
  document.getElementById("emoji").disabled = false;
  document.getElementById("emoji").opacity = '1';
  document.getElementById('noAudioIOS').style.display = 'none';
  document.getElementById('noAudioIOS').disabled = false;
  document.getElementById('noAudioIOS').opacity = '1';
  document.getElementById('share-download').style.display = 'none';
  document.getElementById('share-download').disabled = false;
  document.getElementById('share-download').opacity = '1';
  document.getElementById('deleteFeature').style.display = 'none';

  document.getElementById("tutorial").style.display = "initial";
  document.getElementById("polygon").style.display = "initial";
  document.getElementById("polyline").style.display = "initial";
  document.getElementById("point").style.display = "initial";

  try{
    document.getElementById("popupAreaLength").disabled = true;
    document.getElementById('commentPopup').disabled = true;
  }catch(e){}

  try { //sometimes this fails
    if (selectedFeature.feature.geometry.type != 'Point') {
        selectedFeature.setStyle({
            color: '#AFFDA7'
        })
    }

       selectedFeature.editing.disable();
      // deflated.editing.disable(); //to do not activate zoomend and move
  } catch (e) {}
  // deflated.removeLayer(selectedFeature)

  osm_Button.addTo(map);
  googleSat_Button.removeFrom(map);
  planet_Button.removeFrom(map);
  myLayer_Button.addTo(map);
  filter_Button.addTo(map);

  map.closePopup();
  try{
    miniMap.remove()
  }catch(e){}

  // map.click.enable();
  map.dragging.enable();
  map.touchZoom.enable();
  map.doubleClickZoom.enable();
  map.scrollWheelZoom.enable();


  selectedFeature = null;
  return selectedFeature && clickCountDeleteButton
}


document.getElementById("randomSuggestion").onclick = function() {
  document.getElementById("randomSuggestion").style.backgroundColor = 'yellow'
  document.getElementById("randomSuggestion").style.borderColor = 'yellow'
  document.getElementById("deleteFeature").style.opacity = "0.4";
  document.getElementById("deleteFeature").disabled = true;
  document.getElementById("imageDeleteFeature").src = 'images/binpre.png'

  setTimeout(function(){
    document.getElementById("randomSuggestion").style.backgroundColor = '#3B96DD'
    document.getElementById("randomSuggestion").style.borderColor = '#3B96DD'

  },500)
  document.getElementById('imageryAlert').style.display = 'initial'
  setTimeout(function(){
    document.getElementById('imageryAlert').style.display = 'none'
  },10000)

  var maxValueDeflated = deflated._layers.length
  var minValueDeflated = (deflated._layers.length) - 10
  //var randomNumberRanged = Math.trunc(Math.random() * (maxValueDeflated - minValueDeflated) + minValueDeflated);
  var randomNumberRanged = Math.trunc(Math.random() * 11);

  var someNeutralPoints = [[51.477965,-0.001467],[-0.000215,37.070231],[13.597167,-88.837874],[35.956888,-5.604401],[41.511377,-0.001191],[78.236011,15.491409],[27.988129,86.924973],[34.391822,132.452095],[46.234107,6.055736],[0.010986,-0.003605],[-30.31276,149.565484]] //Prime meridian1,Estrecho1,Kenyaecuator1,volcan ss1,hiroshima1, everest1, cern1,greenwichspain1,global seed1,nullisland1, australia observatory...
  var pointSelected = someNeutralPoints[randomNumberRanged]
  console.log(pointSelected)
  //console.log(deflated._layers[randomNumberRanged])
  //var randomFeature = deflated._layers[randomNumberRanged]//without   .feature.geometry;
//  map.fitBounds(randomFeature.getBounds());
//
  map.setView(pointSelected,15)

  //to maintain button and minimap, otherwise is removed
  document.getElementById("backDeleteFeature").style.display = "initial";
  document.getElementById("shareMessagingApp").style.display = "initial";
  document.getElementById("deleteFeature").style.display = "initial";
  document.getElementById("randomSuggestion").style.display = "initial";

  // myLayer_Button.button.style.opacity = '0.4';
  // myLayer_Button.button.disabled = true;
  // filter_Button.button.style.opacity = '0.4';
  // filter_Button.button.disabled = true;
  // filter_Button.button.style.background = 'black'

  miniMap.addTo(map)
  osm_Button.removeFrom(map);
  googleSat_Button.removeFrom(map);
  planet_Button.removeFrom(map);
  myLayer_Button.removeFrom(map);
  filter_Button.removeFrom(map);

  setTimeout(function(){
    console.log(basemapOn)
    miniMap.remove()

      if(basemapOn == 'googleSat'){
        osm_Button.addTo(map);
      }
      if(basemapOn == 'osm'){
        planet_Button.addTo(map);
      }
      if(basemapOn == 'planet'){
        googleSat_Button.addTo(map);
      }
      myLayer_Button.addTo(map);
      filter_Button.addTo(map);
  },3000)

  // document.getElementById("deleteFeature").style.display = "initial";
  // document.getElementById("deleteFeature").style.backgroundColor = 'white';
  document.getElementById("tutorial").style.display = "none";
  document.getElementById("polygon").style.display = "none";
  document.getElementById("polyline").style.display = "none";
  document.getElementById("point").style.display = "none";
//alert('under development')

}


document.getElementById("deleteFeature").onclick = function() {

    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.dragging.enable();



    if (clickCountDeleteButton == 0) {
        document.getElementById("deleteFeature").style.backgroundColor = 'red';
        document.getElementById("deleteFeature").style.borderColor = 'black';
        document.getElementById("imageDeleteFeature").src = 'images/binpost.png';
        document.getElementById("shareMessagingApp").style.opacity = '0.4';
        document.getElementById("shareMessagingApp").disabled = true;
        document.getElementById("randomSuggestion").style.opacity = '0.4';
        document.getElementById("randomSuggestion").disabled = true;

        clickCountDeleteButton = 1
    } else {
        clickCountDeleteButton = 0
        //console.log('feature deleted')

        osm_Button.addTo(map);
        googleSat_Button.removeFrom(map);
        planet_Button.removeFrom(map);
        myLayer_Button.addTo(map);
        filter_Button.addTo(map);

        myLayer_Button.button.style.opacity = '1';
        myLayer_Button.button.disabled = false
        filter_Button.button.style.opacity = '1';
        filter_Button.button.disabled = false;

        gps_Button.button.style.opacity = '1';
        gps_Button.button.disabled = false;

        document.getElementById("tutorial").style.display = "initial";
        document.getElementById("polygon").style.display = "initial";
        document.getElementById("polyline").style.display = "initial";
        document.getElementById("point").style.display = "initial";
        miniMap.remove()

        document.getElementById("backDeleteFeature").style.display = "none";
        document.getElementById("deleteFeature").style.display = "none";
        document.getElementById("deleteFeature").style.backgroundColor = 'white';
        document.getElementById("deleteFeature").style.borderColor = 'white';
        document.getElementById("imageDeleteFeature").src = 'images/binpre.png';
        document.getElementById("shareMessagingApp").style.opacity = '1';
        document.getElementById("shareMessagingApp").disabled = false;
        document.getElementById("randomSuggestion").style.opacity = '1';
        document.getElementById("randomSuggestion").disabled = false;
        document.getElementById("shareMessagingApp").style.display = "none";
        document.getElementById("randomSuggestion").style.display = "none";



        //  document.getElementById("deleteFeature").style.borderColor = 'white'

        //to remove feature from geoJSON
        deflated.removeLayer(selectedFeature)
        selectedFeature = null

        //we call the setData() function here to delete from cartodb
        setData()
    }
    return selectedFeature && clickCountDeleteButton && clickCountDelete
}

// document.getElementById("deleteFeature").onclick = function() {
//
//     map.touchZoom.enable();
//     map.doubleClickZoom.enable();
//     map.scrollWheelZoom.enable();
//     map.dragging.enable();
//
//     if (clickCountDeleteButton == 0) {
//         document.getElementById("deleteFeature").style.backgroundColor = '#F70573';
//         clickCountDeleteButton = 1
//     } else {
//         clickCountDeleteButton = 0
//         //console.log('feature deleted')
//
//         myLayer_Button.button.style.opacity = '1';
//         myLayer_Button.button.disabled = false
//         filter_Button.button.style.opacity = '1';
//         filter_Button.button.disabled = false;
//
//         document.getElementById("tutorial").style.display = "initial";
//         document.getElementById("polygon").style.display = "initial";
//         document.getElementById("polyline").style.display = "initial";
//         document.getElementById("point").style.display = "initial";
//         miniMap.remove()
//
//         document.getElementById("backDeleteFeature").style.display = "none";
//         document.getElementById("shareMessagingApp").style.display = "none";
//         document.getElementById("commentFeature").style.display = "none";
//
//         document.getElementById("deleteFeature").style.display = "none";
//         document.getElementById("deleteFeature").style.backgroundColor = 'white'
//         //  document.getElementById("deleteFeature").style.borderColor = 'white'
//
//         //to remove feature from geoJSON
//         deflated.removeLayer(selectedFeature)
//         selectedFeature = null
//
//         //we call the setData() function here to delete from cartodb
//         setData()
//     }
//     return selectedFeature && clickCountDeleteButton && clickCountDelete
// }

  // document.getElementById("commentFeature").onclick = function() {
  //   alert('🚧 Edit attribute functionality under development. Available soon.');
  // }


///////////////////////////////////////////////////////////////////////////////////////////////////////
var googleSat = L.tileLayer.offline('https://mt.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', tilesDb, {
    minZoom: 2,
    maxZoom: 21,
    maxNativeZoom: 21,
    //transparent: false,
    //border: 'solid black 5px',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Google Imagery'
}).addTo(map);

var osm = L.tileLayer.offline('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', tilesDb, {
    minZoom: 2,
    maxZoom: 19,
    maxNativeZoom: 19,
    // subdomains:['mt0','mt1','mt2','mt3'],
    attribution: 'OpenStreetMap Contributors'

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

var clickButtonCount = 0;

//to set the position of icon in leaflet easybutton based on OS - ios does not center the image. Not optimal...
if (isIOS == true) {
    var iconGPS = '<img src="images/gps.png" width=40px; height=40px; style="margin-left:-5px" > ';
    var iconOSM = '<img src="images/osm.png" width=40px; height=40px; style="margin-left:-5px" > ';
    var iconGOOGLE = '<img src="images/google.png" width=40px; height=40px; style="margin-left:-5px" > ';
    var iconPLANET = '<img src="images/planet.png" width=40px; height=40px; style="margin-left:-5px" > ';
    var iconLAYERS = '<img src="images/myLayer.png" width=40px; height=40px; style="margin-left:-5px" > ';
    var iconFILTER = '<img src="images/filterIcon.png" width=40px; height=40px; style="margin-left:-5px" > ';
    var iconRANDOM = '<img src="images/gps.png" width=40px; height=40px; style="margin-left:-5px" > ';

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
osm_Button.addTo(map);

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


            // var planetS6 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200411_104056_53_105e/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });
            // var planetS7 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200411_104054_50_105e/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });
            // ////CAMEROON//////////////////////
            // var planetS8 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200402_080331_1043/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });
            // var planetS9 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200402_080330_1043/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });
            // var planetS10 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200402_080329_1043/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });
            // /////NAIROBI/////////////////////////////
            // var planetS11 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200306_073616_1011/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });
            // var planetS12 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200306_073615_1011/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });
            // ///////TSUMKWE////////////////////////
            // var planetS13 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200416_083425_1018/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });
            // ///////f spain////////////////////////
            // var planetS14 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200403_105241_78_1064/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });
            // var planetS15 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200403_105239_76_1064/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });
            // //////ITEN kenya///////////////
            // var planetS16 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200410_083657_42_1065/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            //     attribution: 'Planet/Sentinel Imagery MAY-JULY 2020'
            // });
            // var planetS17 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200410_074244_1018/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });
            // var planetS18 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200410_074243_1018/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });
            // ///////LONDON/////////////////
            // var planetS19 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200411_104513_103d/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });
            // var planetS20 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200411_104512_103d/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });
            // var planetS21 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200411_104511_103d/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });
            // ///////LJUBLJANA/////////////////
            // var planetS22 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200715_093554_1032/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });
            // ///////VIENA/////////////////
            // var planetS23 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200730_093028_101b/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });
            // ///////NOVI SAD/////////////////
            // var planetS24 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200730_091658_1040/{z}/{x}/{y}.png?api_key=" + planetKey + "", {
            //     maxZoom: 18,
            //     maxNativeZoom: 20,
            //     subdomains: ['tiles0', 'tiles1', 'tiles2', 'tiles3'],
            // });

            //  planet = L.layerGroup([planetS6, planetS7, planetS8, planetS9, planetS10, planetS11, planetS12, planetS13, planetS14, planetS15, planetS16, planetS17, planetS18, planetS19, planetS20, planetS21, planetS22, planetS23, planetS24]);

            ////////////////// Sentinel-hub (level 2 chosen as it allow any zoom level) ////////////////
            // wmsSentinel2 = L.tileLayer.wms("https://services.sentinel-hub.com/ogc/wms/" + sentinelKey + "?REQUEST=GetMap&PREVIEW=2", {
            //     layers: 'P4',
            //     // attribution: 'Sentinel 2 Imagery May 2020'
            // });

          //  wmsSentinel2 = L.tileLayer.wms('https://tiles0.planet.com/basemaps/v1/planet-tiles/global_monthly_2016_05_mosaic/gmap/0/0/0.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a')

          planetScopeMonthlyMosaic = L.tileLayer.wms('https://tiles.planet.com/basemaps/v1/planet-tiles/global_monthly_2020_09_mosaic/gmap/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
            attribution: 'PlanetScope Imagery  Sept 2020'
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
}).addTo(map); //always on as there will always be features in the map, even when first load

myLayer_Button.button.style.width = '50px';
myLayer_Button.button.style.height = '50px';
myLayer_Button.button.style.transitionDuration = '.3s';
myLayer_Button.button.style.backgroundColor = 'black';

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
}).addTo(map);



filter_Button.button.style.width = '50px';
filter_Button.button.style.height = '50px';
filter_Button.button.style.transitionDuration = '.3s';
filter_Button.button.style.backgroundColor = 'black';
filter_Button.addTo(map);
if(isOnline == false){
  filter_Button.button.style.opacity = '0.4';
  filter_Button.button.disabled = true;
}

//
// //Button for RANDOM SUGGESTION
// var random_Button = L.easyButton({
//     id: 'random',
//     position: 'topright',
//     states: [{
//         icon: iconRANDOM,
//         stateName: 'check-mark',
//         onClick: function(btn, map) {
//           alert('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
//       }
//     }]
// })//.addTo(map);
//
// random_Button.button.style.width = '50px';
// random_Button.button.style.height = '50px';
// random_Button.button.style.transitionDuration = '.3s';
// random_Button.button.style.backgroundColor = 'black';

//////////////////////////// actions for bottom-of-screen filtering buttons

//script for apply filters
document.getElementById("applyFilter").onclick = function(e) {
  document.getElementById("alertApplyFilter").style.display = 'initial'
  setTimeout(function(){
    document.getElementById("alertApplyFilter").style.display = 'none'
  }, 5000)


    boxContentFiltering = document.getElementById('emojionearea').value;
    //console.log(boxContentFiltering)
    //console.log(getboxContentFiltering())
    try {
      deflated.clearLayers() // clearLayers instead of cartoGeometries, as this doesn't contain all geometries after 'sent'
      //cartoGeometries.removeFrom(deflated)
    } catch (err) {
      console.log('error sql catched due to empty layer after filter applied')
    }
    var sqlQueryWithoutCondition = "SELECT cartodb_id, the_geom, datetime, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring FROM lumblu WHERE landusesemoji LIKE '";
    var sqlCondition = boxContentFiltering +"'";
    sqlQuery = sqlQueryWithoutCondition + sqlCondition
    getGeoJSON()

    filterApplied = true
    return filterApplied

}

//script for remove filters
document.getElementById("clearFilter").onclick = function(e) {
  document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null;

  try {
    deflated.clearLayers()  // clearLayers instead of cartoGeometries, as this doesn't contain all geometries after 'sent'
  //  cartoGeometries.removeFrom(deflated)
  } catch (err) {
    console.log('error sql catched due to empty layer after filter applied  ')

  }
  sqlQuery = "SELECT cartodb_id, the_geom, datetime, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring FROM lumblu"
  getGeoJSON()
//  deflated.addTo(map)
  filterApplied = false
  return filterApplied

};

var dateFilterValue; //to apply this value when applyFilter is clicked
document.getElementById("filterByDate").onclick = function(e) {
  var img =  document.getElementById("imgFilterByDate")
    if (img.src.match("dateAll")) { //all (infiinite)
      img.src = 'images/dateYear.png'
      dateFilterValue = 'Year'
      //alert while on development
      document.getElementById('alertFilterDate').style.display = 'initial'
      setTimeout(function(){
        document.getElementById('alertFilterDate').style.display = 'none'
      },5000)

    }else if (img.src.match("dateYear")) { //1 year
      img.src = 'images/dateMonth.png'
      dateFilterValue = 'Month'
    }else if (img.src.match("dateMonth")) { //1 month
      img.src = 'images/dateWeek.png'
      dateFilterValue = 'Week'
    }else if (img.src.match("dateWeek")) { //1 week
      img.src = 'images/dateDay.png'
      dateFilterValue = 'Day'
    }else if (img.src.match("dateDay")) { // 1 day
      img.src = 'images/dateAll.png'
      dateFilterValue = 'All'
    }
//console.log(dateFilterValue)
  return dateFilterValue
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

// add location via browser geolocation
var currentLocation = []; // variable created to allow the user recenter the map
var accuracy = 0
var markerAdded = false; // var to avoid multiple markers

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

var locationFound = false;
var audioRecorded = false;
var circleGT250
var circleLT250
var circleLT250Added = false
var circleGT250Added = false


var refreshGPSbutton = setInterval(function() { ///////////////////////////////////////// function to keep searching for gps position
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
            document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" width=40px; height=40px; style="margin-left:-1px" > '

            var gpsIconIntermitent = setTimeout(function() {
              document.getElementById('gps').innerHTML = '<img src="images/gps.png" width=40px; height=40px; style="margin-left:-1px" > '
            },6400) // time required for three repetitions of the gif

            clearInterval(refreshGPSbutton) //stop searching once accuracy <50
            L.marker(currentLocation, {
                icon: gpsIcon,
                draggable:false
            }).addTo(map);

        } else if (accuracy > 50 && accuracy <= 250) {

            gps_Button.button.style.backgroundColor = 'yellow';
            document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" width=40px; height=40px; style="margin-left:-1px" > '
            //if accuracy >50, keep searching
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
            document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" width=40px; height=40px; style="margin-left:-1px" > '

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
        document.getElementById('gps').innerHTML = '<img src="images/gpsOff.png" width=40px; height=40px; style="margin-left:-1px" > '

        try {
            navigator.geolocation.watchPosition(findBuffer);
        } catch (err) {
            currentLocation == null;
        }
    }
    return currentLocation & circleLT250Added & circleGT250Added & circleLT250 & circleGT250;
  }
}, 1000)


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
                miniMap.addTo(map)
              }catch(e){}

                setTimeout(function(){
                  try{
                    miniMap.remove()
                  }catch(e){}
                  osm_Button.addTo(map);
                  googleSat_Button.removeFrom(map);
                  planet_Button.removeFrom(map);
                  myLayer_Button.addTo(map);
                  filter_Button.addTo(map);
                },2000)


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

gps_Button.addTo(map);

var rose = L.control.rose('rose', {
    position: 'topleft',
    icon: 'nautical',
    iSize: 'medium',
    opacity: 1
});
rose.addTo(map)

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

/////////////// messages for tileS download   (NOT USED CURRENTLY)     /////////
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

/////////////////////////////////////////    Initial state of buttons       //////////////////////////////////////
// improve by selecting by class...
document.getElementById("goBack2").style.display = "none";
document.getElementById("deleteLastVertex").style.display = "none";
document.getElementById("deleteAllVertexs").style.display = "none";
document.getElementById("deleteLastVertexLine").style.display = "none";
document.getElementById("deleteAllVertexsLine").style.display = "none";
document.getElementById("completeFeature").style.display = "none";

document.getElementById("map").style.display = "initial";
document.getElementById("polygon").style.display = "initial";
document.getElementById("polyline").style.display = "initial";
document.getElementById("point").style.display = "initial";

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

document.getElementById("map").style.display = "block";

document.getElementById("tutorial").style.display = "initial";
document.getElementById("polygon").style.display = "initial";
document.getElementById("polyline").style.display = "initial";
document.getElementById("point").style.display = "initial";

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

var mapCurrentBounds;
var mapCurrentZoom;
var mapCurrentCenter;

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
/////////////////////////////////////////////////////////////////////////////////////////////////////
//functions to move map up/down when emoji menu is opened/closed ONLY IN 'SMALL' SCREENS. The funciton is called in emojionearea.js
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var screenwidth = screen.width
var screenwithWithMargins = screenwidth * 0.3
var screenheight = screen.height
var screensize = 'W'+ screenwidth + ' x ' + 'H' + screenheight
console.log('screenheight ' + screenheight)
console.log('screenwidth ' + screenwidth)
console.log(screensize)

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

var refreshPopup;
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

////////////////////////////         audio          ///////////////////////////////

document.getElementById('noAudioIOS').onclick = function(e) {

    if (browserLanguage[0] == 'e' && browserLanguage[1] == 'n') { //english
        alert("🚧 Voice recording not yet available for iPhone,iPad or Mac.");
    }
    if (browserLanguage[0] == 'e' && browserLanguage[1] == 's') { //spanish
        alert("🚧 La grabación de voz aún no está disponible para iPhone, iPad o Mac.");
    }
    if (browserLanguage[0] == 'p' && browserLanguage[1] == 't') { //portuguese
        alert("🚧 A gravação de voz ainda não está disponível para iPhone, iPad ou Mac.");
    }
    if (browserLanguage[0] == 'f' && browserLanguage[1] == 'r') { //french
        alert("🚧 L'enregistrement vocal n'est pas encore disponible pour iPhone, iPad ou Mac.");
    }
    if (browserLanguage == 'sw') { //swahili
        alert("🚧 Kurekodi kwa sauti bado haipatikani kwa iPhone, iPad au Mac.");
    }
}

if (isIOS == false) {
    document.getElementById('enableRecording').onclick = function(e) {
        setTimeout(function() {
            document.getElementById('record').style.display = 'initial';
            document.getElementById('record').style.opacity = '1';
            document.getElementById('enableRecording').style.display = 'none';
        }, 200)
    }
}

////////////////////////////////////////////////////////classify screen, audio//////////////////////////////////////////////////////////////

//function to stop the recording after X seconds. The function is called when right after the recording is activated (i.e. when click if recording == false)
function stopAudioAutomatically() {
    if (document.getElementById('record').style.backgroundColor == 'yellow') {
        //console.log('auto activated')
        setTimeout(function() {
            if (document.getElementById('record').style.backgroundColor == 'yellow') { //condition to avoid that the button is autom clicked even
                // when the recording is stopped but was previously yellow. If after X seconds is white, should not be clicked.
                document.getElementById('record').click();
            }
        }, 30000) // 30 seconds is the appropriate time?
    }
}

//console.log(isOnlineGlobal)

document.getElementById('record').onclick = function(e) {
    //console.log('clicked manual' + new Date)
    //console.log(created)

    if (recording == false) {
        document.getElementById('voiceGif').play()
        this.style.backgroundColor = 'yellow';
        this.style.borderColor = 'yellow';

        document.getElementById('activatePlay').style.display = 'none';
        document.getElementById('storeAudio').style.opacity = '0.1';
        document.getElementById('emoji').style.display = 'none';
        document.getElementById('voice').style.display = 'initial';
        document.getElementById('voice').style.opacity = '1';
        //script to identify the screen width to maintain the width of the voiceGif element
        var width = window.innerWidth
        //console.log(width)
        width = width - 190;
        width = width + 'px'
        //console.log(width)

        stopAudioAutomatically();
    }
    if (recording == true) {

        audioRecorded = true;
        //to activate share-download button when audio is recorded
        document.getElementById("share-download").style.opacity = "1";
        document.getElementById("share-download").disabled = false;

        this.style.backgroundColor = 'white';
        document.getElementById('voiceGif').pause()

        document.getElementById('activatePlay').style.display = 'initial';
        document.getElementById('activatePlay').style.opacity = '1';
        document.getElementById('storeAudio').style.opacity = '1';
        document.getElementById('emoji').style.display = 'initial';
        document.getElementById('voice').style.display = 'none';
        document.getElementById('voice').style.opacity = '0';

        audioStoppedManually = true
    }

    document.getElementById('gum').style.display = 'none';
    document.getElementById('recorded').style.display = 'none';
    document.getElementById('echoCancellation').style.display = 'none';
    return audioRecorded
}

document.getElementById('activatePlay').onclick = function(e) {
    document.getElementById("play").click(); //added so no need to click button twice
    document.getElementById('activatePlay').style.background = 'grey'
    setTimeout(function() {
        document.getElementById('activatePlay').style.background = 'white'
    }, 500)
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////   FIREBASE CODE   ///////////////////////////////////////////////////////////////

var files = [];
var filesLength;
var storage;
var percentage
var finalPercentage = []
var finalUrlAudio

/////sendFirebase script that will be fire when 'Download' is clicked.
if (isIOS == false) {
    document.getElementById("sendFirebase").onclick = function(e) {
        //Loops through all the selected files . To send also the geojson file to firebase, then activate this line !!!!!!!
        for (let i = 1; i < filesLength; i++) { //there will be only 2 files
            //create a storage reference

            //console.log(files[i])
            //console.log(typeof files[i])
            storage = firebase.storage().ref(files[i].name);
            //console.log(storage)
            //upload file
            var upload = storage.put(files[i]);
            //update progress bar
            var completed;
            upload.on(
                "state_changed",
                function progress(snapshot) {
                    percentage =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    document.getElementById("progress").value = percentage;
                    //console.log(percentage)
                    finalPercentage[i] = percentage

                    return finalPercentage
                },
            );
        }

        setTimeout(function() {
            //to send also the geojson file to firebase, then activate this line !!!!!!!!!!

            if (recordedBlobs != null) {
                firebase.storage().ref(files[1].name).getDownloadURL().then(function(url) {
                    finalUrlAudio = url;
                    //console.log(url);
                    return finalUrlAudio
                })
            }
        }, 1000);
    };
}

///////////////////  end of  firebase code   ///////////////

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
var finished = false; // variable to openpopup only when file downloaded, not when loaded from local storage
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

////////////////////////////////////////////      Download     /////////////////////////////////////////////////////////////////////////////////////////////
var convertedData;
var data;
var dataGeometry;
var dataGeometry;
var blob;
var dateTimeRandomID;
var timeFinish;
var diffTimes;

document.getElementById('share-download').onclick = function(e) {
    sameSession = true;
    alreadyMovedUp = false;
    audioRecorded = false;
    typeOfFeature = null;
    drawingPoint = false //to reset value for this session
    clearInterval(refreshPopup) //to stop searching for changes in the textbox
    var getUrl = window.location.href
    //console.log(getUrl)

    //here we generate a random ID so when offline the downloaded file is not duplicated
    var randomNumber = Math.random();
    randomNumber = randomNumber * 10000;
    var randomID = Math.round(randomNumber);
    //here the datetime
    var timeEnd = new Date();
    var date = timeEnd.getFullYear() + ' ' + (timeEnd.getMonth() + 1) + ' ' + timeEnd.getDate();
    var time = timeEnd.getHours() + " " + timeEnd.getMinutes() + " " + timeEnd.getSeconds();
    var dateTime = date + ' - ' + time;

    ////////////////////// get time spend on mapping (in seconds)///////////////////////////////////////
    var res = Math.abs(timeStart - timeEnd) / 1000;
    var minutes = Math.floor(res / 60) % 60;
    var minutesToSeconds = minutes * 60
    var seconds = res % 60;
    var totalTimeSpent = seconds + minutesToSeconds
    //console.log('secondsSpent' + totalTimeSpent)

    /////////////script to obfuscate user's currentLocation, in case user allow geolocation//////////////////
    if (currentLocation[0] != null) {
        var currentLocationString = currentLocation.toString();
        featureApproxLocation = map.getCenter() // instaead of recoding the coordinates of the feature, we simply record the center of the screen once drawn

        var latlngFrom = L.latLng(featureApproxLocation)
        var latlngTo = L.latLng(currentLocation)
        var distanceExact = latlngFrom.distanceTo(latlngTo) // distance calculated in meters
        var distanceObfuscated = (Math.random() * 100) * distanceExact
        var distanceObfTrunc = Math.trunc(distanceObfuscated)
    } else {
        distanceObfTrunc = 'Location not recorded';
    }

    //here we combine datetime with randomID
    dateTimeRandomID = 'Date&time: ' + dateTime + ' RandomID:' + randomID;
    dateTimeRandomID.toString();
    data = drawnItems.toGeoJSON();
    dataGeometry = data.features[0].geometry
    //console.log(data)
    //console.log(dataGeometry)
    //The coordinate reference system for all GeoJSON coordinates is a  geographic coordinate reference system, using the World Geodetic
    //System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units of decimal degrees.

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    var allLandUses = [1]
    //land uses array filtered.
    var allLandUsesFiltered = allLandUses.filter(noNull => noNull != null);
    //console.log(allLandUsesFiltered)
    var landUses = allLandUsesFiltered.toString();
    //to convert emojis from unicode to short name, before the data is transmitted
    //value of boxcontent is obtained again (was obtained in 'confirm'), in case user click on 'confirm' before filling in the box
    boxContent = document.getElementById('emojionearea').value;
    var boxContentToShortname = emojione.toShort(boxContent)
    //console.log(boxContentToShortname)
    //console.log(boxContent)

    var boxContentToString = boxContentToShortname.toString();
    //attributes added to Geojson file properties
    if (finalAreaHa2Decimals == null && finalLength2Decimals == null) {
        finalAreaHa2Decimals = 'Point'
        finalLength2Decimals = 'Point'
    }
    if (finalAreaHa2Decimals != null && finalLength2Decimals == null) {
      finalLength2Decimals = 'Polygon'
    }
    if (finalAreaHa2Decimals == null && finalLength2Decimals != null) {
      finalAreaHa2Decimals = 'Line'
    }
    if (isIOS == false && recordedBlobs != null) {
        var audioAvailable = true
    } else {
        audioAvailable = false
    }
    var propertiesGeoJSON = {
        // 'geometryCenter':geometryCenter,
        'landUses': boxContentToString,
        'landUsesEmoji': boxContent,
        'audioAvailable': audioAvailable,
        'areaPolygon': finalAreaHa2Decimals,
        'lengthLine': finalLength2Decimals,
        'dateTime': dateTime,
        'timeSpendSeconds': totalTimeSpent,
        'dist_m_Participant_Feature': distanceObfTrunc,
        'randomID': randomID,
        'geometrystring':data.toString(),
        'screensize':screensize
    };
    //  adding the properties to the geoJSON file:
    data.features[0].properties = propertiesGeoJSON;

    // Stringify the GeoJson
    convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

    if (isIOS == false && recordedBlobs != null) {
        blob = new Blob(recordedBlobs, {
            type: 'audio/webm'
        });
        //console.log(blob)
    }

    //defining the final screen
    setTimeout(function() {
        drawnItems.clearLayers();
        tempLayer.clearLayers()
        document.getElementById("map").style.height = "0px";
        document.getElementById("Cancel").style.display = "none";
        document.getElementById("share-download").style.display = "none";
        document.getElementById('noAudioIOS').style.display = 'none';
        document.getElementById("record").style.display = "none";
        document.getElementById('enableRecording').style.display = 'none';
        document.getElementById("play").style.display = "none";
        document.getElementById('voice').style.display = 'none';
        document.getElementById('voice').style.opacity = '0';
        document.getElementById('activatePlay').style.display = 'none';
        document.getElementById('showAreaHa').style.display = 'none';
        document.getElementById('showAreaAcres').style.display = 'none'
        document.getElementById('showLength').style.display = 'none'
        document.getElementById('emoji').style.display = 'none';
        document.getElementById('shareWorldButton').style.display = 'initial';
        document.getElementById('DownloadButton').style.display = 'initial';
        document.getElementById('Download').style.display = 'initial';

        document.body.style.backgroundColor = "black";
    }, 200)
    recordedVideo.pause();
    recordedVideo.currentTime = 0;
    created = false;

    //adding layers to localstorage
    var dataStringified = JSON.stringify(data);

    var tempName = randomID // each polygon must have a different name!!!
    var layerToLocalStorage = localStorage.setItem(tempName, dataStringified);
    //console.log(dataStringified);
    //console.log(dataStringified.geometry)
    //console.log(data.geometry)
    myLayerIsOn = true;
    myLayer_Button.button.style.backgroundColor = 'black';

    /////////////////////////firebase   ////////////////
    //rename files...
    var nameGeoJSON = 'geojson' + ' ' + dateTimeRandomID
    var nameAudio = 'audio' + ' ' + dateTimeRandomID
    var audioBlob = blob; //to assign to a new variable the blob created in the audio.js
    //console.log(audioBlob)

    //to convert the audio blob into a file (webm)
    function blobToFile(theBlob, fileName) {
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    }

    if (isIOS == false && recordedBlobs != null) {
        audioBlobFile = blobToFile(audioBlob, nameAudio);
        //console.log(audioBlobFile)
    }

    //console.log(document.getElementsByClassName('emojibtn'))
    featureType = null; //to avoid error of length not recognised when on map click
    //to convert geojson into File format
    dataFile = new File([dataStringified], nameGeoJSON, {
        type: "application/json",
    });
    //console.log(dataFile)
    //to store both audio and geojson into an array, and also get the length of the array and pass this value ot the firebase loop
    if (isIOS == false && recordedBlobs != null) {
        files = [dataFile, audioBlobFile]
        filesLength = 2
    } else {
        files = [dataFile]
        filesLength = 1
    }

    return created && data && myLayerIsOn && files && filesLength && convertedData && blob && sameSession && featureType //&& centerPointMarker && centerPolylineMarker && centerPolygonMarker// && oneMapCompleted //&& dateTimeRandomID && data
}
//console.log(finalLayer)

/////////////////////////////////////////  screenS SHARE-DOWNLOAD  /////////////////////////////////////
var timeOfVideo; //variable to define time of video based on OS. For some reason, is iOS takes longer to play

if (isIOS == false) {
    timeOfVideo = 2800
} else {
    timeOfVideo = 3400
}
if (isOnline == false){ // to disable send button if offline
  document.getElementById('shareWorldButton').style.opacity = '0.2';
  document.getElementById('shareWorldButton').disabled = 'true';

}

document.getElementById('shareWorldButton').onclick = function(e) {
  //first, we define the variables that store the attributes
  // propertiesGeoJSON = data.features[0].properties
  // landUses = propertiesGeoJSON.landUses;

  //script to check if keyword is added in the attribute field
  // if(landUses[0] == ':' && landUses[1] == 'e' && landUses[2] == 'a' && landUses[3] == 'r' && landUses[4] == 't' && landUses[5] == 'h' ){
    //
    // //to remove the keyword from the attribute field that is shown in the map
    // var landUsesEmojiWithKeyword = propertiesGeoJSON.landUsesEmoji;
    // var lengthLandUsesEmojiWithKeyword = landUsesEmojiWithKeyword.length
    // landUsesEmoji = landUsesEmojiWithKeyword.slice(2,lengthLandUsesEmojiWithKeyword);

  if(isOnline == true){
    setTimeout(function() {
        document.getElementById('shareWorldButton').style.display = 'none';
        document.getElementById('DownloadButton').style.display = 'none';
        document.getElementById('Sent').style.display = 'initial';
        document.getElementById('sentVideo').play();
        document.getElementById("sentVideo").controls = false;
        document.body.style.backgroundColor = "white";

        //to fire click event of upload button !!
        document.getElementById("sendFirebase").click();
    }, 200)

    setTimeout(function() {
        document.getElementById('Sent').style.display = 'none';
        document.getElementById('uploading').style.display = 'none'
        document.getElementById('progress').style.display = 'none'

        document.getElementById("deleteAllVertexs").style.opacity = "0.35";
        document.getElementById("deleteAllVertexs").disabled = true;
        document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
        document.getElementById("deleteAllVertexsLine").disabled = true;
        document.getElementById("completeFeature").style.opacity = "0.35";
        document.getElementById("completeFeature").disabled = true;

        document.body.style.backgroundColor = "white";

        document.getElementById("map").style.height = "100%";
        document.getElementById("tutorial").style.display = "initial";
        document.getElementById("polygon").style.display = "initial";
        document.getElementById("polyline").style.display = "initial";
        document.getElementById("point").style.display = "initial";

        ////////////////////////////       CARTO - POST DATA      //////////////////////////////////////////
        //first, we define the variables that store the attributes
        propertiesGeoJSON = data.features[0].properties
        //to assign each attribute to a variable, which will be added as columns to the DB
       landUses = propertiesGeoJSON.landUses;
       landUsesEmoji = propertiesGeoJSON.landUsesEmoji;
        // include the firebase url (if audio has been recorded)
        if (finalUrlAudio != null) {
            var audioLinkText = ' 🔊 AUDIO';
            // var clickableFinalUrlAudio = audioLinkText.link(finalUrlAudio)
            var clickableFinalUrlAudio = finalUrlAudio

            audioAvailable = clickableFinalUrlAudio;
        } else { //to not show audio icon when no audio available
            audioAvailable = '.'
        }

        ////console.log(audioAvailable)
        areaPolygon = propertiesGeoJSON.areaPolygon;
        ////console.log(areaPolygon)
        lengthLine = propertiesGeoJSON.lengthLine;
        ////console.log(lengthLine)
        dateTime = propertiesGeoJSON.dateTime;
        ////console.log(dateTime)
        timeSpendSeconds = propertiesGeoJSON.timeSpendSeconds;
        ////console.log(timeSpendSeconds)
        dist_m_Participant_Feature = propertiesGeoJSON.dist_m_Participant_Feature;
        ////console.log(dist_m_Participant_Feature)
        randomID = propertiesGeoJSON.randomID;
        ////console.log(randomID)

        //Call the setData() function!!! to post data to database
        setData();

      //  finalLayer is added at the end as the properties are different depending on if share or download. Note that even if addto(map) is disable, still added!!
        // finalLayer = L.geoJSON(data, {
        //     style: function(feature) {
        //         return feature.properties && feature.properties.style;
        //     },
        //     color: '#0CACDF',
        //     onEachFeature: onEachFeature,
        // })//.addTo(map);

    }, timeOfVideo);

      osm_Button.addTo(map)
      myLayer_Button.addTo(map);
      filter_Button.addTo(map);
      myLayer_Button.button.style.opacity = '1';
      myLayer_Button.button.disabled = false
      filter_Button.button.style.opacity = '1';
      filter_Button.button.disabled = false;
      gps_Button.button.style.opacity = '1';
      gps_Button.button.disabled = false;

      document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null
      try{
        localStorageLayer.removeFrom(map)
      }catch(err){}
      //deflated.addTo(map)
      // if (cartoLoaded == true) {
      //
      //     cartoGeometries.addTo(deflated)
      // }

      featureSent = true;

    // }else{
    //   alert("🔑 🛑 During the prototyping phase, a KEYWORD must be added in the textbox to publish the spatial data. Click 'Download' and in the main screen click the 'Quetionmark' button. Then click the 'Yellow' button to request the KEYWORD. Thanks");
    //
    // }
    finalAreaHa2Decimals = null
    finalLength2Decimals = null
    timeStart = new Date(); // to reset time start in case more contributions in this session


    return featureSent &&  finalAreaHa2Decimals &&  finalLength2Decimals && timeStart
  }else {
    alert('🛑 You are offline')
  }
}

document.getElementById('DownloadButton').onclick = function(e) {
    document.getElementById('downloadedVideo').play();
    document.getElementById("downloadedVideo").controls = false;

    document.getElementById('shareWorldButton').style.display = 'none';
    document.getElementById('DownloadButton').style.display = 'none';

    document.getElementById('Downloaded').style.display = 'initial';
    //to download the geojson and webm files to the device's downloads folder
    document.getElementById('Download').setAttribute('href', 'data:' + convertedData);
    document.getElementById('Download').setAttribute('download', dateTimeRandomID);

    document.body.style.backgroundColor = "white";

    ////////////////////////  TRANSMISSION ////////////////////////////////////////
    finished = true;

    setTimeout(function() {
        document.getElementById('Downloaded').style.display = 'none';
        document.getElementById('uploading').style.display = 'none'
        document.getElementById('progress').style.display = 'none'

        document.getElementById("deleteAllVertexs").style.opacity = "0.35";
        document.getElementById("deleteAllVertexs").disabled = true;
        document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
        document.getElementById("deleteAllVertexsLine").disabled = true;
        document.getElementById("completeFeature").style.opacity = "0.35";
        document.getElementById("completeFeature").disabled = true;

        document.body.style.backgroundColor = "white";

        document.getElementById("map").style.height = "100%";
        document.getElementById("tutorial").style.display = "initial";
        document.getElementById("polygon").style.display = "initial";
        document.getElementById("polyline").style.display = "initial";
        document.getElementById("point").style.display = "initial";

        //console.log(data);

        //finalLayer is added at the end as the properties are different depending on if share or download
        myLayer_Button.button.style.opacity = '1';
        myLayer_Button.button.disabled = false
        filter_Button.button.style.opacity = '0.4';
        filter_Button.button.disabled = true;
        gps_Button.button.style.opacity = '1';
        gps_Button.button.disabled = false;

        document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null


        finalLayer = L.geoJSON(data, {
            style: function(feature) {
                return feature.properties && feature.properties.style;
            },
            color: '#0CACDF',
            onEachFeature: onEachFeatureAudioLocalStorage,
        }).addTo(map);

    }, timeOfVideo - 300);

    return finished
}
// end

//////////////////////    MODAL    /////////////////////
