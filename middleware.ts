import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Daftar halaman yang tidak perlu login
const publicPaths = ["/login", "/register", "/api/login", "/api/register"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Kalau termasuk halaman publik → lanjut
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Cek apakah user sudah login (pakai cookie "loggedIn")
  const isLoggedIn = req.cookies.get("loggedIn")?.value === "true";

  // Kalau belum login → arahkan ke /login
  if (!isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Kalau sudah login → lanjut
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
