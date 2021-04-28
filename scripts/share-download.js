
////////////////////////////////////////////      Download     /////////////////////////////////////////////////////////////////////////////////////////////
// var convertedData;
// var data;
// var dataGeometry;
// var dataGeometry;
// var blob;
// var dateTimeRandomID;
// var timeFinish;
// var diffTimes;
var audioAvailable = 'false'

//var runJSDownload = function(){
var clickCountSendButton = 0

var hideButtons = function(){
  // drawnItems.clearLayers();
  // tempLayer.clearLayers()
  //   document.getElementById("map").style.height = "0px";
    document.getElementById("Cancel").style.display = "none";
    // document.getElementById('shareMessagingAppsDirect').style.display = 'none';
    document.getElementById("share-download").style.display = "none";
    document.getElementById("sapelliProjects").style.display = "none";
    // document.getElementById('noAudioIOS').style.display = 'none';
    // document.getElementById("record").style.display = "none";
    // document.getElementById('enableRecording').style.display = 'none';
    // document.getElementById("play").style.display = "none";
    // document.getElementById('voice').style.display = 'none';
    // document.getElementById('voice').style.opacity = '0';
    // document.getElementById('activatePlay').style.display = 'none';
    // document.getElementById('showAreaHa').style.display = 'none';
    document.getElementById('showAreaAcres').style.display = 'none'
    // document.getElementById('showLength').style.display = 'none'
    document.getElementById('emoji').style.display = 'none';
}

var showButtons = function(){

    document.getElementById("share-download").style.display = "initial";
    document.getElementById("Cancel").style.display = "initial";
    document.getElementById("classification").style.display = "initial";
    document.getElementById("emoji").style.display = "initial";
    document.getElementById("sapelliProjects").style.display = "initial";

    // document.getElementById('Sent').currentTime = 0;
    // document.getElementById('voice').style.display = 'none';
    // document.getElementById('voice').style.opacity = '0';
    // if (isIOS == false) {
    //     document.getElementById('enableRecording').style.display = 'initial';
    // } else {
    //     document.getElementById('noAudioIOS').style.display = 'initial';
    // }
}

var encodeGeoJSON = function(data,properties){
  data.properties = properties;
  convertedDataShareDirect = encodeURIComponent(JSON.stringify(data));
  // convertedDataShareDirect = JSON.stringify(data);

  shareGeomDirect = true

  return convertedDataShareDirect && shareGeomDirect
}
var dataStringified
var tempName
document.getElementById('share-download').onclick = function(e) {

    sameSession = true;
    alreadyMovedUp = false;
    audioRecorded = false;
    typeOfFeature = null;
    drawingPoint = false //to reset value for this session
    clearInterval(refreshPopup) //to stop searching for changes in the textbox
    var getUrl = window.location.href
    ////console.log(getUrl)

    //here we generate a random ID so when offline the downloaded file is not duplicated
    var randomNumber = Math.random();
    randomNumber = randomNumber * 10000;
    var randomID = Math.round(randomNumber);
    //here the datetime
    var timeEnd = new Date();
    var date = timeEnd.getFullYear() + '-' + (timeEnd.getMonth() + 1) + '-' + timeEnd.getDate();
    var time = timeEnd.getHours() + ":" + timeEnd.getMinutes() + ":" + timeEnd.getSeconds();
    var dateTime = date + 'T' + time + 'Z';
    //console.log(dateTime)

    ////////////////////// get time spend on mapping (in seconds)///////////////////////////////////////
    var res = Math.abs(timeStart - timeEnd) / 1000;
    var minutes = Math.floor(res / 60) % 60;
    var minutesToSeconds = minutes * 60
    var seconds = res % 60;
    var totalTimeSpent = seconds + minutesToSeconds
    ////console.log('secondsSpent' + totalTimeSpent)

    /////////////script to obfuscate user's currentLocation, in case user allow geolocation//////////////////
    if (currentLocation[0] != null) {
        var currentLocationString = currentLocation.toString();
        featureApproxLocation = map.getCenter() // instaead of recoding the coordinates of the feature, we simply record the center of the screen once drawn

        var latlngFrom = L.latLng(featureApproxLocation)
        var latlngTo = L.latLng(currentLocation)
        var distanceExact = latlngFrom.distanceTo(latlngTo) // distance calculated in meters
        var distanceObfuscated = (Math.random() * 100) * distanceExact
        var distanceObfTrunc = Math.trunc(distanceObfuscated)
    } else {
        distanceObfTrunc = 'Location not recorded';
    }

    //here we combine datetime with randomID
    dateTimeRandomID = 'Date&time: ' + dateTime + ' RandomID:' + randomID;
    dateTimeRandomID.toString();
    data = drawnItems.toGeoJSON();
    data = data.features[0]
    dataGeometry = data.geometry
    ////console.log(data)
    ////console.log(dataGeometry)
    //The coordinate reference system for all GeoJSON coordinates is a  geographic coordinate reference system, using the World Geodetic
    //System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units of decimal degrees.

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    var allLandUses = [1]
    //land uses array filtered.
    var allLandUsesFiltered = allLandUses.filter(noNull => noNull != null);
    ////console.log(allLandUsesFiltered)
    var landUses = allLandUsesFiltered.toString();
    //to convert emojis from unicode to short name, before the data is transmitted
    //value of boxcontent is obtained again (was obtained in 'confirm'), in case user click on 'confirm' before filling in the box
    //console.log('issuespecific',issueSpecific)
    if(issueSpecific == 'emojiNoSapelli'){
      boxContent = document.getElementById('emojionearea').value;
      var boxContentToShortname = emojione.toShort(boxContent)
      //console.log(boxContent)
    }else{
      var emojioneareaeditor = document.getElementsByClassName('emojionearea-editor')
      var emojioneareaeditor0 = emojioneareaeditor[0]
      boxContent = emojioneareaeditor0.innerHTML
      var boxContentToShortname = emojione.toShort(boxContent)

    //  console.log(boxContent)

    }

    ////console.log(boxContentToShortname)
    ////console.log(boxContent)

    var boxContentToString = boxContentToShortname.toString();
    //attributes added to Geojson file properties
    if (finalAreaAcres2Decimals == null && finalLength2Decimals == null) {
        finalAreaAcres2Decimals = 'Point'
        finalLength2Decimals = 'Point'
    }
    if (finalAreaAcres2Decimals != null && finalLength2Decimals == null) {
      finalLength2Decimals = 'Polygon'
    }
    if (finalAreaAcres2Decimals == null && finalLength2Decimals != null) {
      finalAreaAcres2Decimals = 'Line'
    }
    // if (isIOS == false && recordedBlobs != null) {
    //     var audioAvailable = '.'
    // } else {
    //     audioAvailable = '.'
    // }
    propertiesGeoJSON = {
        // 'geometryCenter':geometryCenter,
        'landUses': boxContentToString,
        'landUsesEmoji': boxContent,
        'audioAvailable': audioAvailable,
        'areaPolygon': finalAreaAcres2Decimals,
        'lengthLine': finalLength2Decimals,
        'dateTime': dateTime,
        'timeSpendSeconds': totalTimeSpent,
        'dist_m_Participant_Feature': distanceObfTrunc,
        'randomID': randomID,
        'geometrystring':data.toString(),
        'screensize':screensize
    };
    propertiesGeoJSONURL = {
        'randomID': randomID,
        'landUsesEmoji': boxContent,
        'areaPolygon': finalAreaAcres2Decimals,
        'lengthLine': finalLength2Decimals,
    };
    //  adding the properties to the geoJSON file:
    data.properties = propertiesGeoJSON;

    // Stringify the GeoJson
    // convertedData = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
    // console.log(convertedData)
    // if (isIOS == false && recordedBlobs != null) {
    //     blob = new Blob(recordedBlobs, {
    //         type: 'audio/webm'
    //     });
    //     //console.log(blob)
    // }

    //defining the final screen
    setTimeout(function() {
      hideButtons()

        document.getElementById('goBackClassification').style.display = 'initial';
        document.getElementById('shareMessagingAppsDirect').style.display = 'initial';
        document.getElementById('shareWorldButton').style.display = 'initial';
        document.getElementById('DownloadButton').style.display = 'initial';
        // document.getElementById('Download').style.display = 'initial';

        // document.body.style.backgroundColor = "black";
    }, 200)
    // if(isIOS == false){
    //   recordedVideo.pause();
    //   recordedVideo.currentTime = 0;
    // }

    created = false;

    //adding layers to localstorage
    dataStringified = JSON.stringify(data);
    //console.log(dataStringified)

     tempName = randomID // each polygon must have a different name!!!
    // // var layerToLocalStorage = geoJSONLocalforageDB.setItem(tempName, dataStringified);
    //
    // geoJSONLocalforageDB.setItem(tempName, dataStringified)//.then(function(){

      // fetchFromLocalStorage()
      // var latestGeom = geoJSONLocalforageDB.getItem(tempName)
      // console.log(localStorageLayer)
      // dataStringified.addTo(map)

  //  });
    // //console.log(layerToLocalStorage);
    ////console.log(dataStringified.geometry)
    ////console.log(data.geometry)
    myLayerIsOn = true;
    myLayer_Button.button.style.backgroundColor = 'black';

    /////////////////////////firebase   ////////////////
    //rename files...
    var nameGeoJSON = 'geojson' + ' ' + dateTimeRandomID
    var nameAudio = 'audio' + ' ' + dateTimeRandomID
    var audioBlob = blob; //to assign to a new variable the blob created in the audio.js
    ////console.log(audioBlob)

    //to convert the audio blob into a file (webm)
    function blobToFile(theBlob, fileName) {
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    }

    // if (isIOS == false && recordedBlobs != null) {
    //     audioBlobFile = blobToFile(audioBlob, nameAudio);
    //     //console.log(audioBlobFile)
    // }

    ////console.log(document.getElementsByClassName('emojibtn'))
    featureType = null; //to avoid error of length not recognised when on map click
    //to convert geojson into File format
    dataFile = new File([dataStringified], nameGeoJSON, {
        type: "application/json",
    });
    ////console.log(dataFile)
    //to store both audio and geojson into an array, and also get the length of the array and pass this value ot the firebase loop
    // if (isIOS == false && recordedBlobs != null) {
    //     files = [dataFile, audioBlobFile]
    //     filesLength = 2
    // } else {
        files = [dataFile]
        filesLength = 1
        created = false; // redundant (to ensure that when DELETE is clicked the sql query is the delete one, not the last Insert query)
    // }
      isFirstTime = false
      // encodeGeoJSON(data,propertiesGeoJSONURL)
      //console.log(convertedDataShareDirect)
      //console.log(files)
      // var parsedJSONdecoded = decodeURIComponent(convertedDataShareDirect);
      // var parsedJSON = JSON.parse(parsedJSONdecoded)
      // //console.log(parsedJSON)
    return created && data && myLayerIsOn && files && filesLength && convertedData && blob && sameSession && featureType && convertedDataShareDirect && propertiesGeoJSON && tempName && dataStringified && isFirstTime //&& centerPointMarker && centerPolylineMarker && centerPolygonMarker// && oneMapCompleted //&& dateTimeRandomID && data
}
////console.log(finalLayer)

/////////////////////////////////////////  screenS SHARE-DOWNLOAD  /////////////////////////////////////
var timeOfVideo; //variable to define time of video based on OS. For some reason, is iOS takes longer to play

if (isIOS == false) {
    timeOfVideo = 2800
} else {
    timeOfVideo = 3400
}
if (isOnline == false){ // to disable send button if offline
  document.getElementById('shareWorldButton').style.opacity = '0.2';
  document.getElementById('shareWorldButton').disabled = 'true';

}

document.getElementById('goBackClassification').onclick = function(e){
  document.getElementById('goBackClassification').style.display = 'none';
  document.getElementById('shareMessagingAppsDirect').style.display = 'none';
  document.getElementById('shareWorldButton').style.display = 'none';
  document.getElementById('DownloadButton').style.display = 'none';
  document.getElementById("shareWorldButtonImage").src = 'images/shareworld.png'
  document.getElementById("shareWorldButton").style.backgroundColor = 'white'
  document.getElementById("shareWorldButton").style.borderColor = 'white'
  issueSpecific = 'emojiNoSapelli'
  clickCountSendButton = 0
  document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null

  startCheckingText()



showButtons()
return issueSpecific
}

var mapposLat = mappos.center.lat
var mapposLng = mappos.center.lng
var mapposZoom = mappos.zoom

var urlX
var keepOnlyLatLngZoomX
var splittedLatLngZoomX
var urlLatX
var urlLngX
var urlZoomWithZX
var urlZoomX
document.getElementById('shareMessagingAppsDirect').onclick = function(e){
  //to store in localstorage immediately
  // geoJSONLocalforageDB.setItem(tempName, dataStringified)
  // var newGeom = JSON.parse(dataStringified)
  // groupGeoJSON = newGeom
  // localStorageToGeoJSON()
   // geoJSONLocalforageDB.setItem(tempName, dataStringified)//.then(function(){
  //   for (i = 0; i < deflatedLocalStorage._layers.length; i++) { // not the optimal solution, but couldn't find the way to empty deflated
  //     try{ // because array not starts with 1,2,3
  //       deflatedLocalStorage.removeLayer(deflatedLocalStorage._layers[i])
  //       //console.log('forr ',i)
  //     }catch(e){}
  //   }
  //   fetchFromLocalStorage()
  // })
  encodeGeoJSON(data,propertiesGeoJSONURL)
    urlX = window.location.href
    keepOnlyLatLngZoomX = urlX.split('#').pop();
    splittedLatLngZoomX = keepOnlyLatLngZoomX.split(',');
    urlLatX = splittedLatLngZoomX[0]
    urlLngX = splittedLatLngZoomX[1]
    urlZoomWithZX = splittedLatLngZoomX[2]
    urlZoomX = urlZoomWithZX.replace('z','')

  document.getElementById('goBackClassification').style.display = 'none';
  document.getElementById('shareMessagingAppsDirect').style.display = 'none';
  document.getElementById('shareWorldButton').style.display = 'none';
  document.getElementById('DownloadButton').style.display = 'none';
  document.getElementById('Cancel').style.display = 'none';
  document.getElementById("shareWorldButtonImage").src = 'images/shareworld.png'
  document.getElementById("shareWorldButton").style.backgroundColor = 'white'
  document.getElementById("shareWorldButton").style.borderColor = 'white'
  clickCountSendButton = 0 //!!!!!!!!!!!
  document.getElementById('weChatImage').src = 'images/sms.png'
  document.getElementById("goBackShareMessagingAppsDirect").style.display = 'initial';
  document.getElementById("whatsApp").style.display = 'initial';
  document.getElementById("telegram").style.display = 'initial';
  document.getElementById("weChat").style.display = "initial";
  // console.log(recordedBlobs)
  // if(recordedBlobs != null){
  //   document.getElementById("Alert").style.fontSize = "30px";
  //   document.getElementById('Alert').innerHTML = '<br> ⚠️ 🔇 📥'
  //   document.getElementById("Alert").style.display = 'initial'
  // }


  shareURL = 'encodedGeoJSON'
  // document.getElementById("shareMessagingApp").style.display = "initial";
  return shareURL && mapposLat  && mapposLng && mapposZoom && urlX && urlLatX && urlLngX && urlZoomX && groupGeoJSON
}
document.getElementById('goBackShareMessagingAppsDirect').onclick = function(e){
  document.getElementById("Alert").style.display = 'none'

  document.getElementById("goBackShareMessagingAppsDirect").style.display = 'none';
  document.getElementById("whatsApp").style.display = 'none';
  document.getElementById("telegram").style.display = 'none';
  document.getElementById("weChat").style.display = "none";
  // document.getElementById("shareMessagingApp").style.display = "none";

  document.getElementById('goBackClassification').style.display = 'initial';
  document.getElementById('shareMessagingAppsDirect').style.display = 'initial';
  document.getElementById('shareWorldButton').style.display = 'initial';
  document.getElementById('DownloadButton').style.display = 'initial';
  // document.getElementById('Cancel').style.display = 'initial';
}


document.getElementById('shareWorldButton').onclick = function(e) {
  //to store in localstorage
  // geoJSONLocalforageDB.setItem(tempName, dataStringified)//.then(function(){



  issueSpecific = 'emojiNoSapelli'


  if (clickCountSendButton == 0) {
      document.getElementById("shareWorldButtonImage").src = 'images/shareworldConfirm.png'
      document.getElementById("shareWorldButton").style.backgroundColor = 'yellow'
      document.getElementById("shareWorldButton").style.borderColor = 'black'

      // document.getElementById("imageDeleteFeature").src = 'images/binpost.png';
      // document.getElementById("shareMessagingApp").style.opacity = '0.4';
      // document.getElementById("shareMessagingApp").disabled = true;
      // document.getElementById("randomSuggestion").style.opacity = '0.4';
      // document.getElementById("randomSuggestion").disabled = true;

      clickCountSendButton = 1
  } else {

        //to store in localstorage immediately
        // geoJSONLocalforageDB.setItem(tempName, dataStringified).then(function(){
        //   for (i = 0; i < deflatedLocalStorage._layers.length; i++) { // not the optimal solution, but couldn't find the way to empty deflated
        //     try{ // because array not starts with 1,2,3
        //       deflatedLocalStorage.removeLayer(deflatedLocalStorage._layers[i])
        //       //console.log('forr ',i)
        //     }catch(e){}
        //   }
        //   fetchFromLocalStorage()
        // })
        encodeGeoJSON(data,propertiesGeoJSON)

        setTimeout(function(){
          hideButtons()
          document.getElementById('goBackClassification').style.display = 'none';
          document.getElementById('shareMessagingAppsDirect').style.display = 'none';
          drawnItems.clearLayers();
          tempLayer.clearLayers()
          document.getElementById("map").style.height = "0px";

        },200)
        // drawnItems.clearLayers();
        // tempLayer.clearLayers()
        //first, we define the variables that store the attributes
        // propertiesGeoJSON = data.features[0].properties
        // landUses = propertiesGeoJSON.landUses;

        //script to check if keyword is added in the attribute field
        // if(landUses[0] == ':' && landUses[1] == 'e' && landUses[2] == 'a' && landUses[3] == 'r' && landUses[4] == 't' && landUses[5] == 'h' ){
          //
          // //to remove the keyword from the attribute field that is shown in the map
          // var landUsesEmojiWithKeyword = propertiesGeoJSON.landUsesEmoji;
          // var lengthLandUsesEmojiWithKeyword = landUsesEmojiWithKeyword.length
          // landUsesEmoji = landUsesEmojiWithKeyword.slice(2,lengthLandUsesEmojiWithKeyword);

        if(isOnline == true){

          setTimeout(function() {
              document.getElementById('shareWorldButton').style.display = 'none';
              document.getElementById('DownloadButton').style.display = 'none';
              document.getElementById('Sent').style.display = 'initial';
              document.getElementById('sentVideo').pause();
              document.getElementById('sentVideo').currentTime = 0

              document.getElementById('sentVideo').play();
              document.getElementById("sentVideo").controls = false;
              document.body.style.backgroundColor = "white";

              //to fire click event of upload button !!
              ////////////////////////////       CARTO - POST DATA      //////////////////////////////////////////
              //first, we define the variables that store the attributes
              propertiesGeoJSON = data.properties
              //to assign each attribute to a variable, which will be added as columns to the DB
              landUses = propertiesGeoJSON.landUses;
              landUsesEmoji = propertiesGeoJSON.landUsesEmoji;
              areaPolygon = propertiesGeoJSON.areaPolygon;
              lengthLine = propertiesGeoJSON.lengthLine;
              dateTime = propertiesGeoJSON.dateTime;
              timeSpendSeconds = propertiesGeoJSON.timeSpendSeconds;
              dist_m_Participant_Feature = propertiesGeoJSON.dist_m_Participant_Feature;
              randomID = propertiesGeoJSON.randomID;

              //console.log(propertiesGeoJSON)
              // include the firebase url (if audio has been recorded)
              // if (isIOS == false && audioButtonClicked == true) {
              //   document.getElementById("sendFirebase").click();
              // } else { //to not show audio icon when no audio available
              //     audioAvailable = '.'
                  setData(); //Call the setDdata() function!!! to post data to database. If audio is available, set data is called in sendfirebase function
              // }
          }, 200)

          setTimeout(function() {
            geoJSONLocalforageDB.setItem(tempName, dataStringified)
            var newGeom = JSON.parse(dataStringified)
            groupGeoJSON = newGeom
            //console.log(groupGeoJSON)
            localStorageToGeoJSON()
              document.getElementById('Sent').style.display = 'none';
              // document.getElementById('uploading').style.display = 'none'
              // document.getElementById('progress').style.display = 'none'

              document.getElementById("deleteAllVertexs").style.opacity = "0.35";
              document.getElementById("deleteAllVertexs").disabled = true;
              document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
              document.getElementById("deleteAllVertexsLine").disabled = true;
              document.getElementById("completeFeature").style.opacity = "0.35";
              document.getElementById("completeFeature").disabled = true;

              document.body.style.backgroundColor = "black";
              document.body.style.color = "black"; //cheating here, this is to hide a f** 'undefined' that appear on top of the video. Anyway, solved

              document.getElementById("map").style.height = "100%";
              document.getElementById("tutorial").style.display = "initial";
              // document.getElementById("polygon").style.display = "initial";
              // document.getElementById("polyline").style.display = "initial";
              // document.getElementById("point").style.display = "initial";
              document.getElementById("armchair").style.display = "initial";
              document.getElementById("field").style.display = "initial";
              // document.getElementById("gobackArmchairField").style.display = "initial";
              if(whichLayerIsOn == 'localStorage'){
                document.getElementById('myLayerButton').click()
                document.getElementById('myLayerButton').click()

              }else if(whichLayerIsOn == 'none'){
                document.getElementById('myLayerButton').click()
              }


              // document.getElementById("Alert").style.fontSize = "15px";
              // document.getElementById("Alert").innerHTML = '🚧 If the feature is not appearing after few seconds, please toggle layer or reload page'
              // document.getElementById("Alert").style.display = 'initial'
              // if (isIOS == false) {
              //     recordedVideo.pause();
              //     recordedBlobs = null; // audio is removed if cancel is clicked
              // }
              setTimeout(function(){
                document.getElementById("Alert").style.display = 'none'
              }, 5000)

          }, timeOfVideo);

            //osm_Button.addTo(map)
            // myLayer_Button.addTo(map);
            // filter_Button.addTo(map);
            myLayer_Button.button.style.opacity = '1';
            myLayer_Button.button.disabled = false
            filter_Button.button.style.opacity = '1';
            filter_Button.button.disabled = false;
            gps_Button.button.style.opacity = '1';
            gps_Button.button.disabled = false;

            document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null
            document.body.style.color = "white"; //cheating here, this is to hide a f** 'undefined' that appear on top of the video. Anyway, solved
            document.getElementById("shareWorldButtonImage").src = 'images/shareworld.png'
            document.getElementById("shareWorldButton").style.backgroundColor = 'white'
            document.getElementById("shareWorldButton").style.borderColor = 'white'
            clickCountSendButton = 0

            try{
              localStorageLayer.removeFrom(map)
            }catch(err){}
            //deflated.addTo(map)
            // if (cartoLoaded == true) {
            //
            //     cartoGeometries.addTo(deflated)
            // }

            featureSent = true;

          // }else{
          //   alert("🔑 🛑 During the prototyping phase, a KEYWORD must be added in the textbox to publish the spatial data. Click 'Download' and in the main screen click the 'Quetionmark' button. Then click the 'Yellow' button to request the KEYWORD. Thanks");
          //
          // }
          finalAreaAcres2Decimals = null
          finalLength2Decimals = null
          timeStart = new Date(); // to reset time start in case more contributions in this session

            field = false

          return featureSent &&  finalAreaAcres2Decimals &&  finalLength2Decimals && timeStart && field
        }else {
          alert('🛑 You are offline')
        }

    }
  return clickCountSendButton && issueSpecific && groupGeoJSON
}
//console.log(deflatedLocalStorage)
var elementJustAddedToLocalStorage = false
document.getElementById('DownloadButton').onclick = function(e) {
  //console.log(whichLayerIsOn)
        //to store in localstorage immediately
        // for (i = 0; i < deflatedLocalStorage._layers.length; i++) { // not the optimal solution, but couldn't find the way to empty deflated
        //   try{ // because array not starts with 1,2,3
        //     deflatedLocalStorage.removeLayer(deflatedLocalStorage._layers[i])
        //     console.log('forr ',i)
        //   }catch(e){
        //     console.log('error emptying deflatedlocal')
        //   }
        // }
        // geoJSONLocalforageDB.setItem(tempName, dataStringified).then(function(){
        //   setTimeout(function(){
        //     fetchFromLocalStorage()
        //
        //   },2000)
        // })
        geoJSONLocalforageDB.setItem(tempName, dataStringified)
        var newGeom = JSON.parse(dataStringified)
        groupGeoJSON = newGeom
        localStorageToGeoJSON()

        // geoJSONLocalforageDB.getItem(tempName).then(function (value) {
        //     console.log(key, value);
        //     isJson(value);
        //     if (isJson(value) == true) {
        //       // //console.log(isJson('this is geojson',value))
        //         var getItemToJSON = JSON.parse(value);
        //         isJson(getItemToJSON)
        //
        //         localStorageToGeoJSON()
        //       }
        //
        // });

      issueSpecific = 'emojiNoSapelli'
      hideButtons()


    drawnItems.clearLayers();
    tempLayer.clearLayers()
    document.getElementById('sentVideo').pause();
    document.getElementById('sentVideo').currentTime = 0
    document.getElementById('downloadedVideo').play();
    document.getElementById("downloadedVideo").controls = false;
    setTimeout(function(){
      document.getElementById("map").style.height = "0px";
      document.getElementById('goBackClassification').style.display = 'none';
      document.getElementById('shareMessagingAppsDirect').style.display = 'none';
      document.getElementById('shareWorldButton').style.display = 'none';
      document.getElementById('DownloadButton').style.display = 'none';

    },200)



    document.getElementById('Downloaded').style.display = 'initial';
    //to download the geojson and webm files to the device's downloads folder. NOTE THAT AUDIO FILE DONWLOAD CODE IS IN AUDIO.JS FILE
    // document.getElementById('Download').setAttribute('href', 'data:' + dataFile);
    // console.log(dateTimeRandomID)
    convertedData = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

    var toDownloadGeoJSON = document.createElement('a');
    toDownloadGeoJSON.setAttribute('href', convertedData);
    toDownloadGeoJSON.setAttribute('download', dateTimeRandomID+'.geojson');
    document.body.appendChild(toDownloadGeoJSON); // required for firefox
    toDownloadGeoJSON.click();
    toDownloadGeoJSON.remove();

    document.body.style.backgroundColor = "white";
    document.body.style.color = "white"; //cheating here, this is to hide a f** 'undefined' that appear on top of the video. Anyway, solved

    ////////////////////////  TRANSMISSION ////////////////////////////////////////
    finished = true;

    setTimeout(function() {
        document.getElementById('Downloaded').style.display = 'none';
        // document.getElementById('uploading').style.display = 'none'
        // document.getElementById('progress').style.display = 'none'

        document.getElementById("deleteAllVertexs").style.opacity = "0.35";
        document.getElementById("deleteAllVertexs").disabled = true;
        document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
        document.getElementById("deleteAllVertexsLine").disabled = true;
        document.getElementById("completeFeature").style.opacity = "0.35";
        document.getElementById("completeFeature").disabled = true;

        document.body.style.backgroundColor = "black";
        document.body.style.color = "black"; //cheating here, this is to hide a f** 'undefined' that appear on top of the video. Anyway, solved


        document.getElementById("map").style.height = "100%";
        document.getElementById("tutorial").style.display = "initial";
        // document.getElementById("polygon").style.display = "initial";
        // document.getElementById("polyline").style.display = "initial";
        // document.getElementById("point").style.display = "initial";
        document.getElementById("armchair").style.display = "initial";
        document.getElementById("field").style.display = "initial";
        document.getElementById("shareWorldButtonImage").src = 'images/shareworld.png'
        document.getElementById("shareWorldButton").style.backgroundColor = 'white'
        document.getElementById("shareWorldButton").style.borderColor = 'white'
        clickCountSendButton = 0 //!!!!!!!!!!!


        ////console.log(data);

        //finalLayer is added at the end as the properties are different depending on if share or download
        // myLayer_Button.addTo(map);
        // filter_Button.addTo(map);
        myLayer_Button.button.style.opacity = '1';
        myLayer_Button.button.disabled = false;
        // myLayer_Button.button.style.backgroundColor = '#43ACF0';

        // filter_Button.button.style.opacity = '0.4';
        // filter_Button.button.disabled = true;
        gps_Button.button.style.opacity = '1';
        gps_Button.button.disabled = false;

        elementJustAddedToLocalStorage = true

        document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null
        // if (isIOS == false) {
        //     recordedVideo.pause();
        //     recordedBlobs = null; // audio is removed if cancel is clicked
        // }
        // whichLayerIsOn = 'localStorage'
        // //console.log('localstoragelayer',localStorageLayer)
        if(whichLayerIsOn == 'deflated'){
          document.getElementById('myLayerButton').click()
        }if(whichLayerIsOn == 'none'){
          document.getElementById('myLayerButton').click()
          document.getElementById('myLayerButton').click()
        }if(whichLayerIsOn == 'localStorage'){
          document.getElementById('myLayerButton').click()
          document.getElementById('myLayerButton').click()
          document.getElementById('myLayerButton').click()

        }

        // finalLayer = L.geoJSON(data, {
        //     style: function(feature) {
        //         return feature.properties && feature.properties.style;
        //     },
        //     color: '#0CACDF',
        //     onEachFeature: onEachFeatureAudioLocalStorage,
        // }).addTo(map);

          field = false

    }, timeOfVideo - 300);


    return finished && whichLayerIsOn && localStorageLayer && elementJustAddedToLocalStorage && field && issueSpecific && fetchLast && groupGeoJSON
}

// end
//}//run JS download code
