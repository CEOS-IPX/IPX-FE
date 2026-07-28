"use client";

import { useState } from "react";
import Header from "@/components/analysis/Header";
import { AnalysisProjectCard } from "@/components/analysis/AnalysisProjectCard";
import { SortingTag } from "@/components/searchlist/SortingTag";
import { useAnalysisProjects, type AnalysisProject } from "@/hooks/useAnalysisProjects";
import { useTitleFilter } from "@/hooks/useTitleFilter";

const SORT_OPTIONS = ["미완료 우선", "최신순"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

function sortProjects(projects: AnalysisProject[], sortOption: SortOption): AnalysisProject[] {
  const sorted = [...projects];
  if (sortOption === "최신순") {
    sorted.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } else {
    sorted.sort((a, b) => {
      if (a.isAnalysisDone !== b.isAnalysisDone) return a.isAnalysisDone ? 1 : -1;
      return a.title.localeCompare(b.title, "ko");
    });
  }
  return sorted;
}

export default function AnalysisPage() {
  const { projects, isLoading, error } = useAnalysisProjects();
  const {
    query,
    setQuery,
    filtered: matchedProjects,
  } = useTitleFilter(projects, (project) => project.title);
  const [sortOption, setSortOption] = useState<SortOption>("미완료 우선");

  const filtered = sortProjects(matchedProjects, sortOption);

  return (
    <div className="flex flex-col gap-6">
      <Header query={query} onQueryChange={setQuery} />

      <SortingTag
        label="미완료 우선"
        options={[...SORT_OPTIONS]}
        onChange={(value) => setSortOption(value as SortOption)}
      />

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
