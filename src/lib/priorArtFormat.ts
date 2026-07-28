// legalStatus는 AI 검색 결과에서 그대로 내려오는 한글 값(등록/공개/소멸/거절/취하/포기/무효)이라 별도 매핑 없이 그대로 표시
export function formatPeriod(from?: string | null, to?: string | null): string {
  if (!from || !to) return "-";
  const fromDate = new Date(from);
  const toDate = new Date(to);
  if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) return "-";

  let months =
    (toDate.getFullYear() - fromDate.getFullYear()) * 12 +
    (toDate.getMonth() - fromDate.getMonth());
  if (toDate.getDate() < fromDate.getDate()) months -= 1;
  if (months < 0) return "-";

  const years = Math.floor(months / 12);
  const remainMonths = months % 12;
  if (years === 0) return `${remainMonths}개월`;
  if (remainMonths === 0) return `${years}년`;
  return `${years}년 ${remainMonths}개월`;
}
