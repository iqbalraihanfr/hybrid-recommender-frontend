import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieCard from "./MovieCard";

interface Movie {
  id: string | number;
  title: string;
  asin: string;
  score?: number;
  image_url?: string;
}

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  showDetails?: boolean;
}

const MovieCarousel = ({
  title,
  movies,
  showDetails = false,
}: MovieCarouselProps) => {
  // console.log(movies);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group">
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Movies container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="flex-none w-48">
            <MovieCard movie={movie} showDetails={showDetails} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
