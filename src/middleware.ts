//added logic of protected and public routes
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import {
  PUBLIC_ROUTES,
  LOGIN,
  ROLE_ROUTES,
} from "@/constants/routes";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    if (
      PUBLIC_ROUTES.some(
        (route) =>
          pathname === route ||
          pathname.startsWith(route + "/")
      )
    ) {
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL(LOGIN, req.url));
    }
    const role = token.role as string | undefined;

    if (!role) {
      return NextResponse.redirect(new URL(LOGIN, req.url));
    }

    const allowedRoutes = ROLE_ROUTES[role] || [];

    const isAllowed = allowedRoutes.some(
      (route) =>
        pathname === route ||
        pathname.startsWith(route + "/")
    );

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/403", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        if (
          PUBLIC_ROUTES.some(
            (route) =>
              pathname === route ||
              pathname.startsWith(route + "/")
          )
        ) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
