//function to customise deflated shapes
function customDeflateMarkersLocalStorage(f) {
    // Use custom marker only for buildings
    if (f.feature.geometry.type === 'Polygon') {
        return {
            icon: L.icon({
                iconUrl: 'images/markerPolygonBlue.png',
                iconSize: [30, 30]
            })
        }
    };
    if (f.feature.geometry.type === 'LineString') {
        return {
            icon: L.icon({
                iconUrl: 'images/markerLine.png',
                iconSize: [30, 30]
            })
        }
    }
    return {};
}

var deflatedLocalStorage = L.deflate({
    minSize: 20, // if this is set to 100, very small polygons do not deflate at zoom 21
    maxsize: 1,
    markerCluster: true,
    markerType: L.marker,
    markerOptions: customDeflateMarkersLocalStorage
})
// deflatedLocalStorage.addTo(map) // to initialize //////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// localStorageLayer.addTo(deflatedLocalStorage)
// function onEachFeatureAudioLocalStorage(feature, layer) { // function duplicated to avoid openpop() with local storage
//
//     //timeout is used to wait 1000ms until the download link is ready
//     setTimeout(function() {
//       // var hectares = feature.properties.areaPolygon
//       // var hectaresToAcres = hectares * 2.47105
//         ////console.log('isonline' + ' ' + isOnline)
//         var audioLinkText = '🔊 AUDIO'
//         var audioAvailable = feature.properties.audioAvailable;
//         //conditions to avoid showing audio link if no audio has been recorded
//         if (audioAvailable == true) {
//             if(feature.properties.areaPolygon == 'Point' || feature.properties.areaPolygon == 'Line'){
//               var popupContent = feature.properties.landUsesEmoji + '</br>' + '</br>' + '🔊 🚧';
//             }else{
//               var popupContent = '📐 ' + '<i>' + feature.properties.areaPolygon + '</i>' + '</br>' + '</br>' + feature.properties.landUsesEmoji + '</br>' + '</br>' + '🔊 🚧';
//             }
//         } else {
//           if(feature.properties.areaPolygon == 'Point' || feature.properties.areaPolygon == 'Line'){
//             var popupContent = feature.properties.landUsesEmoji
//           }else{
//             var popupContent = '📐 ' + '<i>' + feature.properties.areaPolygon + '</i>' + '</br>' + '</br>' + feature.properties.landUsesEmoji
//           }
//         }
//         if (feature.properties && feature.properties.popupContent) {
//             popupContent += feature.properties.popupContent;
//         }
//         layer.bindPopup(popupContent) //.addTo(map); // removed otherwise the layer is automatically added to the map when oneachfeaturelocl.. is called
//
//         if (finished == true) {
//             layer.bindPopup(popupContent).openPopup();
//         }
//         // if(urlContainsGeoJSON == true){
//         //   console.log(feature)
//         //     feature = parsedJSON.features[0]
//         //     feature.bindPopup(popupContent).openPopup();
//         // }
//
//     }, 1600)
// return feature
// }

var isLocalStorage
var localStorageLayer
var localStorageToGeoJSON = function(){
  ////console.log(groupGeoJSON)

    if (isJson(groupGeoJSON) == false) {
        localStorageLayer = L.geoJSON(groupGeoJSON, {
            style: function(feature) {
                //myLayerIsOn = true;
                ////console.log(myLayerIsOn)
                return feature.properties && feature.properties.style;
            },
            pointToLayer: function(feature, latlng) {

                return L.marker(latlng, {
                    icon: markerIconLocalStorage,
                    draggable:false
                });
            },
            color: '#33FFFF',
            autopan: false,
            //  icon: markerIconLocalStorage,
            onEachFeature: function(feature, layer) {
              // timeout is used to wait 1000ms until the download link is ready
                  setTimeout(function() {

                      var audioLinkText = '🔊 AUDIO'
                      var audioAvailable = feature.properties.audioAvailable;
                      //conditions to avoid showing audio link if no audio has been recorded
                      if (audioAvailable == true) {
                          if(feature.properties.areaPolygon == 'Point' || feature.properties.areaPolygon == 'Line'){
                            var popupContent = feature.properties.landUsesEmoji + '</br>' + '</br>' + '🔊 🚧';
                          }else{
                            var popupContent = '📐 ' + '<i>' + feature.properties.areaPolygon + '</i>' + '</br>' + '</br>' + feature.properties.landUsesEmoji + '</br>' + '</br>' + '🔊 🚧';
                          }
                      } else {
                        if(feature.properties.areaPolygon == 'Point' || feature.properties.areaPolygon == 'Line'){
                          var popupContent = feature.properties.landUsesEmoji
                        }else{
                          var popupContent = '📐 ' + '<i>' + feature.properties.areaPolygon + '</i>' + '</br>' + '</br>' + feature.properties.landUsesEmoji
                        }
                      }
                      if (feature.properties && feature.properties.popupContent) {
                          popupContent += feature.properties.popupContent;
                      }
                      layer.bindPopup(popupContent) //.addTo(map); // removed otherwise the layer is automatically added to the map when oneachfeaturelocl.. is called

                      if (finished == true) {
                          layer.bindPopup(popupContent).openPopup();
                      }
                  }, 1600)

                /////////////////////////////
              layer.on('click', function(e) {
                isLocalStorage = true
                // selectedFeature = e.target;
                //selectedFeature.setStyle({color: 'red'})

                  if(aFeatureIsSelected == true ){
                    document.getElementById("backDeleteFeature").click() //!!!!!!!!
                    if(editButtonClicked == true){
                      clearInterval(refreshPopupComment)
                      document.getElementById('backEditDelete').click()
                    }


                    console.log('aFeatureIsSelected true')
                  }else{ // this if/else is to ensure that two features can not be selected at the same time
                  console.log('aFeatureIsSelected false')

                  document.getElementById("clearFilter").style.display = "none";
                  document.getElementById("applyFilter").style.display = "none";
                  document.getElementById("filterByDate").style.display = "none";
                  document.getElementById("classification").style.display = "none";
                  document.getElementById("emoji").style.display = "none";

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
                    console.log('approaching?')
                    layer.editing.disable();
                    // layer.editing.enable();
                      map.closePopup();
                      // e.target.feature.editing.disable();

                      var currentZoom = map.getZoom()
                      // console.log(e.target.feature)
                      // console.log(e.target.feature.geometry)
                      // console.log(e.target.feature.geometry.coordinates)
                      var coord = e.target.feature.geometry.coordinates;
                      var latLng = L.GeoJSON.coordsToLatLng(coord);

                      // var latLngs = [ e.target.feature.getLatLng() ];
                        // var markerBounds = L.latLngBounds(latLngs);
                        // map.fitBounds(markerBounds);
                        map.flyTo(latLng,17)

                      // var geometryString = e.target.feature.geometry.coordinates
                      // console.log(geometrystring)
                      // var geometryStringGeoJSON = L.geoJSON(JSON.parse(geometryString))
                    //  console.log(geometryStringGeoJSON)

                      // map.fitBounds(geometryStringGeoJSON.getBounds());
                  // }
                  // //the condition below is as it is because geometry column in the DB cannot be accessed while not deflated, so the properties.areas... is used
                  // // if(e.target.feature.geometry.type == 'Point' && map.getZoom() < 17 && e.target.feature.properties.areapolygon == 'Point' && e.target.feature.properties.lengthline == 'Point') {
                  // if(e.target.feature.geometry.type == 'Point' && map.getZoom() < 0) {
                  //
                  //     map.closePopup();
                  //     console.log('gotopoint')
                  //     // var geometryString = e.target.feature.properties.geometrystring
                  //     // var geometryStringGeoJSON = L.geoJSON(JSON.parse(geometryString))
                  //     var coord = e.target.feature.geometry.coordinates;
                  //     var latLng = L.GeoJSON.coordsToLatLng(coord);
                  //     // map.closePopup();
                  //
                  //     map.flyTo(latLng,17)
                  //     // map.closePopup();
                  //
                  //     // layer.closePopup(feature.properties.landusesemoji + feature.properties.audioavailable); //to not open popup after second click

                   }else {
                     // selectedFeature.editing.disable();
                     // selectedFeature.editing.enable();

                      selectedFeature = e.target;
                      // selectedFeature.editing.enable();

                       if (selectedFeature.feature.geometry.type != 'Point') {
                         //to populate the area/length field in the popup
                          // if(selectedFeature.feature.geometry.type == 'Polygon'){
                            aFeatureIsSelected = true

                          // }else{ //it a line
                            // aFeatureIsSelected = true
                          // }

                        // document.getElementById('editDeletePopup').style.display = 'initial'

                         document.getElementById("backDeleteFeature").style.display = "initial";
                         document.getElementById("deleteFeatureLocalStorage").style.display = "initial";
                         // document.getElementById("deleteFeature").style.display = "initial";
                         // document.getElementById("deleteFeature").style.opacity = "1";
                         // document.getElementById("deleteFeature").disabled = false;
                         // document.getElementById("randomSuggestion").style.display = "initial";
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
                         localStorageRecenter_Button.button.style.opacity = '0.4';
                         localStorageRecenter_Button.button.disabled = true;

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
                         if (selectedFeature.feature.geometry.type == 'Point') {
                           if(map.getZoom() < 15) {
                             layer.editing.disable();
                             // layer.closePopup(selectedFeature.properties.landusesemoji)
                             // layer.editing.enable();
                               map.closePopup();
                               var coord = e.target.feature.geometry.coordinates;
                               var latLng = L.GeoJSON.coordsToLatLng(coord);
                               // selectedFeature.editing.disable();
                               //
                               // map.closePopup();

                               map.flyTo(latLng,17)
                               // selectedFeature.editing.disable();
                               // map.closePopup();


                          }else{
                            aFeatureIsSelected = true
                            console.log(aFeatureIsSelected)

                              document.getElementById("backDeleteFeature").style.display = "initial";
                              document.getElementById("deleteFeatureLocalStorage").style.display = "initial";
                              // document.getElementById("deleteFeature").style.display = "initial";
                              // document.getElementById("deleteFeature").style.opacity = "1";
                              // document.getElementById("deleteFeature").disabled = false;
                              // document.getElementById("randomSuggestion").style.display = "initial";
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
                              localStorageRecenter_Button.button.style.opacity = '0.4';
                              localStorageRecenter_Button.button.disabled = true;


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

                        }

                          //to deselect feature if user changes zooms or pans, to avoid deletion without looking at the feature.
                          map.on('zoomend', function(e) {
                              try {
                                localStorageLayer.editing.disable();

                              } catch (e) {}

                              clickCountDeleteButton = 0
                              map.closePopup();
                              if(selectedFeature && selectedFeature != null){ //second condition to avoid click when backDeletefeature... not best solution but works
                              document.getElementById("backDeleteFeature").click() // !!!!!!!!
                                  if(whichLayerIsOn == 'localStorage'){
                                    localStorageRecenter_Button.addTo(map);
                                    localStorageRecenter_Button.button.style.opacity = '1';
                                    localStorageRecenter_Button.button.disabled = false;
                                    filter_Button.removeFrom(map)
                                  }


                              }

                          })
                          map.on('moveend', function(e) {
                            if(editButtonClicked == false){  // this condition is to prevent this when commenting the cartolayer, like with creating the geometry with drawnitems
                              try {
                                localStorageLayer.editing.disable();
                              } catch (e) {}

                              clickCountDeleteButton = 0
                              map.closePopup();

                              if(selectedFeature && selectedFeature != null){ //second condition to avoid click when backDeletefeature... not best solution but works
                                document.getElementById("backDeleteFeature").click() //!!!!!!!!
                                if(whichLayerIsOn == 'localStorage'){

                                    localStorageRecenter_Button.addTo(map);
                                    localStorageRecenter_Button.button.style.opacity = '1';
                                    localStorageRecenter_Button.button.disabled = false;
                                    filter_Button.removeFrom(map)
                                }
                              }
                            }
                          })
                          map.on('click', function(e) {
                            // cartoGeometries.color = 'red'
                            if(editButtonClicked == false){  // this condition is to prevent this when commenting the cartolayer, like with creating the geometry with drawnitems
                              try {
                                localStorageLayer.editing.disable();
                              } catch (e) {}

                              clickCountDeleteButton = 0
                              map.closePopup();

                              if(selectedFeature && selectedFeature != null){ //second condition to avoid click when backDeletefeature... not best solution but works
                                document.getElementById("backDeleteFeature").click() //!!!!!!!!
                                    if(whichLayerIsOn == 'localStorage'){

                                    localStorageRecenter_Button.addTo(map);
                                    localStorageRecenter_Button.button.style.opacity = '1';
                                    localStorageRecenter_Button.button.disabled = false;
                                    filter_Button.removeFrom(map)
                                  }
                              }
                            }
                          })

                          //to store the cartoID of the future selected
                          cartoIdFeatureSelected = selectedFeature.feature.properties.cartodb_id

                    }//...else

                  }
                });//...layerclick
            }//...oneachfeature

        }) //.addTo(map)
        ////console.log('localStorageLayer', localStorageLayer)

    }
    localStorageLayer.addTo(deflatedLocalStorage)

return localStorageLayer && isLocalStorage
}



document.getElementById('deleteFeatureLocalStorage').onclick = function(){
  console.log(selectedFeature)
  //to find the item in the local storage we use randomID, as is the same as keyvalue
  var getRandomID = selectedFeature.feature.properties.randomID
  console.log(getRandomID)
selectedFeature.removeFrom(deflatedLocalStorage)
selectedFeature.removeFrom(localStorageLayer)

geoJSONLocalforageDB.removeItem(getRandomID)
  document.getElementById('deleteFeatureLocalStorage').style.display = 'none'
  document.getElementById("backDeleteFeature").click()
  document.getElementById('backDeleteFeature').style.display = 'none'
  localStorageRecenter_Button.addTo(map);
  filter_Button.removeFrom(map)

}
