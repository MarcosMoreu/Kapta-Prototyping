////////////////////////// login initial modal  ///////////////

document.getElementById('loginInfo').onclick = function(){
  window.location.href = 'pages/tutorial.html';
}
document.getElementById('loginKey').onclick = function(e){
  e.preventDefault() //to avoid reload
  //runJSselectFeature()
  document.getElementById('loginKey').style.backgroundColor = '#D5D6D5'
  document.getElementById('enteredPw').style.display = 'initial';
  document.getElementById('enteredPw').focus() //to open keyboard!!!
  document.getElementById('login').style.display = 'initial';
}

////////////////////    login  input    ///////////
var requestPw = function(){
      var pocPw = '2030' //! 🖐️🖐️🖐️ if you are looking at this line, please keep in mind that this very basic security measure is 'only' to prevent, during the testing period,
      // unintended submission by users who have not been informed of the impacts of open land data, both positive and negatives. Thanks ;)

      setTimeout(function(){
        document.getElementById('modal').style.display='block';
        // document.getElementById('enteredPw').click()
      },1000)

      var checkPw = setInterval(function(){
        var pwPlaceholder = document.getElementById('enteredPw').value

        if(pwPlaceholder.length == 4){
          document.getElementById('login').style.borderColor= 'grey'
          document.getElementById('login').disabled = false
          document.getElementById('login').style.opacity='1';
        }
        if(pwPlaceholder.length < 4){
          document.getElementById('login').style.borderColor= 'white'
          document.getElementById('login').style.opacity='0.3';
         document.getElementById('login').disabled = true
        }
      },200)

      document.getElementById('login').onclick = function(e){
        e.preventDefault() // to avoid page reload on first load!

        var pwPlaceholder = document.getElementById('enteredPw').value
        if(pwPlaceholder == pocPw){

          clearInterval(checkPw)
          //runJSDownload()
          document.getElementById('enteredPw').style.backgroundColor = '#39F70F'
          setTimeout(function(){
            document.getElementById('modal').style.display='none';
            document.getElementById('pwForm').style.display='none';
          },300)
          localStorage.setItem('pwCorrect', true);
        }else{
          document.getElementById('enteredPw').style.backgroundColor = 'red'
          document.getElementById('enteredPw').focus() //to maintain keyboard if pw wrong

          setTimeout(function(){
            document.getElementById('enteredPw').style.backgroundColor = 'white'
          },300)
        }
      }
    }
