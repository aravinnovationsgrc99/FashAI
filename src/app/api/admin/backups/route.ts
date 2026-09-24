import { NextRequest, NextResponse } from "next/server";
import { isRequestAuthenticated } from "@/lib/admin/auth-utils";
import { listBackups, createBackup, restoreBackup } from "@/lib/admin/storage";

export async function GET(request: NextRequest) {
  if (!(await isRequestAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const backups = await listBackups();
  return NextResponse.json({ success: true, backups });
}

export async function POST(request: NextRequest) {
  if (!(await isRequestAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const filename = await createBackup(body.name);
    return NextResponse.json({
      success: true,
      message: `System backup created: ${filename}`,
      filename,
    });
  } catch (err) {
    console.error("Backup creation error:", err);
    return NextResponse.json({ error: "Failed to create backup" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isRequestAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { filename } = body;
    if (!filename) {
      return NextResponse.json({ error: "Backup filename is required" }, { status: 400 });
    }

    const restoredConfig = await restoreBackup(filename);
    return NextResponse.json({
      success: true,
      message: `System successfully restored from backup ${filename}`,
      config: restoredConfig,
    });
  } catch (err) {
    console.error("Backup restore error:", err);
    return NextResponse.json({ error: "Failed to restore backup" }, { status: 500 });
  }
}
