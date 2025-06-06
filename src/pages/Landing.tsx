
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, TrendingUp, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import HeroSection from '@/components/HeroSection';
import MovieCarousel from '@/components/MovieCarousel';
import { mockMovies } from '@/data/mockData';

const Landing = () => {
  const [featuredMovie] = useState(mockMovies[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to browse page with search query
      window.location.href = `/browse?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <HeroSection movie={featuredMovie} />

      {/* Search Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Discover Your Next Favorite Movie
          </h2>
          <p className="text-gray-400 mb-6">
            Get personalized recommendations based on your taste
          </p>
          
          <form onSubmit={handleSearch} className="max-w-md mx-auto flex space-x-2">
            <Input
              type="text"
              placeholder="Search for movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-red-500"
            />
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Search
            </Button>
          </form>
        </div>

        {/* Get Started Section */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-lg p-8 max-w-2xl mx-auto border border-red-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Start Your Movie Journey
            </h3>
            <p className="text-gray-300 mb-6">
              Select your profile to get personalized movie recommendations
            </p>
            <Link to="/users">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 px-8">
                Choose Your Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Movie Sections */}
        <div className="space-y-12">
          <MovieCarousel 
            title="Trending Now" 
            movies={mockMovies.slice(0, 8)} 
            showDetails={true}
          />
          
          <MovieCarousel 
            title="Top Rated Movies" 
            movies={mockMovies.slice(1, 9)} 
            showDetails={true}
          />
          
          <MovieCarousel 
            title="Popular This Week" 
            movies={mockMovies.slice(2, 10)} 
            showDetails={true}
          />
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 bg-gray-900/50 rounded-lg border border-gray-800">
            <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Personalized Recommendations</h4>
            <p className="text-gray-400">Get movie suggestions tailored to your taste and viewing history</p>
          </div>
          
          <div className="text-center p-6 bg-gray-900/50 rounded-lg border border-gray-800">
            <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Trending Content</h4>
            <p className="text-gray-400">Stay updated with the latest and most popular movies</p>
          </div>
          
          <div className="text-center p-6 bg-gray-900/50 rounded-lg border border-gray-800">
            <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Watch History</h4>
            <p className="text-gray-400">Keep track of movies you've watched and continue where you left off</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
