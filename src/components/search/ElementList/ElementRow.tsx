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
  return (
    <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-4 px-4 py-3">
      <ElementTitle index={index} value={name} onChange={onChangeName} />

      <input
        type="text"
        value={description}
        onChange={(e) => onChangeDescription(e.target.value)}
        placeholder="구성요소 설명"
        className="w-full bg-transparent text-label-17 text-body-secondary placeholder:text-caption-labe placeholder:text-label-17 focus:outline-none"
      />

      <button
        type="button"
        onClick={onDelete}
        className="text-icon-neutral-subtle transition-colors p-2.5 hover:text-error-default"
      >
        <TrashIcon className="h-6 w-6 [&_path]:fill-current" />
      </button>
    </div>
  );
}
