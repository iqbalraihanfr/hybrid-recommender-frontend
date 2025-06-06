import { useState, useEffect } from "react";
import { preferencesService } from "@/api/preferences";
import { movieService, Movie } from "@/api/movies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MovieCard } from "@/components/movies/MovieCard";
import { toast } from "sonner";

export function WatchHistory() {
  const [watchHistory, setWatchHistory] = useState<
    { movieId: number; watchedAt: string }[]
  >([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWatchHistory();
  }, []);

  const loadWatchHistory = async () => {
    try {
      const history = await preferencesService.getWatchHistory();
      setWatchHistory(history);

      // Load movie details for each history item
      const movieDetails = await Promise.all(
        history.map((item) => movieService.getMovieById(item.movieId))
      );
      setMovies(movieDetails);
    } catch (error) {
      toast.error("Failed to load watch history");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading watch history...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watch History</CardTitle>
      </CardHeader>
      <CardContent>
        {movies.length === 0 ? (
          <div className="text-center text-gray-500">
            No movies in your watch history yet
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.map((movie, index) => (
              <div key={movie.id} className="relative">
                <MovieCard movie={movie} />
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {new Date(watchHistory[index].watchedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
