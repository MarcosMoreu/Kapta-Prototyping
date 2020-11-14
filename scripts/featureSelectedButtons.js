//to delete feature
// var initialScreen = true;
// var clickCountDeleteButton = 0;

//var runJSselectFeature = function(){
document.getElementById("backDeleteFeature").onclick = function() {
  try{
    document.getElementById("popupAreaLength").disabled = true;
    document.getElementById('commentPopup').disabled = true;
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
    filter_Button.addTo(map);
    //removeMiniMap()
    //miniMap.remove();

    gps_Button.button.style.opacity = '1';
    gps_Button.button.disabled = false;
    myLayer_Button.button.style.opacity = '1';
    myLayer_Button.button.disabled = false;
    filter_Button.button.style.opacity = '1';
    filter_Button.button.disabled = false;
    filter_Button.button.style.backgroundColor = 'black';

    try { //sometimes this fails
      if (selectedFeature.feature.geometry.type != 'Point') {
          selectedFeature.setStyle({
              color: '#AFFDA7'
          })
      }

        selectedFeature.editing.disable()
    } catch (e) {}
    map.closePopup();
    // map.zoomOut(1)
    selectedFeature = null
    clickCountDeleteButton = 0
    cartoIdFeatureSelected = null;

    document.getElementById("tutorial").style.display = "initial";
    document.getElementById("polygon").style.display = "initial";
    document.getElementById("polyline").style.display = "initial";
    document.getElementById("point").style.display = "initial";

    document.getElementById("backDeleteFeature").style.display = "none";
    document.getElementById("deleteFeature").style.display = 'none';
    document.getElementById("deleteFeature").style.backgroundColor = 'white';
    document.getElementById("deleteFeature").style.borderColor = 'white';
    document.getElementById("imageDeleteFeature").src = 'images/binpre.png'

    document.getElementById("shareMessagingApp").style.opacity = '1';
    document.getElementById("shareMessagingApp").disabled = false;
    document.getElementById("randomSuggestion").style.opacity = '1';
    document.getElementById("randomSuggestion").disabled = false;
    document.getElementById("shareMessagingApp").style.display = "none";
    document.getElementById("randomSuggestion").style.display = "none";

    // document.getElementById("commentFeature").style.display = 'none';
    //removeMiniMap()
    //miniMap.remove() //removeFrom(map) is not used anymore


    return selectedFeature && clickCountDeleteButton && cartoIdFeatureSelected
}
document.getElementById("shareMessagingApp").onclick = function() {

  document.getElementById("backDeleteFeature").style.display = "none";
  document.getElementById("shareMessagingApp").style.display = "none";
  document.getElementById("deleteFeature").style.display = "none";
  document.getElementById("randomSuggestion").style.display = "none";

  document.getElementById("whatsApp").style.display = "initial";
  document.getElementById("telegram").style.display = "initial";
  document.getElementById("weChat").style.display = "initial";
  document.getElementById("goBackMessagingApps").style.display = "initial";

}

document.getElementById("goBackMessagingApps").onclick = function() {
  document.getElementById("whatsApp").style.display = "none";
  document.getElementById("telegram").style.display = "none";
  document.getElementById("weChat").style.display = "none";
  document.getElementById("goBackMessagingApps").style.display = "none";

  document.getElementById("backDeleteFeature").style.display = "initial";
  document.getElementById("shareMessagingApp").style.display = "initial";
  document.getElementById("deleteFeature").style.display = "initial";
  document.getElementById("deleteFeature").style.backgroundColor = 'white';
  document.getElementById("deleteFeature").style.borderColor = 'white';
  document.getElementById("imageDeleteFeature").src = 'images/binpre.png'
  document.getElementById("randomSuggestion").style.display = "initial";

}

document.getElementById("whatsApp").onclick = function() {
  //alert('Under development. Available soon.');
  //  window.location.href = "https://wa.me/whatsappphonenumber/?text=urlencodedtext";
  window.location.href='https://wa.me/?text='+encodeURIComponent(window.location.href)
}

document.getElementById("telegram").onclick = function() {
//  alert('🚧 Telegram sharing option not available yet.');
  window.location.href='https://telegram.me/?text='+encodeURIComponent(window.location.href)
}

document.getElementById("weChat").onclick = function() {
  //alert('🚧 WeChat sharing option not available yet.');

  // window.location.href='weixin://'  // to launch the app without url copied
  window.location.href='weixin://?text='+encodeURIComponent(window.location.href)

}
document.getElementById("editDeletePopup").onclick = function() {

  document.getElementById("editDeletePopup").style.display = "none";

  document.getElementById("backDeleteFeature").style.display = "none";
  document.getElementById("shareMessagingApp").style.display = "none";
  document.getElementById("deleteFeature").style.display = "none";
  document.getElementById("randomSuggestion").style.display = "none";

  gps_Button.button.style.opacity = '0.4';
  gps_Button.button.disabled = true;

  document.getElementById('deleteInPopUp').style.display = 'initial';
  document.getElementById('toCommentPopup').style.display = 'initial';
  document.getElementById('backEditDelete').style.display = 'initial';
  document.getElementById("classification").style.display = "initial";
  document.getElementById("emoji").style.display = "initial";
  document.getElementById("emoji").disabled = true;
  document.getElementById("emoji").style.opacity = '0.4';
  document.getElementById('noAudioIOS').style.display = 'initial';
  document.getElementById('noAudioIOS').disabled = true;
  document.getElementById('noAudioIOS').style.opacity = '0.4';
  document.getElementById('share-download').style.display = 'initial';
  document.getElementById('share-download').disabled = true;
  document.getElementById('share-download').style.opacity = '0.4';

  try{
    document.getElementById("popupAreaLength").disabled = false;
    document.getElementById('commentPopup').disabled = false;
  }catch(e){}


  // map.click.disable();
  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();

  map.on('click', function(e){
    try{
      document.getElementById('deleteInPopUp').style.display = 'none';
      document.getElementById('toCommentPopup').style.display = 'none';
    }catch(e){}
  })
}

document.getElementById('backEditDelete').onclick = function(){

  document.getElementById("deleteFeature").style.backgroundColor = 'white';
  document.getElementById("deleteFeature").style.borderColor = 'white';
  document.getElementById("imageDeleteFeature").src = 'images/binpre.png';
  document.getElementById("shareMessagingApp").style.opacity = '1';
  document.getElementById("shareMessagingApp").disabled = false;
  document.getElementById("randomSuggestion").style.opacity = '1';
  document.getElementById("randomSuggestion").disabled = false;
  document.getElementById("shareMessagingApp").style.display = "none";
  document.getElementById("randomSuggestion").style.display = "none";
  clickCountDeleteButton = 0;

  try{
    document.getElementById('editDeletePopup').style.display = 'initial'

    document.getElementById('deleteInPopUp').style.display = 'none';
    document.getElementById('toCommentPopup').style.display = 'none';
    document.getElementById("imageDeleteInPopup").style.background = 'white';


  }catch(e){}
  document.getElementById('backEditDelete').style.display = 'none';

  gps_Button.button.style.opacity = '1';
  gps_Button.button.disabled = false;

  document.getElementById("classification").style.display = "none";
  document.getElementById("emoji").style.display = "none";
  document.getElementById("emoji").disabled = false;
  document.getElementById("emoji").opacity = '1';
  document.getElementById('noAudioIOS').style.display = 'none';
  document.getElementById('noAudioIOS').disabled = false;
  document.getElementById('noAudioIOS').opacity = '1';
  document.getElementById('share-download').style.display = 'none';
  document.getElementById('share-download').disabled = false;
  document.getElementById('share-download').opacity = '1';
  document.getElementById('deleteFeature').style.display = 'none';

  document.getElementById("tutorial").style.display = "initial";
  document.getElementById("polygon").style.display = "initial";
  document.getElementById("polyline").style.display = "initial";
  document.getElementById("point").style.display = "initial";

  try{
    document.getElementById("popupAreaLength").disabled = true;
    document.getElementById('commentPopup').disabled = true;
  }catch(e){}

  try { //sometimes this fails
    if (selectedFeature.feature.geometry.type != 'Point') {
        selectedFeature.setStyle({
            color: '#AFFDA7'
        })
    }

       selectedFeature.editing.disable();
      // deflated.editing.disable(); //to do not activate zoomend and move
  } catch (e) {}
  // deflated.removeLayer(selectedFeature)

  osm_Button.addTo(map);
  googleSat_Button.removeFrom(map);
  planet_Button.removeFrom(map);
  myLayer_Button.addTo(map);
  filter_Button.addTo(map);

  map.closePopup();
  try{
    //removeMiniMap()
    //miniMap.remove()
  }catch(e){}

  // map.click.enable();
  map.dragging.enable();
  map.touchZoom.enable();
  map.doubleClickZoom.enable();
  map.scrollWheelZoom.enable();


  selectedFeature = null;
  return selectedFeature && clickCountDeleteButton
}


document.getElementById("randomSuggestion").onclick = function() {
  document.getElementById("randomSuggestion").style.backgroundColor = 'yellow'
  document.getElementById("randomSuggestion").style.borderColor = 'yellow'
  document.getElementById("deleteFeature").style.opacity = "0.4";
  document.getElementById("deleteFeature").disabled = true;
  document.getElementById("imageDeleteFeature").src = 'images/binpre.png'

  setTimeout(function(){
    document.getElementById("randomSuggestion").style.backgroundColor = '#3B96DD'
    document.getElementById("randomSuggestion").style.borderColor = '#3B96DD'

  },500)
  document.getElementById('imageryAlert').style.display = 'initial'
  setTimeout(function(){
    document.getElementById('imageryAlert').style.display = 'none'
  },10000)

  var maxValueDeflated = deflated._layers.length
  var minValueDeflated = (deflated._layers.length) - 10
  //var randomNumberRanged = Math.trunc(Math.random() * (maxValueDeflated - minValueDeflated) + minValueDeflated);
  var randomNumberRanged = Math.trunc(Math.random() * 11);

  var someNeutralPoints = [[51.477965,-0.001467],[-0.000215,37.070231],[13.597167,-88.837874],[35.956888,-5.604401],[41.511377,-0.001191],[78.236011,15.491409],[27.988129,86.924973],[34.391822,132.452095],[46.234107,6.055736],[0.010986,-0.003605],[-30.31276,149.565484]] //Prime meridian1,Estrecho1,Kenyaecuator1,volcan ss1,hiroshima1, everest1, cern1,greenwichspain1,global seed1,nullisland1, australia observatory...
  var pointSelected = someNeutralPoints[randomNumberRanged]
  console.log(pointSelected)
  //console.log(deflated._layers[randomNumberRanged])
  //var randomFeature = deflated._layers[randomNumberRanged]//without   .feature.geometry;
//  map.fitBounds(randomFeature.getBounds());
//
  map.setView(pointSelected,15)

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

addMiniMap()
  // miniMap.addTo(map)
  osm_Button.removeFrom(map);
  googleSat_Button.removeFrom(map);
  planet_Button.removeFrom(map);
  myLayer_Button.removeFrom(map);
  filter_Button.removeFrom(map);

  setTimeout(function(){
    console.log(basemapOn)
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
  },2500)

  // document.getElementById("deleteFeature").style.display = "initial";
  // document.getElementById("deleteFeature").style.backgroundColor = 'white';
  document.getElementById("tutorial").style.display = "none";
  document.getElementById("polygon").style.display = "none";
  document.getElementById("polyline").style.display = "none";
  document.getElementById("point").style.display = "none";
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
        clickCountDeleteButton = 0
        //console.log('feature deleted')

        osm_Button.addTo(map);
        googleSat_Button.removeFrom(map);
        planet_Button.removeFrom(map);
        myLayer_Button.addTo(map);
        filter_Button.addTo(map);

        myLayer_Button.button.style.opacity = '1';
        myLayer_Button.button.disabled = false
        filter_Button.button.style.opacity = '1';
        filter_Button.button.disabled = false;

        gps_Button.button.style.opacity = '1';
        gps_Button.button.disabled = false;

        document.getElementById("tutorial").style.display = "initial";
        document.getElementById("polygon").style.display = "initial";
        document.getElementById("polyline").style.display = "initial";
        document.getElementById("point").style.display = "initial";
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
    return selectedFeature && clickCountDeleteButton && clickCountDelete
}
