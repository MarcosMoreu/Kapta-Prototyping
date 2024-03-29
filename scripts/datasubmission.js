
let toggleStates = {
    toggle1: false,
    toggle2: false,
    // toggle3: false
  };
  var lastscreen = false
  console.log('switch 1 position',  toggleStates.toggle1)
  console.log('switch 2 position',  toggleStates.toggle2)
  // console.log('switch 3 position',  toggleStates.toggle3)
  document.getElementById('confirmDataSubmision').disabled = true; // Initially disable the button
  document.getElementById('confirmDataSubmision').style.opacity = 0.4; // Set initial opacity to indicate disabled state visually
  
  // Function to update the button's enabled state and opacity based on switches
  function updateButtonState() {
      var isAnySwitchChecked = toggleStates.toggle1 || toggleStates.toggle2;
      var button = document.getElementById('confirmDataSubmision');
      button.disabled = !isAnySwitchChecked;
      button.style.opacity = isAnySwitchChecked ? "1" : "0.4"; // Adjust opacity based on switch state
  }
  
  // var toggleStates = { toggle1: false, toggle2: false }; // Initialize toggle states
  
  document.getElementById('switch1').addEventListener('change', function() {
      toggleStates.toggle1 = this.checked;
      console.log('switch 1 position', toggleStates.toggle1);
  
      if (toggleStates.toggle1 === true) {
          document.getElementById('switch2').checked = false;
          toggleStates.toggle2 = false;
      }
      updateButtonState(); // Update the button's state and opacity whenever a switch is toggled
  });
  
  document.getElementById('switch2').addEventListener('change', function() {
      toggleStates.toggle2 = this.checked;
      console.log('switch 2 position', toggleStates.toggle2);
  
      if (toggleStates.toggle2 === true) {
          document.getElementById('switch1').checked = false;
          toggleStates.toggle1 = false;
      }
      updateButtonState(); // Update the button's state and opacity whenever a switch is toggled
  });
  
  
  // document.getElementById('switch3').addEventListener('change', function() {
  //   toggleStates.toggle3 = this.checked;
  // });
  
  var postSuccess = function() {
    console.log('submitted succesfully')
  }


  var datasubmissiontype
  var submitToProxy = function(q) {
    $.post("./callProxy.php", { //
        qurl: q,
        // geojson:data,
        cache: false,
        timeStamp: new Date().getTime(),
        success:postSuccess()
    })
    .done(function() {
      console.log('submitted succesfully')
    })
    .fail(function() {
    //   var updatedgeojson = failgeoJSON.replace(/open/g, 'offlineOpen');
    //   setTimeout(function(){
    //     geoJSONLocalforageDB.setItem(failRandomID, updatedgeojson)
    //   },500)
    })
    .always(function() {
    });
};
  document.getElementById('confirmDataSubmision').onclick = function(){
    setTimeout(function(){

    // document.getElementById("gobackToMap").style.display = "none";
    document.getElementById("confirmDataSubmision").style.display = "none";
    document.getElementById('switches').style.display = "none";
    document.getElementById('kaptainitialscreen').style.display = "none";
    document.getElementById('moredatasovinfo').style.display = "none";

    document.getElementById('datasovmessage').style.display = 'none'


    //there are 8 possible combinations of the 3 switches (2 power 3 = 8)
    // toggle1 == true, toggle2 == false, toggle3 == false
    // toggle1 == false, toggle2 == true, toggle3 == false
    // toggle1 == false, toggle2 == false, toggle3 == true
  
    // toggle1 == true, toggle2 == true, toggle3 == false
    // toggle1 == false, toggle2 == true, toggle3 == true
    // toggle1 == true, toggle2 == false, toggle3 == true
  
    // toggle1 == true, toggle2 == true, toggle3 == true 
    // toggle1 == false, toggle2 == false, toggle3 == false 
  console.log("toggleStates.toggle1",toggleStates.toggle1)
  
    if(toggleStates.toggle1 == true && toggleStates.toggle2 == false){ 
      document.getElementById('progressContainer').style.display = 'initial'

      var randomNumber = Math.random();
      randomNumber = randomNumber * 10000000;
      var contributionid = Math.round(randomNumber)
      //1-get center of canvas to create a 1 point geoJSON
      //2-get radius using zoom level. It is just an estimate. For instance, if zoom level is 21, the radius is 15m; if z=20, r=xxx; if z=...
      //3-get name, phone number
      //3-submit  1 point geoJSON to OO DB


    //   /////////////ifelse to calculate radius in a simple way without requiring processing GIS operations
    //   if (currentZoom >= 21) {
    //     var radiusbuffer = 10;
    // } else if (currentZoom >= 1 && currentZoom <= 20) {
    //     // Calculate the multiplier based on the zoom level difference from 21
    //     var exponent = 21 - currentZoom;
    //     // Adjust the multiplier for zoom levels 11 to 20
    //     if (currentZoom >= 11) {
    //         exponent -= 1; // Adjust exponent because the sequence starts doubling at 20, not 21
    //     }
    //     // Calculate radiusbuffer based on the pattern identified, adjusting for the initial values at higher zoom levels
    //     var baseValue = currentZoom >= 11 ? 20 : 10;
    //     var radiusbuffer = baseValue * Math.pow(2, exponent);
    // }
    // console.log("radiusbuffer", radiusbuffer)
    // //   datasubmissiontype = 'obfuscated'
    //   function createCenterPointGeoJSON(map) {
    //     var center = map.getCenter(); 
    //     geojsonObfuscated = {
    //         "type": "Feature",
    //         "properties": {
    //             "contributionid": contributionid,
    //             "phone": phone,
    //             "timestamp": timestamp,
    //             "mainattribute": mainattribute,
    //             "attribute1s": attribute1s,
    //             "attribute1n": attribute1n,
    //             "datasov": 'obfuscated',   
    //             "totalcontrib": totalcontrib, 
    //             "radiusbuffer": radiusbuffer, 
    //         },
    //         "geometry": {
    //             "type": "Point",
    //             "coordinates": [center.lng, center.lat]
    //         }
    //     };

    //     return geojsonObfuscated
    //   }
    //   createCenterPointGeoJSON(map)
    //   console.log("geojsonObfuscated", geojsonObfuscated)
    //   console.log("geomstring", geojsonObfuscated.geometry)
    //   console.log("propcontrib", geojsonObfuscated.properties.contributionid)
    //   INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_obfusandopen` (geom, contributionid, phone, timestamp, mainattribute, attribute1s, attribute1n, datasov, totalcontrib, radiusbuffer) VALUES (ST_GeogFromGeoJSON('[object Object]',make_valid => true),'1230','null',CAST('2024-2-14T10:37:36Z' AS TIMESTAMP),'nameofthegroup','test',CAST('33' AS NUMERIC),'obuscates',CAST('1212123' AS INT64),CAST('222' AS INT64)

    
    // var sql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_obfusandopen` (geom, contributionid, phone, timestamp, mainattribute, attribute1s, attribute1n, datasov, totalcontrib, radiusbuffer) VALUES (ST_GeogFromGeoJSON('";
    //   var sql2 = geojsonObfuscated.geometry;
    //   var sql3 = "',make_valid => true),'"+contributionid+ "','" + phoneNumber + "',CAST('" +timestamp+"' AS TIMESTAMP),'" + mainattribute + "','" + attribute1s + "',CAST('" + attribute1n + "' AS NUMERIC),'" + datasov + "',CAST('"+ totalcontrib + "' AS INT64),CAST('" + radiusbuffer + "' AS INT64)";
    //   pURL = sql + sql2 + sql3;
    //   console.log(pURL)

    ///////// to insert the advertising point to the obfuscatedandopen DB
    // var sql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_obfusandopen` (geom, contributionid, phone, timestamp, mainattribute, attribute1s, attribute1n, datasov, totalcontrib, radiusbuffer) VALUES (ST_GeogFromGeoJSON('";
    // var geojsonString = JSON.stringify(geojsonObfuscated.geometry).replace(/'/g, "''"); // Serialize and escape single quotes
    // var sql2 = geojsonString;
    // var sql3 = "', make_valid => true),'" + contributionid + "','" + phone + "',CAST('" + timestamp + "' AS TIMESTAMP),'" + mainattribute + "','" + attribute1s + "',CAST('" + attribute1n + "' AS INT64),'" + datasov + "',CAST('" + totalcontrib + "' AS INT64),CAST('" + radiusbuffer + "' AS INT64))"; // Ensure closing parentheses
    // pURL = sql + sql2 + sql3;

        // console.log(pURL)
        // submitToProxy(pURL);
   
    ////////// to insert the actual data to the private DB 
  
    // setTimeout(function(){
      /////////////////////////////////////////////////////////////////////////////////////////
      // console.log("mapdata", mapdata)
      //   console.log("mapdata1", mapdata.features[0])
      //   console.log("mapdata1geom", mapdata.features[0].geometry)
      //   console.log("mapdata1propcontrib", mapdata.features[0].properties.contributionid)
      //   var baseSql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_private` (geom, contributionid, phone, timestamp, mainattribute, attribute1s, attribute1n, datasov, totalcontrib, radiusbuffer) VALUES ";
      //   var insertValues = [];
      //   // radiusbuffer = '0'
      //   // datasov = 'private'


      //   mapdata.features.forEach(feature => {
      //       var geojsonString = JSON.stringify(feature.geometry).replace(/'/g, "''"); // Serialize and escape single quotes
      //       var values = " (ST_GeogFromGeoJSON('" + geojsonString + "', make_valid => true),'" + feature.properties.contributionid + "','" + phone + "',CAST('" + timestamp + "' AS TIMESTAMP),'" + feature.properties.mainattribute + "','" + attribute1s + "',CAST('" + attribute1n + "' AS INT64),'" + datasov + "',CAST('" + feature.properties.totalcontrib + "' AS INT64),CAST('" + radiusbuffer + "' AS INT64))";
      //       insertValues.push(values);
      //   });

      //   var sql = baseSql + insertValues.join(',');

      //   console.log(sql);
        // submitToProxy(sql); 
        
        //////////////////////////////////////////////////////////////////////////////////////////////


      // }, 500)
      document.getElementById('progressContainer').style.display = 'initial'
      async function submitFeaturesOneByOne(mapdata) {
        const totalFeatures = mapdata.features.length;
        let progress = 0;
      
        // Function to update the progress bar
        // const updateProgressBar = (progress) => {
        //   const progressBar = document.getElementById('progressBar');
        //   progressBar.style.width = `${progress}%`;
        // };
      
        // // Hide progress container function
        // const hideProgressContainer = () => {
        //   const progressContainer = document.getElementById('progressContainer');
        //   // progressContainer.style.display = 'none';
        //   document.getElementById('shareYourImageMap').style.display = 'initial'
        //   document.getElementById('shareYourMapdata').style.display = 'initial'

        // };
        const updateProgressBar = (newProgress) => {
          requestAnimationFrame(() => {
            const progressBar = document.getElementById('progressBar');
            progressBar.style.width = `${newProgress}%`;
            progressBar.textContent = `${newProgress.toFixed(0)}%`; // Update text content for better user feedback

          });
        };
      
        // Hide progress container function
        const hideProgressContainer = () => {
          requestAnimationFrame(() => {
            const progressContainer = document.getElementById('progressContainer');
            progressContainer.style.display = 'none';
            document.getElementById('shareYourImageMap').style.display = 'initial'
            document.getElementById('shareYourMapdata').style.display = 'initial'
          });
        };
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        for (let i = 0; i < totalFeatures; i++) {
          const feature = mapdata.features[i];
          var baseSql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_private` (geom, contributionid, phone, timestamp, mainattribute, attribute1s, attribute1n, datasov, totalcontrib, radiusbuffer) VALUES ";
          const geojsonString = JSON.stringify(feature.geometry).replace(/'/g, "''"); // Serialize and escape single quotes
          // const values = ` (ST_GeogFromGeoJSON('${geojsonString}', make_valid => true),'${feature.properties.contributionid}','${phone}',CAST('${timestamp}' AS TIMESTAMP),'${feature.properties.mainattribute}','${attribute1s}',CAST('${attribute1n}' AS INT64),'${datasov}',CAST('${feature.properties.totalcontrib}' AS INT64),CAST('${radiusbuffer}' AS INT64))`;
          var values = " (ST_GeogFromGeoJSON('" + geojsonString + "', make_valid => true),'" + feature.properties.contributionid + "','" + phone + "',CAST('" + timestamp + "' AS TIMESTAMP),'" + topic + "','" + attribute1s + "',CAST('" + attribute1n + "' AS INT64),'" + datasov + "',CAST('" + feature.properties.totalcontrib + "' AS INT64),CAST('" + radiusbuffer + "' AS INT64))";

          const sql = baseSql + values;
      
          // Assuming submitToProxy is an async function or returns a Promise
          await submitToProxy(sql) // Handle errors or rejections        ////////////////////////!!!!!!!!!!!!
      
          // Update progress
          console.log('progress ', progress)
          progress = ((i + 1) / totalFeatures) * 100;
          updateProgressBar(progress);
          await new Promise(resolve => setTimeout(resolve, 0)); // Give time for UI to update
          await delay(100);
        }
      
        // Hide the progress bar once all features are submitted
        hideProgressContainer();
      }
      
      // Call the function with your mapdata
      submitFeaturesOneByOne(mapdata);
    }else if(toggleStates.toggle1 == false && toggleStates.toggle2 == true){
      document.getElementById('shareYourImageMap').style.display = 'initial'
      document.getElementById('shareYourMapdata').style.display = 'initial'
      //1-get phone number
      //2-submit all contributions to OO DB using  a for loop BUT DISABLE FOR NOW TO NOT SPEND CARTO CREDITS

      // datasubmissiontype = 'open'

        // console.log("mapdata", mapdata)
        // console.log("mapdata1", mapdata.features[0])
        // console.log("mapdata1geom", mapdata.features[0].geometry)
        // console.log("mapdata1propcontrib", mapdata.features[0].properties.contributionid)
        // attribute1s = 'hola'
        // radiusbuffer = '9090'

        // // Assuming mapdata is your FeatureCollection
        // // var mapdata; // Your GeoJSON FeatureCollection object

        // var baseSql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_obfusandopen` (geom, contributionid, phone, timestamp, mainattribute, attribute1s, attribute1n, datasov, totalcontrib, radiusbuffer) VALUES ";
        // var insertValues = [];

        // mapdata.features.forEach(feature => {
        //     var geojsonString = JSON.stringify(feature.geometry).replace(/'/g, "''"); // Serialize and escape single quotes
        //     var values = " (ST_GeogFromGeoJSON('" + geojsonString + "', make_valid => true),'" + contributionid + "','" + phone + "',CAST('" + timestamp + "' AS TIMESTAMP),'" + mainattribute + "','" + attribute1s + "',CAST('" + attribute1n + "' AS INT64),'" + datasov + "',CAST('" + totalcontrib + "' AS INT64),CAST('" + radiusbuffer + "' AS INT64))";
        //     insertValues.push(values);
        // });

        // var sql = baseSql + insertValues.join(',');

        // console.log(sql);
        // submitToProxy(sql);
      }  
    //   var sql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb_QMM_Madagascar` (geom, contributionid, phone, sapprojid, areapolygon, lengthline, distance, date, attribute1s, attribute2s, attribute3s, attribute4s, attribute5s, attribute6s, attribute7s, attribute8s, attribute9s, attribute10s, attribute11n, attribute12n, attribute13n, attribute14n, attribute15n, attribute16n, attribute17n, attribute18n, attribute19n, attribute20n, timestamp) VALUES (ST_GeogFromGeoJSON('";
    //   var sql2 = dataGeometryString;
    //   var sql3 = "',make_valid => true),'"+randomID+ "',CAST('" + phoneNumber + "' AS INT64),'" + sapelliProjectIdentifier + "',CAST('" + areaPolygonNumeric + "' AS NUMERIC),CAST('" + lengthLineNumeric + "' AS NUMERIC),CAST('" + dist_m_Participant + "' AS INT64),'" + dateTime +"','"+attribute1s+ "','" + attribute2s + "','" + attribute3s + "','" + attribute4s + "','" + attribute5s + "','" + attribute6s + "','" + attribute7s + "','" + attribute8s + "','"+attribute9s+ "','" + attribute10s + "',CAST('"+ attribute11n + "' AS INT64),CAST('" + attribute12n + "' AS INT64),CAST('" + attribute13n + "' AS INT64),CAST('" + attribute14n + "' AS INT64),CAST('" + attribute15n + "' AS INT64),CAST('" + attribute16n + "' AS INT64),CAST('" +attribute17n+ "' AS INT64),CAST('" + attribute18n + "' AS INT64),CAST('" + attribute19n + "' AS INT64),CAST('" + attribute20n + "' AS INT64),CAST('" +dateTime+"' AS TIMESTAMP))";
    //   pURL = sql + sql2 + sql3;
    //   console.(pURL)

    //     ////console.log(pURL)
    //     submitToProxy(pURL);
    //     //console.log("Feature has been submitted to the Proxy");

// //     }else if(toggleStates.toggle1 == false && toggleStates.toggle2 == false && toggleStates.toggle3 == true){
// //         //1- Download data to local storage
// //       //   datasubmissiontype = 'download'
// //       console.log('download')
// //       var geojsonToString = JSON.stringify(mapdata)
// //       var featureCollectionToExport = '{"type": "FeatureCollection","features":'+ geojsonToString + '}'
// //       var dataToExport = 'data:text/json;charset=utf-8,' + encodeURIComponent(featureCollectionToExport);
// //       var toDownloadGeoJSON = document.createElement('a');
// //       toDownloadGeoJSON.setAttribute('href', dataToExport);
// //       toDownloadGeoJSON.setAttribute('download', timestamp+'.geojson');
// //       document.body.appendChild(toDownloadGeoJSON); // required for firefox
// //       toDownloadGeoJSON.click();
// //       toDownloadGeoJSON.remove();
  
// //     }else if(toggleStates.toggle1 == true && toggleStates.toggle2 == true && toggleStates.toggle3 == false){
// //       //1-get center of canvas to create a 1 point geoJSON
// //       //2-get radius
// //       //3-get name, phone number
// //       //3-submit  1 point geoJSON to OO DB
// //       //4-get phone number
// //       //5-submit all contributions to OO DB using  a for loop

// //       console.log("geojsonObfuscated", geojsonObfuscated)
// //       console.log("mapdata", mapdata)
// //     //   datasubmissiontype = 'obfuscatedandopen'

// // ///////////////////////////////////////////       obfuscated and private     /////////////////////////////////////////////////
// // var randomNumber = Math.random();
// // randomNumber = randomNumber * 10000000;
// // var contributionid = Math.round(randomNumber)
// // //1-get center of canvas to create a 1 point geoJSON
// // //2-get radius using zoom level. It is just an estimate. For instance, if zoom level is 21, the radius is 15m; if z=20, r=xxx; if z=...
// // //3-get name, phone number
// // //3-submit  1 point geoJSON to OO DB


// // /////////////ifelse to calculate radius in a simple way without requiring processing GIS operations
// // if (currentZoom >= 21) {
// //   var radiusbuffer = 10;
// // } else if (currentZoom >= 1 && currentZoom <= 20) {
// //   // Calculate the multiplier based on the zoom level difference from 21
// //   var exponent = 21 - currentZoom;
// //   // Adjust the multiplier for zoom levels 11 to 20
// //   if (currentZoom >= 11) {
// //       exponent -= 1; // Adjust exponent because the sequence starts doubling at 20, not 21
// //   }
// //   // Calculate radiusbuffer based on the pattern identified, adjusting for the initial values at higher zoom levels
// //   var baseValue = currentZoom >= 11 ? 20 : 10;
// //   var radiusbuffer = baseValue * Math.pow(2, exponent);
// // }
// // console.log("radiusbuffer", radiusbuffer)
// // //   datasubmissiontype = 'obfuscated'
// // function createCenterPointGeoJSON(map) {
// //   var center = map.getCenter(); 
// //   geojsonObfuscated = {
// //       "type": "Feature",
// //       "properties": {
// //           "contributionid": contributionid,
// //           "phone": phone,
// //           "timestamp": timestamp,
// //           "mainattribute": mainattribute,
// //           "attribute1s": attribute1s,
// //           "attribute1n": attribute1n,
// //           "datasov": 'obfuscated',   
// //           "totalcontrib": totalcontrib, 
// //           "radiusbuffer": radiusbuffer, 
// //       },
// //       "geometry": {
// //           "type": "Point",
// //           "coordinates": [center.lng, center.lat]
// //       }
// //   };

// //   return geojsonObfuscated
// // }
// // createCenterPointGeoJSON(map)
// // console.log("geojsonObfuscated", geojsonObfuscated)
// // console.log("geomstring", geojsonObfuscated.geometry)
// // console.log("propcontrib", geojsonObfuscated.properties.contributionid)
// // //   INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_obfusandopen` (geom, contributionid, phone, timestamp, mainattribute, attribute1s, attribute1n, datasov, totalcontrib, radiusbuffer) VALUES (ST_GeogFromGeoJSON('[object Object]',make_valid => true),'1230','null',CAST('2024-2-14T10:37:36Z' AS TIMESTAMP),'nameofthegroup','test',CAST('33' AS NUMERIC),'obuscates',CAST('1212123' AS INT64),CAST('222' AS INT64)


// // // var sql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_obfusandopen` (geom, contributionid, phone, timestamp, mainattribute, attribute1s, attribute1n, datasov, totalcontrib, radiusbuffer) VALUES (ST_GeogFromGeoJSON('";
// // //   var sql2 = geojsonObfuscated.geometry;
// // //   var sql3 = "',make_valid => true),'"+contributionid+ "','" + phoneNumber + "',CAST('" +timestamp+"' AS TIMESTAMP),'" + mainattribute + "','" + attribute1s + "',CAST('" + attribute1n + "' AS NUMERIC),'" + datasov + "',CAST('"+ totalcontrib + "' AS INT64),CAST('" + radiusbuffer + "' AS INT64)";
// // //   pURL = sql + sql2 + sql3;
// // //   console.log(pURL)

// // ///////// to insert the advertising point to the obfuscatedandopen DB
// // var sql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_obfusandopen` (geom, contributionid, phone, timestamp, mainattribute, attribute1s, attribute1n, datasov, totalcontrib, radiusbuffer) VALUES (ST_GeogFromGeoJSON('";
// // var geojsonString = JSON.stringify(geojsonObfuscated.geometry).replace(/'/g, "''"); // Serialize and escape single quotes
// // var sql2 = geojsonString;
// // var sql3 = "', make_valid => true),'" + contributionid + "','" + phone + "',CAST('" + timestamp + "' AS TIMESTAMP),'" + mainattribute + "','" + attribute1s + "',CAST('" + attribute1n + "' AS INT64),'" + datasov + "',CAST('" + totalcontrib + "' AS INT64),CAST('" + radiusbuffer + "' AS INT64))"; // Ensure closing parentheses
// // pURL = sql + sql2 + sql3;

// //   // console.log(pURL)
// //   // submitToProxy(pURL);

// // ////////// to insert the actual data to the private DB 

// // setTimeout(function(){

// //   var baseSql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_private` (geom, contributionid, phone, timestamp, mainattribute, attribute1s, attribute1n, datasov, totalcontrib, radiusbuffer) VALUES ";
// //   var insertValues = [];
// //   radiusbuffer = '0'
// //   datasov = 'private'


// //   mapdata.features.forEach(feature => {
// //       var geojsonString = JSON.stringify(feature.geometry).replace(/'/g, "''"); // Serialize and escape single quotes
// //       var values = " (ST_GeogFromGeoJSON('" + geojsonString + "', make_valid => true),'" + contributionid + "','" + phone + "',CAST('" + timestamp + "' AS TIMESTAMP),'" + mainattribute + "','" + attribute1s + "',CAST('" + attribute1n + "' AS INT64),'" + datasov + "',CAST('" + totalcontrib + "' AS INT64),CAST('" + radiusbuffer + "' AS INT64))";
// //       insertValues.push(values);
// //   });

// //   var sql = baseSql + insertValues.join(',');

// //   // console.log(sql);
// //   // submitToProxy(sql);   
// // }, 500)


// ///////////////////////////////////////////////   open   //////////////////////////////////////////////////////////////////



//     }else if(toggleStates.toggle1 == false && toggleStates.toggle2 == true && toggleStates.toggle3 == true){
//       //1-get phone number
//       //2-submit all contributions to OO DB using  a for loop
//       //3- Download data to local storage
//     //   datasubmissiontype = 'openanddownload'


// ////////////////////////////////   open    /////////////////////////////////////////////////////////////
//           var baseSql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_obfusandopen` (geom, contributionid, phone, timestamp, mainattribute, attribute1s, attribute1n, datasov, totalcontrib, radiusbuffer) VALUES ";
//           var insertValues = [];

//           mapdata.features.forEach(feature => {
//               var geojsonString = JSON.stringify(feature.geometry).replace(/'/g, "''"); // Serialize and escape single quotes
//               var values = " (ST_GeogFromGeoJSON('" + geojsonString + "', make_valid => true),'" + contributionid + "','" + phone + "',CAST('" + timestamp + "' AS TIMESTAMP),'" + mainattribute + "','" + attribute1s + "',CAST('" + attribute1n + "' AS INT64),'" + datasov + "',CAST('" + totalcontrib + "' AS INT64),CAST('" + radiusbuffer + "' AS INT64))";
//               insertValues.push(values);
//           });

//           var sql = baseSql + insertValues.join(',');

//           console.log(sql);
//           submitToProxy(sql);
// ///////////////////////////////////////   download   //////////////////////////////////////////////////////
//           console.log('download')
//           var geojsonToString = JSON.stringify(mapdata)
//           var featureCollectionToExport = '{"type": "FeatureCollection","features":'+ geojsonToString + '}'
//           var dataToExport = 'data:text/json;charset=utf-8,' + encodeURIComponent(featureCollectionToExport);
//           var toDownloadGeoJSON = document.createElement('a');
//           toDownloadGeoJSON.setAttribute('href', dataToExport);
//           toDownloadGeoJSON.setAttribute('download', timestamp+'.geojson');
//           document.body.appendChild(toDownloadGeoJSON); // required for firefox
//           toDownloadGeoJSON.click();
//           toDownloadGeoJSON.remove();


//     }else if(toggleStates.toggle1 == true && toggleStates.toggle2 == false && toggleStates.toggle3 == true){
//       //1-get center of canvas to create a 1 point geoJSON
//       //2-get radius
//       //3-get name, phone number
//       //3-submit  1 point geoJSON to OO DB
//       //4-Download data to local storage
//     //   datasubmissiontype = 'obfuscatedanddownload'

  
// ///////////////////////////////////////   download   //////////////////////////////////////////////////////
//         console.log('download')
//         var geojsonToString = JSON.stringify(mapdata)
//         var featureCollectionToExport = '{"type": "FeatureCollection","features":'+ geojsonToString + '}'
//         var dataToExport = 'data:text/json;charset=utf-8,' + encodeURIComponent(featureCollectionToExport);
//         var toDownloadGeoJSON = document.createElement('a');
//         toDownloadGeoJSON.setAttribute('href', dataToExport);
//         toDownloadGeoJSON.setAttribute('download', timestamp+'.geojson');
//         document.body.appendChild(toDownloadGeoJSON); // required for firefox
//         toDownloadGeoJSON.click();
//         toDownloadGeoJSON.remove();


//     }else if(toggleStates.toggle1 == true && toggleStates.toggle2 == true && toggleStates.toggle3 == true){
//       //1-get center of canvas to create a 1 point geoJSON
//       //2-get radius
//       //3-get name, phone number
//       //3-submit  1 point geoJSON to OO DB
//       //4-get phone number
//       //5-submit all contributions to OO DB using  a for loop
//       //6- Download data to local storage
//     //   datasubmissiontype = 'obfuscatedopenanddownload'

//     }else { // this for all false
  
//     }
  
  lastscreen = true
  return lastscreen && pURL
    },200)
  }
  
  document.getElementById('shareYourImageMap').onclick = function(){
    setTimeout(function(){

  var statsDesktop = 'use a phone to share screenshot'
  if(navigator.canShare && navigator.canShare({ files: filesArrayScreenshot })){
        console.log(filesArrayScreenshot)
  
        navigator.share({
          files:filesArrayScreenshot, //////////////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          text: stats
          // url:'https://md.kapta.app/?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z',
        }).then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
  
    }else{
      try{
        navigator.share({
          // files:filesArray, //////////////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          text: stats,
          // url:'https://md.kapta.app/?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z',
        }).then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }catch(e){
        // console.log(url)
        navigator.clipboard.writeText(statsDesktop).then(function() {
          // console.log(url)
  
          alert("Copied to clipboard!");
        }, function() {
          alert("Unable to copy");
        });
      }
  
    }
    },200)
  console.log(filesArrayScreenshot)
  }

  document.getElementById('shareYourMapdata').onclick = function(){
    setTimeout(function(){

        var geojsonToString = JSON.stringify(mapdata)
        var featureCollectionToExport = '{"type": "FeatureCollection","features":'+ geojsonToString + '}'
        var dataToExport = 'data:text/json;charset=utf-8,' + encodeURIComponent(featureCollectionToExport);
        var toDownloadGeoJSON = document.createElement('a');
        toDownloadGeoJSON.setAttribute('href', dataToExport);
        toDownloadGeoJSON.setAttribute('download', nameOfTheGroup+' '+timestamp+'.geojson');
        document.body.appendChild(toDownloadGeoJSON); // required for firefox
        toDownloadGeoJSON.click();
        toDownloadGeoJSON.remove();
      // var geojsonToString = JSON.stringify(mapdata)
      // var featureCollectionToExport = '{"type": "FeatureCollection","features":'+ geojsonToString + '}'
     // Create a Blob from the JSON string
    //  var blob = new Blob([JSON.stringify(mapdata)], {type: 'application/json'});
    //  var file = new File([blob], "mapdata.geojson", {type: blob.type});
    // //  var file = new File([testBlob],nameFile, {type: testBlob.type });
    //  mapdataarray = [file];
    //  console.log(mapdataarray)
    //  // Verify if the Web Share API supports sharing files
    //  if (navigator.canShare && navigator.canShare({ files: mapdataarray })) {
    //      navigator.share({
    //          files: mapdataarray,
    //          text: 'Here is the exported feature collection.'
             
    //      }).then(() => console.log('Share was successful.'))
    //      .catch((error) => console.log('Sharing failed', error));
    //  } else {
    //      console.log('Web Share API is not supported in this browser, or the file sharing is not supported.');
    //  }

        // if (navigator.canShare) {
        //   const share = async function(shareimg, shareurl, sharetitle, sharetext) {
        //     try {
        //       const response = await fetch(shareimg);
        //       const blob = new Blob([JSON.stringify(featureCollectionToExport)], {type: 'application/json'});
        //       const file = new File([blob], 'rick.jpg', {type: blob.type});
        
        //       await navigator.share({
        //         // url: shareurl,
        //         title: 'title',
        //         // text: sharetext,
        //         files: [file]
        //       });
        //     } catch (err) {
        //       console.log(err.name, err.message);
        //     }
        //   };
        
        // }
    // var statsDesktop = 'use a phone to share screenshot'
    // if(navigator.canShare && navigator.canShare({ files: filesArrayScreenshot })){
    //       console.log('sshare file')
    
    //       navigator.share({
    //         files:dataToExport, //////////////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //         text: stats
    //         // url:'https://md.kapta.app/?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z',
    //       }).then(() => console.log('Successful share'))
    //         .catch((error) => console.log('Error sharing', error));
    
    //   }else{
    //     try{
    //       navigator.share({
    //         // files:filesArray, //////////////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //         // text: stats,
    //         // url:'https://md.kapta.app/?'+convertedDataShareDirect+'/#'+ urlLatX + ',' + urlLngX + ',' + urlZoomX + 'z',
    //       }).then(() => console.log('Successful share'))
    //         .catch((error) => console.log('Error sharing', error));
    //     }catch(e){
    //       // console.log(url)
    //       navigator.clipboard.writeText(statsDesktop).then(function() {
    //         // console.log(url)
    
    //         alert("Copied to clipboard!");
    //       }, function() {
    //         alert("Unable to copy");
    //       });
    //     }
    
    //   }
    
    console.log(filesArrayScreenshot)
    },200)
    }
  