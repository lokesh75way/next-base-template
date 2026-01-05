import { fetchClient } from "@/app/lib/fetchClient";
import { getApiUrl } from "./api_endpoints";

export async function register(payload: RegisterPayload) {
  const REGISTER_URL = getApiUrl("REGISTER");

  const res = await fetch(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}
export async function forgotPassword(payload: ForgotPasswordPayload) {
  const FORGOT_PASSWORD_URL = getApiUrl("FORGOT_PASSWORD");

  const res = await fetch(FORGOT_PASSWORD_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Forgot Password failed");
  }

  return data;
}
export async function verifyToken(payload: VerifyTokenPayload) {
  const URL = getApiUrl("VERIFY_TOKEN");
  const VERIFY_TOKEN_URL = `${URL}/${payload.token}`;
  const res = await fetch(VERIFY_TOKEN_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Verify Token Failed");
  }

  return data;
}

export async function resetPassword(payload: ResetPasswordPayload) {
  const URL = getApiUrl("RESET_PASSWORD");

  const res = await fetch(URL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Reset Password Failed");
  }

  return data;
}

export async function refreshAccessToken(refreshToken: string) {
  const URL = getApiUrl("REFRESH_TOKEN");

  const res = await fetch(URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  const result = await res.json();
  

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Refresh token failed");
  }

  return result.data as {
    accessToken: string;
    refreshToken: string;
  };
}
export async function getAllUsers() {
  const URL = getApiUrl("ALL_USERS");

  const res = await fetchClient(URL, {
    method: "GET",
  });

  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch users");
  }

  return result.data;
}
