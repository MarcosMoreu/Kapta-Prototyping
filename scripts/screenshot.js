var photoAccepted
var imgSrc
var photocaptured = false

document.getElementById('camera').addEventListener('click', async function init(e) {
  $('#screenshots').empty()
document.getElementById('camera').style.display = 'none'
document.getElementById('screenshot').style.display = 'none'
document.getElementById("map").style.height = "0px";
document.getElementById('cameraDiv').style.display = 'initial'
document.getElementById('video').style.display = 'initial'
document.getElementById('goBackCamera').style.display = 'initial'
document.getElementById('btnScreenshot').style.display = 'initial'
document.getElementById('btnChangeCamera').style.display = 'initial';
(function () {
  if (
    !"mediaDevices" in navigator ||
    !"getUserMedia" in navigator.mediaDevices
  ) {
    alert("Camera API is not available in your browser");
    return;
  }

  // get page elements
  const video = document.querySelector("#video");
  const goBackCamera = document.querySelector("#goBackCamera");
  const btnScreenshot = document.querySelector("#btnScreenshot");
  const btnChangeCamera = document.querySelector("#btnChangeCamera");
  const screenshotsContainer = document.querySelector("#screenshots");
  const devicesSelect = document.querySelector("#devicesSelect");

  // video constraints
  const constraints = {
    audio:false,
    video: {

      width: { min: 1024, ideal: 1280, max: 1920 },
      height: { min: 576, ideal: 720, max: 1080 },

         facingMode: {exact: "environment"}
     }
  };
  // use front face camera
  let environmentCamera = true;

  // current video stream
  let videoStream;

  btnScreenshot.addEventListener("click", function () {

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const img = document.createElement("img");
    canvas.getContext("2d").drawImage(video, 0, 0);
    img.src = canvas.toDataURL("image/png");

    setTimeout(function(){

      stopVideoStream()

      document.getElementById('goBackCamera').style.display = 'none'
      document.getElementById('btnChangeCamera').style.display = 'none'
      document.getElementById('btnScreenshot').style.display = 'none'
      document.getElementById('video').style.display = 'none'
      document.getElementById('screenshots').style.display = 'initial'

      $('#screenshots').empty() // this is to clear the cancelled screenshots

      img.style.width = '100%'
      img.style.height = 'auto'
      screenshotsContainer.prepend(img);
      img.style.marginTop = '0px'
      img.style.left = '50%'


      document.getElementById('btnConfirmPhoto').style.display = 'initial'
      document.getElementById('btnCancelPhoto').style.display = 'initial'

    },500)
    photocaptured = true
    photoAccepted = img
return photoAccepted && photocaptured
});


  // switch camera
  btnChangeCamera.addEventListener("click", function () {
    environmentCamera = !environmentCamera;

    initializeCamera();
  });
 // button go back
    btnCancelPhoto.addEventListener("click", function () {

      document.getElementById('screenshots').style.display = 'none'
      document.getElementById('btnConfirmPhoto').style.display = 'none'
      document.getElementById('btnCancelPhoto').style.display = 'none'
      document.getElementById('camera').style.borderWidth = '0px'
     document.getElementById('camera').click()


    })
  //cancel photo
  goBackCamera.addEventListener("click", function () {
    document.getElementById('cameraDiv').style.display = 'none'
    document.getElementById('video').style.display = 'none'
    document.getElementById('screenshots').style.display = 'none'

    document.getElementById('goBackCamera').style.display = 'none'
    document.getElementById('btnScreenshot').style.display = 'none'
    document.getElementById('btnChangeCamera').style.display = 'none';
    document.getElementById("map").style.height = "100%";
    document.getElementById('camera').style.display = 'initial'
    document.getElementById('screenshot').style.display = 'initial'

    photoAccepted = null
    $('#screenshots').empty() // this is to clear the cancelled screenshots
    attachPhoto = true

    return photoAccepted && attachPhoto
  });

  //confirm photo
  btnConfirmPhoto.addEventListener("click", function () {

    console.log('photo confirmed')

    document.getElementById('cameraDiv').style.display = 'none'
    document.getElementById('video').style.display = 'none'
    // document.getElementById('canvas').style.display = 'none'
    document.getElementById('screenshots').style.display = 'none'

    document.getElementById('goBackCamera').style.display = 'none'
    document.getElementById('btnScreenshot').style.display = 'none'
    document.getElementById('btnChangeCamera').style.display = 'none';
    document.getElementById('btnConfirmPhoto').style.display = 'none'
    document.getElementById('btnCancelPhoto').style.display = 'none'

    document.getElementById("map").style.height = "100%";
    document.getElementById('camera').style.display = 'initial'
    document.getElementById('screenshot').style.display = 'initial'

    document.getElementById('screenshot').style.borderWidth = '0px'
    document.getElementById('camera').style.borderWidth = '2px'


    fetch(photoAccepted.src)
         .then(function (response) {
            return response.blob();
         })
         .then(function (blob) {

            testBlob = blob
            //console.log(testBlob.type)
            var nameFile = 'test.png'
            var file = new File([testBlob],nameFile, {type: testBlob.type });
            filesArray = [file];
            $('#screenshots').empty() // this is to clear the cancelled screenshots

            return testBlob && filesArray
         });


    attachPhoto = true

    return attachPhoto

  });

  // stop video stream
  function stopVideoStream() {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  // initialize
  async function initializeCamera() {
    stopVideoStream();
    constraints.video.facingMode = environmentCamera ? "environment" : "user";

    try {
      videoStream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = videoStream;
    } catch (err) {
      alert("Could not access the camera");
    }
  }

  initializeCamera();
})();

})


//this script is for automatically taking a screenshot of the canvas (not with the camera) 'screenshot'
var screenshotOn = false
// var newImg
var filesArrayScreenshot
var dataURL
document.getElementById('screenshot').addEventListener('click',function (){
  $('#screenshots').empty()

  try{// to catch the error in case the screenshot doesn't work here

  if(screenshotOn == true){

    document.getElementById('camera').disabled = false
    document.getElementById('screenshot').style.borderWidth = '0px'
    document.getElementById('camera').style.borderWidth = '0px'
    screenshotOn = false

  }else{
 
    document.getElementById('screenshot').style.borderWidth = '2px'
    document.getElementById('screenshot').style.borderColor = 'yellow'

    // document.getElementById('screenshot').style.borderColor = '#39F70F'
    document.getElementById('camera').style.borderWidth = '0px'
    document.getElementById('camera').disabled = true

setTimeout(function(){ //this is simply to improve button interaction with 300ms before processing stuff below

    screenshotOn = true

    const img = document.createElement("img");

  var heightscreen = window.innerHeight
  var heightscreenshot = heightscreen - 200
   var ignoretiles = 'leaflet-tile'

      html2canvas(document.getElementById('map'), {
        allowTaint: true,
        useCORS: true,
        imageTimeout:5000,
        removeContainer:true,
        logging:true,
        foreignObjectRendering: false,
        height: heightscreenshot,
        ignoreElements: function( element ) {
          // console.log(element.src)
          var src = element.src
           /* Remove element with id="MyElementIdHere" */
           if( 'button' == element.type || 'submit' == element.type) {
             // console.log('ignored button,submit or link', element.id)
               return true;
           }

           /* Remove all elements with class="MyClassNameHere" */
           if( element.classList.contains( 'buttons' )) {
             // console.log('ignored button,submit or link or LEAFLET', element.id)
               return true;
           }

         }

      })
      .then(function (canvas) {
        // document.getElementById("map").style.opacity = 0.4;
        document.getElementById('shareYourImageMap').disabled = false
        document.getElementById('shareYourMapdata').disabled = false

        canvas.toBlob(function(blob){
          url = URL.createObjectURL(blob);

          testBlob = blob
          // console.log(testBlob.type)
          var nameFile = 'screenshot.png'
          var file = new File([testBlob],nameFile, {type: testBlob.type });
          filesArrayScreenshot = [file];

        },'image/jpeg', 0.9)  // this is to define the quality of the image screenshot (keep in mind the size due to data bundles) - jpeg offers the best compression value as far as I've tried

      })
      .catch((e) => {
        // Handle errors
        console.log(e);
      });

},300)
    // },1200)
  }
}catch(err){
  console.log('screenshot not working in this device')
}

  return filesArrayScreenshot && screenshotOn
})
