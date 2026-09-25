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
  Power,
  AlertTriangle,
  Layers,
  Grid,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { ActivityLogEntry } from "@/lib/admin/config-schema";

export default function AdminDashboardPage() {
  const { config, updateLocalDraftConfig, saveDraft, publish, refreshConfig, setIsPreviewOpen, showToast } =
    useSiteConfig();
  const [logs, setLogs] = useState<ActivityLogEntry[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [newApplicationsCount, setNewApplicationsCount] = useState(24);
  const [showStopModal, setShowStopModal] = useState(false);
  const [isProcessingStop, setIsProcessingStop] = useState(false);

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

  const handleConfirmToggleMaintenance = async () => {
    try {
      setIsProcessingStop(true);
      const newState = !isMaintenanceOn;
      updateLocalDraftConfig((prev) => ({
        ...prev,
        maintenanceSettings: {
          ...prev.maintenanceSettings,
          enabled: newState,
        },
      }));

      const saved = await saveDraft();
      if (!saved) {
        showToast("Unable to change website status. Please try again.", "error");
        return;
      }

      const published = await publish(`Global Maintenance mode set to ${newState ? "ACTIVE" : "OFF"}`);
      if (!published) {
        showToast("Unable to change website status. Please try again.", "error");
        return;
      }

      await refreshConfig();
      await fetchLogs();
      setShowStopModal(false);
      showToast(
        newState ? "Website is now in GLOBAL MAINTENANCE mode." : "Website restored ONLINE successfully.",
        newState ? "warning" : "success"
      );
    } catch (e) {
      showToast("Unable to change website status. Please try again.", "error");
    } finally {
      setIsProcessingStop(false);
    }
  };

  const mediaCount = config?.mediaLibrary?.length || 0;
  const activeEventsCount = config?.events?.filter((e) => e.status !== "past")?.length || 0;
  const services = config?.servicesSettings || [];
  const activeServicesCount = services.filter((s) => s.status === "ACTIVE").length;
  const disabledServicesCount = services.filter((s) => s.status === "DISABLED").length;

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
      {/* 1. MASTER CONTROL HEADER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F0E0D] border border-white/10 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-syne text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              FASHAI UNIVERSAL
            </span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight text-white">
            MASTER CONTROL <span className="text-[#D4AF37] font-semibold">PANEL</span>
          </h1>
          <p className="font-sans text-xs sm:text-sm text-white/60 max-w-2xl leading-relaxed">
            Authoritative master control over public routing, pages, media assets, service availability, events, and global maintenance.
          </p>
        </div>

        {/* WEBSITE STATUS & MASTER STOP CONTROL */}
        <div className="flex items-center gap-4 bg-[#141312] border border-white/12 p-4 rounded-2xl shrink-0 shadow-inner relative z-10">
          <div
            className={`w-3.5 h-3.5 rounded-full ${
              isMaintenanceOn ? "bg-[#F15E1C] animate-ping" : "bg-[#2E936F] shadow-[0_0_10px_#2E936F]"
            }`}
          />
          <div className="text-left space-y-0.5">
            <div className="text-[10px] font-syne uppercase tracking-wider text-white/50">
              Master Status
            </div>
            <div
              className={`text-xs font-syne font-bold uppercase tracking-wider ${
                isMaintenanceOn ? "text-[#F15E1C]" : "text-[#2E936F]"
              }`}
            >
              {isMaintenanceOn ? "● MAINTENANCE ACTIVE" : "● WEBSITE ONLINE"}
            </div>
          </div>

          <button
            onClick={() => setShowStopModal(true)}
            className={`ml-3 px-4 py-2 rounded-xl text-[10px] font-syne font-bold uppercase transition-all border shadow-md flex items-center gap-1.5 ${
              isMaintenanceOn
                ? "bg-[#2E936F]/15 text-[#2E936F] border-[#2E936F]/30 hover:bg-[#2E936F]/30"
                : "bg-[#F15E1C]/15 text-[#F15E1C] border-[#F15E1C]/40 hover:bg-[#F15E1C]/30"
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{isMaintenanceOn ? "RESTORE WEBSITE" : "STOP WEBSITE"}</span>
          </button>
        </div>
      </div>

      {/* 2. MASTER OVERVIEW STATISTIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* STAT 1: WEBSITE ROUTING STATUS */}
        <div className="p-6 rounded-3xl bg-[#0F0E0D] border border-white/10 space-y-3 hover:border-[#D4AF37]/40 transition-all shadow-xl group">
          <div className="flex items-center justify-between text-[11px] font-syne font-bold uppercase text-white/50">
            <span className="tracking-wider">WEBSITE STATUS</span>
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
          <p className="text-[11px] text-white/50 font-sans">
            {isMaintenanceOn ? "Public visitors see Maintenance screen" : "All public routes active & responsive"}
          </p>
        </div>

        {/* STAT 2: SERVICES AVAILABILITY */}
        <Link
          href="/admin/services"
          className="p-6 rounded-3xl bg-[#0F0E0D] border border-white/10 space-y-3 hover:border-[#2E936F]/40 transition-all shadow-xl group block"
        >
          <div className="flex items-center justify-between text-[11px] font-syne font-bold uppercase text-white/50">
            <span className="tracking-wider">SERVICES STATUS</span>
            <div className="w-8 h-8 rounded-full bg-[#2E936F]/10 flex items-center justify-center text-[#2E936F] group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-light text-white flex items-baseline gap-2">
            <span className="text-[#2E936F]">{activeServicesCount} ACTIVE</span>
            {disabledServicesCount > 0 && (
              <span className="text-xs font-syne text-[#F15E1C]">/ {disabledServicesCount} PAUSED</span>
            )}
          </div>
          <p className="text-[11px] text-white/50 font-sans">
            Service-level availability &amp; CTAs control
          </p>
        </Link>

        {/* STAT 3: MEDIA ASSETS HEALTH */}
        <Link
          href="/admin/media"
          className="p-6 rounded-3xl bg-[#0F0E0D] border border-white/10 space-y-3 hover:border-[#D4AF37]/40 transition-all shadow-xl group block"
        >
          <div className="flex items-center justify-between text-[11px] font-syne font-bold uppercase text-white/50">
            <span className="tracking-wider">MEDIA STATUS</span>
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
              <ImageIcon className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-light text-white">
            {mediaCount} <span className="text-xs font-syne text-white/40">LOADED</span>
          </div>
          <p className="text-[11px] text-white/50 font-sans">Gallery images &amp; high-res asset library</p>
        </Link>

        {/* STAT 4: TALENT INTAKE */}
        <Link
          href="/admin/applications"
          className="p-6 rounded-3xl bg-[#0F0E0D] border border-white/10 space-y-3 hover:border-[#F15E1C]/40 transition-all shadow-xl group block"
        >
          <div className="flex items-center justify-between text-[11px] font-syne font-bold uppercase text-white/50">
            <span className="tracking-wider">CONTENT &amp; INTAKE</span>
            <div className="w-8 h-8 rounded-full bg-[#F15E1C]/10 flex items-center justify-center text-[#F15E1C] group-hover:scale-110 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-light text-white">
            {newApplicationsCount} <span className="text-xs font-syne text-white/40">SUBMISSIONS</span>
          </div>
          <p className="text-[11px] text-white/50 font-sans">Form applications &amp; inquiry leads</p>
        </Link>
      </div>

      {/* 3. QUICK ACTIONS MATRIX */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-syne text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
            QUICK ACTIONS MATRIX
          </h2>
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Direct Module Access</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link
            href="/admin/homepage"
            className="p-5 rounded-3xl bg-[#11100F] border border-white/10 hover:border-[#2E936F]/60 transition-all flex flex-col items-center justify-center gap-3 text-center group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#2E936F]/10 text-[#2E936F] border border-[#2E936F]/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <LayoutTemplate className="w-5 h-5" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              EDIT HOMEPAGE
            </span>
          </Link>

          <Link
            href="/admin/pages"
            className="p-5 rounded-3xl bg-[#11100F] border border-white/10 hover:border-[#D4AF37]/60 transition-all flex flex-col items-center justify-center gap-3 text-center group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <Globe className="w-5 h-5" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              MANAGE PAGES
            </span>
          </Link>

          <Link
            href="/admin/media"
            className="p-5 rounded-3xl bg-[#11100F] border border-white/10 hover:border-[#D4AF37]/60 transition-all flex flex-col items-center justify-center gap-3 text-center group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              MANAGE MEDIA
            </span>
          </Link>

          <Link
            href="/admin/gallery"
            className="p-5 rounded-3xl bg-[#11100F] border border-white/10 hover:border-[#F15E1C]/60 transition-all flex flex-col items-center justify-center gap-3 text-center group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#F15E1C]/10 text-[#F15E1C] border border-[#F15E1C]/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <Grid className="w-5 h-5" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              MANAGE GALLERY
            </span>
          </Link>

          <Link
            href="/admin/services"
            className="p-5 rounded-3xl bg-[#11100F] border border-white/10 hover:border-[#2E936F]/60 transition-all flex flex-col items-center justify-center gap-3 text-center group shadow-md hover:-translate-y-1"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#2E936F]/10 text-[#2E936F] border border-[#2E936F]/20 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <Layers className="w-5 h-5" />
            </div>
            <span className="font-syne text-[11px] font-bold text-white uppercase tracking-wider">
              SERVICES STATUS
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

      {/* 4. ACTIVITY TIMELINE & QUICK MODULES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
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

        <div className="lg:col-span-4 space-y-4">
          <div className="border-b border-white/10 pb-3 px-1">
            <h2 className="font-syne text-xs font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              QUICK MODULES
            </h2>
          </div>

          <div className="space-y-3">
            <Link
              href="/admin/events"
              className="p-4 rounded-2xl bg-[#0F0E0D] border border-white/10 hover:border-white/20 flex items-center justify-between text-xs transition-all block"
            >
              <span className="font-syne font-bold text-white uppercase">EVENTS &amp; RUNWAY</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/40" />
            </Link>
            <Link
              href="/admin/theme"
              className="p-4 rounded-2xl bg-[#0F0E0D] border border-white/10 hover:border-white/20 flex items-center justify-between text-xs transition-all block"
            >
              <span className="font-syne font-bold text-white uppercase">THEME &amp; TYPOGRAPHY</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/40" />
            </Link>
            <Link
              href="/admin/settings"
              className="p-4 rounded-2xl bg-[#0F0E0D] border border-white/10 hover:border-white/20 flex items-center justify-between text-xs transition-all block"
            >
              <span className="font-syne font-bold text-white uppercase">SEO &amp; SITE SETTINGS</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/40" />
            </Link>
          </div>
        </div>
      </div>

      {/* 5. MASTER STOP WEBSITE CONFIRMATION MODAL */}
      {showStopModal && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-[#0F0E0D] border border-white/20 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="space-y-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#F15E1C]/15 border border-[#F15E1C]/30 text-[#F15E1C] flex items-center justify-center mx-auto">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="font-serif-display text-2xl font-light uppercase text-white">
                {isMaintenanceOn ? "RESTORE PUBLIC WEBSITE?" : "STOP ENTIRE WEBSITE?"}
              </h3>
              <p className="font-sans text-xs text-white/70 leading-relaxed">
                {isMaintenanceOn
                  ? "This will restore public visitor access across all routes immediately."
                  : "This will make the entire public website unavailable to visitors. Public visitors will be redirected to the Maintenance page. Admin access remains active."}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowStopModal(false)}
                disabled={isProcessingStop}
                className="flex-1 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-syne text-xs font-bold uppercase transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmToggleMaintenance}
                disabled={isProcessingStop}
                className={`flex-1 py-3 rounded-2xl font-syne text-xs font-bold uppercase transition-all shadow-lg ${
                  isMaintenanceOn
                    ? "bg-[#2E936F] hover:bg-[#3AA881] text-black"
                    : "bg-[#F15E1C] hover:bg-[#FF7334] text-white"
                }`}
              >
                {isProcessingStop
                  ? "Processing..."
                  : isMaintenanceOn
                  ? "Restore Website"
                  : "Enter Maintenance"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
