//
// // Detects if device is on iOS
// const isIos = () => {
//   const userAgent = window.navigator.userAgent.toLowerCase();
//   return /iphone|ipad|ipod/.test( userAgent );
// }
// // Detects if device is in standalone mode
// const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
//
// // Checks if should display install popup notification:
// if (isIos() && !isInStandaloneMode()) {
//   this.setState({ showInstallMessage: true });
// }

//first, detect whether the user is online & the language of the browser
 var xhr2 = new XMLHttpRequest();
 xhr2.onload = function(){
   console.log('created request')
  // console.log(planetKey)

 }
 xhr2.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText)
      var str = this.responseText

//console.log(this.getAllResponseHeaders())
    console.log('onready')
      var array = str.split(',');
       planetKey = array[0];
       planetKey = planetKey.replace(/\s/g, '')
       sentinelKey = array[1];
       sentinelKey = sentinelKey.replace(/\s/g, '')
       firebaseKey = array[2];
       firebaseKey = firebaseKey.replace(/\s/g, '')

       // planetKey = planetKey.toString();
       // sentinelKey = sentinelKey.toString();
       console.log(typeof planetKey)
      // console.log(a)
return planetKey && sentinelKey && firebaseKey
  }

};
  xhr2.open("GET", '../hidden.php', true);
  xhr2.send();

  var planetKey ;
  var hh = '2b11aafd06e2464a85d2e97c5a176a9a'

  var sentinelKey;
  var firebaseKey;
//$.get('url', {planetKey: planetKey, sentinelKey: sentinelKey, firebaseKey: firebaseKey})
// setTimeout(function(){
//
//
// console.log(planetKey)
// console.log(typeof hh)
//
// },1)
// console.log(planetKey)
// console.log(typeof hh)
//  xhr2.getResponseHeader()

  // $.ajax({
  //   url:'hidden.php',
  //   method:'GET',
  //   data:{'planetKey':planetKey,'sentinelKey':sentinelKey}
  // })
  // document.getElementById("showAreaHa").innerHTML = xhr2.responseText;
  // console.log(xhr2.responseText)


 // $.get("hidden.php",{planetKey:planetKey,sentinelKey:sentinelKey})

 /////////////////////////////////////        indexedDB          /////////////////////////////
 // if (!('indexedDB' in window)) {
 //   console.log('This browser doesn\'t support IndexedDB');
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
 //     console.log('This browser doesn\'t support IndexedDB');
 //  //   return;
 //   }
 //
 //   var dbPromise = idb.open('test-db1', 1);
 //
 // })();

 //////////////////////////////////////////////////////////////////////////////////////////////
// var check = false;
// var isMobile =  function() {
//
//     (function(a){
//        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
//         check = true;
//      })(navigator.userAgent||navigator.vendor||window.opera);
//
//    return check;
//    };
console.log(planetKey)

var isIOS = /iPad|iPhone|iPod|Mac OS X/.test(navigator.userAgent) && !window.MSStream;  // Mac OS X correct???
if (isIOS == true) {
// recordedBlobs = null;  // important in case ios device, so recorded blobs is not taken from audio.js
  console.log('This is an IOS device');
} else {
  console.log('This is Not a IOS device');
}
console.log('isIOS  ' + isIOS)

var isOnline = navigator.onLine
var isOnlineGlobal = isOnline
console.log(navigator.onLine)
console.log(navigator.appVersion)
console.log(navigator.platform)

var browserLanguage = navigator.language
console.log(navigator.language)
//var  timeFinish = today.getHours() + " " + today.getMinutes() + " " + today.getSeconds();
var timeStart = new Date();
//var startDateTime = today.getMinutes() + " " + today.getSeconds()

console.log(timeStart)
//console.log(seconds)
  // Firebase configuration

    // Initialize Firebase
    var firebaseConfig = {
        apiKey: firebaseKey,
        authDomain: "prototype4-dc434.firebaseapp.com",
        databaseURL: "https://prototype4-dc434.firebaseio.com",
        projectId: "prototype4-dc434",
        storageBucket: "prototype4-dc434.appspot.com",
        messagingSenderId: "995673679156",
        appId: "1:995673679156:web:cff466b0d7489a868bb161"
      };
if(isOnline == true){
  setTimeout(function(){
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized')
  },3000)
}


//  firebase.analytics();


////////////////////////////////////////////////////////////////////
// window.addEventListener('load',e )
// (function() {
if('serviceWorker' in navigator) {


navigator.serviceWorker
    .register('./sw.js')
    .then(function(registration){
      console.log('Service Worker Registered');
      console.log('sw has been updated')


      registration.update()//to update the sw and caches if version has changed
      console.log('sw has been updateddd')
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
    .catch(function(err){
      console.log('Service Worker Failed to register', err);
    })

}
//function to perform HTTP request
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

//function to download tiles leaflet.offline NOT USED NOW
var tilesDb = {
    getItem: function (key) {
        return localforage.getItem(key);
    },

    saveTiles: function (tileUrls) {
        var self = this;

        var promises = [];

        for (var i = 0; i < tileUrls.length; i++) {
            var tileUrl = tileUrls[i];

            (function (i, tileUrl) {
                promises[i] = new Promise(function (resolve, reject) {
                    var request = new XMLHttpRequest();
                    request.open('GET', tileUrl.url, true);
                    request.responseType = 'blob';
                    request.onreadystatechange = function () {
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

    clear: function () {
        return localforage.clear();
    },

    _saveTile: function (key, value) {
        return this._removeItem(key).then(function () {
            return localforage.setItem(key, value);
        });
    },

    _removeItem: function (key) {
        return localforage.removeItem(key);
    }
};

// Script to hide audio button after first load. Run function on load, could also run on dom ready
var isFirstTime; //var to store if the site is visited for the first time
//var oneMapCompleted; // to know if in this section this is the first map or not
////////////////////////////////////////////////////////      first load         /////////////////////////////////////////////////////////////////////////
var firstLoad = function() {//fucntion to determine if the site is visited for first time
    // Check if localStorage is available (IE8+) and make sure that the visited flag is not already set.
    if(typeof window.localStorage !== "undefined" && !localStorage.getItem('visited')) {
         // Set visited flag in local storage
         localStorage.setItem('visited', true);

         // Alert the user
        // document.getElementById("startMapping").style.visibility = "hidden";
        // document.getElementById("unmute").style.visibility = "visible";
         isFirstTime = true;
         console.log(isFirstTime)
         //alert("Hello my friend. This is your first visit.");
    }else {
  //    document.getElementById("startMapping").style.visibility = "visible";
    //  document.getElementById("unmute").style.visibility = "hidden";


      function catchAudioError() { //function to avoid uncaught promise when loading audio tutorial
       try {
    //////     document.getElementById("audioTutorial").play();
       } catch (e) {
      }
     }

      isFirstTime = false;
      console.log(isFirstTime)

    }
    return isFirstTime;
}
window.onload = firstLoad;
firstLoad();
console.log(isFirstTime);
console.log('udddd?')


/////////////////////////////////////////////////////////adding map elements///////////////////////////////////////////////////


//to identify last postion, which was stored in localstorage
var lastPositionStoredLOCALLY;
var created = false; // variable to detect wheter the feature (point,line,polygon) has been created
var sameSession = false; //to know if user has already mapped in this session


lastPositionStoredLOCALLY = localStorage.getItem('lastPositionStoredLOCALLY')
console.log(lastPositionStoredLOCALLY)

//to avoid error if no location was stored either because first load, not allowed, or cache cleared
if(lastPositionStoredLOCALLY != null){
lastPositionStoredLOCALLY = lastPositionStoredLOCALLY.split(',')  // to convert string to array
console.log(lastPositionStoredLOCALLY[0])
}

// function to get coordinates and zoom level from URL, and then use the zoom and center variables to center the map if url != original
var mappos = L.Permalink.getMapLocation();
var getUrl = window.location.href
// console.log(getUrl)
var getUrlLength = getUrl.length
// console.log(getUrlLength)
var lastPositionUrl = getUrl[getUrlLength-1]
// console.log(lastPositionUrl)
// console.log(sameSession)
var mySubString = getUrl.substring(
  getUrl.lastIndexOf("#") + 1,
  getUrl.lastIndexOf("z")
);
var mySubStringArray = mySubString.split(',');
// console.log(mySubString)
// console.log(mySubStringArray)

//var center = [mySubStringArray[0],mySubStringArray[1]];
//console.log(center)

//var zoom = mySubStringArray[2];
//var zoom = 10
// console.log(zoom)
// console.log(center + '   ' + zoom)
//////////////////////////////to center map, depending on if location was stored, or if url has coordinates ////////////////////////////////

//to check if the url contains coordinates (z is last possition) and when user copy-paste the url shared, zoom to there //ERROR @attempted to load an infinite number of tiles.
// if(lastPositionUrl == 'z' && sameSession == false){
//   console.log('map centered as if URL with coordinates')
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
 if(lastPositionStoredLOCALLY == null){
  console.log('map centered as if not last position')
var map = L.map('map',{
        editable:true,
        center: [18,20],
        zoom: 3,
        minZoom:3,
        maxZoom:21,
        zoomControl:false,
       attributionControl:false
      });
}else{
  console.log('map centered as if YES last position')

  var map = L.map('map',{

          editable:true,
          center: [lastPositionStoredLOCALLY[0],lastPositionStoredLOCALLY[1]],
          // center: mappos.center,
          // zoom: mappos.zoom,
          zoom: 10,    /////////what is the most appropriate???/
          minZoom:3,
          maxZoom:21,
          zoomControl:false,
         attributionControl:false
        });
}
L.Permalink.setup(map);
console.log(map.getZoom())
console.log(map.getCenter())

console.log(mappos.center)

  // console.log(lastPositionStoredLOCALLY)



// //create a callback function that sets the hash
// var updateUrlHash = function () {
//     //this is bound to the map, so:
//     var zoom = map.getZoom();
//     var lonLat = map.getCenter()
//     window.location.hash = zoom + '/' + lonLat.lat + '/' + lonLat.lon;
// }
//
// //register the moveend event on the map (also catches zoomend)
// map.events.register('moveend', map, updateUrlHash);


// function addPreviousPolygons(){
//   if(!data.length==0){
//   //  data.addTo(map); //////////////////////////////////////////////
//     //console.log(data);
//   }
// }
//map.attributionControl.addAttribution("New attribution");
map.addControl(L.control.attribution({
        position: 'bottomright',
        prefix: 'Leaflet'
      }));

var scale = L.control.scale({
  maxWidth: 100,
  metric:true,
  imperial:false,
}).addTo(map);


console.log(isFirstTime)

////////////////////////////////           script to get items from local storage    //////////////////////////////
var finalLayer;
var groupGeoJSON =[]

function isJson(str) {
 try {
   JSON.parse(str);
 } catch (e) {
 return false;
}
return true;
}
  if(isFirstTime == false & localStorage.key(0)!=null){

//  loop for going through all geoJSON stored in the localStorage
    for(var i=0, len=localStorage.length; i<len-1; i++) {   //len-2  to avoid a error of geojson object not recognised. last element is [true]...
      var key = localStorage.key(i);
      var value = localStorage[key];
      var itemFetched = localStorage.getItem(key);
  //    console.log(i+ '____' + key + " => " + value +'__'+ '__ccc__'+itemFetched);//////////////////////////////////////////
//catch error in case no json

//call catch function
    isJson(itemFetched);
     // console.log(isJson(itemFetched))
    if (isJson(itemFetched) == true){
      console.log(isJson(itemFetched))/////////////////////////////////!!
      console.log(itemFetched)
      var getItemToJSON = JSON.parse(itemFetched);
      console.log(isJson(getItemToJSON))
      console.log(getItemToJSON)
      isJson(getItemToJSON)
     //add each json to an array-------------------------
      groupGeoJSON[i]=getItemToJSON
      console.log(isJson(groupGeoJSON))
      console.log(groupGeoJSON)
    }else{
      groupGeoJSON[i] = {}; // this is to avoid error when an array element is not a JSON
    }
  }
}
//console.log(groupLayer)
console.log('local storage accessed!!!!')


// function isJson(str) {
//  try {
//    JSON.parse(str);
//  } catch (e) {
//  return false;
// }
// return true;
// }

console.log(groupGeoJSON)
 //groupGeoJSON.toJSON()
//isJson(groupGeoJSON)
console.log(typeof groupGeoJSON)
var groupGeoJSON1 = JSON.stringify(groupGeoJSON)
console.log(isJson(groupGeoJSON))


//conditions to catch error in case no geojson and also to avoid error when adding to map an empty layer if is first time
//var myLayerIsOn = true;
if(isJson(groupGeoJSON)==false && isFirstTime==false ){
var myLayer = L.geoJSON(groupGeoJSON,{
  style: function (feature) {
    //myLayerIsOn = true;
    console.log(myLayerIsOn)
    return feature.properties && feature.properties.style;
  },
  color:'blue',
  onEachFeature: onEachFeatureAudioLocalStorage,
  autopan:false

  }).addTo(map)
//map.setView(lastPositionStoredLOCALLY,15);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////to create a custom icon instead of Marker
var pointsIcon = L.icon({
    iconUrl: 'images/whiteDot.png',
  //  shadowUrl: 'leaf-shadow.png',

    iconSize:     [15, 15], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


// var pointsSap = L.geoJson(pointsSapelli,{
//   iconUrl: 'images/whiteDot.png',
//   color:'#03FAFC',
//   opacity: 5,
//   fillOpacity: 0.2,
//   weight:2
// })//.addTo(map);

var markers = L.markerClusterGroup({
  spiderfyOnMaxZoom: true,
showCoverageOnHover: true,
zoomToBoundsOnClick: true
});
//markers.addLayer(pointsSap);
//map.addLayer(markers);
var loadBasemaps = function(){


}
/////////////////////////////////////       CARTO    ADD TO MAP   //////////////////////////////////////////////

// // Add Data from CARTO using the SQL API
// // Declare Variables
// // Create Global Variable to hold CARTO points
// var cartoDBPoints = null;
//
// // Set your CARTO Username
// var cartoDBusername = "marcosmoreu";
//
// // Write SQL Selection Query to be Used on CARTO Table
// // Name of table is 'data_collector'
// var sqlQuery = "SELECT * FROM data_collector";
//
// // Get CARTO selection as GeoJSON and Add to Map
// function getGeoJSON(){
//   $.getJSON("https://"+cartoDBusername+".cartodb.com/api/v2/sql?format=GeoJSON&q="+sqlQuery, function(data) {
//     cartoDBPoints = L.geoJson(data,{
//       pointToLayer: function(feature,latlng){
//         var marker = L.marker(latlng);
//         marker.bindPopup('' + feature.properties.description + 'Submitted by ' + feature.properties.name + '');
//         return marker;
//       }
//     }).addTo(map);
//   });
// };
//
// // Run showAll function automatically when document loads
// $( document ).ready(function() {
//   getGeoJSON();
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////
var googleSat = L.tileLayer.offline('https://mt.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', tilesDb,{
        minZoom: 3,
        maxZoom: 21,
      //  maxNativeZoom: 20,
        //transparent: false,
        //border: 'solid black 5px',
        subdomains:['mt0','mt1','mt2','mt3'],
        attribution: 'Google Imagery'
    }).addTo(map);
//console.log(googleSat)

var osm = L.tileLayer.offline('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',tilesDb,{
        minZoom: 3,
        maxZoom: 21,
        maxNativeZoom: 21,
        // subdomains:['mt0','mt1','mt2','mt3'],
        attribution: 'OpenStreetMap Contributors'

        });

var offlineControlGoogle = L.control.offline(googleSat, tilesDb, {
    saveButtonHtml: '<img src="images/download.png" width=15px ; height=15px>',
    removeButtonHtml: '<img src="images/bin.png" width=15px ; height=15px>',
    confirmSavingCallback: function (nTilesToSave, continueSaveTiles) {
        if (window.confirm('Save ' + nTilesToSave + '?')) {
            continueSaveTiles();
        }
    },
    confirmRemovalCallback: function (continueRemoveTiles) {
        if (window.confirm('Remove all the tiles?')) {
            continueRemoveTiles();
        }
    },
    minZoom: 0,
    maxZoom: 19
});
var offlineControlOSM = L.control.offline(osm, tilesDb, {
    saveButtonHtml: '<img src="images/download.png" width=15px ; height=15px>',
    removeButtonHtml: '<img src="images/bin.png" width=15px ; height=15px>',
  //  icon: '<img src="images/OSM.png" width=50px ; height=50px>',
    confirmSavingCallback: function (nTilesToSave, continueSaveTiles) {
        if (window.confirm('Save ' + nTilesToSave + '?')) {
            continueSaveTiles();
        }
    },
    confirmRemovalCallback: function (continueRemoveTiles) {
        if (window.confirm('Remove all the tiles?')) {
            continueRemoveTiles();
        }
    },
    minZoom: 0,
    maxZoom: 19
});


var clickButtonCount=0;

//to set the position of icon in easybutton based on OS - ios does not center the image
if(isIOS == true){
  var iconGPS = '<img src="images/gps.png" width=40px; height=40px; style="margin-left:-5px" > ';
  var iconOSM = '<img src="images/osm.png" width=40px; height=40px; style="margin-left:-5px" > ';
  var iconGOOGLE = '<img src="images/google.png" width=40px; height=40px; style="margin-left:-5px" > ';
  var iconPLANET = '<img src="images/planet.png" width=40px; height=40px; style="margin-left:-5px" > ';
  var iconLAYERS = '<img src="images/myLayer.png" width=40px; height=40px; style="margin-left:-5px" > ';

}else{
  var iconGPS = '<img src="images/gps.png" width=40px; height=40px; style="margin-left:-1px" > ';
  var iconOSM = '<img src="images/osm.png" width=40px; height=40px; style="margin-left:-1px" > ';
  var iconGOOGLE = '<img src="images/google.png" width=40px; height=40px; style="margin-left:-1px"> ';
  var iconPLANET = '<img src="images/planet.png" width=40px; height=40px; style="margin-left:-1px"> ';
  var iconLAYERS = '<img src="images/myLayer.png" width=40px; height=40px; style="margin-left:-1px"> ';

}


var osm_Button = L.easyButton({
    id: 'osm',
    class:'easyButton',
    position: 'topright',
    //background:'images/forest.png',
    states: [{
      // icon: '<img src="images/osm.png" width=40px ; height=40px; style="margin-left:-10px"> ',

       icon: iconOSM  ,

      //  background:"images/forest.png",
        stateName: 'check-mark',
        onClick: function(btn,map) {

          clickButtonCount +=1;
          document.getElementById('imageryAlert').style.display = 'none'

          map.options.maxZoom = 19; //Set max zoom level as OSM does not serve tiles with 20+ zoom levels
          map.options.minZoom = 3;
          osm_Button.removeFrom(map);
          planet_Button.addTo(map);
          myLayer_Button.addTo(map)

        //  console.log('countbutton clicks', clickButtonCount)
          if(clickButtonCount == 10){
            offlineControlOSM.addTo(map);
            clickButtonCount=0;

          }else{
          osm.addTo(map);
          googleSat.removeFrom(map);
        //  planet.removeFrom(map);
          // btn.button.style.backgroundColor = 'yellow';
          // googleSat_Button.button.style.backgroundColor = 'black';
          // planet_Button.button.style.backgroundColor = 'black'
          }
          return clickButtonCount;
        }

    }]
});

console.log(osm_Button.icon)
//osm_Button.button.style.backgroundColor = 'black';
osm_Button.button.style.width = '50px';
osm_Button.button.style.height = '50px';
//osm_Button.button.style.backgroundColor = 'none';
//osm_Button.button.style.transitionDuration = '.3s';
osm_Button.addTo(map);



var googleSat_Button = L.easyButton({
    id: 'googleSat',
    class:'easyButton1',
    position: 'topright',

    states: [{
        icon: iconGOOGLE,
              //stateName: 'check-mark',
        onClick: function(btn,map) {
          clickButtonCount +=1;
          document.getElementById('imageryAlert').style.display = 'none'
          map.options.maxZoom = 21;// set the max zoom level to 21 for google imagery
          map.options.minZoom = 3;
          googleSat_Button.removeFrom(map);
          osm_Button.addTo(map);
          myLayer_Button.addTo(map)

          //console.log('countbutton clicks', clickButtonCount)
          if(clickButtonCount == 10){
            offlineControlGoogle.addTo(map);
            clickButtonCount=0;

          }else{
            googleSat.addTo(map);
            planet.removeFrom(map);
            osm.removeFrom(map);
            // btn.button.style.backgroundColor = 'yellow';
            // osm_Button.button.style.backgroundColor = 'black';
            // planet_Button.button.style.backgroundColor = 'black';
            //remove the download tiles Control
          }
          return clickButtonCount;
        }
    }]
});

googleSat_Button.button.style.width = '50px';
googleSat_Button.button.style.height = '50px';
googleSat_Button.button.style.transitionDuration = '.3s';
googleSat_Button.button.style.backgroundColor = 'black';
//googleSat_Button.addTo(map);

var planet_Button = L.easyButton({
    id: 'planet',
    class:'easyButton',
    position: 'topright',
    states: [{
        icon: iconPLANET,
        stateName: 'check-mark',
        onClick: function(btn,map) {
          console.log(planetKey)
          var planetS6 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200411_104056_53_105e/{z}/{x}/{y}.png?api_key="+planetKey+"",{
                 maxZoom: 18,
                 maxNativeZoom: 20,
                 subdomains:['tiles0','tiles1','tiles2','tiles3'],

             });
          var planetS7 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200411_104054_50_105e/{z}/{x}/{y}.png?api_key="+planetKey+"",{
                 maxZoom: 18,
                 maxNativeZoom: 20,
                 subdomains:['tiles0','tiles1','tiles2','tiles3'],
             });
          ////////////CAMEROON//////////////////////
          var planetS8 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200402_080331_1043/{z}/{x}/{y}.png?api_key="+planetKey+"",{
                 maxZoom: 18,
                 maxNativeZoom: 20,
                 subdomains:['tiles0','tiles1','tiles2','tiles3'],
             });
          var planetS9 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200402_080330_1043/{z}/{x}/{y}.png?api_key="+planetKey+"",{
                 maxZoom: 18,
                 maxNativeZoom: 20,
                 subdomains:['tiles0','tiles1','tiles2','tiles3'],
             });
          var planetS10 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200402_080329_1043/{z}/{x}/{y}.png?api_key="+planetKey+"",{
                 maxZoom: 18,
                 maxNativeZoom: 20,
                 subdomains:['tiles0','tiles1','tiles2','tiles3'],
             });
          /////NAIROBI/////////////////////////////
          var planetS11 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200306_073616_1011/{z}/{x}/{y}.png?api_key="+planetKey+"",{
                 maxZoom: 18,
                 maxNativeZoom: 20,
                 subdomains:['tiles0','tiles1','tiles2','tiles3'],
                   });
          var planetS12 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200306_073615_1011/{z}/{x}/{y}.png?api_key="+planetKey+"",{
                 maxZoom: 18,
                 maxNativeZoom: 20,
                 subdomains:['tiles0','tiles1','tiles2','tiles3'],
             });
          ///////TSUMKWE
          var planetS13 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200416_083425_1018/{z}/{x}/{y}.png?api_key="+planetKey+"",{
                 maxZoom: 18,
                 maxNativeZoom: 20,
                 subdomains:['tiles0','tiles1','tiles2','tiles3'],
             });

          ///////FRAGA////////////////////////
          var planetS14 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200403_105241_78_1064/{z}/{x}/{y}.png?api_key="+planetKey+"",{
                 maxZoom: 18,
                 maxNativeZoom: 20,
                 subdomains:['tiles0','tiles1','tiles2','tiles3'],
             });
          var planetS15 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200403_105239_76_1064/{z}/{x}/{y}.png?api_key="+planetKey+"",{
                 maxZoom: 18,
                 maxNativeZoom: 20,
                 subdomains:['tiles0','tiles1','tiles2','tiles3'],
             });
          ///ITEN///////////////
          var planetS16 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200410_083657_42_1065/{z}/{x}/{y}.png?api_key="+planetKey+"",{
                 maxZoom: 18,
                 maxNativeZoom: 20,
                 subdomains:['tiles0','tiles1','tiles2','tiles3'],
                  attribution: 'Planet/Sentinel Imagery MAY 2020'
             });
          var planetS17 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200410_074244_1018/{z}/{x}/{y}.png?api_key="+planetKey+"",{
                 maxZoom: 18,
                 maxNativeZoom: 20,
                 subdomains:['tiles0','tiles1','tiles2','tiles3'],
             });
          var planetS18 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200410_074243_1018/{z}/{x}/{y}.png?api_key="+planetKey+"",{
                 maxZoom: 18,
                 maxNativeZoom: 20,
                 subdomains:['tiles0','tiles1','tiles2','tiles3'],
             });
             ///LONDON/////////////////
             var planetS19 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200411_104513_103d/{z}/{x}/{y}.png?api_key="+planetKey+"",{
                    maxZoom: 18,
                    maxNativeZoom: 20,
                    subdomains:['tiles0','tiles1','tiles2','tiles3'],

                });
             var planetS20 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200411_104512_103d/{z}/{x}/{y}.png?api_key="+planetKey+"",{
                    maxZoom: 18,
                    maxNativeZoom: 20,
                    subdomains:['tiles0','tiles1','tiles2','tiles3'],

                });
             var planetS21 = L.tileLayer("https://{s}.planet.com/data/v1/PSScene4Band/20200411_104511_103d/{z}/{x}/{y}.png?api_key="+planetKey+"",{
                    maxZoom: 18,
                    maxNativeZoom: 20,
                    subdomains:['tiles0','tiles1','tiles2','tiles3'],
                });

          // var planet = L.layerGroup([planetS1,planetS2,planetS3,planetS4,planetS5,planetS6,planetS7,planetS8,planetS9,planetS10,
          //                           planetS11,planetS12,planetS13,planetS14,planetS15,planetS16,planetS17,planetS18]);
          planet = L.layerGroup([planetS6,planetS7,planetS8,planetS9,planetS10,planetS11,planetS12,planetS13,planetS14,planetS15,planetS16,planetS17,planetS18,planetS19,planetS20,planetS21]);

          //Sentinel-hub (level 2 chosen as it allow any zoom level)
          var wmsSentinel2 = L.tileLayer.wms("https://services.sentinel-hub.com/ogc/wms/"+sentinelKey+"?REQUEST=GetMap&PREVIEW=2", {
          layers:'P4',
          // attribution: 'Sentinel 2 Imagery May 2020'
          });
            // planetKey
            // console.log(planetKey)
            // loadBasemaps()
            clickButtonCount=0;
            //to avoid black tiles as sentinel does not server tiles above 10 (or perhaps yes), then zoom back to 10 again
            map.options.maxZoom = 18;//no need for more zoom levels as 'low' resolution
            map.options.minZoom = 5;
            //to add the imagery alert ....
            if(browserLanguage[0] == 'e' && browserLanguage[1] == 'n'){ //english
              document.getElementById("imageryAlert").innerHTML = 'After mapping, use the textbox to request better recent or past  imagery';
            }
            if(browserLanguage[0] == 'e' && browserLanguage[1] == 's'){ //spanish
              document.getElementById("imageryAlert").innerHTML = 'Después de mappear, utiliza la casilla de texto para solicitar mejores imágenes, recientes o pasadas';
            }
            if(browserLanguage[0] == 'p' && browserLanguage[1] == 't'){ //portuguese
              document.getElementById("imageryAlert").innerHTML = 'Após o mapeamento, use a caixa de texto para solicitar melhores imagens recentes ou passadas';
            }
            if(browserLanguage[0] == 'f' && browserLanguage[1] == 'r'){ //french
              document.getElementById("imageryAlert").innerHTML = 'Après le mappage, utilisez la zone de texte pour demander de meilleures images récentes ou passées';
            }
            if(browserLanguage == 'sw'){                                //swahili
              document.getElementById("imageryAlert").innerHTML = 'Baada ya uchoraji wa ramani, tumia kisanduku cha maandishi kuuliza picha bora za hivi karibuni au za zamani';
            }

        if(created == false){
        document.getElementById('imageryAlert').style.display = 'initial'
        }
            // var currentZoom =  map.getZoom();
            // if(currentZoom > 9){
            //   // var difZoom = currentZoom - 10;
            //   // map.zoomIn(difZoom)
            //   map.setZoom(10)
            //   console.log('zoom bove 10?')
            // }
            // if(currentZoom < 6){
            //   //var difZoom = 6 - currentZoom;
            //   map.setZoom(6)
            //
            // }
           //  console.log(currentZoom)

            planet_Button.removeFrom(map);
            googleSat_Button.addTo(map);

            wmsSentinel2.addTo(map);
            planet.addTo(map); // planet imagery goes after so it stays on top of sentinel data (sentinel is global, planet is not yet?)
            googleSat.removeFrom(map);
            osm.removeFrom(map);
            myLayer_Button.addTo(map)

            // btn.button.style.backgroundColor = 'yellow';
            //   googleSat_Button.button.style.backgroundColor = 'black';
            //   osm_Button.button.style.backgroundColor = 'black'

        }
    }]
});

planet_Button.button.style.width = '50px';
planet_Button.button.style.height = '50px';
planet_Button.button.style.transitionDuration = '.3s';


var myLayerIsOn = true;
var myLayer_Button = L.easyButton({
    id: 'myLayer',
    class:'easyButton',
    position: 'topright',
    //background:'images/forest.png',
    states: [{
      icon: iconLAYERS,
      //  background:"images/forest.png",
        stateName: 'check-mark',
        onClick: function(btn,map) {

///////////////////////////////////////////////////////////////////////////
console.log(myLayerIsOn)
console.log(isFirstTime)
console.log(finalLayer)
console.log(myLayerIsOn)
        if(myLayerIsOn == true && isFirstTime==false){

          console.log('if1')
          myLayerIsOn = false;
          myLayer_Button.button.style.backgroundColor = 'grey';
          if(finalLayer != null){
            finalLayer.removeFrom(map)
          }

          myLayer.removeFrom(map);
         if(myLayerIsOn == true){
           console.log('if2')

           myLayer.removeFrom(map);
           myLayer_Button.button.style.backgroundColor = 'grey';

          }
        }
        else if(myLayerIsOn == false && isFirstTime==false){
          console.log('if3')

          myLayerIsOn = true;
          myLayer_Button.button.style.backgroundColor = 'black';
         //finalLayer.addTo(map)

         if(finalLayer != null){
           finalLayer.addTo(map)
         }

          if(myLayerIsOn == true){
            console.log('if4')

         myLayer.addTo(map)          //  layer1.addTo(map);
         myLayer_Button.button.style.backgroundColor = 'black';


         }
       }else if(isFirstTime==true && myLayer ==null){ //for first load when
         myLayer_Button.button.style.backgroundColor = 'red';
          console.log('if5')
}


          return myLayerIsOn;
        }

    }]
});
//osm_Button.button.style.backgroundColor = 'black';
myLayer_Button.button.style.width = '50px';
myLayer_Button.button.style.height = '50px';
myLayer_Button.button.style.transitionDuration = '.3s';
myLayer_Button.button.style.backgroundColor = 'black';



// if(isFirstTime == false){
//   myLayer_Button.addTo(map)
// }

if(myLayer !=null || finalLayer != null){
myLayer_Button.addTo(map)
}

////////////////////////////////   gps  ///////////////
var gpsIcon = L.icon({
    iconUrl: 'images/man.png',
  //  shadowUrl: 'leaf-shadow.png',

    iconSize:     [30, 30], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// var tosimulateclick = L.easyButton({
//     id: 'tosimulateclickEB',
//     class:'easyButton',
//     position: 'topright',
//     //background:'images/forest.png',
//     states: [{
//        icon: '<img src="images/osm.png" width=0px ; height=0px; style="margin-left:-10px"> ',
//
//       // icon: iconOSM  ,
//
//      //  background:"images/forest.png",
//        stateName: 'check-mark',
//
//       //  background:"images/forest.png",
//         stateName: 'check-mark',
//         onClick: function(btn,map) {
//           }
// }]
// })
// tosimulateclick.addTo(map);
// document.getElementById('tosimulateclickEB').style.display = 'none'

// add location via browser geolocation
var currentLocation = []; // variable created to allow the user recenter the map

var accuracy = 0
var markerAdded=false; // var to avoid multiple markers

function findBuffer(position) {
    //  L.marker([lat, lng],{icon:gpsIcon}).removeFrom(map);
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    accuracy = position.coords.accuracy;
    console.log(accuracy)
    if(markerAdded == false){
  // L.marker([lat, lng],{icon:gpsIcon}).addTo(map);
    markerAdded=true;

    }
    currentLocation = [lat,lng];

  return currentLocation & markerAdded & accuracy;
}

//////////////////////////////////////activate gps///////////////////////////////////////////


//navigator.geolocation.getCurrentPosition(displayLocation); //Note that it requires a secure domain (i.e. HTTPS)
console.log(currentLocation[0])

var locationFound=false;
var audioRecorded = false;
//script to update color of gps button

var circleGT250
var circleLT250
var circleLT250Added = false
var circleGT250Added = false

var refreshGPSbutton = setInterval(function(){ ///////////////////////////////////////// function to keep searching for gps position
//navigator.geolocation.getCurrentPosition(findLocation);
//circleGT250.removeFrom(map)
try {
  navigator.geolocation.watchPosition(findBuffer);
// console.log(currentLocation[0])
}
catch(err) {
  currentLocation == null;
}
//if location found, then set button color, and create circle or add marker if <50m
if(currentLocation[0] != null){
    localStorage.setItem('lastPositionStoredLOCALLY',currentLocation)
    locationFound = true
  //  console.log(currentLocation)
  //  console.log(accuracy)

    //console.log(geolocationCoordinates.accuracy)
    //once the position has been found, we stop checking if the user deactivates again (the position will be recorded anyway)
      if(accuracy<=50){
          gps_Button.button.style.backgroundColor = 'green';
          clearInterval(refreshGPSbutton) //stop searching once accuracy <50
          L.marker(currentLocation,{icon:gpsIcon}).addTo(map);

      }else if(accuracy>50 && accuracy<=250){
          gps_Button.button.style.backgroundColor = 'yellow';
          //if accuracy >50, keep searching
          try {
            navigator.geolocation.watchPosition(findBuffer);
      //     console.log(currentLocation[0])
          }
          catch(err) {
            currentLocation == null;
          }

        //  circleGT250.removeFrom(map)//remove orange circle if it has been added

          if(circleLT250Added == false){

            //set circle based on radious-accuracy
              circleLT250 = L.circle(currentLocation, {
                 color: "#ffffff00",
                 fillColor: "yellow",
                 fillOpacity: 0.3,
                 radius: accuracy
               })//.addTo(map);
               //remove circle after 10 seconds
              // setTimeout(function(){ circleLT250.removeFrom(map) }, 10000);

               circleLT250Added = true
          }

    }else if(accuracy>250){
            gps_Button.button.style.backgroundColor = 'orange';
            try {
              navigator.geolocation.watchPosition(findBuffer);
             console.log(currentLocation[0])
            }
            catch(err) {
              currentLocation == null;
            }
            if(circleGT250Added == false){
              circleGT250 = L.circle(currentLocation, {
                   color: "#ffffff00",
                   fillColor: "orange",
                   fillOpacity: 0.3,
                   radius: accuracy
                 })//.addTo(map);
              //   setTimeout(function(){ circleGT250.removeFrom(map) }, 10000);

                 circleGT250Added = true
              }
            }

  //  locationFound = true
    }else{
          gps_Button.button.style.backgroundColor = 'red';
          try {
            navigator.geolocation.watchPosition(findBuffer);
    //       console.log(currentLocation[0])
          }
          catch(err) {
            currentLocation == null;
          }
  //  locationFound = false

  }
  return currentLocation & circleLT250Added & circleGT250Added & circleLT250 & circleGT250;
},1000)


console.log(currentLocation[0])
var gps_Button = L.easyButton({
    id: 'gps',
    position: 'topleft',
    states: [{
        icon: iconGPS,
        stateName: 'check-mark',
        onClick: function(btn,map) {
          try {
            navigator.geolocation.watchPosition(findBuffer);
        //   console.log(currentLocation[0])
          }
          catch(err) {
            currentLocation == null;
          }
      //    console.log(currentLocation)
            if(currentLocation[0] != null){

            if(accuracy<=50){
            gps_Button.button.style.backgroundColor = 'green';
            //
            map.setView(currentLocation,15);
            console.log(currentLocation)

          }else if(accuracy>50 && accuracy<=250){
            gps_Button.button.style.backgroundColor = 'yellow';

            //set view based on circle radius
            circleLT250.addTo(map);
            map.fitBounds(circleLT250.getBounds());

            setTimeout(function(){circleLT250.removeFrom(map); }, 200);

          }else if(accuracy>250){
            gps_Button.button.style.backgroundColor = 'orange';
          //  setTimeout(function(){circleGT250.addTo(map)}, 200);
            circleGT250.addTo(map); //the layer must be added before the getbounds is fired, then the layer is removed
        //    console.log(circleGT250)
            map.fitBounds(circleGT250.getBounds());
            // console.log(circleGT250.getBounds())
            // console.log(map.getBounds())

            setTimeout(function(){circleGT250.removeFrom(map); }, 200);

          }

            }

            if (currentLocation[0] == null){
//navigator.geolocation.getCurrentPosition(findLocation)
              gps_Button.button.style.backgroundColor = 'red';
            }

        //  btn.button.style.backgroundColor = 'black';
        //  home_Button.addTo(map);
        //  gps_Button.removeFrom(map);
      // console.log(currentLocation)

        }
    }]
});

gps_Button.button.style.width = '50px';
gps_Button.button.style.height = '50px';
gps_Button.button.style.transitionDuration = '.3s';
gps_Button.button.style.backgroundColor = 'white';
gps_Button.addTo(map);

var rose = L.control.rose('rose', {position:'topleft', icon:'nautical', iSize:'medium', opacity:1});
rose.addTo(map)

 ///////////////messages for tile download/////////
googleSat.on('offline:save-start', function (data) {
    console.log('Saving ' + data.nTilesToSave + ' tiles.');
});
googleSat.on('offline:save-end', function () {
    alert('All the tiles were saved.');
});
googleSat.on('offline:save-error', function (err) {
    console.error('Error when saving tiles: ' + err);
});
googleSat.on('offline:remove-start', function () {
    console.log('Removing tiles.');
});
googleSat.on('offline:remove-end', function () {
    alert('All the tiles were removed.');
});
googleSat.on('offline:remove-error', function (err) {
    console.error('Error when removing tiles: ' + err);
});
googleSat.on('offline:below-min-zoom-error', function () {
    alert('Can not save tiles below minimum zoom level.');
});
////////////////

osm.on('offline:save-start', function (data) {
    console.log('Saving ' + data.nTilesToSave + ' tiles.');
});
osm.on('offline:save-end', function () {
    alert('All the tiles were saved.');
});
osm.on('offline:save-error', function (err) {
    console.error('Error when saving tiles: ' + err);
});
osm.on('offline:remove-start', function () {
    console.log('Removing tiles.');
});
osm.on('offline:remove-end', function () {
    alert('All the tiles were removed.');
});
osm.on('offline:remove-error', function (err) {
    console.error('Error when removing tiles: ' + err);
});
osm.on('offline:below-min-zoom-error', function () {
    alert('Can not save tiles below minimum zoom level.');
});
///////////////////////////////////

/////////////////////////////////////////////////////////////////////////
var drawnItems = new L.FeatureGroup();
   map.addLayer(drawnItems);
   // Set the title to show on the polygon button
   // L.drawLocal.draw.toolbar.buttons.polygon = 'Draw a sexy polygon!';

   var editableLayers = new L.FeatureGroup();
   map.addLayer(editableLayers);

   var MyCustomMarker = L.Icon.extend({
       options: {
           shadowUrl: null,
           iconAnchor: new L.Point(12, 12),
           iconSize: new L.Point(24, 24),
           iconUrl: 'images/point.png'
       }
   });

   var options = {
           position: 'topright',
           draw: {
               polyline: {
                   shapeOptions: {
                       color: 'black',
                       weight: 4
                   }
               },
               polygon: {
                // showArea:true,
                   allowIntersection: false, // Restricts shapes to simple polygons
                  // icon: new MyCustomMarker() ,
                                     icon: new L.DivIcon({
                               iconSize: new L.Point(10, 10),
                               className: 'leaflet-div-icon',
                               weight:5

                            //   className: 'leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-touch-icon.leaflet-zoom-animated',

                             }),

                   drawError: {
                       color: 'red', // Color the shape will turn when intersects
                       // message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
                   },
                   shapeOptions: {
                       color: '#00ff00'
                   }
               },

           },
           marker: {
             icon: new MyCustomMarker('images/point.png')
          //  icon:'images/point.png'
           },
           edit: {
               featureGroup: drawnItems, //REQUIRED!!
               edit:false,
               remove: false
           }
       };


   var drawControl = new L.Control.Draw(options);
   // map.addControl(drawControl); !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   map.on(L.Draw.Event.CREATED, function (e) {
       var type = e.layerType,
               layer = e.layer;

       drawnItems.addLayer(layer);
   });

//Script to allow drag while drawing/editing without adding any point.
   (function() {
	var originalOnTouch = L.Draw.Polyline.prototype._onTouch;
	L.Draw.Polyline.prototype._onTouch = function( e ) {
		if( e.originalEvent.pointerType != 'mouse'  && e.originalEvent.pointerType != 'touch' ) {
			return originalOnTouch.call(this, e);
		}
	}
})();

var drawPolygon = new L.Draw.Polygon(map, drawControl.options.draw.polygon);
var drawPolyline = new L.Draw.Polyline(map, drawControl.options.draw.polyline);
var drawMarker = new L.Draw.Marker(map, drawControl.options.draw.marker);

/////////////////////////////////////////Initial state of buttons //////////////////////////////////////
//to empty emoji box... ? not working? better to keep attributes?
// var initialBoxContent = document.getElementById('emojionearea1').value
// document.getElementById('emojionearea1').value = '...'
// console.log(initialBoxContent)
//document.getElementById('activatePlay').style.display = 'initial';

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
           // document.getElementById("Confirm").style.display = "none";

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


////////////////////////////////////////////TUTORIAL//////////////////////////////////////////////////////////////

////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//script to add drawn layers to local storage
            var layerFromLocalStorage = localStorage.getItem('storedLayer');
            console.log(layerFromLocalStorage)
           var layerFromLocalStorageToGeoJson = JSON.parse(layerFromLocalStorage);
           console.log(layerFromLocalStorageToGeoJson)
          L.geoJSON(layerFromLocalStorageToGeoJson).addTo(map);
            //console.log(layerLocalStorageGeoJson)

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!

              // console.log('location'+ currentLocation)
              //   if(currentLocation[0]==null){
              //   //  home_Button.addTo(map);
              //   //  L.marker([0.670322, 35.507470], {icon:communityIcon}).addTo(map);
              //   }else{
              //     gps_Button.addTo(map);
              //   }

              document.body.style.backgroundColor = "white";

              document.getElementById("map").style.display = "block";

              document.getElementById("goBack1").style.display = "initial";
              document.getElementById("polygon").style.display = "initial";
              document.getElementById("polyline").style.display = "initial";
              document.getElementById("point").style.display = "initial";

              document.getElementById("deleteLastVertex").style.opacity = "0.35";
              document.getElementById("deleteLastVertex").disabled = true;
              document.getElementById("deleteAllVertexs").style.opacity = "0.35";
              document.getElementById("deleteAllVertexs").disabled = true;
          //    document.getElementById("deletePolygon").style.display = 'none';
              document.getElementById("deleteLastVertexLine").style.opacity = "0.35";
              document.getElementById("deleteLastVertexLine").disabled = true;
              document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
              document.getElementById("deleteAllVertexsLine").disabled = true;

              document.getElementById("completeFeature").style.opacity = "0.35";
              document.getElementById("completeFeature").disabled = true;


var mapCurrentBounds;
var mapCurrentZoom;
var mapCurrentCenter;

    document.getElementById("goBack1").onclick = function(e){

            mapCurrentBounds =  map.getBounds();
            mapCurrentZoom = map.getZoom();
            mapCurrentCenter = map.getCenter();

          setTimeout(function(){
            document.getElementById('imageryAlert').style.display = 'none'

             window.location.href ='pages/tutorial.html';
             document.body.style.backgroundColor = "black";
             document.getElementById("map").style.display = "none";

             document.getElementById("goBack1").style.display = "none";
             document.getElementById("polygon").style.display = "none";
             document.getElementById("polyline").style.display = "none";
             document.getElementById("point").style.display = "none";
          },200)

       return  mapCurrentBounds & mapCurrentZoom & mapCurrentCenter
     }
///////////////////////////////////////////draw screen////////////////////////////////////////////////


 //variable to determine whether a polygon has been completed.
var clickMapCount = 0;
var clickDelVertCount = 0;
document.getElementById("goBack2").onclick = function(e){

  // document.getElementById('finishDrawInst').style.display = 'none';

//to enable doubleclick zoom that is disabled while drawing
  map.doubleClickZoom.enable();

    clickMapCount = 0;
     map.zoomOut(1); //decreases the zoom level when click
      setTimeout(function(){
       document.getElementById("goBack1").style.display = "initial";
       document.getElementById("goBack2").style.display = "none";
       document.getElementById("polygon").style.display = "initial";
       document.getElementById("polyline").style.display = "initial";
       document.getElementById("point").style.display = "initial";

       document.getElementById("deleteLastVertex").style.display = "none";
       document.getElementById("deleteAllVertexs").style.display = "none";
      // document.getElementById("changeMapSize").style.display = "none";
       //document.getElementById("deletePolygon").style.display = "none";

       document.getElementById("deleteLastVertex").style.opacity = "0.35";
       document.getElementById("deleteLastVertex").disabled = true;
       document.getElementById("deleteAllVertexs").style.opacity = "0.35";
       document.getElementById("deleteAllVertexs").disabled = true;
      // document.getElementById("deletePolygon").style.display = 'none';

      document.getElementById("deleteLastVertexLine").style.display = "none";
      document.getElementById("deleteAllVertexsLine").style.display = "none";

      document.getElementById("deleteLastVertexLine").style.opacity = "0.35";
      document.getElementById("deleteLastVertexLine").disabled = true;
      document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
      document.getElementById("deleteAllVertexsLine").disabled = true;

      document.getElementById('completeFeature').style.display = 'none';

      document.getElementById("completeFeature").style.opacity = "0.35";
      document.getElementById("completeFeature").disabled = true;


    },200)

     drawPolygon.disable();
     drawPolyline.disable();
     drawMarker.disable();
     drawnItems.remove();
     drawnItems.clearLayers();

     }

var boxContent;
var featureType;
var drawingPoint = false
  document.getElementById('point').onclick = function(e){
    if(isIOS == false){
      recordedBlobs = null; //to empty recorded blobs from previous map in this session
    }

    featureType = 'point';
      map.doubleClickZoom.disable();

      console.log(planetKey)

            currentZoom = map.getZoom();
          //  map.zoomIn(1); //increases the zoom level when click on polygon

          //  clickMapCount = 0;
            drawMarker.enable();
          //    document.getElementById("handDraw").style.display = "initial";
          setTimeout(function(){
            document.getElementById('imageryAlert').style.display = 'none'

            document.getElementById("goBack1").style.display = "none";
            document.getElementById("polygon").style.display = "none";
            document.getElementById("polyline").style.display = "none";
            document.getElementById("point").style.display = "none";

            document.getElementById("goBack2").style.display = "initial";
          //  document.getElementById('DrawInstruction').style.display = 'initial';

          },200);
          // setTimeout(function(){ //to remove the Draw instruction after X seconds
          //   document.getElementById('DrawInstruction').style.display = 'none';
          //
          // },2200);


          //  document.getElementById("deletePoint").style.display = "initial";
          //  document.getElementById("deleteAllVertexs").style.display = "initial";
      drawingPoint = true;
      return drawingPoint && featureType
  };

  document.getElementById('polyline').onclick = function(e){
    if(isIOS == false){
      recordedBlobs = null; //to empty recorded blobs from previous map in this session
    }
    featureType = 'polyline';
    map.doubleClickZoom.disable();

    map.on('draw:drawvertex',
      function (e) {
          $(".leaflet-div-icon")
         // $(".leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-touch-icon.leaflet-zoom-animated.leaflet-interactive:first")
          .css({ 'background-color': 'white','border-radius': '10px', 'height':'10px', 'width':'10px'});
      });
    map.on('draw:drawvertex',
        function (e) {
            $(".leaflet-div-icon.leaflet-interactive:last")
           // $(".leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-touch-icon.leaflet-zoom-animated.leaflet-interactive:first")
            .css({ 'background-color': '#F905EA','border-radius': '25px', 'height':'15px', 'width':'15px'});
      });

            currentZoom = map.getZoom();
          //  map.zoomIn(1); //increases the zoom level when click on polygon

            clickMapCount = 0;
            drawPolyline.enable();
          //    document.getElementById("handDraw").style.display = "initial";
          setTimeout(function(){
            document.getElementById('imageryAlert').style.display = 'none';

            document.getElementById("goBack1").style.display = "none";
            document.getElementById("polygon").style.display = "none";
            document.getElementById("polyline").style.display = "none";
            document.getElementById("point").style.display = "none";

            document.getElementById("goBack2").style.display = "initial";
            document.getElementById("deleteLastVertexLine").style.display = "initial";
            document.getElementById("deleteAllVertexsLine").style.display = "initial";
            document.getElementById('completeFeature').style.display = 'initial';
          //   document.getElementById('DrawInstruction').style.display = 'initial';
          //
           },200)
          //
          // setTimeout(function(){ //to remove the Draw instruction after X seconds
          //   document.getElementById('DrawInstruction').style.display = 'none';
          //
          // },2200);


      return featureType;
  };


  document.getElementById('polygon').onclick = function(e){
        if(isIOS == false){
          recordedBlobs = null; //to empty recorded blobs from previous map in this session
        }
        featureType = 'polygon'
        map.doubleClickZoom.disable();

        map.on('draw:drawvertex',
          function (e) {
              $(".leaflet-div-icon")
             // $(".leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-touch-icon.leaflet-zoom-animated.leaflet-interactive:first")
              .css({ 'background-color': '#DAFDC4','border-radius': '10px', 'height':'10px', 'width':'10px'});
          });

        map.on('draw:drawvertex',
            function (e) {
                $(".leaflet-div-icon.leaflet-interactive:first")
               // $(".leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-touch-icon.leaflet-zoom-animated.leaflet-interactive:first")
                .css({ 'background-color': '#F905EA','border-radius': '25px', 'height':'15px', 'width':'15px'});
          });

                currentZoom = map.getZoom();
              //  map.zoomIn(1); //increases the zoom level when click on polygon

                clickMapCount = 0;
                drawPolygon.enable();
              //    document.getElementById("handDraw").style.display = "initial";
              setTimeout(function(){
                document.getElementById('imageryAlert').style.display = 'none'

                document.getElementById("goBack1").style.display = "none";
                document.getElementById("polygon").style.display = "none";
                document.getElementById("polyline").style.display = "none";
                document.getElementById("point").style.display = "none";

                document.getElementById("goBack2").style.display = "initial";
                document.getElementById("deleteLastVertex").style.display = "initial";
                document.getElementById("deleteAllVertexs").style.display = "initial";
                document.getElementById('completeFeature').style.display = 'initial';
                // document.getElementById('DrawInstruction').style.display = 'initial';

              },200);

              // setTimeout(function(){ //to remove the Draw instruction after X seconds
              //   document.getElementById('DrawInstruction').style.display = 'none';
              //
              // },2200);
          return featureType;
  };

  document.getElementById('map').onclick = function(e){

      // if(featureType == 'polygon'){
      //   console.log('number of vertex polygon ' + drawPolygon._markers.length)
      //
      // }if(featureType == 'polyline'){
      //   console.log('number of vertex polyline ' + drawPolyline._markers.length)
      // }

      if(created == false){ // to avoid the script to seach for _markers.length when the feature still has not been created

         if(featureType == 'polyline' && drawPolyline._markers.length > 0){ //add condition to allow user complete shape if vertext >=2. var from DRAW plugin
          console.log(drawPolyline._markers.length)
          document.getElementById("deleteLastVertexLine").style.opacity = "1";
          document.getElementById("deleteLastVertexLine").disabled = false;
       }
        if(featureType == 'polyline' && drawPolyline._markers.length > 1){
          document.getElementById("deleteAllVertexsLine").style.opacity = "1";
          document.getElementById("deleteAllVertexsLine").disabled = false;
          document.getElementById("completeFeature").style.opacity = "1";
          document.getElementById("completeFeature").disabled = false;
       }
        if(featureType == 'polygon' && drawPolygon._markers.length > 0){ // polygon vertex >=3

          document.getElementById("deleteLastVertex").style.opacity = "1";
          document.getElementById("deleteLastVertex").disabled = false;
       }
        if(featureType == 'polygon' && drawPolygon._markers.length > 1){
          document.getElementById("deleteAllVertexs").style.opacity = "1";
          document.getElementById("deleteAllVertexs").disabled = false;
       }
        if(featureType == 'polygon' && drawPolygon._markers.length > 2){
          document.getElementById("completeFeature").style.opacity = "1";
          document.getElementById("completeFeature").disabled = false;
       }
  }
}

///////////////////////////       delete vertexs      //////////////////////////////////


document.getElementById('deleteLastVertex').onclick = function(e){
        console.log('number of vertex polygon ' +drawPolygon._markers.length)
        if(drawPolygon._markers.length == 1){
          document.getElementById("deleteAllVertexs").disabled = false;
          document.getElementById('deleteAllVertexs').click()

        }else if(drawPolygon._markers.length > 1){
          drawPolygon.deleteLastVertex();
        }
        if(drawPolygon._markers.length < 3){
          document.getElementById("completeFeature").style.opacity = "0.35";
          document.getElementById("completeFeature").disabled = true;
        }
        if(drawPolygon._markers.length < 2){
          document.getElementById("deleteAllVertexs").style.opacity = "0.35";
          document.getElementById("deleteAllVertexs").disabled = true;
        }
}

 document.getElementById('deleteAllVertexs').onclick = function(e){
        clickMapCount = 0;
        // clickDelVertCount = 0;
        drawPolygon.disable();
        drawPolygon.enable();
      //  document.getElementById('finishDrawInst').style.display = 'none';

      setTimeout(function(){
        document.getElementById("deleteLastVertex").style.opacity = "0.35";
        document.getElementById("deleteLastVertex").disabled = true;
        document.getElementById("deleteAllVertexs").style.opacity = "0.35";
        document.getElementById("deleteAllVertexs").disabled = true;
        document.getElementById("completeFeature").style.opacity = "0.35";
        document.getElementById("completeFeature").disabled = true;
      },200)
}


/////////////line////////////////////////
  document.getElementById('deleteLastVertexLine').onclick = function(e){
      console.log('number of vertex polygon ' +drawPolyline._markers.length)
      if(drawPolyline._markers.length == 1){
        document.getElementById("deleteAllVertexsLine").disabled = false;
        document.getElementById('deleteAllVertexsLine').click()

      }else if(drawPolyline._markers.length > 1){
        drawPolyline.deleteLastVertex();
      }
      if(drawPolyline._markers.length == 1){
        document.getElementById("completeFeature").style.opacity = "0.35";
        document.getElementById("completeFeature").disabled = true;
        document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
        document.getElementById("deleteAllVertexsLine").disabled = true;
      }
  }

  document.getElementById('deleteAllVertexsLine').onclick = function(e){

          drawPolyline.disable();
          drawPolyline.enable();
        //  document.getElementById('finishDrawInst').style.display = 'none';

        setTimeout(function(){
          document.getElementById("deleteLastVertexLine").style.opacity = "0.35";
          document.getElementById("deleteLastVertexLine").disabled = true;
          document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
          document.getElementById("deleteAllVertexsLine").disabled = true;
          document.getElementById("completeFeature").style.opacity = "0.35";
          document.getElementById("completeFeature").disabled = true;
        },200)
      }

//to complete polygon when click on green thumbs up
  document.getElementById('completeFeature').onclick = function(e){
    if(featureType == 'polyline'){
      drawPolyline.completeShape();

    }else if(featureType == 'polygon'){
      drawPolygon.completeShape();
    }

  }


var tempLayer;
var data;
var  finalAreaHa2Decimals
var  finalAreaAcres2Decimals
var  finalLength2Decimals

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var typeOfFeature;
map.on('draw:created', function (e) {
       //drawnItems.completeShape();

       created = true;

     drawPolygon.disable();
    //   drawPolygon.enable();
     drawnItems.removeFrom(map); //remove the drawn item as yellow polygon appears

    //  setTimeout(function(){
    //document.getElementById('finishDrawInst').style.display = 'none';

        document.getElementById("deleteAllVertexs").style.display = "none";
        document.getElementById("deleteLastVertex").style.display = "none";
        document.getElementById("goBack2").style.display = "none";

        document.getElementById("deleteLastVertexLine").style.display = "none";
        document.getElementById("deleteAllVertexsLine").style.display = "none";

        document.getElementById("completeFeature").style.display = "none";

        document.getElementById("share-download").style.display = "initial";
        document.getElementById("share-download").style.opacity = "0.35";//to disable button until user adds attributes, either with audio or text
        document.getElementById("share-download").disabled = true;
        // document.getElementById("Confirm").style.display = "initial";
        document.getElementById("Cancel").style.display = "initial";

        document.getElementById("classification").style.display = "initial";

        document.getElementById("emoji").style.display = "initial";

        document.getElementById('Sent').currentTime = 0;

        document.getElementById('voice').style.display = 'none';
        document.getElementById('voice').style.opacity = '0';
        if(isIOS == false){

        document.getElementById('enableRecording').style.display = 'initial';
      }else{
        document.getElementById('noAudioIOS').style.display = 'initial';

      }
        document.getElementById('emoji').style.display = 'initial';
    //  },200)

        data = drawnItems.toGeoJSON();
        console.log(data)
////////////////   script to get area of polygon    //////////////
        // var type = e.layerType,
      //   var layerType = e.layerType;
      //   layer = e.layer
      //   console.log(layerType)
      // //  polygons.addLayer(layer);
      // //    polygons.addLayer(drawnItems);
      //
      //  var seeArea = L.GeometryUtil.geodesicArea(layer.getLatLngs());
      //     console.log(layer.getLatLngs());
      // //  console.log(L.GeometryUtil.readableArea(area, this.options.metric, this.options.precision));

      console.log(finalArea) // area obtained from DRAW plugin, always in sq m
      console.log(finalLength)
      var type = e.layerType
      console.log(type)

      ////////////////    area   //////////////
  if(type == 'polygon'){
    typeOfFeature = 'polygon'
    // convert sq m to
    var finalAreaHa = finalArea*0.0001
    var finalAreaAcres = finalArea*0.000247105
    //to remove decimals ....
    finalAreaHa2Decimals = finalAreaHa.toFixed(2) + ' ' +'hectares'
    finalAreaAcres2Decimals = finalAreaAcres.toFixed(2) + ' ' +'acres'
      //  console.log(finalArea2Decimals)
  //to show the final area on the top
        document.getElementById('showAreaHa').style.display = 'initial';
        document.getElementById("showAreaHa").innerHTML = finalAreaHa2Decimals;

        document.getElementById('showAreaAcres').style.display = 'initial';
        document.getElementById("showAreaAcres").innerHTML = finalAreaAcres2Decimals;
          //script for calculating the center of the polygon and recenter the map there
  }
        ////////    length    ///////////
  if (type == 'polyline'){
    typeOfFeature = 'polyline'

  //to remove decimals ....
  finalLength2Decimals = finalLength.toFixed(2) + ' ' +'meters'
    //  console.log(finalArea2Decimals)
      //to show the final length on the top

        document.getElementById('showLength').style.display = 'initial';
        document.getElementById("showLength").innerHTML = finalLength2Decimals;

  }
        //////////////////////////////////////////

          //script to avoid zoom to unavailable tile
//   if (drawingPoint ==true){
//     typeOfFeature = 'point'
//
//     map.zoomOut(6)
//
//   }
//
// //to recenter the map to the center of the feature
//     if(typeOfFeature == 'polygon' || typeOfFeature == 'polyline'){
//       var boundsOfFeature = drawnItems.getBounds()
//       centerOfFeature = boundsOfFeature.getCenter();
//     //  var centerOfFeatureLatLong = L.latLng(centerOfFeature)
//       console.log('centerOfFeatureLatLong   ' + centerOfFeature)
//       map.fitBounds(boundsOfFeature,{
//                          //  maxZoom:30,
//            paddingBottomRight: [0, 0]
//        })
//      map.panTo(new centerOfFeature);
//        //map.setView(centerOfFeature,map.getZoom())
//
//     }else{
//       var centerOfFeature = data.getCenter();
//       console.log('centerOfFeature' + centerOfFeature)
//       map.panTo(centerOfFeature);
//
//     }


        //  map.setView(centerBoundsPolygon);
        // var polygonCenter = drawnItems.getCenter();
        // console.log(polygonCenter)
      //  var boxContentToString = boxContent.toString();
        //attributes added to Geojson file properties
        //var combinedAttributeData = landUses + dateTime + currentLocation;
        // var propertiesGeoJSON = {
        //   'landUses':boxContentToString,
        //
        // };
      //  adding the properties to the geoJSON file:
    //  data.features[0].properties = propertiesGeoJSON;

        function onEachFeatureBlank(feature, layer) {
          var popupContent = '...'  ; //+ '    ' +dateTimeRandomID

          // if (feature.properties && feature.properties.popupContent) {
          //   popupContent += feature.properties.popupContent;
          // }

          layer.bindPopup(popupContent).addTo(map);
          layer.bindPopup(popupContent).openPopup(); ///automatically shows the pop up!
            //  layer.updatePopup(popupContent)
        }

        tempLayer = L.geoJSON(data,{
          style: function (feature) {
            return feature.properties && feature.properties.style;
          },
          color:'#ffff00',
          onEachFeature: onEachFeatureBlank,

        }).addTo(map);
//to locate the feature at the center of the map. This must go right after creating the geojson file tempLayer
        var boundsPolygon = drawnItems.getBounds()
        var centerBoundsPolygon = boundsPolygon.getCenter()
              ///////////////
              console.log(centerBoundsPolygon)

        var mapNewBounds =  map.getBounds();

        map.fitBounds(drawnItems.getBounds(),{
                           //  maxZoom:30,
             paddingBottomRight: [0, 0]
         })
         console.log(typeOfFeature)

  // to avoid to many zoom when a point is created >> zoom +2
     if(typeOfFeature != 'polygon' && typeOfFeature != 'polyline'){
       map.zoomOut(2)

     }

        //created = true;
console.log(created)

      // if(oneMapCompleted == true){
      //  var emptyTextbox = document.getElementsByClassName('emojionearea-editor').innerHTML
      //  emptyTextbox.load(window.location.href + "index.html" );
      // }
      //$('#emojionearea-editor').load(location.href + ' #emojionearea-editor');
      document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null   // to empty text box
      document.getElementsByClassName('emojionearea-wrapper').innerHTML = null   // to empty text box
      console.log(document.getElementsByClassName('emojionearea').value)

      startCheckingText() // to call the function to start checking the input text
       return created & data && typeOfFeature;

   });
/////////////////////////////////////////////////////////////////////////////////////////////////////
//functions to move map up/down when emoji menu is opened/closed ONLY IN 'SMALL' SCREENS. The funciton is called in emojionearea.js
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var screenwidth = screen.width
var screenwithWithMargins = screenwidth*0.3
var screenheight = screen.height
console.log('screenheight ' + screenheight)
console.log('screenwidth ' + screenwidth)

var alreadyMovedUp = false;
var moveMaptoTop = function(){
  alreadyMovedUp = true;
  //var top75p = screenheight*0.6
  var bounds = map.getBounds()
  var centerPoint = [screenwidth/2,(screenheight/2)*1.3]
  var targetLatLng = map.containerPointToLatLng(centerPoint);


   if(screenwidth < 600){ // condition to avoid pan in tablets and PCs
    map.panTo(targetLatLng);
    return alreadyMovedUp
   }
}
// var moveMaptoBottom = function(){
//   var top50p = screenheight*0.25
//   var bounds = map.getBounds()
//   var centerPoint = [screenwidth/2,top50p]
//   var targetLatLng = map.containerPointToLatLng(centerPoint);
//
//   if(screenheight < 700){
//     map.panTo(targetLatLng);
//   }
// }
////////////////////////////////////////////////////////////////////////////////////////////////


//var emptyTextbox = document.getElementsByClassName('emojionearea-editor').innerHTML
var refreshPopup;
var startCheckingText = function(){
  var popupContent = '...'  ;
  // $('#emoji').load(' #emoji')
  //console.log(document.getElementsByClassName('emojionearea').value)
//document.getElementsByClassName('emojionearea').value = '...'
  // document.getElementsByClassName('emojionearea-editor').innerHTML = null

    tempLayer.removeFrom(map);
    function onEachFeatureConfirm(feature, layer) {
        //  var popupContent = document.getElementById('emoji').textContent ; //+ '    ' +dateTimeRandomID
          // if (feature.properties && feature.properties.popupContent) {
          //   popupContent += feature.properties.popupContent;
          // }
/////////////////////////////////////////////////////////lllllllllllllllllllllllllllllllllllllllllllllllllllkjjjjjjjjjjjjjjjjjjjjjjjjjtop
// var someimage = document.getElementById('span6');
// var myimg = someimage.getElementsByTagName('img')[1];
// var mysrc = myimg.alt;
// console.log('alt tag....'+mysrc)
////////////ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
console.log(document.getElementsByClassName('emojionearea-editor').innerText)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////top

         refreshPopup = setInterval(function(){

 //the problem with document.getElementById('emojionearea').value is that it only updates when the text box is not selected, which is as issue. TextContent methodworks
 //well, except that it does not capture emojis
          var emojioneareaeditor = document.getElementsByClassName('emojionearea-editor')
          console.log(emojioneareaeditor)
          var emojioneareaeditor0 = emojioneareaeditor[0]
          console.log(emojioneareaeditor0)
          var emojioneareaeditor0innerHTML = emojioneareaeditor0.innerHTML       /////////////////////////////////////////////11111111111111111111111ddddddddddddddddddddddddddddddESTE!!!
          console.log(emojioneareaeditor0innerHTML)
          // emojioneareaeditor0innerHTMLresized = emojioneareaeditor0innerHTML.width = '20'
        //  emojioneareaeditor.heigth = '20';

console.log(emojioneareaeditor[0].textContent.lenght)
          if(emojioneareaeditor0innerHTML.length == 0){ //to show '...' while the textbox is empty of characters (both letter and emojis)
            layer.bindPopup(popupContent).addTo(map);
            layer.bindPopup(popupContent).openPopup(); ///automatically shows the pop up!
            console.log('innerhtml is nullllllllllllllllllllllllllll22222222')

            if(audioRecorded == false){
            document.getElementById("share-download").style.opacity = "0.35";//to disable button until user adds attributes, either with audio or text
            document.getElementById("share-download").disabled = true;
            }
          }else{
            layer.bindPopup(emojioneareaeditor0innerHTML).addTo(map);
            layer.bindPopup(emojioneareaeditor0innerHTML).openPopup(); ///automatically shows the pop up!
            console.log('innerhtml is not nulllllllllllllll')
            document.getElementById("share-download").style.opacity = "1";//to disable button until user adds attributes, either with audio or text
            document.getElementById("share-download").disabled = false;
          }


     },1000)
  }

      tempLayer = L.geoJSON(data,{
        style: function (feature) {
          return feature.properties && feature.properties.style;
        },
        color:'#ffff00',
        onEachFeature: onEachFeatureConfirm,

      }).addTo(map);
      console.log(tempLayer)
  return tempLayer && refreshPopup
}


////////////////////////////         audio          ///////////////////////////////

document.getElementById('noAudioIOS').onclick = function(e){

  if(browserLanguage[0] == 'e' && browserLanguage[1] == 'n'){ //english
  alert("Voice recording not yet available for iPhone,iPad or Mac.");  }
  if(browserLanguage[0] == 'e' && browserLanguage[1] == 's'){ //spanish
  alert("La grabación de voz aún no está disponible para iPhone, iPad o Mac.");  }
  if(browserLanguage[0] == 'p' && browserLanguage[1] == 't'){ //portuguese
  alert("A gravação de voz ainda não está disponível para iPhone, iPad ou Mac.");  }
  if(browserLanguage[0] == 'f' && browserLanguage[1] == 'r'){ //french
  alert("L'enregistrement vocal n'est pas encore disponible pour iPhone, iPad ou Mac.");  }
  if(browserLanguage == 'sw'){                                //swahili
  alert("Kurekodi kwa sauti bado haipatikani kwa iPhone, iPad au Mac.");  }
}

if(isIOS == false){
      document.getElementById('enableRecording').onclick = function(e){
       setTimeout(function(){
         document.getElementById('record').style.display = 'initial';
         document.getElementById('record').style.opacity = '1';
         document.getElementById('enableRecording').style.display = 'none';
       },200)
        //setTimeout(function(){ document.getElementById("record").click();}, 500);
        //document.getElementById("record").click();

      }
}


  // var el = $("selector").emojioneArea();
  // el[0].emojionearea1.on("emojibtn.click", function(btn, event) {
  //   console.log(btn.html());
  // });

////////////////////////////////////////////////////////classify screen, audio//////////////////////////////////////////////////////////////

//function to stop the recording after X seconds. The function is called when right after the recording is activated (i.e. when click if recording == false)
    function stopAudioAutomatically(){
       if(document.getElementById('record').style.backgroundColor == 'yellow'){
         console.log('auto activated')
         setTimeout(function(){
           if(document.getElementById('record').style.backgroundColor == 'yellow'){ //condition to avoid that the button is autom clicked even
             // when the recording is stopped but was previously yellow. If after X seconds is white, should not be clicked.
           document.getElementById('record').click();
           }
         },30000)  ///////////////////////////////  30 seconds is the appropriate time?
       }
     }


console.log(isOnlineGlobal)

document.getElementById('record').onclick = function(e){
          console.log('clicked manual' + new Date)
          console.log(created)

          //clearInterval(refreshPopup) //stop checking for changes in the textbox whiele audio recording on
              if(recording==false){
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
                  console.log(width)
                  width = width - 190;
                  width = width+'px'
                  console.log(width)

                  // document.getElementById('voiceGif').style.width = width;
                  // document.getElementById('voiceGif').style.height = '40px';
                  stopAudioAutomatically();
            }
            if(recording==true){

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
                // document.getElementById('Confirm').disabled = false;
                // document.getElementById('Confirm').style.opacity = '1';
                audioStoppedManually = true
                //startCheckingText() //to start checking if changes in text box when audio stops

            }

             document.getElementById('gum').style.display = 'none';
             document.getElementById('recorded').style.display = 'none';
             document.getElementById('echoCancellation').style.display = 'none';
      return audioRecorded
 }


  document.getElementById('activatePlay').onclick = function(e){
          document.getElementById("play").click(); //added so no need to click button twice
          document.getElementById('activatePlay').style.background = 'grey'
          setTimeout(function(){document.getElementById('activatePlay').style.background = 'white'},500)
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  $("#emojionearea").emojioneArea({
  	pickerPosition: "top",
  	filtersPosition: "bottom",
    tones: false,
    autocomplete: false,
    inline: false,  //text box resizes with text input
    hidePickerOnBlur: false,
    search: false,
    placeholder: "..."
  });
var boxContent;


      document.getElementById('Cancel').onclick = function(e){
        alreadyMovedUp = false;
        audioRecorded = false;
        typeOfFeature = null; //to refresh the var
            clearInterval(refreshPopup)
        map.doubleClickZoom.enable();


             created = false;
             drawnItems.remove();
             drawnItems.clearLayers();


             map.zoomOut(1);
             drawingPoint =false;
             if(isIOS == false){
               recordedVideo.pause();
              recordedBlobs = null; // audio is removed if cancel is clicked
          }
            setTimeout(function(){
          //   document.getElementById("map").style.display = "block";

             document.getElementById("goBack1").style.display = "initial";
             document.getElementById("polygon").style.display = "initial";
             document.getElementById("polyline").style.display = "initial";
             document.getElementById("point").style.display = "initial";
             document.getElementById("Cancel").style.display = "none";

            document.getElementById("Download").style.display = "none";
            document.getElementById("DownloadButton").style.display = "none";
            // document.getElementById("Confirm").style.display = "none";

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
           },200)
             // finalAreaHa = null
             // finalAreaAcres = null
             // finalLength = null

             tempLayer.clearLayers()
          //   return finalAreaHa & finalAreaAcres & finalLength

          return created;
           }


///////////////////////////////////////////   FIREBASE CODE   ///////////////////////////////////////////////////////////////

var files = [];
var filesLength;

var storage;
var percentage
var finalPercentage =[]
var finalUrlAudio


/////sendFirebase script that will be fire when 'Download' is clicked.
if(isIOS == false){

document.getElementById("sendFirebase").onclick = function(e) {

  //checks if files are selected

    //Loops through all the selected files . To send also the geojson file to firebase, then activate this line !!!!!!!
    for (let i = 1; i < filesLength; i++) {  //there will be only 2 files
      //create a storage reference

      console.log(files[i])
      console.log(typeof files[i])
      storage = firebase.storage().ref(files[i].name);
      console.log(storage)


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
          console.log(percentage)
          finalPercentage[i] = percentage

          return finalPercentage
        },
      );
    }
  //finalPercentage = document.getElementById("progress").value
  console.log(finalPercentage)

  setTimeout(function(){
    //to send also the geojson file to firebase, then activate this line !!!!!!!!!!
    //firebase.storage().ref(files[0].name).getDownloadURL().then(function(url) { console.log(url); })

    if(recordedBlobs!=null){
    firebase.storage().ref(files[1].name).getDownloadURL().then(function(url) { finalUrlAudio = url;console.log(url); return finalUrlAudio })
    //urlAudio = firebase.storage().ref(files[1].name).getDownloadURL();
    }
  },1000);
};
}

///////////////////  end of  firebase code   ///////////////



////////function for pop ups//////////
function onEachFeature(feature, layer) {
//  setTimeout(function(){console.log(finalUrlAudio)},1600)
  //timeout is used to wait 1000ms until the download link is ready
  setTimeout(function(){
    var audioLinkText = '🔊 AUDIO'
    //conditions to avoid showing audio link if no audio has been recorded
    console.log(finalUrlAudio)
    if(isIOS == false && recordedBlobs != null){
      if(isOnline == true){  //condition to only hyperlink the audiolinktext if online
    clickableFinalUrlAudio = audioLinkText.link(finalUrlAudio)
    var popupContent = feature.properties.landUsesEmoji + '</br>'+ '</br>'+ '⏳...'+ clickableFinalUrlAudio ; //+ '    ' +dateTimeRandomID
      }else{
      var popupContent = feature.properties.landUsesEmoji + '</br>'+ '</br>'+ '⏳...'+ 'AUDIO' ;
      }
    }else{
    var popupContent = feature.properties.landUsesEmoji
    }

    if (feature.properties && feature.properties.popupContent) {
      popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent).addTo(map);
    layer.bindPopup(popupContent).openPopup();

  },1600)

}
var finished = false; // variable to openpopup only when file downloaded, not when loaded from local storage
function onEachFeatureAudioLocalStorage(feature, layer) { // function duplicated to avoid openpop() with local storage
//  setTimeout(function(){console.log(finalUrlAudio)},1600)
  //timeout is used to wait 1000ms until the download link is ready
  setTimeout(function(){
    console.log('isonline' + ' ' + isOnline)
    var audioLinkText = '🔊 AUDIO'
    var audioAvailable = feature.properties.audioAvailable;
    //conditions to avoid showing audio link if no audio has been recorded
    if(audioAvailable == true){
      var popupContent = feature.properties.landUsesEmoji + '</br>'+ '</br>'+ '🔊 AUDIO';
      }else{
    var popupContent = feature.properties.landUsesEmoji
    }

    if (feature.properties && feature.properties.popupContent) {
      popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent).addTo(map);

    if(finished == true){
    layer.bindPopup(popupContent).openPopup();
    }
  },1600)

}

// function onEachFeatureAudioLocalStorage(feature, layer) { // function duplicated to avoid openpop() with local storage
// //  setTimeout(function(){console.log(finalUrlAudio)},1600)
//   //timeout is used to wait 1000ms until the download link is ready
//   setTimeout(function(){
//     var audioLinkText = '🔊 AUDIO'
//
//     //conditions to avoid showing audio link if no audio has been recorded
//     if(recordedBlobs != null){
//       if(isOnline == true){ //condition to only hyperlink the audiolinktext if online
//   //  clickableFinalUrlAudio = audioLinkText.link(finalUrlAudio)
//    var audioURLGeoJSON = feature.properties.audioURL;
//    clickableFinalUrlAudio = audioLinkText.link(audioURLGeoJSON)
//     var popupContent = feature.properties.landUsesEmoji + '</br>'+ '</br>'+ '⏳...'+ clickableFinalUrlAudio ; //+ '    ' +dateTimeRandomID
//       }else{
//       var popupContent = feature.properties.landUsesEmoji + '</br>'+ '</br>'+ '⏳...'+ clickableFinalUrlAudio ;
//       }
//     }else{
//     var popupContent = feature.properties.landUsesEmoji
//     }
//
//     if (feature.properties && feature.properties.popupContent) {
//       popupContent += feature.properties.popupContent;
//     }
//
//     layer.bindPopup(popupContent).addTo(map);
//     // layer.bindPopup(popupContent).openPopup();
//
//   },1600)
//
// }

////////////////////////////////////////////      Download     /////////////////////////////////////////////////////////////////////////////////////////////
var convertedData;
var data;
var dataGeometry;
var dataGeometry;
var blob;
var dateTimeRandomID;
var timeFinish;
var diffTimes;
// var geometryCenter;
// var centerPointLat;
// var centerPointMarker;
// var centerPolylineMarker;
// var centerPolygonMarker;



  document.getElementById('share-download').onclick = function(e) {
                sameSession = true;
                alreadyMovedUp = false;
                audioRecorded = false;
                typeOfFeature = null;
                drawingPoint = false //to reset value for this session
                clearInterval(refreshPopup) //to stop searching for changes in the textbox
                var getUrl = window.location.href
                console.log(getUrl)
              //  oneMapCompleted = true //variable to know that in the second process (if any), there was a previous one so text box is emptied

                // Extract GeoJson from featureGroup
                // var data = drawnItems.toGeoJSON();
                //here we generate a random ID so when offline the downloaded file is not duplicated
                var randomNumber = Math.random();
                randomNumber = randomNumber*10000;
                var randomID = Math.round(randomNumber);
                //here the datetime
                var timeEnd = new Date();
                var date = timeEnd.getFullYear()+' '+(timeEnd.getMonth()+1)+' '+timeEnd.getDate();
                var time = timeEnd.getHours() + " " + timeEnd.getMinutes() + " " + timeEnd.getSeconds();
                var dateTime = date+' - '+time;


                 ////////////////////// get time spend on mapping (in seconds)///////////////////////////////////////
                 var res = Math.abs(timeStart - timeEnd) / 1000;

                 var minutes = Math.floor(res / 60) % 60;
                 var minutesToSeconds = minutes*60
                 var seconds = res % 60;
                // console.log('seconds'+seconds)

                 var totalTimeSpent = seconds + minutesToSeconds
                 console.log('secondsSpent'+totalTimeSpent)
                 /////////////////////////////////////////////////////////////////////////

                /////////////script to obfuscate user's currentLocation, in case user allow geolocation//////////////////

                if(currentLocation[0] != null){
                  var currentLocationString = currentLocation.toString();

                featureApproxLocation = map.getCenter() // instaead of recoding the coordinates of the feature, we simply record the center of the screen once drawn

                var latlngFrom = L.latLng(featureApproxLocation)
                var latlngTo = L.latLng(currentLocation)
                var distanceExact = latlngFrom.distanceTo(latlngTo) // distance calculated in meters
                var distanceObfuscated = (Math.random() * 100)*distanceExact
                var distanceObfTrunc = Math.trunc(distanceObfuscated)
                console.log(latlngFrom)
                console.log(latlngTo)
                console.log(distanceExact)
                console.log(distanceObfTrunc)

              }else{
                distanceObfTrunc = 'Location not recorded';
              }

                //here we combine datetime with randomID
                dateTimeRandomID ='Date&time: '+ dateTime+' RandomID:'+randomID;
                dateTimeRandomID.toString();
                //console.log(dateTimeRandomID);
              //  console.log(data)

                data = drawnItems.toGeoJSON();
                dataGeometry = data.features[0].geometry
                console.log(data)
                console.log(dataGeometry)
                //The coordinate reference system for all GeoJSON coordinates is a  geographic coordinate reference system, using the World Geodetic
                //System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units of decimal degrees.
                ////////////////////////////////    script to store the center of the feature  /////////////////
              //   if(featureType == 'point'){
              //     var boundsPoint = drawnItems.getBounds() //we convert point to have the same format as in lines and polygon's centers
              //     var centerPoint = boundsPoint.getCenter()
              //   //  console.log(centerPolyline)
              //     var centerPointLat = centerPoint.lat
              //     console.log(centerPointLat)
              //     var centerPointLng = centerPoint.lng
              //     centerPointMarker = L.marker([centerPointLat,centerPointLng])
              //     geometryCenter = centerPointMarker.toGeoJSON()
              //     console.log(geometryCenter )
              //   }
              //
              //   if(featureType == 'polyline'){
              //   //   var boundsPolyline = drawnItems.getBounds()
              //   //   geometryCenter = boundsPolyline.getCenter()
              //   // // geometryCenter == L.latLng(drawnItems);
              //   //   console.log(geometryCenter )
              //   var boundsPolyline = drawnItems.getBounds()
              //   var centerPolyline = boundsPolyline.getCenter()
              // //  console.log(centerPolyline)
              //   var centerPolylineLat = centerPolyline.lat
              // //  console.log(centerPolylineLat)
              //   var centerPolylineLng = centerPolyline.lng
              // //  console.log(centerPolylineLng)
              //   centerPolylineMarker = L.marker([centerPolylineLat,centerPolylineLng])
              // //  console.log(centerPolylineMarker)
              //   geometryCenter = centerPolylineMarker.toGeoJSON()
              //   console.log(geometryCenter )
              //
              //   }
              //   if(featureType == 'polygon'){
              //     var boundsPolygon = drawnItems.getBounds()
              //     var centerPolygon = boundsPolygon.getCenter()
              //   //  console.log(centerPolygon)
              //     var centerPolygonLat = centerPolygon.lat
              // //    console.log(centerPolygonLat)
              //     var centerPolygonLng = centerPolygon.lng
              // //    console.log(centerPolygonLng)
              //     centerPolygonMarker = L.marker([centerPolygonLat,centerPolygonLng])
              // //    console.log(centerPolygonMarker)
              //     geometryCenter = centerPolygonMarker.toGeoJSON()
              //     console.log(geometryCenter )
              //
              //   }
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////
                var allLandUses = [1]
                //land uses array filtered.
                var allLandUsesFiltered = allLandUses.filter(noNull => noNull != null);
                console.log(allLandUsesFiltered)
                var landUses = allLandUsesFiltered.toString();
                //to convert emojis from unicode to short name, before the data is transmitted

              //value of boxcontent is obtained again (was obtained in 'confirm'), in case user click on 'confirm' before filling in the box
              boxContent = document.getElementById('emojionearea').value;
                var boxContentToShortname = emojione.toShort(boxContent)
                console.log(boxContentToShortname)
                console.log(boxContent)

                var boxContentToString = boxContentToShortname.toString();
                //attributes added to Geojson file properties
                //var combinedAttributeData = landUses + dateTime + currentLocation;
                if(finalAreaHa2Decimals == null){
                  finalAreaHa2Decimals = 'null'
                }

                if(finalLength2Decimals == null){
                  finalLength2Decimals = 'null'
                }
                if(isIOS == false && recordedBlobs != null){
                  var audioAvailable = true
                }else{
                  audioAvailable = false
                }
                var propertiesGeoJSON = {
                  // 'geometryCenter':geometryCenter,
                  'landUses':boxContentToString,
                  'landUsesEmoji':boxContent,
                  'audioAvailable':audioAvailable,
                  'areaPolygon': finalAreaHa2Decimals,
                  'lengthLine':finalLength2Decimals,
                  'dateTime':dateTime,
                  'timeSpendSeconds':totalTimeSpent,
                  'dist_m_Participant_Feature':distanceObfTrunc,
                  'randomID':randomID
                };
              //  adding the properties to the geoJSON file:
              data.features[0].properties = propertiesGeoJSON;

                //data.innerHTML = JSON.stringify(prop_1);
                // Stringify the GeoJson
              convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
                //var convertedData = JSON.stringify(data);

                // var convertedText =   '' + encodeURIComponent(JSON.stringify(attributes))
                //                          + encodeURIComponent(JSON.stringify(currentLocation))
                //                          + encodeURIComponent(JSON.stringify(dateTime));

                // document.getElementById('Download').setAttribute('href', 'data:' + convertedData);
                // //document.getElementById('Download').setAttribute('href', 'data:' + convertedData + convertedText );
                // console.log(convertedData)
                //
                // document.getElementById('Download').setAttribute('download',dateTimeRandomID);
                ////////////////////////  TRANSMISSION ////////////////////////////////////////
              //  var convertedDataBlob = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(recordedBlobs));


          if(isIOS == false && recordedBlobs !=null){
           blob = new Blob(recordedBlobs, {type: 'audio/webm'});
           console.log(blob)
          }  ////////from plugin


              //  layer1=data;


                //defining the final screen
          //////      document.getElementById('Sent').play();
             setTimeout(function(){
               drawnItems.clearLayers();
               tempLayer.clearLayers()
                document.getElementById("map").style.height = "0px";
            //    document.getElementById("Confirm").style.display = "none";
                document.getElementById("Cancel").style.display = "none";
                document.getElementById("share-download").style.display = "none";
                document.getElementById('noAudioIOS').style.display = 'none';


                // document.getElementById("Download").style.display = "none";
                // document.getElementById("DownloadButton").style.display = "none";

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
                // document.getElementById('voice').style.visibility = 'hidden';

                document.getElementById('shareWorldButton').style.display = 'initial';
                document.getElementById('DownloadButton').style.display = 'initial';
                document.getElementById('Download').style.display = 'initial';


                document.body.style.backgroundColor = "black";

            },200)
              recordedVideo.pause();
              recordedVideo.currentTime = 0;
              created=false;

//adding layers to localstorage
              var dataStringified = JSON.stringify(data);

              var tempName = randomID // each polygon must have a different name!!!
              var layerToLocalStorage = localStorage.setItem(tempName, dataStringified);
              console.log(dataStringified);
              console.log(dataStringified.geometry)
              console.log(data.geometry)
              myLayerIsOn = true;
              myLayer_Button.button.style.backgroundColor = 'black';

            //   function updateEmoji(){
            //   $("#emoji").load(window.location.href + " #emoji" );
            // }
//////////////////// TRANSMISSION /////////////////////
              // var ourRequest = new XMLHttpRequest();
              // var theURL = 'http://178.62.113.144/';
              // ourRequest.open('POST',theURL);
              // ourRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              // ourRequest.send(JSON.stringify({ "email": "hello@user.com", "response": { "name": "Tester" } }));

            /////////////////////////firebase   ////////////////
            //rename files...
            var nameGeoJSON = 'geojson'+' '+dateTimeRandomID
            var nameAudio = 'audio'+' '+dateTimeRandomID

            var  audioBlob = blob; //to assign to a new variable the blob created in the audio.js
            console.log(audioBlob)
          //  var fileName = dateTimeRandomID

          //to convert the audio blob into a file (webm)
            function blobToFile(theBlob, fileName){
                //A Blob() is almost a File() - it's just missing the two properties below which we will add
                theBlob.lastModifiedDate = new Date();
                theBlob.name = fileName;
                return theBlob;
            }

            if(isIOS == false && recordedBlobs !=null){
            audioBlobFile = blobToFile(audioBlob, nameAudio);
            console.log(audioBlobFile)
            }
            //////////not working  ///////
            // audioBlobString = JSON.stringify(recordedBlobs)
            //
            // dataFile = new File([audioBlobString], "foo2.txt", {
            //     type: "text/plain",
            //     });
//////////////////////////////////
          //to close emoji menu in case user left it open
          // $("selector").emojioneArea({
          //   emojibtn_click: function (button, event) {
          //     console.log('event:emojibtn.click, emoji=');
          //   }
          //
          // });
        console.log(document.getElementsByClassName('emojibtn'))
        featureType = null; //to avoid error of length not recognised when on map click
          //to convert geojson into File format
            dataFile = new File([dataStringified], nameGeoJSON, {
                type: "application/json",
                });
                console.log(dataFile)
          //to store both audio and geojson into an array, and also get the length of the array and pass this value ot the firebase loop
              if(isIOS == false && recordedBlobs !=null){
                files = [dataFile,audioBlobFile]
                filesLength = 2

              }else{
                files = [dataFile]
                filesLength = 1
                }
//             //to simulate that the upload button is clicked.
//             document.getElementById("sendFirebase").click();
//             // document.getElementById('emojionearea1').value = '...'

      return data && myLayerIsOn && files && filesLength && convertedData && blob && sameSession && featureType //&& centerPointMarker && centerPolylineMarker && centerPolygonMarker// && oneMapCompleted //&& dateTimeRandomID && data
  }
console.log(finalLayer)


/////////////////////////////////////////  screenS SHARE-DOWNLOAD  /////////////////////////////////////
var timeOfVideo; //variable to define time of video based on OS. For some reason, is iOS takes longer to play
//var geojson = '{\"type\":\"Point\",\"coordinates\":[ 66,10 ]}'

if(isIOS == false){timeOfVideo = 2800}else{timeOfVideo = 3400}
  document.getElementById('shareWorldButton').onclick = function(e){

      setTimeout(function(){
         document.getElementById('shareWorldButton').style.display = 'none';
         document.getElementById('DownloadButton').style.display = 'none';
         document.getElementById('Sent').style.display = 'initial';
         document.getElementById('sentVideo').play();
         document.getElementById("sentVideo").controls = false;

         document.body.style.backgroundColor = "white";

       //to simulate that the upload button is clicked.
         document.getElementById("sendFirebase").click();


     },200)

           setTimeout(function(){

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
             document.getElementById("goBack1").style.display = "initial";
             document.getElementById("polygon").style.display = "initial";
             document.getElementById("polyline").style.display = "initial";
             document.getElementById("point").style.display = "initial";
             console.log(finalUrlAudio)
////////////////////////////       CARTO POST DATA      //////////////////////////////////////////
//first, we define the variables that store the attributes
            propertiesGeoJSON =  data.features[0].properties
              //to assign each attribute to a variable, which will be added as columns to the DB
              landUses = propertiesGeoJSON.landUses;
              console.log(landUses)
              landUsesEmoji = propertiesGeoJSON.landUsesEmoji;
              console.log(landUsesEmoji)
              audioAvailable = propertiesGeoJSON.audioAvailable;
              console.log(audioAvailable)
              areaPolygon = propertiesGeoJSON.areaPolygon;
              console.log(areaPolygon)
              lengthLine = propertiesGeoJSON.lengthLine;
              console.log(lengthLine)
              dateTime = propertiesGeoJSON.dateTime;
              console.log(dateTime)
              timeSpendSeconds = propertiesGeoJSON.timeSpendSeconds;
              console.log(timeSpendSeconds)
              dist_m_Participant_Feature = propertiesGeoJSON.dist_m_Participant_Feature;
              console.log(dist_m_Participant_Feature)
              randomID = propertiesGeoJSON.randomID;
              console.log(randomID)
//////////////
            // Submit data to the PHP using a jQuery Post method
            var submitToProxy = function(q){
              $.post("./callProxy.php", { // <--- Enter the path to your callProxy.php file here
                qurl:q,
                // geojson:data,
                cache: false,
                timeStamp: new Date().getTime()
              }, function(data) {
                console.log(data);
      //          refreshLayer();
              });
            };
            setData();

            function setData() {
              console.log(data)
              console.log("setdata function called");

                // var enteredDescription = 'descriptiontest';
                // var enteredUsername = 'usernametest';
                // var lat = '40'
                // var lng = '45';
                dataGeometry = data.features[0].geometry
                console.log(dataGeometry)
                var dataGeometryString = JSON.stringify(dataGeometry)
                console.log(dataGeometryString)

              //  var sql = "INSERT INTO lumblu (the_geom) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('"
                 var sql = "INSERT INTO lumblu (the_geom, datetime, randomid, landuses, landusesemoji, audioavailable, areapolygon, lengthline, timespent, distance) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('";
//  timespendseconds, dist_m_participant_feature
                var sql2 = dataGeometryString;
                //var sql3 = "'),4326),'" + dateTime + "','" + randomID + "','" + landUses + "','" + landUsesEmoji + "','" + audioAvailable + "','" + areaPolygon + "','" + lengthLine + "','" + timeSpendSeconds + "','" + dist_m_Participant_Feature + "')";
                var sql3 = "'),4326),'" + dateTime + "','" + randomID + "','" + landUses + "','" + landUsesEmoji + "','" + audioAvailable + "','" + areaPolygon + "','" + lengthLine + "','" + timeSpendSeconds + "','" + dist_m_Participant_Feature + "')";

            //    'Xdatetime','Xrandomid','Xlanduses','XlandusesEmoji','Xaudioavailable','XareaPolygon','Xlengthline','Xtimespe','Xdistance')";

                //,'" + dateTime + "','" + randomID + "','" + landUses + "','" + landUsesEmoji + "','" + audioAvailable + "','" + areaPolygon + "','" + lengthLine + "','" + timeSpendSeconds + "','" + dist_m_Participant_Feature + "')";

// var sql = "INSERT INTO lumblu (the_geom) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('"
// var sql2 = dataGeometryString;
// var sql3 = "'),4326))"

                    var pURL = sql+sql2+sql3;
                    console.log(pURL)
                    submitToProxy(pURL);
                    console.log("Feature has been submitted to the Proxy");
                // });
                // map.removeLayer(drawnItems);
                // drawnItems = new L.FeatureGroup();
                // console.log("drawnItems has been cleared");
                // dialog.dialog("close");
            };


            // refresh the layers to show the updated dataset
            // function refreshLayer() {
            //   if (map.hasLayer(cartoDBPoints)) {
            //     map.removeLayer(cartoDBPoints);
            //   };
            //   getGeoJSON();
            // };
            //console.log(geojson)
  //NOTE THAT  this doesn't work:         ##############################################################################
  // var sql = "INSERT INTO lumblu (the_geom) VALUES (ST_SetSRID(ST_GeomFromGeoJSON( '{"type":"Point","coordinates":[-0.090637,51.695544]}'),4326))"  , must be like that {\"type\":\"Point\",\"coordinates\":[ 45,11 ]}
  //var sql = "INSERT INTO lumblu (the_geom) VALUES (ST_SetSRID(ST_GeomFromGeoJSON(dataGeometryString),4326))"
  //var sql = "INSERT INTO lumblu (the_geom) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('dataGeometryString'),4326))"
  //var sql = "INSERT INTO lumblu (the_geom) VALUES (ST_SetSRIDST(ST_Point(-110, 43),4326))"
  //this works // var sql = "INSERT INTO data_collector (the_geom) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('";
  // var sql2 ='{"type":"Point","coordinates":[' + lng + "," + lat + "]}'),4326))";
  //var sql = "INSERT INTO lumblu (the_geom) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('"+'{"type":"Point","coordinates":[' + lng + "," + lat + "]}'),4326))"
  //var sql = "INSERT INTO lumblu (the_geom) VALUES (ST_SetSRID(ST_GeomFromGeoJSON('{\"type\":\"Point\",\"coordinates\":[ 45,40 ]}'),4326))"

  //#####################################################################################################################

//////////////////////////////////////////////////////////////////////////////////////////

             //finalLayer is added at the end as the properties are different depending on if share or download
             finalLayer = L.geoJSON(data,{
               style: function (feature) {
                 return feature.properties && feature.properties.style;
               },
               color:'blue',
               onEachFeature: onEachFeature,
             }).addTo(map);

           }, timeOfVideo);
           myLayer_Button.addTo(map)

///////////////////////////   send to DataBase in Digital Ocean server      /////////////////////////


  }

  document.getElementById('DownloadButton').onclick = function(e){
        document.getElementById('downloadedVideo').play();
        document.getElementById("downloadedVideo").controls = false;



        document.getElementById('shareWorldButton').style.display = 'none';
        document.getElementById('DownloadButton').style.display = 'none';

        document.getElementById('Downloaded').style.display = 'initial';
        document.getElementById('Download').setAttribute('href', 'data:' + convertedData);
        //document.getElementById('Download').setAttribute('href', 'data:' + convertedData + convertedText );
        console.log(convertedData)

        document.getElementById('Download').setAttribute('download',dateTimeRandomID);


        document.body.style.backgroundColor = "white";

      ////////////////////////  TRANSMISSION ////////////////////////////////////////
      //  var convertedDataBlob = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(recordedBlobs));
       finished = true;

               setTimeout(function(){

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
                 document.getElementById("goBack1").style.display = "initial";
                 document.getElementById("polygon").style.display = "initial";
                 document.getElementById("polyline").style.display = "initial";
                 document.getElementById("point").style.display = "initial";

                 console.log(data);
                //document.getElementById('emoji').load(window.location.href + 'emoji');
                // document.getElementById("emojionearea-editor").innerHTML.reload
                  // $('classification').load(window.location.href + 'classification');
                //window.location.load()


                 //window.location.reload();
                 //finalLayer is added at the end as the properties are different depending on if share or download

                 finalLayer = L.geoJSON(data,{
                   style: function (feature) {
                     return feature.properties && feature.properties.style;
                   },
                   color:'#0CACDF',
                   onEachFeature: onEachFeatureAudioLocalStorage,
                 }).addTo(map);
              //  finalLayer.bindPopup().openPopup()

               }, timeOfVideo - 300);
               myLayer_Button.addTo(map)
               //recordedBlobs = null


        return finished
  }
