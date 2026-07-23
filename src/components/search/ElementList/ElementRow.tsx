"use client";

import { useEffect, useRef } from "react";
import TrashIcon from "@/components/icons/icon-trashcan.svg";
import { ElementTitle } from "./ElementTitle";

interface ElementRowProps {
  index: number;
  name: string;
  description: string;
  onDelete: () => void;
  onChangeName: (value: string) => void;
  onChangeDescription: (value: string) => void;
}

export function ElementRow({
  index,
  name,
  description,
  onDelete,
  onChangeName,
  onChangeDescription,
}: ElementRowProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [description]);

  return (
    <div className="grid grid-cols-[1fr_2fr_auto] items-start gap-4 px-4 py-3">
      <ElementTitle index={index} value={name} onChange={onChangeName} />

      <textarea
        ref={textareaRef}
        value={description}
        onChange={(e) => onChangeDescription(e.target.value)}
        placeholder="구성요소 설명"
        rows={1}
        className="w-full resize-none overflow-hidden bg-transparent text-label-17 text-body-secondary placeholder:text-caption-label placeholder:text-label-17 focus:outline-none"
      />

      <button
        type="button"
        onClick={onDelete}
        className="p-2.5 text-icon-neutral-subtle transition-colors hover:text-error-default"
      >
        <TrashIcon className="h-6 w-6 [&_path]:fill-current" />
      </button>
    </div>
  );
}
