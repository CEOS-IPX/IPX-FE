import { normalizeApplicationNumber } from "@/lib/kiprisThumbnail";

export function buildOriginalDocumentUrl(applicationNumber: string): string {
  return `https://doi.org/10.8080/${normalizeApplicationNumber(applicationNumber)}`;
}
