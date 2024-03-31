
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

  console.log("toggleStates.toggle1",toggleStates.toggle1)
  
    if(toggleStates.toggle1 == true && toggleStates.toggle2 == false){ 
      document.getElementById('progressContainer').style.display = 'initial'

      var randomNumber = Math.random();
      randomNumber = randomNumber * 10000000;
      var contributionid = Math.round(randomNumber)
   
      document.getElementById('progressContainer').style.display = 'initial'
      async function submitFeaturesOneByOne(mapdata) {
        const totalFeatures = mapdata.features.length;
        let progress = 0;

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

      }  
  
  
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
         
    console.log(filesArrayScreenshot)
    },200)
    }
  