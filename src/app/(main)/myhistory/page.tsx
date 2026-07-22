"use client";

import { useEffect, useState } from "react";
import { Tab } from "@/components/myhistory/Tab";
import { ProjectCard } from "@/components/myhistory/ProjectCard";
import { ModifyModal } from "@/components/myhistory/ModifyModal";
import { getCases, updateCase } from "@/lib/api/case";
import type { CaseStatusGroup, CaseSummary } from "@/types/case.type";

type TabValue = "전체" | "대기 중" | "완료";

const STATUS_GROUP_BY_TAB: Record<TabValue, CaseStatusGroup> = {
  전체: "ALL",
  "대기 중": "PENDING",
  완료: "COMPLETED",
};

type EditingProject = { id: string; title: string; company: string; manager: string };

export default function MyHistoryPage() {
  const [activeTab, setActiveTab] = useState<TabValue>("전체");
  const [editingProject, setEditingProject] = useState<EditingProject | null>(null);
  const [cases, setCases] = useState<CaseSummary[]>([]);
  const [counts, setCounts] = useState({ 전체: 0, "대기 중": 0, 완료: 0 });
  const [error, setError] = useState<string | null>(null);
  const [isModifying, setIsModifying] = useState(false);
  const [modifyError, setModifyError] = useState<string | null>(null);

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

  //내 활동 기록 -> 프로젝트 별 수정하기 모달
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
                //ui적으로 수정사항 반영되는 부분이 여기임!
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
      setModifyError(
        err instanceof Error && err.message ? err.message : "사건 수정 중 오류가 발생했습니다."
      );
    } finally {
      setIsModifying(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      <Tab active={activeTab} counts={counts} onChange={setActiveTab} />

      {error && <p className="text-body-15 text-error-default">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        {cases.map((project) => (
          <ProjectCard
            key={project.caseId}
            id={String(project.caseId)}
            status={project.statusLabel}
            statusVariant={project.status.includes("COMPLETED") ? "secondary" : "primary"}
            title={project.title}
            company={project.applicantName ?? ""}
            manager={project.inventorName ?? ""}
            patents={[]}
            onEdit={() => {
              setModifyError(null);
              setEditingProject({
                id: String(project.caseId),
                title: project.title,
                company: project.applicantName ?? "",
                manager: project.inventorName ?? "",
              });
            }}
            onDelete={() => {
              /* 여기가 프로젝트 삭제 기능 -> 나중에 추가할게여~~ */
            }}
          />
        ))}
      </div>

      {editingProject && (
        <ModifyModal
          initialTitle={editingProject.title}
          initialCompany={editingProject.company}
          initialManager={editingProject.manager}
          onClose={() => setEditingProject(null)}
          onSubmit={handleModifySubmit}
          error={modifyError}
          isSubmitting={isModifying}
        />
      )}
    </div>
  );
}
