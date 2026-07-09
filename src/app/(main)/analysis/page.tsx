import Header from "@/components/analysis/Header";
import { AnalysisProjectCard } from "@/components/analysis/AnalysisProjectCard";

// 추후 api 연동 시 교체
const MOCK_PROJECTS = [
  {
    id: "1",
    title: "프로젝트명 프로젝트명 프로젝트명프로젝트명 프로젝트명 프로젝트명 프로젝트명 프...",
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
  return (
    <div className="flex flex-col gap-6">
      <Header />

      <div className="flex flex-col gap-4">
        {MOCK_PROJECTS.map((project) => (
          <AnalysisProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}
