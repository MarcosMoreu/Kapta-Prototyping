



//////////////////////////// actions for bottom-of-screen filtering buttons
var boxContentFiltering
var boxContentFilteringEncoded
var filterApplied = false
var period = 3650 // by default, all features
var datePeriodAgoReplaceComaInvert = '2010-1-1'
var numberOfKeys
var cellFilter
//script for apply filters
document.getElementById("applyFilter").onclick = function(e) {

  if(whichLayerIsOn == 'deflated'){  // to differentiate between filtering carto or localstorage
    filter_Button.button.style.borderColor = 'yellow'

    boxContent = document.getElementById('emojionearea').value;
    var boxContentToShortname = emojione.toShort(boxContent)
    console.log(boxContentToShortname)
    document.getElementById("applyFilter").style.display = "none";
    document.getElementById("clearFilter").style.display = "initial";
    document.getElementById("clearFilter").style.opacity = '1'
    document.getElementById("clearFilter").disabled = false

    // boxContentFiltering = document.getElementsByClassName('emojionearea-editor')[0].innerHTML  // use this instead of .value!!!
    boxContentFiltering = document.getElementById('emojionearea').value; // we use value instead because innerhtml takes emojis as images, which is a problem for the sql query
    boxContentFilteringEncoded = emojione.toShort(boxContentFiltering)
    console.log('box',boxContentFilteringEncoded)

      if(boxContentFilteringEncoded ==='' && period == 3650){
        filterApplied = false
        // console.log('do nothing')
      }

      else if(boxContentFilteringEncoded ==='' && period != 3650){
        filterApplied = true
        // console.log('do only date')

            try {
              deflated.clearLayers() // clearLayers instead of cartoGeometries, as this doesn't contain all geometries after 'sent'
              //cartoGeometries.removeFrom(deflated)
            } catch (err) {
              // console.log('error sql catched due to empty layer after filter applied')
            }
           var sqlQueryWithoutCondition = "SELECT cartodb_id, the_geom, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date FROM lumblu WHERE date>'";
           var sqlCondition = datePeriodAgoReplaceComaInvert +"'";
           sqlQuery = sqlQueryWithoutCondition + sqlCondition
           getGeoJSON()

           var loadInfoDateFilter = period + ' ☀️🌙 </br> ...'
           document.getElementById("Alert").style.fontSize = "20px";
           document.getElementById("Alert").innerHTML = loadInfoDateFilter
           document.getElementById("Alert").style.display = 'initial'

      }else{
        filterApplied = true
        // console.log('do both')

            try {
              deflated.clearLayers() // clearLayers instead of cartoGeometries, as this doesn't contain all geometries after 'sent'
              //cartoGeometries.removeFrom(deflated)
            } catch (err) {
              // console.log('error sql catched due to empty layer after filter applied')
            }



           var sqlQueryWithoutCondition = "SELECT cartodb_id, the_geom, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date FROM lumblu WHERE landuses ";
           var sqlCondition =
            "ILIKE '" + boxContentFilteringEncoded +"'" //exact value

            + " OR landuses ILIKE N'%" + boxContentFilteringEncoded +"%'" //xxxxxxxx%%%%%%%%%%%

            +" AND (date>'"+datePeriodAgoReplaceComaInvert +"')";
           var sqlQueryEncoded = sqlQueryWithoutCondition + sqlCondition
           console.log(sqlQueryEncoded)
           sqlQuery = encodeURIComponent(sqlQueryEncoded)
           console.log(sqlQuery)

           getGeoJSON()
            if(period == 3650){
              var loadInfoDateFilter = boxContentFiltering // not encoded here as we want the emoji displayed in the alert
            }else{
              var loadInfoDateFilter = period + ' ☀️🌙 </br>'+ boxContentFiltering // not encoded here as we want the emoji displayed in the alert
            }
           document.getElementById("Alert").style.fontSize = "20px";
           document.getElementById("Alert").innerHTML = loadInfoDateFilter
           document.getElementById("Alert").style.display = 'initial'
      }

  }else if(whichLayerIsOn == 'localStorage'){
    // The same code, but using ES6 Promises.
    filterLocalStorage_Button.button.style.borderColor = 'yellow'

    document.getElementById("applyFilter").style.display = "none";
    document.getElementById("clearFilter").style.display = "initial";
    document.getElementById("clearFilter").style.opacity = '1'
    document.getElementById("clearFilter").disabled = false
    // document.getElementById("clearFilter").style.opacity = '1'
    // document.getElementById("clearFilter").disabled = false
    try{
      deflatedLocalStorage.clearLayers() ////////this must be out of the loop!!!! otherwise it empties the layer everytime!!!!!
      groupGeoJSON.length = 0 // to empty array in case filter is already applied previously

    }catch(err){
      console.log(err)
    }
    geoJSONLocalforageDB.iterate(function(value, key, iterationNumber) {
        // Resulting key/value pair -- this callback
        // will be executed for every item in the
        // database.

        console.log([key, value]);
        console.log(value)
        var parsedValue = JSON.parse(value)
        console.log(parsedValue.properties.landUsesEmoji)

        boxContent = document.getElementById('emojionearea').value;
        var firstWord = boxContent.split(' ')[0]
        var secondWord = boxContent.split(' ')[1]

        if(parsedValue.properties.landUsesEmoji){ //two types of properties to address download or geojsonurl properties names/acronyms
          //the approach here is to empty the array groupGeoJSON, then add each geometry (that matches the filter) to the array, then call the
          //function localStorageToGeoJSON at the end of the iteration
          if(parsedValue.properties.landUsesEmoji.includes(firstWord) || parsedValue.properties.landUsesEmoji.includes(secondWord)){
            console.log('filtered')

            try{
              console.log(value)
              console.log(iterationNumber)
              isJson(parsedValue)
              groupGeoJSON.length = 0
              groupGeoJSON.push(parsedValue)

            }catch(err){
              console.log(parsedValue, 'error when pushing in iteration')
            }
            // localStorageLayer.addTo(deflatedLocalStorage)
            // deflatedLocalStorage.addTo(map)
            // parsedValue.addTo(localStorageLayer)
            // parsedValue.addTo(deflatedLocalStorage)
          }else{
            console.log('no match')
            // selectedFeature.removeFrom(deflatedLocalStorage)
            // selectedFeature.removeFrom(localStorageLayer)
            // geoJSONLocalforageDB.getItem(key).then(function (value) {

            // }catch(err){
            //   console.log(err)
            // }
          }

      }else if(parsedValue.properties.LU){

      }
    }).then(function() {
      localStorageToGeoJSON() // we call the function only at the end of the iteration, once the groupgeojson array is completed
      filterApplied = true

        console.log('Iteration has completed');
        return filterApplied
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });


    // geoJSONLocalforageDB.length().then(function(numberOfKeys){
    //   console.log(numberOfKeys)
    //   for(i = 0;i < numberOfKeys; i++){
    //       geoJSONLocalforageDB.key(i).then(function(key) {
    //
    //           console.log(key);
    //                 // console.log(value.feature.properties.landUsesEmoji)
    //           // if(value.feature.properties.landUsesEmoji){
    //           //
    //           // }
    //       }).catch(function(err) {
    //           console.log(err);
    //       });
    //     }
    //
    // }).catch(function(err){
    //   console.log(err)
    // })


  }


    // console.log('filter applied ', filterApplied)
    return filterApplied && boxContentFilteringEncoded

}

//script for remove filters
document.getElementById("clearFilter").onclick = function(e) {
  document.getElementById("clearFilter").style.display = "none";
  document.getElementById("applyFilter").style.display = "initial";
  document.getElementById("applyFilter").style.opacity = '0.4'
  document.getElementById("applyFilter").disabled = true
  // document.getElementById("clearFilter").style.opacity = '0.4'
  // document.getElementById("clearFilter").disabled = true
  document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null;
  document.getElementById('emojionearea').value = null
  boxContentFilteringEncoded = null
  // document.getElementById('emojionearea').value = null
  var img =  document.getElementById("imgFilterByDate")
  img.src = 'images/dateAll.png'
  period = 3650

  document.getElementById("Alert").style.display = 'none'

  if(whichLayerIsOn == 'deflated'){
    filter_Button.button.style.backgroundColor = 'black'
    filter_Button.button.style.borderColor = 'transparent'


    if(filterApplied == true){

          try {
            deflated.clearLayers()  // clearLayers instead of cartoGeometries, as this doesn't contain all geometries after 'sent'
          //  cartoGeometries.removeFrom(deflated)
          } catch (err) {
            // console.log('error sql catched due to empty layer after filter applied  ')

          }
          sqlQuery = "SELECT cartodb_id, the_geom, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date FROM lumblu"
          getGeoJSON()
     }


  }else if(whichLayerIsOn == 'localStorage'){
    filterLocalStorage_Button.button.style.backgroundColor = '#00FFFB'
    filterLocalStorage_Button.button.style.borderColor = 'transparent'


    try{
      deflatedLocalStorage.clearLayers() ////////this must be out of the loop!!!! otherwise it empties the layer everytime!!!!!
      groupGeoJSON.length = 0 // to empty array in case filter is already applied previously

    }catch(err){
      console.log(err)
    }
    geoJSONLocalforageDB.iterate(function(value, key, iterationNumber) {

      try{
        var parsedValue = JSON.parse(value)
        isJson(parsedValue)
        // groupGeoJSON.length = 0
        groupGeoJSON.push(parsedValue)
      }catch(err){
        console.log(parsedValue)
      }


      //   if(parsedValue.properties.landUsesEmoji){
      //     // console.log('iteration delete')
      //
      //       isJson(parsedValue)
      //       groupGeoJSON.length = 0
      //       groupGeoJSON.push(parsedValue)
      //
      //
      // }else if(parsedValue.properties.LU){
      //   // console.log('iteration delete')
      //
      //     isJson(parsedValue)
      //     groupGeoJSON.length = 0
      //     groupGeoJSON.push(parsedValue)
      // }
    }).then(function() {
      localStorageToGeoJSON() // we call the function only at the end of the iteration, once the groupgeojson array is completed
      filterApplied = false

        return filterApplied
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });






  }

//  deflated.addTo(map)
  filterApplied = false
  return filterApplied && boxContentFilteringEncoded && period

};

// var dateFilterValue; //to apply this value when applyFilter is clicked
document.getElementById("filterByDate").onclick = function(e) {

//     if(isIOS == true){
//       alert('🚧 Filter by date functionality not available yet for iOS')
//     }else{
//
//       var calcDatePeriodAgo = function(period){
//         var d = new Date();
//         //console.log('Today is: ' + d.toLocaleString());
//         d.setDate(d.getDate() - period);
//         return d.toLocaleString()
//       }
//
//       var img =  document.getElementById("imgFilterByDate")
//           if (img.src.match("dateAll")) { //1 week
//             img.src = 'images/dateDay.png'
//             dateFilterValue = 'Day'
//             period = 1
//             var loadInfoDateFilter = boxContentFilteringEncoded
//             // document.getElementById("Alert").style.fontSize = "18px";
//             // document.getElementById("Alert").innerHTML = ' ☀️🌙'
//             document.getElementById("Alert").style.display = 'none'
//           }
//
//           else if (img.src.match("dateDay")) { //all (infiinite)
//             img.src = 'images/dateWeek.png'
//             dateFilterValue = 'Week'
//             period = 7
//
//           }else if (img.src.match("dateWeek")) { //1 year
//             img.src = 'images/dateMonth.png'
//             dateFilterValue = 'Month'
//             period = 30
//
//           }else if (img.src.match("dateMonth")) { //1 month
//             img.src = 'images/dateYear.png'
//             dateFilterValue = 'Year'
//             period = 365
//
//           }else if (img.src.match("dateYear")) { //1 week
//             img.src = 'images/dateAll.png'
//             dateFilterValue = 'All'
//             period = 3650
//           }
//
//         //console.log('period ' + period);
//         var datePeriodAgo = calcDatePeriodAgo(period)
//         //console.log('datePeriodAgo ' + datePeriodAgo);
//         //var datePeriodAgo = '2020-10-14'
//         var datePeriodAgoReplace = datePeriodAgo.replaceAll("/", "-")
//         //console.log('datePeriodAgoReplace ' + datePeriodAgoReplace);
//         var datePeriodAgoReplaceComa = datePeriodAgoReplace.replace(/,[^,]+$/, "")
//         //console.log('datePeriodAgoReplaceComa ' + datePeriodAgoReplaceComa);
//         datePeriodAgoReplaceComaInvert = datePeriodAgoReplaceComa.split("-").reverse().join("-");
//         // date = date.split("-").reverse().join("-");
//         //console.log('datePeriodAgoReplaceComaInvert ' + datePeriodAgoReplaceComaInvert);
//       }
//   return dateFilterValue & period && filterApplied && datePeriodAgoReplaceComaInvert
// }
//
// document.getElementById("filterWithIcons").onclick = function(e) {
//   cellFilter = document.createElement('div')
//   document.body.appendChild(cell)
//   cellFilter.className = 'gridCellFilter'
//
//   preload([
//
//     'images/omoIcons/banana.png','images/omoIcons/boatCrossing.png','images/omoIcons/cattleGrazing.png','images/omoIcons/church.png','images/omoIcons/eldersHut.png','images/omoIcons/fishing.png',
//     'images/omoIcons/floodRecessionFlat.png','images/omoIcons/floodRecessionSteep.png','images/omoIcons/goatSheepGrazing.png','images/omoIcons/healthStation.png','images/omoIcons/hotSpring.png','images/omoIcons/hunting.png',
//     'images/omoIcons/hutVillage.png','images/omoIcons/irrigationPump.png','images/omoIcons/kraal.png','images/omoIcons/lakeFarming.png','images/omoIcons/maize.png',
//     'images/omoIcons/manualPump.png','images/omoIcons/medicinalPlants.png','images/omoIcons/noFarming.png','images/omoIcons/pondFarming.png','images/omoIcons/Questionmark.png','images/omoIcons/recreationCenter.png',
//     'images/omoIcons/reehive.png','images/omoIcons/saltlick.png','images/omoIcons/school.png','images/omoIcons/sorghum.png','images/omoIcons/ThumbsUp.png','images/omoIcons/ThumbsDown.png',
//     'images/omoIcons/timber.png','images/omoIcons/treeForGathering.png','images/omoIcons/unknownOther.png','images/omoIcons/veterinary.png','images/omoIcons/waterPoint.png','images/omoIcons/waterpondAnimal.png',
//     'images/omoIcons/waterRiverAnimal.png','images/omoIcons/wildFruits.png',
//   ]);
//
//   var  iconOMO,iconOMO_8,iconOMO_9,iconOMO_10,iconOMO_11,iconOMO_12,iconOMO_13,iconOMO_14,iconOMO_15,iconOMO_16,iconOMO_17,iconOMO_18,iconOMO_19,iconOMO_20,iconOMO_21,iconOMO_22,iconOMO_22,iconOMO_23,iconOMO_24,iconOMO_25,iconOMO_26,
//   icon27,iconOMO_28,iconOMO_29,iconOMO_30,iconOMO_31,iconOMO_32,iconOMO_33,iconOMO_34,iconOMO_35,iconOMO_36
//
//   var generateButtonsLandUse = function(){
//
//     screenChoice = 'landUses'
//
//    iconOMO_8 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_8);
//    iconOMO_8.className = 'buttonsSapelli'
//    iconOMO_8.innerHTML = '<img src="images/omoIcons/hutVillage.png" style="height: 150px; width: 150px; border: 0px solid white;" /> </br>አዊ / መንደር';
//    iconOMO_8.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//       landUse = 'አዊ / መንደር'
//       imageName1 = 'hutVillage'
//
//       document.getElementById('customIconsMap').click()
//       setTimeout(function(){
//         document.getElementById('share-download').click()
//       },600)
//       console.log(landUse)
//
//     },400)
//     }
//    iconOMO_9 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_9);
//    iconOMO_9.innerHTML = '<img src="images/omoIcons/manualPump.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አፕሪች / ቧንቧ';
//    iconOMO_9.className = 'buttonsSapelli'
//    iconOMO_9.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//     generateButtonsEvaluation()
//     document.getElementById('customIconsGoBack').style.display = 'initial';
//     // document.getElementById('customIconsCancel').style.display = 'initial';
//       landUse = 'አፕሪች / ቧንቧ'
//       imageName1 = 'manualPump'
//     },400)
//
//     }
//
//    iconOMO_10 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_10);
//    iconOMO_10.className = 'buttonsSapelli'
//    iconOMO_10.innerHTML = '<img src="images/omoIcons/pondFarming.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አክታረ አታፓር / ኽልኩሬ ሸሽ';
//    iconOMO_10.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//     generateButtonsCropType()
//      document.getElementById('customIconsGoBack').style.display = 'initial';
//      // document.getElementById('customIconsCancel').style.display = 'initial';
//       landUse = 'አክታረ አታፓር / ኽልኩሬ ሸሽ'
//       imageName1 = 'pondFarming'
//     },400)
//
//     }
//    iconOMO_11 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_11);
//    iconOMO_11.innerHTML = '<img src="images/omoIcons/lakeFarming.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አሳክ / ሀይቅ እርሻ';
//    iconOMO_11.className = 'buttonsSapelli'
//    iconOMO_11.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//     generateButtonsCropType()
//      document.getElementById('customIconsGoBack').style.display = 'initial';
//      // document.getElementById('customIconsCancel').style.display = 'initial';
//       landUse = 'አሳክ / ሀይቅ እርሻ'
//       imageName1 = 'lakeFarming'
//     },400)
//
//     }
//    iconOMO_12 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_12);
//    iconOMO_12.className = 'buttonsSapelli'
//    iconOMO_12.innerHTML = '<img src="images/omoIcons/irrigationPump.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤሪያቻ / መስኖ';
//    iconOMO_12.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//     generateButtonsCropType()
//      document.getElementById('customIconsGoBack').style.display = 'initial';
//      // document.getElementById('customIconsCancel').style.display = 'initial';
//       landUse = 'ኤሪያቻ / መስኖ'
//       imageName1 = 'irrigationPump'
//     },400)
//
//     }
//    iconOMO_13 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_13);
//    iconOMO_13.innerHTML = '<img src="images/omoIcons/floodRecessionFlat.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤመራ / ኦሞሸሽ';
//    iconOMO_13.className = 'buttonsSapelli'
//    iconOMO_13.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//     generateButtonsCropType()
//      document.getElementById('customIconsGoBack').style.display = 'initial';
//      // document.getElementById('customIconsCancel').style.display = 'initial';
//       landUse = 'ኤመራ / ኦሞሸሽ'
//       imageName1 = 'floodRecessionFlat'
//     },400)
//
//
//     }
//    iconOMO_14 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_14);
//    iconOMO_14.className = 'buttonsSapelli'
//    iconOMO_14.innerHTML = '<img src="images/omoIcons/floodRecessionSteep.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤቴሎ / ኦሞ ሸሽ';
//    iconOMO_14.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//     generateButtonsCropType()
//      document.getElementById('customIconsGoBack').style.display = 'initial';
//      // document.getElementById('customIconsCancel').style.display = 'initial';
//       landUse = 'ኤቴሎ / ኦሞ ሸሽ'
//       imageName1 = 'floodRecessionSteep'
//     },400)
//
//
//     }
//    iconOMO_15 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_15);
//    iconOMO_15.innerHTML = '<img src="images/omoIcons/cattleGrazing.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አዳካሩ አɔ̂ቱክ / የከብት ግጦሽ';
//    iconOMO_15.className = 'buttonsSapelli'
//    iconOMO_15.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//     generateButtonsEvaluation()
//      document.getElementById('customIconsGoBack').style.display = 'initial';
//      // document.getElementById('customIconsCancel').style.display = 'initial';
//       landUse = 'አዳካሩ አɔ̂ቱክ / የከብት ግጦሽ'
//       imageName1 = 'cattleGrazing'
//     },400)
//
//
//     }
//    iconOMO_38 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_38);
//    iconOMO_38.innerHTML = '<img src="images/omoIcons/goatSheepGrazing.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አዳካሩ አɔ̂ክኔይ / ፍየል ግጦሽ';
//    iconOMO_38.className = 'buttonsSapelli'
//    iconOMO_38.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//     generateButtonsEvaluation()
//      document.getElementById('customIconsGoBack').style.display = 'initial';
//      // document.getElementById('customIconsCancel').style.display = 'initial';
//       landUse = 'አዳካሩ አɔ̂ክኔይ / ፍየል ግጦሽ'
//       imageName1 = 'goatSheepGrazing'
//     },400)
//
//
//     }
//    iconOMO_16 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_16);
//    iconOMO_16.innerHTML = '<img src="images/omoIcons/waterpondAnimal.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አክፒ አታፓር / ኩሬ ውሃ';
//    iconOMO_16.className = 'buttonsSapelli'
//    iconOMO_16.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//     generateButtonsEvaluation()
//      document.getElementById('customIconsGoBack').style.display = 'initial';
//      // document.getElementById('customIconsCancel').style.display = 'initial';
//       landUse = 'አክፒ አታፓር / ኩሬ ውሃ'
//       imageName1 = 'waterpondAnimal'
//     },400)
//
//
//     }
//    iconOMO_17 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_17);
//    iconOMO_17.innerHTML = '<img src="images/omoIcons/waterRiverAnimal.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አይፒ አናም / የኦሞ ውሃ';
//    iconOMO_17.className = 'buttonsSapelli'
//    iconOMO_17.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//
//       landUse = 'አይፒ አናም / የኦሞ ውሃ'
//       imageName1 = 'waterRiverAnimal'
//       document.getElementById('customIconsMap').click()
//       setTimeout(function(){
//         document.getElementById('share-download').click()
//       },600)
//     },400)
//
//     }
//    iconOMO_18 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_18);
//    iconOMO_18.className = 'buttonsSapelli'
//    iconOMO_18.innerHTML = '<img src="images/omoIcons/saltlick.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤዶት / ጨው';
//    iconOMO_18.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//
//       landUse = 'ኤዶት / ጨው'
//       imageName1 = 'saltlick'
//
//       document.getElementById('customIconsMap').click()
//       setTimeout(function(){
//         document.getElementById('share-download').click()
//       },600)
//     },400)
//
//     }
//    iconOMO_19 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_19);
//    iconOMO_19.innerHTML = '<img src="images/omoIcons/wildFruits.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አጌዎር / የአከባቢ የምበላ ቅጠል';
//    iconOMO_19.className = 'buttonsSapelli'
//    iconOMO_19.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//     generateButtonsEvaluation()
//      document.getElementById('customIconsGoBack').style.display = 'initial';
//      // document.getElementById('customIconsCancel').style.display = 'initial';
//       landUse = 'አጌዎር / የአከባቢ የምበላ ቅጠል'
//       imageName1 = 'wildFruits'
//     },400)
//
//
//     }
//    iconOMO_20 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_20);
//    iconOMO_20.innerHTML = '<img src="images/omoIcons/hunting.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤርካ / አደን';
//    iconOMO_20.className = 'buttonsSapelli'
//    iconOMO_20.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//
//       landUse = 'ኤርካ / አደን'
//       imageName1 = 'hunting'
//
//       document.getElementById('customIconsMap').click()
//       setTimeout(function(){
//         document.getElementById('share-download').click()
//       },600)
//     },400)
//
//     }
//
//    iconOMO_21 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_21);
//    iconOMO_21.className = 'buttonsSapelli'
//    iconOMO_21.innerHTML = '<img src="images/omoIcons/fishing.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አክሎክ / አሳ ማጥመድ';
//    iconOMO_21.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//
//       landUse = 'አክሎክ / አሳ ማጥመድ'
//       imageName1 = 'fishing'
//
//       document.getElementById('customIconsMap').click()
//       setTimeout(function(){
//         document.getElementById('share-download').click()
//       },600)
//     },400)
//
//     }
//
//    iconOMO_22 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_22);
//    iconOMO_22.innerHTML = '<img src="images/omoIcons/reehive.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አሙሉጅ / የንብ ቀፎ';
//    iconOMO_22.className = 'buttonsSapelli'
//    iconOMO_22.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//     generateButtonsEvaluation()
//      document.getElementById('customIconsGoBack').style.display = 'initial';
//      // document.getElementById('customIconsCancel').style.display = 'initial';
//       landUse = 'አሙሉጅ / የንብ ቀፎ'
//       imageName1 = 'reehive'
//     },400)
//
//     }
//
//    iconOMO_23 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_23);
//    iconOMO_23.className = 'buttonsSapelli'
//    iconOMO_23.innerHTML = '<img src="images/omoIcons/medicinalPlants.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤደዋ / ባህላዊ ጨው';
//    iconOMO_23.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//
//       landUse = 'ኤደዋ / ባህላዊ ጨው'
//       imageName1 = 'medicinalPlants'
//       document.getElementById('customIconsMap').click()
//       setTimeout(function(){
//         document.getElementById('share-download').click()
//       },600)
//     },400)
//
//     }
//    iconOMO_24 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_24);
//    iconOMO_24.innerHTML = '<img src="images/omoIcons/timber.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አኩቶይ አክም / ማገዶ';
//    iconOMO_24.className = 'buttonsSapelli'
//    iconOMO_24.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//
//       landUse = 'አኩቶይ አክም / ማገዶ'
//       imageName1 = 'timber'
//
//       document.getElementById('customIconsMap').click()
//       setTimeout(function(){
//         document.getElementById('share-download').click()
//       },600)
//     },400)
//
//
//     }
//    iconOMO_25 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_25);
//    iconOMO_25.className = 'buttonsSapelli'
//    iconOMO_25.innerHTML = '<img src="images/omoIcons/hotSpring.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤሩስ / ፍል ውሃ';
//    iconOMO_25.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//
//       landUse = 'ኤሩስ / ፍል ውሃ'
//       imageName1 = 'hotSpring'
//
//       document.getElementById('customIconsMap').click()
//       setTimeout(function(){
//         document.getElementById('share-download').click()
//       },600)
//     },400)
//
//     }
//
//    iconOMO_27 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_27);
//    iconOMO_27.innerHTML = '<img src="images/omoIcons/waterPoint.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አቦኖ / ቦኖ';
//    iconOMO_27.className = 'buttonsSapelli'
//    iconOMO_27.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//     generateButtonsEvaluation()
//      document.getElementById('customIconsGoBack').style.display = 'initial';
//      // document.getElementById('customIconsCancel').style.display = 'initial';
//       landUse = 'አቦኖ / ቦኖ'
//       imageName1 = 'waterPoint'
//     },400)
//
//
//     }
//    iconOMO_28 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_28);
//    iconOMO_28.innerHTML = '<img src="images/omoIcons/healthStation.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አካይ ኤደዋ / ጤና ጣቢያ';
//    iconOMO_28.className = 'buttonsSapelli'
//    iconOMO_28.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//     generateButtonsEvaluation()
//      document.getElementById('customIconsGoBack').style.display = 'initial';
//      // document.getElementById('customIconsCancel').style.display = 'initial';
//       landUse = 'አካይ ኤደዋ / ጤና ጣቢያ'
//       imageName1 = 'healthStation'
//     },400)
//
//
//     }
//    iconOMO_29 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_29);
//    iconOMO_29.className = 'buttonsSapelli'
//    iconOMO_29.innerHTML = '<img src="images/omoIcons/school.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አካይ ኤሱኩል / ትምህርት ቤት';
//    iconOMO_29.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//
//       landUse = 'አካይ ኤሱኩል / ትምህርት ቤት'
//       imageName1 = 'school'
//
//       document.getElementById('customIconsMap').click()
//       setTimeout(function(){
//         document.getElementById('share-download').click()
//       },600)
//     },400)
//
//     }
//    iconOMO_30 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_30);
//    iconOMO_30.innerHTML = '<img src="images/omoIcons/veterinary.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አካይ ኤደዋ አግባረን / የከብት ህክምና';
//    iconOMO_30.className = 'buttonsSapelli'
//    iconOMO_30.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//     generateButtonsEvaluation()
//      document.getElementById('customIconsGoBack').style.display = 'initial';
//      // document.getElementById('customIconsCancel').style.display = 'initial';
//       landUse = 'አካይ ኤደዋ አግባረን / የከብት ህክምና'
//       imageName1 = 'veterinary'
//     },400)
//
//
//     }
//    iconOMO_31 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_31);
//    iconOMO_31.innerHTML = '<img src="images/omoIcons/treeForGathering.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤኩቶይ / መሰብሰቢያ ዛፍ';
//    iconOMO_31.className = 'buttonsSapelli'
//    iconOMO_31.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//
//       landUse = 'ኤኩቶይ / መሰብሰቢያ ዛፍ'
//       imageName1 = 'treeForGathering'
//
//       document.getElementById('customIconsMap').click()
//       setTimeout(function(){
//         document.getElementById('share-download').click()
//       },600)
//     },400)
//
//     }
//    iconOMO_32 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_32);
//    iconOMO_32.innerHTML = '<img src="images/omoIcons/eldersHut.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤካፓ / የሽማግሌ መሰባሰቢያ';
//    iconOMO_32.className = 'buttonsSapelli'
//    iconOMO_32.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//
//       landUse = 'ኤካፓ / የሽማግሌ መሰባሰቢያ'
//       imageName1 = 'eldersHut'
//
//       document.getElementById('customIconsMap').click()
//       setTimeout(function(){
//         document.getElementById('share-download').click()
//       },600)
//     },400)
//
//     }
//
//    iconOMO_33 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_33);
//    iconOMO_33.className = 'buttonsSapelli'
//    iconOMO_33.innerHTML = '<img src="images/omoIcons/recreationCenter.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አፓክ ንቦልያት / መዝናኛ';
//    iconOMO_33.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//
//       landUse = 'አፓክ ንቦልያት / መዝናኛ'
//       imageName1 = 'recreationCenter'
//
//       document.getElementById('customIconsMap').click()
//       setTimeout(function(){
//         document.getElementById('share-download').click()
//       },600)
//     },400)
//
//     }
//    iconOMO_34 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_34);
//    iconOMO_34.innerHTML = '<img src="images/omoIcons/church.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አካይ አኩጅ / ቤተ ክርስቲያን';
//    iconOMO_34.className = 'buttonsSapelli'
//    iconOMO_34.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//
//       landUse = 'አካይ አኩጅ / ቤተ ክርስቲያን'
//       imageName1 = 'church'
//
//       document.getElementById('customIconsMap').click()
//       setTimeout(function(){
//         document.getElementById('share-download').click()
//       },600)
//     },400)
//
//     }
//    iconOMO_35 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_35);
//    iconOMO_35.className = 'buttonsSapelli'
//    iconOMO_35.innerHTML = '<img src="images/omoIcons/boatCrossing.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤዶከት አቱቧ / ጀልባ መሻገሪያ';
//    iconOMO_35.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//
//       landUse = 'ኤዶከት አቱቧ / ጀልባ መሻገሪያ'
//       imageName1 = 'boatCrossing'
//
//       document.getElementById('customIconsMap').click()
//       setTimeout(function(){
//         document.getElementById('share-download').click()
//       },600)
//     },400)
//
//     }
//    iconOMO_36 = document.createElement("BUTTON");
//     cell.appendChild(iconOMO_36);
//    iconOMO_36.innerHTML = '<img src="images/omoIcons/unknownOther.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ɔ̂ቺየ / ሌላ';
//    iconOMO_36.className = 'buttonsSapelli'
//    iconOMO_36.onclick = function(){
//      setTimeout(function(){
//
//       hideAll()
//     generateButtonsEvaluation()
//      document.getElementById('customIconsGoBack').style.display = 'initial';
//      // document.getElementById('customIconsCancel').style.display = 'initial';
//       landUse = 'ɔ̂ቺየ / ሌላ'
//       imageName1 = 'unknownOther'
//
//     },400)
//
//     }
//
//     return screenChoice && landUse && imageName1
//   }
//
//
//

}
