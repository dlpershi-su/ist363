const TMDB_API_KEY = "your_tmdb_api_key";
const GOOGLE_PLACES_API_KEY = "your_google_places_api_key";
const TMDB_URL = "https://api.themoviedb.org/3/movie/popular?api_key=" + TMDB_API_KEY;
const GOOGLE_PLACES_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";

document.addEventListener("DOMContentLoaded", fetchMovies);

async function fetchMovies() {
    try {
        const response = await fetch(TMDB_URL);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function displayMovies(movies) {
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>⭐ ${movie.vote_average}</p>
        `;
        movieList.appendChild(movieCard);
    });
}

async function findTheaters() {
    const location = document.getElementById("location").value.trim();
    if (!location) {
        alert("Please enter a city or ZIP code!");
        return;
    }

    try {
        const response = await fetch(`${GOOGLE_PLACES_URL}movie+theaters+in+${location}&key=${GOOGLE_PLACES_API_KEY}`);
        const data = await response.json();
        displayTheaters(data.results);
    } catch (error) {
        console.error("Error fetching theaters:", error);
    }
}

function displayTheaters(theaters) {
    const theaterList = document.getElementById("theater-list");
    theaterList.innerHTML = "";

    theaters.forEach(theater => {
        const theaterCard = document.createElement("div");
        theaterCard.classList.add("theater-card");
        theaterCard.innerHTML = `
            <h3>${theater.name}</h3>
            <p>${theater.formatted_address}</p>
        `;
        theaterList.appendChild(theaterCard);
    });
}
