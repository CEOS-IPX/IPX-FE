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
    deleteError,
    handleDelete,
  } = useMyHistory();

  return (
    <div className="flex flex-col gap-6 py-4">
      <Tab active={activeTab} counts={counts} onChange={setActiveTab} />

      {error && <p className="text-body-15 text-error-default">{error}</p>}
      {deleteError && <p className="text-body-15 text-error-default">{deleteError}</p>}

      {cases.length === 0 && !error ? (
        <p className="py-20 text-center text-body-emphasis-17 text-caption-label">
          선행기술 탐색 탭에서 특허를 등록해주세요.
        </p>
      ) : (
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
              onDelete={() => handleDelete(project)}
            />
          ))}
        </div>
      )}

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
