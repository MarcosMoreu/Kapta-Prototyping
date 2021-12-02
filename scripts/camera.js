var photoAccepted
var imgSrc

document.getElementById('camera').addEventListener('click', async function init(e) {
document.getElementById('camera').style.display = 'none'
document.getElementById('screenshot').style.display = 'none'
document.getElementById("map").style.height = "0px";
document.getElementById('showAreaAcres').style.display = 'none'



document.getElementById('cameraDiv').style.display = 'initial'
document.getElementById('video').style.display = 'initial'
// document.getElementById('canvas').style.display = 'initial'

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
  // const canvas = document.querySelector("#canvas");
  const devicesSelect = document.querySelector("#devicesSelect");

  // video constraints
  const constraints = {
    audio:false,
    video: {
      // width: canvas.width,
      // height:canvas.height
      // width: '100vw',
      // height:'100vh'

      width: { min: 1024, ideal: 1280, max: 1920 },
      height: { min: 576, ideal: 720, max: 1080 },

   //    video:
   //     {
   //       minAspectRatio: 1.333,
   //       minFrameRate: 30,
         // width: 300,
         // heigth: 500,
         facingMode: {exact: "environment"}
     }
  };
//   const constraints = {
//     audio:false,
//     video: {
//       width: {
//         min: 1280,
//         ideal: canvas.width,
//         max: 2560,
//       },
//       height: {
//         min: 720,
//         ideal: canvas.width,
//         max: 1440
//       },
//       facingMode: {
// //Use the back camera
//       exact: 'environment',
//       // width: 1280,
//       // heigth: 720
//     }
//     }
//   };
  // use front face camera
  let environmentCamera = true;

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


    // if(cancelled == true){
    //   screenshotsContainer.removeChild(img);
    //   console.log('cancelled')
    // }
    const img = document.createElement("img");
    canvas.getContext("2d").drawImage(video, 0, 0);
    img.src = canvas.toDataURL("image/png");


    // screenshotsContainer.style.width = '90%'
    // screenshotsContainer.style.height = '80%'



    // document.getElementById('btnPlay').style.display = 'initial'
    // document.getElementById('btnPause').style.display = 'initial'
    // document.getElementById('btnPlay').style.display = 'initial'
    setTimeout(function(){


      // canvas.width = '300px'
      // canvas.height = '500px'
      // document.getElementById('video').style.display = 'none'
      stopVideoStream()
      // video.width = '0px'
      // video.height = '0px'
      // canvas.width = '0px'
      // canvas.height = '0px'

      document.getElementById('goBackCamera').style.display = 'none'
      document.getElementById('btnChangeCamera').style.display = 'none'
      document.getElementById('btnScreenshot').style.display = 'none'
      document.getElementById('video').style.display = 'none'
            // document.getElementById('screenshotsImage').src = img.src
      document.getElementById('screenshots').style.display = 'initial'
      // document.getElementById('screenshots').style.width = '100%'
      // document.getElementById('screenshots').style.height = '100%'
      // document.getElementById('screenshots').style.backgroundColor = 'yellow'
      $('#screenshots').empty() // this is to clear the cancelled screenshots

      // screenshotsContainer.width = '300px'
      // screenshotsContainer.height = '500px'
      img.style.width = '100%'
      img.style.height = 'auto'
      screenshotsContainer.prepend(img);
      img.style.marginTop = '0px'
      img.style.left = '50%'


      document.getElementById('btnConfirmPhoto').style.display = 'initial'
      document.getElementById('btnCancelPhoto').style.display = 'initial'
      // document.getElementById('canvas').style.display = 'initial'


    },500)
    photoAccepted = img
return photoAccepted
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

  //     console.log(screenshotsContainer.innerHTML)
  // screenshotsContainer.innerHTML=''
  // document.getElementById('screenshots').empty()
     document.getElementById('camera').click()


    })
  //cancel photo
  goBackCamera.addEventListener("click", function () {
    document.getElementById('cameraDiv').style.display = 'none'
    document.getElementById('video').style.display = 'none'
    // document.getElementById('canvas').style.display = 'none'
    document.getElementById('screenshots').style.display = 'none'

    document.getElementById('goBackCamera').style.display = 'none'
    document.getElementById('btnScreenshot').style.display = 'none'
    document.getElementById('btnChangeCamera').style.display = 'none';
    // document.getElementById('btnConfirmPhoto').style.display = 'none'
    // document.getElementById('btnCancelPhoto').style.display = 'none'

    document.getElementById("map").style.height = "100%";
    document.getElementById('camera').style.display = 'initial'
    document.getElementById('screenshot').style.display = 'initial'
    document.getElementById('showAreaAcres').style.display = 'initial'


    photoAccepted = null
    $('#screenshots').empty() // this is to clear the cancelled screenshots
    attachPhoto = true

    return photoAccepted && attachPhoto
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
    document.getElementById('showAreaAcres').style.display = 'initial'

    // document.getElementById('screenshot').style.opactiy = '0.3'
    document.getElementById('screenshot').disabled = true
    document.getElementById('screenshot').style.borderWidth = '0px'
    document.getElementById('camera').style.borderWidth = '2px'

    // document.getElementById('screenshot').style.opacity = '0.2'

    // document.getElementById('camera').style.backgroundColor = 'green'

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
            $('#screenshots').empty() // this is to clear the cancelled screenshots

            return testBlob && filesArray
         });

    // console.log(photoAccepted)
    // console.log(photoAccepted.src)
    attachPhoto = true
    // imgSrc = photoAccepted.src
    // console.log(imgSrc)
    // startCheckingText()
    // clearInterval(refreshPopup)
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
  if(screenshotOn == true){

    // document.getElementById('camera').style.opactiy = '1'
    // document.getElementById('camera').style.borderColor = 'black'
    // document.getElementById('screenshot').style.backgroundColor = '#C6C6C5'
    // document.getElementById('screenshot').style.borderWidth = '0px'
    document.getElementById('camera').disabled = false
    document.getElementById('screenshot').style.borderWidth = '0px'
    document.getElementById('camera').style.borderWidth = '0px'
    // document.getElementById('camera').style.backgroundColor = '#C6C6C5'


    screenshotOn = false
    console.log(screenshotOn)


  }else{
    // console.log(screenshotOn)
    document.getElementById('screenshot').style.borderWidth = '2px'
    document.getElementById('camera').style.borderWidth = '0px'

    // document.getElementById('screenshot').style.borderColor = 'black'
    // document.getElementById('camera').style.borderColor = '#7c7c7c'
    // document.getElementById('camera').style.opactiy = '0.3'
    document.getElementById('camera').disabled = true
    // document.getElementById('camera').style.backgroundColor = 'black'
    // document.getElementById('camera').style.opacity = '0.3'


    screenshotOn = true
    console.log(screenshotOn)
    myLayer_Button.button.style.display = 'none';
    filter_Button.button.style.display = 'none';
    filterLocalStorage_Button.button.style.display = 'none';
    gps_Button.button.style.display = 'none';

    planet_Button.button.style.display = 'none';
    googleSat_Button.button.style.display = 'none';
    osm_Button.button.style.display = 'none';
    document.getElementById("showAreaAcres").style.display = 'none'


//we adding this because in order to show in the canvas, this need to be a map element. We could do 'body' instead of 'map', but performance...
    document.getElementById("showAreaAcresScreenshot").innerHTML = document.getElementById("showAreaAcres").innerHTML
    document.getElementById("showAreaAcresScreenshot").style.display = 'initial'
    // console.log('testtttttttttttt')
    setTimeout(function(){  // to make the button transition immediate, and also disapear easybuttons for ms

    const img = document.createElement("img");
    //get transform value
    // var mapNodes = ".leaflet-map-pane";
    // var transform = $(mapNodes).css('transform');
    // console.log(transform)
    // var comp = transform.split(',');
    // // var transform = $(".gm-style>div:first>div:first>div:last>div").css("transform")
    // // var comp = transform.split(",") //split up the transform matrix
    // var mapleft = parseFloat(comp[4]) //get left value
    // var maptop = parseFloat(comp[5])  //get top value
    // $(".leaflet-map-pane").css({ //get the map container. not sure if stable
    //   "transform": "none",
    //   "left": mapleft,
    //   "top": maptop,
    // })
    html2canvas(document.getElementById("map"), {
      allowTaint: true,
      useCORS: true,
      imageTimeout:20000,
      removeContainer:true,
    //   ignoreElements: (node) => {
    //   return node.nodeName === 'IFRAME';
    // }
      // onrendered:function(canvas){
      //   $(".leaflet-map-pane").css({
      //        left: 0,
      //        top: 0,
      //        "transform": transform
      //    })
      // },
      // proxy: 'https://mt.google.com/vt/'
    })
    .then(function (canvas) {
      // It will return a canvas element
      // let image = canvas.toDataURL("image/png", 0.5);
      canvas.toBlob(function(blob){
        url = URL.createObjectURL(blob);

        // console.log('screenshot', blob)
        // console.log('url',url)
        testBlob = blob
        // console.log(testBlob.type)
        var nameFile = 'screenshot.png'
        var file = new File([testBlob],nameFile, {type: testBlob.type });
        filesArrayScreenshot = [file];
        // console.log(file)
        // console.log(filesArrayScreenshot)

      })  // this is to define the quality of the image screenshot (keep in mind the size due to data bundles)
      // console.log(image)
    })
    .catch((e) => {
      // Handle errors
      console.log(e);
    });
    document.getElementById("showAreaAcresScreenshot").style.display = 'none'

      myLayer_Button.button.style.display = 'initial';
      filter_Button.button.style.display = 'initial';
      filterLocalStorage_Button.button.style.display = 'initial';
      gps_Button.button.style.display = 'initial';

      planet_Button.button.style.display = 'initial';
      googleSat_Button.button.style.display = 'initial';
      osm_Button.button.style.display = 'initial';
      document.getElementById("showAreaAcres").style.display = 'initial'

    },1200)
  }


  return filesArrayScreenshot && screenshotOn
})
