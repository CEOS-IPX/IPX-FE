"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Topbar } from "@/components/topbar/Topbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar open={openSidebar} onToggle={() => setOpenSidebar((prev) => !prev)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
