//the map is initialised if not first load or when key is clicked

setTimeout(function(){
  document.getElementById('loginInfo').style.opacity = '1'
  document.getElementById('loginInfo').disabled = false
  document.getElementById('loginKey').style.opacity = '1'
  document.getElementById('loginKey').disabled = false
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
        isFirstTime = false;
        try{
          console.log('recognised not first time')

          // fetchFromLocalStorage()
          // localStorageToGeoJSON()
        }catch(e){}

    }
    return isFirstTime;
}
window.onload = firstLoad;  /// to launch the root function XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXS
var done = false
var initialiseMap = function(){
  document.getElementById("app-css").disabled = false
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
      document.getElementById("polygon").style.display = "initial";
      document.getElementById("polyline").style.display = "initial";
      document.getElementById("point").style.display = "initial";
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
            }catch(e){console.log('image failed to preload')}

            // Alternatively you could use:
            // (new Image()).src = this;
        });
      }
        // Usage:

        preload([
            'images/ThumbsUpGreen.png','images/drawPolygon.png','images/line.png','images/point.png',
            'images/applyFilter.png','images/arrowLeft.png', 'images/arrowRight.png', 'images/backButton.png','images/bin.png','images/binOriginal.png','images/binpost.png',
            'images/binpre.png','images/burger.png','images/burgerBlack.png','images/cancel.png','images/clearFilter.png','images/commentFeature.png',
            'images/customise.png','images/dateAll.png','images/dateDay.png','images/dateMonth.png','images/dateWeek.png','images/dateYear.png','images/deleteAllVertex.png',
            'images/deleteLastVertex.png','images/devicedownload.png','images/download.png','images/editDelete.png','images/filterIcon.png',
            'images/france.png','images/google.png','images/gps.png','images/gpsOff.png','images/gpsSearching.gif','images/gpsSearchingIOS.gif',
            'images/info.png','images/infoGoBack.png','images/kenya.png','images/key.png','images/lineDeleteAll.png','images/lineDeleteVertex.png',
            'images/locked.png','images/man.png','images/marker-icon.png','images/marker-icon-2x.png','images/marker-icon-cian.png','images/markerLine.png',
            'images/markerLocalStorage.png','images/markerPolygon.png','images/myLayer.png','images/namibia.png','images/nautical.svg','images/osm.png',
            'images/other.png','images/other1.png','images/planet.png','images/play.png','images/PlusSign.png','images/portugal.png',
            'images/questionmark.png','images/random.png','images/record.png','images/shareMessagingApps.png','images/shareworld.png','images/spain.png',
            'images/telegram.png','images/uk.png','images/wechat.png','images/whatsapp.png','images/youtube.png',
            // console.log('images preloaded')
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

var requestPw = function(){
      var pocPw = '2030' //! 🖐️🖐️🖐️ if you are looking at this line, please keep in mind that this very basic security measure is 'only' to prevent, during the testing period,
      // unintended submission by users who have not been informed of the impacts of open land data, both positive and negatives. Thanks ;)

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

      document.getElementById('login').onclick = function(e){
        e.preventDefault() // to avoid page reload on first load!
        var pwPlaceholder = document.getElementById('enteredPw').value
        var checkDone = setInterval(function(){
            return done
          },200)
          // console.log('done',done)
          // if(done==true){clearInterval(checkDone)}

              if(pwPlaceholder == pocPw && done == true){  //map loads after this
                // console.log('both')

                clearInterval(checkPw)
                clearInterval(checkDone)
                document.getElementById('enteredPw').style.backgroundColor = '#39F70F'

                var findCartoCredential = setInterval(function() {
                    if (isOnline == true && cartousername != null) {
                      sqlQuery = "SELECT cartodb_id, the_geom, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date FROM lumblu";

                        clearInterval(findCartoCredential);
                        function getGeoJSON() {
                            $.getJSON({
                              cache:false,
                              success:cartoGeoJSONLayer,
                              url:"https://" + cartousername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + sqlQuery + cartoapiSELECT
                            })
                            return cartoLoaded && cartoIdFeatureSelected && selectedFeature && cartoGeometries;
                        };
                        //getGeoJSON(); //////////////!!!!!!!!!!!!!!!!!!!!!

                        //funtion to get geojson with 🌐 to be used in random suggestion
                        function getGeoJSONRandom(){ ///RANDOM!!!!!!!!!!!!!!!

                          var sqlQueryRandom = "SELECT cartodb_id, the_geom, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date FROM lumblu WHERE LEFT(landusesemoji,1)='🌐'";
                          $.getJSON({
                            cache:false,
                            success:randomLayer,
                            url:"https://" + cartousername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + sqlQueryRandom + cartoapiSELECT
                          })
                        }
                         //getGeoJSONRandom() ////////////////!!!!!!!!!!!!!!!
                    }
                    return cartousername
                }, 100)

                // document.getElementById('login').style.display = 'none'
                // document.getElementById('loginInfo').style.opacity = '0.4'
                // document.getElementById('loginInfo').disabled = true
                // document.getElementById('loginKey').style.opacity = '0.4'
                // document.getElementById('loginKey').disabled = true
                // var i = 0;
                //     function move() {
                //       if (i == 0) {
                //         i = 1;
                //         var elem = document.getElementById("myBar");
                //         var width = 1;
                //         var id = setInterval(frame, 35);
                //         function frame() {
                //           if (width >= 100) {
                //             clearInterval(id);
                //             i = 0;
                //             document.getElementById('modal').style.display='none';
                //             document.getElementById('pwForm').style.display='none';
                //             localStorage.setItem('pwCorrect', true);
                //
                //           } else {
                //             width++;
                //             elem.style.width = width + "%";
                //           }
                //         }
                //       }
                //     }
                // document.getElementById('myProgress').style.display = 'initial'
                //
                // move()
                // document.getElementById('enteredPw').style.backgroundColor = 'green'

                setTimeout(function(){
                    document.getElementById('modal').style.display='none';
                    document.getElementById('pwForm').style.display='none';
                    localStorage.setItem('pwCorrect', true);

                },1000)
                //
                // localStorage.setItem('pwCorrect', true);
              //
              // }else if(pwPlaceholder == pocPw && done ==false){
              //   console.log('one')
              //
              //   document.getElementById('enteredPw').style.backgroundColor = '#39F70F'  /////////////////////////////////////////////////////gif here???

              }else{
                // console.log('none')

                document.getElementById('enteredPw').style.backgroundColor = 'red'
                document.getElementById('enteredPw').focus() //to maintain keyboard if pw wrong

                setTimeout(function(){
                  document.getElementById('enteredPw').style.backgroundColor = 'white'
                },300)
              }
        // return loaded

    }//login
}//requesPW
