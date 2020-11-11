

//////////////////////////// actions for bottom-of-screen filtering buttons

//script for apply filters
document.getElementById("applyFilter").onclick = function(e) {
  document.getElementById("alertApplyFilter").style.display = 'initial'
  setTimeout(function(){
    document.getElementById("alertApplyFilter").style.display = 'none'
  }, 5000)


    boxContentFiltering = document.getElementById('emojionearea').value;
    //console.log(boxContentFiltering)
    //console.log(getboxContentFiltering())
    try {
      deflated.clearLayers() // clearLayers instead of cartoGeometries, as this doesn't contain all geometries after 'sent'
      //cartoGeometries.removeFrom(deflated)
    } catch (err) {
      console.log('error sql catched due to empty layer after filter applied')
    }
    var sqlQueryWithoutCondition = "SELECT cartodb_id, the_geom, datetime, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring FROM lumblu WHERE landusesemoji LIKE '";
    var sqlCondition = boxContentFiltering +"'";
    sqlQuery = sqlQueryWithoutCondition + sqlCondition
    getGeoJSON()

    filterApplied = true
    return filterApplied

}

//script for remove filters
document.getElementById("clearFilter").onclick = function(e) {
  document.getElementsByClassName('emojionearea-editor')[0].innerHTML = null;

  try {
    deflated.clearLayers()  // clearLayers instead of cartoGeometries, as this doesn't contain all geometries after 'sent'
  //  cartoGeometries.removeFrom(deflated)
  } catch (err) {
    console.log('error sql catched due to empty layer after filter applied  ')

  }
  sqlQuery = "SELECT cartodb_id, the_geom, datetime, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring FROM lumblu"
  getGeoJSON()
//  deflated.addTo(map)
  filterApplied = false
  return filterApplied

};

var dateFilterValue; //to apply this value when applyFilter is clicked
document.getElementById("filterByDate").onclick = function(e) {
  var img =  document.getElementById("imgFilterByDate")
    if (img.src.match("dateAll")) { //all (infiinite)
      img.src = 'images/dateYear.png'
      dateFilterValue = 'Year'
      //alert while on development
      document.getElementById('alertFilterDate').style.display = 'initial'
      setTimeout(function(){
        document.getElementById('alertFilterDate').style.display = 'none'
      },5000)

    }else if (img.src.match("dateYear")) { //1 year
      img.src = 'images/dateMonth.png'
      dateFilterValue = 'Month'
    }else if (img.src.match("dateMonth")) { //1 month
      img.src = 'images/dateWeek.png'
      dateFilterValue = 'Week'
    }else if (img.src.match("dateWeek")) { //1 week
      img.src = 'images/dateDay.png'
      dateFilterValue = 'Day'
    }else if (img.src.match("dateDay")) { // 1 day
      img.src = 'images/dateAll.png'
      dateFilterValue = 'All'
    }
//console.log(dateFilterValue)
  return dateFilterValue
}
