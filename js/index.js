function seterror(id, error) {
    // Defining a function to display error message
    document.getElementById(id).innerHTML = error;
}
function setsuccess(id,succ){
    document.getElementById(id).innerHTML = succ;
}

// Defining error variables with a default value
var nameErr = emailErr = panErr = amtErr= capErr= otpErr= true;

function nameValidation() {
    // Retrieving the values of form elements 
    var name = document.Loanform.name.value;
    // Validate name
    if (name == "") {
        seterror("nameErr", "Please enter your name");
    } else {
        var regex =/^[a-zA-Z]+\s+[a-zA-Z]{4,}$/;
        if (regex.test(name) === false) {
            seterror("nameErr", "Please enter a valid name");
        } else {
            seterror("nameErr", "");
            nameErr = false;
            enableSubmitBtn();
        }
    }
    var [first, last] = name.split(' ');
    localStorage.setItem("nameout", first);
}
function enableSubmitBtn()
{
    if((document.getElementById("name").value.length > 0) &&
       (document.getElementById("email").value.length > 0) &&
       (document.getElementById("pancard").value.length > 0) &&
       (document.getElementById("amt").value.length > 0))  
       //(document.getElementById("mainCaptcha").value != document.getElementById("txtInput").value))
       {
       document.getElementById('submit').disabled = false;
       }
}

function emailValidation() {
    var email = document.Loanform.email.value;
    // Validate email address
    if (email == "") {
        seterror("emailErr", "Please enter your email address");
    } else {
        // Regular expression for basic email validation
        var regexemail = /[a-zA-Z]+[0-9]+@[a-zA-Z]+\.[a-zA-Z]+/;
        if (regexemail.test(email) === false) {
            seterror("emailErr", "Please enter a valid email address");
        } else {
            seterror("emailErr", "");
            emailErr = false;
            enableSubmitBtn();
        }
    }
    localStorage.setItem("mailout", email);
}
function panValidation() {
    var pancard = document.Loanform.pancard.value;
    if (pancard == "") {
        seterror("panErr", "Please enter your PAN card number");
        
    } else {
        // Regular expression for pan card validation
        var regexpan = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
        if (regexpan.test(pancard) === false) {
            seterror("panErr", "Please enter PAN card number in ABCDE1234F format");
            
        } else {
            seterror("panErr", "");
            panErr = false;
            enableSubmitBtn();
        }
    }
}

function LoanAmtValidation() {
    var amt = document.Loanform.amt.value;
    if (amt == "") {
        seterror("amtErr", "Please enter your loan amount");
        
    }
    else {
        // Regular expression for amount validation
        var regexamt = /^[0-9]*$/;
        if (regexamt.test(amt) === false) {
            seterror("amtErr", "only numbers are allowed");
            
        }
        else {
            seterror("amtErr", "");
            amtErr = false;
            enableSubmitBtn();
        }

    }
}

function convertNumToWords(){
    document.getElementById('words').innerHTML = toWords(document.getElementById('amt').value);
}
function toWords(num){
    // max 9 digits
    if((num = num.toString()).length>9) return seterror("amtErr","Maximum 9digits");
   
    //logic of converting to words.
    //00,00,00,0,00
    var units=['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ',
    'eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];

    var tens=['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

    n=('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    console.log(n);
    
    if(!n) return;
    var str='';
    str +=(n[1] !=0) ? (units[Number(n[1])] || tens[n[1][0]] + ' ' + units[n[1][1]]) + 'crore ' : ' ';
    str +=(n[2] !=0) ? (units[Number(n[2])] || tens[n[2][0]] + ' ' + units[n[2][1]]) + 'lakh '  : ' ';
    str +=(n[3] !=0) ? (units[Number(n[3])] || tens[n[3][0]] + ' ' + units[n[3][1]]) + 'thousand ': ' ';
    str +=(n[4] !=0) ? (units[Number(n[4])] || tens[n[4][0]] + ' ' + units[n[4][1]]) + 'hundred ' : ' ';
    str +=(n[5] !=0) ? ((str != '') ? ' ' : '') + (units[Number(n[5])] || tens[n[5][0]] + ' ' + units[n[5][1]]) + 'rs' : 'rs';
    return str == 'rs' ? '' : str;
}

function captchaGenerate(){
    var all_alpha= new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
    var i;
    for(i=0;i<5;i++){
        var a=all_alpha[Math.floor(Math.random()*all_alpha.length)];
        var b=all_alpha[Math.floor(Math.random()*all_alpha.length)];
        var c=all_alpha[Math.floor(Math.random()*all_alpha.length)];
        var d=all_alpha[Math.floor(Math.random()*all_alpha.length)];
        var e=all_alpha[Math.floor(Math.random()*all_alpha.length)];
    }
    var code = a+''+ b +'' + '' + c+ '' + d +''+ e;
    document.getElementById("mainCaptcha").value = code;
}
function CheckValidCaptch(){
    
    var str1= removeSpaces(document.getElementById('mainCaptcha').value);
    var str2= removeSpaces(document.getElementById('txtInput').value);
    if (str1 == str2){
        setsuccess("capSucc", "");
        enableSubmitBtn();
        nameValidation();
        emailValidation();
        panValidation();
        LoanAmtValidation();
        
    return true;
    }
else{       
    document.getElementById('submit').disabled = true;
    seterror("capErr", "Please enter a valid captcha.");   
}
}
function removeSpaces(string){
    return string.split(' ').join('');
  }

  function generateOpt() {
    const val = Math.floor(1000 + Math.random() * 9000);
    console.log("OTP IS = " + val)
    localStorage.setItem("otp1", val);
}
var attempt=0;
function OTPValidation() {
    var a = localStorage.getItem("otp1");
    var b = document.getElementById("otpin").value;
    if (a == b && b.length > 0) {
        document.getElementById("otpError").visible=false;
        document.getElementById("otpError").innerHTML='';
        attempt =0;
        window.location.href = "http://pixel6.co/";
    }
    else if(b.length > 0) {
        if (attempt > 2)
        {
            attempt = 0;
            window.location.href = "http://pixel6.co/error.html";
        }
        else
        {
            document.getElementById("otpError").visible=true;
            document.getElementById("otpError").style="color:red";
            document.getElementById("otpError").innerHTML='Invalid OTP, try again';   
            attempt = attempt + 1;
        }
    }
}

















