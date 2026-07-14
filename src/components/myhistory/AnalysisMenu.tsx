import BackIcon from "@/components/icons/icon-back.svg";

const ANALYSIS_MENU_ITEMS = [
  {
    title: "재탐색하기",
    description: "청구항 구조 파악",
  },
  {
    title: "진보성 분석",
    description: "기술 진보성 분석",
  },
  {
    title: "신규성 비교",
    description: "선행기술 대비 분석",
  },
];

export function AnalysisMenu() {
  return (
    <nav
      className="flex w-[17.5rem] shrink-0 flex-col items-center overflow-hidden rounded-[0.5rem] border border-outline-sub bg-bg-surface"
      aria-label="활동 기록 분석 메뉴"
    >
      {ANALYSIS_MENU_ITEMS.map((item) => (
        <button
          key={item.title}
          type="button"
          className="flex w-full cursor-pointer items-center justify-between border-b border-outline-sub py-4 pr-3 pl-3.5 text-left last:border-b-0 hover:bg-bg-neutral-hover"
        >
          <span className="flex min-w-0 flex-1 flex-col items-start">
            <span className="w-full text-body-emphasis-17 text-title-primary">{item.title}</span>
            <span className="w-full text-body-15 text-body-disabled">{item.description}</span>
          </span>

          <BackIcon
            className="h-6 w-6 shrink-0 text-icon-neutral-default [&_path]:fill-current"
            aria-hidden
          />
        </button>
      ))}
    </nav>
  );
}
