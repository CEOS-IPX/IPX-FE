import { Button } from "@/components/ui/Button";
import { ResultCountButton } from "./ResultCountButton";

type FooterProps = {
  disabled: boolean;
  resultCount: number;
  onResultCountChange: (count: number) => void;
  onStart: () => void;
};

export function Footer({ disabled, resultCount, onResultCountChange, onStart }: FooterProps) {
  return (
    <div className="flex pt-6 pb-7 pl-10 items-center justify-between">
      <div className="flex items-center gap-6 text-label-17 text-title-secondary">
        <span>탐색 결과 개수</span>
        <ResultCountButton count={resultCount} onChange={onResultCountChange} />
      </div>

      <Button size="sm" disabled={disabled} onClick={onStart}>
        탐색 시작
      </Button>
    </div>
  );
}
