import { BackButton } from "@/components/ui/BackButton";
import Header from "@/components/myhistory/novelty/Header";
import Similarity from "@/components/myhistory/novelty/Similarity";
import NoveltyTable, { type NoveltyComparison } from "@/components/myhistory/novelty/NoveltyTable";

// 추후 api 연동 시 교체
const MOCK_PATENT = {
  title: "저온 황산침출 기반 니켈·코발트 동시 회수 공정",
  status: "등록",
  patentNumber: "KR 10-2023-0145XXX",
  organization: "한국지질자원연구원",
};

// 추후 api 연동 시 교체
const MOCK_NOVELTY = {
  similarity: "매우 높음",
  reason:
    "구성요소 C·D(무용제 수계 분산 공정, UV 경화 가교)는 주인용발명에 개시되어 있지 않은 차이점입니다. 본 발명은 단일 선행문헌과 실질적으로 동일하지 않으므로, 특허법 제29조 제1항의 신규성을 충족합니다.",
};

// 추후 api 연동 시 교체 (comparisons[])
const MOCK_COMPARISONS: NoveltyComparison[] = [
  {
    comparisonId: 1,
    componentId: 1,
    componentLabel: "A",
    componentName: "생분해성 베이스 수지",
    priorArtId: 1,
    dLabel: "D1",
    applicationNumber: "10-2023-0001234",
    matchStatus: "identical",
    priorArtExcerpt: "생분해성 폴리에스터 수지를 베이스로 하는 코팅 조성물을 동일하게 게시함",
  },
  {
    comparisonId: 2,
    componentId: 2,
    componentLabel: "B",
    componentName: "표면개질 나노 충전제",
    priorArtId: 1,
    dLabel: "D1",
    applicationNumber: "10-2023-0001234",
    matchStatus: "similar",
    priorArtExcerpt: "생분해성 폴리에스터 수지를 베이스로 하는 코팅 조성물을 동일하게 게시함",
  },
  {
    comparisonId: 3,
    componentId: 3,
    componentLabel: "C",
    componentName: "무용제 수계 분산 공정",
    priorArtId: 1,
    dLabel: "D1",
    applicationNumber: "10-2023-0001234",
    matchStatus: "novel",
    priorArtExcerpt: "생분해성 폴리에스터 수지를 베이스로 하는 코팅 조성물을 동일하게 게시함",
  },
  {
    comparisonId: 4,
    componentId: 4,
    componentLabel: "D",
    componentName: "UV 경화 기교",
    priorArtId: 1,
    dLabel: "D1",
    applicationNumber: "10-2023-0001234",
    matchStatus: "novel",
    priorArtExcerpt: "생분해성 폴리에스터 수지를 베이스로 하는 코팅 조성물을 동일하게 게시함",
  },
];

export default async function NoveltyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-6">
      <BackButton />

      <Header
        title={MOCK_PATENT.title}
        status={MOCK_PATENT.status}
        patentNumber={MOCK_PATENT.patentNumber}
        organization={MOCK_PATENT.organization}
      />

      <Similarity similarity={MOCK_NOVELTY.similarity} reason={MOCK_NOVELTY.reason} />

      <NoveltyTable comparisons={MOCK_COMPARISONS} />
    </div>
  );
}
