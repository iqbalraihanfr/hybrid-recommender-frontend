import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export interface WatchHistory {
  movieId: number;
  title: string;
  posterPath: string;
  rating: number;
  watchedAt: string;
}

export interface User {
  id: number;
  name: string;
}

export const userService = {
  async getUsers(): Promise<User[]> {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  },

  async getWatchHistory(userId: number): Promise<WatchHistory[]> {
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}/watch-history`
    );
    return response.data;
  },

  async setActiveUser(userId: number): Promise<void> {
    localStorage.setItem("activeUserId", userId.toString());
  },

  getActiveUser(): number | null {
    const userId = localStorage.getItem("activeUserId");
    return userId ? parseInt(userId) : null;
  },

  clearActiveUser(): void {
    localStorage.removeItem("activeUserId");
  },
};
