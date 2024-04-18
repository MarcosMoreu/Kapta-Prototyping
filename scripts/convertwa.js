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
var nameOftheGoal
var mapdataarray
var bounds
var layerChatGeom
var activeBasemap = 'dark'
var currentLocation = []; // variable created to allow the user recenter the map
var filedisplayed = false


function displayFile(file) {
  const setUIElements = () => {
    filedisplayed = true;
    document.getElementById('confirmuploadedmap').style.opacity = '0.4';
    document.getElementById('confirmuploadedmap').disabled = true;
    document.getElementById('gobackUploadmap').style.opacity = '0.4';
    document.getElementById('gobackUploadmap').disabled = true;
    gpsButton.button.style.opacity = '0.4';
    basemapButton.button.style.opacity = '0.4';
    gpsButton.button.disabled = true;
    basemapButton.button.disabled = true;
    document.getElementById('upload').style.display = 'none';
    document.getElementById('languages').style.display = 'none';
    document.getElementById('KaptaLite').style.display = 'none';
    document.getElementById('KaptaAdvanced').style.display = 'none';
    document.getElementById('asktheteam').style.display = 'none';
  };

  setUIElements();

  if(manualupload == true){
    file = event.target.files[0];
  }

  if (file.name.endsWith('.zip')) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = function(e) {
      const arrayBuffer = e.target.result;
      const zip = new JSZip();
      zip.loadAsync(arrayBuffer).then(function(contents) {
        Object.keys(contents.files).forEach(function(filename) {
          if (filename.endsWith('.txt')) {
            zip.file(filename).async('string').then(function(fileContent) {
              processTextFile(fileContent);
            });
          }
        });
      });
    };
  } else if (file.name.endsWith('.txt')) {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = function(e) {
      processTextFile(e.target.result);
    };
  } else {
    console.log('Unsupported file format');
  }
}

function processTextFile(fileContent) {
  var randomNumber = Math.random();
  randomNumber = randomNumber * 100000;
  communitymapid = Math.round(randomNumber);
  console.log('filecontent', fileContent);
  const regexNameofthegroup = /"([^"]*)"/;
  var matchNameofthegroup = fileContent.match(regexNameofthegroup);
  nameOfTheGroup = matchNameofthegroup ? matchNameofthegroup[1] : null;

  const regex = /(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/g;
  let matches;
  const features = [];
  datasov = 'potentiallyopen';
  while ((matches = regex.exec(fileContent)) !== null) {
    totalcontribmap = totalcontribmap + 1;
    const latitude = parseFloat(matches[1]);
    const longitude = parseFloat(matches[2]);

    randomNumber = Math.random();
    randomNumber = randomNumber * 10000000;
    contributionid = Math.round(randomNumber);

    features.push({
      type: "Feature",
      properties: {
        contributionid: contributionid,
        phone: phone,
        timestamp: timestamp,
        mainattribute: nameOfTheGroup,
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
  mapdata = geoJson;
  console.log(geoJson);

  document.getElementById("map").style.opacity = 1;
  document.getElementById('MapLoading').style.opacity = 1;
  document.getElementById('MapLoading').style.display = 'none';
  document.getElementById("kaptalitetutorial").style.display = "none";
  openmap();
}


