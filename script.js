var requestOptions = {
  method: "GET",
  redirect: "follow",
};

async function getMovies() {
  let heroTrailer2 = await fetch(
    `https://api.themoviedb.org/3/movie/696806/videos?api_key=1a08c634ec1bc9d64558c15c3e88cdbf&language=en-US`,
    requestOptions
  );
  let ht2Json = await heroTrailer2.json();
  console.log(ht2Json);

  let popularMovies = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=1a08c634ec1bc9d64558c15c3e88cdbf&language=en-US&page=1",
    requestOptions
  );
  let popularMoviesJson = await popularMovies.json();
  console.log(popularMoviesJson);

  let topRatedMovies = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=1a08c634ec1bc9d64558c15c3e88cdbf&language=en-US&page=1",
    requestOptions
  );
  let topRatedMoviesJson = await topRatedMovies.json();
  console.log(topRatedMoviesJson);

  let popularShows = await fetch(
    "https://api.themoviedb.org/3/tv/popular?api_key=1a08c634ec1bc9d64558c15c3e88cdbf&language=en-US&page=1",
    requestOptions
  );
  let popularshowsJson = await popularShows.json();
  console.log(popularshowsJson);

  let topRatedShows = await fetch(
    "https://api.themoviedb.org/3/tv/top_rated?api_key=1a08c634ec1bc9d64558c15c3e88cdbf&language=en-US&page=1",
    requestOptions
  );
  let topRatedShowsJson = await topRatedShows.json();
  console.log(topRatedMoviesJson);

  // Sätt eventlyssnare på alla bilder

  let link = `https://www.youtube.com/embed/${ht2Json.results[2].key}?autoplay=1&rel=0&showinfo=0&controls=0&mute=0`;
  let trailer = `<iframe width="100%" height="100%" src="${link}" frameborder="0"</iframe>`;
  document.getElementById("hero").innerHTML += trailer;

  popularMoviesJson.results.forEach((item) => {
    let poster = item.poster_path;
    let movie = `<li><img data-movie-id="${item.id}" data-type="movie" src="https://image.tmdb.org/t/p/w154${poster}"></li>`;
    document.getElementById("popular-movies").innerHTML += movie;
  });
  topRatedMoviesJson.results.forEach((item) => {
    let poster = item.poster_path;
    let movie = `<li><img data-movie-id="${item.id}" data-type="movie" src="https://image.tmdb.org/t/p/w154${poster}"></li>`;
    document.getElementById("toprated-movies").innerHTML += movie;
  });
  popularshowsJson.results.forEach((item) => {
    let poster = item.poster_path;
    let movie = `<li><img data-movie-id="${item.id}" data-type="tv" src="https://image.tmdb.org/t/p/w154${poster}"></li>`;
    document.getElementById("popular-shows").innerHTML += movie;
  });
  topRatedShowsJson.results.forEach((item) => {
    let poster = item.poster_path;
    let movie = `<li><img data-movie-id="${item.id}" data-type="tv" src="https://image.tmdb.org/t/p/w154${poster}"></li>`;
    document.getElementById("toprated-shows").innerHTML += movie;
  });

  // Scroll knappar
  let pmLeft = document.getElementById("pm-left");
  let pmRight = document.getElementById("pm-right");
  let trmLeft = document.getElementById("trm-left");
  let trmRight = document.getElementById("trm-right");
  let trsLeft = document.getElementById("trs-left");
  let trsRight = document.getElementById("trs-right");
  let psLeft = document.getElementById("ps-left");
  let psRight = document.getElementById("ps-right");

  pmLeft.onclick = function () {
    document.getElementById("popular-movies").scrollLeft -= 1000;
  };

  pmRight.onclick = function () {
    document.getElementById("popular-movies").scrollLeft += 1000;
  };

  trmLeft.onclick = function () {
    document.getElementById("toprated-movies").scrollLeft -= 1000;
  };

  trmRight.onclick = function () {
    document.getElementById("toprated-movies").scrollLeft += 1000;
  };

  psLeft.onclick = function () {
    document.getElementById("popular-shows").scrollLeft -= 1000;
  };

  psRight.onclick = function () {
    document.getElementById("popular-shows").scrollLeft += 1000;
  };

  trsLeft.onclick = function () {
    document.getElementById("toprated-shows").scrollLeft -= 1000;
  };

  trsRight.onclick = function () {
    document.getElementById("toprated-shows").scrollLeft += 1000;
  };

  // Få information om filmer/serier
  let allPosters = document.getElementsByTagName("img");
  let info = document.getElementById("popup");
  let closeBtn = document.getElementById("close");
  let blurScreen = document.getElementById("blur-screen");
  let table = document.getElementById("info-table");
  console.log(allPosters);
  for (let i = 0; i < allPosters.length; i++) {
    const element = allPosters[i];
    let movieId = allPosters[i].getAttribute("data-movie-id");
    let type = allPosters[i].getAttribute("data-type");
    element.onclick = async function () {
      if (type == "movie") {
        let movieData = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=1a08c634ec1bc9d64558c15c3e88cdbf`,
          requestOptions
        );
        var movieDataJson = await movieData.json();
        console.log(movieDataJson);
      } else {
        let showData = await fetch(
          `https://api.themoviedb.org/3/tv/${movieId}?api_key=1a08c634ec1bc9d64558c15c3e88cdbf`,
          requestOptions
        );
        var showDataJson = await showData.json();
        console.log(showDataJson);
      }
      console.log("Clicked");
      info.style.width = "50vw";
      info.style.height = "80vh";
      setTimeout(function () {
        blurScreen.style.display = "block";
        closeBtn.style.display = "block";
        table.style.display = "block";
        if (type == "movie") {
          table.insertAdjacentHTML(
            "afterbegin",
            `<tr><th>Description</th><td>${movieDataJson.overview}</td></tr>`
          );
        } else {
          table.insertAdjacentHTML(
            "afterbegin",
            `<tr><td>${showDataJson.overview}</td></tr>`
          );
        }
      }, 50);

      function close() {
        info.style.width = "0";
        info.style.height = "0";
        closeBtn.style.display = "none";
        blurScreen.style.display = "none";
        table.style.display = "none";
        table.innerHTML = "";
      }
      closeBtn.addEventListener("click", close);
      blurScreen.addEventListener("click", close);
    };
  }
}

getMovies();
