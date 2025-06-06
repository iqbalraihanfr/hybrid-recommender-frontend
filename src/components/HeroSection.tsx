import React from "react";
import { Play, Info, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  movie: {
    title: string;
    backdrop_path?: string;
    release_date?: string;
    vote_average?: number;
    overview?: string;
  };
}

const HeroSection = ({ movie }: HeroSectionProps) => {
  // Use a placeholder for the backdrop, or adapt to OMDB if you have a way to get a backdrop from OMDB
  const backdropUrl = "/placeholder.svg";
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "";

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
      <div className="relative z-10 p-8 flex flex-col justify-end h-full">
        <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
          {movie.title}
        </h1>
        <div className="flex items-center text-white mb-2">
          {year && <span className="mr-4">{year}</span>}
          {rating && <span className="mr-4">⭐ {rating}</span>}
        </div>
        {movie.overview && (
          <p className="text-white max-w-xl drop-shadow-lg">{movie.overview}</p>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
