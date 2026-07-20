import { Button } from "@/components/ui/Button";
import { ResultCountButton } from "./ResultCountButton";

type FooterProps = {
  disabled: boolean;
};

export function Footer({ disabled }: FooterProps) {
  return (
    <div className="flex pt-6 pb-7 pl-10 items-center justify-between">
      <div className="flex items-center gap-6 text-label-17 text-title-secondary">
        <span>탐색 결과 개수</span>
        <ResultCountButton />
      </div>

      <Button size="sm" disabled={disabled}>
        탐색 시작
      </Button>
    </div>
  );
}
