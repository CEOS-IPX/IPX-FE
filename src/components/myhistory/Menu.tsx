import EditIcon from "@/components/icons/icon-edit.svg";
import TrashIcon from "@/components/icons/icon-trashcan.svg";

interface MenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function Menu({ onEdit, onDelete }: MenuProps) {
  return (
    <div className="absolute right-0 top-full z-10 mt-1 px-3 flex min-w-32 flex-col rounded-md bg-bg-surface py-1 shadow-[0px_1px_6px_0px_rgba(144,155,165,0.36)]">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onEdit?.();
        }}
        className="flex items-center gap-2 py-2.5 text-label-15 text-body-secondary hover:text-icon-primary-default cursor-pointer"
      >
        <EditIcon className="h-5 w-5 [&_path]:fill-current" aria-hidden />
        수정하기
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onDelete?.();
        }}
        className="flex items-center gap-2 py-2.5 text-label-15 text-error-default cursor-pointer"
      >
        <TrashIcon className="h-5 w-5 text-error-default [&_path]:fill-current" aria-hidden />
        삭제하기
      </button>
    </div>
  );
}
