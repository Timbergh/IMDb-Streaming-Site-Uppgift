var requestOptions = {
  method: "GET",
  redirect: "follow",
};

// HERO MOVIE
fetch(
  "https://api.themoviedb.org/3/trending/movie/day?api_key=1a08c634ec1bc9d64558c15c3e88cdbf",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    let allItems = result.results;
    let movie_id = allItems[0].id;
    fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=1a08c634ec1bc9d64558c15c3e88cdbf&language=en-US`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        let movieTrailer = result.results;
        let link = `https://www.youtube.com/embed/${movieTrailer[0].key}?autoplay=1&rel=0&showinfo=0&controls=0&mute=0`;
        let trailer = `<iframe width="100%" height="100%" src="${link}" frameborder="0"</iframe>`;
        document.getElementById("hero").innerHTML += trailer;
      })
      .catch((error) => console.log("error", error));
  })
  .catch((error) => console.log("error", error));

// POPULAR MOVIES
fetch(
  "https://api.themoviedb.org/3/movie/popular?api_key=1a08c634ec1bc9d64558c15c3e88cdbf&language=en-US&page=1",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    let allItems = result.results;
    allItems.forEach((item) => {
      let poster = item.poster_path;
      let movie = `<li><img src="https://image.tmdb.org/t/p/w154${poster}"></li>`;
      document.getElementById("popular-movies").innerHTML += movie;
    });
    let pmLeft = document.getElementById("pm-left");

    pmLeft.onclick = function () {
      document.getElementById("popular-movies").scrollLeft -= 1000;
    };

    let pmRight = document.getElementById("pm-right");

    pmRight.onclick = function () {
      document.getElementById("popular-movies").scrollLeft += 1000;
    };
  })
  .catch((error) => console.log("error", error));

// TOP RATED MOVIES
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?api_key=1a08c634ec1bc9d64558c15c3e88cdbf&language=en-US&page=1",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    let allItems = result.results;
    allItems.forEach((item) => {
      let poster = item.poster_path;
      let movie = `<li><img src="https://image.tmdb.org/t/p/w154${poster}"></li>`;
      document.getElementById("toprated-movies").innerHTML += movie;
    });
    let trmLeft = document.getElementById("trm-left");

    trmLeft.onclick = function () {
      document.getElementById("toprated-movies").scrollLeft -= 1000;
    };

    let trmRight = document.getElementById("trm-right");

    trmRight.onclick = function () {
      document.getElementById("toprated-movies").scrollLeft += 1000;
    };
  })
  .catch((error) => console.log("error", error));

// POPULAR SHOWS
fetch(
  "https://api.themoviedb.org/3/tv/popular?api_key=1a08c634ec1bc9d64558c15c3e88cdbf&language=en-US&page=1",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    let allItems = result.results;
    allItems.forEach((item) => {
      let poster = item.poster_path;
      let movie = `<li><img src="https://image.tmdb.org/t/p/w154${poster}"></li>`;
      document.getElementById("popular-shows").innerHTML += movie;
    });
    let psLeft = document.getElementById("ps-left");

    psLeft.onclick = function () {
      document.getElementById("popular-shows").scrollLeft -= 1000;
    };

    let psRight = document.getElementById("ps-right");

    psRight.onclick = function () {
      document.getElementById("popular-shows").scrollLeft += 1000;
    };
  })
  .catch((error) => console.log("error", error));

// TOP RATED SHOWS
fetch(
  "https://api.themoviedb.org/3/tv/top_rated?api_key=1a08c634ec1bc9d64558c15c3e88cdbf&language=en-US&page=1",
  requestOptions
)
  .then((response) => response.json())
  .then((result) => {
    console.log(result);
    let allItems = result.results;
    allItems.forEach((item) => {
      let poster = item.poster_path;
      let movie = `<li><img src="https://image.tmdb.org/t/p/w154${poster}"></li>`;
      document.getElementById("toprated-shows").innerHTML += movie;
    });
    let trsLeft = document.getElementById("trs-left");

    trsLeft.onclick = function () {
      document.getElementById("toprated-shows").scrollLeft -= 1000;
    };

    let trsRight = document.getElementById("trs-right");

    trsRight.onclick = function () {
      document.getElementById("toprated-shows").scrollLeft += 1000;
    };
  })
  .catch((error) => console.log("error", error));
