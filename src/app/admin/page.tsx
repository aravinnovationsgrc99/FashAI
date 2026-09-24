"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Globe,
  ImageIcon,
  Calendar,
  FileText,
  Clock,
  Palette,
  LayoutTemplate,
  Plus,
  Eye,
  Wrench,
  Sparkles,
  ArrowRight,
  Inbox,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { ActivityLogEntry } from "@/lib/admin/config-schema";

export default function AdminDashboardPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish, setIsPreviewOpen, showToast } =
    useSiteConfig();
  const [logs, setLogs] = useState<ActivityLogEntry[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [newApplicationsCount, setNewApplicationsCount] = useState(24);

  useEffect(() => {
    fetchLogs();
    fetchApplicationsCount();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoadingLogs(true);
      const res = await fetch("/api/admin/activity", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (e) {
      console.warn("Could not fetch activity logs:", e);
    } finally {
      setLoadingLogs(false);
    }
  };

  const fetchApplicationsCount = async () => {
    try {
      const res = await fetch("/api/admin/submissions", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.submissions)) {
          setNewApplicationsCount(data.submissions.length);
        }
      }
    } catch {
      // fallback
    }
  };

  const isMaintenanceOn = config?.maintenanceSettings?.enabled;

  const handleToggleMaintenance = async () => {
    const newState = !isMaintenanceOn;
    updateLocalDraftConfig((prev) => ({
      ...prev,
      maintenanceSettings: {
        ...prev.maintenanceSettings,
        enabled: newState,
      },
    }));

    setTimeout(async () => {
      await saveDraft();
      await publish(`Maintenance mode set to ${newState ? "ON" : "OFF"}`);
      await fetchLogs();
    }, 100);
  };

  const mediaCount = config?.mediaLibrary?.length || 0;
  const activeEventsCount = config?.events?.filter((e) => e.status !== "past")?.length || 0;

  // Format relative timestamp
  const formatTimeAgo = (dateStr: string) => {
    const diff = Math.max(0, Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000));
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hour ago`;
    if (diff < 172800) return "Yesterday";
    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 select-none">
      {/* 1. DASHBOARD HEADER (Section 4) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div className="space-y-1">
          <span className="font-syne text-[10px] font-bold uppercase tracking-[0.25em] text-[#FAB60A]">
            WELCOME BACK
          </span>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-light uppercase tracking-tight text-white">
            FashAI Universal <span className="text-[#FAB60A]">Master Control</span>
          </h1>
          <p className="font-sans text-xs text-white/60">
            Real-time content management, site configuration, media, events, and talent intake.
          </p>
        </div>

        {/* WEBSITE STATUS SUMMARY BLOCK */}
        <div className="flex items-center gap-3 bg-[#11100F] border border-white/10 p-3 rounded-2xl">
          <div
            className={`w-3 h-3 rounded-full ${
              isMaintenanceOn ? "bg-[#F15E1C] animate-ping" : "bg-[#2E936F]"
            }`}
          />
          <div className="text-left">
            <div className="text-[10px] font-syne uppercase tracking-wider text-white/50">
              System Status
            </div>
            <div
              className={`text-xs font-syne font-bold uppercase ${
                isMaintenanceOn ? "text-[#F15E1C]" : "text-[#2E936F]"
              }`}
            >
              {isMaintenanceOn ? "MAINTENANCE MODE" : "WEBSITE ONLINE"}
            </div>
          </div>
          <button
            onClick={handleToggleMaintenance}
            className="ml-2 px-3 py-1 rounded-xl text-[10px] font-syne font-bold uppercase bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
          >
            Toggle
          </button>
        </div>
      </div>

      {/* 2. EDITORIAL OVERVIEW STATISTIC BLOCKS (Section 4) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* STAT 1: WEBSITE STATUS */}
        <div className="p-4 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-syne font-bold uppercase text-white/50">
            <span>WEBSITE</span>
            <Globe className="w-3.5 h-3.5 text-white/40" />
          </div>
          <div
            className={`font-serif-display text-xl sm:text-2xl font-light uppercase ${
              isMaintenanceOn ? "text-[#F15E1C]" : "text-[#2E936F]"
            }`}
          >
            {isMaintenanceOn ? "MAINTENANCE" : "ONLINE"}
          </div>
          <p className="text-[10px] text-white/40">Public site route availability</p>
        </div>

        {/* STAT 2: MEDIA ITEMS */}
        <div className="p-4 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-syne font-bold uppercase text-white/50">
            <span>MEDIA</span>
            <ImageIcon className="w-3.5 h-3.5 text-[#FAB60A]" />
          </div>
          <div className="font-serif-display text-xl sm:text-2xl font-light text-white">
            {mediaCount} <span className="text-xs font-syne text-white/40">ITEMS</span>
          </div>
          <p className="text-[10px] text-white/40">High-res images & hero videos</p>
        </div>

        {/* STAT 3: ACTIVE EVENTS */}
        <div className="p-4 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-syne font-bold uppercase text-white/50">
            <span>EVENTS</span>
            <Calendar className="w-3.5 h-3.5 text-[#F15E1C]" />
          </div>
          <div className="font-serif-display text-xl sm:text-2xl font-light text-white">
            {activeEventsCount} <span className="text-xs font-syne text-white/40">ACTIVE</span>
          </div>
          <p className="text-[10px] text-white/40">LifeStyle 2026 & Runway shows</p>
        </div>

        {/* STAT 4: NEW APPLICATIONS */}
        <div className="p-4 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-syne font-bold uppercase text-white/50">
            <span>APPLICATIONS</span>
            <FileText className="w-3.5 h-3.5 text-[#2E936F]" />
          </div>
          <div className="font-serif-display text-xl sm:text-2xl font-light text-white">
            {newApplicationsCount} <span className="text-xs font-syne text-white/40">RECEIVED</span>
          </div>
          <p className="text-[10px] text-white/40">Talent intake submissions</p>
        </div>
      </div>

      {/* 3. PROMINENT QUICK ACTIONS BAR (Section 5) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
            QUICK ACTIONS
          </h2>
          <span className="text-[10px] font-mono text-white/40">Primary Content Controls</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/admin/media"
            className="p-3.5 rounded-2xl bg-[#11100F] border border-white/10 hover:border-[#FAB60A]/60 transition-all flex flex-col items-center justify-center gap-2 text-center group shadow-sm"
          >
            <div className="w-8 h-8 rounded-full bg-[#FAB60A]/10 text-[#FAB60A] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-4 h-4" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              + ADD IMAGE
            </span>
          </Link>

          <Link
            href="/admin/events"
            className="p-3.5 rounded-2xl bg-[#11100F] border border-white/10 hover:border-[#F15E1C]/60 transition-all flex flex-col items-center justify-center gap-2 text-center group shadow-sm"
          >
            <div className="w-8 h-8 rounded-full bg-[#F15E1C]/10 text-[#F15E1C] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              + ADD EVENT
            </span>
          </Link>

          <Link
            href="/admin/homepage"
            className="p-3.5 rounded-2xl bg-[#11100F] border border-white/10 hover:border-[#2E936F]/60 transition-all flex flex-col items-center justify-center gap-2 text-center group shadow-sm"
          >
            <div className="w-8 h-8 rounded-full bg-[#2E936F]/10 text-[#2E936F] flex items-center justify-center group-hover:scale-110 transition-transform">
              <LayoutTemplate className="w-4 h-4" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              EDIT HOMEPAGE
            </span>
          </Link>

          <Link
            href="/admin/applications"
            className="p-3.5 rounded-2xl bg-[#11100F] border border-white/10 hover:border-[#FAB60A]/60 transition-all flex flex-col items-center justify-center gap-2 text-center group shadow-sm"
          >
            <div className="w-8 h-8 rounded-full bg-[#FAB60A]/10 text-[#FAB60A] flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              APPLICATIONS
            </span>
          </Link>

          <Link
            href="/admin/theme"
            className="p-3.5 rounded-2xl bg-[#11100F] border border-white/10 hover:border-[#F15E1C]/60 transition-all flex flex-col items-center justify-center gap-2 text-center group shadow-sm"
          >
            <div className="w-8 h-8 rounded-full bg-[#F15E1C]/10 text-[#F15E1C] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Palette className="w-4 h-4" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              EDIT THEME
            </span>
          </Link>

          <button
            onClick={() => setIsPreviewOpen(true)}
            className="p-3.5 rounded-2xl bg-[#11100F] border border-white/10 hover:border-white/40 transition-all flex flex-col items-center justify-center gap-2 text-center group shadow-sm"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Eye className="w-4 h-4" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              PREVIEW SITE
            </span>
          </button>
        </div>
      </div>

      {/* 4. RECENT ACTIVITY TIMELINE LIST (Section 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* RECENT ACTIVITY TIMELINE (8 COLS) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
              RECENT ACTIVITY
            </h2>
            <Link
              href="/admin/activity"
              className="text-[11px] font-syne text-white/50 hover:text-white flex items-center gap-1"
            >
              View Full History <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F0E0D] border border-white/10">
            {loadingLogs ? (
              <div className="py-8 text-center text-xs font-syne text-white/40">
                Loading recent activity timeline...
              </div>
            ) : logs.length === 0 ? (
              <div className="py-8 text-center text-xs text-white/40 font-sans">
                No recent admin activity recorded yet.
              </div>
            ) : (
              <ul className="divide-y divide-white/5 text-xs">
                {logs.slice(0, 5).map((log) => (
                  <li key={log.id} className="py-3 flex items-start justify-between gap-4">
                    <div className="space-y-0.5 min-w-0">
                      <div className="font-syne font-bold text-white text-xs truncate">
                        {log.details || log.action}
                      </div>
                      <div className="text-[11px] text-white/50 flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono text-[#FAB60A] uppercase">
                          {log.action}
                        </span>
                        <span>by {log.actor || "Admin"}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-white/40 flex-shrink-0 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(log.timestamp)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* CONTENT MANAGEMENT SHORTCUTS (4 COLS) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="border-b border-white/10 pb-2">
            <h2 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
              QUICK MODULES
            </h2>
          </div>

          <div className="space-y-2">
            <Link
              href="/admin/homepage"
              className="p-3.5 rounded-2xl bg-[#0F0E0D] border border-white/10 hover:border-white/30 flex items-center justify-between text-xs font-syne text-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <LayoutTemplate className="w-4 h-4 text-[#FAB60A]" />
                <div>
                  <div className="font-bold">Homepage Sections</div>
                  <div className="text-[10px] text-white/50 font-sans">Visual section reorder</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white transition-colors" />
            </Link>

            <Link
              href="/admin/events"
              className="p-3.5 rounded-2xl bg-[#0F0E0D] border border-white/10 hover:border-white/30 flex items-center justify-between text-xs font-syne text-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#F15E1C]" />
                <div>
                  <div className="font-bold">LifeStyle & Runway</div>
                  <div className="text-[10px] text-white/50 font-sans">Manage upcoming events</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white transition-colors" />
            </Link>

            <Link
              href="/admin/submissions"
              className="p-3.5 rounded-2xl bg-[#0F0E0D] border border-white/10 hover:border-white/30 flex items-center justify-between text-xs font-syne text-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4 text-[#2E936F]" />
                <div>
                  <div className="font-bold">Inquiries & Export</div>
                  <div className="text-[10px] text-white/50 font-sans">Download CSV responses</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
