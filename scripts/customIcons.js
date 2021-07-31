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
var issuesHuman
var isMARAorMAU

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
    // if(issuesHuman == null){
    //   issuesHuman = ''
    // }
    emojioneareaeditor0.innerHTML =  plant + ' </br>' + issueSpecific
  }
}


document.getElementById('customIconsCancel').onclick = function(e){
  hideAll()
  screenChoice == 'plants'
  document.getElementById('customIconsGoBack').style.display = 'initial'
  document.getElementById('customIconsCancel').style.display = 'none';

  if(isMARAorMAU == 'mara'){
    iconMARA.style.display = 'initial'
    iconMARA.click()
    screenChoice == 'plants'
  }else if(isMARAorMAU == 'mau'){
    iconMAU.style.display = 'initial'
    iconMAU.click()
    screenChoice == 'plants'
  }

  plant = null
  issueGeneric = null
  // issuesHuman = 'emojiNoSapelli'
  issueSpecific = 'emojiNoSapelli'
  return  plant && issueSpecific && screenChoice
}
document.getElementById('customIconsGoBack').onclick = function(e){
    if(screenChoice == 'ismaraormau'){
      document.getElementById('customIconsGoBack').style.display = 'none'
      iconMARA.style.display = 'none'
      iconMAU.style.display = 'none'

      newProjectButton.style.display = 'initial'
      newProjectButton2.style.display = 'initial'

    }

  if(screenChoice == 'plants'){
      hideAll()
      iconMARA.style.display = 'initial'
      iconMAU.style.display = 'initial'
      screenChoice = 'ismaraormau'

  }
  if(screenChoice == 'issueGeneric'){
    document.getElementById('customIconsCancel').style.display = 'none'
      hideAll()
      if(isMARAorMAU == 'mara'){
        iconMARA.style.display = 'initial'
        iconMARA.click()
        screenChoice == 'plants'
      }else if(isMARAorMAU == 'mau'){
        iconMAU.style.display = 'initial'
        iconMAU.click()
        screenChoice == 'plants'
      }
  }
  if(screenChoice == 'issuesHuman'){
      hideAll()
      screenChoice = 'issueGeneric'
      iconI1.style.display = 'initial'
      iconI2.style.display = 'initial'
      iconI3.style.display = 'initial'
      iconI4.style.display = 'initial'
      iconI5.style.display = 'initial'
      iconI6.style.display = 'initial'
      iconI7.style.display = 'initial'
      iconI8.style.display = 'initial'
      iconI9.style.display = 'initial'
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
var newProjectButton2
// var newProjectButton3
// var newProjectButton4
// var newProjectButton5

var screenwidth = screen.width +'px'
// var newProjectButton
//excites Logo in the map: to open the sapelli project
document.getElementById('sapelliProjects').onclick = function(e){
  preload([
    'images/KenyaMaasaiMARA/logoKenyaGeneric.png','images/KenyaEMC/logoKenyaEMC.png',

  ])
  setTimeout(function(){




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


    if(projectsCreated == false){
      projectsCreated = true

        cell = document.createElement('div')
        document.body.appendChild(cell)
        cell.className = 'gridCell'

        newProjectButton = document.createElement("BUTTON");
        cell.appendChild(newProjectButton);
        newProjectButton.className = 'sapelliProjectsLogo'
        newProjectButton.innerHTML = '<img src="images/KenyaMaasaiMARA/logoKenyaGeneric.png" style="width:50px ; height:50px; border: 0px solid white" />';
        newProjectButton.style.gridColumn = '1'
        newProjectButton.style.gridRow = '1';

        // newProjectButton.style.left = '50%'
        // cell.style.overflow = 'scroll'

        newProjectButton2 = document.createElement("BUTTON");
        cell.appendChild(newProjectButton2);
        newProjectButton2.className = 'sapelliProjectsLogo'
        newProjectButton2.innerHTML = '<img src="images/KenyaEMC/logoKenyaEMC.png" style="width:50px ;  height:50px; border: 0px solid white" />';
        // newProjectButton2.style.marginTop = '100px'
        newProjectButton2.style.gridColumn = '2'
        newProjectButton2.style.gridRow = '1'
        // newProjectButton.style.left = '50%'

         newProjectButton2.onclick = function(){
           newProjectButton2.innerHTML = '<img src="images/underConstruction.png" style="width:50px ; height:50px; border: 0px solid white" />';
           setTimeout(function(){
             newProjectButton2.innerHTML = '<img src="images/KenyaEMC/logoKenyaEMC.png" style="width:50px ; height:50px; border: 0px solid white" />';

           },2000)
         }


        preload([

'images/KenyaMaasaiMARA/icons/White_Thorn_Acacia.png','images/KenyaMaasaiMARA/icons/Whistling_Thorn_Acacia.png','images/KenyaMaasaiMARA/icons/Olodoganayioi.png','images/KenyaMaasaiMARA/icons/Madagascar_Periwinkle.png',
'images/KenyaMaasaiMARA/icons/Imukutio.png','images/KenyaMaasaiMARA/icons/Esampukike_Ormocarpum_Kirkii.png','images/KenyaMaasaiMARA/icons/Enkosikirianchoi.png','images/KenyaMaasaiMARA/icons/Enkasuishoi_Pavonia_Urens.png',
'images/KenyaMaasaiMARA/icons/Enkameloki.png','images/KenyaMaasaiMARA/icons/Cat_Thorn_Osanangururi.png','images/KenyaMaasaiMARA/icons/Cacia_Ocadantalis.png','images/KenyaMaasaiMARA/icons/Logo.png',
'images/KenyaMaasaiMARA/icons/InvasiveSpecies.png','images/KenyaMaasaiMARA/icons/Hand.png','images/KenyaMaasaiMARA/icons/Goat.png','images/KenyaMaasaiMARA/icons/Flood.png','images/KenyaMaasaiMARA/icons/Firewood.png',
'images/KenyaMaasaiMARA/icons/Emorogi_KayaApples.png','images/KenyaMaasaiMARA/icons/Emankulai_GrewiaVillosa.png','images/KenyaMaasaiMARA/icons/Elephant.png','images/KenyaMaasaiMARA/icons/Eleleshwaekop.png',
'images/KenyaMaasaiMARA/icons/Ekogoltim.png','images/KenyaMaasaiMARA/icons/Ekirenyi.png','images/KenyaMaasaiMARA/icons/Drought.png','images/KenyaMaasaiMARA/icons/Discard.png','images/KenyaMaasaiMARA/icons/ConvolvulusSagittatus.png',
'images/KenyaMaasaiMARA/icons/Confirm.png','images/KenyaMaasaiMARA/icons/Chainsaw.png','images/KenyaMaasaiMARA/icons/AudioClip.png','images/KenyaMaasaiMARA/icons/Ant.png','images/KenyaMaasaiMARA/icons/AgungaRemota.png',
'images/KenyaMaasaiMARA/icons/Charcoal.png','images/KenyaMaasaiMARA/icons/Olmotoo.png','images/KenyaMaasaiMARA/icons/Olmorijoi_PoisonArrowTree.png','images/KenyaMaasaiMARA/icons/Olmisigiyioi_RhusNatalensis.png',
'images/KenyaMaasaiMARA/icons/Olmingarukeon.png','images/KenyaMaasaiMARA/icons/Olmerumori_SickleBush.png','images/KenyaMaasaiMARA/icons/Olmatundai_Cactus.png','images/KenyaMaasaiMARA/icons/Olmaroroi_CopretumMolle.png',
'images/KenyaMaasaiMARA/icons/Olmalilio.png','images/KenyaMaasaiMARA/icons/Olkunetia.png','images/KenyaMaasaiMARA/icons/Olkonyil.png','images/KenyaMaasaiMARA/icons/Olkombobit_DevilMilkyBush.png','images/KenyaMaasaiMARA/icons/Olkokola_Ramnustaddo.png',
'images/KenyaMaasaiMARA/icons/Olkisikongu_PappeaCapensis.png','images/KenyaMaasaiMARA/icons/Olkirigirri_WaitABit.png','images/KenyaMaasaiMARA/icons/Olkinyei_UclearDovinrum.png','images/KenyaMaasaiMARA/icons/Olkimitare.png',
'images/KenyaMaasaiMARA/icons/Olkiloreti_AcaciaNilotica.png','images/KenyaMaasaiMARA/icons/Olkierenkure.png','images/KenyaMaasaiMARA/icons/Olkakawa.png','images/KenyaMaasaiMARA/icons/Oliouruur_CabaggeTree.png',
'images/KenyaMaasaiMARA/icons/Olgumi.png','images/KenyaMaasaiMARA/icons/Olgoswa_DesertDate.png','images/KenyaMaasaiMARA/icons/Olgigiri_WaitAbit.png','images/KenyaMaasaiMARA/icons/OlgalayioiLoosirkon.png',
'images/KenyaMaasaiMARA/icons/Oleturot.png','images/KenyaMaasaiMARA/icons/Olesupeni.png','images/KenyaMaasaiMARA/icons/Olesayiet_RedCherry.png','images/KenyaMaasaiMARA/icons/Olerai_YellowBarkedAcacia.png',
'images/KenyaMaasaiMARA/icons/Oleparmunyo_ToddaliaAsiatica.png','images/KenyaMaasaiMARA/icons/Olemuran_OcimumBasllicum.png','images/KenyaMaasaiMARA/icons/Olemenega.png','images/KenyaMaasaiMARA/icons/Oleleshwa_CamphorBush_TarchonanthusCamphoratus.png',
'images/KenyaMaasaiMARA/icons/Olekidongo_Actyphafruticosa.png','images/KenyaMaasaiMARA/icons/Oldupai.png','images/KenyaMaasaiMARA/icons/Oldule_CastorOilPlant.png','images/KenyaMaasaiMARA/icons/Oldarpoi_KigeliaAfricana-Sausage.png',
'images/KenyaMaasaiMARA/icons/Olchhartuyian_GallinieraSaxiFraga.png','images/KenyaMaasaiMARA/icons/Olchanilekule.png','images/KenyaMaasaiMARA/icons/Olbibi_OrangeLeonotisMollisima.png','images/KenyaMaasaiMARA/icons/Olbangi_TagetesMinuta.png',
'images/KenyaMaasaiMARA/icons/Olauraki.png','images/KenyaMaasaiMARA/icons/Olaturdei_CaperCaparis.png','images/KenyaMaasaiMARA/icons/Olarae.png','images/KenyaMaasaiMARA/icons/Olangungue.png','images/KenyaMaasaiMARA/icons/Olamuriaki_CarissaEdulis.png',
'images/KenyaMaasaiMARA/icons/Olamuranya_SpikeThornBush.png','images/KenyaMaasaiMARA/icons/Olamererua.png','images/KenyaMaasaiMARA/icons/Olakiroingai_OrangeLeafCroton.png','images/KenyaMaasaiMARA/icons/Olairagai.png',
'images/KenyaMaasaiMARA/icons/Okilenyai.png','images/KenyaMaasaiMARA/icons/OitiOibor_SenegalSenegalsis.png','images/KenyaMaasaiMARA/icons/Oiiri.png','images/KenyaMaasaiMARA/icons/NoRecording.png',
'images/KenyaMaasaiMARA/icons/NoRecName.png','images/KenyaMaasaiMARA/icons/NoPhoto.png','images/KenyaMaasaiMARA/icons/NewPlant.png','images/KenyaMaasaiMARA/icons/Naingongundeyo.png','images/KenyaMaasaiMARA/icons/Intualan_LionsClan.png',
'images/KenyaMaasaiMARA/icons/Imasilig.png','images/KenyaMaasaiMARA/icons/Esiaiti.png','images/KenyaMaasaiMARA/icons/Esambukike.png','images/KenyaMaasaiMARA/icons/Enyieman.png','images/KenyaMaasaiMARA/icons/Entasim.png',
'images/KenyaMaasaiMARA/icons/Enkorukoti.png','images/KenyaMaasaiMARA/icons/Enkarani.png','images/KenyaMaasaiMARA/icons/Enkameloki_Maerua_LongBeadBean.png','images/KenyaMaasaiMARA/icons/Enkamai_SourPlum-FalseSandalwood.png','images/KenyaMaasaiMARA/icons/Enkaiteteyiai_CyanotisArachoidea.png',
'images/KenyaMaasaiMARA/icons/Engosikireisie.png','images/KenyaMaasaiMARA/icons/Engeriadus.png','images/KenyaMaasaiMARA/icons/EnchaniOsirkon_CandamaForinosa.png','images/KenyaMaasaiMARA/icons/EnchaniEnkashe.png',
'images/KenyaMaasaiMARA/icons/Enaimuruai_CoutchGrass.png','images/KenyaMaasaiMARA/icons/Send.png','images/KenyaMaasaiMARA/icons/Sakutae_FlameLily.png','images/KenyaMaasaiMARA/icons/Questionmark.png','images/KenyaMaasaiMARA/icons/provisionalLogo_Masai.png',
'images/KenyaMaasaiMARA/icons/provisionalLogo_Land.png','images/KenyaMaasaiMARA/icons/provisionalLogo.png','images/KenyaMaasaiMARA/icons/Photo.png','images/KenyaMaasaiMARA/icons/Pharmacy.png','images/KenyaMaasaiMARA/icons/Panga.png',
'images/KenyaMaasaiMARA/icons/OyiitiOibor_Acacia_Senegal.png','images/KenyaMaasaiMARA/icons/Osuyai.png','images/KenyaMaasaiMARA/icons/Osupukiai_Dombeya.png','images/KenyaMaasaiMARA/icons/Osupakupes_AlbiziaGummifera.png',
'images/KenyaMaasaiMARA/icons/Osuguroi_AloeKillifiensis.png','images/KenyaMaasaiMARA/icons/Osokonoi_WaburgiaUgandensis.png','images/KenyaMaasaiMARA/icons/Ositeti_FalseBrandyBush.png','images/KenyaMaasaiMARA/icons/Osinoni_FeverTree.png',
'images/KenyaMaasaiMARA/icons/Osilalei_Camiphora.png','images/KenyaMaasaiMARA/icons/Osikawai_SolanumAculeastrum_BitterApple.png','images/KenyaMaasaiMARA/icons/Osenetoi_CandleBush.png','images/KenyaMaasaiMARA/icons/Orupanti.png',
'images/KenyaMaasaiMARA/icons/OrngiroAre.png','images/KenyaMaasaiMARA/icons/Orngerioi.png','images/KenyaMaasaiMARA/icons/Orgilai_TecleaNobilis.png','images/KenyaMaasaiMARA/icons/Oreteti_WildFig.png','images/KenyaMaasaiMARA/icons/Orbibi_Sunbird.png',
'images/KenyaMaasaiMARA/icons/Oltuyiesi_HopBush_DodonaeaViscosa.png','images/KenyaMaasaiMARA/icons/Oltutu.png','images/KenyaMaasaiMARA/icons/Oltulelei_SodomApple.png','images/KenyaMaasaiMARA/icons/Oltopisianoi.png',
'images/KenyaMaasaiMARA/icons/Oltirkish.png','images/KenyaMaasaiMARA/icons/Oltiamiletei_MorningGlory.png','images/KenyaMaasaiMARA/icons/Oltakurkuriet_LargeLeafGardenia.png','images/KenyaMaasaiMARA/icons/Olsukurtutui_Cactusvine.png','images/KenyaMaasaiMARA/icons/Olseyiai_Cypreus.png',
'images/KenyaMaasaiMARA/icons/Olseki_SandpaperCodiar.png','images/KenyaMaasaiMARA/icons/Olriroi.png','images/KenyaMaasaiMARA/icons/Olpopogi_EuphobiaCandalebra.png','images/KenyaMaasaiMARA/icons/Olpisialokonoi.png','images/KenyaMaasaiMARA/icons/OlperrElongo.png',
'images/KenyaMaasaiMARA/icons/Olperesiorasha.png','images/KenyaMaasaiMARA/icons/Olpaleki_AaturaStramonium.png','images/KenyaMaasaiMARA/icons/Olpalakai.png','images/KenyaMaasaiMARA/icons/Oloyiapasei_AspiliaPluriseta.png',
'images/KenyaMaasaiMARA/icons/Oloyaepase.png','images/KenyaMaasaiMARA/icons/Olosida_HypoestesForskahlii.png','images/KenyaMaasaiMARA/icons/Olosholol.png','images/KenyaMaasaiMARA/icons/Olosesiai_SandalBush.png','images/KenyaMaasaiMARA/icons/Oloroukileleng.png',
'images/KenyaMaasaiMARA/icons/Olopito.png','images/KenyaMaasaiMARA/icons/Oloorodo_CyphostemmaSerpens.png','images/KenyaMaasaiMARA/icons/Ololupa_Camiphora.png','images/KenyaMaasaiMARA/icons/Olokunonoi.png','images/KenyaMaasaiMARA/icons/Olokiridingae_OrangeLeaveCroton.png',
'images/KenyaMaasaiMARA/icons/Olokilepoi.png','images/KenyaMaasaiMARA/icons/Oloitodoraek.png','images/KenyaMaasaiMARA/icons/Oloiropijiloosiikon.png','images/KenyaMaasaiMARA/icons/Oloirien_AfricanWildOlive.png','images/KenyaMaasaiMARA/icons/Oloireroi_LeopardTree.png',
'images/KenyaMaasaiMARA/icons/Oloilalei_ZiziphusMucronata_BuffaloThorn.png','images/KenyaMaasaiMARA/icons/Ologumati.png','images/KenyaMaasaiMARA/icons/Olobai_PsiadiaPanctulata.png','images/KenyaMaasaiMARA/icons/Olnyalugai_GrewiaSimilis.png',
'images/KenyaMaasaiMARA/icons/Olnokoret.png','images/KenyaMaasaiMARA/icons/Olngongwenyi_BlackBarkedAcacia.png','images/KenyaMaasaiMARA/icons/Wind.png','images/KenyaMaasaiMARA/icons/Wildfire.png','images/KenyaMaasaiMARA/icons/ViynaMembranacea.png',
'images/KenyaMaasaiMARA/icons/ThumbsUpThumbsDown.png','images/KenyaMaasaiMARA/icons/ThumbsUp.png','images/KenyaMaasaiMARA/icons/ThumbsDown.png','images/KenyaMaasaiMARA/icons/Suguroi_AloeVera.png','images/KenyaMaasaiMARA/icons/returnMainScreen.png',
'images/KenyaMaasaiMARA/icons/Olmasei_ForestRothmania_Cheesewood.png','images/KenyaMaasaiMARA/icons/CrossRed_small.png','images/KenyaMaasaiMARA/icons/CrossRed.png',



'images/KenyaMaasaiMAU/icons/Aonet_Policius vulva.png','images/KenyaMaasaiMAU/icons/Arorwet.png','images/KenyaMaasaiMAU/icons/Bontet_Rosewood.png','images/KenyaMaasaiMAU/icons/Botkawet.png','images/KenyaMaasaiMAU/icons/Chemoset.png','images/KenyaMaasaiMAU/icons/Chepchabayiet.png',
'images/KenyaMaasaiMAU/icons/Chepgetuiyet.png','images/KenyaMaasaiMAU/icons/Chepkoibet.png','images/KenyaMaasaiMAU/icons/Chepkorgoriet.png','images/KenyaMaasaiMAU/icons/Chepkowet.png','images/KenyaMaasaiMAU/icons/Chepkurbet.png','images/KenyaMaasaiMAU/icons/Chepngororiet.png',
'images/KenyaMaasaiMAU/icons/Chepongiot.png','images/KenyaMaasaiMAU/icons/Chepsakitiet.png','images/KenyaMaasaiMAU/icons/Chep_tenderet.png','images/KenyaMaasaiMAU/icons/Cheptiringwet.png','images/KenyaMaasaiMAU/icons/Cherungut.png','images/KenyaMaasaiMAU/icons/Chesamisiet.png',
'images/KenyaMaasaiMAU/icons/Chesamisiet_Clerodendrum myricoids.png','images/KenyaMaasaiMAU/icons/Chesicheiyet.png','images/KenyaMaasaiMAU/icons/Eburwet.png','images/KenyaMaasaiMAU/icons/Enabooi_Chemngesumiet.png','images/KenyaMaasaiMAU/icons/Endalati ekutuk.png','images/KenyaMaasaiMAU/icons/Enkaisuishoi.png',
'images/KenyaMaasaiMAU/icons/Enkisiau.png','images/KenyaMaasaiMAU/icons/Enkoloshoo.png','images/KenyaMaasaiMAU/icons/Enkopisiadi.png','images/KenyaMaasaiMAU/icons/Enkopito_enkopito ooltorrobo.png','images/KenyaMaasaiMAU/icons/Enkopito ooltorrobo.png','images/KenyaMaasaiMAU/icons/Entakuleti.png',
'images/KenyaMaasaiMAU/icons/Entamejoi.png','images/KenyaMaasaiMAU/icons/Entamejoi oolosowuani.png','images/KenyaMaasaiMAU/icons/Entapipi.png','images/KenyaMaasaiMAU/icons/Entemelua.png','images/KenyaMaasaiMAU/icons/Entiangaras.png','images/KenyaMaasaiMAU/icons/Entiapapaa.png','images/KenyaMaasaiMAU/icons/Esere.png',
'images/KenyaMaasaiMAU/icons/Esumeita.png','images/KenyaMaasaiMAU/icons/Ewat.png','images/KenyaMaasaiMAU/icons/Imaniat.png','images/KenyaMaasaiMAU/icons/Imeenpet.png','images/KenyaMaasaiMAU/icons/Kalialwet.png','images/KenyaMaasaiMAU/icons/Kebukeyet.png','images/KenyaMaasaiMAU/icons/Kepkoibet_Angerae.png',
'images/KenyaMaasaiMAU/icons/Ketegaa.png','images/KenyaMaasaiMAU/icons/Ketungutiet.png','images/KenyaMaasaiMAU/icons/Kibirirgorok.png','images/KenyaMaasaiMAU/icons/Kipkosieriet.png','images/KenyaMaasaiMAU/icons/Kipkutungit.png','images/KenyaMaasaiMAU/icons/Kipsebwet.png','images/KenyaMaasaiMAU/icons/Kipsertwet.png',
'images/KenyaMaasaiMAU/icons/Kipsotiet.png','images/KenyaMaasaiMAU/icons/Kipsowoit.png','images/KenyaMaasaiMAU/icons/Kogob_toroi.png','images/KenyaMaasaiMAU/icons/Kombeito.png','images/KenyaMaasaiMAU/icons/Korosiot.png','images/KenyaMaasaiMAU/icons/Kosisietet_Rhannus prinoides.png','images/KenyaMaasaiMAU/icons/Kosisitiet.png',
'images/KenyaMaasaiMAU/icons/Kuresiet_olkushurui.png','images/KenyaMaasaiMAU/icons/Lapotiet.png','images/KenyaMaasaiMAU/icons/Lebekwet.png','images/KenyaMaasaiMAU/icons/Lekikuuni.png','images/KenyaMaasaiMAU/icons/Lepekwet.png','images/KenyaMaasaiMAU/icons/Logg plant.png','images/KenyaMaasaiMAU/icons/Logomaita_macaranga kilimanscharia.png',
'images/KenyaMaasaiMAU/icons/Mailpuch.png','images/KenyaMaasaiMAU/icons/Mangoita.png','images/KenyaMaasaiMAU/icons/Manguangiet.png','images/KenyaMaasaiMAU/icons/Marongeet_olmeikuaya.png','images/KenyaMaasaiMAU/icons/Martit.png','images/KenyaMaasaiMAU/icons/Matirtirwet.png',
'images/KenyaMaasaiMAU/icons/Meswot_bees.png','images/KenyaMaasaiMAU/icons/Mogoiwet.png','images/KenyaMaasaiMAU/icons/Mogokwet.png','images/KenyaMaasaiMAU/icons/Mopondet.png','images/KenyaMaasaiMAU/icons/Mosipchot.png','images/KenyaMaasaiMAU/icons/Murguiwet.png','images/KenyaMaasaiMAU/icons/Mutereriet.png',
'images/KenyaMaasaiMAU/icons/Mwabiyet.png','images/KenyaMaasaiMAU/icons/Naman keon.png','images/KenyaMaasaiMAU/icons/Nareruk.png','images/KenyaMaasaiMAU/icons/Ndakariat.png','images/KenyaMaasaiMAU/icons/Ngingichet.png','images/KenyaMaasaiMAU/icons/Noiwet.png','images/KenyaMaasaiMAU/icons/Nukiat_nime.png',
'images/KenyaMaasaiMAU/icons/Nyelwet.png','images/KenyaMaasaiMAU/icons/Olabai lepartolu.png','images/KenyaMaasaiMAU/icons/Olaimurunyai.png','images/KenyaMaasaiMAU/icons/Olalaa.png','images/KenyaMaasaiMAU/icons/Olayakuji.png','images/KenyaMaasaiMAU/icons/Olchani.png','images/KenyaMaasaiMAU/icons/Olchartuyian.png',
'images/KenyaMaasaiMAU/icons/Oledat.png','images/KenyaMaasaiMAU/icons/Oleturot.png','images/KenyaMaasaiMAU/icons/Olkekeyiet.png','images/KenyaMaasaiMAU/icons/Olkikuei loosirkon.png','images/KenyaMaasaiMAU/icons/Olkilelit_olchani.png','images/KenyaMaasaiMAU/icons/Olkiparnyany_kuparnyaat.png',
'images/KenyaMaasaiMAU/icons/Olkipejus.png','images/KenyaMaasaiMAU/icons/Olkirenyi.png','images/KenyaMaasaiMAU/icons/Olkisushet.png','images/KenyaMaasaiMAU/icons/Olkujuk.png','images/KenyaMaasaiMAU/icons/Olmasiligi.png','images/KenyaMaasaiMAU/icons/Olmomoi.png','images/KenyaMaasaiMAU/icons/Olmusaakwa.png',
'images/KenyaMaasaiMAU/icons/Olngenchemi.png','images/KenyaMaasaiMAU/icons/Ologolbenek.png','images/KenyaMaasaiMAU/icons/Ologumati.png','images/KenyaMaasaiMAU/icons/Oloiborr benek.png','images/KenyaMaasaiMAU/icons/Oloisuti.png','images/KenyaMaasaiMAU/icons/Oloiururr.png','images/KenyaMaasaiMAU/icons/Ololiontoi.png',
'images/KenyaMaasaiMAU/icons/Olomei.png','images/KenyaMaasaiMAU/icons/Oloniyai.png','images/KenyaMaasaiMAU/icons/Olorrondo.png','images/KenyaMaasaiMAU/icons/Olosiro.png','images/KenyaMaasaiMAU/icons/Olpalagilagi.png','images/KenyaMaasaiMAU/icons/Olpiron.png','images/KenyaMaasaiMAU/icons/Olpolto.png',
'images/KenyaMaasaiMAU/icons/Oltarakuai.png','images/KenyaMaasaiMAU/icons/Oltiini.png','images/KenyaMaasaiMAU/icons/Oltikampu.png','images/KenyaMaasaiMAU/icons/Oltirkoyian.png','images/KenyaMaasaiMAU/icons/Olturuj.png','images/KenyaMaasaiMAU/icons/Ormarrar.png','images/KenyaMaasaiMAU/icons/Osasimawani.png',
'images/KenyaMaasaiMAU/icons/Osinantei.png','images/KenyaMaasaiMAU/icons/Osonkorori.png','images/KenyaMaasaiMAU/icons/Osupukiai orok.png','images/KenyaMaasaiMAU/icons/Rerendet_rauvolfia.png','images/KenyaMaasaiMAU/icons/Rokoret_drinking straw.png','images/KenyaMaasaiMAU/icons/Rope plant.png','images/KenyaMaasaiMAU/icons/Sabetet_nabutoria.png',
'images/KenyaMaasaiMAU/icons/Saiyet.png','images/KenyaMaasaiMAU/icons/Sangainet.png','images/KenyaMaasaiMAU/icons/Sasiat.png','images/KenyaMaasaiMAU/icons/Sasuriet_wild banana.png','images/KenyaMaasaiMAU/icons/Sebeberiet.png','images/KenyaMaasaiMAU/icons/Seet_alipizias.png','images/KenyaMaasaiMAU/icons/Sergutiet.png',
'images/KenyaMaasaiMAU/icons/Serkutwet.png','images/KenyaMaasaiMAU/icons/Setiot.png','images/KenyaMaasaiMAU/icons/Singorwet.png','images/KenyaMaasaiMAU/icons/Sinkorwet.png','images/KenyaMaasaiMAU/icons/Sirimpiet.png','images/KenyaMaasaiMAU/icons/Sitotwet_oseketeki.png','images/KenyaMaasaiMAU/icons/Siwot.png',
'images/KenyaMaasaiMAU/icons/Sugumeriet.png','images/KenyaMaasaiMAU/icons/Sumetet.png','images/KenyaMaasaiMAU/icons/Suseita.png','images/KenyaMaasaiMAU/icons/Takamamiet.png','images/KenyaMaasaiMAU/icons/Taparariet.png','images/KenyaMaasaiMAU/icons/Tebararietab teta.png','images/KenyaMaasaiMAU/icons/Tekelteet.png',
'images/KenyaMaasaiMAU/icons/Tekiat_oltiyani.png','images/KenyaMaasaiMAU/icons/Teldet.png','images/KenyaMaasaiMAU/icons/Tepengwet.png','images/KenyaMaasaiMAU/icons/Tiniet_scheflera rolkensil.png','images/KenyaMaasaiMAU/icons/Tokweyot.png','images/KenyaMaasaiMAU/icons/Topitiet.png',
        ]);

  }
  else{



    //FUCK, the grid doesn't need to be hidden!!!
    // cell.style.display = 'initial'

    //this is to ensure that the two buttons are well located. Not the best solution but ....
    newProjectButton.style.display = 'initial';
    // newProjectButton.style.left = '50px'
    newProjectButton2.style.display = 'initial';
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
                  newProjectButton2.style.display = 'none';
                  generateButtonsMaraORMau()
                  newProjectButton.innerHTML = '<img src="images/KenyaMaasaiMARA/logoKenyaGeneric.png" style="width:50px ; height:50px; border: 0px solid white" />';
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
          //   newProjectButton.innerHTML = '<img src="images/KenyaMaasaiMARA/logoMara.png" style="width:50px ; height:50px; border: 0px solid white" />';
          //   newProjectButton.disabled = false
          //   newProjectButton.style.backgroundColor = 'white'
          //   newProjectButton.style.borderColor = 'white'
          //
          // },10000)

        }else{
          // sapProjectFirstTime = false
          newProjectButton.style.display = 'none';
          newProjectButton2.style.display = 'none';
          cell.setAttribute("style","overflow-y:scroll");
          document.getElementById('customIconsGoBack').style.display = 'initial'


          generateButtonsMaraORMau()
        }

    }
  },400)
  return projectsCreated && sapProjectFirstTime && newProjectButton && newProjectButton2 && cell
}

var  iconMARA, iconMAU,iconMARA_8,iconMARA_9,iconMARA_10,iconMARA_11,iconMARA_12,iconMARA_13,iconMARA_14,iconMARA_15,iconMARA_16,iconMARA_17,iconMARA_18,iconMARA_19,iconMARA_20,iconMARA_21,iconMARA_22,iconMARA_22,iconMARA_23,iconMARA_24,iconMARA_25,iconMARA_26,
icon27,iconMARA_28,iconMARA_29,iconMARA_30,iconMARA_31,iconMARA_32,iconMARA_33,iconMARA_34,iconMARA_35,iconMARA_36,iconMARA_37,iconMARA_38,iconMARA_39,iconMARA_40,iconMARA_41,iconMARA_42,iconMARA_43,iconMARA_44,iconMARA_45,iconMARA_46,iconMARA_47,iconMARA_48,iconMARA_49,iconMARA_50,iconMARA_51,iconMARA_52,iconMARA_53,
icon54,iconMARA_55,iconMARA_56,iconMARA_57,iconMARA_58,iconMARA_59,iconMARA_60,iconMARA_61,iconMARA_62,iconMARA_63,iconMARA_64,iconMARA_65,iconMARA_66,iconMARA_67,iconMARA_68,iconMARA_69,iconMARA_70,iconMARA_71,iconMARA_72,iconMARA_73,iconMARA_74,iconMARA_75,iconMARA_76,iconMARA_77,iconMARA_78,iconMARA_79,iconMARA_80,
icon81,iconMARA_82,iconMARA_83,iconMARA_84,iconMARA_85,iconMARA_86,iconMARA_87,iconMARA_88,iconMARA_89,iconMARA_90,iconMARA_91,iconMARA_92,iconMARA_93,iconMARA_94,iconMARA_95,iconMARA_96,iconMARA_97,iconMARA_98,iconMARA_99,iconMARA_100,iconMARA_101,iconMARA_102,iconMARA_103,iconMARA_104,iconMARA_105,iconMARA_106,
icon107,iconMARA_108,iconMARA_109,iconMARA_110,iconMARA_111,iconMARA_112,iconMARA_113,iconMARA_114,iconMARA_115,iconMARA_116,iconMARA_117,iconMARA_118,iconMARA_119,iconMARA_120,iconMARA_121,icon122,iconMARA_123,icon124,iconMARA_125,iconMARA_126,iconMARA_127,iconMARA_128,iconMARA_129,iconMARA_130,
icon131,iconMARA_132,iconMARA_133,iconMARA_134,iconMARA_135,iconMARA_136,iconMARA_137,iconMARA_138,iconMARA_139,iconMARA_140,iconMARA_141,iconMARA_142,iconMARA_143,iconMARA_144,iconMARA_145,iconMARA_146,iconMARA_147,iconMARA_148,iconMARA_149,iconMARA_150,iconMARA_200,

iconMAU_8,iconMAU_9,iconMAU_10,iconMAU_11,iconMAU_12,iconMAU_13,iconMAU_14,iconMAU_15,iconMAU_16,iconMAU_17,iconMAU_18,iconMAU_19,iconMAU_20,iconMAU_21,iconMAU_22,iconMAU_22,iconMAU_23,iconMAU_24,iconMAU_25,iconMAU_26,
icon27,iconMAU_28,iconMAU_29,iconMAU_30,iconMAU_31,iconMAU_32,iconMAU_33,iconMAU_34,iconMAU_35,iconMAU_36,iconMAU_37,iconMAU_38,iconMAU_39,iconMAU_40,iconMAU_41,iconMAU_42,iconMAU_43,iconMAU_44,iconMAU_45,iconMAU_46,iconMAU_47,iconMAU_48,iconMAU_49,iconMAU_50,iconMAU_51,iconMAU_52,iconMAU_53,
icon54,iconMAU_55,iconMAU_56,iconMAU_57,iconMAU_58,iconMAU_59,iconMAU_60,iconMAU_61,iconMAU_62,iconMAU_63,iconMAU_64,iconMAU_65,iconMAU_66,iconMAU_67,iconMAU_68,iconMAU_69,iconMAU_70,iconMAU_71,iconMAU_72,iconMAU_73,iconMAU_74,iconMAU_75,iconMAU_76,iconMAU_77,iconMAU_78,iconMAU_79,iconMAU_80,
icon81,iconMAU_82,iconMAU_83,iconMAU_84,iconMAU_85,iconMAU_86,iconMAU_87,iconMAU_88,iconMAU_89,iconMAU_90,iconMAU_91,iconMAU_92,iconMAU_93,iconMAU_94,iconMAU_95,iconMAU_96,iconMAU_97,iconMAU_98,iconMAU_99,iconMAU_100,iconMAU_101,iconMAU_102,iconMAU_103,iconMAU_104,iconMAU_105,iconMAU_106,
icon107,iconMAU_108,iconMAU_109,iconMAU_110,iconMAU_111,iconMAU_112,iconMAU_113,iconMAU_114,iconMAU_115,iconMAU_116,iconMAU_117,iconMAU_118,iconMAU_119,iconMAU_120,iconMAU_121,icon122,iconMAU_123,icon124,iconMAU_125,iconMAU_126,iconMAU_127,iconMAU_128,iconMAU_129,iconMAU_130,
icon131,iconMAU_132,iconMAU_133,iconMAU_134,iconMAU_135,iconMAU_136,iconMAU_137,iconMAU_138,iconMAU_139,iconMAU_140,iconMAU_141,iconMAU_142,iconMAU_143,iconMAU_144,iconMAU_145,iconMAU_146,iconMAU_147,iconMAU_148,iconMAU_149,iconMAU_150,
icon151,iconMAU_152,iconMAU_153,iconMAU_154,iconMAU_155,iconMAU_156,iconMAU_157,iconMAU_158,iconMAU_159,iconMAU_160,iconMAU_161,iconMAU_162,iconMAU_163,iconMAU_164,iconMAU_165,iconMAU_166,icon167,iconMAU_200,

iconI1,iconI2, iconI3, iconI4, iconI5,iconI6, iconI7, iconI8, iconI9, iconIH1, iconIH2, iconIH3, iconIH4, iconIH5

// var generateDivElementCell = function(){
//   cell = document.createElement("div");
//   document.body.appendChild(cell);
//   cell.className = 'gridCell'
//   return cell
// }

var generateButtonsMaraORMau = function(){
  screenChoice = 'ismaraormau'
  iconMARA = document.createElement("BUTTON");
  cell.appendChild(iconMARA);
  iconMARA.className = 'buttonsSapelli'
  iconMARA.style.backgroundColor = 'blue'
  iconMARA.innerHTML = '<img src="images/KenyaMaasaiMARA/logoMara.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>';
  iconMARA.onclick = function(){
    isMARAorMAU = 'mara'
    iconMARA.style.display = 'none'
    iconMAU.style.display = 'none'

    // hideAll()
    generateButtonsPlantsMARA()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    // document.getElementById('customIconsCancel').style.display = 'initial';
    // plant = '🌿 Olakiroingai ▪️ Orange Leaf Croton'
  }
  iconMAU = document.createElement("BUTTON");
  cell.appendChild(iconMAU);
  iconMAU.style.backgroundColor = 'green'
  iconMAU.innerHTML = '<img src="images/KenyaMaasaiMAU/logoMau.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>';
  iconMAU.className = 'buttonsSapelli'
  iconMAU.onclick = function(){
    isMARAorMAU = 'mau'
    iconMARA.style.display = 'none'
    iconMAU.style.display = 'none'
  generateButtonsPlantsMAU()
  document.getElementById('customIconsGoBack').style.display = 'initial';
  // document.getElementById('customIconsCancel').style.display = 'initial';
    // plant = '🌿 Olamuranya ▪️ Spike Thorn Bush'

  }
 return isMARAorMAU && screenChoice
}


////////////////////////////////////////             PLANTS MARA       ///////////////////////////////

var generateButtonsPlantsMARA = function(){

  screenChoice = 'plants'

 iconMARA_8 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_8);
 iconMARA_8.className = 'buttonsSapelli'
 iconMARA_8.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olakiroingai_OrangeLeafCroton.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>';
 iconMARA_8.onclick = function(){
    hideAll()
    generateButtonsIssues()

    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olakiroingai ▪️ Orange Leaf Croton'
  }
 iconMARA_9 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_9);
 iconMARA_9.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olamuranya_SpikeThornBush.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>';
 iconMARA_9.className = 'buttonsSapelli'
 iconMARA_9.onclick = function(){
    hideAll()
  generateButtonsIssues()
  document.getElementById('customIconsGoBack').style.display = 'initial';
  document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olamuranya ▪️ Spike Thorn Bush'
  }

 iconMARA_10 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_10);
 iconMARA_10.className = 'buttonsSapelli'
 iconMARA_10.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olerai_YellowBarkedAcacia.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_10.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olerai ▪️ Yellow Barked Acacia'
  }
 iconMARA_11 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_11);
 iconMARA_11.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olgoswa_DesertDate.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_11.className = 'buttonsSapelli'
 iconMARA_11.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olgoswa ▪️ Desert Date'
  }
 iconMARA_12 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_12);
 iconMARA_12.className = 'buttonsSapelli'
 iconMARA_12.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olmasei_ForestRothmania_Cheesewood.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_12.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmasei ▪️ Forest Rothmania Cheesewood'
  }
 iconMARA_13 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_13);
 iconMARA_13.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Osinoni_FeverTree.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_13.className = 'buttonsSapelli'
 iconMARA_13.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osinoni ▪️ Fever Tree'

  }
 iconMARA_14 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_14);
 iconMARA_14.className = 'buttonsSapelli'
 iconMARA_14.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Osupakupes_AlbiziaGummifera.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_14.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osupakupes ▪️ Albizia Gummifera'

  }
 iconMARA_15 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_15);
 iconMARA_15.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Osokonoi_WaburgiaUgandensis.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_15.className = 'buttonsSapelli'
 iconMARA_15.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osokonoi ▪️ Waburgia Ugandensis'

  }
 iconMARA_38 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_38);
 iconMARA_38.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Ositeti_FalseBrandyBush.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_38.className = 'buttonsSapelli'
 iconMARA_38.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Ositeti ▪️ False Brandy Bush'

  }
 iconMARA_16 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_16);
 iconMARA_16.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Osilalei_Camiphora.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_16.className = 'buttonsSapelli'
 iconMARA_16.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osilalei ▪️ Camiphora'

  }
 iconMARA_17 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_17);
 iconMARA_17.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Osenetoi_CandleBush.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_17.className = 'buttonsSapelli'
 iconMARA_17.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osenetoi ▪️ Candle Bush'

  }
 iconMARA_18 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_18);
 iconMARA_18.className = 'buttonsSapelli'
 iconMARA_18.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Orupanti.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_18.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Orupanti'

  }
 iconMARA_19 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_19);
 iconMARA_19.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/OrngiroAre.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_19.className = 'buttonsSapelli'
 iconMARA_19.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 OrngiroAre'

  }
 iconMARA_20 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_20);
 iconMARA_20.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Orgilai_TecleaNobilis.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_20.className = 'buttonsSapelli'
 iconMARA_20.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Orgilai ▪️ Teclea Nobilis'

  }

 iconMARA_21 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_21);
 iconMARA_21.className = 'buttonsSapelli'
 iconMARA_21.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oreteti_WildFig.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_21.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oreteti ▪️ Wild Fig'

  }
 iconMARA_22 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_22);
 iconMARA_22.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oltuyiesi_HopBush_DodonaeaViscosa.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_22.className = 'buttonsSapelli'
 iconMARA_22.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltuyiesi ▪️ HopBush Dodonaea Viscosa'

  }

 iconMARA_23 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_23);
 iconMARA_23.className = 'buttonsSapelli'
 iconMARA_23.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oltopisianoi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_23.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltopisianoi'

  }
 iconMARA_24 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_24);
 iconMARA_24.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oltirkish.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_24.className = 'buttonsSapelli'
 iconMARA_24.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltirkish'

  }
 iconMARA_25 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_25);
 iconMARA_25.className = 'buttonsSapelli'
 iconMARA_25.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oltakurkuriet_LargeLeafGardenia.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" />';
 iconMARA_25.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltakurkuriet ▪️ Large Leaf Gardenia'

  }
 iconMARA_26 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_26);
 iconMARA_26.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olchanilekule.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_26.className = 'buttonsSapelli'
 iconMARA_26.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olchanilekule'

  }
 iconMARA_27 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_27);
 iconMARA_27.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olseki_SandpaperCodiar.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_27.className = 'buttonsSapelli'
 iconMARA_27.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olseki ▪️ Sandpaper Codiar'

  }
 iconMARA_28 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_28);
 iconMARA_28.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olpopogi_EuphobiaCandalebra.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_28.className = 'buttonsSapelli'
 iconMARA_28.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olpopogi ▪️ Euphobia Candalebra'

  }
 iconMARA_29 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_29);
 iconMARA_29.className = 'buttonsSapelli'
 iconMARA_29.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/OlperrElongo.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_29.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olperr Elongo'

  }
 iconMARA_30 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_30);
 iconMARA_30.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olosesiai_SandalBush.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_30.className = 'buttonsSapelli'
 iconMARA_30.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olosesiai ▪️ Sandal Bush'

  }
 iconMARA_31 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_31);
 iconMARA_31.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olosholol.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_31.className = 'buttonsSapelli'
 iconMARA_31.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olosholol'

  }
 iconMARA_32 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_32);
 iconMARA_32.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Ololupa_Camiphora.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_32.className = 'buttonsSapelli'
 iconMARA_32.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Ololupa ▪️ Camiphora'

  }

 iconMARA_33 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_33);
 iconMARA_33.className = 'buttonsSapelli'
 iconMARA_33.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oloirien_AfricanWildOlive.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_33.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloirien ▪️ African Wild Olive'

  }
 iconMARA_34 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_34);
 iconMARA_34.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oloireroi_LeopardTree.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_34.className = 'buttonsSapelli'
 iconMARA_34.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloireroi ▪️ Leopard Tree'

  }
 iconMARA_35 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_35);
 iconMARA_35.className = 'buttonsSapelli'
 iconMARA_35.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oloilalei_ZiziphusMucronata_BuffaloThorn.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_35.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloilalei ▪️ Ziziphus Mucronata Buffalo Thorn'

  }
 iconMARA_36 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_36);
 iconMARA_36.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olnyalugai_GrewiaSimilis.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_36.className = 'buttonsSapelli'
 iconMARA_36.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olnyalugai ▪️ Grewia Similis'

  }

 iconMARA_39 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_39);
 iconMARA_39.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olnokoret.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_39.className = 'buttonsSapelli'
 iconMARA_39.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olnokoret'

  }
 iconMARA_40 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_40);
 iconMARA_40.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olgumi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_40.className = 'buttonsSapelli'
 iconMARA_40.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olgumi'

  }
 iconMARA_41 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_41);
 iconMARA_41.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olngongwenyi_BlackBarkedAcacia.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_41.className = 'buttonsSapelli'
 iconMARA_41.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olngongwenyi ▪️ Black Barked Acacia'

  }

 iconMARA_42 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_42);
 iconMARA_42.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olmotoo.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_42.className = 'buttonsSapelli'
 iconMARA_42.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmotoo'

  }
 iconMARA_43 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_43);
 iconMARA_43.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olmorijoi_PoisonArrowTree.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_43.className = 'buttonsSapelli'
 iconMARA_43.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmorijoi ▪️ Poison Arrow Tree'

  }

 iconMARA_44 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_44);
 iconMARA_44.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olmisigiyioi_RhusNatalensis.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_44.className = 'buttonsSapelli'
 iconMARA_44.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmisigiyioi ▪️ RhusNatalensis'

  }
 iconMARA_45 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_45);
 iconMARA_45.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olmingarukeon.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_45.className = 'buttonsSapelli'
 iconMARA_45.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmingarukeon'

  }
 iconMARA_46 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_46);
 iconMARA_46.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olmerumori_SickleBush.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_46.className = 'buttonsSapelli'
 iconMARA_46.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmerumori ▪️ SickleBush'

  }

 iconMARA_48 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_48);
 iconMARA_48.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olmatundai_Cactus.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_48.className = 'buttonsSapelli'
 iconMARA_48.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmatundai ▪️ Cactus'

  }
 iconMARA_49 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_49);
 iconMARA_49.className = 'buttonsSapelli'
 iconMARA_49.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olmaroroi_CopretumMolle.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_49.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmaroroi ▪️ Copretum Molle'

  }
 iconMARA_50 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_50);
 iconMARA_50.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olkonyil.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_50.className = 'buttonsSapelli'
 iconMARA_50.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkonyil'

  }
 iconMARA_51 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_51);
 iconMARA_51.className = 'buttonsSapelli'
 iconMARA_51.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olkombobit_DevilMilkyBush.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_51.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkombobit ▪️ Devil Milky Bush'

  }
 iconMARA_52 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_52);
 iconMARA_52.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olkokola_Ramnustaddo.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_52.className = 'buttonsSapelli'
 iconMARA_52.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkokola ▪️ Ramnustaddo'

  }

 iconMARA_53 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_53);
 iconMARA_53.className = 'buttonsSapelli'
 iconMARA_53.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olkisikongu_PappeaCapensis.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_53.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkisikongu ▪️ Pappea Capensis'
  }
 iconMARA_54 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_54);
 iconMARA_54.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olkinyei_UclearDovinrum.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_54.className = 'buttonsSapelli'
 iconMARA_54.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkinyei ▪️ Uclear Dovinrum'
  }

 iconMARA_55 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_55);
 iconMARA_55.className = 'buttonsSapelli'
 iconMARA_55.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olkiloreti_AcaciaNilotica.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_55.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkiloreti ▪️ Acacia Nilotica'
  }
 iconMARA_47 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_47);
 iconMARA_47.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olkakawa.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_47.className = 'buttonsSapelli'
 iconMARA_47.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkakawa'
  }
 iconMARA_56 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_56);
 iconMARA_56.className = 'buttonsSapelli'
 iconMARA_56.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olesupeni.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_56.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olesupeni'
  }
 iconMARA_57 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_57);
 iconMARA_57.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oleparmunyo_ToddaliaAsiatica.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_57.className = 'buttonsSapelli'
 iconMARA_57.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oleparmunyo ▪️ Toddalia Asiatica'

  }
 iconMARA_58 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_58);
 iconMARA_58.className = 'buttonsSapelli'
 iconMARA_58.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oleleshwa_CamphorBush_TarchonanthusCamphoratus.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_58.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oleleshwa ▪️ CamphorBush Tarchonanthus Camphoratus'

  }
 iconMARA_59 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_59);
 iconMARA_59.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oldarpoi_KigeliaAfricana-Sausage.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_59.className = 'buttonsSapelli'
 iconMARA_59.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oldarpoi ▪️  Kigelia Africana Sausage'

  }
 iconMARA_60 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_60);
 iconMARA_60.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olaturdei_CaperCaparis.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_60.className = 'buttonsSapelli'
 iconMARA_60.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olaturdei ▪️ Caper Caparis'

  }
 iconMARA_61 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_61);
 iconMARA_61.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olamuriaki_CarissaEdulis.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_61.className = 'buttonsSapelli'
 iconMARA_61.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olamuriaki ▪️ Carissa Edulis'

  }
 iconMARA_62 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_62);
 iconMARA_62.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olairagai.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_62.className = 'buttonsSapelli'
 iconMARA_62.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olairagai'

  }
 iconMARA_63 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_63);
 iconMARA_63.className = 'buttonsSapelli'
 iconMARA_63.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/OitiOibor_SenegalSenegalsis.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_63.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 OitiOibor ▪️ Senegal Senegalsis'

  }
 iconMARA_64 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_64);
 iconMARA_64.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Enkorukoti.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_64.className = 'buttonsSapelli'
 iconMARA_64.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkorukoti'

  }
 iconMARA_65 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_65);
 iconMARA_65.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Enkamai_SourPlum-FalseSandalwood.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_65.className = 'buttonsSapelli'
 iconMARA_65.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkamai ▪️ Sour Plum ▪️ False Sandalwood'

  }

 iconMARA_66 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_66);
 iconMARA_66.className = 'buttonsSapelli'
 iconMARA_66.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/EnchaniEnkashe.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_66.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enchani Enkashe'

  }
 iconMARA_67 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_67);
 iconMARA_67.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Emorogi_KayaApples.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_67.className = 'buttonsSapelli'
 iconMARA_67.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Emorogi ▪️ Kaya Apples'

  }

 iconMARA_68 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_68);
 iconMARA_68.className = 'buttonsSapelli'
 iconMARA_68.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Ekogoltim.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_68.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Ekogoltim'

  }
 iconMARA_69 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_69);
 iconMARA_69.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/ViynaMembranacea.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_69.className = 'buttonsSapelli'
 iconMARA_69.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Viyna Membranacea'

  }
 iconMARA_70 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_70);
 iconMARA_70.className = 'buttonsSapelli'
 iconMARA_70.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Suguroi_AloeVera.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_70.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Suguroi ▪️ AloeVera'

  }
 iconMARA_71 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_71);
 iconMARA_71.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Sakutae_FlameLily.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_71.className = 'buttonsSapelli'
 iconMARA_71.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Sakutae ▪️ FlameLily'

  }
 iconMARA_72 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_72);
 iconMARA_72.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Osuyai.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_72.className = 'buttonsSapelli'
 iconMARA_72.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osuyai'

  }
 iconMARA_73 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_73);
 iconMARA_73.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Osupukiai_Dombeya.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_73.className = 'buttonsSapelli'
 iconMARA_73.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osupukiai ▪️ Dombeya'

  }
 iconMARA_74 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_74);
 iconMARA_74.className = 'buttonsSapelli'
 iconMARA_74.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Osuguroi_AloeKillifiensis.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_74.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osuguroi ▪️ AloeKillifiensis'

  }
 iconMARA_75 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_75);
 iconMARA_75.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Osikawai_SolanumAculeastrum_BitterApple.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_75.className = 'buttonsSapelli'
 iconMARA_75.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osikawai ▪️ Solanum Aculeastrum ▪️ BitterApple'

  }
 iconMARA_76 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_76);
 iconMARA_76.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Orngerioi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_76.className = 'buttonsSapelli'
 iconMARA_76.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Orngerioi'

  }
 iconMARA_77 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_77);
 iconMARA_77.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Orbibi_Sunbird.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_77.className = 'buttonsSapelli'
 iconMARA_77.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Orbibi ▪️ Sunbird'

  }

 iconMARA_78 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_78);
 iconMARA_78.className = 'buttonsSapelli'
 iconMARA_78.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oltutu.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_78.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltutu'

  }
 iconMARA_79 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_79);
 iconMARA_79.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oltulelei_SodomApple.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_79.className = 'buttonsSapelli'
 iconMARA_79.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltulelei ▪️ Sodom Apple'

  }
 iconMARA_80 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_80);
 iconMARA_80.className = 'buttonsSapelli'
 iconMARA_80.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oltiamiletei_MorningGlory.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_80.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltiamiletei ▪️ MorningGlory'

  }
 iconMARA_81 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_81);
 iconMARA_81.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olsukurtutui_Cactusvine.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_81.className = 'buttonsSapelli'
 iconMARA_81.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olsukurtutui ▪️ Cactusvine'

  }

 iconMARA_82 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_82);
 iconMARA_82.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olchhartuyian_GallinieraSaxiFraga.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_82.className = 'buttonsSapelli'
 iconMARA_82.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olchhartuyian ▪️ Galliniera Saxi Fraga'

  }
 iconMARA_83 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_83);
 iconMARA_83.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olseyiai_Cypreus.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_83.className = 'buttonsSapelli'
 iconMARA_83.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olseyiai ▪️ Cypreus'

  }
 iconMARA_84 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_84);
 iconMARA_84.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olriroi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_84.className = 'buttonsSapelli'
 iconMARA_84.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olriroi'

  }

 iconMARA_85 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_85);
 iconMARA_85.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olpisialokonoi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_85.className = 'buttonsSapelli'
 iconMARA_85.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olpisialokonoi'

  }
 iconMARA_86 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_86);
 iconMARA_86.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olperesiorasha.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_86.className = 'buttonsSapelli'
 iconMARA_86.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olperesiorasha'

  }

 iconMARA_87 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_87);
 iconMARA_87.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olpaleki_AaturaStramonium.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_87.className = 'buttonsSapelli'
 iconMARA_87.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olpaleki ▪️ Aatura Stramonium'

  }
 iconMARA_88 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_88);
 iconMARA_88.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olpalakai.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_88.className = 'buttonsSapelli'
 iconMARA_88.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olpalakai'

  }
 iconMARA_89 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_89);
 iconMARA_89.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oliouruur_CabaggeTree.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_89.className = 'buttonsSapelli'
 iconMARA_89.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oliouruur ▪️ Cabagge Tree'

  }

 iconMARA_90 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_90);
 iconMARA_90.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oloitodoraek.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_90.className = 'buttonsSapelli'
 iconMARA_90.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloitodoraek'

  }
 iconMARA_91 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_91);
 iconMARA_91.className = 'buttonsSapelli'
 iconMARA_91.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olosida_HypoestesForskahlii.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_91.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olosida ▪️ Hypoestes Forskahlii'

  }
 iconMARA_92 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_92);
 iconMARA_92.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oloroukileleng.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_92.className = 'buttonsSapelli'
 iconMARA_92.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloroukileleng'

  }
 iconMARA_93 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_93);
 iconMARA_93.className = 'buttonsSapelli'
 iconMARA_93.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olopito.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_93.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olopito'

  }

 iconMARA_94 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_94);
 iconMARA_94.className = 'buttonsSapelli'
 iconMARA_94.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oloorodo_CyphostemmaSerpens.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_94.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloorodo ▪️ Cyphostemma Serpens'
  }
 iconMARA_95 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_95);
 iconMARA_95.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Ologumati.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_95.className = 'buttonsSapelli'
 iconMARA_95.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Ologumati'
  }

 iconMARA_96 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_96);
 iconMARA_96.className = 'buttonsSapelli'
 iconMARA_96.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olobai_PsiadiaPanctulata.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_96.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olobai ▪️ Psiadia Panctulata'
  }
 iconMARA_97 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_97);
 iconMARA_97.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olokunonoi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_97.className = 'buttonsSapelli'
 iconMARA_97.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olokunonoi'
  }
 iconMARA_98 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_98);
 iconMARA_98.className = 'buttonsSapelli'
 iconMARA_98.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oloiropijiloosiikon.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_98.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloiropijiloosiikon'
  }
 iconMARA_99 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_99);
 iconMARA_99.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olmalilio.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_99.className = 'buttonsSapelli'
 iconMARA_99.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmalilio'

  }
 iconMARA_100 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_100);
 iconMARA_100.className = 'buttonsSapelli'
 iconMARA_100.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olkunetia.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_100.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkunetia'

  }
 iconMARA_101 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_101);
 iconMARA_101.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olkimitare.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_101.className = 'buttonsSapelli'
 iconMARA_101.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkimitare'

  }
 iconMARA_102 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_102);
 iconMARA_102.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olkierenkure.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_102.className = 'buttonsSapelli'
 iconMARA_102.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkierenkure'

  }
 iconMARA_103 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_103);
 iconMARA_103.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oloyiapasei_AspiliaPluriseta.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_103.className = 'buttonsSapelli'
 iconMARA_103.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloyiapasei ▪️ Aspilia Pluriseta'

  }
 iconMARA_104 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_104);
 iconMARA_104.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olgigiri_WaitAbit.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_104.className = 'buttonsSapelli'
 iconMARA_104.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olgigiri ▪️ WaitAbit'

  }
 iconMARA_105 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_18);
 iconMARA_105.className = 'buttonsSapelli'
 iconMARA_105.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/OlgalayioiLoosirkon.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_105.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olgalayioi Loosirkon'

  }
 iconMARA_106 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_106);
 iconMARA_106.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oleturot.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_106.className = 'buttonsSapelli'
 iconMARA_106.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oleturot'

  }
 iconMARA_107 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_107);
 iconMARA_107.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olesayiet_RedCherry.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_107.className = 'buttonsSapelli'
 iconMARA_107.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olesayiet ▪️ RedCherry'

  }

 iconMARA_108 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_108);
 iconMARA_108.className = 'buttonsSapelli'
 iconMARA_108.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olemuran_OcimumBasllicum.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_108.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olemuran ▪️ Ocimum Basllicum'

  }
 iconMARA_109 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_109);
 iconMARA_109.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olemenega.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_109.className = 'buttonsSapelli'
 iconMARA_109.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olemenega'

  }

 iconMARA_110 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_110);
 iconMARA_110.className = 'buttonsSapelli'
 iconMARA_110.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olekidongo_Actyphafruticosa.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_110.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olekidongo ▪️ Actypha fruticosa'

  }
 iconMARA_111 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_111);
 iconMARA_111.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oldupai.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_111.className = 'buttonsSapelli'
 iconMARA_111.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oldupai'

  }
 iconMARA_112 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_112);
 iconMARA_112.className = 'buttonsSapelli'
 iconMARA_112.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oldule_CastorOilPlant.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_112.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oldule ▪️ Castor Oil Plant'

  }
 iconMARA_113 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_113);
 iconMARA_113.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olbibi_OrangeLeonotisMollisima.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_113.className = 'buttonsSapelli'
 iconMARA_113.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olbibi ▪️ Orange Leonotis Mollisima'

  }
 iconMARA_114 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_114);
 iconMARA_114.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olbangi_TagetesMinuta.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_114.className = 'buttonsSapelli'
 iconMARA_114.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olbangi ▪️ Tagetes Minuta'

  }
 iconMARA_115 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_115);
 iconMARA_115.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olauraki.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_115.className = 'buttonsSapelli'
 iconMARA_115.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olauraki'

  }
 iconMARA_116 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_116);
 iconMARA_116.className = 'buttonsSapelli'
 iconMARA_116.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olarae.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_116.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olarae'

  }
 iconMARA_117 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_117);
 iconMARA_117.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olangungue.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_117.className = 'buttonsSapelli'
 iconMARA_117.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olangungue'

  }
 iconMARA_118 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_118);
 iconMARA_118.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olamererua.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_118.className = 'buttonsSapelli'
 iconMARA_118.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olamererua'

  }
 iconMARA_119 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_119);
 iconMARA_119.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Okilenyai.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_119.className = 'buttonsSapelli'
 iconMARA_119.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Okilenyai'

  }

 iconMARA_120 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_120);
 iconMARA_120.className = 'buttonsSapelli'
 iconMARA_120.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Oiiri.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_120.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oiiri'

  }
 iconMARA_121 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_121);
 iconMARA_121.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Naingongundeyo.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_121.className = 'buttonsSapelli'
 iconMARA_121.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Naingongundeyo'

  }
 iconMARA_122 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_122);
 iconMARA_122.className = 'buttonsSapelli'
 iconMARA_122.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Intualan_LionsClan.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_122.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Intualan ▪️ Lions Clan'

  }
 iconMARA_123 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_123);
 iconMARA_123.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Imasilig.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_123.className = 'buttonsSapelli'
 iconMARA_123.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Imasilig'

  }

 iconMARA_124 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_124);
 iconMARA_124.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Esiaiti.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_124.className = 'buttonsSapelli'
 iconMARA_124.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Esiaiti'

  }
 iconMARA_125 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_125);
 iconMARA_125.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Esambukike.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_125.className = 'buttonsSapelli'
 iconMARA_125.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Esambukike'

  }
 iconMARA_126 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_126);
 iconMARA_126.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Enyieman.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_126.className = 'buttonsSapelli'
 iconMARA_126.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enyieman'

  }

 iconMARA_127 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_127);
 iconMARA_127.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Entasim.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_127.className = 'buttonsSapelli'
 iconMARA_127.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Entasim'

  }
 iconMARA_128 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_128);
 iconMARA_128.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Enkarani.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_128.className = 'buttonsSapelli'
 iconMARA_128.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkarani'

  }

 iconMARA_129 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_129);
 iconMARA_129.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Enkameloki_Maerua_LongBeadBean.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_129.className = 'buttonsSapelli'
 iconMARA_129.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkameloki ▪️ Maerua Long BeadBean'

  }
 iconMARA_130 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_130);
 iconMARA_130.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Enkaiteteyiai_CyanotisArachoidea.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_130.className = 'buttonsSapelli'
 iconMARA_130.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkaiteteyiai ▪️ Cyanotis Arachoidea'

  }
 iconMARA_131 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_131);
 iconMARA_131.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Engosikireisie.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_131.className = 'buttonsSapelli'
 iconMARA_131.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Engosikireisie'

  }

 iconMARA_132 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_132);
 iconMARA_132.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Engeriadus.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_132.className = 'buttonsSapelli'
 iconMARA_132.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Engeriadus'

  }
 iconMARA_133 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_133);
 iconMARA_133.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/EnchaniOsirkon_CandamaForinosa.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_133.className = 'buttonsSapelli'
 iconMARA_133.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 EnchaniOsirkon ▪️ Candama Forinosa'

  }
 iconMARA_134 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_134);
 iconMARA_134.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Enaimuruai_CoutchGrass.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_134.className = 'buttonsSapelli'
 iconMARA_134.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enaimuruai ▪️ CoutchGrass'

  }

 iconMARA_135 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_135);
 iconMARA_135.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Emankulai_GrewiaVillosa.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_135.className = 'buttonsSapelli'
 iconMARA_135.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Emankulai ▪️ Grewia Villosa'

  }
 iconMARA_136 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_136);
 iconMARA_136.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/AgungaRemota.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_136.className = 'buttonsSapelli'
 iconMARA_136.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 AgungaRemota'

  }

 iconMARA_137 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_137);
 iconMARA_137.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Eleleshwaekop.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_137.className = 'buttonsSapelli'
 iconMARA_137.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Eleleshwaekop'

  }
 iconMARA_138 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_138);
 iconMARA_138.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Ekirenyi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_138.className = 'buttonsSapelli'
 iconMARA_138.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Ekirenyi'

  }
 iconMARA_139 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_139);
 iconMARA_139.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/ConvolvulusSagittatus.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_139.className = 'buttonsSapelli'
 iconMARA_139.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Convolvulus Sagittatus'

  }
 iconMARA_140 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_140);
 iconMARA_140.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/White_Thorn_Acacia.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_140.className = 'buttonsSapelli'
 iconMARA_140.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 White Thorn Acacia'

  }
 iconMARA_141 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_141);
 iconMARA_141.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Whistling_Thorn_Acacia.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_141.className = 'buttonsSapelli'
 iconMARA_141.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Whistling Thorn Acacia'

  }
 iconMARA_142 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_142);
 iconMARA_142.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Olodoganayioi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_142.className = 'buttonsSapelli'
 iconMARA_142.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olodoganayioi'

  }
 iconMARA_143 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_143);
 iconMARA_143.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Madagascar_Periwinkle.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_143.className = 'buttonsSapelli'
 iconMARA_143.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Madagascar Periwinkle'

  }
 iconMARA_144 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_144);
 iconMARA_144.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Imukutio.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_144.className = 'buttonsSapelli'
 iconMARA_144.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Imukutio'

  }
 iconMARA_145 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_145);
 iconMARA_145.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Esampukike_Ormocarpum_Kirkii.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_145.className = 'buttonsSapelli'
 iconMARA_145.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Esampukike Ormocarpum Kirkii'

  }
 iconMARA_146 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_146);
 iconMARA_146.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Esampukike_Ormocarpum_Kirkii.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_146.className = 'buttonsSapelli'
 iconMARA_146.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Esampukike Ormocarpum Kirkii'

  }
 iconMARA_147 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_147);
 iconMARA_147.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Enkasuishoi_Pavonia_Urens.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_147.className = 'buttonsSapelli'
 iconMARA_147.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkasuishoi Pavonia Urens'

  }
 iconMARA_148 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_148);
 iconMARA_148.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Enkameloki.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_148.className = 'buttonsSapelli'
 iconMARA_148.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkameloki'

  }
 iconMARA_149 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_149);
 iconMARA_149.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Cat_Thorn_Osanangururi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_149.className = 'buttonsSapelli'
 iconMARA_149.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Cat Thorn Osanangururi'

  }
 iconMARA_150 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_150);
 iconMARA_150.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Cacia_Ocadantalis.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_150.className = 'buttonsSapelli'
 iconMARA_150.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Cacia Ocadantalis'

  }



 iconMARA_200 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_200);
 iconMARA_200.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/NewPlant.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_200.className = 'buttonsSapelli'
 iconMARA_200.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '➕ New Plant'

  }

  return screenChoice && plant
}


////////////////////////////////////////             PLANTS MAU        ///////////////////////////////

var generateButtonsPlantsMAU = function(){

  screenChoice = 'plants'

 iconMAU_8 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_8);
 iconMAU_8.className = 'buttonsSapelli'
 iconMAU_8.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Osupukiai orok.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>';
 iconMAU_8.onclick = function(){
    hideAll()
    generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osupukiai orok'
  }
 iconMAU_9 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_9);
 iconMAU_9.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Osasimawani.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> </br>';
 iconMAU_9.className = 'buttonsSapelli'
 iconMAU_9.onclick = function(){
    hideAll()
  generateButtonsIssues()
  document.getElementById('customIconsGoBack').style.display = 'initial';
  document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osasimawani'
  }

 iconMAU_10 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_10);
 iconMAU_10.className = 'buttonsSapelli'
 iconMAU_10.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olturuj.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_10.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olturuj'
  }
 iconMAU_11 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_11);
 iconMAU_11.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Oltirkoyian.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_11.className = 'buttonsSapelli'
 iconMAU_11.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltirkoyian'
  }
 iconMAU_12 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_12);
 iconMAU_12.className = 'buttonsSapelli'
 iconMAU_12.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Oltiini.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_12.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltiini'
  }
 iconMAU_13 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_13);
 iconMAU_13.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olpolto.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_13.className = 'buttonsSapelli'
 iconMAU_13.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olpolto'

  }
 iconMAU_14 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_14);
 iconMAU_14.className = 'buttonsSapelli'
 iconMAU_14.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olomei.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_14.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olomei'

  }
 iconMAU_15 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_15);
 iconMAU_15.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olkipejus.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_15.className = 'buttonsSapelli'
 iconMAU_15.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkipejus'

  }
 iconMAU_38 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_38);
 iconMAU_38.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olkilelit_olchani.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_38.className = 'buttonsSapelli'
 iconMAU_38.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkilelit olchani'

  }
 iconMAU_16 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_16);
 iconMAU_16.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olkikuei loosirkon.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_16.className = 'buttonsSapelli'
 iconMAU_16.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkikuei loosirkon'

  }
 iconMAU_17 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_17);
 iconMAU_17.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Oleturot.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_17.className = 'buttonsSapelli'
 iconMAU_17.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oleturot'

  }
 iconMAU_18 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_18);
 iconMAU_18.className = 'buttonsSapelli'
 iconMAU_18.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olalaa.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_18.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olalaa'

  }
 iconMAU_19 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_19);
 iconMAU_19.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Nareruk.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_19.className = 'buttonsSapelli'
 iconMAU_19.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Nareruk'

  }
 iconMAU_20 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_20);
 iconMAU_20.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Naman keon.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_20.className = 'buttonsSapelli'
 iconMAU_20.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Naman keon'

  }

 iconMAU_21 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_21);
 iconMAU_21.className = 'buttonsSapelli'
 iconMAU_21.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Lekikuuni.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_21.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Lekikuuni'

  }
 iconMAU_22 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_22);
 iconMAU_22.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Esumeita.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_22.className = 'buttonsSapelli'
 iconMAU_22.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Esumeita'

  }

 iconMAU_23 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_23);
 iconMAU_23.className = 'buttonsSapelli'
 iconMAU_23.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Esere.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_23.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Esere'

  }
 iconMAU_24 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_24);
 iconMAU_24.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Entiapapaa.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_24.className = 'buttonsSapelli'
 iconMAU_24.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Entiapapaa'

  }
 iconMAU_25 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_25);
 iconMAU_25.className = 'buttonsSapelli'
 iconMAU_25.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Entapipi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" />';
 iconMAU_25.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Entapipi'

  }
 iconMAU_26 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_26);
 iconMAU_26.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Entamejoi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_26.className = 'buttonsSapelli'
 iconMAU_26.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Entamejoi'

  }
 iconMAU_27 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_27);
 iconMAU_27.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Entamejoi oolosowuani.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_27.className = 'buttonsSapelli'
 iconMAU_27.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Entamejoi oolosowuani'

  }
 iconMAU_28 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_28);
 iconMAU_28.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Enkopito_enkopito ooltorrobo.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_28.className = 'buttonsSapelli'
 iconMAU_28.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkopito enkopito ooltorrobo'

  }
 iconMAU_29 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_29);
 iconMAU_29.className = 'buttonsSapelli'
 iconMAU_29.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Enkoloshoo.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_29.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkoloshoo'

  }
 iconMAU_30 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_30);
 iconMAU_30.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Enkisiau.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_30.className = 'buttonsSapelli'
 iconMAU_30.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkisiau'

  }
 iconMAU_31 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_31);
 iconMAU_31.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Enkaisuishoi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_31.className = 'buttonsSapelli'
 iconMAU_31.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkaisuishoi'

  }
 iconMAU_32 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_32);
 iconMAU_32.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Tokweyot.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_32.className = 'buttonsSapelli'
 iconMAU_32.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Tokweyot'

  }

 iconMAU_33 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_33);
 iconMAU_33.className = 'buttonsSapelli'
 iconMAU_33.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Tekiat_oltiyani.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_33.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Tekiat oltiyani'

  }
 iconMAU_34 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_34);
 iconMAU_34.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Tebararietab teta.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_34.className = 'buttonsSapelli'
 iconMAU_34.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Tebararietab teta'

  }
 iconMAU_35 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_35);
 iconMAU_35.className = 'buttonsSapelli'
 iconMAU_35.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Takamamiet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_35.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Takamamiet'

  }
 iconMAU_36 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_36);
 iconMAU_36.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Sergutiet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_36.className = 'buttonsSapelli'
 iconMAU_36.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Sergutiet'

  }

 iconMAU_39 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_39);
 iconMAU_39.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Sangainet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_39.className = 'buttonsSapelli'
 iconMAU_39.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Sangainet'

  }
 iconMAU_40 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_40);
 iconMAU_40.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Mwabiyet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_40.className = 'buttonsSapelli'
 iconMAU_40.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Mwabiyet'

  }
 iconMAU_41 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_41);
 iconMAU_41.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Mosipchot.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_41.className = 'buttonsSapelli'
 iconMAU_41.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Mosipchot'

  }

 iconMAU_42 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_42);
 iconMAU_42.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Kuresiet_olkushurui.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_42.className = 'buttonsSapelli'
 iconMAU_42.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Kuresiet olkushurui'

  }
 iconMAU_43 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_43);
 iconMAU_43.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Korosiot.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_43.className = 'buttonsSapelli'
 iconMAU_43.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Korosiot'

  }

 iconMAU_44 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_44);
 iconMAU_44.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Kibirirgorok.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_44.className = 'buttonsSapelli'
 iconMAU_44.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Kibirirgorok'

  }
 iconMAU_45 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_45);
 iconMAU_45.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Kebukeyet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_45.className = 'buttonsSapelli'
 iconMAU_45.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Kebukeyet'

  }
 iconMAU_46 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_46);
 iconMAU_46.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Eburwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_46.className = 'buttonsSapelli'
 iconMAU_46.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Eburwet'

  }

 iconMAU_48 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_48);
 iconMAU_48.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Chepsakitiet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_48.className = 'buttonsSapelli'
 iconMAU_48.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Chepsakitiet'

  }
 iconMAU_49 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_49);
 iconMAU_49.className = 'buttonsSapelli'
 iconMAU_49.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Chepkowet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_49.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Chepkowet'

  }
 iconMAU_50 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_50);
 iconMAU_50.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Chepgetuiyet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_50.className = 'buttonsSapelli'
 iconMAU_50.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Chepgetuiyet'

  }
 iconMAU_51 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_51);
 iconMAU_51.className = 'buttonsSapelli'
 iconMAU_51.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Osonkorori.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_51.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osonkorori'

  }
 iconMAU_52 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_52);
 iconMAU_52.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Osinantei.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_52.className = 'buttonsSapelli'
 iconMAU_52.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Osinantei'

  }

 iconMAU_53 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_53);
 iconMAU_53.className = 'buttonsSapelli'
 iconMAU_53.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Ormarrar.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_53.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Ormarrar'
  }
 iconMAU_54 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_54);
 iconMAU_54.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Oltikampu.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_54.className = 'buttonsSapelli'
 iconMAU_54.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltikampu'
  }

 iconMAU_55 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_55);
 iconMAU_55.className = 'buttonsSapelli'
 iconMAU_55.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Oltarakuai.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_55.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oltarakuai'
  }
 iconMAU_47 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_47);
 iconMAU_47.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olpiron.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_47.className = 'buttonsSapelli'
 iconMAU_47.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olpiron'
  }
 iconMAU_56 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_56);
 iconMAU_56.className = 'buttonsSapelli'
 iconMAU_56.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olpalagilagi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_56.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olpalagilagi'
  }
 iconMAU_57 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_57);
 iconMAU_57.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olosiro.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_57.className = 'buttonsSapelli'
 iconMAU_57.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olosiro'

  }
 iconMAU_58 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_58);
 iconMAU_58.className = 'buttonsSapelli'
 iconMAU_58.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olorrondo.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_58.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olorrondo'

  }
 iconMAU_59 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_59);
 iconMAU_59.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Oloniyai.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_59.className = 'buttonsSapelli'
 iconMAU_59.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloniyai'

  }
 iconMAU_60 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_60);
 iconMAU_60.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Ololiontoi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_60.className = 'buttonsSapelli'
 iconMAU_60.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Ololiontoi'

  }
 iconMAU_61 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_61);
 iconMAU_61.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Oloiururr.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_61.className = 'buttonsSapelli'
 iconMAU_61.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloiururr'

  }
 iconMAU_62 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_62);
 iconMAU_62.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Oloisuti.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_62.className = 'buttonsSapelli'
 iconMAU_62.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloisuti'

  }
 iconMAU_63 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_63);
 iconMAU_63.className = 'buttonsSapelli'
 iconMAU_63.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Oloiborr benek.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_63.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oloiborr benek'

  }
 iconMAU_64 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_64);
 iconMAU_64.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Ologumati.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_64.className = 'buttonsSapelli'
 iconMAU_64.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Ologumati'

  }
 iconMAU_65 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_65);
 iconMAU_65.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Ologolbenek.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_65.className = 'buttonsSapelli'
 iconMAU_65.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Ologolbenek'

  }

 iconMAU_66 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_66);
 iconMAU_66.className = 'buttonsSapelli'
 iconMAU_66.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olmusaakwa.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_66.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmusaakwa'

  }
 iconMAU_67 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_67);
 iconMAU_67.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olmasiligi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_67.className = 'buttonsSapelli'
 iconMAU_67.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmasiligi'

  }

 iconMAU_68 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_68);
 iconMAU_68.className = 'buttonsSapelli'
 iconMAU_68.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olkujuk.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_68.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkujuk'

  }
 iconMAU_69 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_69);
 iconMAU_69.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olkisushet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_69.className = 'buttonsSapelli'
 iconMAU_69.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkisushet'

  }
 iconMAU_70 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_70);
 iconMAU_70.className = 'buttonsSapelli'
 iconMAU_70.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olkirenyi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_70.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkirenyi'

  }
 iconMAU_71 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_71);
 iconMAU_71.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olkekeyiet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_71.className = 'buttonsSapelli'
 iconMAU_71.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkekeyiet'

  }
 iconMAU_72 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_72);
 iconMAU_72.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Oledat.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_72.className = 'buttonsSapelli'
 iconMAU_72.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Oledat'

  }
 iconMAU_73 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_73);
 iconMAU_73.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olchartuyian.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_73.className = 'buttonsSapelli'
 iconMAU_73.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olchartuyian'

  }
 iconMAU_74 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_74);
 iconMAU_74.className = 'buttonsSapelli'
 iconMAU_74.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olchani.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_74.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olchani'

  }
 iconMAU_75 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_75);
 iconMAU_75.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olayakuji.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_75.className = 'buttonsSapelli'
 iconMAU_75.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olayakuji'

  }
 iconMAU_76 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_76);
 iconMAU_76.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olaimurunyai.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_76.className = 'buttonsSapelli'
 iconMAU_76.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olaimurunyai'

  }
 iconMAU_77 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_77);
 iconMAU_77.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Logg plant.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_77.className = 'buttonsSapelli'
 iconMAU_77.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Logg plant'

  }

 iconMAU_78 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_78);
 iconMAU_78.className = 'buttonsSapelli'
 iconMAU_78.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Rope plant.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_78.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Rope plant'

  }
 iconMAU_79 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_79);
 iconMAU_79.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Entiangaras.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_79.className = 'buttonsSapelli'
 iconMAU_79.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Entiangaras'

  }
 iconMAU_80 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_80);
 iconMAU_80.className = 'buttonsSapelli'
 iconMAU_80.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Entemelua.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_80.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Entemelua'

  }
 iconMAU_81 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_81);
 iconMAU_81.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Entakuleti.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_81.className = 'buttonsSapelli'
 iconMAU_81.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Entakuleti'

  }

 iconMAU_82 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_82);
 iconMAU_82.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Enkopito ooltorrobo.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_82.className = 'buttonsSapelli'
 iconMAU_82.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkopito ooltorrobo'

  }
 iconMAU_83 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_83);
 iconMAU_83.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Enkopisiadi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_83.className = 'buttonsSapelli'
 iconMAU_83.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enkopisiadi'

  }
 iconMAU_84 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_84);
 iconMAU_84.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Endalati ekutuk.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_84.className = 'buttonsSapelli'
 iconMAU_84.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Endalati ekutuk'

  }

 iconMAU_85 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_85);
 iconMAU_85.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Tiniet_scheflera rolkensil.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_85.className = 'buttonsSapelli'
 iconMAU_85.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Tiniet scheflera rolkensil'

  }
 iconMAU_86 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_86);
 iconMAU_86.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Tekelteet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_86.className = 'buttonsSapelli'
 iconMAU_86.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Tekelteet'

  }

 iconMAU_87 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_87);
 iconMAU_87.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Taparariet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_87.className = 'buttonsSapelli'
 iconMAU_87.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Taparariet'

  }
 iconMAU_88 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_88);
 iconMAU_88.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Suseita.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_88.className = 'buttonsSapelli'
 iconMAU_88.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Suseita'

  }
 iconMAU_89 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_89);
 iconMAU_89.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Sitotwet_oseketeki.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_89.className = 'buttonsSapelli'
 iconMAU_89.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Sitotwet oseketeki'

  }

 iconMAU_90 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_90);
 iconMAU_90.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Sirimpiet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_90.className = 'buttonsSapelli'
 iconMAU_90.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Sirimpiet'

  }
 iconMAU_91 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_91);
 iconMAU_91.className = 'buttonsSapelli'
 iconMAU_91.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Sinkorwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_91.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Sinkorwet'

  }
 iconMAU_92 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_92);
 iconMAU_92.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Setiot.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_92.className = 'buttonsSapelli'
 iconMAU_92.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Setiot'

  }
 iconMAU_93 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_93);
 iconMAU_93.className = 'buttonsSapelli'
 iconMAU_93.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Serkutwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_93.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Serkutwet'

  }

 iconMAU_94 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_94);
 iconMAU_94.className = 'buttonsSapelli'
 iconMAU_94.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Seet_alipizias.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_94.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Seet alipizias'
  }
 iconMAU_95 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_95);
 iconMAU_95.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Sebeberiet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_95.className = 'buttonsSapelli'
 iconMAU_95.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Sebeberiet'
  }

 iconMAU_96 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_96);
 iconMAU_96.className = 'buttonsSapelli'
 iconMAU_96.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Sabetet_nabutoria.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_96.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Sabetet nabutoria'
  }
 iconMAU_97 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_97);
 iconMAU_97.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Rokoret_drinking straw.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_97.className = 'buttonsSapelli'
 iconMAU_97.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Rokoret drinking straw'
  }
 iconMAU_98 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_98);
 iconMAU_98.className = 'buttonsSapelli'
 iconMAU_98.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Rerendet_rauvolfia.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_98.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Rerendet rauvolfia'
  }
 iconMAU_99 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_99);
 iconMAU_99.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olmomoi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_99.className = 'buttonsSapelli'
 iconMAU_99.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olmomoi'

  }
 iconMAU_100 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_100);
 iconMAU_100.className = 'buttonsSapelli'
 iconMAU_100.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Olkiparnyany_kuparnyaat.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_100.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Olkiparnyany kuparnyaat'

  }
 iconMAU_101 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_101);
 iconMAU_101.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Nyelwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_101.className = 'buttonsSapelli'
 iconMAU_101.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Nyelwet'

  }
 iconMAU_102 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_102);
 iconMAU_102.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Nukiat_nime.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_102.className = 'buttonsSapelli'
 iconMAU_102.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Nukiat nime'

  }
 iconMAU_103 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_103);
 iconMAU_103.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Meswot_bees.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_103.className = 'buttonsSapelli'
 iconMAU_103.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Meswot bees'

  }
 iconMAU_104 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_104);
 iconMAU_104.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Matirtirwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_104.className = 'buttonsSapelli'
 iconMAU_104.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Matirtirwet'

  }
 iconMAU_105 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_18);
 iconMAU_105.className = 'buttonsSapelli'
 iconMAU_105.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Marongeet_olmeikuaya.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_105.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Marongeet olmeikuaya'

  }
 iconMAU_106 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_106);
 iconMAU_106.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Mangoita.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_106.className = 'buttonsSapelli'
 iconMAU_106.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Mangoita'

  }
 iconMAU_107 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_107);
 iconMAU_107.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Logomaita_macaranga kilimanscharia.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_107.className = 'buttonsSapelli'
 iconMAU_107.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Logomaita macaranga kilimanscharia'

  }

 iconMAU_108 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_108);
 iconMAU_108.className = 'buttonsSapelli'
 iconMAU_108.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Lebekwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_108.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Lebekwet'

  }
 iconMAU_109 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_109);
 iconMAU_109.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Lapotiet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_109.className = 'buttonsSapelli'
 iconMAU_109.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Lapotiet'

  }

 iconMAU_110 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_110);
 iconMAU_110.className = 'buttonsSapelli'
 iconMAU_110.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Kosisietet_Rhannus prinoides.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_110.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Kosisietet Rhannus prinoides'

  }
 iconMAU_111 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_111);
 iconMAU_111.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Kombeito.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_111.className = 'buttonsSapelli'
 iconMAU_111.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Kombeito'

  }
 iconMAU_112 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_112);
 iconMAU_112.className = 'buttonsSapelli'
 iconMAU_112.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Kipkosieriet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_112.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Kipkosieriet'

  }
 iconMAU_113 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_113);
 iconMAU_113.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Kepkoibet_Angerae.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_113.className = 'buttonsSapelli'
 iconMAU_113.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Kepkoibet Angerae'

  }
 iconMAU_114 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_114);
 iconMAU_114.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Enabooi_Chemngesumiet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_114.className = 'buttonsSapelli'
 iconMAU_114.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Enabooi Chemngesumiet'

  }
 iconMAU_115 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_115);
 iconMAU_115.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Chesamisiet_Clerodendrum myricoids.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_115.className = 'buttonsSapelli'
 iconMAU_115.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Chesamisiet Clerodendrum myricoids'

  }
 iconMAU_116 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_116);
 iconMAU_116.className = 'buttonsSapelli'
 iconMAU_116.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Chesamisiet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_116.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Chesamisiet'

  }
 iconMAU_117 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_117);
 iconMAU_117.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Chepchabayiet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_117.className = 'buttonsSapelli'
 iconMAU_117.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Chepchabayiet'

  }
 iconMAU_118 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_118);
 iconMAU_118.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Bontet_Rosewood.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_118.className = 'buttonsSapelli'
 iconMAU_118.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Bontet Rosewood'

  }
 iconMAU_119 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_119);
 iconMAU_119.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Arorwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_119.className = 'buttonsSapelli'
 iconMAU_119.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Arorwet'

  }

 iconMAU_120 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_120);
 iconMAU_120.className = 'buttonsSapelli'
 iconMAU_120.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Aonet_Policius vulva.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_120.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Aonet Policius vulva'

  }
 iconMAU_121 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_121);
 iconMAU_121.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Cherungut.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_121.className = 'buttonsSapelli'
 iconMAU_121.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Cherungut'

  }
 iconMAU_122 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_122);
 iconMAU_122.className = 'buttonsSapelli'
 iconMAU_122.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Chep_tenderet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_122.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Chep tenderet'

  }
 iconMAU_123 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_123);
 iconMAU_123.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Chepongiot.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_123.className = 'buttonsSapelli'
 iconMAU_123.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Chepongiot'

  }

 iconMAU_124 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_124);
 iconMAU_124.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Botkawet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_124.className = 'buttonsSapelli'
 iconMAU_124.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Botkawet'

  }
 iconMAU_125 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_125);
 iconMAU_125.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Chemoset.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_125.className = 'buttonsSapelli'
 iconMAU_125.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Chemoset'

  }
 iconMAU_126 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_126);
 iconMAU_126.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Chepkoibet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_126.className = 'buttonsSapelli'
 iconMAU_126.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Chepkoibet'

  }

 iconMAU_127 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_127);
 iconMAU_127.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Chepkorgoriet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_127.className = 'buttonsSapelli'
 iconMAU_127.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Chepkorgoriet'

  }
 iconMAU_128 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_128);
 iconMAU_128.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Chepkurbet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_128.className = 'buttonsSapelli'
 iconMAU_128.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Chepkurbet'

  }

 iconMAU_129 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_129);
 iconMAU_129.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Cheptiringwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_129.className = 'buttonsSapelli'
 iconMAU_129.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Cheptiringwet'

  }
 iconMAU_130 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_130);
 iconMAU_130.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Chesicheiyet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_130.className = 'buttonsSapelli'
 iconMAU_130.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Chesicheiyet'

  }
 iconMAU_131 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_131);
 iconMAU_131.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Ewat.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_131.className = 'buttonsSapelli'
 iconMAU_131.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Ewat'

  }

 iconMAU_132 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_132);
 iconMAU_132.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Imaniat.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_132.className = 'buttonsSapelli'
 iconMAU_132.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Imaniat'

  }
 iconMAU_133 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_133);
 iconMAU_133.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Imeenpet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_133.className = 'buttonsSapelli'
 iconMAU_133.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Imeenpet'

  }
 iconMAU_134 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_134);
 iconMAU_134.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Kalialwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_134.className = 'buttonsSapelli'
 iconMAU_134.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Kalialwet'

  }

 iconMAU_135 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_135);
 iconMAU_135.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Ketegaa.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_135.className = 'buttonsSapelli'
 iconMAU_135.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Ketegaa'

  }
 iconMAU_136 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_136);
 iconMAU_136.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Ketungutiet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_136.className = 'buttonsSapelli'
 iconMAU_136.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Ketungutiet'

  }

 iconMAU_137 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_137);
 iconMAU_137.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Kipkutungit.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_137.className = 'buttonsSapelli'
 iconMAU_137.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Kipkutungit'

  }
 iconMAU_138 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_138);
 iconMAU_138.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Kipsebwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_138.className = 'buttonsSapelli'
 iconMAU_138.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Kipsebwet'

  }
 iconMAU_139 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_139);
 iconMAU_139.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Kipsertwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_139.className = 'buttonsSapelli'
 iconMAU_139.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Kipsertwet'

  }
 iconMAU_140 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_140);
 iconMAU_140.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Kipsotiet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_140.className = 'buttonsSapelli'
 iconMAU_140.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Kipsotiet'

  }
 iconMAU_141 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_141);
 iconMAU_141.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Kipsowoit.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_141.className = 'buttonsSapelli'
 iconMAU_141.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Kipsowoit'

  }
 iconMAU_142 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_142);
 iconMAU_142.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Kogob_toroi.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_142.className = 'buttonsSapelli'
 iconMAU_142.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Kogob toroi'

  }
 iconMAU_143 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_143);
 iconMAU_143.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Kosisitiet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_143.className = 'buttonsSapelli'
 iconMAU_143.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Kosisitiet'

  }
 iconMAU_144 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_144);
 iconMAU_144.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Lepekwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_144.className = 'buttonsSapelli'
 iconMAU_144.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Lepekwet'

  }
 iconMAU_145 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_145);
 iconMAU_145.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Mailpuch.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_145.className = 'buttonsSapelli'
 iconMAU_145.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Mailpuch'

  }
 iconMAU_146 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_146);
 iconMAU_146.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Manguangiet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_146.className = 'buttonsSapelli'
 iconMAU_146.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Manguangiet'

  }
 iconMAU_147 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_147);
 iconMAU_147.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Martit.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_147.className = 'buttonsSapelli'
 iconMAU_147.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Martit'

  }
 iconMAU_148 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_148);
 iconMAU_148.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Mogoiwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_148.className = 'buttonsSapelli'
 iconMAU_148.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Mogoiwet'

  }
 iconMAU_149 = document.createElement("BUTTON");
  cell.appendChild(iconMAU_149);
 iconMAU_149.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Mogokwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMAU_149.className = 'buttonsSapelli'
 iconMAU_149.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '🌿 Mogokwet'

  }

  iconMAU_151 = document.createElement("BUTTON");
   cell.appendChild(iconMAU_151);
  iconMAU_151.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Mopondet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconMAU_151.className = 'buttonsSapelli'
  iconMAU_151.onclick = function(){
     hideAll()
   generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
     plant = '🌿 Mopondet'

   }
  iconMAU_152 = document.createElement("BUTTON");
   cell.appendChild(iconMAU_152);
  iconMAU_152.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Murguiwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconMAU_152.className = 'buttonsSapelli'
  iconMAU_152.onclick = function(){
     hideAll()
   generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
     plant = '🌿 Murguiwet'

   }

  iconMAU_153 = document.createElement("BUTTON");
   cell.appendChild(iconMAU_153);
  iconMAU_153.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Mutereriet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconMAU_153.className = 'buttonsSapelli'
  iconMAU_153.onclick = function(){
     hideAll()
   generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
     plant = '🌿 Mutereriet'

   }
  iconMAU_154 = document.createElement("BUTTON");
   cell.appendChild(iconMAU_154);
  iconMAU_154.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Ndakariat.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconMAU_154.className = 'buttonsSapelli'
  iconMAU_154.onclick = function(){
     hideAll()
   generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
     plant = '🌿 Ndakariat'

   }

  iconMAU_155 = document.createElement("BUTTON");
   cell.appendChild(iconMAU_155);
  iconMAU_155.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Ngingichet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconMAU_155.className = 'buttonsSapelli'
  iconMAU_155.onclick = function(){
     hideAll()
   generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
     plant = '🌿 Ngingichet'

   }
  iconMAU_156 = document.createElement("BUTTON");
   cell.appendChild(iconMAU_156);
  iconMAU_156.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Noiwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconMAU_156.className = 'buttonsSapelli'
  iconMAU_156.onclick = function(){
     hideAll()
   generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
     plant = '🌿 Noiwet'

   }
  iconMAU_157 = document.createElement("BUTTON");
   cell.appendChild(iconMAU_157);
  iconMAU_157.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Saiyet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconMAU_157.className = 'buttonsSapelli'
  iconMAU_157.onclick = function(){
     hideAll()
   generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
     plant = '🌿 Saiyet'

   }
  iconMAU_158 = document.createElement("BUTTON");
   cell.appendChild(iconMAU_158);
  iconMAU_158.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Sasiat.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconMAU_158.className = 'buttonsSapelli'
  iconMAU_158.onclick = function(){
     hideAll()
   generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
     plant = '🌿 Sasiat'

   }
  iconMAU_159 = document.createElement("BUTTON");
   cell.appendChild(iconMAU_159);
  iconMAU_159.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Sasuriet_wild banana.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconMAU_159.className = 'buttonsSapelli'
  iconMAU_159.onclick = function(){
     hideAll()
   generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
     plant = '🌿 Sasuriet wild banana'

   }
  iconMAU_160 = document.createElement("BUTTON");
   cell.appendChild(iconMAU_160);
  iconMAU_160.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Sergutiet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconMAU_160.className = 'buttonsSapelli'
  iconMAU_160.onclick = function(){
     hideAll()
   generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
     plant = '🌿 Sergutiet'

   }
  iconMAU_161 = document.createElement("BUTTON");
   cell.appendChild(iconMAU_161);
  iconMAU_161.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Singorwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconMAU_161.className = 'buttonsSapelli'
  iconMAU_161.onclick = function(){
     hideAll()
   generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
     plant = '🌿 Singorwet'

   }
  iconMAU_162 = document.createElement("BUTTON");
   cell.appendChild(iconMAU_162);
  iconMAU_162.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Siwot.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconMAU_162.className = 'buttonsSapelli'
  iconMAU_162.onclick = function(){
     hideAll()
   generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
     plant = '🌿 Siwot'

   }
  iconMAU_163 = document.createElement("BUTTON");
   cell.appendChild(iconMAU_163);
  iconMAU_163.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Sugumeriet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconMAU_163.className = 'buttonsSapelli'
  iconMAU_163.onclick = function(){
     hideAll()
   generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
     plant = '🌿 Sugumeriet'

   }
  iconMAU_164 = document.createElement("BUTTON");
   cell.appendChild(iconMAU_164);
  iconMAU_164.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Sumetet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconMAU_164.className = 'buttonsSapelli'
  iconMAU_164.onclick = function(){
     hideAll()
   generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
     plant = '🌿 Sumetet'

   }
  iconMAU_165 = document.createElement("BUTTON");
   cell.appendChild(iconMAU_165);
  iconMAU_165.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Teldet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconMAU_165.className = 'buttonsSapelli'
  iconMAU_165.onclick = function(){
     hideAll()
   generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
     plant = '🌿 Teldet'

   }
  iconMAU_166 = document.createElement("BUTTON");
   cell.appendChild(iconMAU_166);
  iconMAU_166.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Tepengwet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconMAU_166.className = 'buttonsSapelli'
  iconMAU_166.onclick = function(){
     hideAll()
   generateButtonsIssues()
    document.getElementById('customIconsGoBack').style.display = 'initial';
    document.getElementById('customIconsCancel').style.display = 'initial';
     plant = '🌿 Tepengwet'

   }
   iconMAU_167 = document.createElement("BUTTON");
    cell.appendChild(iconMAU_167);
   iconMAU_167.innerHTML = '<img src="images/KenyaMaasaiMAU/icons/Topitiet.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
   iconMAU_167.className = 'buttonsSapelli'
   iconMAU_167.onclick = function(){
      hideAll()
    generateButtonsIssues()
     document.getElementById('customIconsGoBack').style.display = 'initial';
     document.getElementById('customIconsCancel').style.display = 'initial';
      plant = '🌿 Topitiet'

    }



 iconMARA_200 = document.createElement("BUTTON");
  cell.appendChild(iconMARA_200);
 iconMARA_200.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/NewPlant.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
 iconMARA_200.className = 'buttonsSapelli'
 iconMARA_200.onclick = function(){
    hideAll()
  generateButtonsIssues()
   document.getElementById('customIconsGoBack').style.display = 'initial';
   document.getElementById('customIconsCancel').style.display = 'initial';
    plant = '➕ New Plant'

  }

  return screenChoice && plant
}


/////////////////////////////////////////////////         ISSUES           ///////////////////////////////////////


var generateButtonsIssues = function(){
  scrollToTop()


  screenChoice = 'issueGeneric'

// human issue
  iconI1 = document.createElement("BUTTON");
  cell.appendChild(iconI1);
  iconI1.className = 'buttonsSapelli'
  iconI1.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/ThumbsUp.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconI1.onclick = function(){
    hideAll()
    issueSpecific = '👍 OK'
    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }


//other issues
  iconI2 = document.createElement("BUTTON");
  cell.appendChild(iconI2);
  iconI2.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Hand.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconI2.className = 'buttonsSapelli'
  iconI2.onclick = function(){
    hideAll()
    generateButtonsHumanIssues()
    // issueSpecific = '🖐 Hand'
  }

  iconI3 = document.createElement("BUTTON");
  cell.appendChild(iconI3);
  iconI3.className = 'buttonsSapelli'
  iconI3.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Ant.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
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
  iconI4.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Elephant.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
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
  iconI5.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Goat.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
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
  iconI6.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Wildfire.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
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
  iconI7.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Drought.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
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
  iconI8.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Flood.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
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
  iconI9.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Wind.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
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
  scrollToTop()

  screenChoice = 'issuesHuman'

  iconIH1 = document.createElement("BUTTON");
  cell.appendChild(iconIH1);
  iconIH1.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Panga.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconIH1.className = 'buttonsSapelli'
  iconIH1.onclick = function(){
    hideAll()
    issueSpecific = '🖐 🗡️ Panga'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

  iconIH2 = document.createElement("BUTTON");
  cell.appendChild(iconIH2);
  iconIH2.className = 'buttonsSapelli'
  iconIH2.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Charcoal.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconIH2.onclick = function(){
    hideAll()
    issueSpecific = '🖐 ⬛ Charcoal'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

  iconIH3 = document.createElement("BUTTON");
  cell.appendChild(iconIH3);
  iconIH3.className = 'buttonsSapelli'
  iconIH3.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Chainsaw.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconIH3.onclick = function(){
    hideAll()
    issueSpecific = '🖐 🗡️ Chainsaw'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }


  iconIH4 = document.createElement("BUTTON");
  cell.appendChild(iconIH4);
  iconIH4.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Pharmacy.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconIH4.className = 'buttonsSapelli'
  iconIH4.onclick = function(){
    hideAll()
    issueSpecific = '🖐 💉 Pharmacy'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

  iconIH5 = document.createElement("BUTTON");
  cell.appendChild(iconIH5);
  iconIH5.innerHTML = '<img src="images/KenyaMaasaiMARA/icons/Firewood.png" style="max-height: 100%; max-width: 100%; border: 0px solid white" /> ';
  iconIH5.className = 'buttonsSapelli'
  iconIH5.onclick = function(){
    hideAll()
    issueSpecific = '🖐 🥄🔥 Firewood'

    document.getElementById('customIconsMap').click()
    setTimeout(function(){
      document.getElementById('share-download').click()
    },1000)
  }

return screenChoice && issueSpecific
}
