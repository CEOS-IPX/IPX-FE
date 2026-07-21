import InventiveHeader from "@/components/report/InventiveStepReportComponents/Header";
import DetailSection from "./DetailSection";

type ArgumentDProps = {
  changedComponent: string;
  nonObviousnessLogic: string;
};

export default function ArgumentD({ changedComponent, nonObviousnessLogic }: ArgumentDProps) {
  return (
    <div className="flex flex-col gap-4">
      <InventiveHeader title="단순설계변경" subtitle="비-자명성 논리" />

      <DetailSection title="변경된 구성요소" detail={changedComponent} />
      <DetailSection title="단순 설계 변경이 아님을 입증하는 논리" detail={nonObviousnessLogic} />
    </div>
  );
}
