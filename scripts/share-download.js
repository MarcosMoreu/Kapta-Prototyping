var audioAvailable = 'false'

//var runJSDownload = function(){
var clickCountSendButton = 0

var hideButtons = function(){
    document.getElementById("Cancel").style.display = "none";
    // document.getElementById('shareMessagingAppsDirect').style.display = 'none';
    document.getElementById("share-download").style.display = "none";
    document.getElementById("sapelliProjects").style.display = "none";
    document.getElementById('emoji').style.display = 'none';
}

var showButtons = function(){

    // document.getElementById("share-download").style.display = "initial";
    document.getElementById("Cancel").style.display = "initial";
    document.getElementById("classification").style.display = "initial";
    document.getElementById("emoji").style.display = "initial";
    document.getElementById("sapelliProjects").style.display = "initial";
}

var encodeGeoJSON = function(data,properties){
  data.properties = properties;
  convertedDataShareDirect = encodeURIComponent(JSON.stringify(data));
  shareGeomDirect = true

  return convertedDataShareDirect && shareGeomDirect
}
var dataStringified
var tempName
var filesArray = []

var testBlob = null
var sharedownloadclicked = false

document.getElementById('share-download').onclick = function(e) {
  $('#screenshots').empty()
  document.getElementById("screenshot").disabled = true



  sharedownloadclicked = true
  // googleSat.removeFrom(map)

finalAttributes = document.getElementById('emojionearea').value
//console.log(finalAttributes)


//console.log('sapelliProjectIdentifier',sapelliProjectIdentifier)
//console.log('sharedownload clickeeeeeeeeeeeeeeeeeed'  )

    sameSession = true;
    alreadyMovedUp = false;
    audioRecorded = false;
    typeOfFeature = null;
    drawingPoint = false //to reset value for this session
    var getUrl = window.location.href
    ////console.log(getUrl)

    //here we generate a random ID so when offline the downloaded file is not duplicated

    if(opencamera == 'yes'){
      document.getElementById('camera').click()
      document.getElementById('camera').style.display = 'none'
      document.getElementById('screenshot').style.display = 'none'

      opencamera = null
    }else{
      document.getElementById('camera').style.display = 'initial'
      document.getElementById('camera').style.opacity = '1'
      document.getElementById('screenshot').style.display = 'initial'
      document.getElementById('screenshot').style.opacity = '1'
    }

    //defining the final screen
    setTimeout(function() {
      hideButtons()

        document.getElementById('goBackClassification').style.display = 'initial';
        document.getElementById('shareMessagingAppsDirect').style.display = 'initial';
        document.getElementById('shareWorldButton').style.display = 'initial';
        document.getElementById('ShareFinalButton').style.display = 'initial';

        // document.getElementById('camera').style.backgroundColor = '#C6C6C5'

        document.getElementById('myRange').style.display = 'none'
        document.getElementById('Alert').style.display = 'none'
        document.getElementById('Alert').style.opacity = '1'
        document.getElementById('ShareFinalButton').disabled = true;
        document.getElementById('ShareFinalButton').style.opacity = 0.5;

        document.getElementById('shareWorldButton').disabled = false;


        // console.log('TIP: the shareWorld button is disabled by default to prevent unintended open data contributions. To enable it, simply start the string in the input box in the previous screen with the emoji 🌐')
        // console.log('Also, in the initial screen, click 10 times in the rose to open the hidden functionalities')

    }, 200)

    myLayerIsOn = true;
    myLayer_Button.button.style.backgroundColor = 'black';

    return sharedownloadclicked && created && data && myLayerIsOn && files && filesLength && convertedData && blob && sameSession && featureType && convertedDataShareDirect && opencamera  //&& centerPointMarker && centerPolylineMarker && centerPolygonMarker// && oneMapCompleted //&& dateTimeRandomID && data
}

var failRandomID
var failgeoJSON
////console.log(finalLayer)
var finalGeoJSON = function(){
  var randomNumber = Math.random();
  randomNumber = randomNumber * 10000000;
  var randomID = Math.round(randomNumber)+armchairOrGPS;  // if a means mapped with armchair, if g means mapped with gps
  //here the datetime
  var timeEnd = new Date();
  var date = timeEnd.getFullYear() + '-' + (timeEnd.getMonth() + 1) + '-' + timeEnd.getDate();
  var time = timeEnd.getHours() + ":" + timeEnd.getMinutes() + ":" + timeEnd.getSeconds();
  var dateTime = date + 'T' + time + 'Z';

  console.log(randomID,"randomID. -a- refers to Armchair mapping, -f- refers to field mapping")
  //console.log('DATETIME',dateTime)

  // var date1 = new Date(date)
  // console.log(date1)

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
  // var allLandUses = [1]
  // //land uses array filtered.
  // var allLandUsesFiltered = allLandUses.filter(noNull => noNull != null);
  // ////console.log(allLandUsesFiltered)
  // var landUses = allLandUsesFiltered.toString();
  // //to convert emojis from unicode to short name, before the data is transmitted
  // //value of boxcontent is obtained again (was obtained in 'confirm'), in case user click on 'confirm' before filling in the box
  // //console.log('issuespecific',issueSpecific)
  // if(landUse == 'emojiNoSapelli'){
  //   // boxContent = document.getElementById('emojionearea').value;
  //   var boxContentToShortname = document.getElementById('emojionearea').value;
  //   //console.log(boxContent)
  // }else{
  //   // var emojioneareaeditor = document.getElementsByClassName('emojionearea-editor')
  //   // var emojioneareaeditor0 = emojioneareaeditor[0]
  //   // boxContent = document.getElementById('emojionearea').value
  //   var boxContentToShortname = document.getElementById('emojionearea').value
  //
  // }
  var boxContent = finalAttributes
  var boxContentToString = finalAttributes.toString();
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
  // if(imageName1 == null){
  //   propertiesGeoJSON = {
  //       // 'geometryCenter':geometryCenter,
  //       'landUses': boxContentToString,
  //       'landUsesEmoji': boxContent,
  //       'OP': openOrPrivate,
  //       'phoneNumber': localStorage.getItem('phoneNumber'),
  //       'audioAvailable': audioAvailable,
  //       'areaPolygon': finalAreaAcres2Decimals,
  //       'lengthLine': finalLength2Decimals,
  //       // 'dateTime': '2021-8-10T6:9:26Z', // for testing
  //       'dateTime': dateTime,
  //       'timeSpendSeconds': totalTimeSpent,
  //       'dist_m_Participant_Feature': distanceObfTrunc,
  //       'randomID': randomID,
  //       'geometrystring':data.toString(),
  //       'screensize':screensize,
  //       'sapProjID': sapelliProjectIdentifier
  //   };
  //
  //     propertiesGeoJSONURL = {
  //         'randomID': randomID,
  //         'LU': boxContent,
  //         'OP': openOrPrivate,
  //         'A': finalAreaAcres2Decimals,
  //         'L': finalLength2Decimals,
  //         'D': dateTime,
  //
  //     };
  //   }else{
      propertiesGeoJSON = {
          // 'geometryCenter':geometryCenter,
          // 'landUses': boxContentToString,
          'Description': boxContent,
          'OP': openOrPrivate,
          'phoneNumber': localStorage.getItem('phoneNumber'),
          'screen1':imageName1,
          'screen2':imageName2,
          'screen2':imageName3,
          'kidsmale':kidsmale,
          'kidsfemale':kidsfemale,
          'adultmale':adultmale,
          'adultfemale':adultfemale,
          'household':household,
          // 'audioAvailable': audioAvailable,
          'areaPolygon': finalAreaAcres2Decimals,
          'lengthLine': finalLength2Decimals,
          'dateTime': dateTime,
          'timeSpendSeconds': totalTimeSpent,
          'dist_m_Participant_Feature': distanceObfTrunc,
          'randomID': randomID,
          'screensize':screensize,
          'I1':imageName1,
          'I2':imageName2,
          'I3':imageName3,
          'sapProjID': sapelliProjectIdentifier
      };
      if(kidsmale == null){
        var privatephonenumber = localStorage.getItem('phoneNumber')
        console.log('phonenumber', privatephonenumber)
        privatephonenumber = privatephonenumber.substr(0, 6)
        console.log('privatephonenumber', privatephonenumber)

        propertiesGeoJSONURL = {
          'Description': boxContent,
          'OP': openOrPrivate,
          'phoneNumber': privatephonenumber,
          // 'sapProjID': sapelliProjectIdentifier,
          'screen1':imageName1,
          'screen2':imageName2,
          'screen2':imageName3,
          'areaPolygon': finalAreaAcres2Decimals,
          'lengthLine': finalLength2Decimals,
          'dateTime': dateTime,
          'randomID': randomID,
          'I1':imageName1,
          'I2':imageName2,
          'I3':imageName3,
        };

      }else{
        var privatephonenumber = localStorage.getItem('phoneNumber')
        console.log('phonenumber', privatephonenumber)
        privatephonenumber = privatephonenumber.substr(0, 6)
        console.log('privatephonenumber', privatephonenumber)

        function extractNumbersFromString(str) {
          const numberRegex = /\d+/g;
          const numbers = str.match(numberRegex);
          return numbers ? numbers.map(Number) : [];
        }
        try{
          // const kidsmalenum = extractNumbersFromString(kidsmale);
          // const kidsfemaleenum =
          // const adultmalenum = extractNumbersFromString(adultmale);
          // const adultfemalenum = extractNumbersFromString(adultfemale);
          // const householdnum = extractNumbersFromString(household);
          // console.log('kidsmalenum',kidsmalenum)

        }catch(e){

        }
        propertiesGeoJSONURL = {
          'Description': boxContent,
          'OP': openOrPrivate,
          'phoneNumber': privatephonenumber,
          // 'sapProjID': sapelliProjectIdentifier,
          'screen1':imageName1,
          'screen2':imageName2,
          'screen2':imageName3,
          'kidsmale':extractNumbersFromString(kidsmale),
          'kidsfemale':extractNumbersFromString(kidsfemale),
          'adultmale':extractNumbersFromString(adultmale),
          'adultfemale':extractNumbersFromString(adultfemale),
          'household':extractNumbersFromString(household),
          'areaPolygon': finalAreaAcres2Decimals,
          'lengthLine': finalLength2Decimals,
          'dateTime': dateTime,
          'randomID': randomID,
          'I1':imageName1,
          'I2':imageName2,
          'I3':imageName3,
        };
        // console.log('kidsmalenum',kidsmalenum)

      }

    // }

    //  adding the properties to the geoJSON file:
    data.properties = propertiesGeoJSON;


    created = false;

    //adding layers to localstorage
    dataStringified = JSON.stringify(data);
    //console.log(dataStringified)

     tempName = randomID // each polygon must have a different name!!!
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

     ////console.log(document.getElementsByClassName('emojibtn'))
     featureType = null; //to avoid error of length not recognised when on map click
     //to convert geojson into File format
     dataFile = new File([dataStringified], nameGeoJSON, {
         type: "application/json",
     });
     ////console.log(dataFile)

         files = [dataFile]
         filesLength = 1
         created = false; // redundant (to ensure that when DELETE is clicked the sql query is the delete one, not the last Insert query)

       isFirstTime = false
       return propertiesGeoJSON && tempName && dataStringified && isFirstTime && filesArray
}
/////////////////////////////////////////  screenS SHARE-DOWNLOAD  /////////////////////////////////////

document.getElementById('goBackClassification').onclick = function(e){
  openOrPrivate = null
  clickCountShareFinal = 0
  screen1 = null
  document.getElementById('showAreaAcres').style.display = 'none'
  document.getElementById('showAreaAcresScreenshot').style.display = 'none'
  // document.getElementById('showpadlock').style.display = 'none'
  document.getElementById('ShareFinalButton').style.borderColor = 'white'
  document.getElementById('ShareFinalButton').style.backgroundColor = 'white'
  document.getElementById("imagesharefinalbutton").src = 'images/sendComment.png'
  document.getElementById('showAreaAcresScreenshot').style.display = 'none'
  try{
    $('#screenshots').empty()
  }catch(e){
    console.log(e)
  }




  document.getElementById('goBackClassification').style.display = 'none';
  document.getElementById('shareMessagingAppsDirect').style.display = 'none';
  document.getElementById('shareWorldButton').style.display = 'none';
  document.getElementById('ShareFinalButton').style.display = 'none';

  document.getElementById("shareWorldButton").style.backgroundColor = 'white'
  document.getElementById("shareWorldButton").style.borderColor = 'white'
  document.getElementById("shareMessagingAppsDirect").style.backgroundColor = 'white'
  document.getElementById("shareMessagingAppsDirect").style.borderColor = 'white'
  document.getElementById('ShareFinalButton').disabled = true;
  document.getElementById('ShareFinalButton').style.opacity = 0.5;

  document.getElementById('camera').style.display = 'none';
  document.getElementById('camera').style.opacity = '1'
  document.getElementById('camera').disabled = false
  document.getElementById('screenshot').style.display = 'none'
  // document.getElementById('screenshot').style.opactiy = '1'
  document.getElementById('screenshot').disabled = false
  document.getElementById('camera').style.borderWidth = '0px'
  document.getElementById('screenshot').style.borderWidth = '0px'

  // landUse = 'emojiNoSapelli'
  clickCountSendButton = 0
  imageName1 = null
  imageName2 = null
  imageName3 = null
  attachPhoto = false
  try{
    iconCT1.style.display = 'none'
    iconCT2.style.display = 'none'
    iconCT3.style.display = 'none'
    iconCT4.style.display = 'none'
    iconE1.style.display = 'none'
    iconE2.style.display = 'none'
    screen1 = null
    screen2 = null
    screen3 = null
    // livestockdisseasetype = null
    kidsmale = null
    kidsfemale = null
    adultmale = null
    adultfemale = null
    household = null
  }catch(e){}

  document.getElementById('emojionearea').value = null

  startCheckingText()

  clickedshareMessagingAppsDirect = false
  photoAccepted = null //this is to not attach a picture taken in the previous mapping in the same session
  screenshotOn = false

showButtons()
return clickedshareMessagingAppsDirect && imageName1 && imageName2 && imageName3 && attachPhoto && photoAccepted && screenshotOn && screen1 && screen2 &&
screen3 && kidsmale && kidsfemale && adultmale && adultfemale && household && clickCountShareFinal
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
var clickedshareMessagingAppsDirect = false
var openOrPrivate



document.getElementById('shareMessagingAppsDirect').onclick = function(e){
  openOrPrivate = 'private'
  document.getElementById('shareMessagingAppsDirect').disabled = true
  document.getElementById('shareMessagingAppsDirect').style.backgroundColor = 'yellow'
  document.getElementById('shareMessagingAppsDirect').style.borderColor = 'black'

  document.getElementById('shareWorldButton').disabled = false
  document.getElementById('shareWorldButton').style.backgroundColor = 'white'
  document.getElementById('shareWorldButton').style.borderColor = 'transparent'

  document.getElementById('ShareFinalButton').disabled = false;
  document.getElementById('ShareFinalButton').style.opacity = 1;
  // document.getElementById("shareMessagingApp").style.display = "initial";
  return openOrPrivate
}

document.getElementById('shareWorldButton').onclick = function(e) {

  if(isOnline == true){
    openOrPrivate = 'open'
  }else{
    openOrPrivate = 'offlineOpen'
  }
  document.getElementById('shareWorldButton').disabled = true
  document.getElementById('shareWorldButton').style.backgroundColor = 'yellow'
  document.getElementById('shareWorldButton').style.borderColor = 'black'

  document.getElementById('shareMessagingAppsDirect').disabled = false
  document.getElementById('shareMessagingAppsDirect').style.backgroundColor = 'white'
  document.getElementById('shareMessagingAppsDirect').style.borderColor = 'transparent'

  document.getElementById('ShareFinalButton').disabled = false;
  document.getElementById('ShareFinalButton').style.opacity = 1;

  return openOrPrivate
}

var shareworld = function(){


        encodeGeoJSON(data,propertiesGeoJSON)

              //to fire click event of upload button !!
              ////////////////////////////       CARTO - POST DATA      //////////////////////////////////////////
              //first, we define the variables that store the attributes
              // propertiesGeoJSON = data.properties
              // //to assign each attribute to a variable, which will be added as columns to the DB
              // landUses = propertiesGeoJSON.landUses;
              // landUsesEmoji = propertiesGeoJSON.landUsesEmoji;
              // openOrPrivate = propertiesGeoJSON.openOrPrivate;
              // phoneNumber = propertiesGeoJSON.phoneNumber;
              // areaPolygon = propertiesGeoJSON.areaPolygon;
              // lengthLine = propertiesGeoJSON.lengthLine;
              // dateTime = propertiesGeoJSON.dateTime;
              // timeSpendSeconds = propertiesGeoJSON.timeSpendSeconds;
              // dist_m_Participant_Feature = propertiesGeoJSON.dist_m_Participant_Feature;
              // randomID = propertiesGeoJSON.randomID;
              //console.log('areaPolygon',areaPolygon)
                  setData(); //Call the setDdata() function!!! to post data to database. If audio is available, set data is called in sendfirebase function

            featureSent = true;

          clickedshareMessagingAppsDirect = false
          finalAreaAcres2Decimals = null
          finalLength2Decimals = null
          timeStart = new Date(); // to reset time start in case more contributions in this session

          imageName1 = null
          imageName2 = null
          imageName3 = null
          attachPhoto = false

            field = false

          return featureSent &&  finalAreaAcres2Decimals &&  finalLength2Decimals && timeStart && field && clickedshareMessagingAppsDirect

}
//console.log(deflatedLocalStorage)
var elementJustAddedToLocalStorage = false
document.getElementById('ShareFinalButton').disabled = true;
document.getElementById('ShareFinalButton').style.opacity = 0.5;


var menuopened = false
var clickCountShareFinal = 0
document.getElementById('ShareFinalButton').onclick = function(e) {

    if (clickCountShareFinal == 0) {


        if(photoAccepted == null){
          document.getElementById("imagesharefinalbutton").src = 'images/checkingPw.gif'
          document.getElementById('ShareFinalButton').disabled = false;
          console.log('screenshot clicked')
          screenshotOn == false
          document.getElementById('screenshot').disabled = false

          screenshot.click()
          setTimeout(function(){
              document.getElementById("imagesharefinalbutton").src = 'images/sendComment.png'
              // document.getElementById('ShareFinalButton').style.backgroundColor = 'white';
              document.getElementById('ShareFinalButton').style.borderColor = 'white';
          },12000)

        }else{

          document.getElementById('ShareFinalButton').disabled = false;
          // document.getElementById('ShareFinalButton').style.backgroundColor = '#39F70F';
          document.getElementById('ShareFinalButton').style.borderColor = 'black';




        }

      clickCountShareFinal = 1

    }else{
      if(openOrPrivate == 'open' || openOrPrivate == 'private'  || openOrPrivate == 'offlineOpen'){
        console.log('openorprivate',openOrPrivate)
        if(openOrPrivate == 'open' || openOrPrivate == 'offlineOpen'){
          var emojiprivateoropen ='🔓🌍  '
        }else{
          var emojiprivateoropen ='🔒🔑  '
        }

      try{
        cell.style.backgroundColor = 'white'
        cell.style.display = 'none' //to avoid that the sapprojct icon disapears
        newProjectButton.style.display = 'none'
        newProjectButton2.style.display = 'none'
      }catch(e){}
      finalGeoJSON()
      if(openOrPrivate == 'open'){
        shareworld()
        //console.log('opendata!!!')
      }

    ///////sharemessagingapp/////////////////////////////////////////
        encodeGeoJSON(data,propertiesGeoJSONURL)
          urlX = window.location.href
          keepOnlyLatLngZoomX = urlX.split('#').pop();
          splittedLatLngZoomX = keepOnlyLatLngZoomX.split(',');
          urlLatX = splittedLatLngZoomX[0]
          urlLngX = splittedLatLngZoomX[1]
          urlZoomWithZX = splittedLatLngZoomX[2]
          urlZoomX = urlZoomWithZX.replace('z','')

        // document.getElementById('goBackClassification').style.display = 'none';
        // document.getElementById('shareMessagingAppsDirect').style.display = 'none';
        // document.getElementById('shareWorldButton').style.display = 'none';
        // document.getElementById('DownloadButton').style.display = 'none';
        document.getElementById('Cancel').style.display = 'none';
        // document.getElementById("shareWorldButtonImage").src = 'images/shareworld.png'
        document.getElementById("shareWorldButton").style.backgroundColor = 'white'
        document.getElementById("shareWorldButton").style.borderColor = 'white'
        clickCountSendButton = 0 //!!!!!!!!!!!
        shareURL = 'encodedGeoJSON'

        // if(clickedshareMessagingAppsDirect == false){
        failRandomID = tempName
        failgeoJSON = dataStringified
          geoJSONLocalforageDB.setItem(tempName, dataStringified)
          var newGeom = JSON.parse(dataStringified)
          //console.log(newGeom)
          groupGeoJSON = newGeom
          localStorageToGeoJSON()
          clickedshareMessagingAppsDirect = true
        // }
        //  if(isOnline == false && openOrPrivate == 'open'){
        //   geoJSONofflineCARTO.setItem(tempName, dataStringified)
        //   var newGeom = JSON.parse(dataStringified)
        //   groupGeoJSON = newGeom
        //   // localStorageToGeoJSON()
        // }


        // }else if(shareURL == 'encodedGeoJSON'){
          // console.log(propertiesGeoJSONURL.landUsesEmoji)
          var attributes =  document.getElementById('emojionearea').value
          // var clickableText = 'click me'
          // var clickableTextHyperlinked = clickableText.link(convertedDataShareDirect)
          // var url = encodeURIComponent(attributes+ ' '+'   🗺️ 👇'+' '+'https://amappingprototype.xyz/'+'?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z')
          // try{
            attributes = attributes.replace(/<br>|<\/br>|<br\/>|null/g, "");
            // attributes = attributes.replace(/null/g, "");
            //console.log(attributes)

          // }catch(e){}
          //console.log('attribute',attributes)

          console.log(photoAccepted)

          var link = emojiprivateoropen + attributes + "\n" + '🗺️ 👇🏿'+ "\n" + 'https://md.kapta.app/?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z'
          // var url
          // console.log(url)

            if(navigator.canShare && photoAccepted == null && screenshotOn == false){
              console.log('without photo')
              navigator.share({
                text: emojiprivateoropen + attributes,
                //files:filesArray, //////////////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                url:'https://md.kapta.app/?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z'
              }).then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));

            }else if(navigator.canShare && navigator.canShare({ files: filesArrayScreenshot }) && photoAccepted == null && screenshotOn == true){
                console.log('with sreenshot')

                navigator.share({
                  files:filesArrayScreenshot, //////////////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                  text: emojiprivateoropen + attributes,
                  url:'https://md.kapta.app/?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z',
                }).then(() => console.log('Successful share'))
                  .catch((error) => console.log('Error sharing', error));

            }else if(navigator.canShare && navigator.canShare({ files: filesArray }) && photoAccepted != null){
              console.log('with photo')

              navigator.share({
                files:filesArray, //////////////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                text: emojiprivateoropen + attributes,
                url:'https://md.kapta.app/?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z',
              }).then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));



            }else{
              try{
                navigator.share({
                  // files:filesArray, //////////////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                  text: link,
                  // url:'https://md.kapta.app/?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z',
                }).then(() => console.log('Successful share'))
                  .catch((error) => console.log('Error sharing', error));
              }catch(e){
                // console.log(url)
                navigator.clipboard.writeText(link).then(function() {
                  // console.log(url)

                  alert("Copied to clipboard!");
                }, function() {
                  alert("Unable to copy");
                });
              }

            }
    /////////////////////////////////////////////////////////////////////////////////////////

        filterLocalStorage_Button.button.style.opacity = '1';
        filterLocalStorage_Button.button.disabled = false;


          // landUse = 'emojiNoSapelli'
          hideButtons()


        drawnItems.clearLayers();
        tempLayer.clearLayers()

        document.getElementById("Alert").style.opacity = '0'


        document.body.style.backgroundColor = "white";
        document.body.style.color = "white"; //cheating here, this is to hide a f** 'undefined' that appear on top of the video. Anyway, solved

        ////////////////////////  TRANSMISSION ////////////////////////////////////////
        finished = true;


            document.getElementById("deleteAllVertexs").style.opacity = "0.35";
            document.getElementById("deleteAllVertexs").disabled = true;
            document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
            document.getElementById("deleteAllVertexsLine").disabled = true;
            document.getElementById("completeFeature").style.opacity = "0.35";
            document.getElementById("completeFeature").disabled = true;

            document.body.style.backgroundColor = "black";
            document.body.style.color = "black"; //cheating here, this is to hide a f** 'undefined' that appear on top of the video. Anyway, solved

            document.getElementById("shareMessagingAppsDirect").style.backgroundColor = 'white'
            document.getElementById("shareWorldButton").style.backgroundColor = 'white'

            document.getElementById("shareMessagingAppsDirect").style.borderColor = 'white'
            document.getElementById("shareWorldButton").style.borderColor = 'white'

            document.getElementById("map").style.height = "100%";
            document.getElementById("shareWorldButton").style.display = "none";
            document.getElementById("shareMessagingAppsDirect").style.display = "none";
            document.getElementById("goBackClassification").style.display = "none";
            document.getElementById("ShareFinalButton").style.display = "none";
            document.getElementById("ShareFinalButton").disabled = true;
            document.getElementById('shareMessagingAppsDirect').disabled = false;
            document.getElementById('shareWorldButton').disabled = false;
            document.getElementById('showAreaAcresScreenshot').style.display = 'none'
            // document.getElementById("openorprivate").style.display = 'none'
            document.getElementById('showAreaAcresScreenshot').style.display = 'none'
            try{
              $('#screenshots').empty()
            }catch(e){
              console.log(e)
            }



            document.getElementById('camera').style.display = 'none'
            document.getElementById('screenshot').style.display = 'none'
            document.getElementById('camera').style.borderWidth = '0px'
            document.getElementById('screenshot').style.borderWidth = '0px'
            document.getElementById('showAreaAcres').style.display = 'none'

            document.getElementById("tutorial").style.display = "initial";
            document.getElementById("armchair").style.display = "initial";
            document.getElementById("field").style.display = "initial";

            myLayer_Button.button.style.opacity = '1';
            myLayer_Button.button.disabled = false;

            gps_Button.button.style.opacity = '1';
            gps_Button.button.disabled = false;
            filterLocalStorage_Button.button.style.opacity = '1';
            filterLocalStorage_Button.button.disabled = false;

            planet_Button.button.style.opacity = '1';
            planet_Button.button.disabled = false;
            googleSat_Button.button.style.opacity = '1';
            googleSat_Button.button.disabled = false;
            osm_Button.button.style.opacity = '1';
            osm_Button.button.disabled = false;

            try{
              cell.style.backgroundColor = 'black'

            }catch(e){}

            // if(whichLayerIsOn == 'deflated'){
            //   document.getElementById('myLayerButton').click()
            //   document.getElementById('myLayerButton').click()
            // }if(whichLayerIsOn == 'localStorage'){
            //   document.getElementById('myLayerButton').click()
            // }

            clickCountSendButton = 0 //!!!!!!!!!!!
            //finalLayer is added at the end as the properties are different depending on if share or download


            map.dragging.enable();
            map.touchZoom.enable();
            map.doubleClickZoom.enable();
            map.scrollWheelZoom.enable();
            map.boxZoom.enable();
            map.keyboard.enable();
            // googleSatOnly.removeFrom(map)
            // googleSat.addTo(map)


            if (map.tap) map.tap.enable();
            document.getElementById('map').style.cursor='grab';
            elementJustAddedToLocalStorage = true
            document.getElementById('emojionearea').value = null
            document.getElementById('screenshot').disabled = false
            document.getElementById('camera').disabled = false
            document.getElementById('ShareFinalButton').style.backgroundColor = 'white'
            document.getElementById('ShareFinalButton').style.borderColor = 'white';
            document.getElementById('ShareFinalButton').disabled = false;




            document.getElementById("Alert").style.opacity = '1'

              clickedshareMessagingAppsDirect = false
              field = false
              clickCountShareFinal = 0
              imageName1 = null
              imageName2 = null
              imageName3 = null
              attachPhoto = false
              screenshotOn = false
              screen1 = null
              screen2 = null
              screen3 = null
              kidsmale = null
              kidsfemale = null
              adultmale = null
              adultfemale = null
              household = null
              openOrPrivate = null
        } //for the first because the fucking disable doesn't work
    }
  // menuopened = false
  // $('#screenshots').empty() // this is to clear the cancelled screenshots

    return clickCountShareFinal && finished && whichLayerIsOn && localStorageLayer && elementJustAddedToLocalStorage && field && fetchLast && groupGeoJSON && clickedshareMessagingAppsDirect && imageName1 && imageName2 && imageName3 && attachPhoto && screenshotOn
          && shareURL && mapposLat  && mapposLng && mapposZoom && urlX && urlLatX && urlLngX && urlZoomX && groupGeoJSON && clickedshareMessagingAppsDirect && clickCountSendButton && screen1 && groupGeoJSON && imageName1 && imageName2 && imageName3 && attachPhoto &&
          screen1 && screen2 && screen3 && kidsmale && kidsfemale && adultmale && adultfemale && household && openOrPrivate && menuopened && failRandomID && failgeoJSON
}

// end
//}//run JS download code
