import PlusIcon from "@/components/icons/icon-plus.svg";
import { EffectRow } from "./EffectRow";

export interface Effect {
  id: string;
  category: string;
  unit: string;
  priorArt: string;
  invention: string;
  improvement: string;
}

interface EffectTableProps {
  effects: Effect[];
  isEditing: boolean;
  onAdd: () => void;
  onChange: (id: string, field: keyof Omit<Effect, "id">, value: string) => void;
}

export function EffectTable({ effects, isEditing, onAdd, onChange }: EffectTableProps) {
  return (
    <div className="w-full overflow-hidden border-y border-outline-sub">
      <div className="grid grid-cols-[4fr_1fr_1fr_1fr_1fr] items-center gap-4 bg-bg-neutral-hover py-2.5 text-label-13 text-caption-label">
        <span className="px-2.5 text-left">구분</span>
        <span className="px-2.5 text-center">단위</span>
        <span className="px-2.5 text-center">종래기술</span>
        <span className="px-2.5 text-center">본 발명</span>
        <span className="px-2.5 text-center">개선폭</span>
      </div>

      {effects.map((effect) => (
        <EffectRow
          key={effect.id}
          category={effect.category}
          unit={effect.unit}
          priorArt={effect.priorArt}
          invention={effect.invention}
          improvement={effect.improvement}
          isEditing={isEditing}
          onChangeCategory={(value) => onChange(effect.id, "category", value)}
          onChangeUnit={(value) => onChange(effect.id, "unit", value)}
          onChangePriorArt={(value) => onChange(effect.id, "priorArt", value)}
          onChangeInvention={(value) => onChange(effect.id, "invention", value)}
          onChangeImprovement={(value) => onChange(effect.id, "improvement", value)}
        />
      ))}

      {isEditing && (
        <button
          type="button"
          onClick={onAdd}
          className="flex w-full items-center gap-1 border-t border-outline-sub p-2.5 text-label-13 text-primary-default transition-opacity cursor-pointer bg-bg-surface hover:bg-bg-neutral-hover active:bg-bg-neutral-subtle"
        >
          <PlusIcon className="h-4 w-4 text-icon-primary-emphasize [&_path]:fill-current" />
          구성요소 추가
        </button>
      )}
    </div>
  );
}
