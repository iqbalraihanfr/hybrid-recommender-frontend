import { api } from "./api";

export interface WatchHistoryItem {
  movieId: number;
  watchedAt: string;
}

export const preferencesService = {
  async addToWatchHistory(movieId: number): Promise<void> {
    await api.post("/api/preferences/watch-history", { movieId });
  },

  async getWatchHistory(): Promise<WatchHistoryItem[]> {
    const response = await api.get("/api/preferences/watch-history");
    return response.data;
  },
};
