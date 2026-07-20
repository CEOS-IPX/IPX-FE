type DetailSectionProps = {
  title: string;
  detail: string;
};

export default function DetailSection({ title, detail }: DetailSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-label-13 text-caption-label">{title}</span>
      <p className="text-label-13 text-body-primary">{detail}</p>
    </div>
  );
}
