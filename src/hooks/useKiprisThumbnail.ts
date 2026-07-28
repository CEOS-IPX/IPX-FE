"use client";

import { useEffect, useState } from "react";
import { probeThumbnail, type ThumbnailResult } from "@/lib/kiprisThumbnail";

export function useKiprisThumbnail(applicationNumber: string | undefined) {
  const [result, setResult] = useState<ThumbnailResult | null>(null);

  useEffect(() => {
    if (!applicationNumber) return;

    const controller = new AbortController();

    probeThumbnail(applicationNumber, { signal: controller.signal }).then((r) => {
      if (controller.signal.aborted) return;
      setResult(r);
    });

    return () => {
      controller.abort();
    };
  }, [applicationNumber]);

  return applicationNumber && result?.status === "ok" ? result.url : undefined;
}
