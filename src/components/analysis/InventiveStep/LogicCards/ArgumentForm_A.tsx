"use client";

import { useState } from "react";
import type { NumericalLimitEffectItem } from "@/types/inventiveStep.type";
import ArgumentFormHeader from "./Header";
import { EffectTable, type Effect, type EffectField } from "./EffectTable/EffectTable";

type InitialEffect = Omit<Effect, "id">;

export default function ArgumentFormA({
  initialEffects,
  onSave,
}: {
  initialEffects: InitialEffect[];
  onSave: (effectItems: NumericalLimitEffectItem[]) => Promise<void>;
}) {
  const [effects, setEffects] = useState<Effect[]>(() =>
    initialEffects.map((effect, index) => ({ ...effect, id: `effect-${index}` }))
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

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

  const handleToggleEdit = async () => {
    if (!isEditing) {
      setSaveError(null);
      setIsEditing(true);
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      await onSave(
        effects.map((effect) => ({
          metric: effect.category,
          unit: effect.unit,
          prior_art_value: effect.priorArt,
          invention_value: effect.invention,
          improvement: effect.improvement,
        }))
      );
      setIsEditing(false);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "수정 내용을 저장하지 못했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full pt-7 px-9 pb-9 flex flex-col gap-5 bg-bg-surface border border-outline-sub rounded-lg">
      <ArgumentFormHeader
        title="수치한정"
        subtitle="발명의 효과"
        isEditing={isEditing}
        isSaving={isSaving}
        onToggleEdit={handleToggleEdit}
      />

      <EffectTable
        effects={effects}
        isEditing={isEditing}
        onAdd={handleAdd}
        onChange={handleChange}
      />

      {saveError && (
        <p role="alert" className="text-body-13 text-error-default">
          {saveError}
        </p>
      )}
    </div>
  );
}
