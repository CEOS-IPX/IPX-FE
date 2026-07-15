export function ExplainSection({ title, content }: { title: string; content: string }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-18 text-title-primary">{title}</p>
      <p className="text-body-15 text-body-primary">{content}</p>
    </div>
  );
}
