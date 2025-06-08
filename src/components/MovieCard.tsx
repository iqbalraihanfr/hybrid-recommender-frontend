import React from "react";
import { Link } from "react-router-dom";
import { Star, Play, Plus, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Movie {
  id: number;
  title: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  genre_ids?: number[];
  asin?: string; // IMDB ID
  score?: number;
  image_url?: string;
}

interface MovieCardProps {
  movie: Movie;
  showDetails?: boolean;
}

// const OMDB_API_KEY = "dd23a155";

const MovieCard = ({ movie, showDetails = false }: MovieCardProps) => {
  // Get poster from OMDB using the movie.asin (IMDB ID)
  const [posterUrl, setPosterUrl] = React.useState("/placeholder.svg");

  // React.useEffect(() => {
  //   const fetchPoster = async () => {
  //     if (!movie.asin) {
  //       setPosterUrl("/placeholder.svg");
  //       return;
  //     }
  //     try {
  //       const response = await fetch(
  //         `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${movie.asin}`
  //       );
  //       const data = await response.json();
  //       if (data.Poster && data.Poster !== "N/A") {
  //         setPosterUrl(data.Poster);
  //       } else {
  //         setPosterUrl("/placeholder.svg");
  //       }
  //     } catch (error) {
  //       setPosterUrl("/placeholder.svg");
  //     }
  //   };
  //   fetchPoster();
  // }, [movie.asin]);

  React.useEffect(() => {
    if (movie.image_url) {
      setPosterUrl(movie.image_url);
    } else {
      setPosterUrl("/placeholder.svg");
    }
  }, [movie.image_url]);
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;

  return (
    <Card className="group bg-gray-900/50 border-gray-800 overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Overlay with controls */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              <Play className="h-4 w-4 mr-1" />
              Play
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 text-white hover:bg-white/10"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Rating badge */}
        {rating && (
          <div className="absolute top-2 right-2 bg-black/80 rounded-md px-2 py-1 flex items-center space-x-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-white font-medium">{rating}</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-white text-base mb-1 line-clamp-2">
          {movie.title}
        </h3>
        {showDetails && (
          <>
            <div className="flex items-center text-xs text-gray-400 mb-2">
              {movie.release_date && (
                <span className="flex items-center mr-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  {movie.release_date.split("-")[0]}
                </span>
              )}
              {movie.score !== undefined && (
                <span className="ml-2">Score: {movie.score.toFixed(2)}</span>
              )}
            </div>
            {movie.overview && (
              <p className="text-xs text-gray-300 line-clamp-3 mb-2">
                {movie.overview}
              </p>
            )}
            {movie.genre_ids && (
              <div className="flex flex-wrap gap-1 mt-1">
                {movie.genre_ids.map((genre) => (
                  <Badge key={genre} variant="secondary" className="text-xs">
                    {genre}
                  </Badge>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
