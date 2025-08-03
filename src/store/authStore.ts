import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  email: string;
  role: string;
}

interface JwtPayload {
  user_id: number;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  decodeAndSetUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: (token: string) => {
        set({ token, isAuthenticated: true });
        get().decodeAndSetUser();
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },

      decodeAndSetUser: () => {
        const { token } = get();
        if (token) {
          try {
            const decoded = jwtDecode(token) as JwtPayload;
            const user: User = {
              id: decoded.user_id,
              email: decoded.email,
              role: decoded.role,
            };
            set({ user, isAuthenticated: true });
            console.log("Decoded user from token:", user);
          } catch (error) {
            console.error("Failed to decode JWT token:", error);
            get().logout();
          }
        }
      },
    }),
    {
      name: "authToken",
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          state.decodeAndSetUser();
        }
      },
    }
  )
);
