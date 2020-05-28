// import {version} from '/sw.js'


  // Firebase configuration
  var firebaseConfig = {
      apiKey: "AIzaSyDt3_yMQ5Zu_MhqlRzssZ_931YEBzMsIMk",
      authDomain: "prototype4-dc434.firebaseapp.com",
      databaseURL: "https://prototype4-dc434.firebaseio.com",
      projectId: "prototype4-dc434",
      storageBucket: "prototype4-dc434.appspot.com",
      messagingSenderId: "995673679156",
      appId: "1:995673679156:web:cff466b0d7489a868bb161"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
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
      console.log('sw has been updated')
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
// var map;
// var tutorialViewed = false;
// if(tutorialViewed ==true){
//   map = L.map('map',{
//           editable:true,
//           center: mapCurrentCenter,
//           zoom: mapCurrentZoom,
//           minZoom:3,
//           maxZoom:21,
//           zoomControl:false,
//          attributionControl:false
//         });
// }else{

  var map = L.map('map',{
        editable:true,
        center: [18, 20],
        zoom: 3,
        minZoom:3,
        maxZoom:21,
        zoomControl:false,
       attributionControl:false
      });


function addPreviousPolygons(){
  if(!data.length==0){
  //  data.addTo(map); //////////////////////////////////////////////
    //console.log(data);
  }
}
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


//var groupLayer = new L.FeatureGroup().addTo(map);
var finalLayer;
var groupGeoJSON =[]
  if(isFirstTime == false & localStorage.key(0)!=null){

//  loop for going through all geoJSON stored in the localStorage
    for(var i=0, len=localStorage.length; i<len; i++) {   //len-1 to avoid a error of geojson object not recognised
      var key = localStorage.key(i);
      var value = localStorage[key];
      var itemFetched = localStorage.getItem(key);
  //    console.log(i+ '____' + key + " => " + value +'__'+ '__ccc__'+itemFetched);//////////////////////////////////////////
//catch error in case no json
      function isJson(str) {
       try {
         JSON.parse(str);
       } catch (e) {
       return false;
     }
     return true;
     }
//call catch function
    isJson(itemFetched);
     // console.log(isJson(itemFetched))
    if (isJson(itemFetched) == true){

     var getItemToJSON = JSON.parse(itemFetched);
     //add each json to an array-------------------------
      groupGeoJSON[i]=getItemToJSON
  //    console.log(groupGeoJSON)///////////////////////////////////////////////////////////////////////////////////

    }

  }
}
//console.log(groupLayer)
console.log('local storage accessed!!!!')


function isJson(str) {
 try {
   JSON.parse(str);
 } catch (e) {
 return false;
}
return true;
}

isJson(groupGeoJSON)
//conditions to catch error in case no geojson and also to avoid error when adding to map an empty layer if is first time
var myLayerIsOk = false;
if(isJson(groupGeoJSON)==true && isFirstTime==false ){
var myLayer = L.geoJSON(groupGeoJSON,{
  style: function (feature) {
    myLayerIsOk = true;
    console.log(myLayerIsOk)
    return feature.properties && feature.properties.style && myLayerIsOk;
  },
  color:'blue',
  onEachFeature: onEachFeature,

}).addTo(map)
}

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


var pointsSap = L.geoJson(pointsSapelli,{
  iconUrl: 'images/whiteDot.png',
  color:'#03FAFC',
  opacity: 5,
  fillOpacity: 0.2,
  weight:2
})//.addTo(map);

var markers = L.markerClusterGroup({
  spiderfyOnMaxZoom: true,
showCoverageOnHover: true,
zoomToBoundsOnClick: true
});
markers.addLayer(pointsSap);
map.addLayer(markers);

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
        maxZoom: 18,
        maxNativeZoom: 20,
        // subdomains:['mt0','mt1','mt2','mt3'],
        attribution: 'OpenStreetMap Contributors'

        });

{
        // var planetS1 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20190803_083048_1027/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
        //         maxZoom: 18,
        //         maxNativeZoom: 20,
        //         subdomains:['tiles0','tiles1','tiles2','tiles3'],
        //         attribution: 'Planet Imagery AUGUST 2019'
        //     });
        //  var planetS2 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20190803_083047_1027/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
        //         maxZoom: 18,
        //         maxNativeZoom: 20,
        //         subdomains:['tiles0','tiles1','tiles2','tiles3'],
        //     });
        //  var planetS3 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20190803_083046_1027/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
        //         maxZoom: 18,
        //         maxNativeZoom: 20,
        //         subdomains:['tiles0','tiles1','tiles2','tiles3'],
        //     });
        //  var planetS4 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20190803_083045_1027/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
        //         maxZoom: 18,
        //         maxNativeZoom: 20,
        //         subdomains:['tiles0','tiles1','tiles2','tiles3'],
        //     });
        //  var planetS5 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20190803_083044_1027/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
        //         maxZoom: 18,
        //         maxNativeZoom: 20,
        //         subdomains:['tiles0','tiles1','tiles2','tiles3'],
        //     });
        ////////////////////ENSCHEDE/////////////////////
         var planetS6 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20200411_104056_53_105e/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
                maxZoom: 18,
                maxNativeZoom: 20,
                subdomains:['tiles0','tiles1','tiles2','tiles3'],

            });
         var planetS7 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20200411_104054_50_105e/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
                maxZoom: 18,
                maxNativeZoom: 20,
                subdomains:['tiles0','tiles1','tiles2','tiles3'],
            });
        ////////////CAMEROON//////////////////////
         var planetS8 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20200402_080331_1043/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
                maxZoom: 18,
                maxNativeZoom: 20,
                subdomains:['tiles0','tiles1','tiles2','tiles3'],
            });
         var planetS9 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20200402_080330_1043/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
                maxZoom: 18,
                maxNativeZoom: 20,
                subdomains:['tiles0','tiles1','tiles2','tiles3'],
            });
         var planetS10 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20200402_080329_1043/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
                maxZoom: 18,
                maxNativeZoom: 20,
                subdomains:['tiles0','tiles1','tiles2','tiles3'],
            });
        /////NAIROBI/////////////////////////////
         var planetS11 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20200306_073616_1011/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
                maxZoom: 18,
                maxNativeZoom: 20,
                subdomains:['tiles0','tiles1','tiles2','tiles3'],
                  });
         var planetS12 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20200306_073615_1011/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
                maxZoom: 18,
                maxNativeZoom: 20,
                subdomains:['tiles0','tiles1','tiles2','tiles3'],
            });
        ///////TSUMKWE
         var planetS13 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20200416_083425_1018/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
                maxZoom: 18,
                maxNativeZoom: 20,
                subdomains:['tiles0','tiles1','tiles2','tiles3'],
            });

        ///////FRAGA////////////////////////
         var planetS14 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20200403_105241_78_1064/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
                maxZoom: 18,
                maxNativeZoom: 20,
                subdomains:['tiles0','tiles1','tiles2','tiles3'],
            });
         var planetS15 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20200403_105239_76_1064/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
                maxZoom: 18,
                maxNativeZoom: 20,
                subdomains:['tiles0','tiles1','tiles2','tiles3'],
            });
        ///ITEN///////////////
         var planetS16 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20200410_083657_42_1065/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
                maxZoom: 18,
                maxNativeZoom: 20,
                subdomains:['tiles0','tiles1','tiles2','tiles3'],
                 attribution: 'Planet Imagery APRIL 2020'
            });
         var planetS17 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20200410_074244_1018/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
                maxZoom: 18,
                maxNativeZoom: 20,
                subdomains:['tiles0','tiles1','tiles2','tiles3'],
            });
         var planetS18 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20200410_074243_1018/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
                maxZoom: 18,
                maxNativeZoom: 20,
                subdomains:['tiles0','tiles1','tiles2','tiles3'],
            });
            ///LONDON/////////////////
            var planetS19 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20200411_104513_103d/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
                   maxZoom: 18,
                   maxNativeZoom: 20,
                   subdomains:['tiles0','tiles1','tiles2','tiles3'],

               });
            var planetS20 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20200411_104512_103d/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
                   maxZoom: 18,
                   maxNativeZoom: 20,
                   subdomains:['tiles0','tiles1','tiles2','tiles3'],

               });
            var planetS21 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20200411_104511_103d/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
                   maxZoom: 18,
                   maxNativeZoom: 20,
                   subdomains:['tiles0','tiles1','tiles2','tiles3'],
               });



        // var planet = L.layerGroup([planetS1,planetS2,planetS3,planetS4,planetS5,planetS6,planetS7,planetS8,planetS9,planetS10,
        //                           planetS11,planetS12,planetS13,planetS14,planetS15,planetS16,planetS17,planetS18]);
        var planet = L.layerGroup([planetS6,planetS7,planetS8,planetS9,planetS10,planetS11,planetS12,planetS13,planetS14,planetS15,planetS16,planetS17,planetS18,planetS19,planetS20,planetS21]);
}
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
var osm_Button = L.easyButton({
    id: 'osm',
    class:'easyButton',
    position: 'topright',
    //background:'images/forest.png',
    states: [{
      icon: '<img src="images/osm.png" width=40px ; height=40px> ',
      //  background:"images/forest.png",
        stateName: 'check-mark',
        onClick: function(btn,map) {
          clickButtonCount +=1;
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
          planet.removeFrom(map);
          // btn.button.style.backgroundColor = 'yellow';
          // googleSat_Button.button.style.backgroundColor = 'black';
          // planet_Button.button.style.backgroundColor = 'black'
          }
          return clickButtonCount;
        }

    }]
});
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
        icon: '<img src="images/google.png" width=40px ; height=40px>',
              //stateName: 'check-mark',
        onClick: function(btn,map) {
          clickButtonCount +=1;
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
        icon: '<img src="images/planet.png" width=40px ; height=40px>',
        stateName: 'check-mark',
        onClick: function(btn,map) {
            clickButtonCount=0;
            planet_Button.removeFrom(map);
            googleSat_Button.addTo(map);
            planet.addTo(map);
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


var myLayerIsOn = false;
var myLayer_Button = L.easyButton({
    id: 'myLayer',
    class:'easyButton',
    position: 'topright',
    //background:'images/forest.png',
    states: [{
      icon: '<img src="images/myLayer.png" width=37.5px ; height=37.5px> ',
      //  background:"images/forest.png",
        stateName: 'check-mark',
        onClick: function(btn,map) {

///////////////////////////////////////////////////////////////////////////
console.log(myLayerIsOn)
console.log(isFirstTime)
console.log(finalLayer)
console.log(myLayerIsOk)
        if(myLayerIsOn == true && isFirstTime==false && finalLayer !=null){

          console.log('if1')
          myLayerIsOn = false;
          myLayer_Button.button.style.backgroundColor = 'grey';
          finalLayer.removeFrom(map)

         if(myLayerIsOk == true){
           console.log('if2')

           myLayer.removeFrom(map);
           myLayer_Button.button.style.backgroundColor = 'grey';

          }
        }
        else if(myLayerIsOn == false && isFirstTime==false &&  finalLayer !=null){
          console.log('if3')

          myLayerIsOn = true;
          myLayer_Button.button.style.backgroundColor = 'black';
         finalLayer.addTo(map)

          if(myLayerIsOk == true){
            console.log('if4')

         myLayer.addTo(map)          //  layer1.addTo(map);
         myLayer_Button.button.style.backgroundColor = 'black';


         }
       }else{
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
myLayer_Button.addTo(map)

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
        icon: '<img src="images/gps.png" width=35px ; height=35px>',
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

//document.getElementById('activatePlay').style.display = 'initial';

          // document.getElementById("videoTutorial").style.display = "initial";

          // document.getElementById("unmute").style.display = "initial";


           // window.onload = function (){
           //   document.getElementById("mappingInstructions").play();
           // };
          //document.getElementById("startMapping").style.display = "none";
          // document.getElementById("goBack1").style.display = "none";

          document.getElementById("goBack2").style.display = "none";
          document.getElementById("deleteLastVertex").style.display = "none";
          document.getElementById("deleteAllVertexs").style.display = "none";

          document.getElementById("deleteLastVertexLine").style.display = "none";
          document.getElementById("deleteAllVertexsLine").style.display = "none";
        //  document.getElementById("deletePolygon").style.display = " none";
          //document.getElementById("changeMapSize").style.display = "none";

           document.getElementById("map").style.display = "initial";
           document.getElementById("polygon").style.display = "initial";
           document.getElementById("polyline").style.display = "initial";
           document.getElementById("point").style.display = "initial";
           // document.getElementById("polyline").style.opacity = "0.35";
           // document.getElementById("point").style.opacity = "0.35";

           // document.getElementById('googleSat').style.visibility='hidden';
           // document.getElementById('planet').style.visibility='hidden';




        //   document.getElementById('goToIdentification').style.display = 'none';
           document.getElementById("export").style.display = "none";
           document.getElementById("Cancel").style.display = "none";
           document.getElementById("exportButton").style.display = "none";
           document.getElementById("Confirm").style.display = "none";


        //   document.getElementById('goToIdentification').style.display = 'none';
      //     document.getElementById('goBackToLandUse').style.display = 'none';


        //   document.getElementById('start').style.display = 'none';
           document.getElementById('record').style.display = 'none';
           document.getElementById('enableRecording').style.display = 'none';

    //      document.getElementById('play').style.display = 'none';
      //    document.getElementById('activatePlay').style.display = 'none';
      document.getElementById('activatePlay').style.opacity = '0';


           document.getElementById('download').style.display = 'none';
           document.getElementById('gum').style.display = 'none';
           document.getElementById('recorded').style.display = 'none';
           document.getElementById('echoCancellation').style.display = 'none';
      //     document.getElementById('goBackToLandUse').style.display = 'none';

           document.getElementById('voice').style.display = 'none';

           document.getElementById('Sent').style.display = 'none';
           // document.getElementById("Exit").style.display = "none";
           // document.getElementById("Return").style.display = "none";
           // document.getElementById("Exit").style.display = "none";
           // document.getElementById("Return").style.display = "none";
           document.getElementById('emoji').style.display = 'none';


////////////////////////////////////////////TUTORIAL//////////////////////////////////////////////////////////////

////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// script to add drawn layers to local storage
            // var layerFromLocalStorage = localStorage.getItem('storedLayer');
            // console.log(layerFromLocalStorage)
          //  var layerFromLocalStorageToGeoJson = JSON.parse(layerFromLocalStorage);
          //  console.log(layerFromLocalStorageToGeoJson)
          // L.geoJSON(layerFromLocalStorageToGeoJson).addTo(map);
          //   //console.log(layerLocalStorageGeoJson)

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!

              // console.log('location'+ currentLocation)
              //   if(currentLocation[0]==null){
              //   //  home_Button.addTo(map);
              //   //  L.marker([0.670322, 35.507470], {icon:communityIcon}).addTo(map);
              //   }else{
              //     gps_Button.addTo(map);
              //   }

              document.body.style.backgroundColor = "white";
              // document.getElementById("audioTutorial").pause();
              // document.getElementById("audioTutorial").currentTime = 0;


        //////      document.getElementById("mappingInstructions").play();

          //    document.getElementById("videoTutorial").style.display = "none";
              //document.getElementById("startMapping").style.display = "none";

              document.getElementById("map").style.display = "block";
              //document.getElementById("map").style.height = "90%";
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


          var mapCurrentBounds;
          var mapCurrentZoom;
          var mapCurrentCenter;
          document.getElementById("goBack1").onclick = function(e){

            // document.getElementById("mappingInstructions").pause();
            // document.getElementById("mappingInstructions").currentTime = 0;
             window.location.href ='pages/tutorial.html';
             document.body.style.backgroundColor = "black";
             document.getElementById("map").style.display = "none";

             document.getElementById("goBack1").style.display = "none";
             document.getElementById("polygon").style.display = "none";
             document.getElementById("polyline").style.display = "none";
             document.getElementById("point").style.display = "none";

             mapCurrentBounds =  map.getBounds();
             mapCurrentZoom = map.getZoom();
             mapCurrentCenter = map.getCenter();
             tutorialViewed = true



             // document.getElementById("videoTutorial").style.display = "initial";
            // document.getElementById("startMapping").style.display = "initial";
            // document.getElementById("youtube").style.display = "initial";
             // document.getElementById("audioTutorial").play();
             return mapCurrentBounds & mapCurrentZoom
           }
///////////////////////////////////////////draw screen////////////////////////////////////////////////

var created = false; //variable to determine whether a polygon has been completed.
var clickMapCount = 0;
var clickDelVertCount = 0;
document.getElementById("goBack2").onclick = function(e){
      clickMapCount = 0;
       map.zoomOut(1); //decreases the zoom level when click
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

       drawPolygon.disable();
       drawPolyline.disable();
       drawMarker.disable();
       drawnItems.remove();
       drawnItems.clearLayers();

     }

var boxContent;

var drawingPoint = false
  document.getElementById('point').onclick = function(e){
            currentZoom = map.getZoom();
          //  map.zoomIn(1); //increases the zoom level when click on polygon

          //  clickMapCount = 0;
            drawMarker.enable();
          //    document.getElementById("handDraw").style.display = "initial";
            document.getElementById("goBack1").style.display = "none";
            document.getElementById("polygon").style.display = "none";
            document.getElementById("polyline").style.display = "none";
            document.getElementById("point").style.display = "none";

            document.getElementById("goBack2").style.display = "initial";
          //  document.getElementById("deletePoint").style.display = "initial";
          //  document.getElementById("deleteAllVertexs").style.display = "initial";
          drawingPoint = true;
          return drawingPoint
  };

  document.getElementById('polyline').onclick = function(e){

    map.on('draw:drawvertex',
      function (e) {
          $(".leaflet-div-icon")
         // $(".leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-touch-icon.leaflet-zoom-animated.leaflet-interactive:first")

          .css({ 'background-color': '#b3b1b1','border-radius': '10px', 'height':'10px', 'width':'10px'});
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
            document.getElementById("goBack1").style.display = "none";
            document.getElementById("polygon").style.display = "none";
            document.getElementById("polyline").style.display = "none";
            document.getElementById("point").style.display = "none";

            document.getElementById("goBack2").style.display = "initial";
            document.getElementById("deleteLastVertexLine").style.display = "initial";
            document.getElementById("deleteAllVertexsLine").style.display = "initial";

  };

  document.getElementById('polygon').onclick = function(e){

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
            document.getElementById("goBack1").style.display = "none";
            document.getElementById("polygon").style.display = "none";
            document.getElementById("polyline").style.display = "none";
            document.getElementById("point").style.display = "none";

            document.getElementById("goBack2").style.display = "initial";
            document.getElementById("deleteLastVertex").style.display = "initial";
            document.getElementById("deleteAllVertexs").style.display = "initial";

  };
  document.getElementById('map').onclick = function(e){
      // if(clickMapCount==0){
      //   document.getElementById("deleteAllVertexs").style.opacity = "0.35";
      //   document.getElementById("deleteAllVertexs").disabled = true;
      // }

    clickMapCount += 1;
    clickButtonCount=0;
  //  console.log('click map count ', clickMapCount);
  ////good !!!!

      if(created==false && clickMapCount!=1 ){
         document.getElementById("deleteLastVertex").style.opacity = "1";
         document.getElementById("deleteLastVertex").disabled = false;
         document.getElementById("deleteAllVertexs").style.opacity = "1";
         document.getElementById("deleteAllVertexs").disabled = false;

         document.getElementById("deleteLastVertexLine").style.opacity = "1";
         document.getElementById("deleteLastVertexLine").disabled = false;
         document.getElementById("deleteAllVertexsLine").style.opacity = "1";
         document.getElementById("deleteAllVertexsLine").disabled = false;
       }
       // }else if(clickMapCount==1){
       //   document.getElementById("deleteAllVertexs").style.opacity = "0.35";
       //   document.getElementById("deleteAllVertexs").disabled = true;
       // }
       else if(created==true){
         document.getElementById("deleteLastVertex").style.opacity = "0.35";
         document.getElementById("deleteLastVertex").disabled = true;

         document.getElementById("deleteLastVertexLine").style.opacity = "0.35";
         document.getElementById("deleteLastVertexLine").disabled = true;
       }
       else{
         document.getElementById("deleteLastVertex").style.opacity = "1";
         document.getElementById("deleteLastVertex").disabled = false;

         document.getElementById("deleteLastVertexLine").style.opacity = "1";
         document.getElementById("deleteLastVertexLine").disabled = false;
       }
  ////////

     return clickMapCount;
  }

///////////////////////////       delete vertexs      //////////////////////////////////


    document.getElementById('deleteLastVertex').onclick = function(e){
         clickDelVertCount += 1;
      //console.log(clickCount);

        if(clickMapCount==1){
          drawPolygon.disable();
          drawPolygon.enable();
          clickMapCount = 1;
          document.getElementById("deleteLastVertex").style.opacity = "0.35";
          document.getElementById("deleteLastVertex").disabled = true;
          document.getElementById("deleteAllVertexs").style.opacity = "0.35";
          document.getElementById("deleteAllVertexs").disabled = true;
        }else if(clickMapCount==clickDelVertCount){

          drawPolygon.disable();
          drawPolygon.enable();
          document.getElementById("deleteLastVertex").style.opacity = "0.35";
          document.getElementById("deleteLastVertex").disabled = true;
          document.getElementById("deleteAllVertexs").style.opacity = "0.35";
          document.getElementById("deleteAllVertexs").disabled = true;
        }

        else{
          drawPolygon.deleteLastVertex();
          //clickCount-=1;
        }
      // console.log('click delete vertex count ', clickDelVertCount);
      // console.log('click map count ', clickMapCount);

      return clickMapCount;
    }

    document.getElementById('deleteAllVertexs').onclick = function(e){
            clickMapCount = 0;
            clickDelVertCount = 0;
            drawPolygon.disable();
            drawPolygon.enable();
            document.getElementById("deleteLastVertex").style.opacity = "0.35";
            document.getElementById("deleteLastVertex").disabled = true;
            document.getElementById("deleteAllVertexs").style.opacity = "0.35";
            document.getElementById("deleteAllVertexs").disabled = true;
        return clickMapCount;
        }


/////////////line////////////////////////
        document.getElementById('deleteLastVertexLine').onclick = function(e){
             clickDelVertCount += 1;
          //console.log(clickCount);

            if(clickMapCount==1){
              drawPolyline.disable();
              drawPolyline.enable();
              clickMapCount = 1;
              document.getElementById("deleteLastVertexLine").style.opacity = "0.35";
              document.getElementById("deleteLastVertexLine").disabled = true;
              document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
              document.getElementById("deleteAllVertexsLine").disabled = true;
            }else if(clickMapCount==clickDelVertCount){

              drawPolyline.disable();
              drawPolyline.enable();
              document.getElementById("deleteLastVertexLine").style.opacity = "0.35";
              document.getElementById("deleteLastVertexLine").disabled = true;
              document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
              document.getElementById("deleteAllVertexsLine").disabled = true;
            }

            else{
              drawPolyline.deleteLastVertex();
              //clickCount-=1;
            }
          // console.log('click delete vertex count ', clickDelVertCount);
          // console.log('click map count ', clickMapCount);

          return clickMapCount;
        }

        document.getElementById('deleteAllVertexsLine').onclick = function(e){
                clickMapCount = 0;
                clickDelVertCount = 0;
                drawPolyline.disable();
                drawPolyline.enable();
                document.getElementById("deleteLastVertexLine").style.opacity = "0.35";
                document.getElementById("deleteLastVertexLine").disabled = true;
                document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
                document.getElementById("deleteAllVertexsLine").disabled = true;
            return clickMapCount;
            }



  // map.on('draw:drawvertex',
  //   function (e) {
  //       $(".leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-touch-icon.leaflet-zoom-animated.leaflet-interactive:first")
  //       .css({ 'background-color': '#F905EA' });
  //   });

    // map.on('draw:drawvertex',
    //   function (e) {
    //       $(".leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-touch-icon.leaflet-zoom-animated.leaflet-interactive:first")
    //       .css({ 'background-color': '#F905EA' });
    //   });

      //this function must be inside the polygon onclick function

  var tempLayer;
  var data;
  var  finalAreaHa2Decimals
  var  finalAreaAcres2Decimals
  var  finalLength2Decimals
  map.on('draw:created', function (e) {
       //drawnItems.completeShape();
       created = true;


       drawPolygon.disable();
    //   drawPolygon.enable();
       drawnItems.removeFrom(map); //remove the drawn item as yellow polygon appears
      document.getElementById("deleteAllVertexs").style.display = "none";
      document.getElementById("deleteLastVertex").style.display = "none";
        document.getElementById("goBack2").style.display = "none";

        document.getElementById("deleteLastVertexLine").style.display = "none";
        document.getElementById("deleteAllVertexsLine").style.display = "none";

        document.getElementById("Confirm").style.display = "initial";
        document.getElementById("Cancel").style.display = "initial";

        document.getElementById("classification").style.display = "initial";

        document.getElementById("emoji").style.display = "initial";

        document.getElementById('Sent').currentTime = 0;

        document.getElementById('voice').style.display = 'none';
        document.getElementById('voice').style.opacity = '0';

        document.getElementById('enableRecording').style.display = 'initial';

        document.getElementById('emoji').style.display = 'initial';

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
        //to remove decimals ....
        finalLength2Decimals = finalLength.toFixed(2) + ' ' +'meters'
      //  console.log(finalArea2Decimals)
      //to show the final length on the top

        document.getElementById('showLength').style.display = 'initial';
        document.getElementById("showLength").innerHTML = finalLength2Decimals;

      }
        //////////////////////////////////////////
        var boundsPolygon = drawnItems.getBounds()
        var centerBoundsPolygon = boundsPolygon.getCenter()
        ///////////////
        console.log(centerBoundsPolygon)


          var mapNewBounds =  map.getBounds();

          map.fitBounds(drawnItems.getBounds(),{
                     //  maxZoom:30,
                       paddingBottomRight: [0, 0]
                     })
          //script to avoid zoom to unavailable tile
          if (drawingPoint ==true){
            map.zoomOut(6)

          }
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

        function onEachFeature(feature, layer) {
          var popupContent = '...'  ; //+ '    ' +dateTimeRandomID

          if (feature.properties && feature.properties.popupContent) {
            popupContent += feature.properties.popupContent;
          }

          layer.bindPopup(popupContent).addTo(map);
              layer.bindPopup(popupContent).openPopup(); ///automatically shows the pop up!
            //  layer.updatePopup(popupContent)
        }

        tempLayer = L.geoJSON(data,{
          style: function (feature) {
            return feature.properties && feature.properties.style;
          },
          color:'#ffff00',
          onEachFeature: onEachFeature,

        }).addTo(map);

       return created & data;

   });

      document.getElementById('enableRecording').onclick = function(e){
        document.getElementById('record').style.display = 'initial';
        document.getElementById('record').style.opacity = '1';
        document.getElementById('enableRecording').style.display = 'none';

        //setTimeout(function(){ document.getElementById("record").click();}, 500);
        //document.getElementById("record").click();
      }

	$("#emojionearea1").emojioneArea({
  	pickerPosition: "top",
  	filtersPosition: "bottom",
    tones: false,
    autocomplete: false,
    inline: false,  //text box resizes with text input
    hidePickerOnBlur: false,
    search: false,
    placeholder: "..."
  });

  // var el = $("selector").emojioneArea();
  // el[0].emojionearea1.on("emojibtn.click", function(btn, event) {
  //   console.log(btn.html());
  // });



	// document.getElementById("#emojionearea1").emojioneArea({
  // 	pickerPosition: "top",
  // 	filtersPosition: "bottom",
  //   tones: false,
  //   autocomplete: false,
  //   inline: true,
  //   hidePickerOnBlur: false
  // });

////////////////////////////////////////////////////////classify screen//////////////////////////////////////////////////////////////


var recording=true;
        document.getElementById('record').onclick = function(e){
          // var boxContent = document.getElementById('emojionearea1').value;
          // console.log(boxContent);

            if(recording==true){  //recording true/false inverse.
              this.style.backgroundColor = 'white';
              //this.style.borderWidth = '2px';
              //this.style.borderColor = 'transparent';
              // document.getElementById('play').style.display = 'initial';
              // document.getElementById('play').style.opacity = '1';
              document.getElementById('activatePlay').style.display = 'initial';
              document.getElementById('activatePlay').style.opacity = '1';

              document.getElementById('download').style.opacity = '1';
              document.getElementById('emoji').style.display = 'initial';
              document.getElementById('voice').style.display = 'none';
              document.getElementById('voice').style.opacity = '0';
              // document.getElementById('voice').style.width = '45%';
              // document.getElementById('voice').style.height = '7%';

              document.getElementById('Confirm').disabled = false;
              document.getElementById('Confirm').style.opacity = '1';
            }
            if(recording==false){
              this.style.backgroundColor = 'yellow';
              //this.style.borderWidth = '8px';
              this.style.borderColor = 'yellow';
              document.getElementById('activatePlay').style.display = 'none';
              document.getElementById('download').style.opacity = '0.1';
              document.getElementById('emoji').style.display = 'none';

              document.getElementById('voice').style.display = 'initial';
              document.getElementById('voice').style.opacity = '1';
              document.getElementById('voiceGif').style.width = '40%';
              document.getElementById('voiceGif').style.height = '40px';




      //        document.getElementById('goBackToLandUse').style.display = 'none';

            }
            // document.getElementById('Identification').pause();
            // document.getElementById('Identification').currentTime = 0;

           document.getElementById('gum').style.display = 'none';
           document.getElementById('recorded').style.display = 'none';
           document.getElementById('echoCancellation').style.display = 'none';

      }
        document.getElementById('activatePlay').onclick = function(e){
          document.getElementById("play").click(); //added so no need to click button twice
          document.getElementById('activatePlay').style.background = 'grey'
         setTimeout(function(){document.getElementById('activatePlay').style.background = 'white'},500)

        }
var boxContent;

      document.getElementById('Confirm').onclick = function(e) {
            goToDS = 1;
            // document.getElementById("Identification").pause();
            // document.getElementById("Identification").currentTime = 0;

             document.getElementById("Confirm").style.display = "none";
            // document.getElementById("Cancel").style.display = "none";

             document.getElementById("export").style.display = "initial";
             document.getElementById("exportButton").style.display = "initial";
             document.getElementById("export").disabled = false;
             document.getElementById("exportButton").disabled = false;
             document.getElementById("export").style.opacity = "1";
             document.getElementById("exportButton").style.display = "1";



             boxContent = document.getElementById('emojionearea1').value;
             console.log(boxContent);

             tempLayer.removeFrom(map);
         function onEachFeature(feature, layer) {
           var popupContent = boxContent  ; //+ '    ' +dateTimeRandomID

           if (feature.properties && feature.properties.popupContent) {
             popupContent += feature.properties.popupContent;
           }

           layer.bindPopup(popupContent).addTo(map);
               layer.bindPopup(popupContent).openPopup(); ///automatically shows the pop up!
             //  layer.updatePopup(popupContent)
         }

             tempLayer = L.geoJSON(data,{
               style: function (feature) {
                 return feature.properties && feature.properties.style;
               },
               color:'#ffff00',
               onEachFeature: onEachFeature,

             }).addTo(map);

          return boxContent;
        }

      document.getElementById('Cancel').onclick = function(e){
             created = false;
             drawnItems.remove();
             drawnItems.clearLayers();
            recordedVideo.pause();
            map.zoomOut(1);
            drawingPoint =false


             document.getElementById("map").style.display = "block";
             //document.getElementById("map").style.height = "88%";

            document.getElementById("goBack1").style.display = "initial";
             document.getElementById("polygon").style.display = "initial";
             document.getElementById("polyline").style.display = "initial";
             document.getElementById("point").style.display = "initial";

            // document.getElementById("changeMapSize").style.display = "none";
             document.getElementById("export").style.display = "none";
             document.getElementById("Cancel").style.display = "none";
             document.getElementById("exportButton").style.display = "none";
             document.getElementById("Confirm").style.display = "none";



             document.getElementById('record').style.display = 'none';
             document.getElementById('enableRecording').style.display = 'none';
        //   document.getElementById('play').style.display = 'none';
             document.getElementById('activatePlay').style.display = 'none';

             document.getElementById('voice').style.display = 'none';

          //   document.getElementById('goBackToLandUse').style.display = 'none';
          //   document.getElementById('goToIdentification').style.display = 'none';
             document.getElementById('emoji').style.display = 'none';

             document.getElementById('showAreaHa').style.display = 'none';
             document.getElementById('showAreaAcres').style.display = 'none';
             document.getElementById('showLength').style.display = 'none';
             // finalAreaHa = null
             // finalAreaAcres = null
             // finalLength = null


             tempLayer.clearLayers()
          //   return finalAreaHa & finalAreaAcres & finalLength
           }


///////////////////   firebase code   //////////////////////////////////////////////////////////////////////////////////////

var files = [];
var filesLength;

var storage;
var percentage
var finalPercentage =[]
var finalUrlAudio


//sendFirebase script that will be fire when 'export' is clicked.
document.getElementById("sendFirebase").onclick = function(e) {

  //checks if files are selected

    //Loops through all the selected files
    for (let i = 0; i < filesLength; i++) {  //there will be only 2 files
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

  setTimeout(function(){  firebase.storage().ref(files[0].name).getDownloadURL().then(function(url) { console.log(url); })
    if(recordedBlobs!=null){
    firebase.storage().ref(files[1].name).getDownloadURL().then(function(url) { finalUrlAudio = url;console.log(url); return finalUrlAudio })
    //urlAudio = firebase.storage().ref(files[1].name).getDownloadURL();
    }
  },1000);

};

///////////////////  end of  firebase code   ///////////////

var dateTimeRandomID;

////////function for pop ups//////////
function onEachFeature(feature, layer) {
//  setTimeout(function(){console.log(finalUrlAudio)},1600)
  //timeout is used to wait 1000ms until the download link is ready
  setTimeout(function(){
    var audioLinkText = '🔊 AUDIO 🔊'

    //conditions to avoid showing audio link if no audio has been recorded
    if(recordedBlobs != null){
    clickableFinalUrlAudio = audioLinkText.link(finalUrlAudio)
    var popupContent = feature.properties.landUses + '</br>'+ clickableFinalUrlAudio ; //+ '    ' +dateTimeRandomID
    }else{
    var popupContent = feature.properties.landUses
    }


    if (feature.properties && feature.properties.popupContent) {
      popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent).addTo(map);
      layer.bindPopup(popupContent).openPopup();

  },1600)

}

////////////////////////////////////////////      EXPORT     /////////////////////////////////////////////////////////////////////////////////////////////
  document.getElementById('export').onclick = function(e) {
                //refresh location

                console.log(currentLocation)

                // document.body.style.backgroundColor = "#13FA04";

                // Extract GeoJson from featureGroup
                // var data = drawnItems.toGeoJSON();
                //here we generate a random ID so when offline the downloaded file is not duplicated
                var randomNumber = Math.random();
                randomNumber = randomNumber*10000;
                var randomID = Math.round(randomNumber);
                //here the datetime
                var today = new Date();
                var date = today.getFullYear()+' '+(today.getMonth()+1)+' '+today.getDate();
                var time = today.getHours() + " " + today.getMinutes() + " " + today.getSeconds();
                var dateTime = date+' - '+time;
                //here we combine datetime with randomID
                dateTimeRandomID ='Date&time: '+ dateTime+' RandomID:'+randomID;
                dateTimeRandomID.toString();
                //console.log(dateTimeRandomID);

               var  data = drawnItems.toGeoJSON();
                //The coordinate reference system for all GeoJSON coordinates is a  geographic coordinate reference system, using the World Geodetic
                //System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units of decimal degrees.

                //script to remove null values of land use
              //  var allLandUses = [lu1,lu2,lu3,lu4,lu5,luOther];
              var allLandUses = [1]
                //land uses array filtered.
                var allLandUsesFiltered = allLandUses.filter(noNull => noNull != null);
                console.log(allLandUsesFiltered)
                //convert final land uses array into string

                //currentLocation array Stringify, if location is found/activated
                if(currentLocation[0] != null){
                  var currentLocationString = currentLocation.toString();

                }else{
                  currentLocationString = 'Location not recorded';
                }
                console.log(currentLocation[0])
                var landUses = allLandUsesFiltered.toString();
              //  console.log(landUses);
              //to convert emojis from unicode to short name, before the data is transmitted
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
                var propertiesGeoJSON = {
                  'landUses':boxContentToString,
                  'area': finalAreaHa2Decimals,
                  'length':finalLength2Decimals,
                  'dateTime':dateTime,
                  'participantLocation':currentLocationString,
                  'randomID':randomID
                };
              //  adding the properties to the geoJSON file:
              data.features[0].properties = propertiesGeoJSON;

                //data.innerHTML = JSON.stringify(prop_1);
                // Stringify the GeoJson
              var  convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
                //var convertedData = JSON.stringify(data);

                // var convertedText =   '' + encodeURIComponent(JSON.stringify(attributes))
                //                          + encodeURIComponent(JSON.stringify(currentLocation))
                //                          + encodeURIComponent(JSON.stringify(dateTime));

                ////////////////////////  TRANSMISSION ////////////////////////////////////////
              //  var convertedDataBlob = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(recordedBlobs));


          if(recordedBlobs !=null){
           var blob = new Blob(recordedBlobs, {type: 'video/webm'});
           console.log(blob)
          }  ////////from plugin

                // Create export
                document.getElementById('export').setAttribute('href', 'data:' + convertedData);
                //document.getElementById('export').setAttribute('href', 'data:' + convertedData + convertedText );
                console.log(convertedData)

                document.getElementById('export').setAttribute('download',dateTimeRandomID);


                layer1=data;
                console.log(layer1);
                //finalLayer is a global variable
                finalLayer = L.geoJSON(layer1,{
                  style: function (feature) {
                    return feature.properties && feature.properties.style;
                  },
                  color:'blue',
                  onEachFeature: onEachFeature,
                }).addTo(map);

                drawnItems.clearLayers();
                tempLayer.clearLayers()
                //defining the final screen
          //////      document.getElementById('Sent').play();
                document.getElementById("map").style.height = "0px";
                document.getElementById("Confirm").style.display = "none";
                document.getElementById("Cancel").style.display = "none";

                document.getElementById("export").style.display = "none";
                document.getElementById("exportButton").style.display = "none";

                document.getElementById("record").style.display = "none";
                document.getElementById('enableRecording').style.display = 'none';

              //  document.getElementById("recordFake").style.display = "none";

                document.getElementById("play").style.display = "none";
            //    document.getElementById("goBackToLandUse").style.display = "none";

                document.getElementById('voice').style.display = 'none';
                document.getElementById('voice').style.opacity = '0';
                document.getElementById('activatePlay').style.display = 'none';
                document.getElementById('showAreaHa').style.display = 'none';
                document.getElementById('showAreaAcres').style.display = 'none'
                document.getElementById('showLength').style.display = 'none'


                // document.getElementById("tutorialScreen").style.visibility = "hidden";
                // document.getElementById("startMapping").style.display = "none";
                // document.getElementById("spanish").style.display = "none";
                // document.getElementById("english").style.display = "none";
                // document.getElementById("youtube").style.display = "none";
                // document.getElementById("text").style.display = "none";


                recordedVideo.pause();
                recordedVideo.currentTime = 0;

                document.getElementById('emoji').style.display = 'none';


                document.getElementById('Sent').style.display = 'initial';
                // document.getElementById('uploading').style.display = 'initial'
                // document.getElementById('progress').style.display = 'initial'

                //progress bar remains hidden
                // document.getElementById('uploading').style.display = 'initial'
                // document.getElementById('progress').style.display = 'initial'

                document.getElementById('voice').style.visibility = 'hidden';
              //  document.getElementById('Sent').src='images/Sent.gif';

              setTimeout(function(){

                document.getElementById('Sent').style.display = 'none';
                document.getElementById('uploading').style.display = 'none'
                document.getElementById('progress').style.display = 'none'

                document.getElementById("deleteAllVertexs").style.opacity = "0.35";
                document.getElementById("deleteAllVertexs").disabled = true;

                document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
                document.getElementById("deleteAllVertexsLine").disabled = true;

                document.body.style.backgroundColor = "white";

                document.getElementById("map").style.height = "100%";
                document.getElementById("goBack1").style.display = "initial";
                document.getElementById("polygon").style.display = "initial";
                document.getElementById("polyline").style.display = "initial";
                document.getElementById("point").style.display = "initial";

              //  document.getElementById('emojionearea1').placeholder = '.'

                // drawnItems.remove();
                recordedVideo.pause();

              //.style.height = "88%";
                // document.getElementById("Exit").style.display = "none";
                // document.getElementById("Return").style.display = "none";

              }, 2800);
              //reset all land use boxes
              // document.getElementById('lu1').style.borderColor = 'transparent';
              // document.getElementById('lu2').style.borderColor = 'transparent';
              // document.getElementById('lu3').style.borderColor = 'transparent';
              // document.getElementById('lu4').style.borderColor = 'transparent';
              // document.getElementById('lu5').style.borderColor = 'transparent';
              // document.getElementById('luOther').style.borderColor = 'transparent';

              created=false;

//adding layers to localstorage
              var dataStringified = JSON.stringify(data);
              var tempName = randomID // each polygon must have a different name!!!
              var layerToLocalStorage = localStorage.setItem(tempName, dataStringified);
              console.log(dataStringified);
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

            //  console.log(finalLayer)


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

            if(recordedBlobs !=null){
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

          //to convert geojson into File format
            dataFile = new File([dataStringified], nameGeoJSON, {
                type: "application/json",
                });
                console.log(dataFile)
          //to store both audio and geojson into an array, and also get the length of the array and pass this value ot the firebase loop
              if(recordedBlobs !=null){
                files = [dataFile,audioBlobFile]
                filesLength = 2

              }else{
                files = [dataFile]
                filesLength = 1
                }
            //to simulate that the upload button is clicked.
            document.getElementById("sendFirebase").click();

      return finalLayer && myLayerIsOn && files && filesLength
  }
console.log(finalLayer)


  ////////////////////////  pop up on each feature  //////////////////////////
