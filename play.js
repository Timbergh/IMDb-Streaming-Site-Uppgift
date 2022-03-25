console.log(window.location);
let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("movieid");
let type = searchParams.get("type");
console.log(id);

async function getMovie() {
  var details = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=1a08c634ec1bc9d64558c15c3e88cdbf`
  );

  let detailsJson = await details.json();
  console.log(detailsJson);

  var movieVideo = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=1a08c634ec1bc9d64558c15c3e88cdbf`
  );

  let movieVideoJson = await movieVideo.json();
  console.log(movieVideoJson);

  let movieContainer = document.getElementById("movie-container");

  if (type == "movie") {
    let randomVideo = Math.floor(Math.random() * movieVideoJson.results.length);
    if (movieVideoJson.results.length == 0) {
      movieContainer.innerHTML = "";
    } else {
      movieContainer.insertAdjacentHTML(
        "afterbegin",
        `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${movieVideoJson.results[randomVideo].key}?&rel=0&mute=0" frameborder="0"</iframe>`
      );
    }
  }
}

getMovie();
