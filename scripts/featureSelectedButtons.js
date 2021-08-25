//to delete feature
// var initialScreen = true;
// var clickCountDeleteButton = 0;

//var runJSselectFeature = function(){
document.getElementById("backDeleteFeature").onclick = function() {
  console.log(whichLayerIsOn)
  document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null

  aFeatureIsSelected = false
  try{
    document.getElementById("popupAreaLength").disabled = true;
    document.getElementById('commentPopup').disabled = true;
    // document.getElementById('audioControls').style.display = 'none'

  }catch(e){}

    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.dragging.enable();
  //  random_Button.removeFrom(map)
    // myLayer_Button.button.style.opacity = '1';
    // myLayer_Button.button.disabled = false
    // filter_Button.button.style.opacity = '1';
    // filter_Button.button.disabled = false;

    osm_Button.addTo(map);
    googleSat_Button.removeFrom(map);
    planet_Button.removeFrom(map);
    myLayer_Button.addTo(map);
    if(whichLayerIsOn == 'localStorage'){
      filter_Button.removeFrom(map)
      filterLocalStorage_Button.addTo(map)
      filterLocalStorage_Button.button.style.opacity = '1';
      filterLocalStorage_Button.button.disabled = false;
    }else{
      filterLocalStorage_Button.removeFrom(map);
      filter_Button.addTo(map);
    }
    // filterLocalStorage_Button.addTo(map);
    // filter_Button.removeFrom(map)
    //removeMiniMap()
    //miniMap.remove();
    osm_Button.button.style.opacity = '1';
    osm_Button.button.disabled = false;
    googleSat_Button.button.style.opacity = '1';
    googleSat_Button.button.disabled = false;
    planet_Button.button.style.opacity = '1';
    planet_Button.button.disabled = false;
    gps_Button.button.style.opacity = '1';
    gps_Button.button.disabled = false;
    myLayer_Button.button.style.opacity = '1';
    myLayer_Button.button.disabled = false;
    filter_Button.button.style.opacity = '1';
    filter_Button.button.disabled = false;
    filter_Button.button.style.backgroundColor = 'black';

    try { //sometimes this fails
      if (selectedFeature.feature.geometry.type != 'Point') {
        if(whichLayerIsOn == 'localStorage'){
          selectedFeature.setStyle({
              color: '#00FFFB'
          })
        }else{
          selectedFeature.setStyle({
            color: '#AFFDA7'

          })
          isLocalStorage = false
        }

      }

        selectedFeature.editing.disable()
    } catch (e) {}
    map.closePopup();
    // map.zoomOut(1)
    selectedFeature = null
    clickCountDeleteButton = 0
    cartoIdFeatureSelected = null;

    document.getElementById("tutorial").style.display = "initial";
    // document.getElementById("polygon").style.display = "initial";
    // document.getElementById("polyline").style.display = "initial";
    // document.getElementById("point").style.display = "initial";
    document.getElementById("armchair").style.display = "initial";
    document.getElementById("field").style.display = "initial";
    // document.getElementById("gobackArmchairField").style.display = "initial";


    document.getElementById("backDeleteFeature").style.display = "none";
    document.getElementById("deleteFeature").style.display = 'none';
    document.getElementById('deleteFeatureLocalStorage').style.display = 'none'

    document.getElementById("deleteFeature").style.backgroundColor = 'white';
    document.getElementById("deleteFeature").style.borderColor = 'white';
    document.getElementById("imageDeleteFeature").src = 'images/binpre.png';

    // document.getElementById("goBackMessagingApps").style.display = "none";
    // document.getElementById("whatsApp").style.display = "none";
    // document.getElementById("telegram").style.display = 'none';
    // document.getElementById("weChat").style.display = "none";

    document.getElementById("shareMessagingApp").style.opacity = '1';
    document.getElementById("shareMessagingApp").disabled = false;
    document.getElementById("randomSuggestion").style.opacity = '1';
    document.getElementById("randomSuggestion").disabled = false;
    document.getElementById("shareMessagingApp").style.display = "none";
    document.getElementById("randomSuggestion").style.display = "none";

    document.getElementById("classification").style.display = "none";
    document.getElementById("emoji").style.display = "none";
    document.getElementById("emoji").disabled = false;
    document.getElementById("emoji").opacity = '1';
    // document.getElementById('noAudioIOS').style.display = 'none';
    document.getElementById('shareWorldButtonComment').style.display = 'none';
    document.getElementById('shareWorldButtonComment').disabled = false;
    document.getElementById('shareWorldButtonComment').opacity = '1';
    document.getElementById('deleteFeature').style.display = 'none';
    // document.getElementById("enableRecording").style.display = "none";
    // document.getElementById("record").style.display = "none";

    // document.getElementById("commentFeature").style.display = 'none';
    //removeMiniMap()
    //miniMap.remove() //removeFrom(map) is not used anymore

    //to ensure filter button remains green if filter applied
    if(filterApplied == true){ //to avoid that if dilterby date is all, color is not green
      filter_Button.button.style.backgroundColor = 'green'
      filterIsOn = false


    }else{
      filter_Button.button.style.backgroundColor = 'black'
      document.getElementById("Alert").style.display = 'none'
    }

    return selectedFeature && clickCountDeleteButton && cartoIdFeatureSelected && filterIsOn && aFeatureIsSelected && isLocalStorage

}
document.getElementById("shareMessagingApp").onclick = function() {
  if(window.location.href.includes('/?')){ // to avoid shareing geojson if url still contains geojson
    function getSecondPart(str) {
      return str.split('#')[1];
    }
    var urlAfterHash = getSecondPart(window.location.href)
      // window.location.href = 'https://wa.me/?text='+encodeURIComponent('https://amappingprototype.xyz/'+'#'+urlAfterHash)
      var link = '🗺️ 👇🏿'+ "\n" + "\n" + 'https://testing.amappingprototype.xyz/'+'#'+urlAfterHash
      if(navigator.share){
        navigator.share({
          text: link,
          // url:url,
        }).then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }else{
        // console.log(url)
        navigator.clipboard.writeText(link).then(function() {
          alert("Copied to clipboard!");
        }, function() {
          alert("Unable to copy");
        });
      }

    // //console.log(window.location.href)

  }else{
    var link = '🗺️ 👇🏿'+ "\n" + "\n" + window.location.href
    if(navigator.share){
      navigator.share({
        text: link,
        // url:url,
      }).then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }else{
      // console.log(url)
      navigator.clipboard.writeText(link).then(function() {
        alert("Copied to clipboard!");
      }, function() {
        alert("Unable to copy");
      });
    }
  }
  // document.getElementById("backDeleteFeature").style.display = "none";
  // document.getElementById("shareMessagingApp").style.display = "none";
  // document.getElementById("deleteFeature").style.display = "none";
  // document.getElementById("randomSuggestion").style.display = "none";
  // document.getElementById('weChatImage').src = 'images/wechat.png'

  // document.getElementById("whatsApp").style.display = "initial";
  // document.getElementById("telegram").style.display = "initial";
  // document.getElementById("weChat").style.display = "initial";
  // document.getElementById("goBackMessagingApps").style.display = "initial";
  shareURL = 'coords'
  return shareURL
}

// document.getElementById("goBackMessagingApps").onclick = function() {
//   document.getElementById("whatsApp").style.display = "none";
//   document.getElementById("telegram").style.display = "none";
//   document.getElementById("weChat").style.display = "none";
//   document.getElementById("goBackMessagingApps").style.display = "none";
//
//   document.getElementById("backDeleteFeature").style.display = "initial";
//   document.getElementById("shareMessagingApp").style.display = "initial";
//   document.getElementById("deleteFeature").style.display = "initial";
//   document.getElementById("deleteFeature").style.backgroundColor = 'white';
//   document.getElementById("deleteFeature").style.borderColor = 'white';
//   document.getElementById("imageDeleteFeature").src = 'images/binpre.png'
//   document.getElementById("randomSuggestion").style.display = "initial";
//
// }


// document.getElementById("whatsApp").onclick = function() {
//   document.getElementById("Alert").style.display = 'none'
//
//   //console.log(shareURL)
//   //alert('Under development. Available soon.');
//   //  window.location.href = "https://wa.me/whatsappphonenumber/?text=urlencodedtext";
//   if(shareURL == 'coords'){
//     if(url.includes('/?')){ // to avoid shareing geojson if url still contains geojson
//       function getSecondPart(str) {
//         return str.split('#')[1];
//       }
//       var urlAfterHash = getSecondPart(window.location.href)
//         window.location.href = 'https://wa.me/?text='+encodeURIComponent('https://amappingprototype.xyz/'+'#'+urlAfterHash)
//
//       // //console.log(window.location.href)
//
//     }else{
//       window.location.href='https://wa.me/?text='+encodeURIComponent(window.location.href)
//     }
//   }else if(shareURL == 'encodedGeoJSON'){
//     // console.log(propertiesGeoJSONURL.landUsesEmoji)
//     var attributes = propertiesGeoJSONURL.landUsesEmoji
//     var clickableText = 'click me'
//     var clickableTextHyperlinked = clickableText.link(convertedDataShareDirect)
//     window.location.href='https://wa.me/?text='+encodeURIComponent(attributes+ ' '+'   🗺️ 👇'+' '+'https://amappingprototype.xyz/'+'?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z')
//     // window.location.href='https://wa.me/?text='+encodeURIComponent(attributes+ ' '+'👇'+' '+'https://amappingprototype.xyz/'+'?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z')
//
//   }
// }
//
// document.getElementById("telegram").onclick = function() {
//   document.getElementById("Alert").style.display = 'none'
//
// //  alert('🚧 Telegram sharing option not available yet.');
//   if(shareURL == 'coords'){
//     if(url.includes('/?')){ // to avoid shareing geojson if url still contains geojson
//       function getSecondPart(str) {
//         return str.split('#')[1];
//       }
//       var urlAfterHash = getSecondPart(window.location.href)
//         window.location.href = 'https://t.me/share/url?url='+encodeURIComponent('https://amappingprototype.xyz/'+'#'+urlAfterHash)
//
//       // //console.log(window.location.href)
//
//     }else{
//       window.location.href='https://t.me/share/url?url='+encodeURIComponent(window.location.href)
//     }
//
//   }else if(shareURL == 'encodedGeoJSON'){
//     // window.location.href='https://telegram.me/?text='+encodeURIComponent('https://amappingprototype.xyz/'+'?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z')
//     var attributes = propertiesGeoJSONURL.landUsesEmoji
//
//     window.location.href='https://t.me/share/url?url='+encodeURIComponent(attributes+ ' '+'    🗺️ 👇'+' '+'https://amappingprototype.xyz/'+'?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z')
//
//   }
// }
//
// document.getElementById("weChat").onclick = function() {
//   document.getElementById("Alert").style.display = 'none'
//
//   //alert('🚧 WeChat sharing option not available yet.');
//   if(shareURL == 'coords'){
//     if(url.includes('/?')){ // to avoid shareing geojson if url still contains geojson
//       function getSecondPart(str) {
//         return str.split('#')[1];
//       }
//       var urlAfterHash = getSecondPart(window.location.href)
//         window.location.href = 'weixin://?text='+encodeURIComponent('https://amappingprototype.xyz/'+'#'+urlAfterHash)
//
//       // //console.log(window.location.href)
//
//     }else{
//       window.location.href='weixin://?text='+encodeURIComponent(window.location.href)
//     }
//   }else if(shareURL == 'encodedGeoJSON'){
//     // window.location.href='weixin://?text='+encodeURIComponent('https://amappingprototype.xyz/'+'?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z')
//     // window.location.href='sms:1234&body=hi'
//     var attributes = propertiesGeoJSONURL.landUsesEmoji
//     window.location.href='sms:?body='+encodeURIComponent(attributes+ ' '+'    🗺️ 👇'+' '+'https://amappingprototype.xyz/'+'?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z')
//
//   }
//   // window.location.href='weixin://'  // to launch the app without url copied
//
// }



// document.getElementById("telegram").onclick = function() {
// //  alert('🚧 Telegram sharing option not available yet.');
//   if(shareURL == 'coords'){
//     // window.location.href='https://telegram.me/?text='+encodeURIComponent(window.location.href)
//     // window.location.href='https://t.me/share/url?url=https://amappingprototype.xyz/&text='+encodeURIComponent(window.location.href)
//     window.location.href='https://t.me/share/url?url='+encodeURIComponent(window.location.href)
//
//
//   }else if(shareURL == 'encodedGeoJSON'){
//     // window.location.href='https://telegram.me/?text='+encodeURIComponent('https://amappingprototype.xyz/'+'?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z')
//     window.location.href='https://t.me/share/url?url='+encodeURIComponent('https://amappingprototype.xyz/'+'?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z')
//
//   }
// }
//
// document.getElementById("weChat").onclick = function() {
//   //alert('🚧 WeChat sharing option not available yet.');
//   if(shareURL == 'coords'){
//     window.location.href='weixin://?text='+encodeURIComponent(window.location.href)
//   }else if(shareURL == 'encodedGeoJSON'){
//     // window.location.href='weixin://?text='+encodeURIComponent('https://amappingprototype.xyz/'+'?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z')
//     // window.location.href='sms:1234&body=hi'
//     window.location.href='sms:?body='+encodeURIComponent('https://amappingprototype.xyz/'+'?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z')
//
//   }
//   // window.location.href='weixin://'  // to launch the app without url copied
//
// }


var randomFeature
var featureCollForRandom
var randomLayer = function(data) { //function to get layer from carto with 🌐
  featureCollForRandom = data

 return featureCollForRandom
}
document.getElementById("randomSuggestion").onclick = function() {
  document.getElementById("randomSuggestion").style.backgroundColor = 'yellow'
  document.getElementById("randomSuggestion").style.borderColor = 'yellow'
  document.getElementById("randomSuggestion").disabled = true
  document.getElementById("deleteFeature").style.opacity = "0.4";
  document.getElementById("deleteFeature").disabled = true;
  document.getElementById("imageDeleteFeature").src = 'images/binpre.png'
  scale.remove()

  setTimeout(function(){
    document.getElementById("randomSuggestion").style.backgroundColor = '#3B96DD'
    document.getElementById("randomSuggestion").style.borderColor = '#3B96DD'
    document.getElementById("randomSuggestion").disabled = false

  },1800)
  document.getElementById("Alert").style.fontSize = "15px";
  document.getElementById('Alert').innerHTML = '🚧 Under development. At the moment, contributions that start with 🌐 are shown randomly'
  document.getElementById('Alert').style.display = 'initial'
  setTimeout(function(){
    scale.addTo(map)
  },3000)
  setTimeout(function(){
    document.getElementById('Alert').style.display = 'none'
    scale.addTo(map)

  },5000)

  var maxValueDeflated = deflated._layers.length
  var minValueDeflated = (deflated._layers.length) - 10

  //to
  var lengthArray = featureCollForRandom.features.length
  var randomNumberRanged = Math.trunc(Math.random() * lengthArray-1);


  var randomFeatureLngLat = featureCollForRandom.features[randomNumberRanged].geometry.coordinates

  if(randomFeatureLngLat.length == 2){
    randomFeature = [randomFeatureLngLat[1],randomFeatureLngLat[0]] //to convert to latlng
    map.setView(randomFeature,15)
  }else{
    var randomFeatureFirstPoint = randomFeatureLngLat[0][0]
    randomFeature = [randomFeatureFirstPoint[1],randomFeatureFirstPoint[0]]
     map.setView(randomFeature,15)
 }




  //to maintain button and minimap, otherwise is removed
  document.getElementById("backDeleteFeature").style.display = "initial";
  document.getElementById("shareMessagingApp").style.display = "initial";
  document.getElementById("deleteFeature").style.display = "initial";
  document.getElementById("randomSuggestion").style.display = "initial";

  // myLayer_Button.button.style.opacity = '0.4';
  // myLayer_Button.button.disabled = true;
  // filter_Button.button.style.opacity = '0.4';
  // filter_Button.button.disabled = true;
  // filter_Button.button.style.background = 'black'


  // miniMap.addTo(map)
  osm_Button.removeFrom(map);
  googleSat_Button.removeFrom(map);
  planet_Button.removeFrom(map);
  myLayer_Button.removeFrom(map);
  filter_Button.removeFrom(map);
  addMiniMap()

  setTimeout(function(){
    // //console.log(basemapOn)
      //removeMiniMap()
    //miniMap.remove()

      if(basemapOn == 'googleSat'){
        osm_Button.addTo(map);
      }
      if(basemapOn == 'osm'){
        planet_Button.addTo(map);
      }
      if(basemapOn == 'planet'){
        googleSat_Button.addTo(map);
      }
      myLayer_Button.addTo(map);
      filter_Button.addTo(map);
  },1900)

  // document.getElementById("deleteFeature").style.display = "initial";
  // document.getElementById("deleteFeature").style.backgroundColor = 'white';
  document.getElementById("tutorial").style.display = "none";
  document.getElementById("polygon").style.display = "none";
  document.getElementById("polyline").style.display = "none";
  document.getElementById("point").style.display = "none";
  document.getElementById("armchair").style.display = "none";
  document.getElementById("field").style.display = "none";
  document.getElementById("gobackArmchairField").style.display = "none";

//alert('under development')

}


document.getElementById("deleteFeature").onclick = function() {

    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.dragging.enable();



    if (clickCountDeleteButton == 0) {
        document.getElementById("deleteFeature").style.backgroundColor = 'red';
        document.getElementById("deleteFeature").style.borderColor = 'black';
        document.getElementById("imageDeleteFeature").src = 'images/binpost.png';
        document.getElementById("shareMessagingApp").style.opacity = '0.4';
        document.getElementById("shareMessagingApp").disabled = true;
        document.getElementById("randomSuggestion").style.opacity = '0.4';
        document.getElementById("randomSuggestion").disabled = true;

        clickCountDeleteButton = 1
    } else {
        aFeatureIsSelected = false

        ////console.log('feature deleted')

        osm_Button.addTo(map);
        googleSat_Button.removeFrom(map);
        planet_Button.removeFrom(map);
        myLayer_Button.addTo(map);
        filter_Button.addTo(map);
        osm_Button.button.style.opacity = '1';
        osm_Button.button.disabled = false;
        googleSat_Button.button.style.opacity = '1';
        googleSat_Button.button.disabled = false;
        planet_Button.button.style.opacity = '1';
        planet_Button.button.disabled = false;

        myLayer_Button.button.style.opacity = '1';
        myLayer_Button.button.disabled = false
        filter_Button.button.style.opacity = '1';
        filter_Button.button.disabled = false;

        gps_Button.button.style.opacity = '1';
        gps_Button.button.disabled = false;

        document.getElementById("tutorial").style.display = "initial";
        document.getElementById("field").style.display = "initial";
        document.getElementById("armchair").style.display = "initial";
        // document.getElementById("point").style.display = "initial";
        //removeMiniMap()
        //miniMap.remove()

        document.getElementById("backDeleteFeature").style.display = "none";
        document.getElementById("deleteFeature").style.display = "none";
        document.getElementById("deleteFeature").style.backgroundColor = 'white';
        document.getElementById("deleteFeature").style.borderColor = 'white';
        document.getElementById("imageDeleteFeature").src = 'images/binpre.png';
        document.getElementById("shareMessagingApp").style.opacity = '1';
        document.getElementById("shareMessagingApp").disabled = false;
        document.getElementById("randomSuggestion").style.opacity = '1';
        document.getElementById("randomSuggestion").disabled = false;
        document.getElementById("shareMessagingApp").style.display = "none";
        document.getElementById("randomSuggestion").style.display = "none";



        //  document.getElementById("deleteFeature").style.borderColor = 'white'

        //to remove feature from geoJSON
        deflated.removeLayer(selectedFeature)
        selectedFeature = null

        //we call the setData() function here to delete from cartodb
        setData()
    }
    return selectedFeature && clickCountDeleteButton && clickCountDelete && aFeatureIsSelected
}
