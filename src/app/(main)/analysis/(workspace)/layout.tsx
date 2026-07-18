"use client";

import { usePathname } from "next/navigation";
import { AnalysisRightPanel } from "@/components/analysis/AnalysisRightPanel/AnalysisRightPanel";
import { useSidebarStore } from "@/store/sidebarStore";

export default function AnalysisLayout({ children }: { children: React.ReactNode }) {
  const open = useSidebarStore((s) => s.open);
  const pathname = usePathname();
  const isAnalysisDetail = pathname !== "/analysis";

  return (
    <div className="flex h-full">
      <div
        className={`overflow-auto scrollbar-hide ${
          isAnalysisDetail ? "px-10 py-6" : "p-10"
        } ${open ? "flex-14" : "flex-1"}`}
      >
        {children}
      </div>

      <div className={`flex h-full flex-col bg-bg-neutral-hover ${open ? "flex-9" : "flex-1"}`}>
        <AnalysisRightPanel />
      </div>
    </div>
  );
}
