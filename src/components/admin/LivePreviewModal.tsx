"use client";

import React from "react";
import { Monitor, Tablet, Smartphone, X, ExternalLink, RefreshCw } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function LivePreviewModal() {
  const { isPreviewOpen, setIsPreviewOpen, previewDevice, setPreviewDevice } = useSiteConfig();

  if (!isPreviewOpen) return null;

  const deviceWidths = {
    desktop: "w-full max-w-6xl h-[85vh]",
    tablet: "w-[768px] h-[80vh]",
    mobile: "w-[375px] h-[750px]",
  };

  return (
    <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex flex-col items-center justify-between p-4 animate-in fade-in duration-200">
      {/* PREVIEW TOOLBAR */}
      <div className="w-full max-w-5xl bg-[#111] border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="font-syne text-xs uppercase tracking-widest text-[#D4AF37] font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2E936F] animate-ping" />
            LIVE PREVIEW MODE
          </span>
        </div>

        {/* DEVICE SELECTOR */}
        <div className="flex items-center bg-black/50 p-1 rounded-xl border border-white/10 gap-1">
          <button
            onClick={() => setPreviewDevice("desktop")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-syne transition-all ${
              previewDevice === "desktop"
                ? "bg-[#D4AF37] text-black font-bold shadow"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Desktop
          </button>
          <button
            onClick={() => setPreviewDevice("tablet")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-syne transition-all ${
              previewDevice === "tablet"
                ? "bg-[#D4AF37] text-black font-bold shadow"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            Tablet
          </button>
          <button
            onClick={() => setPreviewDevice("mobile")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-syne transition-all ${
              previewDevice === "mobile"
                ? "bg-[#D4AF37] text-black font-bold shadow"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile
          </button>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open in New Tab
          </a>
          <button
            onClick={() => setIsPreviewOpen(false)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close Preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* DEVICE FRAME CONTAINER */}
      <div className="w-full flex-1 flex items-center justify-center my-4 overflow-hidden">
        <div
          className={`bg-[#0A0A0A] border border-white/20 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 flex flex-col ${deviceWidths[previewDevice]}`}
        >
          <div className="h-7 bg-[#1A1A1A] border-b border-white/10 flex items-center px-4 gap-2 text-white/40 text-xs select-none">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 text-center font-mono text-[10px] text-white/50 truncate">
              https://fashai.universal/preview
            </div>
          </div>
          <iframe
            src="/"
            title="Website Preview"
            className="w-full flex-1 border-0 bg-black"
          />
        </div>
      </div>
    </div>
  );
}
