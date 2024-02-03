document.getElementById("gobackFromCredits").onclick = function(e) {

document.getElementById('kaptacredits').style.display = 'none'

document.getElementById('initialscreen2options').style.backgroundColor = '#c00000'
document.getElementById('numberofcredits').style.display = 'none'
document.getElementById('valueincurrency').style.display = 'none'
document.getElementById('iconcredits').style.display = 'none'
// document.getElementById('iconvalue').style.display = 'none'

document.getElementById('gobackFromCredits').style.display = 'none'
document.getElementById('exchangeCredits').style.display = 'none'

document.getElementById('initialscreen2options').style.display = 'initial'
document.getElementById('geocredits').style.display = 'initial'
document.getElementById('asktheteam').style.display = 'initial'
document.getElementById('askthemap').style.display = 'initial'
document.getElementById('startmapping').style.display = 'initial'
document.getElementById('taskthemappers').style.display = 'initial'
document.getElementById('kaptainitialscreen').style.display = 'initial'


}

document.getElementById('exchangeCredits').onclick = function(){
  document.getElementById('exchangeCredits').style.backgroundColor = '#a6a4a4'
  // document.getElementById('talk').style.borderColor = '#404040'
  setTimeout(function(){
    document.getElementById("Alert").style.display = 'none'
    window.location.href="https://wa.me/+34678380944?text=HereGoesTheUniqueIdentifierToCashOut";
    document.getElementById('exchangeCredits').style.backgroundColor = 'yellow'


  },500)
  // window.location.href="https://wa.me/+34678380944?' + textwhatsappencoded + '";
}

// document.getElementById('taskthemappers').onclick = function(){
//   document.getElementById('taskthemappers').style.backgroundColor = '#a6a4a4'
//   setTimeout(function(){
//     document.getElementById('taskthemappers').style.backgroundColor = 'white'
//     document.getElementById('taskthemappers').style.display = 'none'
//     document.getElementById('geocredits').style.display = 'none'
//     document.getElementById('asktheteam').style.display = 'none'
//     document.getElementById('askthemap').style.display = 'none'
//     document.getElementById('startmapping').style.display = 'none'
//     document.getElementById('kaptainitialscreen').style.display = 'none'
//     document.getElementById('initialscreen2options').style.backgroundColor = 'black'
//     document.getElementById('kaptacredits').style.display = 'initial'
//     document.getElementById('iconcredits').style.display = 'initial'
//     // document.getElementById('iconvalue').style.display = 'initial'
//     document.getElementById('numberofcredits').style.display = 'initial'
//     document.getElementById('valueincurrency').style.display = 'initial'
//
//     document.getElementById('gobackFromCredits').style.display = 'initial'
//     document.getElementById('exchangeCredits').style.display = 'initial'
//
//   },500)
//
// }

var cognitoFormLoaded = false
document.getElementById('infoGoBackButton').onclick = function(e){
  document.getElementById('initialscreen2options').style.backgroundColor = '#c00000'

  document.getElementById('infoGoBackButton').style.display = 'none'
  document.getElementById('TextRequest').style.display = 'none'
  document.getElementById('initialscreen2options').style.display = 'initial'
  document.getElementById('geocredits').style.display = 'initial'
  document.getElementById('asktheteam').style.display = 'initial'
  document.getElementById('askthemap').style.display = 'initial'
  document.getElementById('startmapping').style.display = 'initial'
  document.getElementById('taskthemappers').style.display = 'initial'
  document.getElementById('kaptainitialscreen').style.display = 'initial'
  document.body.style.overflow = 'hidden';



}
document.getElementById('taskthemappers').onclick = function(e){
  document.getElementById('taskthemappers').style.backgroundColor = '#a6a4a4'
  $.getScript({
     cache:true,
    url:'https://www.cognitoforms.com/s/EB26QD5cT0Cz2sSzqKJF5w'
  })

  setTimeout(function(){
    document.body.style.overflow = 'scroll';

    document.getElementById('TextRequest').style.display = 'initial'
    document.getElementById('infoGoBackButton').style.display = 'initial'

    document.getElementById('taskthemappers').style.backgroundColor = 'white'
    document.getElementById('taskthemappers').style.display = 'none'
    document.getElementById('geocredits').style.display = 'none'
    document.getElementById('asktheteam').style.display = 'none'
    document.getElementById('askthemap').style.display = 'none'
    document.getElementById('startmapping').style.display = 'none'
    document.getElementById('kaptainitialscreen').style.display = 'none'
    document.getElementById('initialscreen2options').style.backgroundColor = 'black'
},300)

    setTimeout(function(){



     if(cognitoFormLoaded == false){
       document.getElementById("loadingCognito").style.display = "initial";
     }
     Cognito.load("forms", { id: "4" })
     cognitoFormLoaded = true
   },2000)



  setTimeout(function(){
    document.getElementById("loadingCognito").style.display = "none";
  },4000)
  return cognitoFormLoaded
}
