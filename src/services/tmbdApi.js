const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzc1YjNiMTBlZTJjMzU4OWFjNmQ4NjA4YzFjMTEyYyIsIm5iZiI6MTc2NjkzNzA5MC4xMTIsInN1YiI6IjY5NTE1MjAyOWIyNzYzMTQxMmNiY2Y2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._5hWAIC2fKOOKMPUmyTnhtMYrImW45P32F0sdnpX6E8"

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

// 🔥 Trending movies for Hero & Home
export const fetchTrendingMovies = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/day`, { headers });
  const data = await res.json();
  return data.results;
};

// 🎭 Movies by Genre
export const fetchMoviesByGenre = async (genreId) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`,
    { headers }
  );
  const data = await res.json();
  return data.results;
};

// 🔍 Search Movies
export const searchMovies = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${query}&include_adult=false`,
    { headers }
  );
  const data = await res.json();
  return data.results;
};

// 🎬 Movie Details
export const fetchMovieDetails = async (id) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?append_to_response=credits,videos`,
    { headers }
  );
  return await res.json();
};

// 🔁 Similar Movies
export const fetchSimilarMovies = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar`, { headers });
  const data = await res.json();
  return data.results;
};
