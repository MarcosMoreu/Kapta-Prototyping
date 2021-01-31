////////////////////////////         audio          ///////////////////////////////
document.getElementById('noAudioIOS').onclick = function(e) {

    if (browserLanguage[0] == 'e' && browserLanguage[1] == 'n') { //english
        alert("🚧 Voice recording not yet available for iPhone,iPad or Mac.");
    }
    if (browserLanguage[0] == 'e' && browserLanguage[1] == 's') { //spanish
        alert("🚧 La grabación de voz aún no está disponible para iPhone, iPad o Mac.");
    }
    if (browserLanguage[0] == 'p' && browserLanguage[1] == 't') { //portuguese
        alert("🚧 A gravação de voz ainda não está disponível para iPhone, iPad ou Mac.");
    }
    if (browserLanguage[0] == 'f' && browserLanguage[1] == 'r') { //french
        alert("🚧 L'enregistrement vocal n'est pas encore disponible pour iPhone, iPad ou Mac.");
    }
    if (browserLanguage == 'sw') { //swahili
        alert("🚧 Kurekodi kwa sauti bado haipatikani kwa iPhone, iPad au Mac.");
    }
}

if (isIOS == false) {
    document.getElementById('enableRecording').onclick = function(e) {
        setTimeout(function() {
            document.getElementById('record').style.display = 'initial';
            document.getElementById('record').style.opacity = '1';
            document.getElementById('enableRecording').style.display = 'none';
        }, 200)
    }
}

////////////////////////////////////////////////////////classify screen, audio//////////////////////////////////////////////////////////////

//function to stop the recording after X seconds. The function is called when right after the recording is activated (i.e. when click if recording == false)
function stopAudioAutomatically() {
    if (document.getElementById('record').style.backgroundColor == 'yellow') {
        //console.log('auto activated')
        setTimeout(function() {
            if (document.getElementById('record').style.backgroundColor == 'yellow') { //condition to avoid that the button is autom clicked even
                // when the recording is stopped but was previously yellow. If after X seconds is white, should not be clicked.
                document.getElementById('record').click();
            }
        }, 30000) // 30 seconds is the appropriate time?
    }
}

// var audioButtonClicked = false
document.getElementById('record').onclick = function(e) {
    audioButtonClicked = true
    if (recording == false) {
        document.getElementById('voiceGif').play()
        this.style.backgroundColor = 'yellow';
        this.style.borderColor = 'yellow';
        console.log('activated play')
        document.getElementById('activatePlay').style.display = 'none';
        document.getElementById('storeAudio').style.opacity = '0.1';
        document.getElementById('emoji').style.display = 'none';
        document.getElementById('voice').style.display = 'initial';
        document.getElementById('voice').style.opacity = '1';
        //script to identify the screen width to maintain the width of the voiceGif element
        var width = window.innerWidth
        //console.log(width)
        width = width - 190;
        width = width + 'px'
        //console.log(width)

        stopAudioAutomatically();
    }
    if (recording == true) {

        audioRecorded = true;
        //to activate share-download button when audio is recorded
        document.getElementById("share-download").style.opacity = "1";
        document.getElementById("share-download").disabled = false;
        console.log('stopped play')

        this.style.backgroundColor = 'white';
        document.getElementById('voiceGif').pause()

        document.getElementById('activatePlay').style.display = 'initial';
        document.getElementById('activatePlay').style.opacity = '1';
        document.getElementById('storeAudio').style.opacity = '1';
        document.getElementById('emoji').style.display = 'initial';
        document.getElementById('voice').style.display = 'none';
        document.getElementById('voice').style.opacity = '0';

        audioStoppedManually = true
    }

    document.getElementById('gum').style.display = 'none';
    document.getElementById('recorded').style.display = 'none';
    document.getElementById('echoCancellation').style.display = 'none';
    return audioRecorded && audioButtonClicked
}

document.getElementById('activatePlay').onclick = function(e) {
    document.getElementById("play").click(); //added so no need to click button twice
    document.getElementById('activatePlay').style.background = 'grey'
    setTimeout(function() {
        document.getElementById('activatePlay').style.background = 'white'
    }, 500)
}
