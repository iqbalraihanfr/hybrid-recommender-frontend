
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Play, Plus, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

interface MovieCardProps {
  movie: Movie;
  showDetails?: boolean;
}

const MovieCard = ({ movie, showDetails = false }: MovieCardProps) => {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.svg';

  const year = new Date(movie.release_date).getFullYear();
  const rating = movie.vote_average.toFixed(1);

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
            <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-white/10">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Rating badge */}
        <div className="absolute top-2 right-2 bg-black/80 rounded-md px-2 py-1 flex items-center space-x-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-white font-medium">{rating}</span>
        </div>
      </div>

      {showDetails && (
        <CardContent className="p-4">
          <Link to={`/movie/${movie.id}`}>
            <h3 className="font-semibold text-white text-sm mb-2 hover:text-red-400 transition-colors">
              {movie.title}
            </h3>
          </Link>
          
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{year}</span>
            </div>
          </div>

          <p className="text-xs text-gray-300 line-clamp-2">
            {movie.overview}
          </p>
        </CardContent>
      )}
    </Card>
  );
};

export default MovieCard;
