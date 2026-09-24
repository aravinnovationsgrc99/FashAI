"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import {
  Upload,
  Trash2,
  Search,
  Filter,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Film,
  Plus,
} from "lucide-react";
import { MediaItem } from "@/lib/admin/config-schema";

export default function MediaLibraryPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [deleteWarning, setDeleteWarning] = useState<{
    mediaId: string;
    usedIn: string[];
    message: string;
  } | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

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

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    setStatusMessage(null);

    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("files", e.target.files[i]);
    }

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage(`Successfully uploaded ${data.media?.length || 1} file(s)`);
        await fetchMedia();
      } else {
        alert(data.error || "Failed to upload file");
      }
    } catch {
      alert("Error uploading media asset");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteClick = async (id: string, confirmForce = false) => {
    try {
      const res = await fetch(
        `/api/admin/media?id=${id}${confirmForce ? "&confirm=true" : ""}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (res.ok && data.requiresConfirmation) {
        setDeleteWarning({
          mediaId: id,
          usedIn: data.usedIn || [],
          message: data.message,
        });
        return;
      }

      if (res.ok) {
        setDeleteWarning(null);
        setStatusMessage("Media asset removed successfully");
        await fetchMedia();
        setTimeout(() => setStatusMessage(null), 3000);
      } else {
        alert(data.error || "Failed to delete media asset");
      }
    } catch {
      alert("Error deleting media asset");
    }
  };

  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch =
      item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.altText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === "ALL" || item.category.toUpperCase() === categoryFilter.toUpperCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight text-white">
            MEDIA &amp; ASSET LIBRARY
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Upload, inspect, tag, and manage image &amp; video assets with section dependency checks.
          </p>
        </div>

        <label className="bg-[#F15E1C] hover:bg-[#e04f10] text-white px-5 py-2.5 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md shrink-0">
          <Upload className="w-4 h-4" />
          <span>{uploading ? "UPLOADING..." : "UPLOAD NEW MEDIA"}</span>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-[#2E936F]/15 border border-[#2E936F]/30 text-[#2E936F] text-xs font-syne font-bold">
          {statusMessage}
        </div>
      )}

      {/* DELETION USAGE WARNING MODAL */}
      {deleteWarning && (
        <div className="p-5 rounded-2xl bg-[#F15E1C]/15 border border-[#F15E1C] space-y-3">
          <div className="flex items-center gap-2 text-[#F15E1C]">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <h4 className="font-syne text-xs font-bold uppercase tracking-wider">
              THIS MEDIA IS CURRENTLY BEING USED IN:
            </h4>
          </div>
          <ul className="list-disc list-inside text-xs font-sans text-white/90 space-y-1 pl-2">
            {deleteWarning.usedIn.map((loc, idx) => (
              <li key={idx} className="font-bold">{loc}</li>
            ))}
          </ul>
          <p className="font-sans text-xs text-white/70">
            Are you sure you want to remove this media asset? It may cause fallback images to appear on affected sections.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => handleDeleteClick(deleteWarning.mediaId, true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-syne font-bold uppercase"
            >
              CONFIRM &amp; REMOVE MEDIA
            </button>
            <button
              onClick={() => setDeleteWarning(null)}
              className="bg-white/10 text-white px-4 py-2 rounded-xl text-xs font-syne font-bold uppercase"
            >
              CANCEL
            </button>
          </div>
        </div>
      )}

      {/* SEARCH & CATEGORY FILTERS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0F0E0D] border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by filename, alt text or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#181715] border border-white/15 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#FAB60A]" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#181715] border border-white/15 text-white text-xs rounded-xl px-3 py-2.5 outline-none"
          >
            <option value="ALL">ALL CATEGORIES</option>
            <option value="HOME">HOME</option>
            <option value="EVENTS">EVENTS</option>
            <option value="BRAND">BRAND</option>
            <option value="GENERAL">GENERAL</option>
          </select>
        </div>
      </div>

      {/* MEDIA ASSETS GRID */}
      {loading ? (
        <div className="py-16 text-center text-xs font-syne text-white/50">
          Loading media library...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center text-xs font-syne text-white/50 bg-[#0F0E0D] rounded-2xl border border-white/10">
          No media assets found matching search filters.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#0F0E0D] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-[#FAB60A]/50 transition-all shadow-md"
            >
              {/* Thumbnail preview */}
              <div className="relative aspect-square bg-black overflow-hidden flex items-center justify-center">
                {item.type === "video" ? (
                  <div className="flex flex-col items-center justify-center gap-2 text-white/70">
                    <Film className="w-8 h-8 text-[#FAB60A]" />
                    <span className="text-[10px] font-syne font-bold uppercase">VIDEO ASSET</span>
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

              {/* Item Metadata */}
              <div className="p-3 space-y-1.5 border-t border-white/10 bg-[#121110]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-syne font-bold text-white truncate max-w-[140px]" title={item.filename}>
                    {item.filename}
                  </span>
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    className="text-white/40 hover:text-red-400 p-1"
                    title="Delete Media Asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] font-syne text-white/50">
                  <span>{(item.size / 1024).toFixed(0)} KB</span>
                  <span className="text-[#FAB60A] uppercase">{item.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
