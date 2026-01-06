//all routes should be added here the middelware is configured with these routes
export const LOGIN = "/signin";

export const PUBLIC_ROUTES = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-token",
  "/about-us",
  "/403",
  "/404",
  "/error",
];

//to remove redundency you can add common protected routes of all roles
const COMMON_PROTECTED_ROUTES = ["/"];

//separate routes based on roles
const ADMIN_ROUES = ["/admin", ...COMMON_PROTECTED_ROUTES];
const USER_ROUTES = ["/user", ...COMMON_PROTECTED_ROUTES];

// if more roles accordingly added with this
export const ROLE_ROUTES: Record<string, string[]> = {
  ADMIN: ADMIN_ROUES,
  USER: USER_ROUTES,
};
