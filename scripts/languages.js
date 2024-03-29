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
        document.getElementById('asktheteam').innerHTML = 'Ask us anything'  
        document.getElementById('kaptalitetutorial').innerHTML = 'Watch tutorial'  
        document.getElementById('upload').innerHTML = '</br>Upload map'  
        document.getElementById('inputtextlabel').innerHTML = ' What have you mapped in this WhatsApp group? '  
        document.getElementById('confirminputtext').innerHTML = 'Confirm'  
        document.getElementById('datasovmessage').innerHTML = ' We want the world </br> to see this map </br> and be remunerated '  

        document.getElementById('textswitch1').innerHTML = ' WITH the support of WCL team'  
        document.getElementById('textswitch2').innerHTML = 'WITHOUT support'  
        document.getElementById('shareYourImageMap').innerHTML = 'Share your map IMAGE in your social network'  
        document.getElementById('shareYourMapdata').innerHTML = 'Download your map DATA'  
        document.getElementById('confirmDataSubmision').innerHTML = 'Confirm'  
        document.getElementById('datasovcontent').innerHTML = 'Data sovereingty explanation... </br> centralisation </br> decentralisation...</p>'  

       
    }else if(language == 'es' || localStorage.getItem('language') == 'es' ){
        document.getElementById('languages').value = 'es'
        document.getElementById('asktheteam').innerHTML = 'Pregúntanos cualquier cosa'  
        document.getElementById('kaptalitetutorial').innerHTML = 'Ver tutorial'  
        document.getElementById('upload').innerHTML = '</br>Subir mapa'   ///////////////////
        document.getElementById('inputtextlabel').innerHTML = ' ¿Qué has mapeado en este grupo de WhatsApp? '  
        document.getElementById('confirminputtext').innerHTML = 'Confirmar'  
        document.getElementById('datasovmessage').innerHTML = ' Queremos que el mundo </br> vea este mapa </br> y sea remunerado '  
    
        document.getElementById('textswitch1').innerHTML = ' CON el apoyo del equipo WCL'  
        document.getElementById('textswitch2').innerHTML = 'SIN apoyo   '   ///////////////////
        document.getElementById('shareYourImageMap').innerHTML = 'Comparte la IMAGEN de tu mapa en tu red social'  
        document.getElementById('shareYourMapdata').innerHTML = 'Descarga los DATOS de tu mapa'  
        document.getElementById('confirmDataSubmision').innerHTML = 'Confirmar'  
        document.getElementById('datasovcontent').innerHTML = 'Explicación de soberanía de datos... </br> centralización </br> descentralización...</p>'  

    }else if(language == 'fr'|| localStorage.getItem('language') == 'fr' ){
        document.getElementById('languages').value = 'fr'

        document.getElementById('asktheteam').innerHTML = 'Demandez-nous n’importe quoi'  
        document.getElementById('kaptalitetutorial').innerHTML = 'Regarder le tutoriel'  
        document.getElementById('upload').innerHTML = '</br>Télécharger la carte'  
        document.getElementById('inputtextlabel').innerHTML = ' Qu’avez-vous cartographié dans ce groupe WhatsApp? '  
        document.getElementById('confirminputtext').innerHTML = 'Confirmer'  
        document.getElementById('datasovmessage').innerHTML = ' Nous voulons que le monde </br> voie cette carte </br> et soit rémunéré '  
    
        document.getElementById('textswitch1').innerHTML = ' AVEC le soutien de l’équipe WCL'  
        document.getElementById('textswitch2').innerHTML = 'SANS soutien'  
        document.getElementById('shareYourImageMap').innerHTML = 'Partagez l’IMAGE de votre carte sur votre réseau social'  
        document.getElementById('shareYourMapdata').innerHTML = 'Téléchargez les DONNÉES de votre carte'  
        document.getElementById('confirmDataSubmision').innerHTML = 'Confirmer'  
        document.getElementById('datasovcontent').innerHTML = 'Explication de la souveraineté des données... </br> centralisation </br> décentralisation...</p>'  

    }else if(language == 'am' || localStorage.getItem('language') == 'am' ){
        document.getElementById('languages').value = 'am'

        document.getElementById('asktheteam').innerHTML = 'ማንኛውንም ጥያቄ ይጠይቁን'  
        document.getElementById('kaptalitetutorial').innerHTML = 'መማሪያውን ይመልከቱ'  
        document.getElementById('upload').innerHTML = '</br>ካርታ ስር አስገባ'  
        document.getElementById('inputtextlabel').innerHTML = ' በዚህ ዋትስአፕ ቡድን ምን አድርጋችኋል? '  
        document.getElementById('confirminputtext').innerHTML = 'አረጋግጥ'  
        document.getElementById('datasovmessage').innerHTML = ' ይህንን ካርታ ዓለም ሁሉ እንዲያይ </br> እና የተከፈለበት እንዲሆን እንፈልጋለን '  
    
        document.getElementById('textswitch1').innerHTML = ' በWCL ቡድኑ ድጋፍ ጋር'  
        document.getElementById('textswitch2').innerHTML = 'ድጋፍ በሌለበት'  
        document.getElementById('shareYourImageMap').innerHTML = 'ካርታዎትን ምስል በማኅበረሰብ የእርስዎን እይታ ያጋሩ'  
        document.getElementById('shareYourMapdata').innerHTML = 'ካርታዎትን ውሂብ ያውርዱ'  
        document.getElementById('confirmDataSubmision').innerHTML = 'አረጋግጥ'  
        document.getElementById('datasovcontent').innerHTML = 'የውሂብ ኩነኔ ማብራሪያ... </br> ማእከላዊ እንደሆነ </br> ተንቀሳቃሽ...</p>'  
    }
  };