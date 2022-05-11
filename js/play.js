const URL = "https://api.themoviedb.org/3";
const KEY = "1a08c634ec1bc9d64558c15c3e88cdbf";

console.log(window.location);
let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("movieid");
let type = searchParams.get("type");
console.log(id);
console.log(type);

async function getMovie() {
  if (type === "movie") {
    //Filmer
    try {
      var details = await fetch(`${URL}/movie/${id}?api_key=${KEY}`);

      var detailsJson = await details.json();
      console.log(detailsJson);
    } catch (error) {
      alert("Could not load API");
    }
    try {
      var movieVideo = await fetch(`${URL}/movie/${id}/videos?api_key=${KEY}`);

      var movieVideoJson = await movieVideo.json();
      console.log(movieVideoJson);
    } catch (error) {
      alert("Could not load API");
    }
    try {
      var castMovie = await fetch(`${URL}/movie/${id}/credits?api_key=${KEY}`);

      var castMovieJson = await castMovie.json();
      console.log(castMovieJson);
    } catch (error) {
      alert("Could not load API");
    }

    try {
      var recommendedMovie = await fetch(
        `${URL}/movie/${id}/recommendations?api_key=${KEY}`
      );

      var recommendedMovieJson = await recommendedMovie.json();
      console.log(recommendedMovieJson);
    } catch (error) {
      alert("Could not load API");
    }
  } else {
    // Serier
    try {
      var showData = await fetch(`${URL}/tv/${id}?api_key=${KEY}`);

      var showDataJson = await showData.json();
      console.log(showDataJson);
    } catch (error) {
      alert("Could not load API");
    }
    try {
      var showTrailer = await fetch(`${URL}/tv/${id}/videos?api_key=${KEY}`);

      var showTrailerJson = await showTrailer.json();
      console.log(showTrailerJson);
    } catch (error) {
      alert("Could not load API");
    }
    try {
      var castShow = await fetch(`${URL}/tv/${id}/credits?api_key=${KEY}`);

      var castShowJson = await castShow.json();
      console.log(castShowJson);
    } catch (error) {
      alert("Could not load API");
    }

    try {
      var recommendedShow = await fetch(
        `${URL}/tv/${id}/recommendations?api_key=${KEY}`
      );

      var recommendedShowJson = await recommendedShow.json();
      console.log(recommendedShowJson);
    } catch (error) {
      alert("Could not load API");
    }
  }

  let movieContainer = document.getElementById("movie-container");

  if (type == "movie") {
    let randomVideo = Math.floor(Math.random() * movieVideoJson.results.length);
    if (movieVideoJson.results.length == 0) {
      movieContainer.innerHTML = "Video Not Found";
    } else {
      movieContainer.insertAdjacentHTML(
        "afterbegin",
        `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${movieVideoJson.results[randomVideo].key}?&rel=0&mute=0" frameborder="0" allowfullscreen="true"</iframe>`
      );
    }
  } else {
    let randomVideo = Math.floor(
      Math.random() * showTrailerJson.results.length
    );
    if (showTrailerJson.results.length == 0) {
      movieContainer.innerHTML = "Video Not Found";
    } else {
      movieContainer.insertAdjacentHTML(
        "afterbegin",
        `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${showTrailerJson.results[randomVideo].key}?&rel=0&mute=0" frameborder="0" allowfullscreen="true"</iframe>`
      );
    }
  }
  let infoContainer = document.getElementById("information-container");

  // får ut de olika namnen för objekten i filmer och serier.
  function releaseType(x) {
    let y = NaN;
    if (type == "movie") {
      y = x.release_date;
    } else {
      y = x.first_air_date;
    }
    return y;
  }
  function titleType(x) {
    let y = NaN;
    if (type == "movie") {
      y = x.original_title;
    } else {
      y = x.original_name;
    }
    return y;
  }
  function genre(x) {
    let genres = [];
    if (x.genres.length == 0) {
      genres = " - ";
    } else {
      for (let i = 0; i < x.genres.length; i++) {
        genres += x.genres[i].name + ", ";
      }
      return genres;
    }
  }

  let viewAll = document.getElementById("view-all-btn");
  let castRefresh = document.getElementById("cast-refresh");

  // Funktion för att visa fler eller mindre i funktionen getCast()
  let viewAllBool = false;
  viewAll.onclick = function () {
    castRefresh.innerHTML = "";
    if (viewAllBool === false) {
      viewAllBool = true;
      viewAll.innerHTML = "- View less";
      if (type === "movie") getCast(castMovieJson);
      else getCast(castShowJson);
    } else {
      viewAllBool = false;
      viewAll.innerHTML = "- View all";
      if (type === "movie") getCast(castMovieJson);
      else getCast(castShowJson);
    }
  };

  // Får framma alla skådespelare och en funktion för att visa alla eller bara 5st
  function getCast(x) {
    let cast = [];
    if (viewAllBool === false) {
      for (let i = 0; i < 5; i++) {
        const element = x.cast[i];
        cast += element.original_name + ", ";
      }
      castRefresh.insertAdjacentHTML(
        "afterbegin",
        `<p class="info">Cast: ${cast}</p>`
      );
    } else {
      for (let i = 0; i < x.cast.length; i++) {
        const element = x.cast[i];
        cast += element.original_name + ", ";
      }
      castRefresh.insertAdjacentHTML(
        "afterbegin",
        `<div><p class="info">Cast: ${cast}</p>`
      );
    }
  }

  // Lägger till alla detaljer i infoContainer
  function showInfo(x) {
    infoContainer.insertAdjacentHTML(
      "afterbegin",
      `<h1>${titleType(x)}</h1><div class="line"></div><p class="info">${
        x.overview
      }</p><p class="info">${genre(x)}</p></div><p class="info">Rating: ${
        x.vote_average
      }</p><p class="info">${releaseType(x)}</p>`
    );
  }

  let recommended = document.getElementById("recommended");
  function recommendedList(x) {
    for (let i = 0; i < 6; i++) {
      const element = x.results[i];
      recommended.insertAdjacentHTML(
        "afterbegin",
        `<li><a href="play.html?movieid=${element.id}&type=${type}" class="play-link"
        ><img src="https://image.tmdb.org/t/p/w154${element.poster_path}" loading="lazy" alt="Movie Poster"></a></li>`
      );
    }
  }
  // kallar på funktionerna beroende på om det är en film eller serie
  if (type === "movie") showInfo(detailsJson);
  else showInfo(showDataJson);
  if (type === "movie") getCast(castMovieJson);
  else getCast(castShowJson);
  if (type === "movie") recommendedList(recommendedMovieJson);
  else recommendedList(recommendedShowJson);
}

getMovie();
