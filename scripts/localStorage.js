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
var fillColor
var colorPaletteArray = ['#E7A605','#9D9D9C','#04BD9E','#04BD69','#0488BD','#028B1D','#026716','#670F02','#4F0C01','#0461F9','#023EA0',
                          '#FB05DD','#05FB2E','#E70434','#8A94F7','#F7F78A','#8AF7F7','#966302','#3A519F','#BFBFC0','#CFCFCC','#B0B0AE',
                          '#939392','#04F80C','#939392','#939392','#939392','#939392']
var localStorageToGeoJSON = function(){
  ////console.log(groupGeoJSON)

var polygonColor = function(feature){
// console.log(feature.properties.landUsesEmoji)
  if(feature.geometry.type == 'Polygon'){ //to appy this only to polygons
    // console.log(feature)
    // if(!feature.properties.landUsesEmoji){
      var attribute = feature.properties.I1
      console.log('attribute',attribute)
    // }else{
    //   var attribute = feature.properties.landUsesEmoji
    // }
  switch(true){

    case (attribute.includes('hutVillage')): //hutvillage 1
      fillColor = colorPaletteArray[0]
      break
    case (attribute.includes('manualPump')): //manual pump 2
      fillColor = colorPaletteArray[1]
      break
    case (attribute.includes('pondFarming')): //pondfarming 3
      fillColor = colorPaletteArray[2]
      break
    case (attribute.includes('lakeRecession')): //lake recession 4
      fillColor = colorPaletteArray[3]
      break
    case (attribute.includes('irrigationPump')): //irrigationpump 5
      fillColor = colorPaletteArray[4]
      break
    case (attribute.includes('floodRecessionFlat')): //flood recession flat 6
      fillColor = colorPaletteArray[5]
      break
    case (attribute.includes('floodRecessionSteep')): //flood recession steep 7
      fillColor = colorPaletteArray[6]
      break
    case (attribute.includes('cattleGrazing')): //cattle grazing 8
      fillColor = colorPaletteArray[7]
      break
    case (attribute.includes('goatSheepGrazing')): //goatsheetpgrazing 9
      fillColor = colorPaletteArray[8]
      break
    case (attribute.includes('waterPondAnimal')): //wateranimal 10
      fillColor = colorPaletteArray[9]
      break
    case (attribute.includes('waterRiverAnimal')): //water river animal 11
      fillColor = colorPaletteArray[10]
      break
    case (attribute.includes('saltlick'))://saltlick 12
      fillColor = colorPaletteArray[11]
      break
    case (attribute.includes('wildFruits')): //wildfruits 13
      fillColor = colorPaletteArray[12]
      break
    case (attribute.includes('hunting')): //hunting 14
      fillColor = colorPaletteArray[13]
      break
    case (attribute.includes('fishing')): //fishing 15
      fillColor = colorPaletteArray[14]
      break
    case (attribute.includes('reehive')): //reehive 16
      fillColor = colorPaletteArray[15]
      break
    case (attribute.includes('medicinalPlants')): //medicinal plants 17
      fillColor = colorPaletteArray[16]
      break
    case (attribute.includes('timber')): //timber 18
      fillColor = colorPaletteArray[17]
      break
    case (attribute.includes('hotSpring')): //hotspring 19
      fillColor = colorPaletteArray[18]
      break
    case (attribute.includes('waterPoint')): //waterpoint 20
      fillColor = colorPaletteArray[19]
      break
    case (attribute.includes('healthStation')): //healtstation 21
      fillColor = colorPaletteArray[20]
      break
    case (attribute.includes('school')): //school 22
      fillColor = colorPaletteArray[21]
      break
    case (attribute.includes('veterinary')): //veterinary 23
      fillColor = colorPaletteArray[22]
      break
    case (attribute.includes('treeForGathering')): //tree gathering 24
      fillColor = colorPaletteArray[23]
      break
    case (attribute.includes('eldersHut')): //eldershut 25
      fillColor = colorPaletteArray[24]
      break
    case (attribute.includes('recreationCenter')): //recreation center 26
      fillColor = colorPaletteArray[25]
      break
    case (attribute.includes('church')): //church 27
      fillColor = colorPaletteArray[26]
      break
    case (attribute.includes('boatCrossing')): //boat crossing 28
      fillColor = colorPaletteArray[27]
      break
    case (attribute.includes('pathTrack')): //unknown 29
      fillColor = colorPaletteArray[28]
      break
    case (attribute.includes('ldgeneric')): //unknown 29
      fillColor = colorPaletteArray[25]
      break
    case (attribute.includes('conflictgeneric')): //unknown 29
      fillColor = colorPaletteArray[24]
      break

    // case (attribute.includes('shelter')): //hutvillage 1
    //   fillColor = colorPaletteArray[0]
    //   break
    // case (attribute.includes('pluis')): //manual pump 2
    //   fillColor = colorPaletteArray[1]
    //   break
    // case (attribute.includes('cout')): //pondfarming 3
    //   fillColor = colorPaletteArray[2]
    //   break
    // case (attribute.includes('person')): //lake recession 4
    //   fillColor = colorPaletteArray[3]
    //   break
    // case (attribute.includes('maison')): //irrigationpump 5
    //   fillColor = colorPaletteArray[4]
    //   break
    // case (attribute.includes('femmes')): //flood recession flat 6
    //   fillColor = colorPaletteArray[5]
    //   break
    // case (attribute.includes('hommes')): //flood recession steep 7
    //   fillColor = colorPaletteArray[6]
    //   break
    // case (attribute.includes('regime')): //cattle grazing 8
    //   fillColor = colorPaletteArray[7]
    //   break
    // case (attribute.includes('vents')): //goatsheetpgrazing 9
    //   fillColor = colorPaletteArray[8]
    //   break
    // case (attribute.includes('seul')): //wateranimal 10
    //   fillColor = colorPaletteArray[9]
    //   break
    // case (attribute.includes('protection')): //water river animal 11
    //   fillColor = colorPaletteArray[10]
    //   break
    // case (attribute.includes('proppri'))://saltlick 12
    //   fillColor = colorPaletteArray[11]
    //   break
    // case (attribute.includes('mangues')): //wildfruits 13
    //   fillColor = colorPaletteArray[12]
    //   break
    // case (attribute.includes('innon')): //hunting 14
    //   fillColor = colorPaletteArray[13]
    //   break
    // case (attribute.includes('champs')): //fishing 15
    //   fillColor = colorPaletteArray[14]
    //   break
    // case (attribute.includes('document')): //reehive 16
    //   fillColor = colorPaletteArray[15]
    //   break
    // case (attribute.includes('ኤደዋ')): //medicinal plants 17
    //   fillColor = colorPaletteArray[16]
    //   break
    // case (attribute.includes('አኩቶይ አክም')): //timber 18
    //   fillColor = colorPaletteArray[17]
    //   break
    // case (attribute.includes('ኤሩስ')): //hotspring 19
    //   fillColor = colorPaletteArray[18]
    //   break
    // case (attribute.includes('አቦኖ')): //waterpoint 20
    //   fillColor = colorPaletteArray[19]
    //   break
    // case (attribute.includes('አካይ ኤደዋ')): //healtstation 21
    //   fillColor = colorPaletteArray[20]
    //   break
    // case (attribute.includes('አካይ ኤሱኩል')): //school 22
    //   fillColor = colorPaletteArray[21]
    //   break
    // case (attribute.includes('አካይ ኤደዋ አግባረን')): //veterinary 23
    //   fillColor = colorPaletteArray[22]
    //   break
    // case (attribute.includes('ኤኩቶይ')): //tree gathering 24
    //   fillColor = colorPaletteArray[23]
    //   break
    // case (attribute.includes('ኤካፓ')): //eldershut 25
    //   fillColor = colorPaletteArray[24]
    //   break
    // case (attribute.includes('አፓክ ንቦልያት')): //recreation center 26
    //   fillColor = colorPaletteArray[25]
    //   break
    // case (attribute.includes('አካይ አኩጅ')): //church 27
    //   fillColor = colorPaletteArray[26]
    //   break
    // case (attribute.includes('ኤዶከት አቱቧ')): //boat crossing 28
    //   fillColor = colorPaletteArray[27]
    //   break
    // case (attribute.includes('ɔ̂ቺየ')): //unknown 29
    //   fillColor = colorPaletteArray[28]
    //   break
//in case the sap project was not used
    case (attribute != null):
      fillColor = 'white'
      break
  }
    // if(aFeatureIsSelected == true){
    //   var weight = 3
    // }else{
    //   var weight = 0
    // }

    return {
          fillColor: fillColor,
          weight: 0,
          opacity: 1,
          color: '#33FFFF',  //Outline color  OR  #00FFFB !!!!!!!!!!
          fillOpacity: 0.4
      }// && feature.properties && feature.properties.style;
  }
}


    if (isJson(groupGeoJSON) == false) {
        localStorageLayer = L.geoJSON(groupGeoJSON, {
            style: polygonColor,
            pointToLayer: function(feature, latlng) {

                return L.marker(latlng, {
                    icon: markerIconLocalStorage,
                    draggable:false
                });
            },
            color: 'black',
            // color: 'black',

            autopan: false,
            //  icon: markerIconLocalStorage,
            onEachFeature: function(feature, layer) {
              // timeout is used to wait 1000ms until the download link is ready
                  setTimeout(function() {
                      var imgPopup1 = '<img src="images/omoIcons/' + feature.properties.I1 + '.png"'+ 'height="50px" width="50px" border="2" bordercolor="grey"/>'

                    // var imgPopup2 = '<img src="images/omoIcons/' + feature.properties.I2 + '.png"'+ 'height="50px" width="50px" border="2" bordercolor="grey"/>'

                    //to put and image of zero dimension in case there isn't such property
                    if(feature.properties.I2){
                      var imgPopup2 = '<img src="images/omoIcons/' + feature.properties.I2 + '.png"'+ 'height="50px" width="50px" border="2" bordercolor="grey"/>'
                    }else{
                      var imgPopup2 = '<img src="images/omoIcons/ThumbsUp.png"'+ 'height="0px" width="0px" border="0" bordercolor="grey"/>'
                    }

                    if(feature.properties.I3){
                      var imgPopup3 = '<img src="images/omoIcons/' + feature.properties.I3 + '.png"'+ 'height="50px" width="50px" border="2" bordercolor="grey"/>'
                    }else{
                      var imgPopup3 = '<img src="images/omoIcons/ThumbsUp.png"'+ 'height="0px" width="0px" border="0" bordercolor="grey"/>'
                    }




                      var audioLinkText = '🔊 AUDIO'
                      var audioAvailable = feature.properties.audioAvailable;
                      //conditions to avoid showing audio link if no audio has been recorded
                      if (audioAvailable == true) {
                          if(feature.properties.A == 'Point' || feature.properties.A == 'Line' || !feature.properties.A){
                            var popupContent = feature.properties.LU + '</br>' + '</br>' + '🔊 🚧';
                          }else{
                            var popupContent = '📐 ' + '<i>' + feature.properties.A + '</i>' + '</br>' + '</br>' + feature.properties.LU + '</br>' + '</br>' + '🔊 🚧';
                          }
                      } else {
                        //to check if properties are landuseemoji or LU
                        if(feature.properties.A){
                          if(feature.properties.A == 'Point' || feature.properties.A == 'Line' || !feature.properties.A){
                            // var imgPopup = '<img src="images/google.png" height="50px" width="50px"/>'
                            if(feature.properties.I1){ // to distinguish between sapelli attributes or just text
                                var popupContent = feature.properties.Description + '</br>' + '</br>'+ imgPopup1 + ' ' +imgPopup2 + ' ' + imgPopup3
                           }else{
                              var popupContent = feature.properties.Description + '</br>'
                            }

                          }else{
                            if(feature.properties.I1){
                                var popupContent = '📐 ' + '<i>' + feature.properties.areaPolygon + '</i>' + '</br>' + '</br>' + feature.properties.Description + '</br>'+ '</br>'+ imgPopup1  + ' ' + imgPopup2 + ' ' + imgPopup3
                            }else{
                              var popupContent = '📐 ' + '<i>' + feature.properties.areaPolygon + '</i>' + '</br>' + '</br>' + feature.properties.Description + '</br>'
                            }
                          }
                        }else{
                          if(feature.properties.areaPolygon == 'Point' || feature.properties.areaPolygon == 'Line' || !feature.properties.areaPolygon){
                            // var imgPopup = '<img src="images/google.png" height="50px" width="50px"/>'
                            if(feature.properties.I1){
                                var popupContent = feature.properties.Description + '</br>' +'</br>'+ imgPopup1 + ' ' +imgPopup2 + ' ' + imgPopup3
                            }else{
                              var popupContent = feature.properties.Description + '</br>'
                            }

                          }else{
                            if(feature.properties.I1){
                                var popupContent = '📐 ' + '<i>' + feature.properties.areaPolygon + '</i>' + '</br>' + '</br>' + feature.properties.Description + '</br>' + '</br>'+ imgPopup1  + ' ' + imgPopup2 + ' ' + imgPopup3
                            }else{
                              var popupContent = '📐 ' + '<i>' + feature.properties.areaPolygon + '</i>' + '</br>' + '</br>' + feature.properties.Description + '</br>'
                            }
                          }
                        }


                      }
                      if (feature.properties && feature.properties.popupContent) {
                          popupContent += feature.properties.popupContent;
                      }
                      layer.bindPopup(popupContent,{
                        maxWidth : 150
                      });
 //.addTo(map); // removed otherwise the layer is automatically added to the map when oneachfeaturelocl.. is called

                      if (finished == true) {
                          layer.bindPopup(popupContent).openPopup();
                      }
                  }, 1600)

                /////////////////////////////
              layer.on('click', function(e) {
                isLocalStorage = true
                // selectedFeature = e.target;
                //selectedFeature.setStyle({color: 'red'})
                // console.log(selectedFeature)
                // console.log(selectedFeature.feature)

                // if(selectedFeature.feature.geometry.type == 'Polygon'){
                //
                // }
                  if(aFeatureIsSelected == true ){
                    //console.(selectedFeature)

                    if(selectedFeature.feature.geometry.type == 'Polygon'){
                      selectedFeature.setStyle({weight: 0})
                    }else{
                      //console.(selectedFeature)
                      selectedFeature.setStyle({fillColor: 'black'})
                    }
                    document.getElementById("backDeleteFeature").click() //!!!!!!!!

                    if(editButtonClicked == true){
                      // selectedFeature.setStyle({weight: 0})

                      clearInterval(refreshPopupComment)
                      document.getElementById('backEditDelete').click()

                    }


                    //console.('aFeatureIsSelected true')
                  }else{ // this if/else is to ensure that two features can not be selected at the same time
                  //console.('aFeatureIsSelected false')

                  document.getElementById("filterWithIcons").style.display = "none";
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
                    //console.('approaching?')
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
                         //console.(selectedFeature.feature)
                         if((selectedFeature.feature.properties.OP == 'open' || selectedFeature.feature.properties.OP == 'submittedOpen' || selectedFeature.feature.properties.OP == 'offlineOpen') && isOnline == true){
                           document.getElementById("deleteFeatureOpenDB").style.display = "initial";
                         }


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
                         filterLocalStorage_Button.button.style.opacity = '0.4';
                         filterLocalStorage_Button.button.disabled = true;

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
                         selectedFeature.setStyle({weight: 3})
                       }
                         //condition below is at is is to avoid deflated symbol to show as selected after polygon/line have been selected
                         if (selectedFeature.feature.geometry.type == 'Point') {
                           if(map.getZoom() < 17) {
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
                            //console.(aFeatureIsSelected)

                              document.getElementById("backDeleteFeature").style.display = "initial";
                              document.getElementById("deleteFeatureLocalStorage").style.display = "initial";
                              if((selectedFeature.feature.properties.OP == 'open' || selectedFeature.feature.properties.OP == 'submittedOpen' || selectedFeature.feature.properties.OP == 'offlineOpen') && isOnline == true){
                                document.getElementById("deleteFeatureOpenDB").style.display = "initial";
                              }

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
                              filterLocalStorage_Button.button.style.opacity = '0.4';
                              filterLocalStorage_Button.button.disabled = true;


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
                                if(selectedFeature.feature.geometry.type == 'Polygon'){
                                  selectedFeature.setStyle({weight: 0})
                                }else{
                                  //console.(selectedFeature)
                                  selectedFeature.setStyle({fillColor: 'black'})
                                }
                                localStorageLayer.editing.disable();


                              } catch (e) {}

                              clickCountDeleteButton = 0
                              map.closePopup();
                              if(selectedFeature && selectedFeature != null){ //second condition to avoid click when backDeletefeature... not best solution but works
                              document.getElementById("backDeleteFeature").click() // !!!!!!!!
                                  if(whichLayerIsOn == 'localStorage'){
                                    filterLocalStorage_Button.addTo(map);
                                    // filterLocalStorage_Button.button.style.opacity = '1';
                                    // filterLocalStorage_Button.button.disabled = false;
                                    filter_Button.removeFrom(map)
                                  }


                              }

                          })
                          map.on('moveend', function(e) {
                            if(editButtonClicked == false){  // this condition is to prevent this when commenting the cartolayer, like with creating the geometry with drawnitems
                              try {
                                if(selectedFeature.feature.geometry.type == 'Polygon'){
                                  selectedFeature.setStyle({weight: 0})
                                }else{
                                  //console.(selectedFeature)
                                  selectedFeature.setStyle({fillColor: 'black'})
                                }
                                localStorageLayer.editing.disable();

                              } catch (e) {}

                              clickCountDeleteButton = 0
                              map.closePopup();

                              if(selectedFeature && selectedFeature != null){ //second condition to avoid click when backDeletefeature... not best solution but works
                                document.getElementById("backDeleteFeature").click() //!!!!!!!!
                                if(whichLayerIsOn == 'localStorage'){

                                    filterLocalStorage_Button.addTo(map);
                                    // filterLocalStorage_Button.button.style.opacity = '1';
                                    // filterLocalStorage_Button.button.disabled = false;
                                    filter_Button.removeFrom(map)
                                }
                              }
                            }
                          })
                          map.on('click', function(e) {
                            // cartoGeometries.color = 'red'
                            if(editButtonClicked == false){  // this condition is to prevent this when commenting the cartolayer, like with creating the geometry with drawnitems
                              try {
                                if(selectedFeature.feature.geometry.type == 'Polygon'){
                                  selectedFeature.setStyle({weight: 0})
                                }else{
                                  //console.(selectedFeature)
                                  selectedFeature.setStyle({fillColor: 'black'})
                                }
                                localStorageLayer.editing.disable();

                              } catch (e) {}

                              clickCountDeleteButton = 0
                              map.closePopup();

                              if(selectedFeature && selectedFeature != null){ //second condition to avoid click when backDeletefeature... not best solution but works
                                document.getElementById("backDeleteFeature").click() //!!!!!!!!
                                    if(whichLayerIsOn == 'localStorage'){

                                    filterLocalStorage_Button.addTo(map);
                                    // filterLocalStorage_Button.button.style.opacity = '1';
                                    // filterLocalStorage_Button.button.disabled = false;
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
  //console.(selectedFeature)
  //to find the item in the local storage we use randomID, as is the same as keyvalue
  var getRandomID = selectedFeature.feature.properties.randomID
  //console.(getRandomID)
selectedFeature.removeFrom(deflatedLocalStorage)
selectedFeature.removeFrom(localStorageLayer)

geoJSONLocalforageDB.removeItem(getRandomID)
  document.getElementById('deleteFeatureLocalStorage').style.display = 'none'
  document.getElementById("deleteFeatureOpenDB").style.display = "none";

  document.getElementById("backDeleteFeature").click()
  document.getElementById('backDeleteFeature').style.display = 'none'
  filterLocalStorage_Button.addTo(map);
  filter_Button.removeFrom(map)

}
