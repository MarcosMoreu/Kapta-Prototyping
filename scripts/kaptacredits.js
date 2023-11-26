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
