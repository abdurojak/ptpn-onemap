import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie");
  const isLoggedIn = cookieHeader?.includes("loggedIn=true");
  return NextResponse.json({ loggedIn: !!isLoggedIn });
}
