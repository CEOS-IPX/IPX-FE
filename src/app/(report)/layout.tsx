import { Topbar } from "@/components/topbar/Topbar";

export default function ReportLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col overflow-auto bg-bg-neutral-hover scrollbar-hide print:h-auto print:overflow-visible">
      <div className="print:hidden">
        <Topbar />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
