import Link from "next/link";
import BackIcon from "@/components/icons/icon-back.svg";
import { Chip } from "@/components/myhistory/ProjectCardChip";

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
        label: "C",
        title: "무용제 수계 분산 공정",
        source: "PLA 블렌드 폴리에스터",
        diff: "유기용제 기반 분산 공정만 개시 — 무용제 수계 분산 공정은 개시·시사 없음",
      },
      {
        label: "D",
        title: "UV 경화 기교",
        source: "PLA 블렌드 폴리에스터",
        diff: "자외선 경화형 가교 구성에 대한 개시가 없음",
      },
    ],
  },
  // 추후 진보성 분석 명세서 확정되면 채움
  inventive: {
    satisfied: true,
  },
};

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div data-project-id={id} className="flex min-h-full w-full flex-col items-center">
      <div className="print:hidden flex w-full max-w-210 items-center justify-between px-10 pt-6">
        <Link
          href={`/myhistory/${id}`}
          aria-label="프로젝트로 돌아가기"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-surface shadow-[0px_1px_6px_0px_rgba(144,155,165,0.36)]"
        >
          <BackIcon
            className="h-5 w-5 -scale-x-100 text-icon-neutral-emphasize [&_path]:fill-current"
            aria-hidden
          />
        </Link>
      </div>

      <main className="w-full max-w-210 px-10 py-6">
        <article className="flex w-full flex-col gap-10 rounded-lg bg-bg-surface p-16 shadow-[0px_1px_6px_0px_rgba(144,155,165,0.36)] print:shadow-none">
          <div className="flex flex-col gap-3">
            <span className="text-label-15 text-caption-label">IPX Report</span>
            <h1 className="text-headline-emphasis-32 text-title-primary">
              {MOCK_REPORT.reportTitle}
            </h1>

            <dl className="flex flex-col gap-1 pt-2 text-body-15">
              <div className="flex gap-3">
                <dt className="w-12 text-caption-label">출원인</dt>
                <dd className="text-body-secondary">{MOCK_REPORT.applicant}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-12 text-caption-label">발명자</dt>
                <dd className="text-body-secondary">{MOCK_REPORT.inventor}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-12 text-caption-label">변리사</dt>
                <dd className="text-body-secondary">{MOCK_REPORT.attorney}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-12 text-caption-label">작성일</dt>
                <dd className="text-body-secondary">{MOCK_REPORT.createdAt}</dd>
              </div>
            </dl>
          </div>

          <hr className="border-outline-sub" />

          {/* 01 발명의 개요 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-title-emphasis-20 text-primary-default">01 발명의 개요</h2>
            <p className="text-body-15 text-body-secondary">{MOCK_REPORT.overview}</p>

            <div className="flex flex-col">
              {MOCK_REPORT.components.map((component) => (
                <div
                  key={component.label}
                  className="flex items-center gap-4 border-b border-outline-sub py-3 last:border-b-0"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bg-primary-light text-label-13 text-primary-default">
                    {component.label}
                  </span>
                  <span className="w-52 shrink-0 text-label-emphasis-15 text-title-secondary">
                    {component.title}
                  </span>
                  <span className="text-body-15 text-body-secondary">{component.description}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-outline-sub" />

          {/* 02 신규성 분석 */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-title-emphasis-20 text-primary-default">02 신규성 분석</h2>
              <Chip variant="primary">
                {MOCK_REPORT.novelty.satisfied ? "신규성 충족" : "신규성 미충족"}
              </Chip>
            </div>

            <p className="text-label-13 text-caption-label">{MOCK_REPORT.novelty.notice}</p>
            <p className="text-body-15 text-body-secondary">{MOCK_REPORT.novelty.conclusion}</p>

            <div className="flex flex-col gap-2">
              {MOCK_REPORT.novelty.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-md bg-bg-neutral-hover px-4 py-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bg-primary-light text-label-13 text-primary-default">
                    {item.label}
                  </span>
                  <div className="flex w-52 shrink-0 flex-col">
                    <span className="text-label-emphasis-15 text-title-secondary">
                      {item.title}
                    </span>
                    <span className="text-label-13 text-caption-label">{item.source}</span>
                  </div>
                  <span className="text-body-15 text-body-secondary">{item.diff}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-outline-sub" />

          {/* 03 진보성 분석 */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-title-emphasis-20 text-primary-default">03 진보성 분석</h2>
              <Chip variant="primary">
                {MOCK_REPORT.inventive.satisfied ? "진보성 충족" : "진보성 미충족"}
              </Chip>
            </div>
            {/* 진보성 분석 상세 명세서 확정되면 이어서 구현 */}
          </section>
        </article>
      </main>
    </div>
  );
}
