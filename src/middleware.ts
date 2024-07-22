import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { toast } from "react-toastify";

const unProtectedRoutes = ["/app/friendRequest"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;
  const u: any = request.cookies.get("user")?.value;
  let user;
  if (u !== undefined && u !== null) {
    try {
      user = JSON.parse(u);
    } catch (error) {
      console.error("Error parsing user JSON:", error);
    }
  }

  if (user && user?.active == false /*  || user.ref_code == null */) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (!token) {
    toast.error("Login First");
    if (unProtectedRoutes.includes(pathname)) return;
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/app/:path*", "/profile/:path*"],
};
