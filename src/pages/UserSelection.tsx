import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Play, Calendar, Shield, LogIn } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockUsers } from "@/data/mockData";

const UserSelection = () => {
  const generateAvatar = (name: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=128`;
  };
  const navigate = useNavigate();

  const handleUserSelect = (userId: number) => {
    // Store the selected user ID in localStorage
    localStorage.setItem("selectedUserId", userId.toString());
    // Navigate to the home page with the user ID
    navigate(`/home/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-20">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {mockUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserSelect(user.id)}
              className="cursor-pointer flex flex-col"
            >
              <Card className="group bg-gray-900/50 border-gray-800 hover:border-red-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 flex-grow">
                <CardContent className="p-8 text-center flex flex-col h-full">
                  {/* Avatar */}
                  <div className="relative mb-8">
                    <div className="w-28 h-28 mx-auto rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-red-500/50 transition-shadow overflow-hidden border-4 border-gray-800 group-hover:border-red-500">
                      <img src={generateAvatar(user.name)} alt={user.name} className="w-full h-full object-cover" />
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
                  <div className="space-y-4 flex-grow">
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
                  <div className="mt-auto pt-6">
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
          <AdminLoginCard />
        </div>
      </div>
    </div>
  );
};

function AdminLoginCard() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!userId.match(/^\d+$/)) {
      setError("ID hanya boleh angka");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/recommend?id=${userId}&top_k=10`
      );
      if (!res.ok) throw new Error("ID tidak ditemukan atau server error");
      // Optionally, bisa cek data di sini
      localStorage.setItem("selectedUserId", userId);
      navigate(`/home/${userId}`);
    } catch (err: unknown) {
      let msg = "Terjadi kesalahan";
      if (err instanceof Error) msg = err.message;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onClick={() => !isExpanded && setIsExpanded(true)} className="cursor-pointer">
      <Card className={`group bg-gray-900/50 border-gray-800 hover:border-red-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 ${isExpanded ? 'scale-105 shadow-2xl shadow-red-500/20' : ''}`}>
        <CardContent className="p-8 text-center flex flex-col justify-center min-h-[460px]">
          <div className="w-28 h-28 mx-auto bg-gray-800 rounded-full flex items-center justify-center group-hover:shadow-lg group-hover:shadow-red-500/50 transition-shadow border-4 border-gray-800 group-hover:border-red-500 mb-8">
            <Shield className="h-14 w-14 text-gray-400 group-hover:text-white transition-colors" />
          </div>

          <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-red-400 transition-colors">
            Admin
          </h3>

          {isExpanded ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4 mt-4 animate-in fade-in duration-500"
              onClick={(e) => e.stopPropagation()} // Prevent card click from closing
            >
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Masukkan ID User"
                className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-red-500 outline-none w-full text-center"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                disabled={loading}
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-semibold disabled:opacity-60 w-full flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? "Loading..." : <><LogIn className="h-5 w-5"/><span>Masuk</span></>}</button>
              {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
              <button type="button" onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }} className="text-gray-400 hover:text-white mt-2 text-sm">Batal</button>
            </form>
          ) : (
            <div className="mt-6">
              <p className="text-gray-400">Masuk untuk mengakses panel admin.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default UserSelection;
