document.getElementById("editDeletePopup").onclick = function() {

  document.getElementById("editDeletePopup").style.display = "none";

  document.getElementById("backDeleteFeature").style.display = "none";
  document.getElementById("shareMessagingApp").style.display = "none";
  document.getElementById("deleteFeature").style.display = "none";
  document.getElementById("randomSuggestion").style.display = "none";

  document.getElementById("goBackMessagingApps").style.display = "none";
  document.getElementById("whatsApp").style.display = "none";
  document.getElementById("telegram").style.display = "none";
  document.getElementById("weChat").style.display = "none";

  gps_Button.button.style.opacity = '0.4';
  gps_Button.button.disabled = true;

  document.getElementById('deleteInPopUp').style.display = 'initial';
  document.getElementById('toCommentPopup').style.display = 'initial';
  document.getElementById('backEditDelete').style.display = 'initial';
  document.getElementById("classification").style.display = "initial";
  document.getElementById("emoji").style.display = "initial";
  // document.getElementById("emoji").disabled = true;
  // document.getElementById("emoji").style.opacity = '0.4';
  document.getElementById('noAudioIOS').style.display = 'initial';
  document.getElementById('noAudioIOS').disabled = true;
  document.getElementById('noAudioIOS').style.opacity = '0.4';
  // document.getElementById('share-download').style.display = 'initial';
  // document.getElementById('share-download').disabled = true;
  // document.getElementById('share-download').style.opacity = '0.4';
  document.getElementById('shareWorldButtonComment').style.display = 'initial';


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

  var refreshPopupComment = setInterval(function() {
    console.log('refreshingpopcomment')

      //the problem with document.getElementById('emojionearea').value is that it only updates when the text box is not selected, which is as issue. TextContent methodworks
      //well, except that it does not capture emojis
      var emojioneareaeditor = document.getElementsByClassName('emojionearea-editor')
    //  //console.log(emojioneareaeditor)
      var emojioneareaeditor0 = emojioneareaeditor[0]
    //  //console.log(emojioneareaeditor0)
      var emojioneareaeditor0innerHTML = emojioneareaeditor0.innerHTML /////////////////////////////////////////////11111111111111111111111ddddddddddddddddddddddddddddddESTE!!!
      console.log(emojioneareaeditor0innerHTML)

  //    //console.log(emojioneareaeditor[0].textContent.lenght)
      if (emojioneareaeditor0innerHTML.length == 0) { //to show '...' while the textbox is empty of characters (both letter and emojis)
          // layer.bindPopup(popupContent).addTo(map);
          // layer.bindPopup(popupContent).openPopup(); ///automatically shows the pop up!
        console.log('innerhtml is null')

          // if (audioRecorded == false) {
          //     document.getElementById("shareWorldButtonComment").style.opacity = "0.35"; //to disable button until user adds attributes, either with audio or text
          //     document.getElementById("shareWorldButtonComment").disabled = true;
          // }
      } else {
          //
          // layer.bindPopup(emojioneareaeditor0innerHTML).addTo(map);
          // layer.bindPopup(emojioneareaeditor0innerHTML).openPopup(); ///automatically shows the pop up!
        console.log('innerhtml is not null')
          document.getElementById("shareWorldButtonComment").style.opacity = "1"; //to disable button until user adds attributes, either with audio or text
          document.getElementById("shareWorldButtonComment").disabled = false;
          //to update blue box as emojitext updates
          document.getElementById("toCommentPopup").innerHTML = emojioneareaeditor0innerHTML;
      }
  }, 1000) // time frequency to refresh the content in the popup


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
  document.getElementById('shareWorldButtonComment').style.display = 'none';
  document.getElementById('shareWorldButtonComment').disabled = false;
  document.getElementById('shareWorldButtonComment').opacity = '1';
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
  myLayer_Button.button.style.opacity = '1';
  myLayer_Button.button.disabled = false;
  filter_Button.button.style.opacity = '1';
  filter_Button.button.disabled = false;

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
