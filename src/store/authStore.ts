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

// 백엔드가 내려주는 name/company가 한글 NFD(자모 분해형)로 오는 경우가 있어
// (macOS에서 입력된 값 등) NFC(완성형)로 정규화해서 저장한다. 안 하면
// charAt(0) 등으로 초성만 떼어낼 때 조합이 안 돼 빈 글자처럼 보인다.
function normalizeUser(user: User): User {
  return {
    ...user,
    name: user.name.normalize("NFC"),
    company: user.company?.normalize("NFC"),
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
