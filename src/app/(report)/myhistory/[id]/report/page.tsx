import { BackButton } from "@/components/ui/BackButton";
import { PrintButton } from "@/components/ui/PrintButton";
import ReportHeader from "@/components/report/Header";
import ReportOverview from "@/components/report/Overview";
import NoveltyComparison from "@/components/report/NoveltyComparision";
import InventiveStep from "@/components/report/InventiveStep";
import TotalConclusion from "@/components/report/Conclusion";

// 추후 report API(GET) 연동 시 교체
const MOCK_REPORT = {
  reportTitle: "초저전력 IoT 센서 통신 모듈",
  applicant: "플렉스텍",
  inventor: "오세훈",
  attorney: "강길호",
  createdAt: "2026.06.19",
  overview:
    "생분해성 폴리에스터 수지에 표면 개질된 무기 나노입자를 분산시키고, 유기용제 없이 수계 분산 공정으로 코팅층 형성하는 친환경 코팅 조성물.",
  components: [
    { label: "A", title: "생분해성 베이스 수지", description: "PLA·PBAT 블렌드 폴리에스터" },
    { label: "B", title: "표면개질 나노 충전제", description: "실란 처리된 무기 나노입자" },
    {
      label: "C",
      title: "무용제 수계 분산 공정",
      description: "유기용제 없이 수계 분산으로 코팅층 형성",
    },
    { label: "D", title: "UV 경화 기교", description: "자외선 경화형 가교제에 의한 표면 가교" },
  ],
  novelty: {
    satisfied: true,
    notice:
      "관련도가 '매우 높음'으로 선정된 특허들 중 가장 유사한 특허를 기반으로, 구성요소를 개별 대비했습니다.",
    conclusion:
      "구성요소 C·D(무용제 수계 분산 공정, UV 경화 가교)는 주인용발명 D1에 개시되어 있지 않은 차이점입니다. 본 발명은 단일 선행문헌과 실질적으로 동일하지 않아 특허법 제29조 제1항의 신규성을 충족합니다.",
    items: [
      {
        label: "A",
        title: "생분해성 베이스 수지",
        source: "PLA 블렌드 폴리에스터",
        diff: "동일 구성으로 개시됨",
        matchStatus: "IDENTICAL" as const,
      },
      {
        label: "C",
        title: "무용제 수계 분산 공정",
        source: "PLA 블렌드 폴리에스터",
        diff: "유기용제 기반 분산 공정만 개시 — 무용제 수계 분산 공정은 개시·시사 없음",
        matchStatus: "NEW" as const,
      },
      {
        label: "D",
        title: "UV 경화 기교",
        source: "PLA 블렌드 폴리에스터",
        diff: "자외선 경화형 가교 구성에 대한 개시가 없음",
        matchStatus: "NEW" as const,
      },
    ],
  },
  // 추후 진보성 분석 API 연동 시 교체 (comparisonTech·numericalLimits·teachingAway: AI 분석, conclusion: 사용자 입력 저장값)
  inventive: {
    satisfied: true,
    comparisonTech: {
      primary: {
        patentNumber: "KR 10-2023-0145XXX",
        title: "저온 황산침출 기반 니켈·코발트 동시 회수 공정",
        organization: "한국지질자원연구원",
        year: 2024,
      },
      secondary: {
        patentNumber: "KR 10-2023-0145XXX",
        title: "저온 황산침출 기반 니켈·코발트 동시 회수 공정",
        organization: "한국지질자원연구원",
        year: 2024,
      },
    },
    numericalLimits: [
      {
        id: "1",
        category: "VOC 배출량",
        unit: "g/L",
        priorArt: "320",
        invention: "8",
        improvement: "97.5%",
      },
    ],
    teachingAway: {
      backgroundLimit:
        "종래 생분해성 코팅(D1)은 유기용제 기반 분산에 의존하여 VOC 배출·작업 안전성 문제가 있고, D2의 UV 경화 필름은 별도의 경화 공정을 요구한다.",
      motivationAbsence:
        "D1과 D2는 서로 다른 기술 분야(분산 공정 vs 경화 공정)를 다루고 있어, 통상의 기술자가 두 문헌을 결합할 동기를 찾기 어렵다.",
    },
    commonKnowledge: {
      rejectionReason: "구성요소 B(표면개질 나노 충전제)를 단순 주지관용기술로 봄.",
      rebuttalLogic:
        "표면개질 나노 충전제는 실란 커플링제로 표면 처리하여 수지와의 계면 결합력과 분산 안정성을 높인 구성으로, 통상의 기술자에게 관용적으로 채택되는 기술이 아니라 본 발명에 특유한 구성이다.",
    },
    simpleDesignChange: {
      changedComponent: "무용제 수계 분산 공정",
      nonObviousnessLogic:
        "유기용제 기반 분산 공정을 무용제 수계 분산 공정으로 대체하는 것은 단순한 설계 변경이 아니라, 별도의 계면활성제 조성과 공정 조건 최적화가 요구되는 구성으로 통상의 기술자가 쉽게 도출할 수 없다.",
    },
    conclusion:
      "본 발명은 주인용발명 D1과 실질적으로 동일하지 않아 신규성을 충족하며, 차이점 구성요소(C·D)에 대해 수치한정·복수인용발명결합 논리로 결합 동기 부재 및 효과의 현저성이 인정되는 것으로 판단된다. 따라서 본 발명은 특허법 제29조 제1항 및 제2항의 특허요건을 만족한다.",
  },
};

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div data-project-id={id} className="flex min-h-full w-full flex-col items-center">
      <div className="print:hidden flex w-full items-center justify-between px-10 pt-6">
        <BackButton />
        <PrintButton />
      </div>

      <main className="w-full max-w-210 px-10 py-6">
        <article className="flex w-full flex-col gap-16 bg-bg-surface px-17.5 py-15 shadow-[0px_1px_6px_0px_rgba(144,155,165,0.36)] print:shadow-none">
          <ReportHeader
            title={MOCK_REPORT.reportTitle}
            applicant={MOCK_REPORT.applicant}
            inventor={MOCK_REPORT.inventor}
            attorney={MOCK_REPORT.attorney}
            createdAt={MOCK_REPORT.createdAt}
          />

          <ReportOverview overview={MOCK_REPORT.overview} components={MOCK_REPORT.components} />

          <NoveltyComparison
            satisfied={MOCK_REPORT.novelty.satisfied}
            conclusion={MOCK_REPORT.novelty.conclusion}
            items={MOCK_REPORT.novelty.items}
          />

          <InventiveStep
            satisfied={MOCK_REPORT.inventive.satisfied}
            primaryReference={MOCK_REPORT.inventive.comparisonTech.primary}
            secondaryReference={MOCK_REPORT.inventive.comparisonTech.secondary}
            numericalLimits={MOCK_REPORT.inventive.numericalLimits}
            backgroundLimit={MOCK_REPORT.inventive.teachingAway.backgroundLimit}
            motivationAbsence={MOCK_REPORT.inventive.teachingAway.motivationAbsence}
            rejectionReason={MOCK_REPORT.inventive.commonKnowledge.rejectionReason}
            rebuttalLogic={MOCK_REPORT.inventive.commonKnowledge.rebuttalLogic}
            changedComponent={MOCK_REPORT.inventive.simpleDesignChange.changedComponent}
            nonObviousnessLogic={MOCK_REPORT.inventive.simpleDesignChange.nonObviousnessLogic}
          />

          <TotalConclusion conclusion={MOCK_REPORT.inventive.conclusion} />
        </article>
      </main>
    </div>
  );
}
