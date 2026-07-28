interface HighlightedTextProps {
  text: string;
  highlight?: string;
  className?: string;
}

export function HighlightedText({
  text,
  highlight,
  className = "text-primary-default",
}: HighlightedTextProps) {
  if (!highlight) return <>{text}</>;

  const index = text.toLowerCase().indexOf(highlight.toLowerCase());
  if (index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <span className={className}>{text.slice(index, index + highlight.length)}</span>
      {text.slice(index + highlight.length)}
    </>
  );
}
