import api from "./api";

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path?: string;
  genres?: { id: number; name: string }[];
};

export type SearchResponse = {
  results: Movie[];
  total_results: number;
};

export async function getPopularMovies(page?: number, signal?: AbortSignal): Promise<Movie[]> {
  const response = await api.get("/movie/popular", {
    params: { page },
    signal,
  });
  return response.data.results;
}

export async function searchMovies(query: string, page?: number, signal?: AbortSignal): Promise<SearchResponse> {
  const response = await api.get("/search/movie", {
    params: { query, page },
    signal,
  });
  return { results: response.data.results, total_results: response.data.total_results };
}

export async function getMovieDetails(id: number, signal?: AbortSignal): Promise<Movie> {
  const response = await api.get(`/movie/${id}`, { signal });
  return response.data;
}
