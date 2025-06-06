import { useEffect, useState } from "react";
import { Movie, MovieFilters, movieService } from "@/api/movies";
import { MovieCard } from "@/components/movies/MovieCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface RecommendationItem {
  item_index: number;
  asin: string;
  title: string;
}

interface TopRecommendation {
  item_index: number;
  asin: string;
  title: string;
  score?: number;
}

interface Recommendation {
  user_index: number;
  watched_items: RecommendationItem[];
  top_recommendations: TopRecommendation[];
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<MovieFilters>({
    page: 1,
    limit: 20,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );

  useEffect(() => {
    loadMovies();
    fetchRecommendation();
  }, [filters]);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const response = await movieService.getMovies(filters);
      setMovies(response.movies);
      setError(null);
    } catch (err) {
      setError("Failed to load movies. Please try again later.");
      console.error("Error loading movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendation = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/recommend?id=1`
      );
      if (!response.ok) throw new Error("Failed to fetch recommendation");
      const data = await response.json();
      setRecommendation(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setRecommendation(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: searchQuery, page: 1 }));
  };

  const handleRate = async (movieId: number, rating: number) => {
    try {
      await movieService.rateMovie(movieId, rating);
      // Reload movies to get updated ratings
      loadMovies();
    } catch (err) {
      console.error("Error rating movie:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
          <Button type="submit">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </form>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRate={(rating) => handleRate(movie.id, rating)}
            />
          ))}
        </div>
      )}

      {!loading && movies.length === 0 && (
        <div className="text-center text-gray-500">
          No movies found. Try adjusting your search.
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4 mt-8">
        Hasil Rekomendasi dari FastAPI
      </h1>
      {loading && <div>Loading...</div>}
      {recommendation && (
        <div>
          <h2 className="text-lg font-semibold mb-2">
            User Index: {recommendation.user_index}
          </h2>
          <h3 className="font-semibold mt-4">Watched Items:</h3>
          <ul className="list-disc ml-6">
            {recommendation.watched_items.map((item, idx) => (
              <li key={idx}>
                {item.title} (ASIN: {item.asin})
              </li>
            ))}
          </ul>
          <h3 className="font-semibold mt-4">Top Recommendations:</h3>
          <ul className="list-disc ml-6">
            {recommendation.top_recommendations.map((rec, idx) => (
              <li key={idx}>
                {rec.title} (ASIN: {rec.asin})
                {rec.score !== undefined && ` - Score: ${rec.score}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
