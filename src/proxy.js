import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export function proxy(req) {
  const url = req.nextUrl.pathname;
  const token = req.cookies.get("auth_token")?.value;

  // ---------------------------------
  // 1️⃣ Public routes
  // ---------------------------------
  if (url === "/login" || url.startsWith("/api/login")) {
    return NextResponse.next();
  }

  // ---------------------------------
  // 2️⃣ Not logged in → Login
  // ---------------------------------
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ---------------------------------
  // 3️⃣ Verify token
  // ---------------------------------
  const user = verifyToken(token);
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ---------------------------------
  // 4️⃣ ADMIN ROUTE PROTECTION
  // ---------------------------------
  if (url.startsWith("/admin") && user.role !== "Admin") {
    return NextResponse.redirect(new URL("/myhome", req.url));
  }

  // ---------------------------------
  // 5️⃣ EXISTING ROLE LOGIC (UNCHANGED)
  // ---------------------------------
  if (user.role === "student" && url.startsWith("/myhome")) {
    return NextResponse.redirect(new URL("/mystudent", req.url));
  }

  if (user.role === "employee" && url.startsWith("/mystudent")) {
    return NextResponse.redirect(new URL("/myhome", req.url));
  }

  return NextResponse.next();
}

// ---------------------------------
// 6️⃣ MATCHED ROUTES
// ---------------------------------
export const config = {
  matcher: [
    "/admin/:path*",
    "/myhome/:path*",
    "/mystudent/:path*",
  ],
};
