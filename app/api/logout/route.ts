import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set("loggedIn", "", { maxAge: 0, path: "/" }); // hapus cookie
  return res;
}
