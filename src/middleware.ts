export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/project/:path*"], // protect all project routes
};