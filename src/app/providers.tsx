"use client";

import { useEffect } from "react";
import { getMe, reissue } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    // 앱 시작(새로고침 포함)마다 RT 쿠키로 AT 재발급 후, 그 토큰으로 사용자 정보 복구
    reissue()
      .then((data) => {
        setAccessToken(data.accessToken);
        return getMe();
      })
      .then((user) => setUser(user))
      .catch(() => {});
  }, [setAccessToken, setUser]);

  return <>{children}</>;
}
