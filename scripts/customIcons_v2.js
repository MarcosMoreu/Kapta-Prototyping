var projectsCreated = false
var sapProjectFirstTime = true
var newProjectButton
var cell
//variable to identify the screen to be used with back button
var screenChoice
var askHelpOrIHelp

//variable to populate the popup
var landUse = 'emojiNoSapelli' //if the sapelli project is completed, then the value changes and the string is treated differently in sharedownload.js

var imageName1
var imageName2
var imageName3
var landUse = null
var evaluation = null
var landownership = null
var malefemale = null
var croptype = null
var ett = null
var sapelliProjectIdentifier = 'nyangatom' //this variable is need to put the sap project identifier in the geojson
// var isMARAorMAU

// console.log('url', url)
// var urlContainsHashCustomised = url.includes('#Customised')

//to return to the map
document.getElementById('customIconsMap').onclick = function(e){

  var emojioneareaeditor = document.getElementsByClassName('emojionearea-editor')
  var emojioneareaeditor0 = emojioneareaeditor[0]

  if(filterIsOn == false){
    document.getElementById('customIconsMap').style.display = 'none';
    document.getElementById('customIconsCancel').style.display = 'none';
    document.getElementById('customIconsGoBack').style.display = 'none';

    // document.getElementById("map").style.bottom = '0px'
    document.getElementById("map").style.height = "100%";
    map.invalidateSize(); // doesn't seem to do anything

    document.getElementById("Cancel").style.display = "initial";
    document.getElementById("sapelliProjects").style.display = "initial";
    document.getElementById('emoji').style.display = 'initial';
    document.getElementById('showAreaAcres').style.display = 'initial';
    // document.getElementById('share-download').style.display = 'initial';
    if(screenChoice == 'sapprojectsscreen'){
      landUse = 'emojiNoSapelli'
      // document.getElementById('share-download').style.opacity = '0.5'

    }
    if(landUse != 'emojiNoSapelli'){
      document.getElementById("Cancel").style.opacity = '0'
      document.getElementById("sapelliProjects").style.opacity = '0'
      document.getElementById('emoji').style.opacity = '0'
      document.getElementById('share-download').style.display = 'none';

      setTimeout(function(){
        document.getElementById("Cancel").style.opacity = '1'
        document.getElementById("sapelliProjects").style.opacity = '1'
        document.getElementById('emoji').style.opacity = '1'
        // document.getElementById('share-download').style.opacity = '1'
      },2000)

      //here we have: Always landUse, sometime croptype and sometimes evaluation. so four scenarios
      //and 1, 2 or 3 images

      if(evaluation == null && croptype == null){
        emojioneareaeditor0.innerHTML =  landUse + ' ▪️ ' + emojioneareaeditor0.innerHTML
      }else if(evaluation != null && croptype == null){
        emojioneareaeditor0.innerHTML =  landUse + ' ▪️ ' + evaluation +  ' ▪️ ' + emojioneareaeditor0.innerHTML
      }else if(evaluation == null && croptype != null){
        emojioneareaeditor0.innerHTML =  landUse + ' ▪️ ' + croptype +  ' ▪️ ' + emojioneareaeditor0.innerHTML
      }else if(evaluation != null && croptype != null){
        emojioneareaeditor0.innerHTML =  landUse + ' ▪️ ' + croptype + ' ▪️ ' + evaluation +  ' ▪️ ' + emojioneareaeditor0.innerHTML
      }

    }
  }else if(filterIsOn == true){
    document.getElementById("map").style.height = "100%";
    document.getElementById("filterWithIcons").style.display = 'initial'
    document.getElementById("filterByDate").style.display = 'initial'
    document.getElementById("clearFilter").style.display = 'none'
    document.getElementById("applyFilter").style.display = 'initial'
    document.getElementById('emoji').style.display = 'initial';


    document.getElementById('customIconsMap').style.display = 'none';
    if(landUse != 'emojiNoSapelli'){
      setTimeout(function(){
        emojioneareaeditor0.innerHTML = landUse
        // emojioneareaeditor0.focus()

      },500)
    }
    return landUse
  }

}


document.getElementById('customIconsCancel').onclick = function(e){
  hideAll()
  screenChoice == 'landUse'
  imageName1 = null
  imageName2 = null
  // document.getElementById('customIconsGoBack').style.display = 'initial'
  document.getElementById('customIconsCancel').style.display = 'none';
  generateButtonslandUse()

  // if(isMARAorMAU == 'mara'){
  //   iconMARA.style.display = 'initial'
  //   iconMARA.click()
  //   screenChoice == 'landUses'
  // }else if(isMARAorMAU == 'mau'){
  //   iconMAU.style.display = 'initial'
  //   iconMAU.click()
  //   screenChoice == 'landUses'
  // }

  landUse = null
  evaluation = null
  landownership = null
  malefemale = null
  croptype = null
  ett = null
  // croptype = 'emojiNoSapelli'
  // evaluation = 'emojiNoSapelli'
  return  landUse && evaluation && screenChoice && imageName1 && imageName2 && landownership && malefemale && ett && croptype
}
document.getElementById('customIconsGoBack').onclick = function(e){
      imageName1 = null
      imageName2 = null
      imageName3 = null
      console.log('screenChoice',screenChoice)

    // if(screenChoice == 'ismaraormau'){
    //   document.getElementById('customIconsGoBack').style.display = 'none'
    //   iconMARA.style.display = 'none'
    //   iconMAU.style.display = 'none'
    //
    //   newProjectButton.style.display = 'initial'
    //   // newProjectButton2.style.display = 'initial'
    //
    // }

  if(screenChoice == 'initial'){
      hideAll()
      newProjectButton.style.display = 'initial'
      newProjectButton2.style.display = 'initial'
      console.log('initial')
      document.getElementById('customIconsGoBack').style.display = 'none'
      document.getElementById('customIconsMap').style.display = 'initial';

      screenChoice = 'sapprojectsscreen'

  }
  if(screenChoice == 'evaluation'){
    document.getElementById('customIconsCancel').style.display = 'none'
      hideAll()
      generateButtonslandUse()
  }
  if(screenChoice == 'croptype'){
      hideAll()
      document.getElementById('customIconsCancel').style.display = 'none'
      screenChoice = 'landUse'
      generateButtonslandUse()
  }
  if(screenChoice == 'ett'){
      hideAll()
      document.getElementById('customIconsCancel').style.display = 'none'
      screenChoice = 'landUse'
      generateButtonslandUse()
  }
  if(screenChoice == 'malefemale'){
      hideAll()
      document.getElementById('customIconsCancel').style.display = 'none'
      screenChoice = 'landUse'
      generateButtonslandUse()
  }
  if(screenChoice == 'landownership'){
      hideAll()
      document.getElementById('customIconsCancel').style.display = 'none'
      screenChoice = 'landUse'
      generateButtonslandUse()
  }
  return screenChoice && imageName1 && imageName2 && imageName3
}

function hideAll(){
  document.querySelectorAll('.buttonsSapelli').forEach(function(el) {
   el.style.display = 'none';

  });
}
function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  // document.map.scrollTop = 0
}
var totalPreloaded = 0
// var preloadedCompleted
function preload(arrayOfImages) {
  $(arrayOfImages).each(function(){
      try{
          $('<img/>')[0].src = this;
          totalPreloaded = totalPreloaded+1

          // console.log(totalPreloaded)
      }catch(e){
        //console.log('image failed to preload')
      }
  });
  return totalPreloaded
}

var isSapelliProjectLoaded
var cell
var newProjectButton
// var newProjectButton2
// var newProjectButton3
// var newProjectButton4
// var newProjectButton5

var screenwidth = screen.width +'px'
// var newProjectButton
//excites Logo in the map: to open the sapelli project
document.getElementById('sapelliProjects').onclick = function(e){
  landUse = 'emojiNoSapelli'
  preload([
    'images/logoNyangatomReduced.png','images/omoIcons/unknownOther.png',

  ])
  setTimeout(function(){




  isSapelliProjectLoaded = localStorage.getItem('sapelliProjectAccessed')
  console.log(isSapelliProjectLoaded)
  document.getElementById("map").style.height = "0px";
  document.getElementById('MapLoading').style.display = 'none'
  document.getElementById("Cancel").style.display = "none";
  document.getElementById("sapelliProjects").style.display = "none";
  document.getElementById('emoji').style.display = 'none';
  document.getElementById('myRange').style.display = 'none'; //to remove slidebar in case button clicked with planet imagery
  document.getElementById("Alert").style.display = 'none'
  // document.getElementById('showAreaHa').style.display = 'none';
  document.getElementById('showAreaAcres').style.display = 'none';
  document.getElementById('share-download').style.display = 'none';
  document.body.style.background = 'black';

  if(filterIsOn == true){
   document.getElementById('customIconsMap').style.background = '#00FFFB'
   document.getElementById('customIconsMap').style.borderColor = '#00FFFB'

  }else{
    document.getElementById('customIconsMap').style.background = 'grey'
    document.getElementById('customIconsMap').style.borderColor = 'grey'

  }
  document.getElementById("customIconsGoBack").style.display = 'none'
  document.getElementById("filterWithIcons").style.display = 'none'
  document.getElementById("filterByDate").style.display = 'none'
  document.getElementById("clearFilter").style.display = 'none'
  document.getElementById("applyFilter").style.display = 'none'
  document.getElementById('emoji').style.display = 'none';
  // document.getElementById('customIconsMap').style.display = 'none';
  document.getElementById('customIconsMap').style.display = 'initial';


    if(projectsCreated == false){
      projectsCreated = true

        cell = document.createElement('div')
        document.body.appendChild(cell)
        cell.className = 'gridCell'

        newProjectButton = document.createElement("BUTTON");
        cell.appendChild(newProjectButton);
        newProjectButton.className = 'sapelliProjectsLogo'
        newProjectButton.innerHTML = '<img src="images/logoNyangatomReduced.png" style="width:50px ; height:50px; border: 0px solid white" />';
        newProjectButton.style.gridColumn = '1'
        newProjectButton.style.gridRow = '1';
        hideAll() // to prevent grid showing together with sapelli project icons


        // newProjectButton.style.left = '50%'
        // cell.style.overflow = 'scroll'

        newProjectButton2 = document.createElement("BUTTON");
        cell.appendChild(newProjectButton2);
        newProjectButton2.className = 'sapelliProjectsLogo'
        newProjectButton2.innerHTML = '<img src="images/omoIcons/unknownOther.png" style="width:50px ;  height:50px; border: 0px solid white" />';
        // newProjectButton2.style.marginTop = '100px'
        newProjectButton2.style.gridColumn = '2'
        newProjectButton2.style.gridRow = '1'
        // newProjectButton2.style.opacity = '0.5'

        // newProjectButton.style.left = '50%'

         newProjectButton2.onclick = function(){
           newProjectButton2.innerHTML = '<img src="images/underConstruction.png" style="width:50px ; height:50px; border: 0px solid white" />';
           setTimeout(function(){
             newProjectButton2.innerHTML = '<img src="images/omoIcons/unknownOther.png" style="width:50px ; height:50px; border: 0px solid white" />';

           },1000)
         }


        preload([

          'images/omoIcons/banana.png','images/omoIcons/boatCrossing.png','images/omoIcons/cattleGrazing.png','images/omoIcons/church.png','images/omoIcons/eldersHut.png','images/omoIcons/fishing.png',
          'images/omoIcons/floodRecessionFlat.png','images/omoIcons/floodRecessionSteep.png','images/omoIcons/goatSheepGrazing.png','images/omoIcons/healthStation.png','images/omoIcons/hotSpring.png','images/omoIcons/hunting.png',
          'images/omoIcons/hutVillage.png','images/omoIcons/irrigationPump.png','images/omoIcons/kraal.png','images/omoIcons/lakeRecession.png','images/omoIcons/maize.png',
          'images/omoIcons/manualPump.png','images/omoIcons/medicinalPlants.png','images/omoIcons/noFarming.png','images/omoIcons/pondFarming.png','images/omoIcons/Questionmark.png','images/omoIcons/recreationCenter.png',
          'images/omoIcons/reehive.png','images/omoIcons/saltlick.png','images/omoIcons/school.png','images/omoIcons/sorghum.png','images/omoIcons/ThumbsUp.png','images/omoIcons/ThumbsDown.png',
          'images/omoIcons/timber.png','images/omoIcons/treeForGathering.png','images/omoIcons/unknownOther.png','images/omoIcons/veterinary.png','images/omoIcons/waterPoint.png','images/omoIcons/waterPondAnimal.png',
          'images/omoIcons/waterRiverAnimal.png','images/omoIcons/wildFruits.png',"images/omoIcons/pathTrack.png",
        ]);

  }
  else{



    //FUCK, the grid doesn't need to be hidden!!!
    // cell.style.display = 'initial'

    //this is to ensure that the two buttons are well located. Not the best solution but ....
    newProjectButton.style.display = 'initial';
    newProjectButton2.style.display = 'initial'

    hideAll() // to prevent grid showing together with sapelli project icons

    // newProjectButton.style.left = '50px'
    // newProjectButton2.style.display = 'initial';
    // newProjectButton2.style.left = '100px'

    // newProjectButton2.click()
    // document.getElementById('customIconsGoBack').click()

    // newProjectButton3.style.display = 'initial';
    // newProjectButton4.style.display = 'initial';
    // newProjectButton5.style.display = 'initial';



    // cell.style.overflow = 'scroll'
  }

// // to show the icons of the project selected
  newProjectButton.onclick = function(){

    // newProjectButton3.style.display = 'none';
    // newProjectButton4.style.display = 'none';
    // newProjectButton5.style.display = 'none';

    // cell.style.overflow =
        if(isSapelliProjectLoaded != 'true'){
          console.log('sapelli project clickeeeeeeeeeeeeeeed isSapelliProjectLoaded != true')


          newProjectButton.innerHTML = '<img src="images/checkingPw.gif" style="width:50px ; height:50px; border: 0px solid white" />';
          newProjectButton.disabled = true
              var checkingIfPreloadCompleted = setInterval(function(){
                // console.log('checkingifpreload...')
                if(totalPreloaded > 30){
                  document.getElementById("Alert").style.display = 'none'
                  localStorage.setItem('sapelliProjectAccessed', true);
                  document.getElementById('customIconsMap').style.display = 'initial';
                  // sapProjectFirstTime = false
                  newProjectButton.style.display = 'none';
                  newProjectButton2.style.display = 'none';

                  // newProjectButton2.style.display = 'none';
                  generateButtonslandUse()
                  newProjectButton.innerHTML = '<img src="images/logoNyangatomReduced.png" style="width:50px ; height:50px; border: 0px solid white" />';
                  newProjectButton.disabled = false
                  newProjectButton.style.backgroundColor = 'white'
                  newProjectButton.style.borderColor = 'white'
                  clearInterval(checkingIfPreloadCompleted)
                  document.getElementById('customIconsGoBack').style.display = 'initial'




                }else{
                  document.getElementById("Alert").style.fontSize = "15px";
                  document.getElementById('Alert').innerHTML = '</br> </br> </br> </br> </br> </br> </br> </br> </br> </br>Loading icons for the first time. </br>Next time, icons will load immediately'
                  document.getElementById("Alert").style.display = 'initial'
                }
              },500)

        }else{

            newProjectButton.style.display = 'none';
            newProjectButton2.style.display = 'none';
            console.log('sapelli project clickeeeeeeeeeeeeeeed sapbuttonsalreadygenerated == false')
            cell.setAttribute("style","overflow-y:scroll");
            document.getElementById('customIconsGoBack').style.display = 'initial'
            generateButtonslandUse()


        }

    }
  },400)
  return projectsCreated && sapProjectFirstTime && newProjectButton && cell 
}

var  iconOMO,iconOMO_8,iconOMO_9,iconOMO_10,iconOMO_11,iconOMO_12,iconOMO_13,iconOMO_14,iconOMO_15,iconOMO_16,iconOMO_17,iconOMO_18,iconOMO_19,iconOMO_20,iconOMO_21,iconOMO_22,iconOMO_22,iconOMO_23,iconOMO_24,iconOMO_25,iconOMO_26,
icon27,iconOMO_28,iconOMO_29,iconOMO_30,iconOMO_31,iconOMO_32,iconOMO_33,iconOMO_34,iconOMO_35,iconOMO_36,iconOMO_41,

iconCT1,iconCT2, iconCT3, iconCT4, iconE1,iconE2, iconE3




////////////////////////////////////////             mainS MARA       ///////////////////////////////

var generateButtonslandUse = function(){

  screenChoice = 'initial'

 iconOMO_8 = document.createElement("BUTTON"); ////////the house
  cell.appendChild(iconOMO_8);
 iconOMO_8.className = 'buttonsSapelli'
 iconOMO_8.innerHTML = '<img src="images/omoIcons/Shelter.png" style="height: 150px; width: 150px; border: 4px solid colorPaletteArray[0];" /> </br>Village';
iconOMO_8.style.backgroundColor = 'white'
 iconOMO_8.onclick = function(){
   setTimeout(function(){
    hideAll()
    landUse = 'Shelter'
    imageName1 = 'Shelter'

    document.getElementById('customIconsMap').click()
    if(filterIsOn == false){
      setTimeout(function(){
        document.getElementById('share-download').click()
      },400)
    }

    console.log(landUse)

  },400)
  }

 iconOMO_10 = document.createElement("BUTTON"); ///// ETT
  cell.appendChild(iconOMO_10);
 iconOMO_10.className = 'buttonsSapelli'
 iconOMO_10.innerHTML = '<img src="images/omoIcons/ett.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ETT';
 iconOMO_10.style.backgroundColor = 'white'
 iconOMO_10.onclick = function(){
   setTimeout(function(){

    hideAll()
    landUse = 'ETT'
    imageName1 = 'ett'
    if(filterIsOn == false){
      generateButtonsETT()
       document.getElementById('customIconsGoBack').style.display = 'initial';
       document.getElementById('customIconsMap').style.display = 'none';

       // document.getElementById('customIconsCancel').style.display = 'initial';
     }else{
       document.getElementById('customIconsMap').click()
     }

  },400)

  }
 iconOMO_11 = document.createElement("BUTTON"); //////////field
  cell.appendChild(iconOMO_11);
 iconOMO_11.innerHTML = '<img src="images/omoIcons/champs.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>Champs';
 iconOMO_11.className = 'buttonsSapelli'
 iconOMO_11.style.backgroundColor = 'white'
 iconOMO_11.onclick = function(){
   setTimeout(function(){

    hideAll()
    landUse = 'champs'
    imageName1 = 'champs'
    if(filterIsOn == false){
      generateButtonsField()
       document.getElementById('customIconsGoBack').style.display = 'initial';
       document.getElementById('customIconsMap').style.display = 'none';

       // document.getElementById('customIconsCancel').style.display = 'initial';
     }else{
       document.getElementById('customIconsMap').click()
     }

  },400)

  }

 iconOMO_15 = document.createElement("BUTTON"); /////land ownership
  cell.appendChild(iconOMO_15);
 iconOMO_15.innerHTML = '<img src="images/omoIcons/regimefoncierchamps.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>Regime Foncier Champs';
 iconOMO_15.className = 'buttonsSapelli'
 iconOMO_15.style.backgroundColor = 'white'
 iconOMO_15.onclick = function(){
   setTimeout(function(){

    hideAll()
    landUse = 'regimefoncierchamps'
    imageName1 = 'regimefoncierchamps'
    if(filterIsOn == false){
      generateButtonsLandOwnership()
       document.getElementById('customIconsGoBack').style.display = 'initial';
       document.getElementById('customIconsMap').style.display = 'none';

       // document.getElementById('customIconsCancel').style.display = 'initial';
     }else{
       document.getElementById('customIconsMap').click()
     }

  },400)
  }

 iconOMO_38 = document.createElement("BUTTON"); //////male female
  cell.appendChild(iconOMO_38);
 iconOMO_38.innerHTML = '<img src="images/omoIcons/protection.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>Protection';
 iconOMO_38.className = 'buttonsSapelli'
 iconOMO_38.style.backgroundColor = 'white'
 iconOMO_38.onclick = function(){
   setTimeout(function(){

    hideAll()
    landUse = 'protection'
    imageName1 = 'protection'
    if(filterIsOn == false){
      generateButtonsMaleFemale()
       document.getElementById('customIconsGoBack').style.display = 'initial';
       document.getElementById('customIconsMap').style.display = 'none';

       // document.getElementById('customIconsCancel').style.display = 'initial';
     }else{
       document.getElementById('customIconsMap').click()
     }

  },400)
 }

  iconOMO_9 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_9);
  iconOMO_9.innerHTML = '<img src="images/omoIcons/unknownOther.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>Autre';
  iconOMO_9.className = 'buttonsSapelli'
  iconOMO_9.style.backgroundColor = 'white'
  iconOMO_9.onclick = function(){
    setTimeout(function(){
     hideAll()
     landUse = 'unknownOther'
     imageName1 = 'unknownOther'
     document.getElementById('share-download').click()

     document.getElementById('customIconsMap').click()
     if(filterIsOn == false){
       setTimeout(function(){
         console.log('sharedownload clicked')
         document.getElementById('share-download').click()
       },400)
     }

     console.log(landUse)

   },400)

   }

  return screenChoice && landUse && imageName1
}

/////////////////////////////////////////////////         EVALUATION           ///////////////////////////////////////
var generateButtonsETT = function(){
  scrollToTop()

  screenChoice = 'ett'

  iconCT1 = document.createElement("BUTTON");
  cell.appendChild(iconCT1);
  iconCT1.innerHTML = '<img src="images/omoIcons/pluiestorrentielles.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>Pluies Torrentielles';
  iconCT1.className = 'buttonsSapelli'
  iconCT1.onclick = function(){
    setTimeout(function(){

    hideAll()
    ett = 'pluiestorrentielles'
    imageName2 = 'pluiestorrentielles'

    generateScreenETTNumber()  /////////screen with 2 input text fields
  },400)

  }

  iconCT2 = document.createElement("BUTTON");
  cell.appendChild(iconCT2);
  iconCT2.className = 'buttonsSapelli'
  iconCT2.innerHTML = '<img src="images/omoIcons/ventsviolents.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>Vents Violents';
  iconCT2.onclick = function(){
    setTimeout(function(){

    hideAll()
    ett = 'ventsviolents'
    imageName2 = 'ventsviolents'

    generateScreenETTNumber()  /////////screen with 2 input text fields
  },400)

  }

  iconCT3 = document.createElement("BUTTON");
  cell.appendChild(iconCT3);
  iconCT3.className = 'buttonsSapelli'
  iconCT3.innerHTML = '<img src="images/omoIcons/inondations.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>Inondations';
  iconCT3.onclick = function(){
    setTimeout(function(){

    hideAll()
    ett = 'inondations'
    imageName2 = 'inondations'

    generateScreenETTNumber()  /////////screen with 2 input text fields
  },400)

  }

return screenChoice && ett && imageName2
}




var generateScreenETTNumber = function(){

console.log('ett number screen')
}





var generateButtonsField = function(){
  scrollToTop()

  screenChoice = 'croptype'



  iconCT2 = document.createElement("BUTTON");
  cell.appendChild(iconCT2);
  iconCT2.className = 'buttonsSapelli'
  iconCT2.innerHTML = '<img src="images/omoIcons/maize.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>maize';
  iconCT2.onclick = function(){
    setTimeout(function(){

    hideAll()
    croptype = 'maize'
    imageName2 = 'maize'

    generateButtonsEvaluation()
  },400)

  }

  iconCT3 = document.createElement("BUTTON");
  cell.appendChild(iconCT3);
  iconCT3.className = 'buttonsSapelli'
  iconCT3.innerHTML = '<img src="images/omoIcons/mangues.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>mangues';
  iconCT3.onclick = function(){
    setTimeout(function(){

    hideAll()
    croptype = 'mangues'
    imageName2 = 'mangues'

    generateButtonsEvaluation()
  },400)

  }

 return screenChoice && croptype && imageName2
}

var generateButtonsEvaluation = function(){
  scrollToTop()


  screenChoice = 'evaluation'

//other issues
  iconE2 = document.createElement("BUTTON");
  cell.appendChild(iconE2);
  iconE2.innerHTML = '<img src="images/omoIcons/ThumbsUp.png" style="height: 150px; width: 150px; border: 0px solid white" /> ';
  iconE2.className = 'buttonsSapelli'
  iconE2.onclick = function(){
    setTimeout(function(){

    hideAll()
    evaluation = '👍🏿'
    imageName3 = 'ThumbsUp'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },400)
  },400)

  }

  iconE3 = document.createElement("BUTTON");
  cell.appendChild(iconE3);
  iconE3.className = 'buttonsSapelli'
  iconE3.innerHTML = '<img src="images/omoIcons/ThumbsDown.png" style="height: 150px; width: 150px; border: 0px solid white" /> ';
  iconE3.onclick = function(){
    setTimeout(function(){

    hideAll()
    evaluation = '👎🏿'
    imageName3 = 'ThumbsDown'


    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },400)
  },400)
  }

    return screenChoice && evaluation && imageName2

}

var generateButtonsLandOwnership = function(){
  scrollToTop()


  screenChoice = 'landownership'

//other issues
  iconE2 = document.createElement("BUTTON");
  cell.appendChild(iconE2);
  iconE2.innerHTML = '<img src="images/omoIcons/proprietaire.png" style="height: 150px; width: 150px; border: 0px solid white" /></br>proprietaire ';
  iconE2.className = 'buttonsSapelli'
  iconE2.onclick = function(){
    setTimeout(function(){

    hideAll()
    landownership = 'proprietaire'
    imageName2 = 'proprietaire'

    generateScreenOwnershipNumber()  /////////screen with 1 input text field and hand icon, then triger camera automatically
  },400)

  }

  iconE3 = document.createElement("BUTTON");
  cell.appendChild(iconE3);
  iconE3.className = 'buttonsSapelli'
  iconE3.innerHTML = '<img src="images/omoIcons/location.png" style="height: 150px; width: 150px; border: 0px solid white" /></br>location ';
  iconE3.onclick = function(){
    setTimeout(function(){

    hideAll()
    landownership = 'location'
    imageName2 = 'location'

    generateScreenOwnershipNumber()  /////////screen with 1 input text field and hand icon, then triger camera automatically
  },400)
  }

    return screenChoice && landownership && imageName2

}

var generateButtonsMaleFemale = function(){

  scrollToTop()


  screenChoice = 'landownership'

//other issues
  iconE2 = document.createElement("BUTTON");
  cell.appendChild(iconE2);
  iconE2.innerHTML = '<img src="images/omoIcons/femmesnevontpas1.png" style="height: 150px; width: 150px; border: 0px solid white" /> ';
  iconE2.className = 'buttonsSapelli'
  iconE2.onclick = function(){
    setTimeout(function(){

    hideAll()
    malefemale = 'femmesnevontpas1'
    imageName2 = 'femmesnevontpas1'


    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },400)
  },400)


  }

  iconE3 = document.createElement("BUTTON");
  cell.appendChild(iconE3);
  iconE3.className = 'buttonsSapelli'
  iconE3.innerHTML = '<img src="images/omoIcons/hommesnevontpas1.png" style="height: 150px; width: 150px; border: 0px solid white" /> ';
  iconE3.onclick = function(){
    setTimeout(function(){

    hideAll()
    malefemale = 'hommesnevontpas1'
    imageName2 = 'hommesnevontpas1'


    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },400)
  },400)
  }

    return screenChoice && malefemale && imageName2
}
