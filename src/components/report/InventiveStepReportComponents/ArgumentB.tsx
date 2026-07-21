import InventiveHeader from "@/components/report/InventiveStepReportComponents/Header";
import DetailSection from "./DetailSection";

type ArgumentBProps = {
  backgroundLimit: string;
  motivationAbsence: string;
};

export default function ArgumentB({ backgroundLimit, motivationAbsence }: ArgumentBProps) {
  return (
    <div className="flex flex-col gap-4">
      <InventiveHeader title="복수인용발명결합" subtitle="Teaching Away 논리" />

      <DetailSection title="배경기술의 한계" detail={backgroundLimit} />
      <DetailSection title="결합 동기의 부재 (Teaching Away)" detail={motivationAbsence} />
    </div>
  );
}
