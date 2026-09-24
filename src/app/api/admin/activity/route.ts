import { NextRequest, NextResponse } from "next/server";
import { isRequestAuthenticated } from "@/lib/admin/auth-utils";
import { getActivityLogs } from "@/lib/admin/storage";

export async function GET(request: NextRequest) {
  if (!(await isRequestAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const logs = await getActivityLogs();
  return NextResponse.json({ success: true, logs });
}
