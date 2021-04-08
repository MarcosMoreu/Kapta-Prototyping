var projectsCreated = false
var sapProjectFirstTime = true
var newProjectButton
var cell
//variable to identify the screen to be used with back button
var screenChoice
var askHelpOrIHelp

//variable to populate the popup
var crop
var stage // used for both attributes and to select specific issues
var landUse
var askHelpOrIHelp
var issueGeneric
var issueSpecific = 'emojiNoSapelli' //if the sapelli project is completed, then the value changes and the string is treated differently in sharedownload.js
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


  cell.style.display = 'none'
  hideAll()
  if(issueSpecific != 'emojiNoSapelli'){
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
    // emojioneareaeditor0.innerHTML =  crop + ' x ' + stage + ' x ' + landUse + ' x ' + askHelpOrIHelp + ' x ' + issueGeneric + ' x ' + issueSpecific
    if(landUse == null){
      landUse = ''
    }
    emojioneareaeditor0.innerHTML =  crop + ' ' + stage + ' ' + landUse + ' ' + askHelpOrIHelp + ' ' + issueSpecific

  }


}

// document.getElementById('showProjects').onclick = function(e){
//   document.getElementById("customIconsCancel").style.display = "none";
//   document.getElementById("showProjects").style.display = "none";
//   newProjectButton.style.display = 'initial';
// }

document.getElementById('customIconsCancel').onclick = function(e){
  hideAll()
  document.getElementById('customIconsGoBack').style.display = 'none'
  document.getElementById('customIconsCancel').style.display = 'none';


  icon7.style.display = 'initial'
  icon6.style.display = 'initial'
  icon5.style.display = 'initial'
  icon4.style.display = 'initial'
  icon3.style.display = 'initial'
  icon2.style.display = 'initial'
  icon1.style.display = 'initial'

  crop = null
  stage = null
  landUses = null
  help = null
  issueGeneric = null
  issueSpecific = 'emojiNoSapelli'
  return  crop && stage && landUses && help && issueGeneric && issueSpecific
}
document.getElementById('customIconsGoBack').onclick = function(e){
//  stage landUse help issuesGeneric issuesSpecific
//   if(screenChoice == 'genericCrop'){
// //  screenChoice = 'genericCrops'
//
//   }
  if(screenChoice == 'specificCrop'){
//  screenChoice = 'genericCrops'
document.getElementById('customIconsCancel').click()

  }
  if(screenChoice == 'stage'){
//  screenChoice = 'genericCrops'
document.getElementById('customIconsCancel').click()

  }
  if(screenChoice == 'landUse'){
//  screenChoice = 'genericCrops'
    hideAll()

    generateButtonsStage()
  }
  if(screenChoice == 'help'){
//  screenChoice = 'genericCrops'
    hideAll()

    generateButtonsStage()
  }
  if(screenChoice == 'issuesGeneric'){
//  screenChoice = 'genericCrops'
    hideAll()
    generateButtonsHelp()
  }
  if(screenChoice == 'issuesSpecific'){
//  screenChoice = 'genericCrops'
    hideAll()
    if(askHelpOrIHelp == '🙋🏿🔴 Mo nilo iranwo'){
      icon67.click()

    }
    if(askHelpOrIHelp == '🙋🏿🟢 Mo le se iranwo'){
      icon68.click()

    }

  }
}

function hideAll(){
  document.querySelectorAll('.buttonsSapelli').forEach(function(el) {
   el.style.display = 'none';
   // generateButtonsGenericCrops()
  });
}
function preload(arrayOfImages) {
  $(arrayOfImages).each(function(){
      try{
          $('<img/>')[0].src = this;
      }catch(e){
        //console.log('image failed to preload')
      }
  });
}


// var newProjectButton
//excites Logo in the map: to open the sapelli project
document.getElementById('sapelliProjects').onclick = function(e){
  document.getElementById("map").style.height = "0px";

  document.getElementById("Cancel").style.display = "none";
  document.getElementById("sapelliProjects").style.display = "none";
  document.getElementById('emoji').style.display = 'none';
  // document.getElementById('showAreaHa').style.display = 'none';
  document.getElementById('showAreaAcres').style.display = 'none';
  document.getElementById('share-download').style.display = 'none';
  document.body.style.background = 'black';
  // document.getElementById('customIconsMap').style.display = 'none';
  document.getElementById('customIconsMap').style.display = 'initial';

    if(projectsCreated == false){


        cell = document.createElement('div')
        document.body.appendChild(cell)
        cell.className = 'gridCell'
        newProjectButton = document.createElement("BUTTON");
        cell.appendChild(newProjectButton);
        newProjectButton.className = 'sapelliProjectsLogo'
        newProjectButton.style.marginBottom = '200px'
        newProjectButton.style.marginLeft = '20px'
        newProjectButton.innerHTML = '<img src="images/logoNigeria.png" style="width:50px ; height:50px; border: 0px solid white" />';
        // cell.style.overflow = 'scroll'

        preload([
          //crops generic
        'images/csaNigeria/Crops/Cereals.png','images/csaNigeria/Crops/Vegetables.png','images/csaNigeria/Crops/Fruits.png','images/csaNigeria/Crops/Tubers.png',"images/csaNigeria/Crops/pulses.png",
        "images/csaNigeria/Crops/cashCrop.png","images/csaNigeria/Crops/nuts.png",
        //Crops
        'images/csaNigeria/Crops/Agbalumo.png','images/csaNigeria/Crops/agbon.png','images/csaNigeria/Crops/amaranthus.png','images/csaNigeria/Crops/Awusa.png',"images/csaNigeria/Crops/banana.png",
        "images/csaNigeria/Crops/beans.png","images/csaNigeria/Crops/Cashew.png",'images/csaNigeria/Crops/cassava.png','images/csaNigeria/Crops/cocoa.png',
        'images/csaNigeria/Crops/cocoyam.png',"images/csaNigeria/Crops/cucumber.png",'images/csaNigeria/Crops/Epa.png',"images/csaNigeria/Crops/Esuru.png",'images/csaNigeria/Crops/ewedu.png',
        "images/csaNigeria/Crops/Ewuro.png","images/csaNigeria/Crops/Fruits.png",'images/csaNigeria/Crops/gbure.png','images/csaNigeria/Crops/irishPotato.png','images/csaNigeria/Crops/Isu Ewura.png',
        'images/csaNigeria/Crops/juteLeaf.png',"images/csaNigeria/Crops/Maize.png",'images/csaNigeria/Crops/mangoro.png',"images/csaNigeria/Crops/Obi.png",'images/csaNigeria/Crops/okro.png',
        "images/csaNigeria/Crops/Ope Oyinbo.png","images/csaNigeria/Crops/orange.png", 'images/csaNigeria/Crops/orogbo.png','images/csaNigeria/Crops/palmTree.png','images/csaNigeria/Crops/Pawpaw-.png',
        'images/csaNigeria/Crops/pepper.png',"images/csaNigeria/Crops/plantain.png",'images/csaNigeria/Crops/rice.png',"images/csaNigeria/Crops/sweetPotato.png",'images/csaNigeria/Crops/tangerine.png',
        "images/csaNigeria/Crops/tapon.png","images/csaNigeria/Crops/tomato.png",'images/csaNigeria/Crops/ugu.png','images/csaNigeria/Crops/watermelon.png','images/csaNigeria/Crops/yam.png',
        'images/csaNigeria/NeedHelp.png','images/csaNigeria/IHelp.png','images/csaNigeria/UnknownOther.png',
        //landUse

        'images/csaNigeria/landUse/bushBurning.png','images/csaNigeria/landUse/forest.png','images/csaNigeria/landUse/herbicides.png','images/csaNigeria/landUse/nonMechanised.png','images/csaNigeria/landUse/pesticides.png',
        'images/csaNigeria/landUse/Tractor.png','images/csaNigeria/landUse/zeroTillage.png',

        //stages
        'images/csaNigeria/stages/BeforePlantingStage.png','images/csaNigeria/stages/HarvestingStage.png','images/csaNigeria/stages/PestControlStage.png','images/csaNigeria/stages/PlantingStage.png',
        'images/csaNigeria/stages/PostHarvestingStage.png','images/csaNigeria/stages/TopDressingStage.png',
      //issues generic
        'images/csaNigeria/ISSUES/IssuesGeneric/climaticGreen.png','images/csaNigeria/ISSUES/IssuesGeneric/climaticRed.png',
        'images/csaNigeria/ISSUES/IssuesGeneric/disseaseGreen.png','images/csaNigeria/ISSUES/IssuesGeneric/disseaseRed.png',
        'images/csaNigeria/ISSUES/IssuesGeneric/marketGreen.png','images/csaNigeria/ISSUES/IssuesGeneric/marketRed.png',
        'images/csaNigeria/ISSUES/IssuesGeneric/pestGreen.png','images/csaNigeria/ISSUES/IssuesGeneric/pestRed.png',
        'images/csaNigeria/ISSUES/IssuesGeneric/postHarvestGreen.png','images/csaNigeria/ISSUES/IssuesGeneric/postHarvestRed.png',
        'images/csaNigeria/ISSUES/IssuesGeneric/soilGreen.png','images/csaNigeria/ISSUES/IssuesGeneric/soilRed.png',
        'images/csaNigeria/ISSUES/IssuesGeneric/weedGreen.png','images/csaNigeria/ISSUES/IssuesGeneric/weedRed.png',
        //issues - 1 climatic
        'images/csaNigeria/ISSUES/ClimaticIssues/Drought.png','images/csaNigeria/ISSUES/ClimaticIssues/erraticRain.png','images/csaNigeria/ISSUES/ClimaticIssues/flood.png',
        'images/csaNigeria/ISSUES/ClimaticIssues/Irrigation.png','images/csaNigeria/ISSUES/ClimaticIssues/sunIntensity.png','images/csaNigeria/ISSUES/ClimaticIssues/wind.png',
        //issues - 2 marker
        'images/csaNigeria/ISSUES/market/DistanceToMarket.png','images/csaNigeria/ISSUES/market/MeansOfTransport.png','images/csaNigeria/ISSUES/market/price.png',
        'images/csaNigeria/ISSUES/market/roadCondition.png','images/csaNigeria/ISSUES/market/supply.png','images/csaNigeria/ISSUES/market/TheBuyer.png',
        //issues - 3 PostHarvestIssues
        'images/csaNigeria/ISSUES//PostHarvestIssues/bagging.png','images/csaNigeria/ISSUES//PostHarvestIssues/drying.png','images/csaNigeria/ISSUES//PostHarvestIssues/rotten.png',
        'images/csaNigeria/ISSUES//PostHarvestIssues/storage.png','images/csaNigeria/ISSUES//PostHarvestIssues/weatherCondition.png',
        //issues - 4 soil
        'images/csaNigeria/ISSUES/soil/Erosion.png','images/csaNigeria/ISSUES/soil/fertilizer.png','images/csaNigeria/ISSUES/soil/hardpan.png','images/csaNigeria/ISSUES/soil/poorSoil.png',
        //issues - 5 Pest
        "images/csaNigeria/ISSUES/Pest/AfricanRootTuberScale.png",
        "images/csaNigeria/ISSUES/Pest/Aphid.png",
        "images/csaNigeria/ISSUES/Pest/armyWorm.png",
        "images/csaNigeria/ISSUES/Pest/AsianCitrusPsyllid.png",
        "images/csaNigeria/ISSUES/Pest/beetle.png",
        "images/csaNigeria/ISSUES/Pest/cassavaGreenMitePest.png",
        "images/csaNigeria/ISSUES/Pest/CocoaPodBorer.png",
        "images/csaNigeria/ISSUES/Pest/coconutScale.png",
        "images/csaNigeria/ISSUES/Pest/Crickets.png",
        "images/csaNigeria/ISSUES/Pest/cutworms.png",
        "images/csaNigeria/ISSUES/Pest/Earworm.png",
        "images/csaNigeria/ISSUES/Pest/GreenLeafhoppers.png",
        "images/csaNigeria/ISSUES/Pest/GreenSemiloopers.png",
        "images/csaNigeria/ISSUES/Pest/leafFolder.png",
        "images/csaNigeria/ISSUES/Pest/leafminer.png",
        "images/csaNigeria/ISSUES/Pest/leafWebber.png",
        "images/csaNigeria/ISSUES/Pest/leaveTwistingWeevil.png",
        "images/csaNigeria/ISSUES/Pest/locust.png",
        "images/csaNigeria/ISSUES/Pest/Mealybugs.png",
        "images/csaNigeria/ISSUES/Pest/mirid.png",
        "images/csaNigeria/ISSUES/Pest/nematodes.png",
        "images/csaNigeria/ISSUES/Pest/pinkHibiscusMealybug.png",
        "images/csaNigeria/ISSUES/Pest/RiceBug.png",
        "images/csaNigeria/ISSUES/Pest/riceGallMidge.png",
        "images/csaNigeria/ISSUES/Pest/rodents.png",
        "images/csaNigeria/ISSUES/Pest/spidermite.png",
        "images/csaNigeria/ISSUES/Pest/squashBugs.png",
        "images/csaNigeria/ISSUES/Pest/stalkBorer.png",
        "images/csaNigeria/ISSUES/Pest/stemBorer.png",
        "images/csaNigeria/ISSUES/Pest/teaserAnt.png",
        "images/csaNigeria/ISSUES/Pest/thrips.png",
        "images/csaNigeria/ISSUES/Pest/TortoiseBeetle.png",
        "images/csaNigeria/ISSUES/Pest/weavils.png",
        "images/csaNigeria/ISSUES/Pest/WhiteGrubLarvae.png",
        "images/csaNigeria/ISSUES/Pest/whorlMaggot.png",
        "images/csaNigeria/ISSUES/Pest/zigzagLeafhopper.png",
        "images/csaNigeria/UnknownOther.png",
        "images/csaNigeria/ISSUES/Dissease/AlternariaLeafBlight.png",
        "images/csaNigeria/ISSUES/Dissease/AlternariaSpotLeafStemBlight.png",
        "images/csaNigeria/ISSUES/Dissease/BacterialFruitBlotchFoilage.png",
        "images/csaNigeria/ISSUES/Dissease/BacterialWilt.png",
        "images/csaNigeria/ISSUES/Dissease/blackbandJute.png",
        "images/csaNigeria/ISSUES/Dissease/blackPod.png",
        "images/csaNigeria/ISSUES/Dissease/blackRot.png",
        "images/csaNigeria/ISSUES/Dissease/blight.png",
        "images/csaNigeria/ISSUES/Dissease/bractmosaicvirus.png",
        "images/csaNigeria/ISSUES/Dissease/budNecrosisDisease.png",
        "images/csaNigeria/ISSUES/Dissease/CassavaRootRot.png",
        "images/csaNigeria/ISSUES/Dissease/CitrusAnthracnose.png",
        "images/csaNigeria/ISSUES/Dissease/citrusGuignardiaCitricarpaBlackSpot.png",
        "images/csaNigeria/ISSUES/Dissease/CitrusLeprosis.png",
        "images/csaNigeria/ISSUES/Dissease/citrusScab.png",
        "images/csaNigeria/ISSUES/Dissease/ColocasiaBobone.png",
        "images/csaNigeria/ISSUES/Dissease/CucumberMosaic.png",
        "images/csaNigeria/ISSUES/Dissease/downyMildew.png",
        "images/csaNigeria/ISSUES/Dissease/FrostyPod.png",
        "images/csaNigeria/ISSUES/Dissease/FusariumWilt.png",
        "images/csaNigeria/ISSUES/Dissease/InternalBrownSpots.png",
        "images/csaNigeria/ISSUES/Dissease/LeafStemScab.png",
        "images/csaNigeria/ISSUES/Dissease/OkraYellowVien.png",
        "images/csaNigeria/ISSUES/Dissease/PhytophthoraBlight.png",
        "images/csaNigeria/ISSUES/Dissease/pigweed.png",
        "images/csaNigeria/ISSUES/Dissease/PowderyMildew.png",
        "images/csaNigeria/ISSUES/Dissease/Pox.png",
        "images/csaNigeria/ISSUES/Dissease/rodent.png",
        "images/csaNigeria/ISSUES/Dissease/rootAphids.png",
        "images/csaNigeria/ISSUES/Dissease/rust.png",
        "images/csaNigeria/ISSUES/Dissease/southernBlight.png",
        "images/csaNigeria/ISSUES/Dissease/stemCutwormBean.png",
        "images/csaNigeria/ISSUES/Dissease/streak.png",
        "images/csaNigeria/ISSUES/Dissease/SweetOrangeScab.png",
        "images/csaNigeria/ISSUES/Dissease/thrips.png",
        "images/csaNigeria/ISSUES/Dissease/thripsTomato.png",
        "images/csaNigeria/ISSUES/Dissease/TomatoMosaic.png",
        "images/csaNigeria/ISSUES/Dissease/VerticilliumWilt.png",
        "images/csaNigeria/ISSUES/Dissease/wetRot.png",
        "images/csaNigeria/ISSUES/Dissease/whiteMold.png",
        "images/csaNigeria/ISSUES/Dissease/whiteRust.png",
        "images/csaNigeria/ISSUES/Dissease/yellowBlacksigatoka.png",

        ]);

  }
  else{
    newProjectButton.style.display = 'initial';
    cell.style.display = 'initial'
    // cell.style.overflow = 'scroll'
  }

// // to show the icons of the project selected
  newProjectButton.onclick = function(){
    // cell.style.overflow =
        if(projectsCreated == false){
          projectsCreated = true
          newProjectButton.innerHTML = '<img src="images/checkingPw.gif" style="width:50px ; height:50px; border: 0px solid white" />';
          newProjectButton.disabled = true
          setTimeout(function(){
            // sapProjectFirstTime = false
            newProjectButton.style.display = 'none';
            generateButtonsGenericCrops()
            newProjectButton.innerHTML = '<img src="images/logoNigeria.png" style="width:50px ; height:50px; border: 0px solid white" />';
            newProjectButton.disabled = false


          },3000)

        }else{
          // sapProjectFirstTime = false
          newProjectButton.style.display = 'none';
          cell.setAttribute("style","overflow-y:scroll");

          generateButtonsGenericCrops()
        }

    }
  return projectsCreated && sapProjectFirstTime && newProjectButton && cell
}

var  icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9, icon10, icon11, icon12, icon13, icon14, icon15, icon16, icon17, icon18, icon19, icon20, icon21, icon22, icon22, icon23, icon24, icon25, icon26,
icon27, icon28, icon29, icon30, icon31, icon32, icon33, icon34, icon35, icon36, icon37, icon38, icon39, icon40, icon41, icon42, icon43, icon44, icon45, icon46, icon47, icon48, icon49, icon50, icon51, icon52, icon53,
icon54, icon55, icon56, icon57, icon58, icon59, icon60, icon61, icon62, icon63, icon64, icon65, icon66, icon67, icon68, icon69, icon70, icon71, icon72, icon73, icon74, icon75, icon76, icon77, icon78, icon79, icon80,
icon81, icon82, icon83, icon84, icon85, icon86, icon87, icon88, icon89, icon90, icon91, icon92, icon93, icon94, icon95, icon96, icon97, icon98, icon99, icon100, icon101, icon102, icon103, icon104, icon105, icon106,
icon107, icon108, icon109, icon110, icon111, icon112, icon113, icon114, icon115, icon116, icon117, icon118, icon119, icon120, icon121,icon122, icon123,icon124, icon125, icon126, icon127, icon128, icon129, icon130,
icon131, icon132, icon133, icon134, icon135, icon136, icon137, icon138, icon139, icon140, icon141, icon142, icon143, icon144, icon145,icon146, icon147, icon148, icon149, icon150, icon151, icon152, icon153, icon154,
icon155, icon156, icon157, icon158, icon159, icon160, icon161, icon162, icon163, icon164, icon165, icon166, icon167, icon168, icon169, icon170, icon171, icon172,
icon69g, icon69r, icon70g, icon70r, icon71g, icon71r, icon72g, icon72r, icon73g, icon73r, icon74g, icon74r, icon75g, icon75r, icon76

// var generateDivElementCell = function(){
//   cell = document.createElement("div");
//   document.body.appendChild(cell);
//   cell.className = 'gridCell'
//   return cell
// }
var generateButtonsGenericCrops = function(){

  screenChoice = 'genericCrops'
  //crops generic
 icon1 = document.createElement("BUTTON");
  cell.appendChild(icon1);
  icon1.className = 'buttonsSapelli'
  icon1.innerHTML = '<img src="images/csaNigeria/Crops/Cereals.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Aro';
  icon1.onclick = function(){
    hideAll()
    generateButtonsCereals()
    document.getElementById('customIconsGoBack').style.display = 'initial'
    document.getElementById('customIconsCancel').style.display = 'initial';

  }

   icon2 = document.createElement("BUTTON");
   cell.appendChild(icon2);
  icon2.innerHTML = '<img src="images/csaNigeria/Crops/Vegetables.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Éwebé';
  icon2.className = 'buttonsSapelli'
  icon2.onclick = function(){
    hideAll()
    generateButtonsVegetables()
    document.getElementById('customIconsGoBack').style.display = 'initial'
    document.getElementById('customIconsCancel').style.display = 'initial';

  }

   icon3 = document.createElement("BUTTON");
   cell.appendChild(icon3);
  icon3.className = 'buttonsSapelli'
  icon3.innerHTML = '<img src="images/csaNigeria/Crops/Fruits.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Èso';
  icon3.onclick = function(){
    hideAll()
    generateButtonsFruits()
    document.getElementById('customIconsGoBack').style.display = 'initial'
    document.getElementById('customIconsCancel').style.display = 'initial';

  }
   icon4 = document.createElement("BUTTON");
   cell.appendChild(icon4);
  icon4.innerHTML = '<img src="images/csaNigeria/Crops/Tubers.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Irè-àtu';
  icon4.className = 'buttonsSapelli'
  icon4.onclick = function(){
    hideAll()
    generateButtonsTubers()
    document.getElementById('customIconsGoBack').style.display = 'initial'
    document.getElementById('customIconsCancel').style.display = 'initial';

  }
   icon5 = document.createElement("BUTTON");
cell.appendChild(icon5);
  icon5.className = 'buttonsSapelli'
  icon5.innerHTML = '<img src="images/csaNigeria/Crops/pulses.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Èwà';
  icon5.onclick = function(){
    hideAll()
    generateButtonsPulses()
    document.getElementById('customIconsGoBack').style.display = 'initial'
    document.getElementById('customIconsCancel').style.display = 'initial';

  }
   icon6 = document.createElement("BUTTON");
  cell.appendChild(icon6);
  icon6.innerHTML = '<img src="images/csaNigeria/Crops/cashCrop.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Cash Crop';
  icon6.className = 'buttonsSapelli'
  icon6.onclick = function(){
    hideAll()
    generateButtonsCashCrop()
    document.getElementById('customIconsGoBack').style.display = 'initial'
    document.getElementById('customIconsCancel').style.display = 'initial';

  }
   icon7 = document.createElement("BUTTON");
  cell.appendChild(icon7);
  icon7.innerHTML = '<img src="images/csaNigeria/Crops/nuts.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Nuts';
  icon7.className = 'buttonsSapelli'
  icon7.onclick = function(){
    hideAll()
    generateButtonsNuts()
    document.getElementById('customIconsGoBack').style.display = 'initial'
    document.getElementById('customIconsCancel').style.display = 'initial';

  }

 return icon1 && icon2 && icon3 && icon4 && icon5 && icon6 && icon7 && screenChoice
}


var generateButtonsCereals = function(){
  screenChoice = 'specificCrop'
  //cereals
  icon8 = document.createElement("BUTTON");
  cell.appendChild(icon8);
  icon8.className = 'buttonsSapelli'
  icon8.innerHTML = '<img src="images/csaNigeria/Crops/Maize.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Àgbàdo';
  icon8.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🌽 Àgbàdo'
  }
  icon9 = document.createElement("BUTTON");
  cell.appendChild(icon9);
  icon9.innerHTML = '<img src="images/csaNigeria/Crops/rice.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ìresì';
  icon9.className = 'buttonsSapelli'
  icon9.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🌾 Ìresì'
  }
  return icon8 && icon9 && screenChoice && crop
}
var generateButtonsVegetables = function(){
  screenChoice = 'specificCrop'
  //Vegetables
  icon10 = document.createElement("BUTTON");
  cell.appendChild(icon10);
  icon10.className = 'buttonsSapelli'
  icon10.innerHTML = '<img src="images/csaNigeria/Crops/okro.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ilá';
  icon10.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🌿 Ilá'
  }
  icon11 = document.createElement("BUTTON");
  cell.appendChild(icon11);
  icon11.innerHTML = '<img src="images/csaNigeria/Crops/pepper.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Atarodo';
  icon11.className = 'buttonsSapelli'
  icon11.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🌿 Atarodo'
  }
  icon12 = document.createElement("BUTTON");
  cell.appendChild(icon12);
  icon12.className = 'buttonsSapelli'
  icon12.innerHTML = '<img src="images/csaNigeria/Crops/tomato.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Tòmátì';
  icon12.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🍅 Tòmátì'
  }
  icon13 = document.createElement("BUTTON");
  cell.appendChild(icon13);
  icon13.innerHTML = '<img src="images/csaNigeria/Crops/cucumber.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Kukumba';
  icon13.className = 'buttonsSapelli'
  icon13.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🥒 Kukumba'

  }
  icon14 = document.createElement("BUTTON");
  cell.appendChild(icon14);
  icon14.className = 'buttonsSapelli'
  icon14.innerHTML = '<img src="images/csaNigeria/Crops/amaranthus.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Tètè';
  icon14.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🌿 Tètè'

  }
  icon15 = document.createElement("BUTTON");
  cell.appendChild(icon15);
  icon15.innerHTML = '<img src="images/csaNigeria/Crops/ugu.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ugu';
  icon15.className = 'buttonsSapelli'
  icon15.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🌿 Ugu'

  }
  icon15b = document.createElement("BUTTON");
  cell.appendChild(icon15b);
  icon15b.innerHTML = '<img src="images/csaNigeria/Crops/soko.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Soko';
  icon15b.className = 'buttonsSapelli'
  icon15b.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🌿 Soko'

  }
  icon16 = document.createElement("BUTTON");
  cell.appendChild(icon16);
  icon16.innerHTML = '<img src="images/csaNigeria/Crops/ewedu.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ewedu';
  icon16.className = 'buttonsSapelli'
  icon16.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🌿 Ewedu'

  }
  icon17 = document.createElement("BUTTON");
  cell.appendChild(icon17);
  icon17.innerHTML = '<img src="images/csaNigeria/Crops/Ewuro.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ewuro';
  icon17.className = 'buttonsSapelli'
  icon17.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🌿 Ewuro'

  }
  icon18 = document.createElement("BUTTON");
  cell.appendChild(icon18);
  icon18.className = 'buttonsSapelli'
  icon18.innerHTML = '<img src="images/csaNigeria/Crops/gbure.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Gbure';
  icon18.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🌿 Gbure'

  }
  icon19 = document.createElement("BUTTON");
  cell.appendChild(icon19);
  icon19.innerHTML = '<img src="images/csaNigeria/Crops/ugu.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ugu';
  icon19.className = 'buttonsSapelli'
  icon19.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🌿 Ugu'

  }
  icon20 = document.createElement("BUTTON");
  cell.appendChild(icon20);
  icon20.innerHTML = '<img src="images/csaNigeria/UnknownOther.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Awon miiran';
  icon20.className = 'buttonsSapelli'
  icon20.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➕ Awon miiran'

  }
  return   screenChoice && crop
  // return icon10 && icon11 && icon12 && icon13 && icon14 && icon15 && icon16 && icon17 && icon18 && icon19 && icon20
}

var generateButtonsFruits = function(){
  screenChoice = 'specificCrop'

  //fruits
  icon21 = document.createElement("BUTTON");
  cell.appendChild(icon21);
  icon21.className = 'buttonsSapelli'
  icon21.innerHTML = '<img src="images/csaNigeria/Crops/watermelon.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Wota-Melon';
  icon21.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🍉 Wota-Melon'

  }
  icon22 = document.createElement("BUTTON");
  cell.appendChild(icon22);
  icon22.innerHTML = '<img src="images/csaNigeria/Crops/banana.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>gèdè-Paranta';
  icon22.className = 'buttonsSapelli'
  icon22.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🍌 Gèdè-Paranta'

  }

  icon23 = document.createElement("BUTTON");
  cell.appendChild(icon23);
  icon23.className = 'buttonsSapelli'
  icon23.innerHTML = '<img src="images/csaNigeria/Crops/plantain.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ògèdè-Agbagba';
  icon23.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🍌 Ògèdè-Agbagba'

  }
  icon24 = document.createElement("BUTTON");
  cell.appendChild(icon24);
  icon24.innerHTML = '<img src="images/csaNigeria/Crops/orange.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Òsàn';
  icon24.className = 'buttonsSapelli'
  icon24.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🍊 Òsàn'

  }
  icon25 = document.createElement("BUTTON");
  cell.appendChild(icon25);
  icon25.className = 'buttonsSapelli'
  icon25.innerHTML = '<img src="images/csaNigeria/Crops/Agbalumo.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Agbalumo';
  icon25.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➡️ Agbalumo'

  }
  icon26 = document.createElement("BUTTON");
  cell.appendChild(icon26);
  icon26.innerHTML = '<img src="images/csaNigeria/Crops/Agbon.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Agbon';
  icon26.className = 'buttonsSapelli'
  icon26.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➡️ Agbon'

  }
  icon27 = document.createElement("BUTTON");
  cell.appendChild(icon27);
  icon27.innerHTML = '<img src="images/csaNigeria/Crops/Cashew.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Cashew';
  icon27.className = 'buttonsSapelli'
  icon27.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➡️ Cashew'

  }
  icon28 = document.createElement("BUTTON");
  cell.appendChild(icon28);
  icon28.innerHTML = '<img src="images/csaNigeria/Crops/mangoro.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Mangoro';
  icon28.className = 'buttonsSapelli'
  icon28.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🥭 Mangoro'

  }
  icon29 = document.createElement("BUTTON");
  cell.appendChild(icon29);
  icon29.className = 'buttonsSapelli'
  icon29.innerHTML = '<img src="images/csaNigeria/Crops/Ope Oyinbo.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ope Oyinbo';
  icon29.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🍍 Ope Oyinbo'

  }
  icon30 = document.createElement("BUTTON");
  cell.appendChild(icon30);
  icon30.innerHTML = '<img src="images/csaNigeria/Crops/Pawpaw-.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ibepe';
  icon30.className = 'buttonsSapelli'
  icon30.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➡️ Ibepe'

  }
  icon31 = document.createElement("BUTTON");
  cell.appendChild(icon31);
  icon31.innerHTML = '<img src="images/csaNigeria/Crops/tapon.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Tapon';
  icon31.className = 'buttonsSapelli'
  icon31.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🍈 Tapon'

  }
  icon32 = document.createElement("BUTTON");
  cell.appendChild(icon32);
  icon32.innerHTML = '<img src="images/csaNigeria/UnknownOther.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Awon miiran';
  icon32.className = 'buttonsSapelli'
  icon32.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➕ Awon miiran'

  }
  return screenChoice && crop

  // return icon21 && icon22 && icon23 && icon13 && icon14 && icon15 && icon16 && icon17 && icon18 && icon19 && icon20

}
var generateButtonsTubers = function(){
  screenChoice = 'specificCrop'

  //Tubers
  icon33 = document.createElement("BUTTON");
  cell.appendChild(icon33);
  icon33.className = 'buttonsSapelli'
  icon33.innerHTML = '<img src="images/csaNigeria/Crops/irishPotato.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ànàmó';
  icon33.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '🥔 Ànàmó'

  }
  icon34 = document.createElement("BUTTON");
  cell.appendChild(icon34);
  icon34.innerHTML = '<img src="images/csaNigeria/Crops/sweetPotato.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Odunkun/Ànàmó';
  icon34.className = 'buttonsSapelli'
  icon34.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➡️ Odunkun/Ànàmó'

  }
  icon35 = document.createElement("BUTTON");
  cell.appendChild(icon35);
  icon35.className = 'buttonsSapelli'
  icon35.innerHTML = '<img src="images/csaNigeria/Crops/cassava.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Gbaguda';
  icon35.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➡️ Gbaguda'

  }
  icon36 = document.createElement("BUTTON");
  cell.appendChild(icon36);
  icon36.innerHTML = '<img src="images/csaNigeria/Crops/cocoyam.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Koko';
  icon36.className = 'buttonsSapelli'
  icon36.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➡️ Koko'

  }
  // icon38 = document.createElement("BUTTON");
  // cell.appendChild(icon38);
  // icon38.className = 'buttonsSapelli'
  // icon38.innerHTML = '<img src="images/csaNigeria/Crops/coco.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Coco';
  // icon38.onclick = function(){
  //   hideAll()
  //   generateButtonsStage()
  //   crop = '➡️ Coco'
  //
  // }
  icon39 = document.createElement("BUTTON");
  cell.appendChild(icon39);
  icon39.innerHTML = '<img src="images/csaNigeria/Crops/Esuru.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Esuru';
  icon39.className = 'buttonsSapelli'
  icon39.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➡️ Esuru'

  }
  icon40 = document.createElement("BUTTON");
  cell.appendChild(icon40);
  icon40.innerHTML = '<img src="images/csaNigeria/Crops/Isu Ewura.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Isu Ewura';
  icon40.className = 'buttonsSapelli'
  icon40.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➡️ Isu Ewura'

  }
  icon41 = document.createElement("BUTTON");
  cell.appendChild(icon41);
  icon41.innerHTML = '<img src="images/csaNigeria/UnknownOther.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Awon miiran';
  icon41.className = 'buttonsSapelli'
  icon41.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➕ Awon miiran'

  }
  return   screenChoice && crop
}
var generateButtonsPulses = function(){
  screenChoice = 'specificCrop'

  //pulses
  icon42 = document.createElement("BUTTON");
  cell.appendChild(icon42);
  icon42.innerHTML = '<img src="images/csaNigeria/Crops/beans.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Beans';
  icon42.className = 'buttonsSapelli'
  icon42.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➡️ Beans'

  }
  icon43 = document.createElement("BUTTON");
  cell.appendChild(icon43);
  icon43.innerHTML = '<img src="images/csaNigeria/UnknownOther.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Awon miiran';
  icon43.className = 'buttonsSapelli'
  icon43.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➕ Awon miiran'

  }
  return screenChoice && crop

}
var generateButtonsCashCrop = function(){
  screenChoice = 'specificCrop'

  //cashCrop
  icon44 = document.createElement("BUTTON");
  cell.appendChild(icon44);
  icon44.innerHTML = '<img src="images/csaNigeria/Crops/cocoa.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Kókò';
  icon44.className = 'buttonsSapelli'
  icon44.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➡️ Kókò'

  }
  icon45 = document.createElement("BUTTON");
  cell.appendChild(icon45);
  icon45.innerHTML = '<img src="images/csaNigeria/Crops/palmTree.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Igi Òpe';
  icon45.className = 'buttonsSapelli'
  icon45.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➡️ Igi Òpe'

  }
  icon46 = document.createElement("BUTTON");
  cell.appendChild(icon46);
  icon46.innerHTML = '<img src="images/csaNigeria/UnknownOther.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Awon miiran';
  icon46.className = 'buttonsSapelli'
  icon46.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➕ Awon miiran'

  }
  return screenChoice && crop

}
var generateButtonsNuts = function(){
  screenChoice = 'specificCrop'

  //Nuts
  // icon47 = document.createElement("BUTTON");
  // cell.appendChild(icon47);
  // icon47.className = 'buttonsSapelli'
  // icon47.innerHTML = '<img src="images/csaNigeria/Crops/Agbon.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Agbon';
  // icon47.onclick = function(){
  //   hideAll()
  //   generateButtonsStage()
  //   crop = 'Agbon'
  //
  // }
  icon48 = document.createElement("BUTTON");
  cell.appendChild(icon48);
  icon48.innerHTML = '<img src="images/csaNigeria/Crops/awusa.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Awusa';
  icon48.className = 'buttonsSapelli'
  icon48.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➡️ Awusa'

  }
  icon49 = document.createElement("BUTTON");
  cell.appendChild(icon49);
  icon49.className = 'buttonsSapelli'
  icon49.innerHTML = '<img src="images/csaNigeria/Crops/Obi.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Obi';
  icon49.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➡️ Obi'

  }
  icon50 = document.createElement("BUTTON");
  cell.appendChild(icon50);
  icon50.innerHTML = '<img src="images/csaNigeria/Crops/orogbo.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Orogbo';
  icon50.className = 'buttonsSapelli'
  icon50.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➡️ Orogbo'

  }
  icon51 = document.createElement("BUTTON");
  cell.appendChild(icon51);
  icon51.className = 'buttonsSapelli'
  icon51.innerHTML = '<img src="images/csaNigeria/Crops/Epa.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Epa';
  icon51.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➡️ Epa'

  }
  icon52 = document.createElement("BUTTON");
  cell.appendChild(icon52);
  icon52.innerHTML = '<img src="images/csaNigeria/UnknownOther.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Awon miiran';
  icon52.className = 'buttonsSapelli'
  icon52.onclick = function(){
    hideAll()
    generateButtonsStage()
    crop = '➕ Awon miiran'

  }
  return   screenChoice && crop
}
var generateButtonsStage = function(){
  screenChoice = 'stage'

  //stage
  icon53 = document.createElement("BUTTON");
  cell.appendChild(icon53);
  icon53.className = 'buttonsSapelli'
  icon53.innerHTML = '<img src="images/csaNigeria/stages/BeforePlantingStage.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ìpalèmó Ogbin';
  icon53.onclick = function(){
    hideAll()
    generateButtonsBeforePlantingStage()
    stage = '⌚ Ìpalèmó Ogbin'
  }
  icon56 = document.createElement("BUTTON");
  cell.appendChild(icon56);
  icon56.innerHTML = '<img src="images/csaNigeria/stages/PlantingStage.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Asiko Gbíngbìn';
  icon56.className = 'buttonsSapelli'
  icon56.onclick = function(){
    hideAll()
    generateButtonsHelp()
    stage = '⌚ Asiko Gbíngbìn'
  }
  icon55 = document.createElement("BUTTON");
  cell.appendChild(icon55);
  icon55.className = 'buttonsSapelli'
  icon55.innerHTML = '<img src="images/csaNigeria/stages/PestControlStage.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Fifin Oko';
  icon55.onclick = function(){
    hideAll()
    generateButtonsPestControlStage()
    stage = '⌚ Fifin Oko'
  }
  icon54 = document.createElement("BUTTON");
  cell.appendChild(icon54);
  icon54.innerHTML = '<img src="images/csaNigeria/stages/TopDressingStage.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Lilo Ajile';
  icon54.className = 'buttonsSapelli'
  icon54.onclick = function(){
    hideAll()
    generateButtonsHelp()
    stage = '⌚ Lilo Ajile'
  }
  icon58 = document.createElement("BUTTON");
  cell.appendChild(icon58);
  icon58.innerHTML = '<img src="images/csaNigeria/stages/HarvestingStage.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Kiko Ere';
  icon58.className = 'buttonsSapelli'
  icon58.onclick = function(){
    hideAll()
    generateButtonsHelp()
    stage = '⌚ Kiko Ere'
  }

  icon57 = document.createElement("BUTTON");
  cell.appendChild(icon57);
  icon57.className = 'buttonsSapelli'
  icon57.innerHTML = '<img src="images/csaNigeria/stages/PostHarvestingStage.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Kikopamo';
  icon57.onclick = function(){
    hideAll()
    generateButtonsHelp()
    stage = '⌚ Kikopamo'
  }

  return stage &&   screenChoice
}
var generateButtonsBeforePlantingStage = function(){
  screenChoice = 'landUse'

  //stage1 - landuse
  icon59 = document.createElement("BUTTON");
  cell.appendChild(icon59);
  icon59.className = 'buttonsSapelli'
  icon59.innerHTML = '<img src="images/csaNigeria/landUse/nonMechanised.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Irinse Ibile';
  icon59.onclick = function(){
    hideAll()
    generateButtonsHelp()
    landUse = '⛏️ Irinse Ibile'
  }
  icon60 = document.createElement("BUTTON");
  cell.appendChild(icon60);
  icon60.innerHTML = '<img src="images/csaNigeria/landUse/Tractor.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Irinse Oyinbo';
  icon60.className = 'buttonsSapelli'
  icon60.onclick = function(){
    hideAll()
    generateButtonsHelp()
    landUse = '🚜 Irinse Oyinbo'

  }
  icon61 = document.createElement("BUTTON");
  cell.appendChild(icon61);
  icon61.className = 'buttonsSapelli'
  icon61.innerHTML = '<img src="images/csaNigeria/landUse/bushBurning.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Oko Sisun';
  icon61.onclick = function(){
    hideAll()
    generateButtonsHelp()
    landUse = '🔥 Oko Sisuno'

  }
  icon63 = document.createElement("BUTTON");
  cell.appendChild(icon63);
  icon63.className = 'buttonsSapelli'
  icon63.innerHTML = '<img src="images/csaNigeria/landUse/herbicides.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Pakopako';
  icon63.onclick = function(){
    hideAll()
    generateButtonsHelp()
    landUse = '🌿🔫 Pakopako'

  }
  icon64 = document.createElement("BUTTON");
  cell.appendChild(icon64);
  icon64.className = 'buttonsSapelli'
  icon64.innerHTML = '<img src="images/csaNigeria/landUse/forest.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Aginju';
  icon64.onclick = function(){
    hideAll()
    generateButtonsHelp()
    landUse = '🌳 Aginju'

  }
  icon64o = document.createElement("BUTTON");
  cell.appendChild(icon64o);
  icon64o.className = 'buttonsSapelli'
  icon64o.innerHTML = '<img src="images/csaNigeria/UnknownOther.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Awon miiran';
  icon64o.onclick = function(){
    hideAll()
    generateButtonsHelp()
    landUse = '➕ Awon miiran'

  }
  return   screenChoice && landUse

}
var generateButtonsPestControlStage = function(){
  screenChoice = 'landUse'

  //stage 2 - Wedding
  icon65 = document.createElement("BUTTON");
  cell.appendChild(icon65);
  icon65.className = 'buttonsSapelli'
  icon65.innerHTML = '<img src="images/csaNigeria/landUse/pesticides.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Pesticides';
  icon65.onclick = function(){
    hideAll()
    generateButtonsHelp()
    landUse = '🦟🔫 Pesticides'

  }
  icon66 = document.createElement("BUTTON");
  cell.appendChild(icon66);
  icon66.innerHTML = '<img src="images/csaNigeria/landUse/herbicides.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Pakopako';
  icon66.className = 'buttonsSapelli'
  icon66.onclick = function(){
    hideAll()
    generateButtonsHelp()
    landUse = '🌿🔫 Pakopako'

  }
  return   screenChoice && landUse
}
var generateButtonsHelp = function(){
  screenChoice = 'help'


  //ask or provide help
  icon67 = document.createElement("BUTTON");
  cell.appendChild(icon67);
  icon67.className = 'buttonsSapelli'
  icon67.innerHTML = '<img src="images/csaNigeria/NeedHelp.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Mo nilo iranwo';

  icon67.onclick = function(){
    askHelpOrIHelp = '🙋🏿🔴 Mo nilo iranwo'

    generateIssuesGeneric()
    hideAll()
    if(stage == '⌚ Ìpalèmó Ogbin'){
      icon69r.style.display = 'initial' //climatic
      icon74r.style.display = 'initial' //soil
      icon75r.style.display = 'initial' //weed
      icon76.style.display = 'initial' //other
    }
    if(stage == '⌚ Asiko Gbíngbìn'){
      icon70r.style.display = 'initial' //dissease
      icon72r.style.display = 'initial' //pest
      icon69r.style.display = 'initial' //climatic
      icon74r.style.display = 'initial' //soil
      icon76.style.display = 'initial' //other
    }
    if(stage == '⌚ Fifin Oko'){
      icon70r.style.display = 'initial' //dissease
      icon72r.style.display = 'initial' //pest
      icon75r.style.display = 'initial' //weed
      icon76.style.display = 'initial' //other
    }
    if(stage == '⌚ Lilo Ajile'){
      icon70r.style.display = 'initial' //dissease
      icon72r.style.display = 'initial' //pest
      icon69r.style.display = 'initial' //climatic
      icon74r.style.display = 'initial' //soil
      icon76.style.display = 'initial' //other
    }
    if(stage == '⌚ Kiko Ere'){
      icon70r.style.display = 'initial' //dissease
      icon72r.style.display = 'initial' //pest
      icon69r.style.display = 'initial' //climatic
      icon71r.style.display = 'initial' //market
      icon73r.style.display = 'initial' //postharvest
      icon75r.style.display = 'initial' //weed
    }
    if(stage == '⌚ Kikopamo'){
      icon70r.style.display = 'initial' //dissease
      icon72r.style.display = 'initial' //pest
      icon69r.style.display = 'initial' //climatic
      icon71r.style.display = 'initial' //market
      icon73r.style.display = 'initial' //postharvest
      icon75r.style.display = 'initial' //weed
    }


  }
  icon68 = document.createElement("BUTTON");
  cell.appendChild(icon68);
  icon68.innerHTML = '<img src="images/csaNigeria/IHelp.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Mo le se iranwo';
  icon68.className = 'buttonsSapelli'
  icon68.onclick = function(){
    askHelpOrIHelp = '🙋🏿🟢 Mo le se iranwo'

    generateIssuesGeneric()
    hideAll()
    if(stage == '⌚ Ìpalèmó Ogbin'){
      icon69g.style.display = 'initial' //climatic
      icon74g.style.display = 'initial' //soil
      icon75g.style.display = 'initial' //weed
      icon76.style.display = 'initial' //other
    }
    if(stage == '⌚ Asiko Gbíngbìn'){
      icon70g.style.display = 'initial' //dissease
      icon72g.style.display = 'initial' //pest
      icon69g.style.display = 'initial' //climatic
      icon74g.style.display = 'initial' //soil
      icon76.style.display = 'initial' //other

    }
    if(stage == '⌚ Fifin Oko'){
      icon70g.style.display = 'initial' //dissease
      icon72g.style.display = 'initial' //pest
      icon75g.style.display = 'initial' //weed
      icon76.style.display = 'initial' //other


    }
    if(stage == '⌚ Lilo Ajile'){
      icon70g.style.display = 'initial' //dissease
      icon72g.style.display = 'initial' //pest
      icon69g.style.display = 'initial' //climatic
      icon74g.style.display = 'initial' //soil
      icon76.style.display = 'initial' //other
    }
    if(stage == '⌚ Kiko Ere'){
      icon70g.style.display = 'initial' //dissease
      icon72g.style.display = 'initial' //pest
      icon69g.style.display = 'initial' //climatic
      icon71g.style.display = 'initial' //market
      icon73g.style.display = 'initial' //postharvest
      icon75g.style.display = 'initial' //weed
      icon76.style.display = 'initial' //other

    }
    if(stage == '⌚ Kikopamo'){
      icon70g.style.display = 'initial' //dissease
      icon72g.style.display = 'initial' //pest
      icon69g.style.display = 'initial' //climatic
      icon71g.style.display = 'initial' //market
      icon73g.style.display = 'initial' //postharvest
      icon75g.style.display = 'initial' //weed
      icon76.style.display = 'initial' //other

    }

  }
  // console.log('crop ',crop)
  // console.log('stage ',stage)
  // console.log('landUses ',landUse)
  // console.log('help ',help)

  return   screenChoice && askHelpOrIHelp
}

var generateIssuesGeneric = function(){
  screenChoice = 'issuesGeneric'

  //generic Issues
  icon69g = document.createElement("BUTTON");
  cell.appendChild(icon69g);
  icon69g.className = 'buttonsSapelli'
  icon69g.innerHTML = '<img src="images/csaNigeria/ISSUES/IssuesGeneric/climaticGreen.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ipenija Ojuojo';
  icon69g.onclick = function(){
    hideAll()
    generateIssuesClimatic()
    issueGeneric = 'Ipenija Ojuojo'
  }

  icon69r = document.createElement("BUTTON");
  cell.appendChild(icon69r);
  icon69r.className = 'buttonsSapelli'
  icon69r.innerHTML = '<img src="images/csaNigeria/ISSUES/IssuesGeneric/climaticRed.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ipenija Ojuojo';
  icon69r.onclick = function(){
    hideAll()
    generateIssuesClimatic()
    issueGeneric = 'Ipenija Ojuojo'

  }

  icon70g = document.createElement("BUTTON");
  cell.appendChild(icon70g);
  icon70g.className = 'buttonsSapelli'
  icon70g.innerHTML = '<img src="images/csaNigeria/ISSUES/IssuesGeneric/disseaseGreen.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Arun';
  icon70g.onclick = function(){
    hideAll()
    generateIssuesDissease()
    issueGeneric = 'Arun'

  }

  icon70r = document.createElement("BUTTON");
  cell.appendChild(icon70r);
  icon70r.className = 'buttonsSapelli'
  icon70r.innerHTML = '<img src="images/csaNigeria/ISSUES/IssuesGeneric/disseaseRed.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Arun';
  icon70r.onclick = function(){
    hideAll()
    generateIssuesDissease()
    issueGeneric = 'Arun'

  }

  icon71g = document.createElement("BUTTON");
  cell.appendChild(icon71g);
  icon71g.className = 'buttonsSapelli'
  icon71g.innerHTML = '<img src="images/csaNigeria/ISSUES/IssuesGeneric/marketGreen.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ipenija oja';
  icon71g.onclick = function(){
    hideAll()
    generateIssuesMarket()
    issueGeneric = 'Ipenija oja'

  }

  icon71r = document.createElement("BUTTON");
  cell.appendChild(icon71r);
  icon71r.className = 'buttonsSapelli'
  icon71r.innerHTML = '<img src="images/csaNigeria/ISSUES/IssuesGeneric/marketRed.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ipenija oja';
  icon71r.onclick = function(){
    hideAll()
    generateIssuesMarket()
    issueGeneric = 'Ipenija oja'

  }
  icon72g = document.createElement("BUTTON");
  cell.appendChild(icon72g);
  icon72g.className = 'buttonsSapelli'
  icon72g.innerHTML = '<img src="images/csaNigeria/ISSUES/IssuesGeneric/pestGreen.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Kokoro Ajenirun';
  icon72g.onclick = function(){
    hideAll()
    generateIssuesPests()
    issueGeneric = 'Kokoro Ajenirun'

  }

  icon72r = document.createElement("BUTTON");
  cell.appendChild(icon72r);
  icon72r.className = 'buttonsSapelli'
  icon72r.innerHTML = '<img src="images/csaNigeria/ISSUES/IssuesGeneric/pestRed.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Kokoro Ajenirun';
  icon72r.onclick = function(){
    hideAll()
    generateIssuesPests()
    issueGeneric = 'Kokoro Ajenirun'

  }
  icon73g = document.createElement("BUTTON");
  cell.appendChild(icon73g);
  icon73g.className = 'buttonsSapelli'
  icon73g.innerHTML = '<img src="images/csaNigeria/ISSUES/IssuesGeneric/postHarvestGreen.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ipenija leyin ikore';
  icon73g.onclick = function(){
    hideAll()
    generateIssuesPostHarvest()
    issueGeneric = 'Ipenija leyin ikore'

  }
  icon73r = document.createElement("BUTTON");
  cell.appendChild(icon73r);
  icon73r.className = 'buttonsSapelli'
  icon73r.innerHTML = '<img src="images/csaNigeria/ISSUES/IssuesGeneric/postHarvestRed.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ipenija leyin ikore';
  icon73r.onclick = function(){
    hideAll()
    generateIssuesPostHarvest()
    issueGeneric = 'Ipenija leyin ikore'

  }
  icon74g = document.createElement("BUTTON");
  cell.appendChild(icon74g);
  icon74g.className = 'buttonsSapelli'
  icon74g.innerHTML = '<img src="images/csaNigeria/ISSUES/IssuesGeneric/soilGreen.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ipenija Ile';
  icon74g.onclick = function(){
    hideAll()
    generateIssuesSoil()
    issueGeneric = 'Ipenija Ile'

  }
  icon74r = document.createElement("BUTTON");
  cell.appendChild(icon74r);
  icon74r.className = 'buttonsSapelli'
  icon74r.innerHTML = '<img src="images/csaNigeria/ISSUES/IssuesGeneric/soilRed.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ipenija Ile';
  icon74r.onclick = function(){
    hideAll()
    generateIssuesSoil()
    issueGeneric = 'Ipenija Ile'

  }
  icon75g = document.createElement("BUTTON"); ////////??????!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  cell.appendChild(icon75g);
  icon75g.className = 'buttonsSapelli'
  icon75g.innerHTML = '<img src="images/csaNigeria/ISSUES/IssuesGeneric/weedGreen.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Weed Issues';
  icon75g.onclick = function(){
    hideAll()
    issueGeneric = 'Weed'
    issueSpecific = '🌿 Weed'
    document.getElementById('customIconsMap').click()
    setTimeout(function(){

  document.getElementById('share-download').click()

    },1000)


  }
  icon75r = document.createElement("BUTTON");
  cell.appendChild(icon75r);
  icon75r.className = 'buttonsSapelli'
  icon75r.innerHTML = '<img src="images/csaNigeria/ISSUES/IssuesGeneric/weedRed.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>WeedIssues';
  icon75r.onclick = function(){
    hideAll()
    issueGeneric = 'Weed'
    issueSpecific = '🌿 Weed'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }
  icon76 = document.createElement("BUTTON");
  cell.appendChild(icon76);
  icon76.className = 'buttonsSapelli'
  icon76.innerHTML = '<img src="images/csaNigeria/UnknownOther.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Awon miiran';
  icon76.onclick = function(){
    hideAll()
    issueGeneric = '➕ Awon miiran'
    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }
  return   screenChoice && icon69g && icon69r && icon70g && icon70r && icon71g && icon71r && icon72g && icon72r && icon73g && icon73r && icon74g && icon74r && icon75g && icon75r && icon76
}

var generateIssuesClimatic = function(){
  screenChoice = 'issuesSpecific'

  //climatic issues - 1

  icon77 = document.createElement("BUTTON");
  cell.appendChild(icon77);
  icon77.className = 'buttonsSapelli'
  icon77.innerHTML = '<img src="images/csaNigeria/ISSUES/ClimaticIssues/Drought.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ògbelè';
  icon77.onclick = function(){
    hideAll()
    issueSpecific = '💧 Ògbelè'
    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon78 = document.createElement("BUTTON");
  cell.appendChild(icon78);
  icon78.innerHTML = '<img src="images/csaNigeria/ISSUES/ClimaticIssues/erraticRain.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Òjò Ségesège';
  icon78.className = 'buttonsSapelli'
  icon78.onclick = function(){
    hideAll()
    issueSpecific = '💦 Òjò Ségesège'
    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }
  icon79 = document.createElement("BUTTON");
  cell.appendChild(icon79);
  icon79.className = 'buttonsSapelli'
  icon79.innerHTML = '<img src="images/csaNigeria/ISSUES/ClimaticIssues/flood.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ikùn Omi';
  icon79.onclick = function(){
    hideAll()
    issueSpecific = '⛈️ Ikùn Omi'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }
  icon80 = document.createElement("BUTTON");
  cell.appendChild(icon80);
  icon80.innerHTML = '<img src="images/csaNigeria/ISSUES/ClimaticIssues/Irrigation.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Irrigeson';
  icon80.className = 'buttonsSapelli'
  icon80.onclick = function(){
    hideAll()
    issueSpecific = '🚿 Irrigeson'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }
  icon81 = document.createElement("BUTTON");
  cell.appendChild(icon81);
  icon81.className = 'buttonsSapelli'
  icon81.innerHTML = '<img src="images/csaNigeria/ISSUES/ClimaticIssues/sunIntensity.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Orun lile';
  icon81.onclick = function(){
    hideAll()
    issueSpecific = '☀️🌡️ Orun lile'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)



  }
  icon82 = document.createElement("BUTTON");
  cell.appendChild(icon82);
  icon82.innerHTML = '<img src="images/csaNigeria/ISSUES/ClimaticIssues/wind.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Afefe lile';
  icon82.className = 'buttonsSapelli'
  icon82.onclick = function(){
    hideAll()
    issueSpecific = '💨 Afefe lile'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }
  return   screenChoice
}
var generateIssuesMarket = function(){
  screenChoice = 'issuesSpecific'

  //market issues - 2
  icon83 = document.createElement("BUTTON");
  cell.appendChild(icon83);
  icon83.className = 'buttonsSapelli'
  icon83.innerHTML = '<img src="images/csaNigeria/ISSUES/market/price.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Àdíyelé';
  icon83.onclick = function(){
    hideAll()
    issueSpecific = '💰 Àdíyelé'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon84 = document.createElement("BUTTON");
  cell.appendChild(icon84);
  icon84.innerHTML = '<img src="images/csaNigeria/ISSUES/market/supply.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ìpèsè';
  icon84.className = 'buttonsSapelli'
  icon84.onclick = function(){
    hideAll()
    issueSpecific = '🚚 Ìpèsè'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon85 = document.createElement("BUTTON");
  cell.appendChild(icon85);
  icon85.className = 'buttonsSapelli'
  icon85.innerHTML = '<img src="images/csaNigeria/ISSUES/market/TheBuyer.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Oñra';
  icon85.onclick = function(){
    hideAll()
    issueSpecific = '👔 Oñra'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon86 = document.createElement("BUTTON");
  cell.appendChild(icon86);
  icon86.innerHTML = '<img src="images/csaNigeria/ISSUES/market/roadCondition.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ipò Òpópónà';
  icon86.className = 'buttonsSapelli'
  icon86.onclick = function(){
    hideAll()
    issueSpecific = '🚧 Ipò Òpópónà'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon87 = document.createElement("BUTTON");
  cell.appendChild(icon87);
  icon87.className = 'buttonsSapelli'
  icon87.innerHTML = '<img src="images/csaNigeria/ISSUES/market/DistanceToMarket.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Jijinna Si Oja';
  icon87.onclick = function(){
    hideAll()
    issueSpecific = '🕖 Jijinna Si Oja'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon88 = document.createElement("BUTTON");
  cell.appendChild(icon88);
  icon88.innerHTML = '<img src="images/csaNigeria/ISSUES/market/MeansOfTransport.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Atigbe';
  icon88.className = 'buttonsSapelli'
  icon88.onclick = function(){
    hideAll()
    issueSpecific = '🚌 Atigbe'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }
  return   screenChoice

}

var generateIssuesPostHarvest = function(){
  screenChoice = 'issuesSpecific'

  //postharvest issues - 3
  icon89 = document.createElement("BUTTON");
  cell.appendChild(icon89);
  icon89.innerHTML = '<img src="images/csaNigeria/ISSUES/PostHarvestIssues/storage.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Títójú';
  icon89.className = 'buttonsSapelli'
  icon89.onclick = function(){
    hideAll()
    issueSpecific = '🔒 Títójú'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon90 = document.createElement("BUTTON");
  cell.appendChild(icon90);
  icon90.className = 'buttonsSapelli'
  icon90.innerHTML = '<img src="images/csaNigeria/ISSUES/PostHarvestIssues/bagging.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Kikosàpo';
  icon90.onclick = function(){
    hideAll()
    issueSpecific = '🧺 Kikosàpo'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon91 = document.createElement("BUTTON");
  cell.appendChild(icon91);
  icon91.innerHTML = '<img src="images/csaNigeria/ISSUES/PostHarvestIssues/rotten.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Rírà';
  icon91.className = 'buttonsSapelli'
  icon91.onclick = function(){
    hideAll()
    issueSpecific = '⚫ Rírà'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon92 = document.createElement("BUTTON");
  cell.appendChild(icon92);
  icon92.className = 'buttonsSapelli'
  icon92.innerHTML = '<img src="images/csaNigeria/ISSUES/PostHarvestIssues/weatherCondition.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Oju Ojo';
  icon92.onclick = function(){
    hideAll()
    issueSpecific = '🌦️ Oju Ojo'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon93 = document.createElement("BUTTON");
  cell.appendChild(icon93);
  icon93.innerHTML = '<img src="images/csaNigeria/ISSUES/PostHarvestIssues/drying.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Sisa pelu orun';
  icon93.className = 'buttonsSapelli'
  icon93.onclick = function(){
    hideAll()
    issueSpecific = '🌞 Sisa pelu orun'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }
  return screenChoice

}
var generateIssuesSoil = function(){
  screenChoice = 'issuesSpecific'

  // soil issues - 4
  icon94 = document.createElement("BUTTON");
  cell.appendChild(icon94);
  icon94.className = 'buttonsSapelli'
  icon94.innerHTML = '<img src="images/csaNigeria/ISSUES/soil/poorSoil.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Asálè';
  icon94.onclick = function(){
    hideAll()
    issueSpecific = '🟫 Asálè'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon95 = document.createElement("BUTTON");
  cell.appendChild(icon95);
  icon95.innerHTML = '<img src="images/csaNigeria/ISSUES/soil/Erosion.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Àgbàrá';
  icon95.className = 'buttonsSapelli'
  icon95.onclick = function(){
    hideAll()
    issueSpecific = '🟫 Àgbàrá'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon96 = document.createElement("BUTTON");
  cell.appendChild(icon96);
  icon96.className = 'buttonsSapelli'
  icon96.innerHTML = '<img src="images/csaNigeria/ISSUES/soil/hardpan.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>IleLile';
  icon96.onclick = function(){
    hideAll()
    issueSpecific = '🟫 IleLile'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon97 = document.createElement("BUTTON");
  cell.appendChild(icon97);
  icon97.innerHTML = '<img src="images/csaNigeria/ISSUES/soil/fertilizer.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ajile';
  icon97.className = 'buttonsSapelli'
  icon97.onclick = function(){
    hideAll()
    issueSpecific = '🟫 Ajile'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }
  return screenChoice

}
var generateIssuesPests = function(){
  screenChoice = 'issuesSpecific'

  //pest issues - 5
  icon98 = document.createElement("BUTTON");
  cell.appendChild(icon98);
  icon98.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/AfricanRootTuberScale.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>AfricanRootTuber';
  icon98.className = 'buttonsSapelli'
  icon98.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛 Root TuberScale'
    // console.log('crop ',crop)
    // console.log('stage ',stage)
    // console.log('landUses ',landUse)
    // console.log('help ',askHelpOrIHelp)
    // console.log('issueSpecific ',issueSpecific)

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon99 = document.createElement("BUTTON");
  cell.appendChild(icon99);
  icon99.className = 'buttonsSapelli'
  icon99.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/Aphid.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Eera';
  icon99.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Eera'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon100 = document.createElement("BUTTON");
  cell.appendChild(icon100);
  icon100.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/armyWorm.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Monnimoni';
  icon100.className = 'buttonsSapelli'
  icon100.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Monnimoni'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon101 = document.createElement("BUTTON");
  cell.appendChild(icon101);
  icon101.className = 'buttonsSapelli'
  icon101.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/AsianCitrusPsyllid.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Asian Citrus Psyllidst';
  icon101.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Asian Citrus Psyllidst'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon102 = document.createElement("BUTTON");
  cell.appendChild(icon102);
  icon102.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/beetle.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Labonbon';
  icon102.className = 'buttonsSapelli'
  icon102.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Labonbon'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon103 = document.createElement("BUTTON");
  cell.appendChild(icon103);
  icon103.className = 'buttonsSapelli'
  icon103.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/cassavaGreenMitePest.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Cassava Greenmite';
  icon103.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Cassava Greenmite'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon104 = document.createElement("BUTTON");
  cell.appendChild(icon104);
  icon104.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/CocoaPodBorer.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Cocoa PodBorert';
  icon104.className = 'buttonsSapelli'
  icon104.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Cocoa PodBorert'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon105 = document.createElement("BUTTON");
  cell.appendChild(icon105);
  icon105.className = 'buttonsSapelli'
  icon105.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/coconutScale.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ipaa';
  icon105.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Ipaa'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon106 = document.createElement("BUTTON");
  cell.appendChild(icon106);
  icon106.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/Crickets.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Iree';
  icon106.className = 'buttonsSapelli'
  icon106.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Iree'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon107 = document.createElement("BUTTON");
  cell.appendChild(icon107);
  icon107.className = 'buttonsSapelli'
  icon107.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/cutworms.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Okoo';
  icon107.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Okoo'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)


  }

  icon108 = document.createElement("BUTTON");
  cell.appendChild(icon108);
  icon108.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/Earworm.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Elete';
  icon108.className = 'buttonsSapelli'
  icon108.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Elete'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon109 = document.createElement("BUTTON");
  cell.appendChild(icon109);
  icon109.className = 'buttonsSapelli'
  icon109.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/GreenLeafhoppers.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Dakodako';
  icon109.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Dakodako'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon110 = document.createElement("BUTTON");
  cell.appendChild(icon110);
  icon110.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/GreenSemiloopers.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Tata';
  icon110.className = 'buttonsSapelli'
  icon110.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Tata'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon111 = document.createElement("BUTTON");
  cell.appendChild(icon111);
  icon111.className = 'buttonsSapelli'
  icon111.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/leafFolder.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Leaf Folder';
  icon111.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Leaf Folder'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon112 = document.createElement("BUTTON");
  cell.appendChild(icon112);
  icon112.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/leafminer.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Leaf Miner';
  icon112.className = 'buttonsSapelli'
  icon112.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Leaf Minerr'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon113 = document.createElement("BUTTON");
  cell.appendChild(icon113);
  icon113.className = 'buttonsSapelli'
  icon113.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/leafWebber.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Leaf Webber';
  icon113.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Leaf Webber'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon114 = document.createElement("BUTTON");
  cell.appendChild(icon114);
  icon114.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/leaveTwistingWeevil.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Leaf TwistingWeevil';
  icon114.className = 'buttonsSapelli'
  icon114.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Leaf TwistingWeevil'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon115 = document.createElement("BUTTON");
  cell.appendChild(icon115);
  icon115.className = 'buttonsSapelli'
  icon115.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/locust.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Eesu';
  icon115.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Eesu'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon116 = document.createElement("BUTTON");
  cell.appendChild(icon116);
  icon116.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/Mealybugs.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>EsuuIree';
  icon116.className = 'buttonsSapelli'
  icon116.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 EsuuIree'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon117 = document.createElement("BUTTON");
  cell.appendChild(icon117);
  icon117.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/mirid.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>KokoroOwu';
  icon117.className = 'buttonsSapelli'
  icon117.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 KokoroOwu'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon118 = document.createElement("BUTTON");
  cell.appendChild(icon118);
  icon118.className = 'buttonsSapelli'
  icon118.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/nematodes.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ilepa';
  icon118.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Ilepa'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon119 = document.createElement("BUTTON");
  cell.appendChild(icon119);
  icon119.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/pinkHibiscusMealybug.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Pink Hibiscus Mealybug';
  icon119.className = 'buttonsSapelli'
  icon119.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Pink HibiscusMealybug'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon120 = document.createElement("BUTTON");
  cell.appendChild(icon120);
  icon120.className = 'buttonsSapelli'
  icon120.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/RiceBug.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Rice Bug';
  icon120.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Rice Bug'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon121 = document.createElement("BUTTON");
  cell.appendChild(icon121);
  icon121.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/riceGallMidge.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>RiceGallMidge';
  icon121.className = 'buttonsSapelli'
  icon121.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 RiceGallMidge'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon122 = document.createElement("BUTTON");
  cell.appendChild(icon122);
  icon122.className = 'buttonsSapelli'
  icon122.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/rodents.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Ekute/Lanka';
  icon122.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Ekute/Lanka'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon123 = document.createElement("BUTTON");
  cell.appendChild(icon123);
  icon123.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/spidermite.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>AlantakunEwe';
  icon123.className = 'buttonsSapelli'
  icon123.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 AlantakunEwe'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon124 = document.createElement("BUTTON");
  cell.appendChild(icon124);
  icon124.className = 'buttonsSapelli'
  icon124.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/squashBugs.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>SquashBugs';
  icon124.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 SquashBugs'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon126 = document.createElement("BUTTON");
  cell.appendChild(icon126);
  icon126.className = 'buttonsSapelli'
  icon126.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/stalkBorer.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>StalkBorer';
  icon126.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 StalkBorer'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon127 = document.createElement("BUTTON");
  cell.appendChild(icon127);
  icon127.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/stemBorer.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Elepete';
  icon127.className = 'buttonsSapelli'
  icon127.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Elepete'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon128 = document.createElement("BUTTON");
  cell.appendChild(icon128);
  icon128.className = 'buttonsSapelli'
  icon128.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/teaserAnt.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Salamon';
  icon128.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Salamon'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon129 = document.createElement("BUTTON");
  cell.appendChild(icon129);
  icon129.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/thrips.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Thrips';
  icon129.className = 'buttonsSapelli'
  icon129.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Thrips'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon130 = document.createElement("BUTTON");
  cell.appendChild(icon130);
  icon130.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/TortoiseBeetle.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Tortoise Beetle';
  icon130.className = 'buttonsSapelli'
  icon130.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Tortoise Beetle'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon131 = document.createElement("BUTTON");
  cell.appendChild(icon131);
  icon131.className = 'buttonsSapelli'
  icon131.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/weavils.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Kokoro Agbado';
  icon131.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 Kokoro Agbado'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon132 = document.createElement("BUTTON");
  cell.appendChild(icon132);
  icon132.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/WhiteGrubLarvae.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>White Grub Larvae';
  icon132.className = 'buttonsSapelli'
  icon132.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 White Grub Larvae'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon133 = document.createElement("BUTTON");
  cell.appendChild(icon133);
  icon133.className = 'buttonsSapelli'
  icon133.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/whorlMaggot.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>WhorlMaggot';
  icon133.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 WhorlMaggot'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon134 = document.createElement("BUTTON");
  cell.appendChild(icon134);
  icon134.innerHTML = '<img src="images/csaNigeria/ISSUES/Pest/zigzagLeafhopper.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>ZigZag LeafHopper';
  icon134.className = 'buttonsSapelli'
  icon134.onclick = function(){
    hideAll()
    issueSpecific = '🕷️🐛🦋🐞 ZigZag LeafHopper'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon134o = document.createElement("BUTTON");
  cell.appendChild(icon134o);
  icon134o.innerHTML = '<img src="images/csaNigeria/UnknownOther.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Awon miiran';
  icon134o.className = 'buttonsSapelli'
  icon134o.onclick = function(){
    hideAll()
    issueSpecific = '➕ Awon miiran'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }
  return screenChoice && issueSpecific

}

var generateIssuesDissease = function(){
  screenChoice = 'issuesSpecific'

  icon135 = document.createElement("BUTTON");
  cell.appendChild(icon135);
  icon135.className = 'buttonsSapelli'
  icon135.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/AlternariaLeafBlight.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Alternaria Leaf Blight';
  icon135.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Alternaria LeafBlight'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon136 = document.createElement("BUTTON");
  cell.appendChild(icon136);
  icon136.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/AlternariaSpotLeafStemBlight.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Alternaria Leaf Stem';
  icon136.className = 'buttonsSapelli'
  icon136.onclick = function(){
    hideAll()
    issueSpecific = '🟤 lternaria LeafStem'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon137 = document.createElement("BUTTON");
  cell.appendChild(icon137);
  icon137.className = 'buttonsSapelli'
  icon137.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/BacterialFruitBlotchFoilage.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Bacterial Fruit Blotch';
  icon137.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Bacterial FruitBlotch'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon138 = document.createElement("BUTTON");
  cell.appendChild(icon138);
  icon138.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/BacterialWilt.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Bacterial Wilt';
  icon138.className = 'buttonsSapelli'
  icon138.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Bacterial Wilt'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon139 = document.createElement("BUTTON");
  cell.appendChild(icon139);
  icon139.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/blackbandJute.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Black BankJute';
  icon139.className = 'buttonsSapelli'
  icon139.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Black BankJute'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon140 = document.createElement("BUTTON");
  cell.appendChild(icon140);
  icon140.className = 'buttonsSapelli'
  icon140.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/blackPod.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Aduu';
  icon140.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Aduu'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon141 = document.createElement("BUTTON");
  cell.appendChild(icon141);
  icon141.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/blackRot.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>BlackRot';
  icon141.className = 'buttonsSapelli'
  icon141.onclick = function(){
    hideAll()
    issueSpecific = '🟤 BlackRot'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon142 = document.createElement("BUTTON");
  cell.appendChild(icon142);
  icon142.className = 'buttonsSapelli'
  icon142.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/blight.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Blight';
  icon142.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Blight'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon143 = document.createElement("BUTTON");
  cell.appendChild(icon143);
  icon143.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/bractmosaicvirus.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Bract MosaicVirus';
  icon143.className = 'buttonsSapelli'
  icon143.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Bract MosaicVirus'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon144 = document.createElement("BUTTON");
  cell.appendChild(icon144);
  icon144.className = 'buttonsSapelli'
  icon144.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/budNecrosisDisease.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Bud Recrosis';
  icon144.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Bud Recrosis'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon145 = document.createElement("BUTTON");
  cell.appendChild(icon145);
  icon145.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/CassavaRootRot.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Cassava Root Rot';
  icon145.className = 'buttonsSapelli'
  icon145.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Cassava Root Rot'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon146 = document.createElement("BUTTON");
  cell.appendChild(icon146);
  icon146.className = 'buttonsSapelli'
  icon146.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/CitrusAnthracnose.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Citrus Anthracnose';
  icon146.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Citrus Anthracnose'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon147 = document.createElement("BUTTON");
  cell.appendChild(icon147);
  icon147.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/citrusGuignardiaCitricarpaBlackSpot.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Citrus Guignardia';
  icon147.className = 'buttonsSapelli'
  icon147.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Citrus Guignardia'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon148 = document.createElement("BUTTON");
  cell.appendChild(icon148);
  icon148.className = 'buttonsSapelli'
  icon148.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/CitrusLeprosis.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Citrus Leprosis';
  icon148.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Citrus Leprosis'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon149 = document.createElement("BUTTON");
  cell.appendChild(icon149);
  icon149.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/citrusScab.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Citrus Scab';
  icon149.className = 'buttonsSapelli'
  icon149.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Citrus Scab'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon150 = document.createElement("BUTTON");
  cell.appendChild(icon150);
  icon150.className = 'buttonsSapelli'
  icon150.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/ColocasiaBobone.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Colocasia Bobone';
  icon150.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Colocasia Bobone'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon151 = document.createElement("BUTTON");
  cell.appendChild(icon151);
  icon151.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/CucumberMosaic.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Cucumber Green Mottle Mosaic';
  icon151.className = 'buttonsSapelli'
  icon151.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Cucumber Mottle Mosaic'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon152 = document.createElement("BUTTON");
  cell.appendChild(icon152);
  icon152.className = 'buttonsSapelli'
  icon152.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/downyMildew.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Downy Mildew';
  icon152.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Downy Mildew'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon153 = document.createElement("BUTTON");
  cell.appendChild(icon153);
  icon153.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/FrostyPod.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Frosty Pod';
  icon153.className = 'buttonsSapelli'
  icon153.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Frosty Pod'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon154 = document.createElement("BUTTON");
  cell.appendChild(icon154);
  icon154.className = 'buttonsSapelli'
  icon154.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/FusariumWilt.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Fusarium Wilt';
  icon154.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Fusarium Wilt'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon155 = document.createElement("BUTTON");
  cell.appendChild(icon155);
  icon155.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/InternalBrownSpots.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Internal BrownSpot';
  icon155.className = 'buttonsSapelli'
  icon155.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Internal BrownSpot'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon156 = document.createElement("BUTTON");
  cell.appendChild(icon156);
  icon156.className = 'buttonsSapelli'
  icon156.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/LeafStemScab.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Leaf SteamScab';
  icon156.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Leaf SteamScab'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon157 = document.createElement("BUTTON");
  cell.appendChild(icon157);
  icon157.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/OkraYellowVien.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Okra YellowVien';
  icon157.className = 'buttonsSapelli'
  icon157.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Okra YellowVien'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon158 = document.createElement("BUTTON");
  cell.appendChild(icon158);
  icon158.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/PhytophthoraBlight.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Phytophthora Blight';
  icon158.className = 'buttonsSapelli'
  icon158.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Phytophthora Blight'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon159 = document.createElement("BUTTON");
  cell.appendChild(icon159);
  icon159.className = 'buttonsSapelli'
  icon159.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/pigweed.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Pigweed';
  icon159.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Pigweed'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon160 = document.createElement("BUTTON");
  cell.appendChild(icon160);
  icon160.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/PowderyMildew.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Powdery Mildew';
  icon160.className = 'buttonsSapelli'
  icon160.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Powdery Mildew'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon161 = document.createElement("BUTTON");
  cell.appendChild(icon161);
  icon161.className = 'buttonsSapelli'
  icon161.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/Pox.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Pox';
  icon161.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Pox'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon162 = document.createElement("BUTTON");
  cell.appendChild(icon162);
  icon162.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/rodent.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Rodent';
  icon162.className = 'buttonsSapelli'
  icon162.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Rodent'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon163 = document.createElement("BUTTON");
  cell.appendChild(icon163);
  icon163.className = 'buttonsSapelli'
  icon163.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/rootAphids.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Root Aphids';
  icon163.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Root Aphids'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon164= document.createElement("BUTTON");
  cell.appendChild(icon164);
  icon164.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/rust.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Rust';
  icon164.className = 'buttonsSapelli'
  icon164.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Rust'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon165 = document.createElement("BUTTON");
  cell.appendChild(icon165);
  icon165.className = 'buttonsSapelli'
  icon165.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/southernBlight.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Southern BlightPumpkin';
  icon165.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Southern BlightPumpkin'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon166 = document.createElement("BUTTON");
  cell.appendChild(icon166);
  icon166.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/stemCutwormBean.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Stem CutwormBeat';
  icon166.className = 'buttonsSapelli'
  icon166.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Stem CutwormBeat'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon167 = document.createElement("BUTTON");
  cell.appendChild(icon167);
  icon167.className = 'buttonsSapelli'
  icon167.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/streak.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Streak';
  icon167.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Streak'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon168 = document.createElement("BUTTON");
  cell.appendChild(icon168);
  icon168.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/SweetOrangeScab.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Sweet Orange Scab';
  icon168.className = 'buttonsSapelli'
  icon168.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Sweet Orange Scab'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon169 = document.createElement("BUTTON");
  cell.appendChild(icon169);
  icon169.className = 'buttonsSapelli'
  icon169.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/thrips.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Thrips';
  icon169.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Thrips'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon170 = document.createElement("BUTTON");
  cell.appendChild(icon170);
  icon170.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/thripsTomato.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Thrips Tomato';
  icon170.className = 'buttonsSapelli'
  icon170.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Thrips Tomato'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon171 = document.createElement("BUTTON");
  cell.appendChild(icon171);
  icon171.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/TomatoMosaic.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Tomato Mosaic';
  icon171.className = 'buttonsSapelli'
  icon171.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Tomato Mosaic'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon172 = document.createElement("BUTTON");
  cell.appendChild(icon172);
  icon172.className = 'buttonsSapelli'
  icon172.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/VerticilliumWilt.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Verticilium Wilt';
  icon172.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Verticilium Wilt'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon173 = document.createElement("BUTTON");
  cell.appendChild(icon173);
  icon173.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/wetRot.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Wet Rot';
  icon173.className = 'buttonsSapelli'
  icon173.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Wet Rot'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon174 = document.createElement("BUTTON");
  cell.appendChild(icon174);
  icon174.className = 'buttonsSapelli'
  icon174.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/whiteMold.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>White Mold';
  icon174.onclick = function(){
    hideAll()
    issueSpecific = '🟤 White Mold'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon175 = document.createElement("BUTTON");
  cell.appendChild(icon175);
  icon175.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/whiteRust.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>White Rust';
  icon175.className = 'buttonsSapelli'
  icon175.onclick = function(){
    hideAll()
    issueSpecific = '🟤 White Rust'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon176 = document.createElement("BUTTON");
  cell.appendChild(icon176);
  icon176.className = 'buttonsSapelli'
  icon176.innerHTML = '<img src="images/csaNigeria/ISSUES/Dissease/yellowBlacksigatoka.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Yellow BlackSigatoka';
  icon176.onclick = function(){
    hideAll()
    issueSpecific = '🟤 Yellow BlackSigatoka'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }

  icon176o = document.createElement("BUTTON");
  cell.appendChild(icon176o);
  icon176o.innerHTML = '<img src="images/csaNigeria/UnknownOther.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>Awon miiran';
  icon176o.className = 'buttonsSapelli'
  icon176o.onclick = function(){
    hideAll()
    issueSpecific = '➕ Awon miiran'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
  document.getElementById('share-download').click()
},1000)

  }
  return screenChoice && issueSpecific

}


//to delete attributes and start again


//to go back to main screen where projects are shown




// document.getElementById('nigeriaProject').onclick = function(e){
//   // document.getElementById("map").style.height = "0px";
//   //
//   // document.getElementById("Cancel").style.display = "none";
//   // document.getElementById("CustomIcons").style.display = "none";
//   // document.getElementById('emoji').style.display = 'none';
//   // // document.getElementById('showAreaHa').style.display = 'none';
//   // document.getElementById('showAreaAcres').style.display = 'none';
//   // document.getElementById('share-download').style.display = 'none';
//   document.getElementById('showProjects').style.display = 'initial';
//   document.getElementById('customIconsMap').style.display = 'initial';
//   document.getElementById('customIconsCancel').style.display = 'initial';
// }
