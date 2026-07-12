"use client";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-full w-full bg-bg-neutral-hover px-30 py-10">{children}</div>;
}
