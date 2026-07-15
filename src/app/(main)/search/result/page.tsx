import Link from "next/link";
import BackIcon from "@/components/icons/icon-back.svg";

const MOCK_RESULT_COUNT = 20;

export default function SearchResultPage() {
  return (
    <div className="flex min-h-full w-full flex-col gap-6" aria-label="선행기술 탐색 결과">
      <div className="flex flex-col items-start gap-4">
        <Link
          href="/search"
          aria-label="선행기술 탐색으로 돌아가기"
          className="flex h-8 w-8 items-center justify-center gap-2.5 rounded-[6.25rem] bg-bg-surface shadow-[0_1px_6px_0_rgba(144,155,165,0.36)]"
        >
          <BackIcon
            className="h-5 w-5 shrink-0 -scale-x-100 text-icon-neutral-emphasize [&_path]:fill-current"
            aria-hidden
          />
        </Link>

        <h1 className="text-headline-emphasis-24 text-title-primary">
          탐색한 선행기술 <span className="text-primary-default">{MOCK_RESULT_COUNT}건</span>
        </h1>
      </div>
    </div>
  );
}
