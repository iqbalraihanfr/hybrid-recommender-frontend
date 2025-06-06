import { WatchHistory } from "@/components/preferences/WatchHistory";

export default function Preferences() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Watch History</h1>
      <WatchHistory />
    </div>
  );
}
