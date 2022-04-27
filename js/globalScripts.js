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

function profileBtn() {
  if (profileMenu.style.display == "block") {
    profileMenu.style.display = "none";
    profileIcon.style.display = "flex";
    profileClose.style.display = "none";
  } else {
    profileMenu.style.display = "block";
    profileIcon.style.display = "none";
    profileClose.style.display = "flex";
  }
}

profileIcon.addEventListener("click", profileBtn);
profileClose.addEventListener("click", profileBtn);
