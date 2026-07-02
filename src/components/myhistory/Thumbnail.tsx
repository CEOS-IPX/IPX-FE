import Image from "next/image";

//추후에 api 연동 시 목록에 있는 특허 썸네일 연동 예정
export interface Patent {
  id: string;
  thumbnailUrl: string;
}

interface ThumbnailProps {
  patents: Patent[];
}

export function Thumbnail({ patents }: ThumbnailProps) {
  const extraCount = patents.length - 3;

  return (
    <div className="grid grid-cols-4 gap-2">
      {Array.from({ length: 4 }).map((_, i) => {
        const patent = patents[i];
        const isLastSlot = i === 3;
        const showOverlay = isLastSlot && extraCount > 0;

        return (
          <div
            key={patent?.id ?? i}
            className="relative aspect-square overflow-hidden rounded-lg bg-bg-neutral-subtle"
          >
            {patent?.thumbnailUrl && (
              <Image
                src={patent.thumbnailUrl}
                alt={`특허 썸네일 ${i + 1}`}
                fill
                className="object-cover"
              />
            )}
            {showOverlay && (
              <div className="absolute inset-0 flex items-center justify-center bg-scrim-1">
                <span className="text-title-20 text-inverse-on-primary">+{extraCount}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
