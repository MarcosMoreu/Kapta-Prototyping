//////////////////////////     LEAFLET DRAW    ///////////////////////////////////////////////
var finalAreaHa2Decimals
var finalAreaAcres2Decimals
var finalLength2Decimals

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

// var emojiRequest = function(){
//   $("#emojionearea").emojioneArea({
//       pickerPosition: "top",
//       filtersPosition: "bottom",
//       tones: false,
//       autocomplete: false,
//       inline: false, //text box resizes with text input
//       hidePickerOnBlur: false,
//       search: false,
//       placeholder: "..."
//   });
// }

var editableLayers = new L.FeatureGroup();
var options = {
    position: 'topright',
    draw: {
        polyline: {
            shapeOptions: {
                color: 'black',
                weight: 2
            }
        },
        polygon: {
            // showArea:true,
            allowIntersection: false, // Restricts shapes to simple polygons
            // icon: new MyCustomMarker() ,
            icon: new L.DivIcon({
                iconSize: new L.Point(10, 10),
                className: 'leaflet-div-icon',
                weight: 5
            }),
            drawError: {
                color: 'red', // Color the shape will turn when intersects
            },
            shapeOptions: {
                color: '#00ff00',
                weight: 1
            },
        },
        marker: {
            icon: markerIconLocalStorage,
            draggable:false
        },
    },
    edit: {
        featureGroup: editableLayers, // REQUIRED
        remove: false,
        edit: {
            selectedPathOptions: {
                dashArray: '5, 30',
                fill: true,
                fillColor: '#fe57a1',
                fillOpacity: 0.5,
                // Whether to user the existing layers color
                maintainColor: true
            }
        },
        poly: {
            icon: new L.DivIcon({
                iconSize: new L.Point(12, 12),
                className: 'leaflet-div-icon leaflet-editing-icon my-custom-icon'
            })
        }
    }
};

var drawControl = new L.Control.Draw(options);
map.on(L.Draw.Event.CREATED, function(e) {
    var type = e.layerType,
        layer = e.layer;
    drawnItems.addLayer(layer);
});

//Script to allow drag while drawing/editing without adding any point.
(function() {
    var originalOnTouch = L.Draw.Polyline.prototype._onTouch;
    L.Draw.Polyline.prototype._onTouch = function(e) {
        if (e.originalEvent.pointerType != 'mouse' && e.originalEvent.pointerType != 'touch') {
            return originalOnTouch.call(this, e);
        }
    }
})();

var drawPolygon = new L.Draw.Polygon(map, drawControl.options.draw.polygon);
var drawPolyline = new L.Draw.Polyline(map, drawControl.options.draw.polyline);
var drawMarker = new L.Draw.Marker(map, drawControl.options.draw.marker);


//variable to determine whether a polygon has been completed.
var clickMapCount = 0;
var clickDelVertCount = 0;
document.getElementById("goBack2").onclick = function(e) {
  // googleSatOnly.removeFrom(map)
  // googleSat.addTo(map)
  finalAreaHa2Decimals = null
  finalAreaAcres2Decimals = null
  finalLength2Decimals = null
  document.getElementById("Alert").style.display = 'none'

      gps_Button.button.style.opacity = '1';
      gps_Button.button.disabled = false;
    //to enable doubleclick zoom that is disabled while drawing
    map.doubleClickZoom.enable();
    //to add filter button if carto layer on
    // if(myLayer_Button.button.style.backgroundColor == 'black'){
      filter_Button.button.style.opacity = '1';
      filter_Button.button.disabled = false;
      // filterLocalStorage_Button.button.style.opacity = '1';
      // filterLocalStorage_Button.button.disabled = false;
    // }

    clickMapCount = 0;
    map.zoomOut(1); //decreases the zoom level when click
    setTimeout(function() {
        document.getElementById("tutorial").style.display = "initial";
        document.getElementById("goBack2").style.display = "none";
        // document.getElementById("polygon").style.display = "initial";
        // document.getElementById("polyline").style.display = "initial";
        // document.getElementById("point").style.display = "initial";
        document.getElementById("armchair").style.display = "initial";
        document.getElementById("field").style.display = "initial";
        // document.getElementById("gobackArmchairField").style.display = "initial";


        document.getElementById("deleteLastVertex").style.display = "none";
        document.getElementById("deleteAllVertexs").style.display = "none";
        document.getElementById("deleteLastVertex").style.opacity = "0.35";
        document.getElementById("deleteLastVertex").disabled = true;
        document.getElementById("deleteAllVertexs").style.opacity = "0.35";
        document.getElementById("deleteAllVertexs").disabled = true;

        document.getElementById("deleteLastVertexLine").style.display = "none";
        document.getElementById("deleteAllVertexsLine").style.display = "none";
        document.getElementById("deleteLastVertexLine").style.opacity = "0.35";
        document.getElementById("deleteLastVertexLine").disabled = true;
        document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
        document.getElementById("deleteAllVertexsLine").disabled = true;

        document.getElementById('completeFeature').style.display = 'none';
        document.getElementById("completeFeature").style.opacity = "0.35";
        document.getElementById("completeFeature").disabled = true;
    }, 200)

    drawPolygon.disable();
    drawPolyline.disable();
    drawMarker.disable();
    drawnItems.remove();
    drawnItems.clearLayers();
    return featureType
}

var boxContent;
var drawingPoint = false
document.getElementById('point').onclick = function(e) {
  finalAreaHa2Decimals = null
  finalAreaAcres2Decimals = null
  finalLength2Decimals = null

    filter_Button.button.style.opacity = '0.4';
    filter_Button.button.disabled = true;
    gps_Button.button.style.opacity = '0.4';
    gps_Button.button.disabled = true;

    // emojiRequest()

    if (isIOS == false) {
        recordedBlobs = null; //to empty recorded blobs from previous map in this session
    }

    featureType = 'point';
    map.doubleClickZoom.disable();
    currentZoom = map.getZoom();
    drawMarker.enable();
    setTimeout(function() {
        // document.getElementById('imageryAlert').style.display = 'none'
        document.getElementById("tutorial").style.display = "none";
        document.getElementById("polygon").style.display = "none";
        document.getElementById("polyline").style.display = "none";
        document.getElementById("point").style.display = "none";
        document.getElementById("armchair").style.display = "none";
        document.getElementById("field").style.display = "none";
        document.getElementById("gobackArmchairField").style.display = "none";

        if(field == false){
          document.getElementById("goBack2").style.display = "initial";
        }

    }, 200);

    drawingPoint = true;
    return drawingPoint && featureType
};

document.getElementById('polyline').onclick = function(e) {

  document.getElementById("deleteLastVertexLine").style.opacity = "0.35";
  document.getElementById("deleteLastVertexLine").disabled = true;
  document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
  document.getElementById("deleteAllVertexsLine").disabled = true;

  document.getElementById('completeFeature').style.display = 'none';
  document.getElementById("completeFeature").style.opacity = "0.35";
  document.getElementById("completeFeature").disabled = true;

  finalAreaHa2Decimals = null
  finalAreaAcres2Decimals = null
  finalLength2Decimals = null

    filter_Button.button.style.opacity = '0.4';
    filter_Button.button.disabled = true;
    gps_Button.button.style.opacity = '0.4';
    gps_Button.button.disabled = true;

    // emojiRequest()

    if (isIOS == false) {
        recordedBlobs = null; //to empty recorded blobs from previous map in this session
    }
    featureType = 'polyline';
    map.doubleClickZoom.disable();

    map.on('draw:drawvertex',
        function(e) {
            $(".leaflet-div-icon")
                // $(".leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-touch-icon.leaflet-zoom-animated.leaflet-interactive:first")
                .css({
                    'background-color': 'white',
                    'border-radius': '10px',
                    'height': '10px',
                    'width': '10px'
                });
        });
    map.on('draw:drawvertex',
        function(e) {
            $(".leaflet-div-icon.leaflet-interactive:last")
                // $(".leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-touch-icon.leaflet-zoom-animated.leaflet-interactive:first")
                .css({
                    'background-color': '#F905EA',
                    'border-radius': '25px',
                    'height': '15px',
                    'width': '15px'
                });
        });

    currentZoom = map.getZoom();

    clickMapCount = 0;
    drawPolyline.enable();

    setTimeout(function() {
        // document.getElementById('imageryAlert').style.display = 'none';
        document.getElementById("tutorial").style.display = "none";
        document.getElementById("polygon").style.display = "none";
        document.getElementById("polyline").style.display = "none";
        document.getElementById("point").style.display = "none";
        document.getElementById("armchair").style.display = "none";
        document.getElementById("field").style.display = "none";
        document.getElementById("gobackArmchairField").style.display = "none";

        document.getElementById("goBack2").style.display = "initial";
        document.getElementById("deleteLastVertexLine").style.display = "initial";
        document.getElementById("deleteAllVertexsLine").style.display = "initial";
        document.getElementById('completeFeature').style.display = 'initial';
    }, 200)
    return featureType;
};

document.getElementById('polygon').onclick = function(e) {
  document.getElementById("deleteLastVertex").style.opacity = "0.35";
  document.getElementById("deleteLastVertex").disabled = true;
  document.getElementById("deleteAllVertexs").style.opacity = "0.35";
  document.getElementById("deleteAllVertexs").disabled = true;
  document.getElementById('completeFeature').style.display = 'none';
  document.getElementById("completeFeature").style.opacity = "0.35";
  document.getElementById("completeFeature").disabled = true;

  finalAreaHa2Decimals = null
  finalAreaAcres2Decimals = null
  finalLength2Decimals = null

      filter_Button.button.style.opacity = '0.4';
      filter_Button.button.disabled = true;
      gps_Button.button.style.opacity = '0.4';
      gps_Button.button.disabled = true;

      // emojiRequest()

    if (isIOS == false) {
        recordedBlobs = null; //to empty recorded blobs from previous map in this session
    }
    featureType = 'polygon'
    map.doubleClickZoom.disable();

    map.on('draw:drawvertex',
        function(e) {
            $(".leaflet-div-icon")
                // $(".leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-touch-icon.leaflet-zoom-animated.leaflet-interactive:first")
                .css({
                    'background-color': '#DAFDC4',
                    'border-radius': '10px',
                    'height': '10px',
                    'width': '10px'
                });
        });

    map.on('draw:drawvertex',
        function(e) {
            $(".leaflet-div-icon.leaflet-interactive:first")
                // $(".leaflet-marker-icon.leaflet-div-icon.leaflet-editing-icon.leaflet-touch-icon.leaflet-zoom-animated.leaflet-interactive:first")
                .css({
                    'background-color': '#F905EA',
                    'border-radius': '25px',
                    'height': '15px',
                    'width': '15px'
                });
        });

    currentZoom = map.getZoom();
    clickMapCount = 0;
    drawPolygon.enable();

    setTimeout(function() {
        // document.getElementById('imageryAlert').style.display = 'none'

        document.getElementById("tutorial").style.display = "none";
        document.getElementById("polygon").style.display = "none";
        document.getElementById("polyline").style.display = "none";
        document.getElementById("point").style.display = "none";
        document.getElementById("armchair").style.display = "none";
        document.getElementById("field").style.display = "none";
        document.getElementById("gobackArmchairField").style.display = "none";


        document.getElementById("goBack2").style.display = "initial";
        document.getElementById("deleteLastVertex").style.display = "initial";
        document.getElementById("deleteAllVertexs").style.display = "initial";
        document.getElementById('completeFeature').style.display = 'initial';
    }, 200);
    return featureType;
};
    document.getElementById('map').onclick = function(e) {
      try{ //to catch the error when gobackred is clicked

        if (created == false) { // to avoid the script to seach for _markers.length when the feature still has not been created

            if (featureType == 'polyline' && drawPolyline._markers.length > 0) { //add condition to allow user complete shape if vertext >=2. var from DRAW plugin
                //console.log(drawPolyline._markers.length)
                document.getElementById("deleteLastVertexLine").style.opacity = "1";
                document.getElementById("deleteLastVertexLine").disabled = false;
            }
            if (featureType == 'polyline' && drawPolyline._markers.length > 1) {
                document.getElementById("deleteAllVertexsLine").style.opacity = "1";
                document.getElementById("deleteAllVertexsLine").disabled = false;
                document.getElementById("completeFeature").style.opacity = "1";
                document.getElementById("completeFeature").disabled = false;
            }
            if (featureType == 'polygon' && drawPolygon._markers.length > 0) { // polygon vertex >=3
                document.getElementById("deleteLastVertex").style.opacity = "1";
                document.getElementById("deleteLastVertex").disabled = false;
            }
            if (featureType == 'polygon' && drawPolygon._markers.length > 1) {
                document.getElementById("deleteAllVertexs").style.opacity = "1";
                document.getElementById("deleteAllVertexs").disabled = false;
            }
            if (featureType == 'polygon' && drawPolygon._markers.length > 2) {
                document.getElementById("completeFeature").style.opacity = "1";
                document.getElementById("completeFeature").disabled = false;
            }
        }
      }catch(err){}
    }

///////////////////////////       delete vertexs      //////////////////////////////////

document.getElementById('deleteLastVertex').onclick = function(e) {
    //console.log('number of vertex polygon ' + drawPolygon._markers.length)
    if (drawPolygon._markers.length == 1) {
        document.getElementById("deleteAllVertexs").disabled = false;
        document.getElementById('deleteAllVertexs').click()

    } else if (drawPolygon._markers.length > 1) {
        drawPolygon.deleteLastVertex();
    }
    if (drawPolygon._markers.length < 3) {
        document.getElementById("completeFeature").style.opacity = "0.35";
        document.getElementById("completeFeature").disabled = true;
    }
    if (drawPolygon._markers.length < 2) {
        document.getElementById("deleteAllVertexs").style.opacity = "0.35";
        document.getElementById("deleteAllVertexs").disabled = true;
    }
}

document.getElementById('deleteAllVertexs').onclick = function(e) {
    clickMapCount = 0;
    drawPolygon.disable();
    drawPolygon.enable();

    setTimeout(function() {
        document.getElementById("deleteLastVertex").style.opacity = "0.35";
        document.getElementById("deleteLastVertex").disabled = true;
        document.getElementById("deleteAllVertexs").style.opacity = "0.35";
        document.getElementById("deleteAllVertexs").disabled = true;
        document.getElementById("completeFeature").style.opacity = "0.35";
        document.getElementById("completeFeature").disabled = true;
    }, 200)
}

/////////////line////////////////////////
document.getElementById('deleteLastVertexLine').onclick = function(e) {
    //console.log('number of vertex polygon ' + drawPolyline._markers.length)
    if (drawPolyline._markers.length == 1) {
        document.getElementById("deleteAllVertexsLine").disabled = false;
        document.getElementById('deleteAllVertexsLine').click()

    } else if (drawPolyline._markers.length > 1) {
        drawPolyline.deleteLastVertex();
    }
    if (drawPolyline._markers.length == 1) {
        document.getElementById("completeFeature").style.opacity = "0.35";
        document.getElementById("completeFeature").disabled = true;
        document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
        document.getElementById("deleteAllVertexsLine").disabled = true;
    }
}

document.getElementById('deleteAllVertexsLine').onclick = function(e) {
    drawPolyline.disable();
    drawPolyline.enable();

    setTimeout(function() {
        document.getElementById("deleteLastVertexLine").style.opacity = "0.35";
        document.getElementById("deleteLastVertexLine").disabled = true;
        document.getElementById("deleteAllVertexsLine").style.opacity = "0.35";
        document.getElementById("deleteAllVertexsLine").disabled = true;
        document.getElementById("completeFeature").style.opacity = "0.35";
        document.getElementById("completeFeature").disabled = true;
    }, 200)
}

//to complete polygon when click on green thumbs up
document.getElementById('completeFeature').onclick = function(e) {
    if (featureType == 'polyline') {
        drawPolyline.completeShape();

    } else if (featureType == 'polygon') {
        drawPolygon.completeShape();
    }
}

// document.getElementById('completeFeature').onclick = function(e) {
//     if (featureType == 'polyline' && drawPolyline._markers.length < 60) {
//         drawPolyline.completeShape();
//
//     }else if(featureType == 'polyline' && drawPolyline._markers.length > 60){
//       document.getElementById('Alert').innerHTML = 'Too many vertexes'
//       document.getElementById("Alert").style.display = 'initial'
//       setTimeout(function(){
//         document.getElementById("Alert").style.display = 'none'
//       },3000)
//
//     }else if(featureType == 'polygon' && numofvertexpolygon < 60 && finalArea < 1) { //1sqkm
//     drawPolygon.completeShape()
//
//     }else if(featureType == 'polygon' && numofvertexpolygon > 6 && finalArea <1){
//       document.getElementById('Alert').innerHTML = 'Too big'
//       document.getElementById("Alert").style.display = 'initial'
//       setTimeout(function(){
//         document.getElementById("Alert").style.display = 'none'
//       },3000)
//      }else if(featureType == 'polygon' && numofvertexpolygon < 6 && finalArea >1){
//         document.getElementById('Alert').innerHTML = 'Too many vertexes'
//         document.getElementById("Alert").style.display = 'initial'
//         setTimeout(function(){
//           document.getElementById("Alert").style.display = 'none'
//         },3000)
//       }
//
// }

var tempLayer;
var data;


////////////////////////////////////////  map events    /////////////////////////////////////////////////////////////////////////////
map.on('draw:deleted', function(e) {
    self.drawControlEdit.remove();
    self.drawControlFull.addTo(map);
});

var typeOfFeature;
map.on('draw:created', function(e) {
  field = false

  // googleSat.removeFrom(map)
  // googleSatOnly.addTo(map)
  // googleSat.addTo(map)

  //console.log(drawnItems)
document.getElementById('emojionearea').value = null
  document.getElementById('myRange').style.display = 'none'
  document.getElementById('Alert').style.opacity = '0'

    myLayer_Button.button.style.opacity = '0.4';
    myLayer_Button.button.disabled = true;
    try {
      deflated.removeFrom(map)
      localStorageLayer.removeFrom(map)
      drawnItems.removeFrom(map); //remove the drawn item as yellow polygon appears
    }catch(err){}

    //8888888 this is fetched onload instead, to avoid loading time
    created = true;
    drawPolygon.disable();
    filterLocalStorage_Button.removeFrom(map);
    // filter_Button.addTo(map)
    filter_Button.button.style.opacity = '0.4';
    filter_Button.button.disabled = true;
    filterLocalStorage_Button.button.style.opacity = '0.4';
    filterLocalStorage_Button.button.disabled = true;

    planet_Button.button.style.opacity = '0.4';
    planet_Button.button.disabled = true;
    googleSat_Button.button.style.opacity = '0.4';
    googleSat_Button.button.disabled = true;
    osm_Button.button.style.opacity = '0.4';
    osm_Button.button.disabled = true;
    document.getElementById("deleteAllVertexs").style.display = "none";
    document.getElementById("deleteLastVertex").style.display = "none";
    document.getElementById("goBack2").style.display = "none";

    document.getElementById("deleteLastVertexLine").style.display = "none";
    document.getElementById("deleteAllVertexsLine").style.display = "none";
    document.getElementById("completeFeature").style.display = "none";

    // document.getElementById("share-download").style.display = "initial";
    // document.getElementById("share-download").style.opacity = "0.35"; //to disable button until user adds attributes, either with audio or text
    document.getElementById("share-download").disabled = true;
    document.getElementById("Cancel").style.display = "initial";
    document.getElementById("classification").style.display = "initial";
    document.getElementById("emoji").style.display = "initial";
    document.getElementById("emoji").disabled = false;
    document.getElementById("emoji").style.opacity = '1';
    document.getElementById('Sent').currentTime = 0;
    document.getElementById("sapelliProjects").style.display = "initial";

    // document.getElementById('voice').style.display = 'none';
    // document.getElementById('voice').style.opacity = '0';
    // if (isIOS == false) {
    //     document.getElementById('enableRecording').style.display = 'initial';
    // } else {
    //     document.getElementById('noAudioIOS').style.display = 'initial';
    // }
    document.getElementById('emoji').style.display = 'initial';
    data = drawnItems.toGeoJSON();

    //console.log(finalArea) // area obtained from DRAW plugin, always in sq m
    //console.log(finalLength)
    var type = e.layerType
    //console.log(type)

    ////////////////    area   //////////////
    if (type == 'polygon') {
        typeOfFeature = 'polygon'
        // convert sq m to
        var finalAreaHa = finalArea * 0.0001
        var finalAreaAcres = finalArea * 0.000247105
        //to remove decimals ....
        finalAreaHa2Decimals = finalAreaHa.toFixed(2) + ' ' + 'ha'
        finalAreaAcres2Decimals = finalAreaAcres.toFixed(2) + ' ' + 'acres'
        //to show the final area on the top
        // document.getElementById('showAreaHa').style.display = 'initial';
        // document.getElementById("showAreaHa").innerHTML = finalAreaHa2Decimals;
        document.getElementById('showAreaAcres').style.display = 'initial';
        document.getElementById("showAreaAcres").innerHTML = finalAreaAcres2Decimals;
    }else if (type == 'polyline') {
        typeOfFeature = 'polyline'
        //to remove decimals ....
        finalLength2Decimals = (finalLength/1000).toFixed(2) + ' ' + 'Km'
        //console.(finalLength2Decimals,'length')

        document.getElementById('showAreaAcres').style.display = 'initial';
        document.getElementById("showAreaAcres").innerHTML = finalLength2Decimals;
        //to show the final length on the top
        // document.getElementById('showLength').style.display = 'initial';
        //document.getElementById("showLength").innerHTML = finalLength2Decimals;
    }else{
      typeOfFeature = 'point'
  document.getElementById("showAreaAcres").innerHTML = ''
        //to show the final length on the top
        // document.getElementById('showLength').style.display = 'initial';
        //document.getElementById("showLength").innerHTML = finalLength2Decimals;
    }
    //////////////////////////////////////////

    // function onEachFeatureBlank(feature, layer) {
    //     // var popupContent = '...'; //+ '    ' +dateTimeRandomID
    //
    //     // startCheckingText()
    //     // layer.bindPopup(popupContent).addTo(map);
    //     // layer.bindPopup(popupContent).openPopup(); ///automatically shows the pop up!
    // }

    tempLayer = L.geoJSON(data, {
        pointToLayer: function(feature, latlng) { //to change the icon of the marker (i.e. avoid default)
            return L.marker(latlng, {
                icon: markerIconLocalStorage,
                draggable:false
            });
        },
        style: function(feature) {

            return feature.properties && feature.properties.style;
        },
        color: '#ffff00',
        icon: markerIconLocalStorage,
        // onEachFeature: onEachFeatureBlank,

    }).addTo(map);
    //to locate the feature at the center of the map. This must go right after creating the geojson file tempLayer
    var boundsPolygon = drawnItems.getBounds()
    var centerBoundsPolygon = boundsPolygon.getCenter()
    var mapNewBounds = map.getBounds();

    // if (featureType == 'point') {
    //     //console.log('featuretype    ' + featureType)
    //     if(isOnline == true){
    //       setTimeout(function() {
    //         // if(isOnline == true){
    //         map.setZoom(16)
    //         // }else{
    //       }, 100)
    //     }else{
    //       map.setZoom(16)
    //     }
    //
    // }
    if (featureType == 'point') {
        //console.log('featuretype    ' + featureType)
        map.fitBounds(drawnItems.getBounds(), {
            maxZoom:16,
            paddingBottomRight: [0, 0]
        })

    }else{
      map.fitBounds(drawnItems.getBounds(), {
          maxZoom:18,
          paddingBottomRight: [0, 0]
      })
    }

    //console.log(typeOfFeature)
    //console.log(created)

    document.getElementsByClassName('emojionearea').value = null // to empty text box
    // document.getElementsByClassName('emojionearea-wrapper').innerHTML = null // to empty text box
    //console.log(document.getElementsByClassName('emojionearea').value)

    startCheckingText() // to call the function to start checking the input text
    //console.log(data)

    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    // googleSatOnly.addTo(map)
    if (map.tap) map.tap.disable();
    document.getElementById('map').style.cursor='default';

// setTimeout(function(){// this is to capture the canvas in order to avoid the error later with the tiles. not the best solution but it works
//   html2canvas(document.getElementById("map"), {
//     allowTaint: true,
//     useCORS: true,
//     imageTimeout:20000,
//     removeContainer:true,
//   })
// },500)

    return created && data && typeOfFeature && field;

});


var boxContent;
var justCancelled = false
document.getElementById('Cancel').onclick = function(e) {
  // projectsCreated = true
  // googleSatOnly.removeFrom(map)
  // googleSat.addTo(map)
  const celltohide = document.querySelectorAll('.gridCell')
  for (const el of celltohide) {
    el.parentNode.removeChild(el);
  }
  localStorage.setItem('sapelliProjectAccessed', false);

  // try{
  //   hideAll()
  // }catch(e){}

  document.getElementById("Alert").style.display = 'none'
  document.getElementById('Alert').style.opacity = '1'


    document.getElementById('emojionearea').value = null
    myLayer_Button.button.style.opacity = '1';
    myLayer_Button.button.disabled = false;
    // myLayer_Button.button.style.backgroundColor = 'grey';

    gps_Button.button.style.opacity = '1';
    gps_Button.button.disabled = false;

    featureType = 'initial';
    alreadyMovedUp = false;
    audioRecorded = false;
    audioButtonClicked = false;
    typeOfFeature = null; //to refresh the var

    clearInterval(refreshPopup)
    map.doubleClickZoom.enable();

    created = false;
    drawnItems.remove();
    drawnItems.clearLayers();

    map.zoomOut(1);
    drawingPoint = false;
    // if (isIOS == false) {
    //     recordedVideo.pause();
    //     recordedBlobs = null; // audio is removed if cancel is clicked
    // }
    setTimeout(function() {

        document.getElementById("tutorial").style.display = "initial";
        document.getElementById("armchair").style.display = "initial";
        document.getElementById("field").style.display = "initial";
        // document.getElementById("gobackArmchairField").style.display = "initial";
        // document.getElementById("polygon").style.display = "initial";
        // document.getElementById("polyline").style.display = "initial";
        // document.getElementById("point").style.display = "initial";
        document.getElementById("Cancel").style.display = "none";

        // document.getElementById("Download").style.display = "none";
        document.getElementById("ShareFinalButton").style.display = "none";

        // document.getElementById('record').style.display = 'none';
        document.getElementById("sapelliProjects").style.display = "none";

        // document.getElementById('enableRecording').style.display = 'none';
        // document.getElementById('noAudioIOS').style.display = 'none';

        // document.getElementById('activatePlay').style.display = 'none';
        // document.getElementById('voice').style.display = 'none';

        document.getElementById('emoji').style.display = 'none';

        document.getElementById('showAreaHa').style.display = 'none';
        document.getElementById('showAreaAcres').style.display = 'none';
        // document.getElementById('showLength').style.display = 'none';
        document.getElementById('share-download').style.display = 'none';
    }, 200)

    tempLayer.clearLayers()


  //to load the layer that was there before creating the geometry (2 clicks if localstorage empty, 3 if not). Not best approach but works...:)
    // if(myLayer_Button.button.style.backgroundColor == 'black'){
      filter_Button.button.style.opacity = '1';
      filter_Button.button.disabled = false;
      // filterLocalStorage_Button.button.style.opacity = '1';
      // filterLocalStorage_Button.button.disabled = false;

      planet_Button.button.style.opacity = '1';
      planet_Button.button.disabled = false;
      googleSat_Button.button.style.opacity = '1';
      googleSat_Button.button.disabled = false;
      osm_Button.button.style.opacity = '1';
      osm_Button.button.disabled = false;
      justCancelled = true

    //   if(localStorageLayer != null){  // because first time app is used mylayer_button has only two positions (local storage is empty)
    //     document.getElementById('myLayerButton').click()
    //   }
    // // }
    // // if(myLayer_Button.button.style.backgroundColor == 'white'){
    //   document.getElementById('myLayerButton').click()
    //   document.getElementById('myLayerButton').click()
    //   if(localStorageLayer != null){  // because first time app is used mylayer_button has only two positions (local storage is empty)
    //     document.getElementById('myLayerButton').click()
    //   }
    // // }
    // // if(myLayer_Button.button.style.backgroundColor == 'grey'){
    //   document.getElementById('myLayerButton').click()
    //   document.getElementById('myLayerButton').click()
    //   if(localStorageLayer != null){  // because first time app is used mylayer_button has only two positions (local storage is empty)
    //     document.getElementById('myLayerButton').click()
    //   }
    // }

      field = false
      finalLength = 0 //to set to cero the length distance

      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
      // googleSatOnly.removeFrom(map)

      if (map.tap) map.tap.enable();
      document.getElementById('map').style.cursor='grab';

  return created & featureType && field && finalLength && justCancelle && projectsCreated

}
