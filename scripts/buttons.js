
var topic
document.getElementById('confirminputtext').onclick = function(){

  document.getElementById("confirminputtext").style.backgroundColor = "#a2a1a1";
  nameOfTheGroup = document.getElementById("emojionearea").value

  document.getElementById("mapsummary").innerHTML = '</br>' + '<img src="images/icons/icon-72x72.png" text-align="center" alt="..." width=40px; height=40px style="top:50%; margin-left:-2px" >  ' + '<img src="images/WhatsAppicon.png" text-align="center" alt="..." width=30px; height=30px style="top:50%; margin-bottom:3px" > ' + '</br>' + nameOfTheGroup + '</br> ' + totalcontribmap + ' 📍 ' + '</br>' + date
  document.getElementById("mapsummary").style.display = "initial"


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
        scale.addTo(map);
        var leafletScalestyle = document.getElementsByClassName("leaflet-control-scale-line")
        leafletScalestyle[0].style.backgroundColor = 'transparent'
        leafletScalestyle[0].style.color = '#808080'
        screenshot.click()
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
return topic
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
  // document.getElementById('talk').style.borderColor = '#404040'
  setTimeout(function(){
    // document.getElementById("Alert").style.display = 'none'
    window.location.href="https://wa.me/+34678380944?";
    document.getElementById('asktheteam').style.backgroundColor = 'white'


  },500)
  // window.location.href="https://wa.me/+34678380944?' + textwhatsappencoded + '";
}


var youtubeVideoLoaded = false

document.getElementById('kaptalitetutorial').onclick = function(){
  document.getElementById('kaptalitetutorial').style.display = 'none'
  document.getElementById('upload').style.display = 'none'
  document.getElementById('gobackToInitialKaptalite').style.display = 'none'
  document.getElementById('youtubeVideo').style.display = 'initial'

  document.getElementById('gobackfromtutorial').style.display = 'initial'

}
document.getElementById('gobackfromtutorial').onclick = function(){
    var storeIframeURL = document.getElementById("youtubeVideo").src
    document.getElementById('kaptalitetutorial').style.display = 'initial'
    document.getElementById('upload').style.display = 'initial'
    document.getElementById('gobackToInitialKaptalite').style.display = 'initial'
    document.getElementById('gobackfromtutorial').style.display = 'none'
    document.getElementById('youtubeVideo').style.display = 'none'
    
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
  document.getElementById('gobackUploadmap').style.backgroundColor = '#696868';
  document.getElementById('gobackUploadmap').style.borderColor = '#696868';


  setTimeout(function(){
    document.getElementById('gobackUploadmap').style.backgroundColor = '#afafaf';
    document.getElementById('gobackUploadmap').style.borderColor = '#afafaf';


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
  document.getElementById('gobackToInitialKaptalite').style.display = 'none'
  document.getElementById('KaptaLite').style.display = 'none'
  document.getElementById('KaptaAdvanced').style.display = 'none'
  document.getElementById("confirminputtext").style.display = "none";
  document.getElementById("inputtextlabel").style.display = "none";
  
  document.getElementById('asktheteam').style.display = 'none'
  document.getElementById('switches').style.display = 'initial'
  document.getElementById('gobackUploadmap').style.display = 'initial'
  document.getElementById("gobackToMap").style.display = "initial";
  document.getElementById("confirmDataSubmision").style.display = "initial";
  document.getElementById("datasovmessage").style.display = "initial";
  document.getElementById("moredatasovinfo").style.display = "initial";
  },300)


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