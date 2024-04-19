var topic
var goal
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
  // var checkinputtopic = setInterval(function(){
  //   console.log('checking input topic')
  //   var isAnySwitchChecked = toggleStates.toggle1 || toggleStates.toggle2;
  //   var button = document.getElementById('confirmDataSubmision');
  //   button.disabled = !isAnySwitchChecked;
  //   button.style.opacity = isAnySwitchChecked ? "1" : "0.4"; // Adjust opacity based on switch state

  //   if(document.getElementById('inputtopic').value == ''){
  //     document.getElementById('switch1').disabled = true
  //     document.getElementById('switch2').disabled = true
  //     button.disabled = true
  //     button.style.opacity = 0.4; 
  //   }else if(document.getElementById('inputgoal').value != '' && (toggleStates.toggle1 == false || toggleStates.toggle2 == false)){
  //     document.getElementById('switch1').disabled = false
  //     document.getElementById('switch2').disabled = false
  //     button.disabled = true
  //     button.style.opacity = 0.4; 
  //   }else if(document.getElementById('inputgoal').value != '' && (toggleStates.toggle1 == true || toggleStates.toggle2 == true)){
  //     document.getElementById('switch1').disabled = false
  //     document.getElementById('switch2').disabled = false
  //     button.disabled = false
  //     button.style.opacity = 1;
      
  //   }

  // },200)
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
      // console.log('submitted succesfully')
    })
    .fail(function() {

    })
    .always(function() {
    });
};
  document.getElementById('confirmDataSubmision').onclick = function(){
    // clearInterval(checkinputtopic)
    document.getElementById('shareYourImageMap').disabled = true
    document.getElementById('shareYourMapdata').disabled = true
    document.getElementById("confirmDataSubmision").style.backgroundColor = "grey";
    topic = document.getElementById("inputtopic").value
    goal = document.getElementById("inputgoal").value
    map.fitBounds(boundsLayer)

    setTimeout(function(){
      document.getElementById("confirmDataSubmision").style.backgroundColor = "white";

    // document.getElementById("gobackToMap").style.display = "none";
    document.getElementById("confirmDataSubmision").style.display = "none";
    document.getElementById('switches').style.display = "none";
    document.getElementById('kaptainitialscreen').style.display = "none";
    document.getElementById('moredatasovinfo').style.display = "none";
    document.getElementById("inputtopiclabel").style.display = "none";
    document.getElementById("inputgoallabel").style.display = "none";
    document.getElementById("inputtopic").style.display = "none";
    document.getElementById("inputgoal").style.display = "none";
    document.getElementById('gobackToMap').style.display = 'none'
    // document.getElementById('initialscreen2options').style.display = 'none'



    document.getElementById('datasovmessage').style.display = 'none'

  console.log("toggleStates.toggle1",toggleStates.toggle1)
  
    if(toggleStates.toggle1 == true && toggleStates.toggle2 == false){ 
      // document.getElementById('progressContainer').style.display = 'initial'
      document.getElementById('initialscreen2options').style.backgroundColor = 'transparent'


      var randomNumber = Math.random();
      randomNumber = randomNumber * 10000000;
      var contributionid = Math.round(randomNumber)
   
      // document.getElementById('progressContainer').style.display = 'initial'
      async function submitFeaturesOneByOne(mapdata) {
        const totalFeatures = mapdata.features.length;
        let progress = 0;

        // const updateProgressBar = (newProgress) => {
        //   requestAnimationFrame(() => {
        //     const progressBar = document.getElementById('progressBar');
        //     progressBar.style.width = `${newProgress}%`;
        //     progressBar.textContent = `${newProgress.toFixed(0)}%`; // Update text content for better user feedback

        //   });
        // };
      
        // // Hide progress container function
        // const hideProgressContainer = () => {
        //   requestAnimationFrame(() => {
        //     const progressContainer = document.getElementById('progressContainer');
        //     progressContainer.style.display = 'none';
        //     gpsButton.button.style.display = 'none'
        //     basemapButton.button.style.display = 'none'
        //     document.getElementById("gobackUploadmap").style.display = "none"
        //     document.getElementById("confirmuploadedmap").style.display = "none"
        //     document.getElementById("mapsummary").innerHTML = '</br>' + '<img src="images/icons/icon-72x72.png" text-align="center" alt="..." width=40px; height=40px style="top:50%; margin-left:-2px" >  ' + '<img src="images/WhatsAppicon.png" text-align="center" alt="..." width=30px; height=30px style="top:50%; margin-bottom:3px" > ' + '</br>' + topic + '</br> ' + goal + '</br> ' + totalcontribmap + ' 📍 ' + '</br>' + date
        //     document.getElementById("mapsummary").style.display = "initial"
        //     map.dragging.disable()
        //     map.touchZoom.disable();
        //     map.doubleClickZoom.disable();
        //     screenshot.click()
        //     // document.getElementById("chatmaploadinggif").innerHTML = 'cfdsafdsa'
        //     // document.getElementById("chatmaploadinggif").style.display = "initial"
      
        //     setTimeout(function(){
        //       document.getElementById("map").style.opacity = 1;
        //       document.getElementById('initialscreen2options').style.display = 'initial'
        //       document.getElementById('initialscreen2options').style.backgroundColor = 'transparent'
        //       document.getElementById('shareYourImageMap').style.display = 'initial'
        //       document.getElementById('shareYourMapdata').style.display = 'initial'
        //       document.getElementById('gobackToMap').style.display = 'initial'
      
        //     },200)
        //   });
        // };
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        //DB columns
        var contributionid;
        var mainattribute = document.getElementById('inputtopic').value
        var attribute1s = document.getElementById('inputgoal').value
        var attribute2n = 33 //for later for adding additional info
        var attribute3s = 'test' //for later for adding additional info
        var attribute4n = 33 //for later for adding additional info
        try{
          var username = localStorage.getItem('username')
          var phone = localStorage.getItem('phone')
        }catch(e){}
        //to ensure that the query doesn't fail due to 
        if(mainattribute == null){
          mainattribute = 'empty'
        }
        if(attribute1s == null){
          attribute1s = 'empty'
        }
        if(username == null){
          username = 'empty'
        }
        if(phone == null){
          phone = 00000
        }

        var baseSql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_private` (geom, contributionid, username, timestamp, mainattribute, attribute1s, attribute2n, attribute3s, attribute4n, phone) VALUES ";

        // Assuming 'features' is an array of feature objects you want to insert
        var features = mapdata.features;
        var valuesArray = features.map(feature => {
            const geojsonString = JSON.stringify(feature.geometry).replace(/'/g, "''"); // Serialize and escape single quotes
            return "(ST_GeogFromGeoJSON('" + geojsonString + "'),'" + 
                feature.properties.contributionid + "','" + 
                username + "',CAST('" + 
                feature.properties.timestamp + "' AS TIMESTAMP),'" + 
                mainattribute + "','" + 
                attribute1s + "',CAST('" + 
                attribute2n + "' AS INT64),'" + 
                attribute3s + "',CAST('" + 
                attribute4n + "' AS INT64),CAST('" + 
                phone + "' AS INT64))";
        });
        
        // Join all the values with commas and append to the base SQL
        var values = valuesArray.join(",");
        var sql = baseSql + values;
        
        // Now 'sql' contains the query to insert all features in one go
        console.log(sql);
        submitToProxy(sql)

        // for (let i = 0; i < totalFeatures; i++) {
        //   const feature = mapdata.features[i];
        //   var baseSql = "INSERT INTO `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_private` (geom, contributionid, phone, timestamp, mainattribute, attribute1s, attribute1n, datasov, totalcontrib, radiusbuffer) VALUES ";
        //   const geojsonString = JSON.stringify(feature.geometry).replace(/'/g, "''"); // Serialize and escape single quotes
        //   // const values = ` (ST_GeogFromGeoJSON('${geojsonString}', make_valid => true),'${feature.properties.contributionid}','${phone}',CAST('${timestamp}' AS TIMESTAMP),'${feature.properties.mainattribute}','${attribute1s}',CAST('${attribute1n}' AS INT64),'${datasov}',CAST('${feature.properties.totalcontrib}' AS INT64),CAST('${radiusbuffer}' AS INT64))`;
        //   var values = " (ST_GeogFromGeoJSON('" + geojsonString + "', make_valid => true),'" + feature.properties.contributionid + "','" + phone + "',CAST('" + timestamp + "' AS TIMESTAMP),'" + topic + "','" + goal + "',CAST('" + attribute1n + "' AS INT64),'" + datasov + "',CAST('" + feature.properties.totalcontrib + "' AS INT64),CAST('" + radiusbuffer + "' AS INT64))";

        //   const sql = baseSql + values;
      
        //   // Assuming submitToProxy is an async function or returns a Promise
        //   // await submitToProxy(sql) // Handle errors or rejections        ////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      
        //   // Update progress
        //   console.log('progress ', progress)
        //   progress = ((i + 1) / totalFeatures) * 100;
        //   updateProgressBar(progress);
        //   await new Promise(resolve => setTimeout(resolve, 0)); // Give time for UI to update
        //   await delay(100);
        // }
      
        // Hide the progress bar once all features are submitted
        // hideProgressContainer();
      }
      
      // Call the function with your mapdata
      submitFeaturesOneByOne(mapdata);
    }else if(toggleStates.toggle1 == false && toggleStates.toggle2 == true){

      gpsButton.button.style.display = 'none'
      basemapButton.button.style.display = 'none'
      document.getElementById("gobackUploadmap").style.display = "none"
      document.getElementById("confirmuploadedmap").style.display = "none"
      document.getElementById("mapsummary").innerHTML = '</br>' + '<img src="images/icons/icon-72x72.png" text-align="center" alt="..." width=40px; height=40px style="top:50%; margin-left:-2px" >  ' + '<img src="images/WhatsAppicon.png" text-align="center" alt="..." width=30px; height=30px style="top:50%; margin-bottom:3px" > ' + '</br>' + topic + '</br> ' + goal + '</br> ' + totalcontribmap + ' 📍 ' + '</br>' + date
      document.getElementById("mapsummary").style.display = "initial"
      map.dragging.disable()
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      screenshot.click()

      setTimeout(function(){
        document.getElementById("map").style.opacity = 1;
        document.getElementById('initialscreen2options').style.display = 'initial'
        document.getElementById('initialscreen2options').style.backgroundColor = 'transparent'
        setTimeout(function(){
          document.getElementById('shareYourImageMap').style.display = 'initial'
          document.getElementById('shareYourMapdata').style.display = 'initial'
          document.getElementById('gobackToMap').style.display = 'initial'
        },500)
        //in case the screenshot fails and then the buttons would remain disabled
        setTimeout(function(){
        document.getElementById('shareYourImageMap').disabled = false
        document.getElementById('shareYourMapdata').disabled = false
        },2000)
      },300)

      }  
  
  
  lastscreen = true
  return lastscreen && pURL
    },200)
  }
  
  document.getElementById('shareYourImageMap').onclick = function(){
    setTimeout(function(){

  var statsDesktop = 'use a phone to share screenshot'
  var hashtag = '#kapta'
  if(navigator.canShare && navigator.canShare({ files: filesArrayScreenshot })){
        console.log(filesArrayScreenshot)
  
        navigator.share({
          files:filesArrayScreenshot, //////////////////////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          title:'#kapta',
          text: hashtag,
          // url:'#kapta'
          url:'https://kapta.app'
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
  