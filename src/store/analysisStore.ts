import { create } from "zustand";
import { SelectedPatent } from "@/types/analysis.type";

type AnalysisStore = {
  selectedPatent: SelectedPatent | null;
  setSelectedPatent: (patent: SelectedPatent | null) => void;
};

export const useAnalysisStore = create<AnalysisStore>((set) => ({
  selectedPatent: null,
  setSelectedPatent: (patent) => set({ selectedPatent: patent }),
}));
