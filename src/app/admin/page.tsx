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
    <div className="max-w-7xl mx-auto space-y-10 select-none">
      {/* 1. EDITORIAL DASHBOARD HEADER (Section 4) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F0E0D] border border-white/10 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-syne text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              EDITORIAL CONTROL ROOM
            </span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight text-white">
            FashAI Universal <span className="text-[#D4AF37] font-semibold">Master Control</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/60 max-w-2xl leading-relaxed">
            Real-time visual content management, high-fashion showcase editorial, media orchestration, and global talent intake.
          </p>
        </div>

        {/* WEBSITE STATUS SUMMARY BLOCK */}
        <div className="flex items-center gap-4 bg-[#141312] border border-white/12 p-4 rounded-2xl shrink-0 shadow-inner relative z-10">
          <div
            className={`w-3.5 h-3.5 rounded-full ${
              isMaintenanceOn ? "bg-[#F15E1C] animate-ping" : "bg-[#2E936F] shadow-[0_0_10px_#2E936F]"
            }`}
          />
          <div className="text-left space-y-0.5">
            <div className="text-[10px] font-syne uppercase tracking-wider text-white/50">
              System Status
            </div>
            <div
              className={`text-xs font-syne font-bold uppercase tracking-wider ${
                isMaintenanceOn ? "text-[#F15E1C]" : "text-[#2E936F]"
              }`}
            >
              {isMaintenanceOn ? "MAINTENANCE MODE" : "WEBSITE ONLINE"}
            </div>
          </div>
          <button
            onClick={handleToggleMaintenance}
            className="ml-3 px-3.5 py-1.5 rounded-xl text-[10px] font-syne font-bold uppercase bg-white/10 hover:bg-white/20 text-white transition-all border border-white/15 shadow-sm"
          >
            Toggle Mode
          </button>
        </div>
      </div>

      {/* 2. EDITORIAL OVERVIEW STATISTIC BLOCKS (Section 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* STAT 1: WEBSITE STATUS */}
        <div className="p-6 rounded-3xl bg-[#0F0E0D] border border-white/10 space-y-3 hover:border-[#D4AF37]/40 transition-all shadow-xl group">
          <div className="flex items-center justify-between text-[11px] font-syne font-bold uppercase text-white/50">
            <span className="tracking-wider">WEBSITE</span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div
            className={`font-serif-display text-2xl sm:text-3xl font-light uppercase tracking-tight ${
              isMaintenanceOn ? "text-[#F15E1C]" : "text-[#2E936F]"
            }`}
          >
            {isMaintenanceOn ? "MAINTENANCE" : "ONLINE"}
          </div>
          <p className="text-[11px] text-white/50 font-sans">Public site availability & routing</p>
        </div>

        {/* STAT 2: MEDIA ITEMS */}
        <div className="p-6 rounded-3xl bg-[#0F0E0D] border border-white/10 space-y-3 hover:border-[#D4AF37]/40 transition-all shadow-xl group">
          <div className="flex items-center justify-between text-[11px] font-syne font-bold uppercase text-white/50">
            <span className="tracking-wider">MEDIA ASSETS</span>
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-light text-white">
            {mediaCount} <span className="text-xs font-syne text-white/40">ITEMS</span>
          </div>
          <p className="text-[11px] text-white/50 font-sans">High-res editorial photos & video hero</p>
        </div>

        {/* STAT 3: ACTIVE EVENTS */}
        <div className="p-6 rounded-3xl bg-[#0F0E0D] border border-white/10 space-y-3 hover:border-[#F15E1C]/40 transition-all shadow-xl group">
          <div className="flex items-center justify-between text-[11px] font-syne font-bold uppercase text-white/50">
            <span className="tracking-wider">RUNWAYS & EVENTS</span>
            <div className="w-8 h-8 rounded-full bg-[#F15E1C]/10 flex items-center justify-center text-[#F15E1C] group-hover:scale-110 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-light text-white">
            {activeEventsCount} <span className="text-xs font-syne text-white/40">ACTIVE</span>
          </div>
          <p className="text-[11px] text-white/50 font-sans">LifeStyle 2026 & Couture showcases</p>
        </div>

        {/* STAT 4: NEW APPLICATIONS */}
        <div className="p-6 rounded-3xl bg-[#0F0E0D] border border-white/10 space-y-3 hover:border-[#2E936F]/40 transition-all shadow-xl group">
          <div className="flex items-center justify-between text-[11px] font-syne font-bold uppercase text-white/50">
            <span className="tracking-wider">TALENT INTAKE</span>
            <div className="w-8 h-8 rounded-full bg-[#2E936F]/10 flex items-center justify-center text-[#2E936F] group-hover:scale-110 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-light text-white">
            {newApplicationsCount} <span className="text-xs font-syne text-white/40">SUBMITTED</span>
          </div>
          <p className="text-[11px] text-white/50 font-sans">Designer & model applications</p>
        </div>
      </div>

      {/* 3. PROMINENT QUICK ACTIONS MATRIX (Section 5) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-syne text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
            PRIMARY ACTION CONTROLS
          </h2>
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Quick Modules Hub</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link
            href="/admin/media"
            className="p-5 rounded-3xl bg-[#11100F] border border-white/10 hover:border-[#D4AF37]/60 transition-all flex flex-col items-center justify-center gap-3 text-center group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <Plus className="w-5 h-5" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              + ADD MEDIA
            </span>
          </Link>

          <Link
            href="/admin/events"
            className="p-5 rounded-3xl bg-[#11100F] border border-white/10 hover:border-[#F15E1C]/60 transition-all flex flex-col items-center justify-center gap-3 text-center group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#F15E1C]/10 text-[#F15E1C] border border-[#F15E1C]/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              + ADD EVENT
            </span>
          </Link>

          <Link
            href="/admin/homepage"
            className="p-5 rounded-3xl bg-[#11100F] border border-white/10 hover:border-[#2E936F]/60 transition-all flex flex-col items-center justify-center gap-3 text-center group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#2E936F]/10 text-[#2E936F] border border-[#2E936F]/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              HOMEPAGE
            </span>
          </Link>

          <Link
            href="/admin/applications"
            className="p-5 rounded-3xl bg-[#11100F] border border-white/10 hover:border-[#D4AF37]/60 transition-all flex flex-col items-center justify-center gap-3 text-center group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <FileText className="w-5 h-5" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              TALENT INTAKE
            </span>
          </Link>

          <Link
            href="/admin/theme"
            className="p-5 rounded-3xl bg-[#11100F] border border-white/10 hover:border-[#F15E1C]/60 transition-all flex flex-col items-center justify-center gap-3 text-center group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#F15E1C]/10 text-[#F15E1C] border border-[#F15E1C]/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <Palette className="w-5 h-5" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              BRAND THEME
            </span>
          </Link>

          <button
            onClick={() => setIsPreviewOpen(true)}
            className="p-5 rounded-3xl bg-[#11100F] border border-white/10 hover:border-white/40 transition-all flex flex-col items-center justify-center gap-3 text-center group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-white border border-white/15 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <Eye className="w-5 h-5" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              PREVIEW SITE
            </span>
          </button>
        </div>
      </div>

      {/* 4. RECENT ACTIVITY TIMELINE LIST (Section 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
        {/* RECENT ACTIVITY TIMELINE (8 COLS) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 px-1">
            <h2 className="font-syne text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              EDITORIAL ACTIVITY TIMELINE
            </h2>
            <Link
              href="/admin/activity"
              className="text-[11px] font-syne text-white/50 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              View Full History <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-[#0F0E0D] border border-white/10 shadow-xl">
            {loadingLogs ? (
              <div className="py-12 text-center text-xs font-syne text-white/40">
                Loading recent activity timeline...
              </div>
            ) : logs.length === 0 ? (
              <div className="py-12 text-center text-xs text-white/40 font-sans">
                No recent admin activity recorded yet.
              </div>
            ) : (
              <ul className="divide-y divide-white/8 text-xs">
                {logs.slice(0, 5).map((log) => (
                  <li key={log.id} className="py-4 flex items-start justify-between gap-4">
                    <div className="space-y-1 min-w-0">
                      <div className="font-syne font-bold text-white text-xs truncate">
                        {log.details || log.action}
                      </div>
                      <div className="text-[11px] text-white/50 flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-[9px] font-mono text-[#D4AF37] uppercase border border-white/10">
                          {log.action}
                        </span>
                        <span>by {log.actor || "Admin"}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-white/40 flex-shrink-0 flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
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
        <div className="lg:col-span-4 space-y-4">
          <div className="border-b border-white/10 pb-3 px-1">
            <h2 className="font-syne text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              QUICK MODULES
            </h2>
          </div>

          <div className="space-y-3">
            <Link
              href="/admin/homepage"
              className="p-4 rounded-3xl bg-[#0F0E0D] border border-white/10 hover:border-white/30 flex items-center justify-between text-xs font-syne text-white transition-all group shadow-md"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <LayoutTemplate className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold">Homepage Editor</div>
                  <div className="text-[10px] text-white/50 font-sans">Section ordering & hero content</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
            </Link>

            <Link
              href="/admin/events"
              className="p-4 rounded-3xl bg-[#0F0E0D] border border-white/10 hover:border-white/30 flex items-center justify-between text-xs font-syne text-white transition-all group shadow-md"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-2xl bg-[#F15E1C]/10 flex items-center justify-center text-[#F15E1C]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold">LifeStyle & Runway</div>
                  <div className="text-[10px] text-white/50 font-sans">Manage fashion show schedules</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
            </Link>

            <Link
              href="/admin/submissions"
              className="p-4 rounded-3xl bg-[#0F0E0D] border border-white/10 hover:border-white/30 flex items-center justify-between text-xs font-syne text-white transition-all group shadow-md"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-2xl bg-[#2E936F]/10 flex items-center justify-center text-[#2E936F]">
                  <Inbox className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold">Inquiries & Submissions</div>
                  <div className="text-[10px] text-white/50 font-sans">Export contact inquiries CSV</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
