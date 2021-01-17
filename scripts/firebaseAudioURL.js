
// var files = [];
// var filesLength;
// var storage;
// var percentage
// var finalPercentage = []
// var finalUrlAudio

/////sendFirebase script that will be fire when 'Download' is clicked.
if (isIOS == false) {
    document.getElementById("sendFirebase").onclick = function(e) {
      console.log('firebase clicked')

        
        //Loops through all the selected files . To send also the geojson file to firebase, then activate this line !!!!!!!
        for (let i = 1; i < filesLength; i++) { //there will be only 2 files
            //create a storage reference

            storage = firebase.storage().ref(files[i].name);
            //upload file
            var upload = storage.put(files[i]);
            //update progress bar
            var completed;
            upload.on(
                "state_changed",
                function progress(snapshot) {
                    percentage =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    document.getElementById("progress").value = percentage;
                    console.log(percentage)
                    finalPercentage[i] = percentage
                    console.log(percentage)

                    return finalPercentage && percentage
                },
            );
        }

            //to send also the geojson file to firebase, then activate this line !!!!!!!!!!

            if (recordedBlobs != null) {
              console.log('recordedblobs not null')

              var checkPercentage = setInterval(function(){ // geturl is only fired when percentage is 100
                if(percentage == 100){
                  clearInterval(checkPercentage)
                  //setTimeout(function() {
                    firebase.storage().ref(files[1].name).getDownloadURL().then(function(url) {
                        var checkIfAudiotransmitted = setInterval(function(){ //setData() function to send to DB is only fired when the url from firebase is ready
                          if(url != null){
                              finalUrlAudio = url;
                              clearInterval(checkIfAudiotransmitted)
                              var audioLinkText = ' 🔊 AUDIO';
                              // var clickableFinalUrlAudio = audioLinkText.link(finalUrlAudio)
                              var clickableFinalUrlAudio = finalUrlAudio
                              if(editButtonClicked == false){
                                audioAvailable = clickableFinalUrlAudio;
                              }else{
                                audioComment = clickableFinalUrlAudio;
                              }
                               console.log('set data called from firebase')

                              setData() //post request when url is available
                            return finalUrlAudio
                          }
                        },50)
                      })
                }
              },50)
            }
    };
}
