const validation = () => {
    var username = document.getElementById('inputUser').value;
    var password = document.getElementById('inputPassword').value;
    var email = document.getElementById('inputemail').value;
    var cnpass=document.getElementById('cnPassword').value;

    var regexuser = /^[A-za-z ]{3,100}$/;
    //Username will only consist of A-Z a-z And space
    var regexpass = /^(?=.*[0-9])[a-zA-Z0-9]{8,}$/;
    //Password will contain at least one number, one special character , will be atleast 8 character long
    var regexemail = /^[A-za-z_0-9]{3,}@[A-za-z]{3,}[.]{1}[A-za-z.]{2,6}$/
    //For Mob no^[789][0-9]{9}$ for india 

    const validate = (a, b) => {
        return a.test(b);
    }

    if (validate(regexuser, username)) {
        document.getElementById('usererror').innerHTML = "";
    }
    else {
        document.getElementById('usererror').innerHTML = "Username is invalid";
        // alert(`Username is invalid`);
        return false;
    }

    if (validate(regexemail, email)) {
        document.getElementById('emailerror').innerHTML = "";
    }
    else {
        document.getElementById('emailerror').innerHTML = "Email is invalid";
        // alert(`Email Address is invalid`);
        return false;
    }
    
    if (validate(regexpass, password)) {
        document.getElementById('passworderror').innerHTML = "";
    }
    else {
        document.getElementById('passworderror').innerHTML = "Password is invalid";
        // alert(`Password is invalid`);
        return false;
    }
    
    if (cnpass.match(password)) {
        document.getElementById('cnpassworderror').innerHTML = "";
    }
    else {
        document.getElementById('cnpassworderror').innerHTML = "Password does not match";
        // alert(`Password doesn't match`);
        return false;
    }
}