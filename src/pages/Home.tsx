import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieCard from "@/components/MovieCard";
import MovieCarousel from "@/components/MovieCarousel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  asin: string;
  score?: number;
  image_url?: string;
}

interface Recommendation {
  user_index: number;
  watched_items: Movie[];
  top_recommendations: Movie[];
}

export default function Home() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );

  const fetchRecommendation = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/recommend?id=${userId}&top_k=10`
      );
      if (!response.ok) throw new Error("Failed to fetch recommendation");
      const data = await response.json();
      setRecommendation(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setRecommendation(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchRecommendation();
    }
  }, [userId, fetchRecommendation]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/search?query=${encodeURIComponent(
          searchQuery
        )}`
      );
      if (!response.ok) throw new Error("Failed to search movies");
      const data = await response.json();
      setRecommendation((prev) =>
        prev
          ? {
              ...prev,
              top_recommendations: data,
            }
          : null
      );
      setError(null);
    } catch (err) {
      setError("Failed to search movies. Please try again later.");
      console.error("Error searching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeProfile = () => {
    localStorage.removeItem("selectedUserId");
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
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
        <Button
          onClick={handleChangeProfile}
          variant="outline"
          className="flex items-center gap-2"
        >
          <User className="w-4 h-4" />
          Change Profile
        </Button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          {recommendation && (
            <>
              <MovieCarousel
                title="Recently Watched"
                movies={recommendation.watched_items}
                showDetails={true}
              />

              <MovieCarousel
                title="Recommended for You"
                movies={recommendation.top_recommendations}
                showDetails={true}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
