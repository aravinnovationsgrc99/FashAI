import { NextRequest, NextResponse } from "next/server";
import { invalidateSession, COOKIE_NAME } from "@/lib/admin/auth-utils";
import { addActivityLog } from "@/lib/admin/storage";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (token) {
      await invalidateSession(token);
    }
    await addActivityLog("AUTH", "Admin logged out");

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    response.cookies.delete(COOKIE_NAME);
    return response;
  } catch {
    return NextResponse.json({ success: true });
  }
}
