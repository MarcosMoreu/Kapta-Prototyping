var emojioneareaeditor0 = document.getElementById('emojionearea')

emojioneareaeditor0.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("searchWocMap").click();
  }
});

var searchResult
document.getElementById('searchWocMap').onclick = function(e){

  try{
    map.removeLayer('test')
    map.removeSource('test')
  }catch(e){
    console.log('no layer to remove')
  }

  // setTimeout(function(){
  //   document.getElementById("bot").style.fontSize = "16px";
  //   document.getElementById("bot").style.color = 'white';
  //   document.getElementById('bot').innerHTML = '    Zoom to the area of interest'
  //   document.getElementById("bot").style.display = 'initial'
  // },200)
//   document.getElementById("bot").style.backgroundColor = '#888686'

// setTimeout(function(){
//   document.getElementById("bot").style.backgroundColor = '#616060'

// },100)


  console.log('searchresult', searchResult)
  var emojioneareaeditor0 = document.getElementById('emojionearea')
  checkTextbox = setInterval(function() {
    // console.log('checking text')
      if (emojioneareaeditor0.value.length == 0) {
        document.getElementById("imagesearchWocMap").src = 'images/arrowUp.png'
        // searchResult = 'nosearchyet'
      }
  },100)

// if(searchResult == 'nosearchyet'){
  /////////////////////////// THE QUERY ///////////////////////////////////////
  var datePeriodAgoReplaceComaInvert = '2010-1-1'
  var sapelliProjectIdentifier = '111'
  var boxContent = document.getElementById('emojionearea').value
  // var sqlQueryWithoutCondition = "SELECT geom, contributionid, areapolygon, lengthline, date, attribute1s, attribute2s, attribute3s, attribute11n, attribute12n, attribute13n, attribute14n, attribute15n FROM `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.gxdb_QMM_Madagascar` WHERE sapprojid='" +sapelliProjectIdentifier+ "' AND (attribute1s ";
  //
  // var sqlCondition =
  //  "LIKE '%" + boxContent +"%')" //exact value
  //
  //  +" AND (timestamp>'"+datePeriodAgoReplaceComaInvert +"')";
  // var sqlQuerySelect = sqlQueryWithoutCondition + sqlCondition

  // var sqlQuerySelect = "SELECT geom FROM `carto-demo-data.demo_tables.dataappeal_restaurants_and_cafes_berlin_cpg`"
  // var sqlQuerySelectEncoded = encodeURI(sqlQuerySelect)

  //   requestCartoData(sqlQuerySelectEncoded)
///////////////////////////////////////////////////////////////////////////////

  console.log(emojioneareaeditor0.value)
        if (boxContent.includes('give me')){
          console.log('give me query ') 
          // searchResult = 'data'
          // var sqlQuerySelect = "SELECT geom FROM `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_private` WHERE mainattribute='" +boxContent+ "'"
          // var sqlQuerySelectEncoded = encodeURI(sqlQuerySelect)
          let words = boxContent.split(" ");

          // Dynamically create the WHERE clause to include a LIKE condition for each word
          // let whereClauseParts = words.map(word => `mainattribute LIKE '%${word}%'`);
          let whereClauseParts = words.map(word => `mainattribute = '${word}'`);

          // Join the conditions with 'OR' to form the complete WHERE clause
          let whereClause = whereClauseParts.join(" OR ");

          // Construct the full SQL query using the dynamically created WHERE clause
          let sqlQuerySelect = `
          SELECT geom
          FROM \`carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_private\`
          WHERE ${whereClause}
          `;

            // Split the input text into an array of words
            // let words = boxContent.split(' ');

            // // Construct the WHERE clause with specificity in mind
            // let whereClause = words.map(word => `mainattribute LIKE '%${word}%'`).join(' OR ');

            // // Ensure the query is constructed correctly
            // let sqlQuery = `
            // SELECT geom 
            // FROM \`carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_private\`
            // WHERE ${whereClause};
            // `;

            // console.log(sqlQuery);
          
          var sqlQuerySelectEncoded = encodeURI(sqlQuerySelect)


            requestCartoData(sqlQuerySelectEncoded)
            document.getElementById("bot").style.fontSize = "16px";
            document.getElementById("bot").style.color = 'white';
            document.getElementById('bot').innerHTML = '    Searching...'
            document.getElementById("bot").style.display = 'initial'

            //the response in the chat in the responsecarto function success
          
        }else if(boxContent.includes('berlin') && boxContent.includes('cafes')){ //simulate data found
          console.log('berlin query ') 

          console.log('searchresult', searchResult)

          // document.getElementById("imagesearchWocMap").src = 'images/arrowRight.png'
          searchResult = 'data'
          var sqlQuerySelect = "SELECT geom FROM `carto-demo-data.demo_tables.dataappeal_restaurants_and_cafes_berlin_cpg`"
          var sqlQuerySelectEncoded = encodeURI(sqlQuerySelect)
        
            requestCartoData(sqlQuerySelectEncoded)
            
            document.getElementById("bot").style.fontSize = "16px";
            document.getElementById("bot").style.color = 'white';
            document.getElementById('bot').innerHTML = '    Searching...'
            document.getElementById("bot").style.display = 'initial'
            setTimeout(() => {
              document.getElementById("bot").style.fontSize = "16px";
              document.getElementById("bot").style.color = 'white';
              document.getElementById('bot').innerHTML = '    Do you want to download or query this ground data? (yes/no)'
              document.getElementById("bot").style.display = 'initial'
            }, 1000);

          // document.getElementById('seefullchat').style.display = 'initial'
        // }else if(boxContent.includes('testeo')){
        //   console.log('testeo query ') 

        //   console.log('searchresult', searchResult)

        //   searchResult = 'data'
        //   var sqlQuerySelect = "SELECT geom FROM `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_private` WHERE mainattribute = 'testeo'"
        //   var sqlQuerySelectEncoded = encodeURI(sqlQuerySelect)
        
        //     requestCartoData(sqlQuerySelectEncoded)
        //     document.getElementById("bot").style.fontSize = "16px";
        //     document.getElementById("bot").style.color = 'white';
        //     document.getElementById('bot').innerHTML = '    Searching...'
        //     document.getElementById("bot").style.display = 'initial'
        //     setTimeout(() => {
        //       document.getElementById("bot").style.fontSize = "16px";
        //       document.getElementById("bot").style.color = 'white';
        //       document.getElementById('bot').innerHTML = '    Do you want to download or query this ground data? (yes/no)'
        //       document.getElementById("bot").style.display = 'initial'
        //     }, 1000);
        }else if(boxContent.includes('please') && boxContent.includes('water')){
          console.log('water ethiopia query ') 

          // console.log('searchresult', searchResult)

          searchResult = 'data'
          var sqlQuerySelect = "SELECT geom FROM `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_private` WHERE mainattribute='water'"
          var sqlQuerySelectEncoded = encodeURI(sqlQuerySelect)
        
            requestCartoData(sqlQuerySelectEncoded)
            document.getElementById("bot").style.fontSize = "16px";
            document.getElementById("bot").style.color = 'white';
            document.getElementById('bot').innerHTML = '    Searching...'
            document.getElementById("bot").style.display = 'initial'
            setTimeout(() => {
              document.getElementById("bot").style.fontSize = "16px";
              document.getElementById("bot").style.color = 'white';
              document.getElementById('bot').innerHTML = '    Do you want to download or query this ground data? (yes/no)'
              document.getElementById("bot").style.display = 'initial'
            }, 1000);


        }else if(boxContent.includes('please') && boxContent.includes('villages')){
          console.log('villages ethiopia query ') 

          // console.log('searchresult', searchResult)

          searchResult = 'data'
          var sqlQuerySelect = "SELECT geom FROM `carto-dw-ac-745p52tn.private_marcos_moreu_a1ec85bf.wcl_private` WHERE mainattribute='villages'"
          var sqlQuerySelectEncoded = encodeURI(sqlQuerySelect)
        
            requestCartoData(sqlQuerySelectEncoded)
            document.getElementById("bot").style.fontSize = "16px";
            document.getElementById("bot").style.color = 'white';
            document.getElementById('bot').innerHTML = '    Searching...'
            document.getElementById("bot").style.display = 'initial'
            setTimeout(() => {
              document.getElementById("bot").style.fontSize = "16px";
              document.getElementById("bot").style.color = 'white';
              document.getElementById('bot').innerHTML = '    Do you want to download or query this ground data? (yes/no)'
              document.getElementById("bot").style.display = 'initial'
            }, 1000);


        }else if(boxContent == 'no' || boxContent == 'No'){ //simulate data found
            // console.log('searchresult', searchResult)
            console.log('no query ') 

          
            document.getElementById("bot").style.fontSize = "16px";
            document.getElementById("bot").style.color = 'white';
            document.getElementById('bot').innerHTML = '    Search more'
            document.getElementById("bot").style.display = 'initial'
          
          
          }else if(boxContent == 'yes' || boxContent == 'Yes'){
            console.log('searchresult', searchResult)
            if(searchResult == 'nodata'){  //zoom in 
              console.log('yes nodata query ') 
 
              document.getElementById('bot').innerHTML = '    Zoom in to the approaximate area of interest and click ⬆️ below'
              document.getElementById("bot").style.display = 'initial'

              searchResult = 'data_zoom'
            // }else if(searchResult == 'data_zoom'){//form to request data
            //   document.getElementById('initialscreen2options').style.display = 'initial'
            //   document.getElementById('formGobackbutton').style.display = 'initial'
            //   document.getElementById('submitrequestbutton').style.display = 'initial'
            //   document.getElementById('inputs').style.display = 'initial'

            //   document.getElementById('labelinput1').innerHTML = 'Name of the crowdsourcing campaign request'
            //   document.getElementById('labelinput2').innerHTML = 'Description of the campaign'
            //   document.getElementById('labelinput3').innerHTML = 'Budget (80% of the amount goes the local data collectors❗)'
            //   document.getElementById('labelinput4').innerHTML = 'Organisation'
            //   document.getElementById('labelinput5').innerHTML = 'Email address'

            //   document.getElementById('bot').style.display = 'none'
            //   document.getElementById('emojionearea').style.display = 'none'
            //   document.getElementById('askthemap').style.display = 'none'
            //   document.getElementById('dropDown').style.display = 'none'
            //   document.getElementById('languages').style.display = 'none'
            //   document.getElementById('kaptainitialscreen').style.display = 'none'
            //   document.getElementById('map').style.display = 'none'
            //   document.getElementById('searchWocMap').style.display = 'none'
            //   document.getElementById('backtohomepage').style.display = 'none'
              // boxContent = 'This is my area of interest'
 
            



          }else if(searchResult == 'data'){
            // }else if(searchResult == 'data_zoom'){//form to request data
              document.getElementById('initialscreen2options').style.display = 'initial'
              document.getElementById('formGobackbutton').style.display = 'initial'
              document.getElementById('submitrequestbutton').style.display = 'initial'
              document.getElementById('inputs').style.display = 'initial'
              document.getElementById('labelinput1').innerHTML = 'Name of the ground data request'
              document.getElementById('labelinput2').innerHTML = 'Description of the ground data use'
              document.getElementById('labelinput3').innerHTML = 'Donation (80% of the amount goes to the local data collectors❗)'
              document.getElementById('labelinput4').innerHTML = 'Organisation'
              document.getElementById('labelinput5').innerHTML = 'Email address'

              document.getElementById('bot').style.display = 'none'
              document.getElementById('emojionearea').style.display = 'none'
              document.getElementById('askthemap').style.display = 'none'
              document.getElementById('dropDown').style.display = 'none'
              document.getElementById('languages').style.display = 'none'
              document.getElementById('kaptainitialscreen').style.display = 'none'
              document.getElementById('map').style.display = 'none'
              document.getElementById('searchWocMap').style.display = 'none'
              document.getElementById('backtohomepage').style.display = 'none'
          }
          
        }else if(boxContent == '' && searchResult == 'data_zoom'){ //form to ACCESS data
          console.log('form access data after zoom')

          console.log('searchresult', searchResult)

          document.getElementById('initialscreen2options').style.display = 'initial'
          document.getElementById('formGobackbutton').style.display = 'initial'
          document.getElementById('submitrequestbutton').style.display = 'initial'
          document.getElementById('bot').innerHTML = '    Search'

          document.getElementById('inputs').style.display = 'initial'
          document.getElementById('labelinput1').innerHTML = 'Name of the crowdsourcing campaign request'
          document.getElementById('labelinput2').innerHTML = 'Description of the campaign'
          document.getElementById('labelinput3').innerHTML = 'Budget (80% of the amount goes the local data collectors❗)'
          document.getElementById('labelinput4').innerHTML = 'Organisation'
          document.getElementById('labelinput5').innerHTML = 'Email address'



          
          document.getElementById('bot').style.display = 'none'
          document.getElementById('emojionearea').style.display = 'none'
          document.getElementById('askthemap').style.display = 'none'
          document.getElementById('dropDown').style.display = 'none'
          document.getElementById('languages').style.display = 'none'
          document.getElementById('kaptainitialscreen').style.display = 'none'
          document.getElementById('map').style.display = 'none'
          document.getElementById('searchWocMap').style.display = 'none'
          document.getElementById('backtohomepage').style.display = 'none'
          // searchResult = 'nodata'
        
        }else{
          // document.getElementById("imagesearchWocMap").src = 'images/arrowRight.png'
          console.log('searchresult', searchResult)

          searchResult = 'nodata'
          document.getElementById("bot").style.fontSize = "16px";
          document.getElementById("bot").style.color = 'white';
          document.getElementById('bot').innerHTML = '    Searching...'
          document.getElementById("bot").style.display = 'initial'
          setTimeout(() => {
            document.getElementById("bot").style.fontSize = "16px";
            document.getElementById("bot").style.color = 'white';
            document.getElementById('bot').innerHTML = '    No data found. Do you want to launch a crowdsourcing campaign? (yes/no)'
            document.getElementById("bot").style.display = 'initial'
          }, 1000);

          // document.getElementById('seefullchat').style.display = 'initial'

        }
      
        var emojioneareaeditor0 = document.getElementById('emojionearea')
        emojioneareaeditor0.value = ''
        emojioneareaeditor0.placeholder = '...'

        return searchResult
      
    } 
// }else{



//     if(searchResult == 'data'){
//       console.log('searchresult second click', searchResult)
//       document.getElementById('initialscreen2options').style.display = 'initial'
//       document.getElementById('formGobackbutton').style.display = 'initial'
//       document.getElementById('submitrequestbutton').style.display = 'initial'
//       document.getElementById('inputs').style.display = 'initial'
//       document.getElementById('askthemap').style.display = 'none'
//       document.getElementById('dropDown').style.display = 'none'
//       document.getElementById('languages').style.display = 'none'
//       document.getElementById('kaptainitialscreen').style.display = 'none'

//     }else if(searchResult == 'nodata'){
//       console.log('searchresult second click', searchResult)

//         document.getElementById('initialscreen2options').style.display = 'initial'
//         document.getElementById('formGobackbutton').style.display = 'initial'
//         document.getElementById('submitrequestbutton').style.display = 'initial'
//         document.getElementById('inputs').style.display = 'initial'
//         document.getElementById('askthemap').style.display = 'none'
//         document.getElementById('dropDown').style.display = 'none'
//         document.getElementById('languages').style.display = 'none'
//         document.getElementById('kaptainitialscreen').style.display = 'none'
//       }
// }

// return searchResult



