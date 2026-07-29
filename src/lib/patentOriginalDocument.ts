import { isValidApplicationNumber, normalizeApplicationNumber } from "@/lib/kiprisThumbnail";

export function buildOriginalDocumentUrl(
  applicationNumber: string | null | undefined
): string | null {
  const normalized = normalizeApplicationNumber(applicationNumber ?? "");
  return isValidApplicationNumber(normalized) ? `https://doi.org/10.8080/${normalized}` : null;
}
