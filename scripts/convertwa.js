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


function displayFile(file) {
  document.getElementById('confirmuploadedmap').style.opacity = '0.4'
  document.getElementById('confirmuploadedmap').disabled = true
  document.getElementById('gobackUploadmap').style.opacity = '0.4'
  document.getElementById('gobackUploadmap').disabled = true
  gpsButton.button.style.opacity = '0.4'
  basemapButton.button.style.opacity = '0.4'

  gpsButton.button.disabled = true
  basemapButton.button.disabled = true
  // document.getElementById('MapLoading').style.display = 'initial'
  document.getElementById('upload').style.display = 'none'
  // document.getElementById('viewmap').style.display = 'none'
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
      // console.log('latitude',latitude)
      // console.log('communitymapid',communitymapid)
      // console.log('contributionid',contributionid)
      // console.log('nameOfTheGroup',nameOfTheGroup);

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

      // document.getElementById('backFromFilter').style.display = 'none'


      // document.getElementById('initialscreen2options').style.display = 'none'
      document.getElementById("map").style.opacity = 0;
      document.getElementById('MapLoading').style.opacity = 1
      // document.getElementById('startmapping').style.backgroundColor = 'white'
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

