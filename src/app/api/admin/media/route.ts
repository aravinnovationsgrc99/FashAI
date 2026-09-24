import { NextRequest, NextResponse } from "next/server";
import { isRequestAuthenticated } from "@/lib/admin/auth-utils";
import { getMasterConfig, saveDraftConfig, addActivityLog } from "@/lib/admin/storage";
import { MediaItem } from "@/lib/admin/config-schema";
import fs from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

async function ensureUploadDir() {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  } catch (err) {
    console.error("Error creating upload directory:", err);
  }
}

export async function GET(request: NextRequest) {
  if (!(await isRequestAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const config = await getMasterConfig(true);
  return NextResponse.json({
    success: true,
    media: config.mediaLibrary || [],
  });
}

export async function POST(request: NextRequest) {
  if (!(await isRequestAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    await ensureUploadDir();
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File;
    const uploadFiles = files.length > 0 ? files : singleFile ? [singleFile] : [];

    if (uploadFiles.length === 0) {
      return NextResponse.json({ error: "No media file provided" }, { status: 400 });
    }

    const config = await getMasterConfig(true);
    const addedMedia: MediaItem[] = [];

    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".mp4", ".webm", ".mov"];

    for (const file of uploadFiles) {
      const ext = path.extname(file.name).toLowerCase();
      if (!allowedExtensions.includes(ext)) {
        return NextResponse.json(
          { error: `File type ${ext} is not supported. Allowed: ${allowedExtensions.join(", ")}` },
          { status: 400 }
        );
      }

      // Max file size: 50MB for video, 15MB for image
      const isVideo = [".mp4", ".webm", ".mov"].includes(ext);
      const maxSize = isVideo ? 50 * 1024 * 1024 : 15 * 1024 * 1024;
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds max permitted size (${isVideo ? "50MB" : "15MB"}).` },
          { status: 400 }
        );
      }

      // Sanitize filename
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9_.-]/g, "_");
      const filename = `${Date.now()}_${sanitizedName}`;
      const filePath = path.join(UPLOAD_DIR, filename);

      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      const mediaUrl = `/uploads/${filename}`;
      const newMediaItem: MediaItem = {
        id: `med_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        filename,
        url: mediaUrl,
        type: isVideo ? "video" : "image",
        size: file.size,
        altText: sanitizedName.replace(ext, "").replace(/_/g, " "),
        caption: "",
        category: (formData.get("category") as string) || "General",
        tags: ["upload"],
        uploadedAt: new Date().toISOString(),
        usedIn: [],
      };

      config.mediaLibrary.unshift(newMediaItem);
      addedMedia.push(newMediaItem);
    }

    config.lastMediaUpdate = new Date().toISOString();
    await saveDraftConfig(config);
    await addActivityLog("MEDIA", `Uploaded ${addedMedia.length} media file(s)`);

    return NextResponse.json({
      success: true,
      message: `Uploaded ${addedMedia.length} file(s) successfully`,
      media: addedMedia,
    });
  } catch (err) {
    console.error("Media upload error:", err);
    return NextResponse.json({ error: "Failed to upload media file" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isRequestAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const mediaId = searchParams.get("id");
    const forceConfirm = searchParams.get("confirm") === "true";

    if (!mediaId) {
      return NextResponse.json({ error: "Media ID is required" }, { status: 400 });
    }

    const config = await getMasterConfig(true);
    const itemIndex = config.mediaLibrary.findIndex((m) => m.id === mediaId);

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Media item not found" }, { status: 404 });
    }

    const mediaItem = config.mediaLibrary[itemIndex];

    // Check usage across site
    const usedIn: string[] = [];
    if (config.heroSettings.heroImage === mediaItem.url) usedIn.push("Hero Image");
    if (config.heroSettings.heroFallbackImage === mediaItem.url) usedIn.push("Hero Fallback Image");
    if (config.heroSettings.posterImage === mediaItem.url) usedIn.push("Hero Poster Image");
    if (config.heroSettings.heroVideo === mediaItem.url) usedIn.push("Hero Video");
    if (config.popupSettings.backgroundImage === mediaItem.url) usedIn.push("Event Popup Background");
    if (config.events.some((e) => e.coverImage === mediaItem.url)) usedIn.push("Event Cover");
    if (config.galleryItems.some((g) => g.image === mediaItem.url)) usedIn.push("Gallery Item");

    if (usedIn.length > 0 && !forceConfirm) {
      return NextResponse.json({
        requiresConfirmation: true,
        message: `THIS MEDIA IS CURRENTLY USED IN: ${usedIn.join(", ")}. Confirm removal?`,
        usedIn,
        mediaId,
      });
    }

    // Delete local file if it's in /uploads/
    if (mediaItem.url.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", mediaItem.url);
      try {
        await fs.unlink(filePath);
      } catch (e) {
        console.warn("File unlink note:", e);
      }
    }

    config.mediaLibrary.splice(itemIndex, 1);
    config.lastMediaUpdate = new Date().toISOString();
    await saveDraftConfig(config);
    await addActivityLog("MEDIA", `Deleted media asset ${mediaItem.filename}`);

    return NextResponse.json({
      success: true,
      message: `Media ${mediaItem.filename} deleted successfully`,
    });
  } catch (err) {
    console.error("Media deletion error:", err);
    return NextResponse.json({ error: "Failed to delete media asset" }, { status: 500 });
  }
}
