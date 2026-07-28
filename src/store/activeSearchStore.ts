import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ActiveSearch = {
  caseId: number;
  resultCount: number;
  title: string;
};

type ActiveSearchState = {
  activeSearch: ActiveSearch | null;
  setActiveSearch: (activeSearch: ActiveSearch) => void;
  clearActiveSearch: () => void;
};

export const useActiveSearchStore = create<ActiveSearchState>()(
  persist(
    (set) => ({
      activeSearch: null,
      setActiveSearch: (activeSearch) => set({ activeSearch }),
      clearActiveSearch: () => set({ activeSearch: null }),
    }),
    {
      name: "ipx-active-search",
    }
  )
);
