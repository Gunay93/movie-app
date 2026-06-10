export async function getPopularMovies(page = 1) {
  const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();

  return data.results;
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