///////////////////   to download tiles leaflet.offline   //////////////////////////
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
