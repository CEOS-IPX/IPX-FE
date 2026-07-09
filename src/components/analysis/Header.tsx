import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <div className="flex flex-row justify-between">
      <p className="text-headline-emphasis-24 text-title-primary">분석 가능한 탐색 기록</p>
      <SearchBar />
    </div>
  );
}
