"use client";

import { use, useEffect } from "react";
import { ProjectList } from "@/components/searchlist/ProjectList";
import { ResultListHeader } from "@/components/searchlist/ResultListHeader";
import { BackButton } from "@/components/ui/BackButton";
import { useAnalysisStore } from "@/store/analysisStore";
import type { SelectedPatent } from "@/types/analysis.type";

type MockPatent = SelectedPatent & {
  listTitle: string;
  year: number;
  tags: string[];
  status: string;
};

const MOCK_PATENTS: MockPatent[] = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  title: "저온 황산침출 기반 니켈·코발트 동시 회수 공정",
  listTitle: "KR 10-2023-0145XXX 저온 황산침출 기반 니켈·코발트 동시 회수 공정",
  patentNumber: `KR 10-2023-0145XX${index + 1}`,
  organization: "한국지질자원연구원",
  year: 2024,
  tags: ["저온 침출", "습식제련", "Ni·Co 회수"],
  status: "등록",
  applicationDate: "2023.01.15",
  registrationDate: "2024.03.21",
  applicationPeriod: "1년 2개월",
  currentStatus: "등록",
  expirationDate: "2038.05.18",
  summary:
    "50–60°C의 저온에서 H₂SO₄ 1.0–1.5 M과 환원제 H₂O₂를 단계적으로 투입하여 폐리튬이온전지 양극재로부터 니켈과 코발트를 동시에 침출하는 단계를 포함하는 습식제련 방법.",
  purpose:
    "폐리튬이온전지 양극재에서 니켈과 코발트를 고회수율로 선택적 회수하여 배터리 원료로 재활용하는 친환경 습식제련 공정 개발",
  mainFeatures:
    "저온(50–60°C) 공정으로 에너지 소비 최소화, H₂SO₄와 H₂O₂ 단계적 투입으로 침출 선택성 향상, 니켈·코발트 동시 침출로 공정 단계 단축, 기존 고온 건식 공정 대비 설비 비용 및 탄소 배출 절감",
}));

export default function AnalysisDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const selectedPatent = useAnalysisStore((state) => state.selectedPatent);
  const setSelectedPatent = useAnalysisStore((state) => state.setSelectedPatent);

  useEffect(() => {
    setSelectedPatent(null);

    const clearSelectionOutsideProject = (event: PointerEvent) => {
      if (event.target instanceof Element && !event.target.closest("[data-analysis-project]")) {
        setSelectedPatent(null);
      }
    };

    document.addEventListener("pointerdown", clearSelectionOutsideProject);

    return () => {
      document.removeEventListener("pointerdown", clearSelectionOutsideProject);
      setSelectedPatent(null);
    };
  }, [setSelectedPatent]);

  return (
    <div data-analysis-id={id} className="flex w-full flex-col items-start gap-4 self-stretch">
      <BackButton />
      <div className="flex w-full flex-col gap-4 self-stretch">
        <ResultListHeader variant="readonly" className="w-full border-t-0" />
        {MOCK_PATENTS.map((patent) => {
          const highlighted = selectedPatent?.id === patent.id;

          const handleSelect = () => {
            setSelectedPatent(patent);
          };

          return (
            <ProjectList
              key={patent.id}
              data-analysis-project
              showCheckbox={false}
              highlighted={highlighted}
              className="w-full cursor-pointer"
              title={patent.listTitle}
              organization={patent.organization}
              year={patent.year}
              tags={patent.tags}
              status={patent.status}
              relevanceLabel="매우 높음"
              relevanceVariant="verygood"
              thumbnailAlt={`${patent.title} 대표 이미지`}
              role="button"
              tabIndex={0}
              aria-pressed={highlighted}
              onClick={handleSelect}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleSelect();
                }
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
