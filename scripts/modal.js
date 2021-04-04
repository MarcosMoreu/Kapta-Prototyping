
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
      //getGeoJSON(); //////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        //funtion to get geojson with 🌐 to be used in random suggestion
        function getGeoJSONRandom(){ ///RANDOM!!!!!!!!!!!!!!!

          var sqlQueryRandom = "SELECT cartodb_id, the_geom, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date, commentone, commentoneaudioavailable FROM lumblu WHERE LEFT(landusesemoji,1)='🌐'";
          $.getJSON({
            cache:false,
            success:randomLayer,
            url:"https://" + cartousername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + sqlQueryRandom + cartoapiSELECT
          })
        }
        // getGeoJSONRandom() ////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
            'images/armchair.png','images/field.png',
            'images/drawPolygon.png','images/line.png','images/point.png',
            'images/applyFilter.png','images/arrowLeft.png', 'images/arrowRight.png', 'images/backButton.png','images/bin.png','images/binOriginal.png','images/binpost.png',
            'images/binpre.png','images/burger.png','images/burgerBlack.png','images/cancel.png','images/clearFilter.png','images/commentFeature.png',
            'images/dateAll.png','images/dateDay.png','images/dateMonth.png','images/dateWeek.png','images/dateYear.png','images/deleteAllVertex.png',
            'images/deleteLastVertex.png','images/devicedownload.png','images/download.png','images/filterIcon.png',
            'images/google.png','images/gps.png','images/gpsOff.png','images/gpsSearching.gif','images/gpsSearchingIOS.gif',
            'images/infoGoBack.png','images/key.png','images/lineDeleteAll.png','images/lineDeleteVertex.png',
            'images/locked.png','images/man.png','images/marker-icon.png','images/marker-icon-2x.png','images/marker-icon-cian.png','images/markerLine.png',
            'images/markerLocalStorage.png','images/markerPolygon.png','images/myLayer.png','images/nautical.svg','images/osm.png',
            'images/other1.png','images/play.png','images/PlusSign.png',
            'images/questionmark.png','images/random.png','images/shareMessagingApps.png','images/shareworld.png','images/shareworldConfirm.png',
            'images/telegram.png','images/uk.png','images/other1.png','images/underConstruction.png','images/wechat.png','images/whatsapp.png','images/youtube.png','images/youtubeOffline.png',
            'images/shareMessagingAppsYellow.png','images/sendComment.png','images/sms.png',
            'images/sent.mp4','images/downloaded.mp4',
            'images/excitesTree.png','images/logoNigeria.png',
            'images/customIconsMap.png','images/customIconsCancel.png',
            'images/csaNigeria/Crops/Cereals.png','images/csaNigeria/Crops/Vegetables.png','images/csaNigeria/Crops/Fruits.png','images/csaNigeria/Crops/Tubers.png',"images/csaNigeria/Crops/pulses.png",
            "images/csaNigeria/Crops/cashCrop.png","images/csaNigeria/Crops/nuts.png",
            //Crops
            'images/csaNigeria/Crops/Agbalumo.png','images/csaNigeria/Crops/agbon.png','images/csaNigeria/Crops/amaranthus.png','images/csaNigeria/Crops/Awusa.png',"images/csaNigeria/Crops/banana.png",
            "images/csaNigeria/Crops/beans.png","images/csaNigeria/Crops/Cashew.png",'images/csaNigeria/Crops/cassava.png','images/csaNigeria/Crops/coco.png','images/csaNigeria/Crops/cocoa.png',
            'images/csaNigeria/Crops/cocoyam.png',"images/csaNigeria/Crops/cucumber.png",'images/csaNigeria/Crops/Epa.png',"images/csaNigeria/Crops/Esuru.png",'images/csaNigeria/Crops/ewedu.png',
            "images/csaNigeria/Crops/Ewuro.png","images/csaNigeria/Crops/Fruits.png",'images/csaNigeria/Crops/gbure.png','images/csaNigeria/Crops/irishPotato.png','images/csaNigeria/Crops/Isu Ewura.png',
            'images/csaNigeria/Crops/juteLeaf.png',"images/csaNigeria/Crops/Maize.png",'images/csaNigeria/Crops/mangoro.png',"images/csaNigeria/Crops/Obi.png",'images/csaNigeria/Crops/okro.png',
            "images/csaNigeria/Crops/Ope Oyinbo.png","images/csaNigeria/Crops/orange.png", 'images/csaNigeria/Crops/orogbo.png','images/csaNigeria/Crops/palmTree.png','images/csaNigeria/Crops/Pawpaw-.png',
            'images/csaNigeria/Crops/pepper.png',"images/csaNigeria/Crops/plantain.png",'images/csaNigeria/Crops/rice.png',"images/csaNigeria/Crops/sweetPotato.png",'images/csaNigeria/Crops/tangerine.png',
            "images/csaNigeria/Crops/tapon.png","images/csaNigeria/Crops/tomato.png",'images/csaNigeria/Crops/ugu.png','images/csaNigeria/Crops/watermelon.png','images/csaNigeria/Crops/yam.png',
            //landUse

            'images/csaNigeria/landUse/bushBurning.png','images/csaNigeria/landUse/forest.png','images/csaNigeria/landUse/herbicides.png','images/csaNigeria/landUse/nonMechanised.png','images/csaNigeria/landUse/pesticides.png',
            'images/csaNigeria/landUse/Tractor.png','images/csaNigeria/landUse/zeroTillage.png',

            //stages
            'images/csaNigeria/stages/BeforePlantingStage.png','images/csaNigeria/stages/HarvestingStage.png','images/csaNigeria/stages/PestControlStage.png','images/csaNigeria/stages/PlantingStage.png',
            'images/csaNigeria/stages/PostHarvestingStage.png','images/csaNigeria/stages/TopDressingStage.png',
          //issues generic
            'images/csaNigeria/ISSUES/IssuesGeneric/climaticGreen.png','images/csaNigeria/ISSUES/IssuesGeneric/climaticRed.png',
            'images/csaNigeria/ISSUES/IssuesGeneric/disseaseGreen.png','images/csaNigeria/ISSUES/IssuesGeneric/disseaseRed.png',
            'images/csaNigeria/ISSUES/IssuesGeneric/marketGreen.png','images/csaNigeria/ISSUES/IssuesGeneric/marketRed.png',
            'images/csaNigeria/ISSUES/IssuesGeneric/pestGreen.png','images/csaNigeria/ISSUES/IssuesGeneric/pestRed.png',
            'images/csaNigeria/ISSUES/IssuesGeneric/postHarvestGreen.png','images/csaNigeria/ISSUES/IssuesGeneric/postHarvestRed.png',
            'images/csaNigeria/ISSUES/IssuesGeneric/soilGreen.png','images/csaNigeria/ISSUES/IssuesGeneric/soilRed.png',
            'images/csaNigeria/ISSUES/IssuesGeneric/weedGreen.png','images/csaNigeria/ISSUES/IssuesGeneric/weedRed.png',
            //issues - 1 climatic
            'images/csaNigeria/ISSUES/ClimaticIssues/Drought.png','images/csaNigeria/ISSUES/ClimaticIssues/erraticRain.png','images/csaNigeria/ISSUES/ClimaticIssues/flood.png',
            'images/csaNigeria/ISSUES/ClimaticIssues/Irrigation.png','images/csaNigeria/ISSUES/ClimaticIssues/sunIntensity.png','images/csaNigeria/ISSUES/ClimaticIssues/wind.png',
            //issues - 2 marker
            'images/csaNigeria/ISSUES/market/DistanceToMarket.png','images/csaNigeria/ISSUES/market/MeansOfTransport.png','images/csaNigeria/ISSUES/market/price.png',
            'images/csaNigeria/ISSUES/market/roadCondition.png','images/csaNigeria/ISSUES/market/supply.png','images/csaNigeria/ISSUES/market/TheBuyer.png',
            //issues - 3 PostHarvestIssues
            'images/csaNigeria/ISSUES//PostHarvestIssues/bagging.png','images/csaNigeria/ISSUES//PostHarvestIssues/drying.png','images/csaNigeria/ISSUES//PostHarvestIssues/rotten.png',
            'images/csaNigeria/ISSUES//PostHarvestIssues/storage.png','images/csaNigeria/ISSUES//PostHarvestIssues/weatherCondition.png',
            //issues - 4 soil
            'images/csaNigeria/ISSUES/soil/Erosion.png','images/csaNigeria/ISSUES/soil/fertilizer.png','images/csaNigeria/ISSUES/soil/hardpan.png','images/csaNigeria/ISSUES/soil/poorSoil.png',
            //issues - 5 Pest
            "images/csaNigeria/ISSUES/Pest/AfricanRootTuberScale.png",
            "images/csaNigeria/ISSUES/Pest/Aphid.png",
            "images/csaNigeria/ISSUES/Pest/armyWorm.png",
            "images/csaNigeria/ISSUES/Pest/AsianCitrusPsyllid.png",
            "images/csaNigeria/ISSUES/Pest/beetle.png",
            "images/csaNigeria/ISSUES/Pest/cassavaGreenMitePest.png",
            "images/csaNigeria/ISSUES/Pest/CocoaPodBorer.png",
            "images/csaNigeria/ISSUES/Pest/coconutScale.png",
            "images/csaNigeria/ISSUES/Pest/Crickets.png",
            "images/csaNigeria/ISSUES/Pest/cutworms.png",
            "images/csaNigeria/ISSUES/Pest/Earworm.png",
            "images/csaNigeria/ISSUES/Pest/GreenLeafhoppers.png",
            "images/csaNigeria/ISSUES/Pest/GreenSemiloopers.png",
            "images/csaNigeria/ISSUES/Pest/leafFolder.png",
            "images/csaNigeria/ISSUES/Pest/leafminer.png",
            "images/csaNigeria/ISSUES/Pest/leafWebber.png",
            "images/csaNigeria/ISSUES/Pest/leaveTwistingWeevil.png",
            "images/csaNigeria/ISSUES/Pest/locust.png",
            "images/csaNigeria/ISSUES/Pest/Mealybugs.png",
            "images/csaNigeria/ISSUES/Pest/mirid.png",
            "images/csaNigeria/ISSUES/Pest/nematodes.png",
            "images/csaNigeria/ISSUES/Pest/pinkHibiscusMealybug.png",
            "images/csaNigeria/ISSUES/Pest/RiceBug.png",
            "images/csaNigeria/ISSUES/Pest/riceGallMidge.png",
            "images/csaNigeria/ISSUES/Pest/rodents.png",
            "images/csaNigeria/ISSUES/Pest/spidermite.png",
            "images/csaNigeria/ISSUES/Pest/squashBugs.png",
            "images/csaNigeria/ISSUES/Pest/stalkBorer.png",
            "images/csaNigeria/ISSUES/Pest/stemBorer.png",
            "images/csaNigeria/ISSUES/Pest/teaserAnt.png",
            "images/csaNigeria/ISSUES/Pest/thrips.png",
            "images/csaNigeria/ISSUES/Pest/TortoiseBeetle.png",
            "images/csaNigeria/ISSUES/Pest/weavils.png",
            "images/csaNigeria/ISSUES/Pest/WhiteGrubLarvae.png",
            "images/csaNigeria/ISSUES/Pest/whorlMaggot.png",
            "images/csaNigeria/ISSUES/Pest/zigzagLeafhopper.png",
            "images/csaNigeria/UnknownOther.png",
            "images/csaNigeria/ISSUES/Dissease/AlternariaLeafBlight.png",
            "images/csaNigeria/ISSUES/Dissease/AlternariaSpotLeafStemBlight.png",
            "images/csaNigeria/ISSUES/Dissease/BacterialFruitBlotchFoilage.png",
            "images/csaNigeria/ISSUES/Dissease/BacterialWilt.png",
            "images/csaNigeria/ISSUES/Dissease/blackbandJute.png",
            "images/csaNigeria/ISSUES/Dissease/blackPod.png",
            "images/csaNigeria/ISSUES/Dissease/blackRot.png",
            "images/csaNigeria/ISSUES/Dissease/blight.png",
            "images/csaNigeria/ISSUES/Dissease/bractmosaicvirus.png",
            "images/csaNigeria/ISSUES/Dissease/budNecrosisDisease.png",
            "images/csaNigeria/ISSUES/Dissease/CassavaRootRot.png",
            "images/csaNigeria/ISSUES/Dissease/CitrusAnthracnose.png",
            "images/csaNigeria/ISSUES/Dissease/citrusGuignardiaCitricarpaBlackSpot.png",
            "images/csaNigeria/ISSUES/Dissease/CitrusLeprosis.png",
            "images/csaNigeria/ISSUES/Dissease/citrusScab.png",
            "images/csaNigeria/ISSUES/Dissease/ColocasiaBobone.png",
            "images/csaNigeria/ISSUES/Dissease/CucumberMosaic.png",
            "images/csaNigeria/ISSUES/Dissease/downyMildew.png",
            "images/csaNigeria/ISSUES/Dissease/FrostyPod.png",
            "images/csaNigeria/ISSUES/Dissease/FusariumWilt.png",
            "images/csaNigeria/ISSUES/Dissease/InternalBrownSpots.png",
            "images/csaNigeria/ISSUES/Dissease/LeafStemScab.png",
            "images/csaNigeria/ISSUES/Dissease/OkraYellowVien.png",
            "images/csaNigeria/ISSUES/Dissease/PhytophthoraBlight.png",
            "images/csaNigeria/ISSUES/Dissease/pigweed.png",
            "images/csaNigeria/ISSUES/Dissease/PowderyMildew.png",
            "images/csaNigeria/ISSUES/Dissease/Pox.png",
            "images/csaNigeria/ISSUES/Dissease/rodent.png",
            "images/csaNigeria/ISSUES/Dissease/rootAphids.png",
            "images/csaNigeria/ISSUES/Dissease/rust.png",
            "images/csaNigeria/ISSUES/Dissease/southernBlight.png",
            "images/csaNigeria/ISSUES/Dissease/stemCutwormBean.png",
            "images/csaNigeria/ISSUES/Dissease/streak.png",
            "images/csaNigeria/ISSUES/Dissease/SweetOrangeScab.png",
            "images/csaNigeria/ISSUES/Dissease/thrips.png",
            "images/csaNigeria/ISSUES/Dissease/thripsTomato.png",
            "images/csaNigeria/ISSUES/Dissease/TomatoMosaic.png",
            "images/csaNigeria/ISSUES/Dissease/VerticilliumWilt.png",
            "images/csaNigeria/ISSUES/Dissease/wetRot.png",
            "images/csaNigeria/ISSUES/Dissease/whiteMold.png",
            "images/csaNigeria/ISSUES/Dissease/whiteRust.png",
            "images/csaNigeria/ISSUES/Dissease/yellowBlacksigatoka.png",

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

                },1000)
                //in case first load is with url geoJSON -- not the best approach ever, but it works.
                if(urlContainsGeoJSON == true){
                  setTimeout(function(){
                  location.reload();
                },1100)
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
