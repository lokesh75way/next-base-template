import "server-only";
import { auth } from "@/auth.config";

export const fetchServer = async (url: string, options: RequestInit = {}) => {
  const session = await auth();

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(session?.accessToken && {
        Authorization: `Bearer ${session.accessToken}`,
      }),
    },
  });
};
