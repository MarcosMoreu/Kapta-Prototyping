var projectsCreated = false
var sapProjectFirstTime = true
var newProjectButton
var cell
//variable to identify the screen to be used with back button
var screenChoice
var askHelpOrIHelp

//variable to populate the popup
// var screen = 'emojiNoSapelli' //if the sapelli project is completed, then the value changes and the string is treated differently in sharedownload.js

var imageName1
var imageName2
var imageName3

var screen1 = null
var screen2 = null
var screen3 = null
// var livestockdisseasetype = null
var kidsmale = null
var kidsfemale = null
var adultmale = null
var adultfemale = null
var household = null
// var landownership =''
// var ownershipprice =''
// var malefemale =''
//
// var cluster = null
// var ett_type= null
// var maisonsdetruites= null
// var personnesaffectees= null
// var crop_type= null
// var croptrype= null
// var evaluation_updown= null
// var landownership_type= null
// var ownership_price_bif= null
// var male_or_female= null
// var crop_hectares_afected = null
var updateproject
var finalAttributes
var sapelliProjectIdentifier = 'nTxrPZWdUhRVVjwszTFoSywAhZfNfdasfdadsa'
localStorage.setItem('sapelliProjectIdentifier', sapelliProjectIdentifier);
// var isMARAorMAU

// console.log('url', url)
// var urlContainsHashCustomised = url.includes('#Customised')

//to return to the map
document.getElementById('customIconsMap').onclick = function(e){

  // var emojioneareaeditor = document.getElementsByClassName('emojionearea-editor')
  var emojioneareaeditor0 =  document.getElementById('emojionearea').value

  if(filterIsOn == false){
    document.getElementById('customIconsMap').style.display = 'none';
    // document.getElementById('customIconsCancel').style.display = 'none';
    document.getElementById('customIconsGoBack').style.display = 'none';

    // document.getElementById("map").style.bottom = '0px'
    document.getElementById("map").style.height = "100%";
    map.invalidateSize(); // doesn't seem to do anything

    document.getElementById("Cancel").style.display = "initial";
    document.getElementById("sapelliProjects").style.display = "initial";
    document.getElementById('emoji').style.display = 'initial';
    document.getElementById('showAreaAcres').style.display = 'initial';
    // document.getElementById('share-download').style.display = 'initial';
    if(screen1 == null){
      console.log('here ')
      // screen = 'emojiNoSapelli'
      // document.getElementById('share-download').style.opacity = '0.5'
    }else{

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

          //here we have: Always screen, sometime croptype and sometimes evaluation. so four scenarios
          //and 1, 2 or 3 images


            // emojioneareaeditor0.value =  screen + ' ▪️ ' + ett + ' ▪️ ' + maisonsdetruites +  ' ▪️ '  + personnesaffectees +  ' ▪️ '  + croptype +  ' ▪️ '  + evaluation +
            // ' ▪️ '  + landownership + ' ▪️ '  + ownershipprice  + ' ▪️ '  + malefemale +' ▪️ ' + emojioneareaeditor0.value
            emojioneareaeditor0 = document.getElementById('emojionearea')
            emojioneareaeditor0.value = screen1 + screen2 + screen3 + kidsmale + kidsfemale + adultmale + adultfemale  + household + ' ' + emojioneareaeditor0.value
            emojioneareaeditor0.value = emojioneareaeditor0.value.replace(/null/g, '')
            attribute1s = emojioneareaeditor0.value
            attribute2s = screen1 //evaluation
            attribute3s = screen2
            attribute4s = screen3
            attribute5s = null
            attribute6s = null
            attribute7s = null
            attribute8s = null
            attribute9s = null
            attribute10s = null
            attribute11n = kidsmale
            attribute12n = kidsfemale
            attribute13n = adultmale
            attribute14n = adultfemale
            attribute15n = household
            attribute16n = 0
            attribute17n = 0
            attribute18n = 0
            attribute19n = 0
            attribute20n = 0

        }
  }else if(filterIsOn == true){

    document.getElementById("map").style.height = "100%";
    document.getElementById("filterWithIcons").style.display = 'initial'
    // document.getElementById("filterByDate").style.display = 'initial'
    document.getElementById("clearFilter").style.display = 'none'
    document.getElementById("applyFilter").style.display = 'initial'
    document.getElementById('emoji').style.display = 'initial';


    document.getElementById('customIconsMap').style.display = 'none';
    if(screen1 != 'emojiNoSapelli'){
      setTimeout(function(){
       document.getElementById('emojionearea').value = screen1
        // emojioneareaeditor0.focus()

      },500)
    }
    projectsCreated = false
  }
  return projectsCreated && screen1 && screen2 && screen3 && kidsmale && kidsfemale && adultmale && adultfemale && household

}


// document.getElementById('customIconsCancel').onclick = function(e){
//   hideAll()
//   screenChoice == 'landUse'
//   imageName1 = null
//   imageName2 = null
//   // document.getElementById('customIconsGoBack').style.display = 'initial'
//   document.getElementById('customIconsCancel').style.display = 'none';
//   generateButtonslandUse()
//
//   landUse = null
//   evaluation = null
//   landownership = null
//   malefemale = null
//   croptype = null
//   ett = null
//   // croptype = 'emojiNoSapelli'
//   // evaluation = 'emojiNoSapelli'
//   return  landUse && evaluation && screenChoice && imageName1 && imageName2 && landownership && malefemale && ett && croptype
// }
document.getElementById('customIconsGoBack').onclick = function(e){
      imageName1 = null
      imageName2 = null
      imageName3 = null

      screen1 = null
      screen2 = null
      screen3 = null
      kidsmale = null
      kidsfemale = null
      adultmale = null
      adultfemale = null
      household = null
      // console.log('screenChoice',screenChoice)
      // try{
      //   iconCT1.style.display = 'none'
      //   iconCT2.style.display = 'none'
      //   iconCT3.style.display = 'none'
      //   iconCT4.style.display = 'none'
      //   iconE1.style.display = 'none'
      //   iconE2.style.display = 'none'
      // }catch(e){}
      // landUse =''
      // ett =''
      // maisonsdetruites =''
      // personnesaffectees =''
      // croptype =''
      // evaluation =''
      // landownership =''
      // ownershipprice =''
      // malefemale =''


  // if(screenChoice == 'initial'){
      hideAll()
      newProjectButton.style.display = 'initial'
      newProjectButton2.style.display = 'initial'
      //console.('initial')

      document.getElementById('openSapelliProject').click()
      document.getElementById('customIconsGoBack').style.display = 'none'
      document.getElementById('customIconsMap').style.display = 'initial';

      screenChoice = 'sapprojectsscreen'

  return screenChoice //&& imageName1 && imageName2 && imageName3
}

function hideAll(){
  document.querySelectorAll('.buttonsSapelli').forEach(function(el) {
   el.style.display = 'none';

  });
  document.querySelectorAll('.popUI').forEach(function(el) {
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
  kidsmale = null
  kidsfemale = null
  adultmale = null
  adultfemale = null
  household = null
  // screen1 = 'emojiNoSapelli'
  const celltohide = document.querySelectorAll('.gridCell')
  for (const el of celltohide) {
    el.parentNode.removeChild(el);
  }
  projectsCreated = false
  preload([
    'images/qmm.png','images/omoIcons/unknownOther.png',

  ])
  setTimeout(function(){

  isSapelliProjectLoaded = localStorage.getItem('sapelliProjectAccessed')
  //console.(isSapelliProjectLoaded)

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
      //console.('sapproject NOT created')

      projectsCreated =true

        cell = document.createElement('div')
        document.body.appendChild(cell)
        cell.className = 'gridCell'

        newProjectButton = document.createElement("BUTTON");
        cell.appendChild(newProjectButton);
        newProjectButton.className = 'sapelliProjectsLogo'
        newProjectButton.id = 'openSapelliProject'
        newProjectButton.innerHTML = '<img src="images/qmm.png" style="width:50px ; height:50px; border: 0px solid white" />';
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
          // 'images/omoIcons/Shelter.png','images/omoIcons/dtm.png','images/omoIcons/pluistorrentielles.png','images/omoIcons/camera.png','images/omoIcons/coutlocation.png',
          // 'images/omoIcons/confirm.png',
          // 'images/omoIcons/personnesaffectees.png','images/omoIcons/maisonsdetruites.png','images/omoIcons/femmesnevontpas1.png','images/omoIcons/hommesnevontpas1.png',
          // 'images/omoIcons/regimefoncierchamps.png','images/omoIcons/ventsviolents.png',
          // 'images/omoIcons/seul.png','images/omoIcons/protection.png','images/omoIcons/proprietaire.png','images/omoIcons/mangues.png','images/omoIcons/maize.png',
          // 'images/omoIcons/location.png','images/omoIcons/inondations.png','images/omoIcons/ett.png','images/omoIcons/documentation.png','images/omoIcons/champs.png',
          //  'images/omoIcons/ThumbsUp.png','images/omoIcons/ThumbsDown.png',

        'images/omoIcons/boatCrossing.png','images/omoIcons/cattleGrazing.png','images/omoIcons/church.png','images/omoIcons/eldersHut.png','images/omoIcons/fishing.png',
          'images/omoIcons/floodRecessionFlat.png','images/omoIcons/floodRecessionSteep.png','images/omoIcons/goatSheepGrazing.png','images/omoIcons/healthStation.png','images/omoIcons/hotSpring.png','images/omoIcons/hunting.png',
          'images/omoIcons/hutVillage.png','images/omoIcons/irrigationPump.png','images/omoIcons/lakeRecession.png','images/omoIcons/maize.png',
          'images/omoIcons/manualPump.png','images/omoIcons/medicinalPlants.png','images/omoIcons/noFarming.png','images/omoIcons/pondFarming.png','images/omoIcons/Questionmark.png','images/omoIcons/recreationCenter.png',
          'images/omoIcons/reehive.png','images/omoIcons/saltlick.png','images/omoIcons/school.png','images/omoIcons/sorghum.png','images/omoIcons/ThumbsUp.png','images/omoIcons/ThumbsDown.png',
          'images/omoIcons/timber.png','images/omoIcons/treeForGathering.png','images/omoIcons/unknownOther.png','images/omoIcons/veterinary.png','images/omoIcons/waterPoint.png','images/omoIcons/waterPondAnimal.png',
          'images/omoIcons/waterRiverAnimal.png','images/omoIcons/wildFruits.png',"images/omoIcons/pathTrack.png", "images/omoIcons/deforestation.png",


        ]);

  }
  else{


    //console.('sapproject already created')
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
          //console.('sapelli project clickeeeeeeeeeeeeeeed isSapelliProjectLoaded != true')
          // newProjectButton.style.display = 'none';
          // newProjectButton2.style.display = 'none';
          newProjectButton.style.backgroundColor = 'black'
          newProjectButton.style.borderColor = 'black'
          newProjectButton2.style.backgroundColor = 'black'
          newProjectButton2.style.borderColor = 'black'



          newProjectButton.innerHTML = '<img src="images/checkingPw.gif" style="width:50px ; height:50px; border: 0px solid white" />';
          newProjectButton.disabled = true
          newProjectButton2.innerHTML = '<img src="images/checkingPw.gif" style="width:50px ; height:50px; border: 0px solid white" />';
          newProjectButton2.disabled = true
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
                  newProjectButton.innerHTML = '<img src="images/qmm.png" style="width:50px ; height:50px; border: 0px solid white" />';
                  newProjectButton.disabled = false
                  newProjectButton.style.backgroundColor = 'white'
                  newProjectButton.style.borderColor = 'white'
                  clearInterval(checkingIfPreloadCompleted)
                  document.getElementById('customIconsMap').style.display = 'initial'

                }else{
                  document.getElementById("Alert").style.fontSize = "15px";
                  document.getElementById('Alert').innerHTML = '</br> </br> </br> </br> </br> </br> </br> </br> </br> </br>Loading icons for the first time. </br>Next time, icons will load immediately'
                  document.getElementById("Alert").style.display = 'initial'
                }
              },500)

        }else{

            newProjectButton.style.display = 'none';
            newProjectButton2.style.display = 'none';
            //console.('sapelli project clickeeeeeeeeeeeeeeed sapbuttonsalreadygenerated == false')
            cell.setAttribute("style","overflow-y:scroll");
            document.getElementById('customIconsMap').style.display = 'none';
            document.getElementById('customIconsGoBack').style.display = 'initial'
            generateButtonslandUse()

        }

    }
    document.getElementById('openSapelliProject').click()
    document.getElementById('customIconsGoBack').style.display = 'none'
    document.getElementById('customIconsMap').style.display = 'initial';

  },400)
    // setTimeout(function(){
    //
    // },410
  return projectsCreated && sapProjectFirstTime && newProjectButton && cell
}

var  iconOMO,iconOMO_8,iconOMO_9,iconOMO_10,iconOMO_11,iconOMO_12,iconOMO_13,iconOMO_14,iconOMO_15,iconOMO_16,iconOMO_17,iconOMO_18,iconOMO_19,iconOMO_20,iconOMO_21,iconOMO_22,iconOMO_22,iconOMO_23,iconOMO_24,iconOMO_25,iconOMO_26,
icon27,iconOMO_28,iconOMO_29,iconOMO_30,iconOMO_31,iconOMO_32,iconOMO_33,iconOMO_34,iconOMO_35,iconOMO_36,iconOMO_41,iconOMO_42,iconOMO_43, iconOMO_44, iconOMO_45,

iconCT1,iconCT2, iconCT3, iconCT4, iconE1,iconE2, iconE3, iconCT5, iconCT6, iconCT7, iconC1, iconC2, iconC3, iconC4, iconC5,
iconPop1, iconPop2, iconPop3, iconPop4, iconPop5, iconPop6, iconPop7, iconPop8, iconPop9,
iconPop10, iconPop11, iconPop12,
iconLD1, iconLD2, iconLD3, iconLD4, iconLD5, iconLD6, iconLD7, iconLD8, iconLD9

////////////////////////////////////////             mainS MARA       ///////////////////////////////
var generateScreenPopNumber = function(){/////////////////////////////////////////////////////////////////////////
  //kidsmale
  iconPop1 = document.createElement("IMAGE");
  cell.appendChild(iconPop1);
  iconPop1.className = 'popUI'

  iconPop1.innerHTML = '<img src="images/omoIcons/kidsmale.png" style="height: 50px; width: 30px; border: 0px solid white;" />';

  iconPop2 = document.createElement("INPUT");
  cell.appendChild(iconPop2);
  iconPop2.className = 'popUI'
  iconPop2.style.height = '35px'
  iconPop2.type = 'number'
  iconPop2.placeholder = 'እኮኩ ንክሌ/ወንድ ልጅ ?'

//kidsfemale
  iconPop3 = document.createElement("IMAGE");
  cell.appendChild(iconPop3);
  iconPop3.className = 'popUI'
  iconPop3.innerHTML = '<img src="images/omoIcons/kidsfemale.png" style="height: 50px; width: 30px; border: 0px solid white;" />';

  iconPop4 = document.createElement("INPUT");
  cell.appendChild(iconPop4);
  iconPop4.className = 'popUI'
  iconPop4.style.height = '35px'
  iconPop4.type = 'number'
  iconPop4.placeholder = 'እኮኩ ንፐሴ/ሴት ልጅ ?'

//adultmale
  iconPop5 = document.createElement("IMAGE");
  cell.appendChild(iconPop5);
  iconPop5.className = 'popUI'
  iconPop5.innerHTML = '<img src="images/omoIcons/adultsmale.png" style="height: 80px; width: 80px; border: 0px solid white;" />';

  iconPop6 = document.createElement("INPUT");
  cell.appendChild(iconPop6);
  iconPop6.className = 'popUI'
  iconPop6.style.height = '35px'
  iconPop6.type = 'number'
  iconPop6.placeholder = 'ኤክሌ/አዋቂ ወንድ ?'

//adultfemale
  iconPop7 = document.createElement("IMAGE");
  cell.appendChild(iconPop7);
  iconPop7.className = 'popUI'
  iconPop7.innerHTML = '<img src="images/omoIcons/adultsfemale.png" style="height: 80px; width: 80px; border: 0px solid white;" />';

  iconPop8 = document.createElement("INPUT");
  cell.appendChild(iconPop8);
  iconPop8.className = 'popUI'
  iconPop8.style.height = '35px'
  iconPop8.type = 'number'
  iconPop8.placeholder = 'አበሩ/አዋቂ ሴት ?'

//household
  iconPop9 = document.createElement("IMAGE");
  iconPop9.className = 'popUI'
  cell.appendChild(iconPop9);
  iconPop9.innerHTML = '<img src="images/omoIcons/households.png" style="height: 90px; width: 80px; border: 0px solid white;" />';

  iconPop10 = document.createElement("INPUT");
  cell.appendChild(iconPop10);
  iconPop10.className = 'popUI'
  iconPop10.style.height = '43px'
  iconPop10.type = 'number'
  iconPop10.placeholder = 'ኤክሌ አዊ/አባወራ ?'

//confirm
  // iconPop11 = document.createElement("IMAGE");
  // cell.appendChild(iconPop11);
  // iconPop11.className = 'popUI'

  iconPop11 = document.createElement("BUTTON");
  cell.appendChild(iconPop11);
  iconPop11.className = 'popUI'
  iconPop11.innerHTML = '<img src="images/questionmark.png" style="height: 80px; width: 80px; border: 0px solid black; background: white" /> ';
  iconPop11.style.backgroundColor = 'black'
  iconPop11.style.borderColor = 'grey'
  iconPop11.onclick = function(){
    kidsmale = '?'
    kidsfemale = '?'
    adultmale = '?'
    adultfemale = '?'
    household = '?'
    // console.log('maisonsdetruites',maisonsdetruites)

    setTimeout(function(){

    hideAll()

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },400)
  },400)

  }

  iconPop12 = document.createElement("BUTTON");
  cell.appendChild(iconPop12);
  iconPop12.className = 'popUI'
  iconPop12.innerHTML = '<img src="images/omoIcons/confirm.png" style="height: 80px; width: 80px; border: 0px solid black; background: black" /> ';
  iconPop12.style.backgroundColor = 'black'
  iconPop12.style.borderColor = 'grey'
  iconPop12.onclick = function(){
    // if(iconPop2.value != null){
      kidsmale = '▪️ ' + iconPop2.value + ' እኮኩ ንክሌ/ወንድ ልጅ ▪️</br> '
      kidsfemale = '▪️ ' + iconPop4.value + ' እኮኩ ንፐሴ/ሴት ልጅ ▪️</br> '
      adultmale = '▪️ ' + iconPop6.value + ' ኤክሌ/አዋቂ ወንድ ▪️</br> '
      adultfemale = '▪️ ' + iconPop8.value + ' አበሩ/አዋቂ ሴት ▪️</br> '
      household = '▪️ ' + iconPop10.value + ' ኤክሌ አዊ/አባወራ ▪️</br> '
    // }else{
    //   kidsmale = ''
    //   kidsfemale = ''
    //   adultmale = ''
    //   adultfemale = ''
    //   household = ''
    // }

    // console.log('maisonsdetruites',maisonsdetruites)

    setTimeout(function(){

    hideAll()

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },400)
  },400)

  }
return screenChoice && kidsmale && kidsfemale && adultmale && adultfemale && household
}


var generateButtonslandUse = function(){

  screenChoice = 'initial'

  iconOMO_8 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_8);
  iconOMO_8.className = 'buttonsSapelli'
  iconOMO_8.innerHTML = '<img src="images/omoIcons/hutVillage.png" style="height: 150px; width: 150px; border: 0px solid white;" /> </br>አዊ / መንደር';
  iconOMO_8.onclick = function(){
    setTimeout(function(){
     hideAll()
     screen1 = 'አዊ / መንደር'
     imageName1 = 'hutVillage'
     //console.('filter is on?',filterIsOn)
     // document.getElementById('customIconsMap').click()
     if(filterIsOn == false){
       generateScreenPopNumber()
        document.getElementById('customIconsGoBack').style.display = 'initial';
        document.getElementById('customIconsMap').style.display = 'none';

        // document.getElementById('customIconsCancel').style.display = 'initial';
      }else{
        document.getElementById('customIconsMap').click()
      }

     //console.(screen1)

   },400)
   }
  iconOMO_9 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_9);
  iconOMO_9.innerHTML = '<img src="images/omoIcons/manualPump.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አፕሪች / ቧንቧ';
  iconOMO_9.className = 'buttonsSapelli'
  iconOMO_9.onclick = function(){
    setTimeout(function(){

     hideAll()

   // document.getElementById('customIconsCancel').style.display = 'initial';
     screen1 = 'አፕሪች / ቧንቧ'
     imageName1 = 'manualPump'
     if(filterIsOn == false){
       generateButtonsEvaluation()
       document.getElementById('customIconsGoBack').style.display = 'initial';
       document.getElementById('customIconsMap').style.display = 'none';

     }else{
       document.getElementById('customIconsMap').click()
     }

   },400)

   }

  iconOMO_10 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_10);
  iconOMO_10.className = 'buttonsSapelli'
  iconOMO_10.innerHTML = '<img src="images/omoIcons/pondFarming.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አክታረ አታፓር / ኩሬ ሸሽ';
  iconOMO_10.onclick = function(){
    setTimeout(function(){

     hideAll()
     screen1 = 'አክታረ አታፓር / ኽልኩሬ ሸሽ'
     imageName1 = 'pondFarming'
     if(filterIsOn == false){
       generateButtonsCropType()
        document.getElementById('customIconsGoBack').style.display = 'initial';
        document.getElementById('customIconsMap').style.display = 'none';

        // document.getElementById('customIconsCancel').style.display = 'initial';
      }else{
        document.getElementById('customIconsMap').click()
      }

   },400)

   }
  iconOMO_11 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_11);
  iconOMO_11.innerHTML = '<img src="images/omoIcons/lakeRecession.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አሳክ / ሀይቅ እርሻ';
  iconOMO_11.className = 'buttonsSapelli'
  iconOMO_11.onclick = function(){
    setTimeout(function(){

     hideAll()
     screen1 = 'አሳክ / ሀይቅ እርሻ'
     imageName1 = 'lakeRecession'
     if(filterIsOn == false){
       generateButtonsCropType()
        document.getElementById('customIconsGoBack').style.display = 'initial';
        document.getElementById('customIconsMap').style.display = 'none';

        // document.getElementById('customIconsCancel').style.display = 'initial';
      }else{
        document.getElementById('customIconsMap').click()
      }

   },400)

   }
  iconOMO_12 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_12);
  iconOMO_12.className = 'buttonsSapelli'
  iconOMO_12.innerHTML = '<img src="images/omoIcons/irrigationPump.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤሪያቻ / መስኖ';
  iconOMO_12.onclick = function(){
    setTimeout(function(){

     hideAll()
     screen1 = 'ኤሪያቻ / መስኖ'
     imageName1 = 'irrigationPump'
     if(filterIsOn == false){
       generateButtonsCropType()
        document.getElementById('customIconsGoBack').style.display = 'initial';
        document.getElementById('customIconsMap').style.display = 'none';

        // document.getElementById('customIconsCancel').style.display = 'initial';
      }else{
        document.getElementById('customIconsMap').click()
      }

   },400)

   }
  iconOMO_13 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_13);
  iconOMO_13.innerHTML = '<img src="images/omoIcons/floodRecessionFlat.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤመራ / ኦሞሸሽ';
  iconOMO_13.className = 'buttonsSapelli'
  iconOMO_13.onclick = function(){
    setTimeout(function(){

     hideAll()
     screen1 = 'ኤመራ / ኦሞሸሽ'
     imageName1 = 'floodRecessionFlat'
     if(filterIsOn == false){
       generateButtonsCropType()
        document.getElementById('customIconsGoBack').style.display = 'initial';
        document.getElementById('customIconsMap').style.display = 'none';

        // document.getElementById('customIconsCancel').style.display = 'initial';
      }else{
        document.getElementById('customIconsMap').click()
      }

   },400)


   }
  iconOMO_14 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_14);
  iconOMO_14.className = 'buttonsSapelli'
  iconOMO_14.innerHTML = '<img src="images/omoIcons/floodRecessionSteep.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤቴሎ / ኦሞ ሸሽ';
  iconOMO_14.onclick = function(){
    setTimeout(function(){

     hideAll()
     screen1 = 'ኤቴሎ / ኦሞ ሸሽ'
     imageName1 = 'floodRecessionSteep'
   if(filterIsOn == false){
     generateButtonsCropType()
      document.getElementById('customIconsGoBack').style.display = 'initial';
      document.getElementById('customIconsMap').style.display = 'none';

      // document.getElementById('customIconsCancel').style.display = 'initial';
    }else{
      document.getElementById('customIconsMap').click()
    }

   },400)


   }
  iconOMO_15 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_15);
  iconOMO_15.innerHTML = '<img src="images/omoIcons/cattleGrazing.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አዳካሩ አɔ̂ቱክ / የከብት ግጦሽ';
  iconOMO_15.className = 'buttonsSapelli'
  iconOMO_15.onclick = function(){
    setTimeout(function(){

     hideAll()
     screen1 = 'አዳካሩ አɔ̂ቱክ / የከብት ግጦሽ'
     imageName1 = 'cattleGrazing'
     if(filterIsOn == false){
       generateButtonsEvaluation()
        document.getElementById('customIconsGoBack').style.display = 'initial';
        document.getElementById('customIconsMap').style.display = 'none';

        // document.getElementById('customIconsCancel').style.display = 'initial';
      }else{
        document.getElementById('customIconsMap').click()
      }

   },400)


   }
  iconOMO_38 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_38);
  iconOMO_38.innerHTML = '<img src="images/omoIcons/goatSheepGrazing.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አዳካሩ አɔ̂ክኔይ / ፍየል ግጦሽ';
  iconOMO_38.className = 'buttonsSapelli'
  iconOMO_38.onclick = function(){
    setTimeout(function(){

     hideAll()
     screen1 = 'አዳካሩ አɔ̂ክኔይ / ፍየል ግጦሽ'
     imageName1 = 'goatSheepGrazing'
     if(filterIsOn == false){
       generateButtonsEvaluation()
        document.getElementById('customIconsGoBack').style.display = 'initial';
        document.getElementById('customIconsMap').style.display = 'none';

        // document.getElementById('customIconsCancel').style.display = 'initial';
      }else{
        document.getElementById('customIconsMap').click()
      }

   },400)


   }
  iconOMO_16 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_16);
  iconOMO_16.innerHTML = '<img src="images/omoIcons/waterPondAnimal.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ɔ̂ክፒ አታፓር / ኩሬ ውሃ';
  iconOMO_16.className = 'buttonsSapelli'
  iconOMO_16.onclick = function(){
    setTimeout(function(){

     hideAll()
     screen1 = 'አክፒ አታፓር / ኩሬ ውሃ'
     imageName1 = 'waterPondAnimal'
     if(filterIsOn == false){
       generateButtonsEvaluation()
        document.getElementById('customIconsGoBack').style.display = 'initial';
        document.getElementById('customIconsMap').style.display = 'none';

        // document.getElementById('customIconsCancel').style.display = 'initial';
      }else{
        document.getElementById('customIconsMap').click()
      }

   },400)


   }
  iconOMO_17 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_17);
  iconOMO_17.innerHTML = '<img src="images/omoIcons/waterRiverAnimal.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ɔ̂ይፒ አናም / የኦሞ ውሃ';
  iconOMO_17.className = 'buttonsSapelli'
  iconOMO_17.onclick = function(){
    setTimeout(function(){

     hideAll()

     screen1 = 'አይፒ አናም / የኦሞ ውሃ'
     imageName1 = 'waterRiverAnimal'
     document.getElementById('customIconsMap').click()
     if(filterIsOn == false){
       setTimeout(function(){
         document.getElementById('share-download').click()
       },400)
     }
   },400)

   }
  iconOMO_18 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_18);
  iconOMO_18.className = 'buttonsSapelli'
  iconOMO_18.innerHTML = '<img src="images/omoIcons/saltlick.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤዶት / ጨው.';
  iconOMO_18.onclick = function(){
    setTimeout(function(){

     hideAll()

     screen1 = 'ኤዶት / ጨው'
     imageName1 = 'saltlick'

     document.getElementById('customIconsMap').click()
     if(filterIsOn == false){
       setTimeout(function(){
         document.getElementById('share-download').click()
       },400)
     }
   },400)

   }
  iconOMO_19 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_19);
  iconOMO_19.innerHTML = '<img src="images/omoIcons/wildFruits.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አጌዎር / የአከባቢ የምበላ ቅጠል';
  iconOMO_19.className = 'buttonsSapelli'
  iconOMO_19.onclick = function(){
    setTimeout(function(){

     hideAll()
     screen1 = 'አጌዎር / የአከባቢ የምበላ ቅጠል'
     imageName1 = 'wildFruits'
     if(filterIsOn == false){
       generateButtonsEvaluation()
        document.getElementById('customIconsGoBack').style.display = 'initial';
        document.getElementById('customIconsMap').style.display = 'none';

        // document.getElementById('customIconsCancel').style.display = 'initial';
      }else{
        document.getElementById('customIconsMap').click()
      }

   },400)


   }
  iconOMO_20 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_20);
  iconOMO_20.innerHTML = '<img src="images/omoIcons/hunting.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤርካ / አደን';
  iconOMO_20.className = 'buttonsSapelli'
  iconOMO_20.onclick = function(){
    setTimeout(function(){

     hideAll()

     screen1 = 'ኤርካ / አደን'
     imageName1 = 'hunting'

     document.getElementById('customIconsMap').click()
     if(filterIsOn == false){
       setTimeout(function(){
         document.getElementById('share-download').click()
       },400)
     }
   },400)

   }

  iconOMO_21 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_21);
  iconOMO_21.className = 'buttonsSapelli'
  iconOMO_21.innerHTML = '<img src="images/omoIcons/fishing.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አክሎክ / አሳ ማጥመድ';
  iconOMO_21.onclick = function(){
    setTimeout(function(){

     hideAll()

     screen1 = 'አክሎክ / አሳ ማጥመድ'
     imageName1 = 'fishing'

     document.getElementById('customIconsMap').click()
     if(filterIsOn == false){
       setTimeout(function(){
         document.getElementById('share-download').click()
       },400)
     }
   },400)

   }

  iconOMO_22 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_22);
  iconOMO_22.innerHTML = '<img src="images/omoIcons/reehive.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አሙሉጅ / የንብ ቀፎ';
  iconOMO_22.className = 'buttonsSapelli'
  iconOMO_22.onclick = function(){
    setTimeout(function(){

     hideAll()
     screen1 = 'አሙሉጅ / የንብ ቀፎ'
     imageName1 = 'reehive'
     if(filterIsOn == false){
       generateButtonsEvaluation()
        document.getElementById('customIconsGoBack').style.display = 'initial';
        document.getElementById('customIconsMap').style.display = 'none';

        // document.getElementById('customIconsCancel').style.display = 'initial';
      }else{
        document.getElementById('customIconsMap').click()
      }

   },400)

   }

  iconOMO_23 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_23);
  iconOMO_23.className = 'buttonsSapelli'
  iconOMO_23.innerHTML = '<img src="images/omoIcons/medicinalPlants.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤደዋ / ባህላዊ ጨው';
  iconOMO_23.onclick = function(){
    setTimeout(function(){

     hideAll()

     screen1 = 'ኤደዋ / ባህላዊ ጨው'
     imageName1 = 'medicinalPlants'
     document.getElementById('customIconsMap').click()
     if(filterIsOn == false){
       setTimeout(function(){
         document.getElementById('share-download').click()
       },400)
     }
   },400)

   }
  iconOMO_24 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_24);
  iconOMO_24.innerHTML = '<img src="images/omoIcons/timber.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አኩቶይ አክም / ማገዶ';
  iconOMO_24.className = 'buttonsSapelli'
  iconOMO_24.onclick = function(){
    setTimeout(function(){

     hideAll()

     screen1 = 'አኩቶይ አክም / ማገዶ'
     imageName1 = 'timber'

     document.getElementById('customIconsMap').click()
     if(filterIsOn == false){
       setTimeout(function(){
         document.getElementById('share-download').click()
       },400)
     }
   },400)


   }
  iconOMO_25 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_25);
  iconOMO_25.className = 'buttonsSapelli'
  iconOMO_25.innerHTML = '<img src="images/omoIcons/hotSpring.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤሩስ / ፍል ውሃ';
  iconOMO_25.onclick = function(){
    setTimeout(function(){

     hideAll()

     screen1 = 'ኤሩስ / ፍል ውሃ'
     imageName1 = 'hotSpring'

     document.getElementById('customIconsMap').click()
     if(filterIsOn == false){
       setTimeout(function(){
         document.getElementById('share-download').click()
       },400)
     }
   },400)

   }

  iconOMO_27 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_27);
  iconOMO_27.innerHTML = '<img src="images/omoIcons/waterPoint.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አቦኖ / ቦኖ';
  iconOMO_27.className = 'buttonsSapelli'
  iconOMO_27.onclick = function(){
    setTimeout(function(){

     hideAll()
     screen1 = 'አቦኖ / ቦኖ'
     imageName1 = 'waterPoint'
     if(filterIsOn == false){
       generateButtonsEvaluation()
        document.getElementById('customIconsGoBack').style.display = 'initial';
        document.getElementById('customIconsMap').style.display = 'none';

        // document.getElementById('customIconsCancel').style.display = 'initial';
      }else{
        document.getElementById('customIconsMap').click()
      }

   },400)


   }
  iconOMO_28 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_28);
  iconOMO_28.innerHTML = '<img src="images/omoIcons/healthStation.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አካይ ኤደዋ / ጤና ጣቢያ';
  iconOMO_28.className = 'buttonsSapelli'
  iconOMO_28.onclick = function(){
    setTimeout(function(){

     hideAll()
     screen1 = 'አካይ ኤደዋ / ጤና ጣቢያ'
     imageName1 = 'healthStation'
     if(filterIsOn == false){
       generateButtonsEvaluation()
        document.getElementById('customIconsGoBack').style.display = 'initial';
        document.getElementById('customIconsMap').style.display = 'none';

        // document.getElementById('customIconsCancel').style.display = 'initial';
      }else{
        document.getElementById('customIconsMap').click()
      }

   },400)


   }
  iconOMO_29 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_29);
  iconOMO_29.className = 'buttonsSapelli'
  iconOMO_29.innerHTML = '<img src="images/omoIcons/school.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አካይ ኤሱኩል / ትምህርት ቤት';
  iconOMO_29.onclick = function(){
    setTimeout(function(){

     hideAll()

     screen1 = 'አካይ ኤሱኩል / ትምህርት ቤት'
     imageName1 = 'school'

     document.getElementById('customIconsMap').click()
     if(filterIsOn == false){
       setTimeout(function(){
         document.getElementById('share-download').click()
       },400)
     }
   },400)

   }
  iconOMO_30 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_30);
  iconOMO_30.innerHTML = '<img src="images/omoIcons/veterinary.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አካይ ኤደዋ አግባረን / የከብት ህክምና';
  iconOMO_30.className = 'buttonsSapelli'
  iconOMO_30.onclick = function(){
    setTimeout(function(){

     hideAll()
     screen1 = 'አካይ ኤደዋ አግባረን / የከብት ህክምና'
     imageName1 = 'veterinary'
     if(filterIsOn == false){
       generateButtonsEvaluation()
        document.getElementById('customIconsGoBack').style.display = 'initial';
        document.getElementById('customIconsMap').style.display = 'none';

        // document.getElementById('customIconsCancel').style.display = 'initial';
      }else{
        document.getElementById('customIconsMap').click()
      }

   },400)


   }
  iconOMO_31 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_31);
  iconOMO_31.innerHTML = '<img src="images/omoIcons/treeForGathering.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤኩቶይ / መሰብሰቢያ ዛፍ';
  iconOMO_31.className = 'buttonsSapelli'
  iconOMO_31.onclick = function(){
    setTimeout(function(){

     hideAll()

     screen1 = 'ኤኩቶይ / መሰብሰቢያ ዛፍ'
     imageName1 = 'treeForGathering'

     document.getElementById('customIconsMap').click()
     if(filterIsOn == false){
       setTimeout(function(){
         document.getElementById('share-download').click()
       },400)
     }
   },400)

   }
  iconOMO_32 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_32);
  iconOMO_32.innerHTML = '<img src="images/omoIcons/eldersHut.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤካፓ / የሽማግሌ መሰባሰቢያ';
  iconOMO_32.className = 'buttonsSapelli'
  iconOMO_32.onclick = function(){
    setTimeout(function(){

     hideAll()

     screen1 = 'ኤካፓ / የሽማግሌ መሰባሰቢያ'
     imageName1 = 'eldersHut'

     document.getElementById('customIconsMap').click()
     if(filterIsOn == false){
       setTimeout(function(){
         document.getElementById('share-download').click()
       },400)
     }
   },400)

   }

  iconOMO_33 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_33);
  iconOMO_33.className = 'buttonsSapelli'
  iconOMO_33.innerHTML = '<img src="images/omoIcons/recreationCenter.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አፓክ ንቦልያት / መዝናኛ';
  iconOMO_33.onclick = function(){
    setTimeout(function(){

     hideAll()

     screen1 = 'አፓክ ንቦልያት / መዝናኛ'
     imageName1 = 'recreationCenter'

     document.getElementById('customIconsMap').click()
     if(filterIsOn == false){
       setTimeout(function(){
         document.getElementById('share-download').click()
       },400)
     }
   },400)

   }
  iconOMO_34 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_34);
  iconOMO_34.innerHTML = '<img src="images/omoIcons/church.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አካይ አኩጅ / ቤተ ክርስቲያን';
  iconOMO_34.className = 'buttonsSapelli'
  iconOMO_34.onclick = function(){
    setTimeout(function(){

     hideAll()

     screen1 = 'አካይ አኩጅ / ቤተ ክርስቲያን'
     imageName1 = 'church'

     document.getElementById('customIconsMap').click()
     if(filterIsOn == false){
       setTimeout(function(){
         document.getElementById('share-download').click()
       },400)
     }
   },400)

   }
  iconOMO_35 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_35);
  iconOMO_35.className = 'buttonsSapelli'
  iconOMO_35.innerHTML = '<img src="images/omoIcons/boatCrossing.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤዶከት አቱቧ / ጀልባ መሻገሪያ';
  iconOMO_35.onclick = function(){
    setTimeout(function(){

     hideAll()

     screen1 = 'ኤዶከት አቱቧ / ጀልባ መሻገሪያ'
     imageName1 = 'boatCrossing'

     document.getElementById('customIconsMap').click()
     if(filterIsOn == false){
       setTimeout(function(){
         document.getElementById('share-download').click()
       },400)
     }
   },400)

   }
   iconOMO_41 = document.createElement("BUTTON");
    cell.appendChild(iconOMO_41);
   iconOMO_41.innerHTML = '<img src="images/omoIcons/pathTrack.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br> ኤሮት / መንገድ';
   iconOMO_41.className = 'buttonsSapelli'
   iconOMO_41.onclick = function(){

     setTimeout(function(){

      hideAll()
      screen1 = 'ኤሮት / መንገድ'
      imageName1 = 'pathTrack'
      document.getElementById('customIconsMap').click()
      if(filterIsOn == false){
        setTimeout(function(){
          document.getElementById('share-download').click()
        },400)
      }
    },400)

    }
    iconOMO_45 = document.createElement("BUTTON");
     cell.appendChild(iconOMO_45);
    iconOMO_45.innerHTML = '<img src="images/omoIcons/deforestation.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br> አክየፕ አሞኒ / የደን ጭፍጨፋ';
    iconOMO_45.className = 'buttonsSapelli'
    iconOMO_45.onclick = function(){

      setTimeout(function(){

        hideAll()
        screen1 = 'የደን ጭፍጨፋ'
        imageName1 = 'deforestation'
        document.getElementById('customIconsMap').click()
        if(filterIsOn == false){
          setTimeout(function(){
            document.getElementById('share-download').click()
          },400)
        }
      },400)

      }

    iconOMO_42 = document.createElement("BUTTON");
     cell.appendChild(iconOMO_42);
    iconOMO_42.innerHTML = '<img src="images/omoIcons/livestockdisease.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br> ኤደኬ አንግባረን / የእንስሣት በሽታ';
    iconOMO_42.className = 'buttonsSapelli'
    iconOMO_42.onclick = function(){

      setTimeout(function(){

        hideAll()
        screen1 = 'ኤደኬ አንግባረን/የእንስሣት በሽታ'
        imageName1 = 'livestockdisease'
        if(filterIsOn == false){
          generateButtonsLivestockDissease()
           document.getElementById('customIconsGoBack').style.display = 'initial';
           document.getElementById('customIconsMap').style.display = 'none';

           // document.getElementById('customIconsCancel').style.display = 'initial';
         }else{
           document.getElementById('customIconsMap').click()
         }

      },400)

     }
     iconOMO_43 = document.createElement("BUTTON");
      cell.appendChild(iconOMO_43);
     iconOMO_43.innerHTML = '<img src="images/omoIcons/conflictgeneric.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br> አሬዎም / ግጭት';
     iconOMO_43.className = 'buttonsSapelli'
     iconOMO_43.onclick = function(){

       setTimeout(function(){

         hideAll()
         screen1 = 'አሬዎም/ግጭት'
         imageName1 = 'conflictgeneric'
         if(filterIsOn == false){
           generateButtonsConflict()
            document.getElementById('customIconsGoBack').style.display = 'initial';
            document.getElementById('customIconsMap').style.display = 'none';

            // document.getElementById('customIconsCancel').style.display = 'initial';
          }else{
            document.getElementById('customIconsMap').click()
          }

       },400)

      }

      iconOMO_44 = document.createElement("BUTTON");
       cell.appendChild(iconOMO_44);
      iconOMO_44.innerHTML = '<img src="images/omoIcons/fire.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br> አክም / እሳት';
      iconOMO_44.className = 'buttonsSapelli'
      iconOMO_44.onclick = function(){

        setTimeout(function(){

         hideAll()
         screen1 = 'እሳት'
         imageName1 = 'fire'
         document.getElementById('customIconsMap').click()
         if(filterIsOn == false){
           setTimeout(function(){
             document.getElementById('share-download').click()
           },400)
         }
       },400)

       }

  iconOMO_36 = document.createElement("BUTTON");
   cell.appendChild(iconOMO_36);
  iconOMO_36.innerHTML = '<img src="images/omoIcons/unknownOther.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ɔ̂ቺየ / ሌላ';
  iconOMO_36.className = 'buttonsSapelli'
  iconOMO_36.onclick = function(){

    setTimeout(function(){

     hideAll()
     screen1 = 'ɔ̂ቺየ / ሌላ'
     imageName1 = 'unknownOther'
     if(filterIsOn == false){
       generateButtonsEvaluation()
        document.getElementById('customIconsGoBack').style.display = 'initial';
        document.getElementById('customIconsMap').style.display = 'none';

        // document.getElementById('customIconsCancel').style.display = 'initial';
      }else{
        document.getElementById('customIconsMap').click()
      }


   },400)

   }

   return screenChoice && screen1 && imageName1
 }

 /////////////////////////////////////////////////         EVALUATION           ///////////////////////////////////////

 var generateButtonsLivestockDissease = function(){
   scrollToTop()

   screenChoice = 'livestockdissease'

   iconLD1 = document.createElement("BUTTON");
   cell.appendChild(iconLD1);
   iconLD1.innerHTML = '<img src="images/omoIcons/ld1.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አውኮ/ ሳምባ';
   iconLD1.style.backgroundColor = 'red'
   iconLD1.className = 'buttonsSapelli'
   iconLD1.onclick = function(){
     setTimeout(function(){

     hideAll()
     screen2 = 'አውኮ/ ሳምባ'
     imageName2 = 'ld1'


     document.getElementById('customIconsMap').click()
     setTimeout(function(){
       document.getElementById('share-download').click()
     },400)
   },400)

   }

   iconLD2 = document.createElement("BUTTON");
   cell.appendChild(iconLD2);
   iconLD2.className = 'buttonsSapelli'
   iconLD2.innerHTML = '<img src="images/omoIcons/ld2.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤሬሞ/ተቅማት';
   iconLD2.style.backgroundColor = 'blue'
   iconLD2.onclick = function(){
     setTimeout(function(){

     hideAll()
     screen2 = 'ኤሬሞ/ተቅማት'
     imageName2 = 'ld2'

     generateButtonsEvaluation()
   },400)

   }

   iconLD3 = document.createElement("BUTTON");
   cell.appendChild(iconLD3);
   iconLD3.className = 'buttonsSapelli'
   iconLD3.innerHTML = '<img src="images/omoIcons/ld3.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤፕድ/አንትራክስ';
   iconLD3.style.backgroundColor = 'green'
   iconLD3.onclick = function(){
     setTimeout(function(){

     hideAll()
     screen2 = 'ኤፕድ/አንትራክስ'
     imageName2 = 'ld3'

     generateButtonsEvaluation()
   },400)

   }


   iconLD4 = document.createElement("BUTTON");
   cell.appendChild(iconLD4);
   iconLD4.className = 'buttonsSapelli'
   iconLD4.innerHTML = '<img src="images/omoIcons/ld4.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤክሪዮኒት/ቦቭን';
   iconLD4.style.backgroundColor = 'pink'
   iconLD4.onclick = function(){
     setTimeout(function(){

     hideAll()
     screen2 = 'ኤክሪዮኒት/ቦቭን'
     imageName2 = 'ld4'


     document.getElementById('customIconsMap').click()
     setTimeout(function(){
       document.getElementById('share-download').click()
     },400)
   },400)

   }

   iconLD5 = document.createElement("BUTTON");
   cell.appendChild(iconLD5);
   iconLD5.innerHTML = '<img src="images/omoIcons/ld5.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤክቶዎ/ብላክ ለግ';
   iconLD5.style.backgroundColor = 'yellow'
   iconLD5.className = 'buttonsSapelli'
   iconLD5.onclick = function(){
     setTimeout(function(){

     hideAll()
     screen2 = 'ኤክቶዎ/ብላክ ለግ'
     imageName2 = 'ld5'


     document.getElementById('customIconsMap').click()
     setTimeout(function(){
       document.getElementById('share-download').click()
     },400)
   },400)

   }

     iconLD9 = document.createElement("BUTTON");
   cell.appendChild(iconLD9);
   iconLD9.innerHTML = '<img src="images/omoIcons/unknownOther.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ɔ̂ቺየ / ሌላ';
   iconLD9.className = 'buttonsSapelli'
   iconLD9.onclick = function(){
     setTimeout(function(){

     hideAll()
     screen2 = 'ɔ̂ቺየ / ሌላ'
     imageName2 = 'unknownOther'


     document.getElementById('customIconsMap').click()
     setTimeout(function(){
       document.getElementById('share-download').click()
     },400)
   },400)

   }

 return screenChoice && screen2 && imageName2
 }



 var generateButtonsCropType = function(){
   scrollToTop()

   screenChoice = 'croptype'

   iconCT1 = document.createElement("BUTTON");
   cell.appendChild(iconCT1);
   iconCT1.innerHTML = '<img src="images/omoIcons/noFarming.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ማም አክታረ / እርሻ የለም';
   iconCT1.className = 'buttonsSapelli'
   iconCT1.onclick = function(){
     setTimeout(function(){

     hideAll()
     screen2 = 'ማም አክታረ / እርሻ የለም'
     imageName2 = 'noFarming'


     document.getElementById('customIconsMap').click()
     setTimeout(function(){
       document.getElementById('share-download').click()
     },400)
   },400)

   }

   iconCT2 = document.createElement("BUTTON");
   cell.appendChild(iconCT2);
   iconCT2.className = 'buttonsSapelli'
   iconCT2.innerHTML = '<img src="images/omoIcons/maize.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤሮመፖ / በቆሎ';
   iconCT2.onclick = function(){
     setTimeout(function(){

     hideAll()
     screen2 = 'ኤሮመፖ / በቆሎ'
     imageName2 = 'maize'

     generateButtonsEvaluation()
   },400)

   }

   iconCT3 = document.createElement("BUTTON");
   cell.appendChild(iconCT3);
   iconCT3.className = 'buttonsSapelli'
   iconCT3.innerHTML = '<img src="images/omoIcons/sorghum.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ኤሟይ / ማሽላ';
   iconCT3.onclick = function(){
     setTimeout(function(){

     hideAll()
     screen2 = 'ኤሟይ / ማሽላ'
     imageName2 = 'sorghum'

     generateButtonsEvaluation()
   },400)

   }


   iconCT4 = document.createElement("BUTTON");
   cell.appendChild(iconCT4);
   iconCT4.className = 'buttonsSapelli'
   iconCT4.innerHTML = '<img src="images/omoIcons/legumes.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ጥራጥሬዎች';
   iconCT4.onclick = function(){
     setTimeout(function(){

     hideAll()
     screen2 = 'ጥራጥሬዎች'
     imageName2 = 'legumes'

     generateButtonsEvaluation()
   },400)

   }

   iconCT6 = document.createElement("BUTTON");
   cell.appendChild(iconCT6);
   iconCT6.className = 'buttonsSapelli'
   iconCT6.innerHTML = '<img src="images/omoIcons/cropscombined.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>አማን/ማሳ';
   iconCT6.onclick = function(){
     setTimeout(function(){

     hideAll()
     screen2 = 'አማን/ማሳ'
     imageName2 = 'cropscombined'

     generateButtonsEvaluation()
   },400)

   }

   iconCT5 = document.createElement("BUTTON");
   cell.appendChild(iconCT5);
   iconCT5.className = 'buttonsSapelli'
   iconCT5.innerHTML = '<img src="images/omoIcons/unknownOther.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br>ɔ̂ቺየ / ሌላ';
   iconCT5.onclick = function(){
     setTimeout(function(){

     hideAll()
     screen2 = 'ɔ̂ቺየ / ሌላ'
     imageName2 = 'unknownOther'


     document.getElementById('customIconsMap').click()
     setTimeout(function(){
       document.getElementById('share-download').click()
     },400)
   },400)

   }

 return screenChoice && screen2 && screen3 && imageName2
 }

 var generateButtonsEvaluation = function(){
   scrollToTop()


   screenChoice = 'evaluation'

 // human issue
   iconE1 = document.createElement("BUTTON");
   cell.appendChild(iconE1);
   iconE1.className = 'buttonsSapelli'
   iconE1.innerHTML = '<img src="images/omoIcons/Questionmark.png" style="height: 150px; width: 150px; border: 0px solid white" /> ';
   iconE1.onclick = function(){
     setTimeout(function(){

     hideAll()
     screen3 = '❓'
     imageName3 = 'Questionmark'

     document.getElementById('customIconsMap').click()
     setTimeout(function(){
       document.getElementById('share-download').click()
     },400)
   },400)

   }


 //other issues
   iconE2 = document.createElement("BUTTON");
   cell.appendChild(iconE2);
   iconE2.innerHTML = '<img src="images/omoIcons/ThumbsUp.png" style="height: 150px; width: 150px; border: 0px solid white" /> ';
   iconE2.className = 'buttonsSapelli'
   iconE2.onclick = function(){
     setTimeout(function(){

     hideAll()
     screen3 = '👍🏿'
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
     screen3 = '👎🏿'
     imageName3 = 'ThumbsDown'


     document.getElementById('customIconsMap').click()
     setTimeout(function(){
       document.getElementById('share-download').click()
     },400)
   },400)
   }

     return screenChoice && screen3 && imageName3

 }

 var generateButtonsConflict = function(){
   scrollToTop()


   // screenChoice = 'evaluation'

 // human issue
   iconC1 = document.createElement("BUTTON");
   cell.appendChild(iconC1);
   iconC1.className = 'buttonsSapelli'
   iconC1.innerHTML = '<img src="images/omoIcons/conflict1.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br> አኮኮ አንግባረን/የከብት ስርቆት';
   iconC1.onclick = function(){
     setTimeout(function(){

     hideAll()
     screen3 = 'አኮኮ አንግባረን/የከብት ስርቆት'
     imageName3 = 'conflict1'

     document.getElementById('customIconsMap').click()
     setTimeout(function(){
       document.getElementById('share-download').click()
     },400)
   },400)

   }


 //other issues
   iconC2 = document.createElement("BUTTON");
   cell.appendChild(iconC2);
   iconC2.innerHTML = '<img src="images/omoIcons/conflict2.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br> አሬዎም/ግጭት';
   iconC2.className = 'buttonsSapelli'
   iconC2.onclick = function(){
     setTimeout(function(){

     hideAll()
     screen3 = 'አሬዎም/ግጭት'
     imageName3 = 'conflict2'

     document.getElementById('customIconsMap').click()
     setTimeout(function(){
       document.getElementById('share-download').click()
     },400)
   },400)

   }

   // iconC3 = document.createElement("BUTTON");
   // cell.appendChild(iconC3);
   // iconC3.className = 'buttonsSapelli'
   // iconC3.innerHTML = '<img src="images/omoIcons/conflict3.png" style="height: 150px; width: 150px; border: 0px solid white" /> Conflict3';
   // iconC3.onclick = function(){
   //   setTimeout(function(){
   //
   //   hideAll()
   //   screen3 = 'conflict3'
   //   imageName3 = 'conflict3'
   //
   //
   //   document.getElementById('customIconsMap').click()
   //   setTimeout(function(){
   //     document.getElementById('share-download').click()
   //   },400)
   // },400)
   // }

   iconC4 = document.createElement("BUTTON");
   cell.appendChild(iconC4);
   iconC4.className = 'buttonsSapelli'
   iconC4.innerHTML = '<img src="images/omoIcons/unknownOther.png" style="height: 150px; width: 150px; border: 0px solid white" /> </br> ɔ̂ቺየ / ሌላ';
   iconC4.onclick = function(){
     setTimeout(function(){

     hideAll()
     screen3 = 'ɔ̂ቺየ / ሌላ'
     imageName3 = 'unknownOther'


     document.getElementById('customIconsMap').click()
     setTimeout(function(){
       document.getElementById('share-download').click()
     },400)
   },400)
   }

     return screenChoice && screen3 && imageName3

 }
