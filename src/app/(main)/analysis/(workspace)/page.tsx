"use client";

import { useState } from "react";
import Header from "@/components/analysis/Header";
import { AnalysisProjectCard } from "@/components/analysis/AnalysisProjectCard";
import { useAnalysisProjects } from "@/hooks/useAnalysisProjects";

export default function AnalysisPage() {
  const [query, setQuery] = useState("");
  const { projects, isLoading, error } = useAnalysisProjects();

  const filtered = [...projects]
    .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (a.isAnalysisDone !== b.isAnalysisDone) return a.isAnalysisDone ? 1 : -1;
      return a.title.localeCompare(b.title, "ko");
    });

  return (
    <div className="flex flex-col gap-6">
      <Header query={query} onQueryChange={setQuery} />

      {error && <p className="text-body-15 text-error-default">{error}</p>}

      {isLoading ? (
        <p className="py-20 text-center text-body-15 text-caption-label">불러오는 중...</p>
      ) : filtered.length === 0 && !error ? (
        <p className="py-20 text-center text-body-emphasis-17 text-caption-label">
          분석 가능한 탐색 기록이 없습니다.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((project) => (
            <AnalysisProjectCard key={project.id} {...project} highlight={query || undefined} />
          ))}
        </div>
      )}
    </div>
  );
}
