import PlusIcon from "@/components/icons/icon-plus.svg";
import { EffectRow } from "./EffectRow";

export interface Effect {
  id: string;
  category: string;
  unit: string;
  priorArt: string;
  invention: string;
}

interface EffectTableProps {
  effects: Effect[];
  onAdd: () => void;
  onDelete: (id: string) => void;
  onChange: (id: string, field: keyof Omit<Effect, "id">, value: string) => void;
}

export function EffectTable({ effects, onAdd, onDelete, onChange }: EffectTableProps) {
  return (
    <div className="w-full overflow-hidden border-y border-outline-sub">
      <div className="grid grid-cols-[1fr_88px_96px_96px_96px_44px] items-center gap-4 bg-bg-neutral-hover px-4 py-2.5">
        <span className="text-label-15 text-body-disabled">구분</span>
        <span className="text-right text-label-15 text-body-disabled">단위</span>
        <span className="text-right text-label-15 text-body-disabled">종래기술</span>
        <span className="text-right text-label-15 text-body-disabled">본 발명</span>
        <span className="text-right text-label-15 text-body-disabled">개선폭</span>
        <div className="w-11" />
      </div>

      {effects.map((effect) => (
        <EffectRow
          key={effect.id}
          category={effect.category}
          unit={effect.unit}
          priorArt={effect.priorArt}
          invention={effect.invention}
          onDelete={() => onDelete(effect.id)}
          onChangeCategory={(value) => onChange(effect.id, "category", value)}
          onChangeUnit={(value) => onChange(effect.id, "unit", value)}
          onChangePriorArt={(value) => onChange(effect.id, "priorArt", value)}
          onChangeInvention={(value) => onChange(effect.id, "invention", value)}
        />
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="flex w-full items-center gap-1 border-t border-outline-sub px-4 py-3 text-label-17 text-primary-default transition-opacity cursor-pointer bg-bg-surface hover:bg-bg-neutral-hover active:bg-bg-neutral-subtle"
      >
        <PlusIcon className="m-2 h-5 w-5 text-icon-primary-emphasize [&_path]:fill-current" />
        효과 항목 추가
      </button>
    </div>
  );
}
