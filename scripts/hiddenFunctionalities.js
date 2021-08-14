var clicksRose = 0

var divForButtons
var buttonForDownloadTiles
var buttonForExportGeometries
var buttonForImportGeometries
var buttonForHideAll
var choosefile
var readfile
var processAndAddToMap
document.getElementById('rose').onclick = function(e){
    clicksRose += 1;
    // //console.log(clicksRose)
    //this is to avoid zoom in with doubleClick if rose is clicked too quickly
    map.doubleClickZoom.disable();
    setTimeout(function(){
      map.doubleClickZoom.enable();

    },200)
    //console.log('deflated',deflated)
    var toRemoveDeflated = deflated._layers
    //console.log('toremovedeflated',toRemoveDeflated)

      if(clicksRose == 5){ //this is to refresh the carto layer
        // document.getElementById("Alert").style.fontSize = "40px";
        // document.getElementById('Alert').innerHTML = '<br>⌛'
        // document.getElementById("Alert").style.display = 'initial'


        setTimeout(function(){ //we delay count 0 in case user want to download tiles. count to 0 after 10secs for next time user want to reload cartolayer
          if(clicksRose == 5){ //this is to check that the user actually want to click 5 times, not 10
            document.getElementById("Alert").style.fontSize = "40px";
            document.getElementById('Alert').innerHTML = '<br>🔄'
            document.getElementById("Alert").style.display = 'initial'
              setTimeout(function(){
                document.getElementById("Alert").style.display = 'none'
             },1000)
            //console.log('refreshed')

            for (i = 0; i < deflated._layers.length; i++) { // not the optimal solution, but couldn't find the way to empty deflated
              try{ // because array not starts with 1,2,3
                deflated.removeLayer(deflated._layers[i])
                //console.log('forr ',i)
              }catch(e){}
            }
            //sqlquery specified below to avoid interferance with SELECT after INSERT
            sqlQuery = "SELECT cartodb_id, the_geom, landuses, landusesemoji, audioavailable, areapolygon, lengthline, geometrystring, date, commentone, commentoneaudioavailable FROM lumblu"
            getGeoJSON()
            // location.reload();


          clicksRose = 0;
        }
      },2000)
      return clicksRose

      }
      if(clicksRose >= 10){ //this is to download the feature collection from the local storage
        // document.getElementById("Alert").style.fontSize = "40px";
        // document.getElementById('Alert').innerHTML = '<br>⌛'
        // document.getElementById("Alert").style.display = 'initial'
        // setTimeout(function(){
        console.log('buttons loaded')
        document.getElementById("map").style.height = "0px";
        // document.getElementById("divForButtons").style.display = 'initial'
        // document.getElementById("divForButtons").style.width = '100%'
        // document.getElementById("divForButtons").style.height = '100%'

        var divForButtons = document.createElement('div')
        document.body.appendChild(divForButtons)
        divForButtons.className = 'gridCellForImportExportButtons'


        buttonForHideAll = document.createElement("BUTTON");
        divForButtons.appendChild(buttonForHideAll);
        buttonForHideAll.className = 'hiddenButtons'
        buttonForHideAll.innerHTML = '<img src="images/arrowLeft.png" style="width:50px ; height:50px; border: 0px solid white" />';
        buttonForHideAll.style.borderColor = 'black'
        buttonForHideAll.style.gridColumn = '1'
        buttonForHideAll.style.gridRow = '4';

        buttonForDownloadTiles = document.createElement("BUTTON");
        divForButtons.appendChild(buttonForDownloadTiles);
        buttonForDownloadTiles.className = 'hiddenButtons'
        buttonForDownloadTiles.innerHTML = 'Store map tiles for offline use';
        buttonForDownloadTiles.style.borderColor = 'black'
        buttonForDownloadTiles.style.gridColumn = '2'
        buttonForDownloadTiles.style.gridRow = '4';

        buttonForExportGeometries = document.createElement("BUTTON");
        divForButtons.appendChild(buttonForExportGeometries);
        buttonForExportGeometries.className = 'hiddenButtons'
        buttonForExportGeometries.innerHTML = 'Download Contributions (geoJSON) to add in a GIS';
        buttonForExportGeometries.style.borderColor = 'black'
        buttonForExportGeometries.style.gridColumn = '1'
        buttonForExportGeometries.style.gridRow = '5';

        // buttonForExportGeometries = document.createElement("BUTTON");
        // divForButtons.appendChild(buttonForExportGeometries);
        // buttonForExportGeometries.className = 'hiddenButtons'
        // buttonForExportGeometries.innerHTML = 'Download Contributions (geoJSON)';
        // buttonForExportGeometries.style.borderColor = 'black'
        // buttonForExportGeometries.style.gridColumn = '1'
        // buttonForExportGeometries.style.gridRow = '5';

        buttonForImportGeometries = document.createElement("BUTTON");
        divForButtons.appendChild(buttonForImportGeometries);
        buttonForImportGeometries.className = 'hiddenButtons'
        buttonForImportGeometries.innerHTML = 'Import data: geoJSON or txt';
        buttonForImportGeometries.style.borderColor = 'black'
        buttonForImportGeometries.style.gridColumn = '2'
        buttonForImportGeometries.style.gridRow = '5';
        //
        // readfile = document.createElement("BUTTON");
        // divForButtons.appendChild(readfile);
        // readfile.className = 'hiddenButtons'
        // readfile.innerHTML = 'Import data to your map';
        // readfile.style.borderColor = 'black'
        // readfile.style.gridColumn = '2'
        // readfile.style.gridRow = '5';



      buttonForDownloadTiles.onclick = function(){
        clicksRose = 0;


        buttonForDownloadTiles.style.display = 'none'
        buttonForExportGeometries.style.display = 'none'
        buttonForImportGeometries.style.display = 'none'
        buttonForHideAll.style.display = 'none'
        divForButtons.style.display = 'none'
        document.getElementById("Alert").style.display = 'none'
                document.getElementById("map").style.height = "100%";

        // clicksRose = 0;
        offlineControlGoogle.addTo(map);
        offlineControlOSM.addTo(map);
        clicksRose = 0;
      }
      buttonForExportGeometries.onclick = function(){
        clicksRose = 0;

        buttonForExportGeometries.style.display = 'none'
        buttonForImportGeometries.style.display = 'none'
        buttonForHideAll.style.display = 'none'
        divForButtons.style.display = 'none'

        document.getElementById("map").style.height = "100%";

        document.getElementById("Alert").style.fontSize = "40px";
        document.getElementById('Alert').innerHTML = '<br>📥'
        document.getElementById("Alert").style.display = 'initial'
          setTimeout(function(){
            document.getElementById("Alert").style.display = 'none'
         },1000)
        clicksRose = 0;
        //here we convert the multiple features into a featureCollection ready to be used in a GIS (geojson). Simply adding string before and after
        var geojsonToString = JSON.stringify(groupGeoJSON)
        // var featureCollectionToExport = "{'type': 'FeatureCollection','features':"+ geojsonToString + '}'
        var featureCollectionToExport = '{"type": "FeatureCollection","features":'+ geojsonToString + '}'


        console.log(featureCollectionToExport)
        var dataToExport = 'data:text/json;charset=utf-8,' + encodeURIComponent(featureCollectionToExport);
        //console.log(convertedData)

        //to get the date and timeout
        var randomNumber = Math.random();
        randomNumber = randomNumber * 10000;
        var randomID = Math.round(randomNumber);
        //here the datetime
        var timeEnd = new Date();
        var date = timeEnd.getFullYear() + '-' + (timeEnd.getMonth() + 1) + '-' + timeEnd.getDate();
        var time = timeEnd.getHours() + ":" + timeEnd.getMinutes() + ":" + timeEnd.getSeconds();
        var dateTime = date + 'T' + time + 'Z';
        dateTimeRandomID = 'Exported ' + dateTime + ' RandomID:' + randomID;
        dateTimeRandomID.toString();


        var toDownloadGeoJSON = document.createElement('a');
        toDownloadGeoJSON.setAttribute('href', dataToExport);
        toDownloadGeoJSON.setAttribute('download', dateTimeRandomID+'.geojson');
        document.body.appendChild(toDownloadGeoJSON); // required for firefox
        toDownloadGeoJSON.click();
        toDownloadGeoJSON.remove();
      }

      buttonForImportGeometries.onclick = function(){
        clicksRose = 0;
        // buttonForImportGeometries.innerHTML = null
        choosefile = document.createElement("input");
        divForButtons.appendChild(choosefile);
        choosefile.type = 'file'
        choosefile.className="custom-file-input"
        choosefile.id="choosefile"
        // choosefile.accept = '.geojson' !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! and whatsapp!!!!!!!!!!!!!!!!!!!!!
        choosefile.style.gridColumn = '1'

        choosefile.style.gridRow = '6';
        choosefile.style.color = 'white'
        // choosefile.style.content = 'Click & browse'
        setTimeout(function(){
          choosefile.click()
        },300)

        const fileInput = document.getElementById('choosefile');
        fileInput.onchange = () => {
          const selectedFile = fileInput.files[0];
          console.log(selectedFile);
          // new FileReader object
          	let reader = new FileReader();
          	// event fired when file reading finished
          	reader.addEventListener('load', function(e) {
          	   // contents of the file
          	    let text = e.target.result; ///////////////////////////////////////////this is the imported file /////////////////
          	    // document.querySelector("#file-contents").textContent = text;
                console.log(text)
                // buttonForImportGeometries.disabled = true
                choosefile.style.color = 'black'
                processAndAddToMap = document.createElement("BUTTON");
                divForButtons.appendChild(processAndAddToMap);
                processAndAddToMap.className="hiddenButtons"
                processAndAddToMap.innerHTML = 'Add to map';
                processAndAddToMap.style.borderColor = 'green'
                processAndAddToMap.style.gridColumn = '2'
                processAndAddToMap.style.gridRow = '6';
          	});
          	// event fired when file reading failed
          	reader.addEventListener('error', function() {
          	    alert('Error : Failed to read file');
          	});
          	// read file as text file
          	reader.readAsText(selectedFile);
        }

      }

      buttonForHideAll.onclick = function(){
        clicksRose = 0;

        buttonForDownloadTiles.style.display = 'none'
        try{
          offlineControlGoogle.removeFrom(map);
          offlineControlOSM.removeFrom(map);
          buttonForImportGeometries.disabled = false
          choosefile.style.display = 'none'
          processAndAddToMap.style.display = 'none'

        }catch(e){}


        buttonForExportGeometries.style.display = 'none'
        buttonForImportGeometries.style.display = 'none'
        buttonForHideAll.style.display = 'none'
        divForButtons.style.display = 'none'

        document.getElementById("map").style.height = "100%";
      }
    }

      setTimeout(function(){ //this is to refresh click counts, so they don't accumulate
        clicksRose = 0;
      },20000)

  return clicksRose && sqlQuery
}
