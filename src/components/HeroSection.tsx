
import React from 'react';
import { Play, Info, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

interface HeroSectionProps {
  movie: Movie;
}

const HeroSection = ({ movie }: HeroSectionProps) => {
  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '/placeholder.svg';

  const year = new Date(movie.release_date).getFullYear();
  const rating = movie.vote_average.toFixed(1);

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img 
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {movie.title}
            </h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-medium">{rating}</span>
              </div>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                {year}
              </Badge>
            </div>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {movie.overview}
            </p>

            <div className="flex space-x-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8">
                <Play className="h-5 w-5 mr-2" />
                Play
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-white/10 px-8">
                <Info className="h-5 w-5 mr-2" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
