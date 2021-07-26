
//the map is initialised if not first load or when key is clicked

setTimeout(function(){
  document.getElementById('loginInfo').style.opacity = '1'
  document.getElementById('loginInfo').disabled = false
  document.getElementById('loginKey').style.opacity = '1'
  document.getElementById('loginKey').disabled = false
  // if(isIOS == true){
  //   document.getElementById('AlertModalIOS').style.display = 'initial'
  // }
    document.getElementById('AlertModalIOS').style.display = 'initial'
    document.getElementById("AlertModalIOS").style.fontFamily = 'Ubuntu'


},1900)

document.getElementById('loginInfo').onclick = function(){
  window.location.href = 'pages/tutorial.html';
}
document.getElementById('loginKey').onclick = function(e){
  e.preventDefault() //to avoid reload
  document.getElementById('loginKey').disabled = true
  document.getElementById('loginKey').style.display = 'none'
  document.getElementById('loginInfo').style.display = 'none'

  // setTimeout(function(){
  //   document.getElementById('loginKey').style.opacity = '1'
  //   document.getElementById('loginInfo').style.opacity = '1'
  // },100)

  // document.getElementById('textPwScreen').style.display = 'initial';

  //runJSselectFeature()
  document.getElementById('loginKey').style.backgroundColor = '#D5D6D5'
  document.getElementById('enteredPw').style.display = 'initial';
  document.getElementById('enteredPw').focus() //to open keyboard!!!
  document.getElementById('login').style.display = 'initial';
  initialiseMap() //map initialised but not shown

  try{
    $(document).keypress(
      function(event){
        if (event.which == '13') {
          event.preventDefault();
        }
    });
  }catch(e){
    console.log('error disable enter key catched')
  }

 //console.log(loaded)
//return loaded
}




var firstLoad = function() { //fucntion to determine if the site is visited for first time
  // console.log('isfirstload??')
  //$.getScript("lib/leaflet/plugins/Leaflet.draw-1.0.4/src/Leaflet.Draw.Event.js")
    // Check if localStorage is available (IE8+) and make sure that the visited flag is not already set.
    if (typeof window.localStorage !== "undefined" && !localStorage.getItem('visited')) {
        // Set visited flag in local storage
        localStorage.setItem('visited', true);
        isFirstTime = true;
        // console.log('stored in local sotrage')
        /////////////////////    password protection for first time /////////////////

        ////////////////////    login  input    ///////////
        // var checkDone = setInterval(function(){
        //   console.log('done',done)
        //   if(done==true){clearInterval(checkDone)}
        //   return done
        //   })
        requestPw()


    }else if(!localStorage.getItem('pwCorrect')){  //condition to ensure that if in first load pw was incorrect, pw is requested until correct !!!!!!!!!!!!!!!!!!!!!!!

        // console.log('!localStorage.getItem(pwCorrect')
        requestPw()
    }else {
      // console.log('recognised not first time')

      initialiseMap() //map initialised AND LOADED (no modal)
      requestCartoData()
        isFirstTime = false;
        try{
        //  fetchFromLocalStorage()
        //  localStorageToGeoJSON()
        }catch(e){}

    }
    return isFirstTime;
}
window.onload = firstLoad;  /// to launch the root function XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXS
var done = false

var requestCartoData = function() {
    if (isOnline == true && cartousername != null) {
      sqlQuery = "SELECT cartodb_id, the_geom, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date, commentone, commentoneaudioavailable FROM lumblu";

        clearInterval(requestCartoData);
        function getGeoJSON() {
            $.getJSON({
              cache:false,
              success:cartoGeoJSONLayer,
              url:"https://" + cartousername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + sqlQuery + cartoapiSELECT
            })
            return cartoLoaded && cartoIdFeatureSelected && selectedFeature && cartoGeometries;
        };
      getGeoJSON(); //////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        //funtion to get geojson with 🌐 to be used in random suggestion
        function getGeoJSONRandom(){ ///RANDOM!!!!!!!!!!!!!!!

          var sqlQueryRandom = "SELECT cartodb_id, the_geom, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date, commentone, commentoneaudioavailable FROM lumblu WHERE LEFT(landusesemoji,1)='🌐'";
          $.getJSON({
            cache:false,
            success:randomLayer,
            url:"https://" + cartousername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + sqlQueryRandom + cartoapiSELECT
          })
        }
        getGeoJSONRandom() ////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
    return cartousername
}


var initialiseMap = function(){
  document.getElementById("app-css").disabled = false
  document.getElementById("customIcons-css").disabled = false
  document.getElementById("slider-css").disabled = false
  document.getElementById("leaflet-css").disabled = false
  document.getElementById("emojionearea-css").disabled = false
  document.getElementById("easybutton-css").disabled = false
  document.getElementById("rose-css").disabled = false
  document.getElementById("draw-css").disabled = false
  document.getElementById("cluster-css").disabled = false
  document.getElementById("clusterDefault-css").disabled = false
  // $.getScript( "scripts/app.js" , function(){console.log('script gotten')});
      $.when(

          $.getScript({
            cache:true,
            url:'scripts/lib/d3.min.js',
             // success: console.log('d3 fetched')
          }),
          $.getScript({
            cache:true,
            url:'scripts/lib/topojson.min.js'
          }),
          $.getScript({
            cache:true,
            url:'scripts/lib/leaflet/plugins/leaflet-globeminimap-master/src/Control.GlobeMiniMap.js'
          }),
      $.Deferred(function( deferred ){
          $( deferred.resolve );
      })
    ).done(function(){
      // console.log('all script loaded')
      //place your code here, the scripts are all loaded
      document.getElementById("map").style.display = "initial";
      document.getElementById("tutorial").style.display = "initial";
      document.getElementById("armchair").style.display = "initial";
      document.getElementById("field").style.display = "initial";
      // document.getElementById("gobackArmchairField").style.display = "initial";

      // document.getElementById("polygon").style.display = "initial";
      // document.getElementById("polyline").style.display = "initial";
      // document.getElementById("point").style.display = "initial";
      document.getElementById("map").style.display = "block";
      //addLeafletAttribute()

      osm_Button.addTo(map);
      myLayer_Button.addTo(map); //always on as there will always be features in the map, even when first load
      filter_Button.addTo(map);
      googleSat.addTo(map)
      scale.addTo(map)
      gps_Button.addTo(map);

      var rose = L.control.rose('rose', {
          position: 'topleft',
          icon: 'nautical',
          iSize: 'medium',
          opacity: 1
      }).addTo(map)
      document.getElementById('rose').style.marginBottom = '5px' // to avoid extra margin, visible when offline buttons appear
      emojiRequest()
      //rose.addTo(map)
      startSearchingLocation()
      deflated.addTo(map) // to initialize //////////////////////!!!!!!!!

      function preload(arrayOfImages) {
        $(arrayOfImages).each(function(){
            try{
                $('<img/>')[0].src = this;
            }catch(e){
              //console.log('image failed to preload')
            }

            // Alternatively you could use:
            // (new Image()).src = this;
        });
      }
        // Usage:

        preload([
            'images/ThumbsUpGreen.png','images/checkingPw.gif',
            'images/armchair.png','images/field.png', 'images/tvSmall.png',
            'images/drawPolygon.png','images/line.png','images/point.png',
            'images/applyFilter.png','images/arrowLeft.png', 'images/arrowRight.png', 'images/backButton.png','images/bin.png','images/binOriginal.png','images/binpost.png',
            'images/binpre.png','images/burger.png','images/burgerBlack.png','images/cancel.png','images/clearFilter.png','images/commentFeature.png',
            'images/dateAll.png','images/dateDay.png','images/dateMonth.png','images/dateWeek.png','images/dateYear.png','images/deleteAllVertex.png',
            'images/deleteLastVertex.png','images/devicedownload.png','images/download.png','images/filterIcon.png',
            'images/google.png','images/googleHistorical.png','images/gps.png','images/gpsOff.png','images/gpsSearching.gif','images/gpsSearchingIOS.gif',
            'images/infoGoBack.png','images/key.png','images/lineDeleteAll.png','images/lineDeleteVertex.png',
            'images/locked.png','images/man.png','images/marker-icon.png','images/marker-icon-2x.png','images/marker-icon-cian.png','images/markerPolygonBlue.png','images/markerLine.png','images/markerPolygon.png',
            'images/markerLocalStorage.png','images/myLayer.png','images/nautical.svg','images/osm.png',
            'images/other1.png','images/play.png','images/PlusSign.png',
            'images/questionmark.png','images/random.png','images/shareMessagingApps.png','images/shareworld.png','images/shareworldConfirm.png',
            'images/uk.png','images/kenyaTutorial.png','images/other1.png','images/underConstruction.png','images/youtube.png','images/youtubeOffline.png',
            'images/shareMessagingAppsYellow.png','images/sendComment.png',
            'images/sent.mp4','images/downloaded.mp4','images/LocalStorageRecenter.png',
            'images/excitesTree.png','images/KenyaMaasaiMARA/logoMara.png','images/KenyaMaasaiMARA/logoKenyaGeneric.png','images/KenyaMaasaiMAU/logoMau.png','images/KenyaEMC/logoKenyaEMC.png',
            'images/customIconsMap.png','images/customIconsCancel.png',


        ]);
      // var images = new Array()
      //       function preload() {
      //         for (i = 0; i < preload.arguments.length; i++) {
      //           images[i] = new Image()
      //           images[i].src = preload.arguments[i]
      //         }
      //       }
      //       preload(
      //               'images/drawPolygon.png','images/line.png','images/point.png',
      //               'images/applyFilter.png','images/arrowLeft.png', 'images/arrowRight.png', 'images/backButton.png','images/bin.png','images/binOriginal.png','images/binpost.png',
      //               'images/binpre.png','images/burger.png','images/burgerBlack.png','images/cancel.png','images/clearFilter.png','images/commentFeature.png',
      //               'images/customise.png','images/dateAll.png','images/dateDay.png','images/dateMonth.png','images/dateWeek.png','images/dateYear.png','images/deleteAllVertex.png',
      //               'images/deleteLastVertex.png','images/devicedownload.png','images/download.png','images/editDelete.png','images/filterIcon.png',
      //               'images/france.png','images/google.png','images/gps.png','images/gpsOff.png','images/gpsSearching.gif','images/gpsSearchingIOS.gif',
      //               'images/info.png','images/infoGoBack.png','images/kenya.png','images/key.png','images/lineDeleteAll.png','images/lineDeleteVertex.png',
      //               'images/locked.png','images/man.png','images/marker-icon.png','images/marker-icon-2x.png','images/marker-icon-cian.png','images/markerLine.png',
      //               'images/markerLocalStorage.png','images/markerPolygon.png','images/myLayer.png','images/namibia.png','images/nautical.svg','images/osm.png',
      //               'images/other.png','images/other1.png','images/planet.png','images/play.png','images/PlusSign.png','images/portugal.png',
      //               'images/questionmark.png','images/random.png','images/record.png','images/shareMessagingApps.png','images/shareworld.png','images/spain.png',
      //               'images/telegram.png','images/ThumbsUpGreen.png','images/uk.png','images/wechat.png','images/whatsapp.png','images/youtube.png',
      //       )


      done = true
      return done
    });
}
var loaded
var authentication
var requestPw = function(){

      //setTimeout(function(){
        document.getElementById('modal').style.display='block';
        // document.getElementById('enteredPw').click()
      //},10000)

      var checkPw = setInterval(function(){
        var pwPlaceholder = document.getElementById('enteredPw').value

        if(pwPlaceholder.length == 4){
          document.getElementById('login').style.borderColor= 'grey'
          document.getElementById('login').disabled = false
          document.getElementById('login').style.opacity='1';
        }
        if(pwPlaceholder.length < 4){
          document.getElementById('login').style.borderColor= 'white'
          document.getElementById('login').style.opacity='0.3';
         document.getElementById('login').disabled = true
        }
      },200)

      // document.getElementById('login').onclick = function(e){
      document.getElementById('login').addEventListener('click',e =>{
        authentication = 'checking' //to avoid failed being stored, if first time fails. Number of fails is limited by Firebase!!!
        clearInterval(checkPw)
        document.getElementById('loginIcon').src = 'images/checkingPw.gif'
        document.getElementById('login').style.borderColor= 'white'

        e.preventDefault() // to avoid page reload on first load!
        var pwPlaceholder = document.getElementById('enteredPw').value

        var checkDoneAndFirebasePW = setInterval(function(){

              openAppPwSuccesful()
            return done && authentication
          },50)

          var randomEmailId = Math.floor(Math.random() * 10);  // this is to prevent the situation where multiple users fail the login with the same account and it bolcks
          var email = 'any'+ randomEmailId + '@any.com' //I've added 10 different email address in Firebase (0-9) with same Pw
          //console.log(randomEmailId)

          var password = '00' + pwPlaceholder // 00 is added as Firebase only allows for a minimum of 6 digits pws

          firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) =>{
              //console.log('success',user)
              authentication = 'successful'

            })
            .catch((e) => {
              authentication = 'failed'
              var errorCode = e.code;
              var errorMessage = e.message;
              //console.log(errorMessage)
              //console.log(errorCode)


            })

          // const promise = firebase.auth().signInWithEmailAndPassword(email,password);
          //
          // promise.catch(e => console.log(e.message));
          //   //console.log(promise)
        var openAppPwSuccesful = function(){
              if(authentication == 'successful' && done == true){  //map loads after this
                document.getElementById('login').disabled = true // to avoid that user clicks twice while waiting, in which case carto layer would load twice
                 //console.log('both')
                 localStorage.setItem('pwCorrect', true);

                clearInterval(checkPw)
                clearInterval(checkDoneAndFirebasePW)
                document.getElementById('enteredPw').style.backgroundColor = '#39F70F' //green color

                requestCartoData()

                setTimeout(function(){
                    document.getElementById('modal').style.display='none';
                    document.getElementById('pwForm').style.display='none';
                    document.getElementById('AlertModalIOS').style.display = 'none'
                    navigator.geolocation.watchPosition(findBuffer,error,watchPositionOptions);

                },1000)
                //in case first load is with url geoJSON -- not the best approach ever, but it works.
                if(urlContainsGeoJSON == true){
                  var activateLocalStorageLayer = setInterval(function(){
                    console.log('checking encodedgeojsonurl')
                    if(localStorageLayer != null){
                      try{
                        document.getElementById('myLayerButton').click()
                        clearInterval(activateLocalStorageLayer)
                      }catch(e){}

                    }
                  },500) // really don't know why this timeout, but keep it for now

                }

              }
              else if(authentication == 'failed'){
                clearInterval(checkDoneAndFirebasePW)


                // console.log('none')

                document.getElementById('enteredPw').style.backgroundColor = 'red'
                document.getElementById('enteredPw').focus() //to maintain keyboard if pw wrong

                setTimeout(function(){
                  //requestPw()
                  document.getElementById('enteredPw').style.backgroundColor = 'white'
                  document.getElementById('loginIcon').src = 'images/ThumbsUpGreen.png'
                  document.getElementById('login').style.borderColor= 'grey'
                  // document.getElementById('login').style.borderColor = 'red'


                },500)
              }

            }
        // return loaded

    })//login
}//requesPW
