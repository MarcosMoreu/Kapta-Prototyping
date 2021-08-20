var projectsCreated = false
var sapProjectFirstTime = true
var newProjectButton
var cell
//variable to identify the screen to be used with back button
var screenChoice
var askHelpOrIHelp

//variable to populate the popup
var landUse= 'emojiNoSapelli' //if the sapelli project is completed, then the value changes and the string is treated differently in sharedownload.js

var imageName1
var imageName2
var imageName3
var evaluation = null

var croptype = null
// var isMARAorMAU

// console.log('url', url)
// var urlContainsHashCustomised = url.includes('#Customised')

//to return to the map
document.getElementById('customIconsMap').onclick = function(e){

  document.getElementById('customIconsMap').style.display = 'none';
  document.getElementById('customIconsCancel').style.display = 'none';
  document.getElementById('customIconsGoBack').style.display = 'none';

  document.getElementById("map").style.height = "100%";
  document.getElementById("Cancel").style.display = "initial";
  document.getElementById("sapelliProjects").style.display = "initial";
  document.getElementById('emoji').style.display = 'initial';
  document.getElementById('showAreaAcres').style.display = 'initial';
  document.getElementById('share-download').style.display = 'initial';


  // cell.style.visibility = 'hidden'
  //FUCK, the grid doesn't need to be hidden!!!
  // cell.style.display = 'none'

  hideAll()
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
    var emojioneareaeditor = document.getElementsByClassName('emojionearea-editor')
  //  ////console.log(emojioneareaeditor)
    var emojioneareaeditor0 = emojioneareaeditor[0]
  //  ////console.log(emojioneareaeditor0)
    // emojioneareaeditor0.innerHTML =  crop + ' x ' + stage + ' x ' + landUse + ' x ' + askHelpOrIHelp + ' x ' + evaluation + ' x ' + evaluation
    // if(croptype == null){
    //   croptype = ''
    // }
    if(evaluation != null && croptype == null){
      emojioneareaeditor0.innerHTML =  landUse + ' </br>' + evaluation
    }else if(evaluation == null && croptype != null){
      emojioneareaeditor0.innerHTML =  landUse + ' </br>' + croptype
    }else if(evaluation != null && croptype != null){
      emojioneareaeditor0.innerHTML =  landUse + ' </br>' + croptype + evaluation
    }
  }
}


document.getElementById('customIconsCancel').onclick = function(e){
  hideAll()
  screenChoice == 'landUses'
  imageName1 = null
  imageName2 = null
  // document.getElementById('customIconsGoBack').style.display = 'initial'
  document.getElementById('customIconsCancel').style.display = 'none';
  generateButtonsLandUse()

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
  // croptype = 'emojiNoSapelli'
  evaluation = 'emojiNoSapelli'
  return  landUse && evaluation && screenChoice && imageName
}
document.getElementById('customIconsGoBack').onclick = function(e){
    // if(screenChoice == 'ismaraormau'){
    //   document.getElementById('customIconsGoBack').style.display = 'none'
    //   iconMARA.style.display = 'none'
    //   iconMAU.style.display = 'none'
    //
    //   newProjectButton.style.display = 'initial'
    //   // newProjectButton2.style.display = 'initial'
    //
    // }

  if(screenChoice == 'landUses'){
      hideAll()
      newProjectButton.style.display = 'initial'
      document.getElementById('customIconsGoBack').style.display = 'none'
      // iconMAU.style.display = 'initial'
      // screenChoice = 'ismaraormau'

  }
  if(screenChoice == 'evaluation'){
    document.getElementById('customIconsCancel').style.display = 'none'
    // document.getElementById('customIconsGoBack').style.display = 'none'

      hideAll()
      generateButtonsLandUse()

      // if(isMARAorMAU == 'mara'){
      //   iconMARA.style.display = 'initial'
      //   iconMARA.click()
      //   screenChoice == 'landUses'
      // }else if(isMARAorMAU == 'mau'){
      //   iconMAU.style.display = 'initial'
      //   iconMAU.click()
      //   screenChoice == 'landUses'
      // }
  }
  if(screenChoice == 'croptype'){
      hideAll()
      document.getElementById('customIconsCancel').style.display = 'none'
      // document.getElementById('customIconsGoBack').style.display = 'none'

      screenChoice = 'landUses'
      generateButtonsLandUse()

  }
  return screenChoice
}

function hideAll(){
  document.querySelectorAll('.buttonsSapelli').forEach(function(el) {
   el.style.display = 'none';

  });
}
function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
  preload([
    'images/logoNyangatomReduced.png',

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
        newProjectButton.innerHTML = '<img src="images/omoIcons/logoNyangatom.png" style="width:50px ; height:50px; border: 0px solid white" />';
        newProjectButton.style.gridColumn = '1'
        newProjectButton.style.gridRow = '1';

        // newProjectButton.style.left = '50%'
        // cell.style.overflow = 'scroll'

        // newProjectButton2 = document.createElement("BUTTON");
        // cell.appendChild(newProjectButton2);
        // newProjectButton2.className = 'sapelliProjectsLogo'
        // newProjectButton2.innerHTML = '<img src="images/KenyaEMC/logoKenyaEMC.png" style="width:50px ;  height:50px; border: 0px solid white" />';
        // // newProjectButton2.style.marginTop = '100px'
        // newProjectButton2.style.gridColumn = '2'
        // newProjectButton2.style.gridRow = '1'
        // // newProjectButton.style.left = '50%'
        //
        //  newProjectButton2.onclick = function(){
        //    newProjectButton2.innerHTML = '<img src="images/underConstruction.png" style="width:50px ; height:50px; border: 0px solid white" />';
        //    setTimeout(function(){
        //      newProjectButton2.innerHTML = '<img src="images/KenyaEMC/logoKenyaEMC.png" style="width:50px ; height:50px; border: 0px solid white" />';
        //
        //    },2000)
        //  }


        preload([

          'images/omoIcons/banana.png','images/omoIcons/boatCrossing.png','images/omoIcons/cattleGrazing.png','images/omoIcons/church.png','images/omoIcons/eldersHut.png','images/omoIcons/fishing.png',
          'images/omoIcons/floodRecessionFlat.png','images/omoIcons/floodRecessionSteep.png','images/omoIcons/goatSheepGrazing.png','images/omoIcons/healthStation.png','images/omoIcons/hotSpring.png','images/omoIcons/hunting.png',
          'images/omoIcons/hutVillage.png','images/omoIcons/irrigationPump.png','images/omoIcons/kraal.png','images/omoIcons/lakeFarming.png','images/omoIcons/maize.png',
          'images/omoIcons/manualPump.png','images/omoIcons/medicinalPlants.png','images/omoIcons/noFarming.png','images/omoIcons/pondFarming.png','images/omoIcons/Questionmark.png','images/omoIcons/recreationCenter.png',
          'images/omoIcons/reehive.png','images/omoIcons/saltlick.png','images/omoIcons/school.png','images/omoIcons/sorghum.png','images/omoIcons/ThumbsUp.png','images/omoIcons/ThumbsDown.png',
          'images/omoIcons/timber.png','images/omoIcons/treeForGathering.png','images/omoIcons/unknownOther.png','images/omoIcons/veterinary.png','images/omoIcons/waterPoint.png','images/omoIcons/waterpondAnimal.png',
          'images/omoIcons/waterRiverAnimal.png','images/omoIcons/wildFruits.png',
        ]);

  }
  else{



    //FUCK, the grid doesn't need to be hidden!!!
    // cell.style.display = 'initial'

    //this is to ensure that the two buttons are well located. Not the best solution but ....
    newProjectButton.style.display = 'initial';
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


          newProjectButton.innerHTML = '<img src="images/checkingPw.gif" style="width:50px ; height:50px; border: 0px solid white" />';
          newProjectButton.disabled = true
              var checkingIfPreloadCompleted = setInterval(function(){
                // console.log('checkingifpreload...')
                if(totalPreloaded > 300){
                  document.getElementById("Alert").style.display = 'none'
                  localStorage.setItem('sapelliProjectAccessed', true);
                  document.getElementById('customIconsMap').style.display = 'initial';
                  // sapProjectFirstTime = false
                  newProjectButton.style.display = 'none';
                  // newProjectButton2.style.display = 'none';
                  generateButtonsLandUse()
                  newProjectButton.innerHTML = '<img src="images/omoIcons/logoNyangatom.png" style="width:50px ; height:50px; border: 0px solid white" />';
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
          // setTimeout(function(){
          //   document.getElementById("Alert").style.display = 'none'
          // },10000)

          // $.getScript({
          //  cache:true,
          //   url:'scripts/sapelliProjects/Nigeria.js'
          // })


          // setTimeout(function(){
          //   newProjectButton.style.backgroundColor = '#39F70F'
          //   newProjectButton.style.borderColor = '#39F70F'
          // },7000)

          // setTimeout(function(){
          //   localStorage.setItem('sapelliProjectAccessed', true);
          //   document.getElementById('customIconsMap').style.display = 'initial';
          //
          //
          //   // sapProjectFirstTime = false
          //   newProjectButton.style.display = 'none';
          //   newProjectButton2.style.display = 'none';
          //
          //
          //   generateButtonsMaraORMau()
          //   newProjectButton.innerHTML = '<img src="images/omoIcons/logoMara.png" style="width:50px ; height:50px; border: 0px solid white" />';
          //   newProjectButton.disabled = false
          //   newProjectButton.style.backgroundColor = 'white'
          //   newProjectButton.style.borderColor = 'white'
          //
          // },10000)

        }else{
          // sapProjectFirstTime = false
          newProjectButton.style.display = 'none';
          // newProjectButton2.style.display = 'none';
          cell.setAttribute("style","overflow-y:scroll");
          document.getElementById('customIconsGoBack').style.display = 'initial'


          generateButtonsLandUse()
        }

    }
  },400)
  return projectsCreated && sapProjectFirstTime && newProjectButton && cell //&& newProjectButton2
}

var  iconOMO,iconOMO_8,iconOMO_9,iconOMO_10,iconOMO_11,iconOMO_12,iconOMO_13,iconOMO_14,iconOMO_15,iconOMO_16,iconOMO_17,iconOMO_18,iconOMO_19,iconOMO_20,iconOMO_21,iconOMO_22,iconOMO_22,iconOMO_23,iconOMO_24,iconOMO_25,iconOMO_26,
icon27,iconOMO_28,iconOMO_29,iconOMO_30,iconOMO_31,iconOMO_32,iconOMO_33,iconOMO_34,iconOMO_35,iconOMO_36,

iconCT1,iconCT2, iconCT3, iconCT4, iconE1,iconE2, iconE3

// var generateDivElementCell = function(){
//   cell = document.createElement("div");
//   document.body.appendChild(cell);
//   cell.className = 'gridCell'
//   return cell
// }

// var generateButtonsMaraORMau = function(){
//   screenChoice = 'ismaraormau'
//   iconOMO = document.createElement("BUTTON");
//   cell.appendChild(iconOMO);
//   iconOMO.className = 'buttonsSapelli'
//   iconOMO.style.backgroundColor = 'blue'
//   iconOMO.innerHTML = '<img src="images/omoIcons/logoMara.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>';
//   iconOMO.onclick = function(){
//     // isMARAorMAU = 'mara'
//     iconOMO.style.display = 'none'
//     // iconMAU.style.display = 'none'
//
//     // hideAll()
//     generateButtonslandUsesMARA()
//     document.getElementById('customIconsGoBack').style.display = 'initial';
//     // document.getElementById('customIconsCancel').style.display = 'initial';
//     // landUse = '🌿 Olakiroingai ▪️ Orange Leaf Croton'
//   }
//   // iconMAU = document.createElement("BUTTON");
//   // cell.appendChild(iconMAU);
//   // iconMAU.style.backgroundColor = 'green'
//   // iconMAU.innerHTML = '<img src="images/omoIcons/logoMau.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>';
//   // iconMAU.className = 'buttonsSapelli'
//   // iconMAU.onclick = function(){
//   //   isMARAorMAU = 'mau'
//   //   iconOMO.style.display = 'none'
//   //   iconMAU.style.display = 'none'
//   // generateButtonslandUsesMAU()
//   // document.getElementById('customIconsGoBack').style.display = 'initial';
//   // // document.getElementById('customIconsCancel').style.display = 'initial';
//   //   // landUse = '🌿 Olamuranya ▪️ Spike Thorn Bush'
//   //
//   // }
//  return isMARAorMAU && screenChoice
// }


////////////////////////////////////////             landUseS MARA       ///////////////////////////////

var generateButtonsLandUse = function(){

  screenChoice = 'landUses'

 iconOMO_8 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_8);
 iconOMO_8.className = 'buttonsSapelli'
 iconOMO_8.innerHTML = '<img src="images/omoIcons/hutVillage.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አዊ / መንደር';
 iconOMO_8.onclick = function(){
    hideAll()
    landUse = 'አዊ / መንደር'
    imageName1 = 'hutVillage'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }
 iconOMO_9 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_9);
 iconOMO_9.innerHTML = '<img src="images/omoIcons/manualPump.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አፕሪች / ቧንቧ';
 iconOMO_9.className = 'buttonsSapelli'
 iconOMO_9.onclick = function(){
    hideAll()
  generateButtonsEvaluation()
  document.getElementById('customIconsGoBack').style.display = 'initial';
  // document.getElementById('customIconsCancel').style.display = 'initial';
    landUse = 'አፕሪች / ቧንቧ'
    imageName1 = 'manualPump'
  }

 iconOMO_10 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_10);
 iconOMO_10.className = 'buttonsSapelli'
 iconOMO_10.innerHTML = '<img src="images/omoIcons/pondFarming.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አክታረ አታፓር / ኽልኩሬ ሸሽ';
 iconOMO_10.onclick = function(){
    hideAll()
  generateButtonsCropType()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   // document.getElementById('customIconsCancel').style.display = 'initial';
    landUse = 'አክታረ አታፓር / ኽልኩሬ ሸሽ'
    imageName1 = 'pondFarming'

  }
 iconOMO_11 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_11);
 iconOMO_11.innerHTML = '<img src="images/omoIcons/lakeFarming.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አሳክ / ሀይቅ እርሻ';
 iconOMO_11.className = 'buttonsSapelli'
 iconOMO_11.onclick = function(){
    hideAll()
  generateButtonsCropType()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   // document.getElementById('customIconsCancel').style.display = 'initial';
    landUse = 'አሳክ / ሀይቅ እርሻ'
    imageName1 = 'lakeFarming'

  }
 iconOMO_12 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_12);
 iconOMO_12.className = 'buttonsSapelli'
 iconOMO_12.innerHTML = '<img src="images/omoIcons/irrigationPump.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>ኤሪያቻ / መስኖ';
 iconOMO_12.onclick = function(){
    hideAll()
  generateButtonsCropType()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   // document.getElementById('customIconsCancel').style.display = 'initial';
    landUse = 'ኤሪያቻ / መስኖ'
    imageName1 = 'irrigationPump'

  }
 iconOMO_13 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_13);
 iconOMO_13.innerHTML = '<img src="images/omoIcons/floodRecessionFlat.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>ኤመራ / ኦሞሸሽ';
 iconOMO_13.className = 'buttonsSapelli'
 iconOMO_13.onclick = function(){
    hideAll()
  generateButtonsCropType()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   // document.getElementById('customIconsCancel').style.display = 'initial';
    landUse = 'ኤመራ / ኦሞሸሽ'
    imageName1 = 'floodRecessionFlat'


  }
 iconOMO_14 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_14);
 iconOMO_14.className = 'buttonsSapelli'
 iconOMO_14.innerHTML = '<img src="images/omoIcons/floodRecessionSteep.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>ኤቴሎ / ኦሞ ሸሽ';
 iconOMO_14.onclick = function(){
    hideAll()
  generateButtonsCropType()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   // document.getElementById('customIconsCancel').style.display = 'initial';
    landUse = 'ኤቴሎ / ኦሞ ሸሽ'
    imageName1 = 'floodRecessionSteep'


  }
 iconOMO_15 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_15);
 iconOMO_15.innerHTML = '<img src="images/omoIcons/cattleGrazing.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አዳካሩ አɔ̂ቱክ / የከብት ግጦሽ';
 iconOMO_15.className = 'buttonsSapelli'
 iconOMO_15.onclick = function(){
    hideAll()
  generateButtonsEvaluation()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   // document.getElementById('customIconsCancel').style.display = 'initial';
    landUse = 'አዳካሩ አɔ̂ቱክ / የከብት ግጦሽ'
    imageName1 = 'cattleGrazing'


  }
 iconOMO_38 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_38);
 iconOMO_38.innerHTML = '<img src="images/omoIcons/goatSheepGrazing.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አዳካሩ አɔ̂ክኔይ / ፍየል ግጦሽ';
 iconOMO_38.className = 'buttonsSapelli'
 iconOMO_38.onclick = function(){
    hideAll()
  generateButtonsEvaluation()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   // document.getElementById('customIconsCancel').style.display = 'initial';
    landUse = 'አዳካሩ አɔ̂ክኔይ / ፍየል ግጦሽ'
    imageName1 = 'goatSheepGrazing'


  }
 iconOMO_16 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_16);
 iconOMO_16.innerHTML = '<img src="images/omoIcons/waterpondAnimal.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አክፒ አታፓር / ኩሬ ውሃ';
 iconOMO_16.className = 'buttonsSapelli'
 iconOMO_16.onclick = function(){
    hideAll()
  generateButtonsEvaluation()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   // document.getElementById('customIconsCancel').style.display = 'initial';
    landUse = 'አክፒ አታፓር / ኩሬ ውሃ'
    imageName1 = 'waterpondAnimal'


  }
 iconOMO_17 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_17);
 iconOMO_17.innerHTML = '<img src="images/omoIcons/waterRiverAnimal.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አይፒ አናም / የኦሞ ውሃ';
 iconOMO_17.className = 'buttonsSapelli'
 iconOMO_17.onclick = function(){
    hideAll()

    landUse = 'አይፒ አናም / የኦሞ ውሃ'
    imageName1 = 'waterRiverAnimal'
    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)

  }
 iconOMO_18 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_18);
 iconOMO_18.className = 'buttonsSapelli'
 iconOMO_18.innerHTML = '<img src="images/omoIcons/saltlick.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>ኤዶት / ጨው';
 iconOMO_18.onclick = function(){
    hideAll()

    landUse = 'ኤዶት / ጨው'
    imageName1 = 'saltlick'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)

  }
 iconOMO_19 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_19);
 iconOMO_19.innerHTML = '<img src="images/omoIcons/wildFruits.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አጌዎር / የአከባቢ የምበላ ቅጠል';
 iconOMO_19.className = 'buttonsSapelli'
 iconOMO_19.onclick = function(){
    hideAll()
  generateButtonsEvaluation()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   // document.getElementById('customIconsCancel').style.display = 'initial';
    landUse = 'አጌዎር / የአከባቢ የምበላ ቅጠል'
    imageName1 = 'wildFruits'


  }
 iconOMO_20 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_20);
 iconOMO_20.innerHTML = '<img src="images/omoIcons/hunting.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>ኤርካ / አደን';
 iconOMO_20.className = 'buttonsSapelli'
 iconOMO_20.onclick = function(){
    hideAll()

    landUse = 'ኤርካ / አደን'
    imageName1 = 'hunting'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)

  }

 iconOMO_21 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_21);
 iconOMO_21.className = 'buttonsSapelli'
 iconOMO_21.innerHTML = '<img src="images/omoIcons/fishing.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አክሎክ / አሳ ማጥመድ';
 iconOMO_21.onclick = function(){
    hideAll()

    landUse = 'አክሎክ / አሳ ማጥመድ'
    imageName1 = 'fishing'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

 iconOMO_22 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_22);
 iconOMO_22.innerHTML = '<img src="images/omoIcons/reehive.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አሙሉጅ / የንብ ቀፎ';
 iconOMO_22.className = 'buttonsSapelli'
 iconOMO_22.onclick = function(){
    hideAll()
  generateButtonsEvaluation()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   // document.getElementById('customIconsCancel').style.display = 'initial';
    landUse = 'አሙሉጅ / የንብ ቀፎ'
    imageName1 = 'reehive'

  }

 iconOMO_23 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_23);
 iconOMO_23.className = 'buttonsSapelli'
 iconOMO_23.innerHTML = '<img src="images/omoIcons/medicinalPlants.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>ኤደዋ / ባህላዊ ጨው';
 iconOMO_23.onclick = function(){
    hideAll()

    landUse = 'ኤደዋ / ባህላዊ ጨው'
    imageName1 = 'medicinalPlants'
    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)

  }
 iconOMO_24 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_24);
 iconOMO_24.innerHTML = '<img src="images/omoIcons/timber.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አኩቶይ አክም / ማገዶ';
 iconOMO_24.className = 'buttonsSapelli'
 iconOMO_24.onclick = function(){
    hideAll()

    landUse = 'አኩቶይ አክም / ማገዶ'
    imageName1 = 'timber'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)

  }
 iconOMO_25 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_25);
 iconOMO_25.className = 'buttonsSapelli'
 iconOMO_25.innerHTML = '<img src="images/omoIcons/hotSpring.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>ኤሩስ / ፍል ውሃ';
 iconOMO_25.onclick = function(){
    hideAll()

    landUse = 'ኤሩስ / ፍል ውሃ'
    imageName1 = 'hotSpring'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)

  }

 iconOMO_27 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_27);
 iconOMO_27.innerHTML = '<img src="images/omoIcons/waterPoint.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አቦኖ / ቦኖ';
 iconOMO_27.className = 'buttonsSapelli'
 iconOMO_27.onclick = function(){
    hideAll()
  generateButtonsEvaluation()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   // document.getElementById('customIconsCancel').style.display = 'initial';
    landUse = 'አቦኖ / ቦኖ'
    imageName1 = 'waterPoint'


  }
 iconOMO_28 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_28);
 iconOMO_28.innerHTML = '<img src="images/omoIcons/healthStation.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አካይ ኤደዋ / ጤና ጣቢያ';
 iconOMO_28.className = 'buttonsSapelli'
 iconOMO_28.onclick = function(){
    hideAll()
  generateButtonsEvaluation()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   // document.getElementById('customIconsCancel').style.display = 'initial';
    landUse = 'አካይ ኤደዋ / ጤና ጣቢያ'
    imageName1 = 'healthStation'


  }
 iconOMO_29 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_29);
 iconOMO_29.className = 'buttonsSapelli'
 iconOMO_29.innerHTML = '<img src="images/omoIcons/school.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አካይ ኤሱኩል / ትምህርት ቤት';
 iconOMO_29.onclick = function(){
    hideAll()

    landUse = 'አካይ ኤሱኩል / ትምህርት ቤት'
    imageName1 = 'school'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }
 iconOMO_30 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_30);
 iconOMO_30.innerHTML = '<img src="images/omoIcons/veterinary.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አካይ ኤደዋ አግባረን / የከብት ህክምና';
 iconOMO_30.className = 'buttonsSapelli'
 iconOMO_30.onclick = function(){
    hideAll()
  generateButtonsEvaluation()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   // document.getElementById('customIconsCancel').style.display = 'initial';
    landUse = 'አካይ ኤደዋ አግባረን / የከብት ህክምና'
    imageName1 = 'veterinary'


  }
 iconOMO_31 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_31);
 iconOMO_31.innerHTML = '<img src="images/omoIcons/treeForGathering.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>ኤኩቶይ / መሰብሰቢያ ዛፍ';
 iconOMO_31.className = 'buttonsSapelli'
 iconOMO_31.onclick = function(){
    hideAll()

    landUse = 'ኤኩቶይ / መሰብሰቢያ ዛፍ'
    imageName1 = 'treeForGathering'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }
 iconOMO_32 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_32);
 iconOMO_32.innerHTML = '<img src="images/omoIcons/eldersHut.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>ኤካፓ / የሽማግሌ መሰባሰቢያ';
 iconOMO_32.className = 'buttonsSapelli'
 iconOMO_32.onclick = function(){
    hideAll()

    landUse = 'ኤካፓ / የሽማግሌ መሰባሰቢያ'
    imageName1 = 'eldersHut'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

 iconOMO_33 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_33);
 iconOMO_33.className = 'buttonsSapelli'
 iconOMO_33.innerHTML = '<img src="images/omoIcons/recreationCenter.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አፓክ ንቦልያት / መዝናኛ';
 iconOMO_33.onclick = function(){
    hideAll()

    landUse = 'አፓክ ንቦልያት / መዝናኛ'
    imageName1 = 'recreationCenter'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }
 iconOMO_34 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_34);
 iconOMO_34.innerHTML = '<img src="images/omoIcons/church.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>አካይ አኩጅ / ቤተ ክርስቲያን';
 iconOMO_34.className = 'buttonsSapelli'
 iconOMO_34.onclick = function(){
    hideAll()

    landUse = 'አካይ አኩጅ / ቤተ ክርስቲያን'
    imageName1 = 'church'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }
 iconOMO_35 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_35);
 iconOMO_35.className = 'buttonsSapelli'
 iconOMO_35.innerHTML = '<img src="images/omoIcons/boatCrossing.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>ኤዶከት አቱቧ / ጀልባ መሻገሪያ';
 iconOMO_35.onclick = function(){
    hideAll()

    landUse = 'ኤዶከት አቱቧ / ጀልባ መሻገሪያ'
    imageName1 = 'boatCrossing'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }
 iconOMO_36 = document.createElement("BUTTON");
  cell.appendChild(iconOMO_36);
 iconOMO_36.innerHTML = '<img src="images/omoIcons/unknownOther.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>ɔ̂ቺየ / ሌላ';
 iconOMO_36.className = 'buttonsSapelli'
 iconOMO_36.onclick = function(){
    hideAll()
  generateButtonsEvaluation()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   // document.getElementById('customIconsCancel').style.display = 'initial';
    landUse = 'ɔ̂ቺየ / ሌላ'
    imageName1 = 'unknownOther'


  }

  return screenChoice && landUse && imageName1
}

/////////////////////////////////////////////////         EVALUATION           ///////////////////////////////////////
var generateButtonsCropType = function(){
  scrollToTop()

  screenChoice = 'croptype'

  iconCT1 = document.createElement("BUTTON");
  cell.appendChild(iconCT1);
  iconCT1.innerHTML = '<img src="images/omoIcons/noFarming.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>ማም አክታረ / እርሻ የለም';
  iconCT1.className = 'buttonsSapelli'
  iconCT1.onclick = function(){
    hideAll()
    croptype = 'ማም አክታረ / እርሻ የለም'
    imageName2 = 'noFarming'


    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

  iconCT2 = document.createElement("BUTTON");
  cell.appendChild(iconCT2);
  iconCT2.className = 'buttonsSapelli'
  iconCT2.innerHTML = '<img src="images/omoIcons/maize.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>ኤሮመፖ / በቆሎ';
  iconCT2.onclick = function(){
    hideAll()
    croptype = 'ኤሮመፖ / በቆሎ'
    imageName2 = 'maize'

    generateButtonsEvaluation()
  }

  iconCT3 = document.createElement("BUTTON");
  cell.appendChild(iconCT3);
  iconCT3.className = 'buttonsSapelli'
  iconCT3.innerHTML = '<img src="images/omoIcons/sorghum.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>ኤሟይ / ማሽላ';
  iconCT3.onclick = function(){
    hideAll()
    croptype = 'ኤሟይ / ማሽላ'
    imageName2 = 'sorghum'

    generateButtonsEvaluation()
  }

  iconCT4 = document.createElement("BUTTON");
  cell.appendChild(iconCT4);
  iconCT4.className = 'buttonsSapelli'
  iconCT4.innerHTML = '<img src="images/omoIcons/unknownOther.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>ɔ̂ቺየ / ሌላ';
  iconCT4.onclick = function(){
    hideAll()
    croptype = 'ɔ̂ቺየ / ሌላ'
    imageName2 = 'unknownOther'


    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

return screenChoice && evaluation && imageName2
}

var generateButtonsEvaluation = function(){
  scrollToTop()


  screenChoice = 'evaluation'

// human issue
  iconE1 = document.createElement("BUTTON");
  cell.appendChild(iconE1);
  iconE1.className = 'buttonsSapelli'
  iconE1.innerHTML = '<img src="images/omoIcons/Questionmark.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconE1.onclick = function(){
    hideAll()
    evaluation = '❓'
    imageName3 = 'Questionmark'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }


//other issues
  iconE2 = document.createElement("BUTTON");
  cell.appendChild(iconE2);
  iconE2.innerHTML = '<img src="images/omoIcons/ThumbsUp.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconE2.className = 'buttonsSapelli'
  iconE2.onclick = function(){
    hideAll()
    evaluation = '👍🏿'
    imageName3 = 'ThumbsUp'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

  iconE3 = document.createElement("BUTTON");
  cell.appendChild(iconE3);
  iconE3.className = 'buttonsSapelli'
  iconE3.innerHTML = '<img src="images/omoIcons/ThumbsDown.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconE3.onclick = function(){
    hideAll()
    evaluation = '👎🏿'
    imageName3 = 'ThumbsDown'


    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

    return screenChoice && evaluation && imageName2

}
