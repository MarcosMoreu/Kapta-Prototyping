var boundsLayer
var openmap = function(){

  setTimeout(function(){
  document.getElementById('modal').style.display = 'none'
  document.getElementById('initialscreen2options').style.display = 'none'
  document.getElementById("inputtopic").style.display = "none";
  document.getElementById("map").style.opacity = 1;
  document.getElementById("confirmuploadedmap").style.display = "initial";
  document.getElementById("screenshot").style.opacity = 0
  document.getElementById("screenshot").style.display = 'initial'
  document.getElementById('screenshot').disabled = false

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
      boundsLayer = layerChatGeom.getBounds()

      map.dragging.disable();
      map.touchZoom.disable();
      setTimeout(function(){
        map.flyToBounds(boundsLayer,{
          maxZoom:16,
          paddingBottomRight: [0, 0]
      });
      map.on('zoomend', function(e) {

        if(screenshotTaken == false){
          screenshotTaken = true
        layerChatGeom.addTo(map)
        scale.addTo(map);
        var leafletScalestyle = document.getElementsByClassName("leaflet-control-scale-line")
        leafletScalestyle[0].style.backgroundColor = 'transparent'
        leafletScalestyle[0].style.color = '#808080'
        // screenshot.click()
        map.dragging.enable();
        map.touchZoom.enable();
        document.getElementById('confirmuploadedmap').style.opacity = '1'
        document.getElementById('confirmuploadedmap').disabled = false
        document.getElementById('gobackUploadmap').style.opacity = '1'
        document.getElementById('gobackUploadmap').disabled = false
        gpsButton.button.style.opacity = '1'
        basemapButton.button.style.opacity = '1'
        gpsButton.button.disabled = false
        basemapButton.button.disabled = false

        }
      })
      },200)
      var leafletAttrib1style1 = document.getElementsByClassName("leaflet-bottom leaflet-right")
      leafletAttrib1style1[0].style.backgroundColor = 'transparent'
      var leafletAttrib1style2 = document.getElementsByClassName("leaflet-control-attribution leaflet-control")
      leafletAttrib1style2[0].style.backgroundColor = 'transparent'
      leafletAttrib1style2[0].style.color = '#808080'

      
      },200)
return  boundsLayer
}


var stats = 'Stats here'

document.getElementById('KaptaLite').onclick = function(){
  document.getElementById('KaptaLite').style.backgroundColor = '#c4c3c3'

  setTimeout(function(){
    document.getElementById('KaptaLite').style.backgroundColor = 'white'

  document.getElementById('initialscreen2options').style.display = 'initial'
  document.getElementById('languages').style.display = 'none'
  document.getElementById('upload').style.display = 'initial'
  document.getElementById('kaptalitetutorial').style.display = 'initial'
  document.getElementById('maprequests').style.display = 'initial'

document.getElementById('gobackToInitialKaptalite').style.display = 'initial'
  document.getElementById('KaptaLite').style.display = 'none'
  document.getElementById('KaptaAdvanced').style.display = 'none'
  document.getElementById('asktheteam').style.display = 'none'
  document.getElementById('kaptainitialscreen').style.display = 'none'
  },200)
}
document.getElementById('KaptaAdvanced').onclick = function(){
  setTimeout(function(){

  document.getElementById('KaptaAdvanced').innerHTML = '🚧 🚧'
  setTimeout(function(){
    document.getElementById('KaptaAdvanced').innerHTML = 'Kapta'
  },2000)
  },200)
}

document.getElementById('asktheteam').onclick = function(){
  document.getElementById('asktheteam').style.backgroundColor = '#a6a4a4'
  setTimeout(function(){
    window.location.href="https://wa.me/+34678380944?";
    document.getElementById('asktheteam').style.backgroundColor = 'white'

  },500)
}


var youtubeVideoLoaded = false

document.getElementById('kaptalitetutorial').onclick = function(){
  document.getElementById('kaptalitetutorial').style.display = 'none'
  document.getElementById('maprequests').style.display = 'none'

  document.getElementById('upload').style.display = 'none'
  document.getElementById('gobackToInitialKaptalite').style.display = 'none'
  document.getElementById('youtubeVideo').style.display = 'initial'

  document.getElementById('gobackfromtutorial').style.display = 'initial'

}
document.getElementById('maprequests').onclick = function(){
  document.getElementById('kaptalitetutorial').style.display = 'none'
  document.getElementById('maprequests').style.display = 'none'
  document.getElementById('upload').style.display = 'none'
  document.getElementById('gobackToInitialKaptalite').style.display = 'none'
  document.getElementById('maprequestscontent').style.display = 'initial'

  document.getElementById('gobackfromtutorial').style.display = 'initial'

}
document.getElementById('gobackfromtutorial').onclick = function(){
    var storeIframeURL = document.getElementById("youtubeVideo").src
    document.getElementById('kaptalitetutorial').style.display = 'initial'
    document.getElementById('maprequests').style.display = 'initial'
    document.getElementById('upload').style.display = 'initial'
    document.getElementById('gobackToInitialKaptalite').style.display = 'initial'
    document.getElementById('gobackfromtutorial').style.display = 'none'
    document.getElementById('youtubeVideo').style.display = 'none'
    document.getElementById('maprequestscontent').style.display = 'none'

    
}

document.getElementById('gobackToInitialKaptalite').onclick = function(){
  setTimeout(function(){

  document.getElementById('kaptalitetutorial').style.display = 'none'
  document.getElementById('maprequests').style.display = 'none'

  document.getElementById('upload').style.display = 'none'
  document.getElementById('gobackToInitialKaptalite').style.display = 'none'
  document.getElementById("inputtopiclabel").style.display = "none";
  document.getElementById("inputgoallabel").style.display = "none";
  document.getElementById("inputtopic").style.display = "none";
  document.getElementById("inputgoal").style.display = "none";
  document.getElementById('languages').style.display = 'initial'
  document.getElementById('KaptaLite').style.display = 'initial'
  document.getElementById('KaptaAdvanced').style.display = 'initial'
  document.getElementById('asktheteam').style.display = 'initial'
  document.getElementById('kaptainitialscreen').style.display = 'initial'
  document.querySelector('input[type=file]').value = ''
  },200)
}


document.getElementById('gobackUploadmap').onclick = function(){
  document.getElementById('gobackUploadmap').style.backgroundColor = '#696868';
  document.getElementById('gobackUploadmap').style.borderColor = '#696868';

  setTimeout(function(){
    document.getElementById('gobackUploadmap').style.backgroundColor = '#afafaf';
    document.getElementById('gobackUploadmap').style.borderColor = '#afafaf';


  gobackUploadmap = true
  document.getElementById("gobackUploadmap").style.display = "none";
  document.getElementById("gobackToInitialKaptalite").style.display = "none";

  document.getElementById("confirmuploadedmap").style.display = "none";
  document.getElementById("gobackToMap").style.display = "none";
  document.getElementById('asktheteam').style.display = 'none'
  document.getElementById('kaptalitetutorial').style.display = 'none'
  
  document.getElementById('maprequests').style.display = 'none'
  document.getElementById('upload').style.display = 'none'
  document.getElementById('gobackToInitialKaptalite').style.display = 'none'
  
  document.getElementById("inputtopiclabel").style.display = "none";
  document.getElementById("inputgoallabel").style.display = "none";
  document.getElementById("inputtopic").style.display = "none";
  document.getElementById("inputgoal").style.display = "none";

  document.getElementById("initialscreen2options").style.display = "initial";
  document.getElementById('initialscreen2options').style.backgroundColor = '#c00000'
  document.getElementById("map").style.opacity = 1;


  document.getElementById('languages').style.display = 'initial'
  document.getElementById('KaptaLite').style.display = 'initial'
  document.getElementById('KaptaAdvanced').style.display = 'initial'
  document.getElementById('asktheteam').style.display = 'initial'
  document.getElementById('kaptainitialscreen').style.display = 'initial'
  document.querySelector('input[type=file]').value = ''
  document.getElementById('confirmuploadedmap').style.opacity = '1'
  document.getElementById('confirmuploadedmap').disabled = false
  document.getElementById('gobackUploadmap').style.opacity = '1'
  document.getElementById('gobackUploadmap').disabled = false
  gpsButton.button.style.opacity = '1'
  basemapButton.button.style.opacity = '1'
  gpsButton.button.disabled = false
  basemapButton.button.disabled = false
  },300)
return gobackUploadmap
}

document.getElementById('confirmuploadedmap').onclick = function(){
  document.getElementById('confirmuploadedmap').style.backgroundColor = '#696868';
  document.getElementById('confirmuploadedmap').style.borderColor = '#696868';
  setTimeout(function(){
    document.getElementById('confirmuploadedmap').style.backgroundColor = '#afafaf';
    document.getElementById('confirmuploadedmap').style.borderColor = '#afafaf';

  currentZoom = map.getZoom()

  document.getElementById('initialscreen2options').style.display = 'initial'
  document.getElementById('languages').style.display = 'none'
  document.getElementById('upload').style.display = 'none'
  document.getElementById('kaptalitetutorial').style.display = 'none'
  document.getElementById('maprequests').style.display = 'none'

  document.getElementById('gobackToInitialKaptalite').style.display = 'none'
  document.getElementById('KaptaLite').style.display = 'none'
  document.getElementById('KaptaAdvanced').style.display = 'none'
  document.getElementById("inputtopiclabel").style.display = "none";
  document.getElementById("inputgoallabel").style.display = "none";
 
  document.getElementById('asktheteam').style.display = 'none'
  document.getElementById('switches').style.display = 'initial'
  document.getElementById("inputtopiclabel").style.display = "initial";
  document.getElementById("inputgoallabel").style.display = "initial";
  document.getElementById("inputtopic").style.display = "initial";
  document.getElementById("inputgoal").style.display = "initial";
  document.getElementById("gobackToMap").style.display = "initial";
  document.getElementById("confirmDataSubmision").style.display = "initial";
  document.getElementById("datasovmessage").style.display = "initial";
  document.getElementById("moredatasovinfo").style.display = "initial";
  document.getElementById("inputtopiclabel").style.display = "initial";
  document.getElementById("inputtopic").style.display = "initial";
  document.getElementById("inputgoallabel").style.display = "initial";
  document.getElementById("inputgoal").style.display = "initial";

  
  },300)


  return currentZoom //&& mapdataarray
}
document.getElementById('gobackToMap').onclick = function(){  // this applies to both screens
  map.dragging.enable()
  map.touchZoom.enable();
  map.doubleClickZoom.enable();
  $('#screenshots').empty() // this is to clear the cancelled screenshots
  try{
    filesArrayScreenshot[0] = null
  }catch(e){}
  console.log(filesArrayScreenshot)

  setTimeout(function(){
  if(lastscreen == false){
    document.getElementById('initialscreen2options').style.display = 'none'
    document.getElementById('switches').style.display = "none";
    document.getElementById("confirmDataSubmision").style.display = "none";
    document.getElementById("moredatasovinfo").style.display = "none";
    document.getElementById("datasovmessage").style.display = "none";
    document.getElementById("inputtopiclabel").style.display = "none";
    document.getElementById("inputtopic").style.display = "none";
    document.getElementById("inputgoallabel").style.display = "none";
    document.getElementById("inputgoal").style.display = "none";

  }else{


    document.getElementById("gobackToMap").style.display = "none";
    document.getElementById('shareYourImageMap').style.display = 'none'
    document.getElementById('shareYourMapdata').style.display = 'none'

    document.getElementById('finalmessage').style.display = "none";
    document.getElementById('switches').style.display = 'initial'
    document.getElementById("gobackToMap").style.display = "initial";
    document.getElementById("confirmDataSubmision").style.display = "initial";
    document.getElementById('moredatasovinfo').style.display = "initial";
    document.getElementById("datasovmessage").style.display = "initial";
    document.getElementById("inputtopiclabel").style.display = "initial";
    document.getElementById("inputtopic").style.display = "initial";
    document.getElementById("inputgoallabel").style.display = "initial";
    document.getElementById("inputgoal").style.display = "initial";
    gpsButton.button.style.display = 'initial'
    basemapButton.button.style.display = 'initial'
    document.getElementById("confirmuploadedmap").style.display = "initial"
    document.getElementById('initialscreen2options').style.backgroundColor = '#c00000'
    document.getElementById("map").style.opacity = 1;
    //enable map interaction

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
    document.getElementById("moredatasovinfo").style.display = "initial";
    document.getElementById("inputtopiclabel").style.display = "none";
    document.getElementById("inputtopic").style.display = "none";
    document.getElementById("inputgoallabel").style.display = "none";
    document.getElementById("inputgoal").style.display = "none";
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
    document.getElementById("moredatasovinfo").style.display = "initial";
    document.getElementById("inputtopiclabel").style.display = "initial";
    document.getElementById("inputtopic").style.display = "initial";
    document.getElementById("inputgoallabel").style.display = "initial";
    document.getElementById("inputgoal").style.display = "initial";
    moreinfostate = false
  }
},200)
return moreinfostate
}