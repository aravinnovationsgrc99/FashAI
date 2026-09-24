import { NextRequest, NextResponse } from "next/server";
import { isRequestAuthenticated } from "@/lib/admin/auth-utils";
import { getMasterConfig, saveDraftConfig, publishConfig, getVersionHistory } from "@/lib/admin/storage";

export async function GET(request: NextRequest) {
  if (!(await isRequestAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const draftConfig = await getMasterConfig(true);
  const publishedConfig = await getMasterConfig(false);
  const history = await getVersionHistory();

  return NextResponse.json({
    success: true,
    draftConfig,
    publishedConfig,
    history,
  });
}

export async function POST(request: NextRequest) {
  if (!(await isRequestAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const updatedDraft = await saveDraftConfig(body.config || body);
    return NextResponse.json({
      success: true,
      message: "Draft configuration saved successfully",
      config: updatedDraft,
    });
  } catch (err) {
    console.error("Error saving draft config:", err);
    return NextResponse.json({ error: "Failed to save draft configuration" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isRequestAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const published = await publishConfig(body.config, body.note || "Published from Master Admin Panel");
    return NextResponse.json({
      success: true,
      message: "Website configuration published successfully!",
      config: published,
    });
  } catch (err) {
    console.error("Error publishing config:", err);
    return NextResponse.json({ error: "Failed to publish configuration" }, { status: 500 });
  }
}
