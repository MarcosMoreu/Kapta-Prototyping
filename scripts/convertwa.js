//DB columns
var contributionid;
var totalcontribmap = 0
var mainattribute
var attribute1s
var attribute2n
var attribute3s
var attribute4n
var username = localStorage.getItem('username')
var phone = localStorage.getItem('phone')
  var timeEnd = new Date();
  var date = timeEnd.getFullYear() + '-' + (timeEnd.getMonth() + 1) + '-' + timeEnd.getDate();
  var time = timeEnd.getHours() + ":" + timeEnd.getMinutes() + ":" + timeEnd.getSeconds();
var timestamp = date + 'T' + time + 'Z';
///////////////
var mapdata
var geojsonObfuscated
var pURL
// var datasov
var currentZoom
var communitymapid
var nameOfTheGroup
var locationDescription
var attribute3s
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

//this script has been mainly developed by ChatGPT. The prompt were something like given an input text file, extract the name of the group, the location and the description of the location
//The aim here is to store the decription of the location in attribute3s. That is, all the messages in between 2 locations shared in the WhatsApp group will be stored in attribute3s of location 1
//Once it was working, the script was rewriten by ChatGPT to process the input text file in batches to improve performance
//This requires a lot of improvements


function processTextFile(fileContent) {
  var batchSize = 1000; // Size of each batch in lines
  var lines = fileContent.split("\n");
  var batchIndex = 0;

  var communitymapid = Math.round(Math.random() * 100000);
  console.log('filecontent', fileContent);
  const regexNameofthegroup = /"([^"]*)"/;
  var matchNameofthegroup = fileContent.match(regexNameofthegroup);
  var nameOfTheGroup = matchNameofthegroup ? matchNameofthegroup[1] : null;
  var locationRegex = /location: https:\/\/maps\.google\.com\/\?q=(-?\d+\.\d+),(-?\d+\.\d+)([\s\S]*?)(?=location: https:\/\/maps\.google\.com\/\?q=|$)/g;

  const features = [];
  
  function processBatch(batch) {
      var batchContent = batch.join("\n");
      var match;
      while ((match = locationRegex.exec(batchContent)) !== null) {
        totalcontribmap = totalcontribmap + 1;
          const latitude = parseFloat(match[1]);
          const longitude = parseFloat(match[2]);
          const locationDescription = match[3].trim(); // Trimming to remove any leading/trailing whitespace

          var contributionid = Math.round(Math.random() * 10000000);

          features.push({
              type: "Feature",
              properties: {
                  contributionid: contributionid,
                  username: username, // assuming 'username' is defined somewhere in your scope
                  timestamp: timestamp, // assuming 'timestamp' is defined somewhere in your scope
                  mainattribute: nameOfTheGroup,
                  attribute1s: 'tofill', // Assuming placeholder values
                  attribute2n: 'null',
                  attribute3s: locationDescription, // Using captured description
                  attribute4n: 'null',
                  phone: phone // assuming 'phone' is defined somewhere in your scope
              },
              geometry: {
                  type: "Point",
                  coordinates: [longitude, latitude]
              }
          });
      }
  }

  while (batchIndex * batchSize < lines.length) {
      var batch = lines.slice(batchIndex * batchSize, (batchIndex + 1) * batchSize);
      processBatch(batch);
      batchIndex++;
  }

  var geoJson = {
      type: "FeatureCollection",
      features: features
  };
  mapdata = geoJson;
  console.log(geoJson);

  document.getElementById("map").style.opacity = 1;
  document.getElementById('MapLoading').style.opacity = 0;
  document.getElementById('MapLoading').style.display = 'none';
  document.getElementById("kaptalitetutorial").style.display = "none";
  document.getElementById('maprequests').style.display = 'none';

  openmap(); // Assuming this is a function that renders the map
  return totalcontribmap
}




