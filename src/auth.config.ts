import NextAuth, { NextAuthOptions } from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import { getApiUrl } from "./service/api_endpoints";
import { jwtDecode } from "jwt-decode";
function getTokenExpiry(token: string) {
  const decoded: { exp: number } = jwtDecode(token);
  return decoded.exp * 1000;
}

//this call is serverside so needed here
async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/refresh`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.refreshToken}`,
        },
      }
    );
    const refreshed = await response.json();

    if (!response.ok) throw refreshed;

    return {
      ...token,
      accessToken: refreshed.data.accessToken,
      refreshToken: refreshed.data.refreshToken ?? token.refreshToken,
      accessTokenExpires: getTokenExpiry(refreshed.data.accessToken),
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID!,
      clientSecret: process.env.APPLE_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID!,
      clientSecret: process.env.LINKEDIN_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const LOGIN_ENDPOINT = getApiUrl("LOGIN");
        const res = await fetch(LOGIN_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        if (!res.ok) return null;

        const data = await res.json();

        const { user, accessToken, refreshToken } = data.data;

        return {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          accessToken,
          refreshToken,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const accessToken = (user as any).accessToken;

        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = (user as any).role;
        token.accessToken = accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.accessTokenExpires = getTokenExpiry(accessToken);

        return token;
      }

      if (Date.now() < token.accessTokenExpires!) {
        return token;
      }

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        role: token.role as string,
      };
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/error",
    newUser: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

export const { auth } = NextAuth(authOptions);
