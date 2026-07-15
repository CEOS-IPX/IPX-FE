interface EffectRowProps {
  category: string;
  unit: string;
  priorArt: string;
  invention: string;
  improvement: string;
  isEditing: boolean;
  onChangeCategory: (value: string) => void;
  onChangeUnit: (value: string) => void;
  onChangePriorArt: (value: string) => void;
  onChangeInvention: (value: string) => void;
  onChangeImprovement: (value: string) => void;
}

export function EffectRow({
  category,
  unit,
  priorArt,
  invention,
  improvement,
  isEditing,
  onChangeCategory,
  onChangeUnit,
  onChangePriorArt,
  onChangeInvention,
  onChangeImprovement,
}: EffectRowProps) {
  return (
    <div className="grid grid-cols-[4fr_1fr_1fr_1fr_1fr] items-center gap-4 py-2.5">
      {isEditing ? (
        <input
          value={category}
          onChange={(e) => onChangeCategory(e.target.value)}
          placeholder="EX) VOC 배출량"
          className="px-2.5 text-left w-full bg-transparent text-label-13 text-caption-label placeholder:text-caption-label focus:outline-none"
        />
      ) : (
        <p className="px-2.5 text-left text-label-13 text-body-secondary">{category}</p>
      )}

      {/* 단위 */}
      {isEditing ? (
        <input
          value={unit}
          onChange={(e) => onChangeUnit(e.target.value)}
          placeholder="g/L"
          className="px-2.5 w-full bg-transparent text-center text-label-13 text-caption-label placeholder:text-caption-label focus:outline-none"
        />
      ) : (
        <p className="px-2.5 text-center text-label-13 text-body-secondary">{unit}</p>
      )}

      {/* 종래기술 */}
      {isEditing ? (
        <input
          value={priorArt}
          onChange={(e) => onChangePriorArt(e.target.value)}
          placeholder="0"
          className="px-2.5 w-full bg-transparent text-center text-label-13 text-caption-label placeholder:text-caption-label focus:outline-none"
        />
      ) : (
        <p className="px-2.5 text-center text-label-13 text-body-secondary">{priorArt}</p>
      )}

      {/* 본발명 */}
      {isEditing ? (
        <input
          value={invention}
          onChange={(e) => onChangeInvention(e.target.value)}
          placeholder="0"
          className="px-2.5 w-full bg-transparent text-center text-label-13 text-caption-label placeholder:text-caption-label focus:outline-none"
        />
      ) : (
        <p className="px-2.5 text-center text-label-13 text-primary-default">{invention}</p>
      )}

      {/* 개선폭 */}
      {isEditing ? (
        <input
          value={improvement}
          onChange={(e) => onChangeImprovement(e.target.value)}
          placeholder="0%"
          className="px-2.5 w-full bg-transparent text-center text-label-13 text-caption-label placeholder:text-caption-label focus:outline-none"
        />
      ) : (
        <p className="px-2.5 text-center text-label-13 text-caption-semantic-1">{improvement}</p>
      )}
    </div>
  );
}
