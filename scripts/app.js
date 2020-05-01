// window.addEventListener('load',e )
// (function() {
if('serviceWorker' in navigator) {

navigator.serviceWorker
    .register('./sw.js',{ scope: './'})
    .then(function(registration){
      console.log('Service Worker Registered');
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

//function to download tiles leaflet.offline
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
      console.log(i+ '____' + key + " => " + value +'__'+ '__ccc__'+itemFetched);
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
      console.log(groupGeoJSON)

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
}//.addTo(map)  ///////////  add my layer to the map by default

// var myLayer =  L.FeatureGroup(groupLayer, {
//
//   style: function (feature) {
//     return feature.properties && feature.properties.style;
//   },
//
//   onEachFeature: onEachFeature,
//
//
// }).addTo(map);


// var myLayer =  L.geoJSON(groupGeoJSON, {
//
//   style: function (feature) {
//     return feature.properties && feature.properties.style;
//   },
//
//   onEachFeature: onEachFeature,
//
//
// }).addTo(map);
  //console.log(getItemToJSON);
  //   console.log(myLayer)
  // var group = new L.FeatureGroup(groupGeoJSON);
  // console.log(group)





//wwwwwwwwwwwwwww
//note that google tile layer must be copied using mt instead of {s}
// var googleSat = L.tileLayer.offline('https://mt.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', tilesDb, {
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//     subdomains: 'abc',
//     minZoom: 3,
//     maxZoom: 19,
//     crossOrigin: true
// });

///////////////////////////////////////////////////adding map layers///////////////////////////////////////////////////////

////////////////layers in localStorage////////////////////////////////////

// if(isFirstTime == false){
//
//   for(var i=0, len=localStorage.length; i<len-1; i++) {   //len-1 to avoid a error of geojson object not recognised
//     var key = localStorage.key(i);
//     var value = localStorage[key];
//     var itemFetched = localStorage.getItem(key);
//     console.log(i+ '____' + key + " => " + value +'__'+ '__ccc__'+itemFetched);
//
//     function isJson(str) {
//      try {
//        JSON.parse(str);
//      } catch (e) {
//      return false;
//    }
//    return true;
//    }
//
// isJson(itemFetched);
//    console.log(isJson(itemFetched))
//   if (isJson(itemFetched) == true){
//
//     var getItemToJSON = JSON.parse(itemFetched);
//     console.log(getItemToJSON)
//
//     L.geoJSON(getItemToJSON,{
//       style:function(features) {
//          // var mag = feature.properties.mag;
//          if (features.properties.landUses == 'animals') {
//          return {
//              color: features.properties.color="black"}
//            }
//          if (features.properties.landUses == 'water') {
//          return {
//              color: features.properties.color="#E0E0E0"}
//            }
//          if (features.properties.landUses == 'trees/wood') {
//          return {
//              color: features.properties.color="green"}
//            }
//          if (features.properties.landUses == 'gathering') {
//          return {
//              color: features.properties.color="yellow"}
//            }
//          if (features.properties.landUses == 'poison') {
//          return {
//              color: features.properties.color="red"}
//            }
//          if (features.properties.landUses == 'Other') {
//          return {
//              color: features.properties.color="#6E6E6D"}
//            }
//
//       }
//     }).addTo(map);
//
//   }
//  }
// console.log('local storage accessed!!!!')
// }
// console.log(isFirstTime);
///////////////////aoi///////////////////////////
//chat emoji ui///


// $(document).ready(function() {
// 	$("#emojionearea1").emojioneArea({
//   	pickerPosition: "left",
//     tonesStyle: "bullet"
//   });
//
// });


// var AOI = L.geoJson(AOI_Tsumkwe,{
//   fillColor: '#000000',
//   color:'red',
//   opacity: 5,
//   fillOpacity: 0,
//   weight:2
// }).addTo(map);

var communityIcon = L.icon({
    iconUrl: 'images/house.png',
  //  shadowUrl: 'leaf-shadow.png',

    iconSize:     [40, 40], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

//var community1 = L.marker([0.670322, 35.507470], {icon:communityIcon}).addTo(map);

// var AOI_Test_Namibia = {
// "type": "FeatureCollection",
// "name": "AOI_Test_Namibia",
// "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
// "features": [
// { "type": "Feature", "properties": { "id": 1 }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 20.427600969682395, -19.516088866014119 ], [ 20.605322403200432, -19.515727070939903 ], [ 20.605322403200432, -19.515727070939903 ], [ 20.607241641143393, -19.671585547789892 ], [ 20.429136360036757, -19.673031322562018 ], [ 20.427600969682395, -19.516088866014119 ] ] ] ] } }
// ]
// };
//
// L.geoJSON(AOI_Test_Namibia).addTo(map);
//OSM tiles attribution and URL

// var planetMosaic = L.tileLayer('https://tiles0.planet.com/basemaps/v1/planet-tiles/global_monthly_2016_05_mosaic/gmap/0/0/0.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
//         minZoom: 3,
//         maxZoom: 26,
//       //  maxNativeZoom: 20,
//         //transparent: false,
//         //border: 'solid black 5px',
//         subdomains:['tiles0','tiles1','tiles2','tiles3'],
//         attribution: 'Google Imagery OCTOBER 2013'
//     }).addTo(map);

/////////////////////////Collected data///////////////////

// var denui = L.geoJson(denui,{
//   fillColor: '#FC03F6',
//   color:'#FC03F6',
//   opacity: 5,
//   fillOpacity: 0.2,
//   weight:2
// }).addTo(map);
//
// var giacoma = L.geoJson(giacoma,{
//   fillColor: '#03FAFC',
//   color:'#03FAFC',
//   opacity: 5,
//   fillOpacity: 0.2,
//   weight:2
// }).addTo(map);

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



// create an options object that specifies which function will called on each feature
// let myLayerOptions = {
//   pointToLayer: createCustomIcon
// }
//
// // create the GeoJSON layer
// L.geoJSON(pointsCollector, myLayerOptions).addTo(map)
/////////////////////////////////////

// var pointsCollector = L.geoJson(pointsCollector,{
//   fillColor: '#03FAFC',
//   color:'white',
//   opacity: 5,
//   fillOpacity: 0.2,
//   weight:2,
//   iconUrl: 'images/whiteDot.png'
// }).addTo(map);

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

// var offlineControlPlanet = L.control.offline(planet, tilesDb, {
//     saveButtonHtml: '<img src="images/download.png" width=15px ; height=15px>',
//     removeButtonHtml: '<img src="images/bin.png" width=15px ; height=15px>',
//   //  icon: '<img src="images/OSM.png" width=50px ; height=50px>',
//     confirmSavingCallback: function (nTilesToSave, continueSaveTiles) {
//         if (window.confirm('Save ' + nTilesToSave + '?')) {
//             continueSaveTiles();
//         }
//     },
//     confirmRemovalCallback: function (continueRemoveTiles) {
//         if (window.confirm('Remove all the tiles?')) {
//             continueRemoveTiles();
//         }
//     },
//     minZoom: 13,
//     maxZoom: 19
// });
//googleSat.addTo(map);
//offlineControlGoogle.addTo(map);
//offlineControlOSM.addTo(map);


                                                                                         //define center map and zooooooms


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
//planet_Button.addTo(map);
//
// var home_Button = L.easyButton({
//     id: 'home',
//     position: 'topleft',
//
//     states: [{
//         icon: '<img src="images/house.png" width=40px ; height=40px>',
//         stateName: 'check-mark',
//         onClick: function(btn,map) {
//           map.setView([-19.7391716,20.3707833],15); //UCL London coordinates
//           //btn.button.style.backgroundColor = 'black';
//           gps_Button.addTo(map);
//           home_Button.removeFrom(map);
//
//
//         }
//     }]
// });
//
// home_Button.button.style.width = '60px';
// home_Button.button.style.height = '60px';
// home_Button.button.style.transitionDuration = '.3s';
// home_Button.button.style.backgroundColor = 'white';


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
          //  var clickMyLayerCount = 1
          // myLayer.removeFrom(map);
          //onsole.log(myLayer)

        //  console.log('countbutton clicks', clickButtonCount)

        // if(myLayerIsOn == true && firstLoad==false && myLayerIsOk == true){
        //
        //   myLayer.removeFrom(map);
        //   console.log(myLayer)
        //   myLayerIsOn = false;
        //   myLayer_Button.button.style.backgroundColor = 'grey';
        //   if(finalLayer !=null){
        //      finalLayer.removeFrom(map)
        //    }
        // }else if(firstLoad==false && myLayerIsOk == true){
        //   myLayer.addTo(map)          //  layer1.addTo(map);
        //   myLayerIsOn = true;
        //   myLayer_Button.button.style.backgroundColor = 'black';
        //   if(finalLayer !=null){
        //     finalLayer.addTo(map)
        //   }
        //
        // // btn.button.style.backgroundColor = 'yellow';
        // // googleSat_Button.button.style.backgroundColor = 'black';
        // // planet_Button.button.style.backgroundColor = 'black'
        // }
        // return myLayerIsOn;
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
/////////////////////////////////////////////
         //  if(myLayerIsOn == true && firstLoad==false && myLayerIsOk == true && finalLayer !=null){
         //
         //    myLayer.removeFrom(map);
         //    console.log(myLayer)
         //    myLayerIsOn = false;
         //    myLayer_Button.button.style.backgroundColor = 'grey';
         //    finalLayer.removeFrom(map)
         //   }
         //   else if(myLayerIsOn == true && finalLayer !=null){
         //            finalLayer.removeFrom(map)
         //          }
         //
         //    else if(myLayerIsOn == false && firstLoad==false && myLayerIsOk == true && finalLayer !=null){
         //    myLayer.addTo(map)          //  layer1.addTo(map);
         //    myLayerIsOn = true;
         //    myLayer_Button.button.style.backgroundColor = 'black';
         //
         //   finalLayer.addTo(map)
         // } else if(myLayerIsOn == false && finalLayer !=null){
         //   finalLayer.addTo(map)
         //
         // }
////////////////////////////////////////////
          // btn.button.style.backgroundColor = 'yellow';
          // googleSat_Button.button.style.backgroundColor = 'black';
          // planet_Button.button.style.backgroundColor = 'black'

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

    iconSize:     [40, 40], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


// add location via browser geolocation
var currentLocation = []; // variable created to allow the user recenter the map

  // function displayLocation(position) {
  //      L.marker(currentLocation,{icon:gpsIcon}).removeFrom(map);
  //     var lat = position.coords.latitude;
  //     var lng = position.coords.longitude;
  //     L.marker([lat, lng],{icon:gpsIcon}).addTo(map);
  //     //console.log('{longitude:' + lng + ', latitude:' + lat + '}');
  //   //  map.setView([lat, lng], 15);
  //     currentLocation = [lat,lng];
  //     console.log(currentLocation)
  //     //console.log(currentLocation);
  //   return currentLocation;
  // }
// setInterval(function(){ navigator.geolocation.getCurrentPosition(displayLocation)
// }, 3000);
var accuracy = 0
var markerAdded=false; // var to avoid multiple markers
function findLocation(position) {
    //  L.marker([lat, lng],{icon:gpsIcon}).removeFrom(map);
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    accuracy = position.coords.accuracy;
    console.log(accuracy)
    if(markerAdded == false){
   L.marker([lat, lng],{icon:gpsIcon}).addTo(map);
    markerAdded=true;

    }
    currentLocation = [lat,lng];
    //console.log(currentLocation)
    //console.log(currentLocation);
  return currentLocation & markerAdded & accuracy;
}

//////////////////////////////////////activate gps///////////////////////////////////////////

// try {
//   navigator.geolocation.getCurrentPosition(displayLocation);
// }
// catch(err) {
//   currentLocation == null;
// }

//navigator.geolocation.getCurrentPosition(displayLocation); //Note that it requires a secure domain (i.e. HTTPS)
console.log(currentLocation[0])

var locationFound=false;
//script to update color of gps button

// if(currentLocation[0]==null){
var refreshGPSbutton = setInterval(function(){

  try {
    navigator.geolocation.getCurrentPosition(findLocation);
   console.log(currentLocation[0])
  }
  catch(err) {
    currentLocation == null;
  }
//navigator.geolocation.getCurrentPosition(findLocation);

if(currentLocation[0] != null){

    locationFound = true
    console.log(currentLocation)
    console.log(accuracy)

    //console.log(geolocationCoordinates.accuracy)
    clearInterval(refreshGPSbutton)//once the position has been found, we stop checking if the user deactivates again (the position will be recorded anyway)
      if(accuracy<=50){
      gps_Button.button.style.backgroundColor = 'green';
    }else if(accuracy>50 && accuracy<=250){
      gps_Button.button.style.backgroundColor = 'yellow';
    }else if(accuracy>250){
      gps_Button.button.style.backgroundColor = 'orange';

    }
  //  locationFound = true
}else{
    gps_Button.button.style.backgroundColor = 'red';
  //  locationFound = false

  }
  return currentLocation;
},1000)



console.log(currentLocation[0])
var gps_Button = L.easyButton({
    id: 'gps',
    position: 'topleft',
    states: [{
        icon: '<img src="images/gps.png" width=35px ; height=35px>',
        stateName: 'check-mark',
        onClick: function(btn,map) {
          console.log(currentLocation)
            if(currentLocation[0] != null){
            map.setView(currentLocation,15);

            if(accuracy<=50){
            gps_Button.button.style.backgroundColor = 'green';
          }else if(accuracy>50 && accuracy<=250){
            gps_Button.button.style.backgroundColor = 'yellow';
          }else if(accuracy>250){
            gps_Button.button.style.backgroundColor = 'orange';

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


//L.marker(currentLocation,{icon:gpsIcon}).addTo(map);

// if(locationFound==true){
//   L.marker(currentLocation,{icon:gpsIcon}).addTo(map);
//
// }

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
                       color: '#f357a1',
                       weight: 10
                   }
               },
               polygon: {
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
               // polygon: {
               //     allowIntersection: false, // Restricts shapes to simple polygons
               //     icon: new MyCustomMarker() ,
               //                       // icon: new L.DivIcon({
               //     //             iconSize: new L.Point(2, 2)}),
               //     //             className: 'leaflet-div-icon leaflet-editing-icon my-own-icon',
               //
               //     drawError: {
               //         color: '#e1e100', // Color the shape will turn when intersects
               //         // message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
               //     },
               //     shapeOptions: {
               //         color: '#919187'
               //     }
               //
               //
               // }

               circle: false, // Turns off this drawing tool
               rectangle: false,
               marker: true,
           },
           marker: {
               icon: new MyCustomMarker()
           },
           edit: {
               featureGroup: drawnItems, //REQUIRED!!
               edit:false,
               remove: false
           }
       };


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

          document.getElementById('play').style.display = 'none';
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

              // document.getElementById("deletePolygon").style.opacity = "0.35";
              // document.getElementById("deletePolygon").disabled = true;

            // document.getElementById('startMapping').onclick = function(e){
            //   document.getElementById("startMapping").style.display = "none";
            //   document.getElementById("spanish").style.display = "none";
            //   document.getElementById("english").style.display = "none";
            //   document.getElementById("youtube").style.display = "none";
            //   document.getElementById("text").style.display = "none";
            //
            //
            //   document.getElementById("map").style.display = "block";
            //   document.getElementById("goBack1").style.display = "initial";
            //   document.getElementById("polygon").style.display = "initial";
            //   document.getElementById("polyline").style.display = "initial";
            //   document.getElementById("point").style.display = "initial";
            //
            // }
            // document.getElementById("spanish").style.display = "none";
            // document.getElementById("english").style.display = "none";
            // document.getElementById("text").style.display = "none";

          // document.getElementById('youtube').onclick = function(e){
          //     document.getElementById("youtube").style.display = "none";
          //
          //     document.getElementById("spanish").style.display = "initial";
          //     document.getElementById("english").style.display = "initial";
          //   }
          //
          // document.getElementById('spanish').onclick = function(e){
          //   document.getElementById("spanish").style.display = "none";
          //   document.getElementById("english").style.display = "none";
          //   document.getElementById("text").style.display = "initial";
          //
          // }
          //
          // document.getElementById('english').onclick = function(e){
          //   document.getElementById("spanish").style.display = "none";
          //   document.getElementById("english").style.display = "none";
          //   document.getElementById("text").style.display = "initial";
          //
          // }

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

       drawPolygon.disable();
       drawnItems.remove();
       drawnItems.clearLayers();

     }


//var data = 'sok';
var data1 = {
  "id":1,
  "name":"Rick",
  "email":"rick@gmail.com"
}
//var data = JSON.stringify(data1);
var data2 = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"landUses":"dd","dateTime":"2020_4_5__11_54_7","participantLocation":"41.546274499999996,2.1086131","randomID":5806},"geometry":{"type":"Polygon","coordinates":[[[35.482235,0.657286],[35.485239,0.64759],[35.494337,0.660976],[35.482235,0.657286]]]}}]};
var data = JSON.stringify(data2);
//var data = data2.toString();
//var data = data1.toString();

  document.getElementById('polygon').onclick = function(e){
            currentZoom = map.getZoom();
          //  map.zoomIn(1); //increases the zoom level when click on polygon

            clickMapCount = 0;
            drawPolygon.enable();

            document.getElementById("goBack1").style.display = "none";
            document.getElementById("polygon").style.display = "none";
            document.getElementById("polyline").style.display = "none";
            document.getElementById("point").style.display = "none";

            document.getElementById("goBack2").style.display = "initial";
            document.getElementById("deleteLastVertex").style.display = "initial";
            document.getElementById("deleteAllVertexs").style.display = "initial";

            // document.getElementById("changeMapSize").style.display = "initial";
            // document.getElementById("changeMapSize").disabled = true;
            // document.getElementById("changeMapSize").style.opacity = "0.35";

          //  document.getElementById("deletePolygon").style.display = "none";
/////////////////// TRANSMISSION TEST /////////////////////
        //
        //     const toSend = {
        //       name:'marcos',
        //       age:32,
        //       occupation:'researcher'
        //     };
        //
        //     const jsonString = JSON.stringify(toSend);
        //     //const url = 'http://167.71.129.243/'; //THE URL IS DEFINED IN THE PHP FILE
        //
        //     //create xhr object
        //     const xhr = new XMLHttpRequest();//////
        //     //open: type, url, async?
        // //    xhr.open('POST',url, true);//////
        //     xhr.open('POST','process.php', true);////// PHP!!!!!!!
        //
        //     //check for status of response
        //     xhr.onload =  function(){
        //       if(this.status == 200){
        //         console.log(this.responseText);
        //         }
        //     };
        //     // xhttp.onreadystatechange = function() {
        //     //   if (this.readyState == 4 && this.status == 200) {
        //     //     document.getElementById("demo").innerHTML = this.responseText;
        //     //   }
        //     // };
        //
        //     xhr.setRequestHeader('Content-Type','application/json');/////
        //     //sends request
        // //    xhr.send(jsonString);//////
        //     xhr.send('marquitos');//////
//////////////////////////////////////////////


///////////////////////////test transmission /////////////////////////////////////////

//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', 'process.php', true);
//   xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//   //xhr.setRequestHeader('Content-type', 'application/json');
//
//
// //line to insert a js variable (name) with its value (var data) into the php file
//       $.post("process.php",{name: data})
//
//
//   xhr.onload = function(){
//     console.log(this.responseText);
//   }
//
//   xhr.send();

//////////////////////////////////////////////////////////////////////////////////////////
            // const toSend = {
            //   name:'marcos',
            //   age:32,
            //   occupation:'researcher'
            // };
            // const jsonString = JSON.stringify(toSend);
            // const url = 'http://167.71.129.243/';
            //
            // //create xhr object
            // const xhr = new XMLHttpRequest();
            // //open: type, url, async?
            // xhr.open('GET', 'receive.php', true);
            // //check for status of response
            // xhr.onload =  function(){
            //   if(this.status == 200){
            //     console.log(this.responseText);
            //     }
            // }
            //
            // xhr.setRequestHeader('Content-Type','application/json');
            // //sends request
            // xhr.send(jsonString);
  };

  ///////////////////////////////    test with POST FORM DEMO
  // document.getElementById('postForm').addEventListener('submit', postName);
  //
  // function postName(e){
  //   e.preventDefault();
  //
  //   var name = document.getElementById('name2').value;
  //   var params = "name="+name;
  //
  //   var xhr = new XMLHttpRequest();
  //   xhr.open('POST', 'process.php', true);
  //   xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  //
  //   xhr.onload = function(){
  //     console.log(this.responseText);
  //   }
  //
  //   xhr.send(params);
  // }

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
       }
       // }else if(clickMapCount==1){
       //   document.getElementById("deleteAllVertexs").style.opacity = "0.35";
       //   document.getElementById("deleteAllVertexs").disabled = true;
       // }
       else if(created==true){
         document.getElementById("deleteLastVertex").style.opacity = "0.35";
         document.getElementById("deleteLastVertex").disabled = true;
       }
       else{
         document.getElementById("deleteLastVertex").style.opacity = "1";
         document.getElementById("deleteLastVertex").disabled = false;
       }
  ////////

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

    var boxContent;
      //this function must be inside the polygon onclick function

  var tempLayer;
  var data;
  map.on('draw:created', function (e) {
       //drawnItems.completeShape();
       created = true;
       //document.getElementById("deleteLastVertex").style.display = "none";

       // document.getElementById("deleteLastVertex").style.opacity = "0.35";
       // document.getElementById("deleteLastVertex").disabled = true;
       // document.getElementById("deleteAllVertexs").style.opacity = "0.35";
       // document.getElementById("deleteAllVertexs").disabled = true;
       //
       // document.getElementById("deletePolygon").style.display = "initial";
       // document.getElementById("deleteAllVertexs").style.display = "none";
       //
       // document.getElementById("changeMapSize").disabled = false;
       // document.getElementById("changeMapSize").style.opacity = "1";

       drawPolygon.disable();
       drawPolygon.enable();
       drawnItems.removeFrom(map); //remove the drawn item as yellow polygon appears
      document.getElementById("deleteAllVertexs").style.display = "none";
      document.getElementById("deleteLastVertex").style.display = "none";
        document.getElementById("goBack2").style.display = "none";

        document.getElementById("goBack2").style.display = "none";
        document.getElementById("deleteLastVertex").style.display = "none";
        document.getElementById("deleteAllVertexs").style.display = "none";
      //  document.getElementById("changeMapSize").style.display = "none";
      //  document.getElementById("deletePolygon").style.display = "none";

      //  document.getElementById("Confirm").style.visibility = "hidden";


        // document.getElementById("Confirm").style.opacity = "0.155";
        // document.getElementById("Confirm").disabled = true;
        document.getElementById("Confirm").style.display = "initial";
        document.getElementById("Cancel").style.display = "initial";

        document.getElementById("classification").style.display = "initial";

        document.getElementById("emoji").style.display = "initial";

        document.getElementById('Sent').currentTime = 0;

        document.getElementById('voice').style.display = 'none';
        document.getElementById('voice').style.opacity = '0';

        document.getElementById('enableRecording').style.display = 'initial';

        // document.getElementById('record').style.display = 'initial';
        // document.getElementById('record').style.opacity = '1';

        document.getElementById('emoji').style.display = 'initial';


       //console.log('created')
//boxContent = document.getElementById('emojionearea1').value;
       var mapNewBounds =  map.getBounds();

       map.fitBounds(drawnItems.getBounds(),{
                    maxZoom:30,
                    paddingBottomRight: [0, 0]
                  })
        console.log(mapNewBounds);

        data = drawnItems.toGeoJSON();
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


      }



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
    // document.getElementById('deletePolygon').onclick = function(e){
    //         clickMapCount = 0;
    //         clickDelVertCount = 0;
    //         // if(create==false){
    //         //   drawPolygon.disable();
    //         //   drawPolygon.enable();
    //         //
    //         //   document.getElementById("deleteAllVertexs").disabled = true;
    //         //   document.getElementById("deleteAllVertexs").style.opacity = "0.35";
    //         //
    //         //   document.getElementById("deleteLastVertex").disabled = true;
    //         //   document.getElementById("deleteLastVertex").style.opacity = "0.35";
    //         // } else{
    //           // document.getElementById("changeMapSize").disabled = true;
    //           // document.getElementById("changeMapSize").style.opacity = "0.35";
    //         //  document.getElementById("deletePolygon").disabled = true;
    //       //    document.getElementById("deletePolygon").style.display = "none";
    //
    //           document.getElementById("deleteLastVertex").style.opacity = "0.35";
    //           document.getElementById("deleteLastVertex").disabled = true;
    //           document.getElementById("deleteAllVertexs").style.display = "initial";
    //           document.getElementById("deleteAllVertexs").style.opacity = "0.35";
    //           document.getElementById("deleteAllVertexs").disabled = true;
    //
    //           drawnItems.remove();
    //           drawnItems.clearLayers();
    //         //  drawnItems = [];
    //           drawPolygon.enable();
    //
    //           created=false;
    //
    //       return created;
    //       }

  //var goToLT = 0; //variable to know whether the LT instructions have played, so can be paused when cancel click
//   var goToId = 0;
//       document.getElementById('changeMapSize').onclick = function(e) {
//             clickMapCount = 0;
//             clickDelVertCount = 0;
//
//           // document.getElementById("mappingInstructions").pause();
//           // document.getElementById("mappingInstructions").currentTime = 0;
//
//           // document.getElementById('goToIdentification').style.display = 'initial';
//           // document.getElementById('goToIdentification').disabled = true;
//           // document.getElementById('goToIdentification').style.opacity = '0.1';
//
//
//         //  console.log('zoom',map.getZoom())
//           var screenHeight = screen.height;
//         //  var paddingDist = screenHeight*0.6;
//
//         //  console.log('screenHeight', screenHeight)
//         //  document.getElementById("map").style.height = "88%";
//
//             map.fitBounds(drawnItems.getBounds(),{
//               maxZoom:30,
//               paddingBottomRight: [0, 0]
//             })
//
//               document.getElementById("goBack2").style.display = "none";
//               document.getElementById("deleteLastVertex").style.display = "none";
//               document.getElementById("deleteAllVertexs").style.display = "none";
//               document.getElementById("changeMapSize").style.display = "none";
//               document.getElementById("deletePolygon").style.display = "none";
//
//             //  document.getElementById("Confirm").style.visibility = "hidden";
//
//
//               // document.getElementById("Confirm").style.opacity = "0.155";
//               // document.getElementById("Confirm").disabled = true;
//               document.getElementById("Confirm").style.display = "initial";
//               document.getElementById("Cancel").style.display = "initial";
//
//               document.getElementById("classification").style.display = "initial";
//
//               document.getElementById("emoji").style.display = "initial";
//
//             // document.getElementById('emojionearea1').value = 'aaaaa'
//             // console.log(document.getElementById('emojionearea1').value);
//
//
//               //document.getElementById("microphone").style.display = "initial";
//       ////        document.getElementById('LandUse').play();
//               // document.getElementById('lu1').style.display = 'initial';
//               // document.getElementById('lu2').style.display = 'initial';
//               // document.getElementById('lu3').style.display = 'initial';
//               // document.getElementById('lu4').style.display = 'initial';
//               // document.getElementById('lu5').style.display = 'initial';
//               // document.getElementById('luOther').style.display = 'initial';
//
//               //document.getElementById('goToIdentification').style.display = 'initial';
// ///go to identificiation script
//               document.getElementById('Sent').currentTime = 0;
//
//               goToId = 1;
//
//
//               // document.getElementById('Confirm').style.display = 'initial';
//               // document.getElementById('Confirm').disabled = true;
//               // document.getElementById('Confirm').style.opacity = '0.1';
//
//               //document.getElementById('goBackToLandUse').style.display = 'initial';
//               document.getElementById('voice').style.display = 'none';
//               document.getElementById('voice').style.opacity = '0';
//
//               // document.getElementById('LandUse').pause();
//               // document.getElementById('LandUse').currentTime = 0;
//
//           //    document.getElementById('Identification').play();
//           //    document.getElementById('start').style.display = 'initial';
//               document.getElementById('record').style.display = 'initial';
//               document.getElementById('record').style.opacity = '1';
//               // document.getElementById('play').style.display = 'initial';
//               // document.getElementById('play').style.opacity = '0.1';
//
//               document.getElementById('emoji').style.display = 'initial';
//
//
//               // document.getElementById('download').style.display = 'initial';
//               // document.getElementById('download').style.opacity = '0.1';
//
//
//            }



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
          //    document.getElementById('play').style.opacity = '1';
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
            //  document.getElementById('play').style.opacity = '0.1';
              document.getElementById('download').style.opacity = '0.1';
              document.getElementById('emoji').style.display = 'none';

              document.getElementById('voice').style.display = 'initial';
              document.getElementById('voice').style.opacity = '1';
              document.getElementById('voiceGif').style.width = '40%';
              document.getElementById('voiceGif').style.height = '7%';




      //        document.getElementById('goBackToLandUse').style.display = 'none';

            }
            // document.getElementById('Identification').pause();
            // document.getElementById('Identification').currentTime = 0;

           document.getElementById('gum').style.display = 'none';
           document.getElementById('recorded').style.display = 'none';
           document.getElementById('echoCancellation').style.display = 'none';

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
      /////       document.getElementById("mappingInstructions").play();

        /////     document.getElementById('LandUse').pause();
          //   document.getElementById('LandUse').currentTime = 0;

             // if(goToId ==1){
             //   document.getElementById('Identification').pause();
             //   document.getElementById('Identification').currentTime = 0;
             // }




             //map.fitBounds(drawnItems.getBounds(),{maxZoom:20});

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
             document.getElementById('voice').style.display = 'none';

          //   document.getElementById('goBackToLandUse').style.display = 'none';
          //   document.getElementById('goToIdentification').style.display = 'none';
             document.getElementById('emoji').style.display = 'none';
             tempLayer.clearLayers()
           }


           // document.getElementById('emojibtn').onclick = function (e){
           //
           //   console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
           // }




/////////////////////////// Export  ////////////////////////////////////////////////////////

var dateTimeRandomID;

////////function for pop ups//////////
function onEachFeature(feature, layer) {
  var popupContent = feature.properties.landUses  ; //+ '    ' +dateTimeRandomID

  if (feature.properties && feature.properties.popupContent) {
    popupContent += feature.properties.popupContent;
  }

  layer.bindPopup(popupContent).addTo(map);
    layer.bindPopup(popupContent).openPopup();
}
//////////////////////////////////
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

                var data = drawnItems.toGeoJSON();
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
                console.log(landUses);
                var boxContentToString = boxContent.toString();
                //attributes added to Geojson file properties
                //var combinedAttributeData = landUses + dateTime + currentLocation;
                var propertiesGeoJSON = {
                  'landUses':boxContentToString,
                  'dateTime':dateTime,
                  'participantLocation':currentLocationString,
                  'randomID':randomID
                };
              //  adding the properties to the geoJSON file:
              data.features[0].properties = propertiesGeoJSON;
              console.log(data)

                //data.innerHTML = JSON.stringify(prop_1);
                // Stringify the GeoJson
                var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
                //var convertedData = JSON.stringify(data);

                // var convertedText =   '' + encodeURIComponent(JSON.stringify(attributes))
                //                          + encodeURIComponent(JSON.stringify(currentLocation))
                //                          + encodeURIComponent(JSON.stringify(dateTime));

                ////////////////////////  TRANSMISSION ////////////////////////////////////////
                                var toSend = JSON.stringify(data)
                                var xhr = new XMLHttpRequest();
                                xhr.open('POST', 'process.php', true);
                                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                                //xhr.setRequestHeader('Content-type', 'application/json');


                                //line to insert a js variable (name) with its value (var data) into the php file
                                    $.post("process.php",{name: toSend})

                                    // function(data,status){
                                    //     document.getElementById("saveWarningText").innerHTML = data;
                                    //     $( "#saveWarningText" ).fadeIn(100);
                                    //     setTimeout(function(){ $( "#saveWarningText" ).fadeOut(100); }, 3000);
                                    // });

                                // xhr.onload = function(){
                                //   console.log(this.responseText);
                                // }
                                //
                                // xhr.send();


                //console.log(convertedData)
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
                document.getElementById('voice').style.visibility = 'hidden';
              //  document.getElementById('Sent').src='images/Sent.gif';

              setTimeout(function(){

                document.getElementById('Sent').style.display = 'none';

                document.getElementById("deleteAllVertexs").style.opacity = "0.35";
                document.getElementById("deleteAllVertexs").disabled = true;
                document.body.style.backgroundColor = "white";

                document.getElementById("map").style.height = "100%";
                document.getElementById("goBack1").style.display = "initial";
                document.getElementById("polygon").style.display = "initial";
                document.getElementById("polyline").style.display = "initial";
                document.getElementById("point").style.display = "initial";

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


//////////////////// TRANSMISSION /////////////////////
              // var ourRequest = new XMLHttpRequest();
              // var theURL = 'http://178.62.113.144/';
              // ourRequest.open('POST',theURL);
              // ourRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
              // ourRequest.send(JSON.stringify({ "email": "hello@user.com", "response": { "name": "Tester" } }));

              console.log(finalLayer)

      return finalLayer && myLayerIsOn
  }
console.log(finalLayer)


  ////////////////////////  pop up on each feature  //////////////////////////
