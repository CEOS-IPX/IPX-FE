import ExternalIcon from "@/components/icons/icon-external.svg";
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
    </div>
  );
}
