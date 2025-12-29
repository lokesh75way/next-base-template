import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    provider?: string;
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string | null;
    email?: string | null;
    accessToken?: string;
    provider?: string;
  }
}

