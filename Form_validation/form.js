var form = document.getElementById("myForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  var user = document.getElementById("inputUser").value;
  var password = document.getElementById("inputPassword").value;
  var email = document.getElementById("inputemail").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var regexuser = /^[A-za-z ]{3,100}$/;
  var regexpass = /^(?=.*[0-9])[a-zA-Z0-9]{8,}$/;
  var regexemail = /^[A-za-z_0-9]{3,}@[A-za-z]{3,}[.]{1}[A-za-z.]{2,6}$/;
  var isValid = true;

  if (regexuser.test(user)) {
    document.getElementById("usererror").innerHTML = "";
  } else {
    document.getElementById("usererror").innerHTML = "Username is invalid";
    isValid = false;
  }

  if (regexemail.test(email)) {
    document.getElementById("emailerror").innerHTML = "";
  } else {
    document.getElementById("emailerror").innerHTML = "Email is invalid";
    isValid = false;
  }

  if (regexpass.test(password)) {
    document.getElementById("passworderror").innerHTML = "";
  } else {
    document.getElementById("passworderror").innerHTML = "Password is invalid";
    isValid = false;
  }

  if (confirmPassword.match(password)) {
    document.getElementById("confirmPassworderror").innerHTML = "";
  } else {
    document.getElementById("confirmPassworderror").innerHTML =
      "Password does not match";
    isValid = false;
  }

  if (isValid) {
    form.reset();
  }
});
