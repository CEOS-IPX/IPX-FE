"use client";

import { useEffect, useState } from "react";
import { deleteCase, getCases, updateCase } from "@/lib/api/case";
import { ApiError } from "@/lib/api/error";
import type { CaseStatusGroup, CaseSummary } from "@/types/case.type";

export type TabValue = "전체" | "대기 중" | "완료";

const STATUS_GROUP_BY_TAB: Record<TabValue, CaseStatusGroup> = {
  전체: "ALL",
  "대기 중": "PENDING",
  완료: "COMPLETED",
};

//수정하기 관련 에러코드
const UPDATE_CASE_ERROR_MESSAGES: Record<string, string> = {
  C001: "잘못된 입력값입니다.",
  SC001: "인증이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  CA001: "사건을 찾을 수 없습니다.",
  C002: "서버 내부 오류가 발생했습니다.",
};

//삭제하기 관련 에러코드
const DELETE_CASE_ERROR_MESSAGES: Record<string, string> = {
  SC001: "인증이 필요합니다.",
  CA002: "해당 사건에 접근할 권한이 없습니다.",
  CA001: "사건을 찾을 수 없습니다.",
  C002: "서버 내부 오류가 발생했습니다.",
};

type EditingProject = { id: string; title: string; company: string; manager: string };

export function useMyHistory() {
  const [activeTab, setActiveTab] = useState<TabValue>("전체");
  const [editingProject, setEditingProject] = useState<EditingProject | null>(null);
  const [cases, setCases] = useState<CaseSummary[]>([]);
  const [counts, setCounts] = useState({ 전체: 0, "대기 중": 0, 완료: 0 });

  const [error, setError] = useState<string | null>(null);
  const [isModifying, setIsModifying] = useState(false);
  const [modifyError, setModifyError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  //내 활동 기록 -> 사건 목록 조회(프로젝트들)
  useEffect(() => {
    let cancelled = false;

    getCases({ statusGroup: STATUS_GROUP_BY_TAB[activeTab], size: 50 })
      .then((result) => {
        if (cancelled) return;

        setCases(result.cases);

        setCounts({
          전체: result.totalCount,
          "대기 중": result.pendingCount,
          완료: result.completedCount,
        });
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;

        setError(
          err instanceof Error && err.message
            ? err.message
            : "목록을 불러오는 중 오류가 발생했습니다."
        );
      });

    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  const openEditModal = (project: CaseSummary) => {
    setModifyError(null);
    setEditingProject({
      id: String(project.caseId),
      title: project.title,
      company: project.applicantName ?? "",
      manager: project.inventorName ?? "",
    });
  };

  const closeEditModal = () => setEditingProject(null);

  //내 활동 기록 -> 프로젝트 별 수정하기 모달 -> 사건 수정 api
  const handleModifySubmit = async (data: { title: string; company: string; manager: string }) => {
    if (!editingProject) return;

    setModifyError(null);
    setIsModifying(true);

    try {
      const result = await updateCase(Number(editingProject.id), {
        title: data.title,
        applicantName: data.company,
        inventorName: data.manager,
      });
      setCases((prev) =>
        prev.map((c) =>
          c.caseId === result.caseId
            ? {
                ...c,
                title: result.title,
                applicantName: result.applicantName,
                inventorName: result.inventorName,
                updatedAt: result.updatedAt,
              }
            : c
        )
      );
      setEditingProject(null);
    } catch (err) {
      if (err instanceof ApiError) {
        setModifyError(
          UPDATE_CASE_ERROR_MESSAGES[err.errorCode] ||
            err.message ||
            "사건 수정 중 오류가 발생했습니다."
        );
      } else {
        setModifyError("사건 수정 중 오류가 발생했습니다.");
      }
    } finally {
      setIsModifying(false);
    }
  };

  //내 활동 기록 -> 수정&삭제 메뉴 -> 프로젝트 삭제 api
  const handleDelete = async (project: CaseSummary) => {
    const confirmed = window.confirm(
      "이 프로젝트를 삭제하시겠습니까? 연결된 구성요소, 선행기술, 분석 결과가 모두 함께 삭제됩니다."
    );
    if (!confirmed) return;

    setDeleteError(null);
    try {
      const result = await deleteCase(project.caseId);
      const wasCompleted = project.status.includes("COMPLETED");

      setCases((prev) => prev.filter((c) => c.caseId !== result.deletedCaseId));

      setCounts((prev) => ({
        전체: Math.max(0, prev.전체 - 1),
        "대기 중": wasCompleted ? prev["대기 중"] : Math.max(0, prev["대기 중"] - 1),
        완료: wasCompleted ? Math.max(0, prev.완료 - 1) : prev.완료,
      }));
    } catch (err) {
      if (err instanceof ApiError) {
        setDeleteError(
          DELETE_CASE_ERROR_MESSAGES[err.errorCode] ||
            err.message ||
            "사건 삭제 중 오류가 발생했습니다."
        );
      } else {
        setDeleteError("사건 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return {
    activeTab,
    setActiveTab,
    counts,
    error,
    cases,

    editingProject,
    openEditModal,
    closeEditModal,
    modifyError,
    isModifying,
    handleModifySubmit,

    deleteError,
    handleDelete,
  };
}
