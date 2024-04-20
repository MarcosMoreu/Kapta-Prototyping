var language
document.getElementById('languages').addEventListener('change', function() {
    language = this.value;
    console.log(`Language selected: ${language}`);
    // Here, you can add code to change the website language
    localStorage.setItem('language', language);
    changeLanguage();
    return language;
  });
  var changeLanguage = function() {
    console.log('changeLanguage function called')
    if(language == 'en' || localStorage.getItem('language') == 'en' || localStorage.getItem('language') == null){
        // document.getElementById('KaptaAdvanced').innerHTML = '🚧 Under dev. 🚧'
        // document.getElementById('kaptalitetutorial').innerHTML = '🚧 Under dev.'
        document.getElementById('languages').value = 'en'
        document.getElementById('chatmaploadinggif').innerHTML = 'Converting chat to map...</br></br></br>' + '<img src="images/checkingPw.gif"  alt="..." loading="lazy" style="width:50px ; height:50px">'  
        document.getElementById('asktheteam').innerHTML = 'Ask us anything'  
        document.getElementById('kaptalitetutorial').innerHTML = 'Watch tutorial'  
        document.getElementById('maprequests').innerHTML = 'Map Requests'  

        document.getElementById('upload').innerHTML = '</br>Upload map'  
        document.getElementById('inputtopiclabel').innerHTML = ' What have you mapped in this WhatsApp group? '  
        document.getElementById('inputgoallabel').innerHTML = ' What do you want to achieve with this map? '  

        // document.getElementById('confirminputtext').innerHTML = 'Confirm'  
        document.getElementById('datasovmessage').innerHTML = ' Do you allow the Kapta team to use your map to support your community? '  

        document.getElementById('textswitch1').innerHTML = ' Yes'  
        document.getElementById('textswitch2').innerHTML = 'No'  
        document.getElementById('shareYourImageMap').innerHTML = 'Share this map IMAGE in your social network'  
        document.getElementById('shareYourMapdata').innerHTML = 'Download this map DATA'  
        document.getElementById('confirmDataSubmision').innerHTML = 'Confirm'  
        document.getElementById('datasovcontent').innerHTML = 'Data sovereingty explanation... </br> centralisation </br> decentralisation...</p>'  
        document.getElementById('maprequestscontent').innerHTML = '1-Population</p>'  

       
    }else if(language == 'es' || localStorage.getItem('language') == 'es' ){
    
        document.getElementById('languages').value = 'es';
        document.getElementById('chatmaploadinggif').innerHTML = 'Convirtiendo el chat en mapa...</br></br></br>' + '<img src="images/checkingPw.gif" alt="..." loading="lazy" style="width:50px; height:50px">';
        document.getElementById('asktheteam').innerHTML = 'Pregúntanos cualquier cosa';
        document.getElementById('kaptalitetutorial').innerHTML = 'Ver tutorial';
        document.getElementById('maprequests').innerHTML = 'Solicitudes de mapa';

        document.getElementById('upload').innerHTML = '</br>Subir mapa';
        document.getElementById('inputtopiclabel').innerHTML = ' ¿Qué has mapeado en este grupo de WhatsApp? ';
        document.getElementById('inputgoallabel').innerHTML = ' ¿Qué deseas lograr con este mapa? ';

        document.getElementById('datasovmessage').innerHTML = ' ¿Permites que el equipo de Kapta use tu mapa para apoyar a tu comunidad? ';

        document.getElementById('textswitch1').innerHTML = ' Sí';
        document.getElementById('textswitch2').innerHTML = 'No';
        document.getElementById('shareYourImageMap').innerHTML = 'Comparte la IMAGEN de este mapa en tus redes sociales';
        document.getElementById('shareYourMapdata').innerHTML = 'Descarga los DATOS de este mapa';
        document.getElementById('confirmDataSubmision').innerHTML = 'Confirmar';
        document.getElementById('datasovcontent').innerHTML = 'Explicación de soberanía de datos... </br> centralización </br> descentralización...</p>';
        document.getElementById('maprequestscontent').innerHTML = '1-Población</p>';


    }else if(language == 'fr'|| localStorage.getItem('language') == 'fr' ){
        document.getElementById('languages').value = 'en';
        document.getElementById('chatmaploadinggif').innerHTML = 'Conversion du chat en carte...</br></br></br>' + '<img src="images/checkingPw.gif" alt="..." loading="lazy" style="width:50px; height:50px">';
        document.getElementById('asktheteam').innerHTML = 'Demandez-nous n`importe quoi';
        document.getElementById('kaptalitetutorial').innerHTML = 'Regarder le tutoriel';
        document.getElementById('maprequests').innerHTML = 'Demandes de cartes';
        
        document.getElementById('upload').innerHTML = '</br>Télécharger la carte';
        document.getElementById('inputtopiclabel').innerHTML = ' Qu`avez-vous cartographié dans ce groupe WhatsApp? ';
        document.getElementById('inputgoallabel').innerHTML = ' Que souhaitez-vous accomplir avec cette carte? ';
        
        // document.getElementById('confirminputtext').innerHTML = 'Confirmer';
        document.getElementById('datasovmessage').innerHTML = ' Autorisez-vous l`équipe de Kapta à utiliser votre carte pour soutenir votre communauté? ';
        
        document.getElementById('textswitch1').innerHTML = ' Oui';
        document.getElementById('textswitch2').innerHTML = 'Non';
        document.getElementById('shareYourImageMap').innerHTML = 'Partagez cette IMAGE de carte sur vos réseaux sociaux';
        document.getElementById('shareYourMapdata').innerHTML = 'Téléchargez les DONNÉES de cette carte';
        document.getElementById('confirmDataSubmision').innerHTML = 'Confirmer';
        document.getElementById('datasovcontent').innerHTML = 'Explication de la souveraineté des données... </br> centralisation </br> décentralisation...</p>';
        document.getElementById('maprequestscontent').innerHTML = '1-Population</p>';
        

    }else if(language == 'am' || localStorage.getItem('language') == 'am' ){
        document.getElementById('languages').value = 'en';
        document.getElementById('chatmaploadinggif').innerHTML = 'ቻትን ወደ ካርታ ለመቀየር...</br></br></br>' + '<img src="images/checkingPw.gif" alt="..." loading="lazy" style="width:50px; height:50px">';
        document.getElementById('asktheteam').innerHTML = 'ምንም ጥያቄ ጠይቁን';
        document.getElementById('kaptalitetutorial').innerHTML = 'መማሪያን እይ';
        document.getElementById('maprequests').innerHTML = 'ካርታ ጥያቄዎች';
        
        document.getElementById('upload').innerHTML = '</br>ካርታ ስቀል';
        document.getElementById('inputtopiclabel').innerHTML = ' በዚህ ዋትስአፕ ቡድን ምን አሳፍረክ? ';
        document.getElementById('inputgoallabel').innerHTML = ' በዚህ ካርታ ምን ማንኛት ነገር ልታከናውን ትፈልጋለህ? ';
        
        // document.getElementById('confirminputtext').innerHTML = 'አረጋግጥ';
        document.getElementById('datasovmessage').innerHTML = ' በኮምዩኒቲዎ ማገዶ እንዲረዳዎ ካፕታ ቡድን ካርታዎን ማጠቃለያን ትፈቅድለታለህ? ';
        
        document.getElementById('textswitch1').innerHTML = ' አዎን';
        document.getElementById('textswitch2').innerHTML = 'አይደለም';
        document.getElementById('shareYourImageMap').innerHTML = 'ይህን ካርታ ምስል በማንኛውም ማኅበረሰብ መረብ ላይ አጋራ';
        document.getElementById('shareYourMapdata').innerHTML = 'ይህን ካርታ ውሂብ አውርድ';
        document.getElementById('confirmDataSubmision').innerHTML = 'አረጋግጥ';
        document.getElementById('datasovcontent').innerHTML = 'ውሂብ ስውርነት ማብራሪያ...</br> ማእከላዊነት </br> ተከናወን...</p>';
        document.getElementById('maprequestscontent').innerHTML = '1-የህዝብ ቁጥር</p>';
        

    }
  };
  changeLanguage()
