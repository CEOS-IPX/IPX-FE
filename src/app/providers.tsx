"use client";

import { useEffect } from "react";
import { getMe, reissue } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    // 앱 시작(새로고침 포함)마다 RT 쿠키로 AT 재발급 후, 그 토큰으로 사용자 정보 복구
    reissue()
      .then((data) => {
        setAccessToken(data.accessToken);
        return getMe().catch((error) => {
          // getMe 실패로 accessToken만 남고 user는 없는 반쪽 인증 상태가 되지 않도록 정리한다.
          // 그 사이 사용자가 직접 로그인해서 accessToken이 이미 바뀌었다면 그건 건드리지 않는다.
          if (useAuthStore.getState().accessToken === data.accessToken) clearAuth();
          throw error;
        });
      })
      .then((user) => setUser(user))
      .catch(() => {});
  }, [setAccessToken, setUser, clearAuth]);

  return <>{children}</>;
}
