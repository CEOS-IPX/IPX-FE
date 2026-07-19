import { Chip } from "@/components/myhistory/ProjectCardChip";
import ComparisionPatentBox, {
  type ComparisonReference,
} from "@/components/report/InventiveStepReportComponents/TechComparision";
import ArgumentA from "@/components/report/InventiveStepReportComponents/ArgumentA";
import ArgumentB from "@/components/report/InventiveStepReportComponents/ArgumentB";
import ArgumentC from "@/components/report/InventiveStepReportComponents/ArgumentC";
import ArgumentD from "@/components/report/InventiveStepReportComponents/ArgumentD";
import type { Effect } from "@/components/analysis/InventiveStep/LogicCards/EffectTable/EffectTable";

type InventiveStepProps = {
  satisfied: boolean;
  primaryReference: ComparisonReference;
  secondaryReference: ComparisonReference;
  numericalLimits: Effect[];
  backgroundLimit: string;
  motivationAbsence: string;
  rejectionReason: string;
  rebuttalLogic: string;
  changedComponent: string;
  nonObviousnessLogic: string;
};

export default function InventiveStep({
  satisfied,
  primaryReference,
  secondaryReference,
  numericalLimits,
  backgroundLimit,
  motivationAbsence,
  rejectionReason,
  rebuttalLogic,
  changedComponent,
  nonObviousnessLogic,
}: InventiveStepProps) {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex items-center gap-2">
        <h2 className="flex text-title-emphasis-18 text-title-secondary gap-2">
          <span className="text-title-emphasis-18 text-primary-default">03</span>
          <span>진보성 분석</span>
        </h2>

        <Chip variant="primary">{satisfied ? "진보성 충족" : "진보성 미충족"}</Chip>
      </div>

      <ComparisionPatentBox
        primaryReference={primaryReference}
        secondaryReference={secondaryReference}
      />

      <ArgumentA effects={numericalLimits} />

      <ArgumentB backgroundLimit={backgroundLimit} motivationAbsence={motivationAbsence} />

      <ArgumentC rejectionReason={rejectionReason} rebuttalLogic={rebuttalLogic} />

      <ArgumentD changedComponent={changedComponent} nonObviousnessLogic={nonObviousnessLogic} />
    </section>
  );
}
