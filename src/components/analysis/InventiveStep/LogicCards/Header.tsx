import { AICreationButton } from "@/components/ui/AI_Creation_Button";

type ArgumentHeaderProps = {
  title: string;
  subtitle: string;
};

export default function ArgumentFormHeader({ title, subtitle }: ArgumentHeaderProps) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-0.75">
        <h2 className="text-body-emphasis-15 text-primary-sub">{title}</h2>
        <h3 className="text-title-emphasis-22 text-title-secondary">{subtitle}</h3>
      </div>

      <AICreationButton className="h-10" />
    </div>
  );
}
