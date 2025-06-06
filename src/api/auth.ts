import { api } from "./api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  username: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      "/api/auth/login",
      credentials
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/api/auth/register", data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem("token");
    await api.post("/api/auth/logout");
  },

  async getCurrentUser() {
    const response = await api.get("/api/auth/me");
    return response.data;
  },
};
