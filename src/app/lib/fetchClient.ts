import { getSession } from "next-auth/react";

export const fetchClient = async (
  url: string,
  options: RequestInit = {}
) => {
  const session = await getSession();

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
