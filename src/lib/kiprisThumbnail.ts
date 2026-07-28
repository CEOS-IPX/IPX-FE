// KIPRIS 내부 썸네일 프록시 엔드포인트 - Referer/인증 불필요(2026-06 검증)
// 백엔드/DB 없이 프론트에서 <img> 직접 로드하는 방식 (CORS 우회 확인됨)
const KIPRIS_BASE = "https://www.kipris.or.kr/kpat/remoteFile.do";

// KIPRIS no-image placeholder의 고정 크기(100x100 GIF) - 200 OK로 응답하므로 크기로만 구분 가능
export const NO_IMAGE_SIZE = { width: 100, height: 100 } as const;

export function normalizeApplicationNumber(input: string): string {
  return String(input ?? "").replace(/[^0-9]/g, "");
}

export function isValidApplicationNumber(normalized: string): boolean {
  return /^\d{13}$/.test(normalized);
}

export function buildThumbnailUrl(applicationNumber: string): string {
  const an = normalizeApplicationNumber(applicationNumber);
  return `${KIPRIS_BASE}?method=bigFrontDraw&applno=${encodeURIComponent(an)}`;
}

export type ThumbnailStatus = "ok" | "notfound" | "invalid" | "error";

export type ThumbnailResult = {
  status: ThumbnailStatus;
  applicationNumber: string;
  url: string;
  width?: number;
  height?: number;
  reason?: string;
};

export function probeThumbnail(
  applicationNumber: string,
  opts: { timeoutMs?: number; signal?: AbortSignal } = {}
): Promise<ThumbnailResult> {
  const { timeoutMs = 10_000, signal } = opts;
  const an = normalizeApplicationNumber(applicationNumber);

  if (!isValidApplicationNumber(an)) {
    return Promise.resolve({
      status: "invalid",
      applicationNumber: an,
      url: "",
      reason: "출원번호는 13자리 숫자여야 합니다.",
    });
  }

  const url = buildThumbnailUrl(an);

  return new Promise((resolve) => {
    const img = new Image();
    let settled = false;

    const finish = (result: ThumbnailResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (signal) signal.removeEventListener("abort", onAbort);
      img.onload = null;
      img.onerror = null;
      resolve(result);
    };

    const timer = setTimeout(
      () => finish({ status: "error", applicationNumber: an, url, reason: "timeout" }),
      timeoutMs
    );

    const onAbort = () =>
      finish({ status: "error", applicationNumber: an, url, reason: "aborted" });
    if (signal) {
      if (signal.aborted) {
        finish({ status: "error", applicationNumber: an, url, reason: "aborted" });
        return;
      }
      signal.addEventListener("abort", onAbort, { once: true });
    }

    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      if (w === NO_IMAGE_SIZE.width && h === NO_IMAGE_SIZE.height) {
        finish({ status: "notfound", applicationNumber: an, url });
      } else {
        finish({ status: "ok", applicationNumber: an, url, width: w, height: h });
      }
    };
    img.onerror = () =>
      finish({ status: "error", applicationNumber: an, url, reason: "load_failed" });

    img.src = url;
  });
}
