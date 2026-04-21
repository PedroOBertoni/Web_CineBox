// Chave pública de demonstração do TMDB (uso acadêmico)
const KEY = "2dca580c2a14b55200e784d157207b4d";
const BASE = "https://api.themoviedb.org/3";
export const IMG = "https://image.tmdb.org/t/p/w500";
export const IMG_ORIGINAL = "https://image.tmdb.org/t/p/original";

const get = async (path, params = {}) => {
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set("api_key", KEY);
  url.searchParams.set("language", "pt-BR");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url);
  return res.json();
};

// Filtra filmes sem poster ou sem backdrop
const withPoster = (movies = []) =>
  movies.filter((m) => m.poster_path && m.backdrop_path);

export const fetchTrending = async () => {
  const data = await get("/trending/movie/week");
  return withPoster(data.results);
};

export const fetchByGenre = async (genreId, page = 1) => {
  const p1 = page * 2 - 1;
  const p2 = page * 2;
  const [d1, d2] = await Promise.all([
    get("/discover/movie", { with_genres: genreId, sort_by: "popularity.desc", "vote_count.gte": 200, page: p1 }),
    get("/discover/movie", { with_genres: genreId, sort_by: "popularity.desc", "vote_count.gte": 200, page: p2 }),
  ]);
  const movies = withPoster([...(d1.results || []), ...(d2.results || [])]).slice(0, 24);
  const totalPages = Math.min(Math.floor((d1.total_pages || 1) / 2), 20);
  return { movies, totalPages };
};

export const fetchPopular = async (page = 1) => {
  const p1 = page * 2 - 1;
  const p2 = page * 2;
  const [d1, d2] = await Promise.all([
    get("/movie/popular", { page: p1 }),
    get("/movie/popular", { page: p2 }),
  ]);
  const movies = withPoster([...(d1.results || []), ...(d2.results || [])]).slice(0, 24);
  const totalPages = Math.min(Math.floor((d1.total_pages || 1) / 2), 20);
  return { movies, totalPages };
};

export const searchMovies = async (query, page = 1) => {
  const p1 = page * 2 - 1;
  const p2 = page * 2;
  const [d1, d2] = await Promise.all([
    get("/search/movie", { query, page: p1, include_adult: false }),
    get("/search/movie", { query, page: p2, include_adult: false }),
  ]);
  const movies = withPoster([...(d1.results || []), ...(d2.results || [])]).slice(0, 24);
  const totalPages = Math.min(Math.floor((d1.total_pages || 1) / 2), 10);
  return { movies, totalPages };
};

export const fetchMovieDetails = async (id) => {
  return get(`/movie/${id}`, { append_to_response: "credits,videos" });
};
