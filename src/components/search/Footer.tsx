import { Button } from "@/components/ui/Button";
import { ResultCountButton } from "./ResultCountButton";

export function Footer() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6 text-label-17 text-title-secondary">
        <span>탐색 결과 개수</span>
        <ResultCountButton />
      </div>

      <Button size="sm" disabled>
        탐색 시작
      </Button>
      {/* api 연동 이후 disabled 해제 관련 조건 추가 예정 */}
    </div>
  );
}
