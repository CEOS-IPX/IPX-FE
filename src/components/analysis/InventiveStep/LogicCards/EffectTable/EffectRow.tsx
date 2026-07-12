import TrashIcon from "@/components/icons/icon-trashcan.svg";

interface EffectRowProps {
  category: string;
  unit: string;
  priorArt: string;
  invention: string;
  onDelete: () => void;
  onChangeCategory: (value: string) => void;
  onChangeUnit: (value: string) => void;
  onChangePriorArt: (value: string) => void;
  onChangeInvention: (value: string) => void;
}

function getImprovement(priorArt: string, invention: string) {
  const prior = Number(priorArt);
  const current = Number(invention);

  if (!priorArt || !invention || Number.isNaN(prior) || Number.isNaN(current) || prior === 0) {
    return "-";
  }

  return `${(((prior - current) / prior) * 100).toFixed(1)}%`;
}

export function EffectRow({
  category,
  unit,
  priorArt,
  invention,
  onDelete,
  onChangeCategory,
  onChangeUnit,
  onChangePriorArt,
  onChangeInvention,
}: EffectRowProps) {
  return (
    <div className="grid grid-cols-[1fr_88px_96px_96px_96px_44px] items-center gap-4 px-4 py-3">
      <input
        value={category}
        onChange={(e) => onChangeCategory(e.target.value)}
        placeholder="EX) VOC 배출량"
        className="w-full bg-transparent text-label-17 text-body-secondary placeholder:text-caption-label focus:outline-none"
      />

      <input
        value={unit}
        onChange={(e) => onChangeUnit(e.target.value)}
        placeholder="g/L"
        className="w-full bg-transparent text-right text-label-17 text-body-secondary placeholder:text-caption-label focus:outline-none"
      />

      <input
        value={priorArt}
        onChange={(e) => onChangePriorArt(e.target.value)}
        placeholder="0"
        className="w-full bg-transparent text-right text-label-17 text-body-secondary placeholder:text-caption-label focus:outline-none"
      />

      <input
        value={invention}
        onChange={(e) => onChangeInvention(e.target.value)}
        placeholder="0"
        className="w-full bg-transparent text-right text-label-emphasis-17 text-primary-default placeholder:text-caption-label focus:outline-none"
      />

      <p className="text-right text-label-emphasis-17 text-caption-semantic-1">
        {getImprovement(priorArt, invention)}
      </p>

      <button
        type="button"
        onClick={onDelete}
        className="justify-self-end p-2.5 text-icon-neutral-subtle transition-colors hover:text-error-default"
      >
        <TrashIcon className="h-6 w-6 [&_path]:fill-current" />
      </button>
    </div>
  );
}
