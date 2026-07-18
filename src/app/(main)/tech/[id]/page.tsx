import ExternalIcon from "@/components/icons/icon-external.svg";
import { ExplainSection } from "@/components/analysis/AnalysisRightPanel/ExplainSection";
import { InfoCard } from "@/components/analysis/AnalysisRightPanel/InfoCard";
import { Chip } from "@/components/searchlist/Chip";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";

// 추후 API 연동 시 선택한 선행기술 정보로 교체
const MOCK_TECH = {
  title: "저온 황산침출 기반 니켈·코발트 동시 회수 공정",
  status: "등록",
  patentNumber: "KR 10-2023-0145XXX",
  organization: "한국지질자원연구원",
  thumbnailUrl: "",
  applicationDate: "2022.04.26",
  registrationDate: "2023.05.11",
  applicationPeriod: "1년 1개월",
  currentStatus: "등록",
  expirationDate: "2038.05.18",
  summary:
    "50–60°C의 저온에서 H₂SO₄ 1.0–1.5 M과 환원제 H₂O₂를 단계적으로 투입하여 폐리튬이온전지 양극재로부터 니켈과 코발트를 동시에 침출하는 단계를 포함하는 습식제련 방법.",
  purpose:
    "폐리튬이온전지 양극재에서 니켈과 코발트를 고회수율로 선택적 회수하여 배터리 원료로 재활용하는 친환경 습식제련 공정 개발",
  mainFeatures:
    "저온(50–60°C) 공정으로 에너지 소비 최소화, H₂SO₄와 H₂O₂ 단계적 투입으로 침출 선택성 향상, 니켈·코발트 동시 침출로 공정 단계 단축, 기존 고온 건식 공정 대비 설비 비용 및 탄소 배출 절감",
};

export default async function TechDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div
      data-tech-id={id}
      className="flex min-h-full w-full flex-col items-start gap-9 self-stretch"
    >
      <div className="flex w-full flex-col items-start gap-6 self-stretch">
        <BackButton />

        <header className="flex w-full items-end gap-9 self-stretch">
          <div className="flex min-w-0 flex-1 items-start gap-5.25">
            <div
              role="img"
              aria-label="선행기술 대표 이미지"
              className="flex size-25 shrink-0 aspect-square items-center justify-center gap-2.5 rounded-sm border border-outline-sub bg-bg-neutral-subtle bg-cover bg-center bg-no-repeat p-2.5"
              style={
                MOCK_TECH.thumbnailUrl
                  ? { backgroundImage: `url("${MOCK_TECH.thumbnailUrl}")` }
                  : undefined
              }
            />

            <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
              <div className="flex w-full min-w-0 items-center gap-2 self-stretch">
                <h1 className="min-w-0 line-clamp-1 text-headline-emphasis-24 text-title-primary">
                  {MOCK_TECH.title}
                </h1>
                <Chip variant="primary" className="shrink-0">
                  {MOCK_TECH.status}
                </Chip>
              </div>

              <div className="flex min-w-0 items-center gap-3 text-title-18 text-body-disabled">
                <span className="shrink-0">{MOCK_TECH.patentNumber}</span>
                <span aria-hidden>|</span>
                <span className="min-w-0 truncate">{MOCK_TECH.organization}</span>
              </div>
            </div>
          </div>

          <Button
            size="sm"
            variant="secondary"
            className="h-10.25 shrink-0 gap-1 rounded-md py-2.5 pr-4 pl-3"
          >
            <ExternalIcon className="size-5 shrink-0 [&_path]:fill-current" aria-hidden />
            원문보기
          </Button>
        </header>
      </div>

      <div className="flex w-full items-start gap-6 self-stretch">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-12 self-stretch">
          <div className="flex w-full items-stretch gap-2 self-stretch">
            <InfoCard
              label="출원"
              value={MOCK_TECH.applicationDate}
              className="border-0 bg-bg-neutral-hover"
            />
            <InfoCard
              label="등록"
              value={MOCK_TECH.registrationDate}
              className="border-0 bg-bg-neutral-hover"
            />
            <InfoCard
              label="출원-등록 기간"
              value={MOCK_TECH.applicationPeriod}
              className="border-0 bg-bg-neutral-hover"
            />
            <InfoCard
              label="현재 상태"
              value={MOCK_TECH.currentStatus}
              subValue={`~${MOCK_TECH.expirationDate}`}
              className="border-0 bg-bg-neutral-hover"
            />
          </div>

          <ExplainSection title="핵심 요약" content={MOCK_TECH.summary} />
          <ExplainSection title="기술목적" content={MOCK_TECH.purpose} />
          <ExplainSection title="주요 특징" content={MOCK_TECH.mainFeatures} />
        </div>
      </div>
    </div>
  );
}
