var attachPhoto = false
var photoAccepted

document.getElementById('camera').addEventListener('click', async function init(e) {
document.getElementById('camera').style.display = 'none'
document.getElementById("map").style.height = "0px";


document.getElementById('cameraDiv').style.display = 'initial'
document.getElementById('video').style.display = 'initial'
document.getElementById('canvas').style.display = 'initial'

document.getElementById('goBackCamera').style.display = 'initial'
document.getElementById('btnScreenshot').style.display = 'initial'
document.getElementById('btnChangeCamera').style.display = 'initial';






//   document.getElementById('camera').style.backgroundColor = 'green'
// // for testing the photo thing.............................
//
//   console.log('photo activated')
//
//       fetch("images/field.png")
//       .then(function (response) {
//          return response.blob();
//       })
//       .then(function (blob) {
//          // resEle.innerHTML = "blob.size = " + blob.size + "<br>";
//          // resEle.innerHTML += "blob.type = " + blob.type + "<br>";
//          console.log(blob)
//          testBlob = blob
//          console.log(testBlob.type)
//          var nameFile = 'test.png'
//          var file = new File([testBlob],nameFile, {type: testBlob.type });
//          filesArray = [file];
//
//          return testBlob && filesArray
//       });
//
//   attachPhoto = true

// try {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: false,
//       video:true
//   //     {
//   //       minAspectRatio: 1.333,
//   //       minFrameRate: 30,
//   //       facingMode: {
//   // //Use the back camera
//   //       exact: 'user',
//   //       // width: 1280,
//   //       // heigth: 720
//   //     }
//   //   }
// })
//     const videoTracks = stream.getVideoTracks()
//     const track = videoTracks[0]
//     alert(`Getting video from: ${track.label}`)
//     document.querySelector('video').srcObject = stream
//     document.querySelector('#get-access').setAttribute('hidden', true)
// //The video stream is stopped by track.stop() after 3 second of playback.
//     setTimeout(function(){ track.stop() }, 3 * 1000)
//   } catch (error) {
//     alert(`${error.name}`)
//     console.error(error)
//   }
// return attachPhoto

// console.log(screenwidth)
// console.log(screenwidth)
// document.getElementById('classification').style.display ='none'

// // Prefer camera resolution nearest to 1280x720.
// var constraints = { audio: false, video: true};
//
// navigator.mediaDevices.getUserMedia(constraints)
// .then(function(mediaStream) {
//   var video = document.querySelector('video');
//   video.srcObject = mediaStream;
//   video.onloadedmetadata = function(e) {
//     video.play();
//   };
// })
// .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

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
  // const btnPlay = document.querySelector("#btnPlay");
  // const btnPause = document.querySelector("#btnPause");
  const goBackCamera = document.querySelector("#goBackCamera");
  const btnScreenshot = document.querySelector("#btnScreenshot");
  const btnChangeCamera = document.querySelector("#btnChangeCamera");
  const screenshotsContainer = document.querySelector("#screenshots");
  const canvas = document.querySelector("#canvas");
  const devicesSelect = document.querySelector("#devicesSelect");

  // video constraints
  const constraints = {
    video: {
      // width: canvas.width,
      // height:canvas.height
      width: screen.width,
      height:screen.height
    },
  };

  // use front face camera
  let useFrontCamera = true;

  // current video stream
  let videoStream;

  // handle events
  // play
  // btnPlay.addEventListener("click", function () {
  //   video.play();
  //   btnPlay.classList.add("is-hidden");
  //   btnPause.classList.remove("is-hidden");
  // });
  //
  // // pause
  // btnPause.addEventListener("click", function () {
  //   video.pause();
  //   btnPause.classList.add("is-hidden");
  //   btnPlay.classList.remove("is-hidden");
  // });

  // take screenshot
  btnScreenshot.addEventListener("click", function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    $('#screenshots').empty() // this is to clear the cancelled screenshots

    // if(cancelled == true){
    //   screenshotsContainer.removeChild(img);
    //   console.log('cancelled')
    // }
    const img = document.createElement("img");
    canvas.getContext("2d").drawImage(video, 0, 0);
    img.src = canvas.toDataURL("image/png");
    screenshotsContainer.prepend(img);

    // document.getElementById('btnPlay').style.display = 'initial'
    // document.getElementById('btnPause').style.display = 'initial'
    // document.getElementById('btnPlay').style.display = 'initial'
    setTimeout(function(){
      video.width = '0px'
      video.height = '0px'
      // document.getElementById('video').style.display = 'none'
      stopVideoStream()
      document.getElementById('goBackCamera').style.display = 'none'
      document.getElementById('btnChangeCamera').style.display = 'none'
      document.getElementById('btnScreenshot').style.display = 'none'
      document.getElementById('video').style.display = 'none'
      document.getElementById('screenshots').style.display = 'initial'
      document.getElementById('btnConfirmPhoto').style.display = 'initial'
      document.getElementById('btnCancelPhoto').style.display = 'initial'

    },500)
    photoAccepted = img
return photoAccepted
});


  // switch camera
  btnChangeCamera.addEventListener("click", function () {
    useFrontCamera = !useFrontCamera;

    initializeCamera();
  });
 // button go back
    btnCancelPhoto.addEventListener("click", function () {

      document.getElementById('screenshots').style.display = 'none'
      document.getElementById('btnConfirmPhoto').style.display = 'none'
      document.getElementById('btnCancelPhoto').style.display = 'none'
  //     console.log(screenshotsContainer.innerHTML)
  // screenshotsContainer.innerHTML=''
  // document.getElementById('screenshots').empty()
     document.getElementById('camera').click()


    })
  //cancel photo
  goBackCamera.addEventListener("click", function () {
    document.getElementById('cameraDiv').style.display = 'none'
    document.getElementById('video').style.display = 'none'
    document.getElementById('canvas').style.display = 'none'
    document.getElementById('screenshots').style.display = 'none'

    document.getElementById('goBackCamera').style.display = 'none'
    document.getElementById('btnScreenshot').style.display = 'none'
    document.getElementById('btnChangeCamera').style.display = 'none';
    // document.getElementById('btnConfirmPhoto').style.display = 'none'
    // document.getElementById('btnCancelPhoto').style.display = 'none'

    document.getElementById("map").style.height = "100%";
    document.getElementById('camera').style.display = 'initial'
    photoAccepted = null
    return photoAccepted
  });

  //confirm photo
  btnConfirmPhoto.addEventListener("click", function () {
    console.log('photo confirmed')
    // $('#screenshots').empty() // this is to clear the cancelled screenshots
    //
    // document.getElementById('video').style.height = "0px";
    //     document.getElementById('cameraDiv').style.height = "0px";

    document.getElementById('cameraDiv').style.display = 'none'
    document.getElementById('video').style.display = 'none'
    document.getElementById('canvas').style.display = 'none'
    document.getElementById('screenshots').style.display = 'none'

    document.getElementById('goBackCamera').style.display = 'none'
    document.getElementById('btnScreenshot').style.display = 'none'
    document.getElementById('btnChangeCamera').style.display = 'none';
    document.getElementById('btnConfirmPhoto').style.display = 'none'
    document.getElementById('btnCancelPhoto').style.display = 'none'

    document.getElementById("map").style.height = "100%";
    document.getElementById('camera').style.display = 'initial'

    //to convert to blob

    fetch(photoAccepted.src)
         .then(function (response) {
            return response.blob();
         })
         .then(function (blob) {
            // resEle.innerHTML = "blob.size = " + blob.size + "<br>";
            // resEle.innerHTML += "blob.type = " + blob.type + "<br>";
            console.log(blob)
            testBlob = blob
            console.log(testBlob.type)
            var nameFile = 'test.png'
            var file = new File([testBlob],nameFile, {type: testBlob.type });
            filesArray = [file];

            return testBlob && filesArray
         });

    console.log(photoAccepted)
    console.log(photoAccepted.src)

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
    constraints.video.facingMode = useFrontCamera ? "user" : "environment";

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
