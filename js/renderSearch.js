const URL = "https://api.themoviedb.org/3";
const KEY = "1a08c634ec1bc9d64558c15c3e88cdbf";

let searchParams = new URLSearchParams(window.location.search);
let query = searchParams.get("q");

async function getSearch() {
  let allResults = [];
  let page = 1;
  let searchMovieResult = await fetch(
    `${URL}/search/movie?api_key=${KEY}&query=${query}&page=${page}`
  );
  let searchMovieResultJson = await searchMovieResult.json();
  console.log(searchMovieResultJson);
  allResults.push(searchMovieResultJson.results);

  let searchShowResult = await fetch(
    `${URL}/search/tv?api_key=${KEY}&query=${query}`
  );
  let searchShowResultJson = await searchShowResult.json();
  console.log(searchShowResultJson);
  allResults.push(searchShowResultJson.results);

  // Lägger till alla filmer och serier i en lista
  for (let i = 2; i <= searchMovieResultJson.total_pages; i++) {
    page = i;
    searchMovieResult = await fetch(
      `${URL}/search/movie?api_key=${KEY}&query=${query}&page=${page}`
    );
    searchMovieResultJson = await searchMovieResult.json();
    allResults.push(searchMovieResultJson.results);
  }
  for (let i = 2; i <= searchShowResultJson.total_pages; i++) {
    page = i;
    searchMovieResult = await fetch(
      `${URL}/search/movie?api_key=${KEY}&query=${query}&page=${page}`
    );
    searchShowResultJson = await searchShowResult.json();
    allResults.push(searchShowResultJson.results);
  }
  console.log(allResults);

  let resultsContainer = document.getElementById("search-result-container");
  allResults.forEach((e) => {
    e.forEach((item) => {
      if (item.poster_path != null) {
        resultsContainer.insertAdjacentHTML(
          "afterbegin",
          `<li><img src="https://image.tmdb.org/t/p/w154${item.poster_path}"></li>`
        );
      }
    });
  });
}

getSearch();
