



//////////////////////////// actions for bottom-of-screen filtering buttons

//script for apply filters
document.getElementById("applyFilter").onclick = function(e) {
  document.getElementById('Alert').innerHTML = '🚧 Apply filters functionality to be improved (only exact attribute matches at the moment...)'
  document.getElementById("Alert").style.display = 'initial'
  setTimeout(function(){
    document.getElementById("Alert").style.display = 'none'
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
var dateRange
// var dateFilterValue; //to apply this value when applyFilter is clicked
document.getElementById("filterByDate").onclick = function(e) {
  // var currentDate = new Date()
  // var currentDateDay = currentDate.getDate()
  // var currentDateMonth = currentDate.getMonth()
  // var currentDateYear = currentDate.getFullYear()
  // // var currentDateFormated = currentDateYear +'/'+currentDateMonth+'/'+currentDateDay
  // var currentDateFormated = currentDateDay +'/'+currentDateMonth+'/'+currentDateYear
  //
  // var currentDateXX = new Date(currentDateFormated)
  //
  //
  //
  // dateADayAgo = currentDateXX.setDate(currentDateXX.getDate() - 5);
  // var dateADayAgoString = dateADayAgo.toLocaleString()
  //
  // console.log('date', currentDate)
  // // console.log('dateFormated', currentDateFormated)
  // // console.log('dateADayAgo', currentDate)
  // console.log('dateADayAgo', dateADayAgoString)
  // var period = 1
  // var calcDatePeriodAgo = function(period){
  //   var d = new Date();
  //   console.log('Today is: ' + d.toLocaleString());
  //   d.setDate(d.getDate() - period);
  //   return d.toLocaleString()
  // }
  // var datePeriodAgo = calcDatePeriodAgo(period)
  // console.log('1 days ago was: ' + datePeriodAgo);
  var calcDatePeriodAgo = function(period){
    var d = new Date();
    console.log('Today is: ' + d.toLocaleString());
    d.setDate(d.getDate() - period);
    return d.toLocaleString()
  }


  try {
    deflated.clearLayers() // clearLayers instead of cartoGeometries, as this doesn't contain all geometries after 'sent'
    //cartoGeometries.removeFrom(deflated)
  } catch (err) {
    console.log('error sql catched due to empty layer after filter applied')
  }

  if(filterApplied == true){

  }else{
// works
//var sqlQueryWithoutCondition = "SELECT cartodb_id, the_geom, datetime, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date FROM lumblu WHERE landuses='test'";
//var sqlQueryWithoutCondition = "SELECT cartodb_id, the_geom, datetime, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date FROM lumblu WHERE date='2020-10-15T12:19:22Z'";

//    boxContentFiltering = '2020-10-14T12:19:22Z'
  //  var sqlQueryWithoutCondition = "SELECT cartodb_id, the_geom, datetime, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date FROM lumblu WHERE date>'";
    //var sqlCondition = boxContentFiltering +"'";
    //sqlQuery = sqlQueryWithoutCondition + sqlCondition



  //}

  var img =  document.getElementById("imgFilterByDate")
    if (img.src.match("dateDay")) { //all (infiinite)
      img.src = 'images/dateWeek.png'
      dateFilterValue = 'Week'

      var period = 1
      var datePeriodAgo = calcDatePeriodAgo(period)
      console.log('1 days ago was: ' + datePeriodAgo);

      // dateRange = '2020-10-14'
      var sqlQueryWithoutCondition = "SELECT cartodb_id, the_geom, datetime, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date FROM lumblu WHERE date>'";
      var sqlCondition = datePeriodAgo +"'";
      sqlQuery = sqlQueryWithoutCondition + sqlCondition
      getGeoJSON()

      //alert while on development
      // document.getElementById('Alert').innerHTML = '🚧 Filter by date functionality is under development'
      // document.getElementById("Alert").style.display = 'initial'
      // setTimeout(function(){
      //   document.getElementById("Alert").style.display = 'none'
      // }, 5000)

    }else if (img.src.match("dateWeek")) { //1 year
      img.src = 'images/dateMonth.png'
      dateFilterValue = 'Month'
    }else if (img.src.match("dateMonth")) { //1 month
      img.src = 'images/dateYear.png'
      dateFilterValue = 'Year'
    }else if (img.src.match("dateYear")) { //1 week
      img.src = 'images/dateDay.png'
      dateFilterValue = 'Day'
    }
  }
//console.log(dateFilterValue)
  return dateFilterValue
}
