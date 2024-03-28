
var requestCartoData = function(sqlQuerySelectEncoded) {
  //console.('requestCartoDataaaaaaaaaaaaaaaaaaaaaaaa')
    // if (isOnline == true) {

      // sqlQuery = "SELECT geom, contributionid, phone, sapprojid, areapolygon, lengthline, distance, date, attribute1s, attribute2s, attribute3s, attribute4s, attribute5s, attribute6s, attribute7s, attribute8s, attribute9s, attribute10s, attribute11n, attribute12n, attribute13n, attribute14n, attribute15n, attribute16n, attribute17n, attribute18n, attribute19n, attribute20n FROM `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb0`";
      var settings = {
        "url":"https://gcp-europe-west1.api.carto.com/v3/maps/carto_dw/query?format=geojson&q=" + sqlQuerySelectEncoded,
        // carto-demo-data.demo_tables.dataappeal_restaurants_and_cafes_berlin_cpg

        // "url":"https://gcp-europe-west1.api.carto.com/v3/maps/carto_dw/table?name=carto-demo-data.demo_tables.dataappeal_restaurants_and_cafes_berlin_cpg",
        "method": "GET",
        "timeout": 0,
        "cache":false,
        "success":testcarto,
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfNzQ1cDUydG4iLCJqdGkiOiIxOTIxMzgwMiJ9.e8ad2qIgiY4YgpMIE3DfBJ-ipH0k_Zk3APbIkYZyJiM",
          "Cache-Control": "max-age=300"
        },
      };
        clearInterval(requestCartoData);
        
        $.ajax(settings).fail(function(jqXHR, textStatus, errorThrown) {
          // Handle failure here
          console.error("Request failed: " + textStatus + ", " + errorThrown);
          // Optionally, execute other failure logic, e.g., show an error message to the user
      });
        function getGeoJSON() {
          $.getJSON(settings, function(data) {
            $.each(data.rows, function(key, val) {

            });
          });
        };
      getGeoJSON(); //////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // deflated.addTo(map)
    // }
    // return cartousername
}
// var requestCartoData = function(sqlQuerySelectEncoded) {
//   var settings = {
//       "url": "https://gcp-europe-west1.api.carto.com/v3/maps/carto_dw/query?format=geojson&q=" + sqlQuerySelectEncoded,
//       "method": "GET",
//       "timeout": 0,
//       "cache": false,
//       "headers": {
//           "Content-Type": "application/json",
//           "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfNzQ1cDUydG4iLCJqdGkiOiIxOTIxMzgwMiJ9.e8ad2qIgiY4YgpMIE3DfBJ-ipH0k_Zk3APbIkYZyJiM",
//           "Cache-Control": "max-age=300"
//       }
//   };

//   // Remove clearInterval, as it seems to be incorrectly used here. clearInterval should be used with a timer ID.
  
//   $.ajax(settings)
//   .done(function(response) {
//       // Handle success
//       testcarto(response); // Assuming testcarto is your success handler function
//   })
//   .fail(function(jqXHR, textStatus, errorThrown) {
//       // Handle failure
//       console.error("Request failed: " + textStatus + ", " + errorThrown);
//   })
//   .always(function() {
//     console.error("always");

//       // Code to execute regardless of success or failure
//   });
// };

// It's not clear what getGeoJSON function is supposed to do, especially since settings object is not a URL string
// Consider revising or removing this part based on your actual requirements

var cartopopupcontentrefined
var testcarto = function(data) {
console.log('test carto')
console.log(data)
    map.addSource('test', {
      'type': 'geojson',
      'data': data
    });
    map.addLayer(
    {
    'id': 'test',
    'type': 'circle',
    'source': 'test',
    // 'source-layer': 'sf2010',
    'paint': {
      // Make circles larger as the user zooms from z12 to z22.
      // 'circle-radius': {
      // 'base': 1.75,
      // 'stops': [
      // [12, 2],
      // [22, 180]
      // ]
      // },
      'circle-radius': 4,

      // Color circles by ethnicity, using a `match` expression.
      'circle-color': 'red'
    }
    },
    // Place polygons under labels, roads and buildings.

    );
    // map.fitBounds('test');
    try{
      const coordinates = data.features[0].geometry.coordinates;
      // currentLocation = [52.54463, 13.36817];
      console.log(coordinates)
      var bounds = new mapboxgl.LngLatBounds();
  
        data.features.forEach(function(feature) {
            bounds.extend(feature.geometry.coordinates);
        });
        console.log(bounds)
        map.fitBounds(bounds);
  
        setTimeout(() => {
          document.getElementById("bot").style.fontSize = "16px";
          document.getElementById("bot").style.color = 'white';
          document.getElementById('bot').innerHTML = '    Do you want to download or query this ground data?? (yes/no)'
          document.getElementById("bot").style.display = 'initial'
        }, 3000);
        searchResult = 'data'
    }catch(err){
      document.getElementById('bot').innerHTML = '    No data found. Do you want to launch a crowdsourcing campaign? (yes/no)'
      document.getElementById("bot").style.display = 'initial'
      console.log('error sql catched due to empty layer after filter applied')
    }

      return searchResult

}


    // map.flyTo({
    //   center: coordinates,
    //   zoom: 10,
    //   essential: true // this animation is considered essential with respect to prefers-reduced-motion
    //   });
    //   map.fitBounds([
    //     [32.958984, -5.353521], // southwestern corner of the bounds
    //     [43.50585, 5.615985] // northeastern corner of the bounds
    // ]);


    // Create a 'LngLatBounds' with both corners at the first coordinate.
    // const bounds = new mapboxgl.LngLatBounds(
    // coordinates[0],
    // coordinates[0]
    // );
    //  console.log(bounds)
    // // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
    // for (const coord of coordinates) {
    // bounds.extend(coord);
    // }
     
    // map.fitBounds(bounds, {
    // padding: 20
    // });
     // const bounds = turf.bbox(data); // 'data' is your GeoJSON object
     // map.fitBounds([[bounds[0], bounds[1]], [bounds[2], bounds[3]]], { padding: 20 });













// var cartoGeoJSONLayer = function(data) {
//     getTotalFeaturesInDB = data.features.length
//   //  console.log('cartolayer',data)
//     //console.log('cartolayersize ',getTotalFeaturesInDB)
//     document.getElementById('MapLoading').style.display = 'none'
//     document.getElementById("Alert").style.display = 'none'

//     cartoLoaded = true;
//     cartoGeometries = L.geoJson(data, {
//         cache:false,
//         fillColor: '#AFFDA7',
//         weight: 2,
//         opacity: 0.4,
//         color: '#AFFDA7',  //Outline color
//         fillOpacity: 0.4,
//         // color: '#AFFDA7',
//         // border:'red',
//         //icon: markerIconLocalStorage,
//         onEachFeature: function(feature, layer) {
//             var audioAvailable = feature.properties.audioavailable


//             //console.(feature)
//             if (feature.geometry.type == 'Point') {
//               layer.bindPopup(feature.properties.attribute1s + '</br>',{
//                   maxWidth : 150
//                 });

//             }
//             if (feature.geometry.type == 'Polygon') {

//                 // layer.bindPopup(feature.properties.areapolygon + '</br>' + feature.properties.attribute1s + '</br>' + feature.properties.attribute2s + '</br>' + feature.properties.attribute3s);
//                 layer.bindPopup('📐 '+feature.properties.areapolygon +' ha '+'</br>' + feature.properties.attribute1s + '</br>',{
//                   maxWidth : 150
//                 });

//             }
//             if (feature.geometry.type == 'LineString') {
//               // document.getElementById('popupAreaLength').textContent = feature.properties.lengthline
//               // layer.bindPopup(feature.properties.lengthline + '</br>' + feature.properties.attribute1s + '</br>' + feature.properties.attribute2s + '</br>' + feature.properties.attribute3s);

//               layer.bindPopup('📐 '+feature.properties.lengthline +' Km ' + '</br>' + feature.properties.attribute1s + '</br>',{
//                 maxWidth : 150
//               });

//                 // layer.bindPopup(feature.properties.landusesemoji + feature.properties.audioavailable);
//             }

//             /////////////////////////////
//           layer.on('click', function(e) {

//               if(aFeatureIsSelected == true ){
//                 document.getElementById("backDeleteFeature").click() //!!!!!!!!
//                 if(editButtonClicked == true){
//                   clearInterval(refreshPopupComment)
//                   document.getElementById('backEditDelete').click()
//                 }


//               //  console.log('aFeatureIsSelected true')
//               }else{ // this if/else is to ensure that two features can not be selected at the same time
//           //    console.log('aFeatureIsSelected false')
//               document.getElementById("filterWithIcons").style.display = "none";
//               document.getElementById("clearFilter").style.display = "none";
//               document.getElementById("applyFilter").style.display = "none";
//               document.getElementById("filterByDate").style.display = "none";
//               document.getElementById("classification").style.display = "none";
//               document.getElementById("emoji").style.display = "none";
//               document.getElementById("tutorial").style.display = "none";
//               document.getElementById("polygon").style.display = "none";
//               document.getElementById("polyline").style.display = "none";
//               document.getElementById("point").style.display = "none";
//               document.getElementById("armchair").style.display = "none";
//               document.getElementById("field").style.display = "none";
//               document.getElementById("gobackArmchairField").style.display = "none";

//               // document.getElementById('editDeletePopup').style.display = 'initial'

//                document.getElementById("backDeleteFeature").style.display = "initial";
//                document.getElementById("shareMessagingApp").style.display = "initial";
//                document.getElementById("deleteFeature").style.display = "initial";
//                document.getElementById("deleteFeature").style.opacity = "1";
//                document.getElementById("deleteFeature").disabled = false;
//                document.getElementById("randomSuggestion").style.display = "initial";
//                document.getElementById("randomSuggestion").style.opacity = '0.4';
//                document.getElementById("randomSuggestion").disabled = true;

//               //default option is used to check if the target is not deflated (i.e. a marker). Parenteses IMPORTANT!
//               if (!e.target.defaultOptions && e.target.feature.properties.areapolygon != 'Point' && e.target.feature.properties.lengthline != 'Point') { //to avoid enable selected feature when click on deflated polygon or line, which cause error. user must zoom in until polygon displayed. DefaultOptions is only in Points
//                   map.closePopup();
//                   var currentZoom = map.getZoom()
//                   var geometryString = e.target.feature.properties.geometrystring
//                   var geometryStringGeoJSON = L.geoJSON(JSON.parse(geometryString))
//                   // selectedFeature = e.target;
//                   cartoIdFeatureSelected = e.target.properties.contributionid
//                   //console.('cartoIdFeatureSelected',cartoIdFeatureSelected)
//                 //  console.log(geometryStringGeoJSON)

//                   map.flyToBounds(geometryStringGeoJSON.getBounds());
//               }
//               //the condition below is as it is because geometry column in the DB cannot be accessed while not deflated, so the properties.areas... is used
//               if(e.target.feature.geometry.type == 'Point' && map.getZoom() < 15 && e.target.feature.properties.areapolygon == 'Point' && e.target.feature.properties.lengthline == 'Point') {
//                   map.closePopup();
//                   var geometryString = e.target.feature.properties.geometrystring
//                   var geometryStringGeoJSON = L.geoJSON(JSON.parse(geometryString))
//                   var coord = e.target.feature.geometry.coordinates;
//                   var latLng = L.GeoJSON.coordsToLatLng(coord);
//                   cartoIdFeatureSelected = e.target.feature.properties.contributionid
//                   //console.('cartoIdFeatureSelected',cartoIdFeatureSelected)

//                   map.flyTo(latLng,17)
//                   // map.setView(latLng, 15);
//                   layer.closePopup(feature.properties.landusesemoji + feature.properties.audioavailable); //to not open popup after second click

//                }else {
//                  // selectedFeature.editing.disable();
//                  // selectedFeature.editing.enable();

//                   selectedFeature = e.target;
//                   // selectedFeature.editing.enable();

//                    if (selectedFeature.feature.geometry.type != 'Point') {
//                      //to populate the area/length field in the popup
//                       if(selectedFeature.feature.geometry.type == 'Polygon'){
//                         cartoIdFeatureSelected = selectedFeature.feature.properties.contributionid
//                         //console.('cartoIdFeatureSelected',cartoIdFeatureSelected)
//                         aFeatureIsSelected = true

//                         document.getElementById('popupAreaLength').style.display = 'initial'
//                         document.getElementById('popupAreaLength').textContent = feature.properties.areapolygon

//                           // if(selectedFeature.feature.properties.audioavailable !='.'){
//                           //   document.getElementById('commentPopup').disabled = false
//                           //   document.getElementById('commentPopup').onclick = function(){
//                           //
//                           //     var audioUrl = feature.properties.audioavailable
//                           //     var audioControls = document.getElementById('audioControls')
//                           //     audioControls.src = audioUrl
//                           //     document.getElementById('audioControls').style.display = 'initial'
//                           //
//                           //   }
//                           //   document.getElementById('commentPopup').style.display = 'initial';
//                           //   document.getElementById('commentPopup').textContent = '🔊' + ' ' + feature.properties.landusesemoji
//                           //
//                           //   }else{
//                             document.getElementById('audioControls').style.display = 'none'
//                             document.getElementById('commentPopup').style.display = 'initial';
//                             document.getElementById('commentPopup').textContent = feature.properties.landusesemoji


//                       }else{ //it a line
//                         aFeatureIsSelected = true

//                          // document.getElementById('popupAreaLength').style.display = 'initial'
//                          // document.getElementById('popupAreaLength').textContent = '〰️'
//                          document.getElementById('popupAreaLength').style.display = 'none'
//                          cartoIdFeatureSelected = selectedFeature.feature.properties.contributionid

//                            document.getElementById('audioControls').style.display = 'none'
//                            document.getElementById('commentPopup').style.display = 'initial';
//                            document.getElementById('commentPopup').textContent = feature.properties.landusesemoji

//                       }

//                     // document.getElementById('editDeletePopup').style.display = 'initial'

//                      document.getElementById("backDeleteFeature").style.display = "initial";
//                      document.getElementById("shareMessagingApp").style.display = "initial";
//                      document.getElementById("deleteFeature").style.display = "initial";
//                      document.getElementById("deleteFeature").style.opacity = "1";
//                      document.getElementById("deleteFeature").disabled = false;
//                      document.getElementById("randomSuggestion").style.display = "initial";
//                      document.getElementById("randomSuggestion").style.opacity = '0.4';
//                      document.getElementById("randomSuggestion").disabled = true;
//                     // miniMap.addTo(map);
//                     osm_Button.button.style.opacity = '0.4';
//                     osm_Button.button.disabled = true;
//                     googleSat_Button.button.style.opacity = '0.4';
//                     googleSat_Button.button.disabled = true;
//                     planet_Button.button.style.opacity = '0.4';
//                     planet_Button.button.disabled = true;

//                      gps_Button.button.style.opacity = '0.4';
//                      gps_Button.button.disabled = true;
//                      myLayer_Button.button.style.opacity = '0.4';
//                      myLayer_Button.button.disabled = true;
//                      filter_Button.button.style.opacity = '0.4';
//                      filter_Button.button.disabled = true;

//                      // document.getElementById("deleteFeature").style.display = "initial";
//                      // document.getElementById("deleteFeature").style.backgroundColor = 'white';
//                      document.getElementById("tutorial").style.display = "none";
//                      document.getElementById("polygon").style.display = "none";
//                      document.getElementById("polyline").style.display = "none";
//                      document.getElementById("point").style.display = "none";
//                      document.getElementById("armchair").style.display = "none";
//                      document.getElementById("field").style.display = "none";
//                      document.getElementById("gobackArmchairField").style.display = "none";

//                     // random_Button.addTo(map)
//                      selectedFeature.setStyle({color: '#F70573'})
//                    }
//                      //condition below is at is is to avoid deflated symbol to show as selected after polygon/line have been selected
//                      if (selectedFeature.feature.geometry.type == 'Point' && map.getZoom() >= 15 && e.target.feature.properties.areapolygon == 'Point' && e.target.feature.properties.lengthline == 'Point') {
//                        aFeatureIsSelected = true

//                          // document.getElementById('popupAreaLength').style.display = 'initial'
//                          // document.getElementById('popupAreaLength').style.height = '📍';
//                          document.getElementById('popupAreaLength').style.display = 'none'
//                          cartoIdFeatureSelected = e.target.properties.contributionid

//                            document.getElementById('audioControls').style.display = 'none'
//                            document.getElementById('commentPopup').style.display = 'initial';
//                            document.getElementById('commentPopup').textContent = feature.properties.landusesemoji

//                          document.getElementById("backDeleteFeature").style.display = "initial";
//                          document.getElementById("shareMessagingApp").style.display = "initial";
//                          document.getElementById("deleteFeature").style.display = "initial";
//                          document.getElementById("deleteFeature").style.opacity = "1";
//                          document.getElementById("deleteFeature").disabled = false;
//                          document.getElementById("randomSuggestion").style.display = "initial";
//                          document.getElementById("randomSuggestion").style.opacity = '0.4';
//                          document.getElementById("randomSuggestion").disabled = true;
//                         // miniMap.addTo(map)
//                         osm_Button.button.style.opacity = '0.4';
//                         osm_Button.button.disabled = true;
//                         googleSat_Button.button.style.opacity = '0.4';
//                         googleSat_Button.button.disabled = true;
//                         planet_Button.button.style.opacity = '0.4';
//                         planet_Button.button.disabled = true;

//                          gps_Button.button.style.opacity = '0.4';
//                          gps_Button.button.disabled = true;
//                          myLayer_Button.button.style.opacity = '0.4';
//                          myLayer_Button.button.disabled = true;
//                          filter_Button.button.style.opacity = '0.4';
//                          filter_Button.button.disabled = true;

//                          // document.getElementById("deleteFeature").style.display = "initial";
//                          // document.getElementById("deleteFeature").style.backgroundColor = 'white';
//                          document.getElementById("tutorial").style.display = "none";
//                          document.getElementById("polygon").style.display = "none";
//                          document.getElementById("polyline").style.display = "none";
//                          document.getElementById("point").style.display = "none";
//                          document.getElementById("armchair").style.display = "none";
//                          document.getElementById("field").style.display = "none";
//                          document.getElementById("gobackArmchairField").style.display = "none";

//                         // random_Button.addTo(map)
//                          selectedFeature.editing.enable();
//                     }

//                       //to deselect feature if user changes zooms or pans, to avoid deletion without looking at the feature.
//                       map.on('zoomend', function(e) {
//                           try {
//                             deflated.editing.disable();

//                           } catch (e) {}

//                           clickCountDeleteButton = 0
//                           map.closePopup();
//                           if(selectedFeature && selectedFeature != null){ //second condition to avoid click when backDeletefeature... not best solution but works
//                           document.getElementById("backDeleteFeature").click() // !!!!!!!!
//                           }

//                       })
//                       map.on('moveend', function(e) {
//                         if(editButtonClicked == false){  // this condition is to prevent this when commenting the cartolayer, like with creating the geometry with drawnitems
//                           try {
//                             deflated.editing.disable();
//                           } catch (e) {}

//                           clickCountDeleteButton = 0
//                           map.closePopup();

//                           if(selectedFeature && selectedFeature != null){ //second condition to avoid click when backDeletefeature... not best solution but works
//                             document.getElementById("backDeleteFeature").click() //!!!!!!!!
//                           }
//                         }
//                       })
//                       map.on('click', function(e) {
//                         // cartoGeometries.color = 'red'
//                         if(editButtonClicked == false){  // this condition is to prevent this when commenting the cartolayer, like with creating the geometry with drawnitems
//                           try {
//                             deflated.editing.disable();
//                           } catch (e) {}

//                           clickCountDeleteButton = 0
//                           map.closePopup();

//                           if(selectedFeature && selectedFeature != null){ //second condition to avoid click when backDeletefeature... not best solution but works
//                             document.getElementById("backDeleteFeature").click() //!!!!!!!!
//                           }
//                         }
//                       })

//                       //to store the cartoID of the future selected

//                 }//...else

//               }
//             });//...layerclick

//         }//...oneachfeature
//     })//...l.geojson
//     // cartoGeometriesInitial = cartoGeometries
//   try {
//     cartoGeometries.addTo(deflated)
//   //  console.log('cartogeometries',cartoGeometries)
//     }catch(err){
//     // console.log('error sql catched due to empty layer after filter applied')
//   }
//   return cartoGeometries && getTotalFeaturesInDB && aFeatureIsSelected && cartoIdFeatureSelected
// };//...CARTO layer

// ///////////////////////////////////     INSERT       ///////////////////////////////////////////

// var aFeatureIsSelected = false
// function setData() {

//     if ((cartoIdFeatureSelected != null && toDelete == true) || deleteFromcartoimmediate != null) { //TO DELETE THE SELECTED FEATURE FROM THE CARTO DB
//         toDelete = false
//         if(deleteFromcartoimmediate != null){
//           //console.('deleteFromcartoimmediate',deleteFromcartoimmediate)

//           cartoIdFeatureSelected = deleteFromcartoimmediate
//         }
//         pURL = "DELETE FROM `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb_QMM_Madagascar` WHERE contributionid='" + cartoIdFeatureSelected + "'";
//         clickCountDeleteButton = 0
//         cartoIdFeatureSelected = null
//         deleteFromcartoimmediate = null
//         //console.log(pURL)

//     }else if (cartoIdFeatureSelected != null && created == false && editButtonClicked == true){ //TO INSERT COMMENT IN EXISTING FEATURE
//       //console.log('set data called')
//       //console.log(contentInTextbox)
//       //console.log(audioComment)
//         if(audioRecorded == false){
//           audioComment = '.'
//         }
//         var contentInTextbox = document.getElementById('emojionearea').value;

//         pURL = "UPDATE lumblu SET commentone='" + contentInTextbox + "', commentoneaudioavailable='" + audioComment + "' WHERE cartodb_id='" + cartoIdFeatureSelected + "'";
//         editButtonClicked = false


//         //console.log(pURL)
//     }
//     else { //TO INSERT THE CREATED FEATURE INTO THE CARTO DB
//       //console.(data)

//         dataGeometry = data.geometry
//         //console.(dataGeometry)
//         var dataGeometryString = JSON.stringify(dataGeometry)
//         ///////////////////////////////////////////////////////ha or acres !!!!!!!!!!!!!!!!!!!!!!! ??????????///////////////

//         if(finalAreaAcres2Decimals == 'Line' || finalAreaAcres2Decimals == 'Point'){
//           var areaPolygonNumeric = 0
//         }else{
//           function removeCharactersAfterSpace(inputString) {
//             var spaceIndex = inputString.indexOf(' ');
//             if (spaceIndex !== -1) {
//               var result = inputString.substr(0, spaceIndex);
//               return result;
//             } else {
//               return inputString;
//             }
//           }
//           var areanumber = removeCharactersAfterSpace(finalAreaAcres2Decimals);
//           console.log('areanumber',areanumber); // Output: "Hello"
//           var acrestoha = areanumber*0.404686
//           var acretoha2decimals = acrestoha.toFixed(2)
//           console.log('acretoha2decimals',acretoha2decimals)

//           var areaPolygonNumeric = parseFloat(acretoha2decimals)
//         }
//         //console.('lengthLine',lengthLine)

//         if(finalLength2Decimals == 'Polygon' || finalLength2Decimals == 'Point'){
//           var lengthLineNumeric = 0

//         }else{
//           function extractNumbers(str) {
//              return str.replace(/\D/g, '');
//            }
//           var lengthnumber = extractNumbers(finalLength2Decimals)
//          var lenghtkm2decimals = lengthnumber.slice(0, -2)
//          var lengthLineNumeric = parseFloat(lenghtkm2decimals)
//         }

//         //console.('areaPolygonNumeric',areaPolygonNumeric)
//         //console.('lengthLineNumeric',lengthLineNumeric)

//         // landownership_type = null
//         // male_or_female = null

//         // var lu_final =landUsesEmoji.replace(/<br>/g, '');
//         // emojioneareaeditor0.value = landUse + croptype + evaluation + livestockdisseasetype + kidsmale + kidsfemale + adultmale + adultfemale  + household + emojioneareaeditor0.value
//         // emojioneareaeditor0.value = emojioneareaeditor0.value.replace(/null/g, '')
//         openOrPrivate = propertiesGeoJSON.openOrPrivate;
//         phoneNumber = propertiesGeoJSON.phoneNumber;
//         areaPolygon = propertiesGeoJSON.areaPolygon;
//         lengthLine = propertiesGeoJSON.lengthLine;
//         dateTime = propertiesGeoJSON.dateTime;
//         timeSpendSeconds = propertiesGeoJSON.timeSpendSeconds;
//         dist_m_Participant_Feature = propertiesGeoJSON.dist_m_Participant_Feature;
//         randomID = propertiesGeoJSON.randomID;
//         attribute1s = propertiesGeoJSON.Description
//         const brRegex = /<\/?br>/gi;
//         attribute1s = attribute1s.replace(brRegex, '');

//         attribute2s = imageName1 //evaluation
//         attribute3s = imageName2
//         attribute4s = imageName3
//         attribute5s = null
//         attribute6s = null
//         attribute7s = null
//         attribute8s = null
//         attribute9s = null
//         attribute10s = null
//         const numberRegex = /\d+/g;
// attribute11nstring = kidsmale
// attribute12nstring = kidsfemale
// attribute13nstring = adultmale
// attribute14nstring = adultfemale
// attribute15nstring = household
// try{ //to catch when value is empty
//   attribute11n = attribute11nstring.match(numberRegex);
//   attribute11n = attribute11n[0]
// }catch(e){
//   attribute11n = 0
//   console.log(e)
// }
// try{ //to catch when value is empty
//   attribute12n = attribute12nstring.match(numberRegex);
//   attribute12n = attribute12n[0]
// }catch(e){
//   attribute12n = 0
//   console.log(e)
// }
// try{ //to catch when value is empty
//   attribute13n = attribute13nstring.match(numberRegex);
//   attribute13n = attribute13n[0]
// }catch(e){
//   attribute13n = 0
//   console.log(e)
// }
// try{ //to catch when value is empty
//   attribute14n = attribute14nstring.match(numberRegex);
//   attribute14n = attribute14n[0]
// }catch(e){
//   attribute14n = 0
//   console.log(e)
// }
// try{ //to catch when value is empty
//   attribute15n = attribute15nstring.match(numberRegex);
//   attribute15n = attribute15n[0]
// }catch(e){
//   attribute15n = 0
//   console.log(e)
// }
//         attribute16n = 0
//         attribute17n = 0
//         attribute18n = 0
//         attribute19n = 0
//         attribute20n = 0

//         dist_m_Participant = 0
//         /////////////////////////////////////////LOCAL STORAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE///////////////////////////////////////////////
//         // var commentAudioDefault = '.'
//         var sql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb_QMM_Madagascar` (geom, contributionid, phone, sapprojid, areapolygon, lengthline, distance, date, attribute1s, attribute2s, attribute3s, attribute4s, attribute5s, attribute6s, attribute7s, attribute8s, attribute9s, attribute10s, attribute11n, attribute12n, attribute13n, attribute14n, attribute15n, attribute16n, attribute17n, attribute18n, attribute19n, attribute20n, timestamp) VALUES (ST_GeogFromGeoJSON('";
//         var sql2 = dataGeometryString;
// var sql3 = "',make_valid => true),'"+randomID+ "',CAST('" + phoneNumber + "' AS INT64),'" + sapelliProjectIdentifier + "',CAST('" + areaPolygonNumeric + "' AS NUMERIC),CAST('" + lengthLineNumeric + "' AS NUMERIC),CAST('" + dist_m_Participant + "' AS INT64),'" + dateTime +"','"+attribute1s+ "','" + attribute2s + "','" + attribute3s + "','" + attribute4s + "','" + attribute5s + "','" + attribute6s + "','" + attribute7s + "','" + attribute8s + "','"+attribute9s+ "','" + attribute10s + "',CAST('"+ attribute11n + "' AS INT64),CAST('" + attribute12n + "' AS INT64),CAST('" + attribute13n + "' AS INT64),CAST('" + attribute14n + "' AS INT64),CAST('" + attribute15n + "' AS INT64),CAST('" + attribute16n + "' AS INT64),CAST('" +attribute17n+ "' AS INT64),CAST('" + attribute18n + "' AS INT64),CAST('" + attribute19n + "' AS INT64),CAST('" + attribute20n + "' AS INT64),CAST('" +dateTime+"' AS TIMESTAMP))";
//         pURL = sql + sql2 + sql3;
//     }

//     //////console.log(pURL)
//     submitToProxy(pURL);
//     ////console.log("Feature has been submitted to the Proxy");
//     return pURL && editButtonClicked && clickCountDeleteButton && deleteFromcartoimmediate && toDelete
// };
