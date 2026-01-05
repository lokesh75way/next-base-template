const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
}

const API_ENDPOINTS = {
  //Auth
  LOGIN: "/users/login",
  REGISTER: "/users/register",
  FORGOT_PASSWORD: "/users/forgot-password",
  VERIFY_TOKEN: "/users/verify-token",
  RESET_PASSWORD: "/users/update-password",
  REFRESH_TOKEN: "/users/refresh",
  ALL_USERS: "/users/all",
} as const;

export type ApiEndpointKey = keyof typeof API_ENDPOINTS;

export const getApiUrl = (endpoint: ApiEndpointKey): string => {
  return `${BASE_URL}${API_ENDPOINTS[endpoint]}`;
};
