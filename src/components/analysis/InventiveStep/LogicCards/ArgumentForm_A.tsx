"use client";

import { useState } from "react";
import ArgumentFormHeader from "./Header";
import { EffectTable, type Effect } from "./EffectTable/EffectTable";

// 추후 api 연동 시 교체
const MOCK_EFFECTS: Effect[] = [
  {
    id: crypto.randomUUID(),
    category: "VOC 배출량",
    unit: "g/L",
    priorArt: "320",
    invention: "8",
    improvement: "97.5%",
  },
];

export default function ArgumentFormA() {
  const [effects, setEffects] = useState<Effect[]>(MOCK_EFFECTS);
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

  const handleChange = (id: string, field: keyof Omit<Effect, "id">, value: string) => {
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
