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

export const fetchBrowseMovies = async (filters) => {

  let sortBy = "release_date.desc"

  if (filters.sort === "old") sortBy = "release_date.asc"
  if (filters.sort === "rating") sortBy = "vote_average.desc"

  const res = await fetch(
    `${BASE_URL}/discover/movie?` +
    `with_genres=${filters.genre}` +
    `&with_original_language=${filters.language}` +
    `&sort_by=${sortBy}` +
    `&page=${filters.page}`,
    { headers } 
  )

  const data = await res.json()
  return data.results
}


export const fetchTopRatedMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/top_rated`, { headers })
  return (await res.json()).results
}

export const fetchPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular`, { headers })
  return (await res.json()).results
}

export const fetchNowPlayingMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/now_playing`, { headers })
  return (await res.json()).results
}

export const fetchPopularKDramas = async () => {
  const res = await fetch(
    `${BASE_URL}/discover/tv?with_original_language=ko&sort_by=popularity.desc`,
    { headers }
  )
  return (await res.json()).results
}

export const fetchPopularAnime = async () => {
  const res = await fetch(
    `${BASE_URL}/discover/tv?with_genres=16&with_original_language=ja&sort_by=popularity.desc`,
    { headers }
  )
  return (await res.json()).results
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

export const searchPeople = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/person?query=${query}&include_adult=false`,
    { headers }
  )
  const data = await res.json()
  return data.results
}

export const searchMulti = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&include_adult=false`,
    { headers }
  )

  const data = await res.json()

  return data.results.filter(
    item => item.media_type === "movie" || item.media_type === "person"
  )
}


export const fetchMovieDetails = async (id) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?append_to_response=credits,videos`,
    { headers }
  );
  return await res.json();
};

export const fetchPersonDetails = async (id) => {
  const res = await fetch(
    `${BASE_URL}/person/${id}?append_to_response=movie_credits,external_ids`,
    { headers }
  )
  return await res.json()
}

export const fetchSimilarMovies = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar`, { headers });
  const data = await res.json();
  return data.results;
};

export const fetchMovieCredits = async (id) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/credits`,
    { headers }
  )
  const data = await res.json()
  return data
}

export const fetchMovieReviews = async (id, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/reviews?page=${page}`,
    { headers }
  )
  const data = await res.json()
  return data
}

export const discoverByGenre = async (genres, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genres}&sort_by=popularity.desc&page=${page}`,
    { headers }
  )
  const data = await res.json()
  return data.results || []
}

export const searchByMoodKeyword = async (keyword, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(keyword)}&page=${page}`,
    { headers }
  )
  const data = await res.json()
  return data.results || []
}

