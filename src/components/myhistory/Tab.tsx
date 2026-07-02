"use client";

type TabValue = "전체" | "대기 중" | "완료";

interface TabProps {
  active: TabValue;
  counts: { 전체: number; "대기 중": number; 완료: number };
  onChange: (tab: TabValue) => void;
}

const TABS: TabValue[] = ["전체", "대기 중", "완료"];

export function Tab({ active, counts, onChange }: TabProps) {
  return (
    <div className="flex w-60">
      {TABS.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className="flex flex-1 items-center justify-center"
          >
            <span
              className={[
                "flex items-center gap-1 pb-1",
                isActive ? "border-b-2 border-primary-default" : "border-b-2 border-bg-surface",
              ].join(" ")}
            >
              <span
                className={
                  isActive
                    ? "text-label-17 text-title-secondary"
                    : "text-label-17 text-caption-label"
                }
              >
                {tab}
              </span>
              <span
                className={
                  isActive
                    ? "text-label-17 text-primary-default"
                    : "text-label-17 text-caption-label"
                }
              >
                {counts[tab]}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
