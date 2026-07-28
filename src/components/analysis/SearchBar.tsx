import Search from "@/components/icons/icon-search.svg";
import CancelIcon from "@/components/icons/icon-cancel.svg";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-90 h-10 px-3 py-2.5 flex flex-row items-center gap-2 bg-bg-neutral-hover rounded-md">
      <Search className="h-5 w-5 shrink-0 text-icon-neutral-default" />
      <input
        type="text"
        aria-label="프로젝트 검색"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="프로젝트 내 검색"
        className="w-full bg-transparent text-body-17 text-body-primary focus:outline-none placeholder:text-caption-label"
      />
      {value.length > 0 && (
        <button
          type="button"
          aria-label="검색어 지우기"
          onClick={() => onChange("")}
          className="flex shrink-0 cursor-pointer items-center justify-center"
        >
          <CancelIcon className="h-4 w-4 shrink-0 text-icon-neutral-default [&_path]:fill-current" />
        </button>
      )}
    </div>
  );
}
