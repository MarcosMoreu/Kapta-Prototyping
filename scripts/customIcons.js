// console.log('url', url)
// var urlContainsHashCustomised = url.includes('#Customised')

//to return to the map
document.getElementById('customIconsMap').onclick = function(e){
  document.getElementById('customIconsMap').style.display = 'none';
  document.getElementById('customIconsCancel').style.display = 'none';
  // document.getElementById('showProjects').style.display = 'none';


  document.getElementById("map").style.height = "100%";
  document.getElementById("Cancel").style.display = "initial";
  document.getElementById("sapelliProjects").style.display = "initial";
  document.getElementById('emoji').style.display = 'initial';
  // document.getElementById('showAreaHa').style.display = 'none';
  document.getElementById('showAreaAcres').style.display = 'initial';
  document.getElementById('share-download').style.display = 'initial';

}

//to delete attributes and start again
document.getElementById('customIconsCancel').onclick = function(e){


}

var projectsCreated = false
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
        newProjectButton = document.createElement("BUTTON");
        document.body.appendChild(newProjectButton);
        newProjectButton.style.backgroundColor = 'white'
        newProjectButton.style.width = '80px'
        newProjectButton.style.height = '80px'
        newProjectButton.style.borderColor = 'black'
        newProjectButton.style.marginBottom = '200px'
        newProjectButton.style.marginLeft = '20px'
        newProjectButton.innerHTML = '<img src="images/logoNigeria.png" style="width:50px ; height:50px; border: 0px solid white" />';

        //to show the icons of the project selected
        newProjectButton.onclick = function(){
          newProjectButton.style.display = 'none';

          // document.getElementById('customIconsMap').style.display = 'initial';
          document.getElementById('customIconsCancel').style.display = 'initial';
          // document.getElementById('showProjects').style.display = 'initial';

        }
  }else{
    newProjectButton.style.display = 'initial';
  }
  projectsCreated = true
  return projectsCreated
}

//to go back to main screen where projects are shown
// document.getElementById('showProjects').onclick = function(e){
//   // document.getElementById("map").style.height = "0px";
//
//   document.getElementById("customIconsCancel").style.display = "none";
//   document.getElementById("showProjects").style.display = "none";
//
//   // document.getElementById("sapelliProjects").style.display = "none";
//   // document.getElementById('emoji').style.display = 'none';
//   // document.getElementById('showAreaHa').style.display = 'none';
//   // document.getElementById('showAreaAcres').style.display = 'none';
//   // document.getElementById('share-download').style.display = 'none';
//   // document.getElementById('customIconsMap').style.display = 'none';
//   // document.getElementById('nigeriaProject').style.display = 'initial';
//   // document.getElementById('customIconsMap').style.display = 'initial';
//   newProjectButton.style.display = 'initial';
//
// }



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
