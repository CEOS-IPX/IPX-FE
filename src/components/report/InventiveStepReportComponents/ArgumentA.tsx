import InventiveHeader from "@/components/report/InventiveStepReportComponents/Header";
import {
  EffectTable,
  type Effect,
} from "@/components/analysis/InventiveStep/LogicCards/EffectTable/EffectTable";

type ArgumentAProps = {
  effects: Effect[];
};

export default function ArgumentA({ effects }: ArgumentAProps) {
  return (
    <div className="flex flex-col gap-4">
      <InventiveHeader title="수치한정" subtitle="발명의 효과" />

      <EffectTable effects={effects} isEditing={false} onAdd={() => {}} onChange={() => {}} />
    </div>
  );
}
