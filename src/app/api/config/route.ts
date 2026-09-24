import { NextResponse } from "next/server";
import { getMasterConfig } from "@/lib/admin/storage";

export async function GET() {
  try {
    const config = await getMasterConfig(false); // get published config
    return NextResponse.json({
      success: true,
      config,
    });
  } catch (err) {
    console.error("Failed to fetch site config:", err);
    return NextResponse.json(
      { error: "Failed to fetch site config" },
      { status: 500 }
    );
  }
}
