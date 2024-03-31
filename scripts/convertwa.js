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

      document.getElementById("map").style.opacity = 0;
      document.getElementById('MapLoading').style.opacity = 1
  
      console.log(bounds)
        document.getElementById('MapLoading').style.display = 'none'

        document.getElementById("kaptalitetutorial").style.display = "none";

        document.getElementById("inputtextlabel").style.display = "initial";
        document.getElementById("emojionearea").style.display = "initial";
        document.getElementById("emojionearea").value = nameOfTheGroup
        document.getElementById("confirminputtext").style.display = "initial";

  };
  // console.log('totalContributions',totalcontrib)  
  return mapdata && totalcontribmap && nameOfTheGroup && bounds && screenshotTaken && mapdata
}

