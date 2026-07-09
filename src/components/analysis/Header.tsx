import SearchBar from "./SearchBar";

interface HeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export default function Header({ query, onQueryChange }: HeaderProps) {
  return (
    <div className="flex flex-row justify-between">
      <p className="text-headline-emphasis-24 text-title-primary">분석 가능한 탐색 기록</p>
      <SearchBar value={query} onChange={onQueryChange} />
    </div>
  );
}
