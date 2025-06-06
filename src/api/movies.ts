import { api } from "./api";

export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  genres: string[];
  posterUrl: string;
  averageRating: number;
  totalRatings: number;
}

export interface MovieListResponse {
  movies: Movie[];
  total: number;
  page: number;
  totalPages: number;
}

export interface MovieFilters {
  page?: number;
  limit?: number;
  search?: string;
  genres?: string[];
  minRating?: number;
  yearFrom?: number;
  yearTo?: number;
}

export const movieService = {
  async getMovies(filters: MovieFilters = {}): Promise<MovieListResponse> {
    const response = await api.get<MovieListResponse>("/api/movies", {
      params: filters,
    });
    return response.data;
  },

  async getMovieById(id: number): Promise<Movie> {
    const response = await api.get<Movie>(`/api/movies/${id}`);
    return response.data;
  },

  async getRecommendations(): Promise<Movie[]> {
    const response = await api.get<Movie[]>("/api/recommendations/hybrid");
    return response.data;
  },

  async rateMovie(movieId: number, rating: number): Promise<void> {
    await api.post(`/api/movies/${movieId}/rate`, { rating });
  },
};
