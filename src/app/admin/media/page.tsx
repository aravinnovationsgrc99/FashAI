"use client";

import { useState, useEffect, ChangeEvent, DragEvent } from "react";
import {
  Upload,
  Trash2,
  Search,
  Filter,
  AlertTriangle,
  Film,
  X,
  CheckCircle2,
  Image as ImageIcon,
  ExternalLink,
  Edit3,
} from "lucide-react";
import { MediaItem } from "@/lib/admin/config-schema";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function MediaLibraryPage() {
  const { showToast } = useSiteConfig();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tabFilter, setTabFilter] = useState<"ALL" | "IMAGES" | "VIDEOS" | "USED" | "UNUSED">("ALL");

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [altTextInput, setAltTextInput] = useState("");
  const [deleteModalItem, setDeleteModalItem] = useState<{
    id: string;
    filename: string;
    usedIn: string[];
  } | null>(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/media", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setMediaItems(data.media || []);
      }
    } catch (e) {
      console.warn("Could not fetch media library:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFilesUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        showToast(`✓ Uploaded ${data.media?.length || 1} media asset(s)`, "success");
        await fetchMedia();
      } else {
        showToast(data.error || "Failed to upload file", "error");
      }
    } catch {
      showToast("Error uploading media asset", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesUpload(e.dataTransfer.files);
    }
  };

  const handleDeleteRequest = async (item: MediaItem) => {
    try {
      const res = await fetch(`/api/admin/media?id=${item.id}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok && data.requiresConfirmation) {
        setDeleteModalItem({
          id: item.id,
          filename: item.filename,
          usedIn: data.usedIn || ["Homepage Section"],
        });
      } else if (res.ok) {
        showToast("✓ Media asset deleted", "info");
        setSelectedMedia(null);
        await fetchMedia();
      } else {
        showToast(data.error || "Could not delete media asset", "error");
      }
    } catch {
      showToast("Error processing delete request", "error");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteModalItem) return;
    try {
      const res = await fetch(`/api/admin/media?id=${deleteModalItem.id}&confirm=true`, {
        method: "DELETE",
      });
      if (res.ok) {
        showToast("✓ Media asset permanently deleted", "info");
        setDeleteModalItem(null);
        setSelectedMedia(null);
        await fetchMedia();
      }
    } catch {
      showToast("Error deleting media", "error");
    }
  };

  // Mock checking "USED IN" for selected media
  const getUsedInLocations = (item: MediaItem): string[] => {
    const locations: string[] = [];
    if (item.category === "HOME" || item.filename.includes("hero")) locations.push("Homepage Hero");
    if (item.filename.includes("gallery") || item.category === "BRAND") locations.push("Retrospective Gallery");
    if (item.filename.includes("event") || item.category === "EVENTS") locations.push("LifeStyle 2026 Event");
    if (locations.length === 0) locations.push("Unassigned / Media Library");
    return locations;
  };

  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch =
      item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.altText.toLowerCase().includes(searchQuery.toLowerCase());

    const isVideo = item.type === "video" || item.filename.endsWith(".mp4");
    const usedLocs = getUsedInLocations(item);
    const isUsed = !usedLocs.includes("Unassigned / Media Library");

    if (tabFilter === "IMAGES" && isVideo) return false;
    if (tabFilter === "VIDEOS" && !isVideo) return false;
    if (tabFilter === "USED" && !isUsed) return false;
    if (tabFilter === "UNUSED" && isUsed) return false;

    return matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 select-none font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            CONTENT ASSETS
          </span>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            MEDIA <span className="text-[#D4AF37]">LIBRARY</span>
          </h1>
          <p className="font-sans text-xs text-white/60">
            Upload images &amp; videos, inspect asset details, and verify &quot;Used In&quot; section dependencies.
          </p>
        </div>

        <label className="bg-[#D4AF37] hover:bg-[#FFEC69] text-black px-4 py-2 rounded-xl font-syne text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-md shrink-0">
          <Upload className="w-4 h-4" />
          <span>{uploading ? "Uploading..." : "Upload Media"}</span>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => e.target.files && handleFilesUpload(e.target.files)}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* DRAG AND DROP UPLOAD ZONE (Section 10) */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`p-6 rounded-2xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-2 ${
          isDragging
            ? "border-[#D4AF37] bg-[#D4AF37]/10 scale-[1.01]"
            : "border-white/15 bg-[#0F0E0D] hover:border-white/30"
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#D4AF37]">
          <Upload className="w-5 h-5" />
        </div>
        <div className="text-xs font-syne font-bold text-white uppercase tracking-wider">
          Drag &amp; Drop Images or Videos Here
        </div>
        <p className="text-[11px] text-white/50 font-sans">
          Supports PNG, JPG, WEBP, MP4 files up to 50MB.
        </p>
      </div>

      {/* SEARCH AND FILTER TABS (Section 10) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-[#0F0E0D] border border-white/10">
        {/* FILTER TABS */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 overflow-x-auto w-full sm:w-auto">
          {(["ALL", "IMAGES", "VIDEOS", "USED", "UNUSED"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setTabFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-syne transition-all ${
                tabFilter === tab
                  ? "bg-[#D4AF37] text-black font-bold shadow"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* SEARCH INPUT */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1A1918] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* MEDIA GRID */}
      {loading ? (
        <div className="py-16 text-center text-xs font-syne text-white/50">
          Loading media library...
        </div>
      ) : filteredItems.length === 0 ? (
        /* EMPTY STATE (Section 21) */
        <div className="py-16 text-center bg-[#0F0E0D] border border-white/10 rounded-2xl space-y-3 p-6">
          <ImageIcon className="w-8 h-8 text-white/20 mx-auto" />
          <div className="font-syne text-xs font-bold text-white uppercase tracking-wider">
            NO MEDIA YET
          </div>
          <p className="text-xs text-white/50 font-sans max-w-sm mx-auto">
            Upload your first image or video asset to begin building the visual library for FashAI Universal.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredItems.map((item) => {
            const isVideo = item.type === "video" || item.filename.endsWith(".mp4");
            const isSelected = selectedMedia?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedMedia(item);
                  setAltTextInput(item.altText || "");
                }}
                className={`group relative bg-[#0F0E0D] border rounded-2xl overflow-hidden cursor-pointer transition-all ${
                  isSelected
                    ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/40"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <div className="aspect-square bg-black relative flex items-center justify-center overflow-hidden">
                  {isVideo ? (
                    <div className="flex flex-col items-center justify-center gap-1.5 text-white/70">
                      <Film className="w-7 h-7 text-[#D4AF37]" />
                      <span className="text-[9px] font-syne font-bold uppercase">VIDEO</span>
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.url}
                      alt={item.altText || item.filename}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>

                <div className="p-2.5 bg-[#121110] border-t border-white/10 space-y-0.5">
                  <div className="text-xs font-syne font-bold text-white truncate" title={item.filename}>
                    {item.filename}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-white/50">
                    <span>{(item.size / 1024).toFixed(0)} KB</span>
                    <span className="text-[#D4AF37] uppercase font-mono">{item.category}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* INSPECTION SIDE PANEL (Section 10 & Section 11) */}
      {selectedMedia && (
        <div className="fixed inset-y-0 right-0 z-[200] w-full max-w-sm bg-[#11100F] border-l border-white/20 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
          <div className="space-y-5 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-syne text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold">
                ASSET DETAILS
              </span>
              <button
                onClick={() => setSelectedMedia(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* PREVIEW */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden border border-white/10 relative flex items-center justify-center">
              {selectedMedia.type === "video" || selectedMedia.filename.endsWith(".mp4") ? (
                <div className="flex flex-col items-center justify-center gap-2 text-white/70">
                  <Film className="w-8 h-8 text-[#D4AF37]" />
                  <span className="text-xs font-syne font-bold">VIDEO FILE</span>
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.filename}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* FILE METADATA */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-white/50 font-syne">Filename:</span>
                <span className="text-white font-mono truncate max-w-[180px]">
                  {selectedMedia.filename}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-white/50 font-syne">File Size:</span>
                <span className="text-white font-mono">
                  {(selectedMedia.size / 1024).toFixed(1)} KB
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-white/50 font-syne">Category:</span>
                <span className="text-[#D4AF37] uppercase font-mono">
                  {selectedMedia.category}
                </span>
              </div>
            </div>

            {/* USED IN FEATURE (Section 11) */}
            <div className="bg-[#1A1918] border border-white/10 p-3.5 rounded-2xl space-y-2">
              <div className="text-xs font-syne font-bold text-[#D4AF37] uppercase tracking-wider">
                USED IN:
              </div>
              <ul className="space-y-1 text-xs text-white/80 font-sans">
                {getUsedInLocations(selectedMedia).map((loc, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E936F]" />
                    <span>{loc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ALT TEXT INPUT */}
            <div className="space-y-1.5">
              <label className="text-xs font-syne text-white/70">Alt Text / Description</label>
              <input
                type="text"
                value={altTextInput}
                onChange={(e) => setAltTextInput(e.target.value)}
                placeholder="Accessibility description..."
                className="w-full bg-[#1A1918] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              onClick={() => handleDeleteRequest(selectedMedia)}
              className="flex-1 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 font-syne text-xs font-bold hover:bg-red-500/30 transition-colors flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Asset
            </button>
          </div>
        </div>
      )}

      {/* CONFIRMATION DELETE MODAL WITH "USED IN" (Section 20) */}
      {deleteModalItem && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121110] border border-white/20 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-[#F15E1C]">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-serif-display text-lg text-white">DELETE MEDIA ASSET</h3>
            </div>

            <p className="text-xs text-white/70 font-sans leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-white">{deleteModalItem.filename}</strong>?
            </p>

            <div className="bg-[#1A1918] border border-[#F15E1C]/40 p-3.5 rounded-2xl space-y-1.5">
              <span className="text-xs font-syne font-bold text-[#F15E1C] uppercase tracking-wider">
                This image is currently used in:
              </span>
              <ul className="list-disc list-inside text-xs font-mono text-white/90">
                {deleteModalItem.usedIn.map((loc, idx) => (
                  <li key={idx}>{loc}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteModalItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-syne text-white/60 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-syne font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
