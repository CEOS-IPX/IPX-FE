type TotalConclusionProps = {
  conclusion: string;
};

export default function TotalConclusion({ conclusion }: TotalConclusionProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex text-title-emphasis-18 text-title-secondary gap-2">
        <span className="text-title-emphasis-18 text-primary-default">04</span>
        <span>종합 결론</span>
      </h2>

      <p className="text-label-13 text-body-secondary">{conclusion}</p>
    </section>
  );
}
