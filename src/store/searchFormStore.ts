import { create } from "zustand";
import { type Element } from "@/components/search/ElementList/ElementList";

type Updater<T> = T | ((prev: T) => T);

function resolve<T>(updater: Updater<T>, prev: T): T {
  return typeof updater === "function" ? (updater as (prev: T) => T)(prev) : updater;
}

type SearchFormState = {
  title: string;
  technicalField: string;
  description: string;
  ipcInput: string;
  applicantName: string;
  inventorName: string;
  companyName: string;
  clientName: string;
  requiredApplicationNumbers: string[];
  priorArtReference: string;
  differentiationNotes: string;
  measurementConditions: string;
  measurementResults: string;
  elements: Element[];
  resultCount: number;
  isModalOpen: boolean;
  aiCreateError: string | null;
  isLoading: boolean;
  isStartingSearch: boolean;
  startSearchError: string | null;
};

type SearchFormActions = {
  setTitle: (v: string) => void;
  setTechnicalField: (v: string) => void;
  setDescription: (v: string) => void;
  setIpcInput: (v: string) => void;
  setApplicantName: (v: string) => void;
  setInventorName: (v: string) => void;
  setCompanyName: (v: string) => void;
  setClientName: (v: string) => void;
  setRequiredApplicationNumbers: (updater: Updater<string[]>) => void;
  setPriorArtReference: (v: string) => void;
  setDifferentiationNotes: (v: string) => void;
  setMeasurementConditions: (v: string) => void;
  setMeasurementResults: (v: string) => void;
  setElements: (updater: Updater<Element[]>) => void;
  setResultCount: (v: number) => void;
  setIsModalOpen: (v: boolean) => void;
  setAiCreateError: (v: string | null) => void;
  setIsLoading: (v: boolean) => void;
  setIsStartingSearch: (v: boolean) => void;
  setStartSearchError: (v: string | null) => void;
};

// /search 페이지 작성 중 탐색 중단하기, 에러나서 탐색 중단 등으로 다시 이전 페이지로언마운트돼도
// 입력 내용이 날아가지 않도록 컴포넌트 바깥에 상태들(내용들)을 둠(zustand 사용) -> 그래서 useSearchForm에서 분리된 내용이 있다!
export const useSearchFormStore = create<SearchFormState & SearchFormActions>((set) => ({
  title: "",
  technicalField: "",
  description: "",
  ipcInput: "",
  applicantName: "",
  inventorName: "",
  companyName: "",
  clientName: "",
  requiredApplicationNumbers: [],
  priorArtReference: "",
  differentiationNotes: "",
  measurementConditions: "",
  measurementResults: "",
  elements: [{ id: crypto.randomUUID(), name: "", description: "" }],
  resultCount: 10,
  isModalOpen: false,
  aiCreateError: null,
  isLoading: false,
  isStartingSearch: false,
  startSearchError: null,

  setTitle: (title) => set({ title }),
  setTechnicalField: (technicalField) => set({ technicalField }),
  setDescription: (description) => set({ description }),
  setIpcInput: (ipcInput) => set({ ipcInput }),
  setApplicantName: (applicantName) => set({ applicantName }),
  setInventorName: (inventorName) => set({ inventorName }),
  setCompanyName: (companyName) => set({ companyName }),
  setClientName: (clientName) => set({ clientName }),
  setRequiredApplicationNumbers: (updater) =>
    set((state) => ({
      requiredApplicationNumbers: resolve(updater, state.requiredApplicationNumbers),
    })),
  setPriorArtReference: (priorArtReference) => set({ priorArtReference }),
  setDifferentiationNotes: (differentiationNotes) => set({ differentiationNotes }),
  setMeasurementConditions: (measurementConditions) => set({ measurementConditions }),
  setMeasurementResults: (measurementResults) => set({ measurementResults }),
  setElements: (updater) => set((state) => ({ elements: resolve(updater, state.elements) })),
  setResultCount: (resultCount) => set({ resultCount }),
  setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
  setAiCreateError: (aiCreateError) => set({ aiCreateError }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsStartingSearch: (isStartingSearch) => set({ isStartingSearch }),
  setStartSearchError: (startSearchError) => set({ startSearchError }),
}));
