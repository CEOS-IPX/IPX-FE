import { create } from "zustand";

type RecentCasesStore = {
  version: number;
  invalidate: () => void;
};

export const useRecentCasesStore = create<RecentCasesStore>((set) => ({
  version: 0,
  invalidate: () => set((state) => ({ version: state.version + 1 })),
}));
