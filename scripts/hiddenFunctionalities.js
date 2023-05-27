var clicksRose = 0

var divForButtons
var buttonForDownloadTiles
var buttonForExportGeometries
var buttonForImportGeometries
var buttonForHideAll
var choosefile
var readfile
var processAndAddToMap
var geometriesUploaded
var nameFileAdded
var buttonForDeleteAllGeom

document.getElementById('rose').onclick = function(e){
    clicksRose += 1;
    console.log(clicksRose)
    //this is to avoid zoom in with doubleClick if rose is clicked too quickly
    map.doubleClickZoom.disable();
    setTimeout(function(){
      map.doubleClickZoom.enable();

    },200)
    //console.log('deflated',deflated)
    var toRemoveDeflated = deflated._layers
    //console.log('toremovedeflated',toRemoveDeflated)
    if(clicksRose == 2 && map.getZoom()<=14){
      setTimeout(function(){ //we delay count 0 in case user want to download tiles. count to 0 after 10secs for next time user want to reload cartolayer
        if(clicksRose ==2){ //this is to check that the user actually want to click 5 times, not 10

        document.getElementById("Alert").style.fontSize = "30px";
        document.getElementById("Alert").style.textAlign = "center"
        document.getElementById('Alert').innerHTML = 'Zoom in'
        document.getElementById("Alert").style.display = 'initial'
        clicksRose = 0;
        setTimeout(function(){ //we delay count 0 in case user want to download tiles. count to 0 after 10secs for next time user want to reload cartolayer
          document.getElementById("Alert").style.display = 'none'

        },2000)
      }
    },1000)

    }
      if(clicksRose == 2 && map.getZoom()>10){ //this is to refresh the carto layer

        setTimeout(function(){ //we delay count 0 in case user want to download tiles. count to 0 after 10secs for next time user want to reload cartolayer
          if(clicksRose ==2){ //this is to check that the user actually want to click 5 times, not 10
            document.getElementById('rose').style.display = 'none'
            offlineControlGoogle.addTo(map);
        }
        clicksRose = 0;

      },1000)
      return clicksRose

      }
      if(clicksRose >= 10){ //this is to download the feature collection from the local storage

        //to prevent the custom screen top buttons to show... this is a patch
        document.getElementById('customIconsMap').style.display = 'none';
        document.getElementById('customIconsCancel').style.display = 'none';
        document.getElementById('customIconsGoBack').style.display = 'none';
        setTimeout(function(){ //this is to refresh click counts, so they don't accumulate
          clicksRose = 0;
        },20000)
        // document.getElementById("Alert").style.fontSize = "40px";
        // document.getElementById('Alert').innerHTML = '<br>⌛'
        // document.getElementById("Alert").style.display = 'initial'
        // setTimeout(function(){
        //console.('buttons loaded')
        document.getElementById("map").style.height = "0px";
        try{
          cell.style.display = 'none'
          // buttonSapelliNavigation.style.height = '0px'
        }catch(err){

        }
        // document.getElementById("divForButtons").style.display = 'initial'
        // document.getElementById("divForButtons").style.width = '100%'
        // document.getElementById("divForButtons").style.height = '100%'

          var divForButtons = document.createElement('div')
          document.body.appendChild(divForButtons)
          divForButtons.className = 'gridCellForImportExportButtons'
          // document.getElementsByClassName('gridCellForImportExportButtons').style.display = 'initial'



          buttonForHideAll = document.createElement("BUTTON");
          divForButtons.appendChild(buttonForHideAll);
          buttonForHideAll.className = 'hiddenButtons'
          buttonForHideAll.innerHTML = '<img src="images/arrowLeft.png" style="width:50px ; height:50px; border: 0px solid white" />';
          buttonForHideAll.style.borderColor = 'black'
          buttonForHideAll.style.gridColumn = '1'
          buttonForHideAll.style.gridRow = '3';

          buttonForDownloadTiles = document.createElement("BUTTON");
          divForButtons.appendChild(buttonForDownloadTiles);
          buttonForDownloadTiles.className = 'hiddenButtons'
          buttonForDownloadTiles.innerHTML = 'Store map tiles for offline use';
          buttonForDownloadTiles.style.borderColor = 'black'
          buttonForDownloadTiles.style.backgroundColor = 'yellow'
          buttonForDownloadTiles.style.gridColumn = '2'
          buttonForDownloadTiles.style.gridRow = '3';

          buttonForExportGeometries = document.createElement("BUTTON");
          divForButtons.appendChild(buttonForExportGeometries);
          buttonForExportGeometries.className = 'hiddenButtons'
          buttonForExportGeometries.innerHTML = 'Download Contributions (geoJSON) to add in a GIS';
          buttonForExportGeometries.style.borderColor = 'black'
          buttonForExportGeometries.style.backgroundColor = 'pink'
          buttonForExportGeometries.style.gridColumn = '1'
          buttonForExportGeometries.style.gridRow = '4';

          buttonForImportGeometries = document.createElement("BUTTON");
          divForButtons.appendChild(buttonForImportGeometries);
          buttonForImportGeometries.className = 'hiddenButtons'
          buttonForImportGeometries.innerHTML = 'Import data: geoJSON or txt';
          buttonForImportGeometries.style.borderColor = 'black'
          buttonForImportGeometries.style.backgroundColor = 'orange'
          buttonForImportGeometries.style.gridColumn = '2'
          buttonForImportGeometries.style.gridRow = '4';

          buttonForDeleteAllGeom = document.createElement("BUTTON");
          divForButtons.appendChild(buttonForDeleteAllGeom);
          buttonForDeleteAllGeom.className = 'hiddenButtons'
          buttonForDeleteAllGeom.innerHTML = 'Delete all geometries';
          buttonForDeleteAllGeom.style.borderColor = 'black'
          buttonForDeleteAllGeom.style.backgroundColor = 'red'
          buttonForDeleteAllGeom.style.gridColumn = '1'
          buttonForDeleteAllGeom.style.gridRow = '5';

//this is just to avoid that user clicks on button by mistake
          buttonForHideAll.disabled = true;
          setTimeout(function(){
            buttonForHideAll.disabled = false
          },500)
        //
        // readfile = document.createElement("BUTTON");
        // divForButtons.appendChild(readfile);
        // readfile.className = 'hiddenButtons'
        // readfile.innerHTML = 'Import data to your map';
        // readfile.style.borderColor = 'black'
        // readfile.style.gridColumn = '2'
        // readfile.style.gridRow = '5';

        buttonForHideAll.onclick = function(){
          clicksRose = 0;

          try{
            offlineControlGoogle.remove();
            offlineControlOSM.remove();
            buttonForImportGeometries.disabled = false
            choosefile.style.display = 'none'
            processAndAddToMap.style.display = 'none'
            nameFileAdded.style.display ='none'
          }catch(e){}
          try{
            cell.style.display = 'initial'
          }catch(err){}
          buttonForDownloadTiles.style.display = 'none'
          buttonForExportGeometries.style.display = 'none'
          buttonForImportGeometries.style.display = 'none'
          buttonForHideAll.style.display = 'none'
          divForButtons.style.display = 'none'

          document.getElementById("map").style.height = "100%";

        }

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
        // offlineControlOSM.addTo(map);
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


        //console.(featureCollectionToExport)
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


      buttonForDeleteAllGeom.onclick = function(){

        geoJSONLocalforageDB.clear()
        buttonForDeleteAllGeom.style.color = 'yellow'
        buttonForDeleteAllGeom.innerHTML = 'All geometries have been removed from the local storage'
        buttonForDeleteAllGeom.disabled = true
        buttonForExportGeometries.style.display = 'none'
        buttonForImportGeometries.style.display = 'none'
        buttonForHideAll.style.display = 'none'
        buttonForDownloadTiles.style.display = 'none'
        // buttonForDeleteAllGeom.style.display ='none'
        setTimeout(function(){
          location.reload()
        },2000)
      }

      buttonForImportGeometries.onclick = function(){
        clicksRose = 0;
        // buttonForImportGeometries.innerHTML = null
        choosefile = document.createElement("input");
        divForButtons.appendChild(choosefile);
        choosefile.type = 'file'
        choosefile.className="custom-file-input"
        choosefile.id="choosefile"
        choosefile.accept = '.geojson, .txt'// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! and whatsapp!!!!!!!!!!!!!!!!!!!!!
        choosefile.style.gridColumn = '1'

        choosefile.style.gridRow = '5';
        // choosefile.style.fontSize = 'px'
        choosefile.style.color = 'white'
        // choosefile.style.content = 'Click & browse'
        setTimeout(function(){
          choosefile.click()
          choosefile.remove() // to avoid error when cancel after opening (to not create the choose file button multiple times)
        },300)

        const fileInput = document.getElementById('choosefile');
        fileInput.onchange = () => {
          const selectedFile = fileInput.files[0];
          //console.(selectedFile);

          // new FileReader object
          	let reader = new FileReader();
          	// event fired when file reading finished
          	reader.addEventListener('load', function(e) {
          	   // contents of the file
          	    let text = this.result; ///////////////////////////////////////////this is the imported file /////////////////
          	    // document.querySelector("#file-contents").textContent = text;
                // console.log(text)
                // buttonForImportGeometries.disabled = true
                choosefile.style.color = 'black'
                processAndAddToMap = document.createElement("BUTTON");
                divForButtons.appendChild(processAndAddToMap);
                processAndAddToMap.className="hiddenButtons"
                processAndAddToMap.innerHTML = 'Add to map';
                processAndAddToMap.style.borderColor = 'blue'
                processAndAddToMap.style.color = 'blue'
                processAndAddToMap.style.backgroundColor = 'green'
                processAndAddToMap.style.gridColumn = '2'
                processAndAddToMap.style.gridRow = '5';

                nameFileAdded = document.createElement("text");
                divForButtons.appendChild(nameFileAdded);
                nameFileAdded.className="hiddenButtons"
                nameFileAdded.innerHTML = selectedFile.name
                nameFileAdded.style.fontSize = '10px';
                nameFileAdded.style.marginTop = '0px'
                nameFileAdded.style.color = 'blue'
                nameFileAdded.style.borderColor = 'white'
                nameFileAdded.style.backgroundColor = 'white'
                nameFileAdded.style.gridColumn = '2'
                nameFileAdded.style.gridRow = '6';

                processAndAddToMap.onclick = function(){

                  //1-take only urls, and put them in an array of objects
                  //2-keep only the encoded geojson in each array element (ie remove https...)
                  //3-decode each object
                  //4-create a feature collection with all the geojson (objects)
                  //5-assign this feature collection to 'text variable'

                  ////1-
                  // var mySubString = str.substring(
                  //   str.indexOf("?") + 1,
                  //   str.lastIndexOf("/")
                  // );



                //   var mySubString = str.substring(
                //   str.split('?').pop().split('/')[0] // returns 'two'
                // );

                // var str1 = str.replace('/?%','¬')
                // var str2 = str1.replace('D/#','_')
                // console.log(str2)
                // let sentences = str2.split(/[¬,_]/);


                // var arrStr = str.split(/[?#]/);
                //
                //   console.log('substring',arrStr)

                //First we detect if the input file is a geojson or needs processing (ie whatsapp exported txt file)
                var firstCharacterInput = text.charAt(0)
                var str = text
                if(firstCharacterInput != '{'){
                  var getFromBetween = {
                    results:[],
                    string:"",
                    getFromBetween:function (sub1,sub2) {
                        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
                        var SP = this.string.indexOf(sub1)+sub1.length;
                        var string1 = this.string.substr(0,SP);
                        var string2 = this.string.substr(SP);
                        var TP = string1.length + string2.indexOf(sub2);
                        return this.string.substring(SP,TP);
                    },
                    removeFromBetween:function (sub1,sub2) {
                        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
                        var removal = sub1+this.getFromBetween(sub1,sub2)+sub2;
                        this.string = this.string.replace(removal,"");
                    },
                    getAllResults:function (sub1,sub2) {
                        // first check to see if we do have both substrings
                        if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

                        // find one result
                        var result = this.getFromBetween(sub1,sub2);
                        // push it to the results array
                        this.results.push(result);
                        // remove the most recently found one from the string
                        this.removeFromBetween(sub1,sub2);

                        // if there's more substrings
                        if(this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
                            this.getAllResults(sub1,sub2);
                        }
                        else return;
                    },
                    get:function (string,sub1,sub2) {
                        this.results = [];
                        this.string = string;
                        this.getAllResults(sub1,sub2);
                        return this.results;
                    }
                  };
                  var result = getFromBetween.get(str,"?","/#");
                  // console.log(result);
                  // console.log('result 0',result[0])
                  // console.log('result 1',result[1])
                  var arrayGeojson = []
                  // console.log(result.length)
                  for(i = 0; i < result.length-1; i++ ){
                    //console.('i',i)

                    try{
                      var decodedGeojson = decodeURIComponent(result[i])
                      var geojson = JSON.parse(decodedGeojson)
                    }catch(e){
                      console.log('error',e)
                      console.log('error file',decodedGeojson)
                      //the error identified are:
                      //1-url too long >> nothing can be done except from limiting share interval
                      //2-URI malformed>> only with the ones shared by Lopodo
                      //3-
                    }
                    // console.log(geojson)
                    // console.log(decodedGeojson)

                    //apply this condition to avoid non geojson being added to the array (in case the ? # are included somewhere in the properties)
                    if (decodedGeojson[0] == '{' && decodedGeojson[1] == '"' && decodedGeojson[2] == 't') {
                      // console.log('decoded',decodedGeojson)
                       arrayGeojson.push(geojson)
                      // console.log('arrayGeojson',arrayGeojson)
                      // console.log('is a textgeojson')
                    }


                  }
                  // console.log('arrayGeojsonFINAL',arrayGeojson)
                  var arrayGeojsonToString = JSON.stringify(arrayGeojson)
                  // console.log('arrayGeojsonToString',arrayGeojsonToString)
                  // var featureCollectionToExport = "{'type': 'FeatureCollection','features':"+ geojsonToString + '}'
                  var featureCollectionToUpload = '{"type": "FeatureCollection","features":'+ arrayGeojsonToString + '}'
                  // console.log('featureCollection1',featureCollection1)
                  // var featureCollection2 = featureCollection1.replace(/\\/g, '')
                  // var featureCollection3 = featureCollection2.replace('["{','[{')
                  // var featureCollection4 = featureCollection3.replace('}"]','}]')
                  // var featureCollectionToUpload = featureCollection4.replace(']}}","',']}},')

                  //console.('featureCollectionToUpload',featureCollectionToUpload)
                  text = featureCollectionToUpload

                }

                ///////////////////////   function to read the input file and process and add to map
                // console.log('text',text)
                var toGeojson = JSON.parse(text)
                // console.log(toGeojson)

                var lengthGeojson = toGeojson.features.length
                // console.log('lengthgeojson',lengthGeojson)
                for(i = 0; i < lengthGeojson; i++){
                  var feature = toGeojson.features[i]
                  var featureStringified = JSON.stringify(feature)
                  geoJSONLocalforageDB.setItem(feature.properties.randomID, featureStringified)
                  // console.log(feature)

                  if(i == lengthGeojson -1){
                    buttonForExportGeometries.style.display = 'none'
                    buttonForImportGeometries.style.display = 'none'
                    buttonForHideAll.style.display = 'none'
                    buttonForDownloadTiles.style.display = 'none'
                    buttonForDeleteAllGeom.style.display ='none'
                    // divForButtons.style.display = 'none'

                    processAndAddToMap.disabled = true
                    processAndAddToMap.style.borderColor = 'green'
                    processAndAddToMap.style.backgroundColor = 'green'
                    processAndAddToMap.style.color = 'black'
                    processAndAddToMap.innerHTML = 'Adding, wait...'
                    setTimeout(function(){
                      location.reload()
                    },5000)

                    geometriesUploaded = true
                  }
                }

                }
          	});
          	// event fired when file reading failed
          	reader.addEventListener('error', function() {
          	    alert('Error : Failed to read file');
          	});
          	// read file as text file
          	reader.readAsText(selectedFile);
        }

      }

    }

  return clicksRose && geometriesUploaded
}
