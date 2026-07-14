import { AICreationButton } from "@/components/ui/AI_Creation_Button";
import { Button } from "@/components/ui/Button";
import Edit from "@/components/icons/icon-edit.svg";

type ArgumentHeaderProps = {
  title: string;
  subtitle: string;
  description?: string;
  isEditing?: boolean;
  onToggleEdit?: () => void;
};

export default function ArgumentFormHeader({
  title,
  subtitle,
  description,
  isEditing,
  onToggleEdit,
}: ArgumentHeaderProps) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-0.75">
        <h2 className="text-body-emphasis-15 text-primary-sub">{title}</h2>
        <h3 className="text-title-emphasis-22 text-title-secondary">{subtitle}</h3>
        <p className="text-label-13 text-caption-label">{description}</p>
      </div>

      <Button className="h-10 w-fit py-2.5 pl-3 pr-4" onClick={onToggleEdit}>
        <Edit className="w-5 h-5 text-icon-neutral-inverse [&_path]:fill-current" />
        {isEditing ? "완료" : "직접 수정"}
      </Button>
    </div>
  );
}
