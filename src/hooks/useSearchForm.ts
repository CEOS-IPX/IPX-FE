"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { type Element } from "@/components/search/ElementList/ElementList";
import { extractComponents, startSearch } from "@/lib/api/search";

export function useSearchForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [technicalField, setTechnicalField] = useState("");
  const [description, setDescription] = useState("");
  const [ipcInput, setIpcInput] = useState("");

  const [applicantName, setApplicantName] = useState("");
  const [inventorName, setInventorName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [clientName, setClientName] = useState("");

  const [requiredApplicationNumbers, setRequiredApplicationNumbers] = useState<string[]>([]);
  const [priorArtReference, setPriorArtReference] = useState("");
  const [differentiationNotes, setDifferentiationNotes] = useState("");
  const [measurementConditions, setMeasurementConditions] = useState("");
  const [measurementResults, setMeasurementResults] = useState("");

  const [elements, setElements] = useState<Element[]>([
    { id: crypto.randomUUID(), name: "", description: "" },
  ]);

  const [resultCount, setResultCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiCreateError, setAiCreateError] = useState<string | null>(null);

  const [isStartingSearch, setIsStartingSearch] = useState(false);
  const [startSearchError, setStartSearchError] = useState<string | null>(null);

  const isInventionInfoFilled = Boolean(
    title.trim() && technicalField.trim() && description.trim()
  );

  const isApplicantInfoFilled = Boolean(applicantName.trim() && inventorName.trim());

  const isComponentsFilled =
    elements.length > 0 && elements.every((el) => el.name.trim() && el.description.trim());
  const isReadyToStart = isInventionInfoFilled && isApplicantInfoFilled && isComponentsFilled;

  const handleAdd = () => {
    setElements((prev) => [...prev, { id: crypto.randomUUID(), name: "", description: "" }]);
  };

  const handleDelete = (id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  const handleChange = (id: string, field: "name" | "description", value: string) => {
    setElements((prev) => prev.map((el) => (el.id === id ? { ...el, [field]: value } : el)));
  };

  const handleImportPatentNumber = (patentNumber: string) => {
    const trimmed = patentNumber.trim();
    if (trimmed) {
      setRequiredApplicationNumbers((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
    }
    setIsModalOpen(false);
  };

  //ai 자동 생성 버튼 api 연동 부분
  const handleAICreate = async () => {
    if (!title.trim() || !description.trim() || !technicalField.trim()) {
      setAiCreateError("발명의 명칭, 기술 분야, 핵심 기술 설명을 먼저 입력해주세요.");
      return;
    }

    setAiCreateError(null);
    setIsLoading(true);
    try {
      const { components } = await extractComponents({ title, description, technicalField });
      setElements(
        components.map((component) => ({
          id: crypto.randomUUID(),
          name: component.name,
          description: component.description,
        }))
      );
    } catch (err) {
      setAiCreateError(
        err instanceof Error && err.message ? err.message : "구성요소 추출 중 오류가 발생했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  //탐색 시작 버튼 api
  const handleStart = async () => {
    setStartSearchError(null);
    setIsStartingSearch(true);
    try {
      const hasAdditionalInfo =
        priorArtReference.trim() ||
        differentiationNotes.trim() ||
        measurementConditions.trim() ||
        measurementResults.trim();

      const { caseId } = await startSearch({
        caseId: null,
        title,
        description,
        applicantName,
        inventorName,
        technicalField,
        userInputIpc: ipcInput.trim()
          ? ipcInput
              .split(",")
              .map((code) => code.trim())
              .filter(Boolean)
          : undefined,
        requiredApplicationNumbers:
          requiredApplicationNumbers.length > 0 ? requiredApplicationNumbers : undefined,
        resultCount,
        components: elements.map((el) => ({ name: el.name, description: el.description })),
        additionalInfo: hasAdditionalInfo
          ? {
              priorArtReference: priorArtReference.trim() || undefined,
              differentiationNotes: differentiationNotes.trim() || undefined,
              measurementConditions: measurementConditions.trim() || undefined,
              measurementResults: measurementResults.trim() || undefined,
            }
          : undefined,
      });

      router.push(`/search/loading?count=${resultCount}&caseId=${caseId}`);
    } catch (err) {
      setStartSearchError(
        err instanceof Error && err.message ? err.message : "탐색 시작 중 오류가 발생했습니다."
      );
    } finally {
      setIsStartingSearch(false);
    }
  };

  return {
    title,
    setTitle,
    technicalField,
    setTechnicalField,
    description,
    setDescription,
    ipcInput,
    setIpcInput,

    applicantName,
    setApplicantName,
    inventorName,
    setInventorName,
    companyName,
    setCompanyName,
    clientName,
    setClientName,

    requiredApplicationNumbers,
    priorArtReference,
    setPriorArtReference,
    differentiationNotes,
    setDifferentiationNotes,
    measurementConditions,
    setMeasurementConditions,
    measurementResults,
    setMeasurementResults,

    elements,
    isLoading,
    aiCreateError,
    handleAdd,
    handleDelete,
    handleChange,
    handleAICreate,

    resultCount,
    setResultCount,
    isReadyToStart,
    isStartingSearch,
    startSearchError,
    handleStart,

    isModalOpen,
    setIsModalOpen,
    handleImportPatentNumber,
  };
}
