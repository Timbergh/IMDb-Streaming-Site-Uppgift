// SEARCH
let search = document.getElementById("search");

search.onkeydown = async function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    console.log(search.value);
    if (search.value != "") {
      window.location = `search.html?q=${search.value}`;
    }
  }
};

// PROFILE
let profileIcon = document.getElementById("profile-icon");
let profileClose = document.getElementById("profile-close");
let profileMenu = document.getElementById("profile-menu");
let signup = document.getElementById("profile-list");

function profileBtn() {
  if (profileMenu.style.width == "250px") {
    profileMenu.style.width = "0";
    setTimeout(() => {
      profileIcon.style.display = "flex";
      profileClose.style.display = "none";
    }, 400);
    signup.style.display = "none";
    profileMenu.style.animation = "profileAnimationReverse 0.6s forwards";
  } else {
    profileMenu.style.width = "250px";
    profileIcon.style.display = "none";
    profileClose.style.display = "flex";
    profileClose.style.animation = "close 0.5s forwards";
    profileMenu.style.animation = "profileAnimation 0.6s forwards";
    signup.style.display = "block";
  }
}

profileIcon.addEventListener("click", profileBtn);
profileClose.addEventListener("click", profileBtn);
