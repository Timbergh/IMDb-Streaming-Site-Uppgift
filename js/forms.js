let email = document.getElementById("email");
let password = document.getElementById("password");
let btn = document.getElementById("submit");

btn.onclick = function (event) {
  event.preventDefault();
  if (email.value == 0) {
    email.style.border = "1.5px red solid";
    email.style.borderRadius = "2px";
  }
};
