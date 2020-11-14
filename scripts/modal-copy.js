
document.getElementById('loginInfo').onclick = function(){
  window.location.href = 'pages/tutorial.html';
}
document.getElementById('loginKey').onclick = function(e){
  e.preventDefault() //to avoid reload
  //runJSselectFeature()
  document.getElementById('loginKey').style.backgroundColor = '#D5D6D5'
  document.getElementById('enteredPw').style.display = 'initial';
  document.getElementById('enteredPw').focus() //to open keyboard!!!
  document.getElementById('login').style.display = 'initial';
  initialiseMap() //map initialised but not shown

 console.log(loaded)
//return loaded
}
// var checkLoaded = setInterval(function(){
//   if(loaded == true){
//     console.log('map has been initialised')
//       initialiseMap() //map initialised but not shown
//
//     clearInterval(checkLoaded)
//
//   }
//   return loaded
// },500)



var firstLoad = function() { //fucntion to determine if the site is visited for first time
  console.log('isfirstload??')
  //$.getScript("lib/leaflet/plugins/Leaflet.draw-1.0.4/src/Leaflet.Draw.Event.js")
    // Check if localStorage is available (IE8+) and make sure that the visited flag is not already set.
    if (typeof window.localStorage !== "undefined" && !localStorage.getItem('visited')) {
        // Set visited flag in local storage
        localStorage.setItem('visited', true);
        isFirstTime = true;
        console.log('stored in local sotrage')
        /////////////////////    password protection for first time /////////////////

        ////////////////////    login  input    ///////////
        // var checkDone = setInterval(function(){
        //   console.log('done',done)
        //   if(done==true){clearInterval(checkDone)}
        //   return done
        //   })
        requestPw()

    } else {
      console.log('recognised not first time')
      initialiseMap() //map initialised AND LOADED (no modal)
      // document.getElementById("map").style.display = "initial";
      // document.getElementById("tutorial").style.display = "initial";
      // document.getElementById("polygon").style.display = "initial";
      // document.getElementById("polyline").style.display = "initial";
      // document.getElementById("point").style.display = "initial";
      // document.getElementById("map").style.display = "block";
      // //addLeafletAttribute()
      // osm_Button.addTo(map);
      // myLayer_Button.addTo(map); //always on as there will always be features in the map, even when first load
      // filter_Button.addTo(map);
      // googleSat.addTo(map)
      // scale.addTo(map)
      // startSearchingLocation()


        isFirstTime = false;
        //condition to ensure that if in first load pw was incorrect, pw is requested until correct !!!!!!!!!!!!!!!!!!!!!!!
        if(!localStorage.getItem('pwCorrect')){
          console.log('!localStorage.getItem(pwCorrect')
          requestPw()
        }
        //console.log('isFirstTime  '+ isFirstTime)
    }
    return isFirstTime;
}
window.onload = firstLoad;  /// to launch the root function XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXS
var done = false
var initialiseMap = function(){
  // document.getElementById("app-css").disabled = false
  // document.getElementById("leaflet-css").disabled = false
  // document.getElementById("emojionearea-css").disabled = false
  // document.getElementById("easybutton-css").disabled = false
  // document.getElementById("rose-css").disabled = false
  // document.getElementById("draw-css").disabled = false
  // document.getElementById("cluster-css").disabled = false
  // document.getElementById("clusterDefault-css").disabled = false
  // // $.getScript( "scripts/app.js" , function(){console.log('script gotten')});
  // function getGeoJSON() {
  //     $.getJSON({
  //       cache:false,
  //       success:cartoGeoJSONLayer,
  //       url:"https://" + cartousername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + sqlQuery + cartoapiSELECT
  //     })
  //     return cartoLoaded && cartoIdFeatureSelected && selectedFeature && cartoGeometries;
  // };



  $.when(
    $.getScript({
      cache:true,
      url:'scripts/app.js'
    }),
    $.getScript({
      cache:true,
      url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/Leaflet.draw.js'
    }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/Leaflet.Draw.Event.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/edit/handler/Edit.Poly.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/edit/handler/Edit.SimpleShape.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/edit/handler/Edit.Marker.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/draw/handler/Draw.Feature.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/draw/handler/Draw.Polyline.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/draw/handler/Draw.Polygon.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/draw/handler/Draw.Marker.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/Leaflet.Draw.Event.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/ext/TouchEvents.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/ext/GeometryUtil.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/ext/LineUtil.Intersect.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/ext/Polyline.Intersect.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/ext/Polygon.Intersect.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/Control.Draw.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/Tooltip.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/Toolbar.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/draw/DrawToolbar.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/edit/EditToolbar.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/edit/handler/EditToolbar.Edit.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/lib/leaflet/plugins/Leaflet.draw-1.0.4/src/edit/handler/EditToolbar.Delete.js'
      }),

      $.getScript({
        cache:true,
        url:'scripts/audioButton.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/share-download.js'
      }),
      $.getScript({
        cache:true,
        url:'scripts/firebaseAudioURL.js"'
      }),
      $.getScript({
        cache:true,
        url:'scripts/cartoLayer.js'
      }),

      $.getScript({
        cache:true,
        url:'scripts/createGeometryButtons.js'
      }),




      $.getScript({
        cache:true,
        url:'scripts/lib/d3.min.js',
         success: console.log('d3 fetched')
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
  console.log('all script loaded')
  //place your code here, the scripts are all loaded
  // document.getElementById("map").style.display = "initial";
  // document.getElementById("tutorial").style.display = "initial";
  // document.getElementById("polygon").style.display = "initial";
  // document.getElementById("polyline").style.display = "initial";
  // document.getElementById("point").style.display = "initial";
  // document.getElementById("map").style.display = "block";
  // //addLeafletAttribute()
  // osm_Button.addTo(map);
  // myLayer_Button.addTo(map); //always on as there will always be features in the map, even when first load
  // filter_Button.addTo(map);
  // googleSat.addTo(map)
  // scale.addTo(map)
  // startSearchingLocation()
  //
  //
  // // document.getElementById('rose').style.marginBottom = '5px' // to avoid extra margin, visible when offline buttons appear
  // deflated.addTo(map) // to initialize //////////////////////!!!!!!!!
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
          console.log('done',done)
          // if(done==true){clearInterval(checkDone)}

              if(pwPlaceholder == pocPw && done == true){
                console.log('both')

                clearInterval(checkPw)
                clearInterval(checkDone)
                // loadElements()
                //runJSDownload()
                document.getElementById('enteredPw').style.backgroundColor = '#39F70F'
                setTimeout(function(){
                    if(done == true){
                      document.getElementById('modal').style.display='none';
                      document.getElementById('pwForm').style.display='none';
                    }
                },1000)

                localStorage.setItem('pwCorrect', true);

              }else if(pwPlaceholder == pocPw && done ==false){
                console.log('one')

                document.getElementById('enteredPw').style.backgroundColor = '#39F70F'  /////////////////////////////////////////////////////gif here???

              }else{
                console.log('none')

                document.getElementById('enteredPw').style.backgroundColor = 'red'
                document.getElementById('enteredPw').focus() //to maintain keyboard if pw wrong

                setTimeout(function(){
                  document.getElementById('enteredPw').style.backgroundColor = 'white'
                },300)
              }
        // return loaded

    }//login
}//requesPW
////////////////////////// login initial modal  ///////////////

//if(localStorage.getItem('pwCorrect')){
      // console.log('not first visit')
      // initialiseMap() //map initialised AND loaded because pwcorrect found in LS
      // // //place your code here, the scripts are all loaded
  // document.getElementById("map").style.display = "initial";
  // document.getElementById("tutorial").style.display = "initial";
  // document.getElementById("polygon").style.display = "initial";
  // document.getElementById("polyline").style.display = "initial";
  // document.getElementById("point").style.display = "initial";
  // document.getElementById("map").style.display = "block";
  // //addLeafletAttribute()
  // osm_Button.addTo(map);
  // myLayer_Button.addTo(map); //always on as there will always be features in the map, even when first load
  // filter_Button.addTo(map);
  // googleSat.addTo(map)
  // scale.addTo(map)
  // startSearchingLocation()


// }else{
// ////////////////////    login  input    ///////////
// // var checkDone = setInterval(function(){
// //   console.log('done',done)
// //   if(done==true){clearInterval(checkDone)}
// //   return done
// //   })
// requestPw()
//
//
// document.getElementById('loginInfo').onclick = function(){
//   window.location.href = 'pages/tutorial.html';
// }
// document.getElementById('loginKey').onclick = function(e){
//   e.preventDefault() //to avoid reload
//   //runJSselectFeature()
//   document.getElementById('loginKey').style.backgroundColor = '#D5D6D5'
//   document.getElementById('enteredPw').style.display = 'initial';
//   document.getElementById('enteredPw').focus() //to open keyboard!!!
//   document.getElementById('login').style.display = 'initial';
//   loaded = true
//   console.log(loaded)
// return loaded
// }
//
// var checkLoaded = setInterval(function(){
//   if(loaded == true){
//     console.log('map has been initialised')
//       initialiseMap() //map initialised but not shown
//
//     clearInterval(checkLoaded)
//
//   }
//   return loaded
// },500)
// }
