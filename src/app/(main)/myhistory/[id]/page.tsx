import Link from "next/link";
import BackIcon from "@/components/icons/icon-back.svg";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div data-project-id={id} className="flex min-h-full w-full flex-col gap-6">
      <Link
        href="/myhistory"
        aria-label="내 활동 기록으로 돌아가기"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-surface shadow-[0px_1px_6px_0px_rgba(144,155,165,0.36)]"
      >
        <BackIcon
          className="h-5 w-5 -scale-x-100 text-icon-neutral-emphasize [&_path]:fill-current"
          aria-hidden
        />
      </Link>
    </div>
  );
}
