
const TMDB_API_KEY = 'your_tmdb_api_key_here'; // Replace with actual API key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_count: number;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
}

class TMDBService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = TMDB_API_KEY;
    this.baseUrl = TMDB_BASE_URL;
  }

  private async fetchFromTMDB(endpoint: string): Promise<any> {
    try {
      const url = `${this.baseUrl}${endpoint}?api_key=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('TMDB API Error:', error);
      throw error;
    }
  }

  async getPopularMovies(page: number = 1): Promise<{ results: Movie[]; total_pages: number }> {
    return this.fetchFromTMDB(`/movie/popular?page=${page}`);
  }

  async getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<{ results: Movie[] }> {
    return this.fetchFromTMDB(`/trending/movie/${timeWindow}`);
  }

  async getTopRatedMovies(page: number = 1): Promise<{ results: Movie[]; total_pages: number }> {
    return this.fetchFromTMDB(`/movie/top_rated?page=${page}`);
  }

  async getNowPlayingMovies(page: number = 1): Promise<{ results: Movie[]; total_pages: number }> {
    return this.fetchFromTMDB(`/movie/now_playing?page=${page}`);
  }

  async getUpcomingMovies(page: number = 1): Promise<{ results: Movie[]; total_pages: number }> {
    return this.fetchFromTMDB(`/movie/upcoming?page=${page}`);
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.fetchFromTMDB(`/movie/${movieId}`);
  }

  async getSimilarMovies(movieId: number): Promise<{ results: Movie[] }> {
    return this.fetchFromTMDB(`/movie/${movieId}/similar`);
  }

  async searchMovies(query: string, page: number = 1): Promise<{ results: Movie[]; total_pages: number }> {
    return this.fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
  }

  async getMoviesByGenre(genreId: number, page: number = 1): Promise<{ results: Movie[]; total_pages: number }> {
    return this.fetchFromTMDB(`/discover/movie?with_genres=${genreId}&page=${page}`);
  }

  async getGenres(): Promise<{ genres: { id: number; name: string }[] }> {
    return this.fetchFromTMDB('/genre/movie/list');
  }

  getImageUrl(path: string, size: 'w300' | 'w500' | 'w780' | 'original' = 'w500'): string {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : '/placeholder.svg';
  }
}

export const tmdbService = new TMDBService();
