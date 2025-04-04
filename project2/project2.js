const TMDB_API_KEY = "87eac00fab4cdba39f47bbcc14670605";
const TMDB_NOW_PLAYING_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
const TMDB_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=`;

const FOURSQUARE_API_KEY = "fsq34LoLOQbGqKH52s4nmAyDA/6++N3S7VxFtSLSGV3s3q0=";
const FOURSQUARE_URL = "https://api.foursquare.com/v3/places/search";

// Load Now Playing Movies
document.addEventListener("DOMContentLoaded", fetchMovies);

async function fetchMovies() {
    try {
        const response = await fetch(TMDB_NOW_PLAYING_URL);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// Search Movies
async function searchMovies() {
    const query = document.getElementById("search").value.trim();
    if (!query) {
        alert("Please enter a movie name!");
        return;
    }

    try {
        const response = await fetch(`${TMDB_SEARCH_URL}${query}`);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error("Error searching movies:", error);
    }
}

// Display Movies
function displayMovies(movies) {
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";

    movies.forEach(movie => {
        if (!movie.poster_path) return;

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

// Find Theaters Using Foursquare
async function findTheaters() {
    const location = document.getElementById("location").value.trim();
    if (!location) {
        alert("Please enter a city or ZIP code!");
        return;
    }

    try {
        const response = await fetch(`${FOURSQUARE_URL}?query=movie theater&near=${location}&limit=10`, {
            headers: {
                "Authorization": FOURSQUARE_API_KEY,
                "Accept": "application/json"
            }
        });

        const data = await response.json();
        displayTheaters(data.results);
    } catch (error) {
        console.error("Error fetching theaters:", error);
    }
}

// Display Theaters
function displayTheaters(theaters) {
    const theaterList = document.getElementById("theater-list");
    theaterList.innerHTML = "";

    theaters.forEach(theater => {
        const theaterCard = document.createElement("div");
        theaterCard.classList.add("theater-card");
        theaterCard.innerHTML = `
            <h3>${theater.name}</h3>
            <p>${theater.location.formatted_address}</p>
        `;
        theaterList.appendChild(theaterCard);
    });
}

