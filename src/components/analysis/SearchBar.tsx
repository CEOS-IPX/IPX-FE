import Search from "@/components/icons/icon-search.svg";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-90 h-10 px-3 py-2.5 flex flex-row gap-2 bg-bg-neutral-hover rounded-md">
      <Search className="shrink-0 text-icon-neutral-default" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="프로젝트 내 검색"
        className="w-full bg-transparent text-body-17 text-body-primary focus:outline-none placeholder:text-caption-label"
      />
    </div>
  );
}
