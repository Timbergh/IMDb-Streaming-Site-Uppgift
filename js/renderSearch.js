const URL = "https://api.themoviedb.org/3";
const KEY = "1a08c634ec1bc9d64558c15c3e88cdbf";

let searchParams = new URLSearchParams(window.location.search);
let query = searchParams.get("q");

async function getSearch() {
  let allResults = [];
  let page = 1;
  try {
    var searchMovieResult = await fetch(
      `${URL}/search/movie?api_key=${KEY}&query=${query}&page=${page}`
    );
    var searchMovieResultJson = await searchMovieResult.json();
    console.log(searchMovieResultJson);
  } catch (error) {
    alert("Could not load API");
  }
  if (searchMovieResultJson.results.length != 0) {
    allResults.push(searchMovieResultJson.results);
  }
  try {
    var searchShowResult = await fetch(
      `${URL}/search/tv?api_key=${KEY}&query=${query}`
    );
    var searchShowResultJson = await searchShowResult.json();
    console.log(searchShowResultJson);
  } catch (error) {
    alert("Could not load API");
  }
  if (searchShowResultJson.results.length != 0) {
    allResults.push(searchShowResultJson.results);
  }

  // Lägger till alla filmer och serier i en lista
  for (let i = 2; i <= searchMovieResultJson.total_pages; i++) {
    page = i;
    if (page < 20) {
      try {
        searchMovieResult = await fetch(
          `${URL}/search/movie?api_key=${KEY}&query=${query}&page=${page}`
        );
        searchMovieResultJson = await searchMovieResult.json();
      } catch (error) {
        alert("Could not load API");
      }
      allResults.push(searchMovieResultJson.results);
    }
  }
  for (let i = 2; i <= searchShowResultJson.total_pages; i++) {
    page = i;
    if (page < 20) {
      try {
        searchShowResult = await fetch(
          `${URL}/search/movie?api_key=${KEY}&query=${query}&page=${page}`
        );
        searchShowResultJson = await searchShowResult.json();
      } catch (error) {
        alert("Could not load API");
      }
      allResults.push(searchShowResultJson.results);
    }
  }
  console.log(allResults);

  let resultsContainer = document.getElementById("search-result-container");

  allResults.forEach((e) => {
    e.forEach((item) => {
      if (item.poster_path != null) {
        if (item.first_air_date) {
          resultsContainer.insertAdjacentHTML(
            "beforeend",
            `<li><a href="play.html?movieid=${item.id}&type=tv" class="play-link"
            ><img src="https://image.tmdb.org/t/p/w154${item.poster_path}" loading="lazy" alt="Movie Poster"></a></li>`
          );
        } else {
          resultsContainer.insertAdjacentHTML(
            "beforeend",
            `<li><a href="play.html?movieid=${item.id}&type=movie" class="play-link"
            ><img src="https://image.tmdb.org/t/p/w154${item.poster_path}" loading="lazy" alt="Movie Poster"></a></li>`
          );
        }
      }
    });
  });

  if (allResults.length == 0) {
    resultsContainer.innerHTML = `No results of "${query}" found!`;
  } else {
    resultsContainer.insertAdjacentHTML(
      "afterbegin",
      `<div class="query-result"><h3>Showing results of "${query}"</h3></div>`
    );
  }
}

getSearch();
