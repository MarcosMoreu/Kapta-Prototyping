document.getElementById('customIconsMap').onclick = function(e){
  document.getElementById('customIconsMap').style.display = 'none';
  document.getElementById('customIconsCancel').style.display = 'none';


  document.getElementById("map").style.height = "100%";
  document.getElementById("Cancel").style.display = "initial";
  document.getElementById("CustomIcons").style.display = "initial";
  document.getElementById('emoji').style.display = 'initial';
  // document.getElementById('showAreaHa').style.display = 'none';
  document.getElementById('showAreaAcres').style.display = 'initial';
  document.getElementById('share-download').style.display = 'initial';


}
document.getElementById('customIconsCancel').onclick = function(e){


}

document.getElementById('CustomIcons').onclick = function(e){
  document.getElementById("map").style.height = "0px";

  document.getElementById("Cancel").style.display = "none";
  document.getElementById("CustomIcons").style.display = "none";
  document.getElementById('emoji').style.display = 'none';
  // document.getElementById('showAreaHa').style.display = 'none';
  document.getElementById('showAreaAcres').style.display = 'none';
  document.getElementById('share-download').style.display = 'none';
  document.getElementById('customIconsMap').style.display = 'initial';
  document.getElementById('customIconsCancel').style.display = 'initial';
}
