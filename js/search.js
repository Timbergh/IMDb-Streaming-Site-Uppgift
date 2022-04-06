let search = document.getElementById("search");

search.onkeydown = async function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    console.log(search.value);
    getSearch();
  }
};

async function getSearch() {
  let searchMovieResult = await fetch(
    `${URL}/search/movie?api_key=${KEY}&query=${search.value}`
  );
  let searchMovieResultJson = await searchMovieResult.json();
  console.log(searchMovieResultJson);

  let searchShowResult = await fetch(
    `${URL}/search/tv?api_key=${KEY}&query=${search.value}`
  );
  let searchShowResultJson = await searchShowResult.json();
  console.log(searchShowResultJson);
  search.value = "";
}
