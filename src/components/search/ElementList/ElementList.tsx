"use client";

import PlusIcon from "@/components/icons/icon-plus.svg";
import { LoadingIndicator } from "./LoadingIndicator";
import { ElementRow } from "./ElementRow";

export interface Element {
  id: string;
  name: string;
  description: string;
}

interface ElementListProps {
  elements: Element[];
  isLoading?: boolean;
  onAdd: () => void;
  onDelete: (id: string) => void;
  onChange: (id: string, field: "name" | "description", value: string) => void;
}

export function ElementList({
  elements,
  isLoading = false,
  onAdd,
  onDelete,
  onChange,
}: ElementListProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-4 bg-bg-neutral-hover px-4 py-2.5">
        <span className="text-label-15 text-body-disabled">발명 구성요소</span>
        <span className="text-label-15 text-body-disabled">설명</span>
        <div className="w-11" />
      </div>

      {isLoading ? (
        <LoadingIndicator label="AI가 발명 정보를 분석해 구성요소를 추출하고 있습니다..." />
      ) : (
        <>
          {elements.map((el, index) => (
            <ElementRow
              key={el.id}
              index={index}
              name={el.name}
              description={el.description}
              onDelete={() => onDelete(el.id)}
              onChangeName={(value) => onChange(el.id, "name", value)}
              onChangeDescription={(value) => onChange(el.id, "description", value)}
            />
          ))}

          <button
            type="button"
            onClick={onAdd}
            className="flex w-full items-center gap-1 px-4 py-3 text-label-17 text-primary-default transition-opacity cursor-pointer bg-bg-surface hover:bg-bg-neutral-hover active:bg-bg-neutral-subtle"
          >
            <PlusIcon className=" m-2 h-5 w-5 text-icon-primary-emphasize [&_path]:fill-current" />
            구성요소 추가
          </button>
        </>
      )}
    </div>
  );
}
