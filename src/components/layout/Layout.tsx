import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Toaster } from "sonner";

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Toaster position="top-right" />
    </div>
  );
}
