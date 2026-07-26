"use client";

import { useState } from "react";
import ArgumentFormHeader from "./Header";
import { EffectTable, type Effect, type EffectField } from "./EffectTable/EffectTable";

type InitialEffect = Omit<Effect, "id">;

export default function ArgumentFormA({
  initialEffects,
  recommended,
}: {
  initialEffects: InitialEffect[];
  recommended: boolean;
}) {
  const [effects, setEffects] = useState<Effect[]>(() =>
    initialEffects.map((effect, index) =>
      recommended
        ? { ...effect, id: `effect-${index}` }
        : {
            id: `effect-${index}`,
            category: "",
            unit: "",
            priorArt: "",
            invention: "",
            improvement: "",
            placeholders: {
              category: effect.category,
              unit: effect.unit,
              priorArt: effect.priorArt,
              invention: effect.invention,
              improvement: effect.improvement,
            },
          }
    )
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleAdd = () => {
    setEffects((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        category: "",
        unit: "",
        priorArt: "",
        invention: "",
        improvement: "",
      },
    ]);
  };

  const handleChange = (id: string, field: EffectField, value: string) => {
    setEffects((prev) =>
      prev.map((effect) => (effect.id === id ? { ...effect, [field]: value } : effect))
    );
  };

  return (
    <div className="w-full p-6 flex flex-col gap-5 bg-bg-surface border border-outline-sub rounded-lg">
      <ArgumentFormHeader
        title="수치한정"
        subtitle="발명의 효과"
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing((prev) => !prev)}
      />

      <EffectTable
        effects={effects}
        isEditing={isEditing}
        onAdd={handleAdd}
        onChange={handleChange}
      />
    </div>
  );
}
