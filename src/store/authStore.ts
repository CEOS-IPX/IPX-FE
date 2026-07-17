import { create } from "zustand";

export type User = {
  userId: number;
  email: string;
  name: string;
  company?: string;
  provider: string;
  profileCompleted: boolean;
};

type AuthState = {
  accessToken: string | null;
  user: User | null;
  setAuth: (accessToken: string, user: User) => void;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
};

function cleanText(text: string): string {
  return text
    .normalize("NFC")
    .replace(/\p{Cf}/gu, "")
    .trim();
}

function normalizeUser(user: User): User {
  return {
    ...user,
    name: cleanText(user.name),
    company: user.company ? cleanText(user.company) : user.company,
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  setAuth: (accessToken, user) => set({ accessToken, user: normalizeUser(user) }),
  setAccessToken: (accessToken) => set({ accessToken }),
  setUser: (user) => set({ user: normalizeUser(user) }),
  clearAuth: () => set({ accessToken: null, user: null }),
}));
