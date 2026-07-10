"use client";

import { AnalysisRightPanel } from "@/components/analysis/AnalysisRightPanel/AnalysisRightPanel";
import { useSidebarStore } from "@/store/sidebarStore";

export default function AnalysisLayout({ children }: { children: React.ReactNode }) {
  const open = useSidebarStore((s) => s.open);

  return (
    <div className="flex h-full">
      <div className={`overflow-auto p-10 scrollbar-hide ${open ? "flex-14" : "flex-1"}`}>
        {children}
      </div>

      <div className={`flex h-full flex-col bg-bg-neutral-hover ${open ? "flex-9" : "flex-1"}`}>
        <AnalysisRightPanel />
      </div>
    </div>
  );
}
