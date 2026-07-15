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
    <div className="rounded-md border border-outline-sub bg-bg-surface flex flex-col gap-2 p-4">
      <p className="text-label-15 text-body-disabled">{label}</p>

      <div className="flex flex-row items-center gap-1">
        <p className="text-label-15 text-title-secondary">{value}</p>
        {subValue && <p className="text-label-13 text-body-disabled">{subValue}</p>}
      </div>
    </div>
  );
}
