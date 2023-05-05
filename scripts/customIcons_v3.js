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

var landUse =''
var ett =''
var maisonsdetruites =''
var personnesaffectees =''
var croptype =''
var evaluation =''
var landownership =''
var ownershipprice =''
var malefemale =''

var cluster = null
var ett_type= null
var maisonsdetruites= null
var personnesaffectees= null
var crop_type= null
var croptrype= null
var evaluation_updown= null
var landownership_type= null
var ownership_price_bif= null
var male_or_female= null
var crop_hectares_afected = null
var updateproject
var finalAttributes
// var isMARAorMAU

// console.log('url', url)
// var urlContainsHashCustomised = url.includes('#Customised')

//to return to the map
document.getElementById('customIconsMap').onclick = function(e){

  // var emojioneareaeditor = document.getElementsByClassName('emojionearea-editor')
  var emojioneareaeditor0 =  document.getElementById('emojionearea').value

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


        // emojioneareaeditor0.innerHTML =  landUse + ' ▪️ ' + ett + ' ▪️ ' + maisonsdetruites +  ' ▪️ '  + personnesaffectees +  ' ▪️ '  + croptype +  ' ▪️ '  + evaluation +
        // ' ▪️ '  + landownership + ' ▪️ '  + ownershipprice  + ' ▪️ '  + malefemale +' ▪️ ' + emojioneareaeditor0.innerHTML
        emojioneareaeditor0 =   document.getElementById('emojionearea')
        emojioneareaeditor0.value = landUse + ett + maisonsdetruites + personnesaffectees + croptype + evaluation + landownership + ownershipprice  + malefemale + emojioneareaeditor0.value
      // finalAttributes =  landUse + ett + maisonsdetruites + personnesaffectees + croptype + evaluation + landownership + ownershipprice  + malefemale + emojioneareaeditor0.value

          // if(landUse !=null){
        //   cluster = landUse.slice(0, -9)
        // }else{
        //   cluster = null
        // }
        //
        // if(ett !=null){
        //   ett_type = ett.slice(0, -9)
        // }else{
        //   ett_type = null
        // }
        // if(evaluation !=null){
        //   evaluation_updown = evaluation.slice(0, -9)
        // }else{
        //   evaluation_updown = null
        // }
        //
        // if(landownership !=null){
        //   landownership_type = landownership.slice(0, -9)
        // }else{
        //   landownership_type = null
        // }
        //
        // if(malefemale !=null){
        //   male_or_female = malefemale.slice(0, -9)
        // }else{
        //   male_or_female = null
        // }
        //
        // function extractNumbers(str) {
        //   return str.replace(/\D/g, '');
        // }
        console.log('maisonsdetruites',maisonsdetruites)

        cluster = landUse.slice(0, -7)
        ett_type = ett.slice(0, -7)
        function extractNumbers(str) {
          return str.replace(/\D/g, '');
        }
        if(maisonsdetruites != null){
          maisonsdetruites_number = extractNumbers(maisonsdetruites)
        }else{
          maisonsdetruites_number = 0
        }

        if(personnesaffectees != null){
          personnesaffectees_number = extractNumbers(personnesaffectees)
        }else{
          personnesaffectees_number = 0
        }


        // crop_hectares_afected = 0
        evaluation_updown = evaluation.slice(0, -7)
        landownership_type = landownership.slice(0, -7)
        ownership_price_bif = ownershipprice.slice(0, -7)
        male_or_female = malefemale.slice(0, -7)
        console.log('cluster',cluster)
        console.log('ett_type',ett_type)
        console.log('maisonsdetruites_number',maisonsdetruites_number)
        console.log('personnesaffectees_number',personnesaffectees_number)
        console.log('evaluation_updown',evaluation_updown)
        console.log('landownership_type',landownership_type)
        console.log('male_or_female',male_or_female)
        console.log('crop_hectares_afected hectares',male_or_female)



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
       document.getElementById('emojionearea').value = landUse
        // emojioneareaeditor0.focus()

      },500)
    }
    projectsCreated = false
  }
  return landUse && cluster && ett_type && maisonsdetruites_number && personnesaffectees_number && crop_hectares_afected && landownership_type && male_or_female && evaluation_updown && projectsCreated

}


document.getElementById('customIconsCancel').onclick = function(e){
  hideAll()
  screenChoice == 'landUse'
  imageName1 = null
  imageName2 = null
  // document.getElementById('customIconsGoBack').style.display = 'initial'
  document.getElementById('customIconsCancel').style.display = 'none';
  generateButtonslandUse()

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
      try{
        iconCT1.style.display = 'none'
        iconCT2.style.display = 'none'
        iconCT3.style.display = 'none'
        iconCT4.style.display = 'none'
        iconE1.style.display = 'none'
        iconE2.style.display = 'none'
      }catch(e){}
      landUse =''
      ett =''
      maisonsdetruites =''
      personnesaffectees =''
      croptype =''
      evaluation =''
      landownership =''
      ownershipprice =''
      malefemale =''


  // if(screenChoice == 'initial'){
      hideAll()
      newProjectButton.style.display = 'initial'
      newProjectButton2.style.display = 'initial'
      console.log('initial')
      document.getElementById('customIconsGoBack').style.display = 'none'
      document.getElementById('customIconsMap').style.display = 'initial';

      screenChoice = 'sapprojectsscreen'

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

var screenwidth = screen.width +'px'
// var newProjectButton
//excites Logo in the map: to open the sapelli project
document.getElementById('sapelliProjects').onclick = function(e){
  landUse = 'emojiNoSapelli'
  const celltohide = document.querySelectorAll('.gridCell')
  for (const el of celltohide) {
    el.parentNode.removeChild(el);
  }
  projectsCreated = false
  preload([
    'images/dtm.png','images/omoIcons/unknownOther.png',

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
      console.log('sapproject NOT created')

      projectsCreated =true

        cell = document.createElement('div')
        document.body.appendChild(cell)
        cell.className = 'gridCell'

        newProjectButton = document.createElement("BUTTON");
        cell.appendChild(newProjectButton);
        newProjectButton.className = 'sapelliProjectsLogo'
        newProjectButton.innerHTML = '<img src="images/dtm.png" style="width:50px ; height:50px; border: 0px solid white" />';
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
          'images/omoIcons/Shelter.png','images/omoIcons/dtm.png','images/omoIcons/pluistorrentielles.png','images/omoIcons/camera.png','images/omoIcons/coutlocation.png',
          'images/omoIcons/confirm.png',
          'images/omoIcons/personnesaffectees.png','images/omoIcons/maisonsdetruites.png','images/omoIcons/femmesnevontpas1.png','images/omoIcons/hommesnevontpas1.png',
          'images/omoIcons/regimefoncierchamps.png','images/omoIcons/ventsviolents.png',
          'images/omoIcons/seul.png','images/omoIcons/protection.png','images/omoIcons/proprietaire.png','images/omoIcons/mangues.png','images/omoIcons/maize.png',
          'images/omoIcons/location.png','images/omoIcons/inondations.png','images/omoIcons/ett.png','images/omoIcons/documentation.png','images/omoIcons/champs.png',
           'images/omoIcons/ThumbsUp.png','images/omoIcons/ThumbsDown.png',

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


    console.log('sapproject already created')
    //FUCK, the grid doesn't need to be hidden!!!
    // cell.style.display = 'initial'

    //this is to ensure that the two buttons are well located. Not the best solution but ....
    newProjectButton.style.display = 'initial';
    newProjectButton2.style.display = 'initial'

    hideAll() // to prevent grid showing together with sapelli project icons


  }

// // to show the icons of the project selected
  newProjectButton.onclick = function(){

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
                  document.getElementById('customIconsMap').style.display = 'none';
                  // sapProjectFirstTime = false
                  newProjectButton.style.display = 'none';
                  newProjectButton2.style.display = 'none';

                  // newProjectButton2.style.display = 'none';
                  generateButtonslandUse()
                  newProjectButton.innerHTML = '<img src="images/dtm.png" style="width:50px ; height:50px; border: 0px solid white" />';
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
            document.getElementById('customIconsMap').style.display = 'none';
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
 iconOMO_8.innerHTML = '<img src="images/omoIcons/Shelter.png" style="height: 150px; width: 150px; border: 4px solid colorPaletteArray[0];" /> </br>Shelter';
iconOMO_8.style.backgroundColor = 'white'
 iconOMO_8.onclick = function(){
   setTimeout(function(){
    hideAll()
    landUse = '▪️ Shelter ▪️</br> '
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
 iconOMO_10.innerHTML = '<img src="images/omoIcons/ett.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ETT.';
 iconOMO_10.style.backgroundColor = 'white'
 iconOMO_10.onclick = function(){
   setTimeout(function(){

    hideAll()
    landUse = '▪️ ETT ▪️</br> '
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
    landUse = '▪️ Champs ▪️</br> '
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
    landUse = '▪️ Regime Foncier Champs ▪️</br> '
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
    landUse = '▪️ Protection ▪️</br> '
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
     landUse = '▪️ Autre ▪️</br> '
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

/////////////////////////////////////////////////                    ///////////////////////////////////////
var generateButtonsETT = function(){
  scrollToTop()

  screenChoice = 'ett'

  iconCT1 = document.createElement("BUTTON");
  cell.appendChild(iconCT1);
  iconCT1.innerHTML = '<img src="images/omoIcons/pluistorrentielles.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>Pluies Torrentielles';
  iconCT1.className = 'buttonsSapelli'
  iconCT1.onclick = function(){
    setTimeout(function(){

    hideAll()
    ett = '▪️ Pluies Torrentielles ▪️</br> '
    imageName2 = 'pluistorrentielles'

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
    ett = '▪️ Vents Violents ▪️</br> '
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
    ett = '▪️ Inondations ▪️</br> '
    imageName2 = 'inondations'

    generateScreenETTNumber()  /////////screen with 2 input text fields
  },400)

  }

return screenChoice && ett && imageName2
}


var generateScreenETTNumber = function(){/////////////////////////////////////////////////////////////////////////
  iconCT1 = document.createElement("IMAGE");
  cell.appendChild(iconCT1);
  iconCT1.innerHTML = '<img src="images/omoIcons/maisonsdetruites.png" style="height: 150px; width: 150px; border: 0px solid white;" />';


  iconCT2 = document.createElement("INPUT");
  cell.appendChild(iconCT2);
  iconCT2.style.height = '45px'
  iconCT2.type = 'number'
  iconCT2.placeholder = 'Combien?'


  iconCT3 = document.createElement("IMAGE");
  cell.appendChild(iconCT3);
  iconCT3.innerHTML = '<img src="images/omoIcons/personnesaffectees.png" style="height: 150px; width: 150px; border: 0px solid white;" />';


  iconCT4 = document.createElement("INPUT");
  cell.appendChild(iconCT4);
  iconCT4.style.height = '45px'
  iconCT4.type = 'number'
  iconCT4.placeholder = 'Combien?'

  iconE1 = document.createElement("IMAGE");
  cell.appendChild(iconE1);

  iconE2 = document.createElement("BUTTON");
  cell.appendChild(iconE2);
  iconE2.innerHTML = '<img src="images/omoIcons/confirm.png" style="height: 120px; width: 120px; border: 0px solid black; background: black" /> ';
  iconE2.style.backgroundColor = 'black'
  iconE2.style.borderColor = 'grey'
  iconE2.onclick = function(){
    maisonsdetruites = '▪️ ' + iconCT2.value + ' Maisons detruites ▪️</br> '
    personnesaffectees = '▪️ ' + iconCT4.value + ' Personnes affectees ▪️</br> '
    console.log('maisonsdetruites',maisonsdetruites)

    setTimeout(function(){

    hideAll()

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },400)
  },400)

  }
return screenChoice && maisonsdetruites && personnesaffectees
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
    croptype = '▪️ Maïs ▪️</br> '
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
    croptype = '▪️ Mangues ▪️</br> '
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
    evaluation = '▪️ 👍🏿 ▪️</br> '
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
    evaluation = '▪️ 👎🏿 ▪️</br> '
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
    landownership = '▪️ Proprietaire ▪️</br> '
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
    landownership = '▪️ Location ▪️</br> '
    imageName2 = 'location'

    generateScreenOwnershipNumber()  /////////screen with 1 input text field and hand icon, then triger camera automatically
  },400)
  }
    return screenChoice && landownership && imageName2
}

var opencamera = null
var generateScreenOwnershipNumber = function(){
  iconCT1 = document.createElement("IMAGE");
  cell.appendChild(iconCT1);
  iconCT1.innerHTML = '<img src="images/omoIcons/coutlocation.png" style="height: 80px; width: 80px; border: 0px solid white;" />';


  iconCT2 = document.createElement("INPUT");
  cell.appendChild(iconCT2);
  iconCT2.style.height = '45px'
  iconCT2.type = 'number'
  iconCT2.placeholder = 'Combien?'

  iconE1 = document.createElement("IMAGE");
  cell.appendChild(iconE1);

  iconE2 = document.createElement("BUTTON");
  cell.appendChild(iconE2);
  iconE2.innerHTML = '<img src="images/omoIcons/camera.png" style="height: 60px; width: 80px; border: 0px solid black; background: black" /> ';
  iconE2.style.backgroundColor = 'black'
  iconE2.style.borderColor = 'grey'
  iconE2.onclick = function(){
    ownershipprice = '▪️ ' + iconCT2.value +' BIF ▪️</br> '
    console.log('ownershipprice',ownershipprice)

    setTimeout(function(){

    hideAll()

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      opencamera = 'yes'
      document.getElementById('share-download').click()
    },400)

  },400)
  }
  return screenChoice && ownershipprice && opencamera
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
    malefemale = '▪️ Femmes ne vont pas ▪️</br> '
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
    malefemale = '▪️ Hommes ne vont pas ▪️</br> '
    imageName2 = 'hommesnevontpas1'


    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },400)
  },400)
  }

    return screenChoice && malefemale && imageName2
}
