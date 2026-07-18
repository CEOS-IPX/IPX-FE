export function ExplainSection({ title, content }: { title: string; content: string }) {
  return (
    <div className="flex w-full flex-col items-start gap-3 self-stretch">
      <p className="self-stretch text-title-18 text-title-primary">{title}</p>
      <p className="self-stretch text-body-15 text-body-primary">{content}</p>
    </div>
  );
}
