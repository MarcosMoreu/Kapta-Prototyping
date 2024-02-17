// var submitToProxy = function(q) {
//     $.post("./callProxy.php", { //
//         qurl: q,
//         // geojson:data,
//         cache: false,
//         timeStamp: new Date().getTime(),
//         success:postSuccess()
//     })
//     .done(function() {
//       console.log('submitted succesfully')

//     })
//     .fail(function() {
//     //   var updatedgeojson = failgeoJSON.replace(/open/g, 'offlineOpen');
//     //   setTimeout(function(){
//     //     geoJSONLocalforageDB.setItem(failRandomID, updatedgeojson)

//     //   },500)

//     })
//     .always(function() {

//     });
// };
// var pURL
// function setData() {
  
//       //TO INSERT THE CREATED FEATURE INTO THE CARTO DB
//         //console.(data)
//         if(datasubmissiontype == 'obfuscated' || datasubmissiontype == 'obfuscatedanddownload'){

//         }else if(datasubmissiontype == 'open' || datasubmissiontype == 'obfuscatedanddownload'){

//         }else if(datasubmissiontype == 'obfuscatedandopen' || datasubmissiontype == 'obfuscatedopenanddownload'){
        
//           var dataGeometry = data.geometry
//           //console.(dataGeometry)
//           var dataGeometryString = JSON.stringify(dataGeometry)
      
//           openOrPrivate = propertiesGeoJSON.openOrPrivate;
//           phoneNumber = propertiesGeoJSON.phoneNumber;
//           areaPolygon = propertiesGeoJSON.areaPolygon;
//           lengthLine = propertiesGeoJSON.lengthLine;
//           dateTime = propertiesGeoJSON.dateTime;
//           timeSpendSeconds = propertiesGeoJSON.timeSpendSeconds;
//           dist_m_Participant_Feature = propertiesGeoJSON.dist_m_Participant_Feature;
//           randomID = propertiesGeoJSON.randomID;
//           attribute1s = propertiesGeoJSON.Description
//           attribute1n = propertiesGeoJSON.Description2

//   try{ //to catch when value is empty
//     // attribute11n = attribute11nstring.match(numberRegex);
//     // attribute11n = attribute11n[0]
//   }catch(e){
//     // attribute11n = 0
//     // console.log(e)
//   }

//           /////////////////////////////////////////LOCAL STORAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE///////////////////////////////////////////////
//           // var commentAudioDefault = '.'
//           var sql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb_QMM_Madagascar` (geom, contributionid, phone, sapprojid, areapolygon, lengthline, distance, date, attribute1s, attribute2s, attribute3s, attribute4s, attribute5s, attribute6s, attribute7s, attribute8s, attribute9s, attribute10s, attribute11n, attribute12n, attribute13n, attribute14n, attribute15n, attribute16n, attribute17n, attribute18n, attribute19n, attribute20n, timestamp) VALUES (ST_GeogFromGeoJSON('";
//           var sql2 = dataGeometryString;
//   var sql3 = "',make_valid => true),'"+randomID+ "',CAST('" + phoneNumber + "' AS INT64),'" + sapelliProjectIdentifier + "',CAST('" + areaPolygonNumeric + "' AS NUMERIC),CAST('" + lengthLineNumeric + "' AS NUMERIC),CAST('" + dist_m_Participant + "' AS INT64),'" + dateTime +"','"+attribute1s+ "','" + attribute2s + "','" + attribute3s + "','" + attribute4s + "','" + attribute5s + "','" + attribute6s + "','" + attribute7s + "','" + attribute8s + "','"+attribute9s+ "','" + attribute10s + "',CAST('"+ attribute11n + "' AS INT64),CAST('" + attribute12n + "' AS INT64),CAST('" + attribute13n + "' AS INT64),CAST('" + attribute14n + "' AS INT64),CAST('" + attribute15n + "' AS INT64),CAST('" + attribute16n + "' AS INT64),CAST('" +attribute17n+ "' AS INT64),CAST('" + attribute18n + "' AS INT64),CAST('" + attribute19n + "' AS INT64),CAST('" + attribute20n + "' AS INT64),CAST('" +dateTime+"' AS TIMESTAMP))";
//           pURL = sql + sql2 + sql3;
//           //console.(pURL)
  
//       //////console.log(pURL)
//       submitToProxy(pURL);
//       ////console.log("Feature has been submitted to the Proxy");
//       return pURL
//   };