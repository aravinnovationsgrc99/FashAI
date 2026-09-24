"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Globe,
  Sliders,
  Palette,
  LayoutTemplate,
  Image as ImageIcon,
  Grid,
  Calendar,
  Layers,
  FileText,
  Inbox,
  Navigation as NavIcon,
  MousePointer,
  Archive,
  Activity,
  LogOut,
  ExternalLink,
  Menu as MenuIcon,
  X,
  Zap,
  CheckCircle2,
  AlertCircle,
  Save,
  Send,
  Eye,
  User,
  RotateCcw,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { LivePreviewModal } from "@/components/admin/LivePreviewModal";
import { GlobalAdminSearch } from "@/components/admin/GlobalAdminSearch";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    config,
    updateLocalDraftConfig,
    saveDraft,
    publish,
    hasUnsavedChanges,
    saveStatus,
    toast,
    setIsPreviewOpen,
    discardUnsavedChanges,
  } = useSiteConfig();

  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileDrawerOpen]);

  useEffect(() => {
    if (isLoginPage) {
      setAuthChecked(true);
      return;
    }

    const verifyAuth = async () => {
      try {
        const res = await fetch("/api/admin/auth/me", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            setAuthChecked(true);
            return;
          }
        }
      } catch (e) {
        console.warn("Auth verify error:", e);
      }
      setIsAuthenticated(false);
      setAuthChecked(true);
      router.push("/admin/login");
    };

    verifyAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch (e) {
      console.warn("Logout error:", e);
    }
    sessionStorage.removeItem("fashai_admin_token");
    router.push("/admin/login");
  };

  const handleToggleMaintenance = async () => {
    const currentState = config?.maintenanceSettings?.enabled || false;
    const newState = !currentState;
    updateLocalDraftConfig((prev) => ({
      ...prev,
      maintenanceSettings: {
        ...prev.maintenanceSettings,
        enabled: newState,
      },
    }));
    await saveDraft();
    await publish(`Maintenance Mode set to ${newState ? "ON" : "OFF"}`);
  };

  const handleSaveDraftClick = async () => {
    setIsSaving(true);
    await saveDraft();
    setIsSaving(false);
  };

  const handlePublishClick = async () => {
    setIsSaving(true);
    await publish("Admin published updates");
    setIsSaving(false);
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center p-6 text-center select-none font-sans">
        <div className="w-9 h-9 border-2 border-[#FAB60A] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-syne text-[11px] uppercase tracking-widest text-[#FAB60A]">
          AUTHENTICATING MASTER ADMIN...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const isMaintenanceOn = config?.maintenanceSettings?.enabled;

  // Derive Current Page Title
  const getPageTitle = (path: string) => {
    if (path === "/admin") return "Dashboard";
    if (path === "/admin/homepage") return "Homepage Editor";
    if (path === "/admin/pages") return "Page Manager";
    if (path === "/admin/events") return "Events Manager";
    if (path === "/admin/media") return "Media Library";
    if (path === "/admin/gallery") return "Gallery Manager";
    if (path === "/admin/applications") return "Talent Applications";
    if (path === "/admin/submissions") return "Form Submissions";
    if (path === "/admin/theme") return "Theme Editor";
    if (path === "/admin/navigation") return "Navigation Control";
    if (path === "/admin/popup") return "Event Popup";
    if (path === "/admin/footer") return "Footer Control";
    if (path === "/admin/website") return "Website Status";
    if (path === "/admin/settings") return "Global Settings";
    if (path === "/admin/backups") return "Backups & Restore";
    if (path === "/admin/activity") return "Activity Log";
    return "Master Control";
  };

  const pageTitle = getPageTitle(pathname);

  // Content-First Navigation Groups as specified in section 7
  const navigationGroups = [
    {
      groupTitle: "CONTENT",
      items: [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { label: "Homepage", href: "/admin/homepage", icon: LayoutTemplate },
        { label: "Pages", href: "/admin/pages", icon: Zap },
        { label: "Events", href: "/admin/events", icon: Calendar },
        { label: "Media", href: "/admin/media", icon: ImageIcon },
        { label: "Gallery", href: "/admin/gallery", icon: Grid },
      ],
    },
    {
      groupTitle: "PEOPLE",
      items: [
        { label: "Applications", href: "/admin/applications", icon: FileText },
        { label: "Submissions", href: "/admin/submissions", icon: Inbox },
      ],
    },
    {
      groupTitle: "DESIGN",
      items: [
        { label: "Theme", href: "/admin/theme", icon: Palette },
        { label: "Navigation", href: "/admin/navigation", icon: NavIcon },
        { label: "Popup", href: "/admin/popup", icon: Layers },
        { label: "Footer", href: "/admin/footer", icon: MousePointer },
      ],
    },
    {
      groupTitle: "SYSTEM",
      items: [
        { label: "Website Status", href: "/admin/website", icon: Globe },
        { label: "Settings", href: "/admin/settings", icon: Sliders },
        { label: "Backups", href: "/admin/backups", icon: Archive },
        { label: "Activity", href: "/admin/activity", icon: Activity },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col font-sans select-none antialiased">
      {/* TOP HEADER BAR (Section 3) */}
      <header className="h-16 bg-[#0E0D0C] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-[100] shadow-xl backdrop-blur-md">
        {/* LEFT: Mobile Trigger & Page Title */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
            aria-label="Toggle Navigation Drawer"
          >
            {mobileDrawerOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <Link href="/admin" className="relative w-7 h-7 flex-shrink-0 hidden xs:block">
              <Image
                src="/assets/brand/logo_transparent.png"
                alt="FashAI Logo"
                fill
                className="object-contain"
              />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/40 hidden sm:inline">/admin /</span>
              <h1 className="font-syne text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                {pageTitle}
              </h1>
            </div>
          </div>
        </div>

        {/* MIDDLE: GLOBAL SEARCH (Section 22) */}
        <div className="hidden md:flex items-center flex-1 max-w-sm mx-6">
          <GlobalAdminSearch />
        </div>

        {/* RIGHT ACTIONS & WEBSITE STATUS */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* WEBSITE ONLINE / MAINTENANCE STATUS BADGE */}
          <button
            onClick={handleToggleMaintenance}
            title="Click to toggle Website Maintenance Mode"
            className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-syne font-bold uppercase tracking-wider transition-all ${
              isMaintenanceOn
                ? "bg-[#F15E1C]/20 border-[#F15E1C] text-[#F15E1C] hover:bg-[#F15E1C]/30 animate-pulse"
                : "bg-[#2E936F]/20 border-[#2E936F] text-[#2E936F] hover:bg-[#2E936F]/30"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isMaintenanceOn ? "bg-[#F15E1C]" : "bg-[#2E936F]"
              }`}
            />
            <span className="hidden xs:inline">
              {isMaintenanceOn ? "● MAINTENANCE MODE" : "● WEBSITE ONLINE"}
            </span>
            <span className="xs:hidden">{isMaintenanceOn ? "MAINT" : "ONLINE"}</span>
          </button>

          {/* SAVE STATUS & DRAFT BUTTONS */}
          {hasUnsavedChanges ? (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-syne text-[#FAB60A] font-bold uppercase tracking-wider hidden md:inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FAB60A] animate-ping" />
                Unsaved changes
              </span>

              <button
                onClick={handleSaveDraftClick}
                disabled={isSaving}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-syne font-medium transition-colors"
              >
                <Save className="w-3 h-3 text-[#FAB60A]" />
                <span className="hidden sm:inline">Save Draft</span>
              </button>

              <button
                onClick={handlePublishClick}
                disabled={isSaving}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#FAB60A] hover:bg-[#FFEC69] text-black text-xs font-syne font-bold transition-all shadow-md"
              >
                <Send className="w-3 h-3" />
                <span className="hidden sm:inline">Publish</span>
              </button>
            </div>
          ) : (
            <span className="text-[10px] font-mono text-white/50 hidden md:inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#2E936F]" />
              {saveStatus === "published" ? "Published" : "Saved"}
            </span>
          )}

          {/* PREVIEW WEBSITE BUTTON */}
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white/90 hover:text-white transition-all font-syne"
          >
            <Eye className="w-3.5 h-3.5 text-[#FAB60A]" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          {/* ADMIN PROFILE / LOGOUT */}
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
            title="Logout Admin Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN TWO-PART LAYOUT CONTAINER */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT SIDEBAR (220px - 240px) */}
        <aside className="hidden lg:flex flex-col w-56 bg-[#0B0A0A] border-r border-white/10 flex-shrink-0 select-none">
          {/* SIDEBAR HEADER */}
          <div className="p-4 border-b border-white/10 flex flex-col gap-0.5">
            <span className="font-serif-display text-sm font-semibold tracking-wider text-white uppercase">
              FashAI Universal
            </span>
            <span className="font-syne text-[10px] uppercase tracking-widest text-[#FAB60A] font-bold">
              MASTER CONTROL
            </span>
          </div>

          {/* SIDEBAR NAVIGATION GROUPS */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-5 custom-scrollbar">
            {navigationGroups.map((group) => (
              <div key={group.groupTitle} className="space-y-1">
                <div className="px-2 py-1 text-[10px] font-syne font-bold uppercase tracking-widest text-white/40">
                  {group.groupTitle}
                </div>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-syne transition-all ${
                        isActive
                          ? "bg-white/10 text-white font-bold border-l-2 border-[#FAB60A]"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-3.5 h-3.5 ${
                            isActive ? "text-[#FAB60A]" : "text-white/40"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FAB60A]" />}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* SIDEBAR FOOTER & SYSTEM INFO */}
          <div className="p-3 border-t border-white/10 bg-[#0E0D0C] space-y-2">
            <div className="flex items-center justify-between text-[11px] text-white/50 px-2">
              <span className="flex items-center gap-1.5">
                <User className="w-3 h-3 text-[#FAB60A]" />
                FashAIadmin
              </span>
              <span className="text-[9px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/70">
                v2.6
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white/70 hover:text-white transition-colors font-syne"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* MOBILE SLIDE-OUT DRAWER (Section 28) */}
        {mobileDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-[150] flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileDrawerOpen(false)}
            />
            {/* Drawer content */}
            <div className="relative w-64 max-w-[80vw] bg-[#0E0D0C] border-r border-white/15 flex flex-col h-full z-10 shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="font-serif-display text-sm font-semibold text-white uppercase">
                    FashAI Universal
                  </h2>
                  <p className="font-syne text-[10px] text-[#FAB60A] uppercase tracking-widest font-bold">
                    Master Control
                  </p>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="p-3 border-b border-white/10">
                <GlobalAdminSearch />
              </div>

              <nav className="flex-1 overflow-y-auto p-3 space-y-4">
                {navigationGroups.map((group) => (
                  <div key={group.groupTitle} className="space-y-1">
                    <div className="px-2 py-1 text-[10px] font-syne font-bold uppercase tracking-widest text-white/40">
                      {group.groupTitle}
                    </div>
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileDrawerOpen(false)}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-syne transition-all ${
                            isActive
                              ? "bg-[#FAB60A] text-black font-bold"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </nav>

              <div className="p-4 border-t border-white/10 bg-black/40">
                <button
                  onClick={handleLogout}
                  className="w-full py-2 rounded-xl bg-red-500/20 text-red-400 font-syne text-xs font-bold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT MAIN WORKSPACE */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#080808] relative">
          {children}
        </main>
      </div>

      {/* GLOBAL LIVE PREVIEW MODAL */}
      <LivePreviewModal />

      {/* TOAST NOTIFICATION FLOATING CONTAINER (Section 23) */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#141312] border border-white/20 text-xs text-white shadow-2xl animate-in slide-in-from-bottom-3 duration-200">
          {toast.type === "success" && <CheckCircle2 className="w-4 h-4 text-[#2E936F]" />}
          {toast.type === "warning" && <AlertCircle className="w-4 h-4 text-[#FAB60A]" />}
          {toast.type === "error" && <AlertCircle className="w-4 h-4 text-[#F15E1C]" />}
          {toast.type === "info" && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
          <span className="font-syne font-medium">{toast.text}</span>
        </div>
      )}

      {/* UNSAVED CHANGES DISCARD MODAL (Section 19) */}
      {showDiscardModal && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121110] border border-white/20 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-serif-display text-lg text-white">UNSAVED CHANGES</h3>
            <p className="text-xs text-white/70 leading-relaxed font-sans">
              You have modifications in your draft that have not been saved or published yet.
              Discarding will revert back to the last published snapshot.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDiscardModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-syne text-white/70 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  discardUnsavedChanges();
                  setShowDiscardModal(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-syne font-bold bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30"
              >
                Discard Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
