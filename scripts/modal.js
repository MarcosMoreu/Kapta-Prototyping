
if ('serviceWorker' in navigator) {

  navigator.serviceWorker
      .register('./sw.js',{ scope: '/' })
      .then(function(registration) {
        if (registration.sync) {
            console.log('Sync is supported')
        } else {
          console.log('Sync NOT is supported')
        }
          registration.update() //to update the sw and caches if version has changed
          ////console.log('sw has been updated')
          //to reload the page if sw version has changed. This is to provide the user the latest version without the need of reloading or clearing cache
          registration.onupdatefound = () => {

            //console.log('update found in SW')
              const installingWorker = registration.installing;
              installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed' &&
                      navigator.serviceWorker.controller) {
                        // $.get( "pages/tutorial.html")
                      // reload the page
                      caches.delete('CACHEALL')
                      location.reload();
                  }
              };
          };
          return registration.sync.register('sync-background-'); //to enable sync

      })
      .catch(function(err) {
          ////console.log('Service Worker Failed to register', err);
      })
}

var sharetarget = false
var manualupload = true

//to prevent clicking on first load before the modal loads

navigator.serviceWorker.onmessage = (event) => {
console.log('MESSAGE FROM SW RECEIVED')
loadingchat()

manualupload = false
const file = event.data.file;
setTimeout(function(){
  
  displayFile(file);

},3000)
var sharetarget = true
console.log('sharetarget',sharetarget)
return sharetarget && manualupload

};

function loadingchat(){
console.log('loadingchat function called')
document.getElementById('languages').style.display = 'none'
document.getElementById('KaptaLite').style.display = 'none'
document.getElementById('KaptaAdvanced').style.display = 'none'
document.getElementById('asktheteam').style.display = 'none'
changeLanguage()
document.getElementById('chatmaploadinggif').style.display = 'initial' 

homescreenorwhatsapplaunch = 'whatsapp'
setTimeout(function(){
  document.getElementById('chatmaploadinggif').style.display = 'none' 
},3000)
return homescreenorwhatsapplaunch
}
if(localStorage.getItem('pwCorrect')){
  document.getElementById('languages').style.display='initial'
  document.getElementById('KaptaLite').style.display='initial'
  document.getElementById('KaptaAdvanced').style.display='initial'
  document.getElementById('asktheteam').style.display='initial'
}else{
  document.getElementById('modal').style.display='initial'
  var findFirebaseCredentials = setInterval(function() {
    console.log('firebase initialise')
      if (isOnline == true & firebaseKey != null) {
          try {
              firebase.initializeApp(firebaseConfig);
            //console.log('Firebase initialized')
              clearInterval(findFirebaseCredentials)
          } catch (e) {
            // console.log('firebase not initialized!!')
          }
      }
  }, 200)
}

///SOME VARIABLES HERE COME FROM KAPTA ADVANCES, SO THEY MIGHT BE IRRELEVANT HERE. NEEDS CLEANING UP

// var pageLoaded = false
var subDOMAIN = 'testing'
// var sapelliProjectIdentifier = 'DTM' //this variable is need to put the sap project identifier in the geojson
var isIOS = /iPad|iPhone|iPod|Mac OS X/.test(navigator.userAgent) && !window.MSStream; // Mac OS X correct???
var isOnline = navigator.onLine
var isOnlineGlobal = isOnline
var browserLanguage = navigator.language
var planetKey;
var sentinelHubKey;
var firebaseKey;
var firebaseConfig;
var cartousername;
var cartoapiSELECT;
var opencamera

var isFirstTime; //var to store if the site is visited for the first time
var files = [];
var filesLength;
var storage;
var percentage
var finalPercentage = []
var finalUrlAudio;
var initialScreen = true;
var clickCountDeleteButton = 0;

var shareURL;
var convertedData;
var convertedDataShareDirect;
var shareGeomDirect = false;
var propertiesGeoJSON
var propertiesGeoJSONURL;
var data;
var dataGeometry;
var dataGeometry;
var blob;
var dateTimeRandomID;
var timeFinish;
var diffTimes;
var dateFilterValue; //to apply this value when applyFilter is clicked
var audioButtonClicked = false
var finished = false; // variable to openpopup only when file downloaded, not when loaded from local storage
var lastPositionStoredLOCALLY;
var created = false; // variable to detect wheter the feature (point,line,polygon) has been created
var sameSession = false; //to know if user has already mapped in this session
var finalLayer;
var groupGeoJSON = []

// Add Data from CARTO using the SQL API. Declare Variables. Create Global Variable to hold CARTO points
var cartoGeometries = null;
var cartoIdFeatureSelected;
var selectedFeature = null;
var featureType = null;
var cartoLoaded;
var clickCountDelete;

var filterIsOn = false
var selectedFeature
var getTotalFeaturesInDB

var mapCurrentBounds;
var mapCurrentZoom;
var mapCurrentCenter;
var refreshPopup;
var refreshPopupComment;
var editButtonClicked = false;
var audioComment = '.'
var armchairOrGPS


// // add location via browser geolocation
var currentLocation = []; // variable created to allow the user recenter the map
var accuracy = 0
var markerAdded = false; // var to avoid multiple markers
var locationFound = false;
var cartoGeometriesInitial = null
var elementJustAddedToLocalStorage = false
var attachPhoto = false

var areaPolygon = 0
var lengthLine = 0
var dist_m_Participant = 0

var sqlQuerySelect
var sqlQuerySelectEncoded
var deleteFromcartoimmediate = null

var gobackUploadmap = false


var isOnline = navigator.onLine
if(isOnline == false){
  document.getElementById('askthemap').style.opacity = '0.4';
  document.getElementById('askthemap').style.borderColor = 'black'
    document.getElementById('askthemap').disabled = true
}


var phoneNumber
var arrayOfImages = [
 'images/checkingPw.gif','images/ThumbsUp.png',
    'images/backButton.png','images/PlusSign.png','images/infoGoBack.png',
   'images/download.png','images/burger.png','images/burgerBlack.png',
    'images/questionmark.png','images/key.png','images/other1.png',
     'images/sendComment.png','images/arrowLeft.png','images/underConstruction.png',
      'images/whatsapp.png',
       'images/filterIconold.png','images/manNoOrientation2.png',
        'images/manNoOrientation.png','images/onionlayericon.png','images/moon.png',
         'images/padlockopen.png','images/padlockclosed.png','images/filterIcon2.png',
          'images/gifcartofilter.gif',
          'images/phoneicon.png','images/mainmenu.png',
            'images/checkingPw.gif','images/gpslite.png',
             'images/sun.png','images/WhatsAppicon.png',
              

]

var sharetarget = false
var manualupload = true
var homescreenorwhatsapplaunch
var checkfields = setInterval(function(){
  var valueEnteredName = document.getElementById('enteredName').value
  var valueEnteredPhone = document.getElementById('enteredPhone').value
  var valueEnteredPw = document.getElementById('enteredPw').value

  if(valueEnteredName != '' && valueEnteredPhone != '' && valueEnteredPw != ''){
    document.getElementById('login').style.opacity='1';
    document.getElementById('login').disabled = false;
    document.getElementById('login').style.borderColor= 'grey'
    // clearInterval(checkfields)
  }else{
    document.getElementById('login').style.opacity='0.4';
    document.getElementById('login').disabled = true;
    // document.getElementById('login').style.borderColor= 'white'
  }
  
},300)
var firstLoad = function() { //fucntion to determine if the site is visited for first time
  // changeLanguage()
  console.log('FIRST LOAD CALLED')
  console.log('sharetarget',sharetarget)
  document.getElementById('login').style.opacity='0.4';
  document.getElementById('login').disabled = true;

    if(localStorage.getItem('pwCorrect')){
      document.getElementById('languages').disabled = false
      document.getElementById('KaptaLite').disabled = false
      document.getElementById('KaptaAdvanced').disabled = false
      document.getElementById('asktheteam').disabled = false

  setTimeout(function(){
    if(homescreenorwhatsapplaunch == 'whatsapp'){
      document.getElementById('chatmaploadinggif').style.display = 'initial'

    }else{
      document.getElementById('languages').style.display = 'initial'
      document.getElementById('KaptaLite').style.display = 'initial'
      document.getElementById('KaptaAdvanced').style.display = 'initial'
      document.getElementById('asktheteam').style.display = 'initial'
    }

    },300)


      document.getElementById('MapLoading').style.display = 'initial'
      document.getElementById('MapLoading').style.opacity = 0
      jQuery(document).ready(checkContainer);

      function checkContainer () {
        if($('#MapLoading').is(':visible')){ //if the container is visible on the page
            initialiseMap() //map initialised AND LOADED (no modal)
            var imagesToPreload = new Array()
            function preload() {
                    for (i = 0; i < preload.arguments.length; i++) {
                      imagesToPreload[i] = new Image()
                      imagesToPreload[i].src = preload.arguments[i]
                      //console.('image preloaded')
                    }
                  }
                  preload(
                    'images/checkingPw.gif'

                  )
              isFirstTime = false;

        } else {
          setTimeout(checkContainer, 50); //wait 50 ms, then try again
        }
      }

    }else if(typeof window.localStorage !== "undefined" && !localStorage.getItem('visited')) {
      console.log('visited but no pw')

        // Set visited flag in local storage
        try{
          $.getScript({
             cache:false,
            url:'https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js'
          }),
          $.getScript({
             cache:false,
            url:'https://www.gstatic.com/firebasejs/8.2.1/firebase-auth.js',
            success:function(){
              console.log('firebase loaded')
              document.getElementById('login').style.opacity='1';
              document.getElementById('login').disabled = false;
              document.getElementById('login').style.borderColor= 'grey'

            }
          })
        }catch(e){
          location.reload()
        }
        localStorage.setItem('visited', true);
        isFirstTime = true;

        requestPw()


    }else if(!localStorage.getItem('pwCorrect')){  //condition to ensure that if in first load pw was incorrect, pw is requested until correct !!!!!!!!!!!!!!!!!!!!!!!

      try{
        $.getScript({
           cache:false,
          url:'https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js'
        }),
        $.getScript({
           cache:false,
          url:'https://www.gstatic.com/firebasejs/8.2.1/firebase-auth.js'
        })
        
      }catch(e){
        location.reload()
      }
        // console.log('!localStorage.getItem(pwCorrect')
        requestPw()
        console.log('no pw correct')
    }
    return isFirstTime;
}
window.onload = firstLoad;  /// to launch the root function XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXS
var done = false



setTimeout(function(){
  document.getElementById('loginInfo').style.opacity = '1'
  document.getElementById('loginInfo').disabled = false
  document.getElementById('loginKey').style.opacity = '1'
  document.getElementById('loginKey').disabled = false

},2900)

document.getElementById('loginInfo').onclick = function(){
  window.location.href="https://wa.me/+34678380944";
}

document.getElementById('loginKey').onclick = function(e){

  e.preventDefault() //to avoid reload
    document.getElementById('loginKey').disabled = true
  document.getElementById('loginKey').style.display = 'none'
  document.getElementById('loginInfo').style.display = 'none'

  document.getElementById('loginKey').style.backgroundColor = '#D5D6D5'
  document.getElementById('enteredPw').style.display = 'initial';
  document.getElementById('enteredName').style.display = 'initial';
  document.getElementById('enteredPhone').style.display = 'initial';

  document.getElementById('login').style.display = 'initial';

  initialiseMap() //map initialised but not shown
  function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        try{
            $('<img/>')[0].src = this;
        }catch(e){
          //console.log('image failed to preload')
        }

    });
  }

    preload(arrayOfImages);
  try{
    $(document).keypress(
      function(event){
        if (event.which == '13') {
          event.preventDefault();
        }
    });
  }catch(e){
    console.log('error disable enter key catched')
  }

}

var initialiseMap = function(){
  document.body.style.backgroundColor = "black";
  setTimeout(function(){
      if (document.readyState === 'complete' && localStorage.getItem('pwCorrect')) {
      phoneNumber = localStorage.getItem('phoneNumber');
      //console.('phonenumber', phoneNumber)

    document.getElementById('initialscreen2options').style.display = 'initial'
}
},100)


document.getElementById("map").style.opacity = 0;
document.getElementById("map").style.display = "initial";
document.getElementById("app-css").disabled = false
document.getElementById("map").style.display = "block";
 
      done = true
      return done && phoneNumber
}

document.onreadystatechange = function () {
  var state = document.readyState
  //console.(state,'state')
  if (document.readyState === 'complete' && localStorage.getItem('pwCorrect')) {

    setTimeout(function(){
      // requestCartoData()
    },1000)
  }
}

  window.addEventListener("click", function(){
 
    $.getScript({
       cache:true,
      url:'scripts/lib/html2canvas.min.js'
    })

    function preload(arrayOfImages) {
      $(arrayOfImages).each(function(){
          try{
              $('<img/>')[0].src = this;
          }catch(e){
            //console.log('image failed to preload')
          }

      });
    }
      // Usage:

      preload(arrayOfImages);

}, {once : true});

var loaded
var authentication
var num1
var confirmphonebuttonclicked = 0
var requestPw = function(){
        document.getElementById('modal').style.display='block';

      var checkPw = setInterval(function(){
        var firstFour = document.getElementById('enteredPw').value.substr(0, 4)
        var pwPlaceholder = firstFour

        if(pwPlaceholder.length == 4){

        }
        if(pwPlaceholder.length < 4){

        }
      },200)

      document.getElementById('login').addEventListener('click',e =>{
        authentication = 'checking' //to avoid failed being stored, if first time fails. Number of fails is limited by Firebase!!!
        clearInterval(checkPw)
        document.getElementById('loginIcon').src = 'images/checkingPw.gif'
        e.preventDefault() // to avoid page reload on first load!
        var firstFour = document.getElementById('enteredPw').value.substr(0, 4)
        var pwPlaceholder = firstFour

        var checkDoneAndFirebasePW = setInterval(function(){

              openAppPwSuccesful()
            return done && authentication
          },50)

          var randomEmailId = Math.floor(Math.random() * 10);  // this is to prevent the situation where multiple users fail the login with the same account and it bolcks
          var email = 'md'+ randomEmailId + '@md.com' //I've added 10 different email address in Firebase (0-9) with same Pw
          //console.log(randomEmailId)

          var password = '00' + pwPlaceholder // 00 is added as Firebase only allows for a minimum of 6 digits pws

          firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) =>{
              //console.log('success',user)
              authentication = 'successful'

            })
            .catch((e) => {
              authentication = 'failed'
              var errorCode = e.code;
              var errorMessage = e.message;
            })

        var openAppPwSuccesful = function(){
              if(authentication == 'successful' && done == true){
                // document.getElementById('login').style.borderColor= 'white'
                valueEnteredName = document.getElementById('enteredName').value
                valueEnteredPhone = document.getElementById('enteredPhone').value
                localStorage.setItem('username', valueEnteredName);
                localStorage.setItem('phone', valueEnteredPhone);
                clearInterval(checkfields)
                document.getElementById('login').disabled = true // to avoid that user clicks twice while waiting, in which case carto layer would load twice
                 //console.log('both')
                 localStorage.setItem('pwCorrect', true);
                 var phoneNumberNoprefix = document.getElementById('enteredPw').value.substr(4, 13)
                 if(phoneNumberNoprefix == ''){
                   phoneNumberNoprefix = 0123456789
                 }else{
                   localStorage.setItem('phoneNumber', phoneNumberNoprefix);
                 }
                 console.log('phonenumber',phoneNumberNoprefix)

                clearInterval(checkPw)
                clearInterval(checkDoneAndFirebasePW)
                document.getElementById('enteredPw').style.backgroundColor = '#39F70F' //green color

                setTimeout(function(){
                  location.reload()
   
                },3000)


              }
              else if(authentication == 'failed'){
                clearInterval(checkDoneAndFirebasePW)
                document.getElementById('enteredPw').style.backgroundColor = 'red'
                document.getElementById('enteredPw').focus() //to maintain keyboard if pw wrong

                setTimeout(function(){
                  document.getElementById('enteredPw').style.backgroundColor = 'white'
                  document.getElementById('loginIcon').src = 'images/ThumbsUp.png'
                  document.getElementById('login').style.borderColor= 'grey'


                },500)
              }

            }
        // return loaded

    })//login
}//requesPW
