var dropDownOpen = false;
var isOnline = navigator.onLine
var browserLanguage = navigator.language
var languageSelected
var geojsonObfuscated


// document.getElementById('english').src = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/png100px/ad.png"
//console.(screen.height)
//console.('innerheight',window.innerHeight)

// document.getElementById('startMapping').onclick = function(e){
//   document.getElementById("startMapping").style.animation = "initial";
//
//
//    setTimeout(function(){
//     //  document.getElementById("startMapping").style.animation = "none";
//     // document.getElementById("english").style.display = "none";
//     // document.getElementById("swahili").style.display = "none";
//     // document.getElementById("other1").style.display = "none";
//     // document.getElementById("other1UnderDev").style.display = "none";
//     // document.getElementById("AlertTranslate").style.display = "none";
//      location.href='../';
//    },100)
//   }
// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com



map.on('load', () => {
// Set the default atmosphere style
map.setFog({
color: 'grey', // Lower atmosphere
    'high-color': '#232222', // Upper atmosphere
    'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
    'space-color': '#232222', // Background color
    'star-intensity': 0 // Background star brightness (default 0.35 at low zoooms )
});
});

var intervalremoveattributes = setInterval(function(){
  try{
    var mapboxattrib1 = document.getElementsByClassName("mapboxgl-ctrl-bottom-right")
    mapboxattrib1[0].style.display = 'none'
    var mapboxattrib2 = document.getElementsByClassName("mapboxgl-ctrl-bottom-left")
    mapboxattrib2[0].style.display = 'none'
  }catch(e){
    console.log('error', e)
  }

},50)
var currentZoom = map.getZoom();

setTimeout(function(){
  clearInterval(intervalremoveattributes)
},2000)

document.getElementById('dropDown').onclick = function(e){

    if(dropDownOpen == false){
      document.getElementById('aboutButton').style.display = "initial";
      document.getElementById('methodologyButton').style.display = "initial";

      if(isOnline == true){
        document.getElementById('technologyButton').style.display = "initial";
        // document.getElementById('methodologyButton').style.display = "initial";

      }
      document.getElementById('dropDown').style.backgroundColor = 'grey';
      document.getElementById('imageDropDown').src = '../images/burgerBlack.png';
      dropDownOpen = true
    }else{
      document.getElementById('aboutButton').style.display = "none";
      document.getElementById('technologyButton').style.display = "none";
      document.getElementById('methodologyButton').style.display = "none";
      document.getElementById('dropDown').style.backgroundColor = 'transparent';
      document.getElementById('imageDropDown').src = '../images/burger.png';

      dropDownOpen = false
    }

    return dropDownOpen
  }
var cognitoFormLoaded = false

document.getElementById('aboutButton').onclick = function(e){
   setTimeout(function(){
     document.getElementById("burgerGobackbutton").style.display = "initial";
     document.getElementById('aboutContent').style.display = 'initial'
     // document.getElementById('TextRequest').style.display = 'initial'

     // document.getElementById("cognitoForm").style.display = "initial";
     document.body.style.overflow = 'visible';
     // document.getElementById('loadingCognito').style.display = "none";
     document.getElementById('dropDown').style.display = "none";
     document.getElementById('technologyButton').style.display = "none";
    document.getElementById('aboutButton').style.display = "none";
    document.getElementById("methodologyButton").style.display = "none";
    document.getElementById('technologyButton').style.display = "none";
    document.getElementById('askthemap').style.display = 'none'
    document.getElementById('dropDown').style.display = 'none'
    document.getElementById('languages').style.display = 'none'
    document.getElementById('kaptainitialscreen').style.display = 'none'
    document.getElementById('map').style.display = 'none'

   },100)
  }

document.getElementById('technologyButton').onclick = function(e){

    setTimeout(function(){
      document.getElementById("burgerGobackbutton").style.display = "initial";
      document.getElementById('technologyContent').style.display = 'initial'
      // document.getElementById("cognitoForm").style.display = "initial";
      document.body.style.overflow = 'visible';
      // document.getElementById('loadingCognito').style.display = "none";
      document.getElementById('dropDown').style.display = "none";
      document.getElementById('technologyButton').style.display = "none";
     document.getElementById('aboutButton').style.display = "none";
     document.getElementById("methodologyButton").style.display = "none";
     document.getElementById('technologyButton').style.display = "none";
     document.getElementById('askthemap').style.display = 'none'
     document.getElementById('dropDown').style.display = 'none'
     document.getElementById('languages').style.display = 'none'
     document.getElementById('kaptainitialscreen').style.display = 'none'
     document.getElementById('map').style.display = 'none'


     // if(cognitoFormLoaded == false){
     //   document.getElementById("loadingCognito").style.display = "initial";
     // }

   },100)
         // Cognito.load("forms", { id: "2" })
         // cognitoFormLoaded = true
         //

  // setTimeout(function(){
  //   document.getElementById("loadingCognito").style.display = "none";
  // },4000)
  // return cognitoFormLoaded
}


document.getElementById('methodologyButton').onclick = function(e){
   setTimeout(function(){

     document.getElementById("burgerGobackbutton").style.display = "initial";
     document.getElementById("methodologyContent").style.display = "initial";

     document.body.style.overflow = 'visible';
     // document.getElementById('loadingCognito').style.display = "none";
     document.getElementById('dropDown').style.display = "none";
     document.getElementById('technologyButton').style.display = "none";
    document.getElementById('aboutButton').style.display = "none";
    document.getElementById("methodologyButton").style.display = "none";
    document.getElementById('technologyButton').style.display = "none";
    document.getElementById('askthemap').style.display = 'none'
    document.getElementById('dropDown').style.display = 'none'
    document.getElementById('languages').style.display = 'none'
    document.getElementById('kaptainitialscreen').style.display = 'none'
    document.getElementById('map').style.display = 'none'


   },100)
  }

document.getElementById('burgerGobackbutton').onclick = function(e){
  // var storeIframeURL = document.getElementById("youtubeVideo").src
   setTimeout(function(){
     document.getElementById("burgerGobackbutton").style.display = "none";
     document.getElementById("aboutContent").style.display = "none";
     document.getElementById("technologyContent").style.display = "none";
     document.getElementById("methodologyContent").style.display = "none";



     // document.getElementById("TextRequest").style.display = "none";

     document.body.style.overflow = 'hidden';

     document.getElementById("aboutButton").style.display = "none";
     document.getElementById("methodologyButton").style.display = "none";
     document.getElementById('technologyButton').style.display = "none";
     // if(languageSelected == 'english'){
       document.getElementById('dropDown').style.backgroundColor = 'transparent';
       document.getElementById('imageDropDown').src = '../images/burger.png';
       document.getElementById('dropDown').style.display = "initial";
       dropDownOpen = false
       document.getElementById('map').style.display = 'initial'

       document.getElementById('askthemap').style.display = 'initial'
       document.getElementById('dropDown').style.display = 'initial'
       document.getElementById('languages').style.display = 'initial'
       document.getElementById('kaptainitialscreen').style.display = 'initial'

   },100)
   return dropDownOpen
  }
var checkTextbox
var youtubeVideoLoaded = false
var searchResult = 'nosearchyet'

document.getElementById('askthemap').onclick = function(){
  document.getElementById('askthemap').style.backgroundColor = '#4B0101'

  setTimeout(function(){
    document.getElementById('classification').style.display = 'initial'
    document.getElementById('emojionearea').style.display = 'initial'
    document.getElementById('backtohomepage').style.display = 'initial'
    document.getElementById('searchWocMap').style.display = 'initial'
  
  
    document.getElementById("Alert").style.display = 'none'
    document.getElementById("aboutButton").style.display = 'none'
    document.getElementById("technologyButton").style.display = 'none'
    document.getElementById("methodologyButton").style.display = 'none'
    // document.getElementById("kaptainitialscreen").style.display = 'none'
    document.getElementById("languages").style.display = 'none'
    document.getElementById("languages").style.display = 'none'
    document.getElementById("dropDown").style.display = 'none'
    document.getElementById("askthemap").style.display = 'none'
    map.flyTo({
      center: [0,10],
      zoom: 2,
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
      setTimeout(function(){
        $("#emojionearea").focus();
      },1000)
  },300)




  // setTimeout(function(){
  //   document.getElementById("bot").style.display = 'none'
  // },4000)

  setTimeout(function(){
    document.getElementById('initialscreen2options').style.display = 'none'
    document.getElementById("map").style.opacity = 1;
    document.getElementById('MapLoading').style.opacity = 1
    document.getElementById('askthemap').style.backgroundColor = 'white'
    var mapboxattrib1 = document.getElementsByClassName("mapboxgl-ctrl-bottom-right")
    mapboxattrib1[0].style.display = 'initial'
    var mapboxattrib2 = document.getElementsByClassName("mapboxgl-ctrl-bottom-left")
    mapboxattrib2[0].style.display = 'initial'
    var mapboxattrib = document.getElementsByClassName("mapbox-improve-map")
    mapboxattrib[0].innerHTML = ''
    var mapboxattribbox = document.getElementsByClassName("mapboxgl-ctrl-bottom-right")
    mapboxattribbox[0].style.backgroundColor = '#fffff'

  },200)

}
document.getElementById('backtohomepage').onclick = function(e){
  document.getElementById('askthemap').style.backgroundColor = '#740202'

  var emojioneareaeditor0 = document.getElementById('emojionearea')

emojioneareaeditor0.value = ''
document.getElementById('classification').style.display = 'none'
document.getElementById('emojionearea').style.display = 'none'
document.getElementById('backtohomepage').style.display = 'none'
document.getElementById('searchWocMap').style.display = 'none'
document.getElementById('bot').style.display = 'none'
// map.removeSource('test')
map.removeLayer('test')

map.flyTo({
  center: [0,10],
  zoom: 2,
  essential: true // this animation is considered essential with respect to prefers-reduced-motion
  });

  // filter_Button.addTo(map);
  //
  // document.getElementById('filter').click()
  // filter_Button.removeFrom(map);
  // document.getElementById('tutorial').click()

  clearInterval(checkTextbox)
  document.getElementById('initialscreen2options').style.display = 'initial'

  document.getElementById('askthemap').style.display = 'initial'
  document.getElementById('dropDown').style.display = 'initial'
  document.getElementById('languages').style.display = 'initial'
  document.getElementById('kaptainitialscreen').style.display = 'initial'
}


document.getElementById('formGobackbutton').onclick = function(e){
   setTimeout(function(){
     document.getElementById("formGobackbutton").style.display = "none";
     document.getElementById('initialscreen2options').style.display = 'none'
     document.getElementById('inputs').style.display = 'none'
     document.getElementById('requestsubmitedmessage').style.display = 'none'
     document.getElementById('submitrequestbutton').style.display = 'none'
     document.getElementById('bot').style.display = 'initial'
     document.getElementById('emojionearea').style.display = 'initial'
     document.getElementById('map').style.display = 'initial'
     document.getElementById('searchWocMap').style.display = 'initial'
     document.getElementById('backtohomepage').style.display = 'initial'

   },100)
  }

let var1, var2, var3, var4, var5;

 document.querySelectorAll('input[type="text"]').forEach(input => {
     input.addEventListener('change', function() {
         switch(this.id) {
             case 'input1': var1 = this.value; break;
             case 'input2': var2 = this.value; break;
             case 'input3': var3 = this.value; break;
             case 'input4': var4 = this.value; break;
             case 'input5': var5 = this.value; break;
         }
     });
 });
 var postSuccess = function(){
  console.log('submitted succesfully')
 }
 var submitToProxy = function(q) {
  $.post("./callProxy.php", { //
      qurl: q,
      // geojson:data,
      cache: false,
      timeStamp: new Date().getTime(),
      success:postSuccess()
  })
  .done(function() {
    console.log('submitted succesfully')

  })
  .fail(function() {
    var updatedgeojson = failgeoJSON.replace(/open/g, 'offlineOpen');
    setTimeout(function(){
      geoJSONLocalforageDB.setItem(failRandomID, updatedgeojson)

    },500)


  })
  .always(function() {

  });
};

 document.getElementById('submitrequestbutton').onclick = function(e){


    setTimeout(function(){
      document.getElementById("inputs").style.display = "none";
      document.getElementById('submitrequestbutton').style.display = 'none'
      document.getElementById('formGobackbutton').style.display = 'none'


      document.getElementById('requestsubmitedmessage').style.display = 'initial'
      document.getElementById('finishandstart').style.display = 'initial'
      var bounds = map.getBounds(); // Get the current bounds of the map view
      var sw = bounds.getSouthWest(); // South West corner
      var nw = bounds.getNorthWest(); // North West corner
      var ne = bounds.getNorthEast(); // North East corner
      var se = bounds.getSouthEast(); // South East corner

      var coordinates = [
          [
              [sw.lng, sw.lat],
              [nw.lng, nw.lat],
              [ne.lng, ne.lat],
              [se.lng, se.lat],
              [sw.lng, sw.lat] // Closing the polygon by repeating the first coordinate
          ]
      ];

      function polygoncanvas(map) {
        var center = map.getCenter(); 
        aoi = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": coordinates
            }
        };

        return aoi
      }
      polygoncanvas(map)
        /////////////ifelse to calculate radius in a simple way without requiring processing GIS operations
    //   if (currentZoom >= 21) {
    //     var radiusbuffer = 10;
    // } else if (currentZoom >= 1 && currentZoom <= 20) {
    //     // Calculate the multiplier based on the zoom level difference from 21
    //     var exponent = 21 - currentZoom;
    //     // Adjust the multiplier for zoom levels 11 to 20
    //     if (currentZoom >= 11) {
    //         exponent -= 1; // Adjust exponent because the sequence starts doubling at 20, not 21
    //     }
    //     // Calculate radiusbuffer based on the pattern identified, adjusting for the initial values at higher zoom levels
    //     var baseValue = currentZoom >= 11 ? 20 : 10;
    //     var radiusbufferdecimal = baseValue * Math.pow(2, exponent);
    //     var radiusbuffer = Math.round(radiusbufferdecimal);
    // }
    // console.log("radiusbuffer", radiusbuffer)
    // //   datasubmissiontype = 'obfuscated'
    //   function createCenterPointGeoJSON(map) {
    //     var center = map.getCenter(); 
    //     geojsonObfuscated = {
    //         "type": "Feature",
    //         "properties": {
    //             "requestid": '0001',
    //             "requesttype": '99999',
    //             "timestamp": '2024-02-14T14:14:31.000Z',
    //             "organisation": 'aaaa',
    //             "email": 'bbbbb',
    //             "name": '1111',
    //             "description": 'obfuscated',   
    //             "totalcontrib": '1111', 
    //             "radiusbuffer": '2222', 
    //         },
    //         "geometry": {
    //             "type": "Point",
    //             "coordinates": [center.lng, center.lat]
    //         }
    //     };

    //     return geojsonObfuscated
    //   }
    //   createCenterPointGeoJSON(map)
    //   console.log("geojsonObfuscated", geojsonObfuscated)
    //   console.log("geomstring", geojsonObfuscated.geometry)
    //   console.log("propcontrib", geojsonObfuscated.properties.contributionid)
      // INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_obfusandopen` (geom, contributionid, phone, timestamp, mainattribute, attribute1s, attribute1n, datasov, totalcontrib, radiusbuffer) VALUES (ST_GeogFromGeoJSON('[object Object]',make_valid => true),'1230','null',CAST('2024-2-14T10:37:36Z' AS TIMESTAMP),'nameofthegroup','test',CAST('33' AS NUMERIC),'obuscates',CAST('1212123' AS INT64),CAST('222' AS INT64)

    
    // var sql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_obfusandopen` (geom, contributionid, phone, timestamp, mainattribute, attribute1s, attribute1n, datasov, totalcontrib, radiusbuffer) VALUES (ST_GeogFromGeoJSON('";
    //   var sql2 = geojsonObfuscated.geometry;
    //   var sql3 = "',make_valid => true),'"+contributionid+ "','" + phoneNumber + "',CAST('" +timestamp+"' AS TIMESTAMP),'" + mainattribute + "','" + attribute1s + "',CAST('" + attribute1n + "' AS NUMERIC),'" + datasov + "',CAST('"+ totalcontrib + "' AS INT64),CAST('" + radiusbuffer + "' AS INT64)";
    //   pURL = sql + sql2 + sql3;
    //   console.log(pURL)
    var timeEnd = new Date();
    var date = timeEnd.getFullYear() + '-' + (timeEnd.getMonth() + 1) + '-' + timeEnd.getDate();
    var time = timeEnd.getHours() + ":" + timeEnd.getMinutes() + ":" + timeEnd.getSeconds();

    var randomNumber = Math.random();
    randomNumber = randomNumber * 100000;
    console.log('searchResult',searchResult)
    if(searchResult == 'data'){
      var requesttype = 'existingdata'
    }else if(searchResult == 'data_zoom'){
      var requesttype = 'crowdsourcingcampaign'
    }else{
      var requesttype = 'unknown'
    }


    var requestid = Math.round(randomNumber)
    var timestamp = date + 'T' + time + 'Z';
    var organisation = document.getElementById('input4').value
    var email = document.getElementById('input5').value
    var name = document.getElementById('input1').value
    var description = document.getElementById('input2').value
    var totalcontrib = '00001'
    var radiusbuffer = '0002'



    /////// to insert the advertising point to the obfuscatedandopen DB
    var sql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_requests` (geom, requestid, requesttype, timestamp, organisation, email, name, description, totalcontrib, radiusbuffer) VALUES (ST_GeogFromGeoJSON('";
    var geojsonString = JSON.stringify(aoi.geometry).replace(/'/g, "''"); // Serialize and escape single quotes
    var sql2 = geojsonString;
    var sql3 = "', make_valid => true),'" + requestid + "','" + requesttype + "',CAST('" + timestamp + "' AS TIMESTAMP),'" + organisation + "','" + email + "','" + name + "','" + description + "',CAST('" + totalcontrib + "' AS INT64),CAST('" + radiusbuffer + "' AS INT64))"; // Ensure closing parentheses
    var pURL = sql + sql2 + sql3;

        console.log(pURL)
        submitToProxy(pURL);       //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111

    },100)
   }
   document.getElementById('finishandstart').onclick = function(e){
    searchResult = 'nodata'
      setTimeout(function(){
        document.getElementById('finishandstart').style.display = 'none'
        document.getElementById("formGobackbutton").style.display = "none";
        document.getElementById('initialscreen2options').style.display = 'none'
        document.getElementById('inputs').style.display = 'none'
        document.getElementById('requestsubmitedmessage').style.display = 'none'
        document.getElementById('submitrequestbutton').style.display = 'none'
        document.getElementById('classification').style.display = 'initial'
        document.getElementById('emojionearea').style.display = 'initial'
        document.getElementById('backtohomepage').style.display = 'initial'
        document.getElementById('searchWocMap').style.display = 'initial'
        document.getElementById('map').style.display = 'initial'

        // document.getElementById('initialscreen2options').style.display = 'none'
        // document.getElementById('inputs').style.display = 'none'

      },100)
      return searchResult
     }
