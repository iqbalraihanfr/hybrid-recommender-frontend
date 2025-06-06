import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Play, Calendar, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockUsers } from "@/data/mockData";

const UserSelection = () => {
  const navigate = useNavigate();

  const handleUserSelect = (userId: number) => {
    // Store the selected user ID in localStorage
    localStorage.setItem("selectedUserId", userId.toString());
    // Navigate to the home page with the user ID
    navigate(`/home/${userId}`);
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Who's watching?
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Choose your profile to dive into a world of personalized movie
            recommendations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {mockUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserSelect(user.id)}
              className="cursor-pointer"
            >
              <Card className="group bg-gray-900/50 border-gray-800 hover:border-red-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
                <CardContent className="p-8 text-center">
                  {/* Avatar */}
                  <div className="relative mb-8">
                    <div className="w-28 h-28 mx-auto bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-red-500/50 transition-shadow">
                      <User className="h-14 w-14 text-white" />
                    </div>
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                      <Badge
                        variant="outline"
                        className="border-green-500 text-green-400 bg-green-500/10 px-3 py-1"
                      >
                        Active
                      </Badge>
                    </div>
                  </div>

                  {/* User Info */}
                  <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-red-400 transition-colors">
                    {user.name}
                  </h3>

                  {/* Stats */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-gray-400">
                      <Play className="h-5 w-5" />
                      <span className="text-base">
                        {user.watchedCount} movies watched
                      </span>
                    </div>

                    <div className="flex items-center justify-center space-x-2 text-gray-400">
                      <Calendar className="h-5 w-5" />
                      <span className="text-base">
                        Last active:{" "}
                        {new Date(user.lastActive).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Favorite Genres */}
                  <div className="mt-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {user.favoriteGenres.slice(0, 3).map((genre) => (
                        <Badge
                          key={genre}
                          variant="secondary"
                          className="text-sm bg-gray-800 text-gray-300 border-gray-700 px-3 py-1"
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Continue Button */}
                  <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-red-600 text-white px-6 py-3 rounded-md text-base font-medium flex items-center justify-center space-x-2">
                      <Play className="h-5 w-5" />
                      <span>Enter MovieFlix</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Add New Profile */}
        <div className="mt-12 text-center">
          <Card className="inline-block bg-gray-900/30 border-gray-700 border-dashed hover:border-red-500 transition-colors cursor-pointer">
            <CardContent className="p-10">
              <div className="w-20 h-20 mx-auto bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <User className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-gray-400 font-medium text-lg">
                Add New Profile
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
