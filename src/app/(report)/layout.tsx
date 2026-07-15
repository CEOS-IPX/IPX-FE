export default function ReportLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen w-full overflow-auto bg-bg-neutral-hover">{children}</div>;
}
