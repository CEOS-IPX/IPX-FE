import { SortingTag } from "@/components/searchlist/SortingTag";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/Button";

const MOCK_RESULT_COUNT = 20;

export default function SearchResultPage() {
  return (
    <div className="flex min-h-full w-full flex-col gap-6" aria-label="선행기술 탐색 결과">
      <div className="flex flex-col items-start gap-4">
        <BackButton />

        <h1 className="text-headline-emphasis-24 text-title-primary">
          탐색한 선행기술 <span className="text-primary-default">{MOCK_RESULT_COUNT}건</span>
        </h1>
      </div>

      <div className="flex w-full items-end justify-between self-stretch">
        <SortingTag label="관련도 순" options={["관련도 순", "최신순"]} />
        <Button size="sm" variant="primary" className="h-[2.3125rem] rounded-[0.375rem]">
          특허번호로 불러오기
        </Button>
      </div>
    </div>
  );
}
