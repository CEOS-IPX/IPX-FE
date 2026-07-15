"use client";

import { useEffect } from "react";
import { reissue } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);

  useEffect(() => {
    // 앱 시작(새로고침 포함)마다 RT 쿠키로 AT 재발급 시도
    reissue()
      .then((data) => setAccessToken(data.accessToken))
      .catch(() => {});
  }, [setAccessToken]);

  return <>{children}</>;
}
