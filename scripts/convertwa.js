var contributionid;
var phone = '99999999'; //from modal
var totalcontribmap = 0
var radiusbuffer = 99
var mainattribute = 'quququ'
var attribute1s = 'test'
var attribute1n = 33
var mapdata
var geojsonObfuscated
var timeEnd = new Date();
var date = timeEnd.getFullYear() + '-' + (timeEnd.getMonth() + 1) + '-' + timeEnd.getDate();
var time = timeEnd.getHours() + ":" + timeEnd.getMinutes() + ":" + timeEnd.getSeconds();
var timestamp = date + 'T' + time + 'Z';
var pURL
var datasov
var currentZoom
var communitymapid
var nameOfTheGroup
var mapdataarray
var bounds
var layerChatGeom
var activeBasemap = 'dark'
var currentLocation = []; // variable created to allow the user recenter the map

// mapboxgl.accessToken = 'pk.eyJ1IjoibWFyY29zbW9yZXV1Y2wiLCJhIjoiY2xwZHNlbmFpMDVoZjJpcGJxOHplOGw0ZCJ9.MiHNkvMRkTcfndsLMH166w';
// const map = new mapboxgl.Map({
// container: 'map',
// // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
// style: 'mapbox://styles/mapbox/satellite-streets-v12',
// zoom: 1.5,
// center: [30, 50],
// projection: 'globe',
// // customAttribution: 'Map design by me',
// // attributionControl: 'Leaflet | Mapbox and OpenStreetMap Contributors',
// // attributionControl: false
// });

// map.on('load', () => {
// // Set the default atmosphere style
// map.setFog({
// color: 'grey', // Lower atmosphere
//     'high-color': '#232222', // Upper atmosphere
//     'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
//     'space-color': '#232222', // Background color
//     'star-intensity': 0 // Background star brightness (default 0.35 at low zoooms )
// });
// });

// var intervalremoveattributes = setInterval(function(){
//   try{
//     var mapboxattrib1 = document.getElementsByClassName("mapboxgl-ctrl-bottom-right")
//     mapboxattrib1[0].style.display = 'none'
//     var mapboxattrib2 = document.getElementsByClassName("mapboxgl-ctrl-bottom-left")
//     mapboxattrib2[0].style.display = 'none'
//   }catch(e){
//     console.log('error', e)
//   }

// },50)
var southWest = L.latLng(-70, -180);
var northEast = L.latLng(80, 180);
var map = L.map('map', {
  renderer: L.canvas({padding: 0.5, tolerance: 8}),
  editable: true,
  center: [0, 0], //global center
  zoom: 2,
  minZoom: 2,
  maxZoom: 21,
  zoomControl: false,
  attributionControl: false,

  maxBounds: L.latLngBounds(southWest, northEast)
});
map.addControl(L.control.attribution({
  position: 'bottomright',
  prefix: ''
}));
var scale = L.control.scale({
  maxWidth: 100,
  metric: true,
  imperial: false,
}).addTo(map);


// var basemapDarkButton = L.easyButton({
//   id: 'dark',
//   class: 'easyButton',
//   position: 'topright',
//   //background:'images/forest.png',
//   states: [{
//       // icon: '<img src="images/osm.png" width=40px ; height=40px; style="margin-left:-10px"> ',
//       icon: iconOSM,
//       //  background:"images/forest.png",
//       stateName: 'check-mark',
//       onClick: function(btn, map) {
//         planet_Button.button.style.backgroundColor = 'white';
//         setTimeout(function(){ // to avoid the 1-2 sec waiting while local storage layer is loading
//           planet_Button.button.style.backgroundColor = 'black';
//         },300)

//         // startSearchingLocation()

//         document.getElementById("MapLoading").style.display = 'initial'


//         //   mapCurrentZoom = map.getZoom();
//         //  // //console.log('zoom1', mapCurrentZoom)
//         //   if(mapCurrentZoom >19){
//         //     map.setZoom(19)//because OSM does not provide tiles beyond zoom 19
//         //     mapCurrentZoom = map.getZoom();
//         //   }

//           googleSat.removeFrom(map);
//           map.options.maxZoom = 19; //Set max zoom level as OSM does not serve tiles with 20+ zoom levels
//           map.options.minZoom = 2;
//           osm_Button.removeFrom(map);
//           planet_Button.addTo(map);

//           try{
//             osm.addTo(map);

//             osm.on("load",function() {

//               //console.log("all visible osm tiles have been loaded")
//               // document.getElementById("Alert").style.display = 'none'
//               document.getElementById("MapLoading").style.display = 'none'

//              });

//           }catch{
//             //console.log('error loading osm tiles')
//           }


//           basemapOn = 'osm'
//           return basemapOn;
//       }
//   }]
// });
// basemapDarkButton.button.style.width = '50px';
// basemapDarkButton.button.style.height = '50px';
// basemapDarkButton.button.style.transitionDuration = '.3s';
// basemapDarkButton.button.style.backgroundColor = 'black';



// var basemapDark = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
  var basemapDark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFyY29zbW9yZXV1Y2wiLCJhIjoiY2xwZHNlbmFpMDVoZjJpcGJxOHplOGw0ZCJ9.MiHNkvMRkTcfndsLMH166w', {
    minZoom: 2,
    maxZoom: 21,
    maxNativeZoom: 21,
    opacity: 1,
    savetileend:false,
    cache:false,
    //border: 'solid black 5px',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Leaflet | Mapbox | OSM Contributors',
}).addTo(map);

var basemapSat = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFyY29zbW9yZXV1Y2wiLCJhIjoiY2xwZHNlbmFpMDVoZjJpcGJxOHplOGw0ZCJ9.MiHNkvMRkTcfndsLMH166w', {
  minZoom: 2,
  maxZoom: 21,
  maxNativeZoom: 21,
  opacity: 1,
  // savetileend:true,
  // cache:false,
  //border: 'solid black 5px',
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  attribution: 'Leaflet | Mapbox | OSM Contributors',
})
var iconGOOGLE = '<img src="images/google.png" alt="..." width=40px; height=40px; loading="lazy" text-align="center" style="top:50%;margin-left:-5px" > ';

var basemapButton = L.easyButton({
  id: 'sat',
  class: 'easyButton',
  position: 'topright',
  states: [{
      icon: iconGOOGLE,
      //stateName: 'check-mark',
      onClick: function(btn, map) {
        basemapButton.button.style.backgroundColor = 'white';
        setTimeout(function(){
          basemapButton.button.style.backgroundColor = 'black';
        },300)
        // document.getElementById("MapLoading").style.display = 'initial'

        if(activeBasemap == 'sat'){
          activeBasemap = 'dark'
          basemapSat.removeFrom(map);
          basemapDark.addTo(map);
        }else{
          activeBasemap = 'sat'

          basemapDark.removeFrom(map);
          basemapSat.addTo(map);
        
        }
        return activeBasemap
      }
  }]
}).addTo(map);

basemapButton.button.style.width = '50px';
basemapButton.button.style.height = '50px';
basemapButton.button.style.transitionDuration = '.3s';
basemapButton.button.style.borderColor = 'transparent';
// basemapButton.button.style.borderRadius = '25px';

//for gps location
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;
  currentLocation = [lat, lng];

  

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

var gpsPositionIcon = L.icon({
  className: "GPSIconShadow",
  iconUrl: 'images/manNoOrientation.png',
  iconSize: [50, 50], // size of the icon
  iconAnchor: [25,25], // point of the icon which will correspond to marker's location, relative to its top left showCoverageOnHover

  // shadowUrl:'images/cone.png',
  // shadowSize:   [50,50], // size of the shadow
  // shadowAnchor: [7, 7],  // the same for the shadow
  //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var gpsButton = L.easyButton({
  id: 'gps',
  class: 'easyButton',
  position: 'topleft',
  states: [{
      icon: iconGOOGLE,
      //stateName: 'check-mark',
      onClick: function(btn, map) {
        gpsButton.button.style.backgroundColor = 'white';
        setTimeout(function(){
          gpsButton.button.style.backgroundColor = 'black';
        },300)
        // var currentLocation = navigator.geolocation.getCurrentPosition() 

        // document.getElementById("MapLoading").style.display = 'initial'
        if (currentLocation[0] != null) {
          console.log(currentLocation)
          position = L.marker(currentLocation, {
            icon: gpsPositionIcon,
            // rotationAngle: 90,
            draggable:false,
            zIndexOffset:100
        }).addTo(map);
        map.flyTo(currentLocation, 10);
 
        }
        if (currentLocation[0] == null) {
            //gps_Button.button.style.backgroundColor = 'red';
            document.getElementById('gps').src = 'images/gpsSearching.gif'
            // navigator.geolocation.watchPosition(findBuffer,error,watchPositionOptions);
            // navigator.geolocation.getCurrentPosition()
        }

        return activeBasemap
      }
  }]
}).addTo(map);

gpsButton.button.style.width = '50px';
gpsButton.button.style.height = '50px';
gpsButton.button.style.transitionDuration = '.3s';
gpsButton.button.style.borderColor = 'transparent';
// basemapButton.button.style.borderRadius = '25px';

var currentZoom = map.getZoom();

// setTimeout(function(){
//   clearInterval(intervalremoveattributes)
// },2000)
console.log('timestamp',timestamp)
var screenshotTaken = false
function displayFile(file) {
  document.getElementById('confirmuploadedmap').style.opacity = '0.4'
  document.getElementById('confirmuploadedmap').disabled = true
  document.getElementById('gobackUploadmap').style.opacity = '0.4'
  document.getElementById('gobackUploadmap').disabled = true
  gpsButton.button.disabled = true
  basemapButton.button.disabled = true
  // document.getElementById('MapLoading').style.display = 'initial'
  document.getElementById('upload').style.display = 'none'
  document.getElementById('viewmap').style.display = 'none'
    document.getElementById('languages').style.display = 'none'
    document.getElementById('KaptaLite').style.display = 'none'
    document.getElementById('KaptaAdvanced').style.display = 'none'
    document.getElementById('asktheteam').style.display = 'none'

console.log('manualupload',manualupload)
  // console.log(event.target.files[0])

  if(manualupload == true){ //to differentiate between maual upload or share-target
    var file = event.target.files[0]
  }

    const reader = new FileReader();

    reader.readAsText(file);

    reader.onloadend = function (e) {
    var randomNumber = Math.random();
    randomNumber = randomNumber * 100000;
    communitymapid = Math.round(randomNumber)
    var filecontent = e.target.result;
    console.log('filecontent', filecontent);
    const regexNameofthegroup = /"([^"]*)"/;
    var matchNameofthegroup = filecontent.match(regexNameofthegroup);
    nameOfTheGroup = matchNameofthegroup ? matchNameofthegroup[1] : null;


    const regex = /(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/g;
    let matches;
    const features = [];
    datasov = 'potentiallyopen'
    while ((matches = regex.exec(filecontent)) !== null) {
      totalcontribmap = totalcontribmap + 1
      const latitude = parseFloat(matches[1]);
      const longitude = parseFloat(matches[2]);
      // console.log('totalcontrib',totalcontrib)


      var randomNumber = Math.random();
      randomNumber = randomNumber * 10000000;
      contributionid = Math.round(randomNumber)
      console.log('latitude',latitude)
      console.log('communitymapid',communitymapid)
      console.log('contributionid',contributionid)
      console.log('nameOfTheGroup',nameOfTheGroup);

      features.push({
        type: "Feature",
        properties: {
          
          contributionid: contributionid,
          phone: phone,
          timestamp: timestamp,
          mainattribute: nameOfTheGroup,
          attribute1s: attribute1s,   // no needed
          attribute1n: attribute1n,  // no needed
          datasov: datasov,   // not needed
          totalcontrib: communitymapid, // this is actually the id of the community map
          radiusbuffer: '0', // no need 
        },
        geometry: {
          type: "Point",
          coordinates: [longitude, latitude]
        }
      });
    }

    const geoJson = {
      type: "FeatureCollection",
      features: features
    };
    mapdata = geoJson
    console.log(geoJson);

    // console.log(JSON.stringify(geoJson));
    // setTimeout(function(){
      // document.getElementById('initialscreen2options').style.display = 'none'
      // setTimeout(function(){

      document.getElementById('backFromFilter').style.display = 'none'


      // document.getElementById('initialscreen2options').style.display = 'none'
      document.getElementById("map").style.opacity = 0;
      document.getElementById('MapLoading').style.opacity = 1
      document.getElementById('startmapping').style.backgroundColor = 'white'
      // myLayer_Button.removeFrom(map); //always on as there will always be features in the map, even when first load
     



      console.log(bounds)
        document.getElementById('MapLoading').style.display = 'none'
        // document.getElementById("tutorial").style.display = "none";
        // document.getElementById("armchair").style.display = "none";
        // document.getElementById("field").style.display = "none";
        document.getElementById("kaptalitetutorial").style.display = "none";
        // document.getElementById("gobackUploadmap").style.display = "initial";
        // document.getElementById("confirmuploadedmap").style.display = "initial";
        document.getElementById("inputtextlabel").style.display = "initial";
        document.getElementById("emojionearea").style.display = "initial";
        document.getElementById("emojionearea").value = nameOfTheGroup
        document.getElementById("confirminputtext").style.display = "initial";


        
        // document.getElementById("Alert").style.fontSize = "30px";
        // document.getElementById("Alert").style.textAlign = "center"
        // document.getElementById('Alert').innerHTML = 'Stats here...'
        // document.getElementById("Alert").style.display = 'initial'

  };
  // console.log('totalContributions',totalcontrib)  
  return mapdata && totalcontribmap && nameOfTheGroup && bounds && screenshotTaken && mapdata
}

var topic
document.getElementById('confirminputtext').onclick = function(){
  document.getElementById("confirminputtext").style.backgroundColor = "#a2a1a1";

  setTimeout(function(){
    document.getElementById("confirminputtext").style.backgroundColor = "white";
    document.getElementById('modal').style.display = 'none'

  document.getElementById('initialscreen2options').style.display = 'none'
  document.getElementById("emojionearea").style.display = "none";
  document.getElementById("confirminputtext").style.display = "none";
  // document.getElementById("map").style.display = 'initial';

  document.getElementById("map").style.opacity = 1;
  document.getElementById("gobackUploadmap").style.display = "initial";
  document.getElementById("confirmuploadedmap").style.display = "initial";

  document.getElementById("screenshot").style.opacity = 0
  document.getElementById("screenshot").style.display = 'initial'
  document.getElementById('screenshot').disabled = false
  topic = document.getElementById("emojionearea").value
      var geojsonMarkerOptions = {
        radius: 5,
        fillColor: "red",
        color: "red",
        weight: 0,
        opacity: 1,
        fillOpacity: 0.8
    };
    layerChatGeom = L.geoJson(mapdata, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    })

        bounds = map.getBounds()
      var boundsLayer = layerChatGeom.getBounds()
      //   geoJson.features.forEach(function(feature) {
      //     bounds.extend(feature.geometry.coordinates);
      // });
            map.dragging.disable();
      map.touchZoom.disable();
      setTimeout(function(){
        map.flyToBounds(boundsLayer,{
          maxZoom:16,
          paddingBottomRight: [0, 0]
      });
      map.on('zoomend', function(e) {
        //disable map interaction
        if(screenshotTaken == false){
          screenshotTaken = true
        layerChatGeom.addTo(map)
        screenshot.click()
        map.dragging.enable();
        map.touchZoom.enable();
        document.getElementById('confirmuploadedmap').style.opacity = '1'
        document.getElementById('confirmuploadedmap').disabled = false
        document.getElementById('gobackUploadmap').style.opacity = '1'
        document.getElementById('gobackUploadmap').disabled = false
        gpsButton.button.disabled = false
        basemapButton.button.disabled = false

        }
      })
      },200)

      },200)
return topic
}
document.getElementById('languages').addEventListener('change', function() {
  const language = this.value;
  console.log(`Language selected: ${language}`);
  // Here, you can add code to change the website language
});

var stats = 'Stats here'

document.getElementById('KaptaLite').onclick = function(){
  document.getElementById('KaptaLite').style.backgroundColor = '#c4c3c3'

  setTimeout(function(){
    document.getElementById('KaptaLite').style.backgroundColor = 'white'

  document.getElementById('initialscreen2options').style.display = 'initial'
  document.getElementById('languages').style.display = 'none'
  document.getElementById('upload').style.display = 'initial'
  document.getElementById('kaptalitetutorial').style.display = 'initial'
document.getElementById('gobackToInitialKaptalite').style.display = 'initial'
  document.getElementById('KaptaLite').style.display = 'none'
  document.getElementById('KaptaAdvanced').style.display = 'none'
  document.getElementById('asktheteam').style.display = 'none'
  // document.getElementById('kaptainitialscreen').style.display = 'none'
  },200)
}
document.getElementById('KaptaAdvanced').onclick = function(){
  setTimeout(function(){

  document.getElementById('KaptaAdvanced').innerHTML = '🚧 Under dev. 🚧'
  setTimeout(function(){
    document.getElementById('KaptaAdvanced').innerHTML = 'Kapta'
  },2000)
  },200)
}

document.getElementById('kaptalitetutorial').onclick = function(){
  setTimeout(function(){

  document.getElementById('kaptalitetutorial').innerHTML = '🚧 Under dev.'
  setTimeout(function(){
    document.getElementById('kaptalitetutorial').innerHTML = 'Watch tutorials'
  },2000)
  },200)
}

document.getElementById('gobackToInitialKaptalite').onclick = function(){
  setTimeout(function(){

  document.getElementById('kaptalitetutorial').style.display = 'none'
  document.getElementById('upload').style.display = 'none'
  document.getElementById('gobackToInitialKaptalite').style.display = 'none'
  document.getElementById("inputtextlabel").style.display = "none";
  document.getElementById("emojionearea").style.display = "none";
  document.getElementById("confirminputtext").style.display = "none";
  document.getElementById('languages').style.display = 'initial'
  document.getElementById('KaptaLite').style.display = 'initial'
  document.getElementById('KaptaAdvanced').style.display = 'initial'
  // document.getElementById('disclaimer').style.display = 'initial'
  document.getElementById('asktheteam').style.display = 'initial'
  document.getElementById('kaptainitialscreen').style.display = 'initial'
  document.querySelector('input[type=file]').value = ''
  },200)
}


document.getElementById('gobackUploadmap').onclick = function(){
  setTimeout(function(){

gobackUploadmap = true
  document.getElementById("gobackUploadmap").style.display = "none";
  document.getElementById("gobackToInitialKaptalite").style.display = "none";
  document.getElementById("confirminputtext").style.display = "none";


  document.getElementById("confirmuploadedmap").style.display = "none";
  document.getElementById("gobackToMap").style.display = "none";
  document.getElementById('asktheteam').style.display = 'none'
  document.getElementById('kaptalitetutorial').style.display = 'none'
  
  document.getElementById("inputtextlabel").style.display = "initial";
  document.getElementById("emojionearea").style.display = "initial";
  document.getElementById("emojionearea").value = nameOfTheGroup
  document.getElementById("confirminputtext").style.display = "initial";
  document.getElementById("gobackToInitialKaptalite").style.display = "initial";

  document.getElementById('initialscreen2options').style.display = 'initial'
document.querySelector('input[type=file]').value = ''
  },200)
return gobackUploadmap
}

document.getElementById('confirmuploadedmap').onclick = function(){
  setTimeout(function(){

  currentZoom = map.getZoom()

  document.getElementById('initialscreen2options').style.display = 'initial'
  document.getElementById('languages').style.display = 'none'
  document.getElementById('upload').style.display = 'none'
  document.getElementById('kaptalitetutorial').style.display = 'none'
  document.getElementById('gobackToInitialKaptalite').style.display = 'none'
  document.getElementById('KaptaLite').style.display = 'none'
  document.getElementById('KaptaAdvanced').style.display = 'none'
  document.getElementById("confirminputtext").style.display = "none";
  document.getElementById("inputtextlabel").style.display = "none";
  
  // document.getElementById('openexportedmap').style.display = 'none'

  document.getElementById('disclaimer').style.display = 'none'
  document.getElementById('asktheteam').style.display = 'none'
  document.getElementById('switches').style.display = 'initial'
  document.getElementById('gobackUploadmap').style.display = 'initial'
  document.getElementById("gobackToMap").style.display = "initial";
  document.getElementById("confirmDataSubmision").style.display = "initial";
  document.getElementById("datasovmessage").style.display = "initial";
  document.getElementById("moredatasovinfo").style.display = "initial";
  },200)

  // console.log('totalContributions',totalcontrib)  

//   async function convertGeoJSONToBlob(mapdata) {
//     return new Promise((resolve, reject) => {
//         try {
//             // Convert GeoJSON object to a string
//             const geoJSONString = JSON.stringify(mapdata);
            
            
//             // Create a Blob from the GeoJSON string
//             const blob = new Blob([geoJSONString], {type: 'application/json'});
//             var testBlob1 = blob

//             // Optional: Create a URL from the Blob
//             const url = URL.createObjectURL(blob);
            
//             // Create a File from the Blob
//             const fileName = 'geojson_data.json';
//             const file = new File([blob], fileName, {type: testBlob1.type});
//             // var file = new File([testBlob],nameFile, {type: testBlob1.type });

//             mapdataarray = [file]

            
//             // Resolve the promise with the Blob, URL, and File
//             resolve({blob, url, file});
//         } catch (error) {
//             // Reject the promise if any error occurs
//             reject(error);
//         }
//     });
//   return mapdataarray
// }
// convertGeoJSONToBlob(mapdata)
  return currentZoom //&& mapdataarray
}
document.getElementById('gobackToMap').onclick = function(){  // this applies to both screens
  setTimeout(function(){
  if(lastscreen == false){
    document.getElementById('initialscreen2options').style.display = 'none'
    document.getElementById('switches').style.display = "none";
    document.getElementById("confirmDataSubmision").style.display = "none";
    document.getElementById("moredatasovinfo").style.display = "none";
    document.getElementById("datasovmessage").style.display = "none";

    

  }else{
    document.getElementById("gobackToMap").style.display = "none";
    document.getElementById('shareYourImageMap').style.display = 'none'
    document.getElementById('shareYourMapdata').style.display = 'none'

    document.getElementById('finalmessage').style.display = "none";
    document.getElementById('switches').style.display = 'initial'
    document.getElementById('gobackUploadmap').style.display = 'initial'
    document.getElementById("gobackToMap").style.display = "initial";
    document.getElementById("confirmDataSubmision").style.display = "initial";
    document.getElementById('moredatasovinfo').style.display = "initial";
    document.getElementById("datasovmessage").style.display = "initial";


    lastscreen = false
  }
},200)
  return lastscreen

}
var moreinfostate = false
document.getElementById('moredatasovinfo').onclick = function(){  // this applies to both screens
  console.log('moreinfostate',moreinfostate)
  setTimeout(function(){
  if(moreinfostate == false){
    document.getElementById('switches').style.display = "none";
    document.getElementById("confirmDataSubmision").style.display = "none";
    document.getElementById("gobackToMap").style.display = "none";
    document.getElementById("datasovmessage").style.display = "none";
    document.getElementById("datasovcontent").style.display = "initial";
    document.getElementById("moredatasovinfo").style.display = "initial";
    document.getElementById("moredatasovinfo").style.borderColor = "grey";




    console.log('moreinfostate false')
    moreinfostate = true


  }else{
    document.getElementById("datasovcontent").style.display = "none";

    document.getElementById('switches').style.display = "initial";
    document.getElementById("confirmDataSubmision").style.display = "initial";
    document.getElementById("gobackToMap").style.display = "initial";
    document.getElementById("datasovmessage").style.display = "initial";
    document.getElementById("moredatasovinfo").style.display = "initial";


    document.getElementById("moredatasovinfo").style.borderColor = "black";
    moreinfostate = false
  }
},200)
return moreinfostate
}
