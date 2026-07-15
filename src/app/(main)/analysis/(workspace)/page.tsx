"use client";

import { useState } from "react";
import Header from "@/components/analysis/Header";
import { AnalysisProjectCard } from "@/components/analysis/AnalysisProjectCard";

// 추후 api 연동 시 교체
const MOCK_PROJECTS = [
  {
    id: "1",
    title: "가나다가나다가나다가나다가나다가나다가나다가나다가나다가나다가나다가나다",
    company: "그린폴리머(주)",
    manager: "김도현",
    patents: [],
    isAnalysisDone: false,
  },
  {
    id: "2",
    title: "프로젝트명 프로젝트명 프로젝트명프로젝트명 프로젝트명 프로젝트명 프로젝트명 프...",
    company: "그린폴리머(주)",
    manager: "김도현",
    patents: [],
    isAnalysisDone: false,
  },
  {
    id: "3",
    title: "프로젝트명 프로젝트명 프로젝트명프로젝트명 프로젝트명 프로젝트명 프로젝트명 프...",
    company: "그린폴리머(주)",
    manager: "김도현",
    patents: [],
    isAnalysisDone: true,
  },
];

export default function AnalysisPage() {
  const [query, setQuery] = useState("");

  const filtered = [...MOCK_PROJECTS]
    .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (a.isAnalysisDone !== b.isAnalysisDone) return a.isAnalysisDone ? 1 : -1;
      return a.title.localeCompare(b.title, "ko");
    });

  return (
    <div className="flex flex-col gap-6">
      <Header query={query} onQueryChange={setQuery} />

      <div className="flex flex-col gap-4">
        {filtered.map((project) => (
          <AnalysisProjectCard key={project.id} {...project} highlight={query || undefined} />
        ))}
      </div>
    </div>
  );
}
