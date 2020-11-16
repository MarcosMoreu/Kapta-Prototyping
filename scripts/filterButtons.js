



//////////////////////////// actions for bottom-of-screen filtering buttons
var boxContentFiltering
var filterApplied = false
var period = 3650 // by default, all features
var datePeriodAgoReplaceComaInvert = '2010-1-1'
//script for apply filters
document.getElementById("applyFilter").onclick = function(e) {
  // document.getElementById("applyFilter").style.opacity = '0.4'
  // document.getElementById("applyFilter").disabled = true
  document.getElementById("clearFilter").style.opacity = '1'
  document.getElementById("clearFilter").disabled = false
  // boxContentFiltering = document.getElementById('emojionearea').value;
  boxContentFiltering = document.getElementsByClassName('emojionearea-editor')[0].innerHTML  // use this instead of .value!!!
  console.log('box',boxContentFiltering)

    if(boxContentFiltering ==='' && period == 3650){
      filterApplied = false
      console.log('do nothing')
    }

    else if(boxContentFiltering ==='' && period != 3650){
      filterApplied = true
      console.log('do only date')

          try {
            deflated.clearLayers() // clearLayers instead of cartoGeometries, as this doesn't contain all geometries after 'sent'
            //cartoGeometries.removeFrom(deflated)
          } catch (err) {
            console.log('error sql catched due to empty layer after filter applied')
          }
         var sqlQueryWithoutCondition = "SELECT cartodb_id, the_geom, datetime, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date FROM lumblu WHERE date>'";
         var sqlCondition = datePeriodAgoReplaceComaInvert +"'";
         sqlQuery = sqlQueryWithoutCondition + sqlCondition
         getGeoJSON()

         var loadInfoDateFilter = period + ' ☀️🌙 </br> ...'
         document.getElementById("Alert").style.fontSize = "18px";
         document.getElementById("Alert").innerHTML = loadInfoDateFilter
         document.getElementById("Alert").style.display = 'initial'

    }else{
      filterApplied = true
      console.log('do both')

          try {
            deflated.clearLayers() // clearLayers instead of cartoGeometries, as this doesn't contain all geometries after 'sent'
            //cartoGeometries.removeFrom(deflated)
          } catch (err) {
            console.log('error sql catched due to empty layer after filter applied')
          }
         var sqlQueryWithoutCondition = "SELECT cartodb_id, the_geom, datetime, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring FROM lumblu WHERE landusesemoji LIKE '";
         var sqlCondition = boxContentFiltering +"'"+" AND date>'"+datePeriodAgoReplaceComaInvert +"'";
         sqlQuery = sqlQueryWithoutCondition + sqlCondition
         getGeoJSON()
          if(period == 3650){
            var loadInfoDateFilter = boxContentFiltering
          }else{
            var loadInfoDateFilter = period + ' ☀️🌙 </br>'+ boxContentFiltering
          }
         document.getElementById("Alert").style.fontSize = "18px";
         document.getElementById("Alert").innerHTML = loadInfoDateFilter
         document.getElementById("Alert").style.display = 'initial'
    }

    console.log('filter applied ', filterApplied)
    return filterApplied && boxContentFiltering

}

//script for remove filters
document.getElementById("clearFilter").onclick = function(e) {
  document.getElementById("applyFilter").style.opacity = '0.4'
  document.getElementById("applyFilter").disabled = true
  document.getElementById("clearFilter").style.opacity = '0.4'
  document.getElementById("clearFilter").disabled = true
  document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null;
  boxContentFiltering = null
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
          console.log('error sql catched due to empty layer after filter applied  ')

        }
        sqlQuery = "SELECT cartodb_id, the_geom, datetime, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring FROM lumblu"
        getGeoJSON()
   }
//  deflated.addTo(map)
  filterApplied = false
  return filterApplied && boxContentFiltering && period

};

// var dateFilterValue; //to apply this value when applyFilter is clicked
document.getElementById("filterByDate").onclick = function(e) {

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
            var loadInfoDateFilter = boxContentFiltering
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

  return dateFilterValue & period && filterApplied && datePeriodAgoReplaceComaInvert
}
