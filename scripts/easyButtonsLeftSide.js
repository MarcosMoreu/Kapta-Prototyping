////////////////////////////////   GNSS  //////////////////////////////////////
var gpsIcon = L.icon({
    iconUrl: 'images/man.png',
    //  shadowUrl: 'leaf-shadow.png',

    iconSize: [30, 30], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// add location via browser geolocation
var currentLocation = []; // variable created to allow the user recenter the map
var accuracy = 0
var markerAdded = false; // var to avoid multiple markers

function findBuffer(position) {
    //  L.marker([lat, lng],{icon:gpsIcon}).removeFrom(map);
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    accuracy = position.coords.accuracy;
    //console.log(accuracy)
    if (markerAdded == false) {
        // L.marker([lat, lng],{icon:gpsIcon}).addTo(map);
        markerAdded = true;
    }
    currentLocation = [lat, lng];

    return currentLocation & markerAdded & accuracy;
}

//////////////////////////////////////activate gps///////////////////////////////////////////

//console.log(currentLocation[0])

var locationFound = false;
var audioRecorded = false;
var circleGT250
var circleLT250
var circleLT250Added = false
var circleGT250Added = false


var refreshGPSbutton = setInterval(function() { ///////////////////////////////////////// function to keep searching for gps position
  if(localStorage.getItem('pwCorrect')){

    try {
        navigator.geolocation.watchPosition(findBuffer);
    } catch (err) {
        currentLocation == null;
    }
    //if location found, then set button color, and create circle or add marker if <50m
    if (currentLocation[0] != null) {
        localStorage.setItem('lastPositionStoredLOCALLY', currentLocation)
        locationFound = true
        //once the position has been found, we stop checking if the user deactivates again (the position will be recorded anyway)
        if (accuracy <= 50) {

            gps_Button.button.style.backgroundColor = 'green';
            //to change the icon of the Easybutton based on accuracy... (first gif then static image)

            if (isIOS == true) {
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" width=40px; height=40px; style="margin-left:-5px" > '
            }else{
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" width=40px; height=40px; style="margin-left:-1px" > '
            }

            var gpsIconIntermitent = setTimeout(function() {
              if (isIOS == true) {
                document.getElementById('gps').innerHTML = '<img src="images/gps.png" width=40px; height=40px; style="margin-left:-5px" > '
              }else{
                document.getElementById('gps').innerHTML = '<img src="images/gps.png" width=40px; height=40px; style="margin-left:-1px" > '
              }
            },6400) // time required for three repetitions of the gif

            clearInterval(refreshGPSbutton) //stop searching once accuracy <50
            L.marker(currentLocation, {
                icon: gpsIcon,
                draggable:false
            }).addTo(map);

        } else if (accuracy > 50 && accuracy <= 250) {

            gps_Button.button.style.backgroundColor = 'yellow';
            if (isIOS == true) {
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" width=40px; height=40px; style="margin-left:-5px" > '
            }else{
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" width=40px; height=40px; style="margin-left:-1px" > '
            }            //if accuracy >50, keep searching
            try {
                navigator.geolocation.watchPosition(findBuffer);
            } catch (err) {
                currentLocation == null;
            }
            if (circleLT250Added == false) {
                //set circle based on radious-accuracy
                circleLT250 = L.circle(currentLocation, {
                    color: "#ffffff00",
                    fillColor: "yellow",
                    fillOpacity: 0.3,
                    radius: accuracy
                }) //.addTo(map);
                //remove circle after 10 seconds
                // setTimeout(function(){ circleLT250.removeFrom(map) }, 10000);
                circleLT250Added = true
            }

        } else if (accuracy > 250) {

            gps_Button.button.style.backgroundColor = 'orange';
            if (isIOS == true) {
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" width=40px; height=40px; style="margin-left:-5px" > '
            }else{
              document.getElementById('gps').innerHTML = '<img src="images/gpsSearching.gif" width=40px; height=40px; style="margin-left:-1px" > '
            }
            try {
                navigator.geolocation.watchPosition(findBuffer);
                ////console.log(currentLocation[0])
            } catch (err) {
                currentLocation == null;
            }
            if (circleGT250Added == false) {
                circleGT250 = L.circle(currentLocation, {
                    color: "#ffffff00",
                    fillColor: "orange",
                    fillOpacity: 0.3,
                    radius: accuracy
                }) //.addTo(map);
                //   setTimeout(function(){ circleGT250.removeFrom(map) }, 10000);
                circleGT250Added = true
            }
        }
    } else {
        gps_Button.button.style.backgroundColor = 'red';
        if (isIOS == true) {
          document.getElementById('gps').innerHTML = '<img src="images/gpsOff.png" width=40px; height=40px; style="margin-left:-5px" > '
        }else{
          document.getElementById('gps').innerHTML = '<img src="images/gpsOff.png" width=40px; height=40px; style="margin-left:-1px" > '
        }
        try {
            navigator.geolocation.watchPosition(findBuffer);
        } catch (err) {
            currentLocation == null;
        }
    }
    return currentLocation & circleLT250Added & circleGT250Added & circleLT250 & circleGT250;
  }
}, 1000)


//console.log(currentLocation[0])
var gps_Button = L.easyButton({
    id: 'gps',
    position: 'topleft',
    states: [{
        icon: iconGPS,
        stateName: 'check-mark',
        onClick: function(btn, map) {
            try {
                navigator.geolocation.watchPosition(findBuffer);
            } catch (err) {
                currentLocation == null;
            }
            if (currentLocation[0] != null) {

              googleSat_Button.removeFrom(map);
              osm_Button.removeFrom(map);
              planet_Button.removeFrom(map);
              myLayer_Button.removeFrom(map);
              filter_Button.removeFrom(map);
              try{
                miniMap.addTo(map)
              }catch(e){}

                setTimeout(function(){
                  try{
                    miniMap.remove()
                  }catch(e){}
                  osm_Button.addTo(map);
                  googleSat_Button.removeFrom(map);
                  planet_Button.removeFrom(map);
                  myLayer_Button.addTo(map);
                  filter_Button.addTo(map);
                },2000)


                if (accuracy <= 50) {
                  //  gps_Button.button.style.backgroundColor = 'green';
                  //  gps_Button.button.src = 'images/gpsSearching.gif';
                    map.setView(currentLocation, 15);
                    //console.log(currentLocation)

                } else if (accuracy > 50 && accuracy <= 250) {
                  //  gps_Button.button.style.backgroundColor = 'yellow';
                //    gps_Button.button.src = 'images/gpsSearching.gif';

                    //set view based on circle radius
                    circleLT250.addTo(map);
                    map.fitBounds(circleLT250.getBounds());
                    setTimeout(function() {
                        circleLT250.removeFrom(map);
                    }, 200);

                } else if (accuracy > 250) {
                  //  gps_Button.button.style.backgroundColor = 'orange';
                  //  gps_Button.button.src = 'images/gpsSearching.gif';

                    //  setTimeout(function(){circleGT250.addTo(map)}, 200);
                    circleGT250.addTo(map); //the layer must be added before the getbounds is fired, then the layer is removed
                    map.fitBounds(circleGT250.getBounds());
                    setTimeout(function() {
                        circleGT250.removeFrom(map);
                    }, 200);
                }
            }
            if (currentLocation[0] == null) {
                //gps_Button.button.style.backgroundColor = 'red';
                document.getElementById('gps').src = 'images/gpsOff.png'
                try{
                  navigator.geolocation.watchPosition(findBuffer);
                }catch(e){}


            }
        }
    }]
});

gps_Button.button.style.width = '50px';
gps_Button.button.style.height = '50px';
gps_Button.button.style.transitionDuration = '.3s';
gps_Button.button.style.backgroundColor = 'white';

gps_Button.addTo(map);

var rose = L.control.rose('rose', {
    position: 'topleft',
    icon: 'nautical',
    iSize: 'medium',
    opacity: 1
});
rose.addTo(map)

document.getElementById('rose').style.marginBottom = '5px' // to avoid extra margin, visible when offline buttons appear
// script to show the download tiles buttons
var clicksRose = 0
document.getElementById('rose').onclick = function(e){
    clicksRose += 1;
    console.log(clicksRose)
  if(clicksRose == 10){
    offlineControlGoogle.addTo(map);
    offlineControlOSM.addTo(map);
    clicksRose = 0;
  }

  return clicksRose
}
