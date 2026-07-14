import WarningIcon from "@/components/icons/icon-warning_filled.svg";

export function AnalysisNotice() {
  return (
    <aside className="flex w-full flex-col items-start gap-2.5 rounded-[0.5rem] border border-outline-sub bg-bg-surface p-5">
      <div className="flex items-center gap-1">
        <WarningIcon className="h-5 w-5 shrink-0" aria-hidden />
        <h2 className="text-body-emphasis-17 text-body-primary">안내 사항</h2>
      </div>

      <p className="w-full text-body-15 text-body-disabled">
        특허 출원을 하면 심사관이 산업상 이용가능성, 신규성, 진보성 세 가지 기준으로 심사합니다. 이
        중 기존 특허와 100% 동일한 경우는 드물기 때문에, 실제 거절은 대부분 &apos;진보성
        부족&apos;을 이유로 발생합니다.
      </p>
    </aside>
  );
}
