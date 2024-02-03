function displayFile(file) {

  document.getElementById('MapLoading').style.display = 'initial'


    const reader = new FileReader();

    reader.readAsText(file);

    reader.onloadend = function (e) {
    var filecontent = e.target.result;
    console.log('filecontent', filecontent);
    const regex = /(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)/g;
    let matches;
    const features = [];

    while ((matches = regex.exec(filecontent)) !== null) {
      const latitude = parseFloat(matches[1]);
      const longitude = parseFloat(matches[2]);

      features.push({
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [longitude, latitude]
        }
      });
    }

    const geoJson = {
      type: "FeatureCollection",
      features: features
    };

    console.log(JSON.stringify(geoJson));
    // setTimeout(function(){
      // document.getElementById('initialscreen2options').style.display = 'none'
      document.getElementById('startmapping').click()
      // setTimeout(function(){
        // L.geoJSON(geoJson).addTo(map);
        var whatsappgeojson = L.geoJSON(geoJson, {
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
            // onEachFeature: onEachFeatureConfirm,

        }).addTo(map);
        map.fitBounds(whatsappgeojson.getBounds());
        document.getElementById('MapLoading').style.display = 'none'

      // },2000)

      // },4000)


  };
    // var src = reader.src

    // const url = URL.createObjectURL(file);
    //
    // // reader.onload = () => {
    // //   // let text = this.result;
    // //   console.log('result',url)
    // //
    // //   // URL.revokeObjectURL(url);
    // // };
    // reader.src = url;
    // // document.body.append(reader);
    // console.log(reader.src)
    // console.log(reader)
    // console.log(file)


}

function displayMap(file){


  // const selectedFile = fileInput.files[0];
  //console.(selectedFile);

  // new FileReader object
    let reader = new FileReader();
    // event fired when file reading finished
    reader.addEventListener('load', function(e) {
       // contents of the file
        let text = this.result; ///////////////////////////////////////////this is the imported file /////////////////

        // processAndAddToMap.onclick = function(){
        //
        // //First we detect if the input file is a geojson or needs processing (ie whatsapp exported txt file)
        // var firstCharacterInput = text.charAt(0)
        // var str = text
        // if(firstCharacterInput != '{'){
        //   var getFromBetween = {
        //     results:[],
        //     string:"",
        //     getFromBetween:function (sub1,sub2) {
        //         if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        //         var SP = this.string.indexOf(sub1)+sub1.length;
        //         var string1 = this.string.substr(0,SP);
        //         var string2 = this.string.substr(SP);
        //         var TP = string1.length + string2.indexOf(sub2);
        //         return this.string.substring(SP,TP);
        //     },
        //     removeFromBetween:function (sub1,sub2) {
        //         if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        //         var removal = sub1+this.getFromBetween(sub1,sub2)+sub2;
        //         this.string = this.string.replace(removal,"");
        //     },
        //     getAllResults:function (sub1,sub2) {
        //         // first check to see if we do have both substrings
        //         if(this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;
        //
        //         // find one result
        //         var result = this.getFromBetween(sub1,sub2);
        //         // push it to the results array
        //         this.results.push(result);
        //         // remove the most recently found one from the string
        //         this.removeFromBetween(sub1,sub2);
        //
        //         // if there's more substrings
        //         if(this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
        //             this.getAllResults(sub1,sub2);
        //         }
        //         else return;
        //     },
        //     get:function (string,sub1,sub2) {
        //         this.results = [];
        //         this.string = string;
        //         this.getAllResults(sub1,sub2);
        //         return this.results;
        //     }
        //   };
        //   var result = getFromBetween.get(str,"?","/#");
        //   // console.log(result);
        //   // console.log('result 0',result[0])
        //   // console.log('result 1',result[1])
        //   var arrayGeojson = []
        //   // console.log(result.length)
        //   for(i = 0; i < result.length-1; i++ ){
        //     //console.('i',i)
        //
        //     try{
        //       var decodedGeojson = decodeURIComponent(result[i])
        //       var geojson = JSON.parse(decodedGeojson)
        //     }catch(e){
        //       console.log('error',e)
        //       console.log('error file',decodedGeojson)
        //       //the error identified are:
        //       //1-url too long >> nothing can be done except from limiting share interval
        //       //2-URI malformed>> only with the ones shared by Lopodo
        //       //3-
        //     }
        //     // console.log(geojson)
        //     // console.log(decodedGeojson)
        //
        //     //apply this condition to avoid non geojson being added to the array (in case the ? # are included somewhere in the properties)
        //     if (decodedGeojson[0] == '{' && decodedGeojson[1] == '"' && decodedGeojson[2] == 't') {
        //       // console.log('decoded',decodedGeojson)
        //        arrayGeojson.push(geojson)
        //       // console.log('arrayGeojson',arrayGeojson)
        //       // console.log('is a textgeojson')
        //     }
        //
        //
        //   }
        //   // console.log('arrayGeojsonFINAL',arrayGeojson)
        //   var arrayGeojsonToString = JSON.stringify(arrayGeojson)
        //   // console.log('arrayGeojsonToString',arrayGeojsonToString)
        //   // var featureCollectionToExport = "{'type': 'FeatureCollection','features':"+ geojsonToString + '}'
        //   var featureCollectionToUpload = '{"type": "FeatureCollection","features":'+ arrayGeojsonToString + '}'
        //   // console.log('featureCollection1',featureCollection1)
        //   // var featureCollection2 = featureCollection1.replace(/\\/g, '')
        //   // var featureCollection3 = featureCollection2.replace('["{','[{')
        //   // var featureCollection4 = featureCollection3.replace('}"]','}]')
        //   // var featureCollectionToUpload = featureCollection4.replace(']}}","',']}},')
        //
        //   //console.('featureCollectionToUpload',featureCollectionToUpload)
        //   text = featureCollectionToUpload
        //
        // }
        //
        // ///////////////////////   function to read the input file and process and add to map
        // // console.log('text',text)
        // var toGeojson = JSON.parse(text)
        // // console.log(toGeojson)
        //
        // var lengthGeojson = toGeojson.features.length
        // // console.log('lengthgeojson',lengthGeojson)
        // for(i = 0; i < lengthGeojson; i++){
        //   var feature = toGeojson.features[i]
        //   var featureStringified = JSON.stringify(feature)
        //   geoJSONLocalforageDB.setItem(feature.properties.randomID, featureStringified)
        //   // console.log(feature)
        //
        //   if(i == lengthGeojson -1){
        //     buttonForExportGeometries.style.display = 'none'
        //     buttonForImportGeometries.style.display = 'none'
        //     buttonForHideAll.style.display = 'none'
        //     buttonForDownloadTiles.style.display = 'none'
        //     buttonForDeleteAllGeom.style.display ='none'
        //     // divForButtons.style.display = 'none'
        //
        //     processAndAddToMap.disabled = true
        //     processAndAddToMap.style.borderColor = 'green'
        //     processAndAddToMap.style.backgroundColor = 'green'
        //     processAndAddToMap.style.color = 'black'
        //     processAndAddToMap.innerHTML = 'Adding, wait...'
        //     setTimeout(function(){
        //       location.reload()
        //     },5000)
        //
        //     geometriesUploaded = true
        //   }
        // }
        //
        // }
    });
    // event fired when file reading failed
    reader.addEventListener('error', function() {
        alert('Error : Failed to read file');
    });
    // read file as text file
    reader.readAsText(selectedFile);

}
