"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Topbar } from "@/components/topbar/Topbar";
import { useSidebarStore } from "@/store/sidebarStore";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { open: openSidebar, setOpen } = useSidebarStore();
  const pathname = usePathname();
  const isAnalysis = pathname.startsWith("/analysis");

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar open={openSidebar} onToggle={() => setOpen(!openSidebar)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className={`flex-1 overflow-auto scrollbar-hide ${isAnalysis ? "" : "p-10"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
