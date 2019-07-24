// window.addEventListener('load',e )
// (function() {
if('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('sw.js',{ scope: ''})
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

var map = L.map('map',{
        editable:true,
        center: [-19.59,20.52],//coordinates of Iten, Kenya
        zoom: 11,
        minZoom:10,
        maxZoom:23,
        zoomControl:false,
       attributionControl:false
      });
function addPreviousPolygons(){
  if(!data.length==0){
    data.addTo(map);
    //console.log(data);
  }
}
//map.attributionControl.addAttribution("New attribution");
map.addControl(L.control.attribution({
        position: 'bottomright',
        prefix: 'Leaflet'
      }));


//wwwwwwwwwwwwwww
//note that google tile layer must be copied using mt instead of {s}
// var googleSat = L.tileLayer.offline('https://mt.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', tilesDb, {
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//     subdomains: 'abc',
//     minZoom: 3,
//     maxZoom: 19,
//     crossOrigin: true
// });

//wwwwwwwwwwwwwwwwwww

var AOI = L.geoJson(AOI_Test_Namibia,{
  fillColor: '#000000',
  color:'black',
  opacity: 5,
  fillOpacity: 0,
  weight:2
}).addTo(map);

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
var googleSat = L.tileLayer.offline('https://mt.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', tilesDb,{
        minZoom: 3,
        maxZoom: 26,
      //  maxNativeZoom: 20,
        //transparent: false,
        //border: 'solid black 5px',
        subdomains:['mt0','mt1','mt2','mt3'],
        attribution: 'Google Imagery OCTOBER 2013'
    }).addTo(map);
//console.log(googleSat)

var osm = L.tileLayer.offline('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',tilesDb,{
        minZoom: 3,
        maxZoom: 26,
        maxNativeZoom: 20,
        // subdomains:['mt0','mt1','mt2','mt3'],
        attribution: 'OpenStreetMap Contributors'

        });

 var planetS1 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20190623_082954_0f2b/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
        maxZoom: 26,
        maxNativeZoom: 20,
        //transparent: false,
        //border: 'solid black 5px',
        subdomains:['tiles0','tiles1','tiles2','tiles3'],
        attribution: 'Planet Imagery JULY 2019'
      //  attribution: '&copy; <a href="https://www.planet.com/">Planet</a>'
    });
 var planetS2 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20190623_082953_0f2b/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
        maxZoom: 26,
        maxNativeZoom: 20,
        //transparent: false,
        //border: 'solid black 5px',
        subdomains:['tiles0','tiles1','tiles2','tiles3'],
        // attribution: 'Planet Imagery JULY 2019',
        iconURL: 'images/forest.png'
    });
 var planetS3 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20190623_082904_1012/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
        maxZoom: 26,
        maxNativeZoom: 20,
        //transparent: false,
        //border: 'solid black 5px',
        subdomains:['tiles0','tiles1','tiles2','tiles3'],
      //  attribution: '&copy; <a href="https://www.planet.com/">Planet</a>'
    });
 var planetS4 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20190623_082903_1012/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
        maxZoom: 26,
        maxNativeZoom: 20,
        //transparent: false,
        //border: 'solid black 5px',
        subdomains:['tiles0','tiles1','tiles2','tiles3'],
        //attribution: 'Planet Imagery JUNE 2019',
        iconURL: 'images/forest.png'
    });
 var planetS5 = L.tileLayer('https://{s}.planet.com/data/v1/PSScene4Band/20190623_082902_1012/{z}/{x}/{y}.png?api_key=2b11aafd06e2464a85d2e97c5a176a9a',{
        maxZoom: 26,
        maxNativeZoom: 20,
        //transparent: false,
        //border: 'solid black 5px',
        subdomains:['tiles0','tiles1','tiles2','tiles3'],
      //  attribution: '&copy; <a href="https://www.planet.com/">Planet</a>'
    });
    //console.log(planetS5)

var planet = L.layerGroup([planetS1,planetS2,planetS3,planetS4,planetS5]);

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
    minZoom: 13,
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
    minZoom: 13,
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

var clickButtonCount=0;
var osm_Button = L.easyButton({
    id: 'osm',
    class:'easyButton',
    position: 'topright',
    //background:'images/forest.png',
    states: [{
      icon: '<img src="images/OSM.png" width=50px ; height=50px>',
      //  background:"images/forest.png",
        stateName: 'check-mark',
        onClick: function(btn,map) {
          clickButtonCount +=1;
        //  console.log('countbutton clicks', clickButtonCount)
          if(clickButtonCount == 10){
            offlineControlOSM.addTo(map);
            clickButtonCount=0;

          }else{
          osm.addTo(map);
          googleSat.removeFrom(map);
          planet.removeFrom(map);
          btn.button.style.backgroundColor = 'yellow';
          googleSat_Button.button.style.backgroundColor = 'black';
          planet_Button.button.style.backgroundColor = 'black'
          }
          return clickButtonCount;
        }

    }]
});
//osm_Button.button.style.backgroundColor = 'black';
osm_Button.button.style.width = '60px';
osm_Button.button.style.height = '60px';
//osm_Button.button.style.backgroundColor = 'none';
//osm_Button.button.style.transitionDuration = '.3s';
osm_Button.addTo(map);



var googleSat_Button = L.easyButton({
    id: 'googleSat',
    class:'easyButton1',
    position: 'topright',

    states: [{
        icon: '<img src="images/google.png" width=50px ; height=50px>',
              //stateName: 'check-mark',
        onClick: function(btn,map) {
          clickButtonCount +=1;
          //console.log('countbutton clicks', clickButtonCount)
          if(clickButtonCount == 10){
            offlineControlGoogle.addTo(map);
            clickButtonCount=0;

          }else{
            googleSat.addTo(map);
            planet.removeFrom(map);
            osm.removeFrom(map);
            btn.button.style.backgroundColor = 'yellow';
            osm_Button.button.style.backgroundColor = 'black';
            planet_Button.button.style.backgroundColor = 'black';
            //remove the download tiles Control
          }
          return clickButtonCount;
        }
    }]
});

googleSat_Button.button.style.width = '60px';
googleSat_Button.button.style.height = '60px';
googleSat_Button.button.style.transitionDuration = '.3s';
googleSat_Button.button.style.backgroundColor = 'yellow';
googleSat_Button.addTo(map);

var planet_Button = L.easyButton({
    id: 'planet',
    class:'easyButton',
    position: 'topright',
    states: [{
        icon: '<img src="images/planet.gif" width=50px ; height=50px>',
        stateName: 'check-mark',
        onClick: function(btn,map) {
            clickButtonCount=0;
            planet.addTo(map);
            googleSat.removeFrom(map);
            osm.removeFrom(map);
            btn.button.style.backgroundColor = 'yellow';
              googleSat_Button.button.style.backgroundColor = 'black';
              osm_Button.button.style.backgroundColor = 'black'

        }
    }]
});

planet_Button.button.style.width = '60px';
planet_Button.button.style.height = '60px';
planet_Button.button.style.transitionDuration = '.3s';
planet_Button.addTo(map);

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



// add location via browser geolocation
function displayLocation(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    L.marker([lat, lng]).addTo(map);
    //console.log('{longitude:' + lng + ', latitude:' + lat + '}');
    map.setView([lat, lng], 15);
}
navigator.geolocation.getCurrentPosition(displayLocation); //Note that it requires a secure domain (i.e. HTTPS)
                                                                                                       //define center map and zooooooms

var scale = L.control.scale({
  maxWidth: 100,
  metric:true,
  imperial:false,
}).addTo(map);


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
                   icon: new MyCustomMarker() ,
                                     // icon: new L.DivIcon({
                   //             iconSize: new L.Point(2, 2)}),
                   //             className: 'leaflet-div-icon leaflet-editing-icon my-own-icon',

                   drawError: {
                       color: '#e1e100', // Color the shape will turn when intersects
                       // message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
                   },
                   shapeOptions: {
                       color: '#919187'
                   }

               },
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

     //   L.Edit.Poly = L.Edit.Poly.extend({
     //     options : {
     //         icon: new L.DivIcon({
     //              iconSize: new L.Point(20, 20),
     //              className: 'leaflet-div-icon leaflet-editing-icon my-own-icon'
     //         })
     //     }
     // });
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

var drawPolygon = new L.Draw.Polygon(map, drawControl.options.polygon);
var drawPolyline = new L.Draw.Polyline(map, drawControl.options.polyline);
var drawMarker = new L.Draw.Marker(map, drawControl.options.marker);

/////////////////////////////////////////Initial state of buttons //////////////////////////////////////

           document.getElementById("videoTutorial").style.display = "initial";
           document.getElementById("startMapping").style.visibility = "visible";

           document.getElementById("startMapping").style.display = "initial";
           document.getElementById("goBack1").style.display = "none";

           document.getElementById("map").style.display = "none";
           document.getElementById("polygon").style.display = "none";
           document.getElementById("polyline").style.display = "none";
           document.getElementById("point").style.display = "none";
           document.getElementById("polyline").style.opacity = "0.15";
           document.getElementById("point").style.opacity = "0.15";

           document.getElementById("goBack2").style.display = "none";
           document.getElementById("deleteLastVertex").style.display = "none";
           document.getElementById("deleteAllVertexs").style.display = "none";
           document.getElementById("deletePolygon").style.display = " none";
           document.getElementById("changeMapSize").style.display = "none";

           document.getElementById("export").style.display = "none";
           document.getElementById("Cancel").style.display = "none";
           document.getElementById("exportButton").style.display = "none";
           document.getElementById("Confirm").style.display = "none";

           document.getElementById('LU1').style.display = 'none';
           document.getElementById('LU2').style.display = 'none';
           document.getElementById('LU3').style.display = 'none';
           document.getElementById('LU4').style.display = 'none';
           document.getElementById('LU5').style.display = 'none';
           document.getElementById('LU6').style.display = 'none';
           document.getElementById('LT1').style.display = 'none';
           document.getElementById('LT2').style.display = 'none';
           document.getElementById('LT3').style.display = 'none';
           document.getElementById('LT4').style.display = 'none';
           document.getElementById('LT5').style.display = 'none';
           document.getElementById('LT6').style.display = 'none';
           document.getElementById('goToLandTenure').style.display = 'none';
           document.getElementById('goToIdentification').style.display = 'none';
           document.getElementById('goBackToLandUse').style.display = 'none';


          // document.getElementById('start').style.display = 'none';
           document.getElementById('record').style.display = 'none';
           document.getElementById('play').style.display = 'none';
           document.getElementById('download').style.display = 'none';
           document.getElementById('gum').style.display = 'none';
           document.getElementById('recorded').style.display = 'none';
           document.getElementById('echoCancellation').style.display = 'none';
           document.getElementById('goBackToLandTenure').style.display = 'none';

           document.getElementById('voice').style.display = 'none';

           document.getElementById("community").style.display = "none";
           document.getElementById("government").style.display = "none";
           document.getElementById("world").style.display = "none";

           document.getElementById("Exit").style.display = "none";
           document.getElementById("Return").style.display = "none";
           // document.getElementById("Exit").style.display = "none";
           // document.getElementById("Return").style.display = "none";

////////////////////////////////////////////TUTORIAL//////////////////////////////////////////////////////////////

          document.getElementById("goBack1").onclick = function(e){

            document.getElementById("mappingInstructions").pause();
            document.getElementById("mappingInstructions").currentTime = 0;

             document.body.style.backgroundColor = "black";
             document.getElementById("map").style.display = "none";
             document.getElementById("goBack1").style.display = "none";
             document.getElementById("polygon").style.display = "none";
             document.getElementById("polyline").style.display = "none";
             document.getElementById("point").style.display = "none";
             document.getElementById("videoTutorial").style.display = "initial";
             document.getElementById("startMapping").style.display = "initial";

           }

          document.getElementById('startMapping').onclick = function(e) {
              document.body.style.backgroundColor = "white";

              document.getElementById("mappingInstructions").play();

              document.getElementById("videoTutorial").style.display = "none";
              document.getElementById("startMapping").style.display = "none";

              document.getElementById("map").style.display = "block";
              //document.getElementById("map").style.height = "90%";
              document.getElementById("goBack1").style.display = "initial";
              document.getElementById("polygon").style.display = "initial";
              document.getElementById("polyline").style.display = "initial";
              document.getElementById("point").style.display = "initial";

              document.getElementById("deleteLastVertex").style.opacity = "0.15";
              document.getElementById("deleteLastVertex").disabled = true;
              document.getElementById("deleteAllVertexs").style.opacity = "0.15";
              document.getElementById("deleteAllVertexs").disabled = true;
              document.getElementById("deletePolygon").style.display = 'none';

              // document.getElementById("deletePolygon").style.opacity = "0.15";
              // document.getElementById("deletePolygon").disabled = true;
          }

///////////////////////////////////////////draw screen////////////////////////////////////////////////

var created = false; //variable to determine whether a polygon has been completed.
var clickMapCount = 0;
var clickDelVertCount = 0;
document.getElementById("goBack2").onclick = function(e){
      clickMapCount = 0;

       document.getElementById("goBack1").style.display = "initial";
       document.getElementById("goBack2").style.display = "none";
       document.getElementById("polygon").style.display = "initial";
       document.getElementById("polyline").style.display = "initial";
       document.getElementById("point").style.display = "initial";

       document.getElementById("deleteLastVertex").style.display = "none";
       document.getElementById("deleteAllVertexs").style.display = "none";
       document.getElementById("changeMapSize").style.display = "none";
       document.getElementById("deletePolygon").style.display = "none";

       document.getElementById("deleteLastVertex").style.opacity = "0.15";
       document.getElementById("deleteLastVertex").disabled = true;
       document.getElementById("deleteAllVertexs").style.opacity = "0.15";
       document.getElementById("deleteAllVertexs").disabled = true;
       document.getElementById("deletePolygon").style.display = 'none';

       drawPolygon.disable();
       drawnItems.remove();
       drawnItems.clearLayers();

     }

  document.getElementById('polygon').onclick = function(e){
            clickMapCount = 0;
            drawPolygon.enable();
            document.getElementById("goBack1").style.display = "none";
            document.getElementById("polygon").style.display = "none";
            document.getElementById("polyline").style.display = "none";
            document.getElementById("point").style.display = "none";

            document.getElementById("goBack2").style.display = "initial";
            document.getElementById("deleteLastVertex").style.display = "initial";
            document.getElementById("deleteAllVertexs").style.display = "initial";

            document.getElementById("changeMapSize").style.display = "initial";
            document.getElementById("changeMapSize").disabled = true;
            document.getElementById("changeMapSize").style.opacity = "0.15";

            document.getElementById("deletePolygon").style.display = "none";

  };

  document.getElementById('map').onclick = function(e){
      // if(clickMapCount==0){
      //   document.getElementById("deleteAllVertexs").style.opacity = "0.15";
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
       //   document.getElementById("deleteAllVertexs").style.opacity = "0.15";
       //   document.getElementById("deleteAllVertexs").disabled = true;
       // }
       else if(created==true){
         document.getElementById("deleteLastVertex").style.opacity = "0.15";
         document.getElementById("deleteLastVertex").disabled = true;
       }
       else{
         document.getElementById("deleteLastVertex").style.opacity = "1";
         document.getElementById("deleteLastVertex").disabled = false;
       }
  ////////

     return clickMapCount;
  }
      //this function must be inside the polygon onclick function
  map.on('draw:created', function (e) {
       //drawnItems.completeShape();
       created = true;
       //document.getElementById("deleteLastVertex").style.display = "none";

       document.getElementById("deleteLastVertex").style.opacity = "0.15";
       document.getElementById("deleteLastVertex").disabled = true;
       document.getElementById("deleteAllVertexs").style.opacity = "0.15";
       document.getElementById("deleteAllVertexs").disabled = true;
       drawPolygon.disable();
       drawPolygon.enable();
       drawnItems.addTo(map);
       // drawnItems.toGeoJSON();
       document.getElementById("deletePolygon").style.display = "initial";
       document.getElementById("deleteAllVertexs").style.display = "none";


       document.getElementById("changeMapSize").disabled = false;
       document.getElementById("changeMapSize").style.opacity = "1";
       //console.log('created')

       var mapNewBounds =  map.getBounds();
        //console.log(mapNewBounds);
       return created;

   });

    document.getElementById('deleteLastVertex').onclick = function(e){
         clickDelVertCount += 1;
      //console.log(clickCount);

        if(clickMapCount==1){
          drawPolygon.disable();
          drawPolygon.enable();
          clickMapCount = 1;
          document.getElementById("deleteLastVertex").style.opacity = "0.15";
          document.getElementById("deleteLastVertex").disabled = true;
          document.getElementById("deleteAllVertexs").style.opacity = "0.15";
          document.getElementById("deleteAllVertexs").disabled = true;
        }else if(clickMapCount==clickDelVertCount){

          drawPolygon.disable();
          drawPolygon.enable();
          document.getElementById("deleteLastVertex").style.opacity = "0.15";
          document.getElementById("deleteLastVertex").disabled = true;
          document.getElementById("deleteAllVertexs").style.opacity = "0.15";
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
            document.getElementById("deleteLastVertex").style.opacity = "0.15";
            document.getElementById("deleteLastVertex").disabled = true;
            document.getElementById("deleteAllVertexs").style.opacity = "0.15";
            document.getElementById("deleteAllVertexs").disabled = true;
        return clickMapCount;
        }
    document.getElementById('deletePolygon').onclick = function(e){
            clickMapCount = 0;
            clickDelVertCount = 0;
            // if(create==false){
            //   drawPolygon.disable();
            //   drawPolygon.enable();
            //
            //   document.getElementById("deleteAllVertexs").disabled = true;
            //   document.getElementById("deleteAllVertexs").style.opacity = "0.15";
            //
            //   document.getElementById("deleteLastVertex").disabled = true;
            //   document.getElementById("deleteLastVertex").style.opacity = "0.15";
            // } else{
              document.getElementById("changeMapSize").disabled = true;
              document.getElementById("changeMapSize").style.opacity = "0.15";
            //  document.getElementById("deletePolygon").disabled = true;
              document.getElementById("deletePolygon").style.display = "none";

              document.getElementById("deleteLastVertex").style.opacity = "0.15";
              document.getElementById("deleteLastVertex").disabled = true;
              document.getElementById("deleteAllVertexs").style.display = "initial";
              document.getElementById("deleteAllVertexs").style.opacity = "0.15";
              document.getElementById("deleteAllVertexs").disabled = true;

              drawnItems.remove();
              drawnItems.clearLayers();
            //  drawnItems = [];
              drawPolygon.enable();

              created=false;

          return created;
          }


      document.getElementById('changeMapSize').onclick = function(e) {
            clickMapCount = 0;
            clickDelVertCount = 0;

          document.getElementById("mappingInstructions").pause();
          document.getElementById("mappingInstructions").currentTime = 0;



        //  console.log('zoom',map.getZoom())
          var screenHeight = screen.height;
          var paddingDist = screenHeight*0.4;
        //  console.log('screenHeight', screenHeight)
          document.getElementById("map").style.height = "40%";

            map.fitBounds(drawnItems.getBounds(),{
              maxZoom:30,
              paddingBottomRight: [0, paddingDist]
            })

              document.getElementById("goBack2").style.display = "none";
              document.getElementById("deleteLastVertex").style.display = "none";
              document.getElementById("deleteAllVertexs").style.display = "none";
              document.getElementById("changeMapSize").style.display = "none";
              document.getElementById("deletePolygon").style.display = "none";

              document.getElementById("Confirm").style.opacity = "0.155";
              document.getElementById("Confirm").disabled = true;
              document.getElementById("Confirm").style.display = "initial";
              document.getElementById("Cancel").style.display = "initial";
              // document.getElementById("microphone").style.display = "initial";
              document.getElementById('LandUse').play();
              document.getElementById('LU1').style.display = 'initial';
              document.getElementById('LU2').style.display = 'initial';
              document.getElementById('LU3').style.display = 'initial';
              document.getElementById('LU4').style.display = 'initial';
              document.getElementById('LU5').style.display = 'initial';
              document.getElementById('LU6').style.display = 'initial';
              document.getElementById('goToLandTenure').style.display = 'initial';



           }
////////////////////////////////////////////////////////classify screen//////////////////////////////////////////////////////////////
var lu1 = null;
var lu2 = null;
var lu3 = null;
var lu4 = null;
var lu5 = null;
var lu6 = null;

var lt1 = null;
var lt2 = null;
var lt3 = null;
var lt4 = null;
var lt5 = null;
var lt6 = null;

var ds1 = null;
var ds2 = null;
var ds3 = null;
      document.getElementById('goToLandTenure').onclick  = function(e){
        document.getElementById('LU1').style.display = 'none';
        document.getElementById('LU2').style.display = 'none';
        document.getElementById('LU3').style.display = 'none';
        document.getElementById('LU4').style.display = 'none';
        document.getElementById('LU5').style.display = 'none';
        document.getElementById('LU6').style.display = 'none';
        document.getElementById('goToLandTenure').style.display = 'none';

        document.getElementById('LandUse').pause();
        document.getElementById('LandUse').currentTime = 0;
        document.getElementById('LandTenure').play();

        document.getElementById('LT1').style.display = 'initial';
        document.getElementById('LT2').style.display = 'initial';
        document.getElementById('LT3').style.display = 'initial';
        document.getElementById('LT4').style.display = 'initial';
        document.getElementById('LT5').style.display = 'initial';
        document.getElementById('LT6').style.display = 'initial';
        document.getElementById('goToIdentification').style.display = 'initial';
        document.getElementById('goBackToLandUse').style.display = 'initial';


      }
      document.getElementById('goBackToLandUse').onclick  = function(e){
        document.getElementById('LU1').style.display = 'initial';
        document.getElementById('LU2').style.display = 'initial';
        document.getElementById('LU3').style.display = 'initial';
        document.getElementById('LU4').style.display = 'initial';
        document.getElementById('LU5').style.display = 'initial';
        document.getElementById('LU6').style.display = 'initial';
        document.getElementById('goToLandTenure').style.display = 'initial';

        document.getElementById('LandTenure').pause();
        document.getElementById('LandTenure').currentTime = 0;
        document.getElementById('LandUse').play();

        document.getElementById('LT1').style.display = 'none';
        document.getElementById('LT2').style.display = 'none';
        document.getElementById('LT3').style.display = 'none';
        document.getElementById('LT4').style.display = 'none';
        document.getElementById('LT5').style.display = 'none';
        document.getElementById('LT6').style.display = 'none';
        document.getElementById('goToIdentification').style.display = 'none';
        document.getElementById('goBackToLandUse').style.display = 'none';

      }


      document.getElementById('LU1').onclick = function(e){
        //this.style.borderColor = 'transparent';
        if(lu1===null){
          this.style.borderColor = 'black';
          lu1 = 'landUse1';
        }else{
          this.style.borderColor = 'transparent';
          lu1 = null;
        }
        console.log(lu1)
        return lu1
      }

      document.getElementById('LU2').onclick = function(e){
        //this.style.borderColor = 'transparent';
        if(lu2===null){
          this.style.borderColor = 'black';
          lu2 = 'landUse2';
        }else{
          this.style.borderColor = 'transparent';
          lu2 = null;
        }
        console.log(lu2)
        return lu2
      }
      document.getElementById('LU3').onclick = function(e){
        //this.style.borderColor = 'transparent';
        if(lu3===null){
          this.style.borderColor = 'black';
          lu3 = 'landUse3';
        }else{
          this.style.borderColor = 'transparent';
          lu3 = null;
        }
        console.log(lu3)
        return lu3
      }
      document.getElementById('LU4').onclick = function(e){
        //this.style.borderColor = 'transparent';
        if(lu4===null){
          this.style.borderColor = 'black';
          lu4 = 'landUse4';
        }else{
          this.style.borderColor = 'transparent';
          lu4 = null;
        }
        console.log(lu4)
        return lu4
      }

      document.getElementById('LU5').onclick = function(e){
        //this.style.borderColor = 'transparent';
        if(lu5===null){
          this.style.borderColor = 'black';
          lu5 = 'landUse5';
        }else{
          this.style.borderColor = 'transparent';
          lu5 = null;
        }
        console.log(lu5)
        return lu5
      }
      document.getElementById('LU6').onclick = function(e){
        //this.style.borderColor = 'transparent';
        if(lu6===null){
          this.style.borderColor = 'black';
          lu6 = 'landUse6';
        }else{
          this.style.borderColor = 'transparent';
          lu6 = null;
        }
        console.log(lu6)
        return lu6
      }
      document.getElementById('LT1').onclick = function(e){
        //this.style.borderColor = 'transparent';
        if(lt1===null){
          this.style.borderColor = 'black';
          lt1 = 'landTenure1';
        }else{
          this.style.borderColor = 'transparent';
          lt1 = null;
        }
        console.log(lt1)
        return lt1
      }
      document.getElementById('LT2').onclick = function(e){
        //this.style.borderColor = 'transparent';
        if(lt2===null){
          this.style.borderColor = 'black';
          lt2 = 'landTenure2';
        }else{
          this.style.borderColor = 'transparent';
          lt2 = null;
        }
        console.log(lt2)
        return lt2
      }
      document.getElementById('LT3').onclick = function(e){
        //this.style.borderColor = 'transparent';
        if(lt3===null){
          this.style.borderColor = 'black';
          lt3 = 'landTenure3';
        }else{
          this.style.borderColor = 'transparent';
          lt3 = null;
        }
        console.log(lt3)
        return lt3
      }

      document.getElementById('LT4').onclick = function(e){
        //this.style.borderColor = 'transparent';
        if(lt4===null){
          this.style.borderColor = 'black';
          lt4 = 'landTenure4';
        }else{
          this.style.borderColor = 'transparent';
          lt4 = null;
        }
        console.log(lt4)
        return lt4
      }
      document.getElementById('LT5').onclick = function(e){
        //this.style.borderColor = 'transparent';
        if(lt5===null){
          this.style.borderColor = 'black';
          lt5 = 'landTenure5';
        }else{
          this.style.borderColor = 'transparent';
          lt5 = null;
        }
        console.log(lt5)
        return lt5
      }
      document.getElementById('LT6').onclick = function(e){
        //this.style.borderColor = 'transparent';
        if(lt6===null){
          this.style.borderColor = 'black';
          lt6 = 'landTenure6';
        }else{
          this.style.borderColor = 'transparent';
          lt6 = null;
        }
        console.log(lt6)
        return lt6
      }

      document.getElementById('community').onclick = function(e){
        //this.style.borderColor = 'transparent';
        if(ds1===null){
          this.style.borderColor = 'black';
          ds1 = 'shareCommunity';
        }else{
          this.style.borderColor = 'transparent';
          ds1 = null;
        }
        console.log(ds1)
        return ds1
      }
      document.getElementById('government').onclick = function(e){
        //this.style.borderColor = 'transparent';
        if(ds2===null){
          this.style.borderColor = 'black';
          ds2 = 'shareGovernment';
        }else{
          this.style.borderColor = 'transparent';
          ds2 = null;
        }
        console.log(ds2)
        return ds2
      }
      document.getElementById('world').onclick = function(e){
        //this.style.borderColor = 'transparent';
        if(ds3===null){
          this.style.borderColor = 'black';
          ds3 = 'shareWorld';
        }else{
          this.style.borderColor = 'transparent';
          ds3 = null;
        }
        console.log(ds3)
        return ds3
      }

      document.getElementById('goToIdentification').onclick  = function(e){
        document.getElementById('LT1').style.display = 'none';
        document.getElementById('LT2').style.display = 'none';
        document.getElementById('LT3').style.display = 'none';
        document.getElementById('LT4').style.display = 'none';
        document.getElementById('LT5').style.display = 'none';
        document.getElementById('LT6').style.display = 'none';
        document.getElementById('goToIdentification').style.display = 'none';
        document.getElementById('Confirm').disabled = false;
        document.getElementById('Confirm').style.opacity = '1';
        document.getElementById('goBackToLandUse').style.display = 'none';
        document.getElementById('voice').style.display = 'initial';
        document.getElementById('voice').style.opacity = '0';

        document.getElementById('LandTenure').pause();
        document.getElementById('LandTenure').currentTime = 0;

        document.getElementById('Identification').play();
      //  document.getElementById('start').style.display = 'initial';
        document.getElementById('record').style.display = 'initial';
        document.getElementById('record').style.opacity = '1';
        document.getElementById('play').style.display = 'initial';
        document.getElementById('play').style.opacity = '0.1';
        document.getElementById('goBackToLandTenure').style.display = 'initial';

        // document.getElementById('download').style.display = 'initial';
        // document.getElementById('download').style.opacity = '0.1';
      }

      document.getElementById('goBackToLandTenure').onclick  = function(e){
        document.getElementById('Confirm').disabled = true;
        document.getElementById('Confirm').style.opacity = '0.1';
        recordedVideo.pause();
        recordedVideo.currentTime = 0;


        document.getElementById('LU1').style.display = 'none';
        document.getElementById('LU2').style.display = 'none';
        document.getElementById('LU3').style.display = 'none';
        document.getElementById('LU4').style.display = 'none';
        document.getElementById('LU5').style.display = 'none';
        document.getElementById('LU6').style.display = 'none';
        document.getElementById('goToLandTenure').style.display = 'none';
        document.getElementById('record').style.display = 'none';
        document.getElementById('play').style.display = 'none';
        document.getElementById('voice').style.display = 'none';

        document.getElementById('LandUse').pause();
        document.getElementById('LandUse').currentTime = 0;
        document.getElementById('Identification').pause();
        document.getElementById('Identification').currentTime = 0;
        document.getElementById('LandTenure').play();

        document.getElementById('LT1').style.display = 'initial';
        document.getElementById('LT2').style.display = 'initial';
        document.getElementById('LT3').style.display = 'initial';
        document.getElementById('LT4').style.display = 'initial';
        document.getElementById('LT5').style.display = 'initial';
        document.getElementById('LT6').style.display = 'initial';
        document.getElementById('goToIdentification').style.display = 'initial';
        document.getElementById('goBackToLandUse').style.display = 'initial';
        document.getElementById('goBackToLandTenure').style.display = 'none';
      }

        document.getElementById('record').onclick = function(e){
            if(recording==true){
              this.style.borderColor = 'transparent';
              document.getElementById('play').style.opacity = '1';
              document.getElementById('download').style.opacity = '1';
              document.getElementById('voice').style.opacity = '0';
              document.getElementById('goBackToLandTenure').style.display = 'initial';
            }
            if(recording==false){
              this.style.borderColor = 'black';
              document.getElementById('play').style.opacity = '0.1';
              document.getElementById('download').style.opacity = '0.1';
              document.getElementById('voice').style.opacity = '1';
              document.getElementById('goBackToLandTenure').style.display = 'none';

            }
            document.getElementById('Identification').pause();
            document.getElementById('LandTenure').currentTime = 0;

           document.getElementById('gum').style.display = 'none';
           document.getElementById('recorded').style.display = 'none';
           document.getElementById('echoCancellation').style.display = 'none';

      }

      document.getElementById('Confirm').onclick = function(e) {
            document.getElementById("Identification").pause();
            document.getElementById("Identification").currentTime = 0;

            document.getElementById("dataSharing").play();

             document.getElementById("Confirm").style.display = "none";
            // document.getElementById("Cancel").style.display = "none";

             document.getElementById("export").style.display = "initial";
             document.getElementById("exportButton").style.display = "initial";

             document.getElementById("record").style.display = "none";
             document.getElementById("play").style.display = "none";
             document.getElementById("goBackToLandTenure").style.display = "none";

             document.getElementById('voice').style.display = 'none';

             document.getElementById("community").style.display = "initial";
             document.getElementById("government").style.display = "initial";
             document.getElementById("world").style.display = "initial";

        }

      document.getElementById('Cancel').onclick = function(e){
             created = false;
             drawnItems.remove();
             drawnItems.clearLayers();
             recordedVideo.pause();
             document.getElementById("mappingInstructions").play();

             document.getElementById('LandUse').pause();
             document.getElementById('LandUse').currentTime = 0;
             document.getElementById('LandTenure').pause();
             document.getElementById('LandTenure').currentTime = 0;
             document.getElementById("dataSharing").pause();
             document.getElementById('dataSharing').currentTime = 0;

             //map.fitBounds(drawnItems.getBounds(),{maxZoom:20});

             document.getElementById("map").style.display = "block";
             document.getElementById("map").style.height = "90%";

            document.getElementById("goBack1").style.display = "initial";
             document.getElementById("polygon").style.display = "initial";
             document.getElementById("polyline").style.display = "initial";
             document.getElementById("point").style.display = "initial";

            // document.getElementById("changeMapSize").style.display = "none";
             document.getElementById("export").style.display = "none";
             document.getElementById("Cancel").style.display = "none";
             document.getElementById("exportButton").style.display = "none";
             document.getElementById("Confirm").style.display = "none";

             document.getElementById('LU1').style.borderColor = 'transparent';
             document.getElementById('LU2').style.borderColor = 'transparent';
             document.getElementById('LU3').style.borderColor = 'transparent';
             document.getElementById('LU4').style.borderColor = 'transparent';
             document.getElementById('LU5').style.borderColor = 'transparent';
             document.getElementById('LU6').style.borderColor = 'transparent';
             document.getElementById('LT1').style.borderColor = 'transparent';
             document.getElementById('LT2').style.borderColor = 'transparent';
             document.getElementById('LT3').style.borderColor = 'transparent';
             document.getElementById('LT4').style.borderColor = 'transparent';
             document.getElementById('LT5').style.borderColor = 'transparent';
             document.getElementById('LT6').style.borderColor = 'transparent';
             document.getElementById("community").style.borderColor = 'transparent';
             document.getElementById("government").style.borderColor = 'transparent';
             document.getElementById("world").style.borderColor = 'transparent';

             document.getElementById('LU1').style.display = 'none';
             document.getElementById('LU2').style.display = 'none';
             document.getElementById('LU3').style.display = 'none';
             document.getElementById('LU4').style.display = 'none';
             document.getElementById('LU5').style.display = 'none';
             document.getElementById('LU6').style.display = 'none';
             document.getElementById('LT1').style.display = 'none';
             document.getElementById('LT2').style.display = 'none';
             document.getElementById('LT3').style.display = 'none';
             document.getElementById('LT4').style.display = 'none';
             document.getElementById('LT5').style.display = 'none';
             document.getElementById('LT6').style.display = 'none';

             document.getElementById('record').style.display = 'none';
             document.getElementById('play').style.display = 'none';
             document.getElementById('voice').style.display = 'none';

             document.getElementById('goBackToLandTenure').style.display = 'none';
             document.getElementById('goBackToLandUse').style.display = 'none';
             document.getElementById('goToLandTenure').style.display = 'none';
             document.getElementById('goToIdentification').style.display = 'none';

             document.getElementById("community").style.display = "none";
             document.getElementById("government").style.display = "none";
             document.getElementById("world").style.display = "none";

           }

/////////////////////////// Export  ////////////////////////////////////////////////////////

var dateTimeRandomID;
  document.getElementById('export').onclick = function(e) {
               // Extract GeoJson from featureGroup
               // var data = drawnItems.toGeoJSON();
               //here we generate a random ID so when offline the downloaded file is not duplicated
               var randomNumber = Math.random();
               randomNumber = randomNumber*10000;
               var randomID = Math.round(randomNumber);
               //here the datetime
               var today = new Date();
               var date = today.getFullYear()+'_'+(today.getMonth()+1)+'_'+today.getDate();
               var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
               var dateTime = date+'__'+time;
               //here we combine datetime with randomID
               dateTimeRandomID ='Date&time: '+ dateTime+' RandomID:'+randomID;
               dateTimeRandomID.toString();
               //console.log(dateTimeRandomID);

               var data = drawnItems.toGeoJSON();
               var attributes = [lu1,lu2,lu3,lu4,lu5,lu6,lt1,lt2,lt3,lt4,lt5,lt6,ds1,ds2,ds3];

               // Stringify the GeoJson
               var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
               var convertedText =   '' + encodeURIComponent(JSON.stringify(attributes));


               // Create export
               document.getElementById('export').setAttribute('href', 'data:' + convertedData + convertedText );
              // document.getElementById('export').setAttribute('href', 'data:' + convertedText );

               document.getElementById('export').setAttribute('download',dateTimeRandomID);
               var layer1=data;
               L.geoJSON(layer1).addTo(map);

               drawnItems.clearLayers();

           document.body.style.backgroundColor = "black";

          //window.open(src='finalScreen.html');
          //defining the final screen
           document.getElementById("map").style.height = "0px";
           document.getElementById("Confirm").style.display = "none";
           document.getElementById("Cancel").style.display = "none";

           document.getElementById("export").style.display = "none";
           document.getElementById("exportButton").style.display = "none";

           document.getElementById("Exit").style.display = "initial";
           document.getElementById("Exit").style.visibility = "visible";
           document.getElementById("Return").style.display = "initial";
           document.getElementById("Return").style.visibility = "visible";


           document.getElementById("deleteAllVertexs").style.opacity = "0.15";
           document.getElementById("deleteAllVertexs").disabled = true;

          // document.getElementById('start').style.display = 'none';
           document.getElementById('record').style.display = 'none';
           document.getElementById('play').style.display = 'none';
           document.getElementById('goBackToLandTenure').style.display = 'none';

           document.getElementById("community").style.display = "none";
           document.getElementById("government").style.display = "none";
           document.getElementById("world").style.display = "none";

           document.getElementById("dataSharing").pause();
           document.getElementById('dataSharing').currentTime = 0;

      return dateTimeRandomID;
  }

      document.getElementById('Return').onclick = function(e){

             document.body.style.backgroundColor = "white";
             document.getElementById("goBack1").style.display = "initial";
             document.getElementById("polygon").style.display = "initial";
             document.getElementById("polyline").style.display = "initial";
             document.getElementById("point").style.display = "initial";
             drawnItems.remove();
             recordedVideo.pause();
            // map.fitBounds(drawnItems.getBounds(),{maxZoom:20});

             document.getElementById("map").style.height = "90%";
             document.getElementById("Exit").style.display = "none";
             document.getElementById("Return").style.display = "none";
             created=false;

             document.getElementById('LU1').style.borderColor = 'transparent';
             document.getElementById('LU2').style.borderColor = 'transparent';
             document.getElementById('LU3').style.borderColor = 'transparent';
             document.getElementById('LU4').style.borderColor = 'transparent';
             document.getElementById('LU5').style.borderColor = 'transparent';
             document.getElementById('LU6').style.borderColor = 'transparent';
             document.getElementById('LT1').style.borderColor = 'transparent';
             document.getElementById('LT2').style.borderColor = 'transparent';
             document.getElementById('LT3').style.borderColor = 'transparent';
             document.getElementById('LT4').style.borderColor = 'transparent';
             document.getElementById('LT5').style.borderColor = 'transparent';
             document.getElementById('LT6').style.borderColor = 'transparent';
             document.getElementById("community").style.borderColor = 'transparent';
             document.getElementById("government").style.borderColor = 'transparent';
             document.getElementById("world").style.borderColor = 'transparent';

             return created;
        }

    document.getElementById('Exit').onclick = function(e){
        window.close(src='index.html');
        recordedVideo.pause();
    }
