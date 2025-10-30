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

export async function getPopularMovies(page?: number): Promise<Movie[]> {
  const response = await api.get("/movie/popular", {
    params: { page },
  });
  return response.data.results;
}

export async function searchMovies(query: string, page?: number): Promise<Movie[]> {
  const response = await api.get("/search/movie", {
    params: { query, page },
  });
  return response.data.results;
}

export async function getMovieDetails(id: number): Promise<Movie> {
  const response = await api.get(`/movie/${id}`);
  return response.data;
}
