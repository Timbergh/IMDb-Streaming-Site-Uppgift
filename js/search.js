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

async function getSearch() {
  let allResults = [];
  let page = 1;
  let searchMovieResult = await fetch(
    `${URL}/search/movie?api_key=${KEY}&query=${search.value}&page=${page}`
  );
  let searchMovieResultJson = await searchMovieResult.json();
  console.log(searchMovieResultJson);
  allResults.push(searchMovieResultJson.results);

  let searchShowResult = await fetch(
    `${URL}/search/tv?api_key=${KEY}&query=${search.value}`
  );
  let searchShowResultJson = await searchShowResult.json();
  console.log(searchShowResultJson);
  allResults.push(searchShowResultJson.results);

  // Lägger till alla filmer och serier i en lista
  for (let i = 2; i <= searchMovieResultJson.total_pages; i++) {
    page = i;
    searchMovieResult = await fetch(
      `${URL}/search/movie?api_key=${KEY}&query=${search.value}&page=${page}`
    );
    searchMovieResultJson = await searchMovieResult.json();
    allResults.push(searchMovieResultJson.results);
  }
  for (let i = 2; i <= searchShowResultJson.total_pages; i++) {
    page = i;
    searchMovieResult = await fetch(
      `${URL}/search/movie?api_key=${KEY}&query=${search.value}&page=${page}`
    );
    searchShowResultJson = await searchShowResult.json();
    allResults.push(searchShowResultJson.results);
  }
  console.log(allResults);

  let resultsContainer = document.getElementById("search-result-container");
  allResults.forEach((e) => {
    e.forEach((item) => {
      resultsContainer.insertAdjacentHTML(
        "afterbegin",
        `<li><img src="https://image.tmdb.org/t/p/w154${item.poster_path}"></li>`
      );
    });
  });

  search.value = "";
}
