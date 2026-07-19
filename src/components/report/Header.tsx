type ReportHeaderProps = {
  title: string;
  applicant: string;
  inventor: string;
  attorney: string;
  createdAt: string;
};

export default function ReportHeader({
  title,
  applicant,
  inventor,
  attorney,
  createdAt,
}: ReportHeaderProps) {
  return (
    <header className="flex flex-col gap-6 pb-9 border-b border-b-stroke-divider">
      <div className="flex flex-col gap-2">
        <p className="text-label-13 text-caption-label">IPX Report</p>
        <h1 className="text-headline-24 text-title-primary">{title}</h1>
      </div>

      <div className="flex flex-col gap-2">
        <p className="flex gap-4">
          <span className="text-label-13 text-caption-label">출원인</span>{" "}
          <span className="text-label-13 text-body-primary">{applicant}</span>
        </p>
        <p className="flex gap-4">
          <span className="text-label-13 text-caption-label">발명자</span>{" "}
          <span className="text-label-13 text-body-primary">{inventor}</span>
        </p>
        <p className="flex gap-4">
          <span className="text-label-13 text-caption-label">변리사</span>{" "}
          <span className="text-label-13 text-body-primary">{attorney}</span>
        </p>
        <p className="flex gap-4">
          <span className="text-label-13 text-caption-label">작성일</span>{" "}
          <span className="text-label-13 text-body-primary">{createdAt}</span>
        </p>
      </div>
    </header>
  );
}
