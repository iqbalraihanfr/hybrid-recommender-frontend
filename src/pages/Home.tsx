import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieCard from "@/components/MovieCard";
import MovieCarousel from "@/components/MovieCarousel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Film, Star } from "lucide-react";
import { mockUsers } from "@/data/mockData";

interface Movie {
  id: string | number;
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

interface UserProfile {
  id: number;
  name: string;
  avatar: string;
  watchedCount: number;
  favoriteGenres: string[];
  lastActive: string;
}

interface OmdbMovie {
  Title: string;
  Poster: string;
  Year: string;
  imdbID: string;
}

export default function Home() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

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
      const user = mockUsers.find(u => u.id.toString() === userId);
      setCurrentUser(user);
    }
  }, [userId, fetchRecommendation]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_OMDB_BASE_URL}apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }&s=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) throw new Error("Failed to search movies");
      const data = await response.json();
      console.log(data);
      if (data.Response === "True") {
        const results = data.Search.map((item: OmdbMovie) => ({
          id: item.imdbID,
          title: item.Title,
          image_url: item.Poster !== "N/A" ? item.Poster : "/placeholder.svg",
          asin: item.imdbID,
        }));
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
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

  const heroMovie = recommendation?.top_recommendations?.[0] || recommendation?.watched_items?.[0];

  return (
    <div className="bg-black min-h-screen text-white">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-red-600">MovieFlix</div>
          <form onSubmit={handleSearch} className="flex gap-2 items-center">
            <Input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 border-gray-700 focus:border-red-500 w-64 hidden md:block"
            />
            <Button type="submit" variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
          </form>
          <div className="flex items-center gap-4">
            {currentUser && <span className="hidden sm:block">Welcome, {currentUser.name.split(' ')[0]}</span>}
            <Button
              onClick={handleChangeProfile}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <User className="w-4 h-4 mr-2" />
              Change Profile
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">

              {heroMovie && (
          <div className="relative h-[60vh] mb-12 rounded-lg overflow-hidden">
            <img src={heroMovie.image_url} alt={heroMovie.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-12">
              <h1 className="text-5xl font-bold mb-4">{heroMovie.title}</h1>
              {heroMovie.score && <div className="flex items-center gap-2 text-yellow-400 mb-4"><Star/> {heroMovie.score.toFixed(1)}/10</div>}
              <Button className="bg-red-600 hover:bg-red-700"><Film className="mr-2 h-4 w-4"/> Watch Now</Button>
            </div>
          </div>
        )}

        {error && <div className="text-red-500 mb-4 bg-red-500/10 p-4 rounded-md">{error}</div>}

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4">Loading Recommendations...</p>
        </div>
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
          {searchQuery && searchResults.length > 0 && (
            <>
              <MovieCarousel
                title={`Search results for "${searchQuery}"`}
                movies={searchResults}
                showDetails={true}
              />
            </>
          )}
        </>
      )}
      </main>
    </div>
  );
}
