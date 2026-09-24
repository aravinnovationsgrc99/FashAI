import { NextRequest, NextResponse } from "next/server";
import { isRequestAuthenticated } from "@/lib/admin/auth-utils";

export async function GET(request: NextRequest) {
  const authenticated = await isRequestAuthenticated(request);
  if (!authenticated) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: { username: "admin", role: "Master Admin" },
  });
}
