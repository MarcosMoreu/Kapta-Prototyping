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

    // screenshotOn = true

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
          console.log(filesArrayScreenshot)
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
