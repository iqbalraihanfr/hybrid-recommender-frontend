
import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid3x3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import MovieCard from '@/components/MovieCard';
import { mockMovies, mockGenres } from '@/data/mockData';

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredMovies, setFilteredMovies] = useState(mockMovies);

  useEffect(() => {
    let filtered = [...mockMovies];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.overview.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Genre filter
    if (selectedGenre !== 'all') {
      const genreId = parseInt(selectedGenre);
      filtered = filtered.filter(movie => 
        movie.genre_ids.includes(genreId)
      );
    }

    // Year filter
    if (selectedYear !== 'all') {
      filtered = filtered.filter(movie => 
        new Date(movie.release_date).getFullYear().toString() === selectedYear
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'year':
          return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        case 'rating':
          return b.vote_average - a.vote_average;
        default: // popularity
          return b.popularity - a.popularity;
      }
    });

    setFilteredMovies(filtered);
  }, [searchQuery, selectedGenre, selectedYear, sortBy]);

  const years = Array.from(new Set(mockMovies.map(movie => 
    new Date(movie.release_date).getFullYear()
  ))).sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Browse Movies</h1>
          <p className="text-gray-400">Discover movies by genre, year, or search for specific titles</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-900/50 rounded-lg p-6 mb-8 border border-gray-800">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-black border-gray-700 text-white placeholder-gray-400 focus:border-red-500"
            />
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="bg-black border-gray-700 text-white">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="all">All Genres</SelectItem>
                {mockGenres.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id.toString()}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="bg-black border-gray-700 text-white">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-black border-gray-700 text-white">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
                <SelectItem value="year">Newest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="flex-1"
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="flex-1"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <Badge variant="secondary" className="bg-red-600/20 text-red-400 border-red-600/30">
                Search: {searchQuery}
                <button 
                  onClick={() => setSearchQuery('')}
                  className="ml-2 hover:text-red-300"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedGenre !== 'all' && (
              <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                Genre: {mockGenres.find(g => g.id.toString() === selectedGenre)?.name}
                <button 
                  onClick={() => setSelectedGenre('all')}
                  className="ml-2 hover:text-blue-300"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedYear !== 'all' && (
              <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
                Year: {selectedYear}
                <button 
                  onClick={() => setSelectedYear('all')}
                  className="ml-2 hover:text-green-300"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'}
          </p>
        </div>

        {/* Movies Grid */}
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6'
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        }>
          {filteredMovies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              showDetails={viewMode === 'list'} 
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredMovies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No movies found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedGenre('all');
                setSelectedYear('all');
              }}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-white/10"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
