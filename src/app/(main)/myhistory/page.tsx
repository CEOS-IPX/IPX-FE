"use client";

import { useState } from "react";
import { Tab } from "@/components/myhistory/Tab";
import { ProjectCard } from "@/components/myhistory/ProjectCard";
import { ModifyModal } from "@/components/myhistory/ModifyModal";

type TabValue = "전체" | "대기 중" | "완료";

const MOCK_PROJECTS = [
  {
    id: "1",
    status: "선행 조사 중" as const,
    title: "생분해성 고분자 코팅 조성물",
    company: "그린폴리머(주)",
    manager: "김도현",
    patents: [],
  },
  {
    id: "2",
    status: "선행 조사 중" as const,
    title: "초저전력 IoT 센서 통신 모듈",
    company: "그린폴리머(주)",
    manager: "김도현",
    patents: [],
  },
  {
    id: "3",
    status: "완료" as const,
    title: "나노복합소재 기반 전자파 차폐 필름",
    company: "그린폴리머(주)",
    manager: "김도현",
    patents: [],
  },
];

type EditingProject = { id: string; title: string; company: string; manager: string };

export default function MyHistoryPage() {
  const [activeTab, setActiveTab] = useState<TabValue>("전체");
  const [editingProject, setEditingProject] = useState<EditingProject | null>(null);

  const filtered = MOCK_PROJECTS.filter((p) => {
    if (activeTab === "전체") return true;
    if (activeTab === "대기 중") return p.status === "선행 조사 중";
    return p.status === "완료";
  });

  const counts = {
    전체: MOCK_PROJECTS.length,
    "대기 중": MOCK_PROJECTS.filter((p) => p.status === "선행 조사 중").length,
    완료: MOCK_PROJECTS.filter((p) => p.status === "완료").length,
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      <Tab active={activeTab} counts={counts} onChange={setActiveTab} />

      <div className="grid grid-cols-2 gap-4">
        {filtered.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            onEdit={() =>
              setEditingProject({
                id: project.id,
                title: project.title,
                company: project.company,
                manager: project.manager,
              })
            }
            onDelete={() => {
              /* TODO: 삭제 처리 */
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
          onSubmit={(data) => {
            console.log("수정:", editingProject.id, data);
            setEditingProject(null);
          }}
        />
      )}
    </div>
  );
}
