import InventiveHeader from "@/components/report/InventiveStepReportComponents/Header";
import DetailSection from "./DetailSection";

type ArgumentCProps = {
  rejectionReason: string;
  rebuttalLogic: string;
};

export default function ArgumentC({ rejectionReason, rebuttalLogic }: ArgumentCProps) {
  return (
    <div className="flex flex-col gap-4">
      <InventiveHeader title="주지관용기술" subtitle="주지관용기술 반박 논리" />

      <DetailSection
        title="거절 또는 예상 거절 사유 (주지관용기술 주장 대상)"
        detail={rejectionReason}
      />
      <DetailSection title="주지관용기술이 아님을 입증하는 반박 논리" detail={rebuttalLogic} />
    </div>
  );
}
