var dropDownOpen = false;
var isOnline = navigator.onLine
var browserLanguage = navigator.language
var languageSelected

// document.getElementById('english').src = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/png100px/ad.png"
//console.(screen.height)
//console.('innerheight',window.innerHeight)

document.getElementById('startMapping').onclick = function(e){
  document.getElementById("startMapping").style.animation = "initial";


   setTimeout(function(){
    //  document.getElementById("startMapping").style.animation = "none";
    // document.getElementById("english").style.display = "none";
    // document.getElementById("swahili").style.display = "none";
    // document.getElementById("other1").style.display = "none";
    // document.getElementById("other1UnderDev").style.display = "none";
    // document.getElementById("AlertTranslate").style.display = "none";
     location.href='../';
   },100)
  }
document.getElementById('dropDown').onclick = function(e){

    if(dropDownOpen == false){
      document.getElementById('infoButton').style.display = "initial";
      document.getElementById('iconsButton').style.display = "initial";

      if(isOnline == true){
        document.getElementById('cutomiseButton').style.display = "initial";
        // document.getElementById('iconsButton').style.display = "initial";

      }
      document.getElementById('dropDown').style.backgroundColor = 'grey';
      document.getElementById('imageDropDown').src = '../images/burgerBlack.png';
      dropDownOpen = true
    }else{
      document.getElementById('infoButton').style.display = "none";
      document.getElementById('cutomiseButton').style.display = "none";
      document.getElementById('iconsButton').style.display = "none";
      document.getElementById('dropDown').style.backgroundColor = 'black';
      document.getElementById('imageDropDown').src = '../images/burger.png';

      dropDownOpen = false
    }

    return dropDownOpen
  }
var cognitoFormLoaded = false

document.getElementById('cutomiseButton').onclick = function(e){


    setTimeout(function(){
      document.getElementById("infoGoBackButton").style.display = "initial";
      document.getElementById('TextRequest').style.display = 'initial'
      // document.getElementById("cognitoForm").style.display = "initial";
      document.body.style.overflow = 'visible';
      document.getElementById('dropDown').style.display = "none";
      document.getElementById('cutomiseButton').style.display = "none";
     document.getElementById('infoButton').style.display = "none";
     document.getElementById("iconsButton").style.display = "none";
     document.getElementById('cutomiseButton').style.display = "none";
     document.getElementById("youtube").style.display = "none";
     document.getElementById("startMapping").style.display = "none";

     document.getElementById("english").style.display = "none";
     document.getElementById("swahili").style.display = "none";
     document.getElementById("other1").style.display = "none";
     if(cognitoFormLoaded == false){
       document.getElementById("loadingCognito").style.display = "initial";
     }

   },100)
         Cognito.load("forms", { id: "2" })
         cognitoFormLoaded = true

    // document.getElementById("youtubeImage").src = '../images/checkingPw.gif'
  //   setTimeout(function(){
  //     if(cognitoFormLoaded == false){
  //
  //       var target = document.getElementById('cognitoForm');
  //       // create an observer instance
  //       var observer = new MutationObserver(function (mutations) {
  //           mutations.forEach(function (mutation) {
  //               if (Cognito.config.isReady){
  //                   // stop observing
  //                   observer.disconnect();
  //                   cognitoFormLoaded = true
  //                  document.getElementById("loadingCognito").style.display = "none";
  //                  // document.getElementById("youtubeImage").src = '../images/youtube.png'
  //               };
  //           });
  //       });
  //
  //       // configuration of the observer:
  //       var config = { attributes: true, childList: true };
  //       // pass in the target node, as well as the observer options
  //       observer.observe(target, config);
  //       Cognito.load("forms", { id: "2" })
  //     }else{
  //       document.getElementById("loadingCognito").style.display = "none";
  //     }
  //
  // },300)
  // return cognitoFormLoaded
  setTimeout(function(){
    document.getElementById("loadingCognito").style.display = "none";
  },4000)
  return cognitoFormLoaded
}

// document.getElementById('cutomiseButton').onclick = function(e){
//     document.getElementById("youtubeImage").src = '../images/checkingPw.gif'
//     var target = document.getElementById('cognitoForm');
//     // create an observer instance
//     var observer = new MutationObserver(function (mutations) {
//         mutations.forEach(function (mutation) {
//             if (Cognito.config.isReady){
//                 // stop observing
//                 observer.disconnect();
//                 // alert('FORM LOADED!');
//                 document.getElementById("infoGoBackButton").style.display = "initial";
//                 document.getElementById("cognitoForm").style.display = "initial";
//                 document.body.style.overflow = 'visible';
//                 document.getElementById('dropDown').style.display = "none";
//                 document.getElementById('cutomiseButton').style.display = "none";
//                document.getElementById('infoButton').style.display = "none";
//                document.getElementById("iconsButton").style.display = "none";
//                document.getElementById('cutomiseButton').style.display = "none";
//                document.getElementById("youtube").style.display = "none";
//                document.getElementById("startMapping").style.display = "none";
//
//                document.getElementById("english").style.display = "none";
//                document.getElementById("swahili").style.display = "none";
//                document.getElementById("other1").style.display = "none";
//                document.getElementById("youtubeImage").src = '../images/youtube.png'
//             };
//         });
//     });
//
//     // configuration of the observer:
//     var config = { attributes: true, childList: true };
//     // pass in the target node, as well as the observer options
//     observer.observe(target, config);
//     Cognito.load("forms", { id: "2" })
//
// }

document.getElementById('infoButton').onclick = function(e){
   setTimeout(function(){
     document.getElementById("infoGoBackButton").style.display = "initial";
     document.getElementById("infoCont").style.display = "initial";

     document.getElementById('dropDown').style.display = "none";
     document.getElementById('cutomiseButton').style.display = "none";
    document.getElementById("youtube").style.display = "none";
    document.getElementById("startMapping").style.display = "none";
    document.getElementById("infoButton").style.display = "none";
    document.getElementById("iconsButton").style.display = "none";

    //document.getElementById("spanish").style.display = "none";

    document.getElementById("english").style.display = "none";
    document.getElementById("swahili").style.display = "none";

    //document.getElementById("french").style.display = "none";

    //document.getElementById("portuguese").style.display = "none";

    //document.getElementById("swahili").style.display = "none";

    //document.getElementById("juhoansi").style.display = "none";

    document.getElementById("other1").style.display = "none";

    // document.getElementById("textEnglish").style.display = "none";
    //document.getElementById("textSpanish").style.display = "none";

    //document.getElementById("textFrench").style.display = "none";

    //document.getElementById("textPortuguese").style.display = "none";

    //document.getElementById("textSwahili").style.display = "none";

    //document.getElementById("textJuhoansi").style.display = "none";


   },100)
  }
document.getElementById('iconsButton').onclick = function(e){
   setTimeout(function(){
     document.getElementById("infoGoBackButton").style.display = "initial";
     document.getElementById("iconsCont").style.display = "initial";

     document.getElementById('dropDown').style.display = "none";
     document.getElementById('cutomiseButton').style.display = "none";
    document.getElementById("youtube").style.display = "none";
    document.getElementById("startMapping").style.display = "none";
    document.getElementById("infoButton").style.display = "none";
    document.getElementById("iconsButton").style.display = "none";

    //document.getElementById("spanish").style.display = "none";

    document.getElementById("english").style.display = "none";
    document.getElementById("swahili").style.display = "none";

    //document.getElementById("french").style.display = "none";

    //document.getElementById("portuguese").style.display = "none";

    //document.getElementById("swahili").style.display = "none";

    //document.getElementById("juhoansi").style.display = "none";

    document.getElementById("other1").style.display = "none";

    // document.getElementById("textEnglish").style.display = "none";
    //document.getElementById("textSpanish").style.display = "none";

    //document.getElementById("textFrench").style.display = "none";

    //document.getElementById("textPortuguese").style.display = "none";

    //document.getElementById("textSwahili").style.display = "none";

    //document.getElementById("textJuhoansi").style.display = "none";


   },100)
  }

document.getElementById('infoGoBackButton').onclick = function(e){
  var storeIframeURL = document.getElementById("youtubeVideo").src
   setTimeout(function(){
     document.getElementById("infoGoBackButton").style.display = "none";
     document.getElementById("infoCont").style.display = "none";
     document.getElementById("iconsCont").style.display = "none";
     // document.getElementById("cognitoForm").style.display = "none";

     document.getElementById("youtubeVideo").setAttribute('src','')
     document.getElementById("youtubeVideo").setAttribute('src',storeIframeURL)
     document.getElementById("youtubeVideo").style.display = "none";
     // document.getElementById("youtubeVideo").stopVideo()
     // document.getElementById("youtubeVideoswahili").style.display = "none";

     document.getElementById("TextRequest").style.display = "none";



     document.body.style.overflow = 'hidden';

     document.getElementById("infoButton").style.display = "none";
     document.getElementById("iconsButton").style.display = "none";
     document.getElementById('cutomiseButton').style.display = "none";
     document.getElementById("youtubeVideo").style.display = "none";

     document.getElementById("english").style.display = "none";
     document.getElementById("swahili").style.display = "none";

     //document.getElementById("french").style.display = "none";

     //document.getElementById("portuguese").style.display = "none";

     //document.getElementById("swahili").style.display = "none";

     //document.getElementById("juhoansi").style.display = "none";

     document.getElementById("other1").style.display = "none";

     // document.getElementById("textEnglish").style.display = "none";
     //document.getElementById("textSpanish").style.display = "none";

     //document.getElementById("textFrench").style.display = "none";

     //document.getElementById("textPortuguese").style.display = "none";

     //document.getElementById("textSwahili").style.display = "none";

     //document.getElementById("textJuhoansi").style.display = "none";

     // if(languageSelected == 'english'){
       document.getElementById('dropDown').style.backgroundColor = 'black';
       document.getElementById('imageDropDown').src = '../images/burger.png';
       document.getElementById('dropDown').style.display = "initial";
       dropDownOpen = false

     // }
     document.getElementById("youtube").style.display = "initial";
     document.getElementById("startMapping").style.display = "initial";



   },100)
   return dropDownOpen && storeIframeURL
  }

var youtubeVideoLoaded = false
// var youtubeVideoswahiliLoaded = false


// document.getElementById('youtubeVideoswahili').onload = function(){
//      document.getElementById('youtubeImage').src = '../images/youtube.png'
//      // document.getElementById('youtubeImage').style.display = 'none'
//      youtubeVideoswahiliLoaded = true
//  return youtubeVideoswahiliLoaded
// };
document.getElementById('youtube').onclick = function(e){
     // document.getElementById("textEnglish").style.display = "initial";

     document.getElementById('youtubeImage').src = '../images/underConstruction.png'
     setTimeout(function(){
       document.getElementById('youtubeImage').src = '../images/youtube.png'
     },2000)

     // if(isOnline == true){
     //    var checkYoutubeLoaded = setInterval(function() {
     //         if(youtubeVideoLoaded == false){
     //           document.getElementById('youtubeImage').src = '../images/underConstruction.png'
     //         }else{
     //           // setTimeout(function(){
     //           document.getElementById("youtube").style.display = "none";
     //            document.getElementById('dropDown').style.display = "none";
     //            document.getElementById('dropDown').style.backgroundColor = 'black';
     //            document.getElementById('cutomiseButton').style.display = "none";
     //            document.getElementById('startMapping').style.display = "none";
     //            document.getElementById("infoButton").style.display = "none";
     //            document.getElementById("iconsButton").style.display = "none";
     //            document.getElementById("infoGoBackButton").style.display = "initial";
     //            document.getElementById("youtubeVideo").style.display = "initial";
     //
     //            dropDownOpen = false
     //            clearInterval(checkYoutubeLoaded)
     //         }
     //
     //
     //   },500)
     //
     //
     // // },100)
     // }else{
     //   document.getElementById('youtubeImage').src = '../images/youtubeOffline.png'
     // }

   return dropDownOpen

  }

document.getElementById('english').onclick = function(e){

  languageSelected = 'english'
  // document.getElementById('youtubeVideo').src = "https://www.youtube.com/embed/h6V3ykHclTo"
  document.getElementById('youtubeVideo').onload = function(){
       document.getElementById('youtubeImage').src = '../images/youtube.png'
       // document.getElementById('youtubeImage').style.display = 'none'
       youtubeVideoLoaded = true
   return youtubeVideoLoaded
  };

   setTimeout(function(){
    document.getElementById("dropDown").style.display = "initial";
     document.getElementById("youtube").style.display = "initial";
     document.getElementById("startMapping").style.animation = "none";

     //document.getElementById('cutomiseButton').style.display = "initial";
    //document.getElementById("spanish").style.display = "none";

    document.getElementById("english").style.display = "none";
    document.getElementById("swahili").style.display = "none";

    //document.getElementById("french").style.display = "none";
    //document.getElementById("portuguese").style.display = "none";
    //document.getElementById("swahili").style.display = "none";
    //document.getElementById("juhoansi").style.display = "none";
    document.getElementById("other1").style.display = "none";
    document.getElementById("other1UnderDev").style.display = "none";
    document.getElementById("AlertTranslate").style.display = "none";
  },100)

    //this is to load Cognito form 2 sec after UK is clicked, so page load fast - user won't need cognito after few secs
    setTimeout(function(){
    },700)
  return languageSelected
}

document.getElementById('swahili').onclick = function(e){
  languageSelected = 'swahili'
  document.getElementById('other1').click()

  // document.getElementById('youtubeVideo').src = "https://www.youtube.com/embed/Bq6FaOC_VpI"
  // document.getElementById('youtubeVideo').onload = function(){
  //      document.getElementById('youtubeImage').src = '../images/youtube.png'
  //      // document.getElementById('youtubeImage').style.display = 'none'
  //      youtubeVideoLoaded = true
  //  return youtubeVideoLoaded
  // };
  //
  //  setTimeout(function(){
  //   document.getElementById("dropDown").style.display = "initial";
  //    document.getElementById("youtube").style.display = "initial";
  //    document.getElementById("startMapping").style.animation = "none";
  //
  //    //document.getElementById('cutomiseButton').style.display = "initial";
  //   //document.getElementById("spanish").style.display = "none";
  //
  //   document.getElementById("english").style.display = "none";
  //   document.getElementById("swahili").style.display = "none";
  //
  //   //document.getElementById("french").style.display = "none";
  //   //document.getElementById("portuguese").style.display = "none";
  //   //document.getElementById("swahili").style.display = "none";
  //   //document.getElementById("juhoansi").style.display = "none";
  //   document.getElementById("other1").style.display = "none";
  //   document.getElementById("other1UnderDev").style.display = "none";
  //   document.getElementById("AlertTranslate").style.display = "none";
  // },100)
  //   //
  //   // //this is to load Cognito form 2 sec after UK is clicked, so page load fast - user won't need cognito after few secs
  //   // setTimeout(function(){
  //   // },700)
  return languageSelected
}
// select the target node


// Cognito.load("forms", { id: "2" });
document.getElementById('other1').onclick = function(e){
   document.getElementById('imageother1').style.marginLeft = '-4px'
   document.getElementById('imageother1').src = '../images/underConstruction.png'
   document.getElementById("AlertTranslate").style.display = "initial";
  // console.log(browserLanguage)
  // // console.log(lang)
  //
  // if(browserLanguage[0] == e && browserLanguage[1] == n){
  //   document.getElementById('imageother1').src = 'https://raw.githubusercontent.com/hjnilsson/country-flags/master/png100px/' + browserLanguage + '.png'
  //
  // browserLanguage = 'al'
  // // document.getElementById('other1').src = 'https://raw.githubusercontent.com/hjnilsson/country-flags/master/png100px/ad.png'
  // document.getElementById('imageother1').src = 'https://raw.githubusercontent.com/hjnilsson/country-flags/master/png100px/' + browserLanguage + '.png'
  // // doc[[0] == e && browserLanguage[1] == n]{
  // ment.getElementById("other1").style.display = "none";

  // document.getElementById("other1UnderDev").style.display = "initial";
  // document.getElementById("other1").style.display = "none";



//}
}


// document.getElementById('spanish').onclick = function(e){
//    setTimeout(function(){
//      document.getElementById("textSpanish").style.display = "initial";
//
//      //document.getElementById("spanish").style.display = "none";

//      document.getElementById("english").style.display = "none";
//      //document.getElementById("french").style.display = "none";

//      //document.getElementById("portuguese").style.display = "none";

//      //document.getElementById("swahili").style.display = "none";

//      //document.getElementById("juhoansi").style.display = "none";

//      document.getElementById("other1").style.display = "none";

//   },100)
// }
//
// document.getElementById('french').onclick = function(e){
//    setTimeout(function(){
//      document.getElementById("textFrench").style.display = "initial";
//
//      //document.getElementById("spanish").style.display = "none";

//      document.getElementById("english").style.display = "none";
//      //document.getElementById("french").style.display = "none";

//      //document.getElementById("portuguese").style.display = "none";

//      //document.getElementById("swahili").style.display = "none";

//      //document.getElementById("juhoansi").style.display = "none";

//      document.getElementById("other1").style.display = "none";

//   },100)
//
//   }
// document.getElementById('portuguese').onclick = function(e){
//    setTimeout(function(){
//      document.getElementById("textPortuguese").style.display = "initial";
//
//      //document.getElementById("spanish").style.display = "none";

//      document.getElementById("english").style.display = "none";
//      //document.getElementById("french").style.display = "none";

//      //document.getElementById("portuguese").style.display = "none";

//      //document.getElementById("swahili").style.display = "none";

//      //document.getElementById("juhoansi").style.display = "none";

//      document.getElementById("other1").style.display = "none";

//   },100)
// }
//
// document.getElementById('swahili').onclick = function(e){
//    setTimeout(function(){
//      document.getElementById("textSwahili").style.display = "initial";
//
//      //document.getElementById("spanish").style.display = "none";

//      document.getElementById("english").style.display = "none";
//      //document.getElementById("french").style.display = "none";

//      //document.getElementById("portuguese").style.display = "none";

//      //document.getElementById("swahili").style.display = "none";

//      //document.getElementById("juhoansi").style.display = "none";

//      document.getElementById("other1").style.display = "none";

//   },100)
//
//   }
// document.getElementById('juhoansi').onclick = function(e){
//    setTimeout(function(){
//      document.getElementById("textJuhoansi").style.display = "initial";
//
//      //document.getElementById("spanish").style.display = "none";

//      document.getElementById("english").style.display = "none";
//      //document.getElementById("french").style.display = "none";

//      //document.getElementById("portuguese").style.display = "none";

//      //document.getElementById("swahili").style.display = "none";

//      //document.getElementById("juhoansi").style.display = "none";

//      document.getElementById("other1").style.display = "none";

//   },100)
// }
