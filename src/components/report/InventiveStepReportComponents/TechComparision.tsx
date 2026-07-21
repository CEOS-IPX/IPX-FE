import { ReferenceChip } from "@/components/analysis/InventiveStep/Comparision/ReferenceChip";

export type ComparisonReference = {
  patentNumber: string;
  title: string;
  organization: string;
  year: string | number;
};

interface ComparisionPatentBoxProps {
  primaryReference: ComparisonReference;
  secondaryReference: ComparisonReference;
}

export default function ComparisionPatentBox({
  primaryReference,
  secondaryReference,
}: ComparisionPatentBoxProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-label-emphasis-15 text-body-primary">비교 기술</h3>

      <div className="w-full rounded-md border border-outline-sub bg-bg-surface py-5 px-6 flex flex-col gap-5">
        <div className="flex flex-row items-start gap-4">
          <ReferenceChip variant="primary">주인용</ReferenceChip>

          <div className="flex min-w-0 flex-col gap-1">
            <p className="line-clamp-1 text-label-15 text-body-primary">
              {primaryReference.patentNumber} {primaryReference.title}
            </p>

            <p className="text-label-13 text-body-disabled">
              {primaryReference.organization} · {primaryReference.year}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-row items-start gap-4 rounded-sm border border-outline-sub bg-bg-neutral-hover p-3">
          <ReferenceChip variant="secondary">부인용</ReferenceChip>

          <div className="flex min-w-0 flex-col gap-1">
            <p className="line-clamp-1 text-label-15 text-body-primary">
              {secondaryReference.patentNumber} {secondaryReference.title}
            </p>

            <p className="text-label-13 text-body-disabled">
              {secondaryReference.organization} · {secondaryReference.year}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
