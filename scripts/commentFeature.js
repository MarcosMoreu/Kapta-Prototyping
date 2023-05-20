
// import * as exports from './filterButtons.js';

var cartoDbIdOfFeatureToEdit
var toCheckIfAudio = document.getElementById("toCommentPopup").innerHTML[0]


document.getElementById("editDeletePopup").onclick = function() {

  document.getElementById("toCommentPopup").innerHTML = '...'
//console.(selectedFeature.feature.properties.cartodb_id)
  cartoDbIdOfFeatureToEdit = selectedFeature.feature.properties.cartodb_id


  document.getElementById("editDeletePopup").style.display = "none";
  // document.getElementById("activatePlay").style.display = "none";

  document.getElementById("backDeleteFeature").style.display = "none";
  document.getElementById("shareMessagingApp").style.display = "none";
  document.getElementById("deleteFeature").style.display = "none";
  document.getElementById("randomSuggestion").style.display = "none";

  // document.getElementById("goBackMessagingApps").style.display = "none";
  // document.getElementById("whatsApp").style.display = "none";
  // document.getElementById("telegram").style.display = "none";
  // document.getElementById("weChat").style.display = "none";

  gps_Button.button.style.opacity = '0.4';
  gps_Button.button.disabled = true;

  // document.getElementById('deleteInPopUp').style.display = 'initial';
  document.getElementById('toCommentPopup').style.display = 'initial';
  document.getElementById('backEditDelete').style.display = 'initial';
  document.getElementById("classification").style.display = "initial";
  document.getElementById("emoji").style.display = "initial";
  // document.getElementById("sapelliProjects").style.display = "initial";

  // if(isIOS == false){
  //   document.getElementById("enableRecording").style.display = "initial";
  // }else{
  //   document.getElementById("noAudioIOS").style.display = "initial";
  // }

  // document.getElementById("emoji").disabled = true;
  // document.getElementById("emoji").style.opacity = '0.4';
  // document.getElementById('noAudioIOS').style.display = 'initial';
  // document.getElementById('noAudioIOS').disabled = true;
  // document.getElementById('noAudioIOS').style.opacity = '0.4';
  // document.getElementById('share-download').style.display = 'initial';
  // document.getElementById('share-download').disabled = true;
  // document.getElementById('share-download').style.opacity = '0.4';
  document.getElementById('shareWorldButtonComment').style.display = 'initial';
  document.getElementById("shareWorldButtonComment").style.opacity = "0.35";
  document.getElementById("shareWorldButtonComment").disabled = true;


  try{
    document.getElementById("popupAreaLength").disabled = false;
    document.getElementById('commentPopup').disabled = false;
    // document.getElementById('audioControls').style.display = 'none'

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
  refreshPopupComment = setInterval(function() {
    //console.log('refreshingpopcomment')

      var emojioneareaeditor = document.getElementsByClassName('emojionearea-editor')
      var emojioneareaeditor0 = emojioneareaeditor[0]
      var emojioneareaeditor0innerHTML = emojioneareaeditor0.innerHTML /////////////////////////////////////////////11111111111111111111111ddddddddddddddddddddddddddddddESTE!!!
      if (emojioneareaeditor0innerHTML.length == 0) { //to show '...' while the textbox is empty of characters (both letter and emojis)

          if (audioRecorded == false) {
              document.getElementById("shareWorldButtonComment").style.opacity = "0.35"; //to disable button until user adds attributes, either with audio or text
              document.getElementById("shareWorldButtonComment").disabled = true;
          }else{
            document.getElementById("shareWorldButtonComment").style.opacity = "1"; //to disable button until user adds attributes, either with audio or text
            document.getElementById("shareWorldButtonComment").disabled = false;
            document.getElementById("toCommentPopup").innerHTML = '🔊' + emojioneareaeditor0innerHTML;

          }
      }else {
          if (audioRecorded == false) {
      //  console.log('innerhtml is not null')
          document.getElementById("shareWorldButtonComment").style.opacity = "1"; //to disable button until user adds attributes, either with audio or text
          document.getElementById("shareWorldButtonComment").disabled = false;
          //to update blue box as emojitext updates
          document.getElementById("toCommentPopup").innerHTML = emojioneareaeditor0innerHTML;
        }else{
          document.getElementById("shareWorldButtonComment").style.opacity = "1"; //to disable button until user adds attributes, either with audio or text
          document.getElementById("shareWorldButtonComment").disabled = false;
          //to update blue box as emojitext updates
          document.getElementById("toCommentPopup").innerHTML = '🔊' + emojioneareaeditor0innerHTML;
        }
      }
  }, 300) // time frequency to refresh the content in the comment popup
  editButtonClicked = true
  //console.(editButtonClicked)

  return editButtonClicked && cartoDbIdOfFeatureToEdit
}

document.getElementById('backEditDelete').onclick = function(){
  aFeatureIsSelected = false
  clearInterval(refreshPopupComment)
  //document.getElementById("toCommentPopup").innerHTML = '...'
  document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null


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
  // document.getElementById('noAudioIOS').style.display = 'none';
  document.getElementById('shareWorldButtonComment').style.display = 'none';
  document.getElementById('shareWorldButtonComment').disabled = false;
  document.getElementById('shareWorldButtonComment').opacity = '1';
  document.getElementById('deleteFeature').style.display = 'none';
  // document.getElementById("enableRecording").style.display = "none";
  // document.getElementById("record").style.display = "none";
  document.getElementById("sapelliProjects").style.display = "none";


  // document.getElementById("activatePlay").style.display = "none";



  document.getElementById("tutorial").style.display = "initial";
  // document.getElementById("polygon").style.display = "initial";
  // document.getElementById("polyline").style.display = "initial";
  // document.getElementById("point").style.display = "initial";
  document.getElementById("armchair").style.display = "initial";
  document.getElementById("field").style.display = "initial";
  // document.getElementById("gobackArmchairField").style.display = "initial";


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
  // if (isIOS == false) {
  //     recordedVideo.pause();
  //     recordedBlobs = null; // audio is removed if cancel is clicked
  //     audioRecorded = false;
  //     audioButtonClicked = false
  // }

  selectedFeature = null;
  editButtonClicked = false
  //console.(editButtonClicked)

  //to ensure filter button remains green if filter applied
  if(filterApplied == true){ //to avoid that if dilterby date is all, color is not green
    filter_Button.button.style.borderColor = 'green'
    filterIsOn = false


  }else{
    filter_Button.button.style.backgroundColor = 'black'
    document.getElementById("Alert").style.display = 'none'
  }

  return selectedFeature && clickCountDeleteButton && editButtonClicked && filterIsOn && audioRecorded && audioButtonClicked && aFeatureIsSelected
}
var updatedFeatureToAdd

document.getElementById('shareWorldButtonComment').onclick = function(){
    aFeatureIsSelected = false
    //script for audio recording
      // if (isIOS == false && recordedBlobs != null) {
      //     blob = new Blob(recordedBlobs, {
      //         type: 'audio/webm'
      //     });
      //     // console.log(blob)
      // }
      //
      // var nameAudio = 'audio' + ' ' + 'dateTimeRandomID'
      // var audioBlob = blob;
      // function blobToFile(theBlob, fileName) {
      //     theBlob.lastModifiedDate = new Date();
      //     theBlob.name = fileName;
      //     return theBlob;
      // }
      // if (isIOS == false && recordedBlobs != null) {
      //     audioBlobFile = blobToFile(audioBlob, nameAudio);
      //     // console.log(audioBlobFile)
      //     dataFile = 0 // to avoid problem in firebase, we just submit a 2d array, with geometry null (0)
      //     files = [dataFile, audioBlobFile]
      //     filesLength = 2
      //     // console.log(files)
      // }

      if (audioButtonClicked == true) {
        //console.('audio clicked')
        // document.getElementById("sendFirebase").click();
      } else { //to not show audio icon when no audio available
        //console.('audio NOT clicked')

          audioAvailable = '.'
          setData(); //Call the setDdata() function!!! to post data to database. If audio is available, set data is called in sendfirebase function
      }
    // end of script for audio recording
    var commentAdded = document.getElementById("toCommentPopup").innerHTML

   //console.log(commentAdded)
  // document.getElementById('shareWorldButtonComment').src = 'images/gpsOff.png';
  clearInterval(refreshPopupComment)
  //document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null
  // document.getElementById('shareWorldButtonComment').style.backgroundColor = 'green'
  // document.getElementById('shareWorldButtonComment').style.borderColor = 'green'
  // document.getElementById("activatePlay").style.display = "none";
  document.getElementById("shareWorldButtonCommentImage").src = "images/checkingPw.gif";

  // document.getElementById("sentConfirmation").style.display = "initial";
  // document.getElementById('sentConfirmation').style.opacity = '1';
  document.getElementById('shareWorldButtonComment').disabled = true;

  // document.getElementById("shareWorldButtonComment").src = 'images/applyFilter.png';
  // document.getElementById("shareWorldButtonComment").style.backgroundColor = '#39F70F'
  // document.getElementById("shareWorldButtonComment").style.borderColor = '#39F70F'
  // document.getElementById('shareWorldButtonComment').style.opacity = '0.75';
  // document.getElementById('shareWorldButtonComment').disabled = true;

  // document.getElementById('backEditDelete').style.opacity = '0.35';
  // document.getElementById("classification").style.opacity = "0.35";
  // document.getElementById("emoji").style.opacity = "0.35";
  // document.getElementById('noAudioIOS').style.opacity = '0.35';
  // document.getElementById('enableRecording').style.opacity = '0.35';
  // document.getElementById('record').style.opacity = '0.35';
  document.getElementById('backEditDelete').disabled = true;
  document.getElementById("classification").disabled = true;
  document.getElementById("emoji").disabled = true;
  // document.getElementById('noAudioIOS').disabled = true;
  // document.getElementById('enableRecording').disabled = true;
  // document.getElementById('record').disabled = true;

  setTimeout(function(){
    document.getElementById("shareWorldButtonComment").style.backgroundColor = "#39F70F";
    document.getElementById("shareWorldButtonComment").style.borderColor = "#39F70F";

  },2000)

  //first we close the popup, then we load the new screen -  the comment should now be updated in the carto layer
  setTimeout(function(){
  map.closePopup();
  },2000)
  setTimeout(function(){
    // document.getElementById('toCommentPopup').style.display = 'none';
    // document.getElementById("sentConfirmation").style.display = "none";
    document.getElementById('backEditDelete').style.display = 'none';
    document.getElementById("classification").style.display = "none";
    document.getElementById("emoji").style.display = "none";
    // document.getElementById('noAudioIOS').style.display = 'none';
    // document.getElementById('enableRecording').style.display = 'none';
    // document.getElementById('record').style.display = 'none';
    document.getElementById("sapelliProjects").style.display = "none";

    document.getElementById('backEditDelete').style.opacity = '1';
    document.getElementById("classification").style.opacity = "1";
    document.getElementById("emoji").style.opacity = "1";
    // document.getElementById('noAudioIOS').style.opacity = '1';
    // document.getElementById('enableRecording').style.opacity = '1';
    // document.getElementById('record').style.opacity = '1';
    document.getElementById('backEditDelete').disabled = false;
    document.getElementById("classification").disabled = false;
    document.getElementById("emoji").disabled = false;
    // document.getElementById('noAudioIOS').disabled = false;
    // document.getElementById('enableRecording').disabled = false;
    // document.getElementById('record').disabled = false;

    document.getElementById('backDeleteFeature').style.display = 'initial';
    document.getElementById('deleteFeature').style.display = 'initial';
    document.getElementById('shareMessagingApp').style.display = 'initial';
    document.getElementById("randomSuggestion").style.display = "initial";

    document.getElementById("shareWorldButtonCommentImage").src = "images/sendComment.png";
    document.getElementById("shareWorldButtonComment").style.backgroundColor = "white";
    document.getElementById("shareWorldButtonComment").style.borderColor = "white";
    document.getElementById('shareWorldButtonComment').disabled = false;
    document.getElementById('shareWorldButtonComment').opacity = '1';
    document.getElementById('shareWorldButtonComment').style.display = 'none';

    document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null; // to empty the box for next features, if any
    map.dragging.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();





    // document.getElementById("backDeleteFeature").click() // !!!!!!!!
    //document.getElementById("backEditDelete").click() // !!!!!!!!

    //Script to update the feature with the new comment: request feature in DB that matches the comment> on success call function to remove old feature from deflated then add the requested feature to deflated
      var updatedFeature = function(data) { //function to get layer from carto with 🌐
       //  updatedFeatureToAdd = data
         //console.(data)
       // return updatedFeatureToAdd
       deflated.removeLayer(selectedFeature)
       cartoGeoJSONLayer(data)
       cartoGeometries.addTo(deflated)
      }
      function getUpdatedFeature(){ ///RANDOM!!!!!!!!!!!!!!!

        var sqlQueryRandom = "SELECT cartodb_id, the_geom, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date, commentone, commentoneaudioavailable FROM lumblu WHERE cartodb_id='" + cartoDbIdOfFeatureToEdit + "'"
        $.getJSON({
          cache:false,
          success:updatedFeature,
          url:"https://" + cartousername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + sqlQueryRandom + cartoapiSELECT
        })
      }
       getUpdatedFeature() ////////////////!!!!
       // if (isIOS == false) {
       //     recordedVideo.pause();
       //     recordedBlobs = null; // audio is removed if cancel is clicked
       //     audioRecorded = false
       //     audioButtonClicked = false
       // }
},3000)
  editButtonClicked = true

  //to ensure filter button remains green if filter applied
  if(filterApplied == true){ //to avoid that if dilterby date is all, color is not green
    filter_Button.button.style.backgroundColor = 'green'
    filterIsOn = false

  }else{
    filter_Button.button.style.backgroundColor = 'black'
    document.getElementById("Alert").style.display = 'none'
  }

  return editButtonClicked && filterIsOn && audioRecorded && audioButtonClicked && aFeatureIsSelected
}
