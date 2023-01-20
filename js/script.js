const url = "https://striveschool-api.herokuapp.com/api/movies";
const movieList = [];

const getGenres = async () => {
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/movies",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NGQ2M2U3MzczODAwMTUzNzQ0MDIiLCJpYXQiOjE2NzQyMTEyNjIsImV4cCI6MTY3NTQyMDg2Mn0._NrIlwNUTDudWXp8c9pcyhgEgrjanVrYaqwpDw3Sd1E",
        },
      }
    );
    const genres = await response.json();
    // console.log(genres);
    createCatLinks(genres);
  } catch (error) {
    console.error(error);
  }
};

const createCatLinks = async (genres) => {
  genres.forEach((genre) => {
    console.log("https://striveschool-api.herokuapp.com/api/movies/" + genre);
    let finalUrl = "https://striveschool-api.herokuapp.com/api/movies/" + genre;
    fetchMovies(finalUrl, genre);
    // renderGenres(genre);
    // console.log(movies);
  });
  //   console.log(genres[0].name);
};

const fetchMovies = async (finalUrl, genre) => {
  try {
    const response = await fetch(finalUrl, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NGQ2M2U3MzczODAwMTUzNzQ0MDIiLCJpYXQiOjE2NzQyMTEyNjIsImV4cCI6MTY3NTQyMDg2Mn0._NrIlwNUTDudWXp8c9pcyhgEgrjanVrYaqwpDw3Sd1E",
      },
    });

    const movies = await response.json();
    // console.log(movies)
    // renderMovies(movies);
    renderMovies(movies, genre);
    movies.forEach((movie) => {
      movieList.push(movie);
      //   console.log(movie);
    });

    // console.log(movieList);
  } catch (error) {
    console.error(error);
  }
};
// const renderGenres = (genre) => {
//   console.log("test");
//   let container = document.getElementById("movie-container");
//   container.innerHTML += `<div class="container-fluid px-5 pt-5 pb-2">
//   <h2>${genre}</h2></div>`;
// };

const renderMovies = (movies, genre) => {
  let container = document.getElementById("movie-container");
  console.log(movies, genre);
  container.innerHTML += `<div id="movie-container" class="container-fluid">
  <div class="container-fluid px-5 pt-5 pb-2">
      <h2>${genre}</h2>
      <div id="trendingCarousel-lg" class="carousel slide  d-lg-block" data-interval="false">
          <div class="carousel-inner">
          <div class="carousel-item active">
    <div id="${genre}" class="row py-2 mx-n1 no-wrap"></div> </div></div> </div> 
    <a class="carousel-control-prev" href="#trendingCarousel-lg" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#trendingCarousel-lg" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a></div> </div>`;

  console.log(movies.length);
  let innercontainer = document.getElementById(genre);
  movies.forEach((movie) => {
    console.log("count");
    innercontainer.innerHTML += ` 
        <div class="col-6 col-md-3 col-lg-2 px-1">
            <div class="card">
                <img class="card-img-top" src="${movie.imageUrl}">
                </div>
            
                <a href="#" class="card-link"><button class='btn btn-danger m-1' onclick='deleteMovie("${movie._id}")'>remove</button></a>

                <a href="/backoffice.html?id=${movie._id}" class="card-link"><button class='btn btn-primary m-1' onclick='editMovie("${movie._id}")'>edit</button></a>
        </div>`;
  });
};

const deleteMovie = async (id) => {
  try {
    let res = await fetch(url + "/" + id, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M5NGQ2M2U3MzczODAwMTUzNzQ0MDIiLCJpYXQiOjE2NzQyMTEyNjIsImV4cCI6MTY3NTQyMDg2Mn0._NrIlwNUTDudWXp8c9pcyhgEgrjanVrYaqwpDw3Sd1E",
      },
    });
    if (res.ok) {
      console.log("deleted");
      document.getElementById("movie-container").innerHTML = "";
      getGenres();
    }
  } catch (error) {}
};

window.onload = async () => {
  await getGenres();
};
