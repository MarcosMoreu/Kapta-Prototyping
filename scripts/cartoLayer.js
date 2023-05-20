var aFeatureIsSelected = false

var requestCartoData = function(sqlQuerySelectEncoded) {
  console.log('requestCartoDataaaaaaaaaaaaaaaaaaaaaaaa')
    if (isOnline == true) {
      // url:"https://" + cartousername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + sqlQuery + cartoapiSELECT
      // const sqlQuery = `
      // SELECT
      //     json_build_object(
      //         'type', 'FeatureCollection',
      //         'features', json_agg(feature)
      //     ) AS geojson
      // FROM (
      //     SELECT
      //         'Feature' AS type,
      //         ST_AsGeoJSON(geom)::json AS geometry,
      //         json_build_object(
      //             'contributionid', contributionid,
      //             'phone', phone,
      //             'sapprojid', sapprojid,
      //             'areapolygon', areapolygon,
      //             'lengthline', lengthline,
      //             'distance', distance,
      //             'date', date,
      //             'attribute1s', attribute1s,
      //             'attribute2s', attribute2s,
      //             'attribute3s', attribute3s,
      //             'attribute4s', attribute4s,
      //             'attribute5s', attribute5s,
      //             'attribute6s', attribute6s,
      //             'attribute7s', attribute7s,
      //             'attribute8s', attribute8s,
      //             'attribute9s', attribute9s,
      //             'attribute10s', attribute10s,
      //             'attribute11n', attribute11n,
      //             'attribute12n', attribute12n,
      //             'attribute13n', attribute13n,
      //             'attribute14n', attribute14n,
      //             'attribute15n', attribute15n,
      //             'attribute16n', attribute16n,
      //             'attribute17n', attribute17n,
      //             'attribute18n', attribute18n,
      //             'attribute19n', attribute19n,
      //             'attribute20n', attribute20n
      //         ) AS properties
      //     FROM \`carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb0\`
      // ) AS feature;
      // `;
      // sqlQuery = "SELECT geom, contributionid, phone, sapprojid, areapolygon, lengthline, distance, date, attribute1s, attribute2s, attribute3s, attribute4s, attribute5s, attribute6s, attribute7s, attribute8s, attribute9s, attribute10s, attribute11n, attribute12n, attribute13n, attribute14n, attribute15n, attribute16n, attribute17n, attribute18n, attribute19n, attribute20n FROM `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb0` FOR JSON PATH AUTO";
//       const sqlQuery = `SELECT
//   ST_AsGeoJSON(geom) AS geojson,
//   contributionid,
//   phone,
//   sapprojid,
//   areapolygon,
//   lengthline,
//   distance,
//   date,
//   attribute1s,
//   attribute2s,
//   attribute3s,
//   attribute4s,
//   attribute5s,
//   attribute6s,
//   attribute7s,
//   attribute8s,
//   attribute9s,
//   attribute10s,
//   attribute11n,
//   attribute12n,
//   attribute13n,
//   attribute14n,
//   attribute15n,
//   attribute16n,
//   attribute17n,
//   attribute18n,
//   attribute19n,
//   attribute20n
// FROM \`carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb0\``
// https://gcp-europe-west1.api.carto.com/v3/maps/carto_dw/query?format=geojson&q=select%20*%20from%20%60carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb0%60&cache=1683980483065&v=3.0

      // sqlQuery = "SELECT geom, contributionid, phone, sapprojid, areapolygon, lengthline, distance, date, attribute1s, attribute2s, attribute3s, attribute4s, attribute5s, attribute6s, attribute7s, attribute8s, attribute9s, attribute10s, attribute11n, attribute12n, attribute13n, attribute14n, attribute15n, attribute16n, attribute17n, attribute18n, attribute19n, attribute20n FROM `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb0`";
      var settings = {
        "url":"https://gcp-europe-west1.api.carto.com/v3/maps/carto_dw/query?format=geojson&q=" + sqlQuerySelectEncoded,
        // "url": "https://gcp-europe-west1.api.carto.com/v3/sql/carto_dw/query? q="+sqlQuery,
        "method": "GET",
        "timeout": 0,
        "cache":false,
        "success":cartoGeoJSONLayer,
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+cartoapiSELECT,
          "Cache-Control": "max-age=300"
        },
      };
        clearInterval(requestCartoData);
        // function getGeoJSON() {
        //     $.getJSON(settings)
        //     return cartoLoaded && cartoIdFeatureSelected && selectedFeature && cartoGeometries;
        // };
        function getGeoJSON() {
          $.getJSON(settings, function(data) {
            $.each(data.rows, function(key, val) {
              console.log(val)
              // do something!
            });
          });
        };
      getGeoJSON(); //////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      deflated.addTo(map)






//////////////////////////// WORKS AS IN THE PAST --- REMEMBER

      // if (isOnline == true && cartousername != null) {
      //   sqlQuery = "SELECT cartodb_id, the_geom, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date, commentone, commentoneaudioavailable FROM lumblu";
      //
      //     // clearInterval(requestCartoData);
  //  cartoapiSELECT =  &api_key=alVnPiIu77RNtS0VOq5z6Q
      //     function getGeoJSON() {
      //         $.getJSON({
      //           cache:false,
      //           success:cartoGeoJSONLayer,
      //           url:"https://" + cartousername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + sqlQuery + cartoapiSELECT
      //         })
      //         return cartoLoaded && cartoIdFeatureSelected && selectedFeature && cartoGeometries;
      //     };
      //   getGeoJSON(); //////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //   deflated.addTo(map)





        //funtion to get geojson with 🌐 to be used in random suggestion
        // function getGeoJSONRandom(){ ///RANDOM!!!!!!!!!!!!!!!
        //
        //   var sqlQueryRandom = "SELECT cartodb_id, the_geom, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date, commentone, commentoneaudioavailable FROM lumblu WHERE LEFT(landusesemoji,1)='🌐'";
        //   $.getJSON({
        //     cache:false,
        //     success:randomLayer,
        //     url:"https://" + cartousername + ".cartodb.com/api/v2/sql?format=GeoJSON&q=" + sqlQueryRandom + cartoapiSELECT
        //   })
        // }
        // getGeoJSONRandom() ////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    }
    return cartousername
}
var cartopopupcontentrefined
var cartoGeoJSONLayer = function(data) {
    getTotalFeaturesInDB = data.features.length
  //  console.log('cartolayer',data)
    //console.log('cartolayersize ',getTotalFeaturesInDB)

    cartoLoaded = true;
    cartoGeometries = L.geoJson(data, {
        cache:false,
        fillColor: '#AFFDA7',
        weight: 2,
        opacity: 0.4,
        color: '#AFFDA7',  //Outline color
        fillOpacity: 0.4,
        // color: '#AFFDA7',
        // border:'red',
        //icon: markerIconLocalStorage,
        onEachFeature: function(feature, layer) {
            var audioAvailable = feature.properties.audioavailable


            console.log(feature)
            if (feature.geometry.type == 'Point') {
              // document.getElementById('popupAreaLength').style.display = 'none'
              // document.getElementById('popupArea').onclick = function(){
              //   document.getElementById('popupArea').textContent = 'contentchanged'
              //
              // }
                //layer.bindPopup(feature.properties.landusesemoji + feature.properties.audioavailable);
                // document.getElementById('popupAreaLength').textContent = '-'

                // layer.bindPopup(feature.properties.attribute1s + '</br>' + feature.properties.attribute2s + '</br>' + feature.properties.attribute3s);
                layer.bindPopup(feature.properties.attribute1s + '</br>',{
                  maxWidth : 150
                });

            }
            if (feature.geometry.type == 'Polygon') {

                // layer.bindPopup(feature.properties.areapolygon + '</br>' + feature.properties.attribute1s + '</br>' + feature.properties.attribute2s + '</br>' + feature.properties.attribute3s);
                layer.bindPopup('📐 '+feature.properties.areapolygon +' ha '+'</br>' + feature.properties.attribute1s + '</br>',{
                  maxWidth : 150
                });

            }
            if (feature.geometry.type == 'LineString') {
              // document.getElementById('popupAreaLength').textContent = feature.properties.lengthline
              // layer.bindPopup(feature.properties.lengthline + '</br>' + feature.properties.attribute1s + '</br>' + feature.properties.attribute2s + '</br>' + feature.properties.attribute3s);

              layer.bindPopup('📐 '+feature.properties.lengthline +' Km ' + '</br>' + feature.properties.attribute1s + '</br>',{
                maxWidth : 150
              });

                // layer.bindPopup(feature.properties.landusesemoji + feature.properties.audioavailable);
            }

            /////////////////////////////
          layer.on('click', function(e) {

              if(aFeatureIsSelected == true ){
                document.getElementById("backDeleteFeature").click() //!!!!!!!!
                if(editButtonClicked == true){
                  clearInterval(refreshPopupComment)
                  document.getElementById('backEditDelete').click()
                }


              //  console.log('aFeatureIsSelected true')
              }else{ // this if/else is to ensure that two features can not be selected at the same time
          //    console.log('aFeatureIsSelected false')
              document.getElementById("filterWithIcons").style.display = "none";
              document.getElementById("clearFilter").style.display = "none";
              document.getElementById("applyFilter").style.display = "none";
              document.getElementById("filterByDate").style.display = "none";
              document.getElementById("classification").style.display = "none";
              document.getElementById("emoji").style.display = "none";
              document.getElementById("tutorial").style.display = "none";
              document.getElementById("polygon").style.display = "none";
              document.getElementById("polyline").style.display = "none";
              document.getElementById("point").style.display = "none";
              document.getElementById("armchair").style.display = "none";
              document.getElementById("field").style.display = "none";
              document.getElementById("gobackArmchairField").style.display = "none";

              // document.getElementById('editDeletePopup').style.display = 'initial'

               document.getElementById("backDeleteFeature").style.display = "initial";
               document.getElementById("shareMessagingApp").style.display = "initial";
               document.getElementById("deleteFeature").style.display = "initial";
               document.getElementById("deleteFeature").style.opacity = "1";
               document.getElementById("deleteFeature").disabled = false;
               document.getElementById("randomSuggestion").style.display = "initial";
               document.getElementById("randomSuggestion").style.opacity = '0.4';
               document.getElementById("randomSuggestion").disabled = true;

              // document.getElementById("whatsApp").style.display = "none";
              // document.getElementById("telegram").style.display = "none";
              // document.getElementById("weChat").style.display = "none";
              // document.getElementById("goBackMessagingApps").style.display = "none";

              // myLayer_Button.button.style.opacity = '0.4';
              // myLayer_Button.button.disabled = true;
              // filter_Button.button.style.opacity = '0.4';
              // filter_Button.button.disabled = true;
              // filter_Button.button.style.background = 'black'
              // filterIsOn = false

              // myLayer_Button.removeFrom(map);
              // filter_Button.removeFrom(map);
              // googleSat_Button.removeFrom(map);
              // osm_Button.removeFrom(map);
              // planet_Button.removeFrom(map);
              //
              // miniMap.addTo(map);

              //default option is used to check if the target is not deflated (i.e. a marker). Parenteses IMPORTANT!
              if (!e.target.defaultOptions && e.target.feature.properties.areapolygon != 'Point' && e.target.feature.properties.lengthline != 'Point') { //to avoid enable selected feature when click on deflated polygon or line, which cause error. user must zoom in until polygon displayed. DefaultOptions is only in Points
                  map.closePopup();
                  var currentZoom = map.getZoom()
                  var geometryString = e.target.feature.properties.geometrystring
                  var geometryStringGeoJSON = L.geoJSON(JSON.parse(geometryString))
                  // selectedFeature = e.target;
                  cartoIdFeatureSelected = e.target.properties.contributionid
                  console.log('cartoIdFeatureSelected',cartoIdFeatureSelected)
                //  console.log(geometryStringGeoJSON)

                  map.flyToBounds(geometryStringGeoJSON.getBounds());
              }
              //the condition below is as it is because geometry column in the DB cannot be accessed while not deflated, so the properties.areas... is used
              if(e.target.feature.geometry.type == 'Point' && map.getZoom() < 15 && e.target.feature.properties.areapolygon == 'Point' && e.target.feature.properties.lengthline == 'Point') {
                  map.closePopup();
                  var geometryString = e.target.feature.properties.geometrystring
                  var geometryStringGeoJSON = L.geoJSON(JSON.parse(geometryString))
                  var coord = e.target.feature.geometry.coordinates;
                  var latLng = L.GeoJSON.coordsToLatLng(coord);
                  cartoIdFeatureSelected = e.target.feature.properties.contributionid
                  console.log('cartoIdFeatureSelected',cartoIdFeatureSelected)

                  map.flyTo(latLng,17)
                  // map.setView(latLng, 15);
                  layer.closePopup(feature.properties.landusesemoji + feature.properties.audioavailable); //to not open popup after second click

               }else {
                 // selectedFeature.editing.disable();
                 // selectedFeature.editing.enable();

                  selectedFeature = e.target;
                  // selectedFeature.editing.enable();

                   if (selectedFeature.feature.geometry.type != 'Point') {
                     //to populate the area/length field in the popup
                      if(selectedFeature.feature.geometry.type == 'Polygon'){
                        cartoIdFeatureSelected = selectedFeature.feature.properties.contributionid
                        console.log('cartoIdFeatureSelected',cartoIdFeatureSelected)
                        aFeatureIsSelected = true

                        document.getElementById('popupAreaLength').style.display = 'initial'
                        document.getElementById('popupAreaLength').textContent = feature.properties.areapolygon

                          // if(selectedFeature.feature.properties.audioavailable !='.'){
                          //   document.getElementById('commentPopup').disabled = false
                          //   document.getElementById('commentPopup').onclick = function(){
                          //
                          //     var audioUrl = feature.properties.audioavailable
                          //     var audioControls = document.getElementById('audioControls')
                          //     audioControls.src = audioUrl
                          //     document.getElementById('audioControls').style.display = 'initial'
                          //
                          //   }
                          //   document.getElementById('commentPopup').style.display = 'initial';
                          //   document.getElementById('commentPopup').textContent = '🔊' + ' ' + feature.properties.landusesemoji
                          //
                          //   }else{
                            document.getElementById('audioControls').style.display = 'none'
                            document.getElementById('commentPopup').style.display = 'initial';
                            document.getElementById('commentPopup').textContent = feature.properties.landusesemoji
                          // }

                          //to add bluebox if comment Available
                         //  if(selectedFeature.feature.properties.commentone != null){
                         //    // if(selectedFeature.feature.properties.commentoneaudioavailable !='.'){
                         //    //   document.getElementById('toCommentPopup').disabled = false
                         //    //     document.getElementById('toCommentPopup').onclick = function(){
                         //    //
                         //    //       var audioUrl = feature.properties.commentoneaudioavailable
                         //    //       var audioControls = document.getElementById('audioControls')
                         //    //       audioControls.src = audioUrl
                         //    //       document.getElementById('audioControls').style.display = 'initial'
                         //    //
                         //    //     }
                         //      document.getElementById('toCommentPopup').style.display = 'initial';
                         //      document.getElementById('toCommentPopup').textContent = feature.properties.commentone
                         //    //
                         //    //   }
                         //    //   else{
                         //        document.getElementById('toCommentPopup').onclick = function(){
                         //          document.getElementById('audioControls').style.display = 'none'
                         //        // }
                         //      document.getElementById('audioControls').style.display = 'none'
                         //      document.getElementById('toCommentPopup').style.display = 'initial';
                         //      document.getElementById('toCommentPopup').textContent = feature.properties.commentone
                         //    }
                         // }else{
                         //   document.getElementById('toCommentPopup').style.display = 'none';
                         // }

                      }else{ //it a line
                        aFeatureIsSelected = true

                         // document.getElementById('popupAreaLength').style.display = 'initial'
                         // document.getElementById('popupAreaLength').textContent = '〰️'
                         document.getElementById('popupAreaLength').style.display = 'none'
                         cartoIdFeatureSelected = selectedFeature.feature.properties.contributionid
                         console.log('cartoIdFeatureSelected',cartoIdFeatureSelected)

                         // if(selectedFeature.feature.properties.audioavailable !='.'){
                         //   document.getElementById('commentPopup').disabled = false
                         //   document.getElementById('commentPopup').onclick = function(){
                         //     // document.getElementById('commentPopup').disabled = true
                         //     var audioUrl = feature.properties.audioavailable
                         //     var audioControls = document.getElementById('audioControls')
                         //     audioControls.src = audioUrl
                         //     document.getElementById('audioControls').style.display = 'initial'
                         //   }
                         //   document.getElementById('commentPopup').style.display = 'initial';
                         //   document.getElementById('commentPopup').textContent = '🔊' + ' ' + feature.properties.landusesemoji
                         // }else{
                           document.getElementById('audioControls').style.display = 'none'
                           document.getElementById('commentPopup').style.display = 'initial';
                           document.getElementById('commentPopup').textContent = feature.properties.landusesemoji
                         // }
                        //  if(selectedFeature.feature.properties.commentone != null){
                        //    // if(selectedFeature.feature.properties.commentoneaudioavailable !='.'){
                        //    //   document.getElementById('toCommentPopup').disabled = false
                        //    //   document.getElementById('toCommentPopup').onclick = function(){
                        //    //
                        //    //     var audioUrl = feature.properties.commentoneaudioavailable
                        //    //     var audioControls = document.getElementById('audioControls')
                        //    //     audioControls.src = audioUrl
                        //    //     document.getElementById('audioControls').style.display = 'initial'
                        //    //
                        //    //   }
                        //      document.getElementById('toCommentPopup').style.display = 'initial';
                        //      document.getElementById('toCommentPopup').textContent = feature.properties.commentone
                        //    //
                        //    //   }else{
                        //      document.getElementById('audioControls').style.display = 'none'
                        //      document.getElementById('toCommentPopup').style.display = 'initial';
                        //      document.getElementById('toCommentPopup').textContent = feature.properties.commentone
                        //    // }
                        // }else{
                        //   document.getElementById('toCommentPopup').style.display = 'none';
                        // }
                      }

                    // document.getElementById('editDeletePopup').style.display = 'initial'

                     document.getElementById("backDeleteFeature").style.display = "initial";
                     document.getElementById("shareMessagingApp").style.display = "initial";
                     document.getElementById("deleteFeature").style.display = "initial";
                     document.getElementById("deleteFeature").style.opacity = "1";
                     document.getElementById("deleteFeature").disabled = false;
                     document.getElementById("randomSuggestion").style.display = "initial";
                     document.getElementById("randomSuggestion").style.opacity = '0.4';
                     document.getElementById("randomSuggestion").disabled = true;
                    // miniMap.addTo(map);
                    osm_Button.button.style.opacity = '0.4';
                    osm_Button.button.disabled = true;
                    googleSat_Button.button.style.opacity = '0.4';
                    googleSat_Button.button.disabled = true;
                    planet_Button.button.style.opacity = '0.4';
                    planet_Button.button.disabled = true;

                     gps_Button.button.style.opacity = '0.4';
                     gps_Button.button.disabled = true;
                     myLayer_Button.button.style.opacity = '0.4';
                     myLayer_Button.button.disabled = true;
                     filter_Button.button.style.opacity = '0.4';
                     filter_Button.button.disabled = true;

                     // document.getElementById("deleteFeature").style.display = "initial";
                     // document.getElementById("deleteFeature").style.backgroundColor = 'white';
                     document.getElementById("tutorial").style.display = "none";
                     document.getElementById("polygon").style.display = "none";
                     document.getElementById("polyline").style.display = "none";
                     document.getElementById("point").style.display = "none";
                     document.getElementById("armchair").style.display = "none";
                     document.getElementById("field").style.display = "none";
                     document.getElementById("gobackArmchairField").style.display = "none";

                    // random_Button.addTo(map)
                     selectedFeature.setStyle({color: '#F70573'})
                   }
                     //condition below is at is is to avoid deflated symbol to show as selected after polygon/line have been selected
                     if (selectedFeature.feature.geometry.type == 'Point' && map.getZoom() >= 15 && e.target.feature.properties.areapolygon == 'Point' && e.target.feature.properties.lengthline == 'Point') {
                       aFeatureIsSelected = true

                         // document.getElementById('popupAreaLength').style.display = 'initial'
                         // document.getElementById('popupAreaLength').style.height = '📍';
                         document.getElementById('popupAreaLength').style.display = 'none'
                         cartoIdFeatureSelected = e.target.properties.contributionid
                         console.log('cartoIdFeatureSelected',cartoIdFeatureSelected)

                         // if(selectedFeature.feature.properties.audioavailable !='.'){
                         //   document.getElementById('commentPopup').disabled = false
                         //   document.getElementById('commentPopup').onclick = function(){
                         //     // document.getElementById('commentPopup').disabled = true
                         //     var audioUrl = feature.properties.audioavailable
                         //     var audioControls = document.getElementById('audioControls')
                         //     audioControls.src = audioUrl
                         //     document.getElementById('audioControls').style.display = 'initial'
                         //
                         //   }
                         //   document.getElementById('commentPopup').style.display = 'initial';
                         //   document.getElementById('commentPopup').textContent = '🔊' + ' ' + feature.properties.landusesemoji
                         // }else{
                           document.getElementById('audioControls').style.display = 'none'
                           document.getElementById('commentPopup').style.display = 'initial';
                           document.getElementById('commentPopup').textContent = feature.properties.landusesemoji
                         // }
                        //  if(selectedFeature.feature.properties.commentone != null){
                        //    // if(selectedFeature.feature.properties.commentoneaudioavailable !='.'){
                        //    //   document.getElementById('toCommentPopup').disabled = false
                        //    //   document.getElementById('toCommentPopup').onclick = function(){
                        //    //
                        //    //     var audioUrl = feature.properties.commentoneaudioavailable
                        //    //     var audioControls = document.getElementById('audioControls')
                        //    //     audioControls.src = audioUrl
                        //    //     document.getElementById('audioControls').style.display = 'initial'
                        //    //
                        //    //   }
                        //      document.getElementById('toCommentPopup').style.display = 'initial';
                        //      document.getElementById('toCommentPopup').textContent = feature.properties.commentone
                        //    //
                        //    //   }else{
                        //      document.getElementById('audioControls').style.display = 'none'
                        //      document.getElementById('toCommentPopup').style.display = 'initial';
                        //      document.getElementById('toCommentPopup').textContent = feature.properties.commentone
                        //    // }
                        // }else{
                        //   document.getElementById('toCommentPopup').style.display = 'none';
                        // }

                         // document.getElementById('editDeletePopup').style.display = 'initial'

                         document.getElementById("backDeleteFeature").style.display = "initial";
                         document.getElementById("shareMessagingApp").style.display = "initial";
                         document.getElementById("deleteFeature").style.display = "initial";
                         document.getElementById("deleteFeature").style.opacity = "1";
                         document.getElementById("deleteFeature").disabled = false;
                         document.getElementById("randomSuggestion").style.display = "initial";
                         document.getElementById("randomSuggestion").style.opacity = '0.4';
                         document.getElementById("randomSuggestion").disabled = true;
                        // miniMap.addTo(map)
                        osm_Button.button.style.opacity = '0.4';
                        osm_Button.button.disabled = true;
                        googleSat_Button.button.style.opacity = '0.4';
                        googleSat_Button.button.disabled = true;
                        planet_Button.button.style.opacity = '0.4';
                        planet_Button.button.disabled = true;

                         gps_Button.button.style.opacity = '0.4';
                         gps_Button.button.disabled = true;
                         myLayer_Button.button.style.opacity = '0.4';
                         myLayer_Button.button.disabled = true;
                         filter_Button.button.style.opacity = '0.4';
                         filter_Button.button.disabled = true;

                         // document.getElementById("deleteFeature").style.display = "initial";
                         // document.getElementById("deleteFeature").style.backgroundColor = 'white';
                         document.getElementById("tutorial").style.display = "none";
                         document.getElementById("polygon").style.display = "none";
                         document.getElementById("polyline").style.display = "none";
                         document.getElementById("point").style.display = "none";
                         document.getElementById("armchair").style.display = "none";
                         document.getElementById("field").style.display = "none";
                         document.getElementById("gobackArmchairField").style.display = "none";

                        // random_Button.addTo(map)
                         selectedFeature.editing.enable();
                    }

                      //to deselect feature if user changes zooms or pans, to avoid deletion without looking at the feature.
                      map.on('zoomend', function(e) {
                          try {
                            deflated.editing.disable();

                          } catch (e) {}

                          clickCountDeleteButton = 0
                          map.closePopup();
                          if(selectedFeature && selectedFeature != null){ //second condition to avoid click when backDeletefeature... not best solution but works
                          document.getElementById("backDeleteFeature").click() // !!!!!!!!
                          }

                      })
                      map.on('moveend', function(e) {
                        if(editButtonClicked == false){  // this condition is to prevent this when commenting the cartolayer, like with creating the geometry with drawnitems
                          try {
                            deflated.editing.disable();
                          } catch (e) {}

                          clickCountDeleteButton = 0
                          map.closePopup();

                          if(selectedFeature && selectedFeature != null){ //second condition to avoid click when backDeletefeature... not best solution but works
                            document.getElementById("backDeleteFeature").click() //!!!!!!!!
                          }
                        }
                      })
                      map.on('click', function(e) {
                        // cartoGeometries.color = 'red'
                        if(editButtonClicked == false){  // this condition is to prevent this when commenting the cartolayer, like with creating the geometry with drawnitems
                          try {
                            deflated.editing.disable();
                          } catch (e) {}

                          clickCountDeleteButton = 0
                          map.closePopup();

                          if(selectedFeature && selectedFeature != null){ //second condition to avoid click when backDeletefeature... not best solution but works
                            document.getElementById("backDeleteFeature").click() //!!!!!!!!
                          }
                        }
                      })

                      //to store the cartoID of the future selected

                }//...else

              }
            });//...layerclick

        }//...oneachfeature
    })//...l.geojson
    // cartoGeometriesInitial = cartoGeometries
  try {
    cartoGeometries.addTo(deflated)
  //  console.log('cartogeometries',cartoGeometries)
    }catch(err){
    // console.log('error sql catched due to empty layer after filter applied')
  }
  return cartoGeometries && getTotalFeaturesInDB && aFeatureIsSelected && cartoIdFeatureSelected
};//...CARTO layer
