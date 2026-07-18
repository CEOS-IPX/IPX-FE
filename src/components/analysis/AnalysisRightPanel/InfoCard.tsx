export function InfoCard({
  label,
  value,
  subValue,
}: {
  label: string;
  value: string;
  subValue?: string;
}) {
  return (
    <div className="flex min-w-34 flex-1 flex-col items-start gap-2 self-stretch rounded-md border border-outline-sub bg-bg-surface p-4">
      <p className="self-stretch text-label-15 text-body-disabled">{label}</p>

      <div className="flex flex-row items-center gap-1">
        <p className="text-label-15 text-title-secondary">{value}</p>
        {subValue && <p className="text-label-13 text-body-disabled">{subValue}</p>}
      </div>
    </div>
  );
}
