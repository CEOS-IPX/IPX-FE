"use client";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen w-full overflow-hidden bg-bg-neutral-hover py-10 px-30">
      {children}
    </main>
  );
}
