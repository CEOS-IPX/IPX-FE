interface ElementTitleProps {
  index: number;
  value: string;
  onChange: (value: string) => void;
}

export function ElementTitle({ index, value, onChange }: ElementTitleProps) {
  return (
    <div className="flex min-w-0 w-full items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg-elementlist text-label-emphasis-15 text-primary-sub">
        {String.fromCharCode(65 + index)}
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="구성요소 명칭"
        className="w-full bg-transparent text-title-secondary text-label-emphasis-17 placeholder:text-caption-label placeholder:text-label-emphasis-17 focus:outline-none"
      />
    </div>
  );
}
