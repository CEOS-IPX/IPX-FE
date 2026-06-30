import ArrowIcon from "@/components/icons/icon-back.svg";
import { Radio } from "@/components/ui/Radio";

type AgreementItemProps = {
  label: string;
  checked: boolean;
  onToggle: () => void;
  onDetail?: () => void;
  required?: boolean;
};

export function AgreementItem({
  label,
  checked,
  onToggle,
  onDetail,
  required,
}: AgreementItemProps) {
  return (
    <div className="flex items-center gap-1">
      <label className="flex cursor-pointer items-center gap-2">
        <Radio checked={checked} readOnly onClick={onToggle} />
        <span className="flex items-center gap-1">
          {required && <span className="text-label-15 text-primary-default">[필수]</span>}
          <span className="text-label-15 text-title-secondary">{label}</span>
        </span>
      </label>
      {onDetail && (
        <button
          type="button"
          aria-label={`${label} 상세 보기`}
          onClick={onDetail}
          className="flex cursor-pointer items-center"
        >
          <ArrowIcon className="size-5 text-icon-neutral-default" />
        </button>
      )}
    </div>
  );
}
