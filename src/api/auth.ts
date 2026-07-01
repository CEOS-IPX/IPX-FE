//로그인 관련 api 모음

type LoginRequest = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

type AuthResponse = {
  success: boolean;
  data: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    user: {
      userId: number;
      email: string;
      name: string;
      company?: string;
      provider: string;
      profileCompleted: boolean;
    };
  };
  message: string;
};

type ReissueResponse = {
  success: boolean;
  data: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
  };
  message: string;
};

export async function login(body: LoginRequest): Promise<AuthResponse> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(errorData.message ?? res.statusText);
  }
  return res.json();
}

export async function reissue(): Promise<ReissueResponse> {
  const res = await fetch("/api/auth/reissue", {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Reissue failed");
  return res.json();
}
