"use client";

import { useRouter } from "next/navigation";
import { extractComponents, startSearch } from "@/lib/api/search";
import { ApiError } from "@/lib/api/error";
import { useSearchFormStore } from "@/store/searchFormStore";

// api 에러코드별 메시지(탐색하기)
const START_SEARCH_ERROR_MESSAGES: Record<string, string> = {
  C001: "잘못된 입력값입니다.",
  SC001: "인증이 필요합니다.",
  CA001: "사건을 찾을 수 없습니다.",
  AU007: "사용자를 찾을 수 없습니다.",
  S003: "진행 중인 검색이 있습니다.",
  RQ002: "요청 횟수 제한을 초과했습니다. 잠시 후 다시 시도해주세요.",
  R001: "일시적인 시스템 오류입니다. 잠시 후 다시 시도해주세요.",
  C002: "서버 내부 오류가 발생했습니다.",
};

// api 에러코드별 메시지(구성요소 AI 자동 생성)
const AI_CREATE_ERROR_MESSAGES: Record<string, string> = {
  C001: "잘못된 입력값입니다.",
  SC001: "인증이 필요합니다.",
  RQ002: "요청 횟수 제한을 초과했습니다. 잠시 후 다시 시도해주세요.",
  PY001: "AI 검색 서버와 통신 중 오류가 발생했습니다.",
  PY002: "AI 서버 응답 시간이 초과되었습니다.",
};

export function useSearchForm() {
  const router = useRouter();

  const {
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
    setRequiredApplicationNumbers,
    priorArtReference,
    setPriorArtReference,
    differentiationNotes,
    setDifferentiationNotes,
    measurementConditions,
    setMeasurementConditions,
    measurementResults,
    setMeasurementResults,
    elements,
    setElements,
    resultCount,
    setResultCount,
    isLoading,
    setIsLoading,
    isModalOpen,
    setIsModalOpen,
    aiCreateError,
    setAiCreateError,
    isStartingSearch,
    setIsStartingSearch,
    startSearchError,
    setStartSearchError,
  } = useSearchFormStore();

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

  //이 부분이 api 호출하는게 아니라 탐색 전에 로컬에 일시저장하기만 함 -> 탐색 결과에 얘도 찾아서 추가할 수 있도록
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
      if (err instanceof ApiError) {
        setAiCreateError(
          AI_CREATE_ERROR_MESSAGES[err.errorCode] ||
            err.message ||
            "구성요소 추출 중 오류가 발생했습니다."
        );
      } else {
        setAiCreateError("구성요소 추출 중 오류가 발생했습니다.");
      }
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
        //이 부분이 특허번호로 불러오기 -> 같이 보내버림(request로..)
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
      if (err instanceof ApiError) {
        setStartSearchError(
          START_SEARCH_ERROR_MESSAGES[err.errorCode] ||
            err.message ||
            "탐색 시작 중 오류가 발생했습니다."
        );
      } else {
        setStartSearchError("탐색 시작 중 오류가 발생했습니다.");
      }
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
