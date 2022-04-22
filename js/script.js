var requestOptions = {
  method: "GET",
  redirect: "follow",
};

const URL = "https://api.themoviedb.org/3";
const KEY = "1a08c634ec1bc9d64558c15c3e88cdbf";

async function getMovies() {
  let heroTrailer = await fetch(
    `${URL}/tv/94605/videos?api_key=${KEY}&language=en-US`,
    requestOptions
  );
  let heroTrailerJson = await heroTrailer.json();
  console.log(heroTrailerJson);

  let popularMovies = await fetch(
    `${URL}/movie/popular?api_key=${KEY}&language=en-US&page=1`,
    requestOptions
  );
  let popularMoviesJson = await popularMovies.json();
  console.log(popularMoviesJson);

  let topRatedMovies = await fetch(
    `${URL}/movie/top_rated?api_key=${KEY}&language=en-US&page=1`,
    requestOptions
  );
  let topRatedMoviesJson = await topRatedMovies.json();
  console.log(topRatedMoviesJson);

  let popularShows = await fetch(
    `${URL}/tv/popular?api_key=${KEY}&language=en-US&page=1`,
    requestOptions
  );
  let popularshowsJson = await popularShows.json();
  console.log(popularshowsJson);

  let topRatedShows = await fetch(
    `${URL}/tv/top_rated?api_key=${KEY}&language=en-US&page=1`,
    requestOptions
  );
  let topRatedShowsJson = await topRatedShows.json();
  console.log(topRatedMoviesJson);

  // Sätt eventlyssnare på alla bilder

  let link = `https://www.youtube.com/embed/${heroTrailerJson.results[4].key}?autoplay=1&rel=0&showinfo=0&controls=0&mute=0`;
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

  let allPosters = document.getElementsByTagName("img");
  let info = document.getElementById("popup");
  let closeBtn = document.getElementById("close");
  let btnContainer = document.getElementById("button-container");
  let blurScreen = document.getElementById("blur-screen");
  let table = document.getElementById("info-table");
  let video = document.getElementById("video");
  let name = document.getElementById("name");

  // Få information om filmer/serier
  console.log(allPosters);
  for (let i = 0; i < allPosters.length; i++) {
    const element = allPosters[i];
    let movieId = allPosters[i].getAttribute("data-movie-id");
    let type = allPosters[i].getAttribute("data-type");
    element.onclick = async function () {
      if (type == "movie") {
        let movieData = await fetch(
          `${URL}/movie/${movieId}?api_key=${KEY}`,
          requestOptions
        );
        var movieDataJson = await movieData.json();
        console.log(movieDataJson);
        let movieTrailer = await fetch(
          `${URL}/movie/${movieId}/videos?api_key=${KEY}&language=en-US`,
          requestOptions
        );
        var movieTrailerJson = await movieTrailer.json();
        console.log(movieTrailerJson);
      } else {
        let showData = await fetch(
          `${URL}/tv/${movieId}?api_key=${KEY}`,
          requestOptions
        );
        var showDataJson = await showData.json();
        console.log(showDataJson);
        let showTrailer = await fetch(
          `${URL}/tv/${movieId}/videos?api_key=${KEY}&language=en-US`,
          requestOptions
        );
        var showTrailerJson = await showTrailer.json();
        console.log(showTrailerJson);
      }
      console.log("Clicked");
      info.style.width = "70vw";
      info.style.height = "85vh";
      setTimeout(function () {
        blurScreen.style.display = "block";
        closeBtn.style.display = "block";
        table.style.display = "block";

        // x kallas senare som movieDataJson eller showDataJson eftersom de har olika information
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
        function infoFuntion(x) {
          name.insertAdjacentHTML("afterbegin", `<h1>${titleType(x)}</h1>`);
          table.insertAdjacentHTML(
            "afterbegin",
            `<tr><th>Description</th><th>Genre</th><th>Rating</th><th>Release</th></tr><tr><td>${
              x.overview
            }</td><td>${genre(x)}</td><td>${
              x.vote_average
            }</td><td>${releaseType(x)}</td></tr>`
          );
          btnContainer.insertAdjacentHTML(
            "afterbegin",
            `<a href="play.html?movieid=${movieId}&type=${type}" class="play-link"
            ><button id="play" class="play-buttons">Play</button></a>`
          );
        }
        if (type == "movie") {
          let randomVideo = Math.floor(
            Math.random() * movieTrailerJson.results.length
          );
          if (movieTrailerJson.results.length == 0) {
            video.innerHTML = "";
          } else {
            video.insertAdjacentHTML(
              "afterbegin",
              `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${movieTrailerJson.results[randomVideo].key}?&rel=0&mute=0" frameborder="0"</iframe>`
            );
          }
          infoFuntion(movieDataJson);
        } else {
          let randomVideo = Math.floor(
            Math.random() * showTrailerJson.results.length
          );
          if (showTrailerJson.results.length == 0) {
            video.innerHTML = "";
          } else {
            video.insertAdjacentHTML(
              "afterbegin",
              `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${showTrailerJson.results[randomVideo].key}?&rel=0&mute=0" frameborder="0"</iframe>`
            );
          }
          infoFuntion(showDataJson);
        }
      }, 50);
    };
  }
  function close() {
    let playBtn = document.getElementById("play");
    info.style.width = "0";
    info.style.height = "0";
    closeBtn.style.display = "none";
    blurScreen.style.display = "none";
    table.style.display = "none";
    table.innerHTML = "";
    video.innerHTML = "";
    name.innerHTML = "";
    playBtn.style.display = "none";
  }

  closeBtn.addEventListener("click", close);
  blurScreen.addEventListener("click", close);
}

getMovies();
