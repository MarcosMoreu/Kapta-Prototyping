
var cartoGeoJSONLayer = function(data) {
    getTotalFeaturesInDB = data.features.length
  //  console.log('cartolayer',data)
    //console.log('cartolayersize ',getTotalFeaturesInDB)

    cartoLoaded = true;
    cartoGeometries = L.geoJson(data, {
        cache:false,
        color: '#AFFDA7',
        //icon: markerIconLocalStorage,
        onEachFeature: function(feature, layer) {
            var audioAvailable = feature.properties.audioavailable

            if (feature.geometry.type == 'Point') {
              // document.getElementById('popupAreaLength').style.display = 'none'
              // document.getElementById('popupArea').onclick = function(){
              //   document.getElementById('popupArea').textContent = 'contentchanged'
              //
              // }
                //layer.bindPopup(feature.properties.landusesemoji + feature.properties.audioavailable);
                // document.getElementById('popupAreaLength').textContent = '-'

                layer.bindPopup(template,{minWidth:200});

            }
            if (feature.geometry.type == 'Polygon') {
              //document.getElementById('popupAreaLength').style.display = 'initial'
              // document.getElementById('popupAreaLength').textContent = feature.properties.areapolygon

                layer.bindPopup(template,{minWidth:200});


                //layer.bindPopup(feature.properties.landusesemoji + feature.properties.audioavailable);
            }
            if (feature.geometry.type == 'LineString') {
              // document.getElementById('popupAreaLength').textContent = feature.properties.lengthline

              layer.bindPopup(template,{minWidth:200});


                // layer.bindPopup(feature.properties.landusesemoji + feature.properties.audioavailable);
            }

            /////////////////////////////
          layer.on('click', function(e) {


              document.getElementById("clearFilter").style.display = "none";
              document.getElementById("applyFilter").style.display = "none";
              document.getElementById("filterByDate").style.display = "none";
              document.getElementById("classification").style.display = "none";
              document.getElementById("emoji").style.display = "none";

              document.getElementById("whatsApp").style.display = "none";
              document.getElementById("telegram").style.display = "none";
              document.getElementById("weChat").style.display = "none";
              document.getElementById("goBackMessagingApps").style.display = "none";

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
                //  console.log(geometryStringGeoJSON)

                  map.fitBounds(geometryStringGeoJSON.getBounds());
              }
              //the condition below is as it is because geometry column in the DB cannot be accessed while not deflated, so the properties.areas... is used
              if(e.target.feature.geometry.type == 'Point' && map.getZoom() < 15 && e.target.feature.properties.areapolygon == 'Point' && e.target.feature.properties.lengthline == 'Point') {
                  map.closePopup();
                  var geometryString = e.target.feature.properties.geometrystring
                  var geometryStringGeoJSON = L.geoJSON(JSON.parse(geometryString))
                  var coord = e.target.feature.geometry.coordinates;
                  var latLng = L.GeoJSON.coordsToLatLng(coord);

                  map.setView(latLng, 15);
                  layer.closePopup(feature.properties.landusesemoji + feature.properties.audioavailable); //to not open popup after second click

               }else {

                  selectedFeature = e.target;
                  // selectedFeature.editing.enable();

                   if (selectedFeature.feature.geometry.type != 'Point') {
                     //to populate the area/length field in the popup
                      if(selectedFeature.feature.geometry.type == 'Polygon'){
                        document.getElementById('popupAreaLength').style.display = 'initial'
                        document.getElementById('popupAreaLength').textContent = feature.properties.areapolygon

                          if(selectedFeature.feature.properties.audioavailable !='.'){
                            document.getElementById('commentPopup').disabled = false
                            document.getElementById('commentPopup').onclick = function(){

                              var audioUrl = feature.properties.audioavailable
                              var audioControls = document.getElementById('audioControls')
                              audioControls.src = audioUrl
                              document.getElementById('audioControls').style.display = 'initial'

                            }
                            document.getElementById('commentPopup').style.display = 'initial';
                            document.getElementById('commentPopup').textContent = '🔊' + ' ' + feature.properties.landusesemoji

                            }else{
                            document.getElementById('audioControls').style.display = 'none'
                            document.getElementById('commentPopup').style.display = 'initial';
                            document.getElementById('commentPopup').textContent = feature.properties.landusesemoji
                          }

                          //to add bluebox if comment Available
                          if(selectedFeature.feature.properties.commentone != null){
                            // if(selectedFeature.feature.properties.commentoneaudioavailable !='.'){
                            //   document.getElementById('toCommentPopup').disabled = false
                            //   document.getElementById('toCommentPopup').onclick = function(){
                            //
                            //     var audioUrl = feature.properties.commentoneaudioavailable
                            //     var audioControls = document.getElementById('audioControls')
                            //     audioControls.src = audioUrl
                            //     document.getElementById('audioControls').style.display = 'initial'
                            //
                            //   }
                            //   document.getElementById('toCommentPopup').style.display = 'initial';
                            //   document.getElementById('toCommentPopup').textContent = '🔊' + ' ' + feature.properties.commentone
                            //
                            //   }
                            //   else{
                              document.getElementById('audioControls').style.display = 'none'
                              document.getElementById('toCommentPopup').style.display = 'initial';
                              document.getElementById('toCommentPopup').textContent = feature.properties.commentone
                           // }
                         }else{
                           document.getElementById('toCommentPopup').style.display = 'none';
                         }

                      }else{ //it a line
                         // document.getElementById('popupAreaLength').style.display = 'initial'
                         // document.getElementById('popupAreaLength').textContent = '〰️'
                         document.getElementById('popupAreaLength').style.display = 'none'


                         if(selectedFeature.feature.properties.audioavailable !='.'){
                           document.getElementById('commentPopup').disabled = false
                           document.getElementById('commentPopup').onclick = function(){
                             // document.getElementById('commentPopup').disabled = true
                             var audioUrl = feature.properties.audioavailable
                             var audioControls = document.getElementById('audioControls')
                             audioControls.src = audioUrl
                             document.getElementById('audioControls').style.display = 'initial'
                           }
                           document.getElementById('commentPopup').style.display = 'initial';
                           document.getElementById('commentPopup').textContent = '🔊' + ' ' + feature.properties.landusesemoji
                         }else{
                           document.getElementById('audioControls').style.display = 'none'
                           document.getElementById('commentPopup').style.display = 'initial';
                           document.getElementById('commentPopup').textContent = feature.properties.landusesemoji
                         }
                         if(selectedFeature.feature.properties.commentone != null){
                           // if(selectedFeature.feature.properties.commentoneaudioavailable !='.'){
                           //   document.getElementById('toCommentPopup').disabled = false
                           //   document.getElementById('toCommentPopup').onclick = function(){
                           //
                           //     var audioUrl = feature.properties.commentoneaudioavailable
                           //     var audioControls = document.getElementById('audioControls')
                           //     audioControls.src = audioUrl
                           //     document.getElementById('audioControls').style.display = 'initial'
                           //
                           //   }
                           //   document.getElementById('toCommentPopup').style.display = 'initial';
                           //   document.getElementById('toCommentPopup').textContent = '🔊' + ' ' + feature.properties.commentone
                           //
                           //   }else{
                             document.getElementById('audioControls').style.display = 'none'
                             document.getElementById('toCommentPopup').style.display = 'initial';
                             document.getElementById('toCommentPopup').textContent = feature.properties.commentone
                          // }
                        }else{
                          document.getElementById('toCommentPopup').style.display = 'none';
                        }
                      }

                    document.getElementById('editDeletePopup').style.display = 'initial'

                     document.getElementById("backDeleteFeature").style.display = "initial";
                     document.getElementById("shareMessagingApp").style.display = "initial";
                     document.getElementById("deleteFeature").style.display = "initial";
                     document.getElementById("deleteFeature").style.opacity = "1";
                     document.getElementById("deleteFeature").disabled = false;
                     document.getElementById("randomSuggestion").style.display = "initial";
                    // miniMap.addTo(map);
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
                    // random_Button.addTo(map)
                     selectedFeature.setStyle({color: '#F70573'})
                   }
                     //condition below is at is is to avoid deflated symbol to show as selected after polygon/line have been selected
                     if (selectedFeature.feature.geometry.type == 'Point' && map.getZoom() >= 15 && e.target.feature.properties.areapolygon == 'Point' && e.target.feature.properties.lengthline == 'Point') {
                         // document.getElementById('popupAreaLength').style.display = 'initial'
                         // document.getElementById('popupAreaLength').style.height = '📍';
                         document.getElementById('popupAreaLength').style.display = 'none'


                         if(selectedFeature.feature.properties.audioavailable !='.'){
                           document.getElementById('commentPopup').disabled = false
                           document.getElementById('commentPopup').onclick = function(){
                             // document.getElementById('commentPopup').disabled = true
                             var audioUrl = feature.properties.audioavailable
                             var audioControls = document.getElementById('audioControls')
                             audioControls.src = audioUrl
                             document.getElementById('audioControls').style.display = 'initial'

                           }
                           document.getElementById('commentPopup').style.display = 'initial';
                           document.getElementById('commentPopup').textContent = '🔊' + ' ' + feature.properties.landusesemoji
                         }else{
                           document.getElementById('audioControls').style.display = 'none'
                           document.getElementById('commentPopup').style.display = 'initial';
                           document.getElementById('commentPopup').textContent = feature.properties.landusesemoji
                         }
                         if(selectedFeature.feature.properties.commentone != null){
                           // if(selectedFeature.feature.properties.commentoneaudioavailable !='.'){
                           //   document.getElementById('toCommentPopup').disabled = false
                           //   document.getElementById('toCommentPopup').onclick = function(){
                           //
                           //     var audioUrl = feature.properties.commentoneaudioavailable
                           //     var audioControls = document.getElementById('audioControls')
                           //     audioControls.src = audioUrl
                           //     document.getElementById('audioControls').style.display = 'initial'
                           //
                           //   }
                           //   document.getElementById('toCommentPopup').style.display = 'initial';
                           //   document.getElementById('toCommentPopup').textContent = '🔊' + ' ' + feature.properties.commentone
                           //
                           //   }else{
                             document.getElementById('audioControls').style.display = 'none'
                             document.getElementById('toCommentPopup').style.display = 'initial';
                             document.getElementById('toCommentPopup').textContent = feature.properties.commentone
                          // }
                        }else{
                          document.getElementById('toCommentPopup').style.display = 'none';
                        }

                         document.getElementById('editDeletePopup').style.display = 'initial'

                         document.getElementById("backDeleteFeature").style.display = "initial";
                         document.getElementById("shareMessagingApp").style.display = "initial";
                         document.getElementById("deleteFeature").style.display = "initial";
                         document.getElementById("deleteFeature").style.opacity = "1";
                         document.getElementById("deleteFeature").disabled = false;
                         document.getElementById("randomSuggestion").style.display = "initial";
                        // miniMap.addTo(map)
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
                          try {
                            deflated.editing.disable();
                          } catch (e) {}

                          clickCountDeleteButton = 0
                          map.closePopup();

                          if(selectedFeature && selectedFeature != null){ //second condition to avoid click when backDeletefeature... not best solution but works
                            document.getElementById("backDeleteFeature").click() //!!!!!!!!
                          }
                      })

                      //to store the cartoID of the future selected
                      cartoIdFeatureSelected = selectedFeature.feature.properties.cartodb_id

                }//...else
            });//...layerclick
        }//...oneachfeature
    })//...l.geojson

  try {
    cartoGeometries.addTo(deflated)
  }catch(err){
    // console.log('error sql catched due to empty layer after filter applied')
  }
  return cartoGeometries && getTotalFeaturesInDB
};//...CARTO layer
