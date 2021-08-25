var attachPhoto = false

document.getElementById('camera').addEventListener('click', async function init(e) {
document.getElementById('camera').style.display = 'none'

document.getElementById('btnScreenshot').style.display = 'initial'
document.getElementById('btnChangeCamera').style.display = 'initial'




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

console.log(screenwidth)
console.log(screenwidth)
document.getElementById("map").style.height = "0px";
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
  const btnPlay = document.querySelector("#btnPlay");
  const btnPause = document.querySelector("#btnPause");
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
    const img = document.createElement("img");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    img.src = canvas.toDataURL("image/png");
    screenshotsContainer.prepend(img);

    // document.getElementById('btnPlay').style.display = 'initial'
    // document.getElementById('btnPause').style.display = 'initial'
    // document.getElementById('btnPlay').style.display = 'initial'
    document.getElementById('btnChangeCamera').style.display = 'initial'

});


  // switch camera
  btnChangeCamera.addEventListener("click", function () {
    useFrontCamera = !useFrontCamera;

    initializeCamera();
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
