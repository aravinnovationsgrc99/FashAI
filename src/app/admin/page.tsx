"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Globe,
  Wrench,
  ImageIcon,
  Grid,
  Calendar,
  FileText,
  Activity,
  Layers,
  Sparkles,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { ActivityLogEntry } from "@/lib/admin/config-schema";

export default function AdminDashboardPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish, refreshConfig } = useSiteConfig();
  const [logs, setLogs] = useState<ActivityLogEntry[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);

  useEffect(() => {
    fetchLogs();
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
      await publish(`Maintenance mode turned ${newState ? "ON" : "OFF"}`);
      await fetchLogs();
    }, 150);
  };

  const activeSectionsCount = config?.homepageSections?.filter((s) => s.enabled)?.length || 0;
  const publishedImagesCount = config?.mediaLibrary?.length || 0;
  const galleryImagesCount = config?.galleryItems?.length || 0;
  const eventsCount = config?.events?.length || 0;
  const applicationTypesCount = config?.applicationCategories?.filter((c) => c.enabled)?.length || 0;

  return (
    <div className="space-y-8">
      {/* MASTER DASHBOARD HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0F0E0D] border border-white/10 p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#F15E1C]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FAB60A]" />
            <span className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
              FASHAI UNIVERSAL
            </span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-light uppercase tracking-tight text-white">
            MASTER CONTROL CENTER
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/70">
            Central orchestration panel for site architecture, theme, media, events, and registrations.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <button
            onClick={() => refreshConfig()}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 transition-all border border-white/10"
            title="Refresh System Configuration"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleToggleMaintenance}
            className={`px-5 py-3 rounded-xl font-syne text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 ${
              isMaintenanceOn
                ? "bg-[#F15E1C] hover:bg-[#e04f10] text-white"
                : "bg-[#2E936F] hover:bg-[#257759] text-white"
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>{isMaintenanceOn ? "DISABLE MAINTENANCE" : "ENABLE MAINTENANCE"}</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* STAT 1: WEBSITE STATUS */}
        <div className="p-5 rounded-2xl bg-[#0F0E0D] border border-white/10 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-syne text-xs font-bold uppercase tracking-wider text-white/60">
              WEBSITE STATUS
            </span>
            <div className={`p-2 rounded-lg ${isMaintenanceOn ? "bg-[#F15E1C]/20 text-[#F15E1C]" : "bg-[#2E936F]/20 text-[#2E936F]"}`}>
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className={`font-serif-display text-2xl font-light uppercase ${isMaintenanceOn ? "text-[#F15E1C]" : "text-[#2E936F]"}`}>
              {isMaintenanceOn ? "MAINTENANCE MODE" : "ONLINE & PUBLIC"}
            </div>
            <p className="font-sans text-xs text-white/60 mt-1">
              {isMaintenanceOn ? "Public site displays maintenance overlay" : "All routes and enquiry forms active"}
            </p>
          </div>
        </div>

        {/* STAT 2: PUBLISHED MEDIA */}
        <div className="p-5 rounded-2xl bg-[#0F0E0D] border border-white/10 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-syne text-xs font-bold uppercase tracking-wider text-white/60">
              MEDIA ASSETS
            </span>
            <div className="p-2 rounded-lg bg-[#FAB60A]/20 text-[#FAB60A]">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-serif-display text-3xl font-light text-white">
              {publishedImagesCount} <span className="text-xs font-syne text-white/50 uppercase">FILES</span>
            </div>
            <p className="font-sans text-xs text-white/60 mt-1">
              {galleryImagesCount} active gallery items
            </p>
          </div>
        </div>

        {/* STAT 3: EVENT FORMATS */}
        <div className="p-5 rounded-2xl bg-[#0F0E0D] border border-white/10 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-syne text-xs font-bold uppercase tracking-wider text-white/60">
              EVENTS &amp; FORMATS
            </span>
            <div className="p-2 rounded-lg bg-[#F15E1C]/20 text-[#F15E1C]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-serif-display text-3xl font-light text-white">
              {eventsCount} <span className="text-xs font-syne text-white/50 uppercase">SHOWCASES</span>
            </div>
            <p className="font-sans text-xs text-white/60 mt-1">
              LifeStyle 2026 &amp; Runway 2026
            </p>
          </div>
        </div>

        {/* STAT 4: HOMEPAGE SECTIONS */}
        <div className="p-5 rounded-2xl bg-[#0F0E0D] border border-white/10 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-syne text-xs font-bold uppercase tracking-wider text-white/60">
              HOMEPAGE SECTIONS
            </span>
            <div className="p-2 rounded-lg bg-[#2E936F]/20 text-[#2E936F]">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="font-serif-display text-3xl font-light text-white">
              {activeSectionsCount} <span className="text-xs font-syne text-white/50 uppercase">ACTIVE</span>
            </div>
            <p className="font-sans text-xs text-white/60 mt-1">
              {applicationTypesCount} open application categories
            </p>
          </div>
        </div>
      </div>

      {/* QUICK CONTROL MODULES GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 8-COLS: QUICK ACCESS TILES */}
        <div className="lg:col-span-8 space-y-4">
          <h2 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
            CENTRAL CONTROL MODULES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/admin/homepage"
              className="p-5 rounded-2xl bg-[#0F0E0D] border border-white/10 hover:border-[#FAB60A]/50 transition-all group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-syne text-xs font-bold uppercase tracking-wider text-[#FAB60A]">
                  HOMEPAGE BUILDER
                </span>
                <ArrowRight className="w-4 h-4 text-[#FAB60A] group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="font-sans text-xs text-white/70">
                Reorder, enable/disable, and edit text &amp; media across all 12 homepage blocks.
              </p>
            </Link>

            <Link
              href="/admin/media"
              className="p-5 rounded-2xl bg-[#0F0E0D] border border-white/10 hover:border-[#FAB60A]/50 transition-all group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-syne text-xs font-bold uppercase tracking-wider text-[#FAB60A]">
                  MEDIA &amp; VIDEO LIBRARY
                </span>
                <ArrowRight className="w-4 h-4 text-[#FAB60A] group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="font-sans text-xs text-white/70">
                Upload images and videos with automatic deletion confirmation &amp; section usage tracking.
              </p>
            </Link>

            <Link
              href="/admin/events"
              className="p-5 rounded-2xl bg-[#0F0E0D] border border-white/10 hover:border-[#FAB60A]/50 transition-all group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-syne text-xs font-bold uppercase tracking-wider text-[#FAB60A]">
                  EVENT &amp; POPUP CONTROL
                </span>
                <ArrowRight className="w-4 h-4 text-[#FAB60A] group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="font-sans text-xs text-white/70">
                Manage LifeStyle 2026 dates, dress codes, venue status, and visitor popups.
              </p>
            </Link>

            <Link
              href="/admin/theme"
              className="p-5 rounded-2xl bg-[#0F0E0D] border border-white/10 hover:border-[#FAB60A]/50 transition-all group flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-syne text-xs font-bold uppercase tracking-wider text-[#FAB60A]">
                  THEME &amp; TYPOGRAPHY
                </span>
                <ArrowRight className="w-4 h-4 text-[#FAB60A] group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="font-sans text-xs text-white/70">
                Modify Light &amp; Dark mode palettes, hex values, and typography scaling.
              </p>
            </Link>
          </div>
        </div>

        {/* RIGHT 4-COLS: RECENT ACTIVITY LOG */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-syne text-xs font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
              RECENT ADMIN ACTIVITY
            </h2>
            <Link href="/admin/activity" className="text-xs font-syne text-white/50 hover:text-white">
              VIEW ALL →
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-[#0F0E0D] border border-white/10 space-y-4">
            {loadingLogs ? (
              <div className="py-8 text-center text-xs font-syne text-white/50">
                Loading activity log...
              </div>
            ) : logs.length === 0 ? (
              <div className="py-8 text-center text-xs font-syne text-white/50">
                No recent activity recorded.
              </div>
            ) : (
              <ul className="space-y-3 text-xs">
                {logs.slice(0, 5).map((log) => (
                  <li key={log.id} className="pb-3 border-b border-white/5 last:border-0 last:pb-0 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-syne font-bold uppercase text-[#F15E1C]">
                        {log.action}
                      </span>
                      <span className="text-[10px] text-white/40 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {log.details && (
                      <p className="font-sans text-white/70 line-clamp-1">{log.details}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
