import { Movie } from "@/api/movies";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Star } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  onRate?: (rating: number) => void;
}

export function MovieCard({ movie, onRate }: MovieCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <CardHeader className="p-0">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-500">{movie.releaseYear}</p>
        <div className="flex items-center mt-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="ml-1 text-sm">{movie.averageRating.toFixed(1)}</span>
          <span className="ml-1 text-sm text-gray-500">
            ({movie.totalRatings} ratings)
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {movie.genres.map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 text-xs bg-gray-100 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </CardContent>
      {onRate && (
        <CardFooter className="p-4 pt-0">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => onRate(rating)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Star
                  className={`w-5 h-5 ${
                    rating <= movie.averageRating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
