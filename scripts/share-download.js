
////////////////////////////////////////////      Download     /////////////////////////////////////////////////////////////////////////////////////////////
// var convertedData;
// var data;
// var dataGeometry;
// var dataGeometry;
// var blob;
// var dateTimeRandomID;
// var timeFinish;
// var diffTimes;

//var runJSDownload = function(){

document.getElementById('share-download').onclick = function(e) {
    sameSession = true;
    alreadyMovedUp = false;
    audioRecorded = false;
    typeOfFeature = null;
    drawingPoint = false //to reset value for this session
    clearInterval(refreshPopup) //to stop searching for changes in the textbox
    var getUrl = window.location.href
    //console.log(getUrl)

    //here we generate a random ID so when offline the downloaded file is not duplicated
    var randomNumber = Math.random();
    randomNumber = randomNumber * 10000;
    var randomID = Math.round(randomNumber);
    //here the datetime
    var timeEnd = new Date();
    var date = timeEnd.getFullYear() + ' ' + (timeEnd.getMonth() + 1) + ' ' + timeEnd.getDate();
    var time = timeEnd.getHours() + " " + timeEnd.getMinutes() + " " + timeEnd.getSeconds();
    var dateTime = date + ' - ' + time;

    ////////////////////// get time spend on mapping (in seconds)///////////////////////////////////////
    var res = Math.abs(timeStart - timeEnd) / 1000;
    var minutes = Math.floor(res / 60) % 60;
    var minutesToSeconds = minutes * 60
    var seconds = res % 60;
    var totalTimeSpent = seconds + minutesToSeconds
    //console.log('secondsSpent' + totalTimeSpent)

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
    dataGeometry = data.features[0].geometry
    //console.log(data)
    //console.log(dataGeometry)
    //The coordinate reference system for all GeoJSON coordinates is a  geographic coordinate reference system, using the World Geodetic
    //System 1984 (WGS 84) [WGS84] datum, with longitude and latitude units of decimal degrees.

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    var allLandUses = [1]
    //land uses array filtered.
    var allLandUsesFiltered = allLandUses.filter(noNull => noNull != null);
    //console.log(allLandUsesFiltered)
    var landUses = allLandUsesFiltered.toString();
    //to convert emojis from unicode to short name, before the data is transmitted
    //value of boxcontent is obtained again (was obtained in 'confirm'), in case user click on 'confirm' before filling in the box
    boxContent = document.getElementById('emojionearea').value;
    var boxContentToShortname = emojione.toShort(boxContent)
    //console.log(boxContentToShortname)
    //console.log(boxContent)

    var boxContentToString = boxContentToShortname.toString();
    //attributes added to Geojson file properties
    if (finalAreaHa2Decimals == null && finalLength2Decimals == null) {
        finalAreaHa2Decimals = 'Point'
        finalLength2Decimals = 'Point'
    }
    if (finalAreaHa2Decimals != null && finalLength2Decimals == null) {
      finalLength2Decimals = 'Polygon'
    }
    if (finalAreaHa2Decimals == null && finalLength2Decimals != null) {
      finalAreaHa2Decimals = 'Line'
    }
    if (isIOS == false && recordedBlobs != null) {
        var audioAvailable = true
    } else {
        audioAvailable = false
    }
    var propertiesGeoJSON = {
        // 'geometryCenter':geometryCenter,
        'landUses': boxContentToString,
        'landUsesEmoji': boxContent,
        'audioAvailable': audioAvailable,
        'areaPolygon': finalAreaHa2Decimals,
        'lengthLine': finalLength2Decimals,
        'dateTime': dateTime,
        'timeSpendSeconds': totalTimeSpent,
        'dist_m_Participant_Feature': distanceObfTrunc,
        'randomID': randomID,
        'geometrystring':data.toString(),
        'screensize':screensize
    };
    //  adding the properties to the geoJSON file:
    data.features[0].properties = propertiesGeoJSON;

    // Stringify the GeoJson
    convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

    if (isIOS == false && recordedBlobs != null) {
        blob = new Blob(recordedBlobs, {
            type: 'audio/webm'
        });
        //console.log(blob)
    }

    //defining the final screen
    setTimeout(function() {
        drawnItems.clearLayers();
        tempLayer.clearLayers()
        document.getElementById("map").style.height = "0px";
        document.getElementById("Cancel").style.display = "none";
        document.getElementById("share-download").style.display = "none";
        document.getElementById('noAudioIOS').style.display = 'none';
        document.getElementById("record").style.display = "none";
        document.getElementById('enableRecording').style.display = 'none';
        document.getElementById("play").style.display = "none";
        document.getElementById('voice').style.display = 'none';
        document.getElementById('voice').style.opacity = '0';
        document.getElementById('activatePlay').style.display = 'none';
        document.getElementById('showAreaHa').style.display = 'none';
        document.getElementById('showAreaAcres').style.display = 'none'
        // document.getElementById('showLength').style.display = 'none'
        document.getElementById('emoji').style.display = 'none';
        document.getElementById('shareWorldButton').style.display = 'initial';
        document.getElementById('DownloadButton').style.display = 'initial';
        document.getElementById('Download').style.display = 'initial';

        document.body.style.backgroundColor = "black";
    }, 200)
    if(isIOS == false){
      recordedVideo.pause();
      recordedVideo.currentTime = 0;
    }

    created = false;

    //adding layers to localstorage
    var dataStringified = JSON.stringify(data);

    var tempName = randomID // each polygon must have a different name!!!
    var layerToLocalStorage = localStorage.setItem(tempName, dataStringified);
    //console.log(dataStringified);
    //console.log(dataStringified.geometry)
    //console.log(data.geometry)
    myLayerIsOn = true;
    myLayer_Button.button.style.backgroundColor = 'black';

    /////////////////////////firebase   ////////////////
    //rename files...
    var nameGeoJSON = 'geojson' + ' ' + dateTimeRandomID
    var nameAudio = 'audio' + ' ' + dateTimeRandomID
    var audioBlob = blob; //to assign to a new variable the blob created in the audio.js
    //console.log(audioBlob)

    //to convert the audio blob into a file (webm)
    function blobToFile(theBlob, fileName) {
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    }

    if (isIOS == false && recordedBlobs != null) {
        audioBlobFile = blobToFile(audioBlob, nameAudio);
        //console.log(audioBlobFile)
    }

    //console.log(document.getElementsByClassName('emojibtn'))
    featureType = null; //to avoid error of length not recognised when on map click
    //to convert geojson into File format
    dataFile = new File([dataStringified], nameGeoJSON, {
        type: "application/json",
    });
    //console.log(dataFile)
    //to store both audio and geojson into an array, and also get the length of the array and pass this value ot the firebase loop
    if (isIOS == false && recordedBlobs != null) {
        files = [dataFile, audioBlobFile]
        filesLength = 2
    } else {
        files = [dataFile]
        filesLength = 1
        created = false; // redundant (to ensure that when DELETE is clicked the sql query is the delete one, not the last Insert query)
    }

    return created && data && myLayerIsOn && files && filesLength && convertedData && blob && sameSession && featureType //&& centerPointMarker && centerPolylineMarker && centerPolygonMarker// && oneMapCompleted //&& dateTimeRandomID && data
}
//console.log(finalLayer)

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

document.getElementById('shareWorldButton').onclick = function(e) {
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
        document.getElementById('sentVideo').play();
        document.getElementById("sentVideo").controls = false;
        document.body.style.backgroundColor = "white";

        //to fire click event of upload button !!
        ////////////////////////////       CARTO - POST DATA      //////////////////////////////////////////
        //first, we define the variables that store the attributes
        propertiesGeoJSON = data.features[0].properties
        //to assign each attribute to a variable, which will be added as columns to the DB
        landUses = propertiesGeoJSON.landUses;
        landUsesEmoji = propertiesGeoJSON.landUsesEmoji;
        areaPolygon = propertiesGeoJSON.areaPolygon;
        lengthLine = propertiesGeoJSON.lengthLine;
        dateTime = propertiesGeoJSON.dateTime;
        timeSpendSeconds = propertiesGeoJSON.timeSpendSeconds;
        dist_m_Participant_Feature = propertiesGeoJSON.dist_m_Participant_Feature;
        randomID = propertiesGeoJSON.randomID;

        // include the firebase url (if audio has been recorded)
        if (isIOS == false && audioButtonClicked == true) {
          document.getElementById("sendFirebase").click();
        } else { //to not show audio icon when no audio available
            audioAvailable = '.'
            setData(); //Call the setDdata() function!!! to post data to database. If audio is available, set data is called in sendfirebase function
        }
    }, 200)

    setTimeout(function() {
        document.getElementById('Sent').style.display = 'none';
        document.getElementById('uploading').style.display = 'none'
        document.getElementById('progress').style.display = 'none'

        document.getElementById("deleteAllVertexs").style.opacity = "0.35";
        document.getElementById("deleteAllVertexs").disabled = true;
        document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
        document.getElementById("deleteAllVertexsLine").disabled = true;
        document.getElementById("completeFeature").style.opacity = "0.35";
        document.getElementById("completeFeature").disabled = true;

        document.body.style.backgroundColor = "white";

        document.getElementById("map").style.height = "100%";
        document.getElementById("tutorial").style.display = "initial";
        document.getElementById("polygon").style.display = "initial";
        document.getElementById("polyline").style.display = "initial";
        document.getElementById("point").style.display = "initial";

        document.getElementById("Alert").innerHTML = '🚧 If the feature is not appearing, please reload the page'
        document.getElementById("Alert").style.display = 'initial'
        setTimeout(function(){
          document.getElementById("Alert").style.display = 'none'
        }, 5000)

    }, timeOfVideo);

      osm_Button.addTo(map)
      myLayer_Button.addTo(map);
      filter_Button.addTo(map);
      myLayer_Button.button.style.opacity = '1';
      myLayer_Button.button.disabled = false
      filter_Button.button.style.opacity = '1';
      filter_Button.button.disabled = false;
      gps_Button.button.style.opacity = '1';
      gps_Button.button.disabled = false;

      document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null
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
    finalAreaHa2Decimals = null
    finalLength2Decimals = null
    timeStart = new Date(); // to reset time start in case more contributions in this session


    return featureSent &&  finalAreaHa2Decimals &&  finalLength2Decimals && timeStart
  }else {
    alert('🛑 You are offline')
  }
}

document.getElementById('DownloadButton').onclick = function(e) {
    document.getElementById('downloadedVideo').play();
    document.getElementById("downloadedVideo").controls = false;

    document.getElementById('shareWorldButton').style.display = 'none';
    document.getElementById('DownloadButton').style.display = 'none';

    document.getElementById('Downloaded').style.display = 'initial';
    //to download the geojson and webm files to the device's downloads folder
    document.getElementById('Download').setAttribute('href', 'data:' + convertedData);
    document.getElementById('Download').setAttribute('download', dateTimeRandomID);

    document.body.style.backgroundColor = "white";

    ////////////////////////  TRANSMISSION ////////////////////////////////////////
    finished = true;

    setTimeout(function() {
        document.getElementById('Downloaded').style.display = 'none';
        document.getElementById('uploading').style.display = 'none'
        document.getElementById('progress').style.display = 'none'

        document.getElementById("deleteAllVertexs").style.opacity = "0.35";
        document.getElementById("deleteAllVertexs").disabled = true;
        document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
        document.getElementById("deleteAllVertexsLine").disabled = true;
        document.getElementById("completeFeature").style.opacity = "0.35";
        document.getElementById("completeFeature").disabled = true;

        document.body.style.backgroundColor = "white";

        document.getElementById("map").style.height = "100%";
        document.getElementById("tutorial").style.display = "initial";
        document.getElementById("polygon").style.display = "initial";
        document.getElementById("polyline").style.display = "initial";
        document.getElementById("point").style.display = "initial";

        //console.log(data);

        //finalLayer is added at the end as the properties are different depending on if share or download
        myLayer_Button.button.style.opacity = '1';
        myLayer_Button.button.disabled = false
        filter_Button.button.style.opacity = '0.4';
        filter_Button.button.disabled = true;
        gps_Button.button.style.opacity = '1';
        gps_Button.button.disabled = false;

        document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null


        finalLayer = L.geoJSON(data, {
            style: function(feature) {
                return feature.properties && feature.properties.style;
            },
            color: '#0CACDF',
            onEachFeature: onEachFeatureAudioLocalStorage,
        }).addTo(map);

    }, timeOfVideo - 300);

    return finished
}

// end
//}//run JS download code
