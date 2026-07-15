import Warning from "@/components/icons/icon-warning.svg";

interface SimilarityProps {
  similarity: string;
  reason: string;
}

export default function Similarity({ similarity, reason }: SimilarityProps) {
  return (
    <div className="w-full flex px-4 py-5 bg-bg-neutral-hover rounded-lg">
      <div className="flex shrink-0 flex-col gap-1 items-center justify-center whitespace-nowrap border-r border-outline-default pl-2 pr-6">
        <p className="text-label-emphasis-15 text-caption-label">구성요소 유사도</p>
        <p className="text-title-emphasis-22 text-primary-default">{similarity}</p>
      </div>

      <div className="flex min-w-0 flex-col ml-4 px-2 gap-2">
        <div className="flex flex-row gap-1 items-center">
          <Warning className="h-5 w-5 text-icon-primary-emphasize [&_path]:fill-current" />
          <p className="text-body-emphasis-15 text-primary-default">
            관련도가 &apos;매우 높음&apos;으로 선정된 특허들 중 가장 유사한 특허를 기반으로,
            구성요소를 개별 분해 후 가장 유사도가 높은 특허를 선정하였습니다.
          </p>
        </div>
        <p className="text-body-15 text-body-secondary">{reason}</p>
      </div>
    </div>
  );
}
