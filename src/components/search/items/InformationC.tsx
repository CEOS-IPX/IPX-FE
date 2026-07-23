import Title from "@/components/search/SearchTitle";
import { AICreationButton } from "@/components/ui/AI_Creation_Button";
import { ElementList, type Element } from "@/components/search/ElementList/ElementList";

type InformationCProps = {
  elements: Element[];
  isLoading: boolean;
  aiCreateError: string | null;
  onAICreate: () => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
  onChange: (id: string, field: "name" | "description", value: string) => void;
};

export default function InformationC({
  elements,
  isLoading,
  aiCreateError,
  onAICreate,
  onAdd,
  onDelete,
  onChange,
}: InformationCProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between">
        <Title
          stepnum={3}
          title="구성요소 분석"
          label="청구항을 구성요소 단위로 분해해 판단의 정밀성을 높일 수 있어요"
        />

        <AICreationButton onClick={onAICreate} disabled={isLoading} />
      </div>

      {aiCreateError && <p className="ml-10 text-label-13 text-error-default">{aiCreateError}</p>}

      <div className="overflow-hidden border-y border-outline-default ml-10">
        <ElementList
          elements={elements}
          isLoading={isLoading}
          onAdd={onAdd}
          onDelete={onDelete}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
