// 백엔드 legalStatus enum 전체 목록이 확인되지 않아 확인된 값만 매핑, 나머지는 원본 값 그대로 표시
export const LEGAL_STATUS_LABEL: Record<string, string> = {
  REGISTERED: "등록",
};

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
