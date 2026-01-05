import "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    accessToken?: string;
    refreshToken?: string;
    provider?: string;
  }

  interface User {
    id: string;
    name?: string;
    email?: string;
    role?: string;
    password?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    provider?: string;
    error?: string;
    user?: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
    [key: string]: unknown;
  }
}
