"use client";

import { Tab } from "@/components/myhistory/Tab";
import { ProjectCard } from "@/components/myhistory/ProjectCard";
import { ModifyModal } from "@/components/myhistory/ModifyModal";
import { useMyHistory } from "@/hooks/useMyHistory";

export default function MyHistoryPage() {
  const {
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
  } = useMyHistory();

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
            onEdit={() => openEditModal(project)}
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
          onClose={closeEditModal}
          onSubmit={handleModifySubmit}
          error={modifyError}
          isSubmitting={isModifying}
        />
      )}
    </div>
  );
}
