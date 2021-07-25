var projectsCreated = false
var sapProjectFirstTime = true
var newProjectButton
var cell
//variable to identify the screen to be used with back button
var screenChoice
var askHelpOrIHelp

//variable to populate the popup
var plant
var issueSpecific = 'emojiNoSapelli' //if the sapelli project is completed, then the value changes and the string is treated differently in sharedownload.js
var issuesHuman = 'emojiNoSapelli'

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
    if(issuesHuman == null){
      issuesHuman = ''
    }
    emojioneareaeditor0.innerHTML =  plant + ' ' + issueSpecific + ' ' + issuesHuman

  }


}


document.getElementById('customIconsCancel').onclick = function(e){
  hideAll()
  document.getElementById('customIconsGoBack').style.display = 'none'
  document.getElementById('customIconsCancel').style.display = 'none';

  // function loadAllIconsInitalScreenAfterBackClicked(iconName){
  //   iconName.style.display = 'initial'
  // }
  // //to add all the icons in the initial screen when cancel is clicked
  //   for(i=8; i<142; i++){
  //     var iconNumber = 'icon'+i
  //     loadAllIconsInitalScreenAfterBackClicked(iconNumber)
  //     // iconNumberArray.push(iconNumber++)
  //     console.log(iconNumberArray)
  // }
  icon8.style.display = 'initial'; icon9.style.display = 'initial';  icon10.style.display = 'initial';   icon11.style.display = 'initial'; icon12.style.display = 'initial';
  icon13.style.display = 'initial'; icon14.style.display = 'initial';  icon15.style.display = 'initial';   icon16.style.display = 'initial'; icon17.style.display = 'initial';
  icon18.style.display = 'initial'; icon19.style.display = 'initial';  icon20.style.display = 'initial';   icon21.style.display = 'initial'; icon22.style.display = 'initial';
  icon23.style.display = 'initial'; icon24.style.display = 'initial';  icon25.style.display = 'initial';   icon26.style.display = 'initial'; icon27.style.display = 'initial';
  icon28.style.display = 'initial'; icon29.style.display = 'initial';  icon30.style.display = 'initial';   icon31.style.display = 'initial'; icon32.style.display = 'initial';
  icon33.style.display = 'initial'; icon34.style.display = 'initial';  icon35.style.display = 'initial';   icon36.style.display = 'initial';
                                    icon39.style.display = 'initial';  icon40.style.display = 'initial';   icon41.style.display = 'initial'; icon42.style.display = 'initial';
  icon43.style.display = 'initial'; icon44.style.display = 'initial';  icon45.style.display = 'initial';   icon46.style.display = 'initial'; icon47.style.display = 'initial';
  icon48.style.display = 'initial'; icon49.style.display = 'initial';  icon50.style.display = 'initial';   icon51.style.display = 'initial'; icon52.style.display = 'initial';
  icon53.style.display = 'initial'; icon54.style.display = 'initial';  icon55.style.display = 'initial';   icon56.style.display = 'initial'; icon57.style.display = 'initial';
  icon58.style.display = 'initial'; icon59.style.display = 'initial';  icon60.style.display = 'initial';   icon61.style.display = 'initial'; icon62.style.display = 'initial';
  icon63.style.display = 'initial'; icon64.style.display = 'initial';  icon65.style.display = 'initial';   icon66.style.display = 'initial'; icon67.style.display = 'initial';
  icon68.style.display = 'initial'; icon69.style.display = 'initial';  icon70.style.display = 'initial';   icon71.style.display = 'initial'; icon72.style.display = 'initial';
  icon73.style.display = 'initial'; icon74.style.display = 'initial';  icon75.style.display = 'initial';   icon76.style.display = 'initial'; icon77.style.display = 'initial';
  icon78.style.display = 'initial'; icon79.style.display = 'initial';  icon80.style.display = 'initial';   icon81.style.display = 'initial'; icon82.style.display = 'initial';
  icon83.style.display = 'initial'; icon84.style.display = 'initial';  icon85.style.display = 'initial';   icon86.style.display = 'initial'; icon87.style.display = 'initial';
  icon88.style.display = 'initial'; icon89.style.display = 'initial';  icon90.style.display = 'initial';   icon91.style.display = 'initial'; icon92.style.display = 'initial';
  icon93.style.display = 'initial'; icon94.style.display = 'initial';  icon95.style.display = 'initial';   icon96.style.display = 'initial'; icon97.style.display = 'initial';
  icon98.style.display = 'initial'; icon99.style.display = 'initial';  icon100.style.display = 'initial';   icon101.style.display = 'initial'; icon102.style.display = 'initial';
  icon103.style.display = 'initial'; icon104.style.display = 'initial';  icon105.style.display = 'initial';   icon106.style.display = 'initial'; icon107.style.display = 'initial';
  icon108.style.display = 'initial'; icon109.style.display = 'initial';  icon110.style.display = 'initial';   icon111.style.display = 'initial'; icon112.style.display = 'initial';
  icon113.style.display = 'initial'; icon114.style.display = 'initial';  icon115.style.display = 'initial';   icon116.style.display = 'initial'; icon117.style.display = 'initial';
  icon118.style.display = 'initial'; icon119.style.display = 'initial';  icon120.style.display = 'initial';   icon121.style.display = 'initial'; icon122.style.display = 'initial';
  icon123.style.display = 'initial'; icon124.style.display = 'initial';  icon125.style.display = 'initial';   icon126.style.display = 'initial'; icon127.style.display = 'initial';
  icon128.style.display = 'initial'; icon129.style.display = 'initial';  icon130.style.display = 'initial';   icon131.style.display = 'initial'; icon132.style.display = 'initial';
  icon133.style.display = 'initial'; icon134.style.display = 'initial';  icon135.style.display = 'initial';   icon136.style.display = 'initial'; icon137.style.display = 'initial';
  icon138.style.display = 'initial'; icon139.style.display = 'initial';  icon140.style.display = 'initial'

  plant = null
  issueGeneric = null
  issuesHuman = 'emojiNoSapelli'
  issueSpecific = 'emojiNoSapelli'
  return  plant && issueSpecific && issuesHuman
}
document.getElementById('customIconsGoBack').onclick = function(e){

  if(screenChoice == 'plants'){
document.getElementById('customIconsCancel').click()

  }
  if(screenChoice == 'issueGeneric'){
document.getElementById('customIconsCancel').click()

  }
  if(screenChoice == 'issuesHuman'){
document.getElementById('customIconsCancel').click()

  }

}

function hideAll(){
  document.querySelectorAll('.buttonsSapelli').forEach(function(el) {
   el.style.display = 'none';
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

var isSapelliProjectLoaded
var cell
var newProjectButton
var newProjectButton2
var newProjectButton3
// var newProjectButton4
// var newProjectButton5

var screenwidth = screen.width +'px'
// var newProjectButton
//excites Logo in the map: to open the sapelli project
document.getElementById('sapelliProjects').onclick = function(e){
  isSapelliProjectLoaded = localStorage.getItem('sapelliProjectAccessed')
  console.log(isSapelliProjectLoaded)
  document.getElementById("map").style.height = "0px";

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

    if(projectsCreated == false || projectsCreated ==true){
      projectsCreated = true

        cell = document.createElement('div')
        document.body.appendChild(cell)
        cell.className = 'gridCell'

        newProjectButton = document.createElement("BUTTON");
        cell.appendChild(newProjectButton);
        newProjectButton.className = 'sapelliProjectsLogo'
        newProjectButton.innerHTML = '<img src="images/KenyaMaasai/logoMara.png" style="width:50px ; height:50px; border: 0px solid white" />';
        newProjectButton.style.gridColumn = '1'
        newProjectButton.style.gridRow = '1';
        newProjectButton.style.left = '50%'
        // cell.style.overflow = 'scroll'

        newProjectButton2 = document.createElement("BUTTON");
        cell.appendChild(newProjectButton2);
        newProjectButton2.className = 'sapelliProjectsLogo'
        newProjectButton2.innerHTML = '<img src="images/KenyaEMC/logoKenyaEMC.png" style="width:50px ;  height:50px; opacity:0.6; border: 0px solid white" />';
        // newProjectButton2.style.marginTop = '100px'
        newProjectButton2.style.gridColumn = '1'
        newProjectButton2.style.gridRow = '2'
        // newProjectButton.style.left = '50%'

         newProjectButton2.onclick = function(){
           newProjectButton2.innerHTML = '<img src="images/underConstruction.png" style="width:50px ; height:50px; border: 0px solid white" />';
           setTimeout(function(){
             newProjectButton2.innerHTML = '<img src="images/KenyaEMC/logoKenyaEMC.png" style="width:50px ; height:50px; border: 0px solid white" />';

           },2000)
         }

        newProjectButton3 = document.createElement("BUTTON");
        cell.appendChild(newProjectButton3);
        newProjectButton3.className = 'sapelliProjectsLogo'
        newProjectButton3.innerHTML = '<img src="images/KenyaMaasai/logoMau.png" style="width:50px ; height:50px; opacity:0.7; border: 0px solid white" />';
        // newProjectButton3.style.marginTop = '100px'
        newProjectButton3.style.gridColumn = '2'
        newProjectButton3.style.gridRow = '2'
        // newProjectButton.style.left = '50%'

        newProjectButton3.onclick = function(){
           newProjectButton3.innerHTML = '<img src="images/underConstruction.png" style="width:50px ; height:50px; border: 0px solid white" />';
           setTimeout(function(){
             newProjectButton3.innerHTML = '<img src="images/KenyaMaasai/logoMau.png" style="width:50px ; height:50px; border: 0px solid white" />';

           },2000)
         }
        //
        // newProjectButton4 = document.createElement("BUTTON");
        // cell.appendChild(newProjectButton4);
        // newProjectButton4.className = 'sapelliProjectsLogo'
        // newProjectButton4.innerHTML = '<img src="images/EthiopiaOmo/floodRecession.png" style="width:50px ; height:50px; border: 0px solid white" />';
        // // newProjectButton4.style.marginTop = '100px'
        //
        // newProjectButton4.style.gridColumn = '3'
        //  newProjectButton4.style.gridRow = '2'
        //
        // newProjectButton5 = document.createElement("BUTTON");
        // cell.appendChild(newProjectButton5);
        // newProjectButton5.className = 'sapelliProjectsLogo'
        // newProjectButton5.innerHTML = '<img src="images/NamibiaLU/namibia.png" style="width:50px ; height:50px; border: 0px solid white" />';
        // // newProjectButton5.style.marginTop = '100px'
        //
        // newProjectButton5.style.gridColumn = '1'
        //  newProjectButton5.style.gridRow = '3'

        preload([
          //.......
        ]);

  }
  // else{
  //   cell.style.display = 'initial'
  //   document.body.appendChild(cell)
  //   cell.className = 'gridCell'
  //
  //   cell.appendChild(newProjectButton);
  //   newProjectButton.style.gridColumn = '1'
  //   newProjectButton.style.gridRow = '1';
  //   cell.appendChild(newProjectButton2);
  //   newProjectButton2.style.gridColumn = '2'
  //   newProjectButton2.style.gridRow = '1'
  //   cell.appendChild(newProjectButton3);
  //   newProjectButton3.style.gridColumn = '1'
  //   newProjectButton3.style.gridRow = '3'

  //   // newProjectButton.style.display = 'initial';
  //   // newProjectButton2.style.display = 'initial';
  //   // newProjectButton3.style.display = 'initial';
  //   // newProjectButton4.style.display = 'initial';
  //   // newProjectButton5.style.display = 'initial';
  //
  //
  //
  //   // cell.style.overflow = 'scroll'
  // }

// // to show the icons of the project selected
  newProjectButton.onclick = function(){
    newProjectButton2.style.display = 'none';
    newProjectButton3.style.display = 'none';
    // newProjectButton4.style.display = 'none';
    // newProjectButton5.style.display = 'none';

    // cell.style.overflow =
        if(isSapelliProjectLoaded != 'true'){

          // $.getScript({
          //  cache:true,
          //   url:'scripts/sapelliProjects/Nigeria.js'
          // })

          newProjectButton.innerHTML = '<img src="images/checkingPw.gif" style="width:50px ; height:50px; border: 0px solid white" />';
          newProjectButton.disabled = true
          setTimeout(function(){
            newProjectButton.style.backgroundColor = '#39F70F'
            newProjectButton.style.borderColor = '#39F70F'
          },3000)

          setTimeout(function(){
            localStorage.setItem('sapelliProjectAccessed', true);
            document.getElementById('customIconsMap').style.display = 'initial';


            // sapProjectFirstTime = false
            newProjectButton.style.display = 'none';
            generateButtonsPlants()
            newProjectButton.innerHTML = '<img src="images/KenyaMaasai/logoMara.png" style="width:50px ; height:50px; border: 0px solid white" />';
            newProjectButton.disabled = false
            newProjectButton.style.backgroundColor = 'white'
            newProjectButton.style.borderColor = 'white'

          },5000)

        }else{
          // sapProjectFirstTime = false
          newProjectButton.style.display = 'none';
          cell.setAttribute("style","overflow-y:scroll");

          generateButtonsPlants()
        }

    }
  return projectsCreated && sapProjectFirstTime && newProjectButton && cell
}

var  icon8, icon9, icon10, icon11, icon12, icon13, icon14, icon15, icon16, icon17, icon18, icon19, icon20, icon21, icon22, icon22, icon23, icon24, icon25, icon26,
icon27, icon28, icon29, icon30, icon31, icon32, icon33, icon34, icon35, icon36, icon37, icon38, icon39, icon40, icon41, icon42, icon43, icon44, icon45, icon46, icon47, icon48, icon49, icon50, icon51, icon52, icon53,
icon54, icon55, icon56, icon57, icon58, icon59, icon60, icon61, icon62, icon63, icon64, icon65, icon66, icon67, icon68, icon69, icon70, icon71, icon72, icon73, icon74, icon75, icon76, icon77, icon78, icon79, icon80,
icon81, icon82, icon83, icon84, icon85, icon86, icon87, icon88, icon89, icon90, icon91, icon92, icon93, icon94, icon95, icon96, icon97, icon98, icon99, icon100, icon101, icon102, icon103, icon104, icon105, icon106,
icon107, icon108, icon109, icon110, icon111, icon112, icon113, icon114, icon115, icon116, icon117, icon118, icon119, icon120, icon121,icon122, icon123,icon124, icon125, icon126, icon127, icon128, icon129, icon130,
icon131, icon132, icon133, icon134, icon135, icon136, icon137, icon138, icon139, icon140, iconI1, iconiconI2, iconI3, iconI4, iconI5,iconI6, iconI7, iconI8, iconI9, iconIH1, iconIH2, iconIH3, iconIH4, iconIH5

// var generateDivElementCell = function(){
//   cell = document.createElement("div");
//   document.body.appendChild(cell);
//   cell.className = 'gridCell'
//   return cell
// }
var generateButtonsPlants = function(){

  screenChoice = 'plants'

  icon8 = document.createElement("BUTTON");
  cell.appendChild(icon8);
  icon8.className = 'buttonsSapelli'
  icon8.innerHTML = '<img src="images/KenyaMaasai/icons/Olakiroingai_OrangeLeafCroton.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>';
  icon8.onclick = function(){
    hideAll()
    generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olakiroingai ▪️ Orange Leaf Croton'
  }
  icon9 = document.createElement("BUTTON");
  cell.appendChild(icon9);
  icon9.innerHTML = '<img src="images/KenyaMaasai/icons/Olamuranya_SpikeThornBush.png" style="width:140px ; height:140px; border: 0px solid white" /> </br>';
  icon9.className = 'buttonsSapelli'
  icon9.onclick = function(){
    hideAll()
  generateButtonsIssues()
  document.getElementById('customIconsGoBack').style.display = 'initial';
  document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olamuranya ▪️ Spike Thorn Bush'
  }

  icon10 = document.createElement("BUTTON");
  cell.appendChild(icon10);
  icon10.className = 'buttonsSapelli'
  icon10.innerHTML = '<img src="images/KenyaMaasai/icons/Olerai_YellowBarkedAcacia.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon10.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olerai ▪️ Yellow Barked Acacia'
  }
  icon11 = document.createElement("BUTTON");
  cell.appendChild(icon11);
  icon11.innerHTML = '<img src="images/KenyaMaasai/icons/Olgoswa_DesertDate.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon11.className = 'buttonsSapelli'
  icon11.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olgoswa ▪️ Desert Date'
  }
  icon12 = document.createElement("BUTTON");
  cell.appendChild(icon12);
  icon12.className = 'buttonsSapelli'
  icon12.innerHTML = '<img src="images/KenyaMaasai/icons/Olmasei_ForestRothmania_Cheesewood.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon12.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmasei ▪️ Forest Rothmania Cheesewood'
  }
  icon13 = document.createElement("BUTTON");
  cell.appendChild(icon13);
  icon13.innerHTML = '<img src="images/KenyaMaasai/icons/Osinoni_FeverTree.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon13.className = 'buttonsSapelli'
  icon13.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osinoni ▪️ Fever Tree'

  }
  icon14 = document.createElement("BUTTON");
  cell.appendChild(icon14);
  icon14.className = 'buttonsSapelli'
  icon14.innerHTML = '<img src="images/KenyaMaasai/icons/Osupakupes_AlbiziaGummifera.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon14.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osupakupes ▪️ Albizia Gummifera'

  }
  icon15 = document.createElement("BUTTON");
  cell.appendChild(icon15);
  icon15.innerHTML = '<img src="images/KenyaMaasai/icons/Osokonoi_WaburgiaUgandensis.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon15.className = 'buttonsSapelli'
  icon15.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osokonoi ▪️ Waburgia Ugandensis'

  }
  icon38 = document.createElement("BUTTON");
  cell.appendChild(icon38);
  icon38.innerHTML = '<img src="images/KenyaMaasai/icons/Ositeti_FalseBrandyBush.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon38.className = 'buttonsSapelli'
  icon38.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Ositeti ▪️ False Brandy Bush'

  }
  icon16 = document.createElement("BUTTON");
  cell.appendChild(icon16);
  icon16.innerHTML = '<img src="images/KenyaMaasai/icons/Osilalei_Camiphora.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon16.className = 'buttonsSapelli'
  icon16.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osilalei ▪️ Camiphora'

  }
  icon17 = document.createElement("BUTTON");
  cell.appendChild(icon17);
  icon17.innerHTML = '<img src="images/KenyaMaasai/icons/Osenetoi_CandleBush.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon17.className = 'buttonsSapelli'
  icon17.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osenetoi ▪️ Candle Bush'

  }
  icon18 = document.createElement("BUTTON");
  cell.appendChild(icon18);
  icon18.className = 'buttonsSapelli'
  icon18.innerHTML = '<img src="images/KenyaMaasai/icons/Orupanti.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon18.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Orupanti'

  }
  icon19 = document.createElement("BUTTON");
  cell.appendChild(icon19);
  icon19.innerHTML = '<img src="images/KenyaMaasai/icons/OrngiroAre.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon19.className = 'buttonsSapelli'
  icon19.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 OrngiroAre'

  }
  icon20 = document.createElement("BUTTON");
  cell.appendChild(icon20);
  icon20.innerHTML = '<img src="images/KenyaMaasai/icons/Orgilai_TecleaNobilis.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon20.className = 'buttonsSapelli'
  icon20.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Orgilai ▪️ Teclea Nobilis'

  }

  icon21 = document.createElement("BUTTON");
  cell.appendChild(icon21);
  icon21.className = 'buttonsSapelli'
  icon21.innerHTML = '<img src="images/KenyaMaasai/icons/Oreteti_WildFig.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon21.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oreteti ▪️ Wild Fig'

  }
  icon22 = document.createElement("BUTTON");
  cell.appendChild(icon22);
  icon22.innerHTML = '<img src="images/KenyaMaasai/icons/Oltuyiesi_HopBush_DodonaeaViscosa.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon22.className = 'buttonsSapelli'
  icon22.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltuyiesi ▪️ HopBush Dodonaea Viscosa'

  }

  icon23 = document.createElement("BUTTON");
  cell.appendChild(icon23);
  icon23.className = 'buttonsSapelli'
  icon23.innerHTML = '<img src="images/KenyaMaasai/icons/Oltopisianoi.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon23.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltopisianoi'

  }
  icon24 = document.createElement("BUTTON");
  cell.appendChild(icon24);
  icon24.innerHTML = '<img src="images/KenyaMaasai/icons/Oltirkish.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon24.className = 'buttonsSapelli'
  icon24.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltirkish'

  }
  icon25 = document.createElement("BUTTON");
  cell.appendChild(icon25);
  icon25.className = 'buttonsSapelli'
  icon25.innerHTML = '<img src="images/KenyaMaasai/icons/Oltakurkuriet_LargeLeafGardenia.png" style="width:140px ; height:140px; border: 0px solid white" />';
  icon25.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltakurkuriet ▪️ Large Leaf Gardenia'

  }
  icon26 = document.createElement("BUTTON");
  cell.appendChild(icon26);
  icon26.innerHTML = '<img src="images/KenyaMaasai/icons/Olchanilekule.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon26.className = 'buttonsSapelli'
  icon26.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olchanilekule'

  }
  icon27 = document.createElement("BUTTON");
  cell.appendChild(icon27);
  icon27.innerHTML = '<img src="images/KenyaMaasai/icons/Olseki_SandpaperCodiar.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon27.className = 'buttonsSapelli'
  icon27.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olseki ▪️ Sandpaper Codiar'

  }
  icon28 = document.createElement("BUTTON");
  cell.appendChild(icon28);
  icon28.innerHTML = '<img src="images/KenyaMaasai/icons/Olpopogi_EuphobiaCandalebra.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon28.className = 'buttonsSapelli'
  icon28.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olpopogi ▪️ Euphobia Candalebra'

  }
  icon29 = document.createElement("BUTTON");
  cell.appendChild(icon29);
  icon29.className = 'buttonsSapelli'
  icon29.innerHTML = '<img src="images/KenyaMaasai/icons/OlperrElongo.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon29.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olperr Elongo'

  }
  icon30 = document.createElement("BUTTON");
  cell.appendChild(icon30);
  icon30.innerHTML = '<img src="images/KenyaMaasai/icons/Olosesiai_SandalBush.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon30.className = 'buttonsSapelli'
  icon30.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olosesiai ▪️ Sandal Bush'

  }
  icon31 = document.createElement("BUTTON");
  cell.appendChild(icon31);
  icon31.innerHTML = '<img src="images/KenyaMaasai/icons/Olosholol.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon31.className = 'buttonsSapelli'
  icon31.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olosholol'

  }
  icon32 = document.createElement("BUTTON");
  cell.appendChild(icon32);
  icon32.innerHTML = '<img src="images/KenyaMaasai/icons/Ololupa_Camiphora.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon32.className = 'buttonsSapelli'
  icon32.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Ololupa ▪️ Camiphora'

  }

  icon33 = document.createElement("BUTTON");
  cell.appendChild(icon33);
  icon33.className = 'buttonsSapelli'
  icon33.innerHTML = '<img src="images/KenyaMaasai/icons/Oloirien_AfricanWildOlive.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon33.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloirien ▪️ African Wild Olive'

  }
  icon34 = document.createElement("BUTTON");
  cell.appendChild(icon34);
  icon34.innerHTML = '<img src="images/KenyaMaasai/icons/Oloireroi_LeopardTree.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon34.className = 'buttonsSapelli'
  icon34.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloireroi ▪️ Leopard Tree'

  }
  icon35 = document.createElement("BUTTON");
  cell.appendChild(icon35);
  icon35.className = 'buttonsSapelli'
  icon35.innerHTML = '<img src="images/KenyaMaasai/icons/Oloilalei_ZiziphusMucronata_BuffaloThorn.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon35.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloilalei ▪️ Ziziphus Mucronata Buffalo Thorn'

  }
  icon36 = document.createElement("BUTTON");
  cell.appendChild(icon36);
  icon36.innerHTML = '<img src="images/KenyaMaasai/icons/Olnyalugai_GrewiaSimilis.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon36.className = 'buttonsSapelli'
  icon36.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olnyalugai ▪️ Grewia Similis'

  }

  icon39 = document.createElement("BUTTON");
  cell.appendChild(icon39);
  icon39.innerHTML = '<img src="images/KenyaMaasai/icons/Olnokoret.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon39.className = 'buttonsSapelli'
  icon39.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olnokoret'

  }
  icon40 = document.createElement("BUTTON");
  cell.appendChild(icon40);
  icon40.innerHTML = '<img src="images/KenyaMaasai/icons/Olgumi.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon40.className = 'buttonsSapelli'
  icon40.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olgumi'

  }
  icon41 = document.createElement("BUTTON");
  cell.appendChild(icon41);
  icon41.innerHTML = '<img src="images/KenyaMaasai/icons/Olngongwenyi_BlackBarkedAcacia.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon41.className = 'buttonsSapelli'
  icon41.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olngongwenyi ▪️ Black Barked Acacia'

  }

  icon42 = document.createElement("BUTTON");
  cell.appendChild(icon42);
  icon42.innerHTML = '<img src="images/KenyaMaasai/icons/Olmotoo.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon42.className = 'buttonsSapelli'
  icon42.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmotoo'

  }
  icon43 = document.createElement("BUTTON");
  cell.appendChild(icon43);
  icon43.innerHTML = '<img src="images/KenyaMaasai/icons/Olmorijoi_PoisonArrowTree.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon43.className = 'buttonsSapelli'
  icon43.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmorijoi ▪️ Poison Arrow Tree'

  }

  icon44 = document.createElement("BUTTON");
  cell.appendChild(icon44);
  icon44.innerHTML = '<img src="images/KenyaMaasai/icons/Olmisigiyioi_RhusNatalensis.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon44.className = 'buttonsSapelli'
  icon44.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmisigiyioi ▪️ RhusNatalensis'

  }
  icon45 = document.createElement("BUTTON");
  cell.appendChild(icon45);
  icon45.innerHTML = '<img src="images/KenyaMaasai/icons/Olmingarukeon.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon45.className = 'buttonsSapelli'
  icon45.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmingarukeon'

  }
  icon46 = document.createElement("BUTTON");
  cell.appendChild(icon46);
  icon46.innerHTML = '<img src="images/KenyaMaasai/icons/Olmerumori_SickleBush.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon46.className = 'buttonsSapelli'
  icon46.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmerumori ▪️ SickleBush'

  }

  icon48 = document.createElement("BUTTON");
  cell.appendChild(icon48);
  icon48.innerHTML = '<img src="images/KenyaMaasai/icons/Olmatundai_Cactus.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon48.className = 'buttonsSapelli'
  icon48.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmatundai ▪️ Cactus'

  }
  icon49 = document.createElement("BUTTON");
  cell.appendChild(icon49);
  icon49.className = 'buttonsSapelli'
  icon49.innerHTML = '<img src="images/KenyaMaasai/icons/Olmaroroi_CopretumMolle.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon49.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmaroroi ▪️ Copretum Molle'

  }
  icon50 = document.createElement("BUTTON");
  cell.appendChild(icon50);
  icon50.innerHTML = '<img src="images/KenyaMaasai/icons/Olkonyil.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon50.className = 'buttonsSapelli'
  icon50.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkonyil'

  }
  icon51 = document.createElement("BUTTON");
  cell.appendChild(icon51);
  icon51.className = 'buttonsSapelli'
  icon51.innerHTML = '<img src="images/KenyaMaasai/icons/Olkombobit_DevilMilkyBush.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon51.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkombobit ▪️ Devil Milky Bush'

  }
  icon52 = document.createElement("BUTTON");
  cell.appendChild(icon52);
  icon52.innerHTML = '<img src="images/KenyaMaasai/icons/Olkokola_Ramnustaddo.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon52.className = 'buttonsSapelli'
  icon52.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkokola ▪️ Ramnustaddo'

  }

  icon53 = document.createElement("BUTTON");
  cell.appendChild(icon53);
  icon53.className = 'buttonsSapelli'
  icon53.innerHTML = '<img src="images/KenyaMaasai/icons/Olkisikongu_PappeaCapensis.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon53.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkisikongu ▪️ Pappea Capensis'
  }
  icon54 = document.createElement("BUTTON");
  cell.appendChild(icon54);
  icon54.innerHTML = '<img src="images/KenyaMaasai/icons/Olkinyei_UclearDovinrum.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon54.className = 'buttonsSapelli'
  icon54.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkinyei ▪️ Uclear Dovinrum'
  }

  icon55 = document.createElement("BUTTON");
  cell.appendChild(icon55);
  icon55.className = 'buttonsSapelli'
  icon55.innerHTML = '<img src="images/KenyaMaasai/icons/Olkiloreti_AcaciaNilotica.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon55.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkiloreti ▪️ Acacia Nilotica'
  }
  icon47 = document.createElement("BUTTON");
  cell.appendChild(icon47);
  icon47.innerHTML = '<img src="images/KenyaMaasai/icons/Olkakawa.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon47.className = 'buttonsSapelli'
  icon47.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkakawa'
  }
  icon56 = document.createElement("BUTTON");
  cell.appendChild(icon56);
  icon56.className = 'buttonsSapelli'
  icon56.innerHTML = '<img src="images/KenyaMaasai/icons/Olesupeni.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon56.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olesupeni'
  }
  icon57 = document.createElement("BUTTON");
  cell.appendChild(icon57);
  icon57.innerHTML = '<img src="images/KenyaMaasai/icons/Oleparmunyo_ToddaliaAsiatica.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon57.className = 'buttonsSapelli'
  icon57.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oleparmunyo ▪️ Toddalia Asiatica'

  }
  icon58 = document.createElement("BUTTON");
  cell.appendChild(icon58);
  icon58.className = 'buttonsSapelli'
  icon58.innerHTML = '<img src="images/KenyaMaasai/icons/Oleleshwa_CamphorBush_TarchonanthusCamphoratus.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon58.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oleleshwa ▪️ CamphorBush Tarchonanthus Camphoratus'

  }
  icon59 = document.createElement("BUTTON");
  cell.appendChild(icon59);
  icon59.innerHTML = '<img src="images/KenyaMaasai/icons/Oldarpoi_KigeliaAfricana-Sausage.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon59.className = 'buttonsSapelli'
  icon59.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oldarpoi ▪️  Kigelia Africana Sausage'

  }
  icon60 = document.createElement("BUTTON");
  cell.appendChild(icon60);
  icon60.innerHTML = '<img src="images/KenyaMaasai/icons/Olaturdei_CaperCaparis.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon60.className = 'buttonsSapelli'
  icon60.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olaturdei ▪️ Caper Caparis'

  }
  icon61 = document.createElement("BUTTON");
  cell.appendChild(icon61);
  icon61.innerHTML = '<img src="images/KenyaMaasai/icons/Olamuriaki_CarissaEdulis.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon61.className = 'buttonsSapelli'
  icon61.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olamuriaki ▪️ Carissa Edulis'

  }
  icon62 = document.createElement("BUTTON");
  cell.appendChild(icon62);
  icon62.innerHTML = '<img src="images/KenyaMaasai/icons/Olairagai.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon62.className = 'buttonsSapelli'
  icon62.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olairagai'

  }
  icon63 = document.createElement("BUTTON");
  cell.appendChild(icon63);
  icon63.className = 'buttonsSapelli'
  icon63.innerHTML = '<img src="images/KenyaMaasai/icons/OitiOibor_SenegalSenegalsis.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon63.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 OitiOibor ▪️ Senegal Senegalsis'

  }
  icon64 = document.createElement("BUTTON");
  cell.appendChild(icon64);
  icon64.innerHTML = '<img src="images/KenyaMaasai/icons/Enkorukoti.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon64.className = 'buttonsSapelli'
  icon64.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkorukoti'

  }
  icon65 = document.createElement("BUTTON");
  cell.appendChild(icon65);
  icon65.innerHTML = '<img src="images/KenyaMaasai/icons/Enkamai_SourPlum-FalseSandalwood.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon65.className = 'buttonsSapelli'
  icon65.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkamai ▪️ Sour Plum ▪️ False Sandalwood'

  }

  icon66 = document.createElement("BUTTON");
  cell.appendChild(icon66);
  icon66.className = 'buttonsSapelli'
  icon66.innerHTML = '<img src="images/KenyaMaasai/icons/EnchaniEnkashe.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon66.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enchani Enkashe'

  }
  icon67 = document.createElement("BUTTON");
  cell.appendChild(icon67);
  icon67.innerHTML = '<img src="images/KenyaMaasai/icons/Emorogi_KayaApples.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon67.className = 'buttonsSapelli'
  icon67.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Emorogi ▪️ Kaya Apples'

  }

  icon68 = document.createElement("BUTTON");
  cell.appendChild(icon68);
  icon68.className = 'buttonsSapelli'
  icon68.innerHTML = '<img src="images/KenyaMaasai/icons/Ekogoltim.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon68.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Ekogoltim'

  }
  icon69 = document.createElement("BUTTON");
  cell.appendChild(icon69);
  icon69.innerHTML = '<img src="images/KenyaMaasai/icons/ViynaMembranacea.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon69.className = 'buttonsSapelli'
  icon69.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Viyna Membranacea'

  }
  icon70 = document.createElement("BUTTON");
  cell.appendChild(icon70);
  icon70.className = 'buttonsSapelli'
  icon70.innerHTML = '<img src="images/KenyaMaasai/icons/Suguroi_AloeVera.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon70.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Suguroi ▪️ AloeVera'

  }
  icon71 = document.createElement("BUTTON");
  cell.appendChild(icon71);
  icon71.innerHTML = '<img src="images/KenyaMaasai/icons/Sakutae_FlameLily.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon71.className = 'buttonsSapelli'
  icon71.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Sakutae ▪️ FlameLily'

  }
  icon72 = document.createElement("BUTTON");
  cell.appendChild(icon72);
  icon72.innerHTML = '<img src="images/KenyaMaasai/icons/Osuyai.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon72.className = 'buttonsSapelli'
  icon72.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osuyai'

  }
  icon73 = document.createElement("BUTTON");
  cell.appendChild(icon73);
  icon73.innerHTML = '<img src="images/KenyaMaasai/icons/Osupukiai_Dombeya.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon73.className = 'buttonsSapelli'
  icon73.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osupukiai ▪️ Dombeya'

  }
  icon74 = document.createElement("BUTTON");
  cell.appendChild(icon74);
  icon74.className = 'buttonsSapelli'
  icon74.innerHTML = '<img src="images/KenyaMaasai/icons/Osuguroi_AloeKillifiensis.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon74.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osuguroi ▪️ AloeKillifiensis'

  }
  icon75 = document.createElement("BUTTON");
  cell.appendChild(icon75);
  icon75.innerHTML = '<img src="images/KenyaMaasai/icons/Osikawai_SolanumAculeastrum_BitterApple.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon75.className = 'buttonsSapelli'
  icon75.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osikawai ▪️ Solanum Aculeastrum ▪️ BitterApple'

  }
  icon76 = document.createElement("BUTTON");
  cell.appendChild(icon76);
  icon76.innerHTML = '<img src="images/KenyaMaasai/icons/Orngerioi.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon76.className = 'buttonsSapelli'
  icon76.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Orngerioi'

  }
  icon77 = document.createElement("BUTTON");
  cell.appendChild(icon77);
  icon77.innerHTML = '<img src="images/KenyaMaasai/icons/Orbibi_Sunbird.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon77.className = 'buttonsSapelli'
  icon77.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Orbibi ▪️ Sunbird'

  }

  icon78 = document.createElement("BUTTON");
  cell.appendChild(icon78);
  icon78.className = 'buttonsSapelli'
  icon78.innerHTML = '<img src="images/KenyaMaasai/icons/Oltutu.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon78.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltutu'

  }
  icon79 = document.createElement("BUTTON");
  cell.appendChild(icon79);
  icon79.innerHTML = '<img src="images/KenyaMaasai/icons/Oltulelei_SodomApple.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon79.className = 'buttonsSapelli'
  icon79.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltulelei ▪️ Sodom Apple'

  }
  icon80 = document.createElement("BUTTON");
  cell.appendChild(icon80);
  icon80.className = 'buttonsSapelli'
  icon80.innerHTML = '<img src="images/KenyaMaasai/icons/Oltiamiletei_MorningGlory.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon80.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltiamiletei ▪️ MorningGlory'

  }
  icon81 = document.createElement("BUTTON");
  cell.appendChild(icon81);
  icon81.innerHTML = '<img src="images/KenyaMaasai/icons/Olsukurtutui_Cactusvine.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon81.className = 'buttonsSapelli'
  icon81.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olsukurtutui ▪️ Cactusvine'

  }

  icon82 = document.createElement("BUTTON");
  cell.appendChild(icon82);
  icon82.innerHTML = '<img src="images/KenyaMaasai/icons/Olchhartuyian_GallinieraSaxiFraga.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon82.className = 'buttonsSapelli'
  icon82.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olchhartuyian ▪️ Galliniera Saxi Fraga'

  }
  icon83 = document.createElement("BUTTON");
  cell.appendChild(icon83);
  icon83.innerHTML = '<img src="images/KenyaMaasai/icons/Olseyiai_Cypreus.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon83.className = 'buttonsSapelli'
  icon83.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olseyiai ▪️ Cypreus'

  }
  icon84 = document.createElement("BUTTON");
  cell.appendChild(icon84);
  icon84.innerHTML = '<img src="images/KenyaMaasai/icons/Olriroi.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon84.className = 'buttonsSapelli'
  icon84.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olriroi'

  }

  icon85 = document.createElement("BUTTON");
  cell.appendChild(icon85);
  icon85.innerHTML = '<img src="images/KenyaMaasai/icons/Olpisialokonoi.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon85.className = 'buttonsSapelli'
  icon85.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olpisialokonoi'

  }
  icon86 = document.createElement("BUTTON");
  cell.appendChild(icon86);
  icon86.innerHTML = '<img src="images/KenyaMaasai/icons/Olperesiorasha.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon86.className = 'buttonsSapelli'
  icon86.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olperesiorasha'

  }

  icon87 = document.createElement("BUTTON");
  cell.appendChild(icon87);
  icon87.innerHTML = '<img src="images/KenyaMaasai/icons/Olpaleki_AaturaStramonium.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon87.className = 'buttonsSapelli'
  icon87.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olpaleki ▪️ Aatura Stramonium'

  }
  icon88 = document.createElement("BUTTON");
  cell.appendChild(icon88);
  icon88.innerHTML = '<img src="images/KenyaMaasai/icons/Olpalakai.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon88.className = 'buttonsSapelli'
  icon88.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olpalakai'

  }
  icon89 = document.createElement("BUTTON");
  cell.appendChild(icon89);
  icon89.innerHTML = '<img src="images/KenyaMaasai/icons/Oliouruur_CabaggeTree.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon89.className = 'buttonsSapelli'
  icon89.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oliouruur ▪️ Cabagge Tree'

  }

  icon90 = document.createElement("BUTTON");
  cell.appendChild(icon90);
  icon90.innerHTML = '<img src="images/KenyaMaasai/icons/Oloitodoraek.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon90.className = 'buttonsSapelli'
  icon90.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloitodoraek'

  }
  icon91 = document.createElement("BUTTON");
  cell.appendChild(icon91);
  icon91.className = 'buttonsSapelli'
  icon91.innerHTML = '<img src="images/KenyaMaasai/icons/Olosida_HypoestesForskahlii.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon91.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olosida ▪️ Hypoestes Forskahlii'

  }
  icon92 = document.createElement("BUTTON");
  cell.appendChild(icon92);
  icon92.innerHTML = '<img src="images/KenyaMaasai/icons/Oloroukileleng.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon92.className = 'buttonsSapelli'
  icon92.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloroukileleng'

  }
  icon93 = document.createElement("BUTTON");
  cell.appendChild(icon93);
  icon93.className = 'buttonsSapelli'
  icon93.innerHTML = '<img src="images/KenyaMaasai/icons/Olopito.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon93.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olopito'

  }

  icon94 = document.createElement("BUTTON");
  cell.appendChild(icon94);
  icon94.className = 'buttonsSapelli'
  icon94.innerHTML = '<img src="images/KenyaMaasai/icons/Oloorodo_CyphostemmaSerpens.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon94.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloorodo ▪️ Cyphostemma Serpens'
  }
  icon95 = document.createElement("BUTTON");
  cell.appendChild(icon95);
  icon95.innerHTML = '<img src="images/KenyaMaasai/icons/Ologumati.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon95.className = 'buttonsSapelli'
  icon95.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Ologumati'
  }

  icon96 = document.createElement("BUTTON");
  cell.appendChild(icon96);
  icon96.className = 'buttonsSapelli'
  icon96.innerHTML = '<img src="images/KenyaMaasai/icons/Olobai_PsiadiaPanctulata.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon96.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olobai ▪️ Psiadia Panctulata'
  }
  icon97 = document.createElement("BUTTON");
  cell.appendChild(icon97);
  icon97.innerHTML = '<img src="images/KenyaMaasai/icons/Olokunonoi.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon97.className = 'buttonsSapelli'
  icon97.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olokunonoi'
  }
  icon98 = document.createElement("BUTTON");
  cell.appendChild(icon98);
  icon98.className = 'buttonsSapelli'
  icon98.innerHTML = '<img src="images/KenyaMaasai/icons/Oloiropijiloosiikon.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon98.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloiropijiloosiikon'
  }
  icon99 = document.createElement("BUTTON");
  cell.appendChild(icon99);
  icon99.innerHTML = '<img src="images/KenyaMaasai/icons/Olmalilio.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon99.className = 'buttonsSapelli'
  icon99.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmalilio'

  }
  icon100 = document.createElement("BUTTON");
  cell.appendChild(icon100);
  icon100.className = 'buttonsSapelli'
  icon100.innerHTML = '<img src="images/KenyaMaasai/icons/Olkunetia.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon100.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkunetia'

  }
  icon101 = document.createElement("BUTTON");
  cell.appendChild(icon101);
  icon101.innerHTML = '<img src="images/KenyaMaasai/icons/Olkimitare.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon101.className = 'buttonsSapelli'
  icon101.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkimitare'

  }
  icon102 = document.createElement("BUTTON");
  cell.appendChild(icon102);
  icon102.innerHTML = '<img src="images/KenyaMaasai/icons/Olkierenkure.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon102.className = 'buttonsSapelli'
  icon102.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkierenkure'

  }
  icon103 = document.createElement("BUTTON");
  cell.appendChild(icon103);
  icon103.innerHTML = '<img src="images/KenyaMaasai/icons/Oloyiapasei_AspiliaPluriseta.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon103.className = 'buttonsSapelli'
  icon103.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloyiapasei ▪️ Aspilia Pluriseta'

  }
  icon104 = document.createElement("BUTTON");
  cell.appendChild(icon104);
  icon104.innerHTML = '<img src="images/KenyaMaasai/icons/Olgigiri_WaitAbit.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon104.className = 'buttonsSapelli'
  icon104.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olgigiri ▪️ WaitAbit'

  }
  icon105 = document.createElement("BUTTON");
  cell.appendChild(icon18);
  icon105.className = 'buttonsSapelli'
  icon105.innerHTML = '<img src="images/KenyaMaasai/icons/OlgalayioiLoosirkon.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon105.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olgalayioi Loosirkon'

  }
  icon106 = document.createElement("BUTTON");
  cell.appendChild(icon106);
  icon106.innerHTML = '<img src="images/KenyaMaasai/icons/Oleturot.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon106.className = 'buttonsSapelli'
  icon106.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oleturot'

  }
  icon107 = document.createElement("BUTTON");
  cell.appendChild(icon107);
  icon107.innerHTML = '<img src="images/KenyaMaasai/icons/Olesayiet_RedCherry.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon107.className = 'buttonsSapelli'
  icon107.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olesayiet ▪️ RedCherry'

  }

  icon108 = document.createElement("BUTTON");
  cell.appendChild(icon108);
  icon108.className = 'buttonsSapelli'
  icon108.innerHTML = '<img src="images/KenyaMaasai/icons/Olemuran_OcimumBasllicum.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon108.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olemuran ▪️ Ocimum Basllicum'

  }
  icon109 = document.createElement("BUTTON");
  cell.appendChild(icon109);
  icon109.innerHTML = '<img src="images/KenyaMaasai/icons/Olemenega.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon109.className = 'buttonsSapelli'
  icon109.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olemenega'

  }

  icon110 = document.createElement("BUTTON");
  cell.appendChild(icon110);
  icon110.className = 'buttonsSapelli'
  icon110.innerHTML = '<img src="images/KenyaMaasai/icons/Olekidongo_Actyphafruticosa.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon110.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olekidongo ▪️ Actypha fruticosa'

  }
  icon111 = document.createElement("BUTTON");
  cell.appendChild(icon111);
  icon111.innerHTML = '<img src="images/KenyaMaasai/icons/Oldupai.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon111.className = 'buttonsSapelli'
  icon111.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oldupai'

  }
  icon112 = document.createElement("BUTTON");
  cell.appendChild(icon112);
  icon112.className = 'buttonsSapelli'
  icon112.innerHTML = '<img src="images/KenyaMaasai/icons/Oldule_CastorOilPlant.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon112.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oldule ▪️ Castor Oil Plant'

  }
  icon113 = document.createElement("BUTTON");
  cell.appendChild(icon113);
  icon113.innerHTML = '<img src="images/KenyaMaasai/icons/Olbibi_OrangeLeonotisMollisima.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon113.className = 'buttonsSapelli'
  icon113.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olbibi ▪️ Orange Leonotis Mollisima'

  }
  icon114 = document.createElement("BUTTON");
  cell.appendChild(icon114);
  icon114.innerHTML = '<img src="images/KenyaMaasai/icons/Olbangi_TagetesMinuta.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon114.className = 'buttonsSapelli'
  icon114.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olbangi ▪️ Tagetes Minuta'

  }
  icon115 = document.createElement("BUTTON");
  cell.appendChild(icon115);
  icon115.innerHTML = '<img src="images/KenyaMaasai/icons/Olauraki.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon115.className = 'buttonsSapelli'
  icon115.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olauraki'

  }
  icon116 = document.createElement("BUTTON");
  cell.appendChild(icon116);
  icon116.className = 'buttonsSapelli'
  icon116.innerHTML = '<img src="images/KenyaMaasai/icons/Olarae.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon116.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olarae'

  }
  icon117 = document.createElement("BUTTON");
  cell.appendChild(icon117);
  icon117.innerHTML = '<img src="images/KenyaMaasai/icons/Olangungue.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon117.className = 'buttonsSapelli'
  icon117.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olangungue'

  }
  icon118 = document.createElement("BUTTON");
  cell.appendChild(icon118);
  icon118.innerHTML = '<img src="images/KenyaMaasai/icons/Olamererua.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon118.className = 'buttonsSapelli'
  icon118.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olamererua'

  }
  icon119 = document.createElement("BUTTON");
  cell.appendChild(icon119);
  icon119.innerHTML = '<img src="images/KenyaMaasai/icons/Okilenyai.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon119.className = 'buttonsSapelli'
  icon119.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Okilenyai'

  }

  icon120 = document.createElement("BUTTON");
  cell.appendChild(icon120);
  icon120.className = 'buttonsSapelli'
  icon120.innerHTML = '<img src="images/KenyaMaasai/icons/Oiiri.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon120.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oiiri'

  }
  icon121 = document.createElement("BUTTON");
  cell.appendChild(icon121);
  icon121.innerHTML = '<img src="images/KenyaMaasai/icons/Naingongundeyo.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon121.className = 'buttonsSapelli'
  icon121.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Naingongundeyo'

  }
  icon122 = document.createElement("BUTTON");
  cell.appendChild(icon122);
  icon122.className = 'buttonsSapelli'
  icon122.innerHTML = '<img src="images/KenyaMaasai/icons/Intualan_LionsClan.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon122.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Intualan ▪️ Lions Clan'

  }
  icon123 = document.createElement("BUTTON");
  cell.appendChild(icon123);
  icon123.innerHTML = '<img src="images/KenyaMaasai/icons/Imasilig.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon123.className = 'buttonsSapelli'
  icon123.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Imasilig'

  }

  icon124 = document.createElement("BUTTON");
  cell.appendChild(icon124);
  icon124.innerHTML = '<img src="images/KenyaMaasai/icons/Esiaiti.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon124.className = 'buttonsSapelli'
  icon124.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Esiaiti'

  }
  icon125 = document.createElement("BUTTON");
  cell.appendChild(icon125);
  icon125.innerHTML = '<img src="images/KenyaMaasai/icons/Esambukike.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon125.className = 'buttonsSapelli'
  icon125.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Esambukike'

  }
  icon126 = document.createElement("BUTTON");
  cell.appendChild(icon126);
  icon126.innerHTML = '<img src="images/KenyaMaasai/icons/Enyieman.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon126.className = 'buttonsSapelli'
  icon126.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enyieman'

  }

  icon127 = document.createElement("BUTTON");
  cell.appendChild(icon127);
  icon127.innerHTML = '<img src="images/KenyaMaasai/icons/Entasim.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon127.className = 'buttonsSapelli'
  icon127.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Entasim'

  }
  icon128 = document.createElement("BUTTON");
  cell.appendChild(icon128);
  icon128.innerHTML = '<img src="images/KenyaMaasai/icons/Enkarani.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon128.className = 'buttonsSapelli'
  icon128.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkarani'

  }

  icon129 = document.createElement("BUTTON");
  cell.appendChild(icon129);
  icon129.innerHTML = '<img src="images/KenyaMaasai/icons/Enkameloki_Maerua_LongBeadBean.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon129.className = 'buttonsSapelli'
  icon129.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkameloki ▪️ Maerua Long BeadBean'

  }
  icon130 = document.createElement("BUTTON");
  cell.appendChild(icon130);
  icon130.innerHTML = '<img src="images/KenyaMaasai/icons/Enkaiteteyiai_CyanotisArachoidea.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon130.className = 'buttonsSapelli'
  icon130.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkaiteteyiai ▪️ Cyanotis Arachoidea'

  }
  icon131 = document.createElement("BUTTON");
  cell.appendChild(icon131);
  icon131.innerHTML = '<img src="images/KenyaMaasai/icons/Engosikireisie.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon131.className = 'buttonsSapelli'
  icon131.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Engosikireisie'

  }

  icon132 = document.createElement("BUTTON");
  cell.appendChild(icon132);
  icon132.innerHTML = '<img src="images/KenyaMaasai/icons/Engeriadus.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon132.className = 'buttonsSapelli'
  icon132.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Engeriadus'

  }
  icon133 = document.createElement("BUTTON");
  cell.appendChild(icon133);
  icon133.innerHTML = '<img src="images/KenyaMaasai/icons/EnchaniOsirkon_CandamaForinosa.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon133.className = 'buttonsSapelli'
  icon133.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 EnchaniOsirkon ▪️ Candama Forinosa'

  }
  icon134 = document.createElement("BUTTON");
  cell.appendChild(icon134);
  icon134.innerHTML = '<img src="images/KenyaMaasai/icons/Enaimuruai_CoutchGrass.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon134.className = 'buttonsSapelli'
  icon134.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enaimuruai ▪️ CoutchGrass'

  }

  icon135 = document.createElement("BUTTON");
  cell.appendChild(icon135);
  icon135.innerHTML = '<img src="images/KenyaMaasai/icons/Emankulai_GrewiaVillosa.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon135.className = 'buttonsSapelli'
  icon135.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Emankulai ▪️ Grewia Villosa'

  }
  icon136 = document.createElement("BUTTON");
  cell.appendChild(icon136);
  icon136.innerHTML = '<img src="images/KenyaMaasai/icons/AgungaRemota.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon136.className = 'buttonsSapelli'
  icon136.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 AgungaRemota'

  }

  icon137 = document.createElement("BUTTON");
  cell.appendChild(icon137);
  icon137.innerHTML = '<img src="images/KenyaMaasai/icons/Eleleshwaekop.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon137.className = 'buttonsSapelli'
  icon137.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Eleleshwaekop'

  }
  icon138 = document.createElement("BUTTON");
  cell.appendChild(icon138);
  icon138.innerHTML = '<img src="images/KenyaMaasai/icons/Ekirenyi.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon138.className = 'buttonsSapelli'
  icon138.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Ekirenyi'

  }
  icon139 = document.createElement("BUTTON");
  cell.appendChild(icon139);
  icon139.innerHTML = '<img src="images/KenyaMaasai/icons/ConvolvulusSagittatus.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon139.className = 'buttonsSapelli'
  icon139.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Convolvulus Sagittatus'

  }
  icon140 = document.createElement("BUTTON");
  cell.appendChild(icon140);
  icon140.innerHTML = '<img src="images/KenyaMaasai/icons/NewPlant.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  icon140.className = 'buttonsSapelli'
  icon140.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '➕ New Plant'

  }

  return screenChoice && plant
}

////////////////////////////////////////////////////////////////////////////////////////


var generateButtonsIssues = function(){


  screenChoice = 'issueGeneric'

// human issue
  iconI1 = document.createElement("BUTTON");
  cell.appendChild(iconI1);
  iconI1.className = 'buttonsSapelli'
  iconI1.innerHTML = '<img src="images/KenyaMaasai/icons/ThumbsUp.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  iconI1.onclick = function(){
    hideAll()
    stage = '👍 OK'
  }


//other issues
  iconI2 = document.createElement("BUTTON");
  cell.appendChild(iconI2);
  iconI2.innerHTML = '<img src="images/KenyaMaasai/icons/Hand.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  iconI2.className = 'buttonsSapelli'
  iconI2.onclick = function(){
    hideAll()
    generateButtonsHumanIssues()
    issueSpecific = '🖐 Hand'

  iconI3 = document.createElement("BUTTON");
  cell.appendChild(iconI3);
  iconI3.className = 'buttonsSapelli'
  iconI3.innerHTML = '<img src="images/KenyaMaasai/icons/Ant.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  iconI3.onclick = function(){
    hideAll()
    issueSpecific = '🐜 Ant'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

  iconI4 = document.createElement("BUTTON");
  cell.appendChild(iconI4);
  iconI4.innerHTML = '<img src="images/KenyaMaasai/icons/Elephant.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  iconI4.className = 'buttonsSapelli'
  iconI4.onclick = function(){
    hideAll()
    issueSpecific = '🐘 Elephant'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

  iconI5 = document.createElement("BUTTON");
  cell.appendChild(iconI5);
  iconI5.innerHTML = '<img src="images/KenyaMaasai/icons/Goat.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  iconI5.className = 'buttonsSapelli'
  iconI5.onclick = function(){
    hideAll()
    issueSpecific = '🐐 Goat'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

  iconI6 = document.createElement("BUTTON");
  cell.appendChild(iconI6);
  iconI6.className = 'buttonsSapelli'
  iconI6.innerHTML = '<img src="images/KenyaMaasai/icons/Wildfire.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  iconI6.onclick = function(){
    hideAll()
    issueSpecific = '🌳🔥 Wildfire'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

  iconI7 = document.createElement("BUTTON");
  cell.appendChild(iconI7);
  iconI7.className = 'buttonsSapelli'
  iconI7.innerHTML = '<img src="images/KenyaMaasai/icons/Drought.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  iconI7.onclick = function(){
    hideAll()
    issueSpecific = '💧❌ Drought'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }


  iconI8 = document.createElement("BUTTON");
  cell.appendChild(iconI8);
  iconI8.innerHTML = '<img src="images/KenyaMaasai/icons/Flood.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  iconI8.className = 'buttonsSapelli'
  iconI8.onclick = function(){
    hideAll()
    issueSpecific = '🌊 Flood'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

  iconI9 = document.createElement("BUTTON");
  cell.appendChild(iconI9);
  iconI9.className = 'buttonsSapelli'
  iconI9.innerHTML = '<img src="images/KenyaMaasai/icons/Wind.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  iconI9.onclick = function(){
    hideAll()
    issueSpecific = '💨 Wind'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

  return screenChoice && issueSpecific

}

var generateButtonsHumanIssues = function(){

  screenChoice = 'issuesHuman'

  iconIH1 = document.createElement("BUTTON");
  cell.appendChild(iconIH1);
  iconIH1.innerHTML = '<img src="images/KenyaMaasai/icons/Panga.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  iconIH1.className = 'buttonsSapelli'
  iconIH1.onclick = function(){
    hideAll()
    issueSpecific = '🗡️ Panga'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

  iconIH2 = document.createElement("BUTTON");
  cell.appendChild(iconIH2);
  iconIH2.className = 'buttonsSapelli'
  iconIH2.innerHTML = '<img src="images/KenyaMaasai/icons/Charcoal.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  iconIH2.onclick = function(){
    hideAll()
    issueSpecific = '⬛ Charcoal'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

  iconIH3 = document.createElement("BUTTON");
  cell.appendChild(iconIH3);
  iconIH3.className = 'buttonsSapelli'
  iconIH3.innerHTML = '<img src="images/KenyaMaasai/icons/Chainsaw.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  iconIH3.onclick = function(){
    hideAll()
    issueSpecific = '🗡️🔗 Chainsaw'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }


  iconIH4 = document.createElement("BUTTON");
  cell.appendChild(iconIH4);
  iconIH4.innerHTML = '<img src="images/KenyaMaasai/icons/Pharmacy.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  iconIH4.className = 'buttonsSapelli'
  iconIH4.onclick = function(){
    hideAll()
    issueSpecific = '💉 Pharmacy'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

  iconIH5 = document.createElement("BUTTON");
  cell.appendChild(iconIH5);
  iconIH5.innerHTML = '<img src="images/KenyaMaasai/icons/Firewood.png" style="width:140px ; height:140px; border: 0px solid white" /> ';
  iconIH5.className = 'buttonsSapelli'
  iconIH5.onclick = function(){
    hideAll()
    issueSpecific = '🥄🔥 Firewood'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

return screenChoice && issueSpecific
}
