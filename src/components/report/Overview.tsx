type OverviewComponent = {
  label: string;
  title: string;
  description: string;
};

type ReportOverviewProps = {
  overview: string;
  components: OverviewComponent[];
};

export default function ReportOverview({ overview, components }: ReportOverviewProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className=" flex text-title-emphasis-18 text-title-secondary gap-2">
        <span className="text-title-emphasis-18 text-primary-default">01</span>
        <span>발명의 개요</span>
      </h2>

      <p className="text-body-13 text-body-secondary">{overview}</p>

      <div className="flex flex-col mt-2">
        {components.map((component) => (
          <div
            key={component.label}
            className="flex items-center gap-3 border-b border-stroke-divider py-4 last:border-b-0"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-bg-elementlist text-label-emphasis-13 text-primary-sub">
              {component.label}
            </span>

            <span className="w-52 shrink-0 text-label-emphasis-15 text-title-secondary">
              {component.title}
            </span>

            <span className="text-body-15 text-body-disabled">{component.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
