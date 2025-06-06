import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Home } from "lucide-react";

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              MovieRecommender
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
