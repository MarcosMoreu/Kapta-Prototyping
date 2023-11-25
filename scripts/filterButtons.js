//////////////////////////// actions for bottom-of-screen filtering buttons
var boxContentFiltering
var boxContentFilteringEncoded
var filterApplied = false
var period = 3650 // by default, all features
var datePeriodAgoReplaceComaInvert = '2010-1-1'
var numberOfKeys
var cellFilter
var filterIconOpen = false
var dateFilterValueLocalStorage
sapelliProjectIdentifier = localStorage.getItem('sapelliProjectIdentifier')

var lastBoxContent = null
var checkIfInputChanges
//script for apply filters
document.getElementById("applyFilter").onclick = function(e) {
  screen1 = null
  document.getElementById('maploadinggif').src = 'images/gifcartofilter.gif'
  document.getElementById('MapLoading').style.display = 'initial'
  document.getElementById("Alert").style.fontSize = "30px";
  document.getElementById("Alert").style.textAlign = "center"
  document.getElementById('Alert').innerHTML = '⌛'
  document.getElementById("Alert").style.display = 'initial'


  setTimeout(function(){
    document.getElementById('MapLoading').style.display = 'none'
    document.getElementById('maploadinggif').src = 'images/checkingPw.gif'
    document.getElementById("Alert").style.display = 'initial'
    document.getElementById("applyFilter").style.display = "none";
    document.getElementById("clearFilter").style.display = "initial";
    document.getElementById("clearFilter").style.opacity = '1'
    document.getElementById("clearFilter").disabled = false



  },8000) //in case the success doesn't work

  //script to refresh apply filter in case input box changes (focused again)
  checkIfInputChanges = setInterval(function(){
    var emojioneareaeditor0 = document.getElementById('emojionearea')
    // var emojioneareaeditor0 = emojioneareaeditor[0]
    if(lastBoxContent != emojioneareaeditor0.value && lastBoxContent != null && filterIsOn == true){
      document.getElementById("clearFilter").style.display = "none";
      document.getElementById("applyFilter").style.display = "initial";
      document.getElementById("applyFilter").style.opacity = '1'
      document.getElementById("applyFilter").disabled = true
      //console.('the input box has been updated')
    }
    lastBoxContent = emojioneareaeditor0.value


    return lastBoxContent
  },300)

  if(whichLayerIsOn == 'deflated'){  // to differentiate between filtering carto or localstorage
    filter_Button.button.style.borderColor = 'yellow'




    boxContent = document.getElementById('emojionearea').value;
    //console.('boxContent',boxContent)

    // var boxContentToShortname = emojione.toShort(boxContent)
    // console.log(boxContentToShortname)
    document.getElementById("applyFilter").style.display = "none";
    document.getElementById("clearFilter").style.display = "initial";
    document.getElementById("clearFilter").style.opacity = '1'
    document.getElementById("clearFilter").disabled = false
    // filter_Button.button.style.borderColor = 'green'
    // if(landUse != 'emojiNoSapelli'){// we use innerHTML only when populated with sapelli (see below else)
    //   var emojioneareaeditor0 = document.getElementById('emojionearea')
    //   // var emojioneareaeditor0 = emojioneareaeditor[0]
    //   boxContentFiltering = emojioneareaeditor0.value
    // }else{
    //   // boxContentFiltering = document.getElementsByClassName('emojionearea-editor')[0].innerHTML  // use this instead of .value!!!
    //   boxContentFilteringEncoded = document.getElementById('emojionearea').value; // we use value instead because innerhtml takes emojis as images, which is a problem for the sql query
    //   // boxContentFilteringEncoded = emojione.toShort(boxContentFiltering)
    //   console.log('box',boxContentFilteringEncoded)
    // }



      if(boxContent ==='' && period == 3650){
        filterApplied = false
        // console.log('do nothing')
      }

      else if(boxContent ==='' && period != 3650){
        filterApplied = true
        //console.('do only date')

            try {
              deflated.clearLayers() // clearLayers instead of cartoGeometries, as this doesn't contain all geometries after 'sent'
              //cartoGeometries.removeFrom(deflated)
            } catch (err) {
              // console.log('error sql catched due to empty layer after filter applied')
            }
           var sqlQueryWithoutCondition = "SELECT geom, contributionid, areapolygon, lengthline, date, attribute1s, attribute2s, attribute3s, attribute11n, attribute12n, attribute13n, attribute14n, attribute15n FROM `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb_QMM_Madagascar` WHERE sapprojid='" +sapelliProjectIdentifier+ "' AND timestamp>'";
           var sqlCondition = datePeriodAgoReplaceComaInvert +"'";
           sqlQuerySelect = sqlQueryWithoutCondition + sqlCondition
           //console.('sqlQuerySelect',sqlQuerySelect)

           // sqlQuerySelect = "SELECT * FROM `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb0`"
           sqlQuerySelectEncoded = encodeURI(sqlQuerySelect)
             requestCartoData(sqlQuerySelectEncoded)

           var loadInfoDateFilter = period + ' ☀️🌙 </br> ...'
           document.getElementById("Alert").style.fontSize = "20px";
           document.getElementById("Alert").innerHTML = loadInfoDateFilter
           document.getElementById("Alert").style.display = 'initial'

      }else{
        filterApplied = true
        //console.('do both')

            try {
              deflated.clearLayers() // clearLayers instead of cartoGeometries, as this doesn't contain all geometries after 'sent'
              //cartoGeometries.removeFrom(deflated)
            } catch (err) {
              // console.log('error sql catched due to empty layer after filter applied')
            }



           var sqlQueryWithoutCondition = "SELECT geom, contributionid, areapolygon, lengthline, date, attribute1s, attribute2s, attribute3s, attribute11n, attribute12n, attribute13n, attribute14n, attribute15n FROM `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb_QMM_Madagascar` WHERE sapprojid='" +sapelliProjectIdentifier+ "' AND (attribute1s ";
           var sqlCondition =
            // "LIKE '" + boxContent +"'" //exact value
            //
            // + " OR landuses LIKE N'%" + boxContent +"%')" //xxxxxxxx%%%%%%%%%%%

            "LIKE '%" + boxContent +"%')" //exact value


            // + " OR landuses LIKE N'%" + boxContent +"%')" //xxxxxxxx%%%%%%%%%%%

            +" AND (timestamp>'"+datePeriodAgoReplaceComaInvert +"')";
           var sqlQuerySelect = sqlQueryWithoutCondition + sqlCondition
           // console.log(sqlQueryEncoded)
           // sqlQuery = encodeURIComponent(sqlQueryEncoded)
           //console.('sqlQuerySelect',sqlQuerySelect)

           sqlQuerySelectEncoded = encodeURI(sqlQuerySelect)
             requestCartoData(sqlQuerySelectEncoded)
            if(period == 3650){
              var loadInfoDateFilter = boxContent // not encoded here as we want the emoji displayed in the alert
            }else{
              var loadInfoDateFilter = period + ' ☀️🌙 </br>'+ boxContent // not encoded here as we want the emoji displayed in the alert
            }
           document.getElementById("Alert").style.fontSize = "20px";
           document.getElementById("Alert").innerHTML = loadInfoDateFilter
           document.getElementById("Alert").style.display = 'initial'
      }

  }else if(whichLayerIsOn == 'localStorage'){
    // The same code, but using ES6 Promises.
    // filterLocalStorage_Button.button.style.borderColor = 'green'

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

        //console.([key, value]);
        //console.(value)
        var parsedValue = JSON.parse(value)
        //console.(parsedValue.properties.landUsesEmoji)

        // boxContent = document.getElementById('emojionearea').value;
        // console.log(boxContent,'boxcontent')

        var emojioneareaeditor0 = document.getElementById('emojionearea')
        // var emojioneareaeditor0 = emojioneareaeditor[0]
        boxContent = emojioneareaeditor0.value
        //to get the box value in case this is filled with icons
        if(boxContent == null){
          boxContent = landUse
        }
        //console.(boxContent,'boxcontentLU')

        var firstWord = boxContent.split(' ')[0]
        var secondWord = boxContent.split(' ')[1]
        //console.(firstWord,'first word')
        var dateFilterApplied = new Date(datePeriodAgoReplaceComaInvert)
          // console.log(datePeriodAgoReplaceComaInvert)
          //console.(dateFilterApplied)
        // var reformatDate = parsedValue.properties.dateTime


        if(parsedValue.properties.landUsesEmoji){ //two types of properties to address download or geojsonurl properties names/acronyms
          //the approach here is to empty the array groupGeoJSON, then add each geometry (that matches the filter) to the array, then call the
          //function localStorageToGeoJSON at the end of the iteration

          //this is to find and format the date
          var dateWithoutTime = parsedValue.properties.dateTime.split('T')[0]
          var dateFeatureIterated = new Date(dateWithoutTime)
            // console.log(dateWithoutTime)
            // console.log(parsedValue.properties.dateTime)
            //console.(dateFeatureIterated)


          if(parsedValue.properties.landUsesEmoji.includes(firstWord) && dateFeatureIterated > dateFilterApplied){
            //console.('filtered')

            try{
              //console.(value)
              //console.(iterationNumber,'iteration number')
              isJson(parsedValue)
              // groupGeoJSON.length = 0
              groupGeoJSON.push(parsedValue)

            }catch(err){
              //console.(parsedValue, 'error when pushing in iteration')
            }
          }else{
            //console.('no match')
          }

      }else if(parsedValue.properties.LU){

        //this is to find and format the date
        var dateWithoutTime = parsedValue.properties.D.split('T')[0]
        var dateFeatureIterated = new Date(dateWithoutTime)
          // console.log(dateWithoutTime)
          // console.log(parsedValue.properties.dateTime)
          //console.(dateFeatureIterated)
        if(parsedValue.properties.LU.includes(firstWord) && dateFeatureIterated > dateFilterApplied){
          //console.('filtered')

          try{
            //console.(value)
            //console.(iterationNumber)
            isJson(parsedValue)
            // groupGeoJSON.length = 0
            groupGeoJSON.push(parsedValue)

          }catch(err){
            console.log(parsedValue, 'error when pushing in iteration')
          }
        }else{
          console.log('no match')
        }
      }
    }).then(function() {
      console.log(groupGeoJSON)

      localStorageToGeoJSON() // we call the function only at the end of the iteration, once the groupgeojson array is completed
        console.log('Iteration has completed');
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
        filterApplied = true // here because if no matches then filterApplied is not returned
        return filterApplied

    });

    if(period == 3650){
      var loadInfoDateFilter = boxContentFiltering // not encoded here as we want the emoji displayed in the alert
    }else{
      var loadInfoDateFilter = period + ' ☀️🌙 </br>'+ boxContentFiltering // not encoded here as we want the emoji displayed in the alert
    }
   document.getElementById("Alert").style.fontSize = "20px";
   document.getElementById("Alert").innerHTML = loadInfoDateFilter
   document.getElementById("Alert").style.display = 'initial'


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
    return filterApplied && boxContentFilteringEncoded && screen1

}


//script for remove filters
document.getElementById("clearFilter").onclick = function(e) {
  screen1 = null
  document.getElementById("clearFilter").style.display = "none";
  document.getElementById("applyFilter").style.display = "initial";
  document.getElementById("applyFilter").style.opacity = '0.4'
  document.getElementById("applyFilter").disabled = true
  clearInterval(checkIfInputChanges)


  // document.getElementById("clearFilter").style.opacity = '0.4'
  // document.getElementById("clearFilter").disabled = true
  // document.getElementById('emojionearea').innerHTML = null;
  document.getElementById('emojionearea').value = null
  boxContentFilteringEncoded = null
  // document.getElementById('emojionearea').value = null
  var img =  document.getElementById("imgFilterByDate")
  img.src = 'images/dateAll.png'
  period = 3650

  document.getElementById("Alert").style.display = 'none'

  if(whichLayerIsOn == 'deflated'){
    // filter_Button.button.style.backgroundColor = 'black'
    // filter_Button.button.style.borderColor = 'white'

    // filter_Button.button.style.borderColor = 'transparent'


    if(filterApplied == true){

          try {
            deflated.clearLayers()  // clearLayers instead of cartoGeometries, as this doesn't contain all geometries after 'sent'
          //  cartoGeometries.removeFrom(deflated)
          } catch (err) {
            // console.log('error sql catched due to empty layer after filter applied  ')

          }
          // sqlQuery = "SELECT cartodb_id, the_geom, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date FROM lumblu"
          // getGeoJSON()
     }


  }else if(whichLayerIsOn == 'localStorage'){
    // filterLocalStorage_Button.button.style.backgroundColor = '#00FFFB'
    // filterLocalStorage_Button.button.style.borderColor = 'white'

    // filterLocalStorage_Button.button.style.borderColor = 'transparent'


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
  return filterApplied && boxContentFilteringEncoded && period && screen1

};

// var dateFilterValue; //to apply this value when applyFilter is clicked
document.getElementById("filterByDate").onclick = function(e) {
  if(isIOS == true){
    alert('🚧 Filter by date functionality not available yet for iOS')
  }else{

    document.getElementById("clearFilter").style.display = "none";
    document.getElementById("applyFilter").style.display = "initial";
    document.getElementById("applyFilter").style.opacity = '1'
    document.getElementById("applyFilter").disabled = true


      var calcDatePeriodAgo = function(period){
        var d = new Date();
        //console.log('Today is: ' + d.toLocaleString());
        d.setDate(d.getDate() - period);
        return d.toLocaleString()
      }

      var img =  document.getElementById("imgFilterByDate")
          if (img.src.match("dateAll")) { //1 week
            img.src = 'images/dateDay.png'
            dateFilterValue = 'Day'
            period = 1
            var loadInfoDateFilter = boxContentFilteringEncoded
            // document.getElementById("Alert").style.fontSize = "18px";
            // document.getElementById("Alert").innerHTML = ' ☀️🌙'
            document.getElementById("Alert").style.display = 'none'
          }

          else if (img.src.match("dateDay")) { //all (infiinite)
            img.src = 'images/dateWeek.png'
            dateFilterValue = 'Week'
            period = 7

          }else if (img.src.match("dateWeek")) { //1 year
            img.src = 'images/dateMonth.png'
            dateFilterValue = 'Month'
            period = 30

          }else if (img.src.match("dateMonth")) { //1 month
            img.src = 'images/dateYear.png'
            dateFilterValue = 'Year'
            period = 365

          }else if (img.src.match("dateYear")) { //1 week
            img.src = 'images/dateAll.png'
            dateFilterValue = 'All'
            period = 3650
          }
          if(whichLayerIsOn == 'deflated'){
        //console.log('period ' + period);
        var datePeriodAgo = calcDatePeriodAgo(period)
        //console.log('datePeriodAgo ' + datePeriodAgo);
        //var datePeriodAgo = '2020-10-14'
        var datePeriodAgoReplace = datePeriodAgo.replaceAll("/", "-")
        //console.log('datePeriodAgoReplace ' + datePeriodAgoReplace);
        var datePeriodAgoReplaceComa = datePeriodAgoReplace.replace(/,[^,]+$/, "")
        //console.log('datePeriodAgoReplaceComa ' + datePeriodAgoReplaceComa);
        datePeriodAgoReplaceComaInvert = datePeriodAgoReplaceComa.split("-").reverse().join("-");
        // date = date.split("-").reverse().join("-");
        //console.log('datePeriodAgoReplaceComaInvert ' + datePeriodAgoReplaceComaInvert);

      return period && filterApplied && datePeriodAgoReplaceComaInvert
    }else if(whichLayerIsOn == 'localStorage'){
      //console.('under development')
      var datePeriodAgo = calcDatePeriodAgo(period)
      //console.log('datePeriodAgo ' + datePeriodAgo);
      //var datePeriodAgo = '2020-10-14'
      var datePeriodAgoReplace = datePeriodAgo.replaceAll("/", "-")
      //console.log('datePeriodAgoReplace ' + datePeriodAgoReplace);
      var datePeriodAgoReplaceComa = datePeriodAgoReplace.replace(/,[^,]+$/, "")
      //console.log('datePeriodAgoReplaceComa ' + datePeriodAgoReplaceComa);
      datePeriodAgoReplaceComaInvert = datePeriodAgoReplaceComa.split("-").reverse().join("-");
      //console.(datePeriodAgoReplaceComaInvert)

      return datePeriodAgoReplaceComaInvert
    }
    return dateFilterValue && filterApplied
}
}

document.getElementById("filterWithIcons").onclick = function(e) {
  sapelliProjects.click()
  filterIsOn = true

  return filterIsOn
}
