var planetKey;
//var sentinelKey;
var firebaseKey;
var firebaseConfig;
var cartousername;
var cartoapiSELECT;

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

var browserLanguage = navigator.language

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

////////////////////////////////////////////////////////      first load         /////////////////////////////////////////////////////////////////////////
var isFirstTime; //var to store if the site is visited for the first time
//var oneMapCompleted; // to know if in this session this is the first map or not

var firstLoad = function() { //fucntion to determine if the site is visited for first time
  //$.getScript("lib/leaflet/plugins/Leaflet.draw-1.0.4/src/Leaflet.Draw.Event.js")
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


//}//run JS Selected feature

///////////////////////////////////////////////////////////////////////////////////////////////////////

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
