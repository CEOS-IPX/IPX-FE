"use client";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-full w-full bg-bg-neutral-hover pt-15 px-30 pb-10">{children}</div>;
}
