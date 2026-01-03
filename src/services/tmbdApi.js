const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

console.log("TMDB BASE URL:", import.meta.env.VITE_TMDB_BASE_URL);
console.log("TMDB TOKEN EXISTS:", !!import.meta.env.VITE_TMDB_TOKEN);


const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

export const fetchPersonalizedMovies = async (genres = [], language = "en") => {
  const genreQuery = genres.join(",")

  const res = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genreQuery}&with_original_language=${language}&sort_by=popularity.desc`,
    { headers }
  )

  const data = await res.json()
  return data.results
}


export const fetchTrendingMovies = async () => {
  const res = await fetch(`${BASE_URL}/trending/movie/day`, { headers });
  const data = await res.json();
  return data.results;
};

export const fetchMoviesByGenre = async (genreId) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`,
    { headers }
  );
  const data = await res.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${query}&include_adult=false`,
    { headers }
  );
  const data = await res.json();
  return data.results;
};

export const fetchMovieDetails = async (id) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?append_to_response=credits,videos`,
    { headers }
  );
  return await res.json();
};

export const fetchSimilarMovies = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar`, { headers });
  const data = await res.json();
  return data.results;
};
