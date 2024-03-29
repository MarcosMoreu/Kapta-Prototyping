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
})


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
var iconBasemap = '<img src="images/sun.png" alt="..." width=30px; height=30px; loading="lazy" text-align="center" style="margin-left:-1px;margin-bottom:5px;" > ';

var basemapButton = L.easyButton({
  id: 'sat',
  class: 'easyButton',
  position: 'topright',
  states: [{
      icon: iconBasemap,
      //stateName: 'check-mark',
      onClick: function(btn, map) {
        basemapButton.button.style.backgroundColor = '#696868';
        setTimeout(function(){
          basemapButton.button.style.backgroundColor = '#afafaf';
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

basemapButton.button.style.width = '40px';
basemapButton.button.style.height = '40px';
basemapButton.button.style.transitionDuration = '.3s';
basemapButton.button.style.backgroundColor = '#afafaf';
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
var iconGPS = '<img src="images/gpslite.png" alt="..." width=30px; height=30px; loading="lazy" text-align="center" style="margin-left:-1px;margin-bottom:5px;" > ';

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
      icon: iconGPS,
      //stateName: 'check-mark',
      onClick: function(btn, map) {

        gpsButton.button.style.backgroundColor = '#696868';
        setTimeout(function(){
          gpsButton.button.style.backgroundColor = '#afafaf';
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

gpsButton.button.style.width = '40px';
gpsButton.button.style.height = '40px';
gpsButton.button.style.transitionDuration = '.3s';
gpsButton.button.style.backgroundColor = '#afafaf';
gpsButton.button.style.borderColor = 'transparent';
// basemapButton.button.style.borderRadius = '25px';

var currentZoom = map.getZoom();

// setTimeout(function(){
//   clearInterval(intervalremoveattributes)
// },2000)
console.log('timestamp',timestamp)
var screenshotTaken = false