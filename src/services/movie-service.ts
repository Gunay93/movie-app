export async function getPopularMovies(page = 1) {
  const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();

  return {
    movies: data.results,
    totalPages: data.total_pages,
  };
}

export async function searchMovies(query: string, page = 1) {
  const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to search movies");
  }

  const data = await response.json();

  return {
    movies: data.results,
    totalPages: data.total_pages,
  };
}

export async function getMovieById(id: string) {
  const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie detail");
  }

  return response.json();
}