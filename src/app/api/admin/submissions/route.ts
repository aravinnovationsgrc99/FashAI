import { NextRequest, NextResponse } from "next/server";
import { isRequestAuthenticated } from "@/lib/admin/auth-utils";
import { getSubmissions, updateSubmissionStatus, deleteSubmission, addActivityLog } from "@/lib/admin/storage";

export async function GET(request: NextRequest) {
  if (!(await isRequestAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const submissions = await getSubmissions();
  return NextResponse.json({
    success: true,
    submissions,
  });
}

export async function PATCH(request: NextRequest) {
  if (!(await isRequestAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Submission ID and status are required" }, { status: 400 });
    }

    const updated = await updateSubmissionStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    await addActivityLog("SETTINGS", `Updated submission ${id} status to ${status}`);
    return NextResponse.json({ success: true, message: `Submission status updated to ${status}` });
  } catch (err) {
    console.error("Submission update error:", err);
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isRequestAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Submission ID is required" }, { status: 400 });
    }

    const deleted = await deleteSubmission(id);
    if (!deleted) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    await addActivityLog("SETTINGS", `Deleted submission ${id}`);
    return NextResponse.json({ success: true, message: "Submission deleted successfully" });
  } catch (err) {
    console.error("Submission delete error:", err);
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 });
  }
}
