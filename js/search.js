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
