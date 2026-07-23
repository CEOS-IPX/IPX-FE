import { Chip } from "@/components/myhistory/ProjectCardChip";
import Warning from "@/components/icons/icon-warning.svg";

type NoveltyItem = {
  label: string;
  title: string;
  diff: string;
  matchStatus: "IDENTICAL" | "SIMILAR" | "NEW";
};

type NoveltyComparisonProps = {
  satisfied: boolean;
  conclusion: string;
  items: NoveltyItem[];
};

export default function NoveltyComparison({
  satisfied,
  conclusion,
  items,
}: NoveltyComparisonProps) {
  return (
    <section className="flex flex-col gap-5 print:break-before-page print:mt-10">
      <div className="flex items-center gap-2">
        <h2 className="flex text-title-emphasis-18 text-title-secondary gap-2">
          <span className="text-title-emphasis-18 text-primary-default">02</span>
          <span>신규성 분석</span>
        </h2>

        <Chip variant="primary">{satisfied ? "신규성 충족" : "신규성 미충족"}</Chip>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-1 items-start">
          <Warning className="h-5 w-5 text-icon-primary-emphasize [&_path]:fill-current" />
          <p className="text-label-13 text-primary-default">
            관련도가 매우 높음으로 선정된 특허들 중 가장 유사한 특허를 기반으로, 구성요소를 개별
            분해 후 가장 유사도가 높은 특허를 선정하였습니다.
          </p>
        </div>

        <p className="text-label-13 text-body-secondary">{conclusion}</p>
      </div>

      <div className="flex flex-col gap-2 mt-1 print:break-inside-avoid">
        {items
          .filter((item) => item.matchStatus === "NEW")
          .map((item) => (
            <div key={item.label} className="flex items-center gap-3 bg-bg-primary-tint px-4 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg-elementlist text-label-emphasis-15 text-primary-sub">
                {item.label}
              </span>

              <div className="flex w-38 shrink-0">
                <p className="text-label-emphasis-15 text-title-secondary">{item.title}</p>
              </div>

              <span className="text-label-13 text-primary-sub">{item.diff}</span>
            </div>
          ))}
      </div>
    </section>
  );
}
