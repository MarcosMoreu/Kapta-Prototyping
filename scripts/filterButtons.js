



//////////////////////////// actions for bottom-of-screen filtering buttons
var boxContentFiltering
var boxContentFilteringEncoded
var filterApplied = false
var period = 3650 // by default, all features
var datePeriodAgoReplaceComaInvert = '2010-1-1'
var numberOfKeys
//script for apply filters
document.getElementById("applyFilter").onclick = function(e) {

  if(whichLayerIsOn == 'deflated'){  // to differentiate between filtering carto or localstorage
    boxContent = document.getElementById('emojionearea').value;
    var boxContentToShortname = emojione.toShort(boxContent)
    console.log(boxContentToShortname)
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
          if(parsedValue.properties.landUsesEmoji.includes(firstWord) || parsedValue.properties.landUsesEmoji.includes(secondWord)){
            console.log('filtered')
          }

      }else if(parsedValue.properties.LU){

      }
    }).then(function() {
        console.log('Iteration has completed');
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
  document.getElementById("applyFilter").style.opacity = '0.4'
  document.getElementById("applyFilter").disabled = true
  document.getElementById("clearFilter").style.opacity = '0.4'
  document.getElementById("clearFilter").disabled = true
  document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null;
  document.getElementById('emojionearea').value = null
  boxContentFilteringEncoded = null
  // document.getElementById('emojionearea').value = null
  var img =  document.getElementById("imgFilterByDate")
  img.src = 'images/dateAll.png'
  period = 3650

  document.getElementById("Alert").style.display = 'none'

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
//  deflated.addTo(map)
  filterApplied = false
  return filterApplied && boxContentFilteringEncoded && period

};

// var dateFilterValue; //to apply this value when applyFilter is clicked
document.getElementById("filterByDate").onclick = function(e) {

    if(isIOS == true){
      alert('🚧 Filter by date functionality not available yet for iOS')
    }else{

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
      }
  return dateFilterValue & period && filterApplied && datePeriodAgoReplaceComaInvert
}
