
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Star, Clock, TrendingUp, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import MovieCarousel from '@/components/MovieCarousel';
import { mockUsers, mockMovies } from '@/data/mockData';

const Dashboard = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(mockUsers.find(u => u.id === Number(userId)));

  if (!user) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">User not found</h1>
          <p className="text-gray-400">Please select a valid user profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* User Header */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}</h1>
            <div className="flex items-center space-x-4 text-gray-400">
              <div className="flex items-center space-x-1">
                <Play className="h-4 w-4" />
                <span>{user.watchedCount} movies watched</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4" />
                <span>Premium Member</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-red-600 p-3 rounded-lg">
                  <Play className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Continue Watching</p>
                  <p className="text-white font-semibold text-lg">3 Movies</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Your Ratings</p>
                  <p className="text-white font-semibold text-lg">127 Movies</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-600 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Watch Time</p>
                  <p className="text-white font-semibold text-lg">432 Hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-600 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">This Month</p>
                  <p className="text-white font-semibold text-lg">23 Movies</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Watching */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Continue Watching</h2>
            <Button variant="ghost" className="text-red-400 hover:text-red-300">
              View All
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {mockMovies.slice(0, 3).map((movie) => (
              <Card key={movie.id} className="bg-gray-900/50 border-gray-800 overflow-hidden group hover:scale-105 transition-transform">
                <div className="relative aspect-video">
                  <img 
                    src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : '/placeholder.svg'}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Play className="h-4 w-4 mr-2" />
                      Continue
                    </Button>
                  </div>
                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                    <div className="h-full bg-red-600" style={{ width: `${Math.random() * 80 + 20}%` }}></div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white text-sm">{movie.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {Math.floor(Math.random() * 60 + 30)} min remaining
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Movie Sections */}
        <div className="space-y-8">
          <MovieCarousel 
            title="Recommended for You" 
            movies={mockMovies.slice(1, 9)} 
            showDetails={true}
          />
          
          <MovieCarousel 
            title="Your Favorite Genres" 
            movies={mockMovies.slice(2, 10)} 
            showDetails={true}
          />
          
          <MovieCarousel 
            title="Trending Now" 
            movies={mockMovies.slice(0, 8)} 
            showDetails={true}
          />
          
          <MovieCarousel 
            title="Top Picks for You" 
            movies={mockMovies.slice(3, 11)} 
            showDetails={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
