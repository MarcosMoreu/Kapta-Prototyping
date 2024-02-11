
function displayFile(file) {

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

    var filecontent = e.target.result;
    console.log('filecontent', filecontent);
    const regex = /(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/g;
    let matches;
    const features = [];

    while ((matches = regex.exec(filecontent)) !== null) {
      const latitude = parseFloat(matches[1]);
      const longitude = parseFloat(matches[2]);

      features.push({
        type: "Feature",
        properties: {},
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

    console.log(JSON.stringify(geoJson));
    // setTimeout(function(){
      // document.getElementById('initialscreen2options').style.display = 'none'
      // setTimeout(function(){

      document.getElementById('backFromFilter').style.display = 'none'


      document.getElementById('initialscreen2options').style.display = 'none'
      document.getElementById("map").style.opacity = 1;
      document.getElementById('MapLoading').style.opacity = 1
      document.getElementById('startmapping').style.backgroundColor = 'white'
      myLayer_Button.removeFrom(map); //always on as there will always be features in the map, even when first load



        // L.geoJSON(geoJson).addTo(map);
        var whatsappgeojson = L.geoJSON(geoJson, {
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
            // onEachFeature: onEachFeatureConfirm,

        }).addTo(map);
        map.fitBounds(whatsappgeojson.getBounds());
        document.getElementById('MapLoading').style.display = 'none'
        document.getElementById("tutorial").style.display = "none";
        document.getElementById("armchair").style.display = "none";
        document.getElementById("field").style.display = "none";
        document.getElementById("gobackUploadmap").style.display = "initial";
        document.getElementById("confirmuploadedmap").style.display = "initial";
        document.getElementById("Alert").style.fontSize = "30px";
        document.getElementById("Alert").style.textAlign = "center"
        document.getElementById('Alert').innerHTML = 'Stats here...'
        document.getElementById("Alert").style.display = 'initial'
        document.getElementById("screenshot").style.opacity = 0
        document.getElementById("screenshot").style.display = 'initial'
        document.getElementById('screenshot').disabled = false
        setTimeout(function(){

        screenshot.click()
      },1000)



  };


document.getElementById('languages').addEventListener('change', function() {
    const language = this.value;
    console.log(`Language selected: ${language}`);
    // Here, you can add code to change the website language
  });
}
var stats = 'Stats here'

document.getElementById('KaptaLite').onclick = function(){

  document.getElementById('initialscreen2options').style.display = 'initial'
  document.getElementById('languages').style.display = 'none'
  document.getElementById('upload').style.display = 'initial'
  document.getElementById('kaptalitetutorial').style.display = 'initial'
document.getElementById('gobackToInitialKaptalite').style.display = 'initial'
  document.getElementById('KaptaLite').style.display = 'none'
  document.getElementById('KaptaAdvanced').style.display = 'none'
  document.getElementById('asktheteam').style.display = 'none'
  document.getElementById('kaptainitialscreen').style.display = 'none'



}
document.getElementById('KaptaAdvanced').onclick = function(){
  document.getElementById('KaptaAdvanced').innerHTML = '!!!Under development'
  setTimeout(function(){
    document.getElementById('KaptaAdvanced').innerHTML = 'Kapta'
  },2000)

}

document.getElementById('kaptalitetutorial').onclick = function(){

  document.getElementById('kaptalitetutorial').innerHTML = '!!!Under development'
  setTimeout(function(){
    document.getElementById('kaptalitetutorial').innerHTML = 'Watch tutorials'
  },2000)

}

document.getElementById('gobackToInitialKaptalite').onclick = function(){
  document.getElementById('kaptalitetutorial').style.display = 'none'
  document.getElementById('upload').style.display = 'none'
  document.getElementById('gobackToInitialKaptalite').style.display = 'none'
  document.getElementById('languages').style.display = 'initial'
  document.getElementById('KaptaLite').style.display = 'initial'
  document.getElementById('KaptaAdvanced').style.display = 'initial'
  // document.getElementById('disclaimer').style.display = 'initial'
  document.getElementById('asktheteam').style.display = 'initial'
  document.getElementById('kaptainitialscreen').style.display = 'initial'

}


document.getElementById('gobackUploadmap').onclick = function(){
gobackUploadmap = true
  document.getElementById("gobackUploadmap").style.display = "none";
  document.getElementById("gobackToInitialKaptalite").style.display = "none";

  document.getElementById("confirmuploadedmap").style.display = "none";
  document.getElementById("gobackToMap").style.display = "none";
  document.getElementById('asktheteam').style.display = 'none'
  document.getElementById('kaptalitetutorial').style.display = 'none'

  document.getElementById('languages').style.display = 'initial'
  document.getElementById('KaptaLite').style.display = 'initial'
  document.getElementById('KaptaAdvanced').style.display = 'initial'
  document.getElementById('asktheteam').style.display = 'initial'
  document.getElementById('kaptainitialscreen').style.display = "initial";
  document.getElementById('initialscreen2options').style.display = 'initial'
document.querySelector('input[type=file]').value = ''

return gobackUploadmap
}

document.getElementById('confirmuploadedmap').onclick = function(){

  document.getElementById('initialscreen2options').style.display = 'initial'
  document.getElementById('languages').style.display = 'none'
  document.getElementById('upload').style.display = 'none'
  document.getElementById('kaptalitetutorial').style.display = 'none'
  document.getElementById('gobackToInitialKaptalite').style.display = 'none'
  document.getElementById('KaptaLite').style.display = 'none'
  document.getElementById('KaptaAdvanced').style.display = 'none'
  // document.getElementById('openexportedmap').style.display = 'none'

  document.getElementById('disclaimer').style.display = 'none'
  document.getElementById('asktheteam').style.display = 'none'
  document.getElementById('switches').style.display = 'initial'
  document.getElementById('gobackUploadmap').style.display = 'initial'
  document.getElementById("gobackToMap").style.display = "initial";
  document.getElementById("confirmDataSubmision").style.display = "initial";

}

let toggleStates = {
  toggle1: false,
  toggle2: false,
  toggle3: false
};
var lastscreen = false

document.getElementById('switch1').addEventListener('change', function() {
  toggleStates.toggle1 = this.checked;
  console.log('switch 1 position',  toggleStates.toggle1)
});

document.getElementById('switch2').addEventListener('change', function() {
  toggleStates.toggle2 = this.checked;
});

document.getElementById('switch3').addEventListener('change', function() {
  toggleStates.toggle3 = this.checked;
});

document.getElementById('gobackToMap').onclick = function(){  // this applies to both screens
  if(lastscreen == false){
    document.getElementById('initialscreen2options').style.display = 'none'
    document.getElementById('switches').style.display = "none";
    document.getElementById("confirmDataSubmision").style.display = "none";

  }else{
    document.getElementById("gobackToMap").style.display = "none";
    document.getElementById('shareYourImageMap').style.display = 'none'
    document.getElementById('finalmessage').style.display = "none";
    document.getElementById('switches').style.display = 'initial'
    document.getElementById('gobackUploadmap').style.display = 'initial'
    document.getElementById("gobackToMap").style.display = "initial";
    document.getElementById("confirmDataSubmision").style.display = "initial";
    lastscreen = false
  }
  return lastscreen

}
document.getElementById('confirmDataSubmision').onclick = function(){
  // document.getElementById("gobackToMap").style.display = "none";
  document.getElementById("confirmDataSubmision").style.display = "none";
  document.getElementById('switches').style.display = "none";
  document.getElementById('kaptainitialscreen').style.display = "none";



  // document.getElementById('initialscreen2options').style.display = 'none'

  document.getElementById('shareYourImageMap').style.display = 'initial'
  document.getElementById('finalmessage').style.display = "initial";
lastscreen = true
return lastscreen

}

document.getElementById('shareYourImageMap').onclick = function(){
var statsDesktop = 'use a phone to share screenshot'
if(navigator.canShare && navigator.canShare({ files: filesArrayScreenshot })){
      console.log('with sreenshot')

      navigator.share({
        files:filesArrayScreenshot, //////////////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        text: stats
        // url:'https://md.kapta.app/?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z',
      }).then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));

  }else{
    try{
      navigator.share({
        // files:filesArray, //////////////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        text: stats,
        // url:'https://md.kapta.app/?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z',
      }).then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }catch(e){
      // console.log(url)
      navigator.clipboard.writeText(statsDesktop).then(function() {
        // console.log(url)

        alert("Copied to clipboard!");
      }, function() {
        alert("Unable to copy");
      });
    }

  }

console.log(filesArrayScreenshot)
}
