import { Topbar } from "@/components/topbar/Topbar";

export default function ReportDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col">
      <Topbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
